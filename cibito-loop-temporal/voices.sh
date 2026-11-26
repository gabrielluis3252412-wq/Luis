#!/bin/bash
# Gera as falas com timbre de personagem a partir da narracao original (mesmas palavras e tempos)
cd "$(dirname "$0")/audio"
ffmpeg -v error -y -i narracao-original.mp3 -ac 1 -ar 44100 narr.wav
seg(){ ffmpeg -v error -y -i narr.wav -af "atrim=$2:$3,asetpts=N/SR/TB,rubberband=pitch=$4:formant=shifted$5" -ar 44100 -ac 1 v_$1.wav; }
E=",aecho=0.8:0.55:90|170:0.22|0.12"
seg c1 16.10 21.00 1.19 ""; seg c2 27.45 30.14 1.19 ""; seg c3 31.99 35.34 1.19 ""
seg e1 44.34 48.20 0.84 "$E"; seg m1 57.52 61.13 1.42 ""; seg e2 78.60 83.37 0.84 "$E"; seg c4 84.85 86.12 1.19 ""
cd .. && python3 voices.py
