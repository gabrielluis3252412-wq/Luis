#!/bin/bash
# Refaz o Short inteiro a partir da narracao atual (audio/narracao.wav + roteiro.json)
set -e; cd "$(dirname "$0")"
python3 prep.py                 # roteiro.js + env.js (energia da voz)
node build.js                   # monta story.html
node sfxexport.js               # lista de efeitos e deixas da trilha -> sfx.json
python3 audio.py                # efeitos + ambiencias + trilha + mixagem -> audio/mix_final.wav
python3 caps.py                 # legendas coloridas -> legendas.ass
rm -rf frames; node render.js ${1:-4}   # quadros -> frames/
ffmpeg -v error -y -framerate ${FPS:-30} -i frames/%05d.jpg -i audio/mix_final.wav \
  -vf "subtitles=legendas.ass:fontsdir=fonts" -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:v libx264 -preset slow -crf 17 -tune animation -pix_fmt yuv420p -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart \
  poder-do-saitama.mp4
echo "pronto: poder-do-saitama.mp4"
