# Legendas coloridas (.ass) com o texto EXATO do roteiro, nos tempos reais da narracao
import json, re, os
os.chdir(os.path.dirname(os.path.abspath(__file__)))
D = json.load(open('sfx.json'))
CY, AM, VM, RX = 'FFF69F', '3FD2FF', '6D4DFF', 'FF6BC8'   # cores em BGR: ciano, amarelo, vermelho, roxo
KW = {'parou.': RX, 'bala': AM, 'move.': CY, 'Jotaro?': AM, 'Jotaro': AM, 'espírito': RX, 'possuído': VM, 'cela.': VM, 'Stand:': RX, 'Stand': RX,
      'energia': CY, 'vital': CY, 'Star': AM, 'Platinum.': AM, 'Platinum:': AM, 'força': AM, 'velocidade.': AM, 'velocidade': AM, 'máxima': AM, 'precisão.': CY,
      'curto.': VM, 'socos:': RX, 'ORA': RX, 'ORA!': RX, 'queima-roupa.': VM, 'visão.': CY, 'mosca': CY, 'foto.': CY, 'Egito.': AM, 'assustador.': VM,
      'The': RX, 'World.': RX, 'tempo.': CY, 'congela.': CY, 'segundos,': AM, 'nunca': VM, 'meio': AM, 'segundo!': AM, 'dor.': VM, 'atraem…': AM,
      'dourado': AM, 'tempo…': AM, 'dentro': CY, 'final:': AM, 'correr.': CY, 'Yare': RX, 'yare': RX, 'daze.': AM, 'poder?': AM, 'sim': CY, 'não.': VM}
def ts(x): h = int(x // 3600); m = int(x % 3600 // 60); s = x % 60; return f"{h}:{m:02d}:{s:05.2f}"
ev = []
RJ = json.load(open('roteiro.json')); PW = RJ.get('palavras')
for pi, (text, a, b) in enumerate(D['phrases']):
    w = text.split(); ch = []; cur = []
    for x in w:
        cur.append(x)
        if len(cur) >= 4 or (len(cur) >= 2 and re.search(r'[.,!?:…]["]?$', x)): ch.append(cur); cur = []
    if cur:
        if ch and len(cur) == 1 and len(ch[-1]) < 4: ch[-1] += cur
        else: ch.append(cur)
    L = [sum(len(x) + 1 for x in c) for c in ch]; tot = sum(L); t = a; wi = 0
    for c, l in zip(ch, L):
        e = t + (b - a) * l / tot
        if PW and pi < len(PW) and len(PW[pi]) == len(w):  # tempos reais das palavras
            t = PW[pi][wi][1]; wi += len(c); e = PW[pi][wi][1] if wi < len(w) else b
        s = ' '.join('{\\c&H%s&}%s{\\c&HFFFFFF&}' % (KW[x], x) if x in KW else x for x in c)
        ev.append((t, e + (.12 if c is ch[-1] else 0), s)); t = e
hdr = '''[Script Info]
ScriptType: v4.00+
PlayResX: 1080
PlayResY: 1920
WrapStyle: 0

[V4+ Styles]
Format: Name,Fontname,Fontsize,PrimaryColour,SecondaryColour,OutlineColour,BackColour,Bold,Italic,Underline,StrikeOut,ScaleX,ScaleY,Spacing,Angle,BorderStyle,Outline,Shadow,Alignment,MarginL,MarginR,MarginV,Encoding
Style: Cap,Poppins Black,76,&H00FFFFFF,&H00FFFFFF,&H00241018,&H96000000,0,0,0,0,100,100,0,0,1,9,4,2,90,90,330,1

[Events]
Format: Layer,Start,End,Style,Name,MarginL,MarginR,MarginV,Effect,Text
'''
body = ''.join(f"Dialogue: 0,{ts(a)},{ts(b)},Cap,,0,0,0,,{{\\fscx85\\fscy85\\t(0,90,\\fscx100\\fscy100)}}{t}\n" for a, b, t in ev)
open('legendas.ass', 'w', encoding='utf-8').write(hdr + body)
print(len(ev), 'legendas')
