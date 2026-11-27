# E se você tivesse o poder do Saitama? — Short animado

Vertical **2K (1440 × 2560), 24 fps, ~103 s, H.264 + AAC**. Usa o mesmo motor de "Cibito e o Loop Temporal",
"Seis Olhos" e "Saiyajin": personagens 2D de contorno grosso sobre cenários 3D. Os **11 cenários deste vídeo são novos**.

**Vídeo final:** `poder-do-saitama.mp4`

## Narração
- **Voz definitiva do ElevenLabs** (`audio/narracao-elevenlabs.mp3`, voz "Will"), inteira, sem cortes e sem alterações.
  O texto é exatamente o do roteiro (19 frases). O título "E SE VOCÊ TIVESSE O PODER DO SAITAMA?" aparece escrito na tela.
- **Tempos:** `alinhar.py` encontra as frases pelas pausas reais do áudio. Como aqui não há modelo de transcrição
  offline, `palavras_dtw.py` acha o tempo de **cada palavra** comparando (DTW sobre MFCC) cada frase com a mesma frase da
  voz provisória, cujos tempos de palavra são exatos. Cada corte, efeito e texto está preso à palavra (`wt(frase, 'palavra')`).
- A voz provisória (espeak-ng) ficou guardada em `audio/provisoria/`.
- **Para trocar a voz de novo:**
  ```
  python3 alinhar.py audio/nova.mp3 && python3 palavras_dtw.py && ./refazer.sh 4
  ```
- **Abertura a frio:** 1,3 s de ação (o soco no monstro) antes da primeira palavra (`ABERTURA` no `prep.py`).

## A sequência do soco (o momento principal)
Ela cobre as frases "Ele levantaria o punho para destruir tudo…" e "Mas você desviaria do golpe, apareceria atrás dele e
acertaria um soco tão poderoso…", em 7 planos sem cortes confusos:
1. **Encarada:** um plano aberto do monstro erguendo o punho, com o herói de costas, em silhueta. Depois a câmera se aproxima
   devagar do rosto por ~2,5 s. O vento levanta poeira e pedacinhos de entulho, o cachecol chicoteia e a sombra do punho
   desce sobre ele. O olhar fecha no "destruir".
2. **Arrancada:** no "desviaria" ele dispara. A câmera acompanha de lado, o cenário fica com borrão de movimento horizontal
   (só o fundo: o herói fica nítido) e aparecem um rastro de energia dourada, nuvens de poeira ficando para trás e
   imagens residuais. O punho do monstro acerta o vazio e explode o asfalto atrás dele.
3. **Volta pelas costas:** a câmera gira em volta da criatura (ela vira de frente → de lado → de costas) enquanto o rastro
   do herói dá a volta. No "atrás" ele surge derrapando na retaguarda do monstro, que olha em volta confuso.
4. **O tempo desacelera:** close no punho se fechando dedo por dedo, com linhas de foco, energia sendo sugada e tremor.
5. **Enquadramento lateral:** ele arma o golpe, com o cenário escurecido e dessaturado e a energia entrando no punho.
6. **O soco:** smear, impact frame e então um **freeze frame** de ~0,4 s em alto contraste, com linhas de foco de mangá.
7. **Impacto final:** a onda de choque atravessa a tela e o **ar se deforma de verdade** (o filtro desloca o cenário 3D).
   Entulho e poeira voam e o monstro sai girando até virar estrela. O som acompanha: rajadas de vento, aceleração,
   derrapagem, punho fechando, silêncio com coração, anel agudo no freeze, impacto grave e explosão de ar.
   No "vento abriria caminho entre as nuvens", o céu se abre.

## Pesquisa sobre One-Punch Man (o que inspirou as cenas)
- **A rotina real do Saitama**: 100 flexões, 100 abdominais, 100 agachamentos e 10 km de corrida por dia, durante 3 anos.
  O cabelo caiu como efeito do treino, e ninguém acredita que o treino explique a força. Isso está nos contadores, no calendário e
  nos moradores dizendo "IMPOSSÍVEL!".
- **A Cidade Z**: tem um distrito comercial, uma área residencial e uma área abandonada destruída por monstros, a "cidade
  fantasma". Por isso a luta é no distrito comercial e o depois dela, na cidade fantasma em ruínas.
- **O soco sério**: o golpe que abre as nuvens do céu inteiro inspirou a cena do vento subindo e o céu se abrindo.
- **O tédio**: vencer tudo com um soco tira a emoção das lutas. A parte final mostra isso devagar.
- Fontes: [Wikipedia: Saitama](https://en.wikipedia.org/wiki/Saitama_(One-Punch_Man)), [Healthline: treino do One Punch Man](https://www.healthline.com/health/fitness/one-punch-man-workout-review),
  [One Punch Man Wiki: Cidade Z](https://onepunchman.fandom.com/wiki/Z-City), [Fiction Horizon: soco sério](https://fictionhorizon.com/saitamas-serious-punch-how-strong-it-is/).

## Cenários 3D NOVOS (`sets_saitama.js`, nenhum reaproveitado)
| Cenário | Variações | Usado em |
|---|---|---|
| Distrito comercial: arranha-céus de vidro, telões, faixa de pedestres, semáforos | dia (`cbd`), pôr do sol com janelas acesas (`cbdS`) | abertura, moradores, salto, luta, final |
| Cidade fantasma: prédios destruídos e inclinados, entulho, crateras, carros abandonados, postes tortos | pôr do sol (`zgh`), noite (`zghN`) | corrida supersônica, "sem medo", K.O., pilha de monstros |
| Apartamento simples: tatame, futon, mesinha baixa, TV antiga, calendário, halteres | dia (`apt`), noite (`aptN`) | flashback, flexões, queda do cabelo, CARECA, tédio |
| Parque de treino: pista de terra, barras, banco, árvores, morros | amanhecer (`prq`), noite de chuva (`prqN`), inverno com neve (`prqW`) | treino, corrida, dias e estações passando, sofrimento |
| Terraço: parapeito, caixa d'água, ar-condicionado, skyline lá embaixo | noite (`tlh`), pôr do sol (`tlhS`) | agachamentos, repetições, solidão, coração acelerando |

## Protagonista e monstros (originais)
- **O "você" é o Cibito.** Ele treina com o capuz de sempre e perde o cabelo mecha por mecha (`HOODN`, `HAIRFALL`).
  No "careca!", o capuz voa e revela o **herói careca**: brilho na cabeça (`SHINE`), capuz caído nas costas e
  **cachecol vermelho** que balança com o vento (`SCARF`). Ele não usa o macacão amarelo, as luvas vermelhas nem a
  capa branca do Saitama: só a ideia de força absurda e a cara de tédio.
- **Monstro colossal: criatura de sombra** (`KJ` em `main.js`), inspirada na imagem de referência enviada e desenhada no
  traço do projeto. Tem corpo negro corcunda, ombros largos e contorno rasgado com brilho vermelho nas bordas (`JAGP`),
  além de veias vermelhas. A coroa de pontas e os tentáculos de sombra balançam (`TEND`). Os olhos vermelhos são
  amendoados e têm brilho de verdade no cenário. O sorriso enorme tem duas fileiras de dentes pontudos e abre com a
  boca. Os braços são longos, com garras curvas (`HAND`). Há fumaça na base e lascas de sombra se soltando do corpo.
  Ele tem vista de frente e de costas (com espinha brilhante), olhos que mudam (bravo, arregalado, confuso e nocaute)
  e 4 cores de brilho: vermelho (o colossal), verde, roxo e laranja (os outros monstros).

## Estrutura (35 planos, mais os cortes rápidos das estações)
| Narração | O que acontece | Cenário |
|---|---|---|
| (abertura, antes da voz) + frase 1 | O herói salta e soca a cara do monstro: smear, hit-stop, impact frame e onda de choque. O monstro sai voando e vira uma estrela no céu. Depois o herói pousa com cratera | distrito comercial (dia) |
| "qualquer inimigo" | O herói se teletransporta e derruba três monstros em sequência | céu vermelho + silhueta da cidade |
| "com apenas um soco?" | Close no punho erguido e no brilho da careca, com o texto "1 SOCO" | distrito comercial (dia) |
| frase 2 | Volta no tempo ("3 ANOS ANTES"): o Cibito decide treinar e a barra passa do "LIMITE HUMANO", que racha | apartamento |
| frase 3 | Calendário voando ("3 ANOS"), depois 100 flexões, 100 abdominais e 100 agachamentos com contadores. Em seguida, 10 km de corrida e verão, noite e neve se alternando ("DIA 1 → 1095") | parque, apartamento, terraço, parque nas 3 estações |
| frase 4 | Na chuva, à noite, os braços tremem e ele desaba no "esforço" | parque, noite de chuva |
| frase 5 | Ele corre enquanto os moradores gritam "IMPOSSÍVEL!", "DESISTE!" e "LOUCURA!" | distrito comercial |
| frase 6 | Sequência de socos com o contador "REPETIÇÕES" até 100.000. Tudo para no "inacreditável" | terraço à noite |
| frase 7 | Painel de atributos (FORÇA e RESISTÊNCIA chegam ao MAX), imagens residuais de velocidade e, de repente, as mechas começam a cair | parque, apartamento |
| frase 8 | As últimas mechas pulam, o capuz voa e a careca brilha ("CARECA!"), com coro "aaah" e grilos | apartamento |
| frase 9 | Dá de ombros com cara de tédio | terraço ao pôr do sol |
| frase 10 | Salta por cima dos prédios (cratera na decolagem), corre a velocímetro máximo com estrondo supersônico e boceja na frente de um monstro gigante (ECG a 60 BPM) | distrito comercial, cidade fantasma à noite |
| frase 11 | O monstro colossal surge do horizonte na frente do sol, com terremoto, entulho e moradores fugindo. O herói corre em direção a ele (silhueta) | distrito comercial ao pôr do sol |
| frases 12 e 13 | **Sequência do soco** (veja a seção acima): encarada, arrancada, volta pelas costas, punho, soco, freeze e onda de choque. Depois o vento abre as nuvens e o monstro vira estrela | distrito comercial ao pôr do sol, céu |
| frase 14 | "K.O." carimbado, cronômetro "00:03" e moradores comemorando | cidade fantasma em ruínas |
| frases 15 e 16 | Sentado numa pilha de monstros nocauteados ("999+ VITÓRIAS"). A cor vai sumindo e ele fica sozinho na estrada à noite, com a barra "DESAFIO" quase em 0 | cidade fantasma à noite, terraço à noite |
| frase 17 | Na mesinha, com sono e bocejando | apartamento à noite |
| frase 18 | Uma silhueta misteriosa de olhos vermelhos aparece no horizonte e o ECG vai de 48 para 170 BPM: ele sorri pela primeira vez | terraço ao pôr do sol |
| frase 19 | Pose heroica. "COMENTE" e depois "CARECA" letra por letra, digitado numa caixa de comentário que é enviada (corações voando). Fecha em íris no brilho da careca | distrito comercial (dia) |

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

## Qualidade 2K
- Os quadros são renderizados em **1440 × 2560** (`render.js`, escala 4/3 por padrão). `node render.js 4 1` volta para
  1080 × 1920 e `node render.js 4 2` gera 4K (2160 × 3840, mais lento).
- Os cenários novos são gerados em 1584 × 2816 (`plates.js`, supersampling 1,5×), e os canvases de brilho e partículas
  acompanham a resolução do quadro. Os desenhos 2D, textos e efeitos são vetoriais, então ficam nítidos em qualquer tamanho.
- O `refazer.sh` codifica com x264 `-preset slow -crf 17 -tune animation` (qualidade máxima, ~114 MB). Como o GitHub recusa
  arquivos acima de 100 MB, o `poder-do-saitama.mp4` do repositório é uma versão 2K em duas passadas a ~7,3 Mbps (~97 MB),
  visualmente quase igual. A de qualidade máxima (`poder-do-saitama-2k-max.mp4`) fica fora do git.

## Correção: linhas ao lado do rosto do herói careca
O desenho base do personagem (`lib.js`, que não foi alterado) tem dois traços decorativos de luz nas laterais da cabeça,
um laranja e um azul. Com o capuz eles ficam escondidos atrás das abas. Na versão careca, o `put()` em `main.js` remove os
dois traços junto com a "touca" de cabelo.

## Como refazer
```
python3 narracao.py      # (so a narracao provisoria) voz + roteiro.json com o tempo de cada palavra
./refazer.sh 4           # tudo o resto, com 4 processos de render
node pvt.js 5 27.3 66.8  # previa de quadros -> pvt.jpg
```
Arquivos: `main.js` (personagens novos, monstro, planos, camera, efeitos), `sfxlist.js` (efeitos e deixas da trilha),
`audio.py` (sintese, trilha e mixagem), `caps.py` (legendas com o tempo real de cada palavra), `narracao.py`,
`prep.py`, `build.js`, `render.js`. Motor (`lib.js`, `sets.js`, `sets_loop.js`) sem alterações. Os cenários novos ficam em `sets_saitama.js` e são
renderizados em `plates/` com `node plates.js cbd cbdS zgh zghN apt aptN prq prqN prqW tlh tlhS`.
