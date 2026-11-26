# Alinhamento por silabas: conta os nucleos silabicos (picos de energia) entre pausas reais e
# escolhe as fronteiras das frases para que cada uma receba a quantidade esperada de silabas.
# Uso: python3 alinhar_sil.py audio/narracao-elevenlabs.mp3
import sys, json, re, subprocess, os, numpy as np, librosa, scipy.signal as ss
os.chdir(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1]
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', '44100', 'audio/narracao.wav'], check=True)
PH = [p[0] for p in json.load(open('audio/provisoria/roteiro.json'))['frases']]
def syl(t):
    t = t.lower(); t = re.sub(r'(ão|õe|ãe|ai|ei|oi|ou|au|eu|iu|ui)', 'V', t)
    return len(re.findall(r'[aeiouáéíóúâêôàV]+', t))
S = np.array([syl(p) for p in PH], float)
y, sr = librosa.load('audio/narracao.wav', sr=16000); dur = len(y) / sr
e = librosa.feature.rms(y=y, frame_length=400, hop_length=160)[0]; e = np.convolve(e, np.ones(5) / 5, 'same')
pk, _ = ss.find_peaks(e, prominence=e.max() * .04, distance=8); TP = pk * .01
log = subprocess.run(['ffmpeg', '-i', 'audio/narracao.wav', '-af', 'silencedetect=noise=-28dB:d=0.06', '-f', 'null', '-'], capture_output=True, text=True).stderr
s0 = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]; s1 = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
sil = list(zip(s0, s1 + [dur] * (len(s0) - len(s1))))
start = sil[0][1] if sil and sil[0][0] < .05 else 0.; end = sil[-1][0] if sil and sil[-1][1] >= dur - .05 else dur
gaps = [(a, b) for a, b in sil if a > start + .1 and b < end - .1]; G = len(gaps); K = len(PH) - 1
ratio = len(TP[(TP >= start) & (TP <= end)]) / S.sum()
B0 = [start] + [b for a, b in gaps]; E0 = [a for a, b in gaps] + [end]; LN = [b - a for a, b in gaps] + [.5]
cnt = lambda a, b: ((TP >= a) & (TP < b)).sum()
def cost(k, i, j):
    if E0[j] <= B0[i]: return 1e9
    x = ratio * S[k]; return ((cnt(B0[i], E0[j]) - x) / (np.sqrt(x) + 1.5)) ** 2 - 6 * min(LN[j], .5)
INF = 1e18; C = np.full((K + 1, G + 1), INF); P = np.zeros((K + 1, G + 1), int)
for j in range(G): C[0, j] = cost(0, 0, j)
for k in range(1, K + 1):
    for j in range(k, G + 1):
        if (k == K) != (j == G): continue
        for i in range(k - 1, j):
            if C[k - 1, i] >= INF: continue
            v = C[k - 1, i] + cost(k, i + 1, j)
            if v < C[k, j]: C[k, j] = v; P[k, j] = i
pick = []; j = G
for k in range(K, 0, -1): j = P[k, j]; pick.append(j)
pick = pick[::-1]; out = []; a = start
for k, p in enumerate(PH):
    b = gaps[pick[k]][0] if k < K else end; out.append([p, round(a, 3), round(b, 3)])
    if k < K: a = gaps[pick[k]][1]
json.dump({'fonte': os.path.basename(src), 'duracao': round(dur, 3), 'frases': out}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for (p, a, b), s in zip(out, S): print(f'{a:6.2f}-{b:6.2f} sil {int(s):2d} picos {cnt(a,b):2d}  {p[:55]}')
