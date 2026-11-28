# Luis — Shorts animados (projeto "Histórias IA")

Shorts verticais para YouTube (**1080 × 1920, 24 fps, H.264 + AAC**; o do Jotaro em **1440 × 2560 (2K), 60 fps**) com personagens 2D de contorno preto
grosso sobre cenários 3D estilo cartoon. Tudo é gerado por código: HTML + JavaScript + WebGL, renderizado
quadro a quadro no Chromium e montado com ffmpeg. Não há modelos 3D nem texturas separadas: os cenários
são desenhados por código (`sets.js`) e já estão prontos como PNG em `plates/`.

## Projetos

| Pasta | Short | Duração | Vídeo final | Detalhes |
|---|---|---|---|---|
| [`cibito-loop-temporal/`](cibito-loop-temporal/) | Cibito e o Loop Temporal — Parte 1 | ~88 s | `cibito-loop-temporal-parte1.mp4` | [LEIA-ME](cibito-loop-temporal/LEIA-ME.md) |
| [`seis-olhos-gojo/`](seis-olhos-gojo/) | E se você tivesse os Seis Olhos? | ~105 s | `seis-olhos-gojo.mp4` | [LEIA-ME](seis-olhos-gojo/LEIA-ME.md) |
| [`saiyajin/`](saiyajin/) | E se você fosse um Saiyajin? | ~121 s | `saiyajin.mp4` | [LEIA-ME](saiyajin/LEIA-ME.md) |
| [`poderes-do-jotaro/`](poderes-do-jotaro/) | E se você despertasse os poderes do Jotaro? | ~102 s, **2K 60 fps** | `poderes-do-jotaro.mp4` | [LEIA-ME](poderes-do-jotaro/LEIA-ME.md) |

Todos usam o mesmo motor. O **Cibito** é o protagonista (o "você" das histórias). Personagens de outras
obras (Gojo, Jotaro, personagens de Dragon Ball) **não são desenhados**: só aparecem citados na narração ou como
variações e personagens originais. No short do Jotaro, os dois Stands seguem as imagens de referência enviadas,
redesenhados no traço do projeto.

## Backups (ZIP)

- `ANIMACOES_parte1_codigo.zip`: código dos projetos antigos. Inclui `titan/` ("E se você virasse um Titã"),
  `story/` ("Sexta-feira 13", com o Jorisvaldo), `outras-animacoes/` (HTMLs que abrem direto no navegador)
  e o `LEIA-ME.txt` completo do backup.
- `ANIMACOES_parte2_originais.zip`: os arquivos originais enviados por você (`projeto-historias-ia.zip` e o
  MP3 da narração do ElevenLabs, voz "Will").

## Estrutura de cada pasta

| Arquivo | Para que serve |
|---|---|
| `main.js` | A animação: planos, câmera, efeitos e sincronia com a narração |
| `lib.js` | Desenho dos personagens 2D e motor 3D (WebGL) |
| `sets.js` / `sets_loop.js` | Cenários 3D |
| `plates/` | Cenários já renderizados (`_A` = fundo, `_B` = primeiro plano) |
| `build.js` | Monta `story.html` e `plates.html` depois de editar os `.js` |
| `pvt.js` | Prévia de quadros em segundos específicos → `pvt.jpg` |
| `render.js` | Renderiza os quadros em `frames/` (aceita nº de processos) |
| `sfxlist.js` / `sfxexport.js` | Lista de efeitos sonoros e deixas da trilha |
| `audio.py` | Síntese dos efeitos e da trilha + mixagem (−14 LUFS) |
| `caps.py` | Legendas coloridas (`.ass`) |
| `audio/` | Narração (ElevenLabs) e tempos das palavras |

Pastas geradas (`frames/`, `_pv/`, mixagens intermediárias) ficam fora do git (`.gitignore`).

## Requisitos

Node.js, Python 3 (com Playwright + Chromium, Pillow, numpy), ffmpeg com libx264 e libass e a fonte Poppins
(incluída em `fonts/`).

## Como refazer um vídeo (resumo)

Dentro da pasta do projeto:

```
node build.js            # depois de editar main.js, lib.js ou sets.js
node pvt.js 5 27.3       # conferir quadros (segundos)
node render.js 4         # renderiza com 4 processos
python3 audio.py && python3 caps.py
# ffmpeg junta frames/ + audio/mix_final.wav + legendas (comando completo no LEIA-ME de cada projeto)
```

No `seis-olhos-gojo/` o `./refazer.sh 4` faz tudo de uma vez. Para trocar a narração, veja a seção
"Narração" no LEIA-ME de cada projeto (`alinhar.py` / `transcrever.py`).
