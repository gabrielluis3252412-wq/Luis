# Junta a narracao principal + o encerramento (ElevenLabs) numa so faixa, sem cortar nada,
# e acrescenta as frases do encerramento em roteiro.json (com o tempo real de cada palavra).
import json, subprocess, os, numpy as np, wave
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
R = json.load(open('roteiro.json')); NMAIN = 21
R['frases'] = R['frases'][:NMAIN]; R['palavras'] = R['palavras'][:NMAIN]
OLDT = round((R['frases'][-1][2] + 3.0) * 24) / 24   # fim das cenas originais (inalterado)
T0 = OLDT + 0.45                                        # o encerramento comeca a falar aqui
def dec(f):
    return np.frombuffer(subprocess.run(['ffmpeg', '-v', 'error', '-i', f, '-ac', '1', '-ar', str(SR), '-f', 's16le', '-'], capture_output=True).stdout, dtype=np.int16).astype(np.float64) / 32768
a = dec('audio/narracao-elevenlabs.mp3'); b = dec('audio/encerramento-elevenlabs.mp3')
v = np.zeros(int(T0 * SR) + len(b)); v[:len(a)] = a; v[int(T0 * SR):] = b
w = wave.open('audio/narracao.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(v, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
W = json.load(open('audio/palavras-encerramento.json')); ws = []
for t, s, e in W:
    t = t.replace('Cebito', 'Cibito')
    if t.startswith('-') and ws: ws[-1] = [ws[-1][0] + t, ws[-1][1], e]
    else: ws.append([t, s, e])
groups = [10, 8, 10, 8, 5]; k = 0
for n in groups:
    g = [[t, round(s + T0, 3), round(e + T0, 3)] for t, s, e in ws[k:k + n]]; k += n
    R['frases'].append([' '.join(x[0] for x in g), g[0][1], g[-1][2]]); R['palavras'].append(g)
R['encerramento'] = {'inicio_cena': OLDT, 'inicio_fala': T0, 'fonte': 'encerramento-elevenlabs.mp3'}
R['duracao'] = round(len(v) / SR, 3)
json.dump(R, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for f in R['frases'][NMAIN:]: print(f)
print('cenas originais terminam em', OLDT, '| total voz', round(len(v) / SR, 2))
