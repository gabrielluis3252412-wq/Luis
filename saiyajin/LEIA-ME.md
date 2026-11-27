# E se você fosse um Saiyajin? — Short animado

Vertical 1080 × 1920, 24 fps, ~78 s. É o mesmo motor de "Cibito e o Loop Temporal" e "Seis Olhos": personagens 2D
sobre cenários 3D prontos (`plates/`, nenhum recriado).

**Vídeo:** `saiyajin.mp4`

- **Personagem:** o Cibito é o "você" da história. Nenhum personagem de Dragon Ball é desenhado.
  As formas são variações do Cibito: `CSS` = cabelo dourado espetado saindo do capuz e olhos verde-água;
  `CUI` = cabelo e olhos prateados; `G1`/`G2` = imagens residuais do desvio.
- **Narração:** é **provisória** (voz sintética, `narracao.py`). Para usar a definitiva (ElevenLabs):
  `python3 transcrever.py nova.mp3 pasta-do-modelo` (se o texto mudar) ou `python3 alinhar.py nova.mp3`
  (se o texto for o mesmo). Depois: `python3 prep.py && node build.js && node sfxexport.js && python3 audio.py && python3 caps.py && node render.js 4`
  e o ffmpeg (igual ao do Seis Olhos).
- **Arquivos:** `shots.js` (os 22 planos; já embutidos em `main.js`), `sfxlist.js` (efeitos e deixas da trilha),
  `audio.py` (síntese, trilha e mixagem) e `caps.py` (legendas).
