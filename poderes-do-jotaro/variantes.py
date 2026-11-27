# Gera variacoes dos cenarios (mesmas imagens de plates/, so com tratamento de cor/desfoque),
# trocadas por opacidade no video em vez de filtros CSS a cada quadro (muito mais rapido em 4K):
#   b  = desfocado (profundidade de campo)     n = noite (quarto/cela)
#   f  = tempo parado do Star Platinum (duotono roxo)   g = tempo parado do rival (duotono dourado)
# e a versao desfocada de cada uma (nb, fb, gb). Saida: plates/<cena>_<A|B><var>.webp
# Uso: python3 variantes.py
import os, numpy as np
from PIL import Image, ImageFilter
os.chdir(os.path.dirname(os.path.abspath(__file__)))
ALT = {'bed': 'n', 'hot': 'n', 'str': 'fg', 'twn2': 'f', 'twn': 'f', 'kit': 'f', 'twn3': 'f'}
USE = ['bed', 'hot', 'str', 'twn', 'twn2', 'twn3', 'kit', 'liv', 'prcW']
BLUR = 7.0  # raio em pixels da imagem 2376x4224 (~3,2 px no video 1080 / 6,4 px no 4K)

def lum(a): return (a[..., 0] * .299 + a[..., 1] * .587 + a[..., 2] * .114)
def duo(a, c0, c1, keep=.16, gam=.9):
    L = np.clip(lum(a), 0, 1) ** gam
    d = np.array(c0)[None, None] * (1 - L[..., None]) + np.array(c1)[None, None] * L[..., None]
    return d * (1 - keep) + a * keep
def night(a):
    L = lum(a)[..., None]; s = L + (a - L) * .55
    return np.clip(s * np.array([.62, .7, 1.05]) * .62 + np.array([.01, .015, .05]), 0, 1)
OPS = {'n': night,
       'f': lambda a: duo(a, (.05, .02, .17), (.93, .88, 1.0), .14, 1.25),
       'g': lambda a: duo(a, (.1, .05, .01), (1.0, .9, .52), .14, 1.25)}
def blur(im):  # desfoque com alfa pre-multiplicado (sem halo escuro nas bordas do primeiro plano)
    a = np.asarray(im).astype(np.float32) / 255; al = a[..., 3:4]
    pm = np.concatenate([a[..., :3] * al, al], -1)
    bl = np.asarray(Image.fromarray((pm * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(BLUR))).astype(np.float32) / 255
    rgb = bl[..., :3] / np.maximum(bl[..., 3:4], 1e-4)
    return Image.fromarray((np.concatenate([np.clip(rgb, 0, 1), bl[..., 3:4]], -1) * 255).astype(np.uint8))
def save(im, f, opaque):
    (im.convert('RGB') if opaque else im).save(f, 'WEBP', quality=90, method=4)
for k in USE:
    for L in 'AB':
        src = Image.open(f'plates/{k}_{L}.png').convert('RGBA'); op = L == 'A'
        save(blur(src), f'plates/{k}_{L}b.webp', op)
        a = np.asarray(src).astype(np.float32) / 255
        for v in ALT.get(k, ''):
            rgb = OPS[v](a[..., :3]); im = Image.fromarray((np.concatenate([np.clip(rgb, 0, 1), a[..., 3:4]], -1) * 255).astype(np.uint8))
            save(im, f'plates/{k}_{L}{v}.webp', op); save(blur(im), f'plates/{k}_{L}{v}b.webp', op)
    print(k, 'ok', ALT.get(k, ''))
