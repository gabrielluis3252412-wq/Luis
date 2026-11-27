# Narracao PROVISORIA (voz sintetizada offline: espeak-ng + MBROLA br3, portugues do Brasil).
# Gera audio/narracao.wav e roteiro.json (texto exato de cada frase + tempos reais no audio).
# Quando a narracao definitiva (ex.: ElevenLabs) estiver pronta, use alinhar.py em vez deste script.
import subprocess, json, os, wave, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
# (texto exato do roteiro [legenda], texto falado [pronuncia ajustada], pausa depois em s)
R = [
 ("E se você fosse um Saiyajin…", "E se você fosse um Saiájin...", .35),
 ("e cada derrota te deixasse mais forte que antes?", "e cada derrota te deixasse mais forte que antes?", .55),
 ("Você nasceria em uma das raças guerreiras mais temidas do universo.", "Você nasceria em uma das raças guerreiras mais temidas do universo.", .45),
 ("Desde pequeno, seria treinado para enfrentar inimigos capazes de destruir planetas inteiros.", "Desde pequeno, seria treinado para enfrentar inimigos capazes de destruir planetas inteiros.", .5),
 ("Mas seu maior diferencial seria assustador…", "Mas seu maior diferencial... seria assustador...", .55),
 ("Quando sobrevivesse a uma batalha extrema e se recuperasse,", "Quando sobrevivesse a uma batalha extrema, e se recuperasse,", .2),
 ("seu corpo poderia aumentar drasticamente o próprio poder.", "seu corpo poderia aumentar drasticamente o próprio poder.", .45),
 ("Ou seja, quanto mais difícil fosse sua jornada…", "Ou seja, quanto mais difícil fosse sua jornada...", .3),
 ("maior seria seu potencial de evolução.", "maior seria seu potencial de evolução.", .6),
 ("Mas tudo mudaria no dia em que enfrentasse um inimigo impossível de derrotar.", "Mas tudo mudaria no dia em que enfrentasse um inimigo impossível de derrotar.", .5),
 ("Seus amigos estariam em perigo…", "Seus amigos estariam em perigo...", .5),
 ("E, pela primeira vez, você sentiria uma raiva tão intensa", "E, pela primeira vez, você sentiria uma raiva tão intensa,", .15),
 ("que seu corpo começaria a liberar uma energia jamais vista.", "que seu corpo começaria a liberar uma energia jamais vista.", .55),
 ("Seu cabelo ficaria dourado.", "Seu cabelo ficaria dourado.", .4),
 ("Seus olhos mudariam.", "Seus olhos mudariam.", .4),
 ("E uma aura gigantesca explodiria ao seu redor.", "E uma aura gigantesca explodiria ao seu redor.", .5),
 ("Você teria despertado o lendário Super Saiyajin.", "Você teria despertado o lendário Super Saiájin.", .6),
 ("Só que essa transformação seria apenas o começo.", "Só que essa transformação seria apenas o começo.", .45),
 ("Com treinamento e batalhas cada vez mais difíceis,", "Com treinamento, e batalhas cada vez mais difíceis,", .15),
 ("você alcançaria poderes capazes de rivalizar com os próprios deuses.", "você alcançaria poderes capazes de rivalizar com os próprios deuses.", .5),
 ("E, no auge da sua evolução, despertaria o Instinto Superior…", "E, no auge da sua evolução, despertaria o Instinto Superior...", .45),
 ("Uma habilidade em que seu corpo reagiria sozinho, desviando de ataques quase impossíveis.", "Uma habilidade em que seu corpo reagiria sozinho, desviando de ataques quase impossíveis.", .6),
 ("Mas existe uma verdade que poucos entendem sobre os Saiyajins…", "Mas existe uma verdade que poucos entendem sobre os Saiájins...", .55),
 ("Eles não são extraordinários porque nunca são derrotados.", "Eles não são extraordinários porque nunca são derrotados.", .45),
 ("Eles são extraordinários porque, mesmo depois de cair,", "Eles são extraordinários porque, mesmo depois de cair,", .2),
 ("sempre encontram uma maneira de se tornar mais fortes.", "sempre encontram uma maneira de se tornar mais fortes.", 0),
]
SPEED = int(os.environ.get('SPEED', 180)); LEAD = .35  # 0.35 s de silencio no inicio
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
