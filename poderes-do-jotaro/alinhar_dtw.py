# Usa a NARRACAO DEFINITIVA (ex.: ElevenLabs) no lugar da provisoria, sem cortar nem alterar o audio.
# Compara (DTW) a gravacao nova com a narracao provisoria do MESMO texto (audio/provisoria/), cujos tempos
# de frase e de palavra sao conhecidos, e transfere esses tempos para a gravacao nova.
# So usa numpy + ffmpeg (nao precisa de librosa).
# Uso: python3 alinhar_dtw.py audio/narracao-elevenlabs.mp3   ->  audio/narracao.wav + roteiro.json
import sys, os, json, re, subprocess, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1]; SR = 16000; HOP = 400; NF = 1024   # 25 ms por quadro de analise
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', '44100', 'audio/narracao.wav'], check=True)
def load(f):
    p = subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 'f32le', '-'], capture_output=True, check=True)
    return np.frombuffer(p.stdout, dtype=np.float32).astype(np.float64)
def mel_fb(n_mels=40, fmin=60, fmax=7600):
    m = lambda f: 2595 * np.log10(1 + f / 700); im = lambda x: 700 * (10 ** (x / 2595) - 1)
    pts = im(np.linspace(m(fmin), m(fmax), n_mels + 2)); bins = np.floor((NF + 1) * pts / SR).astype(int); fb = np.zeros((n_mels, NF // 2 + 1))
    for i in range(n_mels):
        a, b, c = bins[i], bins[i + 1], bins[i + 2]
        fb[i, a:b] = (np.arange(a, b) - a) / max(1, b - a); fb[i, b:c] = (c - np.arange(b, c)) / max(1, c - b)
    return fb
FB = mel_fb(); K = 20; DCT = np.cos(np.pi / 40 * (np.arange(40)[None, :] + .5) * np.arange(1, K + 1)[:, None])
def feats(y):
    n = 1 + (len(y) - NF) // HOP; idx = np.arange(NF)[None, :] + HOP * np.arange(n)[:, None]
    S = np.abs(np.fft.rfft(y[idx] * np.hanning(NF), axis=1)) ** 2; L = np.log(S @ FB.T + 1e-8)
    C = L @ DCT.T; C = (C - C.mean(0)) / (C.std(0) + 1e-6); return C / (np.linalg.norm(C, axis=1, keepdims=True) + 1e-9)
A = feats(load('audio/provisoria/narracao.wav')); Bf = feats(load('audio/narracao.wav'))
na, nb = len(A), len(Bf); cost = 1 - A @ Bf.T
D = np.full((na + 1, nb + 1), np.inf); D[0, 0] = 0
for i in range(1, na + 1):  # DTW (passos diagonal / vertical / horizontal)
    ci = cost[i - 1]; Di, Dp = D[i], D[i - 1]
    for j in range(1, nb + 1):
        m = Dp[j - 1]
        if Dp[j] < m: m = Dp[j]
        if Di[j - 1] < m: m = Di[j - 1]
        Di[j] = ci[j - 1] + m
i, j, path = na, nb, []
while i > 0 and j > 0:
    path.append((i - 1, j - 1)); s = np.argmin([D[i - 1, j - 1], D[i - 1, j], D[i, j - 1]])
    if s == 0: i, j = i - 1, j - 1
    elif s == 1: i -= 1
    else: j -= 1
path = np.array(path[::-1]); fr = HOP / SR
def mapt(t):
    k = int(round(t / fr)); js = path[path[:, 0] == min(k, na - 1), 1]; return (js.mean() if len(js) else path[-1, 1]) * fr
R = json.load(open('audio/provisoria/roteiro.json')); dur = len(load('audio/narracao.wav')) / SR
fr2 = [[p, round(mapt(a), 3), round(mapt(b), 3)] for p, a, b in R['frases']]
pw2 = [[[w, round(mapt(a), 3), round(mapt(b), 3)] for w, a, b in ws] for ws in R['palavras']]
for k in range(1, len(fr2)):
    fr2[k][1] = max(fr2[k][1], fr2[k - 1][2]); fr2[k][2] = max(fr2[k][2], fr2[k][1] + .2)
json.dump({'fonte': os.path.basename(src), 'duracao': round(dur, 3), 'frases': fr2, 'palavras': pw2}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for p, a, b in fr2: print(f'{a:6.2f}-{b:6.2f}  {p[:70]}')
print('ok: roteiro.json atualizado com os tempos da narracao nova. Agora rode ./refazer.sh')
