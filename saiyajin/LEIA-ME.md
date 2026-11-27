# E se você fosse um Saiyajin? — Short animado

Vertical 1080 × 1920, 24 fps, ~102 s. A narração é a original do ElevenLabs (`audio/narracao-elevenlabs.mp3`), inteira e sem cortes. É o mesmo motor de "Cibito e o Loop Temporal" e "Seis Olhos": personagens 2D
sobre cenários 3D prontos (`plates/`, nenhum recriado).

**Vídeo:** `saiyajin.mp4`

- **Personagem:** o Cibito é o "você" da história. Nenhum personagem de Dragon Ball é desenhado.
  As formas são variações do Cibito: `CSS` = cabelo dourado espetado saindo do capuz e olhos verde-água;
  `CUI` = cabelo e olhos prateados; `G1`/`G2` = imagens residuais do desvio.
- **Rival:** o vilão é um rival Saiyajin **original** (`RIV` em `main.js`): cabelo preto espetado, traje roxo-escuro, armadura cinza com ombreiras vermelhas, olhos vermelhos e cicatriz. Ele foi inspirado no arquétipo do rival orgulhoso da referência enviada, mas não é uma cópia do Vegeta.
- **Narração antiga:** a provisória (voz sintética, `narracao.py`) está guardada em `audio/provisoria/`. Para usar a definitiva (ElevenLabs):
  `python3 transcrever.py nova.mp3 pasta-do-modelo` (se o texto mudar) ou `python3 alinhar.py nova.mp3`
  (se o texto for o mesmo). Depois: `python3 prep.py && node build.js && node sfxexport.js && python3 audio.py && python3 caps.py && node render.js 4`
  e o ffmpeg (igual ao do Seis Olhos).
- **Arquivos:** `main.js` (os 22 planos), `sfxlist.js` (efeitos e deixas da trilha),
  `audio.py` (síntese, trilha e mixagem) e `caps.py` (legendas).
