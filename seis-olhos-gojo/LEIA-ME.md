# E se você tivesse os Seis Olhos? — Short animado

Short vertical **1080 × 1920, 24 fps, ~87 s, H.264 + AAC**, feito com o mesmo motor do projeto
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
- **Roteiro:** as 25 frases aparecem exatamente como no seu texto, na ordem original.

## Narração (IMPORTANTE)
Nenhum áudio de narração veio junto com o roteiro. Por isso o vídeo usa uma **narração provisória**,
gerada aqui com voz sintética em português do Brasil (`narracao.py`, espeak-ng + MBROLA).
O texto é o mesmo e o tempo é o mesmo. Ela serve para validar o ritmo; o som é robótico.

Para colocar a narração definitiva (por exemplo do ElevenLabs), sem cortar nem alterar o áudio:
```
python3 alinhar.py caminho/da/narracao.mp3   # detecta as pausas reais e encaixa as 25 frases
./refazer.sh                                 # refaz trilha, efeitos, legendas, quadros e o MP4
```
Os planos, cortes, efeitos e legendas são calculados a partir dos tempos das frases (`roteiro.json`).
Por isso tudo se reajusta sozinho à nova voz.

## Estrutura (19 planos)
| Parte | Plano | Cenário |
|---|---|---|
| Gancho | Close: Cibito acorda, os olhos acendem em azul (onda de varredura, partículas, emblema dos seis anéis) | quarto à noite |
| | "O poder mais absurdo": aura azul, raios volumétricos, partículas orbitando | espaço cósmico |
| | "Mas existe um detalhe…": clima esfria, cor dessatura, câmera aproxima devagar | rua à noite |
| **Ponto 1 – A Visão** | Cartela + close nos olhos com HUD | espaço |
| | A cidade vista pelos Seis Olhos: filtro de visão azul, auras coloridas em cada morador | cidade |
| | Fluxo (correntes de energia), lupa de detalhe, feiticeiros comuns confusos ("?") | cidade |
| | A sala: alguém escondendo energia… a aura roxa do Elias explode ("GIGANTESCA") | sala |
| | Close de análise: anéis girando nos olhos, linhas ligando a objetos, barra "ANALISANDO" | sala |
| **Ponto 2 – O Controle** | Cartela + ∞ "energia infinita?" riscado com um X "NÃO" | espaço |
| | Aura selvagem que condensa num contorno fino; esfera de energia com mira ("PRECISÃO") | praça à noite |
| | Medidor de desperdício caindo para 0,01%; gotas de energia voltam ao corpo | praça |
| | Ilimitada: onda que dobra o espaço (deformação real do cenário 3D), esfera de refração | cidade à noite |
| | Criatura amaldiçoada ataca; o punho desacelera e nunca encosta (ondulações na barreira) | cidade à noite |
| **Ponto 3 – O Preço** | Cartela vermelha, luz fraca e piscando | hotel |
| | Sobrecarga: dados voando, aberração cromática, tremor, "DESGASTE" | cozinha |
| | A venda desce, o caos some; a percepção continua (bordas do ambiente acesas em ciano) | quarto à noite |
| | Meditação com a venda: aura calma e controlada | praça à noite |
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
