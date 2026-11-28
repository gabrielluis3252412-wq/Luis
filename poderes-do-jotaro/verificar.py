# Verifica os quadros renderizados: acha blocos da imagem que "somem" por 1 ou 2 quadros
# (falha de pintura do navegador sob carga) e lista os quadros a refazer.
# Uso: python3 verificar.py [inicio fim]  -> imprime os numeros dos quadros com defeito
import sys, os, numpy as np
from PIL import Image
from concurrent.futures import ProcessPoolExecutor
D = os.path.join(os.path.dirname(os.path.abspath(__file__)), 'frames'); N = len([f for f in os.listdir(D) if f.endswith('.jpg')])
A, Bf = (int(sys.argv[1]), int(sys.argv[2])) if len(sys.argv) > 2 else (0, N)
def load(i):
    im = Image.open(f'{D}/{i:05d}.jpg'); im.draft('RGB', (270, 480)); return np.asarray(im.convert('RGB').resize((135, 240)), dtype=np.float32).reshape(16, 15, 9, 15, 3).mean((1, 3))
idx = list(range(max(0, A - 3), min(N, Bf + 3)))
with ProcessPoolExecutor(4) as ex: Bk = dict(zip(idx, ex.map(load, idx, chunksize=32)))
bad = set()
for i in range(max(1, A), min(N - 1, Bf)):
    for k in (1, 2):
        if i + k >= N or i - 1 not in Bk or i + k not in Bk: continue
        pp = np.abs(Bk[i - 1] - Bk[i + k]).max(-1)                              # antes x depois: parecidos
        mn = np.min(np.stack([np.abs(Bk[j] - Bk[i - 1]).max(-1) for j in range(i, i + k)]), 0)  # o trecho difere de ambos
        mn2 = np.min(np.stack([np.abs(Bk[j] - Bk[i + k]).max(-1) for j in range(i, i + k)]), 0)
        sc = (np.minimum(mn, mn2) * (pp < 10)).max()
        if sc > 28: bad.update(range(i, i + k))
print(' '.join(map(str, sorted(bad))))
