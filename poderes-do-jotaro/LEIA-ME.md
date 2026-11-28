# E se você despertasse os poderes do Jotaro? — Short animado

Short vertical **1440 × 2560 (2K), 60 fps, ~102 s, H.264 + AAC**, feito com o mesmo motor de
"Cibito e o Loop Temporal", "Seis Olhos" e "Saiyajin": personagens 2D de contorno grosso sobre
cenários 3D prontos.

**Vídeos finais (narração do ElevenLabs, voz "Will", 101,8 s):**
- `poderes-do-jotaro.mp4`: 1440×2560 (2K), 60 fps, H.264 High nível 5.1, até 7 Mbit/s, 91 MB.
  **É o vídeo principal:** toca no celular e é o que vai para o YouTube.
- `poderes-do-jotaro-celular.mp4`: 1080×1920, 60 fps, H.264 nível 4.2, 83 MB. Reserva para celulares antigos.

Áudio AAC 48 kHz a −14,9 LUFS, pico −1,3 dBFS.

## Sem piscadas e sem sumiços
- **Tela piscando:** os golpes (fim da rajada ORA e soco final) alternavam quadros em negativo a cada
  2 quadros. Isso saiu; ficou só a explosão. Os flashes brancos foram limitados a 40% e os efeitos que
  pulsavam rápido (rajada, vermelho do "AI!", fantasma no quarto) ficaram estáveis. No "AI!", o flash
  vermelho e o texto agora entram no mesmo quadro (antes sobrava um quadro branco isolado).
- **Personagem sumindo:** com 4 navegadores renderizando ao mesmo tempo, o Chrome às vezes capturava a
  tela antes de terminar de pintar, e um pedaço retangular do personagem ficava de fora por 1 ou 2
  quadros. O `render.js` agora espera a pintura terminar e abre o Chrome com
  `--run-all-compositor-stages-before-draw`. Filtros aplicados na camada inteira (desfoque de movimento,
  aberração cromática), que o Chrome às vezes descartava por um quadro, também saíram.
- **Luz trocando no meio do plano:** cada personagem tem contorno iluminado ou só a cor da luz, conforme
  o tamanho na tela. A escolha era feita em cada navegador e mudava quando ele reiniciava no meio de um
  plano (aos 21 s e aos 85 s). Agora um pré-passo (`preLuz`, em `render.js`) decide uma vez para todos.
- **Conferência:** o vídeo foi renderizado duas vezes por inteiro e comparado quadro a quadro: 6107 de
  6110 quadros saíram idênticos byte a byte. Nos outros 3, a diferença era de no máximo 2 pixels (um
  pontinho que só apareceu na segunda renderização), e o vídeo usa a versão que combina com os quadros
  vizinhos. Nenhum quadro tem pedaço faltando. A luminância de cada quadro também foi medida: nenhuma
  alternância rápida (estrobo) e nenhum flash isolado de um quadro.

## Narração (importante)
O roteiro foi escrito a partir da pesquisa (abaixo). A voz do vídeo é a **narração do ElevenLabs (voz "Will")**,
alinhada palavra por palavra com `alinhar_dtw.py`. A voz provisória (espeak-ng + MBROLA) ficou em `audio/provisoria/`. Os tempos de cada palavra vêm
do próprio sintetizador, e cada corte, efeito, texto e som está preso à palavra exata (`wt(frase,'palavra')`).

Para trocar pela voz definitiva (ElevenLabs, voz "Will"), grave **o mesmo texto** do roteiro abaixo e rode:
```
python3 alinhar_dtw.py audio/narracao-elevenlabs.mp3   # compara com a provisória e transfere o tempo de cada palavra
./refazer.sh 4                                         # trilha, efeitos, legendas, quadros 2K e MP4
```
O alinhamento usa só numpy + ffmpeg (DTW entre a voz nova e a provisória do mesmo texto). Num teste com a
voz esticada e com outro tom, o erro médio por palavra foi de 11 ms. Se o texto falado mudar, ajuste as
frases em `narracao.py`, rode `python3 narracao.py` e então o alinhamento.

## Roteiro (34 frases, ~88 s de fala)
1. O tempo parou. / A bala congela a centímetros do seu rosto… / e só você se move.
2. E se você despertasse os poderes do Jotaro?
3. Primeiro, um espírito estranho sairia do seu corpo. / O Jotaro achou que estava possuído e se trancou numa cela.
4. Mas era um Stand: a sua energia vital ganhando forma ao seu lado. / E o seu seria o Star Platinum.
5. **Ponto um: força e velocidade.** Na ficha oficial, ele tem nota máxima em força, velocidade e precisão. Só o alcance é curto.
   Num piscar de olhos, ele solta uma chuva de socos: ORA ORA ORA! E pega no ar até uma bala disparada à queima-roupa.
6. **Ponto dois: precisão e visão.** Ele enxerga até uma mosca minúscula escondida numa foto.
   Foi assim que o Jotaro descobriu que o inimigo estava no Egito.
7. **Ponto três: o poder mais assustador.** Star Platinum: The World. Você para o tempo.
   Chuva, pássaros, pessoas… tudo congela. Só você se move. Mas só por alguns segundos, e nunca duas vezes seguidas.
   Dez anos depois, o Jotaro só conseguia parar o tempo por meio segundo!
8. E se o seu Stand se machucar, você sente a mesma dor. E usuários de Stand se atraem…
   Cedo ou tarde, um Stand dourado viria atrás de você. Ele também pararia o tempo… mas você se moveria dentro dele.
9. Você avança, passa por ele, e acerta o golpe final: ORA! E o tempo volta a correr.
10. Yare yare daze. Você aguentaria esse poder? Comenta: sim ou não.

### Pesquisa (o que foi conferido)
- **Stand:** manifestação da energia vital do usuário; o nome vem de ficar "de pé ao lado" dele. Só usuários
  de Stand veem Stands. Nos Stands de curto alcance, o dano no Stand passa para o usuário.
- **Jotaro:** delinquente sério e de poucas palavras, com senso de justiça. Achou que estava possuído por um
  "espírito maligno" e se entregou à polícia, recusando-se a sair da cela. Bordão: "yare yare daze".
- **Star Platinum (ficha da Parte 3):** poder A, velocidade A, alcance C, resistência A, precisão A, potencial A.
  Pega uma bala disparada à queima-roupa. A visão viu uma mosca na foto do inimigo; o Stand desenhou a mosca e
  ela só existe no Egito, onde o inimigo estava. Rajada de socos com o grito "ORA ORA".
- **Star Platinum: The World:** desperta na luta final da Parte 3 e para o tempo por poucos segundos (o máximo
  citado é cerca de 5 s). Não dá para usar duas vezes seguidas. Dez anos depois, no início de Diamond is
  Unbreakable, só conseguia meio segundo. Ele também se move dentro do tempo parado por outro Stand do mesmo tipo.
- **Usuários de Stand se atraem:** o destino aproxima usuários de Stand, e o encontro costuma virar luta.
- **Visual:** os "ゴゴゴ" (som de ameaça), poses marcantes e mudança brusca de cores no tempo parado.
- **Trilha:** a de Stardust Crusaders (Yugo Kanno) mistura orquestra com jazz e funk. A trilha deste vídeo é
  **original** e só segue essa energia: nenhuma música protegida foi usada ou imitada nota a nota.

## Personagens e desenho
- **Você = Cibito** (desenho original intacto). Ao despertar o Stand ele ganha um sobretudo escuro com
  corrente dourada (`CJ`). O Jotaro **não é desenhado**: só é citado na narração.
- **Stand roxo** (`STAND()` em `stands.js`): segue a referência enviada (roxo, musculoso, cabelo longo
  ondulando, faixa dourada na testa, cachecol vermelho, ombreiras douradas, luvas com rebites), redesenhado no
  traço do projeto. Braços articulados com cinemática inversa (`IK`): a mão alcança a bala de verdade.
- **Rival (original)** com **Stand dourado** (`GSTAND()`): segue o Stand amarelo da referência (dourado, mãos
  cinza, gemas verdes, tubos segmentados), com formas próprias (coroa de três pontas, gemas em losango).
- Os moradores (T1, T2, T3, R4, R5) são os mesmos dos projetos anteriores.

## Cenários 3D
Os mesmos cenários dos projetos anteriores (`sets.js` / `sets_loop.js`, nada recriado), **renderizados de
novo a partir do mesmo código em 2376×4224** (`node plates.js`), acima da resolução do vídeo, para
continuarem nítidos com o zoom da câmera. O render na resolução antiga
bate com os PNG originais (camada B idêntica; camada A com diferença média de 0,15/255).
`variantes.py` gera, a partir dessas imagens, as versões desfocada (profundidade de campo), noturna e
"tempo parado" (duotono roxo do Star Platinum / dourado do rival), trocadas por opacidade no vídeo.

## Planos (25)
| Trecho | Plano | Cenário |
|---|---|---|
| Gancho | Bala vem pela direita na chuva → **o tempo para** (esfera de cores invertidas, chuva congelada) → o Stand surge e pega a bala com dois dedos | rua à noite |
| Título | O tempo volta, pose apontando, Stand de braços cruzados, ゴゴゴ, "OS PODERES DO JOTARO?" | rua à noite |
| Despertar | Espírito roxo saindo do corpo (quarto à noite) · cela com grade batendo, retícula de mangá · o Stand se forma de partículas · revelação "STAR PLATINUM" | quarto, cela, cidade à noite, estrelas |
| Ponto 1 | Socos no ar · ficha hexagonal com as notas A e o alcance C · letreiro caindo e a rajada ORA ORA ORA (punhos múltiplos, letreiro estilhaçado) · bala à queima-roupa pega no ar | cidade de dia |
| Ponto 2 | Close nos olhos com HUD · foto do inimigo com lupa (a mosca) · esboço em 1 segundo + mapa do Egito | estrelas, sala |
| Ponto 3 | Relógio gigante · "STAR PLATINUM: THE WORLD" (esfera, mundo congelado, pássaros e pessoas parados) · travelling lateral no mundo parado · cronômetro e recarga · cozinha: o tempo para só meio segundo e a xícara quebra | cidade ao pôr do sol, cozinha |
| Rival | A mesma dor (punho dourado acerta o Stand) · usuários se atraem · o Stand dourado surge · o rival para o tempo (duotono dourado), mas você se move | cidade e rua à noite |
| Clímax | Corrida com imagens residuais, passa pelo rival, **soco final** (explosão roxa, ondas de choque, faíscas) · o tempo volta e o rival é lançado longe | rua à noite |
| Final | "Yare yare daze" ao pôr do sol · "Você aguentaria?" SIM / NÃO · o tempo para de novo (final em loop) | pôr do sol, estrelas |

## Áudio
`audio.py` sintetiza ~235 efeitos sincronizados com a imagem: parada e volta do tempo, tique-taque no mundo
parado, a rajada ORA, o tilintar da bala presa nos dedos, a grade da cela, o zumbido da mosca, o lápis, o
"ゴゴゴ" grave, o soco final e outros. Também gera as ambiências (chuva, cidade, quarto, espaço) e a
**trilha original** em mi menor, a 128 bpm, com riff de baixo funk, bateria, metais, guitarra, coro e tema
heroico próprio. A trilha tem seções por momento: tensão no gancho, caixinha de música nos tempos parados,
subida até a revelação, rajada em dobro no ORA ORA e silêncio total no instante dos golpes e das paradas
do tempo. Na cozinha, ela para junto com o tempo por meio segundo. O final é triunfal.
Música, ambiência e efeitos abaixam sob a voz, e a mixagem final é normalizada em −14 LUFS.

## Como refazer
```
python3 narracao.py              # (só a voz provisória) voz + roteiro.json com o tempo de cada palavra
python3 alinhar_dtw.py voz.mp3   # (voz definitiva) no lugar do passo acima
./refazer.sh 4                   # tudo o resto: trilha, legendas, quadros 2K 60 fps e MP4
node pvt.js 5 27.3 66.8          # prévia de quadros (1080p) -> pvt.jpg   |  --hd = prévia em 2K
node plates.js str twn3          # (re)gera cenários em 2376x4224; depois python3 variantes.py
OUT=/tmp/conf node render.js 4 60 1.333333333333   # 2ª renderização em outra pasta, para comparar com frames/
```
Arquivos: `main.js` (os 25 planos, câmera, efeitos e sincronia), `stands.js` (Stands, rival, sobretudo,
ゴゴゴ, chuva, pássaros, bala, relógio, rajada, impactos, esfera do tempo parado), `engine.js` (motor de
quadro: câmera, luz por personagem, variantes de cenário, inversão de cores), `sfxlist.js` (efeitos e deixas
da trilha), `audio.py` (síntese, trilha e mixagem), `caps.py` (legendas com o tempo real das palavras),
`render.js` (quadros 1440×2560 em 4 processos, com o pré-passo de luz), `exportar.sh` (os dois MP4).
O render 2K levou cerca de 1 hora em 4 núcleos (0,6 s por quadro), mais cerca de 7 minutos de exportação.
