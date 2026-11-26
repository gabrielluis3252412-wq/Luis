# Legendas coloridas (.ass) com o texto EXATO do roteiro, nos tempos reais da narracao
import json, re, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
D = json.load(open('sfx.json'))
KW = {'nunca': 'FFD94C', 'termina?': 'FFD94C', 'Colinas': '6BFF7D', 'Mares.': '6BFF7D', 'Clarona!': '3B3BFF', 'internet': '3FD2FF',
      'desaparecem!"': '3FD2FF', 'veado': 'FFD94C', 'colidindo!': '3B3BFF', 'MEU': '3B3BFF', 'DEUS!': '3B3BFF', 'animal.': '6BFF7D',
      'olhando': 'FF8FC9', 'Elias': 'FFB8C9', 'Elias.': 'FFB8C9', 'volte': '3B3BFF', 'hotel.': 'FFD94C', 'casa!': 'FFD94C',
      'engravida': 'C95DFF', 'mesmo': 'FFD94C', 'dia.': 'FFD94C', 'loop': 'FFF27E', 'temporal!': 'C97AFF', 'parados': 'FF8FC9',
      'sabe': '3B3BFF', 'escapar."': '3B3BFF', 'ELE': '4CD9FF', 'QUEM?!"': '4CD9FF'}
def ts(x): h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60; return f"{h}:{m:02d}:{s:05.2f}"
ev = []
for text, a, b in D['phrases']:
    w = text.split(); ch = []; cur = []
    for x in w:
        cur.append(x)
        if len(cur) >= 4 or (len(cur) >= 2 and re.search(r'[.,!?:…]["]?$', x)): ch.append(cur); cur = []
    if cur:
        if ch and len(cur) == 1 and len(ch[-1]) < 4: ch[-1] += cur
        else: ch.append(cur)
    L = [sum(len(x) + 1 for x in c) for c in ch]; tot = sum(L); t = a
    for c, l in zip(ch, L):
        e = t + (b - a) * l / tot
        k = lambda x: x if x in KW else x.strip('"')
        s = ' '.join('{\\c&H%s&}%s{\\c&HFFFFFF&}' % (KW[k(x)], x) if k(x) in KW else x for x in c)
        ev.append((t, e + (.12 if c is ch[-1] else 0), s)); t = e
hdr = '''[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Cap,Poppins Black,84,&H00FFFFFF,&H00FFFFFF,&H00241018,&H96000000,0,0,0,0,100,100,0,0,1,9,4,2,70,70,300,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
'''
# pequeno "pop" de entrada em cada legenda
body = ''.join(f"Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{{\\fscx85\\fscy85\\t(0,90,\\fscx100\\fscy100)}}{t}\n" for a, b, t in ev)
open('legendas.ass', 'w', encoding='utf-8').write(hdr + body)
print(len(ev), 'legendas')
