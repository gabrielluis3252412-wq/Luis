# Narracao PROVISORIA (voz sintetizada offline: espeak-ng + MBROLA br3, portugues do Brasil).
# Gera audio/narracao.wav e roteiro.json (texto exato de cada frase + tempos reais no audio).
# Quando a narracao definitiva (ex.: ElevenLabs) estiver pronta, use alinhar.py em vez deste script.
import subprocess, json, os, wave, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
# (texto exato do roteiro [legenda], texto falado [pronuncia ajustada], pausa depois em s)
R = [
 ("E se você acordasse amanhã com os Seis Olhos de Satoru Gojo?", "E se você acordasse amanhã, com os Seis Olhos, de Satôru Gôjo?", .55),
 ("No começo, você pensaria que ganhou o poder mais absurdo do universo de Jujutsu Kaisen…", "No começo, você pensaria que ganhou o poder mais absurdo do universo de Jujútsu Káissen...", .45),
 ("Mas existe um detalhe que pode mudar completamente sua vida.", "Mas existe um detalhe... que pode mudar completamente sua vida.", .8),
 ("Primeiro, sua visão mudaria completamente.", "Primeiro: sua visão mudaria completamente.", .4),
 ("Você conseguiria perceber a energia amaldiçoada ao redor das pessoas,", "Você conseguiria perceber a energia amaldiçoada ao redor das pessoas,", .18),
 ("identificar seu fluxo e enxergar detalhes que outros feiticeiros jamais conseguiriam notar.", "identificar seu fluxo, e enxergar detalhes que outros feiticeiros jamais conseguiriam notar.", .45),
 ("Imagine entrar em uma sala e perceber que alguém está escondendo uma quantidade gigantesca de energia…", "Imagine entrar em uma sala, e perceber que alguém está escondendo uma quantidade gigantesca de energia...", .45),
 ("Mesmo sem entender o que está acontecendo, seus olhos já estariam analisando tudo.", "Mesmo sem entender o que está acontecendo, seus olhos já estariam analisando tudo.", .7),
 ("Segundo, você descobriria que os Seis Olhos não criam energia infinita.", "Segundo: você descobriria que os Seis Olhos não criam energia infinita.", .4),
 ("Eles fazem algo muito mais impressionante:", "Eles fazem algo muito mais impressionante:", .25),
 ("permitem controlar a energia amaldiçoada com uma precisão extraordinária.", "permitem controlar a energia amaldiçoada com uma precisão extraordinária.", .4),
 ("O desperdício se torna praticamente insignificante.", "O desperdício se torna praticamente insignificante.", .5),
 ("E se você também herdasse a técnica Ilimitada,", "E se você também herdasse a técnica Ilimitada,", .15),
 ("poderia manipular o espaço ao seu redor,", "poderia manipular o espaço ao seu redor,", .12),
 ("criando uma defesa que impede seus inimigos de simplesmente encostarem em você.", "criando uma defesa que impede seus inimigos de simplesmente encostarem em você.", .8),
 ("Mas então você perceberia o verdadeiro problema…", "Mas então... você perceberia o verdadeiro problema...", .5),
 ("Seus olhos captariam informações constantemente, causando um enorme desgaste.", "Seus olhos captariam informações constantemente, causando um enorme desgaste.", .5),
 ("É por isso que Gojo utiliza uma venda:", "É por isso que Gôjo utiliza uma venda:", .2),
 ("ela ajuda a reduzir o esforço visual, mesmo que ele continue percebendo o ambiente.", "ela ajuda a reduzir o esforço visual, mesmo que ele continue percebendo o ambiente.", .5),
 ("Você teria uma das habilidades mais raras do mundo…", "Você teria uma das habilidades mais raras do mundo...", .35),
 ("Mas precisaria aprender a controlar tudo isso.", "Mas precisaria aprender a controlar tudo isso.", .75),
 ("Porque possuir os Seis Olhos não significa automaticamente ser o mais forte.", "Porque possuir os Seis Olhos não significa automaticamente ser o mais forte.", .4),
 ("Significa ter o potencial de se tornar alguém extraordinário.", "Significa ter o potencial de se tornar alguém extraordinário.", .7),
 ("E agora a pergunta é…", "E agora, a pergunta é...", .5),
 ("Você teria coragem de despertar esse poder?", "Você teria coragem de despertar esse poder?", 0),
]
SPEED = int(os.environ.get('SPEED', 176)); LEAD = .35  # 0.35 s de silencio no inicio
def rd(f):
    w = wave.open(f); sr = w.getframerate(); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; w.close(); return a, sr
os.makedirs('audio/_tts', exist_ok=True)
parts, ph, t = [np.zeros(int(LEAD * SR))], [], LEAD
for i, (txt, spk, gap) in enumerate(R):
    raw = f'audio/_tts/{i:02d}_raw.wav'; out = f'audio/_tts/{i:02d}.wav'
    subprocess.run(['espeak-ng', '-v', 'mb-br3', '-s', str(SPEED), '-p', '38', '-g', '2', '-w', raw, spk], check=True)
    # voz mais encorpada: leve grave, compressao, corta silencios das pontas
    subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af',
        'silenceremove=start_periods=1:start_threshold=-45dB,areverse,silenceremove=start_periods=1:start_threshold=-45dB,areverse,'
        'rubberband=pitch=0.94:formant=preserved,highpass=f=70,equalizer=f=180:t=q:w=1:g=3,equalizer=f=3200:t=q:w=1.2:g=2,'
        'acompressor=threshold=-20dB:ratio=3:attack=5:release=80,aresample=44100', '-ac', '1', out], check=True)
    a, _ = rd(out); a = a / max(1e-6, np.max(np.abs(a))) * .85
    ph.append([txt, round(t, 3), round(t + len(a) / SR, 3)])
    parts += [a, np.zeros(int(gap * SR))]; t += len(a) / SR + gap
v = np.concatenate(parts)
w = wave.open('audio/narracao.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(v, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
json.dump({'fonte': 'provisoria (espeak-ng mb-br3)', 'duracao': round(len(v) / SR, 3), 'frases': ph}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
print('narracao', round(len(v) / SR, 2), 's,', len(ph), 'frases')
