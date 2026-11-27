# Narracao PROVISORIA (voz sintetizada offline: espeak-ng + MBROLA br3, portugues do Brasil).
# Gera audio/narracao.wav e roteiro.json com o texto de cada frase, o tempo de cada frase
# e o tempo REAL de cada palavra (eventos de palavra do proprio espeak-ng, via libespeak-ng).
# Quando a narracao definitiva (ex.: ElevenLabs) estiver pronta, use alinhar_dtw.py.
import ctypes, json, os, subprocess, wave, numpy as np
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
# (texto exato do roteiro [legenda], texto falado [pronuncia ajustada, mesmo numero de palavras], pausa depois em s)
R = [
 ("O tempo parou.", "O tempo... parou.", .55),
 ("A bala congela a centímetros do seu rosto…", "A bala congela a centímetros do seu rosto...", .35),
 ("e só você se move.", "e só você se move.", .6),
 ("E se você despertasse os poderes do Jotaro?", "E se você despertasse os poderes do Jotaro?", .7),
 ("Primeiro, um espírito estranho sairia do seu corpo.", "Primeiro, um espírito estranho sairia do seu corpo.", .4),
 ("O Jotaro achou que estava possuído e se trancou numa cela.", "O Jotaro achou que estava possuído, e se trancou numa cela.", .5),
 ("Mas era um Stand: a sua energia vital ganhando forma ao seu lado.", "Mas era um Istênd: a sua energia vital, ganhando forma ao seu lado.", .45),
 ("E o seu seria o Star Platinum.", "E o seu seria o Istár Plátinum.", .7),
 ("Ponto um: força e velocidade.", "Ponto um: força e velocidade.", .4),
 ("Na ficha oficial, ele tem nota máxima em força, velocidade e precisão.", "Na ficha oficial, ele tem nota máxima em força, velocidade e precisão.", .3),
 ("Só o alcance é curto.", "Só o alcance é curto.", .45),
 ("Num piscar de olhos, ele solta uma chuva de socos:", "Num piscar de olhos, ele solta uma chuva de socos:", .15),
 ("ORA ORA ORA!", "Óra! Óra! Óra!", .45),
 ("E pega no ar até uma bala disparada à queima-roupa.", "E pega no ar até uma bala disparada à queima-roupa.", .6),
 ("Ponto dois: precisão e visão.", "Ponto dois: precisão e visão.", .4),
 ("Ele enxerga até uma mosca minúscula escondida numa foto.", "Ele enxerga até uma mosca minúscula, escondida numa foto.", .35),
 ("Foi assim que o Jotaro descobriu que o inimigo estava no Egito.", "Foi assim que o Jotaro descobriu que o inimigo estava no Egito.", .6),
 ("Ponto três: o poder mais assustador.", "Ponto três: o poder mais assustador.", .5),
 ("Star Platinum: The World.", "Istár Plátinum: Dâ Uórld.", .75),
 ("Você para o tempo.", "Você para o tempo.", .55),
 ("Chuva, pássaros, pessoas… tudo congela.", "Chuva, pássaros, pessoas... tudo congela.", .3),
 ("Só você se move.", "Só você se move.", .5),
 ("Mas só por alguns segundos, e nunca duas vezes seguidas.", "Mas só por alguns segundos, e nunca duas vezes seguidas.", .4),
 ("Dez anos depois, o Jotaro só conseguia parar o tempo por meio segundo!", "Dez anos depois, o Jotaro só conseguia parar o tempo por meio segundo!", .6),
 ("E se o seu Stand se machucar, você sente a mesma dor.", "E se o seu Istênd se machucar, você sente a mesma dor.", .5),
 ("E usuários de Stand se atraem…", "E usuários de Istênd se atraem...", .4),
 ("Cedo ou tarde, um Stand dourado viria atrás de você.", "Cedo ou tarde, um Istênd dourado viria atrás de você.", .6),
 ("Ele também pararia o tempo…", "Ele também pararia o tempo...", .3),
 ("mas você se moveria dentro dele.", "mas você se moveria dentro dele.", .5),
 ("Você avança, passa por ele, e acerta o golpe final:", "Você avança, passa por ele, e acerta o golpe final:", .2),
 ("ORA!", "Óra!", .6),
 ("E o tempo volta a correr.", "E o tempo volta a correr.", .7),
 ("Yare yare daze.", "Iáre, iáre, dáze.", .55),
 ("Você aguentaria esse poder? Comenta: sim ou não.", "Você aguentaria esse poder? Comenta: sim ou não.", 0),
]
SPEED = int(os.environ.get('SPEED', 165)); LEAD = .18

# ---- libespeak-ng direto (para receber os eventos de palavra com a posicao no audio) ----
L = ctypes.CDLL('libespeak-ng.so.1')
class EVID(ctypes.Union): _fields_ = [('number', ctypes.c_int), ('name', ctypes.c_char_p), ('string', ctypes.c_char * 8)]
class EV(ctypes.Structure): _fields_ = [('type', ctypes.c_int), ('unique_identifier', ctypes.c_uint), ('text_position', ctypes.c_int), ('length', ctypes.c_int),
                                       ('audio_position', ctypes.c_int), ('sample', ctypes.c_int), ('user_data', ctypes.c_void_p), ('id', EVID)]
CB = ctypes.CFUNCTYPE(ctypes.c_int, ctypes.POINTER(ctypes.c_short), ctypes.c_int, ctypes.POINTER(EV))
L.espeak_Initialize.restype = ctypes.c_int
L.espeak_Synth.argtypes = [ctypes.c_void_p, ctypes.c_size_t, ctypes.c_uint, ctypes.c_int, ctypes.c_uint, ctypes.c_uint, ctypes.c_void_p, ctypes.c_void_p]
base_sr = L.espeak_Initialize(2, 0, None, 0)  # AUDIO_OUTPUT_SYNCHRONOUS
BUF, EVS, RATE = [], [], [base_sr]
def _cb(wav, n, ev):
    if wav and n > 0: BUF.append(np.ctypeslib.as_array(wav, shape=(n,)).astype(np.float64) / 32768)
    i = 0
    while ev[i].type != 0:
        e = ev[i]
        if e.type in (1, 7): EVS.append((e.text_position, e.length, e.audio_position))  # palavra / fonema (MBROLA so manda fonemas)
        elif e.type == 8: RATE[0] = e.id.number
        i += 1
    return 0
_c = CB(_cb); L.espeak_SetSynthCallback(_c)
if L.espeak_SetVoiceByName(b'mb-br3') != 0: raise SystemExit('voz mb-br3 nao encontrada (apt-get install espeak-ng mbrola mbrola-br3)')
L.espeak_SetParameter(1, SPEED, 0); L.espeak_SetParameter(3, 38, 0); L.espeak_SetParameter(7, 2, 0)
def synth(text):
    BUF.clear(); EVS.clear(); b = text.encode('utf-8') + b'\0'
    L.espeak_Synth(b, len(b), 0, 1, 0, 1, None, None); L.espeak_Synchronize()
    return (np.concatenate(BUF) if BUF else np.zeros(10)), list(EVS), RATE[0]

def tokens(s):  # palavras (separadas por espaco) com a posicao do 1o caractere
    out, i = [], 0
    for w in s.split(' '):
        if w: out.append((w, i))
        i += len(w) + 1
    return out
def ff(a, sr_in, af):
    p = subprocess.run(['ffmpeg', '-v', 'error', '-f', 'f32le', '-ar', str(sr_in), '-ac', '1', '-i', '-', '-af', af, '-ar', str(SR), '-ac', '1', '-f', 'f32le', '-'],
                       input=a.astype(np.float32).tobytes(), capture_output=True, check=True)
    return np.frombuffer(p.stdout, dtype=np.float32).astype(np.float64)
AF = ('rubberband=pitch=0.94:formant=preserved,highpass=f=70,equalizer=f=180:t=q:w=1:g=3,equalizer=f=3200:t=q:w=1.2:g=2,'
      'acompressor=threshold=-20dB:ratio=3:attack=5:release=80')
parts, ph, pw, t = [np.zeros(int(LEAD * SR))], [], [], LEAD
for txt, spk, gap in R:
    raw, ev, sr = synth(spk); a = ff(raw, sr, AF)
    env = np.convolve(np.abs(a), np.ones(441) / 441, 'same'); on = np.where(env > .012 * env.max())[0]
    i0, i1 = (on[0], on[-1] + 1) if len(on) else (0, len(a)); a = a[i0:i1]; off = i0 / SR; dur = len(a) / SR
    a = a / max(1e-6, np.max(np.abs(a))) * .85
    st = [max(0., e[2] / 1000 - off) for e in ev]
    dw, sw = txt.split(), [w for w, _ in tokens(spk)]
    if len(dw) != len(sw): raise SystemExit(f'numero de palavras diferente: {txt!r} x {spk!r}')
    toks = tokens(spk); ws = [None] * len(toks)
    for (tp, ln, ap), s0 in zip(ev, st):   # 1o evento cuja posicao no texto e o inicio da palavra
        for j, (w, c) in enumerate(toks):
            if tp == c + 1 and ws[j] is None: ws[j] = s0
    for j in range(len(ws)):               # palavras sem evento: interpola
        if ws[j] is None: ws[j] = ws[j - 1] + .12 if j else 0.
    ws[0] = 0.
    for j in range(1, len(ws)): ws[j] = min(max(ws[j], ws[j - 1] + .05), dur - .05)
    words = [[dw[j], round(t + ws[j], 3), round(t + (ws[j + 1] - .02 if j + 1 < len(ws) else dur), 3)] for j in range(len(ws))]
    ph.append([txt, round(t, 3), round(t + dur, 3)]); pw.append(words)
    parts += [a, np.zeros(int(gap * SR))]; t += dur + gap
v = np.concatenate(parts)
os.makedirs('audio/provisoria', exist_ok=True)
for f in ('audio/narracao.wav', 'audio/provisoria/narracao.wav'):
    w = wave.open(f, 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(v, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
R2 = {'fonte': 'provisoria (espeak-ng mb-br3)', 'duracao': round(len(v) / SR, 3), 'frases': ph, 'palavras': pw}
for f in ('roteiro.json', 'audio/provisoria/roteiro.json'): json.dump(R2, open(f, 'w'), ensure_ascii=False, indent=1)
for (p, a, b), ws in zip(ph, pw): print(f'{a:6.2f}-{b:6.2f}  {p}')
print('narracao', round(len(v) / SR, 2), 's,', len(ph), 'frases | eventos de palavra ok')
