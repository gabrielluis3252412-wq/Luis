# E se você tivesse os Seis Olhos? — Short animado

Short vertical **1080 × 1920, 24 fps, ~86 s, H.264 + AAC**, feito com o mesmo motor do projeto
"Cibito e o Loop Temporal": personagens 2D de contorno grosso sobre cenários 3D prontos.

**Vídeo final:** `seis-olhos-gojo.mp4`

## O que foi preservado
- **Cenários 3D:** nenhum foi recriado. Usados direto da pasta `plates/` (os PNG prontos dos projetos
  anteriores): quarto `bed`, rua `str`, cidade `twn`/`twn3`, sala `liv`, cozinha `kit`, hotel `hot`,
  praça `prcW` e estrada `road`.
- **Personagens 2D:** desenho original intacto (`lib.js` não foi alterado). O Cibito é o "você" da história,
  e também aparecem o Elias e os moradores. O Satoru Gojo é só citado na narração: o personagem
  original não é desenhado.
- **Motor:** `lib.js`, `sets.js` e `sets_loop.js` são cópias idênticas dos originais.
- **Backup:** o projeto original continua intacto em `../cibito-loop-temporal/`.

## Narração
A voz é a **narração original do ElevenLabs** (`audio/narracao-elevenlabs.mp3`, voz "Will"), inteira, sem cortes
nem alterações. Ela foi gravada com um texto reescrito em relação ao roteiro em texto (por exemplo,
"Imagine acordar amanhã com uma habilidade tão rara…" e "Mas existe um preço."). Por isso as legendas e os
textos na tela seguem **o que é falado no áudio**: 21 frases, transcritas com o tempo de cada palavra
(`audio/palavras-elevenlabs.json`).

Cada corte, efeito, texto e som está preso à palavra exata da narração (`wt(frase, 'palavra')` usa o tempo
real da palavra). A narração provisória sintetizada ficou guardada em `audio/provisoria/`.

Para trocar a voz de novo:
```
python3 transcrever.py nova.mp3 pasta-do-modelo-whisper   # se o texto falado mudou
python3 alinhar.py nova.mp3                               # se o texto é o mesmo de roteiro.json
./refazer.sh
```
Se o texto mudar, ajuste também as palavras-gatilho dos planos em `main.js` (linhas `const t...=wt(...)`).

## Estrutura (19 planos)
| Parte | Plano | Cenário |
|---|---|---|
| Gancho | Close: Cibito acorda, os olhos acendem em azul (onda de varredura, partículas, emblema dos seis anéis) | quarto à noite |
| | "O poder mais absurdo": aura azul, raios volumétricos, partículas orbitando | espaço cósmico |
| | "Um dos feiticeiros mais poderosos do mundo": aura acende, câmera aproxima | rua à noite |
| **Ponto 1 – A Visão** | Cartela + close nos olhos com HUD | espaço |
| | A cidade vista pelos Seis Olhos: filtro de visão azul, auras coloridas em cada morador | cidade |
| | Fluxo (correntes de energia), lupa de detalhe, feiticeiros comuns confusos ("?") | cidade |
| | A sala: "um mundo invisível" — a aura roxa escondida do Elias explode | sala |
| | Close: "escondido diante dos seus próprios olhos", anéis girando nos olhos, linhas de análise | sala |
| **Ponto 2 – O Controle** | Cartela + ∞ "energia infinita?" riscado com um X "NÃO" | espaço |
| | Aura selvagem que condensa num contorno fino; esfera de energia com mira ("PRECISÃO") | praça à noite |
| | Medidor de desperdício caindo para 0,01%; gotas de energia voltam ao corpo | praça |
| | Ilimitada: onda que dobra o espaço (deformação real do cenário 3D), esfera de refração | cidade à noite |
| | "Uma defesa que poucos conseguiriam superar": a criatura ataca, o punho desacelera e nunca encosta | cidade à noite |
| **Ponto 3 – O Preço** | "Mas existe um preço.": cartela vermelha, luz fraca e piscando | hotel |
| | Sobrecarga: dados voando, aberração cromática, tremor, "DESGASTE" | cozinha |
| | A venda desce, o caos some; a percepção continua (bordas do ambiente acesas em ciano) | quarto à noite |
| | "Uma das habilidades mais raras de Jujutsu Kaisen": meditação com a venda | praça à noite |
| Final | Tira a venda ao pôr do sol: olhos brilham, lens flare, "POTENCIAL" | estrada |
| | "Você teria coragem?": close, os olhos despertam, tela final "COMENTE: SIM ou NÃO" | espaço |

## Recursos cinematográficos (em `main.js`)
- **Integração 2D/3D:** luz por cena com luz de recorte (rim light) e sombra própria. Nas cenas dos Seis Olhos
  a luz de recorte fica azul (`blueLit`), e os olhos projetam brilho no rosto e no ambiente. Há sombra de
  contato e profundidade de campo automática nos closes.
- **Seis Olhos:** íris azul luminosa com halo, desenhada dentro da cabeça, então acompanha olhar e cabeça
  (`SIXFX`). A intensidade é animada e pulsa levemente com a voz.
- **Venda:** desenhada no mesmo traço (`BLINDFX`); desce de baixo do capuz e as pontas balançam.
- **Efeitos de energia:** auras (`FLAME`), correntes de fluxo, partículas, raios volumétricos e lens flare.
  Também a deformação de espaço do Ilimitado (filtro `warp`, que dobra o cenário 3D de verdade) e a
  percepção com a venda (filtro `sonar`, com detecção de bordas no cenário).
- **Edição:** cortes e movimentos de câmera presos às palavras importantes da narração (`wt(frase, 'palavra')`).
  Planos alternam entre abertos, médios e closes, com antecipação (squash & stretch) antes das revelações.
  As transições variam (zoom, whip, flash azul, fade e glitch).
- **Áudio:** 220 efeitos sincronizados com a imagem e ambiências por cena. A trilha instrumental original
  (ré menor, ~100 bpm) muda com cada parte da história e fica em silêncio quando a venda é colocada.
  Música, ambiência e efeitos abaixam automaticamente sob a voz. A mixagem final é normalizada em −14 LUFS.
- **Área segura do Shorts:** títulos entre y≈250 e 600 e legendas acima da faixa inferior (margem de 330 px).

## Como refazer (passo a passo)
```
python3 narracao.py      # (só para a narração provisória) voz + roteiro.json
python3 alinhar.py x.mp3 # (para a narração definitiva) no lugar do passo acima
./refazer.sh 4           # tudo o resto, com 4 processos de render
node pvt.js 5 27.3 66.8  # prévia de quadros -> pvt.jpg
```
Arquivos: `main.js` (planos, câmera, efeitos), `sfxlist.js` (efeitos e deixas da trilha), `audio.py` (síntese e mixagem),
`caps.py` (legendas), `alinhar.py` / `narracao.py` (narração), `prep.py`, `build.js`, `render.js`.
