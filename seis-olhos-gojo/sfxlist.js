// ---------- LISTA DE EFEITOS SONOROS E DEIXAS DA TRILHA (sincronizada com a imagem) ----------
window.getSFX=()=>{const L=[],a=(t,k,v=1)=>L.push([+Math.max(0,t).toFixed(3),k,v]);
 SH.forEach((s,i)=>{if(i&&s.tin){const k=s.tin=='zoom'?'zoom':s.tin.startsWith('flash')?'flash':s.tin=='glitch'?'glitch':s.tin=='dip'?'dark':'whoosh';a(s.t0-(k=='dark'?.3:.2),k,.85)}});
 const cut=i=>SH[i].t0;
 // deixas da trilha (M_*) = inicio de cada secao musical
 a(0,'M_hook');a(tOpen,'M_open');a(cut(1),'M_power');a(cut(2),'M_detail');a(cut(3),'M_p1');a(tGig,'M_gig');a(cut(8),'M_p2');a(tIli,'M_ili');a(cut(13),'M_p3');a(tVen,'M_calm');a(cut(16),'M_rise');a(cut(17),'M_final');a(tPot,'M_pot');a(cut(18),'M_end');a(tDsp,'M_dsp');
 // 0 gancho
 a(0,'amb_night',.8);a(.05,'heart',.8);a(.85,'heart',.8);a(tOpen-.35,'riser_s',.8);a(tOpen,'eye_open',1.2);a(tOpen,'boom',1);a(tOpen+.05,'scan',.7);a(tSix,'hit',1);a(tSix,'shimmer',.8);
 // 1 cosmos
 a(cut(1),'amb_space',1);a(cut(1),'energy',.8);a(tAbs,'boom',1.1);a(tAbs,'shimmer',.7);a(tJK,'pop',.5);
 // 2 rua
 a(cut(2),'amb_night',1);a(cut(2),'wind',.8);a(tDet,'sting_low',.8);
 // 3 ponto 1
 a(cut(3),'amb_space',.6);a(cut(3)+.1,'stamp',.9);a(tVis,'eye_open',.9);a(tVis,'scan',.8);
 // 4 cidade
 a(cut(4),'amb_town',1);a(tPer+.1,'scan',1);a(tPer+.15,'energy',.7);RES.forEach(([k,x,z],i)=>a(tPer+.15+Math.hypot(x+.9,z-4.6)*.06,'aura',.55));a(tRed,'pop',.5);
 a(cut(5),'amb_town',1);a(tFlu,'data',.6);a(tFlu,'pop',.6);a(tDtl,'pop',.6);a(tDtl,'shimmer',.4);a(tFei,'question',.6);a(tFei+.12,'question',.5);a(tJam,'swish',.5);
 // 5 sala
 a(cut(6),'amb_room',1);for(let t=cut(6)+.1;t<tSala+.3;t+=.38)a(t,'step',.55);a(tPer2,'scan',.7);a(tGig-.4,'riser_s',.7);a(tGig,'boom',1.2);a(tGig,'sting_low',1);a(tGig+.05,'energy_dark',1);
 // 6 analise
 a(cut(7),'amb_room',.8);for(let t=cut(7)+.2;t<SH[8].t0-.3;t+=.16)a(t,'data',.28);a(tEnt,'question',.5);a(tAna+1.3,'chime',.6);
 // 7 ponto 2
 a(cut(8),'amb_space',.7);a(cut(8)+.1,'stamp',.9);a(tInf-.2,'shimmer',.8);a(pe(9)-.55,'stamp',1.1);a(pe(9)-.55,'hit',.6);
 // 8 precisao
 a(cut(9),'amb_night',1);a(tCon-.3,'energy',.8);a(tCon-.2,'charge',.7);a(tPre,'ding',.8);a(tPre,'hit',.6);a(tExt,'shimmer',.5);
 // 9 desperdicio
 a(cut(10),'amb_night',.8);for(let t=tDes;t<tIns;t+=.12)a(t,'tick',.4);a(tIns,'chime',.7);
 // 10 Ilimitado
 a(cut(11),'amb_night',1);a(tIli-.4,'riser_s',.8);a(tIli,'warp',1.1);a(tIli,'boom',1.1);a(tEsp-.2,'hum',.9);a(tRed2,'ripple',.6);
 a(cut(12),'amb_night',1);a(cut(12),'hum',.8);a(tIni-.1,'monster',.9);a(tImpd-.5,'whoosh',.9);for(let i=0;i<4;i++)a(tImpd+.25+i*.45,'ripple',.8-.12*i);a(tImpd+.25,'impact',.9);a(tSim,'slowmo',.8);a(tEnc,'hit',.7);
 // 11 ponto 3
 a(cut(13),'drone',1);a(cut(13)+.1,'stamp',.9);for(let t=cut(13)+.3;t<cut(14);t+=.8)a(t,'heart',.8);
 // 12 sobrecarga
 a(cut(14),'drone',1);for(let t=cut(14);t<cut(15);t+=.11)a(t,'data',.22+.25*Math.min(1,(t-cut(14))/2));[0,.9,1.7,2.4,3.0].forEach(d=>a(cut(14)+d,'glitch',.5));for(let t=cut(14)+.2;t<cut(15);t+=.5)a(t,'heart',.85);a(tDsg,'hit',1);a(tDsg,'tinnitus',.6);
 // 13 venda
 a(cut(15),'amb_night',.7);a(tVen-.35,'cloth',1);a(tVen+.35,'breath',.6);a(tAmb-.1,'sonar',.8);a(tAmb+.6,'sonar',.6);
 // 14 meditacao
 a(cut(16),'amb_night',1);a(cut(16),'wind',.6);a(cut(16)+.4,'breath',.5);a(tRar,'shimmer',.5);a(tCtr,'energy',.6);
 // 15 final
 a(cut(17),'wind',1);a(tFor,'pop',.5);a(pe(22)-.4,'swish',.6);a(tPot-.6,'cloth',.8);a(tPot-.4,'riser_s',.7);a(tPot,'eye_open',1.1);a(tPot,'boom',1.2);a(tXt,'shimmer',.7);
 // 16 pergunta
 a(cut(18),'amb_space',1);a(tCor,'pop',.5);a(tDsp-.5,'riser_s',.8);a(tDsp,'eye_open',1.2);a(tDsp,'boom',1.3);a(tEnd,'final',1);
 L.sort((x,y)=>x[0]-y[0]);return L};
