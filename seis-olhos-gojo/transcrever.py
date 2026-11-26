# Transcreve a narracao com tempo de cada palavra (Whisper small, offline, faster-whisper)
# e grava roteiro.json com as frases e palavras REAIS do audio.
# Uso: python3 transcrever.py audio/narracao.mp3 caminho/do/modelo-whisper
# (Como a narracao do ElevenLabs foi reescrita em relacao ao roteiro original, o texto das
#  legendas vem do proprio audio; numeros como "6" foram trocados por "Seis" na revisao.)
import sys, json, librosa
from faster_whisper import WhisperModel
a, _ = librosa.load(sys.argv[1], sr=16000)
m = WhisperModel(sys.argv[2], device='cpu', compute_type='int8', cpu_threads=4)
segs, _ = m.transcribe(a, language='pt', word_timestamps=True, beam_size=5)
fr, wd = [], []
for s in segs:
    fr.append([s.text.strip(), round(s.start, 2), round(s.end, 2)]); wd.append([[w.word.strip(), round(w.start, 2), round(w.end, 2)] for w in s.words])
json.dump({'fonte': sys.argv[1], 'duracao': round(len(a) / 16000, 3), 'frases': fr, 'palavras': wd}, open('roteiro.json', 'w'), ensure_ascii=False, indent=1)
for f in fr: print(f)
