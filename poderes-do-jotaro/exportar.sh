#!/bin/bash
# Junta quadros (1440x2560 = 2K vertical, 60 fps) + mixagem + legendas nos MP4 finais.
# Principal: H.264 High nivel 5.1, CRF 18 com teto de 7 Mbit/s (arquivo < 100 MB, toca em celulares e no YouTube).
# Reserva: 1080x1920, 60 fps, nivel 4.2 (para aparelhos mais antigos). Audio AAC 48 kHz normalizado em -14 LUFS.
set -e; cd "$(dirname "$0")"
ffmpeg -v error -stats -y -framerate 60 -i frames/%05d.jpg -i audio/mix_final.wav \
  -vf "scale=1440:2560:flags=lanczos,subtitles=legendas.ass:fontsdir=fonts,format=yuv420p" -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:v libx264 -preset medium -profile:v high -level 5.1 -crf 18 -maxrate 7M -bufsize 14M -g 120 -bf 2 \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart -color_primaries bt709 -color_trc bt709 -colorspace bt709 poderes-do-jotaro.mp4
ffmpeg -v error -stats -y -framerate 60 -i frames/%05d.jpg -i audio/mix_final.wav \
  -vf "scale=1080:1920:flags=lanczos,subtitles=legendas.ass:fontsdir=fonts,format=yuv420p" -af "loudnorm=I=-14:TP=-1.5:LRA=11" \
  -c:v libx264 -preset medium -profile:v high -level 4.2 -crf 18 -maxrate 10M -bufsize 20M -g 120 \
  -c:a aac -b:a 192k -ar 48000 -shortest -movflags +faststart poderes-do-jotaro-celular.mp4
echo "pronto: poderes-do-jotaro.mp4 (2K 60 fps) e poderes-do-jotaro-celular.mp4 (1080p 60 fps)"
