// =====================================================================
//  E SE VOCE FOSSE UM SAIYAJIN?  - planos (Cibito como o "voce" da historia)
// =====================================================================
const GOLD='#ffd23f',GOLD2='#fff1a8',SILV='#dfe8ff',SILV2='#9fb4ff';
// variacoes do Cibito: Super (cabelo dourado espetado saindo do capuz, olhos verde-agua) e Instinto (prateado)
const SPIKES=c=>`<path d="M-58-300L-92-392L-36-338L-30-436L4-344L36-430L42-336L96-386L60-300Z" fill="${c}" ${S}/><path d="M-30-340L-26-400M8-350L30-414" stroke="rgba(255,255,255,.55)" stroke-width="7" fill="none" stroke-linecap="round"/>`;
const HOODC=(c)=>SPIKES(c)+HOOD.split('#3a1f14').join(c);
Object.assign(CHD,{CSS:{...CHD.CIB,hat:HOODC(GOLD),ic:'#13c9a6',id:14},CUI:{...CHD.CIB,hat:HOODC(SILV),ic:'#b8c6ff',id:15},
 G1:{...CHD.CIB,hat:HOODC(SILV),ic:'#b8c6ff',id:16},G2:{...CHD.CIB,hat:HOODC(SILV),ic:'#b8c6ff',id:17}});
for(const k of ['CSS','CUI','G1','G2'])CHS[k]={...mkg(),d:CHD[k],id:CHD[k].id};
// raios eletricos em volta (Super Saiyajin)
const BOLTS=(x,y,R,t,a,col=GOLD2,n=5)=>{if(a<=0)return'';let s='';const fr=Math.floor(t*14);for(let i=0;i<n;i++){if(rnd(fr+i*7,3.1)>.55)continue;let px=x+(rnd(fr+i,1.3)-.5)*R*2,py=y+(rnd(fr+i,2.7)-.5)*R*2.6,d=`M${px.toFixed(1)} ${py.toFixed(1)}`;for(let k=0;k<5;k++){px+=(rnd(fr+i*5+k,4.4)-.5)*R*.5;py+=(rnd(fr+i*5+k,8.8)-.2)*R*.35;d+=`L${px.toFixed(1)} ${py.toFixed(1)}`}
 s+=`<path d="${d}" stroke="${INK}" stroke-width="${(R*.05).toFixed(1)}" fill="none" stroke-linejoin="round" opacity="${(.6*a).toFixed(2)}"/><path d="${d}" stroke="${col}" stroke-width="${(R*.025).toFixed(1)}" fill="none" stroke-linejoin="round" opacity="${a.toFixed(2)}"/>`}return s};
// pedras flutuando com a energia
const ROCKS=(x,y,R,t,a)=>{if(a<=0)return'';let s='';for(let i=0;i<9;i++){const ph=(t*.35+rnd(i,3.3))%1,px=x+(rnd(i,5.5)-.5)*R*2.4+10*sn(t*2+i),py=y-ph*R*1.6,sz=R*(.05+.05*rnd(i,7.7));s+=`<path transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(t*60*(i%2?1:-1)+i*40).toFixed(0)})" d="M${-sz} ${-sz*.4}L${-sz*.3} ${-sz}L${sz} ${-sz*.5}L${sz*.8} ${sz*.6}L${-sz*.6} ${sz*.8}Z" fill="#7a6a8a" stroke="${INK}" stroke-width="${(sz*.18).toFixed(1)}" opacity="${(a*Math.min(1,sn(ph*3.14)*2)).toFixed(2)}"/>`}return s};
// grafico da evolucao (cada queda leva a um pico maior)
const CHART=(t0,a)=>{if(a<=0)return'';const P=[[0,.15],[.12,.22],[.2,.08],[.32,.35],[.42,.18],[.56,.55],[.66,.3],[.82,.8],[1,1]],k=cl((GT-t0)/2.2),x0=130,x1=950,y0=1120,y1=560;let d='',n=0;
 for(let i=0;i<P.length;i++){if(P[i][0]>k){const j=i-1,f=(k-P[j][0])/(P[i][0]-P[j][0]);d+=`L${lp(x0,x1,k).toFixed(1)} ${lp(y0,y1,lp(P[j][1],P[i][1],f)).toFixed(1)}`;break}d+=(i?'L':'M')+`${lp(x0,x1,P[i][0]).toFixed(1)} ${lp(y0,y1,P[i][1]).toFixed(1)}`;n=i}
 let s=`<g opacity="${a.toFixed(2)}"><rect x="90" y="500" width="900" height="680" rx="30" fill="#070a24" opacity=".72" stroke="${GOLD}" stroke-width="5"/><path d="${d}" fill="none" stroke="${INK}" stroke-width="22" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" fill="none" stroke="${GOLD}" stroke-width="12" stroke-linejoin="round" stroke-linecap="round"/>`;
 [2,4,6].forEach(i=>{if(P[i][0]<=k)s+=`<g transform="translate(${lp(x0,x1,P[i][0]).toFixed(1)} ${(lp(y0,y1,P[i][1])+50).toFixed(1)})"><text font-size="38" text-anchor="middle" fill="#ff5d6d" font-family="Poppins" font-weight="900" ${ST(38)}>QUEDA</text></g>`});
 return s+'</g>'};
// planeta (no fundo cosmico)
const planet=(c,x,y,r,t,boom)=>{if(boom<1){c.save();c.globalAlpha=1-boom;const g=c.createRadialGradient(x-r*.3,y-r*.3,r*.1,x,y,r);g.addColorStop(0,'#7fd38a');g.addColorStop(.6,'#2f7aa8');g.addColorStop(1,'#122a55');c.fillStyle=g;c.beginPath();c.arc(x,y,r,0,6.283);c.fill();c.lineWidth=10;c.strokeStyle='#1b1024';c.stroke();
  if(boom>0){c.strokeStyle='rgba(255,200,80,.95)';c.lineWidth=8;for(let i=0;i<7;i++){const a=i/7*6.283;c.beginPath();c.moveTo(x,y);c.lineTo(x+cs(a)*r*boom*1.4,y+sn(a)*r*boom*1.4);c.stroke()}}c.restore()}
 if(boom>0){c.globalCompositeOperation='lighter';const R=r*(.6+boom*3),g=c.createRadialGradient(x,y,0,x,y,R);g.addColorStop(0,`rgba(255,240,200,${(1-boom)*.95})`);g.addColorStop(.4,`rgba(255,150,60,${(1-boom)*.7})`);g.addColorStop(1,'rgba(255,60,30,0)');c.fillStyle=g;c.fillRect(x-R,y-R,2*R,2*R);c.globalCompositeOperation='source-over'}};
const goldAura=(k,a,sc=1.25)=>aura(k,a,'#ffb300','#fff3a0',sc,1,2);
const silvAura=(k,a,sc=1.15)=>aura(k,a,'#8fa8ff','#f2f6ff',sc,1,4);
// ===== 0) GANCHO: derrubado... e levanta mais forte =====
const tDer=wt(2,'derrota',.2),tFor=wt(2,'forte',.1),tSai=wt(1,'Saiyajin',.2);
shot('twn2',0,(t,u)=>{
 const up=ob(GT,tFor-.45,.55),gl=cl((GT-tFor+.1)/.3);
 const k=GT>tFor?'CSS':'CIB';put(k,.2,0,3.2,{sc:2.4,m:GT<tFor-.45?'sad':GT<tFor?'angry':'grin',rot:lp(-84,0,up),aR:lp(-60,-30,up),aL:lp(60,30,up),nobob:up<1,brow:6,sq:SQ(tFor,1.2),six:GT>tFor?.0:undefined,extra:GT<tFor?SWEAT(-80,-300,.8):''});
 if(GT>tFor){goldAura(k,gl);const c0=chestP(k),ku=C[k].sp[2];fw(BOLTS(c0[0],c0[1],170*ku,GT,gl));FX.pf=[[c0[0],c0[1],330*ku,30,'255,220,120',gl,'rise']]}
 const p=C[k].sp,q=zpS(p[0],p[1]);let ui=TXT('E SE VOCÊ FOSSE',540,250,72,'#fff',-3,pop(GT,.05))+(GT>tSai-.1?TXT('UM SAIYAJIN?',540,370,124,GOLD,-3,pop(GT,tSai-.1)*(1+.025*sn(GT*6))):'');
 ui+=RIP(q[0],q[1],0,.7,500,'#ffe9b0')+RAYS(GT,tFor,q[0],q[1]-300,.45,18,GOLD2);
 if(GT>tDer-.1&&GT<tFor)ui+=TXT('DERROTA...',540,500,64,'#ff6b6b',-3,pop(GT,tDer-.1));
 if(GT>tFor)ui+=TXT('MAIS FORTE!',540,500,84,GOLD2,-3,pop(GT,tFor));
 const F=foc(p[0],p[1]-150*p[2],.4);
 camA([[0,.55,F[0],F[1],-4],[.5,.4,F[0],F[1],2],[tFor-.1,.35,F[0],F[1],0],[tFor,.18,F[0]*.5,F[1]*.5,-2,'c'],[ps(3),.24,F[0]*.6,F[1]*.6,1]]);
 FX.ui=ui;FX.lit=GT>tFor?{amb:[1.05,.95,.8],rim:[255,220,120],d:[0,-1],sh:.3,ri:1}:LIT.road;FX.shake=18*sh1(GT,[0],4)+14*sh1(GT,[tFor],5);FX.flash=Math.max(.5*cl(1-GT/.25),.55*sh1(GT,[tFor],9));FX.flcol='255,235,170';FX.chroma=5*sh1(GT,[tFor],4)},'');
// ===== 1) raca guerreira mais temida do universo =====
const tRac=wt(3,'raças',.2),tTem=wt(3,'temidas',.2);
shot(null,ps(3)-.2,(t,u)=>{FX.bg=c=>{cosmos(c,GT,{warm:1,c0:'#5a1a3a',c1:'#1a0820'});planet(c,820,560,150,GT,0)};
 [['T1',-2.6],['T2',-1.3],['T3',1.3],['R4',2.6],['R5',0]].forEach(([k,x],i)=>{const a=ob(GT,ps(3)+i*.15,.4);put(k,0,0,0,{px:[540+x*150,1250-ab(x)*20],ku:1.25,m:'angry',sil:1,op:a,still:1,zz:3})});
 put('CIB',0,0,0,{px:[540,1640],ku:2.1,m:'angry',brow:7,aR:-30,aL:30,zz:1,nodrift:1});
 [['T1',-2.6],['T2',-1.3],['T3',1.3],['R4',2.6],['R5',0]].forEach(([k,x])=>{const e=eyeP(k),ku=C[k].sp[2];(FX.gls=FX.gls||[]).push([e[0]-25*ku,e[1],30,'255,40,60',.9],[e[0]+25*ku,e[1],30,'255,40,60',.9])});
 let ui='';if(GT>tRac)ui+=TXT('RAÇA GUERREIRA',540,300,104,'#ff5d6d',-3,pop(GT,tRac));if(GT>tTem)ui+=TXT('A MAIS TEMIDA DO UNIVERSO',540,410,52,'#fff',-3,pop(GT,tTem));
 camA([[ps(3)-.2,.3,0,-120,-2],[ps(4),.05,0,0,1]]);
 FX.ui=ui;FX.lit={amb:[.8,.7,.8],rim:[255,90,110],d:[0,-1],sh:.4,ri:1};FX.vig=.75;FX.tint=[120,0,30,.08]},'flashR');
// ===== 2) treinado desde pequeno =====
const tPeq=wt(4,'pequeno',.2),tTre=wt(4,'treinado',.2),tIni=wt(4,'inimigos',0);
shot('prcW',ps(4)-.2,(t,u)=>{
 const ph=(GT*7)%2,pR=ph<1,hit=sn(GT*7*Math.PI);
 put('CIB',0,0,4.2,{sc:.8,top:1,m:'angry',brow:8,aR:pR?-95+20*hit:-20,aL:!pR?95-20*hit:20,tilt:6*sn(GT*14),rot:3*sn(GT*14),look:[8,0],bob:2});
 const p=C.CIB.sp,ku=p[2];let s='';for(let i=0;i<3;i++){const tt=Math.floor(GT*7)/7-i/7;s+=BURSTX(p[0]+(Math.floor(GT*7)%2?-150:150)*ku,p[1]-180*ku,tt,ku)}fw(s);
 let ui='';if(GT>tPeq)ui+=TXT('DESDE PEQUENO',540,300,92,'#fff',-3,pop(GT,tPeq));if(GT>tTre)ui+=TXT('TREINO!',540,420,120,GOLD,-3,pop(GT,tTre)*(1+.04*sn(GT*14)));
 const F=foc(p[0],p[1]-150*ku,.3);camA([[ps(4)-.2,.05,0,-60,-2],[tIni,.3,F[0],F[1],2]]);
 FX.ui=ui;FX.lit=LIT.prcW;FX.shake=3+3*ab(hit)},'wr');
const BURSTX=(x,y,t0,ku)=>{const d=GT-t0;if(d<0||d>.25)return'';const k=d/.25;let s=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${((30+90*k)*ku).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(10*(1-k)*ku).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`;for(let i=0;i<6;i++){const a=i/6*6.283+.3;s+=`<line x1="${(x+cs(a)*40*ku).toFixed(1)}" y1="${(y+sn(a)*40*ku).toFixed(1)}" x2="${(x+cs(a)*(60+110*k)*ku).toFixed(1)}" y2="${(y+sn(a)*(60+110*k)*ku).toFixed(1)}" stroke="${GOLD2}" stroke-width="${(8*(1-k)*ku).toFixed(1)}" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/>`}return s};
// ===== 3) inimigos capazes de destruir planetas =====
const tDes=wt(4,'destruir',.3),tPla=wt(4,'planetas',.3);
shot(null,tIni-.1,(t,u)=>{const bm=cl((GT-tDes)/1.1);FX.bg=c=>{cosmos(c,GT,{warm:1,k:.7});planet(c,560,820,230,GT,bm)};
 const mp=[880,1500],mk=1.9,arm=ob(GT,tDes-.5,.45);sprite(CURSE({fx:lp(-170,-260,arm),fy:lp(-200,-520,arm),mouth:.6+.4*sn(GT*5),str:bm>0?.5:0}),mp[0],mp[1],mk,1,'C2');
 let ui='';if(GT>tDes)ui+=TXT('DESTRUIR',540,300,120,'#ff5d6d',-3,pop(GT,tDes))+TXT('PLANETAS INTEIROS',540,410,70,'#fff',-3,pop(GT,tPla));
 camA([[tIni-.1,.2,0,0,-2],[tDes,.12,0,60,1,'c'],[ps(5),.2,0,80,-1]]);
 FX.ui=ui;FX.lit={amb:[.85,.7,.8],rim:[255,120,80],d:[-1,-.5],sh:.4,ri:1};FX.shake=20*sh1(GT,[tDes],3);FX.flash=.7*sh1(GT,[tDes],6);FX.flcol='255,210,150';FX.chroma=6*sh1(GT,[tDes],3)},'zoom');
// ===== 4) o maior diferencial: assustador =====
const tDif=wt(5,'diferencial',.2),tAss=wt(5,'assustador',.2);
shot('str',ps(5)-.25,(t,u)=>{
 put('CIB',0,0,1.6,{sc:1.05,m:GT<tAss?'focus':'angry',brow:GT<tAss?3:8,look:[0,2],brr:1.3});
 const p=C.CIB.sp,e=eyeP('CIB'),F=foc(e[0],e[1]+120*p[2],.55);
 let ui='';if(GT>tDif)ui+=TXT('O MAIOR DIFERENCIAL',540,300,76,'#fff',-2,pop(GT,tDif));if(GT>tAss)ui+=TXT('ASSUSTADOR',540,420,124,'#ff4d6d',-2,pop(GT,tAss)*(1+.03*sn(GT*9)));
 camA([[ps(5)-.25,.05,0,0,0],[tAss-.1,.35,F[0]*.7,F[1]*.7,0],[tAss,.6,F[0],F[1],-2,'c'],[ps(6),.65,F[0],F[1],1]]);
 FX.ui=ui;FX.vig=.85;FX.fog=1;FX.lit=LIT.str;FX.shake=8*sh1(GT,[tAss],5);FX.tint=GT>tAss?[160,0,30,.12]:null;FX.flash=.4*sh1(GT,[tAss],10);FX.flcol='255,60,80'},'dip');
// ===== 5) sobrevive, se recupera... poder aumenta =====
const tExt=wt(6,'extrema',.2),tRec=wt(6,'recuperasse',.2),tDra=wt(7,'drasticamente',.2),tPod=wt(7,'poder',.2);
shot('road',ps(6)-.2,(t,u)=>{
 const up=ob(GT,tRec-.3,.7),pw=ob(GT,tDra-.2,.5),k=GT>tDra?'CSS':'CIB';
 put(k,0,0,7.2,{sc:1.9,m:GT<tRec?'sad':GT<tDra?'focus':'grin',rot:lp(-80,0,up),aR:lp(-60,-24,up),aL:lp(60,24,up),nobob:up<1,brow:5,sq:SQ(tDra,1.2),extra:GT<tDra?SWEAT(-80,-300,.8)+SWEAT(70,-260,.6):''});
 const c0=chestP(k),ku=C[k].sp[2];if(GT>tDra){goldAura(k,pw*.9);fw(BOLTS(c0[0],c0[1],170*ku,GT,pw*.7))}
 let ui='';if(GT>tExt&&GT<tRec)ui+=TXT('BATALHA EXTREMA',540,300,84,'#ff6b6b',-3,pop(GT,tExt));
 if(GT>tRec-.1)ui+=TXT('SE RECUPERA...',540,300,84,'#fff',-3,pop(GT,tRec-.1));
 const mv=GT<tDra?lp(.08,.22,ez((GT-tRec)/1)):lp(.22,1,ez((GT-tDra)/.6));if(GT>tRec){const a=ob(GT,tRec,.3);ui+=`<g opacity="${a.toFixed(2)}"><rect x="140" y="390" width="800" height="150" rx="30" fill="#1a0a08" opacity=".85" stroke="${GOLD}" stroke-width="6"/><rect x="180" y="440" width="720" height="54" rx="27" fill="#3a2410"/><rect x="186" y="446" width="${(708*mv).toFixed(1)}" height="42" rx="21" fill="${GOLD}"/></g>`+TXT(GT>tDra?'PODER x10!':'PODER',540,640,GT>tDra?104:60,GOLD,-3,GT>tDra?pop(GT,tDra):a)}
 const F=foc(c0[0],c0[1],.35);camA([[ps(6)-.2,.4,F[0],F[1]+60,-3],[tRec,.3,F[0],F[1],0],[tDra,.15,F[0]*.5,F[1]*.5,2,'c'],[ps(8),.2,F[0]*.5,F[1]*.5,0]]);
 FX.ui=ui;FX.lit=LIT.road;FX.shake=12*sh1(GT,[tDra],5);FX.flash=.45*sh1(GT,[tDra],9);FX.flcol='255,235,170'},'wl');
// ===== 6) quanto mais dificil a jornada, maior a evolucao =====
const tJor=wt(8,'jornada',.2),tEvo=wt(9,'evolução',.2);
shot(null,ps(8)-.2,(t,u)=>{FX.bg=c=>cosmos(c,GT,{k:.6,c0:'#3a2a0a',c1:'#140a02',dr:.4});
 const lvl=cl((GT-ps(8))/(pe(9)-ps(8)));put('CIB',0,0,0,{px:[540,1700],ku:1.7,m:lvl<.7?'focus':'grin',aR:-20,aL:20,zz:1,nodrift:1});goldAura('CIB',lvl*.8,1);
 let ui=CHART(ps(8),ob(GT,ps(8)-.1,.3));if(GT>tJor)ui+=TXT('JORNADA DIFÍCIL',540,300,84,'#fff',-3,pop(GT,tJor));if(GT>tEvo)ui+=TXT('EVOLUÇÃO',540,430,120,GOLD,-3,pop(GT,tEvo)*(1+.03*sn(GT*7)));
 camA([[ps(8)-.2,.1,0,0,-1],[ps(10),.16,0,-40,1]]);FX.ui=ui;FX.lit={amb:[1,.95,.85],rim:[255,210,120],d:[0,-1],sh:.3,ri:1}},'flashO');
// ===== 7) um inimigo impossivel de derrotar =====
const tImp=wt(10,'impossível',.2);
shot('twn3',ps(10)-.25,(t,u)=>{
 const mp=P3(.6,0,-3,4.2),rise=ob(GT,ps(10)+.3,.9);sprite(CURSE({fx:-170+20*sn(GT*2),fy:-200,mouth:.5+.5*ab(sn(GT*3))}),mp[0],mp[1]+(1-rise)*600,mp[2],mp[3],'C2');
 put('CIB',-.4,0,4.2,{sc:2.3,m:GT<tImp?'worry':'scared',look:[4,-10],brow:6,sq:SQ(tImp,1)});
 let ui='';if(GT>tImp)ui+=TXT('IMPOSSÍVEL',540,300,128,'#ff4d6d',-3,pop(GT,tImp))+TXT('DE DERROTAR',540,410,72,'#fff',-3,pop(GT,tImp+.15));
 camA([[ps(10)-.25,.0,0,0,-2],[tImp,.12,0,-40,0,'c'],[ps(11),.16,0,-60,2]]);
 FX.ui=ui;FX.lit=LIT.twn3;FX.vig=.8;FX.shake=4*rise+10*sh1(GT,[tImp],5);FX.tint=[90,0,60,.12];FX.fog=1},'dip');
// ===== 8) amigos em perigo =====
const tPer=wt(11,'perigo',.2);
shot('twn3',ps(11)-.2,(t,u)=>{
 [['T1',-1.6,0],['T3',-.3,1],['R4',1.1,2]].forEach(([k,x,i])=>put(k,x,0,1.8,{sc:2.1,m:'scared',rot:4*sn(GT*18+i),look:[-3,-8],brow:8,extra:SWEAT(-80,-300,.8)}));
 const mp=P3(.3,0,-4,4.2);sprite(CURSE({fx:-60,fy:-120+30*sn(GT*3),mouth:.9}),mp[0],mp[1],mp[2],mp[3],'C2');
 let ui='';if(GT>tPer)ui+=TXT('AMIGOS EM PERIGO',540,320,92,'#ff4d6d',-3,pop(GT,tPer)*(1+.03*sn(GT*9)));
 camA([[ps(11)-.2,.3,0,120,-2],[ps(12),.2,0,60,1]]);
 FX.ui=ui;FX.lit=LIT.twn3;FX.vig=.8;FX.tint=[200,0,30,.12+.06*ab(sn(GT*6))];FX.shake=3},'wr');
// ===== 9) raiva: energia jamais vista =====
const tRai=wt(12,'raiva',.2),tLib=wt(13,'liberar',.2),tJam=wt(13,'jamais',.2);
shot('twn3',ps(12)-.15,(t,u)=>{
 const rg=cl((GT-tRai)/2.4),scr=GT>tLib,flk=rnd(Math.floor(GT*18),3.7)<rg*.7,k=flk&&scr?'CSS':'CIB';
 put(k,0,0,3.6,{sc:2.5,m:scr?'talka':'angry',mry:scr?16+4*sn(GT*30):undefined,mrx:18,aR:-25-20*rg,aL:25+20*rg,brow:10,rot:3*rg*sn(GT*40),tilt:2*sn(GT*33),nobob:1});
 const c0=chestP(k),ku=C[k].sp[2];goldAura(k,rg*(flk?1:.45));fw(ROCKS(c0[0],c0[1]+120*ku,300*ku,GT,rg)+BOLTS(c0[0],c0[1],180*ku,GT,rg*rg));
 FX.pf=[[c0[0],c0[1]+100*ku,320*ku,30,'255,220,120',rg,'rise']];
 let ui='';if(GT>tRai)ui+=TXT('RAIVA',540,310,150,'#ff4d6d',-4,pop(GT,tRai)*(1+.05*sn(GT*20)));if(GT>tJam)ui+=TXT('ENERGIA JAMAIS VISTA',540,430,62,GOLD2,-3,pop(GT,tJam));
 const e=eyeP(k),F=foc(e[0],e[1]+140*ku,.55);camA([[ps(12)-.15,.15,F[0]*.3,F[1]*.3,0],[tLib,.45,F[0]*.8,F[1]*.8,-2],[ps(14),.6,F[0],F[1],2]]);
 FX.ui=ui;FX.lit={...LIT.twn3,rim:flk?[255,220,120]:[255,90,90],ri:1};FX.vig=.85;FX.shake=2+12*rg;FX.chroma=6*rg;FX.tint=[255,40,40,.06*rg];FX.flash=flk&&scr?.12:0;FX.flcol='255,230,150'},'zoom');
// ===== 10) cabelo dourado =====
const tDou=wt(14,'dourado',.0);
shot('twn3',ps(14)-.25,(t,u)=>{
 const k=GT>tDou?'CSS':'CIB';put(k,0,0,3.6,{sc:2.5,m:'angry',brow:9,aR:-40,aL:40,nobob:1,sq:SQ(tDou,1.4)});goldAura(k,GT>tDou?1:.4);
 const p=C[k].sp,ku=p[2],hd=[p[0],p[1]-330*ku],q=zpS(hd[0],hd[1]);fw(BOLTS(hd[0],hd[1],140*ku,GT,1));
 let ui='';if(GT>tDou)ui+=TXT('DOURADO',540,330,150,GOLD,-3,pop(GT,tDou))+RAYS(GT,tDou,q[0],q[1],.5,20,GOLD2);
 const F=foc(hd[0],hd[1]+60*ku,.9);camA([[ps(14)-.25,.85,F[0],F[1]+80,-2],[tDou,.95,F[0],F[1],1,'c'],[ps(15),1.0,F[0],F[1],0]]);
 FX.ui=ui;FX.lit={amb:[1.05,.95,.8],rim:[255,220,120],d:[0,-1],sh:.3,ri:1};FX.shake=16*sh1(GT,[tDou],5);FX.flash=.7*sh1(GT,[tDou],8);FX.flcol='255,235,160';FX.chroma=6*sh1(GT,[tDou],4)},'flashO');
// ===== 11) olhos mudam =====
const tOlh=wt(15,'mudariam',.0);
shot('twn3',ps(15)-.15,(t,u)=>{
 const k=GT>tOlh?'CSS':'CIB';put(k,0,0,3.6,{sc:2.5,m:'focus',six:GT>tOlh?.0:undefined,brow:6,look:[0,0],nobob:1,still:1,noblink:1});
 const e=eyeP(k),ku=C[k].sp[2];if(GT>tOlh)(FX.gls=FX.gls||[]).push([e[0]-25*ku,e[1],40*ku,'60,240,200',.5],[e[0]+25*ku,e[1],40*ku,'60,240,200',.5]);
 let ui='';if(GT>tOlh)ui+=TXT('OS OLHOS MUDAM',540,320,96,'#3ff0c8',-3,pop(GT,tOlh));
 const F=foc(e[0],e[1],1.6);camA([[ps(15)-.15,1.55,F[0],F[1],0],[ps(16),1.7,F[0],F[1],0]]);
 FX.ui=ui;FX.lit={amb:[1.05,.95,.8],rim:[255,220,120],d:[0,-1],sh:.3,ri:1};FX.flash=.5*sh1(GT,[tOlh],10);FX.flcol='170,255,230';FX.shake=6*sh1(GT,[tOlh],6)},'zoom');
// ===== 12) a aura gigantesca explode =====
const tAur=wt(16,'aura',.2),tExp=wt(16,'explodiria',.3);
shot('twn3',ps(16)-.2,(t,u)=>{
 const ex=ob(GT,tExp-.1,.4);put('CSS',0,0,3.4,{sc:2.4,m:'angry',brow:9,aR:-150*ex-20*(1-ex),aL:150*ex+20*(1-ex),sq:SQ(tExp,1.5),nobob:1});
 const c0=chestP('CSS'),ku=C.CSS.sp[2];goldAura('CSS',.6+.4*ex,1.2+1.8*ex);fw(BOLTS(c0[0],c0[1],220*ku,GT,1,GOLD2,7)+ROCKS(c0[0],c0[1]+150*ku,420*ku,GT,ex)+RIP(c0[0],c0[1],tExp,.8,1400,'#fff3a0')+RIP(c0[0],c0[1],tExp+.15,.8,1100,GOLD));
 FX.warp=GT>tExp?[c0[0],c0[1],lp(200,1600,cl((GT-tExp)/.9)),90*(1-cl((GT-tExp)/.9))]:null;
 FX.pf=[[c0[0],c0[1],500*ku,40,'255,220,120',ex,'rise']];FX.rays=[[c0[0],c0[1],.5*ex,'255,200,90',18,1800]];
 let ui='';if(GT>tAur)ui+=TXT('AURA GIGANTESCA',540,320,98,GOLD,-3,pop(GT,tAur));
 camA([[ps(16)-.2,.3,0,-60,-2],[tExp,.0,0,0,0,'c'],[ps(17),.06,0,-30,2]]);
 FX.ui=ui;FX.lit={amb:[1.1,.98,.8],rim:[255,225,130],d:[0,-1],sh:.25,ri:1};FX.shake=4+22*sh1(GT,[tExp],3);FX.flash=.85*sh1(GT,[tExp],6);FX.flcol='255,240,190';FX.chroma=8*sh1(GT,[tExp],3)},'wu');
// ===== 13) o lendario Super Saiyajin =====
const tLen=wt(17,'lendário',.2),tSup=wt(17,'Super',.0);
shot('twn3',ps(17)-.2,(t,u)=>{
 put('CSS',0,0,4.8,{sc:2.3,m:'cool',brow:5,aR:-14,aL:14,look:[0,-2]});const c0=chestP('CSS'),ku=C.CSS.sp[2];goldAura('CSS',1,1.5);fw(BOLTS(c0[0],c0[1],200*ku,GT,.9));
 FX.pf=[[c0[0],c0[1],420*ku,36,'255,220,120',1,'rise']];FX.rays=[[c0[0],c0[1]-100*ku,.4,'255,200,90',16,1600]];
 let ui='';if(GT>tLen)ui+=TXT('O LENDÁRIO',540,280,76,'#fff',-3,pop(GT,tLen));if(GT>tSup)ui+=TXT('SUPER',540,410,150,GOLD,-3,pop(GT,tSup))+TXT('SAIYAJIN',540,550,130,GOLD,-3,pop(GT,tSup+.2)*(1+.02*sn(GT*6)))+RAYS(GT,tSup,540,450,.5,22,GOLD2);
 const F=foc(c0[0],c0[1]-120*ku,.2);camA([[ps(17)-.2,.0,0,-300,-3],[tSup,.18,F[0],F[1]+80,0],[ps(18),.22,F[0],F[1]+60,2]]);
 FX.ui=ui;FX.lit={amb:[1.1,.98,.8],rim:[255,225,130],d:[0,-1],sh:.25,ri:1};FX.shake=10*sh1(GT,[tSup],5);FX.flash=.45*sh1(GT,[tSup],9);FX.flcol='255,240,190'},'flashO');
// ===== 14) apenas o comeco =====
const tCom=wt(18,'começo',.1);
shot('twn3',ps(18)-.2,(t,u)=>{
 put('CSS',0,0,3.6,{sc:2.5,m:GT<tCom?'focus':'grin',brow:3,aR:GT>tCom?tw(-14,-120,tCom,.35):-14,aL:14,tilt:-4,look:[6,-2]});goldAura('CSS',.75,1.2);
 const e=eyeP('CSS'),ku=C.CSS.sp[2],F=foc(e[0],e[1]+100*ku,.6);
 let ui='';if(GT>tCom-.1)ui+=TXT('APENAS O COMEÇO',540,320,96,'#fff',-3,pop(GT,tCom-.1));
 camA([[ps(18)-.2,.45,F[0]*.8,F[1]*.8,0],[ps(19),.62,F[0],F[1],-1]]);
 FX.ui=ui;FX.lit={amb:[1.05,.95,.82],rim:[255,225,130],d:[0,-1],sh:.3,ri:1};FX.vig=.6},'wl');
// ===== 15a) treinamento e batalhas cada vez mais dificeis =====
const tBat=wt(19,'batalhas',.2),tDif2=wt(19,'difíceis',.2);
shot('twn3',ps(19)-.15,(t,u)=>{
 const hits=[tBat,tBat+.55,tDif2,tDif2+.45];const mp=P3(1.7,0,2.6,1.3);
 const lunge=hits.reduce((m,h)=>Math.max(m,Math.exp(-((GT-h)**2)/.01)),0);
 put('CSS',-.6+.25*lunge,0,3.2,{sc:2.3,m:'angry',brow:9,aR:-90+30*lunge,aL:20,tilt:5*lunge,sq:{sx:1+.06*lunge,sy:1-.05*lunge}});goldAura('CSS',.8,1.2);
 sprite(CURSE({fx:-150-60*lunge,fy:-230,str:lunge,mouth:.8}),mp[0]+40*lunge,mp[1],mp[2],mp[3],'C2');
 const p=C.CSS.sp,ku=p[2],hx=(p[0]+mp[0])/2,hy=p[1]-200*ku;let s='';hits.forEach(h=>s+=BURSTX(hx,hy,h,ku*1.4)+RIP(hx,hy,h,.4,300,GOLD2));fw(s);
 let ui='';if(GT>tBat)ui+=TXT('BATALHAS',540,310,110,'#fff',-3,pop(GT,tBat));if(GT>tDif2)ui+=TXT('CADA VEZ MAIS DIFÍCEIS',540,425,60,'#ff6b6b',-3,pop(GT,tDif2));
 camA([[ps(19)-.15,.15,0,-40,-2],[ps(20),.25,0,-60,2]]);
 FX.ui=ui;FX.lit={amb:[1,.92,.85],rim:[255,225,130],d:[1,-.6],sh:.3,ri:1};FX.shake=3+14*lunge;FX.flash=.3*lunge;FX.flcol='255,240,200'},'zoom');
// ===== 15b) rivalizar com os proprios deuses =====
const tDeu=wt(20,'deuses',.1);
shot(null,ps(20)-.15,(t,u)=>{FX.bg=c=>cosmos(c,GT,{c0:'#5a4a20',c1:'#140f30',k:1,streak:.4});
 const up=ob(GT,ps(20),1.2);put('CSS',0,0,0,{px:[540,1700-180*up],ku:2.0,m:'cool',aR:-30,aL:30,nodrift:1,zz:1});goldAura('CSS',1,1.4);
 const c0=chestP('CSS');FX.rays=[[540,500,.55+.3*sh1(GT,[tDeu],2),'255,240,200',22,1900]];(FX.gls=FX.gls||[]).push([540,500,520,'255,240,190',.55]);
 let ui=EMB(540,500,180,GT,.25,'#fff3c0');if(GT>tDeu)ui+=TXT('PODER DOS',540,300,80,'#fff',-3,pop(GT,tDeu))+TXT('DEUSES',540,430,160,GOLD,-3,pop(GT,tDeu+.12)*(1+.03*sn(GT*7)));
 camA([[ps(20)-.15,.2,0,200,0],[ps(21),.05,0,0,0]]);
 FX.ui=ui;FX.lit={amb:[1.1,1,.85],rim:[255,240,190],d:[0,-1],sh:.25,ri:1};FX.flash=.4*sh1(GT,[tDeu],8);FX.flcol='255,245,210'},'flashO');
// ===== 16) Instinto Superior =====
const tAug=wt(21,'auge',.2),tIns=wt(21,'Instinto',.0);
shot(null,ps(21)-.25,(t,u)=>{const si=ob(GT,tIns-.2,.6);FX.bg=c=>cosmos(c,GT,{c0:si>.5?'#2a3466':'#4a3a18',c1:'#070a20',k:.8,dr:.2});
 const k=GT>tIns-.2?'CUI':'CSS';put(k,0,0,0,{px:[540,1660],ku:2.2,m:GT>tIns?'calm':'focus',aR:-12,aL:12,still:GT>tIns,nodrift:1,zz:1,brr:.8});
 if(k=='CUI')silvAura('CUI',si,1.25);else goldAura('CSS',1,1.3);
 const c0=chestP(k),ku=C[k].sp[2];FX.pf=[[c0[0],c0[1],380*ku,34,k=='CUI'?'220,230,255':'255,220,120',.9,'orbit']];
 let ui='';if(GT>tAug&&GT<tIns)ui+=TXT('NO AUGE...',540,320,96,'#fff',-3,pop(GT,tAug));if(GT>tIns)ui+=TXT('INSTINTO',540,320,130,SILV,-3,pop(GT,tIns))+TXT('SUPERIOR',540,450,130,SILV,-3,pop(GT,tIns+.18))+RIP(540,c0[1],tIns-.2,.9,1300,'#ffffff');
 const e=eyeP(k),F=foc(e[0],e[1]+120*ku,.4);camA([[ps(21)-.25,.05,0,0,-1],[tIns-.2,.25,F[0]*.7,F[1]*.7,0],[ps(22),.45,F[0],F[1],0]]);
 FX.ui=ui;FX.lit=k=='CUI'?{amb:[.92,.96,1.1],rim:[220,232,255],d:[0,-1],sh:.25,ri:1}:{amb:[1.1,.98,.8],rim:[255,225,130],d:[0,-1],sh:.25,ri:1};FX.flash=.6*sh1(GT,[tIns-.2],7);FX.flcol='235,240,255';FX.vig=.7},'dip');
// ===== 17) o corpo reage sozinho, desviando =====
const tSoz=wt(22,'sozinho',.1),tDsv=wt(22,'desviando',.0),tQua=wt(22,'impossíveis',.2);
shot('twn3',ps(22)-.2,(t,u)=>{
 const atk=[ps(22)+.35,tSoz,tDsv,tDsv+.55,tQua+.1];let off=0,cur=0;atk.forEach((h,i)=>{const d=GT-h;if(d>-.08){cur=i;off+=(i%2?-1:1)*.9*ez(cl((d+.08)/.16))}});
 const x0=-.2+off*.0;const side=atk.reduce((s,h,i)=>GT>h-.08?(i%2?-1:1):s,0);const xC=-.2+side*.55;
 put('CUI',xC,0,3.4,{sc:2.3,m:'calm',aR:-12,aL:12,look:[0,0],still:1,tilt:-side*4});silvAura('CUI',.7,1.1);
 // imagens residuais onde ele estava
 atk.forEach((h,i)=>{const d=GT-h;if(d>0&&d<.5){const g=i%2?'G1':'G2',sd=i?(i-1)%2?-1:1:0;put(g,-.2+sd*.55,0,3.4,{sc:2.3,m:'calm',still:1,op:(.45*(1-d/.5)).toFixed(2)})}});
 const mp=P3(2.2,0,1.6,1.25),pc=C.CUI.sp,ku=pc[2];const lastA=atk.filter(h=>GT>h-.25).pop()||atk[0],ap=cl((GT-lastA+.25)/.25),tg=[pc[0]-side*0+(GT<lastA?0:0),pc[1]-200*ku];
 const fxs=lp(mp[0]-170*mp[2],P3(-.2,0,3.4)[0]+40*ku,ez(ap)),fys=pc[1]-210*ku;sprite(CURSE({fx:(fxs-mp[0])/mp[2],fy:(fys-mp[1])/mp[2],mouth:.7,str:.4}),mp[0],mp[1],mp[2],mp[3],'C2');
 let s='';atk.forEach(h=>s+=RIP(P3(-.2,0,3.4)[0],pc[1]-200*ku,h,.35,200,SILV));fw(s);
 let ui='';if(GT>tSoz)ui+=TXT('REAGE SOZINHO',540,320,96,SILV,-3,pop(GT,tSoz));if(GT>tQua)ui+=TXT('QUASE IMPOSSÍVEL',540,440,62,'#fff',-3,pop(GT,tQua));
 camA([[ps(22)-.2,.12,-60,-40,-1],[ps(23),.2,-60,-60,1]]);
 FX.ui=ui;FX.lit={amb:[.92,.96,1.1],rim:[220,232,255],d:[1,-.6],sh:.3,ri:1};FX.shake=5*atk.reduce((m,h)=>Math.max(m,Math.exp(-((GT-h)**2)/.004)),0);FX.vig=.7},'flash');
// ===== 18) uma verdade que poucos entendem =====
const tVer=wt(23,'verdade',.2),tPou=wt(23,'poucos',.2);
shot('road',ps(23)-.25,(t,u)=>{
 put('CIB',0,0,6.8,{sc:1.9,m:'calm',aR:-14,aL:14,look:[0,-3],brr:1});
 let ui='';if(GT>tVer)ui+=TXT('UMA VERDADE',540,320,108,'#fff',-3,pop(GT,tVer));if(GT>tPou)ui+=TXT('QUE POUCOS ENTENDEM',540,435,60,GOLD2,-3,pop(GT,tPou));
 const e=eyeP('CIB'),ku=C.CIB.sp[2],F=foc(e[0],e[1]+200*ku,.3);camA([[ps(23)-.25,.0,0,-260,-1],[ps(24),.3,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=LIT.road;FX.vig=.55;FX.rays=[[560,560,.35,'255,200,140',16,1700]]},'dip');
// ===== 19) nao sao extraordinarios porque nunca sao derrotados (ele cai) =====
const tNun=wt(24,'nunca',.1),tDrr=wt(24,'derrotados',.2);
shot('road',ps(24)-.2,(t,u)=>{
 const fall=ob(GT,tDrr-.25,.6);put('CIB',0,0,6.8,{sc:1.9,m:GT<tDrr-.25?'worry':'sad',rot:lp(0,-84,fall),aR:-30,aL:30,nobob:1,brow:4,extra:SWEAT(-80,-300,.7)});
 const p=C.CIB.sp,q=zpS(p[0],p[1]);let ui='';if(GT>tNun)ui+=TXT('NUNCA DERROTADOS?',540,320,92,'#fff',-3,pop(GT,tNun));
 ui+=RIP(q[0],q[1],tDrr+.3,.6,500,'#e8ddd0');
 camA([[ps(24)-.2,.2,0,-100,0],[tDrr,.3,0,-60,-4],[ps(25),.32,0,-40,-4]]);
 FX.ui=ui;FX.lit=LIT.road;FX.vig=.65;FX.shake=12*sh1(GT,[tDrr+.3],5);FX.grade='contrast(1.05) saturate(.75)'},'wr');
// ===== 20) mesmo depois de cair, sempre se tornam mais fortes =====
const tCai=wt(25,'cair',.2),tSem=wt(26,'sempre',.1),tMfo=wt(26,'fortes',.0),tEnd=pe(26)+.35;
shot('road',ps(25)-.2,(t,u)=>{
 const up=ob(GT,tCai+.2,.8),gold=ob(GT,tMfo-.15,.4),k=GT>tMfo-.15?'CSS':'CIB';
 put(k,0,0,6.8,{sc:1.9,m:GT<tCai+.2?'sad':GT<tMfo?'focus':'grin',rot:lp(-84,0,up),aR:lp(-30,-20,up),aL:lp(30,20,up),nobob:up<1,brow:6,sq:SQ(tMfo,1.3)});
 const c0=chestP(k),ku=C[k].sp[2];if(k=='CSS'){goldAura(k,gold,1.3);fw(BOLTS(c0[0],c0[1],180*ku,GT,gold));FX.pf=[[c0[0],c0[1],380*ku,36,'255,220,120',gold,'rise']]}
 FX.rays=[[560,560,.3+.4*gold,'255,210,130',18,1800]];
 let ui='';if(GT>tCai&&GT<tEnd)ui+=TXT('MESMO DEPOIS DE CAIR...',540,320,70,'#fff',-3,pop(GT,tCai));if(GT>tMfo&&GT<tEnd)ui+=TXT('MAIS FORTES',540,440,124,GOLD,-3,pop(GT,tMfo)*(1+.03*sn(GT*7)));
 if(GT>tEnd){const a=ob(GT,tEnd,.4);ui+=`<rect x="0" y="1290" width="1080" height="330" fill="#120802" opacity="${(.82*a).toFixed(2)}"/>`+TXT('E VOCÊ?',540,300,110,'#fff',-3,pop(GT,tEnd))+TXT('CAIRIA OU LEVANTARIA?',540,420,74,GOLD,-3,pop(GT,tEnd+.15))+TXT('COMENTE AQUI EMBAIXO!',540,1470,66,'#fff',-2,pop(GT,tEnd+.3))}
 const F=foc(c0[0],c0[1]-60*ku,.3);camA([[ps(25)-.2,.25,0,-60,-4],[tCai+.2,.2,F[0]*.5,F[1]*.5,0],[tMfo-.1,.32,F[0],F[1],0],[tMfo,.1,0,-40,0,'c'],[TOTAL,.2,0,-60,1]]);
 FX.ui=ui;FX.lit=k=='CSS'?{amb:[1.1,.98,.82],rim:[255,220,120],d:[0,-1],sh:.3,ri:1}:LIT.road;FX.shake=14*sh1(GT,[tMfo],5);FX.flash=.6*sh1(GT,[tMfo],8);FX.flcol='255,240,190'},'');
