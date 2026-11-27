// =====================================================================
//  STANDS E EFEITOS DE JOJO (desenho proprio, no traco do projeto)
//  - Stand roxo do Cibito: referencia enviada (roxo, musculoso, ombreiras douradas,
//    cachecol vermelho, faixa dourada na testa, cabelo longo esvoacante).
//  - Stand dourado do rival: referencia enviada (dourado, maos cinza, gemas verdes, tubos);
//    formas proprias (coroa de tres pontas, gemas em losango).
//  Coordenadas locais: origem no quadril do Stand, y para cima negativo.
// =====================================================================
const SPC={sk:'#8f6cf0',sk2:'#6646cf',sk3:'#c3b0ff',hr:'#21183f',hr2:'#4a3a9a',au:'#ffc928',au2:'#c98a12',au3:'#fff0a0',rd:'#e3343b',rd2:'#9c1a28',wh:'#f5f1ff',wh2:'#c7bdeb',dk:'#1d1530',ey:'#a8f7ff'};
const GSC={au:'#f6c718',au2:'#b98510',au3:'#fff3a6',gy:'#4c4756',gy2:'#2d2934',gm:'#5fe36a',gm2:'#1f9a3a',ey:'#fff6c2'};
const R2=(v,d=1)=>(+v).toFixed(d);
const ST7=`stroke="${INK}" stroke-width="7" stroke-linejoin="round" stroke-linecap="round"`,ST5=`stroke="${INK}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`,ST4=`stroke="${INK}" stroke-width="4" stroke-linejoin="round" stroke-linecap="round"`;
// faixa ondulando ao vento (cachecol / sobretudo): de (x0,y0) na direcao ang (graus), comprimento L, largura w
const RIBBON=(x0,y0,ang,L,w,t,amp=18,fq=7,col,col2,ph=0)=>{const a=ang*Math.PI/180,ux=cs(a),uy=sn(a),nx=-uy,ny=ux,N=9;let A=[],B=[];
 for(let i=0;i<=N;i++){const s=i/N,wv=amp*s*sn(t*fq-s*4+ph),ww=w*(1-.55*s),cx=x0+ux*L*s+nx*wv,cy=y0+uy*L*s+ny*wv;A.push([cx+nx*ww/2,cy+ny*ww/2]);B.push([cx-nx*ww/2,cy-ny*ww/2])}
 const P=[...A,...B.reverse()];const d='M'+P.map(p=>R2(p[0])+' '+R2(p[1])).join('L')+'Z';
 return`<path d="${d}" fill="${col}" ${ST5}/>`+(col2?`<path d="M${A.slice(1,-1).map(p=>R2(p[0])+' '+R2(p[1])).join('L')}" fill="none" stroke="${col2}" stroke-width="${R2(w*.18)}" stroke-linecap="round" opacity=".8"/>`:'')};
// mecha ondulada (afina ate a ponta, balanca com o vento)
const LOCK=(x0,y0,ang,L,w,t,amp=26,fq=2.2,ph=0,col,col2)=>{const a=ang*Math.PI/180,ux=cs(a),uy=sn(a),nx=-uy,ny=ux,N=10;let A=[],B=[],M=[];
 for(let i=0;i<=N;i++){const s=i/N,wv=amp*sn(s*4.2+ph+t*fq)*s,ww=w*Math.pow(1-s,.85)*(1+.25*sn(s*3.14)),cx=x0+ux*L*s+nx*wv,cy=y0+uy*L*s+ny*wv;A.push([cx+nx*ww/2,cy+ny*ww/2]);B.push([cx-nx*ww/2,cy-ny*ww/2]);M.push([cx+nx*ww*.12,cy+ny*ww*.12])}
 const P=[...A,...B.reverse()];return`<path d="M${P.map(p=>R2(p[0])+' '+R2(p[1])).join('L')}Z" fill="${col}" ${ST5}/>`+(col2?`<path d="M${M.slice(1,7).map(p=>R2(p[0])+' '+R2(p[1])).join('L')}" fill="none" stroke="${col2}" stroke-width="${R2(w*.14)}" stroke-linecap="round" stroke-linejoin="round"/>`:'')};
// mecha de cabelo afinando ate a ponta (base em (bx,by), ponta a dist L no angulo ang, curvatura k)
const STRAND=(bx,by,ang,L,w,k,col,col2)=>{const a=ang*Math.PI/180,ux=cs(a),uy=sn(a),nx=-uy,ny=ux,tx=bx+ux*L,ty=by+uy*L,mx=bx+ux*L*.5+nx*k,my=by+uy*L*.5+ny*k;
 return`<path d="M${R2(bx+nx*w/2)} ${R2(by+ny*w/2)}Q${R2(mx+nx*w*.35)} ${R2(my+ny*w*.35)} ${R2(tx)} ${R2(ty)}Q${R2(mx-nx*w*.35)} ${R2(my-ny*w*.35)} ${R2(bx-nx*w/2)} ${R2(by-ny*w/2)}Z" fill="${col}" ${ST5}/>`+(col2?`<path d="M${R2(bx+ux*8)} ${R2(by+uy*8)}Q${R2(mx)} ${R2(my)} ${R2(tx-ux*L*.18)} ${R2(ty-uy*L*.18)}" fill="none" stroke="${col2}" stroke-width="${R2(w*.16)}" stroke-linecap="round"/>`:'')};
// ---------- MAOS ----------
// punho de lado (dedos para baixo/frente), luva escura com rebites dourados (Stand roxo)
const HAND_SP=(kind,C=SPC)=>{
 if(kind=='open')return`<path d="M-30 0C-40 30-38 60-26 78L26 78C38 60 40 30 30 0Z" fill="${C.sk}" ${ST5}/>`+[-20,-7,7,20].map((x,i)=>`<path d="M${x-6} 70L${x-5} ${112-ab(i-1.5)*8}Q${x} ${120-ab(i-1.5)*8} ${x+5} ${112-ab(i-1.5)*8}L${x+6} 70Z" fill="${C.sk}" ${ST4}/>`).join('')+`<path d="M-30 18L-48 46Q-52 56-42 58L-24 40Z" fill="${C.sk}" ${ST4}/>`;
 if(kind=='point')return`<path d="M-30 0C-40 30-38 60-28 82Q0 96 28 82C38 60 40 30 30 0Z" fill="${C.dk}" ${ST5}/>`+`<path d="M8 76L10 150Q16 160 22 150L24 76Z" fill="${C.sk}" ${ST4}/>`+[-16,-2].map(x=>`<circle cx="${x}" cy="74" r="7" fill="${C.au}" ${ST4}/>`).join('');
 if(kind=='pinch')return`<path d="M-30 0C-40 30-38 60-28 82Q0 96 28 82C38 60 40 30 30 0Z" fill="${C.dk}" ${ST5}/>`+`<path d="M-6 78L-12 136Q-6 146 2 138L8 80Z" fill="${C.sk}" ${ST4}/><path d="M10 78L18 132Q26 140 30 130L26 76Z" fill="${C.sk}" ${ST4}/>`;
 return`<path d="M-32 0C-42 30-40 62-30 86Q0 100 30 86C40 62 42 30 32 0Z" fill="${C.dk}" ${ST5}/><path d="M-30 64Q0 74 30 64" fill="none" stroke="#3a3052" stroke-width="5"/>`+[-21,-7,7,21].map(x=>`<circle cx="${x}" cy="84" r="7.5" fill="${C.au}" ${ST4}/>`).join('')+`<path d="M-31 30L-42 54Q-44 64-34 64" fill="${C.dk}" ${ST4}/>`};
// ---------- BRACO ARTICULADO (ombro na origem; a1 = angulo do braco, a2 = cotovelo; 0 = para baixo) ----------
const ARM=(a1,a2,hand,C,big=1,glove=true)=>{const L1=165*big,L2=150*big;
 return`<g transform="rotate(${R2(a1)})"><path d="M-40 -6C-58 50-50 118-30 ${L1}L30 ${L1}C48 118 58 50 38 -6Z" fill="${C.sk}" ${ST7}/><path d="M22 30C34 70 34 110 24 140" fill="none" stroke="${C.sk2}" stroke-width="12" stroke-linecap="round" opacity=".75"/><path d="M-26 20C-34 60-32 96-24 124" fill="none" stroke="${C.sk3}" stroke-width="7" stroke-linecap="round" opacity=".7"/>
<g transform="translate(0 ${L1}) rotate(${R2(a2)})"><circle r="31" fill="${C.sk}" ${ST5}/><path d="M-34 0C-44 52-36 104-26 ${L2}L26 ${L2}C34 104 44 52 32 0Z" fill="${C.sk}" ${ST7}/><path d="M18 24C26 60 24 96 18 124" fill="none" stroke="${C.sk2}" stroke-width="10" stroke-linecap="round" opacity=".7"/>
${glove?`<path d="M-29 ${L2-40}L29 ${L2-40}L27 ${L2+4}L-27 ${L2+4}Z" fill="${C.dk}" ${ST5}/><path d="M-27 ${L2-24}H27" stroke="${C.au}" stroke-width="5"/>`:''}<g transform="translate(0 ${L2-4})">${hand}</g></g></g>`};
// ---------- STAND ROXO (o) ----------
// o: {t, aL:[a1,a2,mao], aR:[...], face:'stern'|'shout'|'smirk', eye:0..1, lean, tilt, wind, legs:0..1, alpha}
function STAND(o={}){const C=SPC,t=o.t??GT,wd=o.wind??1,sw=k=>sn(t*2.1+k)*wd;
 const aL=o.aL||[18,-8,'fist'],aR=o.aR||[-18,8,'fist'],ey=o.eye??1,br=1+.012*sn(t*1.6);let s='';
 // cabelo de tras (mechas longas subindo como chama)
 const hd=o.hairDir||0;let hb=`<path d="M-64 -470C-130 -500-150 -580-110 -650C-60 -620-10 -680 40 -700C70 -650 120 -640 140 -590C130 -530 100 -500 64 -470Z" fill="${C.hr}" ${ST7}/>`;
 // mechas longas ondulando para cima e para tras (como na referencia)
 const HS=[[-150,260,40,0],[-132,330,46,1.1],[-114,380,40,2.2],[-96,360,44,3.1],[-78,330,40,4.2],[-62,290,36,5.3],[-44,240,32,.7],[-168,210,30,1.9],[-30,190,28,2.8],[-186,160,26,3.7]];
 HS.forEach(([a,L,am,ph],i)=>{const f=i/(HS.length-1);hb+=LOCK(lp(-60,60,(i*.37)%1),-480-30*sn(f*3.14),a+5*sn(t*1.6+i)*wd+hd,L*(o.hairL||1),96-ab(i-3)*5,t,am*wd,2.4,ph,C.hr,C.hr2)});
 // cachecol: pontas atras, ao vento
 const scarfB=RIBBON(-46,-360,150+10*sw(1)+(o.scarfDir||0),210,46,t,22*wd,6.5,C.rd,C.rd2)+RIBBON(-40,-350,165+8*sw(2)+(o.scarfDir||0),170,38,t,18*wd,7,C.rd,C.rd2,1.3);
 // pernas (somem em energia)
 const legs=`<g mask="url(#spLeg)" opacity="${R2(o.legs??1,2)}"><path d="M-86 -6C-104 80-90 170-66 250L-10 250C-4 160-8 70-4 6Z" fill="${C.sk}" ${ST7}/><path d="M86 -6C104 80 90 170 66 250L10 250C4 160 8 70 4 6Z" fill="${C.sk}" ${ST7}/><path d="M-70 40C-80 100-74 160-60 210" fill="none" stroke="${C.sk2}" stroke-width="12" opacity=".7"/></g>`;
 const cloth=`<path d="M-62 -14L62 -14L${R2(52+6*sw(3))} 150Q0 ${R2(172+6*sw(4))} ${R2(-52+6*sw(3))} 150Z" fill="${C.wh}" ${ST7}/><path d="M-30 0Q-26 80 -34 150M20 0Q26 70 18 152" fill="none" stroke="${C.wh2}" stroke-width="7" stroke-linecap="round"/>`;
 const belt=`<path d="M-84 -50L84 -50L80 -12L-80 -12Z" fill="${C.dk}" ${ST5}/>`+[-46,46].map(x=>`<circle cx="${x}" cy="-30" r="17" fill="${C.au}" ${ST5}/><circle cx="${x}" cy="-30" r="7" fill="${C.au2}"/>`).join('');
 // tronco musculoso em V
 const torso=`<path d="M-150 -336C-180 -300-172 -228-142 -186C-120 -146-96 -100-86 -42L-80 0L80 0L86 -42C96 -100 120 -146 142 -186C172 -228 180 -300 150 -336C90 -362-90 -362-150 -336Z" fill="${C.sk}" ${ST7}/>
<path d="M-6 -324C-58 -336-124 -326-128 -262C-100 -228-42 -226-8 -248Z" fill="${C.sk}" ${ST5}/><path d="M6 -324C58 -336 124 -326 128 -262C100 -228 42 -226 8 -248Z" fill="${C.sk}" ${ST5}/>
<path d="M-120 -256C-96 -236-48 -234-12 -250M120 -256C96 -236 48 -234 12 -250" fill="none" stroke="${C.sk2}" stroke-width="12" stroke-linecap="round"/>
<path d="M-104 -300C-84 -316-50 -318-24 -310" fill="none" stroke="${C.sk3}" stroke-width="8" stroke-linecap="round" opacity=".8"/>
<path d="M0 -240V-40M-52 -196Q0 -206 52 -196M-50 -146Q0 -154 50 -146M-46 -98Q0 -104 46 -98" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>
<path d="M-142 -188C-118 -150-100 -100-92 -48" fill="none" stroke="${C.sk2}" stroke-width="14" stroke-linecap="round" opacity=".8"/>
<path d="M-118 -334C-92 -282-58 -250-50 -196C-44 -146-62 -90-40 -24" fill="none" stroke="${INK}" stroke-width="17" stroke-linecap="round"/><path d="M-118 -334C-92 -282-58 -250-50 -196C-44 -146-62 -90-40 -24" fill="none" stroke="${C.au}" stroke-width="8" stroke-linecap="round"/>
<path d="M118 -334C96 -300 80 -280 70 -262" fill="none" stroke="${INK}" stroke-width="15" stroke-linecap="round"/><path d="M118 -334C96 -300 80 -280 70 -262" fill="none" stroke="${C.au}" stroke-width="7" stroke-linecap="round"/>`;
 const neck=`<path d="M-40 -346L-44 -396L44 -396L40 -346Z" fill="${C.sk}" ${ST5}/><path d="M-40 -380Q0 -366 40 -380" fill="none" stroke="${C.sk2}" stroke-width="10"/>`;
 // cachecol da frente (enrolado no pescoco) + no
 const scarfF=`<path d="M-56 -380C-22 -356 22 -356 56 -380L60 -342C22 -318-22 -318-60 -342Z" fill="${C.rd}" ${ST7}/><path d="M-48 -356C-16 -340 16 -340 48 -356" fill="none" stroke="${C.rd2}" stroke-width="7"/><path d="M-62 -364Q-84 -350-76 -322Q-56 -324-50 -346Z" fill="${C.rd}" ${ST5}/>`;
 // rosto
 const fc=o.face||'stern',sh=fc=='shout';let mouth;
 if(sh)mouth=`<path d="M-24 -410Q0 -400 24 -410Q20 -376 0 -372Q-20 -376-24 -410Z" fill="#5a0f22" ${ST4}/><path d="M-20 -408Q0 -400 20 -408L18 -398Q0 -392-18 -398Z" fill="#fff"/>`;
 else if(fc=='smirk')mouth=`<path d="M-14 -398Q4 -394 16 -404" fill="none" ${ST4}/>`;
 else mouth=`<path d="M-15 -398Q0 -401 15 -398" fill="none" ${ST4}/>`;
 const eyeY=-454,ew=sh?11:8;
 const eyes=[-1,1].map(d=>`<path d="M${d*42} ${eyeY+2}Q${d*26} ${eyeY-12} ${d*9} ${eyeY-2}Q${d*24} ${eyeY+ew} ${d*42} ${eyeY+2}Z" fill="${ey>.05?C.ey:'#e8e2ff'}" ${ST4}/>`+(ey>.05?`<circle cx="${d*24+(o.look||0)}" cy="${eyeY-1}" r="3.6" fill="#0a3550"/>`:'')).join('');
 const head=`<path d="M-56 -474C-60 -432-54 -404-36 -388L-12 -372L12 -372L36 -388C54 -404 60 -432 56 -474C52 -524-52 -524-56 -474Z" fill="${C.sk}" ${ST7}/>
<path d="M30 -466C40 -440 40 -412 24 -390L36 -388C54 -404 58 -430 54 -470Z" fill="${C.sk2}" opacity=".8"/>${eyes}
<path d="M-50 -${sh?474:470}L-10 -${sh?458:462}M50 -${sh?474:470}L10 -${sh?458:462}" fill="none" stroke="${INK}" stroke-width="9" stroke-linecap="round"/>
<path d="M2 -452L-7 -420L7 -417" fill="none" stroke="${INK}" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"/>${mouth}
<path d="M-58 -480Q0 -496 58 -480L57 -462Q0 -476-57 -462Z" fill="${C.au}" ${ST5}/><circle cx="0" cy="-482" r="15" fill="${C.au}" ${ST5}/><path d="M0 -492L3 -485L10 -484L5 -479L6 -472L0 -476L-6 -472L-5 -479L-10 -484L-3 -485Z" fill="${C.sk2}"/>`;
 // mechas da frente (por cima da faixa)
 let hf='';[[-122,200,30,.4],[-100,230,34,1.6],[-80,200,30,2.9],[-140,160,26,4.1],[-60,160,24,5.2]].forEach(([a,L,am,ph],i)=>{hf+=LOCK(-40+i*20,-494-6*sn(i),a+5*sn(t*2+i*2)*wd+hd,L*(o.hairL||1),60,t,am*wd,2.6,ph,C.hr,C.hr2)});
 // ombreiras
 const pad=d=>`<g transform="scale(${d} 1)"><path d="M-84 -366C-120 -414-212 -416-240 -336C-248 -312-238 -290-220 -286L-108 -300C-96 -320-88 -344-84 -366Z" fill="${C.au}" ${ST7}/><path d="M-104 -382C-140 -404-204 -398-226 -334" fill="none" stroke="${C.au3}" stroke-width="9" stroke-linecap="round"/><path d="M-100 -360C-136 -380-190 -374-208 -318" fill="none" stroke="${C.au2}" stroke-width="7" stroke-linecap="round"/><path d="M-238 -312Q-170 -322-108 -300" fill="none" stroke="${C.au2}" stroke-width="8"/><circle cx="-150" cy="-372" r="10" fill="${C.au3}" ${ST4}/></g>`;
 const armL=`<g transform="translate(-152 -322)">${ARM(aL[0],aL[1],HAND_SP(aL[2]||'fist'),C,aL[3]||1)}</g>`,armR=`<g transform="translate(152 -322)">${ARM(aR[0],aR[1],HAND_SP(aR[2]||'fist'),C,aR[3]||1)}</g>`;
 const back=o.back||'R';  // braco que fica atras do corpo
 s=`<g transform="rotate(${R2(o.lean||0)}) scale(${R2(br,4)} ${R2(2-br,4)})">${scarfB}<g transform="rotate(${R2(o.tilt||0)} 0 -400)">${hb}</g>${back=='R'?armR:back=='L'?armL:''}${legs}${cloth}${belt}${torso}${neck}${scarfF}<g transform="rotate(${R2(o.tilt||0)} 0 -400)">${head}${hf}</g>${pad(1)}${pad(-1)}${back=='R'?armL:back=='L'?armR:armL+armR}${o.fx||''}</g>`;
 return s}
// ---------- STAND DOURADO DO RIVAL ----------
function GSTAND(o={}){const C=GSC,t=o.t??GT,br=1+.012*sn(t*1.4+1);
 const aL=o.aL||[20,-10,'open'],aR=o.aR||[-20,10,'open'],ey=o.eye??1;
 const gem=(x,y,r)=>`<path d="M${x} ${y-r}L${x+r*.8} ${y}L${x} ${y+r}L${x-r*.8} ${y}Z" fill="${C.gm}" ${ST5}/><path d="M${x} ${y-r*.6}L${x+r*.35} ${y-r*.1}" stroke="#d8ffd8" stroke-width="4" stroke-linecap="round"/>`;
 const handG=k=>k=='fist'?`<path d="M-32 0C-42 30-40 62-30 86Q0 100 30 86C40 62 42 30 32 0Z" fill="${C.gy}" ${ST5}/>`+[-18,-6,6,18].map(x=>`<path d="M${x-6} 78Q${x} 92 ${x+6} 78" fill="none" stroke="${C.gy2}" stroke-width="4"/>`).join(''):
  `<path d="M-30 0C-40 30-38 60-26 78L26 78C38 60 40 30 30 0Z" fill="${C.gy}" ${ST5}/>`+[-20,-7,7,20].map((x,i)=>`<path d="M${x-6} 70L${x-5} ${130-ab(i-1.5)*10}Q${x} ${140-ab(i-1.5)*10} ${x+5} ${130-ab(i-1.5)*10}L${x+6} 70Z" fill="${C.gy}" ${ST4}/>`).join('')+`<path d="M-30 18L-50 50Q-54 60-44 62L-24 40Z" fill="${C.gy}" ${ST4}/>`;
 const armG=(a1,a2,k)=>`<g transform="rotate(${R2(a1)})"><path d="M-42 -6C-58 50-50 118-32 160L32 160C50 118 58 50 40 -6Z" fill="${C.au}" ${ST7}/>${[40,80,120].map(y=>`<path d="M-44 ${y}Q0 ${y+10} 44 ${y}" fill="none" stroke="${C.au2}" stroke-width="6"/>`).join('')}
<g transform="translate(0 160) rotate(${R2(a2)})"><circle r="30" fill="${C.gy}" ${ST5}/><path d="M-36 0C-44 50-36 100-28 150L28 150C36 100 44 50 34 0Z" fill="${C.au}" ${ST7}/><path d="M-30 110L30 110L28 152L-28 152Z" fill="${C.gy}" ${ST5}/><g transform="translate(0 148)">${handG(k)}</g></g></g>`;
 // tubos segmentados (da nuca, por cima dos ombros)
 const tube=d=>{let q='';for(let i=0;i<11;i++){const s=i/10,x=d*(30+120*s+18*sn(s*3.1)),y=-470+150*s+40*s*s+4*sn(t*3+i);q+=`<ellipse cx="${R2(x)}" cy="${R2(y)}" rx="${R2(24-6*s)}" ry="${R2(17-4*s)}" fill="${i%2?C.au:C.au3}" ${ST4}/>`}return q};
 const legs=`<g mask="url(#spLeg)" opacity="${R2(o.legs??1,2)}"><path d="M-84 -6C-102 80-88 170-64 250L-10 250C-4 160-8 70-4 6Z" fill="${C.au}" ${ST7}/><path d="M84 -6C102 80 88 170 64 250L10 250C4 160 8 70 4 6Z" fill="${C.au}" ${ST7}/>${gem(-50,150,20)}${gem(50,150,20)}</g>`;
 const torso=`<path d="M-148 -336C-176 -300-168 -228-138 -186C-116 -146-94 -100-84 -42L-78 0L78 0L84 -42C94 -100 116 -146 138 -186C168 -228 176 -300 148 -336C90 -362-90 -362-148 -336Z" fill="${C.au}" ${ST7}/>
<path d="M-60 -250L60 -250L52 -30L-52 -30Z" fill="${C.gy}" ${ST5}/>${[-215,-175,-135,-95,-58].map((y,i)=>`<path d="M${-58+i*1.5} ${y}Q0 ${y+12} ${58-i*1.5} ${y}L${54-i*1.5} ${y+28}Q0 ${y+40} ${-54+i*1.5} ${y+28}Z" fill="${i%2?C.au:C.au3}" ${ST4}/>`).join('')}
<path d="M-130 -300C-100 -320-50 -322-20 -300M130 -300C100 -320 50 -322 20 -300" fill="none" stroke="${C.au3}" stroke-width="8" stroke-linecap="round"/><path d="M-138 -190C-118 -150-100 -100-92 -48M138 -190C118 -150 100 -100 92 -48" fill="none" stroke="${C.au2}" stroke-width="12" stroke-linecap="round"/>${gem(0,-292,26)}`;
 const belt=`<path d="M-86 -44L86 -44L82 -8L-82 -8Z" fill="${C.au2}" ${ST5}/>${gem(0,-26,24)}`;
 const neck=`<path d="M-36 -346L-40 -394L40 -394L36 -346Z" fill="${C.gy}" ${ST5}/>`;
 const head=`<path d="M-40 -500L-16 -600L0 -540L16 -600L40 -500Z" fill="${C.au}" ${ST7}/><path d="M-66 -470L-96 -560L-40 -500ZM66 -470L96 -560L40 -500Z" fill="${C.au}" ${ST7}/>
<path d="M-54 -476C-58 -430-52 -404-34 -388L-12 -374L12 -374L34 -388C52 -404 58 -430 54 -476C50 -520-50 -520-54 -476Z" fill="${C.gy}" ${ST7}/>
<path d="M-60 -470Q0 -530 60 -470L58 -448Q0 -470-58 -448Z" fill="${C.au}" ${ST5}/>${[-1,1].map(d=>`<path d="M${d*40} -446L${d*10} -440L${d*14} -432Z" fill="${ey>.05?C.ey:'#888'}" ${ST4}/>`).join('')}
<path d="M-36 -412Q0 -400 36 -412L30 -382Q0 -372-30 -382Z" fill="${C.au}" ${ST5}/><path d="M-20 -396H20" stroke="${C.au2}" stroke-width="4"/>`;
 const pad=d=>`<g transform="scale(${d} 1)"><path d="M-100 -372C-150 -406-214 -384-226 -322C-228 -296-214 -280-198 -280C-184 -330-140 -346-104 -338Z" fill="${C.au}" ${ST7}/><path d="M-120 -368C-160 -382-198 -366-210 -324" fill="none" stroke="${C.au3}" stroke-width="7" stroke-linecap="round"/>${gem(-170,-330,15)}</g>`;
 const armL=`<g transform="translate(-150 -322)">${armG(aL[0],aL[1],aL[2]||'open')}</g>`,armR=`<g transform="translate(150 -322)">${armG(aR[0],aR[1],aR[2]||'open')}</g>`;
 return`<g transform="rotate(${R2(o.lean||0)}) scale(${R2(br,4)} ${R2(2-br,4)})">${tube(-1)}${tube(1)}${o.back=='L'?armL:armR}${legs}${torso}${belt}${neck}<g transform="rotate(${R2(o.tilt||0)} 0 -420)">${head}</g>${pad(1)}${pad(-1)}${o.back=='L'?armR:armL}${o.fx||''}</g>`}
document.querySelector('#SV defs').insertAdjacentHTML('beforeend',`<linearGradient id="spLegG" x1="0" y1="0" x2="0" y2="1" gradientUnits="userSpaceOnUse" x1="0" y1="20" x2="0" y2="250"><stop offset="0" stop-color="#fff"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></linearGradient><mask id="spLeg" maskUnits="userSpaceOnUse" x="-400" y="-60" width="800" height="400"><rect x="-400" y="-60" width="800" height="400" fill="url(#spLegG)"/></mask>
<radialGradient id="spAura"><stop offset="0" stop-color="#c9a8ff" stop-opacity=".55"/><stop offset=".55" stop-color="#7a4dff" stop-opacity=".22"/><stop offset="1" stop-color="#3a1a9a" stop-opacity="0"/></radialGradient>
<radialGradient id="gsAura"><stop offset="0" stop-color="#fff2a0" stop-opacity=".55"/><stop offset=".55" stop-color="#ffb300" stop-opacity=".22"/><stop offset="1" stop-color="#a05a00" stop-opacity="0"/></radialGradient>`);
// coloca um Stand na cena 3D (slot S1..S4), atras/ao lado de um usuario ou num ponto da cena
// o.at: [x,y,z] na cena 3D (chao) ou o.px:[x,y] em tela + o.ku; o.h: altura do quadril acima do chao (unidades do personagem)
function putStand(slot,kind,x,y,z,o={}){const C=CHS[slot],P=CSH.pl,p=o.px?[o.px[0],o.px[1],o.zz??1]:pj(P.VP,x,y,z),ku=o.ku||.0046*(H/2)/(P.tf*p[2])*(o.sc||1)*(PLS[CSH.plate]||1);
 const svg=kind=='gold'?GSTAND(o):STAND(o),a=o.alpha??1;const hy=-(o.h??150);
 C.in.innerHTML=`<g transform="translate(0 ${hy}) scale(${R2(o.ss||1,3)})">${svg}</g>`;C.ex.innerHTML='';C.bk.innerHTML=o.under||'';
 C.g.setAttribute('transform',`translate(${R2(p[0])} ${R2(p[1])}) scale(${R2(ku*(o.flip||1),4)} ${R2(ku,4)}) rotate(${R2(o.rot||0)})`);
 C.g.style.display=a>.01?'':'none';C.g.style.opacity=R2(Math.min(1,a),3);C.z=o.zz??p[2]+(o.dz||.01);C.k=slot;C.top=o.top;C.sil=0;C.hf=o.hf;C.frz=o.frz||0;C.nolit=o.nolit;C.sp=[p[0],p[1],ku];C.shp=1;C.ss=o.ss||1;if(a>.01)FR.push(C);
 // aura de energia atras do Stand (camada aditiva)
 if(o.aura>0){const col=kind=='gold'?'gsAura':'spAura',cx=p[0],cy=p[1]+(hy-300)*ku*(o.ss||1),R=560*ku*(o.ss||1);FX.aw=(FX.aw||'')+`<ellipse cx="${R2(cx)}" cy="${R2(cy)}" rx="${R2(R*.75)}" ry="${R2(R)}" fill="url(#${col})" opacity="${R2(cl(o.aura*a),3)}"/>`}
 return{x:p[0],y:p[1],ku,hy,ss:o.ss||1,fl:o.flip||1}}
// ponto do Stand em coordenadas da cena (para efeitos): local (lx,ly) do desenho do Stand
const SPT=(S,lx,ly)=>[S.x+lx*S.ku*S.ss*(S.fl||1),S.y+(S.hy+ly*S.ss)*S.ku];
const LOC=(S,X,Y)=>[(X-S.x)/(S.ku*S.ss*(S.fl||1)),((Y-S.y)/S.ku-S.hy)/S.ss];
// posicao do Stand em relacao a um personagem ja colocado (dx,dy em unidades do personagem, a partir dos pes)
const stPlace=(k,dx,dy,ss=.72,fl=1)=>{const p=CHS[k].sp;return{x:p[0]+dx*p[2],y:p[1]+dy*p[2],ku:p[2],hy:0,ss,fl,z:CHS[k].z}};
const stDraw=(S,slot,kind,o={})=>putStand(slot,kind,0,0,0,{px:[S.x,S.y],ku:S.ku,zz:S.z+(o.front?-.05:.05),h:0,ss:S.ss,flip:S.fl,...o});
// IK de 2 segmentos do braco do Stand: alvo (tx,ty) em coordenadas locais; ext = distancia do pulso ate o ponto da mao
const IK=(side,tx,ty,ext=80,bend=1)=>{const sx=side*152,sy=-322,L1=165,L2=146+ext,dx=tx-sx,dy=ty-sy,d=Math.min(L1+L2-2,Math.max(Math.abs(L1-L2)+2,Math.hypot(dx,dy)));
 const base=Math.atan2(dy,dx),al=Math.acos(Math.max(-1,Math.min(1,(L1*L1+d*d-L2*L2)/(2*L1*d))))*bend*side,u1=base-al,ex=sx+L1*cs(u1),ey=sy+L1*sn(u1),u2=Math.atan2(ty-ey,tx-ex);
 const A=v=>Math.atan2(-cs(v),sn(v))*180/Math.PI;let a1=A(u1),a2=A(u2)-a1;a2=((a2+540)%360)-180;return[a1,a2]};
// ---------- CIBITO COM SOBRETUDO (forma "desperta") ----------
const COAT_BX=`<path d="M-50-178L-62-34L-20-34L-12-150Z" fill="#1a1524" ${S4}/><path d="M50-178L62-34L20-34L12-150Z" fill="#1a1524" ${S4}/><path d="M-50-180L-70-214L-30-186ZM50-180L70-214L30-186Z" fill="#1a1524" ${S4}/>${[-118,-86,-56].map(y=>`<circle cx="-34" cy="${y}" r="5" fill="#ffd04a" stroke="${INK}" stroke-width="2.5"/>`).join('')}<path d="M-46-174Q-40-150-30-140Q-24-150-14-152" fill="none" stroke="#ffd04a" stroke-width="5" stroke-linecap="round"/><circle cx="-14" cy="-152" r="6" fill="#ffd04a" stroke="${INK}" stroke-width="2.5"/>`;
Object.assign(CHD,{CJ:{...CHD.CIB,bx:COAT_BX,id:21}});CHS.CJ={...mkg(),d:CHD.CJ,id:21};
// abas do sobretudo atras do corpo (vento)
const COAT_BACK=(t,wd=1,dir=1)=>{const f=k=>R2(dir*(10+16*wd)*(.6+.4*sn(t*7+k))*1);return`<path d="M-56-176L${-84-+f(0)}-8Q-60 ${R2(6+4*sn(t*9))} -24-2L-6-60L6-60L24-2Q60 ${R2(6+4*sn(t*9+1))} ${84-+f(1)}-8L56-176Z" fill="#1a1524" ${S}/><path d="M-40-150L${-62-+f(0)*.6}-20M40-150L${62-+f(1)*.6}-20" stroke="#3a3150" stroke-width="6" fill="none" stroke-linecap="round"/>`};
// ---------- RIVAL (personagem original) ----------
const RV_HAIR=`<path d="M78-270L132-300L112-252L140-240L84-232Z" fill="#d9d4ee" ${S}/><path d="M-78-232C-94-300-50-350 6-350C64-350 98-310 86-240C60-266 20-282-20-278C-48-276-66-262-78-232Z" fill="#ece8f8" ${S}/><path d="M-50-300C-20-330 40-334 70-300M-30-282C0-304 40-304 64-286" fill="none" stroke="#b9b2d6" stroke-width="7" stroke-linecap="round"/><path d="M-64-262Q-80-230-66-206" fill="none" stroke="#ece8f8" stroke-width="12" stroke-linecap="round"/><path d="M-52-272L-14-258M52-272L14-258" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>`;
const RV_FX=`<path d="M-44-212Q-34-206-24-212M24-212Q34-206 44-212" stroke="rgba(27,16,36,.35)" stroke-width="4" fill="none"/><circle cx="-62" cy="-214" r="6" fill="#ffd04a" stroke="${INK}" stroke-width="3"/>`;
const RV_BX=`<path d="M-50-178L-64-30L-18-30L-8-150Z" fill="#3b1f5c" ${S4}/><path d="M50-178L64-30L18-30L8-150Z" fill="#3b1f5c" ${S4}/><path d="M-50-176L-60-100M50-176L60-100" stroke="#ffd04a" stroke-width="6"/><path d="M0-150L10-136L0-122L-10-136Z" fill="${GSC.gm}" stroke="${INK}" stroke-width="3"/>`;
Object.assign(CHD,{RV:{sk:'#f0d9cc',hc:'#ece8f8',hs:'short',sh:'#24172f',pa:'#1a1326',shoe:'#120e18',ic:'#e8a800',hat:RV_HAIR,fx:RV_FX,bx:RV_BX,id:22}});CHS.RV={...mkg(),d:CHD.RV,id:22};
const RV_BACK=(t,wd=1)=>`<path d="M-56-176L${R2(-78-10*wd*sn(t*6))}-6Q-40 4 0-4Q40 4 ${R2(78+10*wd*sn(t*6+1))}-6L56-176Z" fill="#3b1f5c" ${S}/>`;
// ---------- EFEITOS JOJO ----------
// "ゴ" (menacing) desenhado em vetor, com volume; k = tremor
const GO=(x,y,s,rot=0,a=1,col='#c86bff',col2='#5a1a9a')=>{if(a<=.01)return'';const j=GT*40;const jx=2*sn(j+x),jy=2*sn(j*1.3+y);
 const g=`<path d="M10 18H70V82H10" fill="none" stroke-width="20" stroke-linejoin="miter"/><path d="M80 2L88 20M96 0L104 18" fill="none" stroke-width="10" stroke-linecap="round"/>`;
 return`<g transform="translate(${R2(x+jx)} ${R2(y+jy)}) rotate(${rot}) scale(${R2(s,3)}) skewX(-12) translate(-55 -50)" opacity="${R2(a,2)}"><g transform="translate(7 7)" stroke="${INK}">${g.replace(/stroke-width="(\d+)"/g,(m,w)=>`stroke-width="${+w+14}"`)}</g><g stroke="${col2}" transform="translate(5 5)">${g}</g><g stroke="${INK}">${g.replace(/stroke-width="(\d+)"/g,(m,w)=>`stroke-width="${+w+12}"`)}</g><g stroke="${col}">${g}</g></g>`};
const GOGO=(x,y,s,a,n=4,seed=0,col,col2)=>{let r='';for(let i=0;i<n;i++){const ph=(GT*1.3+i/n+seed)%1,sc=s*(.75+.35*sn(ph*3.14));r+=GO(x+(i%2?40:-40)*s+10*sn(GT*2+i),y-i*120*s,sc,-8+i*5,a*Math.min(1,sn(ph*3.14)*1.6),col,col2)}return r};
// texto em estilo JoJo (inclinado, com contorno e sombra roxa)
const JTXT=(s,x,y,sz,c,rot=-6,sc=1,sh='#5a1a9a',op=1)=>`<g opacity="${R2(op,2)}" transform="translate(${R2(x)} ${R2(y)}) rotate(${rot}) scale(${R2(sc,3)}) skewX(-10)"><text x="${R2(sz*.06)}" y="${R2(sz*.07)}" font-size="${sz}" text-anchor="middle" fill="${sh}" stroke="${INK}" stroke-width="${R2(sz*.2)}" stroke-linejoin="round" paint-order="stroke" font-family="Poppins,Arial Black,sans-serif" font-weight="900">${s}</text><text font-size="${sz}" text-anchor="middle" fill="${c}" stroke="${INK}" stroke-width="${R2(sz*.15)}" stroke-linejoin="round" paint-order="stroke" font-family="Poppins,Arial Black,sans-serif" font-weight="900">${s}</text></g>`;
// gota de chuva (caindo = risco; parada = gota com brilho)
const RAIN=(t,a,frozen,area=[0,0,1080,1920],n=90,seed=0,col='190,210,255',ft=null)=>{if(a<=.01)return'';let s='';const [x0,y0,x1,y1]=area,T=frozen?ft:t;
 for(let i=0;i<n;i++){const z=.4+.6*rnd(i+seed,3.3),sp=(1400+900*z),x=x0+rnd(i+seed,7.1)*(x1-x0),ph=(T*sp/(y1-y0)+rnd(i+seed,9.2))%1,y=y0+ph*(y1-y0),L=frozen?0:46*z;
  s+=frozen?`<ellipse cx="${R2(x)}" cy="${R2(y)}" rx="${R2(2.4*z+.8)}" ry="${R2(5*z+1.5)}" fill="rgba(${col},${R2(a*(.5+.5*z),2)})"/><circle cx="${R2(x-z)}" cy="${R2(y-2*z)}" r="${R2(z+.4)}" fill="rgba(255,255,255,${R2(a*.8,2)})"/>`:`<line x1="${R2(x)}" y1="${R2(y-L)}" x2="${R2(x-L*.12)}" y2="${R2(y)}" stroke="rgba(${col},${R2(a*(.35+.4*z),2)})" stroke-width="${R2(1.5+2*z)}" stroke-linecap="round"/>`}return s};
// pombo (asas animadas; fl = fase da batida)
const BIRD=(x,y,s,fl,a=1,col='#e9e6f2',flip=1)=>{const w=sn(fl*6.283);return`<g transform="translate(${R2(x)} ${R2(y)}) scale(${R2(s*flip,3)} ${R2(s,3)})" opacity="${R2(a,2)}"><path d="M-30 0Q-6-14 22-6Q34-4 40 4Q28 6 18 6Q-6 16-30 0Z" fill="${col}" ${ST4}/><path d="M-4-4Q-30 ${R2(-40*w-6)} -56 ${R2(-30*w-4)}Q-24 ${R2(-8*w)} 6 2Z" fill="${col}" ${ST4}/><path d="M38 2L48 5L38 8Z" fill="#f2a93b"/><circle cx="30" cy="-2" r="2.4" fill="${INK}"/></g>`};
// bala (com aneis de choque e rastro)
const BULLET=(x,y,ang,s,trail=0,frozen=0)=>{let r=`<g transform="translate(${R2(x)} ${R2(y)}) rotate(${R2(ang)}) scale(${R2(s,3)})">`;
 if(trail>0)r+=`<path d="M-30-7L${R2(-30-260*trail)} 0L-30 7Z" fill="rgba(255,240,210,${R2(.55*trail,2)})"/>`+[1,2,3].map(k=>`<ellipse cx="${-40-k*55}" cy="0" rx="${10+k*4}" ry="${18+k*7}" fill="none" stroke="rgba(230,240,255,${R2(.5*trail/(k*.8),2)})" stroke-width="3"/>`).join('');
 return r+`<path d="M-30-9H8Q30-9 38 0Q30 9 8 9H-30Z" fill="#d7a64a" ${ST4}/><path d="M-30-9H-14V9H-30Z" fill="#a87422" ${ST4}/><path d="M0-5Q22-5 30-1" stroke="#fff3c4" stroke-width="3" fill="none" stroke-linecap="round"/></g>`};
// relogio (ponteiros parados ou girando)
const CLOCK=(x,y,r,ang,a=1,col='#efe6ff')=>`<g transform="translate(${R2(x)} ${R2(y)})" opacity="${R2(a,2)}"><circle r="${r}" fill="rgba(20,8,50,.55)" stroke="${INK}" stroke-width="${R2(r*.16)}"/><circle r="${r}" fill="none" stroke="${col}" stroke-width="${R2(r*.07)}"/>${[...Array(12).keys()].map(i=>{const q=i/12*6.283;return`<line x1="${R2(cs(q)*r*.78)}" y1="${R2(sn(q)*r*.78)}" x2="${R2(cs(q)*r*.9)}" y2="${R2(sn(q)*r*.9)}" stroke="${col}" stroke-width="${R2(r*(i%3?.03:.06))}"/>`}).join('')}<line x1="0" y1="0" x2="${R2(cs(ang/12-1.571)*r*.5)}" y2="${R2(sn(ang/12-1.571)*r*.5)}" stroke="${col}" stroke-width="${R2(r*.09)}" stroke-linecap="round"/><line x1="0" y1="0" x2="${R2(cs(ang-1.571)*r*.75)}" y2="${R2(sn(ang-1.571)*r*.75)}" stroke="#ff4d8a" stroke-width="${R2(r*.05)}" stroke-linecap="round"/><circle r="${R2(r*.07)}" fill="${col}"/></g>`;
// linhas de velocidade (paralelas, para corrida/travelling)
const SPEEDL=(a,ang=0,n=26,col='#fff',seed=0,y0=0,y1=1920)=>{if(a<=.01)return'';let s='';const c=cs(ang*Math.PI/180),q=sn(ang*Math.PI/180);for(let i=0;i<n;i++){const y=y0+rnd(i+seed,3.1)*(y1-y0),ph=(GT*2.6+rnd(i+seed,5.7))%1,x=-300+ph*1700,L=180+300*rnd(i+seed,8.1);s+=`<line x1="${R2(540+(x-540)*c-(y-960)*q)}" y1="${R2(960+(x-540)*q+(y-960)*c)}" x2="${R2(540+(x+L-540)*c-(y-960)*q)}" y2="${R2(960+(x+L-540)*q+(y-960)*c)}" stroke="${col}" stroke-width="${R2(3+7*rnd(i+seed,2.2))}" stroke-linecap="round" opacity="${R2(a*(.3+.5*rnd(i+seed,1.4)),2)}"/>`}return s};
// rajada de punhos (ORA ORA): punhos frontais e laterais tremulando em volta do centro
const RUSH=(cx,cy,R,s,a,t,seed=0)=>{if(a<=.01)return'';let o='';const fr=Math.floor(t*30);
 for(let i=0;i<16;i++){const k=rnd(fr*7+i+seed,3.3),an=(rnd(fr*3+i+seed,6.1)-.5)*2.4,rr=R*(.25+.75*rnd(fr+i*5+seed,9.9)),x=cx+cs(an)*rr*.9,y=cy+sn(an)*rr*.7-R*.1,sc=s*(.55+.6*k);
  o+=`<g transform="translate(${R2(x)} ${R2(y)}) scale(${R2(sc,3)})" opacity="${R2(a*(.45+.55*k),2)}"><path d="M-110 -26L-10 -34L-10 34L-110 26Z" fill="${SPC.sk}" ${ST5} opacity=".55"/><path d="M-60 -36L-10 -38L-10 38L-60 36Z" fill="${SPC.dk}" ${ST5}/><circle cx="20" cy="0" r="46" fill="${SPC.dk}" ${ST7}/>${[-27,-9,9,27].map(y=>`<circle cx="52" cy="${y}" r="9" fill="${SPC.au}" ${ST4}/>`).join('')}</g>`}
 return o};
// estrela de impacto grande (impact frame)
const BURST=(x,y,r,t0,col='#fff',col2='#c86bff',life=.4)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,R=r*(.5+.9*Math.sqrt(k));let p='',q='';for(let i=0;i<22;i++){const a=i/22*6.283+t0,rr=i%2?R*.45:R*(.85+.4*rnd(i,t0+1));p+=(i?'L':'M')+R2(x+cs(a)*rr)+' '+R2(y+sn(a)*rr);q+=(i?'L':'M')+R2(x+cs(a)*rr*.55)+' '+R2(y+sn(a)*rr*.55)}
 return`<path d="${p}Z" fill="${col2}" stroke="${INK}" stroke-width="12" stroke-linejoin="round" opacity="${R2(1-k*k,2)}"/><path d="${q}Z" fill="${col}" opacity="${R2(1-k,2)}"/>`};
// onda de choque (anel)
const RING=(x,y,t0,life,R,col='#fff',w=14)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,e=1-(1-k)*(1-k);return`<ellipse cx="${R2(x)}" cy="${R2(y)}" rx="${R2(R*e)}" ry="${R2(R*e*.92)}" fill="none" stroke="${col}" stroke-width="${R2(w*(1-k)+1)}" opacity="${R2(1-k,2)}"/>`};
// esfera de inversao do tempo parado: FX.inv recebe [x,y,raio,alfa] em coordenadas da cena
const TSPHERE=(x,y,t0,dur=.55,hold=.25,back=.35)=>{const d=GT-t0;if(d<0)return;const L=[];
 if(d<dur){const k=ez(d/dur);L.push([x,y,40+2600*k*k,1])}           // expande: tudo dentro fica negativo
 else if(d<dur+hold)L.push([x,y,2600,1-ez((d-dur)/hold)*.15])
 else if(d<dur+hold+back){const k=ez((d-dur-hold)/back);L.push([x,y,2600*(1-k)+1,.85*(1-k)])}  // contrai: volta as cores (agora congeladas)
 FX.inv=(FX.inv||[]).concat(L)};
const frzK=(t0,dur=.55,hold=.25,back=.35)=>cl((GT-t0-dur-hold*.5)/(hold*.5+.05));  // quando o mundo passa a ficar congelado
