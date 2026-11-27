# Narracao PROVISORIA (voz sintetizada offline: espeak-ng + MBROLA br3, portugues do Brasil).
# Gera audio/narracao.wav e roteiro.json com o texto EXATO de cada frase, o tempo real de cada
# frase no audio e o tempo de cada PALAVRA (tirado da lista de fonemas da propria voz).
# Quando a narracao definitiva (ElevenLabs) chegar, use transcrever.py ou alinhar.py no lugar deste.
import subprocess, json, os, wave, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
# (texto exato do roteiro [legenda], texto falado [mesmas palavras, pronuncia ajustada], pausa depois em s)
R = [
 ("E se você tivesse o mesmo poder absurdo de Saitama, capaz de derrotar qualquer inimigo com apenas um soco?",
  "E se você tivesse o mesmo poder absurdo de Saitâma, capaz de derrotar qualquer inimigo com apenas um soco?", .55),
 ("Tudo começaria quando você decidisse treinar até ultrapassar os limites humanos.", "Tudo começaria quando você decidisse treinar até ultrapassar os limites humanos.", .45),
 ("Durante três anos, você faria cem flexões, cem abdominais, cem agachamentos e correria dez quilômetros todos os dias.",
  "Durante três anos, você faria cem flexões, cem abdominais, cem agachamentos, e correria dez quilômetros todos os dias.", .5),
 ("No início, seu corpo sofreria com o esforço…", "No início, seu corpo sofreria com o esforço...", .45),
 ("Mas você continuaria, mesmo quando todos dissessem que era impossível.", "Mas você continuaria, mesmo quando todos dissessem que era impossível.", .5),
 ("Até que, depois de milhares de repetições, algo inacreditável aconteceria.", "Até que, depois de milhares de repetições, algo inacreditável aconteceria.", .45),
 ("Seus músculos ficariam extremamente resistentes, sua velocidade aumentaria e, de repente, seus cabelos começariam a cair…",
  "Seus músculos ficariam extremamente resistentes, sua velocidade aumentaria e, de repente, seus cabelos começariam a cair...", .35),
 ("Até você ficar completamente careca!", "Até você ficar completamente careca!", .6),
 ("Mas essa seria a menor das suas preocupações.", "Mas essa seria a menor das suas preocupações.", .4),
 ("Porque agora, você conseguiria saltar por cima de prédios, correr em velocidades absurdas e enfrentar monstros gigantescos sem sentir medo.",
  "Porque agora, você conseguiria saltar por cima de prédios, correr em velocidades absurdas, e enfrentar monstros gigantescos sem sentir medo.", .55),
 ("Um inimigo colossal surgiria no meio da cidade.", "Um inimigo colossal surgiria no meio da cidade.", .4),
 ("Ele levantaria o punho para destruir tudo…", "Ele levantaria o punho para destruir tudo...", .4),
 ("Mas você desviaria do golpe, apareceria atrás dele e acertaria um soco tão poderoso que o vento abriria caminho entre as nuvens.",
  "Mas você desviaria do golpe, apareceria atrás dele, e acertaria um soco tão poderoso que o vento abriria caminho entre as nuvens.", .55),
 ("O monstro seria derrotado em segundos.", "O monstro seria derrotado em segundos.", .65),
 ("Só que, depois de vencer todas as batalhas, você perceberia algo assustador…", "Só que, depois de vencer todas as batalhas, você perceberia algo assustador...", .55),
 ("Ser tão poderoso significava nunca mais encontrar um adversário à sua altura.", "Ser tão poderoso significava nunca mais encontrar um adversário à sua altura.", .55),
 ("E talvez o maior desafio não fosse derrotar monstros…", "E talvez o maior desafio não fosse derrotar monstros...", .4),
 ("Mas encontrar algo que ainda fizesse seu coração acelerar.", "Mas encontrar algo que ainda fizesse seu coração acelerar.", .6),
 ("Comente “CARECA” se você aceitaria esse poder!", "Comente, careca, se você aceitaria esse poder!", 0),
]
SPEED = int(os.environ.get('SPEED', 158)); LEAD = .3
ESP = ['espeak-ng', '-v', 'mb-br3', '-s', str(SPEED), '-p', '38', '-g', '2']
def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; w.close(); return a
def pho(txt):  # lista de fonemas da voz MBROLA: [(fonema, duracao em s)]
    o = subprocess.run(ESP + ['-q', '--pho', txt], capture_output=True, text=True).stdout
    return [(l.split()[0], int(l.split()[1]) / 1000) for l in o.splitlines() if l.strip() and not l.startswith(';')]
def onset(a, thr=.02):
    i = np.argmax(np.abs(a) > thr); return i / SR
os.makedirs('audio/_tts', exist_ok=True)
parts, ph, wd, t = [np.zeros(int(LEAD * SR))], [], [], LEAD
for i, (txt, spk, gap) in enumerate(R):
    raw = f'audio/_tts/{i:02d}_raw.wav'; out = f'audio/_tts/{i:02d}.wav'
    subprocess.run(ESP + ['-w', raw, spk], check=True, stderr=subprocess.DEVNULL)
    # voz mais encorpada: um pouco mais grave, compressao suave (a duracao nao muda)
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af',
        'rubberband=pitch=0.93:formant=preserved,highpass=f=70,equalizer=f=180:t=q:w=1:g=3,equalizer=f=3200:t=q:w=1.2:g=2,'
        'acompressor=threshold=-20dB:ratio=3:attack=5:release=80,aresample=44100', '-ac', '1', out], check=True)
    a = rd(out); a = a / max(1e-6, np.max(np.abs(a))) * .85
    # tempos das palavras: fim da palavra k = soma das duracoes dos fonemas ate o fim do prefixo k
    P = pho(spk); lead = 0.0
    for p, d in P:
        if p != '_': break
        lead += d
    cum, n_ = [], 0.0
    for p, d in P:
        n_ += d; cum.append((p, n_))
    nonp = [j for j, (p, c) in enumerate(cum) if p != '_']
    W, Wt = txt.split(), spk.split(); ends, st = [], []
    for k in range(len(Wt)):
        q = len([1 for p, _ in pho(' '.join(Wt[:k + 1])) if p != '_'])
        j = nonp[min(len(nonp), max(1, q)) - 1]; ends.append(cum[j][1])
        # inicio da palavra seguinte = depois das pausas ('_') que vierem logo apos esta
        while j + 1 < len(cum) and cum[j + 1][0] == '_': j += 1
        st.append(cum[j][1])
    st = [lead] + st[:-1]
    a0 = onset(a); off = a0 - lead              # alinha o inicio previsto com o inicio real
    s0 = max(0, int((a0 - .02) * SR)); e0 = min(len(a), int((ends[-1] + off + .12) * SR))
    end_sil = np.nonzero(np.abs(a) > .01)[0]; e0 = max(e0, end_sil[-1] + int(.03 * SR)) if len(end_sil) else e0
    a = a[s0:e0]; sh = t - s0 / SR
    words = []
    for k, w in enumerate(W):
        b = st[k] + off + sh; e = ends[k] + off + sh
        if k and words[-1][2] < b - .001: pass
        words.append([w, round(b, 3), round(e, 3)])
    ph.append([txt, round(t, 3), round(t + len(a) / SR, 3)]); wd.append(words)
    parts += [a, np.zeros(int(gap * SR))]; t += len(a) / SR + gap
v = np.concatenate(parts + [np.zeros(int(.4 * SR))])
w = wave.open('audio/narracao.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(v, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
json.dump({'fonte': 'provisoria (espeak-ng mb-br3)', 'duracao': round(len(v) / SR, 3), 'frases': ph, 'palavras': wd}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for f in ph: print(f'{f[1]:6.2f}-{f[2]:6.2f}  {f[0][:80]}')
print('narracao', round(len(v) / SR, 2), 's,', len(ph), 'frases')
