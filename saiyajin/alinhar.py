# Usa a NARRACAO DEFINITIVA (ex.: ElevenLabs) no lugar da provisoria, sem cortar nem alterar o audio.
# Uso: python3 alinhar.py audio/minha-narracao.mp3
# Detecta as pausas reais (ffmpeg silencedetect) e encaixa as 25 frases do roteiro nelas.
# Gera audio/narracao.wav (copia fiel, so convertida) e roteiro.json com os tempos reais.
import sys, subprocess, re, json, os, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1]
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', '44100', 'audio/narracao.wav'], check=True)
dur = float(subprocess.run(['ffprobe', '-v', 'error', '-show_entries', 'format=duration', '-of', 'csv=p=0', 'audio/narracao.wav'], capture_output=True, text=True).stdout)
log = subprocess.run(['ffmpeg', '-i', 'audio/narracao.wav', '-af', 'silencedetect=noise=-35dB:d=0.09', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
sil = list(zip(ss, se + [dur] * (len(ss) - len(se))))
start = sil[0][1] if sil and sil[0][0] < .05 else 0.0
end = sil[-1][0] if sil and sil[-1][1] >= dur - .05 else dur
gaps = [(a, b) for a, b in sil if a > start + .1 and b < end - .1]
PH = [p[0] for p in json.load(open('roteiro.json'))['frases']] if os.path.exists('roteiro.json') else None
if not PH: sys.exit('roteiro.json com as frases nao encontrado')
L = np.array([len(p) for p in PH], float); cum = np.cumsum(L)[:-1] / L.sum()
K = len(PH) - 1; G = len(gaps)
if G < K: sys.exit(f'Foram achadas so {G} pausas para {K} divisoes; ajuste noise/d no silencedetect.')
# programacao dinamica: escolhe K pausas (em ordem) para que a duracao de cada frase fique
# proporcional ao seu tamanho (ritmo de fala constante), preferindo pausas mais longas
r = (end - start - sum(b - a for a, b in gaps) * .5) / L.sum()
B0 = [start] + [b for a, b in gaps]; E0 = [a for a, b in gaps] + [end]   # inicio possivel / fim possivel
ln = [b - a for a, b in gaps] + [0]
def cost(k, i, j):  # frase k comeca em B0[i] e termina em E0[j]
    sp = E0[j] - B0[i]
    if sp <= 0: return 1e9
    e = r * L[k]; return ((sp - e) / (e + .4)) ** 2 - .25 * ln[j]
INF = 1e18; C = [[INF] * (G + 1) for _ in range(K + 1)]; P = [[0] * (G + 1) for _ in range(K + 1)]
for j in range(G): C[0][j] = cost(0, 0, j)
for k in range(1, K + 1):
    for j in range(k, G + 1):
        if k == K and j != G: continue
        if k < K and j == G: continue
        for i in range(k - 1, j):
            v = C[k - 1][i] + cost(k, i + 1, j)
            if v < C[k][j]: C[k][j] = v; P[k][j] = i
pick = []; j = G
for k in range(K, 0, -1): j = P[k][j]; pick.append(j)
pick = pick[::-1]
fr = []; a = start
for k, p in enumerate(PH):
    b = gaps[pick[k]][0] if k < K else end
    fr.append([p, round(a, 3), round(b, 3)]); a = gaps[pick[k]][1] if k < K else a
json.dump({'fonte': os.path.basename(src), 'duracao': round(dur, 3), 'frases': fr}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for p, a, b in fr: print(f'{a:6.2f}-{b:6.2f}  {p[:70]}')
print('ok: roteiro.json atualizado. Agora rode ./refazer.sh')
