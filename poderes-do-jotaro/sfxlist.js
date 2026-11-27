// ---------- EFEITOS SONOROS E DEIXAS DA TRILHA (sincronizados com a imagem) ----------
// a(t, tipo, volume). Tipos 'M_*' sao deixas da trilha (audio.py); 'amb_*' sao ambiencias (ate o proximo corte).
window.getSFX=()=>{const L=[],a=(t,k,v=1)=>L.push([+Math.max(0,t).toFixed(3),k,v]),cut=i=>SH[i].t0;
 SH.forEach((s,i)=>{if(i&&s.tin){const k=s.tin=='zoom'?'zoom':s.tin.startsWith('flash')?'flash':s.tin=='glitch'?'glitch':s.tin=='dip'?'dark':'whoosh';a(s.t0-(k=='dark'?.3:.2),k,.75)}});
 // deixas da trilha
 a(0,'M_hook');a(tPar,'M_freeze');a(tTit,'M_title');a(cut(2),'M_myst');a(tSta,'M_build');a(tStar-.05,'M_reveal');a(cut(6),'M_p1');a(tSoc,'M_rush');a(tOend,'M_rushend');
 a(cut(10),'M_p2');a(tEgi,'M_egito');a(cut(13),'M_p3');a(tTS,'M_tstop');a(tSeg,'M_resume');a(T17,'M_kitchen');a(tPar2-.1,'M_half');a(tPar2+.4,'M_halfend');a(T18,'M_pain');a(T19,'M_rival');a(tDou,'M_gold');
 a(tGS,'M_gstop');a(tMas,'M_move');a(tAva,'M_attack');a(tORA,'M_ora');a(tVol-.1,'M_finale');a(T23,'M_outro');a(TOTAL,'M_end');
 // 0) gancho: chuva, bala, o tempo para
 a(0,'amb_rain',.9);a(0,'bullet_whiz',.9);a(.05,'heart',.7);a(tPar-.35,'riser_s',.7);a(tPar,'tstop',1.2);a(tPar,'boom',.9);
 for(let t=tPar+1.0;t<tTit-.2;t+=.5)a(t,'tick',.55);a(tPar+.6,'rumble',.8);a(tSo,'eye_open',.6);a(tMov,'ting',.9);a(tMov-.1,'swish',.6);
 // 1) titulo: o tempo volta
 a(tTit,'tresume',1);a(tTit,'amb_rain',.8);a(tTit+.15,'boom',1);a(tTit+.5,'ting',.5);a(tDes,'hit',.6);a(tJot,'hit',.9);a(tJot,'shimmer',.6);a(tTit+.3,'rumble',.6);
 // 2) quarto
 a(cut(2),'amb_night',.8);a(tEsp-.2,'energy_dark',.8);a(tEsp,'ghost',.9);a(tCor,'sting_hi',.7);a(tCor,'impact',.6);
 // 3) cela
 a(cut(3),'amb_room',.8);a(tPos,'sting_low',.8);a(tTra-.15,'swish',.7);a(tTra+.12,'clang',1.1);
 // 4) Stand se forma
 a(cut(4),'amb_night',.7);a(tSta-.4,'riser_s',.8);a(tSta,'boom',1);a(tSta,'energy',.9);a(tEne,'charge',.6);a(tLad,'hit',.8);a(tLad,'shimmer',.7);a(tSta+.3,'rumble',.7);
 // 5) Star Platinum
 a(cut(5),'amb_space',.8);a(tStar,'boom',1.1);a(tStar,'shimmer',.8);a(tStar+.2,'rumble',.9);a(tPla,'hit',.6);
 // 6) ponto 1: dois socos no ar
 a(cut(6)+.05,'stamp',.8);a(tFor+.05-.08,'whiff',.8);a(tFor+.05,'punch',1);a(tVel+.1-.08,'whiff',.8);a(tVel+.1,'punch',1);a(cut(6),'amb_town',.6);
 // 7) ficha (hexagono)
 a(cut(7),'amb_space',.6);a(cut(7)+.1,'pop',.6);[tN1,tN2,tN3,tN3+.35,tN3+.6].forEach(t=>{a(t,'stamp',.55);a(t,'ding',.35)});a(tAlc,'buzzer',.7);a(tCur,'stamp',.9);
 // 8) ORA ORA ORA
 a(cut(8),'amb_town',.7);a(ps(12)+.2,'creak',.7);a(tPis,'eye_open',.5);a(tSoc-.25,'whoosh',.8);a(tSoc-.05,'rush',1.15);[tO1,tO2,tO3].forEach(t=>a(t,'hit',.6));a(tOend-.1,'boom',1.2);a(tOend-.1,'glass',.8);a(tOend,'debris',.9);
 // 9) bala a queima-roupa
 a(cut(9),'amb_town',.5);a(tBa2,'gunshot',1);a(tBa2+.05,'slowmo',.7);a(tQue,'ting',1);a(tQue,'swish',.5);
 // 10-12) precisao e visao
 a(cut(10),'amb_space',.6);a(cut(10)+.05,'stamp',.8);a(ps(16)-.7,'scan',.8);a(cut(11),'amb_room',.5);a(tEnx,'zoom',.6);a(tMos-.1,'buzz',.9);a(tMos+.3,'pop',.6);
 a(cut(12),'amb_room',.5);a(ps(17),'scribble',1);a(tIni-.1,'swish',.7);a(tEgi,'pin',1);a(tEgi,'ding',.7);
 // 13) ponto 3: relogio
 a(cut(13),'amb_space',.6);a(cut(13)+.05,'stamp',.9);for(let t=cut(13)+.1;t<tMai;t+=.25)a(t,'tick',.45);a(tMai,'sting_low',1);a(tMai,'impact',.7);
 // 14) THE WORLD
 a(cut(14),'amb_town',.7);a(tSP,'energy',.8);a(tWor-.4,'riser_s',.9);a(tTS,'tstop',1.3);a(tTS,'boom',1);a(tTS+.7,'rumble',.8);for(let t=tTS+1;t<T16+.1;t+=.5)a(t,'tick',.5);
 // 15) mundo congelado
 a(tChv,'shimmer',.5);a(tPas,'pop',.4);a(tPes,'pop',.4);a(tCon,'hit',.6);a(tSoV,'eye_open',.5);for(let t=T15+.2;t<T16;t+=.42)a(t,'step',.35);
 // 16) alguns segundos / nunca duas vezes
 for(let t=T16+.1;t<tSeg;t+=.5)a(t,'tick',.55);a(tSeg,'tresume',1);a(tSeg,'amb_town',.7);a(tSeg+.1,'birds',.8);a(tSeg+.3,'breath',.6);a(tNun,'charge',.6);a(tVez,'buzzer',.9);
 // 17) meio segundo
 a(T17,'amb_room',.6);a(tDez-.1,'whoosh_soft',.6);a(tPar2-.1,'tstop_short',1);a(tPar2+.4,'tresume_short',.9);a(tPar2+.4+Math.sqrt(1/2.6),'glass',.9);a(tMei,'sting_hi',.6);
 // 18) mesma dor
 a(T18,'amb_night',.6);a(tMac+.05-.1,'whiff',.8);a(tMac+.05,'block',1.1);a(tMac+.05,'impact',.7);a(tSen,'heart',.9);a(tDor,'sting_hi',.7);
 // 19) usuarios de Stand se atraem / Stand dourado
 a(T19,'amb_rain',.5);a(T19,'wind',.7);for(let t=T19+.2;t<tCed-.1;t+=.45)a(t,'step',.4);a(tAtr,'rumble',1);a(tCed-.1,'dark',.7);a(tDou-.3,'riser_s',.8);a(tDou,'boom',1.1);a(tDou,'gold',.9);a(tVo2,'hit',.6);
 // 20) rival para o tempo
 a(T20,'wind',.6);a(tPara-.4,'riser_s',.8);a(tGS,'tstop',1.2);a(tGS,'boom',.8);for(let t=tGS+1;t<tMas;t+=.5)a(t,'tick',.5);a(tGS+.3,'heart',.8);a(tMas,'eye_open',1);a(tMas,'hit',.6);a(tMov2+.2,'sting_hi',.7);
 // 21) avanca, passa, ORA!
 a(tAva-.1,'dash',1);a(tPss,'whoosh',.9);a(tPss+.2,'swish',.8);a(tGol-.3,'charge',.8);a(tORA-.12,'whiff',1);a(tORA,'mega_punch',1.3);a(tORA,'boom',1.2);a(tORA+.05,'glass',.7);
 // 22) o tempo volta
 a(tVol-.1,'tresume',1.1);a(tVol-.1,'mega_punch',1);a(tVol-.05,'boom',1.1);a(tVol,'debris',.9);a(tVol+.2,'whoosh',.9);a(tVol+1.45,'twinkle',.9);a(tVol,'amb_rain',.8);
 // 23-24) yare yare / CTA
 a(T23,'wind',.8);a(tYar,'cloth',.6);a(tDaz,'hit',.5);a(T24,'amb_space',.6);a(tAgu,'hit',.7);a(tSim,'pop',.8);a(tNao,'pop',.8);a(tLoop,'tstop',1);
 REACTS.forEach((r,j)=>{a(r.t0,'babble',.9);a(r.t0,'pop',.4)});
 L.sort((x,y)=>x[0]-y[0]);return L};
