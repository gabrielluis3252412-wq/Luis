# Legendas coloridas (.ass) com o texto EXATO do roteiro, nos tempos reais da narracao (ja com a abertura)
import json, re, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
D = json.load(open('sfx.json'))
CY, AM, VM, RX = 'FFD24F', '3FD2FF', '6D4DFF', 'FF8BC9'   # cores em BGR: ciano, amarelo, vermelho, roxo
KW = {'absurdo': AM, 'Saitama,': AM, 'soco?': AM, 'treinar': CY, 'limites': VM, 'humanos.': VM, 'três': AM, 'anos,': AM, 'cem': AM, 'dez': AM,
      'quilômetros': AM, 'esforço…': VM, 'impossível.': VM, 'milhares': AM, 'inacreditável': CY, 'músculos': AM, 'resistentes,': AM,
      'velocidade': CY, 'cabelos': RX, 'cair…': RX, 'careca!': AM, 'menor': CY, 'saltar': CY, 'prédios,': CY, 'velocidades': CY, 'absurdas': CY,
      'monstros': RX, 'gigantescos': RX, 'medo.': AM, 'colossal': VM, 'cidade.': VM, 'punho': VM, 'destruir': VM, 'desviaria': CY, 'atrás': CY,
      'soco': AM, 'poderoso': AM, 'vento': CY, 'nuvens.': CY, 'derrotado': AM, 'segundos.': AM, 'assustador…': RX, 'nunca': RX, 'adversário': RX,
      'altura.': RX, 'desafio': CY, 'coração': VM, 'acelerar.': VM, 'Comente': AM, '“CARECA”': AM, 'poder!': AM}
def ts(x): h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60; return f"{h}:{m:02d}:{s:05.2f}"
ev = []
R = json.load(open('roteiro.json')); OFF = D.get('off', 0); PW = R.get('palavras') or [None] * len(R['frases'])
for (text, a, b), pw in zip(D['phrases'], PW):
    w = text.split(); ch = []; cur = []
    for x in w:
        cur.append(x)
        if len(cur) >= 4 or (len(cur) >= 2 and re.search(r'[.,!?:…]["”]?$', x)): ch.append(cur); cur = []
    if cur:
        if ch and len(cur) == 1 and len(ch[-1]) < 4: ch[-1] += cur
        else: ch.append(cur)
    tt = []
    if pw and len(pw) == len(w):  # tempos reais de cada palavra
        k = 0
        for c in ch: tt.append((pw[k][1] + OFF, pw[k + len(c) - 1][2] + OFF)); k += len(c)
        tt = [(s0, tt[i + 1][0] if i + 1 < len(tt) else e0 + .12) for i, (s0, e0) in enumerate(tt)]
    else:
        L = [sum(len(x) + 1 for x in c) for c in ch]; tot = sum(L); t = a
        for c, l in zip(ch, L):
            e = t + (b - a) * l / tot; tt.append((t, e + (.12 if c is ch[-1] else 0))); t = e
    for c, (s0, e0) in zip(ch, tt):
        st = ' '.join('{\\c&H%s&}%s{\\c&HFFFFFF&}' % (KW[x], x) if x in KW else x for x in c)
        ev.append((s0, e0, st))
hdr = '''[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Cap,Poppins Black,80,&H00FFFFFF,&H00FFFFFF,&H00241018,&H96000000,0,0,0,0,100,100,0,0,1,9,4,2,90,90,330,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
'''
body = ''.join(f"Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{{\\fscx85\\fscy85\\t(0,90,\\fscx100\\fscy100)}}{t}\n" for a, b, t in ev)
open('legendas.ass', 'w', encoding='utf-8').write(hdr + body)
print(len(ev), 'legendas')
