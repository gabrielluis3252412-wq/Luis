# Efeitos sonoros (sintetizados) + ambiencias + trilha original (rock/funk com metais, estilo anime),
# mixados SOB a narracao (a voz fica intacta e na frente). Saida: audio/mix_final.wav
import numpy as np, wave, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
rng = np.random.default_rng(7)
D = json.load(open('sfx.json')); TOTAL = D['total']; N = int(TOTAL * SR)
CUE = {k: t for t, k, v in D['sfx'] if k.startswith('M_')}
SFX = [s for s in D['sfx'] if not s[1].startswith('M_')]
def T(d): return np.arange(int(d * SR)) / SR
def noise(n): return rng.standard_normal(n)
def filt(x, lo=None, hi=None, order=2):
    X = np.fft.rfft(x); f = np.fft.rfftfreq(len(x), 1 / SR); g = np.ones_like(f)
    if hi: g *= 1 / np.sqrt(1 + (f / hi) ** (2 * order))
    if lo: g *= 1 / np.sqrt(1 + (lo / np.maximum(f, 1e-3)) ** (2 * order))
    return np.fft.irfft(X * g, len(x))
def norm(x, p=1.0): m = np.max(np.abs(x)); return x / m * p if m > 0 else x
def dec(n, k): return np.exp(-np.linspace(0, k, n))
def att(n, a=.01):
    e = np.ones(n); k = max(1, int(a * SR)); e[:k] = np.linspace(0, 1, k); return e
def fadeout(x, d=.05):
    k = min(len(x), int(d * SR)); x = x.copy(); x[-k:] *= np.linspace(1, 0, k); return x
def osc(f, d, kind='sin', ph=0):
    t = T(d); f = np.broadcast_to(f, t.shape); p = 2 * np.pi * np.cumsum(f) / SR + ph
    if kind == 'sin': return np.sin(p)
    if kind == 'saw': return 2 * ((p / (2 * np.pi)) % 1) - 1
    if kind == 'sq': return np.sign(np.sin(p))
    if kind == 'tri': return 2 * np.abs(2 * ((p / (2 * np.pi)) % 1) - 1) - 1
def reverb(x, d=1.6, mix=.3):
    n = int(d * SR); ir = noise(n) * np.exp(-np.linspace(0, 7, n)); ir = filt(ir, hi=5000)
    L = len(x) + n; y = np.fft.irfft(np.fft.rfft(x, L) * np.fft.rfft(ir, L), L)
    y = norm(y, np.max(np.abs(x)) * .9)
    out = np.zeros(len(x) + n); out[:len(x)] += x * (1 - mix); out += y * mix; return out
def bell(n): return np.sin(np.linspace(0, np.pi, n))

# ---------------- EFEITOS ----------------
def whoosh(d=.45, hi=4000):
    n = int(d * SR); e = bell(n) ** 1.6
    a = filt(noise(n), lo=300, hi=hi * .4); b = filt(noise(n), lo=800, hi=hi)
    w = np.linspace(0, 1, n); return norm((a * (1 - w) + b * w) * e, .8)
def swish(): return whoosh(.22, 7000) * .8
def zoom():
    d = .45; n = int(d * SR); x = filt(noise(n), lo=500, hi=6000) * np.linspace(0, 1, n) ** 2
    return norm(x + .4 * osc(np.linspace(150, 1100, n), d) * np.linspace(0, 1, n) ** 2, .8) * att(n, .01)
def flash():
    d = .7; n = int(d * SR); return norm(osc(np.linspace(110, 35, n), d) * dec(n, 6) + .4 * filt(noise(n), lo=3000) * dec(n, 10), .9)
def dark():
    d = 1.0; n = int(d * SR); return norm(osc(np.linspace(70, 40, n), d) * bell(n) + .3 * filt(noise(n), hi=600) * bell(n), .7)
def hit():
    d = 2.2; n = int(d * SR)
    sub = osc(55 * np.exp(-np.linspace(0, 1.6, n)) + 28, d) * dec(n, 4)
    bang = filt(noise(n), hi=1800) * dec(n, 18); top = filt(noise(n), lo=2500) * dec(n, 30)
    return norm(reverb(sub * 1.2 + bang * .9 + top * .3, 1.8, .35), 1)
def boom():  # impacto cinematografico grave
    d = 3.0; n = int(d * SR)
    sub = osc(48 * np.exp(-np.linspace(0, 1.2, n)) + 22, d) * dec(n, 2.6)
    body = filt(noise(n), hi=900) * dec(n, 9); crack = filt(noise(n), lo=3000) * dec(n, 40)
    return norm(reverb(sub * 1.4 + body * .7 + crack * .25, 2.4, .4), 1)
def eye_open():  # "shing" brilhante + brilho cristalino
    d = 1.8; n = int(d * SR); x = np.zeros(n)
    for f in (1760, 2637, 3520, 5274):
        x += osc(f * (1 + .003 * np.sin(2 * np.pi * 7 * T(d))), d) * dec(n, 3.2) * .25
    x += filt(noise(n), lo=4000) * dec(n, 18) * .6 + osc(np.linspace(300, 1400, n), d) * dec(n, 10) * .3
    return norm(reverb(x, 1.6, .45), .8)
def shimmer():
    d = 2.0; n = int(d * SR); x = np.zeros(n)
    for k in range(16):
        f = 2000 + rng.random() * 5000; s0 = int(rng.random() * .9 * SR); L = int(.5 * SR)
        x[s0:s0 + L] += osc(f, .5) * dec(L, 7) * .25
    return norm(reverb(x * bell(n) ** .3, 1.8, .5), .5)
def scan():  # sonar de varredura
    d = 1.2; n = int(d * SR); x = osc(np.linspace(900, 2400, n), d) * dec(n, 5) * .6 + filt(noise(n), lo=2000, hi=8000) * dec(n, 6) * .3
    return norm(reverb(x, 1.2, .4), .6)
def sonar():
    d = 2.2; n = int(d * SR); x = osc(1320, d) * dec(n, 4) + .4 * osc(2640, d) * dec(n, 7)
    return norm(reverb(x, 2, .55), .55)
def energy():  # energia amaldicoada subindo
    d = 2.2; n = int(d * SR); t = T(d); w = t / d
    x = sum(osc(f * (1 + .4 * w), d, 'saw') for f in (110, 165, 220.5)) / 3
    x = (filt(x, hi=900) * (1 - w) + filt(x, hi=3400) * w) * (.4 + .6 * w) * bell(n) ** .5 + filt(noise(n), lo=2500, hi=7000) * .25 * w * bell(n)
    return norm(x, .6)
def energy_dark():
    d = 3.0; n = int(d * SR); t = T(d)
    x = sum(osc(f * (1 + .01 * np.sin(2 * np.pi * (3 + k) * t)), d, 'saw') for k, f in enumerate((55, 58.3, 82.4, 116.5))) / 4
    x = filt(x, hi=700) * att(n, .05) * dec(n, 1.6) + filt(noise(n), lo=200, hi=1200) * dec(n, 3) * .4
    return norm(reverb(x, 2, .35), .9)
def aura():
    d = .9; n = int(d * SR); return norm(filt(noise(n), lo=400, hi=3500) * bell(n) ** 2 + .3 * osc(np.linspace(300, 700, n), d) * bell(n), .5)
def riser_s():
    d = 1.2; n = int(d * SR); w = np.linspace(0, 1, n)
    x = filt(noise(n), lo=1000, hi=9000) * w ** 3 + .5 * osc(np.linspace(200, 1600, n), d, 'saw') * w ** 3 * .3
    return norm(x * fadeout(np.ones(n), .03), .7)
def charge():
    d = 1.6; n = int(d * SR); w = np.linspace(0, 1, n); x = osc(220 + 900 * w ** 2, d, 'tri') * w ** 1.5 + filt(noise(n), lo=3000) * w ** 2 * .3
    return norm(x * fadeout(np.ones(n), .05), .5)
def hum():  # zumbido da barreira (Ilimitado)
    d = 4.0; n = int(d * SR); t = T(d)
    x = osc(82.4, d) * .6 + osc(164.8 * (1 + .002 * np.sin(2 * np.pi * .7 * t)), d) * .3 + osc(329.6, d, 'tri') * .08
    x *= (1 + .25 * np.sin(2 * np.pi * 5 * t)); return norm(x * att(n, .3) * fadeout(np.ones(n), .8), .5)
def warp():  # espaco dobrando: sweep descendente + reverso
    d = 2.2; n = int(d * SR); w = np.linspace(0, 1, n)
    x = osc(np.linspace(1400, 60, n) ** 1, d, 'saw') * dec(n, 2.5) * .4 + filt(noise(n), lo=300, hi=5000) * dec(n, 3) * .5
    rev = (filt(noise(n), lo=500, hi=6000) * w ** 3)[::-1] * .4
    return norm(reverb(filt(x, hi=4000) + rev, 2, .45), .9)
def ripple():
    d = .9; n = int(d * SR); x = osc(np.linspace(700, 250, n), d) * dec(n, 6) + .5 * osc(np.linspace(1400, 500, n), d) * dec(n, 9)
    return norm(reverb(x * (1 + .5 * np.sin(2 * np.pi * 18 * T(d))), 1, .4), .55)
def impact():
    d = 1.2; n = int(d * SR); x = osc(np.linspace(120, 40, n), d) * dec(n, 7) + filt(noise(n), hi=2500) * dec(n, 20) * .6
    return norm(reverb(x, 1.2, .3), .9)
def slowmo():
    d = 1.5; n = int(d * SR); x = filt(noise(n), lo=200, hi=3000) * np.linspace(1, 0, n) ** 2 + osc(np.linspace(400, 60, n), d) * dec(n, 2) * .5
    return norm(reverb(x, 1.8, .5), .7)
def monster():
    d = 2.0; n = int(d * SR); t = T(d); f = 70 + 20 * np.sin(2 * np.pi * 2.2 * t)
    x = filt(osc(f, d, 'saw') * (1 + .8 * filt(noise(n), hi=60) * 6), hi=1200) * att(n, .05) * fadeout(np.ones(n), .5)
    x += filt(noise(n), lo=500, hi=3000) * bell(n) * .3
    return norm(reverb(x, 1.5, .3), .9)
def stamp():  # carimbo / cartela
    d = 1.0; n = int(d * SR); x = osc(np.linspace(160, 50, n), d) * dec(n, 9) + filt(noise(n), hi=3000) * dec(n, 25) * .7
    return norm(reverb(x, .9, .25), .9)
def tick():
    d = .06; n = int(d * SR); return norm(filt(noise(n), lo=2500, hi=7000) * dec(n, 40) + .5 * osc(2400, d) * dec(n, 60), .6)
def data():  # bipes digitais
    d = .07; n = int(d * SR); f = 1200 + 2400 * rng.random(); return norm(osc(f, d, 'sq') * dec(n, 12) * .5, .35)
def glitch():
    d = .35; n = int(d * SR); x = np.zeros(n)
    for k in range(7):
        s0 = int(rng.random() * .3 * SR); L = int(.02 * SR + rng.random() * .04 * SR)
        g = osc(200 + rng.random() * 3000, L / SR + .01, 'sq'); seg = x[s0:s0 + L]; seg += g[:len(seg)] * .5
    return norm(x + filt(noise(n), lo=3000) * .2 * dec(n, 8), .55)
def tinnitus():
    d = 2.4; n = int(d * SR); return norm(osc(7040, d) * bell(n) ** .4 * .5, .3)
def pop():
    d = .13; n = int(d * SR); return norm(osc(np.linspace(380, 1000, n), d) * dec(n, 9) + .3 * filt(noise(n), lo=3000) * dec(n, 60), .7)
def question():
    d = .4; n = int(d * SR); return norm(osc(np.linspace(500, 900, n), d, 'tri') * dec(n, 5), .45)
def ding():
    d = 1.4; n = int(d * SR); return norm(reverb((osc(1568, d) + .4 * osc(3136, d) + .2 * osc(4704, d)) * dec(n, 4), 1.2, .35), .6)
def chime():
    out = np.zeros(int(1.8 * SR))
    for k, f in enumerate((1175, 1397, 1760, 2349)):
        s = (osc(f, 1) + .3 * osc(2 * f, 1)) * dec(SR, 5) * .3; o = int(k * .07 * SR); out[o:o + SR] += s
    return norm(reverb(out, 1.2, .35), .55)
def sting_low():
    d = 3.0; n = int(d * SR); x = np.zeros(n)
    for f in (55, 58.3, 82.4, 87.3, 110): x += osc(f, d, 'saw') * .3
    x = filt(x, hi=900) * att(n, .03) * dec(n, 2.2); x += osc(40, d) * dec(n, 3) * .8
    return norm(reverb(x, 2, .3), .9)
def heart():
    o = np.zeros(int(.7 * SR))
    for t0, a in ((0, 1), (.2, .7)):
        d = .22; s = osc(np.linspace(70, 40, int(d * SR)), d) * dec(int(d * SR), 9) * a; i = int(t0 * SR); o[i:i + len(s)] += s
    return norm(filt(o, hi=300), .9)
def step():
    d = .16; n = int(d * SR); return norm(osc(np.linspace(80, 45, n), d) * dec(n, 10) + filt(noise(n), hi=900) * dec(n, 30) * .6, .5)
def cloth():  # venda deslizando / amarrando
    d = .7; n = int(d * SR); e = bell(n) ** 1.2 * (1 + .6 * np.sin(2 * np.pi * 9 * T(d)))
    return norm(filt(noise(n), lo=1500, hi=7000) * e, .5)
def breath():
    d = 1.6; n = int(d * SR); e = np.concatenate([bell(n // 2) ** 2, bell(n - n // 2) ** 2 * .8])
    return norm(filt(noise(n), lo=300, hi=2500) * e, .3)
def final():
    d = 3.0; n = int(d * SR); x = sum(osc(f, d, 'saw') for f in (73.4, 110, 146.8, 174.6)) / 4
    return norm(reverb(filt(x, hi=1400) * att(n, .01) * dec(n, 1.8) + boom()[:n] * .7, 2.4, .4), .95)
def click():
    d = .12; n = int(d * SR); return norm(filt(noise(n), lo=1500, hi=8000) * dec(n, 40) + osc(np.linspace(1800, 900, n), d) * dec(n, 25) * .6, .7)
def bell_ring():  # sino de notificacao
    d = 2.2; n = int(d * SR); t = T(d); x = np.zeros(n)
    for k, t0 in enumerate((0, .16, .32)):
        i = int(t0 * SR); L = n - i
        for f, g in ((1318.5, 1), (2637, .35), (3520, .25), (4186, .15)):
            x[i:] += osc(f * (1 + .002 * k), L / SR)[:L] * np.exp(-np.linspace(0, 6, L)) * g * (1 - .25 * k)
    return norm(reverb(x, 1.2, .3), .6)
def lock_rattle():
    o = np.zeros(int(.9 * SR))
    for k in range(6):
        d = .05; s = filt(noise(int(d * SR)), lo=2500, hi=9000) * dec(int(d * SR), 20) + osc(3200 + 400 * k, d) * dec(int(d * SR), 30) * .4
        i = int(k * .13 * SR); o[i:i + len(s)] += s
    return norm(o, .5)
def unlock():
    d = 1.0; n = int(d * SR); x = osc(np.linspace(400, 1600, n), d, 'tri') * dec(n, 5) * .5 + filt(noise(n), lo=3000) * dec(n, 30) * .5
    return norm(reverb(x + shimmer()[:n] * .6, 1.2, .35), .7)
def sparkle(): return shimmer() * .8
# ambiencias
def babble():  # "voz" de desenho do Cibito (silabas sem palavras, timbre agudo)
    out = np.zeros(int(.75 * SR)); t0 = 0
    for k in range(4 + int(rng.random() * 2)):
        d = .07 + rng.random() * .06; n = int(d * SR); t = T(d); f0 = 430 + 160 * rng.random()
        f = f0 * (1 + .25 * np.sin(np.pi * t / d)); src = osc(f, d, 'saw')
        F1, F2 = [(800, 1200), (500, 1700), (350, 2300), (650, 1000), (400, 800)][int(rng.random() * 5)]
        v = filt(src, lo=F1 * .7, hi=F1 * 1.4) + .6 * filt(src, lo=F2 * .8, hi=F2 * 1.25)
        i = int(t0 * SR); out[i:i + n] += v[:len(out) - i] * np.sin(np.pi * t / d) ** .6; t0 += d + .015
        if t0 > .66: break
    return norm(reverb(out, .5, .15), .55)
def energy_pulse():
    d = .7; n = int(d * SR); return norm(osc(np.linspace(90, 50, n), d) * dec(n, 6) + filt(noise(n), lo=2000, hi=7000) * bell(n) * .3, .6)
def whoosh_soft(): return whoosh(.5, 3000) * .7
def roar():  # grito de poder (energia + rugido grave, sem voz)
    d = 2.2; n = int(d * SR); t = T(d); x = filt(osc(95 + 25 * np.sin(2 * np.pi * 3 * t), d, 'saw') * (1 + .5 * filt(noise(n), hi=60) * 5), hi=1500)
    return norm(reverb(x * att(n, .1) * fadeout(np.ones(n), .6) + energy()[:n] * .5, 1.5, .3), .8)
def zap():
    d = .25; n = int(d * SR); return norm(filt(noise(n), lo=2500, hi=9000) * dec(n, 14) * (np.sin(2 * np.pi * 70 * T(d)) > 0), .45)
def thunder():
    d = 3.2; n = int(d * SR); x = filt(noise(n), hi=300) * dec(n, 2.5) * (1 + .6 * np.sin(2 * np.pi * 3 * T(d)))
    c = filt(noise(n), lo=1500) * dec(n, 25) * .5; return norm(reverb(x + c, 1.5, .3), .9)
def glass():
    o = np.zeros(int(1.2 * SR))
    for k in range(14):
        f = 3000 + rng.random() * 5000; d = .25; s_ = osc(f, d) * dec(int(d * SR), 14) * (.3 + .4 * rng.random())
        i = int(rng.random() * .7 * SR); o[i:i + len(s_)] += s_
    return norm(o, .45)
def sting_hi():
    d = 1.6; n = int(d * SR); t = T(d); x = np.zeros(n)
    for f in (1661, 1760, 1865, 2217): x += osc(f * (1 + .006 * np.sin(2 * np.pi * 6.5 * t)), d, 'saw')
    x = filt(x, lo=900, hi=6000) * att(n, .02) * dec(n, 2.5)
    return norm(reverb(x, 1.2, .35), .55)
def punch():  # soco: estalo seco + baque grave
    d = .7; n = int(d * SR); t = T(d)
    thud = osc(np.linspace(140, 45, n), d) * dec(n, 9); crack = filt(noise(n), lo=1800, hi=9000) * dec(n, 45)
    body = filt(noise(n), lo=150, hi=1200) * dec(n, 16)
    return norm(reverb(thud * 1.2 + crack * .9 + body * .7, .6, .18), .95)
def whiff():  # braco cortando o ar
    d = .22; n = int(d * SR); e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return norm(filt(noise(n), lo=1200, hi=7000) * e * np.linspace(.4, 1, n), .6)
def block():  # defesa: impacto abafado + vibracao
    d = .6; n = int(d * SR); x = osc(np.linspace(220, 90, n), d, 'tri') * dec(n, 10) + filt(noise(n), lo=600, hi=4000) * dec(n, 25) * .8
    return norm(reverb(x, .5, .2), .85)
def clash():  # choque de punhos: explosao + estalo + cauda
    d = 2.4; n = int(d * SR); x = punch()[:n] if len(punch()) >= n else np.pad(punch(), (0, n - len(punch())))
    x = x + osc(np.linspace(70, 28, n), d) * dec(n, 2.6) * 1.2 + filt(noise(n), hi=2500) * dec(n, 5) * .6
    return norm(reverb(x, 1.8, .35), 1)
def amb_night(d):
    n = int(d * SR); t = T(d); cr = osc(4600, d) * ((np.sin(2 * np.pi * 28 * t) > .2) * (np.sin(2 * np.pi * .9 * t) > 0)) * .04
    return cr + filt(noise(n), lo=80, hi=400) * .12
def amb_town(d):
    n = int(d * SR); x = filt(noise(n), lo=100, hi=700) * .12
    for k in range(int(d / 1.4)):
        L = int(.09 * SR); b = osc(np.linspace(3200, 4400, L), .09) * bell(L) * .06; i = int(rng.random() * max(.1, d - .2) * SR); x[i:i + L] += b[:len(x[i:i + L])]
    return x
def amb_room(d):
    n = int(d * SR); return filt(noise(n), lo=60, hi=300) * .1 + osc(60, d) * .015
def amb_space(d):
    n = int(d * SR); t = T(d); x = osc(55, d) * .3 + osc(82.7, d) * .2 + osc(110.4, d, 'tri') * .05
    x += filt(noise(n), lo=2500, hi=6000) * .05 * (1 + np.sin(2 * np.pi * .2 * t)); return x * np.minimum(1, t / 1.0) * .35
def wind(d):
    n = int(d * SR); t = T(d); return filt(noise(n), lo=150, hi=900) * (.5 + .5 * np.sin(2 * np.pi * .17 * t + 1)) * .22
def drone(d):
    n = int(d * SR); t = T(d); x = osc(55, d) * .5 + osc(55.8, d) * .5 + osc(110.6, d, 'tri') * .15 + filt(noise(n), lo=3000, hi=6000) * .03 * (1 + np.sin(2 * np.pi * .3 * t))
    return x * np.minimum(1, t / 1.0) * .25

# ---------- efeitos novos (Jotaro / Star Platinum) ----------
def tstop():  # o tempo para: sucao reversa -> "DONG" grave com brilho de vidro -> cauda longa
    d = 4.0; n = int(d * SR); t = T(d); x = np.zeros(n)
    sw = int(.55 * SR); w = np.linspace(0, 1, sw) ** 3
    x[:sw] += filt(noise(sw), lo=400, hi=7000) * w * .6 + osc(np.linspace(80, 900, sw), sw / SR, 'saw')[:sw] * w * .15
    i = sw; L = n - i; tt = np.arange(L) / SR
    dong = sum(osc(f, (L + 2) / SR)[:L] * np.exp(-tt * k) * g for f, k, g in ((55, 1.1, 1), (110.5, 1.6, .5), (164, 2.2, .3), (220.7, 3, .25), (331, 4, .15)))
    x[i:] += dong * .9 + filt(noise(L), lo=3000) * np.exp(-tt * 9) * .3
    gl = np.zeros(L)
    for k in range(10):
        f = 2500 + rng.random() * 4000; s0 = int(rng.random() * .4 * SR); LL = int(.8 * SR)
        gl[s0:s0 + LL] += osc(f, .8)[:len(gl[s0:s0 + LL])] * dec(LL, 5)[:len(gl[s0:s0 + LL])] * .12
    x[i:] += gl
    return norm(reverb(x, 3.0, .45), 1)
def tstop_short():
    x = tstop(); n = int(1.2 * SR); return x[:n] * np.linspace(1, 0, n) ** .5
def tresume():  # o tempo volta: varredura reversa subindo + estalo
    d = 1.4; n = int(d * SR); w = np.linspace(0, 1, n)
    x = filt(noise(n), lo=600, hi=8000) * w ** 2.5 + osc(np.linspace(150, 1600, n), d, 'saw') * w ** 3 * .25
    x = x * fadeout(np.ones(n), .02); k = int(.25 * SR); snap = filt(noise(k), lo=1500) * dec(k, 25) + osc(np.linspace(300, 60, k), .25) * dec(k, 12)
    return norm(np.concatenate([x, snap * .8]), .9)
def tresume_short():
    x = tresume(); return x[int(.8 * SR):]
def bullet_whiz():
    d = 1.0; n = int(d * SR); t = T(d); f = 1800 * np.exp(-t * 1.2) + 500
    return norm(filt(noise(n), lo=1500, hi=6000) * bell(n) ** 2 * .5 + osc(f, d) * bell(n) ** 3 * .25, .6)
def ting():  # bala presa nos dedos: metal agudo
    d = 1.5; n = int(d * SR); x = sum(osc(f, d) * dec(n, k) * g for f, k, g in ((3150, 6, 1), (4790, 8, .6), (6620, 10, .4), (8300, 12, .2)))
    return norm(reverb(x + filt(noise(n), lo=5000) * dec(n, 60) * .5, 1.0, .3), .55)
def rumble():  # "ゴゴゴ": ronco grave tremulando
    d = 2.6; n = int(d * SR); t = T(d); x = filt(noise(n), lo=30, hi=180) * (1 + .7 * np.sin(2 * np.pi * 7 * t)) + osc(41, d) * .4 * (1 + .5 * np.sin(2 * np.pi * 7 * t))
    return norm(x * att(n, .2) * fadeout(np.ones(n), .7), .85)
def ghost():  # espirito saindo do corpo
    d = 2.4; n = int(d * SR); t = T(d); x = sum(osc(f * (1 + .02 * np.sin(2 * np.pi * 4 * t + k)), d) for k, f in enumerate((330, 392, 466, 554))) / 4
    return norm(reverb(x * bell(n) ** .6 * (1 + .4 * np.sin(2 * np.pi * 9 * t)) + filt(noise(n), lo=800, hi=4000) * bell(n) * .2, 2, .55), .55)
def clang():  # grade da cela batendo
    d = 2.0; n = int(d * SR); x = sum(osc(f, d) * dec(n, k) * g for f, k, g in ((187, 2.5, 1), (412, 3.5, .7), (733, 5, .5), (1121, 6, .35), (1687, 8, .25)))
    return norm(reverb(x + filt(noise(n), lo=1000) * dec(n, 40) * .8, 1.6, .35), .95)
def buzzer():  # erro / bloqueado
    d = .6; n = int(d * SR); return norm(filt(osc(110, d, 'sq') + osc(116, d, 'sq'), hi=2000) * att(n, .01) * fadeout(np.ones(n), .05), .55)
def creak():  # letreiro rangendo antes de cair
    d = 1.2; n = int(d * SR); t = T(d); f = 300 + 120 * np.sin(2 * np.pi * 1.3 * t)
    return norm(filt(osc(f, d, 'saw') * (np.sin(2 * np.pi * 23 * t) > .3), lo=200, hi=2500) * bell(n), .5)
def rush():  # ORA ORA ORA: dezenas de socos por segundo
    d = 1.9; n = int(d * SR); x = np.zeros(n); p = punch(); i = 0; k = 0
    while i < n - 100:
        g = .5 + .5 * rng.random(); L = min(len(p), n - i); x[i:i + L] += p[:L] * g; i += int((.045 + .03 * rng.random()) * SR); k += 1
    return norm(x * (.6 + .4 * np.linspace(0, 1, n)), 1)
def debris():  # pedacos caindo
    o = np.zeros(int(1.6 * SR))
    for k in range(18):
        d = .08 + .1 * rng.random(); L = int(d * SR); s_ = filt(noise(L), lo=300 + 2000 * rng.random(), hi=6000) * dec(L, 12) + osc(200 + 600 * rng.random(), d) * dec(L, 18) * .4
        i = int(rng.random() * 1.3 * SR); o[i:i + L] += s_[:len(o[i:i + L])] * (.3 + .7 * rng.random())
    return norm(o, .7)
def gunshot():
    d = 1.6; n = int(d * SR); x = filt(noise(n), lo=800, hi=9000) * dec(n, 35) * 1.2 + osc(np.linspace(160, 50, n), d) * dec(n, 14)
    return norm(reverb(x, 1.4, .35), 1)
def buzz():  # mosca
    d = 1.8; n = int(d * SR); t = T(d); f = 190 + 25 * np.sin(2 * np.pi * 3.3 * t)
    return norm(filt(osc(f, d, 'saw'), lo=150, hi=3000) * (1 + .6 * np.sin(2 * np.pi * 37 * t)) * bell(n) ** .5, .45)
def scribble():  # lapis em alta velocidade
    d = 2.4; n = int(d * SR); t = T(d); e = (np.sin(2 * np.pi * 14 * t) > -.2) * (.6 + .4 * np.sin(2 * np.pi * 3 * t))
    return norm(filt(noise(n), lo=2500, hi=9000) * e * fadeout(np.ones(n), .2), .45)
def pin():
    return norm(np.concatenate([stamp()[:int(.3 * SR)] * .8, np.zeros(int(.02 * SR))]) , .8)
def gold():  # brilho dourado do Stand rival
    d = 2.4; n = int(d * SR); x = np.zeros(n)
    for k, f in enumerate((587, 740, 880, 1175, 1480)):
        i = int(k * .06 * SR); L = n - i; x[i:] += osc(f, (L + 2) / SR)[:L] * np.exp(-np.linspace(0, 4, L)) * .25
    e = energy(); e = np.pad(e, (0, max(0, n - len(e))))[:n]
    return norm(reverb(x + e * .3, 1.8, .45), .6)
def dash():  # arrancada
    d = .7; n = int(d * SR); w = np.linspace(0, 1, n); return norm(filt(noise(n), lo=500, hi=6000) * np.sin(np.pi * w) ** .7 + osc(np.linspace(90, 40, n), d) * dec(n, 6) * .6, .85)
def mega_punch():  # golpe final: soco + explosao + subgrave
    d = 3.5; n = int(d * SR); p = punch(); x = np.zeros(n); x[:len(p)] += p * 1.2
    x += osc(np.linspace(65, 24, n), d) * dec(n, 1.8) * 1.3 + filt(noise(n), hi=1800) * dec(n, 4) * .7 + filt(noise(n), lo=3000) * dec(n, 20) * .4
    return norm(reverb(x, 2.4, .35), 1)
def twinkle():  # "brilho" do rival sumindo no ceu
    d = 1.2; n = int(d * SR); x = osc(2637, d) * dec(n, 5) + osc(3951, d) * dec(n, 7) * .6 + osc(5274, d) * dec(n, 9) * .4
    return norm(reverb(x, 1.2, .4), .5)
def birds():
    o = np.zeros(int(1.8 * SR))
    for k in range(7):
        d = .12; L = int(d * SR); f0 = 2500 + 1500 * rng.random(); s_ = osc(np.linspace(f0, f0 * 1.3, L), d) * bell(L) * .5
        i = int(rng.random() * 1.5 * SR); o[i:i + L] += s_[:len(o[i:i + L])]
    return norm(o + filt(noise(len(o)), lo=1000, hi=4000) * bell(len(o)) * .3 * np.sin(np.linspace(0, 60, len(o))) ** 2, .5)
def amb_rain(d):
    n = int(d * SR); x = filt(noise(n), lo=800, hi=7000) * .16 + filt(noise(n), lo=100, hi=500) * .06
    for k in range(int(d * 18)):
        L = int(.01 * SR); i = int(rng.random() * max(.1, d - .02) * SR); x[i:i + L] += filt(noise(L), lo=2000)[:len(x[i:i + L])] * .15 * rng.random()
    return x

AMB = {'amb_rain': amb_rain, 'amb_night': amb_night, 'amb_town': amb_town, 'amb_room': amb_room, 'amb_space': amb_space, 'wind': wind, 'drone': drone}
G = {k: v for k, v in globals().items() if callable(v) and k in {s[1] for s in SFX} and k not in AMB}

CUTS = sorted(set(round(c, 3) for c in D['cuts']) | {TOTAL})
fx = np.zeros(N); amb = np.zeros(N); cache = {}
def add(buf, t, s, v):
    i = int(max(0, t) * SR); e = min(N, i + len(s)); buf[i:e] += s[:e - i] * v
for t, k, v in SFX:
    if k in AMB:
        nxt = [c for c in CUTS if c > t + .3]; end = nxt[0] if nxt else TOTAL
        s = AMB[k](end - t + .35); k2 = int(.35 * SR); s[-k2:] *= np.linspace(1, 0, k2); s[:int(.2 * SR)] *= np.linspace(0, 1, int(.2 * SR))
        add(amb, t, s, v)
    else:
        if k not in cache or k in ('data', 'babble'): cache[k] = G[k]()
        add(fx, t, cache[k], v)


def hz(m): return 440 * 2 ** ((m - 69) / 12)
def note(m, d, kind='pluck'):
    n = int(d * SR); t = T(d); f = hz(m)
    if kind == 'pluck': return (osc(f, d) + .4 * osc(2 * f, d) + .15 * osc(3 * f, d)) * np.minimum(1, t / .004) * np.exp(-6 * t)
    if kind == 'bell': return (osc(f, d) + .35 * osc(2.76 * f, d) + .2 * osc(5.4 * f, d)) * np.minimum(1, t / .002) * np.exp(-3 * t)
    if kind == 'piano': return (osc(f, d) + .5 * osc(2 * f, d) + .2 * osc(3 * f, d)) * np.minimum(1, t / .003) * np.exp(-2.2 * t)
    if kind == 'bass': return filt(osc(f, d, 'saw'), hi=380) * np.minimum(1, t / .01) * np.exp(-2.5 * t)
    if kind == 'brass': return filt(sum(osc(f * dt, d, 'saw') for dt in (.995, 1.005)) / 2, hi=1100) * np.minimum(1, t / .12) * np.minimum(1, (d - t) / .3)
    if kind == 'pad':
        x = sum(osc(f * dt, d, 'saw') for dt in (.994, 1, 1.006)) / 3
        return filt(x, hi=1300) * np.minimum(1, t / .9) * np.minimum(1, np.maximum(0, d - t) / .7)
    if kind == 'choir':
        x = sum(osc(f * dt * (1 + .004 * np.sin(2 * np.pi * 5 * t + dt * 9)), d, 'saw') for dt in (.996, 1.004))
        x = filt(x, lo=250, hi=2200); return x * np.minimum(1, t / 1.2) * np.minimum(1, np.maximum(0, d - t) / .8) * .6
def taiko():
    d = .7; t = T(d); n = len(t); return (osc(60 * np.exp(-t * 6) + 38, d) * np.exp(-t * 7) + filt(noise(n), hi=700) * np.exp(-t * 30) * .5)
def kick():
    d = .3; t = T(d); return osc(45 + 100 * np.exp(-t * 30), d) * np.exp(-t * 10)
def hat():
    d = .05; n = int(d * SR); return filt(noise(n), lo=7000) * dec(n, 30) * .3

# ---------------- TRILHA ORIGINAL (mi menor, 128 bpm) ----------------
# Rock/funk com metais e coro, inspirada na energia das trilhas de anime de luta (nada copiado):
# riff de baixo sincopado, bateria, metais em ataques curtos, guitarra abafada, tema heroico proprio,
# caixinha de musica no tempo parado e silencio total no instante dos golpes decisivos.
BPM = 128; B = 60 / BPM; S16 = B / 4
def lp(a, b, x): return a + (b - a) * x
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def env(n, a=.005, r=.05):
    e = np.ones(n); ka = max(1, int(a * SR)); kr = max(1, min(n, int(r * SR))); e[:ka] = np.linspace(0, 1, ka); e[-kr:] *= np.linspace(1, 0, kr); return e
def lowpass_env(x, f0, f1, k):  # filtro passa-baixa que fecha ao longo da nota (em blocos)
    n = len(x); out = np.zeros(n); bs = 2048
    for i in range(0, n, bs):
        f = f1 + (f0 - f1) * np.exp(-k * i / SR); out[i:i + bs] = filt(np.pad(x[i:i + bs], (0, max(0, bs - len(x[i:i + bs])))), hi=f)[:len(x[i:i + bs])]
    return out
def kick2():
    d = .35; t = T(d); return osc(48 + 120 * np.exp(-t * 35), d) * np.exp(-t * 9) + filt(noise(len(t)), lo=2000) * np.exp(-t * 120) * .25
def snare():
    d = .3; t = T(d); n = len(t); return filt(noise(n), lo=1200, hi=7000) * np.exp(-t * 16) * .8 + osc(190 * np.exp(-t * 3), d) * np.exp(-t * 22) * .6
def hat2(op=False):
    d = .35 if op else .06; n = int(d * SR); return filt(noise(n), lo=7000) * dec(n, 8 if op else 45) * .35
def crash():
    d = 2.5; n = int(d * SR); return filt(noise(n), lo=3500) * dec(n, 2.2) * .5
def tom(f):
    d = .5; t = T(d); return osc(f * (1 + .5 * np.exp(-t * 20)), d) * np.exp(-t * 7)
def bassn(m, d, acc=1):
    n = int(d * SR); x = osc(hz(m), d, 'saw') * .7 + osc(hz(m) / 2, d, 'sq') * .25
    x = lowpass_env(x, 2400 * acc, 380, 9) * env(n, .004, .03); return np.tanh(x * 1.6) * .8
def brass(m, d, stab=True):
    n = int(d * SR); x = sum(osc(hz(m) * dt, d, 'saw') for dt in (.993, 1, 1.007)) / 3
    x = lowpass_env(x, 4200, 900 if stab else 1600, 10 if stab else 2.5) * env(n, .012 if stab else .06, .06 if stab else .25); return x
def gtr(m, d, mute=True):
    n = int(d * SR); x = sum(osc(hz(m + k), d, 'saw') * g for k, g in ((0, 1), (7, .8), (12, .6))) + osc(hz(m) * 1.003, d, 'sq') * .3
    x = filt(np.tanh(x * 3.5), lo=90, hi=3200); return x * env(n, .003, .02) * (np.exp(-T(d) * (18 if mute else 2)) if True else 1)
def ep(m, d):
    n = int(d * SR); t = T(d); x = osc(hz(m), d) + .3 * osc(2 * hz(m), d) + .08 * osc(3 * hz(m), d)
    return x * np.exp(-t * 2.5) * env(n, .003, .1) * (1 + .15 * np.sin(2 * np.pi * 5 * t))
def mbox(m, d=1.6):  # caixinha de musica
    n = int(d * SR); t = T(d); x = osc(hz(m), d) + .45 * osc(hz(m) * 4.02, d) * np.exp(-t * 6) + .2 * osc(hz(m) * 2.01, d)
    return x * np.exp(-t * 3.2) * env(n, .002, .1)
def choir(m, d): return note(m, d, 'choir')
def pad(m, d): return note(m, d, 'pad')
mus = np.zeros(N)
def P(t, s, g=1):
    if t < 0 or t >= TOTAL: return
    add(mus, t, s, g)
c = lambda k: CUE[k]
CH = {'Em': [40, 52, 55, 59], 'C': [36, 48, 52, 55], 'D': [38, 50, 54, 57], 'B': [35, 47, 51, 54], 'Am': [33, 45, 48, 52]}
PROG = ['Em', 'C', 'D', 'B']
def chord_at(t, t0, prog=PROG): return CH[prog[int((t - t0) / (4 * B)) % len(prog)]]
FUNK = [(0, 1), None, (12, .7), None, (0, .9), (0, .6), None, (12, .7), (0, 1), None, (7, .8), None, (10, .8), None, (12, .9), (0, .6)]
def bassline(t0, t1, g=.5, style='funk', prog=PROG):
    k = 0; t = t0
    while t < t1 - .01:
        ch = chord_at(t, t0, prog); r = ch[0]
        if style == 'funk':
            st = FUNK[k % 16]
            if st: P(t, bassn(r + st[0], S16 * .95, st[1]), g * st[1])
        elif style == 'eighth':
            if k % 2 == 0: P(t, bassn(r + (12 if k % 8 == 6 else 0), S16 * 1.8, .8), g)
        elif style == 'sixteenth': P(t, bassn(r + (12 if k % 4 == 2 else 0), S16 * .9, 1), g * (.8 + .2 * (k % 4 == 0)))
        elif style == 'whole':
            if k % 16 == 0: P(t, bassn(r, B * 3.8, .5), g)
        elif style == 'walk':
            if k % 4 == 0: P(t, bassn(r + [0, 3, 5, 7, 10, 7, 5, 3][(k // 4) % 8], B * .9, .7), g)
        t += S16; k += 1
def drums(t0, t1, g=.6, style='groove'):
    k = 0; t = t0
    while t < t1 - .01:
        s = k % 16
        if style in ('groove', 'double'):
            if s in (0, 6, 8) or (s == 14 and (k // 16) % 2): P(t, kick2(), g)
            if s in (4, 12): P(t, snare(), g * .9)
            if style == 'double' or s % 2 == 0: P(t, hat2(s == 14), g * (.6 if s % 4 else .8))
            if style == 'double' and s in (10, 14): P(t, snare(), g * .45)
        elif style == 'half':
            if s == 0: P(t, kick2(), g)
            if s == 8: P(t, snare(), g)
            if s % 4 == 0: P(t, hat2(), g * .5)
        elif style == 'tick':
            if s % 2 == 0: P(t, hat2(), g * (.5 if s % 4 else .8))
            if s == 0 and (k // 16) % 2 == 0: P(t, kick2(), g * .6)
        elif style == 'toms':
            if s in (0, 3, 6, 10): P(t, tom(90 if s < 6 else 70), g)
            if s % 4 == 0: P(t, hat2(), g * .4)
        t += S16; k += 1
def roll(t0, t1, g=.6):  # rufar acelerando (subida)
    t = t0
    while t < t1:
        f = (t - t0) / max(.01, t1 - t0); P(t, snare(), g * (.25 + .75 * f)); t += lp(S16 * 2, S16 * .5, f)
def stabs(t0, t1, g=.35, prog=PROG, pat=(6, 14)):
    k = 0; t = t0
    while t < t1 - .01:
        if k % 16 in pat:
            ch = chord_at(t, t0, prog)
            for m in ch[1:]: P(t, brass(m + 12, S16 * 1.6), g / 3)
        t += S16; k += 1
def chug(t0, t1, g=.25, prog=PROG):
    k = 0; t = t0
    while t < t1 - .01:
        if k % 2 == 0 and k % 16 not in (6, 14): P(t, gtr(chord_at(t, t0, prog)[0] + 12, S16 * 1.6), g)
        t += S16; k += 1
def pads(t0, t1, g=.25, kind=choir, prog=PROG, octave=12):
    t = t0
    while t < t1 - .05:
        L = min(4 * B, t1 - t); ch = chord_at(t, t0, prog)
        for m in ch[1:]: P(t, kind(m + octave, L + .4), g / 3)
        t += 4 * B
MEL = [(71, 1.5), (69, .5), (71, 1), (76, 1), (74, 1.5), (71, .5), (67, 1), (69, 1), (66, 1.5), (69, .5), (74, 1), (72, 1), (71, 2), (75, 1), (78, 1)]
def melody(t0, t1, g=.32, inst='brass', mel=MEL, octv=0):
    t = t0; i = 0
    while t < t1 - .05:
        m, d = mel[i % len(mel)]; L = min(d * B, t1 - t)
        if inst == 'brass': P(t, brass(m + octv, L * .95, stab=False), g)
        elif inst == 'mbox': P(t, mbox(m + octv, 1.6), g)
        elif inst == 'ep': P(t, ep(m + octv, L * 1.2), g)
        t += d * B; i += 1
def hitchord(t, g=.6, ch='Em'):  # ataque orquestral (metais + coro + bumbo + prato)
    for m in CH[ch][1:]: P(t, brass(m + 12, 1.0, stab=True), g / 3); P(t, choir(m + 12, 1.6), g / 4)
    P(t, bassn(CH[ch][0], .9, 1), g * .8); P(t, kick2(), g * 1.2); P(t, taiko(), g); P(t, crash(), g * .8)
def gap(t0, t1):  # silencio na trilha (corta o que vazou para dentro do intervalo)
    i0, i1 = int(t0 * SR), int(min(TOTAL, t1) * SR); mus[i0:i1] *= np.concatenate([np.linspace(1, 0, min(600, i1 - i0)), np.zeros(max(0, i1 - i0 - 600))])
# A) gancho: tensao (pulso grave + chimbal) -> tudo para
P(0, pad(28, c('M_freeze') + .3), .35); drums(0, c('M_freeze') - .05, .35, 'tick'); P(c('M_freeze') - .6, note(40, .7, 'brass'), .2)
# B) tempo parado: caixinha de musica
melody(c('M_freeze') + .35, c('M_title') - .1, .22, 'mbox', [(76, 1), (79, 1), (83, 1), (87, 1.5), (83, .5), (79, 1)])
P(c('M_freeze') + .2, pad(52, c('M_title') - c('M_freeze')), .12)
# C) titulo: o tempo volta com tudo
hitchord(c('M_title'), .8); drums(c('M_title') + B, c('M_myst'), .55); bassline(c('M_title') + B, c('M_myst'), .55); stabs(c('M_title') + B, c('M_myst'), .4); melody(c('M_title') + B, c('M_myst'), .3)
# D) misterio: o espirito (piano eletrico + baixo longo)
bassline(c('M_myst'), c('M_build'), .45, 'whole', ['Em', 'C']); drums(c('M_myst'), c('M_build'), .3, 'tick')
t = c('M_myst')
while t < c('M_build') - .2:
    for m in chord_at(t, c('M_myst'), ['Em', 'C'])[1:]: P(t, ep(m + 12, 2 * B), .07)
    t += 2 * B
P(c('M_myst') + .5, pad(40, c('M_build') - c('M_myst')), .15)
# E) o Stand se forma: subida
roll(c('M_build'), c('M_reveal'), .5); bassline(c('M_build'), c('M_reveal'), .45, 'eighth', ['Em']); P(c('M_build'), choir(64, c('M_reveal') - c('M_build') + .3) + choir(67, c('M_reveal') - c('M_build') + .3), .25)
# F) Star Platinum: o tema
hitchord(c('M_reveal'), .9); melody(c('M_reveal') + .1, c('M_p1'), .38); pads(c('M_reveal'), c('M_p1'), .3); drums(c('M_reveal') + B, c('M_p1'), .55); bassline(c('M_reveal') + B, c('M_p1'), .5)
# G) ponto 1: groove com metais e guitarra
drums(c('M_p1'), c('M_rush'), .55); bassline(c('M_p1'), c('M_rush'), .55); stabs(c('M_p1'), c('M_rush'), .35); chug(c('M_p1'), c('M_rush'), .16)
roll(c('M_rush') - 1.2, c('M_rush'), .45)
# H) ORA ORA ORA: tudo em dobro
drums(c('M_rush'), c('M_rushend'), .65, 'double'); bassline(c('M_rush'), c('M_rushend'), .55, 'sixteenth', ['Em']); chug(c('M_rush'), c('M_rushend'), .22, ['Em'])
t = c('M_rush'); k = 0
while t < c('M_rushend'): P(t, brass(64 + k % 3 * 3, S16 * 1.8), .12); t += B / 2; k += 1
hitchord(c('M_rushend') - .1, .9); melody(c('M_rushend') + .3, c('M_p2'), .32); drums(c('M_rushend') + .3, c('M_p2'), .5); bassline(c('M_rushend') + .3, c('M_p2'), .5)
# I) ponto 2: investigacao (baixo caminhando, piano eletrico, chimbal)
bassline(c('M_p2'), c('M_p3'), .5, 'walk', ['Em', 'Am']); drums(c('M_p2'), c('M_p3'), .35, 'tick')
melody(c('M_p2') + .5, c('M_egito') - .2, .14, 'ep', [(64, .5), (67, .5), (71, .5), (69, 1.5), (67, .5), (64, .5), (62, 1)], 12)
for k, m in enumerate([64, 65, 68, 69, 71, 72, 74, 76]): P(c('M_egito') + .02 + k * .07, brass(m + 12, .3), .12)  # escala "egipcia" (frigio dominante)
for m in (52, 56, 59): P(c('M_egito') + .6, brass(m + 12, .9), .14)
# J) ponto 3: sombrio, tambores, sobe ate o tempo parar
drums(c('M_p3'), c('M_tstop') - .1, .5, 'toms'); P(c('M_p3'), pad(28, c('M_tstop') - c('M_p3')) + pad(35, c('M_tstop') - c('M_p3')), .3)
roll(c('M_tstop') - 1.6, c('M_tstop') - .05, .55); P(c('M_tstop') - 1.6, choir(64, 1.6) + choir(70, 1.6), .3)
# K) tempo parado: silencio + caixinha de musica
melody(c('M_tstop') + .8, c('M_resume') - .15, .2, 'mbox', [(76, 1), (79, 1), (83, 1), (86, 1), (84, 1), (79, 1)])
P(c('M_tstop') + .5, pad(40, c('M_resume') - c('M_tstop')), .1)
# L) o tempo volta: groove leve -> cozinha (comico)
hitchord(c('M_resume'), .55); drums(c('M_resume') + B, c('M_kitchen'), .45); bassline(c('M_resume') + B, c('M_kitchen'), .45); stabs(c('M_resume') + B, c('M_kitchen'), .25)
t = c('M_kitchen'); k = 0
while t < c('M_pain'):
    P(t, bassn([40, 47, 52, 47][k % 4], S16 * 1.5, .6), .4); P(t, note([76, 71, 79, 71][k % 4], .3, 'pluck'), .12); t += B / 2; k += 1
# M) a mesma dor: tensao
P(c('M_pain'), pad(28, c('M_rival') - c('M_pain')) + pad(34, c('M_rival') - c('M_pain')), .3); drums(c('M_pain'), c('M_rival'), .4, 'half')
# N) o rival: motivo vilao (tritono) -> Stand dourado
drums(c('M_rival'), c('M_gstop'), .5, 'half'); t = c('M_rival'); k = 0
while t < c('M_gstop') - .1:
    P(t, brass([40, 46, 40, 47][k % 4], 2 * B * .9, stab=False), .22); P(t, bassn([28, 34, 28, 35][k % 4], 2 * B * .9, .6), .45); t += 2 * B; k += 1
hitchord(c('M_gold'), .75, 'Em'); P(c('M_gold'), choir(71, 2.5) + choir(76, 2.5) + choir(79, 2.5), .3)
# O) tempo parado do rival: so batidas do coracao (efeitos); P) voce se move: subida
roll(c('M_move'), c('M_attack'), .5); P(c('M_move'), choir(64, c('M_attack') - c('M_move') + .2) + choir(71, c('M_attack') - c('M_move') + .2), .3)
# Q) ataque: em dobro, metais subindo
drums(c('M_attack'), c('M_ora') - .05, .65, 'double'); bassline(c('M_attack'), c('M_ora') - .05, .55, 'sixteenth', ['Em'])
t = c('M_attack'); k = 0
while t < c('M_ora') - .1: P(t, brass(64 + k, B * .45), .14); t += B / 2; k += 1
hitchord(c('M_ora'), 1.0)
# R) o tempo volta: final triunfal com o tema
hitchord(c('M_finale'), .9); melody(c('M_finale') + .15, c('M_outro'), .4); pads(c('M_finale'), c('M_outro'), .32); drums(c('M_finale') + B, c('M_outro'), .6, 'double'); bassline(c('M_finale') + B, c('M_outro'), .55)
# S) yare yare + pergunta: groove descolado ate o fim (em loop: termina no "tempo para")
drums(c('M_outro'), c('M_end') - .8, .5); bassline(c('M_outro'), c('M_end') - .8, .5); stabs(c('M_outro'), c('M_end') - .8, .3); melody(c('M_outro') + 4 * B, c('M_end') - .8, .3)
# silencios dramaticos: tempo parado (gancho, THE WORLD, rival) e o instante do golpe final
gap(c('M_freeze') + .02, c('M_freeze') + .3); gap(c('M_tstop') + .02, c('M_tstop') + .7); gap(c('M_gstop') + .02, c('M_move')); gap(c('M_ora') + .7, c('M_ora') + 1.0)
gap(c('M_half'), c('M_halfend'))  # meio segundo de tempo parado na cozinha: a musica para junto
mus = reverb(mus, 1.6, .22)[:N]

# ---------------- MIXAGEM ----------------
def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; ch = w.getnchannels(); w.close()
    return a.reshape(-1, ch).mean(1) if ch > 1 else a
v = rd('audio/narracao.wav'); voice = np.zeros(N); voice[:min(N, len(v))] = v[:N]
# o resto da mixagem segue o volume da fala (referencia: -15,6 dB RMS da voz provisoria), sem alterar a voz
_sp = v[np.abs(v) > .01]; VK = 10 ** ((20 * np.log10(np.sqrt(np.mean(_sp ** 2)) + 1e-9) + 15.6) / 20) if len(_sp) else 1.0
k = int(.12 * SR); ve = np.convolve(np.abs(voice), np.ones(k) / k, mode='same'); vl = np.clip(ve / (.06 * VK), 0, 1)
sm = np.zeros(N); a_, r_ = 1 - np.exp(-1 / (.02 * SR)), 1 - np.exp(-1 / (.16 * SR)); st = 64
for i in range(0, N, st):
    prev = sm[i - 1] if i else 0; x = vl[i]; c = a_ if x > prev else r_; sm[i:i + st] = prev + (x - prev) * (1 - (1 - c) ** st)
duck_mus = 1 - .58 * sm; duck_amb = 1 - .5 * sm; duck_fx = 1 - .4 * sm
fx = np.tanh(fx * .9); M = np.tanh(mus / (np.percentile(np.abs(mus), 99.7) + 1e-9) * .75); M = M / np.max(np.abs(M))  # trilha com picos domados (corpo mais presente)
mix_m = voice * 1.0 + (fx * .3 * duck_fx + amb * .42 * duck_amb + M * .34 * duck_mus) * VK
d = int(.011 * SR); SB = (fx * .3 * duck_fx + M * .34 * duck_mus) * VK; side = np.concatenate([np.zeros(d), SB[:-d]]) - SB
Lc = mix_m + .28 * side; Rc = mix_m - .28 * side
fo = int(.6 * SR); Lc[-fo:] *= np.linspace(1, 0, fo); Rc[-fo:] *= np.linspace(1, 0, fo)
pk = max(np.max(np.abs(Lc)), np.max(np.abs(Rc))); Lc /= max(1, pk / .97); Rc /= max(1, pk / .97)
w = wave.open('audio/mix_final.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.stack([Lc, Rc], 1) * 32767).astype(np.int16).tobytes()); w.close()
for name, x in (('efeitos', fx * .4 + amb * .5), ('musica', M * .25)):
    w = wave.open(f'audio/{name}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
print('ok', round(N / SR, 2), 's | pico', round(pk, 3), '| efeitos:', len(SFX))
