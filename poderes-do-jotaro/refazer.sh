#!/bin/bash
# Refaz o Short inteiro a partir da narracao atual (audio/narracao.wav + roteiro.json).
# Uso: ./refazer.sh [processos=4]      (render em 1440x2560 = 2K, 60 fps)
set -e; cd "$(dirname "$0")"
python3 prep.py                 # roteiro.js + env.js (energia da voz)
node build.js                   # monta story.html
node sfxexport.js               # lista de efeitos e deixas da trilha -> sfx.json
python3 audio.py                # efeitos + ambiencias + trilha + mixagem -> audio/mix_final.wav
python3 caps.py                 # legendas coloridas -> legendas.ass
rm -rf frames
node render.js ${1:-4} 60 1.333333333333  # quadros 1440x2560 (2K) -> frames/
./exportar.sh
