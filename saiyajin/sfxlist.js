// ---------- EFEITOS SONOROS E DEIXAS DA TRILHA (sincronizados com a imagem) ----------
window.getSFX=()=>{const L=[],a=(t,k,v=1)=>L.push([+Math.max(0,t).toFixed(3),k,v]),cut=i=>SH[i].t0;
 SH.forEach((s,i)=>{if(i&&s.tin){const k=s.tin=='zoom'?'zoom':s.tin.startsWith('flash')?'flash':s.tin=='glitch'?'glitch':s.tin=='dip'?'dark':'whoosh';a(s.t0-(k=='dark'?.3:.2),k,.85)}});
 a(0,'M_hook');a(tFor,'M_up');a(cut(1),'M_race');a(tDes,'M_boom');a(cut(4),'M_drop');a(cut(5),'M_rec');a(tDra,'M_pow');a(cut(7),'M_enemy');a(cut(9),'M_rage');a(tExp,'M_exp');a(cut(16),'M_ui');a(cut(17),'M_dodge');a(cut(18),'M_truth');a(cut(20),'M_rise');a(tMfo,'M_hero');
 // 0 gancho
 a(0,'boom',1.2);a(0,'impact',1);[.75,1.5,2.25,3,3.75].forEach(t=>{a(t,'heart',.9);a(t,'energy_pulse',.4)});a(.3,'energy_dark',.6);a(0,'amb_town',.7);a(tDer,'heart',.8);a(tFor-.45,'riser_s',.8);a(tFor,'boom',1.1);a(tFor,'energy',1);a(tFor,'shimmer',.6);
 // 1 raca guerreira
 a(cut(1),'amb_space',.8);a(tRac,'sting_low',.9);a(tTem,'pop',.4);
 // 2 treino
 a(cut(2),'amb_night',.7);for(let t=cut(2)+.1;t<cut(3)-.1;t+=1/7)a(t,'impact',.35);a(tTre,'swish',.6);
 // 3 planeta
 a(cut(3),'amb_space',.8);a(cut(3)+.2,'energy_dark',.8);a(tDes-.4,'swish',.8);a(tDes-.4,'riser_s',.7);a(tDes,'boom',1.3);a(tDes,'thunder',.8);a(tPla,'glass',.6);
 // 4 assustador
 a(cut(4),'amb_night',1);a(cut(4),'wind',.6);a(tAss,'sting_low',1.1);a(tAss,'hit',.6);
 // 5 recupera / poder
 a(cut(5),'wind',.8);a(tExt,'heart',.7);a(tRec-.3,'breath',.6);a(tRec,'charge',.7);a(tDra,'boom',1.1);a(tDra,'energy',.9);a(tPod,'ding',.6);
 // 6 grafico
 a(cut(6),'amb_space',.6);[0,.55,1.1,1.65].forEach((d,i)=>a(cut(6)+.2+d,i%2?'tick':'pop',.5));a(tEvo,'chime',.7);
 // 7 inimigo impossivel
 a(cut(7),'amb_night',1);a(cut(7),'drone',1);a(cut(7)+.9,'boom',1);a(cut(7)+.9,'impact',.8);a(cut(7)+.3,'whoosh',.8);a(tImp,'sting_low',1.1);a(tImp,'thunder',.6);
 // 8 amigos
 a(cut(8),'drone',1);a(cut(8)+.2,'hum',.6);a(tPer,'sting_hi',.8);for(let t=cut(8)+.2;t<cut(9);t+=.6)a(t,'heart',.8);
 // 9 raiva
 a(cut(9),'drone',.8);a(tRai,'energy_dark',1);a(tRai,'riser_s',.6);for(let t=tLib;t<cut(10);t+=.35)a(t,'thunder',.35);a(tLib,'roar',.8);a(tJam,'riser_s',.9);
 // 10-11 cabelo e olhos
 a(tDou,'boom',1.2);a(tDou,'eye_open',.8);a(tDou,'energy',.9);a(tOlh,'eye_open',1.1);a(tOlh,'shimmer',.6);
 // 12 aura explode
 a(tExp-.6,'riser_s',1);a(tExp,'boom',1.4);a(tExp,'warp',1);a(tExp+.05,'thunder',.9);a(tAur,'energy',.8);
 // 13-14 Super Saiyajin
 a(cut(13),'hum',.7);a(tSup,'hit',1);a(tSup,'shimmer',.8);for(let t=cut(13)+.3;t<cut(15);t+=.7)a(t,'zap',.3);a(tCom,'swish',.6);
 // 15 batalhas e deuses
 [tBat,tBat+.55,tDif2,tDif2+.45].forEach(h=>{a(h,'impact',1);a(h,'whoosh_soft',.6)});
 a(cut(16)-.15,'amb_space',.8);a(tDeu,'chime',.8);a(tDeu,'shimmer',.9);
 // 16 Instinto Superior
 a(tIns-.2,'sonar',.8);a(tIns-.2,'eye_open',.9);a(tIns,'shimmer',.7);
 // 17 desviando
 [ps(22)+.35,tSoz,tDsv,tDsv+.55,tQua+.1].forEach(h=>{a(h-.05,'swish',.8);a(h,'ripple',.5)});
 // 18-19 verdade e queda
 a(cut(19),'wind',.9);a(tDrr+.25,'impact',1);a(tDrr+.3,'boom',.6);
 // 20 levanta mais forte
 a(cut(21),'wind',.8);a(tCai+.2,'breath',.6);a(tMfo-.6,'riser_s',.9);a(tMfo,'boom',1.3);a(tMfo,'energy',1);a(tMfo,'shimmer',.8);a(tEnd,'final',.9);
 REACTS.forEach((r,j)=>{a(r.t0,'babble',.9);a(r.t0,'pop',.45);a(r.t0-.05,['shimmer','swish','energy_pulse','whoosh_soft'][j%4],.5)});
 L.sort((x,y)=>x[0]-y[0]);return L};
