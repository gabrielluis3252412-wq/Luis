# Tempo de cada PALAVRA na narracao definitiva, sem modelo de transcricao:
# compara (DTW sobre MFCC) cada frase da voz definitiva com a mesma frase da voz provisoria,
# cujos tempos de palavra sao exatos (vem dos fonemas do espeak-ng), e transfere os tempos.
# Uso (depois de alinhar.py): python3 palavras_dtw.py   -> grava "palavras" em roteiro.json
import json, os, numpy as np, librosa
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 16000; HOP = 160
R = json.load(open('roteiro.json')); P = json.load(open('audio/provisoria/roteiro.json'))
new, _ = librosa.load('audio/narracao.wav', sr=SR); old, _ = librosa.load('audio/provisoria/narracao.wav', sr=SR)
def feat(a):
    m = librosa.feature.mfcc(y=a, sr=SR, n_mfcc=20, hop_length=HOP, n_fft=512)[1:]
    m = (m - m.mean(1, keepdims=True)) / (m.std(1, keepdims=True) + 1e-6)
    d = librosa.feature.delta(m); return np.vstack([m, d * .5])
out = []
for k, ((txt, a, b), (_, oa, ob), ow) in enumerate(zip(R['frases'], P['frases'], P['palavras'])):
    A = feat(old[int(oa * SR):int(ob * SR)]); B = feat(new[int(a * SR):int(b * SR)])
    D, wp = librosa.sequence.dtw(X=A, Y=B, metric='cosine'); wp = wp[::-1]
    def m(t):  # tempo na voz provisoria -> tempo na voz definitiva
        f = (t - oa) * SR / HOP; i = np.searchsorted(wp[:, 0], f); i = min(max(i, 0), len(wp) - 1)
        return a + wp[i, 1] * HOP / SR
    ws = [[w, round(m(s), 3), round(m(e), 3)] for w, s, e in ow]
    for j in range(1, len(ws)): ws[j][1] = max(ws[j][1], ws[j - 1][1] + .04)
    for j in range(len(ws)): ws[j][2] = max(ws[j][2], ws[j][1] + .05)
    ws[0][1] = max(a, min(ws[0][1], a + .05)); ws[-1][2] = b
    out.append(ws)
R['palavras'] = out; R['fonte_palavras'] = 'DTW contra a voz provisoria (audio/provisoria)'
json.dump(R, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for ws in out[12:13]: print(ws)
print('ok: tempos de palavra gravados em roteiro.json')
