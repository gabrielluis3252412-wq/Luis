// =====================================================================
//  PLANOS — E SE VOCE DESPERTASSE OS PODERES DO JOTARO?
//  Cada corte/efeito/texto esta preso a palavra exata da narracao: wt(frase,'palavra',fracao)
//  wk(frase, n) = n-esima palavra da frase (para palavras repetidas como ORA ORA ORA)
// =====================================================================
const PU='#c86bff',PU2='#5a1a9a',GD='#ffd23f',GD2='#8a5a00',CYN='#9ff6ff',RED='#ff4d6d';
const wk=(i,n,f=.5)=>{const x=PWD[i-1][n];return x[1]+(x[2]-x[1])*f+OFF};
const FK=(side,a1,a2,ext=80,big=1)=>{const r=d=>d*Math.PI/180,L1=165*big,L2=150*big,sx=side*152,sy=-322,ex=sx-L1*sn(r(a1)),ey=sy+L1*cs(r(a1)),a=r(a1+a2),wx=ex-(L2-4)*sn(a),wy=ey+(L2-4)*cs(a);return[wx-ext*sn(a),wy+ext*cs(a)]};
const ALT=v=>{SH[SH.length-1].alt=v};
const cj=(x,z,o={})=>put('CJ',x,0,z,{back:COAT_BACK(GT,o.wind??1,o.flip||1),...o});
const FINGER=`<path d="M-6 6L-5 40Q0 47 5 40L6 6Z" fill="#f6c8a0" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
const spEyes=(S,a,col='160,245,255')=>{if(a<=0)return;const L=SPT(S,-24,-455),R=SPT(S,24,-455),r=34*S.ku*S.ss;(FX.gls=FX.gls||[]).push([L[0],L[1],r,col,.55*a],[R[0],R[1],r,col,.55*a])};
const gsEyes=(S,a)=>{if(a<=0)return;const L=SPT(S,-26,-442),R=SPT(S,26,-442),r=30*S.ku*S.ss;(FX.gls=FX.gls||[]).push([L[0],L[1],r,'255,240,160',.6*a],[R[0],R[1],r,'255,240,160',.6*a])};
const mix=(A,B,k)=>A.map((v,i)=>typeof v=='number'?lp(v,B[i],k):(k<.5?v:B[i]));
// poses do Stand roxo
const CROSS={aL:[10,-100,'fist'],aR:[-10,100,'fist'],back:'none'},GUARD={aL:[38,-140,'fist'],aR:[-38,140,'fist'],back:'none'},REST={aL:[16,-12,'fist'],aR:[-16,12,'fist']};
// cartela de capitulo no estilo JoJo
const JCARD=(t0,t1,n,title,col=PU,col2=PU2)=>{if(GT<t0||GT>t1)return'';const a=ob(GT,t0,.35),o=1-ez((GT-t1+.25)/.25),w=1260*a;
 return`<g opacity="${R2(o,2)}"><g transform="translate(540 340) rotate(-6)"><rect x="${R2(-w/2)}" y="-118" width="${R2(w)}" height="236" fill="#0c0620" opacity=".9"/><rect x="${R2(-w/2)}" y="-118" width="${R2(w)}" height="14" fill="${col}"/><rect x="${R2(-w/2)}" y="104" width="${R2(w)}" height="14" fill="${col}"/><rect x="${R2(-w/2+w*((GT*.8)%1))}" y="-118" width="70" height="236" fill="#fff" opacity=".07"/></g>`+JTXT(`PONTO ${n}`,540,300,60,col,-6,pop(GT,t0+.1),col2)+JTXT(title,540,410,title.length>20?64:title.length>16?84:100,'#fff',-6,pop(GT,t0+.22),col2)+'</g>'};
// letreiro que cai (cena do ORA ORA)
const SIGN=(x,y,s,rot,cr=0)=>`<g transform="translate(${R2(x)} ${R2(y)}) rotate(${R2(rot)}) scale(${R2(s,3)})"><rect x="-300" y="-110" width="600" height="220" rx="16" fill="#ff5d8f" ${ST7}/><rect x="-270" y="-82" width="540" height="164" rx="10" fill="#ffe8f0" ${ST5}/><text y="34" font-size="110" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#ff3d7a" stroke="${INK}" stroke-width="10" paint-order="stroke">LOJA</text><path d="M-220-110V-260M220-110V-260" stroke="#777" stroke-width="18"/>${cr>0?[...Array(7).keys()].map(i=>{const a=i*.9+.3,L=120+160*rnd(i,4.1);return`<path d="M0 0L${R2(cs(a)*L*.5+20*sn(i))} ${R2(sn(a)*L*.35)}L${R2(cs(a)*L)} ${R2(sn(a)*L*.6)}" stroke="${INK}" stroke-width="${R2(6+6*cr)}" fill="none" stroke-linecap="round" opacity="${R2(cl(cr*2),2)}"/>`}).join(''):''}</g>`;
const SHARD=(x,y,s,rot,i)=>{const c=['#ff5d8f','#ffe8f0','#ff3d7a','#9a9a9a'][i%4];return`<path transform="translate(${R2(x)} ${R2(y)}) rotate(${R2(rot)}) scale(${R2(s,3)})" d="M-40-30L36-38L44 20L-10 40L-44 12Z" fill="${c}" ${ST5}/>`};
// grade da cela
const BARS=(x0,x1,y0,y1,n,a=1)=>{let s='';for(let i=0;i<n;i++){const x=lp(x0,x1,(i+.5)/n);s+=`<rect x="${R2(x-16)}" y="${y0}" width="32" height="${y1-y0}" rx="10" fill="#4b4f63" ${ST7} opacity="${a}"/><rect x="${R2(x-8)}" y="${y0}" width="6" height="${y1-y0}" fill="#9aa0ba" opacity="${R2(.8*a,2)}"/>`}return s+`<rect x="${R2(x0-40)}" y="${R2(y0+60)}" width="${R2(x1-x0+80)}" height="34" rx="10" fill="#4b4f63" ${ST7} opacity="${a}"/><rect x="${R2(x0-40)}" y="${R2(y1-120)}" width="${R2(x1-x0+80)}" height="34" rx="10" fill="#4b4f63" ${ST7} opacity="${a}"/>`};
// grafico hexagonal da ficha do Stand
const HEXL=[['PODER','A'],['VELOCIDADE','A'],['ALCANCE','C'],['RESISTÊNCIA','A'],['PRECISÃO','A'],['POTENCIAL','A']];
const HEX=(cx,cy,R,vis,a,hiC)=>{if(a<=.01)return'';const P=(i,r)=>{const q=-1.571+i*1.0472;return[cx+cs(q)*r,cy+sn(q)*r]};let s=`<g opacity="${R2(a,2)}">`;
 for(let k=1;k<=5;k++)s+=`<path d="M${[0,1,2,3,4,5].map(i=>P(i,R*k/5).map(v=>R2(v)).join(' ')).join('L')}Z" fill="${k==5?'rgba(20,8,50,.7)':'none'}" stroke="rgba(200,170,255,.45)" stroke-width="${k==5?6:2}"/>`;
 const val=i=>(HEXL[i][1]=='A'?1:.42)*cl(vis[i]);s+=`<path d="M${[0,1,2,3,4,5].map(i=>P(i,R*Math.max(.05,val(i))).map(v=>R2(v)).join(' ')).join('L')}Z" fill="rgba(200,107,255,.45)" stroke="${PU}" stroke-width="8" stroke-linejoin="round"/>`;
 HEXL.forEach(([n,g],i)=>{const q=P(i,R+105),on=vis[i]>.01,hc=i==2&&hiC;s+=`<text x="${R2(q[0])}" y="${R2(q[1]-18)}" font-size="34" text-anchor="middle" fill="${hc?RED:'#e8dcff'}" font-family="Poppins" font-weight="800" stroke="${INK}" stroke-width="7" paint-order="stroke">${n}</text>`;
  if(on)s+=`<text transform="translate(${R2(q[0])} ${R2(q[1]+46)}) scale(${R2(pop(GT,vis.t[i]),3)})" font-size="74" text-anchor="middle" fill="${g=='A'?GD:RED}" font-family="Poppins" font-weight="900" stroke="${INK}" stroke-width="12" paint-order="stroke">${g}</text>`});
 return s+'</g>'};
// foto (polaroid) com a silhueta do inimigo e a mosca
const PHOTO=(x,y,s,rot,fly=1)=>`<g transform="translate(${R2(x)} ${R2(y)}) rotate(${R2(rot)}) scale(${R2(s,3)})"><rect x="-300" y="-340" width="600" height="700" rx="14" fill="#f4efe6" ${ST7}/><rect x="-262" y="-302" width="524" height="540" fill="#251a3a"/><circle cx="120" cy="-180" r="70" fill="#3a2c55"/><path d="M-60 238L-40 40Q0 -40 40 40L60 238Z" fill="#0b0712"/><circle cx="0" cy="-10" r="52" fill="#0b0712"/><path d="M-48-40L-30-90L-10-56L10-100L26-56L46-88L50-36Z" fill="#0b0712"/><path d="M-200 238L-180 120L-150 238ZM150 238L180 90L210 238Z" fill="#160f24"/><text x="0" y="310" font-size="38" text-anchor="middle" font-family="Poppins" font-weight="800" fill="#6b5a8a">???</text>${fly?`<g transform="translate(212 196) scale(.16)">${FLY(0,0,1,0)}</g>`:''}</g>`;
const FLY=(x,y,s,t)=>`<g transform="translate(${R2(x)} ${R2(y)}) scale(${R2(s,3)})"><ellipse cx="-40" cy="-46" rx="60" ry="26" transform="rotate(${R2(-30+20*sn(t*60))} -10 -20)" fill="rgba(220,240,255,.7)" ${ST4}/><ellipse cx="40" cy="-46" rx="60" ry="26" transform="rotate(${R2(30-20*sn(t*60))} 10 -20)" fill="rgba(220,240,255,.7)" ${ST4}/><ellipse cx="0" cy="10" rx="34" ry="56" fill="#2c3a2a" ${ST5}/><path d="M-30 0H30M-30 24H30" stroke="#55704f" stroke-width="7"/><circle cx="0" cy="-50" r="30" fill="#2c3a2a" ${ST5}/><circle cx="-18" cy="-58" r="15" fill="#c0302a" ${ST4}/><circle cx="18" cy="-58" r="15" fill="#c0302a" ${ST4}/>${[-1,1].map(d=>[0,22,44].map(y=>`<path d="M${d*28} ${y}L${d*62} ${y+24}L${d*70} ${y+56}" fill="none" stroke="${INK}" stroke-width="6" stroke-linecap="round"/>`).join('')).join('')}</g>`;
// mapa do Egito (rio Nilo, piramides, alfinete)
const MAP=(a,pin,t0)=>{if(a<=.01)return'';let s=`<g opacity="${R2(a,2)}" transform="translate(540 1000) rotate(-3)"><rect x="-440" y="-470" width="880" height="900" rx="20" fill="#f1dfb2" ${ST7}/><path d="M-440-470H440V-330Q200-300 60-360Q-100-420-440-360Z" fill="#7fb7e6" stroke="${INK}" stroke-width="5"/>
<path d="M120-350C80-250 140-170 90-80C50 0 110 90 70 200C50 260 80 330 60 420" fill="none" stroke="#3f8fd6" stroke-width="18" stroke-linecap="round"/><path d="M120-350C80-250 140-170 90-80C50 0 110 90 70 200C50 260 80 330 60 420" fill="none" stroke="#9fd0ff" stroke-width="6" stroke-linecap="round"/>
${[[-140,40,1],[-60,70,.8],[-210,90,.7]].map(([x,y,k])=>`<path d="M${x-60*k} ${y}L${x} ${y-90*k}L${x+60*k} ${y}Z" fill="#e7b85a" ${ST5}/><path d="M${x} ${y-90*k}L${x+60*k} ${y}L${x+14*k} ${y}Z" fill="#c38f34"/>`).join('')}
<text x="-120" y="300" font-size="54" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#8a5a2a" opacity=".5">ÁFRICA</text>`;
 if(pin>0){const d=pop(GT,t0);s+=`<g transform="translate(96 -40) scale(${R2(d,3)})"><path d="M0 0C-40-50-46-80-46-100A46 46 0 1 1 46-100C46-80 40-50 0 0Z" fill="${RED}" ${ST7}/><circle cy="-100" r="18" fill="#fff"/></g>`+RING(96,-40,t0,.8,260,RED,12)}
 return s+'</g>'};
// esboco do Stand (a mosca desenhada em alta velocidade): k = progresso 0..1
const SKETCH=(k,a)=>{if(a<=.01)return'';const L=[['M-160 -80Q0 -260 160 -80',1],['M-150 60Q0 260 150 60',1],['M-120 -40Q0 -120 120 -40',.7],['M-110 30Q0 100 110 30',.7],['M-60 -150Q0 -230 60 -150Z',1],['M-300 -220Q-160 -300 -40 -170Q-200 -150 -300 -220Z',1],['M300 -220Q160 -300 40 -170Q200 -150 300 -220Z',1],['M-150 -20L-300 -80L-340 40',1],['M150 -20L300 -80L340 40',1],['M-140 60L-280 120L-300 230',1],['M140 60L280 120L300 230',1],['M-60 -170A28 28 0 1 1 -59 -170Z',1],['M60 -170A28 28 0 1 1 61 -170Z',1]];
 let s=`<g opacity="${R2(a,2)}" transform="translate(540 1000)"><rect x="-440" y="-470" width="880" height="900" rx="14" fill="#fbf7ee" ${ST7}/>${[...Array(14).keys()].map(i=>`<path d="M-440 ${-400+i*62}H440" stroke="#bcd3ef" stroke-width="3"/>`).join('')}<path d="M-360-470V430" stroke="#f3a5b5" stroke-width="4"/>`;
 const n=L.length;L.forEach(([d,w],i)=>{const f=cl(k*n-i);if(f<=0)return;s+=`<path d="${d}" fill="none" stroke="#2a2433" stroke-width="${R2(7*w)}" stroke-linecap="round" stroke-dasharray="1400" stroke-dashoffset="${R2(1400*(1-f))}"/>`});
 return s+'</g>'};
// cronometro
const WATCH=(x,y,r,val,txt,a=1,col='#fff')=>{if(a<=.01)return'';const q=val*6.283-1.571;return`<g transform="translate(${R2(x)} ${R2(y)})" opacity="${R2(a,2)}"><rect x="-26" y="${R2(-r-46)}" width="52" height="40" rx="8" fill="#cfd3e6" ${ST5}/><circle r="${r}" fill="#f4f2ff" ${ST7}/><circle r="${R2(r*.86)}" fill="none" stroke="#c8c2e6" stroke-width="4"/><path d="M0 0L0 ${-r*.86}A${r*.86} ${r*.86} 0 ${val%1>.5?1:0} 1 ${R2(cs(q)*r*.86)} ${R2(sn(q)*r*.86)}Z" fill="rgba(200,107,255,.35)"/><line x1="0" y1="0" x2="${R2(cs(q)*r*.8)}" y2="${R2(sn(q)*r*.8)}" stroke="${RED}" stroke-width="8" stroke-linecap="round"/><circle r="10" fill="${INK}"/><text y="${R2(r*.55)}" font-size="${R2(r*.42)}" text-anchor="middle" font-family="Poppins" font-weight="900" fill="${col}" stroke="${INK}" stroke-width="10" paint-order="stroke">${txt}</text></g>`};
// rachadura/hematoma (dor compartilhada)
const CRACK=(x,y,s,a,col='#ff3d5a')=>{if(a<=.01)return'';let o='';for(let i=0;i<6;i++){const an=i/6*6.283+.4,L=(26+30*rnd(i,3.3))*s;o+=`<path d="M${R2(x)} ${R2(y)}L${R2(x+cs(an)*L*.55+5*s*sn(i))} ${R2(y+sn(an)*L*.55)}L${R2(x+cs(an)*L)} ${R2(y+sn(an)*L)}" stroke="${INK}" stroke-width="${R2(6*s)}" fill="none" stroke-linecap="round" opacity="${R2(a,2)}"/><path d="M${R2(x)} ${R2(y)}L${R2(x+cs(an)*L*.55+5*s*sn(i))} ${R2(y+sn(an)*L*.55)}L${R2(x+cs(an)*L)} ${R2(y+sn(an)*L)}" stroke="${col}" stroke-width="${R2(2.5*s)}" fill="none" stroke-linecap="round" opacity="${R2(a,2)}"/>`}return o};
// imagens residuais (rastro de corrida)
const GHOST=(k,x,z,o,n,dx,a)=>{for(let i=1;i<=n;i++){const sl='C'+(i+1);const p=pj(CSH.pl.VP,x-dx*i,0,z);const ku=.0046*(H/2)/(CSH.pl.tf*p[2])*(PLS[CSH.plate]||1);sprite(`<g opacity="${R2(a*(1-i/(n+1))*.6,2)}" transform="translate(0 0)">${ch({...CHD.CJ,m:o.m||'angry',walk:1})}</g>`,p[0],p[1],ku,p[2]+.02*i,sl)}};

// ===== 0) GANCHO: a bala, o tempo para =====
const tPar=wt(1,'parou',0),tCen=wt(2,'centímetros',.2),tRos=wt(2,'rosto',.3),tSo=wt(3,'só',0),tMov=wt(3,'move',.1),tTit=ps(4)-.12;
shot('str',0,(t,u)=>{
 const alive=GT<tPar,frz=frzK(tPar),T=alive?GT:tPar+.05*(GT-tPar);
 cj(0,-2.2,{m:GT<tSo?'focus':'cool',brow:4,look:GT>tSo?[10,-1]:[1,0],still:!alive,noblink:!alive,wind:alive?1:.04,aR:-12,aL:12});
 const p=C.CJ.sp,ku=p[2],e=eyeP('CJ'),bt=[e[0]+108*ku,e[1]+6*ku];
 const S=stPlace('CJ',-40,-190,.6),ap=cl((GT-tPar+.1)/.1),pin=ob(GT,tMov-.4,.4);
 const tg=LOC(S,bt[0],bt[1]),ik=IK(1,tg[0],tg[1],128),aR=[lp(-30,ik[0],pin),lp(-30,ik[1],pin),pin>.55?'pinch':'open'];
 stDraw(S,'S1','sp',{alpha:ap,aura:ap,t:T,face:'stern',aR,aL:[24,-16,'fist'],back:'L',wind:.4});spEyes(S,ap*(.8+.2*sn(GT*6)));
 let bp=[bt[0]+(alive?(1-GT/tPar)*1000*ku:0),bt[1]-(alive?(1-GT/tPar)*30*ku:0)];
 if(GT>tMov){const h=FK(1,aR[0],aR[1],128),q=SPT(S,h[0],h[1]);bp=q}
 fw(BULLET(bp[0],bp[1],180,ku*.42,alive?1:.25));
 fw(RAIN(GT,1,!alive,[-300,-300,1380,2220],130,0,'190,210,255',tPar));
 if(!alive){const c0=SPT(S,0,-280);TSPHERE(c0[0],c0[1],tPar)}
 FX.alt=frz;FX.frzc='f';FX.pfT=T;
 if(GT>tPar+.55){const a=cl((GT-tPar-.55)/.4);fw(GOGO(e[0]-260*ku,e[1]+150*ku,ku*.9,a,4)+GOGO(e[0]+280*ku,e[1]+380*ku,ku*.8,a,3,.4))}
 let ui='';if(GT>tCen&&GT<tSo)ui+=JTXT('A CENTÍMETROS!',540,330,80,'#fff',-5,pop(GT,tCen),PU2);
 if(GT>tSo&&GT<tTit)ui+=JTXT('SÓ VOCÊ SE MOVE',540,340,74,CYN,-5,pop(GT,tSo),PU2);
 FX.ui=ui;
 const F0=foc(p[0],p[1]-300*ku,.15),F1=foc(e[0]+50*ku,e[1]+30*ku,.75),F2=foc(e[0]+58*ku,e[1]+6*ku,1.25),F3=foc(e[0]+70*ku,e[1]-6*ku,1.5);
 camA([[0,.15,F0[0],F0[1],-1],[tPar,.24,F0[0],F0[1],1],[tPar+.02,.75,F1[0],F1[1],-3,'c'],[tRos,1.25,F2[0],F2[1],2],[tSo,1.5,F3[0],F3[1],0,'c'],[tTit,1.62,F3[0],F3[1],-1]]);
 FX.lit=frz>.5?{amb:[.82,.8,1],rim:[200,170,255],d:[-1,-.6],sh:.4,ri:1}:LIT.str;FX.vig=.55+.2*frz;
 FX.shake=(alive?3:0)+12*sh1(GT,[tPar],6);FX.flash=.5*sh1(GT,[tPar],10);FX.flcol='230,210,255';FX.chroma=6*sh1(GT,[tPar],5)},'');ALT('f');
// ===== 1) TITULO: o tempo volta, pose =====
const tDes=wt(4,'despertasse',0),tJot=wt(4,'Jotaro',0);
shot('str',tTit,(t,u)=>{
 const back=cl((GT-tTit)/.4);
 cj(.05,-3,{m:'cool',brow:5,fr:'R',hold:FINGER,aR:tw(-12,-116,tTit+.1,.35),aL:18,tilt:-3,look:[3,2],sq:SQ(tTit+.1,.8)});
 const p=C.CJ.sp,ku=p[2],S=stPlace('CJ',-30,-200,.6);stDraw(S,'S1','sp',{aura:1,face:'stern',...CROSS,wind:1,lean:-2});spEyes(S,.9);
 const fb=cl((GT-tTit)/.55),bp=SPT(S,60,-160);if(fb<1)fw(BULLET(bp[0]+40*fb*ku,bp[1]+fb*fb*700*ku,90+400*fb,ku*.42));
 fw(RAIN(GT,1,0,[-300,-300,1380,2220],130,0,'190,210,255'));
 const ga=cl((GT-tTit-.3)/.3);fw(GOGO(p[0]-330*ku,p[1]-120*ku,ku*.85,ga,4)+GOGO(p[0]+330*ku,p[1]-260*ku,ku*.75,ga,3,.5));
 let ui='';if(GT>tTit+.05)ui+=JTXT('E SE VOCÊ',540,250,72,'#fff',-6,pop(GT,tTit+.05),PU2);
 if(GT>tDes-.05)ui+=JTXT('DESPERTASSE',540,360,100,'#fff',-6,pop(GT,tDes-.05),PU2);
 if(GT>tJot-.08)ui+=JTXT('OS PODERES',540,480,90,GD,-6,pop(GT,tJot-.08),GD2)+JTXT('DO JOTARO?',540,595,108,GD,-6,pop(GT,tJot+.08)*(1+.02*sn(GT*6)),GD2);
 FX.ui=ui;const F=foc(p[0],p[1]-330*ku,.2);camA([[tTit,.42,F[0],F[1]+260,3],[tTit+.45,.24,F[0],F[1]+190,-1],[ps(5),.2,F[0],F[1]+170,1]]);
 const c0=SPT(S,0,-300);FX.alt=1-back;FX.frzc='f';FX.lit=LIT.str;FX.vig=.6;FX.flash=.65*(1-back);FX.flcol='235,220,255';FX.shake=9*sh1(GT,[tJot],6);FX.rays=[[c0[0],c0[1],.35,'190,150,255',16,1500]]},'');ALT('f');

// ===== 2) QUARTO: um espirito sai do seu corpo =====
const tEsp=wt(5,'espírito',0),tCor=wt(5,'corpo',0);
shot('bed',ps(5)-.25,(t,u)=>{
 const sc=GT>tEsp;put('CIB',0,.55,-2.45,{sit:1,noshd:1,m:GT<tEsp?'sleepy':GT<tCor?'scared':'shock',brow:GT>tEsp?8:0,look:GT>tEsp?[-6,-6]:[0,0],aR:GT>tCor?-60:-14,aL:GT>tCor?60:14,sq:SQ(tCor,1.2),rot:GT>tCor?3*sn(GT*30)*cl(1-(GT-tCor)/1):0,extra:GT>tEsp?SWEAT(-80,-300,.9)+SWEAT(76,-270,.7):''});
 const p=C.CIB.sp,ku=p[2],a=cl((GT-tEsp+.4)/.9)*(.55+.2*sn(GT*13)*sn(GT*7.1)),S=stPlace('CIB',-10,-120,.5);
 stDraw(S,'S1','sp',{alpha:a,aura:a*1.4,face:'stern',aR:[-60+20*sn(GT*1.5),-40,'open'],aL:[30,-20,'open'],back:'none',wind:.8,legs:0,eye:1});spEyes(S,a*1.2);
 let ui='';if(GT>tEsp)ui+=JTXT('UM ESPÍRITO?!',540,330,86,'#fff',-5,pop(GT,tEsp),PU2);
 FX.ui=ui;const e=eyeP('CIB'),F=foc(e[0],e[1]-40*ku,.2);camA([[ps(5)-.25,.05,F[0],F[1],0],[tCor-.05,.2,F[0],F[1],1],[tCor,.42,F[0],F[1]+40,-2,'c'],[ps(6),.5,F[0],F[1]+40,0]]);
 FX.alt=1;FX.lit={amb:[.55,.62,.95],rim:[150,200,255],d:[-1,-.5],sh:.4,ri:.9};FX.vig=.85;FX.shake=14*sh1(GT,[tCor],5);FX.flash=.3*sh1(GT,[tEsp],8);FX.flcol='190,150,255'},'dip');ALT('n');
// ===== 3) A CELA: possuido =====
const tPos=wt(6,'possuído',0),tTra=wt(6,'trancou',0),tCel=wt(6,'cela',0);
shot('hot',ps(6)-.2,(t,u)=>{
 put('CIB',-.35,0,-.6,{m:GT<tPos?'sad':'angry',brow:6,aR:40,aL:-40,look:[-3,4],nobob:1,sit:1,top:1});
 const p=C.CIB.sp,ku=p[2],a=.32+.12*sn(GT*3),S=stPlace('CIB',60,-120,.5);stDraw(S,'S1','sp',{top:1,alpha:a,aura:a,face:'stern',aR:[-40,-30,'open'],aL:[20,-10,'fist'],back:'none',legs:0,wind:.6});spEyes(S,a);
 const sl=ob(GT,tTra-.15,.3),bx=lp(1500,0,sl);fw(`<g transform="translate(${R2(bx)} 0)">${BARS(60,1020,-200,2200,6)}</g>`);
 let ui='';if(GT>tPos)ui+=JTXT('POSSUÍDO?!',540,330,96,RED,-5,pop(GT,tPos),'#5a0a1a');if(GT>tTra)ui+=JTXT('CLANG!',760,560,70,'#fff',8,pop(GT,tTra+.12),PU2);
 FX.ui=ui;const F=foc(p[0],p[1]-150*ku,.15);camA([[ps(6)-.2,.3,F[0],F[1],-2],[ps(7),.12,F[0],F[1],1]]);
 FX.alt=1;FX.tone=.1;FX.grade='sepia(.45) contrast(1.08)';FX.lit={amb:[.62,.58,.7],rim:[255,170,120],d:[-1,-.3],sh:.45,ri:.8};FX.vig=.9;FX.shake=12*sh1(GT,[tTra+.12],7)},'flash');ALT('n');
// ===== 4) ERA UM STAND: energia vital ao seu lado =====
const tSta=wt(7,'Stand',0),tEne=wt(7,'energia',0),tLad=wt(7,'lado',0);
shot('twn3',ps(7)-.25,(t,u)=>{
 const on=GT>tSta,k=on?'CJ':'CIB';(on?cj:((x,z,o)=>put('CIB',x,0,z,o)))(-.6,6,{m:on?'focus':'awe',brow:on?4:0,aR:-14,aL:14,look:[8,-4],sq:SQ(tSta,1)});
 const p=C[k].sp,ku=p[2],f=cl((GT-tSta)/(tLad-tSta)),a=on?.2+.8*ez(f):0,S=stPlace(k,190,-190,.6);
 stDraw(S,'S1','sp',{alpha:a,aura:a,face:'stern',...(f<1?REST:CROSS),wind:.8,legs:.8*a});spEyes(S,a*a);
 const c0=SPT(S,0,-250);if(on)FX.pf=[[c0[0],c0[1],520*ku,40,'200,160,255',(1-f*.6),'in'],[p[0],p[1]-150*ku,300*ku,20,'230,200,255',.6,'rise']];
 let ui='';if(on)ui+=JTXT('STAND',540,330,150,PU,-6,pop(GT,tSta)*(1+.02*sn(GT*7)),PU2);if(GT>tEne)ui+=JTXT('ENERGIA VITAL',540,470,70,'#fff',-6,pop(GT,tEne),PU2);if(GT>tLad)ui+=JTXT('DE PÉ AO SEU LADO',540,575,54,CYN,-6,pop(GT,tLad),PU2);
 FX.ui=ui;fw(on?GOGO(p[0]+520*ku,p[1]-560*ku,ku*.7,cl((GT-tSta)/.4),3):'');
 const F=foc(p[0]+90*ku,p[1]-260*ku,.05);camA([[ps(7)-.25,.25,F[0]-60,F[1],-2],[tSta,.1,F[0],F[1],1,'c'],[ps(8),.02,F[0],F[1]-40,-1]]);
 FX.lit={...LIT.twn3,rim:[200,160,255],ri:1};FX.vig=.7;FX.shake=10*sh1(GT,[tSta],6)+6*sh1(GT,[tLad],7);FX.flash=.55*sh1(GT,[tSta],8)+.4*sh1(GT,[tLad],9);FX.flcol='210,170,255';FX.rays=[[c0[0],c0[1],.3*a,'190,150,255',14,1400]]},'zoom');
// ===== 5) STAR PLATINUM (revelacao, fundo de estrelas) =====
const tStar=wt(8,'Star',0),tPla=wt(8,'Platinum',.4);
shot(null,ps(8)-.2,(t,u)=>{FX.bg=c=>cosmos(c,GT,{c0:'#4a1d9a',c1:'#14063a',k:1.1,warm:0,streak:.35,sy:1000});
 put('CJ',0,0,0,{px:[540,1700],ku:1.75,m:'cool',brow:5,fr:'R',hold:FINGER,aR:-122,aL:30,tilt:-4,look:[4,0],zz:1,nodrift:1,back:COAT_BACK(GT,1.2)});
 const S=stPlace('CJ',0,-230,.68);stDraw(S,'S1','sp',{aura:1.2,face:'stern',aL:[150,-25,'fist'],aR:[-20,100,'fist'],back:'none',wind:1.3,lean:2});spEyes(S,1);
 const c0=SPT(S,0,-260);FX.rays=[[c0[0],c0[1]-100,.55+.25*sh1(GT,[tStar],3),'200,160,255',22,1900]];FX.pf=[[c0[0],c0[1],560,40,'220,200,255',1,'orbit']];
 fw(GOGO(150,1100,1.05,1,4)+GOGO(940,1000,.95,1,4,.5));
 let ui='';if(GT>tStar-.05)ui+=JTXT('STAR',540,270,150,GD,-6,pop(GT,tStar-.05),GD2)+JTXT('PLATINUM',540,420,128,GD,-6,pop(GT,tPla-.1)*(1+.02*sn(GT*6)),GD2)+RAYS(GT,tStar,540,330,.5,22,GD);
 FX.ui=ui;camA([[ps(8)-.2,.25,0,-420,-3],[tStar,.08,0,-120,0],[ps(9),.02,0,-60,2]]);
 FX.lit={amb:[.95,.9,1.1],rim:[210,170,255],d:[0,-1],sh:.3,ri:1};FX.vig=.65;FX.flash=.5*sh1(GT,[tStar],9);FX.flcol='255,240,200';FX.shake=8*sh1(GT,[tStar],6)},'flashP');
// ===== 6) PONTO 1: forca e velocidade (soco no ar) =====
const tP1=ps(9),tFor=wt(9,'força',0),tVel=wt(9,'velocidade',0);
shot('twn',ps(9)-.25,(t,u)=>{
 cj(-1.0,5.4,{m:'angry',brow:6,aR:-20,aL:20,look:[8,0]});const p=C.CJ.sp,ku=p[2],S=stPlace('CJ',130,-190,.6);
 const h1=tFor+.05,h2=tVel+.1,pr=pick([h1].map(PUNCH)),pl=pick([h2].map(PUNCH));
 stDraw(S,'S1','sp',{aura:1,face:GT>h1-.1?'shout':'stern',aR:[lp(-40,-96,Math.max(0,pr)),lp(-90,-4,Math.max(0,pr)),'fist'],aL:[lp(30,-80,Math.max(0,pl)),lp(-80,-10,Math.max(0,pl)),'fist'],back:pl>0?'R':'L',wind:1.3,lean:6*Math.max(pr,pl)});spEyes(S,1);
 const fR=SPT(S,...FK(1,-96,-4,80)),fL=SPT(S,...FK(1,-90,-4,80));
 fw(BURST(fR[0]+40*ku,fR[1],170*ku,h1,'#fff',PU)+BURST(fL[0]+40*ku,fL[1],170*ku,h2,'#fff',GD)+RING(fR[0],fR[1],h1,.5,500*ku,'#fff',16)+RING(fL[0],fL[1],h2,.5,500*ku,GD,16));
 FX.ui=JCARD(ps(9)-.2,ps(10)-.15,1,'FORÇA E VELOCIDADE')+SPEEDL(.35*sh1(GT,[h1,h2],3)+.15,0,26,'#fff');
 const F=foc(p[0]+260*ku,p[1]-300*ku,.15);camA([[ps(9)-.25,.3,F[0],F[1],-2],[ps(10),.18,F[0],F[1],1]]);FX.cz+=.08*sh1(GT,[h1,h2],6);
 FX.lit=LIT.twn;FX.shake=16*sh1(GT,[h1,h2],6);FX.flash=.25*sh1(GT,[h1,h2],12)},'wr');
// ===== 7) FICHA OFICIAL (hexagono) + alcance curto =====
const tN1=wt(10,'força',0),tN2=wt(10,'velocidade',0),tN3=wt(10,'precisão',0),tAlc=wt(11,'alcance',0),tCur=wt(11,'curto',0);
shot(null,ps(10)-.2,(t,u)=>{FX.bg=c=>cosmos(c,GT,{c0:'#2d1266',c1:'#0b0424',k:.7,dr:.3});
 const S={x:300,y:1500,ku:1.45,hy:0,ss:.8,fl:1,z:2};const fl=GT>tN1&&GT<tN3+.6;stDraw(S,'S1','sp',{aura:1,face:'stern',aL:[150,-150+10*sn(GT*2),'fist'],aR:[-60,120,'fist'],back:'none',wind:1,lean:-4,legs:.6});spEyes(S,1);
 const vis=[cl((GT-tN1)/.2),cl((GT-tN2)/.2),cl((GT-tAlc)/.2),cl((GT-tN3-.35)/.2),cl((GT-tN3)/.2),cl((GT-tN3-.6)/.2)];vis.t=[tN1,tN2,tAlc,tN3+.35,tN3,tN3+.6];
 let ui=JTXT('FICHA OFICIAL',540,250,74,'#fff',-4,pop(GT,ps(10)-.1),PU2)+HEX(650,760,250,vis,ob(GT,ps(10)-.1,.4),GT>tAlc);
 if(GT>tCur)ui+=`<g transform="translate(650 1270) rotate(-8) scale(${R2(pop(GT,tCur),3)})"><rect x="-210" y="-62" width="420" height="124" rx="16" fill="none" stroke="${RED}" stroke-width="14"/><text y="30" font-size="84" text-anchor="middle" font-family="Poppins" font-weight="900" fill="${RED}">CURTO!</text></g>`;
 if(GT>tAlc){const k=ob(GT,tAlc,.5);ui+=`<ellipse cx="300" cy="1560" rx="${R2(330*k)}" ry="${R2(70*k)}" fill="rgba(255,77,109,.12)" stroke="${RED}" stroke-width="8" stroke-dasharray="26 16"/>`}
 FX.ui=ui;camA([[ps(10)-.2,.05,0,0,-1],[ps(12),.1,0,-20,1]]);FX.lit={amb:[.95,.9,1.1],rim:[210,170,255],d:[0,-1],sh:.3,ri:1};FX.vig=.6;FX.shake=5*sh1(GT,[tN1,tN2,tN3,tAlc],9)},'flashP');
// ===== 8) ORA ORA ORA: o letreiro cai, a rajada de socos =====
const tPis=wt(12,'piscar',0),tChu=wt(12,'chuva',0),tSoc=wt(12,'socos',0),tO1=wk(13,0,0),tO2=wk(13,1,0),tO3=wk(13,2,0),tOend=pe(13);
shot('twn',ps(12)-.25,(t,u)=>{
 const rush=GT>tSoc-.1&&GT<tOend+.15,fin=tOend-.1;
 put('T1',1.0,0,4.4,{m:GT<tOend?'scared':'awe',look:[-4,-10],brow:6,rot:GT<tOend?4*sn(GT*20):0,extra:GT<tOend?SWEAT(-80,-300,.8):''});put('T2',1.6,0,3.8,{m:GT<tOend?'shock':'happy',look:[-6,-10],aR:-60,aL:60});
 cj(-1.1,5.4,{m:GT<tPis?'focus':'angry',brow:7,look:[8,-6],aR:-20,aL:20});const p=C.CJ.sp,ku=p[2];
 const dash=ob(GT,tSoc-.25,.25),S=stPlace('CJ',lp(130,420,dash),-200,.62);
 const fr=Math.floor(GT*30),hit=rush?1:0;stDraw(S,'S1','sp',{aura:1,face:rush?'shout':'stern',aR:rush?[-150+20*sn(fr*1.7),-6,'fist']:[-16,12,'fist'],aL:rush?[-130+20*sn(fr*2.3),-10,'fist']:[16,-12,'fist'],back:'L',wind:1.6,lean:rush?8:0,legs:.7});spEyes(S,1);
 // letreiro: cai do alto, para no ar sob a rajada e explode em pedacos
 const fall=cl((GT-ps(12))/(tSoc-ps(12))),sy=lp(-500,p[1]-760*ku,fall*fall),sx=p[0]+640*ku,ssc=ku*.75,brk=GT>fin;
 if(!brk)fw(SIGN(sx,sy+(rush?10*sn(GT*80):0),ssc,8*sn(GT*2)+(rush?3*sn(GT*60):0),rush?(GT-tSoc)/(fin-tSoc):0));
 else{let o='';for(let i=0;i<14;i++){const d=GT-fin,an=rnd(i,2.2)*6.283,v=(600+900*rnd(i,5.5))*ku;o+=SHARD(sx+cs(an)*v*d,sy+sn(an)*v*d*.8+900*d*d*ku,ssc*(.8+.8*rnd(i,3.1)),d*400*(rnd(i,7.7)-.5),i)}fw(o)}
 if(rush){const c=[sx-120*ku,sy+120*ku];fw(RUSH(c[0],c[1],320*ku,ku*1.45,1,GT)+BURST(c[0]+40*ku*sn(fr),c[1]+30*ku*cs(fr*1.3),120*ku,Math.floor(GT*12)/12,'#fff',PU,.08))}
 if(brk)fw(BURST(sx,sy,320*ku,fin,'#fff',GD,.5)+RING(sx,sy,fin,.6,900*ku,'#fff',22));
 let ui='';[[tO1,300,250,-14],[tO2,770,420,10],[tO3,360,600,-8]].forEach(([to,x,y,r],i)=>{if(GT>to)ui+=JTXT('ORA!',x,y,124+i*18,'#fff',r,pop(GT,to)*(1+.04*sn(GT*30)),PU2)});
 if(GT>tChu&&GT<tSoc)ui+=JTXT('CHUVA DE SOCOS',540,320,74,GD,-5,pop(GT,tChu),GD2);
 if(rush)ui+=SPEEDL(.5,-10,30,'#fff');FX.ui=ui;
 const F0=foc(p[0]+330*ku,p[1]-420*ku,.12),F1=foc(sx-200*ku,sy+180*ku,.4);camA([[ps(12)-.25,.1,F0[0],F0[1],-1],[tSoc-.1,.18,F0[0],F0[1],1],[tSoc,.5,F1[0],F1[1],-3,'c'],[fin,.62,F1[0],F1[1],2],[fin+.02,.25,F0[0],F0[1],0,'c'],[ps(14),.2,F0[0],F0[1],0]]);
 FX.lit=LIT.twn;FX.shake=(rush?14:0)+22*sh1(GT,[fin],4);FX.flash=Math.max(rush?.08*ab(sn(GT*40)):0,.6*sh1(GT,[fin],8));FX.chroma=rush?4:0;FX.impact=GT>fin&&GT<fin+.07},'wl');
// ===== 9) A BALA A QUEIMA-ROUPA =====
const tBa2=wt(14,'bala',0),tQue=wt(14,'queima-roupa',0);
shot('twn',ps(14)-.2,(t,u)=>{
 cj(.28,7.4,{m:GT<tQue?'focus':'cool',brow:5,look:[-10,0],still:1,aR:-12,aL:12,wind:.3});const p=C.CJ.sp,ku=p[2],e=eyeP('CJ');
 const S=stPlace('CJ',60,-180,.6),bt=[e[0]-120*ku,e[1]+4*ku],tg=LOC(S,bt[0],bt[1]),ik=IK(-1,tg[0],tg[1],128,-1),k=ob(GT,tQue-.25,.25);
 stDraw(S,'S1','sp',{aura:1,face:'stern',aL:[lp(30,ik[0],k),lp(-20,ik[1],k),k>.55?'pinch':'open'],aR:[-16,12,'fist'],back:'R',wind:.4});spEyes(S,1);
 const sl=GT>tBa2&&GT<tQue,mz=[e[0]-255*ku,e[1]+6*ku];
 fw(`<g transform="translate(${R2(mz[0]-104*ku)} ${R2(mz[1])}) scale(${R2(ku,3)})"><rect x="-200" y="-26" width="300" height="52" rx="8" fill="#2a2a34" ${ST7}/><rect x="60" y="-18" width="44" height="36" fill="#15151c"/></g>`);
 if(GT>tBa2-.02&&GT<tBa2+.15)fw(BURST(mz[0]+10*ku,mz[1],120*ku,tBa2,'#fff6c8','#ffb300',.15));
 const bk=cl((GT-tBa2)/(tQue-tBa2)),bp=GT<tQue?[lp(mz[0]+20*ku,bt[0],bk),bt[1]]:SPT(S,...FK(-1,ik[0],ik[1],128));
 if(GT>tBa2)fw(BULLET(bp[0],bp[1],0,ku*.42,GT<tQue?1:0)+(sl?RING(bp[0]-30*ku,bp[1],Math.floor(GT*8)/8,.4,120*ku,'#e6f0ff',6):''));
 let ui='';if(GT>tQue)ui+=JTXT('À QUEIMA-ROUPA!',540,330,80,'#fff',-5,pop(GT,tQue),PU2)+JTXT('PEGOU!',540,450,96,GD,-5,pop(GT,tQue+.15),GD2);
 FX.ui=ui;const F=foc(e[0]-150*ku,e[1]+40*ku,.55);camA([[ps(14)-.2,.45,F[0],F[1],-2],[tQue,.62,F[0],F[1],1],[ps(15),.68,F[0],F[1],0]]);
 FX.lit=LIT.twn;FX.dof=6;FX.tint=sl?[60,40,120,.12]:null;FX.shake=8*sh1(GT,[tBa2],8)+10*sh1(GT,[tQue],7);FX.flash=.35*sh1(GT,[tQue],10);FX.flcol='255,250,220'},'zoom');
// ===== 10) PONTO 2: precisao e visao (close no olho do Stand) =====
shot(null,ps(15)-.25,(t,u)=>{FX.bg=c=>cosmos(c,GT,{c0:'#1a2d6a',c1:'#060a24',k:.8,dr:.2});
 const S={x:540,y:1900,ku:3.2,hy:0,ss:1,fl:1,z:2};stDraw(S,'S1','sp',{aura:.6,face:'stern',...REST,wind:.9,legs:0});spEyes(S,1.3);
 const L=SPT(S,-24,-455),R=SPT(S,24,-455);let s='';[L,R].forEach((q,j)=>{s+=`<g transform="translate(${R2(q[0])} ${R2(q[1])})" fill="none"><circle r="${R2(60+6*sn(GT*5))}" stroke="${CYN}" stroke-width="4" stroke-dasharray="14 9" transform="rotate(${R2(GT*80*(j?1:-1))})"/><circle r="92" stroke="#fff" stroke-width="2" stroke-dasharray="40 20 6 20" transform="rotate(${R2(-GT*50)})"/></g>`});
 fw(s+SCAN(L[0],L[1],ps(16)-.7,.8,1200,CYN)+SCAN(R[0],R[1],ps(16)-.7,.8,1200,CYN));
 FX.ui=JCARD(ps(15)-.2,ps(16)-.1,2,'PRECISÃO E VISÃO',CYN,'#0a3a6a');camA([[ps(15)-.25,.2,0,520,0],[ps(16),.55,0,640,1]]);
 FX.lit={amb:[.9,.95,1.1],rim:[150,230,255],d:[0,-1],sh:.3,ri:1};FX.vig=.7},'zoom');
// ===== 11) A FOTO: uma mosca minuscula =====
const tEnx=wt(16,'enxerga',0),tMos=wt(16,'mosca',0),tFot=wt(16,'foto',0);
shot('liv',ps(16)-.2,(t,u)=>{
 const zk=ob(GT,tMos-.1,.45),lx=lp(860,752,zk),ly=lp(1210,1130,zk);
 let ui=PHOTO(540,1000,1.25,-4,1);
 if(GT>tEnx){const a=ob(GT,tEnx,.3),r=210*a;ui+=`<defs><clipPath id="lens"><circle cx="${R2(lx)}" cy="${R2(ly)}" r="${R2(r)}"/></clipPath></defs><g clip-path="url(#lens)"><rect x="0" y="0" width="1080" height="1920" fill="#251a3a"/>${FLY(lx,ly+20,lp(.25,1.7,zk),GT)}</g><circle cx="${R2(lx)}" cy="${R2(ly)}" r="${R2(r)}" fill="none" stroke="${INK}" stroke-width="26"/><circle cx="${R2(lx)}" cy="${R2(ly)}" r="${R2(r)}" fill="none" stroke="${CYN}" stroke-width="10"/><path d="M${R2(lx+r*.7)} ${R2(ly+r*.7)}L${R2(lx+r*1.25)} ${R2(ly+r*1.25)}" stroke="${INK}" stroke-width="44" stroke-linecap="round"/><path d="M${R2(lx+r*.7)} ${R2(ly+r*.7)}L${R2(lx+r*1.25)} ${R2(ly+r*1.25)}" stroke="#7a5cd6" stroke-width="26" stroke-linecap="round"/>`}
 if(GT>tMos)ui+=JTXT('ZOOM x1000',540,300,80,CYN,-5,pop(GT,tMos),'#0a3a6a')+JTXT('UMA MOSCA!',540,420,96,'#fff',-5,pop(GT,tMos+.3),PU2);
 else ui+=JTXT('A FOTO DO INIMIGO',540,330,70,'#fff',-5,pop(GT,ps(16)),PU2);
 FX.ui=ui;camA([[ps(16)-.2,.05,0,0,0]]);FX.dof=6;FX.lit=LIT.liv;FX.vig=.7},'wl');
// ===== 12) O ESBOCO E O MAPA: Egito =====
const tAss2=wt(17,'assim',0),tIni=wt(17,'inimigo',0),tEgi=wt(17,'Egito',0);
shot('liv',ps(17)-.2,(t,u)=>{
 const sk=cl((GT-ps(17)+.1)/(tIni-ps(17)-.1)),mp=ob(GT,tIni-.1,.35);
 let ui=SKETCH(sk,1-cl((GT-tIni+.1)/.25));
 if(sk<1&&sk>0){const q=[540+260*sn(GT*41),1000+300*cs(GT*37)];ui+=`<g transform="translate(${R2(q[0])} ${R2(q[1])}) rotate(-30)"><rect x="-10" y="-150" width="20" height="150" fill="#ffd23f" ${ST4}/><path d="M-10 0L0 30L10 0Z" fill="#f1c9a0" ${ST4}/></g>`;for(let i=1;i<4;i++){const q2=[540+260*sn((GT-i*.02)*41),1000+300*cs((GT-i*.02)*37)];ui+=`<circle cx="${R2(q2[0])}" cy="${R2(q2[1])}" r="${30-i*6}" fill="${PU}" opacity="${R2(.4-i*.1,2)}"/>`}}
 ui+=MAP(mp,GT>tEgi?1:0,tEgi);
 if(GT>tEgi)ui+=JTXT('EGITO!',540,330,130,GD,-6,pop(GT,tEgi),GD2);else if(sk>.05&&GT<tIni)ui+=JTXT('DESENHO EM 1 SEGUNDO',540,330,62,'#fff',-5,pop(GT,ps(17)+.1),PU2);
 FX.ui=ui;camA([[ps(17)-.2,0,0,0,0]]);FX.dof=6;FX.lit=LIT.liv;FX.vig=.7;FX.shake=8*sh1(GT,[tEgi],7)},'wr');
// ===== 13) PONTO 3: o poder mais assustador (relogio gigante) =====
const tMai=wt(18,'assustador',0);
shot(null,ps(18)-.25,(t,u)=>{FX.bg=c=>cosmos(c,GT,{c0:'#3a0a2a',c1:'#0a0212',k:.8,dr:-.5,warm:1});
 const sp=GT<tMai?GT*3.5:tMai*3.5+(GT-tMai)*.15;FX.ui=CLOCK(540,1150,430,sp*6.283,.9,'#f6e6ff')+JCARD(ps(18)-.2,ps(19)-.1,3,'O PODER MAIS ASSUSTADOR',RED,'#4a0a1a');
 const S={x:540,y:1950,ku:1.7,hy:0,ss:.9,fl:1,z:2};stDraw(S,'S1','sp',{aura:1,face:'stern',...CROSS,wind:1.2,legs:0,alpha:.95});spEyes(S,1.2,'255,120,160');
 fw(GOGO(140,1500,1,1,4)+GOGO(940,1400,.9,1,4,.5,'#ff7aa0','#6a0a2a'));
 camA([[ps(18)-.25,.1,0,0,-2],[ps(19),.25,0,60,2]]);FX.lit={amb:[.9,.75,.9],rim:[255,120,160],d:[0,-1],sh:.4,ri:1};FX.vig=.8;FX.shake=10*sh1(GT,[tMai],6);FX.flash=.4*sh1(GT,[tMai],9);FX.flcol='255,80,120'},'dip');
// ===== 14) STAR PLATINUM: THE WORLD =====
const tSP=wt(19,'Star',0),tWor=wt(19,'World',.2),tVoc=wt(20,'Você',0),tTem=wt(20,'tempo',0),tTS=tWor+.15;
const WALKERS=[['T1',-2.0,3.6,1,.9],['T3',1.8,2.6,-1,.8],['R4',-1.2,.6,1,.7],['R5',2.2,4.6,-1,1.1],['T2',.8,-1.5,1,.75]];
const crowd=(fr,T,sc=1)=>WALKERS.forEach(([k,x0,z,d,s],i)=>{const tt=Math.min(GT,T),x=x0+d*.55*(tt-ps(19)+.2)*s;put(k,x,0,z,{...walk(tt,9,1),flip:d,m:i%2?'happy':'talk',talk:fr>.5?0:.6,frz:fr,still:fr>.5,nodrift:fr>.5,noblink:fr>.5})});
const BIRDS=(fr,T,ox=0,oy=0)=>{let s='';const tt=Math.min(GT,T);for(let i=0;i<6;i++){const x=ox+((rnd(i,3.3)*1200+tt*(160+60*rnd(i,1.1)))%1300)-120,y=oy+380+rnd(i,7.7)*420+20*sn(tt*3+i);s+=BIRD(x,y,.9+.5*rnd(i,5.5),tt*(3+rnd(i,2))+i*.3,fr>.5?.8:1,fr>.5?'#d8d2f0':'#f2eefa',i%2?1:-1)}return s};
shot('twn2',ps(19)-.2,(t,u)=>{
 const frz=frzK(tTS);crowd(frz,tTS+.45);
 cj(0,6.2,{m:GT<tTS?'focus':'cool',brow:5,aR:-14,aL:14,look:[0,-2]});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',-30,-200,.6),rz=ob(GT,tSP-.05,.4),cl2=GT>tTS-.1;stDraw(S,'S1','sp',{aura:1+.5*sh1(GT,[tTS],3),face:GT>tWor-.3&&GT<tTS+.4?'shout':'stern',aR:[lp(-16,-150,rz),lp(12,-40,rz),cl2?'fist':'open'],aL:[16,-12,'fist'],back:'L',wind:GT<tTS?1:.05,t:GT<tTS?GT:tTS});spEyes(S,1);
 fw(BIRDS(frz,tTS+.45));const c0=SPT(S,0,-280);TSPHERE(c0[0],c0[1],tTS,.6,.3,.4);
 FX.alt=frz;FX.frzc='f';
 let ui='';if(GT>tSP-.05)ui+=JTXT('STAR PLATINUM',540,270,96,GD,-6,pop(GT,tSP-.05),GD2);if(GT>tWor-.1)ui+=JTXT('THE WORLD',540,400,124,'#fff',-6,pop(GT,tWor-.1)*(1+.03*sn(GT*8)),PU2);
 if(GT>tTem)ui+=JTXT('TEMPO PARADO',540,1430,80,CYN,-5,pop(GT,tTem),PU2);
 if(GT>tTS+.8)ui+=CLOCK(880,640,110,(tTS+.8)*3,1);
 FX.ui=ui;const F=foc(p[0],p[1]-300*ku,.12),F2=foc(c0[0],c0[1],.35);camA([[ps(19)-.2,.2,F[0],F[1],-2],[tWor-.2,.3,F2[0],F2[1],0],[tTS,.15,F[0],F[1],0,'c'],[ps(21),.1,F[0],F[1]+30,-2]]);
 FX.lit=frz>.5?{amb:[.85,.82,1],rim:[210,180,255],d:[0,-1],sh:.35,ri:1}:LIT.twn2;FX.shake=4*sh1(GT,[tSP],8)+14*sh1(GT,[tTS],5);FX.flash=.4*sh1(GT,[tTS],10);FX.flcol='240,220,255';FX.pfT=Math.min(GT,tTS)},'dip');ALT('f');
// ===== 15) TUDO CONGELA, SO VOCE SE MOVE (travelling lateral) =====
const tChv=wt(21,'Chuva',0),tPas=wt(21,'pássaros',0),tPes=wt(21,'pessoas',0),tCon=wt(21,'congela',0),tSoV=wt(22,'Só',0),T15=ps(21)-.2;
shot('twn2',T15,(t,u)=>{
 const wx=lp(-1.6,1.2,cl((GT-T15)/(ps(23)-T15)));
 put('T1',-1.1,0,6.4,{m:'shock',lg:24,aR:-110,aL:70,rot:-8,frz:1,still:1,noblink:1,bobv:-60,nodrift:1});
 put('T3',1.5,0,5.0,{m:'happy',lg:-20,aR:-30,aL:40,frz:1,still:1,noblink:1,flip:-1,nodrift:1,hold:`<rect x="-14" y="-30" width="28" height="40" rx="6" fill="#fff" ${ST4}/>`});
 put('R4',.3,0,3.6,{m:'talk',lg:16,aR:30,aL:-20,frz:1,still:1,noblink:1,nodrift:1});
 cj(wx,6.6,{...walk(GT,8.5,1),m:GT<tSoV?'cool':'grin',brow:4,look:[6,0]});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',-40,-190,.56);stDraw(S,'S1','sp',{aura:.8,face:'stern',...REST,wind:.6,legs:.5,alpha:.9});spEyes(S,.8);
 const T1=C.T1.sp;fw(`<g transform="translate(${R2(T1[0]+40*T1[2])} ${R2(T1[1]-420*T1[2])}) scale(${R2(T1[2],3)})"><circle r="40" fill="#fff" ${ST5}/><path d="M-40 0Q0 -20 40 0M-30-26Q0 0 30-26" fill="none" stroke="#e33" stroke-width="5"/></g>`);
 fw(RAIN(GT,GT>tChv-.2?1:.6,1,[-300,-300,1380,2220],110,7,'210,220,255',3.1)+BIRDS(1,tTS+.45,-200,-60));
 const hl=(t0,x,y,txt)=>GT>t0?JTXT(txt,x,y,64,'#fff',-5,pop(GT,t0),PU2):'';
 let ui=hl(tChv,300,300,'CHUVA')+hl(tPas,760,300,'PÁSSAROS')+hl(tPes,540,420,'PESSOAS');if(GT>tCon)ui+=JTXT('TUDO CONGELA',540,560,90,CYN,-6,pop(GT,tCon),PU2);if(GT>tSoV)ui=JTXT('SÓ VOCÊ SE MOVE',540,360,96,GD,-6,pop(GT,tSoV),GD2);
 FX.ui=ui;const F=foc(p[0],p[1]-260*ku,.18);camA([[T15,.2,F[0]+120,F[1],0],[ps(23),.2,F[0]-60,F[1],0]]);
 FX.alt=1;FX.frzc='f';FX.lit={amb:[.85,.82,1],rim:[210,180,255],d:[0,-1],sh:.35,ri:1};FX.vig=.6},'');ALT('f');
// ===== 16) SO POR ALGUNS SEGUNDOS, NUNCA DUAS VEZES SEGUIDAS =====
const tSeg=wt(23,'segundos',0),tNun=wt(23,'nunca',0),tVez=wt(23,'vezes',0),T16=ps(23)-.25;
shot('twn2',T16,(t,u)=>{
 const back=cl((GT-tSeg)/.3),ret=GT>tSeg,tr=GT-tSeg;
 crowd(1-back,tTS+.45+Math.max(0,tr));
 cj(0,6.2,{m:GT<tSeg?'cool':GT<tNun?'strain':'shock',brow:6,aR:GT>tNun?tw(-14,-150,tNun,.3):-14,aL:14,extra:ret?SWEAT(-80,-300,.9):'',sq:SQ(tVez,1)});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',-30,-200,.6),try2=GT>tNun;stDraw(S,'S1','sp',{aura:try2?.4+.3*sn(GT*20):.9,face:try2?'shout':'stern',aR:try2?[-150,-40,'fist']:[-16,12,'fist'],aL:[16,-12,'fist'],back:'L',wind:GT<tSeg?.05:1});spEyes(S,1);
 fw(BIRDS(1-back,tTS+.45+Math.max(0,tr)*1.5));
 const v=cl((GT-T16)/(tSeg-T16))*2;let ui='';
 if(GT<tSeg+.6)ui+=WATCH(540,560,170,v/5,GT<tSeg?v.toFixed(1).replace('.',',')+' s':'FIM!',1-cl((GT-tSeg-.3)/.3));
 if(GT>tNun){const a=ob(GT,tNun,.3);ui+=`<g opacity="${R2(cl(a),2)}" transform="translate(540 600)"><rect x="-330" y="-46" width="660" height="92" rx="46" fill="#1a1030" ${ST7}/><rect x="-312" y="-28" width="${R2(624*cl((GT-tNun)/2.5))}" height="56" rx="28" fill="${RED}"/></g>`+JTXT('RECARREGANDO...',540,470,64,'#fff',-4,pop(GT,tNun),PU2)}
 if(GT>tVez)ui+=`<g transform="translate(${R2(SPT(S,FK(1,-150,-40,80)[0],0)[0])} 1000) scale(${R2(pop(GT,tVez),3)})"><path d="M-90-90L90 90M90-90L-90 90" stroke="${INK}" stroke-width="46" stroke-linecap="round"/><path d="M-90-90L90 90M90-90L-90 90" stroke="${RED}" stroke-width="26" stroke-linecap="round"/></g>`;
 FX.ui=ui;const F=foc(p[0],p[1]-300*ku,.1);camA([[T16,.1,F[0],F[1],0],[tSeg,.18,F[0],F[1],-2,'c'],[ps(24),.12,F[0],F[1],1]]);
 FX.alt=1-back;FX.frzc='f';FX.lit=back<.5?{amb:[.85,.82,1],rim:[210,180,255],d:[0,-1],sh:.35,ri:1}:LIT.twn2;FX.flash=.5*sh1(GT,[tSeg],8);FX.flcol='255,240,220';FX.shake=10*sh1(GT,[tSeg],6)+8*sh1(GT,[tVez],7)},'');ALT('f');
// ===== 17) DEZ ANOS DEPOIS: meio segundo! (cozinha) =====
const tDez=wt(24,'Dez',0),tCons=wt(24,'conseguia',0),tPar2=wt(24,'parar',0),tMei=wt(24,'meio',0),T17=ps(24)-.2;
shot('kit',T17,(t,u)=>{
 const st=tPar2-.1,en=st+.5,frz=GT>st&&GT<en?1:0;
 cj(-.45,-1.4,{m:GT<st?'focus':GT<en?'cool':'shock',brow:5,aR:GT>st-.3?-120:-14,aL:14,sq:SQ(en,1),extra:GT>en?SWEAT(-80,-300,1)+SWEAT(80,-280,.8):''});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',-40,-190,.56);stDraw(S,'S1','sp',{aura:.8,face:GT>st-.2&&GT<en?'shout':'stern',aR:GT>st-.3?[-150,-40,'fist']:[-16,12,'fist'],aL:[16,-12,'fist'],back:'L',wind:frz?0:.8,t:frz?st:GT});spEyes(S,1);
 // a xicara cai da mesa: para por meio segundo e volta a cair
 const tc=GT<st?GT:GT<en?st:GT-.5,c0=st-.35,fy=tc>c0?Math.min(1,(tc-c0)*(tc-c0)*2.6):0,top=P3(.62,.95,-2.75),flo=P3(.62,0,-2.4),cx=top[0],cy=lp(top[1]-30*top[2],flo[1]-20*top[2],fy),broke=fy>=1;
 if(!broke)fw(`<g transform="translate(${R2(cx)} ${R2(cy)}) rotate(${R2(fy*200)}) scale(${R2(top[2]*.8,3)})"><path d="M-46-40H46L36 40H-36Z" fill="#fff" ${ST7}/><path d="M46-20Q80-20 70 10Q64 26 40 20" fill="none" ${ST7}/><path d="M-40-30H40" stroke="#c86bff" stroke-width="10"/></g>`);
 else fw(BURST(cx,flo[1],120*top[2],c0+Math.sqrt(1/2.6)+.5,'#fff','#ddd',.3)+[...Array(6).keys()].map(i=>SHARD(cx+(i-2.5)*40*top[2],flo[1]-20*top[2]-24*top[2]*rnd(i,3),top[2]*.4,i*50,1)).join(''));
 let ui='';if(GT>tDez-.1&&GT<tCons)ui+=`<g opacity="${R2(cl((GT-tDez+.1)/.2),2)}"><rect x="0" y="230" width="1080" height="190" fill="#2a1d10" opacity=".85"/></g>`+JTXT('10 ANOS DEPOIS...',540,355,90,'#ffe3a8',-3,pop(GT,tDez),'#5a3a10');
 if(GT>st)ui+=WATCH(540,640,150,GT<en?(GT-st)/5:.1,GT<en?((GT-st)).toFixed(1).replace('.',',')+' s':'0,5 s',1);
 if(GT>tMei)ui+=JTXT('MEIO SEGUNDO?!',540,330,96,RED,-5,pop(GT,tMei),'#5a0a1a');
 FX.ui=ui;const F=foc(p[0]+230*ku,p[1]-260*ku,.12);camA([[T17,.12,F[0],F[1],0],[tMei,.22,F[0],F[1],-2],[ps(25),.25,F[0],F[1],1]]);
 FX.alt=frz;FX.frzc='f';FX.grade=GT<tCons?'sepia(.5)':'';FX.lit=LIT.kit;FX.flash=.4*sh1(GT,[st,en],12);FX.flcol='230,210,255';FX.shake=10*sh1(GT,[en+.6],6)},'flashO');ALT('f');
// ===== 18) A MESMA DOR =====
const tMac=wt(25,'machucar',0),tSen=wt(25,'sente',0),tDor=wt(25,'dor',0),T18=ps(25)-.25;
shot('twn3',T18,(t,u)=>{
 const hit=tMac+.05;cj(-.7,6.0,{m:GT<hit?'focus':'strain',brow:8,aR:-14,aL:GT>hit?tw(14,70,hit,.25):14,sq:SQ(hit,1.2),extra:GT>tSen?SWEAT(-80,-300,.9):'',look:[-6,4]});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',170,-190,.6);stDraw(S,'S1','sp',{aura:1,face:GT>hit?'shout':'stern',...GUARD,wind:1,lean:GT>hit?-8*sh1(GT,[hit],4):0});spEyes(S,1);
 // punho dourado (do rival) entra pela direita e acerta o antebraco do Stand
 const fa=SPT(S,...FK(1,-38,140,-60)),gk=cl((GT-T18)/(hit-T18));fw(`<g transform="translate(${R2(lp(1500,fa[0]+90*ku,ez(gk)))} ${R2(fa[1])}) scale(${R2(-ku*.9,3)} ${R2(ku*.9,3)})">${`<path d="M-200 -40L-40 -46L-40 46L-200 40Z" fill="${GSC.au}" ${ST7}/><circle cx="10" cy="0" r="62" fill="${GSC.gy}" ${ST7}/>`}</g>`);
 const ca=cl((GT-hit)/.2);fw(BURST(fa[0]+60*ku,fa[1],140*ku,hit,'#fff',GD)+CRACK(fa[0],fa[1],ku*1.2,ca));
 const ha=[p[0]-75*ku,p[1]-110*ku];if(GT>tSen)fw(CRACK(ha[0],ha[1],ku*.8,cl((GT-tSen)/.2))+`<path d="M${R2(fa[0])} ${R2(fa[1])}Q${R2((fa[0]+ha[0])/2)} ${R2(fa[1]-200*ku)} ${R2(ha[0])} ${R2(ha[1])}" fill="none" stroke="${RED}" stroke-width="${R2(8*ku)}" stroke-dasharray="${R2(24*ku)} ${R2(14*ku)}" stroke-dashoffset="${R2(-GT*200)}" opacity=".9"/>`);
 let ui='';if(GT>tSen)ui+=JTXT('A MESMA DOR',540,330,104,RED,-5,pop(GT,tSen),'#5a0a1a');if(GT>tDor)ui+=JTXT('AI!',300,620,110,'#fff',-10,pop(GT,tDor),PU2);
 FX.ui=ui;const F=foc(p[0]+200*ku,p[1]-260*ku,.15);camA([[T18,.15,F[0],F[1],0],[hit,.3,F[0],F[1],-3,'c'],[ps(26),.22,F[0],F[1],1]]);
 FX.lit={...LIT.twn3,rim:[255,120,140]};FX.vig=.75;FX.shake=22*sh1(GT,[hit],5)+8*sh1(GT,[tDor],7);FX.flash=.5*sh1(GT,[hit],10)+.3*sh1(GT,[tDor],8);FX.flcol=GT>tDor?'255,40,60':'255,240,200';FX.tint=GT>tSen?[200,0,30,.08+.05*ab(sn(GT*8))]:null},'wr');
// ===== 19) USUARIOS DE STAND SE ATRAEM... um Stand dourado =====
const tUsu=wt(26,'usuários',0),tAtr=wt(26,'atraem',0),tCed=wt(27,'Cedo',0),tDou=wt(27,'dourado',0),tVo2=wt(27,'você',0),T19=ps(26)-.2;
shot('str',T19,(t,u)=>{
 const close=GT>tCed-.1,app=cl((GT-T19)/(tCed-T19));
 if(!close){cj(-.7,-1.6-1.0*app,{...walk(GT,7,1),m:'focus',brow:6,look:[8,-2]});put('RV',.6,0,-9+1.6*app,{...walk(GT,6,1),flip:-1,m:'smirk',back:RV_BACK(GT,.8)});
  const a=C.CJ.sp,b=C.RV.sp;fw(`<path d="M${R2(a[0]+60)} ${R2(a[1]-160*a[2])}Q540 ${R2(a[1]-500)} ${R2(b[0]-40)} ${R2(b[1]-160*b[2])}" fill="none" stroke="${GD}" stroke-width="10" stroke-dasharray="30 20" stroke-dashoffset="${R2(-GT*300)}" opacity=".85"/>`+GOGO(160,900,1,cl((GT-tAtr)/.3),4)+GOGO(920,850,.9,cl((GT-tAtr)/.3),4,.5,GD,GD2));
  FX.ui=GT>tAtr?JTXT('SE ATRAEM',540,330,110,GD,-6,pop(GT,tAtr),GD2):'';camA([[T19,.05,0,-80,0],[tCed,.12,0,-140,0]])}
 else{put('RV',.1,0,-2.4,{flip:-1,m:GT<tDou?'smirk':'grin',brow:6,fr:'L',hold:GT>tVo2?FINGER:undefined,aL:GT>tVo2?tw(14,118,tVo2,.3):14,aR:-14,back:RV_BACK(GT,1),look:[-4,0]});const p=C.RV.sp,ku=p[2];
  const a=cl((GT-tDou+.3)/.6),S=stPlace('RV',-30,lp(-40,-200,ez(a)),.62,-1);stDraw(S,'S2','gold',{alpha:a,aura:a*1.2,aL:[30,-40,'open'],aR:[-30,40,'open'],back:'L',legs:.6});gsEyes(S,a);
  fw(GOGO(p[0]-330*ku,p[1]-300*ku,ku*.8,a,4,0,GD,GD2)+GOGO(p[0]+330*ku,p[1]-460*ku,ku*.7,a,3,.5,GD,GD2));
  const c0=SPT(S,0,-280);FX.rays=[[c0[0],c0[1],.45*a,'255,220,120',18,1700]];
  let ui='';if(GT>tDou)ui+=JTXT('UM STAND',540,270,90,'#fff',-6,pop(GT,tDou-.1),GD2)+JTXT('DOURADO',540,395,130,GD,-6,pop(GT,tDou),GD2);
  FX.ui=ui;const F=foc(p[0],p[1]-330*ku,.2);camA([[tCed-.1,.42,F[0],F[1]+300,3],[tDou,.24,F[0],F[1]+180,0],[ps(28),.2,F[0],F[1]+170,-1]])}
 FX.lit=close?{amb:[.9,.85,.7],rim:[255,210,100],d:[1,-.6],sh:.4,ri:1}:LIT.str;FX.fog=1;FX.vig=.75;FX.shake=10*sh1(GT,[tDou],5);FX.flash=.45*sh1(GT,[tDou],9);FX.flcol='255,230,150'},'dip');
// ===== 20) ELE TAMBEM PARA O TEMPO... mas voce se move =====
const tTam=wt(28,'também',0),tPara=wt(28,'pararia',0),tMas=wt(29,'mas',0),tMov2=wt(29,'moveria',0),T20=ps(28)-.25,tGS=tPara+.1;
shot('str',T20,(t,u)=>{
 const frz=frzK(tGS),wkk=cl((GT-tGS-.8)/(tMas-tGS-.8));
 cj(-.75,-2.4,{m:GT<tMas?'focus':'angry',brow:GT>tMas?8:4,still:GT>tGS&&GT<tMas,noblink:GT>tGS&&GT<tMas,frz:GT<tMas?frz:cl(1-(GT-tMas)/.2),look:GT>tMas?[10,0]:[2,0],wind:GT<tGS?1:0});
 put('RV',lp(1.0,.55,ez(wkk)),0,lp(-6.5,-3.6,ez(wkk)),{...(wkk>0&&wkk<1&&GT<tMas?walk(GT,6,.8):{}),flip:-1,m:GT<tMas?'grin':'shock',brow:6,fr:'R',aR:GT>tPara-.2&&GT<tGS+.5?-130:-14,aL:14,back:RV_BACK(GT,GT<tGS?1:.1),extra:GT>tMas?SWEAT(70,-300,.9):''});
 const q=C.RV.sp,S=stPlace('RV',-40,-190,.6,-1);stDraw(S,'S2','gold',{aura:1,aL:[GT>tPara-.2?-150:20,-30,'open'],aR:[-20,20,'open'],back:'R',legs:.5});gsEyes(S,1);
 const c0=SPT(S,0,-280);TSPHERE(c0[0],c0[1],tGS,.6,.3,.4);FX.alt=frz;FX.frzc='g';
 const p=C.CJ.sp,ku=p[2],e=eyeP('CJ');if(GT>tMas){(FX.gls=FX.gls||[]).push([e[0]+25*ku,e[1],60*ku,'255,255,255',.9*sh1(GT,[tMas],4)])}
 let ui='';if(GT>tTam)ui+=JTXT('ELE TAMBÉM',540,280,90,GD,-6,pop(GT,tTam),GD2);if(GT>tGS)ui+=JTXT('PARA O TEMPO!',540,400,96,'#fff',-6,pop(GT,tGS),GD2);
 if(GT>tMas)ui=JTXT('MAS VOCÊ',540,280,90,CYN,-6,pop(GT,tMas),PU2)+JTXT('SE MOVE!',540,410,120,'#fff',-6,pop(GT,tMov2),PU2)+(GT>tMov2+.2?JTXT('?!',q[0]>540?820:260,640,140,GD,8,pop(GT,tMov2+.2),GD2):'');
 FX.ui=ui;const F=foc((p[0]+q[0])/2,p[1]-260*ku,.12),Fe=foc(e[0],e[1],1.2);camA([[T20,.1,F[0],F[1],0],[tMas-.05,.2,F[0],F[1],-1],[tMas,1.2,Fe[0],Fe[1],0,'c'],[tMov2+.1,1.3,Fe[0],Fe[1],1],[tMov2+.15,.15,F[0],F[1],0,'c'],[ps(30),.15,F[0],F[1],0]]);
 FX.lit=frz>.5?{amb:[.95,.88,.7],rim:[255,210,100],d:[1,-.6],sh:.4,ri:1}:LIT.str;FX.fog=1;FX.vig=.75;FX.shake=12*sh1(GT,[tGS],6)+8*sh1(GT,[tMas],7);FX.flash=.4*sh1(GT,[tGS],9);FX.flcol='255,230,150'},'wl');ALT('g');
// ===== 21) VOCE AVANCA, PASSA POR ELE... ORA! =====
const tAva=wt(30,'avança',0),tPss=wt(30,'passa',0),tGol=wt(30,'golpe',0),tORA=ps(31),T21=ps(30)-.2;
shot('str',T21,(t,u)=>{
 const run=cl((GT-tAva+.1)/(tPss+.3-tAva+.1)),x=lp(-.75,1.5,ez(run)),hitT=tORA,post=GT>hitT;
 put('RV',.55,0,-3.6,{flip:-1,m:post?'shock':'shock',brow:8,still:1,noblink:1,frz:1,aR:-14,aL:14,rot:post?-12*sh1(GT,[hitT],2):0});const q=C.RV.sp,qk=q[2];
 const S2=stPlace('RV',-40,-190,.6,-1);stDraw(S2,'S2','gold',{aura:.6,aL:[20,-30,'open'],aR:[-20,20,'open'],back:'R',legs:.5,frz:1,t:tGS});
 cj(x,-2.4,{...(run>0&&run<1?walk(GT,16,1.4):{}),m:run<1?'angry':'cool',brow:8,flip:run>=1?-1:1,rot:run>0&&run<1?8:0,wind:2});const p=C.CJ.sp,ku=p[2];
 if(run>0&&run<1)GHOST('CJ',x,-2.4,{m:'angry'},3,.25,1);
 const wind=cl((GT-tGol+.3)/.3),S=stPlace('CJ',run>=1?140:-60,-190,.62,run>=1?-1:1),pr=PUNCH(hitT)>0?PUNCH(hitT):0;
 stDraw(S,'S1','sp',{aura:1.2,face:GT>tGol-.2?'shout':'stern',aR:[lp(-40,-96,Math.max(0,pr)),lp(-100,-4,Math.max(0,pr)),'fist'],aL:[30,-40,'fist'],back:'L',wind:1.6,lean:8*wind});spEyes(S,1.2);
 const fh=SPT(S,...FK(1,-96,-4,90));
 if(post){fw(BURST(fh[0],fh[1],420*ku,hitT,'#fff',PU,.6)+RING(fh[0],fh[1],hitT,.8,1500,'#fff',26)+RING(fh[0],fh[1],hitT+.12,.8,1100,PU,18)+SPARKS(fh[0],fh[1],hitT,ku*1.4,'#fff'));
  FX.warp=[fh[0],fh[1],lp(200,1500,cl((GT-hitT)/.8)),120*(1-cl((GT-hitT)/.8))]}
 let ui=run>0&&run<1?SPEEDL(.7,0,34,'#fff'):'';if(GT>tAva&&GT<tGol)ui+=JTXT('AVANÇA!',540,300,100,'#fff',-6,pop(GT,tAva),PU2);if(GT>tGol&&!post)ui+=JTXT('GOLPE FINAL',540,320,104,GD,-6,pop(GT,tGol),GD2);
 if(post)ui+=JTXT('ORA!',540,520,240,'#fff',-8,pop(GT,hitT)*(1+.04*sn(GT*30)),PU2);
 FX.ui=ui;const Fm=foc(p[0],p[1]-240*ku,.2),Fh=foc(fh[0],fh[1],.6);camA([[T21,.2,foc(-200,0,0)[0],Fm[1],0],[tPss+.3,.25,Fm[0],Fm[1],4],[tGol,.4,Fh[0],Fh[1],-3,'c'],[hitT,.55,Fh[0],Fh[1],2],[hitT+.02,.75,Fh[0],Fh[1],-4,'c'],[ps(32),.45,Fh[0],Fh[1],0]]);
 FX.alt=1;FX.frzc='g';FX.lit={amb:[.95,.88,.7],rim:[255,210,100],d:[1,-.6],sh:.4,ri:1};FX.fog=1;FX.vig=.7;
 FX.shake=(run>0&&run<1?6:0)+34*sh1(GT,[hitT],3);FX.impact=GT>hitT&&GT<hitT+.12&&Math.floor((GT-hitT)*30)%2==0;FX.flash=.8*sh1(GT,[hitT],7);FX.flcol='255,255,255';FX.chroma=10*sh1(GT,[hitT],3)},'');ALT('g');
// ===== 22) E O TEMPO VOLTA A CORRER =====
const tVol=wt(32,'volta',0),tCor2=wt(32,'correr',0),T22=ps(32)-.2;
shot('str',T22,(t,u)=>{
 const res=tVol-.1,back=cl((GT-res)/.45),fly=cl((GT-res)/1.6);
 if(GT<res){const k=cl((GT-T22)/(res-T22));FX.inv=[[540,900,2600*(1-k)+1,.85*(1-k)*0]]}
 cj(1.4,-2.4,{m:'cool',brow:5,flip:-1,aR:-14,aL:14,wind:back});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',80,-190,.62,-1);stDraw(S,'S1','sp',{aura:1,face:'stern',...CROSS,wind:1,alpha:1-cl((GT-tCor2)/.6)*.5});spEyes(S,1);
 // o rival e o Stand dourado sao lancados para o fundo da rua
 const rx=lp(.55,.2,ez(fly)),rz=lp(-3.6,-30,fly*fly),rot=fly*720;if(fly<.97){put('RV',rx,lp(0,2.5,sn(fly*3.14)),rz,{flip:-1,m:'shock',brow:8,rot,aR:-120,aL:120,frz:1-back});
  const q=C.RV.sp,S2=stPlace('RV',-40,-190,.6,-1);stDraw(S2,'S2','gold',{alpha:1-fly,aura:.5*(1-fly),aL:[150,-30,'open'],aR:[-150,30,'open'],rot:rot*.5,frz:1-back})}
 else{const tw0=res+1.55;fw(`<g transform="translate(560 640) scale(${R2(Math.max(0,1-ab(GT-tw0-.15)/.25)*1.5,3)}) rotate(${R2(GT*200)})"><path d="M0-60L14-14L60 0L14 14L0 60L-14 14L-60 0L-14-14Z" fill="#fff8d0"/></g>`)}
 const rp=pj(CSH.pl.VP,.55,.9,-3.6);fw(RAIN(GT,back,0,[-300,-300,1380,2220],130,0,'190,210,255')+(GT<res+.6?BURST(rp[0],rp[1],340,res,'#fff',GD,.6)+RING(rp[0],rp[1],res,.7,900,'#fff',20):''));
 let ui='';if(GT>tVol)ui+=JTXT('E O TEMPO',540,300,90,'#fff',-6,pop(GT,tVol),PU2)+JTXT('VOLTA A CORRER',540,420,100,CYN,-6,pop(GT,tCor2),PU2);
 FX.ui=ui;camA([[T22,.25,0,-120,-3],[res+.3,.1,0,-60,0],[ps(33),.05,0,-40,1]]);
 FX.alt=1-back;FX.frzc='g';FX.lit=LIT.str;FX.vig=.65;FX.shake=26*sh1(GT,[res],3);FX.flash=.7*sh1(GT,[res],7);FX.flcol='255,250,230';FX.chroma=6*sh1(GT,[res],4)},'');ALT('g');
// ===== 23) YARE YARE DAZE (por do sol) =====
const tYar=wt(33,'Yare',0),tDaz=wt(33,'daze',0),T23=ps(33)-.25;
shot('twn2',T23,(t,u)=>{
 cj(0,7.4,{m:'cool',brow:6,fr:'R',aR:tw(-14,-152,tYar,.4),aL:14,tilt:-6,look:[-4,6],wind:1.4});const p=C.CJ.sp,ku=p[2];
 const S=stPlace('CJ',-50,-190,.56);stDraw(S,'S1','sp',{aura:.7,face:'stern',...CROSS,wind:1.2,alpha:.85});spEyes(S,.8);
 let ui='';if(GT>tYar)ui+=JTXT('YARE YARE',540,300,110,'#fff',-6,pop(GT,tYar),PU2);if(GT>tDaz)ui+=JTXT('DAZE.',540,430,120,GD,-6,pop(GT,tDaz),GD2);
 FX.ui=ui;const e=eyeP('CJ'),F=foc(e[0],e[1]+60*ku,.7),F0=foc(p[0],p[1]-300*ku,.15);camA([[T23,.15,F0[0],F0[1],-2],[tYar,.45,F[0],F[1],0],[ps(34),.6,F[0],F[1],1]]);
 FX.lit=LIT.twn2;FX.vig=.6;FX.flare=[[540,1080,.6,'255,180,110']]},'dip');
// ===== 24) VOCE AGUENTARIA? COMENTA: SIM OU NAO =====
const tAgu=wt(34,'aguentaria',0),tPod=wt(34,'poder',0),tCom=wt(34,'Comenta',0),tSim=wt(34,'sim',0),tNao=wt(34,'não',0),T24=ps(34)-.2,tLoop=TOTAL-.75;
shot(null,T24,(t,u)=>{FX.bg=c=>cosmos(c,GT,{c0:'#4a1d9a',c1:'#14063a',k:1.1,streak:.25,sy:1000});
 put('CJ',0,0,0,{px:[540,1760],ku:2.0,m:GT<tCom?'cool':'grin',brow:5,fr:'R',hold:FINGER,aR:tw(-14,-116,T24+.15,.35),aL:24,tilt:-4,look:[3,2],zz:1,nodrift:1,back:COAT_BACK(GT,1.2)});
 const S=stPlace('CJ',0,-240,.68);stDraw(S,'S1','sp',{aura:1.2,face:'stern',aL:[30,-30,'fist'],aR:[-120,-10,'point'],back:'L',wind:1.2});spEyes(S,1);
 fw(GOGO(150,1250,1,1,4)+GOGO(940,1150,.9,1,4,.5));const c0=SPT(S,0,-260);FX.rays=[[c0[0],c0[1],.5,'200,160,255',20,1900]];
 let ui='';if(GT>tAgu-.1)ui+=JTXT('VOCÊ',540,260,90,'#fff',-6,pop(GT,tAgu-.1),PU2)+JTXT('AGUENTARIA?',540,385,112,GD,-6,pop(GT,tAgu+.1),GD2);
 const btn=(x,txt,col,t0)=>GT>t0?`<g transform="translate(${x} 560) rotate(-6) scale(${R2(pop(GT,t0)*(1+.04*sn(GT*7+x)),3)})"><rect x="-170" y="-70" width="340" height="140" rx="70" fill="${col}" ${ST7}/><text y="30" font-size="84" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#fff" stroke="${INK}" stroke-width="12" paint-order="stroke">${txt}</text></g>`:'';
 ui+=btn(330,'SIM','#2fbf71',tSim)+btn(750,'NÃO',RED,tNao);
 FX.ui=ui;camA([[T24,.3,0,-200,-2],[tCom,.12,0,-120,1],[TOTAL,.18,0,-120,0]]);
 FX.lit={amb:[.95,.9,1.1],rim:[210,170,255],d:[0,-1],sh:.3,ri:1};FX.vig=.65;FX.shake=6*sh1(GT,[tSim,tNao],8);
 // final em loop: o tempo para de novo
 if(GT>tLoop){TSPHERE(c0[0],c0[1],tLoop,.5,.4,.3);FX.black=cl((GT-TOTAL+.25)/.25)}},'flashP');
finalize({2:'O QUÊ?!',5:'EU?!',7:'UAU!',10:'HEHE!',23:'UFA...',26:'GULP!'});
