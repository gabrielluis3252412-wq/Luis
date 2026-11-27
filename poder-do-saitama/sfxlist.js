// ---------- EFEITOS SONOROS E DEIXAS DA TRILHA (sincronizados com a imagem) ----------
window.getSFX=()=>{const L=[],a=(t,k,v=1)=>L.push([+Math.max(0,t).toFixed(3),k,v]);
 SH.forEach((s,i)=>{if(i&&s.tin){const k=s.tin=='zoom'?'zoom':s.tin.startsWith('flash')?'flash':s.tin=='glitch'?'rewind':s.tin=='dip'?'dark':'whoosh';a(s.t0-(k=='dark'?.3:.2),k,k=='flash'?.6:.8)}});
 const cue=(t,k)=>a(t,'M_'+k);
 // deixas da trilha
 cue(0,'hook');cue(ps(2)-.25,'flash');cue(ps(3)-.15,'train');cue(ps(4)-.25,'suffer');cue(ps(5)-.2,'cont');cue(ps(6)-.2,'reps');cue(tAlg-.1,'stop');
 cue(ps(7)-.2,'power');cue(tDe,'hair');cue(tCar,'bald');cue(ps(9)-.2,'chill');cue(ps(10)-.2,'feats');cue(ps(11)-.2,'kaiju');cue(tDash-.12,'fight');
 cue(tFist,'silence');cue(tP0,'pause');cue(tHit,'hit');cue(ps(14)-.2,'ko');cue(ps(15)-.25,'lonely');cue(tAce2,'heart');cue(ps(19)-.25,'cta');cue(TOTAL,'end');
 // 0a abertura: rugido, salto, SOCO, voo do monstro, pouso
 a(0,'amb_town',.6);a(0,'kaiju_roar',1);a(.05,'rumble',.7);a(.25,'whoosh',.9);a(tH-.12,'whiff',1);a(tH,'punch',1.3);a(tH,'boom',1.4);a(tH,'clash',.8);a(tH+.05,'glass',.4);
 a(tH+.15,'whoosh',.9);a(tH+1.55,'ping',.7);a(tLand-.25,'whoosh_soft',.6);a(tLand,'stomp',1.1);a(tLand,'crumble',.8);a(tSai,'ping',.9);a(tSai,'hit',.5);
 // 0b tres monstros
 a(tCap-.12,'amb_wind',.6);Q3.forEach(h=>{a(h-.1,'whiff',.8);a(h,'punch',1.1);a(h+.05,'kaiju_hurt',.6);a(h+.3,'stomp',.6)});a(tQua,'stamp',.5);
 // 0c um soco
 a(tAp-.1,'swish',.7);a(tAp,'charge',.5);a(tSoc,'ping',1);a(tSoc,'hit',.7);
 // 1 flashback
 a(ps(2)-.25,'amb_room',.8);a(tDec,'cloth',.6);a(tTre,'stamp',.6);a(tUlt,'riser_s',.6);a(tUlt+.2,'glass',.8);a(tUlt+.2,'impact',.7);
 // 2 rotina
 a(ps(3)-.15,'amb_town',.5);for(let t=ps(3);t<tC1-.2;t+=.42)a(t,'tick',.5);a(tTres,'pop',.5);
 for(let t=tC1;t<tC2-.15;t+=2*Math.PI/9.5)a(t+.25,'grunt',.5);for(let t=tC1;t<tC2-.15;t+=.11)a(t,'tick',.18);
 for(let t=tC2;t<tC3-.15;t+=2*Math.PI/9.5)a(t+.3,'grunt',.5);for(let t=tC2;t<tC3-.15;t+=.11)a(t,'tick',.18);
 for(let t=tC3;t<tCor-.15;t+=2*Math.PI/9.5)a(t+.33,'step',.7);for(let t=tC3;t<tCor-.15;t+=.11)a(t,'tick',.18);
 a(tCor-.12,'amb_wind',.6);for(let t=tCor;t<ps(4)-.3;t+=Math.PI/15)a(t,'step',.55);a(tDez,'pop',.5);
 {const n=Math.max(4,Math.round((ps(4)-.25-(tTod-.1))/.16)),dt=(ps(4)-.25-(tTod-.1))/n;for(let k=0;k<n;k++)a(tTod-.1+k*dt,k%2?'tick':'pop',.35)}
 // 3 sofrimento na chuva
 a(ps(4)-.25,'rain',1);a(ps(4)-.25,'amb_night',.5);a(ps(4)+.2,'breath',.7);a(tSof,'breath',.7);a(tEsf+.15,'stomp',.6);a(tEsf+.15,'splash',.8);a(tEsf+.5,'thunder',.5);
 // 4 continua
 a(ps(5)-.2,'amb_town',.7);a(ps(5)-.2,'crowd',.6);for(let t=ps(5);t<ps(6)-.3;t+=Math.PI/11)a(t,'step',.5);[0,1,2,3].forEach(i=>a(tTodos+i*.22,'pop',.45));a(tImp,'stamp',.9);
 // 5 repeticoes -> algo inacreditavel
 a(ps(6)-.2,'amb_night',.6);RH.forEach(h=>{a(h-.07,'whiff',.5);a(h,'punch',.45)});a(tMil,'swish',.6);a(tAlg-.1,'tinnitus',.6);a(tAlg,'heart',1);a(tAlg+.6,'heart',.8);a(tInc,'shimmer',.9);a(tInc,'eye_open',.6);
 // 6 musculos e velocidade
 a(ps(7)-.2,'wind',.6);a(tMus,'charge',.7);a(tRes,'hit',.8);a(tRes,'ding',.6);a(tExt,'tick',.4);
 [tVel-.15,tVel+.25,tAum-.05,tAum+.3].forEach(h=>{a(h-.05,'whoosh',.9);a(h,'sonic',.5)});a(tAum,'ding',.6);
 // 6c/7 o cabelo cai -> careca
 a(tDe,'amb_room',.7);a(tDe,'record_stop',.7);FALL1.forEach(([i,t0])=>{a(t0,'pluck_fall',.7)});a(tCab,'question',.7);
 FALL2.forEach(([i,t0])=>a(t0,'pop',.7));a(tCar-.05,'whoosh',.7);a(tCar,'ping',1.3);a(tCar,'boom',.7);a(tCar+.1,'choir_aah',.9);a(tCar+.6,'cricket',.5);
 // 8 a menor das preocupacoes
 a(ps(9)-.2,'wind',.7);a(tMen,'cloth',.5);
 // 9 saltar, correr, sem medo
 a(ps(10)-.2,'amb_town',.5);a(tSal-.35,'cloth',.6);a(tSal+.18,'stomp',1.2);a(tSal+.18,'crumble',.8);a(tSal+.2,'whoosh',1);a(tPre2,'swish',.6);
 a(tCorr-.12,'amb_wind',.8);a(tCorr+.1,'whoosh',1);a(tVab,'sonic',1.1);a(tVab+.4,'sonic',.8);a(tVab+.8,'whoosh',.8);
 a(tEnf-.2,'amb_night',.6);a(tEnf,'kaiju_roar',1.1);a(tEnf+.1,'rumble',.6);for(let t=tSem;t<ps(11)-.3;t+=1)a(t,'beep',.5);a(tSem+.2,'yawn',.8);
 // 10 colossal surge
 a(ps(11)-.2,'rumble',1);a(ps(11)-.2,'amb_town',.6);a(tSur,'quake',1.1);a(tSur+.3,'crumble',.9);a(tCol,'kaiju_roar',1.2);a(tCid,'crowd_scream',.9);for(let t=tCid+.3;t<ps(12)-.3;t+=.27)a(t,'step',.4);
 // 11-12 sequencia do soco (10 passos): ameaca, observa, ataque, esquiva, travelling, corrida, giro, punho, PAUSA, SOCO
 a(ps(12)-.15,'wind',1);a(ps(12)-.15,'rumble',.7);a(tLev-.1,'kaiju_roar',1.1);a(tLev+.4,'crumble',.6);                                   // 1 ameaca (contra-plongee)
 a(tDst-.25,'amb_wind',1);a(tDst-.2,'whoosh_soft',.6);a(tDst-.1,'gust',.9);a(tDst+.1,'heart',.8);a(tTud,'heart',.9);                       // 2 o heroi observa
 a(tTud+.25,'kaiju_growl',1);a(tTud+.55,'whoosh',1.2);a(tTud+.6,'riser_s',.6);                                                            // 3 o monstro ataca
 a(tDash-.3,'accel',1.1);a(tDash,'sonic',1.1);for(let t=tDash;t<tApa-.1;t+=.085)a(t,'step',.35);a(tSlam-.2,'whoosh',1);a(tSlam,'boom',1.4);a(tSlam,'stomp',1.2);a(tSlam,'crumble',1); // 4-5 esquiva + travelling
 a(tApa-.1,'whoosh',1);for(let t=tApa-.05;t<tApa+.35;t+=.07)a(t,'step',.4);a(tApa+.32,'sonic',.7);                                           // 6 corre ate o monstro
 a(tApa+.35,'whoosh',1);a(tApa+.6,'whoosh',.8);a(tAtr,'whoosh_soft',.7);a(tAtr+.05,'skid',1);a(tAtr+.3,'kaiju_growl',.5);                    // 7 giro e revelacao
 a(tFist,'slowmo',.9);a(tFist,'heart',1);a(tFist+.1,'clench',1);a(tFist+.3,'charge',.6);a(tLat,'heart',.9);a(tLat+.02,'inhale',.8);a(tLat,'riser_s',.7); // 8 preparacao
 a(tP0,'vacuum',1);a(tP0+.05,'heart',.7);                                                                                                  // 9 pausa dramatica (o resto silencia)
 a(tPunch-.04,'whiff',1.4);a(tHit,'punch',1.5);a(tHit,'clash',1.0);a(tHit+.05,'boom',1.15);a(tHit+.02,'freeze_ring',.8);                        // 10 SOCO + freeze
 a(tRel2,'kaiju_hurt',1.1);a(tRel2,'impact',1);a(tRel2+.03,'glass',.8);                                                                   //    reacao do monstro (dentes estilhacando)
 a(tWide-.04,'air_burst',1.6);a(tWide,'boom',1.5);a(tWide+.02,'thunder',.9);a(tWide+.05,'glass',.7);a(tWide+.1,'crumble',1.1);a(tWide+.05,'wind_blast',1.1); // onda de choque e lancamento
a(tVen,'warp',.7);a(tNuv,'shimmer',.9);a(pe(13)+.25,'ping',.8);
 // 13 K.O.
 a(ps(14)-.2,'amb_wind',.5);a(tDer,'stamp',1.1);a(tDer,'hit',.6);a(tDer+.2,'cheer',.9);for(let k=0;k<3;k++)a(tSeg+k/9,'tick',.6);a(tSeg+.35,'ding',.6);
 // 14-16 solidao
 a(ps(15)-.25,'amb_night',.9);a(tBat,'tick',.4);a(tAss,'sting_low',.8);
 a(ps(16)-.25,'wind',1);a(ps(16)-.25,'amb_night',.6);a(tAlt,'beep',.4);
 a(ps(17)-.25,'amb_room',.8);a(tDes-.2,'yawn',.9);a(tMon,'snore',.6);
 // 17 coracao acelera
 a(ps(18)-.2,'amb_wind',.6);for(let t=tEnc;t<tAce2;t+=60/52)a(t,'beep',.55);a(tCor2-.1,'sting_hi',.5);for(let t=tAce2,i=0;t<ps(19)-.3;t+=Math.max(.36,.9-i*.09),i++){a(t,'heart',.9);a(t+.02,'beep',.4)}a(tAce2,'riser_s',.7);
 // 18 comente careca
 a(ps(19)-.25,'flash',.8);a(ps(19)-.1,'whoosh',.8);a(ps(19)-.05,'hit',.8);a(tCmt-.05,'pop',.8);for(let i=0;i<6;i++){a(tCrc+i*.09,'punch',.35);a(tCrc+i*.09,'click',.6)}a(tCrc+.45,'boom',.8);a(tAcc,'click',1);a(tAcc+.05,'send',1);a(tAcc+.1,'sparkle',.7);a(tPdr,'ping',1.2);a(tEND,'whoosh',.7);a(tEND+.6,'final',.9);
 REACTS.forEach((r,j)=>{a(r.t0,'babble',.9);a(r.t0,'pop',.45)});
 L.sort((x,y)=>x[0]-y[0]);return L};
