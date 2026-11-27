#!/bin/bash
# Junta quadros (2160x3840, 60 fps) + mixagem + legendas no MP4 final.
# H.264 High 5.1, ~10 Mbit/s (cabe no GitHub e o YouTube aceita em 4K60); audio AAC 48 kHz normalizado em -14 LUFS.
set -e; cd "$(dirname "$0")"
OUT=${1:-poderes-do-jotaro.mp4}
ffmpeg -v error -stats -y -framerate 60 -i frames/%05d.jpg -i audio/mix_final.wav \
  -vf "subtitles=legendas.ass:fontsdir=fonts,format=yuv420p" -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:v libx264 -preset slow -profile:v high -level 5.1 -b:v 10M -maxrate 14M -bufsize 20M -g 120 -bf 2 \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart -color_primaries bt709 -color_trc bt709 -colorspace bt709 "$OUT"
echo "pronto: $OUT"
