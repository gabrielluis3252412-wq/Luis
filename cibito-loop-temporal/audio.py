# Efeitos sonoros (sintetizados) + ambiencias + trilha instrumental de suspense,
# mixados sob a voz (que fica sempre intacta e na frente). Saida: audio/mix_final.wav
import numpy as np, wave, json, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
SR = 44100
rng = np.random.default_rng(3)
D = json.load(open('sfx.json')); TOTAL = D['total']; OFF = D['off']; N = int(TOTAL * SR)
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
    y = np.fft.irfft(np.fft.rfft(x, len(x) + n) * np.fft.rfft(ir, len(x) + n))[:len(x) + n]
    y = norm(y, np.max(np.abs(x)) * .9)
    out = np.zeros(len(x) + n); out[:len(x)] += x * (1 - mix); out += y * mix; return out
def pad(x, d): o = np.zeros(int(d * SR)); o[:min(len(x), len(o))] = x[:len(o)]; return o

# ---------------- EFEITOS ----------------
def whoosh(d=.45, hi=4000):
    n = int(d * SR); e = np.sin(np.linspace(0, np.pi, n)) ** 1.6
    a = filt(noise(n), lo=300, hi=hi * .4); b = filt(noise(n), lo=800, hi=hi)
    w = np.linspace(0, 1, n); return norm((a * (1 - w) + b * w) * e, .8)
def swish(): return whoosh(.22, 7000) * .8
def zoom():
    d = .45; n = int(d * SR); x = filt(noise(n), lo=500, hi=6000) * np.linspace(0, 1, n) ** 2
    return norm(x + .4 * osc(np.linspace(150, 1100, n), d) * np.linspace(0, 1, n) ** 2, .8) * att(n, .01)
def flash():
    d = .7; n = int(d * SR); return norm(osc(np.linspace(110, 35, n), d) * dec(n, 6) + .4 * filt(noise(n), lo=3000) * dec(n, 10), .9)
def hit():
    d = 2.2; n = int(d * SR)
    sub = osc(55 * np.exp(-np.linspace(0, 1.6, n)) + 28, d) * dec(n, 4)
    bang = filt(noise(n), hi=1800) * dec(n, 18); top = filt(noise(n), lo=2500) * dec(n, 30)
    return norm(reverb(sub * 1.2 + bang * .9 + top * .3, 1.8, .35), 1)
def dark():
    d = 1.0; n = int(d * SR); return norm(osc(np.linspace(70, 40, n), d) * np.sin(np.linspace(0, np.pi, n)) + .3 * filt(noise(n), hi=600) * np.sin(np.linspace(0, np.pi, n)), .7)
def riser_loop():
    d = 3.6; n = int(d * SR); w = np.linspace(0, 1, n); x = np.zeros(n)
    for k, f in enumerate([220, 277, 330, 440, 554]):
        x += osc(f * (1 + .5 * w ** 2) * (1 + .004 * np.sin(2 * np.pi * (4 + k) * T(d))), d) * .2
    x += filt(noise(n), lo=2000) * .25 * w ** 2
    return norm(reverb(x * w ** 1.5 * fadeout(np.ones(n), .2), 1.5, .4), .7)
def tick():
    d = .06; n = int(d * SR); return norm(filt(noise(n), lo=2500, hi=7000) * dec(n, 40) + .5 * osc(2400, d) * dec(n, 60), .6)
def pop():
    d = .13; n = int(d * SR); return norm(osc(np.linspace(380, 1000, n), d) * dec(n, 9) + .3 * filt(noise(n), lo=3000) * dec(n, 60), .7)
def ding():
    d = 1.2; n = int(d * SR); return norm((osc(1568, d) + .4 * osc(3136, d) + .2 * osc(4704, d)) * dec(n, 5), .6)
def chime():
    out = np.zeros(int(1.6 * SR))
    for k, f in enumerate((784, 988, 1175, 1568)):
        s = (osc(f, 1) + .3 * osc(2 * f, 1)) * dec(SR, 5) * .3; o = int(k * .07 * SR); out[o:o + SR] += s
    return norm(reverb(out, 1, .3), .6)
def ring():  # toque de celular
    d = .9; t = T(d); f = np.where((t * 18).astype(int) % 2 == 0, 1320, 990)
    on = ((t < .35) | ((t > .45) & (t < .8))).astype(float)
    return norm(osc(f, d, 'sq') * on * .5 + osc(f * 2, d) * on * .2, .45)
def sting():
    d = .9; n = int(d * SR); x = sum(osc(f, d, 'saw') for f in (233, 277, 349)) / 3
    return norm(filt(x, hi=2200) * att(n, .02) * dec(n, 3), .6)
def grunt_horn():
    d = .45; n = int(d * SR); x = osc(420, d, 'saw') + osc(520, d, 'saw')
    return norm(filt(x, hi=2500) * att(n, .01) * fadeout(np.ones(n), .08), .5)
def cash():
    o = np.zeros(int(1.0 * SR)); c = filt(noise(int(.05 * SR)), lo=2000) * dec(int(.05 * SR), 20); o[:len(c)] += c
    b = (osc(2093, .8) + .5 * osc(2637, .8)) * dec(int(.8 * SR), 5) * .6; o[int(.08 * SR):int(.08 * SR) + len(b)] += b
    return norm(o, .6)
def poof():
    d = .5; n = int(d * SR); return norm(filt(noise(n), lo=200, hi=2500) * att(n, .005) * dec(n, 7), .8)
def sting_hi():  # violinos agudos de susto
    d = 1.6; n = int(d * SR); t = T(d); x = np.zeros(n)
    for f in (1661, 1760, 1865, 2217):
        x += osc(f * (1 + .006 * np.sin(2 * np.pi * 6.5 * t)), d, 'saw')
    x = filt(x, lo=900, hi=6000) * att(n, .02) * dec(n, 2.5)
    return norm(reverb(x, 1.2, .35), .55)
def sting_low():
    d = 3.0; n = int(d * SR); t = T(d); x = np.zeros(n)
    for f in (55, 58.3, 82.4, 87.3, 110):
        x += osc(f, d, 'saw') * .3
    x = filt(x, hi=900) * att(n, .03) * dec(n, 2.2); x += osc(40, d) * dec(n, 3) * .8
    return norm(reverb(x, 2, .3), .9)
def screech():  # pneu cantando
    d = 1.9; n = int(d * SR); t = T(d)
    f = 1900 + 250 * np.sin(2 * np.pi * 13 * t) + 120 * filt(noise(n), hi=30) * 8
    x = osc(f, d, 'saw') * .5 + filt(noise(n), lo=1500, hi=5000) * .6
    e = att(n, .05) * (0.7 + .3 * np.sin(2 * np.pi * 7 * t)); return norm(filt(x, lo=900, hi=7000) * e * fadeout(np.ones(n), .2), .7)
def crash():
    d = 1.8; n = int(d * SR); x = filt(noise(n), hi=4000) * dec(n, 6)
    for f in (317, 523, 811, 1247, 1733, 2411):
        x += osc(f * (1 + .01 * rng.standard_normal()), d) * dec(n, 4 + rng.random() * 6) * .25
    x += osc(np.linspace(90, 35, n), d) * dec(n, 5) * 1.2
    return norm(reverb(x, 1.2, .25), 1)
def glass():
    o = np.zeros(int(1.2 * SR))
    for k in range(14):
        f = 3000 + rng.random() * 5000; d = .25; s = osc(f, d) * dec(int(d * SR), 14) * (.3 + .4 * rng.random())
        i = int(rng.random() * .7 * SR); o[i:i + len(s)] += s
    return norm(o, .45)
def boing():
    d = .55; t = T(d); f = 180 + 260 * np.sin(np.pi * np.minimum(t / d * 1.4, 1)) + 40 * np.sin(2 * np.pi * 15 * t)
    return norm(osc(f, d) * dec(len(t), 4), .6)
def heart():
    o = np.zeros(int(.7 * SR))
    for t0, a in ((0, 1), (.2, .7)):
        d = .22; s = osc(np.linspace(70, 40, int(d * SR)), d) * dec(int(d * SR), 9) * a; i = int(t0 * SR); o[i:i + len(s)] += s
    return norm(filt(o, hi=300), .9)
def tweet():
    o = np.zeros(int(1.2 * SR))
    for k in range(6):
        d = .09; s = osc(np.linspace(3200, 4600, int(d * SR)) + 300 * np.sin(np.linspace(0, 20, int(d * SR))), d) * np.sin(np.linspace(0, np.pi, int(d * SR)))
        i = int((k * .17) * SR); o[i:i + len(s)] += s * .5
    return o
def ufa():
    d = .7; n = int(d * SR); return norm(osc(np.linspace(1400, 600, n), d) * np.sin(np.linspace(0, np.pi, n)) * .6 + filt(noise(n), lo=800, hi=3000) * .2 * np.sin(np.linspace(0, np.pi, n)), .45)
def slide():
    d = .9; n = int(d * SR); t = np.linspace(0, 1, n); f = 500 + 900 * np.sin(np.pi * t)
    return norm(osc(f, d, 'tri') * att(n, .02) * fadeout(np.ones(n), .1), .4)
def creak():
    d = 1.1; n = int(d * SR); t = T(d); f = 90 + 40 * np.sin(2 * np.pi * .9 * t)
    g = (np.sin(2 * np.pi * np.cumsum(f) / SR) > .9).astype(float); x = filt(g * noise(n) + g, lo=200, hi=3000)
    return norm(x * np.sin(np.linspace(0, np.pi, n)), .4)
def step():
    d = .16; n = int(d * SR); return norm(osc(np.linspace(80, 45, n), d) * dec(n, 10) + filt(noise(n), hi=900) * dec(n, 30) * .6, .55)
def click():
    d = .05; n = int(d * SR); return norm(filt(noise(n), lo=1500) * dec(n, 30), .6)
def snore():
    d = 1.3; n = int(d * SR); e = np.sin(np.linspace(0, np.pi, n)) ** 2
    return norm(filt(noise(n) * (1 + .8 * osc(38, d, 'saw')), lo=80, hi=900) * e, .35)
def rewind():  # fita rebobinando (o som do loop)
    d = 1.4; n = int(d * SR); t = T(d); w = t / d
    f = 600 + 2600 * w ** 1.4 + 500 * np.sin(2 * np.pi * 23 * t)
    x = osc(f, d, 'saw') * .3 + filt(noise(n), lo=1500, hi=8000) * .4 * (.5 + .5 * np.sin(2 * np.pi * 31 * t))
    x = filt(x, lo=300, hi=7000) * np.minimum(1, w * 8) * fadeout(np.ones(n), .15)
    return norm(x + .5 * whoosh(d, 6000), .75)
def alarm():
    o = np.zeros(int(1.6 * SR))
    for k in range(4):
        s = osc(2000, .12, 'sq') * .35; i = int(k * .3 * SR); o[i:i + len(s)] += s
    return filt(o, hi=5000)
def birds():
    o = np.zeros(int(3 * SR))
    for k in range(10):
        b = tweet() * (.3 + .3 * rng.random()); i = int(rng.random() * 1.8 * SR); o[i:i + len(b)] += b[:len(o) - i]
    return norm(o, .35)
def door():
    o = np.zeros(int(1.2 * SR)); c = creak()[:int(.8 * SR)]; o[:len(c)] += c; th = step() * 1.2; i = int(.75 * SR); o[i:i + len(th)] += th
    return o
def record():
    d = .5; n = int(d * SR); t = T(d); f = 300 + 1200 * np.abs(np.sin(2 * np.pi * 3 * t))
    return norm(filt(osc(f, d, 'saw') + noise(n) * .6, lo=300, hi=5000) * fadeout(np.ones(n), .1), .6)
def loop_hit():
    h = hit(); r = riser_loop()[::-1][: int(.5 * SR)] * .6; o = np.zeros(len(h) + int(.6 * SR))
    o[:len(h)] += h; w = whoosh(1.2, 5000) * .6; o[:len(w)] += w * np.sin(np.linspace(0, 30, len(w))) ** 2
    return norm(o, 1)
def whisper():
    d = 1.6; n = int(d * SR); t = T(d); x = np.zeros(n)
    for k in range(5):
        s0 = rng.random() * 1.2; L = .2 + rng.random() * .25; m = ((t > s0) & (t < s0 + L)).astype(float) * np.sin(np.clip((t - s0) / L, 0, 1) * np.pi)
        x += filt(noise(n), lo=1800 + 800 * k % 3, hi=5500) * m
    return norm(reverb(x, 1.5, .5), .35)
def thunder():
    d = 3.2; n = int(d * SR); x = filt(noise(n), hi=300) * dec(n, 2.5) * (1 + .6 * np.sin(2 * np.pi * 3 * T(d)))
    c = filt(noise(n), lo=1500) * dec(n, 25) * .5; return norm(reverb(x + c, 1.5, .3), .9)
def monster():
    d = 2.4; n = int(d * SR); t = T(d); f = 42 + 6 * np.sin(2 * np.pi * 1.3 * t)
    x = filt(osc(f, d, 'saw') * (1 + .7 * filt(noise(n), hi=40) * 6), hi=700) * att(n, .15) * fadeout(np.ones(n), .6)
    return norm(reverb(x, 1.8, .3), .9)
def final():
    d = 2.6; n = int(d * SR); x = sum(osc(f, d, 'saw') for f in (73.4, 87.3, 110, 146.8)) / 4
    return norm(reverb(filt(x, hi=1200) * att(n, .01) * dec(n, 2) + hit()[:n] * .7, 2, .35), .9)
# ambiencias (duracao definida pela cena)
def amb_road(d):
    n = int(d * SR); t = T(d); return filt(noise(n), lo=80, hi=500) * (.6 + .4 * np.sin(2 * np.pi * .23 * t)) * .25
def engine(d, f0=48, k=.5):
    n = int(d * SR); t = T(d); f = f0 * (1 + .03 * np.sin(2 * np.pi * .7 * t)); x = osc(f, d, 'saw') + .5 * osc(f * 2, d, 'saw')
    return filt(x * (1 + .2 * np.sin(2 * np.pi * f / 4 * t)), hi=420) * k
def engine_in(d): return filt(engine(d, 44, .6), hi=220)
def engine_fast(d): return engine(d, 74, .55) + filt(noise(int(d * SR)), lo=300, hi=1500) * .12
def amb_town(d):
    n = int(d * SR); x = filt(noise(n), lo=100, hi=700) * .12
    for k in range(int(d / 1.6)):
        b = tweet() * .15; i = int(rng.random() * (d - 1.3) * SR); x[i:i + len(b)] += b[:n - i]
    return x
def amb_night(d):
    n = int(d * SR); t = T(d); cr = osc(4600, d) * ((np.sin(2 * np.pi * 28 * t) > .2) * (np.sin(2 * np.pi * .9 * t) > 0)) * .05
    return cr + filt(noise(n), lo=80, hi=400) * .12
def drone(d):
    n = int(d * SR); t = T(d); x = osc(55, d) * .5 + osc(55.8, d) * .5 + osc(110.6, d, 'tri') * .15 + filt(noise(n), lo=3000, hi=6000) * .03 * (1 + np.sin(2 * np.pi * .3 * t))
    return x * np.minimum(1, t / 1.2) * .22
AMB = {'amb_road': amb_road, 'engine': engine, 'engine_in': engine_in, 'engine_fast': engine_fast, 'amb_town': amb_town, 'amb_night': amb_night, 'drone': drone}
G = {k: v for k, v in globals().items() if callable(v) and k in {s[1] for s in D['sfx']} and k not in AMB}

# fronteiras das cenas (para limitar as ambiencias)
CUTS = sorted({round(t, 3) for t, k, v in D['sfx'] if k in AMB} | {3.8, 10.35, 16.45, 21.3, 27.8, 30.45, 35.65, 40.7, 48.5, 52.35, 55.7, 61.45, 67.6, 70.7, 76.25, 83.65, TOTAL})
crash_t = [t for t, k, v in D['sfx'] if k == 'crash'][0]
fx = np.zeros(N); amb = np.zeros(N); cache = {}
def add(buf, t, s, v):
    i = int(max(0, t) * SR); e = min(N, i + len(s)); buf[i:e] += s[:e - i] * v
for t, k, v in D['sfx']:
    if k in AMB:
        nxt = [c for c in CUTS if c > t + .5]; end = nxt[0] if nxt else TOTAL
        if k in ('engine', 'amb_road') and t < crash_t < end: end = crash_t
        if k == 'drone': end = min(TOTAL, [c for c in CUTS if c > t + .5][0] + (7.4 if t > 76 else 0))
        s = AMB[k](end - t + .3); k2 = int(.3 * SR); s[-k2:] *= np.linspace(1, 0, k2); s[:int(.15 * SR)] *= np.linspace(0, 1, int(.15 * SR))
        add(amb, t, s, v)
    else:
        if k not in cache: cache[k] = G[k]()
        add(fx, t, cache[k], v)

# ---------------- TRILHA INSTRUMENTAL ----------------
def hz(m): return 440 * 2 ** ((m - 69) / 12)
def note(m, d, kind='pluck'):
    n = int(d * SR); t = T(d); f = hz(m)
    if kind == 'pluck': return (osc(f, d) + .4 * osc(2 * f, d) + .15 * osc(3 * f, d)) * np.minimum(1, t / .004) * np.exp(-6 * t)
    if kind == 'box': return (osc(f, d) + .3 * osc(2.01 * f, d) + .2 * osc(4.2 * f, d)) * np.minimum(1, t / .002) * np.exp(-3.5 * t)
    if kind == 'piano': return (osc(f, d) + .5 * osc(2 * f, d) + .2 * osc(3 * f, d)) * np.minimum(1, t / .003) * np.exp(-2.2 * t)
    if kind == 'bass': return filt(osc(f, d, 'saw'), hi=400) * np.minimum(1, t / .01) * np.exp(-3 * t)
    if kind == 'pad':
        x = sum(osc(f * dt, d, 'saw') for dt in (.996, 1.004)) / 2
        return filt(x, hi=1400) * np.minimum(1, t / .8) * np.minimum(1, (d - t) / .6)
def kick():
    d = .3; t = T(d); return osc(45 + 100 * np.exp(-t * 30), d) * np.exp(-t * 10)
mus = np.zeros(N)
def P(t, s, g=1): add(mus, t, s, g)
LOOP = [74, 77, 81, 79, 77, 76, 74, 73]  # tema do loop (caixinha de musica, re menor)
# gancho
P(0, note(50, 3.8, 'pad') + note(57, 3.8, 'pad'), .25)
for i, m in enumerate(LOOP): P(.15 + i * .42, note(m, 1.2, 'box'), .4)
# viagem (leve, divertida) 3.8-21.3
B = .5
for k in range(int((21.3 - 3.8) / B)):
    t = 3.8 + k * B; ch = [[50, 57, 62], [46, 53, 58], [48, 55, 60], [45, 52, 57]][(k // 8) % 4]
    P(t, note(ch[0] - 12, .45, 'bass'), .5 if k % 2 == 0 else .3)
    P(t + B / 2, note(ch[1 + k % 2] + 12, .3, 'pluck'), .22)
    if k % 4 == 0: P(t, kick(), .25)
# tensao do veado 21.3 -> batida
for k in range(int((crash_t - 21.3) / .25)):
    t = 21.3 + k * .25; P(t, note(38 + (k % 2), .25, 'bass'), .3 + .5 * k / ((crash_t - 21.3) / .25))
P(21.3, note(62, crash_t - 21.3, 'pad') + note(63, crash_t - 21.3, 'pad'), .18)
# comedia 27.8-35.65 (pizzicato)
for k, m in enumerate([62, 65, 69, 65, 62, 65, 69, 72, 70, 69, 67, 65, 64, 62]):
    P(30.5 + k * .35, note(m, .3, 'pluck'), .3)
# suspense na cidade 35.65-48.5
P(35.65, note(38, 12.9, 'pad') + note(45, 12.9, 'pad'), .28)
for k, m in enumerate([62, 65, 64, 61, 62, 65, 69, 68]): P(36.2 + k * 1.5, note(m, 1.8, 'piano'), .3)
for k in range(int((48.5 - 40.7) / .75)): P(40.7 + k * .75, kick(), .35)
# hotel (caixinha lenta)
for i, m in enumerate(LOOP[:6]): P(48.7 + i * .6, note(m - 12, 1.5, 'box'), .25)
# manha em casa 52.35-61.45 (tema do loop leve)
for i in range(16): P(53.7 + i * .45, note(LOOP[i % 8] + 12, 1.0, 'box'), .22)
for k, m in enumerate([62, 66, 69, 66, 64, 67, 71, 67]): P(56 + k * .6, note(m, .3, 'pluck'), .2)
# LOOP TEMPORAL 61.45-67.6
P(61.45, note(38, 6.2, 'pad') + note(50, 6.2, 'pad') + note(57, 6.2, 'pad'), .3)
for i in range(int(6 / .2)): P(61.6 + i * .2, note(LOOP[i % 8], .5, 'box'), .18 + .2 * i / 30)
for k in range(12): P(61.5 + k * .5, note(38, .45, 'bass'), .5)
# volta de carro (pulso) 67.6-70.7
for k in range(int(3.1 / .25)): P(67.6 + k * .25, note(38 if k % 4 < 2 else 41, .25, 'bass'), .55); P(67.6 + k * .5, kick(), .3) if k < 6 else None
# horror 70.7-83.65
P(70.7, note(37, 12.9, 'pad') + note(38, 12.9, 'pad') + note(44, 12.9, 'pad'), .28)
for k, m in enumerate([74, 73, 74, 70, 69, 74, 73, 77]): P(71.2 + k * 1.55, note(m, 2.2, 'piano'), .22)
# final: silencio antes do "ELE QUEM?!" e acorde final
P(D['phrases'][29][2] + .15, note(26, 2.6, 'pad') + note(33, 2.6, 'pad') + note(39, 2.6, 'pad'), .5)
mus = reverb(mus, 1.8, .3)[:N]

# ---------------- MIXAGEM ----------------
def rd(f):
    w = wave.open(f); a = np.frombuffer(w.readframes(w.getnframes()), dtype=np.int16).astype(np.float64) / 32768; w.close(); return a
v = rd('audio/voz_final.wav'); voice = np.zeros(N); o = int(OFF * SR); voice[o:o + len(v)] = v[:N - o]
k = int(.12 * SR); ve = np.convolve(np.abs(voice), np.ones(k) / k, mode='same'); vl = np.clip(ve / .06, 0, 1)
# suaviza o ducking (ataque rapido, liberacao lenta)
sm = np.zeros(N); a_, r_ = 1 - np.exp(-1 / (.02 * SR)), 1 - np.exp(-1 / (.35 * SR))
step_ = 64
for i in range(0, N, step_):
    prev = sm[i - 1] if i else 0; x = vl[i]; c = a_ if x > prev else r_; sm[i:i + step_] = prev + (x - prev) * (1 - (1 - c) ** step_)
duck_mus = 1 - .82 * sm; duck_amb = 1 - .75 * sm; duck_fx = 1 - .65 * sm
fx = np.tanh(fx * .9)
mix_m = voice * 1.0 + fx * .36 * duck_fx + amb * .4 * duck_amb + norm(mus, 1) * .18 * duck_mus
# estereo: efeitos e musica levemente abertos, voz no centro
d = int(.011 * SR); SB = fx * .36 * duck_fx + norm(mus, 1) * .18 * duck_mus; side = np.concatenate([np.zeros(d), SB[:-d]]) - SB
L = mix_m + .25 * side; R = mix_m - .25 * side
fo = int(.5 * SR); L[-fo:] *= np.linspace(1, 0, fo); R[-fo:] *= np.linspace(1, 0, fo)
pk = max(np.max(np.abs(L)), np.max(np.abs(R))); L /= max(1, pk / .97); R /= max(1, pk / .97)
w = wave.open('audio/mix_final.wav', 'wb'); w.setnchannels(2); w.setsampwidth(2); w.setframerate(SR)
w.writeframes((np.stack([L, R], 1) * 32767).astype(np.int16).tobytes()); w.close()
# tambem salva as faixas separadas (para ajustes futuros)
for name, x in (('efeitos', fx * .42 + amb * .5), ('musica', norm(mus, 1) * .22)):
    w = wave.open(f'audio/{name}.wav', 'wb'); w.setnchannels(1); w.setsampwidth(2); w.setframerate(SR); w.writeframes((np.clip(x, -1, 1) * 32767).astype(np.int16).tobytes()); w.close()
print('ok', N / SR, 's | pico', round(pk, 3), '| efeitos:', len(D['sfx']))
