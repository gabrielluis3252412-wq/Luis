# E se você tivesse o poder do Saitama? — Short animado

Vertical **1080 × 1920, 24 fps, ~92 s, H.264 + AAC**. Usa o mesmo motor de "Cibito e o Loop Temporal",
"Seis Olhos" e "Saiyajin": personagens 2D de contorno grosso sobre cenários 3D prontos.

**Vídeo final:** `poder-do-saitama.mp4`

## Narração
- O roteiro enviado entra **inteiro, na ordem e sem trocar nenhuma palavra**: são 19 frases, de "E se você
  tivesse o mesmo poder absurdo de Saitama…" até "Comente “CARECA” se você aceitaria esse poder!". O título
  "E SE VOCÊ TIVESSE O PODER DO SAITAMA?" aparece escrito na tela, junto com o desenho de um punho.
- **Esta narração é PROVISÓRIA.** O áudio do ElevenLabs desta história não veio junto, então gerei uma voz
  offline (espeak-ng + MBROLA, `narracao.py`). O tempo de cada palavra sai da lista de fonemas da própria voz
  (`roteiro.json` → `palavras`), e cada corte, efeito e texto está preso à palavra exata (`wt(frase, 'palavra')`).
- **Para usar a voz definitiva do ElevenLabs:**
  ```
  python3 transcrever.py audio/narracao-elevenlabs.mp3 pasta-do-modelo-whisper   # tempo de cada palavra
  #   ou, sem o Whisper:  python3 alinhar.py audio/narracao-elevenlabs.mp3      # tempos pelas pausas
  ./refazer.sh 4
  ```
  As cenas se reajustam sozinhas aos novos tempos. Se a voz definitiva for bem mais lenta ou mais rápida, o
  vídeo acompanha: fica em torno de 90 a 100 s.
- **Abertura a frio:** o vídeo começa com 1,3 s de ação (o soco no monstro) antes da primeira palavra.
  O valor fica em `ABERTURA` no `prep.py`.

## Protagonista e monstros (originais)
- **O "você" é o Cibito.** Ele treina com o capuz de sempre e perde o cabelo mecha por mecha (`HOODN`, `HAIRFALL`).
  No "careca!", o capuz voa e revela o **herói careca**: brilho na cabeça (`SHINE`), capuz caído nas costas e
  **cachecol vermelho** que balança com o vento (`SCARF`). Ele não usa o macacão amarelo, as luvas vermelhas nem a
  capa branca do Saitama: só a ideia de força absurda e a cara de tédio.
- **Monstro colossal:** desenho próprio (`KJ` em `main.js`), com corpo de pedra, rachaduras de lava, chifres,
  presas e espinhos. Ele tem vista de frente e de costas, punhos posicionáveis, boca animada e olhos que mudam
  (bravo, susto, confuso e nocaute). Há 4 paletas: cinza-lava, verde, roxo e vermelho.

## Estrutura (33 planos, mais os cortes rápidos de dia e noite)
| Narração | O que acontece | Cenário |
|---|---|---|
| (abertura, antes da voz) + frase 1 | O herói salta e soca a cara do monstro: smear, hit-stop, impact frame e onda de choque. O monstro sai voando e vira uma estrela no céu. Depois o herói pousa com cratera | cidade de dia |
| "qualquer inimigo" | O herói se teletransporta e derruba três monstros em sequência | céu vermelho + silhueta da cidade |
| "com apenas um soco?" | Close no punho erguido e no brilho da careca, com o texto "1 SOCO" | cidade de dia |
| frase 2 | Volta no tempo ("3 ANOS ANTES"): o Cibito decide treinar e a barra passa do "LIMITE HUMANO", que racha | quarto |
| frase 3 | Calendário voando ("3 ANOS"), depois 100 flexões, 100 abdominais e 100 agachamentos com contadores. Em seguida, 10 km de corrida e dia e noite se alternando ("DIA 1 → 1095") | casa, sala, corredor, quintal, estrada |
| frase 4 | Na chuva, à noite, os braços tremem e ele desaba no "esforço" | rua à noite |
| frase 5 | Ele corre enquanto os moradores gritam "IMPOSSÍVEL!", "DESISTE!" e "LOUCURA!" | cidade |
| frase 6 | Sequência de socos com o contador "REPETIÇÕES" até 100.000. Tudo para no "inacreditável" | quintal à noite |
| frase 7 | Painel de atributos (FORÇA e RESISTÊNCIA chegam ao MAX), imagens residuais de velocidade e, de repente, as mechas começam a cair | estrada, quarto |
| frase 8 | As últimas mechas pulam, o capuz voa e a careca brilha ("CARECA!"), com coro "aaah" e grilos | quarto |
| frase 9 | Dá de ombros com cara de tédio | estrada |
| frase 10 | Salta por cima dos prédios (cratera na decolagem), corre a velocímetro máximo com estrondo supersônico e boceja na frente de um monstro gigante (ECG a 60 BPM) | cidade, rua à noite |
| frase 11 | O monstro colossal surge do horizonte na frente do sol, com terremoto, entulho e moradores fugindo. O herói corre em direção a ele (silhueta) | cidade ao pôr do sol |
| frase 12 | O monstro ergue o punho. No "destruir", o outro punho desce e o herói **segura com uma mão** | cidade ao pôr do sol |
| frase 13 | **Esquiva** (o punho abre uma cratera onde ele estava), **salto por cima dos prédios** até aparecer **atrás dele**, **silêncio** (a música some e só se ouve o coração), **o soco** (impact frames, câmera lenta, 3 ondas de choque) e o **vento abrindo as nuvens** com o monstro subindo até virar estrela | cidade ao pôr do sol, céu |
| frase 14 | "K.O." carimbado, cronômetro "00:03" e moradores comemorando | cidade ao pôr do sol |
| frases 15 e 16 | Sentado numa pilha de monstros nocauteados ("999+ VITÓRIAS"). A cor vai sumindo e ele fica sozinho na estrada à noite, com a barra "DESAFIO" quase em 0 | cidade à noite, estrada à noite |
| frase 17 | No sofá, com sono e bocejando | sala |
| frase 18 | Uma silhueta misteriosa de olhos vermelhos aparece no horizonte e o ECG vai de 48 para 170 BPM: ele sorri pela primeira vez | cidade ao pôr do sol |
| frase 19 | Pose heroica. "COMENTE" e depois "CARECA" letra por letra, digitado numa caixa de comentário que é enviada (corações voando). Fecha em íris no brilho da careca | cidade de dia |

## Áudio
- **346 efeitos sincronizados** (`sfxlist.js` + `audio.py`): socos, whiffs, bloqueio, rugidos e grunhidos do monstro,
  pisadas, terremoto, entulho, estrondo supersônico, "plim" da careca, mechas caindo em pizzicato, coro
  "aaah", grilos, bocejo, ronco, monitor cardíaco, digitação, envio do comentário e outros. As ambiências mudam
  por cena: cidade, vento, chuva, noite e quarto.
- **Trilha original** com uma deixa para cada parte da história. Ela é épica na abertura e fica suave no
  flashback. Na montagem de treino cresce. Na chuva vira piano triste e na sequência de repetições sobe até um
  corte seco. Com o cabelo caindo vira pizzicato cômico, e depois da careca entra um groove tranquilo. Nas
  habilidades fica animada, com o monstro fica tensa e na luta vira tutti. Antes do soco há **silêncio**, e o
  impacto vem como uma explosão orquestral. Na solidão fica lenta e, quando o coração acelera, cresce. O final é
  animado.
- A música, os efeitos e as ambiências abaixam sozinhos sob a voz, que fica pelo menos ~6 dB acima de tudo. A
  mixagem final é normalizada em −14 LUFS.

## Como refazer
```
python3 narracao.py      # (so a narracao provisoria) voz + roteiro.json com o tempo de cada palavra
./refazer.sh 4           # tudo o resto, com 4 processos de render
node pvt.js 5 27.3 66.8  # previa de quadros -> pvt.jpg
```
Arquivos: `main.js` (personagens novos, monstro, planos, camera, efeitos), `sfxlist.js` (efeitos e deixas da trilha),
`audio.py` (sintese, trilha e mixagem), `caps.py` (legendas com o tempo real de cada palavra), `narracao.py`,
`prep.py`, `build.js`, `render.js`. Motor e cenários (`lib.js`, `sets.js`, `sets_loop.js`, `plates/`) são cópias
idênticas, e nada foi recriado.
