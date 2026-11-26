# Converte roteiro.json -> roteiro.js e gera env.js (energia da voz por quadro, 24 fps)
import json, wave, os, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
R = json.load(open('roteiro.json'))
open('roteiro.js', 'w').write('const PHR=' + json.dumps(R['frases'], ensure_ascii=False) + ',PWD=' + json.dumps(R.get('palavras'), ensure_ascii=False) + ';\n')
w = wave.open('audio/narracao.wav'); sr = w.getframerate(); ch = w.getnchannels()
a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; w.close()
if ch > 1: a = a.reshape(-1, ch).mean(1)
k = sr // 24; fr = [float(np.sqrt(np.mean(a[j*k:(j+1)*k]**2))) for j in range(len(a)//k)]
m = max(fr) or 1; fr = [round(min(1, x/m*2.0), 3) for x in fr]
open('env.js', 'w').write('const ENV=' + json.dumps(fr) + ',ENVOFF=0,SPK=[];\n')
print('roteiro.js e env.js ok |', len(R['frases']), 'frases |', round(len(a)/sr, 2), 's')
