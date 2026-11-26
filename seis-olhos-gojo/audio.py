# Efeitos sonoros (sintetizados) + ambiencias + trilha cinematografica original,
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
AMB = {'amb_night': amb_night, 'amb_town': amb_town, 'amb_room': amb_room, 'amb_space': amb_space, 'wind': wind, 'drone': drone}
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
# gancho: grave + pulso; ao abrir os olhos, coro e pad
P(0, note(38, cu('M_open') + .5, 'pad'), .25)
P(cu('M_open'), note(50, cu('M_power') - cu('M_open') + .8, 'choir') + note(57, cu('M_power') - cu('M_open') + .8, 'choir') + note(62, cu('M_power') - cu('M_open') + .8, 'choir'), .35)
P(cu('M_open'), taiko(), .9)
# poder absurdo: epico
chords(cu('M_power'), cu('M_detail'), 'choir', .45, 2); bassline(cu('M_power'), cu('M_detail'), .4); drums(cu('M_power'), cu('M_detail'), .5); arp(cu('M_power'), cu('M_detail'), 'pluck', .16)
# o detalhe: queda
for k, m in enumerate([74, 77, 76, 72]): P(cu('M_detail') + .3 + k * .9, note(m, 2, 'piano'), .22)
P(cu('M_detail'), note(38, cu('M_p1') - cu('M_detail') + .5, 'pad'), .25)
# ponto 1: misterio (sinos + pulso)
chords(cu('M_p1'), cu('M_gig'), 'pad', .28); arp(cu('M_p1') + .3, cu('M_gig'), 'bell', .14, B / 2, 24, (0, 2, 3, 1, 2, 3))
t = cu('M_p1')
while t < cu('M_gig'): P(t, kick(), .3); t += B
# energia gigantesca: metais graves
P(cu('M_gig'), note(38, 4, 'brass') + note(45, 4, 'brass') + note(50, 4, 'brass'), .45); P(cu('M_gig'), taiko(), 1)
chords(cu('M_gig') + 1.2, cu('M_p2'), 'pad', .22); arp(cu('M_gig') + 1.2, cu('M_p2'), 'bell', .12, B / 2, 24)
# ponto 2: controle (ritmo crescente)
chords(cu('M_p2'), cu('M_ili'), 'pad', .26); bassline(cu('M_p2') + 2, cu('M_ili'), .35); drums(cu('M_p2') + 2, cu('M_ili'), .38); arp(cu('M_p2'), cu('M_ili'), 'pluck', .14, B / 4, 12, (0, 1, 2, 3))
# Ilimitado: tutti
P(cu('M_ili'), taiko() * 1.4, 1)
chords(cu('M_ili'), cu('M_p3'), 'choir', .5, 2); chords(cu('M_ili'), cu('M_p3'), 'brass', .3, 2); bassline(cu('M_ili'), cu('M_p3'), .45); drums(cu('M_ili'), cu('M_p3'), .55, True)
# ponto 3: o preco (escuro)
P(cu('M_p3'), note(37, cu('M_calm') - cu('M_p3'), 'pad') + note(38, cu('M_calm') - cu('M_p3'), 'pad') + note(44, cu('M_calm') - cu('M_p3'), 'pad'), .3)
for k, m in enumerate([74, 73, 74, 70, 69, 74]): P(cu('M_p3') + .4 + k * 1.1, note(m, 1.8, 'piano'), .18)
# venda: silencio e calma (fa maior suave)
for k, (c, L) in enumerate([([53, 57, 60, 65], 3.2), ([50, 57, 62, 65], 3.2), ([46, 53, 58, 62], 3.2)]):
    for m in c: P(cu('M_calm') + .6 + k * 3.2, note(m, L + .6, 'pad'), .08)
for k, m in enumerate([72, 69, 77, 76, 74, 72, 69, 72]): P(cu('M_calm') + 1.0 + k * .85, note(m, 1.6, 'piano'), .14)
# controle: construcao
chords(cu('M_rise'), cu('M_final'), 'pad', .28); arp(cu('M_rise'), cu('M_final'), 'bell', .12, B / 2, 24, (0, 1, 2, 3))
t = cu('M_rise') + 2.4
while t < cu('M_final'): P(t, taiko(), .3 + .3 * (t - cu('M_rise')) / (cu('M_final') - cu('M_rise'))); t += B
# final heroico
chords(cu('M_final'), cu('M_pot'), 'choir', .35, 2); bassline(cu('M_final'), cu('M_pot'), .35); arp(cu('M_final'), cu('M_pot'), 'pluck', .14)
P(cu('M_pot'), taiko() * 1.3, 1)
chords(cu('M_pot'), cu('M_end'), 'choir', .55, 2); chords(cu('M_pot'), cu('M_end'), 'brass', .32, 2); bassline(cu('M_pot'), cu('M_end'), .45); drums(cu('M_pot'), cu('M_end'), .55, True); arp(cu('M_pot'), cu('M_end'), 'pluck', .16, B / 4, 24, (0, 1, 2, 3))
# a pergunta: suspensao e acorde final
P(cu('M_end'), note(50, cu('M_dsp') - cu('M_end') + .3, 'pad') + note(57, cu('M_dsp') - cu('M_end') + .3, 'pad') + note(64, cu('M_dsp') - cu('M_end') + .3, 'pad'), .3)
for k, m in enumerate([69, 74, 76]): P(cu('M_end') + .5 + k * 1.2, note(m, 2, 'bell'), .14)
L = (CUE.get('M_outro', TOTAL)) - cu('M_dsp') + .2
P(cu('M_dsp'), taiko() * 1.4, 1); P(cu('M_dsp'), note(38, L, 'brass') + note(50, L, 'choir') + note(57, L, 'choir') + note(62, L, 'choir') + note(65, L, 'choir'), .5)
# ENCERRAMENTO: trilha animada (re maior, mais rapida)
if 'M_outro' in CUE:
    o0, o1, oE = cu('M_outro'), cu('M_o_like'), cu('M_o_end')
    BO = .44; DMJ = [[50, 57, 62, 66], [47, 54, 59, 62], [43, 50, 55, 59], [45, 52, 57, 61]]  # D Bm G A
    P(o0 + .1, taiko() * 1.3, 1); P(o0 + .1, note(38, 2.5, 'brass') + note(50, 2.5, 'choir') + note(57, 2.5, 'choir'), .4)
    t = o0 + .5; k = 0
    while t < oE - .2:
        c = DMJ[int((t - o0) / (BO * 8)) % 4]; amp = .6 if t > o1 else .5
        P(t, note(c[0] - 12, BO * .9, 'bass'), .45 * amp / .6)
        P(t, note(c[(k % 3) + 1] + 12, .4, 'pluck'), .16); P(t + BO / 2, note(c[((k + 1) % 3) + 1] + 12, .4, 'pluck'), .12)
        if k % 2 == 0: P(t, kick(), .5 * amp)
        else: P(t, taiko(), .35 * amp)
        if t > o1:
            for h in range(2): P(t + h * BO / 2, hat(), .7)
        if k % 8 == 0:
            for m in c[1:]: P(t, note(m, BO * 8 + .3, 'choir'), .1)
        t += BO; k += 1
    P(oE - .2, taiko() * 1.4, 1); P(oE - .2, note(38, 2.2, 'brass') + note(50, 2.2, 'choir') + note(57, 2.2, 'choir') + note(62, 2.2, 'choir') + note(66, 2.2, 'choir'), .45)
mus = reverb(mus, 2.0, .3)[:N]

# ---------------- MIXAGEM ----------------
def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; ch = w.getnchannels(); w.close()
    return a.reshape(-1, ch).mean(1) if ch > 1 else a
v = rd('audio/narracao.wav'); voice = np.zeros(N); voice[:min(N, len(v))] = v[:N]
k = int(.12 * SR); ve = np.convolve(np.abs(voice), np.ones(k) / k, mode='same'); vl = np.clip(ve / .06, 0, 1)
sm = np.zeros(N); a_, r_ = 1 - np.exp(-1 / (.02 * SR)), 1 - np.exp(-1 / (.16 * SR)); st = 64
for i in range(0, N, st):
    prev = sm[i - 1] if i else 0; x = vl[i]; c = a_ if x > prev else r_; sm[i:i + st] = prev + (x - prev) * (1 - (1 - c) ** st)
duck_mus = 1 - .58 * sm; duck_amb = 1 - .5 * sm; duck_fx = 1 - .4 * sm
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
