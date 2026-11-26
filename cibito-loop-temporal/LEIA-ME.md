# Cibito e o Loop Temporal — Parte 1

Short vertical (1080 × 1920, 24 fps, 88 s, H.264 + AAC), feito com o mesmo motor do projeto "Histórias IA":
personagens 2D com contorno grosso sobre cenários 3D gerados por código.

**Vídeo final:** `cibito-loop-temporal-parte1.mp4`

## O que foi preservado
- A narração original (`audio/narracao-original.mp3`, ElevenLabs "Will") entra inteira, sem cortes e sem trocar palavras.
- As 30 frases do roteiro aparecem na ordem original. Os tempos vêm das pausas reais do áudio.
- As falas entre aspas têm o timbre ajustado por personagem (pedido seu), com as mesmas palavras e o mesmo tempo:
  Cibito (mais agudo), Elias (mais grave e com eco), mãe (bem mais aguda). Script: `voices.py`.

## Planos (17)
Gancho no vórtice do tempo · estrada para Colinas dos Mares (placa) · celular / Clarona dentro do carro ·
reclamação (dinheiro, internet "PUF!") · veado, freada e batida · "MEU DEUS!" · veado tonto / "UFA!" ·
moradores olhando · Elias avisa · hotel · rebobinar → acorda em casa · mãe · LOOP TEMPORAL ·
estrada à noite · moradores parados de olhos vermelhos · Elias com aura roxa · "ELE QUEM?!" + sombra + "CONTINUA...".

## Áudio
`audio.py` sintetiza 118 efeitos sincronizados com a imagem e as ambiências (estrada, motor, cidade, grilos, drone),
além de uma trilha instrumental original com o tema do loop em caixinha de música.
Música, ambiência e efeitos abaixam automaticamente sob a voz. Mixagem final normalizada em −14 LUFS.

## Como refazer
```
node build.js                 # monta story.html e plates.html
node plates.js road roadN hot twn3   # (re)gera cenários novos
node pvt.js 5 27.3 66.8       # prévia de quadros -> pvt.jpg
node render.js 4              # renderiza frames/ (4 processos)
./voices.sh                    # falas com timbre + voz final + boca sincronizada (env.js)
node sfxlist.js && python3 audio.py && python3 caps.py
ffmpeg -framerate 24 -i frames/%05d.jpg -i audio/mix_final.wav -vf "subtitles=legendas.ass:fontsdir=fonts" \
  -af "loudnorm=I=-14:TP=-1.5:LRA=11" -c:v libx264 -preset slow -crf 19 -pix_fmt yuv420p \
  -c:a aac -b:a 192k -t 88 -movflags +faststart cibito-loop-temporal-parte1.mp4
```
Arquivos: `main.js` (roteiro, planos, câmera, efeitos visuais), `sets_loop.js` (cenários novos),
`lib.js`/`sets.js` (motor e cenários originais), `plates/` (cenários prontos).

## Aprimoramento cinematográfico (versão 2)
O que mudou, sem alterar história, falas, tempos ou o desenho dos personagens:

- **Integração 2D/3D:** filtro de luz por cena (`LIT` em `main.js`). Cada personagem recebe o tom da luz ambiente, uma luz de recorte (rim light) do lado da fonte e uma sombra própria do lado oposto. Pôr do sol fica quente, noite fria e azulada, hotel com abajur alaranjado, interior do carro mais escuro.
- **Sombras:** cada personagem tem sombra de contato nítida sob os pés e sombra projetada suave na direção oposta à luz.
- **Profundidade:** perspectiva atmosférica (personagens distantes perdem contraste e saturação) e profundidade de campo automática (o cenário desfoca nos closes, proporcional ao zoom).
- **Cenários:** renderizados com supersampling 2× e reduzidos com Lanczos, sem serrilhado nas bordas.
- **Animação:** `tw()` (ease-out com antecipação e overshoot) e `SQ()` (squash & stretch de reação) nos sustos, gestos e viradas de cabeça. A caminhada tem peso (corpo desce no contato, squash leve) e desacelera ao parar. Respiração muda de ritmo com a emoção e o olhar faz pequenas sacadas naturais. Os moradores viram a cabeça em sequência.
- **Veículos:** suspensão, inclinação nas curvas, carro afundando na freada e tranco na batida, fumaça do escapamento, sombra de contato sob as rodas, lanternas acesas e faróis iluminando a estrada à noite. O veado mexe orelhas e rabo e respira.
- **Continuidade:** no hotel, o Cibito boceja, a luz apaga suavemente e ele deita no escuro, sem pulo de pose. Os olhos vermelhos dos moradores acendem em sequência.
- **Acabamento:** grade de cor global leve (contraste e saturação) e vinheta que escurece com o suspense.
- **Código:** a fórmula de escala repetida virou `kuAt()`, e foram removidas variáveis sem uso.
