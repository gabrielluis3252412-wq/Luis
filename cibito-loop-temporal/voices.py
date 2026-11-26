# Monta a faixa de voz final: narracao original intacta + falas dos personagens
# com timbre alterado (mesmas palavras, mesmo tempo). Gera tambem o envelope
# de volume por quadro (boca dos personagens) -> env.js
import numpy as np, wave, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; w.close(); return a
def wr(f, a, ch=1):
    w = wave.open(f, 'wb'); w.setnchannels(ch); w.setsampwidth(2); w.setframerate(SR)
    w.writeframes((np.clip(a, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()

# (arquivo, inicio do recorte no original, falante)
DLG = [('c1', 16.10, 'CIB'), ('c2', 27.45, 'CIB'), ('c3', 31.99, 'CIB'), ('e1', 44.34, 'ELI'),
       ('m1', 57.52, 'MAE'), ('e2', 78.60, 'ELI'), ('c4', 84.85, 'CIB')]
GAIN = {'CIB': 1.05, 'ELI': 1.4, 'MAE': 1.0}
v = rd('audio/narr.wav')
out = v.copy()
spk = []
for name, t0, who in DLG:
    s = rd(f'audio/v_{name}.wav') * GAIN[who]
    i = int(t0 * SR); n = len(s)
    # apaga o trecho original correspondente (fala original -> fala com timbre do personagem)
    seg_len = min(n, len(out) - i)
    f = int(.02 * SR); fade = np.ones(seg_len); fade[:f] = np.linspace(0, 1, f); fade[-f:] = np.linspace(1, 0, f)
    keep = 1 - fade
    out[i:i + seg_len] = out[i:i + seg_len] * keep + s[:seg_len] * fade
    spk.append([round(t0, 3), round(t0 + n / SR, 3), who])
wr('audio/voz_final.wav', out)
# envelope por quadro (24 fps) da voz final, com 0.3 s de atraso (OFF)
OFF = 0.3; FPS = 24
e = np.abs(out); k = int(SR / FPS)
fr = [float(np.sqrt(np.mean(out[j * k:(j + 1) * k] ** 2))) for j in range(len(out) // k)]
m = max(fr); fr = [round(min(1, x / m * 2.2), 3) for x in fr]
open('env.js', 'w').write('const ENV=' + json.dumps(fr) + ',ENVOFF=' + str(OFF) + ',SPK=' + json.dumps(spk) + ';\n')
print('ok', len(out) / SR, 's  quadros env:', len(fr), spk)
