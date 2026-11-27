# E SE VOCE TIVESSE O PODER DO SAITAMA? - efeitos sonoros (sintetizados) + ambiencias + trilha original,
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
# ---- efeitos novos do "Poder do Saitama" ----
def kaiju_roar():  # rugido do monstro colossal (grave, rouco, longo)
    d = 2.6; n = int(d * SR); t = T(d); f = 62 + 18 * np.sin(2 * np.pi * 1.4 * t) + 10 * np.sin(2 * np.pi * 7 * t)
    x = filt(osc(f, d, 'saw') * (1 + 1.2 * filt(noise(n), hi=90) * 6), hi=1400) * np.minimum(1, t / .15) * np.exp(-t * .7)
    x += filt(noise(n), lo=300, hi=2200) * bell(n) * .5 + osc(f * .5, d) * .4 * np.exp(-t)
    return norm(reverb(x, 2.2, .4), 1)
def kaiju_growl(): return norm(kaiju_roar()[:int(1.6 * SR)] * np.linspace(.4, 1, int(1.6 * SR)), .7)
def kaiju_hurt():
    d = 1.1; n = int(d * SR); t = T(d); f = 180 * np.exp(-t * 1.2) + 60
    return norm(reverb(filt(osc(f, d, 'saw') * (1 + filt(noise(n), hi=120) * 4), hi=1800) * np.exp(-t * 2.5), 1.4, .35), .8)
def rumble():
    d = 3.0; n = int(d * SR); t = T(d); return norm(filt(noise(n), hi=120) * bell(n) * (1 + .5 * np.sin(2 * np.pi * 9 * t)) + osc(32, d) * bell(n) * .4, .9)
def quake(): return norm(rumble() + np.pad(boom(), (0, max(0, int(3 * SR) - len(boom()))))[:int(3 * SR)] * .6, 1)
def stomp():
    d = 1.6; n = int(d * SR); x = osc(np.linspace(70, 28, n), d) * dec(n, 4) * 1.3 + filt(noise(n), hi=500) * dec(n, 7) * .7
    return norm(reverb(x, 1.4, .3), 1)
def crumble():
    o = np.zeros(int(1.6 * SR))
    for k in range(22):
        d = .05 + .08 * rng.random(); s_ = filt(noise(int(d * SR)), lo=200, hi=3500) * dec(int(d * SR), 12); i = int(rng.random() * 1.3 * SR); o[i:i + len(s_)] += s_ * (.4 + .6 * rng.random())
    return norm(o * np.linspace(1, .3, len(o)), .7)
def ping():  # brilho da careca: "plim!" cristalino
    d = 1.6; n = int(d * SR); x = np.zeros(n)
    for f, g in ((2637, 1), (3951, .6), (5274, .4), (7040, .25)): x += osc(f * (1 + .004 * np.sin(2 * np.pi * 6 * T(d))), d) * dec(n, 4.5) * g
    x += osc(np.linspace(1800, 5200, n), d) * dec(n, 30) * .4
    return norm(reverb(x, 1.4, .4), .7)
def rewind():  # fita voltando (flashback)
    d = .7; n = int(d * SR); t = T(d); x = osc(np.linspace(1800, 300, n) * (1 + .3 * np.sin(2 * np.pi * 30 * t)), d, 'saw') * .3 + filt(noise(n), lo=2000) * .4
    return norm(filt(x, hi=6000) * bell(n), .6)
def grunt():  # esforco (som de desenho, sem voz)
    d = .32; n = int(d * SR); t = T(d); x = filt(osc(150 + 40 * np.sin(np.pi * t / d), d, 'saw'), lo=200, hi=1400) * np.sin(np.pi * t / d) ** .7
    return norm(x + filt(noise(n), lo=500, hi=2500) * bell(n) * .3, .5)
def splash():
    d = .8; n = int(d * SR); return norm(filt(noise(n), lo=800, hi=7000) * dec(n, 7) + filt(noise(n), lo=200, hi=900) * dec(n, 12) * .6, .8)
def sonic():  # estrondo supersonico
    d = 1.4; n = int(d * SR); x = osc(np.linspace(90, 30, n), d) * dec(n, 5) + filt(noise(n), lo=200, hi=4000) * dec(n, 9) * .8
    return norm(reverb(x, 1.2, .3), 1)
def record_stop():
    d = .7; n = int(d * SR); t = T(d); x = osc(np.linspace(600, 40, n) ** 1, d, 'saw') * np.linspace(1, 0, n) ** .5
    return norm(filt(x, hi=3000), .6)
def pluck_fall():  # mecha caindo: pizzicato descendente comico
    o = np.zeros(int(.6 * SR))
    for k, m in enumerate((76, 72, 67)):
        s_ = (osc(440 * 2 ** ((m - 69) / 12), .3) + .3 * osc(880 * 2 ** ((m - 69) / 12), .3)) * dec(int(.3 * SR), 14); i = int(k * .1 * SR); o[i:i + len(s_)] += s_
    return norm(o, .55)
def choir_aah():  # "aaah" celestial comico
    d = 2.2; n = int(d * SR); t = T(d); x = np.zeros(n)
    for m in (74, 78, 81, 86):
        f = 440 * 2 ** ((m - 69) / 12); x += sum(osc(f * dt * (1 + .005 * np.sin(2 * np.pi * 5.5 * t)), d, 'saw') for dt in (.997, 1.003))
    x = filt(x, lo=400, hi=3000) * np.minimum(1, t / .08) * np.exp(-t * .9)
    return norm(reverb(x, 2, .5), .6)
def cricket():
    d = 1.6; n = int(d * SR); t = T(d); x = osc(4700, d) * ((np.sin(2 * np.pi * 30 * t) > .3) * (np.sin(2 * np.pi * 1.6 * t) > 0))
    return norm(x * .5, .3)
def yawn():
    d = 1.3; n = int(d * SR); t = T(d); f = 260 * (1 - .45 * t / d); x = filt(osc(f, d, 'saw'), lo=250, hi=1600) * np.sin(np.pi * t / d) ** 1.5
    return norm(x + filt(noise(n), lo=300, hi=2000) * bell(n) * .4, .45)
def snore():
    d = 1.6; n = int(d * SR); t = T(d); x = filt(noise(n), lo=80, hi=700) * (1 + np.sin(2 * np.pi * 28 * t)) * np.sin(np.pi * t / d) ** 2
    return norm(x, .4)
def crowd():  # pessoas murmurando
    d = 3.0; o = np.zeros(int(d * SR))
    for k in range(10):
        b = babble(); i = int(rng.random() * (d - 1.3) * SR); o[i:i + len(b)] += b * (.3 + .4 * rng.random())
    return norm(filt(o, hi=3500), .5)
def crowd_scream():
    d = 2.0; n = int(d * SR); t = T(d); x = np.zeros(n)
    for k in range(6):
        f = 500 + 400 * rng.random(); x += filt(osc(f * (1 + .1 * np.sin(2 * np.pi * (4 + k) * t)), d, 'saw'), lo=600, hi=3500) * (.5 + .5 * rng.random())
    return norm(x * bell(n) ** .5 + filt(noise(n), lo=800, hi=5000) * bell(n) * .3, .55)
def cheer():
    d = 2.0; n = int(d * SR); return norm(filt(noise(n), lo=600, hi=5000) * bell(n) ** .6 * (1 + .3 * np.sin(2 * np.pi * 6 * T(d))) + crowd()[:n] * .5, .55)
def teleport():
    d = .6; n = int(d * SR); x = osc(np.linspace(300, 3000, n), d, 'sq') * dec(n, 6) * .3 + filt(noise(n), lo=3000) * dec(n, 10) * .5
    return norm(reverb(x, .8, .3), .6)
def wind_blast():  # o vento do soco subindo ate as nuvens
    d = 3.2; n = int(d * SR); w = np.linspace(0, 1, n)
    x = filt(noise(n), lo=150, hi=1800) * np.exp(-w * 2.2) * (1 + .4 * np.sin(2 * np.pi * 3 * T(d))) + filt(noise(n), lo=2000, hi=8000) * np.exp(-w * 4) * .4
    return norm(reverb(x * att(n, .02), 2, .45), 1)
def beep():  # monitor cardiaco
    d = .16; n = int(d * SR); return norm(osc(1000, d) * np.minimum(1, (d - T(d)) / .02) * att(n, .005), .35)
def send(): return norm(np.pad(pop(), (0, int(.4 * SR)))[:int(.5 * SR)] + whoosh(.5, 5000) * .5, .7)
def rain(d):
    n = int(d * SR); x = filt(noise(n), lo=1500, hi=9000) * .14 + filt(noise(n), lo=200, hi=900) * .06
    for k in range(int(d * 14)):
        L = int(.012 * SR); i = int(rng.random() * max(.05, d - .05) * SR); x[i:i + L] += filt(noise(L), lo=3000)[:len(x[i:i + L])] * .15 * rng.random()
    return x
def amb_wind(d):
    n = int(d * SR); t = T(d); return filt(noise(n), lo=200, hi=1500) * (.6 + .4 * np.sin(2 * np.pi * .23 * t)) * .2
# ---- efeitos da sequencia do soco ----
def gust():  # rajada de vento levantando poeira
    d = 1.8; n = int(d * SR); t = T(d); e = bell(n) ** 1.3
    return norm(filt(noise(n), lo=200, hi=2500) * e * (1 + .5 * np.sin(2 * np.pi * 2.3 * t)) + filt(noise(n), lo=2500, hi=7000) * e * .25, .7)
def accel():  # arrancada: sobe de grave a agudo (aceleracao)
    d = 1.0; n = int(d * SR); w = np.linspace(0, 1, n); f = 60 + 900 * w ** 2.2
    x = osc(f, d, 'saw') * .25 + filt(noise(n), lo=400, hi=6000) * w ** 2 * .8
    return norm(filt(x, hi=7000) * w ** 1.4 * fadeout(np.ones(n), .03), .9)
def skid():  # derrapada no asfalto
    d = .7; n = int(d * SR); t = T(d); x = filt(noise(n), lo=900, hi=5000) * (1 + .4 * np.sin(2 * np.pi * 60 * t)) * np.exp(-t * 3.5)
    return norm(x + osc(np.linspace(260, 120, n), d) * np.exp(-t * 6) * .3, .8)
def clench():  # punho fechando: estalos de dedos + couro
    o = np.zeros(int(.5 * SR))
    for k in range(4):
        L = int(.03 * SR); s_ = filt(noise(L), lo=1500, hi=6000) * dec(L, 25); i = int(k * .07 * SR); o[i:i + L] += s_
    o += osc(np.linspace(180, 90, len(o)), len(o) / SR) * dec(len(o), 10) * .5
    return norm(o, .6)
def inhale():
    d = .9; n = int(d * SR); return norm(filt(noise(n), lo=600, hi=4000) * np.linspace(0, 1, n) ** 2 * fadeout(np.ones(n), .05), .35)
def freeze_ring():  # o tempo para: anel agudo + reverso
    d = .5; n = int(d * SR); x = (osc(3520, d) + .5 * osc(5274, d)) * att(n, .005) * fadeout(np.ones(n), .05) * .5
    return norm(x + filt(noise(n), lo=4000) * np.linspace(1, 0, n) * .2, .45)
def air_burst():  # explosao de ar: estrondo grave + rajada que se espalha
    d = 3.0; n = int(d * SR); t = T(d)
    sub = osc(36 * np.exp(-t * .8) + 20, d) * np.exp(-t * 2) * 1.4
    blast = filt(noise(n), lo=120, hi=3000) * np.exp(-t * 2.6) + filt(noise(n), lo=3000, hi=9000) * np.exp(-t * 6) * .5
    return norm(reverb(sub + blast * .9, 2.4, .45), 1)
AMB = {'amb_night': amb_night, 'amb_town': amb_town, 'amb_room': amb_room, 'amb_space': amb_space, 'wind': wind, 'drone': drone, 'rain': rain, 'amb_wind': amb_wind}
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
        if k not in cache or k in ('data', 'babble', 'grunt', 'crumble'): cache[k] = G[k]()
        add(fx, t, cache[k], v)

# ---------------- TRILHA (original, re menor, ~100 bpm) ----------------
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
mus = np.zeros(N)
def P(t, s, g=1): add(mus, t, s, g)
B = .6  # 1 tempo
cu = lambda k: CUE[k]
DM = [[50, 57, 62, 65], [46, 53, 58, 62], [41, 48, 53, 57], [48, 55, 60, 64]]  # Dm Bb F C
def chords(t0, t1, kind='pad', g=.22, bars=4):
    t = t0; i = 0
    while t < t1 - .2:
        L = min(bars * B * 2, t1 - t); c = DM[i % 4]
        for m in c[1:]: P(t, note(m, L + .5, kind), g / 3)
        t += L; i += 1
def arp(t0, t1, kind='pluck', g=.18, step=B / 2, oct=12, pat=(0, 1, 2, 3, 2, 1)):
    t = t0; k = 0
    while t < t1:
        c = DM[int((t - t0) / (B * 8)) % 4]; P(t, note(c[pat[k % len(pat)]] + oct, .6, kind), g); t += step; k += 1
def bassline(t0, t1, g=.45, step=B / 2):
    t = t0
    while t < t1:
        c = DM[int((t - t0) / (B * 8)) % 4]; P(t, note(c[0] - 12, step * 1.1, 'bass'), g); t += step
def drums(t0, t1, g=.5, hats=False):
    t = t0; k = 0
    while t < t1:
        if k % 4 in (0, 2): P(t, taiko(), g * (1 if k % 4 == 0 else .7))
        if k % 8 == 7: P(t + B / 2, taiko(), g * .6)
        if hats:
            for h in range(4): P(t + h * B / 4, hat(), .5 if h % 2 else .8)
        t += B; k += 1
# ===== TRILHA "PODER DO SAITAMA" (original; re menor; deixas M_* vindas de sfxlist.js) =====
c = lambda k: CUE[k]
def pulses(t0, t1, step, m=38, g=.4, ramp=False):
    t = t0
    while t < t1:
        P(t, note(m - 12, step * 1.1, 'bass'), g * (.5 + .5 * (t - t0) / max(.1, t1 - t0) if ramp else 1)); t += step
def groove(t0, t1, g=.5, hats=True, step=B / 2):  # bateria pop: bumbo / caixa / chimbal
    t = t0; k = 0
    while t < t1 - .05:
        if k % 4 == 0: P(t, kick(), .8 * g)
        if k % 4 == 2: P(t, taiko() * .6 + np.pad(hat() * 3, (0, int(.7 * SR) - len(hat())))[:len(taiko())], .5 * g)
        if hats: P(t, hat(), .9)
        t += step; k += 1
def melody(t0, notes, step, kind='pluck', g=.2):
    for i, m in enumerate(notes):
        if m: P(t0 + i * step, note(m, step * 1.6, kind), g)
# A) abertura: impacto epico
P(0, taiko() * 1.2, .9); P(.72, taiko() * 1.5, 1); P(.72, note(38, 2.4, 'brass') + note(45, 2.4, 'brass') + note(50, 2.4, 'choir') + note(57, 2.4, 'choir'), .45)
chords(1.2, c('M_flash'), 'choir', .4, 2); bassline(1.2, c('M_flash') - .3, .4); drums(1.2, c('M_flash') - .3, .5, True); arp(1.2, c('M_flash') - .3, 'pluck', .13)
P(c('M_flash') - .35, taiko() * 1.3, .9)
# B) flashback: piano suave e esperancoso
for k, m in enumerate([62, 65, 69, 67, 65, 64, 62, 64]): P(c('M_flash') + .2 + k * .55, note(m, 1.4, 'piano'), .17)
P(c('M_flash'), note(50, c('M_train') - c('M_flash') + .3, 'pad') + note(57, c('M_train') - c('M_flash') + .3, 'pad'), .22)
# C) montagem de treino: energia crescente
chords(c('M_train'), c('M_suffer'), 'pad', .3); bassline(c('M_train'), c('M_suffer'), .45, B / 2); groove(c('M_train'), c('M_suffer'), .55)
arp(c('M_train'), c('M_suffer'), 'pluck', .15, B / 4, 24, (0, 1, 2, 3))
melody(c('M_train'), [74, 0, 72, 74, 77, 0, 76, 74, 72, 0, 69, 72, 74, 0, 0, 0] * 2, B / 2, 'bell', .12)
# D) sofrimento na chuva: piano triste e espaçado
P(c('M_suffer'), note(38, c('M_cont') - c('M_suffer') + .3, 'pad') + note(41, c('M_cont') - c('M_suffer') + .3, 'pad'), .22)
for k, m in enumerate([69, 67, 65, 64, 62]): P(c('M_suffer') + .2 + k * .6, note(m, 1.6, 'piano'), .18)
# E) continua: determinacao (bateria volta)
chords(c('M_cont'), c('M_reps'), 'choir', .35, 2); pulses(c('M_cont'), c('M_reps'), .3, 38, .4, True); drums(c('M_cont'), c('M_reps'), .45)
# F) milhares de repeticoes: construcao acelerando -> corte seco
pulses(c('M_reps'), c('M_stop'), .15, 38, .5, True); t = c('M_reps')
while t < c('M_stop'): P(t, taiko(), .3 + .4 * (t - c('M_reps')) / max(.1, c('M_stop') - c('M_reps'))); t += .3
P(c('M_reps'), note(50, c('M_stop') - c('M_reps'), 'choir') + note(53, c('M_stop') - c('M_reps'), 'choir'), .3)
P(c('M_stop') + .25, note(74, 2.5, 'bell') + note(81, 2.5, 'bell'), .18)
# G) poder: heroico
chords(c('M_power'), c('M_hair'), 'brass', .35, 2); chords(c('M_power'), c('M_hair'), 'choir', .3, 2); bassline(c('M_power'), c('M_hair'), .45); groove(c('M_power'), c('M_hair'), .6)
# H) cabelo caindo: pizzicato comico em silencio
for k in range(int((c('M_bald') - c('M_hair')) / .3)): P(c('M_hair') + .35 + k * .3, note([62, 65, 69, 65][k % 4] + 12, .3, 'pluck'), .1)
# I) CARECA: acorde celestial comico -> groove tranquilo
P(c('M_bald'), note(62, 2.5, 'choir') + note(66, 2.5, 'choir') + note(69, 2.5, 'choir') + note(74, 2.5, 'choir'), .3)
DMJ = [[50, 57, 62, 66], [47, 54, 59, 62], [43, 50, 55, 59], [45, 52, 57, 61]]  # D Bm G A
def chordsM(t0, t1, kind='pad', g=.22, bars=2):
    t = t0; i = 0
    while t < t1 - .2:
        L = min(bars * B * 2, t1 - t)
        for m in DMJ[i % 4][1:]: P(t, note(m, L + .4, kind), g / 3)
        t += L; i += 1
def bassM(t0, t1, g=.42, step=B / 2):
    t = t0
    while t < t1: P(t, note(DMJ[int((t - t0) / (B * 4)) % 4][0] - 12, step * 1.1, 'bass'), g); t += step
chordsM(c('M_chill'), c('M_feats'), 'piano', .5, 2); bassM(c('M_chill'), c('M_feats'), .35, B); groove(c('M_chill'), c('M_feats'), .35)
# J) feitos: acao animada (re maior)
chordsM(c('M_feats'), c('M_kaiju'), 'brass', .35, 1); bassM(c('M_feats'), c('M_kaiju'), .45); groove(c('M_feats'), c('M_kaiju'), .65)
t = c('M_feats'); k = 0
while t < c('M_kaiju'): ch = DMJ[int((t - c('M_feats')) / (B * 4)) % 4]; P(t, note(ch[1 + k % 3] + 12, .3, 'pluck'), .14); t += B / 4; k += 1
# K) o monstro colossal: tensao grave
P(c('M_kaiju'), note(37, c('M_fight') - c('M_kaiju') + .3, 'pad') + note(38, c('M_fight') - c('M_kaiju') + .3, 'pad') + note(44, c('M_fight') - c('M_kaiju') + .3, 'pad'), .35)
pulses(c('M_kaiju'), c('M_fight'), .6, 38, .45); t = c('M_kaiju')
while t < c('M_fight'): P(t, taiko(), .45); t += 1.2
P(c('M_kaiju') + 1.6, note(38, 2.4, 'brass') + note(44, 2.4, 'brass'), .35)
# L) luta: tutti
chords(c('M_fight'), c('M_silence'), 'choir', .5, 1); chords(c('M_fight'), c('M_silence'), 'brass', .35, 1); bassline(c('M_fight'), c('M_silence'), .5, B / 4); drums(c('M_fight'), c('M_silence'), .6, True)
# M) silencio antes do golpe (so o coracao, vindo dos efeitos) -> SOCO: explosao orquestral
P(c('M_hit'), taiko() * 1.6, 1); P(c('M_hit'), note(38, 3.6, 'brass') + note(45, 3.6, 'brass') + note(50, 3.6, 'choir') + note(57, 3.6, 'choir') + note(62, 3.6, 'choir'), .5)
chordsM(c('M_hit') + 1.2, c('M_ko'), 'choir', .45, 2); drums(c('M_hit') + 1.2, c('M_ko'), .45)
# N) K.O.: triunfo curto
P(c('M_ko'), note(50, 2.6, 'brass') + note(54, 2.6, 'brass') + note(57, 2.6, 'brass') + note(62, 2.6, 'choir'), .4); groove(c('M_ko') + .4, c('M_lonely') - .3, .45)
melody(c('M_ko') + .4, [74, 78, 81, 0, 79, 78, 76, 74], B / 2, 'bell', .14)
# O) solidao: lento, piano e pad (ritmo cai)
t = c('M_lonely'); k = 0; PROG = [[50, 57, 62, 65], [46, 53, 58, 62], [43, 50, 55, 58], [45, 52, 57, 61]]
while t < c('M_heart') - .2:
    ch = PROG[k % 4]; L = min(2.6, c('M_heart') - t)
    for m in ch[1:]: P(t, note(m, L + .6, 'pad'), .07)
    P(t, note(ch[0] - 12, L, 'bass'), .2); P(t + .3, note(ch[2] + 12, 2, 'piano'), .14); P(t + 1.3, note(ch[3] + 12, 2, 'piano'), .11)
    t += 2.6; k += 1
# P) o coracao acelera: esperanca crescente
chordsM(c('M_heart'), c('M_cta'), 'pad', .35, 1); pulses(c('M_heart'), c('M_cta'), .3, 50, .35, True)
# Q) COMENTE CARECA: final animado e rapido
P(c('M_cta'), taiko() * 1.3, 1); chordsM(c('M_cta'), c('M_end') - 1, 'brass', .4, 1); bassM(c('M_cta'), c('M_end') - 1, .45, B / 4); groove(c('M_cta'), c('M_end') - 1, .7)
melody(c('M_cta'), [74, 74, 78, 81, 0, 78, 81, 86], B / 2, 'bell', .15)
P(c('M_end') - 1.1, taiko() * 1.4, 1); P(c('M_end') - 1.1, note(38, 1.8, 'brass') + note(50, 1.8, 'choir') + note(57, 1.8, 'choir') + note(62, 1.8, 'choir') + note(66, 1.8, 'choir'), .45)
mus = reverb(mus, 2.0, .3)[:N]

# ---------------- MIXAGEM ----------------
def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; ch = w.getnchannels(); w.close()
    return a.reshape(-1, ch).mean(1) if ch > 1 else a
v = rd('audio/narracao.wav'); OFFV = int(D.get('off', 0) * SR); voice = np.zeros(N); m_ = min(N - OFFV, len(v)); voice[OFFV:OFFV + m_] = v[:m_]
k = int(.12 * SR); ve = np.convolve(np.abs(voice), np.ones(k) / k, mode='same'); vl = np.clip(ve / .06, 0, 1)
sm = np.zeros(N); a_, r_ = 1 - np.exp(-1 / (.02 * SR)), 1 - np.exp(-1 / (.16 * SR)); st = 64
for i in range(0, N, st):
    prev = sm[i - 1] if i else 0; x = vl[i]; c = a_ if x > prev else r_; sm[i:i + st] = prev + (x - prev) * (1 - (1 - c) ** st)
duck_mus = 1 - .66 * sm; duck_amb = 1 - .55 * sm; duck_fx = 1 - .58 * sm
fx = np.tanh(fx * .9); M = norm(mus, 1)
mix_m = voice * 1.0 + fx * .34 * duck_fx + amb * .45 * duck_amb + M * .2 * duck_mus
d = int(.011 * SR); SB = fx * .34 * duck_fx + M * .2 * duck_mus; side = np.concatenate([np.zeros(d), SB[:-d]]) - SB
Lc = mix_m + .28 * side; Rc = mix_m - .28 * side
fo = int(.6 * SR); Lc[-fo:] *= np.linspace(1, 0, fo); Rc[-fo:] *= np.linspace(1, 0, fo)
pk = max(np.max(np.abs(Lc)), np.max(np.abs(Rc))); Lc /= max(1, pk / .97); Rc /= max(1, pk / .97)
w = wave.open('audio/mix_final.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.stack([Lc, Rc], 1) * 32767).astype(np.int16).tobytes()); w.close()
for name, x in (('efeitos', fx * .4 + amb * .5), ('musica', M * .25)):
    w = wave.open(f'audio/{name}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
print('ok', round(N / SR, 2), 's | pico', round(pk, 3), '| efeitos:', len(SFX))

