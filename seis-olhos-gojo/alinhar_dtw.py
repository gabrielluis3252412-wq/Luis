# Alinhamento mais preciso da narracao definitiva: compara (DTW) com a narracao provisoria
# sintetizada do MESMO texto, cujos tempos de frase sao conhecidos, e encaixa nas pausas reais.
# Uso: python3 alinhar_dtw.py audio/narracao-elevenlabs.mp3   (requer audio/provisoria/)
import sys, json, re, subprocess, os, numpy as np, librosa
os.chdir(os.path.dirname(os.path.abspath(__file__)))
src = sys.argv[1]; SR = 16000; HOP = 320
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', src, '-ac', '1', '-ar', '44100', 'audio/narracao.wav'], check=True)
ref = json.load(open('audio/provisoria/roteiro.json'))['frases']
def feat(f):
    y, _ = librosa.load(f, sr=SR); m = librosa.feature.mfcc(y=y, sr=SR, n_mfcc=20, hop_length=HOP, n_fft=1024)[1:]
    m = (m - m.mean(1, keepdims=True)) / (m.std(1, keepdims=True) + 1e-6); return m, len(y) / SR
A, da = feat('audio/provisoria/narracao.wav'); B, db = feat('audio/narracao.wav')
D, wp = librosa.sequence.dtw(X=A, Y=B, metric='cosine'); wp = wp[::-1]
fr = HOP / SR
def mapt(t):
    i = int(round(t / fr)); j = wp[wp[:, 0] >= i][:, 1]; return (j[0] if len(j) else wp[-1, 1]) * fr
log = subprocess.run(['ffmpeg', '-i', 'audio/narracao.wav', '-af', 'silencedetect=noise=-35dB:d=0.08', '-f', 'null', '-'], capture_output=True, text=True).stderr
ss = [float(x) for x in re.findall(r'silence_start: ([\d.]+)', log)]; se = [float(x) for x in re.findall(r'silence_end: ([\d.]+)', log)]
gaps = list(zip(ss, se + [db] * (len(ss) - len(se))))
def snap(t, kind):
    best = None
    for a, b in gaps:
        v = b if kind == 's' else a
        if abs(v - t) < .45 and (best is None or abs(v - t) < abs(best - t)): best = v
    return best if best is not None else t
out = []
for k, (p, a, b) in enumerate(ref):
    s = 0.0 if k == 0 and mapt(a) < .3 else snap(mapt(a), 's'); e = snap(mapt(b), 'e')
    out.append([p, round(s, 3), round(e, 3)])
for k in range(1, len(out)):  # garante ordem
    out[k][1] = max(out[k][1], out[k - 1][2]); out[k][2] = max(out[k][2], out[k][1] + .3)
json.dump({'fonte': os.path.basename(src), 'duracao': round(db, 3), 'frases': out}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for p, a, b in out: print(f'{a:6.2f}-{b:6.2f}  {p[:60]}')
