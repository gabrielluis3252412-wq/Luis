# Narração para IA de voz (ElevenLabs ou similar)

Texto completo do Short "E se você despertasse os poderes do Jotaro?" (~90 s), pronto para colar.
**Use exatamente estas palavras.** O vídeo está sincronizado palavra por palavra com este texto, e o
`alinhar_dtw.py` transfere os tempos para a gravação nova. Pode mudar o ritmo, a emoção e as pausas,
mas não troque nem tire palavras.

## Opção 1 — texto simples (qualquer IA de voz)
Cole tudo de uma vez. As linhas em branco e as reticências viram pausas naturais.

```
O tempo parou.

A bala congela a centímetros do seu rosto… e só você se move.

E se você despertasse os poderes do Jotaro?

Primeiro, um espírito estranho sairia do seu corpo. O Jotaro achou que estava possuído e se trancou numa cela.

Mas era um Stand: a sua energia vital ganhando forma ao seu lado. E o seu seria o Star Platinum.

Ponto um: força e velocidade.

Na ficha oficial, ele tem nota máxima em força, velocidade e precisão. Só o alcance é curto.

Num piscar de olhos, ele solta uma chuva de socos: ORA ORA ORA!

E pega no ar até uma bala disparada à queima-roupa.

Ponto dois: precisão e visão.

Ele enxerga até uma mosca minúscula escondida numa foto. Foi assim que o Jotaro descobriu que o inimigo estava no Egito.

Ponto três: o poder mais assustador.

Star Platinum: The World.

Você para o tempo.

Chuva, pássaros, pessoas… tudo congela. Só você se move.

Mas só por alguns segundos, e nunca duas vezes seguidas. Dez anos depois, o Jotaro só conseguia parar o tempo por meio segundo!

E se o seu Stand se machucar, você sente a mesma dor.

E usuários de Stand se atraem… Cedo ou tarde, um Stand dourado viria atrás de você.

Ele também pararia o tempo… mas você se moveria dentro dele.

Você avança, passa por ele, e acerta o golpe final: ORA!

E o tempo volta a correr.

Yare yare daze.

Você aguentaria esse poder? Comenta: sim ou não.
```

## Opção 2 — ElevenLabs com pausas marcadas
Nos modelos que aceitam a marcação `<break time="…" />` (por exemplo, Multilingual v2), use esta versão.
As pausas maiores caem nos momentos de impacto do vídeo: o tempo parando, as revelações e o soco final.

```
O tempo... parou. <break time="0.6s" />
A bala congela a centímetros do seu rosto... <break time="0.3s" /> e só você se move. <break time="0.7s" />
E se você despertasse os poderes do Jotaro? <break time="0.8s" />
Primeiro, um espírito estranho sairia do seu corpo. <break time="0.4s" />
O Jotaro achou que estava possuído, e se trancou numa cela. <break time="0.5s" />
Mas era um Stand: a sua energia vital, ganhando forma ao seu lado. <break time="0.5s" />
E o seu seria o Star Platinum. <break time="0.8s" />
Ponto um: força e velocidade. <break time="0.4s" />
Na ficha oficial, ele tem nota máxima em força, velocidade e precisão. <break time="0.3s" />
Só o alcance é curto. <break time="0.5s" />
Num piscar de olhos, ele solta uma chuva de socos: <break time="0.2s" /> ORA ORA ORA! <break time="0.5s" />
E pega no ar até uma bala disparada à queima-roupa. <break time="0.7s" />
Ponto dois: precisão e visão. <break time="0.4s" />
Ele enxerga até uma mosca minúscula, escondida numa foto. <break time="0.3s" />
Foi assim que o Jotaro descobriu que o inimigo estava no Egito. <break time="0.7s" />
Ponto três: o poder mais assustador. <break time="0.6s" />
Star Platinum: The World. <break time="0.9s" />
Você para o tempo. <break time="0.6s" />
Chuva, pássaros, pessoas... tudo congela. <break time="0.3s" />
Só você se move. <break time="0.6s" />
Mas só por alguns segundos, e nunca duas vezes seguidas. <break time="0.4s" />
Dez anos depois, o Jotaro só conseguia parar o tempo por meio segundo! <break time="0.7s" />
E se o seu Stand se machucar, você sente a mesma dor. <break time="0.6s" />
E usuários de Stand se atraem... <break time="0.4s" />
Cedo ou tarde, um Stand dourado viria atrás de você. <break time="0.7s" />
Ele também pararia o tempo... <break time="0.3s" />
mas você se moveria dentro dele. <break time="0.6s" />
Você avança, passa por ele, e acerta o golpe final: <break time="0.2s" /> ORA! <break time="0.8s" />
E o tempo volta a correr. <break time="0.8s" />
Yare yare daze. <break time="0.6s" />
Você aguentaria esse poder? Comenta: sim ou não.
```

## Dicas de interpretação
- **Tom:** narrador de anime, grave e confiante, crescendo nos pontos de ação. A voz "Will" (a dos outros
  Shorts) combina.
- **Lento e misterioso:** a abertura ("O tempo parou"), "Star Platinum: The World" e "Você para o tempo".
- **Explosivo:** "ORA ORA ORA!" e o "ORA!" final. Se a IA ler sem força, gere só essa frase de novo,
  com mais estabilidade baixa e estilo alto.
- **Leve e divertido:** "meio segundo!" e "Yare yare daze."
- **Configuração sugerida no ElevenLabs (Multilingual v2):** estabilidade ~40%, similaridade ~75%,
  estilo ~30%, velocidade 0,95–1,0. A fala deve ficar entre 85 e 100 segundos; o vídeo se ajusta ao tempo.

## Pronúncia (se a IA errar)
| Palavra | Como deve soar | Se errar, escreva assim |
|---|---|---|
| Stand | "Istênd" | `Istênd` |
| Star Platinum | "Istár Plátinum" | `Istár Plátinum` |
| The World | "Dâ Uórld" | `Dâ Uórld` |
| Jotaro | "Jotáro" | `Jotáro` |
| ORA | "Óra" | `Óra! Óra! Óra!` |
| Yare yare daze | "Iáre iáre dáze" | `Iáre, iáre, dáze.` |

Trocar a grafia só muda o som, não atrapalha o alinhamento.

## Depois de gravar
Exporte em MP3 (ou WAV) **em um único arquivo** com a narração inteira e coloque em `audio/`. Depois rode:
```
python3 alinhar_dtw.py audio/narracao-elevenlabs.mp3
./refazer.sh 4
```
Isso gera de novo as duas versões do vídeo com a voz nova: a 2K (1440×2560) e a de celular (1080p).
Ou é só mandar o MP3 na conversa que eu faço tudo.
