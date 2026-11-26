// =====================================================================
//  CIBITO E O LOOP TEMPORAL - PARTE 1  (1080x1920, 24 fps)
//  Tempos = pausas reais da narracao (ffmpeg silencedetect). OFF = atraso do audio.
// =====================================================================
const W=1080,H=1920,$=id=>document.getElementById(id),sn=Math.sin,cs=Math.cos,ab=Math.abs;
const cl=x=>x<0?0:x>1?1:x,ez=x=>{x=cl(x);return x*x*(3-2*x)},lp=(a,b,x)=>a+(b-a)*x;
const OFF=ENVOFF;
// 30 frases do roteiro (texto exato) e seus tempos no audio
const PH=['E se você ficasse preso em um dia que nunca termina?','Foi exatamente isso que aconteceu com Cibito, ao visitar uma cidade chamada Colinas dos Mares.','Durante a viagem, seu celular tocou.','Era a operadora Clarona!','Cibito reclamou:','"Para cobrar dinheiro vocês são rápidos, mas para dar internet desaparecem!"','Pouco depois, um veado apareceu na estrada.','Cibito tentou frear, mas acabou colidindo!','"MEU DEUS! ATROPELEI MEU AMIGO!"','Mas era apenas um animal.','"Ah, menos mal...','Achei que conhecia ele!"','Ao chegar à cidade, percebeu que todos os moradores estavam olhando para ele.','Foi quando um homem chamado Elias se aproximou e avisou:','"Se você acordar novamente em casa, não volte para cá."','Cibito achou aquilo estranho, mas foi dormir em um hotel.','Quando acordou...','estava novamente em casa!','Sua mãe apareceu e disse:','"Filho,','toma cuidado e não engravida ninguém!"','Cibito percebeu que estava revivendo o mesmo dia.','Ele estava preso em um loop temporal!','Decidiu voltar à cidade para encontrar Elias.','Mas, ao chegar, encontrou todos os moradores parados na rua, olhando para ele.','Então Elias apareceu e disse:','"Eu tentei avisar você...','Mas agora ele sabe que está procurando escapar."','Cibito perguntou:','"ELE QUEM?!"'];
const PT=[[0,3.146],[3.694,9.805],[10.241,12.447],[12.95,14.432],[14.897,15.92],[16.31,20.751],[21.245,23.918],[24.304,27.261],[27.648,29.927],[30.353,31.765],[32.209,33.361],[33.853,35.082],[35.594,40.182],[40.594,44.123],[44.55,47.951],[48.463,51.817],[52.28,53.074],[53.399,55.183],[55.577,57.317],[57.715,58.1],[58.434,60.911],[61.36,64.45],[64.816,67.091],[67.491,70.222],[70.547,75.756],[76.169,78.441],[78.759,80.089],[80.532,83.158],[83.586,84.668],[85.024,86.1]];
const ps=i=>PT[i-1][0]+OFF,pe=i=>PT[i-1][1]+OFF;
const wt=(i,w,f=.5)=>{const s=PH[i-1].toLowerCase(),p=Math.max(0,s.indexOf(w.toLowerCase()));return ps(i)+(pe(i)-ps(i))*(p+w.length*f)/s.length};
const TOTAL=88.0;window.TOTAL=TOTAL;window.PHRASES=PH.map((t,i)=>[t,ps(i+1),pe(i+1)]);
// fala dos personagens -> boca sincronizada com o volume real do audio
const mouthAt=(k,t)=>{const a=t-OFF;for(const s of SPK)if(a>=s[0]&&a<=s[1]&&s[2]==k){const v=ENV[Math.floor(a*24)]||0;return{o:v,w:v*.5,on:1}}return{o:0,w:0,on:0}};
const speaking=k=>mouthAt(k,GT).on;
const EMP=[];const emph=t=>EMP.reduce((mx,h)=>Math.max(mx,Math.exp(-((t-h)**2)/.05)),0);
const ST=(sz)=>`stroke="${INK}" stroke-width="${sz*.16}" paint-order="stroke" stroke-linejoin="round"`;
const TXT=(s,x,y,sz,c,rot=0,sc=1,fw=900)=>`<text x="0" y="0" transform="translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) rotate(${rot}) scale(${(+sc).toFixed(3)})" font-size="${sz}" text-anchor="middle" fill="${c}" ${ST(sz)} font-family="Poppins,Arial Black,sans-serif" font-weight="${fw}">${s}</text>`;
const S4=S.replace('"7"','"4"');
// ---------- PERSONAGENS (design original preservado) ----------
const HOOD=`<path d="M-62-250C-92-236-94-176-84-146Q-70-134-58-146C-54-186-58-226-58-246Z" fill="#b5651d" ${S}/><path d="M62-250C92-236 94-176 84-146Q70-134 58-146C54-186 58-226 58-246Z" fill="#b5651d" ${S}/><g transform="translate(0 -18)"><path d="M-72-238C-80-332 80-332 72-238Q0-258-72-238Z" fill="#b5651d" ${S}/><path d="M-60-292L-76-348L-30-318Z" fill="#b5651d" ${S}/><path d="M-58-300L-66-332L-40-316Z" fill="#f0a98a"/><path d="M60-292L76-348L30-318Z" fill="#b5651d" ${S}/><path d="M58-300L66-332L40-316Z" fill="#f0a98a"/><path d="M-16-316L-8-340L0-322L10-344L18-316Z" fill="#3a1f14" ${S4}/><ellipse cy="-284" rx="34" ry="22" fill="#f6c8a0" ${S}/><ellipse cx="-11" cy="-286" rx="4.5" ry="6" fill="#1b1024"/><ellipse cx="11" cy="-286" rx="4.5" ry="6" fill="#1b1024"/>${[-44,-24,-4,16,36].map((x,i)=>`<circle cx="${x}" cy="${-238+(i%2)*4}" r="12" fill="#3a1f14" ${S4}/>`).join('')}</g>${[[-80,-212],[-84,-192],[80,-212],[84,-192]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#3a1f14" ${S4}/>`).join('')}`;
// Elias (referencia enviada): cabelo preto volumoso e cacheado, barba cheia, cicatriz, sobretudo preto com cinto
const EH='#1e1214';
const ELI_FX=`<path fill-rule="evenodd" d="M-64-232Q-66-170-30-150Q0-136 30-150Q66-170 64-232Q52-206 30-212Q0-222-30-212Q-52-206-64-232ZM-20-198A20 14 0 1 0 20-198A20 14 0 1 0-20-198Z" fill="${EH}" ${S4}/><path d="M40-218L50-198" stroke="#a0624a" stroke-width="4" stroke-linecap="round"/><path d="M-48-268L-10-262M10-262L48-268" stroke="${EH}" stroke-width="12" stroke-linecap="round"/>`;
const ELI_HAT=[[-72,-252,24],[-78,-218,20],[-72,-188,16],[72,-252,24],[78,-218,20],[72,-188,16],[-52,-290,24],[-18,-304,26],[18,-304,26],[52,-290,24]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${EH}" ${S}/>`).join('')+`<path d="M-62-280Q-10-300 40-258Q10-268-20-262Q-40-262-62-250Z" fill="${EH}"/><path d="M-30-300Q10-290 30-268" fill="none" stroke="#4a3238" stroke-width="5" stroke-linecap="round"/>`;
const ELI_BX=`<path d="M-50-176L-60-30H-14L-6-150ZM50-176L60-30H14L6-150Z" fill="#241a1e" ${S4}/><path d="M-26-176L0-140L26-176" fill="none" stroke="#4a3a40" stroke-width="5"/><rect x="-52" y="-106" width="104" height="14" fill="#140c10"/><rect x="-12" y="-110" width="24" height="22" rx="3" fill="none" stroke="#b89a6a" stroke-width="4"/>`;
// Mae: coque, avental
const MAE_FX=`<path d="M-30-170H30L36-96H-36Z" fill="#fff" ${S4}/><circle cx="0" cy="-130" r="7" fill="#ff5d8f"/>`;
const CHD={CIB:{sk:'#f6c8a0',hc:'#3a1f14',hs:'short',sh:'#1c1620',pa:'#2a1c18',shoe:'#3a2418',ic:'#111',hat:HOOD,id:1},
 T1:{sk:'#e8b088',hc:'#222',hs:'short',sh:'#ff5d8f',pa:'#3a3f7a',ic:'#4a2c1a',id:2},T2:{sk:'#8d5a3a',hc:'#111',hs:'curly',sh:'#2ec4b6',pa:'#3a3f7a',ic:'#333',id:3},T3:{sk:'#f6c9a0',hc:'#d9892b',hs:'long',sh:'#ffbe0b',pa:'#7b5cff',ic:'#2b6',id:4},
 R4:{sk:'#c98b5b',hc:'#777',hs:'bun',sh:'#7a5cff',pa:'#334',ic:'#333',id:9},R5:{sk:'#f2c29a',hc:'#a33',hs:'long',sh:'#4caf50',pa:'#2b2b3a',ic:'#2a5',id:10},R6:{sk:'#8d5a3a',hc:'#111',hs:'curly',sh:'#ff9f1c',pa:'#3a2a1a',ic:'#333',id:11},
 ELI:{sk:'#f0c8a0',hc:EH,hs:'curly',sh:'#1a1214',pa:'#1e1618',shoe:'#1a1010',ic:'#111',fx:ELI_FX,hat:ELI_HAT,bx:ELI_BX,id:12},
 MAE:{sk:'#f6c8a0',hc:'#5a2a1a',hs:'bun',sh:'#e05a8a',pa:'#3a3f7a',ic:'#4a2c1a',fx:MAE_FX,id:13}};
const CHS={},cw=$('cw'),cw2=$('cw2'),oc=$('O').getContext('2d'),bg=$('BG').getContext('2d');
const mkg=()=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML='<g class="in"></g><g class="ex"></g>';cw.appendChild(g);return{g,in:g.firstChild,ex:g.lastChild,key:''}};
for(const k in CHD)CHS[k]={...mkg(),d:CHD[k],id:CHD[k].id};['C','C2','C3','C4','C5','C6'].forEach(k=>CHS[k]={...mkg(),d:null,id:99});
const PLS={bed:1.2,hot:1.2},PLC={};let CSH=null,GT=0,FR=[],FX={},CU=0,SHD=[];
const getPl=k=>{if(!PLC[k]){const c=PLATES[k].cam,VP=mul(persp(c.fov,W/H,.1,90),look(c.eye,c.tg));PLC[k]={VP,tf:Math.tan(c.fov/2),cam:c}}return PLC[k]};
function put(k,x,y,z,o={}){const C=CHS[k],P=CSH.pl,t=GT,id=C.id,p=o.px?[o.px[0],o.px[1],1]:pj(P.VP,x,y,z),ku=o.ku||.0046*(H/2)/(P.tf*p[2])*(o.sc||1)*(PLS[CSH.plate]||1),lm=mouthAt(k,t),spk=lm.on;
 let mood=o.m||'happy';if(spk&&o.mt)mood=o.mt;const key=[mood,o.fr||'',o.pd?o.pd.join():'',o.hat===0?0:1].join('|');
 if(C.key!=key){C.key=key;const d={...C.d};if(o.hat===0)d.hat='';C.in.innerHTML=ch({...d,m:mood,front:o.fr,walk:1,pd:o.pd});const q=n=>$(n+id);C.el={aR:q('aR'),aL:q('aL'),lgL:q('lgL'),lgR:q('lgR'),mo:q('mo'),bl:q('bl'),bw:q('bw'),hg:q('hg'),bd:q('bd'),pp:C.g.querySelectorAll('.pp')}}
 const e=C.el,em=emph(t),g=spk*(o.gest??1)*(.4+lm.o);
 e.aR&&(e.aR.style.transform=`rotate(${o.aR??(sn(t*1.6+id)*3+g*16*sn(t*4.1+id*2)+em*9)}deg)`);e.aL&&(e.aL.style.transform=`rotate(${o.aL??(sn(t*1.4+id)*-3-g*16*sn(t*3.7+id*3)-em*9)}deg)`);
 const LGv=o.lg!=null?o.lg:2.2*sn(t*1.1+id);e.lgL&&(e.lgL.style.transform=`rotate(${LGv}deg)`);e.lgR&&(e.lgR.style.transform=`rotate(${-LGv}deg)`);
 if(e.mo){let ry=3,rx=14;if(o.mry!=null){ry=o.mry;rx=o.mrx||14}else if(spk){ry=3+lm.o*15*(o.msc||1);rx=14+lm.w*6}else if(o.talk>0){ry=3+o.talk*11*ab(sn(t*13+id*2));rx=14+o.talk*2}e.mo.setAttribute('ry',ry.toFixed(1));e.mo.setAttribute('rx',rx.toFixed(1))}
 const bp=3.1+.53*id,bph=((t+id*1.7)%bp)/bp;e.bl&&(e.bl.style.transform=`scaleY(${o.noblink?1:(bph>.962?.1:1)})`);
 e.bw&&e.bw.setAttribute('transform',`translate(0 ${(-em*9-(o.brow||0)+(spk?3*lm.o*sn(t*5+id):0)).toFixed(1)})`);
 if(e.hg){e.hg.style.transformOrigin='0px -186px';e.hg.style.transform=`rotate(${((o.still?0:3*sn(t*.9+id)+2*sn(t*2.3+id*2)*(spk?1.6:.3))+em*3+(o.tilt||0)).toFixed(2)}deg)`}
 const brt=o.still?0:sn(t*(o.brr||1.7)+id);e.bd&&(e.bd.style.transform=`scale(${(1+.005*brt).toFixed(4)},${(1+.014*brt).toFixed(4)})`);
 const sac=o.still||o.look?[0,0]:[(rnd(Math.floor(t*.8+id*.37),3.1)-.5)*5,(rnd(Math.floor(t*.8+id*.37),7.3)-.5)*2.5];
 e.pp&&e.pp.forEach(q=>q.setAttribute('transform',`translate(${((o.still?0:1.2*sn(t*.9+id*3))+sac[0]+(o.look?o.look[0]:0)).toFixed(1)} ${((o.still?0:.8*sn(t*1.3+id))+sac[1]+(o.look?o.look[1]:0)).toFixed(1)})`));
 C.ex.innerHTML=o.extra||'';
 const bob=o.bobv!=null?o.bobv:(o.nobob||o.still?0:sn(t*3.2+id)*2*(o.bob||1));
 C.g.setAttribute('transform',`translate(${(p[0]+(o.nodrift||o.still?0:6*sn(t*.8+id*2))).toFixed(1)} ${(p[1]+bob).toFixed(1)}) scale(${(ku*(o.flip||1)*(o.sx||1)*(o.sq?o.sq.sx:1)*(1+.03*em)).toFixed(4)} ${(ku*(o.sy||1)*(o.sq?o.sq.sy:1)*(1-.025*em)).toFixed(4)}) rotate(${o.rot!=null?o.rot:(o.still?0:1.3*sn(t*.9+id))}) ${o.sit?'translate(0 90)':''}`);
 C.g.style.display='';C.g.style.opacity=o.op??1;C.z=o.zz??p[2];C.top=o.top;C.k=k;C.sp=[p[0],p[1],ku];FR.push(C);if(o.shd||(!o.px&&!o.sit&&y<.4&&!o.noshd))SHD.push([p[0],p[1],ku])}
function sprite(svg,x,y,sc,z,sl='C',rot=0,op=1){const C=CHS[sl];C.in.innerHTML=svg;C.ex.innerHTML='';C.g.setAttribute('transform',`translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) scale(${(+sc).toFixed(4)}) rotate(${rot})`);C.g.style.display='';C.g.style.opacity=op;C.z=z;C.k='C';C.top=0;FR.push(C)}
const sh1=(t,tm,dk=6)=>{let m=0;tm.forEach(b=>{const d=t-b;if(d>=0)m=Math.max(m,Math.exp(-d*dk))});return m};
const pop=(t,b)=>{const d=t-b;return d<0?0:1+.35*Math.exp(-d*7)*cs(d*30)};
const rnd=(i,a)=>Math.abs(sn(i*a+a)*43758.5453)%1;
// caminhada: corpo mais baixo no contato (pernas abertas) e mais alto na passagem; leve squash no contato
const walk=(t,s=10,k=1)=>{const c=sn(t*s),a=ab(c);return{lg:34*c*k,aR:-30*c*k,aL:30*c*k,rot:2.2*sn(t*s*.5)*k,bobv:-8*(1-a)*k,sq:{sx:1+.018*a*k,sy:1-.03*a*k},tilt:2*sn(t*s+1.2)*k}};
// ease-out com overshoot (antecipa e passa um pouco do ponto antes de assentar)
const ob=(t,t0,d=.3)=>{const x=(t-t0)/d;if(x<=0)return 0;if(x>=1)return 1;const c=1.9,y=x-1;return 1+(c+1)*y*y*y+c*y*y};
const tw=(a,b,t0,d=.3)=>{const ant=GT<t0&&GT>t0-.1?sn((GT-t0+.1)/.1*Math.PI)*.1:0;return a+(b-a)*(ob(GT,t0,d)-ant)};
// squash & stretch de reacao: agacha antes (antecipacao), estica no impacto e oscila ate assentar
const SQ=(t0,k=1)=>{const d=GT-t0;if(d<-.1||d>.7)return{sx:1,sy:1};if(d<0){const a=sn((d+.1)/.1*Math.PI/2);return{sx:1+.05*a*k,sy:1-.07*a*k}}const e=Math.exp(-d*8)*cs(d*24);return{sx:1-.06*e*k,sy:1+.09*e*k}};
const kuAt=(p,sc)=>.0046*(H/2)/(CSH.pl.tf*p[2])*sc;
const BURST=(t,t0,x,y,o={})=>{const d=t-t0,life=o.life||.8;if(d<0||d>life)return'';const n=o.n||14,sp=o.sp||420,r0=o.r||12,col=o.col||'#fff',k=d/life;let s='';
 for(let i=0;i<n;i++){const a=rnd(i,12.9)*6.283,v=sp*(.4+.6*rnd(i,78.2)),px=x+cs(a)*v*d*(1-.5*k),py=y+sn(a)*v*d*(1-.5*k)+(o.grav?700*d*d:0),r=Math.max(0,r0*(1-k)*(.6+.8*rnd(i,5.5)));
  s+=`<circle cx="${px.toFixed(1)}" cy="${py.toFixed(1)}" r="${r.toFixed(1)}" fill="${col}" stroke="${INK}" stroke-width="3" opacity="${(1-k*k).toFixed(2)}"/>`}return s};
const RING=(t,t0,x,y,R=300,life=.5,col='#fff')=>{const d=t-t0;if(d<0||d>life)return'';const k=d/life;return`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(R*k).toFixed(1)}" ry="${(R*k*.3).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${(14*(1-k)+2).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`};
const RAYS=(t,t0,x,y,life=.35,n=16,col='#fff')=>{const d=t-t0;if(d<0||d>life)return'';const k=d/life;let s='';for(let i=0;i<n;i++){const a=i/n*6.283+rnd(i,3.3)*.3,r1=90+260*k,r2=r1+160*(1-k)+30,l=`x1="${(x+cs(a)*r1).toFixed(1)}" y1="${(y+sn(a)*r1).toFixed(1)}" x2="${(x+cs(a)*r2).toFixed(1)}" y2="${(y+sn(a)*r2).toFixed(1)}"`;s+=`<line ${l} stroke="${INK}" stroke-width="22" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/><line ${l} stroke="${col}" stroke-width="11" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/>`}return s};
const SPEED=(t,a=.5,col='#fff',cx=540,cy=1000)=>{let s='';for(let i=0;i<30;i++){const an=rnd(i,9.1)*6.283,ph=(t*3.2+rnd(i,4.2))%1,r1=520+rnd(i,7.7)*120+ph*60,L=130+rnd(i,2.2)*170;s+=`<line x1="${(cx+cs(an)*r1).toFixed(1)}" y1="${(cy+sn(an)*r1*1.5).toFixed(1)}" x2="${(cx+cs(an)*(r1-L)).toFixed(1)}" y2="${(cy+sn(an)*(r1-L)*1.5).toFixed(1)}" stroke="${col}" stroke-width="${(5+rnd(i,6)*6).toFixed(1)}" stroke-linecap="round" opacity="${(a*(.5+.5*rnd(i,1.1))).toFixed(2)}"/>`}return s};
const STARS2=(t,x,y,r=90,n=3)=>{let s='';for(let i=0;i<n;i++){const a=t*5+i*6.283/n;s+=TXT('⭐',x+r*cs(a),y+r*.35*sn(a),58,'#ffd23f')}return s};
const ZZZ=(t,x,y)=>[0,1,2].map(i=>{const ph=(t*.45+i/3)%1;return`<g opacity="${(Math.min(1,ph*8)*(1-ph)).toFixed(2)}">`+TXT('Z',x+ph*70+i*14,y-ph*300,56+ph*60,'#9ad0ff',8,1)+'</g>'}).join('');
const SWEAT=(x,y,a=1)=>`<path transform="translate(${x} ${y})" d="M0-20Q14 4 0 14Q-14 4 0-20Z" fill="#9ad0ff" opacity="${a}" ${S4}/>`;
// ---------- OBJETOS 2D (mesmo traco grosso dos personagens) ----------
const WHEEL=(x,y,r=34)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.62}" fill="#1b1024"/>`;
const CAR=(o={})=>{const br=o.brake||0,b=o.bump||0,hd=o.head==null?1:o.head,t=GT,roll=o.roll||0,dive=o.dive||0,nt=o.night||0;
 // fumaca do escapamento: sai pela esquerda, cresce e some
 let puff='';if(o.puff!==0)for(let i=0;i<5;i++){const ph=(t*1.6+i/5)%1;puff+=`<circle cx="${(-128-ph*70-8*sn(ph*9+i)).toFixed(1)}" cy="${(-26+ph*14-ph*ph*30).toFixed(1)}" r="${(8+ph*26).toFixed(1)}" fill="${nt?'#8a86a8':'#e8ddd0'}" opacity="${((1-ph)*.45).toFixed(2)}"/>`}
 const tl=br>.05?1:nt?.55:0;
 return`<g>${nt?`<radialGradient id="hlg"><stop offset="0" stop-color="rgb(255,238,175)" stop-opacity=".42"/><stop offset="1" stop-color="rgb(255,238,175)" stop-opacity="0"/></radialGradient><path d="M-150-170L-110-320H110L150-170Z" fill="url(#hlg)"/>`:''}
<ellipse cy="6" rx="200" ry="28" fill="rgba(10,0,25,.38)"/><ellipse cx="-120" cy="-2" rx="58" ry="12" fill="rgba(0,0,0,.55)"/><ellipse cx="120" cy="-2" rx="58" ry="12" fill="rgba(0,0,0,.55)"/>
${WHEEL(-120,-20,40)}${WHEEL(120,-20,40)}<rect x="-140" y="-34" width="22" height="12" rx="4" fill="#3a3a44"/>${puff}
<g transform="rotate(${roll.toFixed(2)} 0 -20) translate(0 ${(b-dive).toFixed(1)})">
<path d="M-176-40Q-182-120-150-140L-112-230Q-100-250-70-250H70Q100-250 112-230L150-140Q182-120 176-40Q176-14 150-14H-150Q-176-14-176-40Z" fill="#e63946" ${S}/>
<path d="M-150-140L-112-230Q-100-250-70-250H70Q100-250 112-230L150-140" fill="none" stroke="rgba(255,255,255,.35)" stroke-width="10" stroke-linecap="round"/>
<path d="M-96-226H96L128-146H-128Z" fill="#7fd3ff" ${S}/>
<clipPath id="rwc"><path d="M-96-226H96L128-146H-128Z"/></clipPath>${hd?`<g clip-path="url(#rwc)"><g transform="translate(0 -88) scale(.34)"><circle cy="-235" r="68" fill="#3a1f14" ${S}/><g transform="translate(0 -18)"><path d="M-72-238C-80-332 80-332 72-238Q0-258-72-238Z" fill="#b5651d" ${S}/><path d="M-60-292L-76-348L-30-318Z" fill="#b5651d" ${S}/><path d="M60-292L76-348L30-318Z" fill="#b5651d" ${S}/></g></g></g>`:''}
<path d="M-96-226H96L104-206H-104Z" fill="rgba(255,255,255,.45)"/><path d="M-60-222L-20-152M10-222L40-170" stroke="rgba(255,255,255,.35)" stroke-width="9" stroke-linecap="round"/>
<path d="M-176-92H176" stroke="#b02533" stroke-width="10"/><rect x="-56" y="-86" width="112" height="40" rx="8" fill="#fff6d0" ${S4}/><text x="0" y="-56" font-size="28" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#1b1024">CIB-1T0</text>
<rect x="-166" y="-118" width="58" height="34" rx="10" fill="${tl?'#ff2d3a':'#b3121f'}" ${S4}/><rect x="108" y="-118" width="58" height="34" rx="10" fill="${tl?'#ff2d3a':'#b3121f'}" ${S4}/>
${tl?`<circle cx="-137" cy="-101" r="${(40+30*br)}" fill="rgba(255,40,60,${(.22+.18*br).toFixed(2)})"/><circle cx="137" cy="-101" r="${(40+30*br)}" fill="rgba(255,40,60,${(.22+.18*br).toFixed(2)})"/>`:''}
<rect x="-150" y="-40" width="300" height="22" rx="10" fill="#c9c9d6" ${S4}/><path d="M-140-34H140" stroke="rgba(255,255,255,.6)" stroke-width="5"/></g></g>`};
const DEER=(o={})=>{const p=o.pose||'stand',lg=o.lg||0,ex=p=='lie'?`<path d="M-176-262l20 20m0-20l-20 20M-136-262l20 20m0-20l-20 20" stroke="${INK}" stroke-width="7" stroke-linecap="round"/>`:p=='dizzy'?`<path d="M-166-252m-12 0a12 12 0 1 0 24 0a8 8 0 1 0-16 0a4 4 0 1 0 8 0M-126-252m-12 0a12 12 0 1 0 24 0a8 8 0 1 0-16 0a4 4 0 1 0 8 0" fill="none" stroke="${INK}" stroke-width="5"/>`:`<ellipse cx="-166" cy="-252" rx="15" ry="${o.blink?2:18}" fill="#fff" ${S4}/><ellipse cx="-126" cy="-252" rx="15" ry="${o.blink?2:18}" fill="#fff" ${S4}/>${o.blink?'':`<circle cx="${-170+(o.lk||0)}" cy="-248" r="8" fill="${INK}"/><circle cx="${-130+(o.lk||0)}" cy="-248" r="8" fill="${INK}"/><circle cx="${-167+(o.lk||0)}" cy="-252" r="3" fill="#fff"/><circle cx="${-127+(o.lk||0)}" cy="-252" r="3" fill="#fff"/>`}`;
 const leg=(x,a)=>`<path transform="rotate(${a} ${x} -120)" d="M${x-11}-130V-8H${x+11}V-130Z" fill="#a8652e" ${S4}/><rect x="${x-13}" y="-14" width="26" height="14" rx="4" fill="#2a1a10"/>`;
 return`<g>${p=='lie'?'':`<ellipse cy="4" rx="150" ry="20" fill="rgba(0,0,0,.3)"/>`}${leg(-80,lg)}${leg(70,-lg)}
<g transform="rotate(${(p=='lie'?0:10*sn(GT*4.3)*(sn(GT*.9)>.3?1:.2)).toFixed(1)} 112 -192)"><path d="M110-190q50-10 40 26" fill="none" stroke="${INK}" stroke-width="9"/><ellipse cx="128" cy="-188" rx="18" ry="12" fill="#fff" ${S4}/></g>
<ellipse cx="0" cy="-160" rx="130" ry="${(62+2.5*sn(GT*2.4)).toFixed(1)}" fill="#c07a3c" ${S}/><ellipse cx="0" cy="-130" rx="90" ry="26" fill="#f1d3a8"/>${leg(-50,-lg)}${leg(100,lg)}
<path d="M-90-190Q-110-240-120-262L-70-262Q-70-220-50-196Z" fill="#c07a3c" ${S}/>
<path d="M-128-300Q-150-360-180-370M-150-338Q-176-336-186-350M-96-300Q-80-360-50-372M-80-338Q-56-340-46-354" fill="none" stroke="#6b3e1c" stroke-width="14" stroke-linecap="round"/><path d="M-128-300Q-150-360-180-370M-150-338Q-176-336-186-350M-96-300Q-80-360-50-372M-80-338Q-56-340-46-354" fill="none" stroke="#a87b4f" stroke-width="6" stroke-linecap="round"/>
<g transform="rotate(${(p=="lie"?0:-8*Math.max(0,sn(GT*3.1))**8).toFixed(1)} -176 -284)"><path d="M-176-292Q-210-306-214-284Q-200-270-174-276Z" fill="#c07a3c" ${S4}/></g><g transform="rotate(${(p=="lie"?0:8*Math.max(0,sn(GT*2.7+1))**8).toFixed(1)} -90 -284)"><path d="M-90-292Q-56-306-52-284Q-66-270-92-276Z" fill="#c07a3c" ${S4}/></g>
<ellipse cx="-146" cy="-250" rx="58" ry="52" fill="#c07a3c" ${S}/><ellipse cx="-180" cy="-214" rx="34" ry="24" fill="#f1d3a8" ${S4}/><ellipse cx="-200" cy="-222" rx="11" ry="8" fill="${INK}"/>${ex}
${p=='stand'&&o.smile?`<path d="M-196-204Q-180-192-166-204" fill="none" stroke="${INK}" stroke-width="5" stroke-linecap="round"/>`:''}</g>`};
const SIGN=(sc=1)=>`<g transform="scale(${sc})"><rect x="-150" y="-240" width="20" height="240" fill="#8a8a9a" ${S4}/><rect x="130" y="-240" width="20" height="240" fill="#8a8a9a" ${S4}/><rect x="-300" y="-470" width="600" height="250" rx="22" fill="#1f8a4c" ${S}/><rect x="-282" y="-452" width="564" height="214" rx="14" fill="none" stroke="#fff" stroke-width="7"/><text x="0" y="-398" font-size="38" text-anchor="middle" font-family="Poppins" font-weight="800" fill="#d9ffe6">BEM-VINDO A</text><text x="0" y="-338" font-size="60" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#fff">COLINAS</text><text x="0" y="-270" font-size="60" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#fff">DOS MARES</text><path d="M-250-262q20-14 40 0t40 0" fill="none" stroke="#7fd3ff" stroke-width="7"/><path d="M170-262q20-14 40 0t40 0" fill="none" stroke="#7fd3ff" stroke-width="7"/></g>`;
const PHONE=(o={})=>{const t=GT;return`<g><rect x="-110" y="-210" width="220" height="420" rx="34" fill="#22202c" ${S}/><rect x="-92" y="-180" width="184" height="350" rx="16" fill="${o.scr||'#2b1d4a'}"/>
<circle cx="0" cy="-80" r="48" fill="#ff2d3a" ${S4}/><text x="0" y="-60" font-size="58" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#fff">C</text>
<text x="0" y="10" font-size="34" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#fff">CLARONA</text><text x="0" y="44" font-size="20" text-anchor="middle" font-family="Poppins" font-weight="800" fill="#c9b8ff">chamando...</text>
<circle cx="-46" cy="118" r="26" fill="#ff3b3b" ${S4}/><circle cx="46" cy="118" r="26" fill="#3bd16f" ${S4}/>
${o.ring?[0,1,2].map(i=>{const ph=(t*2.2+i/3)%1;return`<path d="M${-150-ph*60}-60q-30 60 0 120M${150+ph*60}-60q30 60 0 120" fill="none" stroke="#fff" stroke-width="10" stroke-linecap="round" opacity="${(1-ph).toFixed(2)}"/>`}).join(''):''}</g>`};
const CLOCK=(t,sp=1,r=140,col='#fff')=>{let s=`<circle r="${r}" fill="${col}" ${S}/><circle r="${r*.86}" fill="none" stroke="${INK}" stroke-width="4" opacity=".4"/>`;for(let i=0;i<12;i++){const a=i/12*6.283;s+=`<line x1="${(cs(a)*r*.78).toFixed(1)}" y1="${(sn(a)*r*.78).toFixed(1)}" x2="${(cs(a)*r*.9).toFixed(1)}" y2="${(sn(a)*r*.9).toFixed(1)}" stroke="${INK}" stroke-width="${i%3?5:10}" stroke-linecap="round"/>`}
 const h=t*sp*.5,m=t*sp*6;return s+`<line x2="${(sn(h)*r*.5).toFixed(1)}" y2="${(-cs(h)*r*.5).toFixed(1)}" stroke="${INK}" stroke-width="12" stroke-linecap="round"/><line x2="${(sn(m)*r*.75).toFixed(1)}" y2="${(-cs(m)*r*.75).toFixed(1)}" stroke="#ff2d3a" stroke-width="8" stroke-linecap="round"/><circle r="12" fill="${INK}"/>`};
const CAL=(flip)=>`<g><rect x="-150" y="-170" width="300" height="320" rx="20" fill="#fff" ${S}/><rect x="-150" y="-170" width="300" height="90" rx="20" fill="#ff2d3a" ${S}/><text x="0" y="-108" font-size="44" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#fff">SEXTA</text><text x="0" y="90" font-size="190" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#1b1024">13</text>${flip>0?`<g transform="translate(0 -80) scale(1 ${(1-2*flip).toFixed(3)})"><rect x="-150" y="0" width="300" height="230" fill="#f4f0ff" ${S4}/><text x="0" y="170" font-size="190" text-anchor="middle" font-family="Poppins" font-weight="900" fill="#1b1024">13</text></g>`:''}</g>`;
const DASH=(t,shk=0)=>`<g><path d="M-40 1920L-40 1430Q540 1330 1120 1430L1120 1920Z" fill="#2a2236" ${S}/><path d="M-40 1460Q540 1370 1120 1460" fill="none" stroke="#4a3d5e" stroke-width="16"/>
<path d="M-60-40L90-40L250 1440L-60 1500Z" fill="#2a2236" ${S}/><path d="M1140-40L990-40L830 1440L1140 1500Z" fill="#2a2236" ${S}/><path d="M-60-60H1140V70Q540 30-60 70Z" fill="#2a2236" ${S}/>
<rect x="470" y="40" width="140" height="56" rx="10" fill="#1b1024"/><rect x="480" y="48" width="120" height="40" rx="6" fill="#6a7a9a"/>
<g transform="translate(${540+shk} 1520) rotate(${(4*sn(t*1.3)).toFixed(2)})"><circle r="250" fill="none" stroke="${INK}" stroke-width="64"/><circle r="250" fill="none" stroke="#3a3048" stroke-width="44"/><path d="M-240 0H240M0 0V240" stroke="${INK}" stroke-width="54"/><path d="M-240 0H240M0 0V240" stroke="#3a3048" stroke-width="34"/><circle r="70" fill="#3a3048" ${S}/><circle r="26" fill="#e63946"/></g></g>`;
const AURA=(t,a)=>{let s='';for(let i=0;i<9;i++){const x=-110+i*27,h=330+60*sn(t*9+i*1.7)+(i%2)*50;s+=`<path d="M${x-30} 0Q${x-20} ${-h*.5} ${x} ${-h}Q${x+20} ${-h*.5} ${x+30} 0Z" fill="${i%2?'#7a2cff':'#b56bff'}" opacity="${(.55*a).toFixed(2)}"/>`}return`<g transform="translate(0 10)">${s}</g>`};
const BOSS=(a,t)=>`<g opacity="${a.toFixed(2)}"><path d="M-420 400Q-460-200-300-420Q-150-560 0-560Q150-560 300-420Q460-200 420 400Z" fill="none" stroke="#9b4dff" stroke-width="${(40+10*sn(t*8)).toFixed(1)}" opacity=".55"/><path d="M-420 400Q-460-200-300-420Q-150-560 0-560Q150-560 300-420Q460-200 420 400Z" fill="#0b0614"/><path d="M-300-420L-380-640L-180-500ZM300-420L380-640L180-500Z" fill="#0b0614"/>
<ellipse cx="-130" cy="-260" rx="${70+6*sn(t*9)}" ry="34" fill="#ff1e3c"/><ellipse cx="130" cy="-260" rx="${70+6*sn(t*9)}" ry="34" fill="#ff1e3c"/><ellipse cx="-130" cy="-260" rx="22" ry="30" fill="#ffe0e6"/><ellipse cx="130" cy="-260" rx="22" ry="30" fill="#ffe0e6"/>
<path d="M-160-100Q0 20 160-100Q100-40 0-40Q-100-40-160-100Z" fill="#ff1e3c" opacity=".8"/></g>`;
// ---------- CAMERA (keyframes em segundos absolutos) ----------
const camA=K=>{let i=0;while(i<K.length-1&&GT>=K[i+1][0])i++;const a=K[i],b=K[i+1];let v;
 if(!b||GT<a[0]||b[5]==='c')v=a.slice(1,5);else{const w=ez((GT-a[0])/(b[0]-a[0]));v=[1,2,3,4].map(j=>lp(a[j],b[j],w))}
 const z=Math.max(v[0],.012+.034*Math.abs(v[3])),mx=Math.max(0,540*z-16),my0=-Math.max(0,920*z-16),my1=Math.max(0,1000*z-16);
 FX.cz=z;FX.cpn=[Math.max(-mx,Math.min(mx,v[1])),Math.max(my0,Math.min(my1,v[2]))];FX.roll=v[3]};
const camFree=K=>{camA(K);if(!CSH.plate){FX.cpn=[lp(0,FX.cpn[0],1),FX.cpn[1]]}};
const zp=(x,y,f=1.06)=>{const z0=FX.cz||0,pn=FX.cpn||[0,0];return[540+(x-540)*(1+z0*f)+pn[0],1000+(y-1000)*(1+z0*f)+pn[1]]};
const foc=(x,y,z)=>{const S=1+z*1.06;return[-(x-540)*S,-(y-1000)*S]};// pan que centraliza (x,y) com zoom z
// ---------- TRANSICOES ----------
const TDUR=.24;
const trans=(gt,sh)=>{const R={dx:0,dy:0,s:1,bx:0,by:0,fl:0,col:'255,255,255',r:0,vhs:0};const i=SH.indexOf(sh),nx=SH[i+1];
 const ap=(type,p,io)=>{const e=p*p;
  if(type=='wl'||type=='wr'){const dr=(type=='wl'?-1:1)*(io=='out'?1:-1);R.s=1+.34*e;R.dx=dr*e*190;R.bx=e*50;R.r=dr*e*1.6}
  else if(type=='wu'){const dr=io=='out'?-1:1;R.s=1+.3*e;R.dy=dr*e*260;R.by=e*60}
  else if(type=='zoom'){R.s=1+.55*e;R.bx=R.by=e*12}
  else if(type=='flash'||type=='flashO'||type=='flashR'){R.s=1+.08*e;R.fl=Math.min(.95,e*1.1);R.col=type=='flashO'?'255,170,90':type=='flashR'?'255,40,60':'255,255,255';R.bx=R.by=e*5}
  else if(type=='dip'){R.fl=e*.92;R.col='5,0,15'}
  else if(type=='glitch'){R.vhs=Math.max(R.vhs,p);R.dx=(rnd(Math.floor(gt*40),3.1)-.5)*120*p;R.bx=p*30}};
 const ti=gt-sh.t0,dI=sh.tin=='dip'||sh.tin=='glitch'?.4:TDUR;if(sh.tin&&ti<dI)ap(sh.tin,1-ti/dI,'in');
 const dO=nx&&(nx.tin=='dip'||nx.tin=='glitch')?.4:TDUR;if(nx&&nx.tin&&gt>sh.t1-dO)ap(nx.tin,(gt-(sh.t1-dO))/dO,'out');return R};
// ---------- LUZ DOS PERSONAGENS 2D (integracao com o cenario 3D) ----------
// amb = multiplicador de cor da luz ambiente da cena; rim = cor da luz de recorte; d = direcao da luz na tela; sh = forca da sombra propria
const LIT={road:{amb:[1,.95,.9],rim:[255,170,90],d:[1,-.6],sh:.32,ri:.85},roadN:{amb:[.74,.78,1],rim:[150,175,255],d:[-1,-.7],sh:.42,ri:.8},
 twn2:{amb:[1,.9,.86],rim:[255,160,90],d:[.6,-1],sh:.34,ri:.9},twn3:{amb:[.72,.74,.98],rim:[160,170,255],d:[-1,-.8],sh:.45,ri:.85},
 hot:{amb:[.9,.8,.8],rim:[255,190,120],d:[-1,-.3],sh:.38,ri:.75},bed:{amb:[1,.99,.98],rim:[255,248,225],d:[-1,-.5],sh:.22,ri:.6},
 car:{amb:[.9,.86,.9],rim:[255,180,110],d:[1,-.8],sh:.4,ri:.8},vtx:{amb:[1,1,1.04],rim:[140,240,255],d:[0,1],sh:.2,ri:.9}};
document.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute"><filter id="lit" filterUnits="userSpaceOnUse" x="-300" y="-300" width="1680" height="2520" color-interpolation-filters="sRGB">
<feColorMatrix id="litA" in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" result="tint"/>
<feMorphology in="SourceAlpha" operator="erode" radius="6" result="er"/>
<feOffset id="litO1" in="er" dx="0" dy="0" result="o1"/><feComposite in="er" in2="o1" operator="out" result="rimM"/><feGaussianBlur in="rimM" stdDeviation="1.6" result="rimB"/>
<feFlood id="litR" flood-color="rgb(255,200,120)" flood-opacity=".8"/><feComposite in2="rimB" operator="in" result="rim"/>
<feOffset id="litO2" in="er" dx="0" dy="0" result="o2"/><feComposite in="er" in2="o2" operator="out" result="shM"/><feGaussianBlur in="shM" stdDeviation="9" result="shB"/><feComposite in="shB" in2="er" operator="in" result="shC"/>
<feFlood id="litS" flood-color="rgb(30,10,50)" flood-opacity=".3"/><feComposite in2="shC" operator="in" result="shd"/>
<feMerge><feMergeNode in="tint"/><feMergeNode in="shd"/><feMergeNode in="rim"/></feMerge></filter></svg>`);
let LITK='';const setLit=L=>{const k=JSON.stringify(L);if(k==LITK)return;LITK=k;const a=L.amb,n=Math.hypot(L.d[0],L.d[1])||1,dx=L.d[0]/n,dy=L.d[1]/n;
 $('litA').setAttribute('values',`${a[0]} 0 0 0 0 0 ${a[1]} 0 0 0 0 0 ${a[2]} 0 0 0 0 0 1 0`);
 $('litO1').setAttribute('dx',(-dx*7).toFixed(1));$('litO1').setAttribute('dy',(-dy*7).toFixed(1));$('litR').setAttribute('flood-color',`rgb(${L.rim.join()})`);$('litR').setAttribute('flood-opacity',(L.ri*.62).toFixed(2));
 $('litO2').setAttribute('dx',(dx*34).toFixed(1));$('litO2').setAttribute('dy',(dy*34).toFixed(1));$('litS').setAttribute('flood-opacity',L.sh)};
document.body.insertAdjacentHTML('beforeend','<svg width="0" height="0" style="position:absolute"><filter id="mbx" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur id="mbg" stdDeviation="0 0"/></filter></svg>');
// ---------- FUNDO DO VORTICE DO TEMPO (canvas) ----------
function vortex(c,t,k=1,hue=0){const g=c.createRadialGradient(540,1000,0,540,1000,1300);g.addColorStop(0,'#fff4d6');g.addColorStop(.08,hue?'#ff7ab8':'#7ef2ff');g.addColorStop(.35,hue?'#5a1a8a':'#3a2a9a');g.addColorStop(1,'#07031a');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.save();c.translate(540,1000);for(let a=0;a<14;a++){c.save();c.rotate(a/14*6.283+t*.9*k);const gr=c.createLinearGradient(0,0,1400,0);gr.addColorStop(0,'rgba(255,255,255,.0)');gr.addColorStop(.3,a%2?'rgba(130,230,255,.22)':'rgba(255,120,220,.16)');gr.addColorStop(1,'rgba(255,255,255,0)');c.fillStyle=gr;c.beginPath();c.moveTo(0,0);for(let r=0;r<1500;r+=40){c.lineTo(r,sn(r*.006-t*3)*r*.18)}for(let r=1500;r>0;r-=40){c.lineTo(r,sn(r*.006-t*3)*r*.18+r*.12)}c.fill();c.restore()}
 for(let i=0;i<9;i++){const ph=((t*.55*k+i/9)%1),R=40+ph*ph*1500;c.strokeStyle=`rgba(255,255,255,${(.5*(1-ph)*ph*4>1?.5*(1-ph):ph*2*(1-ph)).toFixed(3)})`;c.lineWidth=4+ph*22;c.beginPath();c.arc(0,0,R,0,6.283);c.stroke();
  c.fillStyle=`rgba(255,240,200,${(.7*ph*(1-ph)*2).toFixed(3)})`;for(let n=0;n<12;n++){const a=n/12*6.283+i*.3+t*.4;c.fillRect(cs(a)*R-3-ph*6,sn(a)*R-3-ph*6,6+ph*12,6+ph*12)}}
 c.restore()}
// ---------- PLANOS ----------
const SH=[];const shot=(plate,t0,f,tin)=>SH.push({plate,t0,f,tin});
// 0) GANCHO: o dia que nunca termina
shot(null,0,(t,u)=>{FX.bg=c=>vortex(c,GT,1.3);
 const fall=GT,sp=(GT*160)%360,R=1.0+.05*sn(GT*3);
 put('CIB',0,0,0,{px:[540+40*sn(GT*1.7),1180+30*sn(GT*2.1)],ku:2.2*R,m:GT<1.6?'shock':'scared',rot:sn(GT*1.4)*18,aR:-150+30*sn(GT*7),aL:150-30*sn(GT*6.3),lg:24*sn(GT*5),brow:8,nodrift:1,nobob:1});
 let ui='';[[230,520,110,1.6,-1],[880,620,90,-2.2,1],[200,1500,80,2.8,1],[900,1520,120,-1.4,-1],[560,330,70,3.5,1]].forEach(([x,y,r,s,d],i)=>{const ph=(GT*.25+i*.2)%1;ui+=`<g transform="translate(${(x+d*40*sn(GT+i)).toFixed(1)} ${(y+30*cs(GT*1.3+i)).toFixed(1)}) rotate(${(GT*40*d).toFixed(1)}) scale(${(.55+.25*sn(GT*2+i)).toFixed(3)})">${CLOCK(GT,s*8,r*1.4)}</g>`});
 ui+=TXT('E SE O DIA',540,250,104,'#fff',-3,pop(GT,.12))+TXT('NUNCA TERMINASSE?',540,370,92,'#ffd23f',-3,pop(GT,.4)*(1+.03*sn(GT*6)));
 FX.ui=ui;FX.shake=10*sh1(GT,[.05],5)+2;FX.gl=[[540,1000,700,'200,240,255',.35+.1*sn(GT*4)]];
 camA([[0,.35,0,0,-3],[.5,.06,0,0,2],[3.0,.12,0,0,-2],[3.8,.3,0,0,4]])},'');
// 1) Estrada para Colinas dos Mares
shot('road',3.8,(t,u)=>{const tc=wt(2,'Colinas',.2),sg=pop(GT,tc);
 const z=lp(1.5,-6,ez((GT-3.8)/6.5)),cx=sn(GT*.7)*.25;
 const p=pj(CSH.pl.VP,cx,0,z),ku=kuAt(p,2.6);
 sprite(CAR({bump:-2.5*ab(sn(GT*7))-1.2*sn(GT*13),roll:-3.5*cs(GT*.7)}),p[0],p[1],ku,p[2],'C');
 if(GT>tc-.2){const q=pj(CSH.pl.VP,3.1,0,-6),k2=kuAt(q,2.2*sg);sprite(SIGN(1),q[0],q[1],k2,q[2],'C2')}
 camA([[3.8,.25,0,120,-2],[5.2,.06,0,40,0],[tc-.3,.08,0,0,.8],[tc+.2,.22,-90,120,-1.2],[10.35,.26,-110,140,-1.5]]);
 let ui='';
 if(GT>tc)ui+=RAYS(GT,tc,760,840,.4,14,'#ffe27a');
 FX.ui=ui;FX.gl=[[700,600,520,'255,200,120',.35]]},'flash');
// 2) Dentro do carro: celular toca - Clarona
shot('road',10.35,(t,u)=>{const tr=wt(3,'tocou',.1),tC=wt(4,'Clarona',.2),tR=ps(5),ring=GT>tr;
 put('CIB',0,0,0,{px:[540,1700],ku:3.1,m:GT<tr?'cool':GT<tC?'shock':GT<tR?'angry':'angry',aR:tw(-20,-120,tr,.35)+(ring?5*sn(GT*30)*ob(GT,tr+.3,.2):0),aL:tw(20,32,tr,.4),brow:tw(0,8,tC,.2),look:ring?[10,-4]:[0,0],tilt:tw(0,-6,tr,.4),sq:SQ(tr,.8).sy!=1?SQ(tr,.8):SQ(tC,.9),brr:GT>tC?3:1.7,zz:5});
 const vib=ring?7*sn(GT*80)*(GT<tC+1.5?1:.3):0,pp=GT<tr?0:ez((GT-tr)/.3);
 if(pp>0)sprite(PHONE({ring:1}),900+vib,1000+300*(1-pp),1.05*pp,1,'C2',-8+3*sn(GT*40)*(ring?1:0));
 sprite(DASH(GT,vib*.3+1.5*sn(GT*23)),0,0,1,0,'C3');FX.drive=1;
 camA([[10.35,.06,0,0,0],[tr,.06,0,0,0],[tr+.1,.16,-90,50,1],[tC,.16,-90,50,1],[tC+.05,.3,-190,120,-1,'c'],[tR-.3,.32,-200,130,-1],[tR,.12,0,0,0]]);
 let ui='';if(GT>tC&&GT<tR)ui+=TXT('CLARONA',540,330,130,'#ff3b3b',-4,pop(GT,tC))+TXT('📵',540,470,110,'#fff',0,pop(GT,tC+.2));
 if(GT>tR)ui+=TXT('😤',300,520,120,'#fff',0,pop(GT,tR));
 FX.ui=ui;FX.shake=ring?2:0;FX.gl=[[900,1000,380,'190,160,255',pp*.35]]},'zoom');
// 3) Reclamacao do Cibito
shot('road',16.45,(t,u)=>{const tD=wt(6,'dinheiro'),tRa=wt(6,'rápidos'),tI=wt(6,'internet'),tDs=wt(6,'desaparecem',.3);
 const ang=GT>tI;put('CIB',0,0,0,{px:[540,1760],ku:3.5,m:'angry',mt:'talka',aR:-120+10*sn(GT*9),aL:tw(40+20*sn(GT*6),140-30*sn(GT*8),tI,.3),brow:ang?10:6,tilt:4*sn(GT*3)+6*sh1(GT,[tD,tRa,tI,tDs],6),sq:GT<tI?SQ(tD,.6):SQ(tI,.8),brr:2.6,zz:5});
 sprite(PHONE({}),770,1000,.85,4,'C2',-20);sprite(DASH(GT,1.5*sn(GT*23)),0,0,1,0,'C3');FX.drive=1;
 let ui='';if(GT>tD-.1&&GT<tI){for(let i=0;i<6;i++){const ph=((GT-tD)*.9+i/6)%1;ui+=TXT('💸',200+i*130+30*sn(GT*2+i),420-ph*220,80,'#fff',10*sn(GT*3+i))}ui+=TXT('R$ $$$',540,300,110,'#7dff6b',-4,pop(GT,tD))}
 if(GT>tRa-.1&&GT<tI)ui+=TXT('RÁPIDOS!',540,640,80,'#ffd23f',4,pop(GT,tRa));
 if(GT>tI-.05){const v=GT<tDs?1:Math.max(0,1-(GT-tDs)/.35);ui+=`<g opacity="${v.toFixed(2)}">`+TXT('📶',540,420,170*(GT<tDs?1:1+(GT-tDs)*2),'#fff',0,pop(GT,tI))+'</g>'+TXT('0%',700,330,90,'#ff3b3b',8,pop(GT,tI+.15));
  if(GT>tDs)ui+=BURST(GT,tDs,540,380,{n:16,sp:520,r:16,col:'#f4e4c8',life:.7})+TXT('PUF!',540,600,120,'#fff',-6,pop(GT,tDs))}
 camA([[16.45,.18,0,140,1],[tD,.24,0,190,-1],[tI,.3,0,220,1.5],[tDs,.38,0,260,-1.5],[21.3,.45,0,300,0]]);
 FX.ui=ui;FX.shake=2*sh1(GT,[tD,tI,tDs],4)+1},'wr');
// 4) O veado na estrada + colisao
shot('road',21.3,(t,u)=>{const tV=wt(7,'veado',.2),tF=wt(8,'frear',.2),tCo=wt(8,'colidindo',.3),hit=GT>=tCo;
 const z=hit?-7.2:lp(-1,-7.2,ez((GT-21.3)/(tCo-21.3))),brk=GT>tF?1:0,p=pj(CSH.pl.VP,(GT>tV?lp(0,.55,ez((GT-tV)/(tCo-tV))):0)+.12*sn(GT*14)*brk*(hit?0:1),0,z),ku=kuAt(p,2.6);
 const dp=pj(CSH.pl.VP,1.7,0,-9),dk=kuAt(dp,1.9);
 if(GT>tV-.3&&!hit)sprite(DEER({pose:'stand',lg:0,lk:-8}),dp[0]+(GT<tV?300*(1-ez((GT-tV+.3)/.3)):0),dp[1],dk,dp[2],'C2');
 if(hit){const f=cl((GT-tCo)/.7),fx=lp(dp[0]-60,dp[0]+60,f),fy=dp[1]-520*sn(f*3.14)*(1-f*.3);sprite(DEER({pose:'lie'}),fx,fy,dk*1.25,1,'C2',720*f+90*(f>=1?1:0))}
 sprite(CAR({brake:brk,puff:brk?0:1,dive:brk&&!hit?9*ob(GT,tF,.25):hit?6*Math.exp(-(GT-tCo)*4):0,roll:hit?3*Math.exp(-(GT-tCo)*5)*sn((GT-tCo)*25):(GT>tV?-4.5*sn(cl((GT-tV)/(tCo-tV))*Math.PI):0),bump:hit?-10*Math.exp(-(GT-tCo)*6)*sn((GT-tCo)*30):(brk?-1.5*sn(GT*40):-2.5*ab(sn(GT*7)))}),p[0],p[1],ku,p[2],'C');
 let ui='';if(GT>tV-.05&&GT<tF)ui+=TXT('!',dp[0]-40,dp[1]-dk*430,150,'#ffd23f',0,pop(GT,tV));
 if(GT>tF&&!hit){const a=cl((GT-tF)/(tCo-tF));ui+=[-1,1].map(s=>`<path d="M${p[0]+s*120*ku} ${p[1]+10} L${p[0]+s*(130+40*a)*ku} ${p[1]+260*a}" stroke="#1b1024" stroke-width="${30*ku}" stroke-linecap="round" opacity=".55"/>`).join('')+TXT('SKRIIII!',540,420,110,'#fff',-6,pop(GT,tF)*(1+.04*sn(GT*30)))}
 if(hit){const c=zp(dp[0],dp[1]-dk*150);ui+=RAYS(GT,tCo,c[0],c[1],.45,18,'#ffe27a')+BURST(GT,tCo,c[0],c[1],{n:20,sp:700,r:18,col:'#f4e4c8',life:.8,grav:1})+TXT('CRASH!',540,420,160,'#ff3b3b',-8,pop(GT,tCo)*(1+.05*sn(GT*20)))}
 camA([[21.3,.1,0,0,0],[tV-.1,.1,0,0,0],[tV+.1,.32,-(dp[0]-540)*1.3,-(dp[1]-dk*200-1000)*1.3,1.5],[tF-.3,.3,-(dp[0]-540)*1.2,-(dp[1]-dk*200-1000)*1.2,1],[tF,.12,0,-60,-1],[tCo,.2,0,-200,0,'c'],[tCo+.05,.2,0,-200,0],[27.8,.32,0,-260,2]]);
 FX.ui=ui;FX.shake=22*sh1(GT,[tCo],5)+(brk&&!hit?6:0);FX.punch=.06*sh1(GT,[tCo],8);FX.flash=.8*sh1(GT,[tCo],14);
 FX.tint=GT>tV&&GT<tCo?[255,40,40,.06*(1+sn(GT*12))]:null},'wl');
// 5) "MEU DEUS! ATROPELEI MEU AMIGO!"
shot('road',27.8,(t,u)=>{const tA=wt(9,'atropelei',.1);
 put('CIB',0,0,0,{px:[540,1780],ku:3.6,m:'scared',mt:'talkd',aR:tw(-40,-165,27.85,.3)+10*sn(GT*14),aL:tw(40,165,27.85,.3)-10*sn(GT*13),brow:10,tilt:6*sn(GT*9),rot:3*sn(GT*11),sq:GT<tA?SQ(ps(9),1.1):SQ(tA,.8),brr:4,zz:5});
 let ui=TXT('MEU DEUS!',540,300,140,'#fff',-5,pop(GT,ps(9)))+(GT>tA?TXT('ATROPELEI',540,440,104,'#ff3b3b',4,pop(GT,tA))+TXT('MEU AMIGO!',540,560,104,'#ffd23f',-3,pop(GT,tA+.45)):'');
 ui+=SWEAT(300,700,.9)+SWEAT(790,760,.9);sprite(DASH(GT,0),0,0,1,0,'C3');
 camA([[27.8,.5,0,320,-3],[28.4,.32,0,250,2],[tA,.34,0,260,-2],[tA+.05,.48,0,330,2,'c'],[30.45,.55,0,360,-2]]);
 FX.ui=ui;FX.shake=6+8*sh1(GT,[ps(9),tA],6);FX.tint=[255,30,50,.08+.05*ab(sn(GT*7))];FX.bg=null},'flashR');
// 6) Era apenas um animal / "Ah, menos mal... Achei que conhecia ele!"
shot('road',30.45,(t,u)=>{const tAn=wt(10,'animal',.2),tUp=tAn+.25,tM=ps(11),tK=ps(12),tE=wt(12,'ele',.3);
 const up=ez((GT-tUp)/.4),dp=pj(CSH.pl.VP,1.0,0,-2.5),dk=kuAt(dp,1.7);
 const dz=GT>tUp&&GT<tK;sprite(DEER({pose:GT<tUp?'lie':dz?'dizzy':'stand',smile:GT>tK,blink:GT>tE&&GT<tE+.35,lk:-10}),dp[0]+(GT>tE+.4?ez((GT-tE-.4)/1.2)*700:0),dp[1]-(GT<tUp?0:40*sn(up*3.14)*(1-up)),dk,dp[2],'C2',GT<tUp?90:lp(90,0,up)+(dz?6*sn(GT*6):0));
 put('CIB',-1.3,0,-1.5,{sc:2.5,m:GT<tM?'worry':GT<tK?'happy':'smirk',mt:GT<tK?'talk':'talk',aR:GT<tK?tw(-20,-60,tM,.3):tw(-60,-15,tK,.35),aL:GT<tK?tw(20,60,tM,.3):tw(60,15,tK,.35),look:[8,2],brow:GT<tM?6:0,tilt:tw(0,-7,tK,.4),sq:GT<tK?SQ(tM,.7):SQ(tE,.5),brr:GT<tM?3.2:1.6});
 let ui='';if(GT<tUp+1.4){const dd=zp(dp[0],dp[1]-dk*330);ui+=STARS2(GT,dd[0],dd[1],100,4)}
 if(GT>tAn-.05&&GT<tM)ui+=TXT('...ERA UM VEADO 🦌',540,330,74,'#fff',-3,pop(GT,tAn));
 if(GT>tM&&GT<tK)ui+=TXT('UFA!',540,330,140,'#7dff6b',-5,pop(GT,tM));
 if(GT>tK)ui+=TXT('😏',300,420,120,'#fff',0,pop(GT,tE));
 camA([[30.45,.06,0,0,0],[tAn,.12,-120,40,0],[tM,.14,160,40,-1],[tK,.22,240,60,1],[tE+.2,.28,260,80,-1],[35.65,.2,100,60,0]]);
 FX.ui=ui},'wr');
// 7) Chegada: todos os moradores olhando
const RES=[['T1',-2.6,-1.5],['T2',2.4,-1.2],['T3',-1.2,-4.5],['R4',3.4,-4.8],['R5',.9,-7.5],['R6',-3.4,-7.2]];
shot('twn2',35.65,(t,u)=>{const tO=wt(13,'olhando',.2),tP=wt(13,'percebeu',.2);
 const cx=lp(-1.2,-.4,ez((GT-35.65)/2.6));
 RES.forEach(([k,x,z],i)=>{const t0=tO-.4+i*.09,w=ob(GT,t0,.45),turn=GT>t0,l0=[-x,0],l1=[clamp((cx-x)*3,-9,9),2];put(k,x*.8,0,z,{sc:2.4,m:turn?'blank':'happy',look:[lp(l0[0],l1[0],w),lp(l0[1],l1[1],w)],still:w>=1,tilt:lp(0,x>cx?-4:4,w),noblink:turn,sq:SQ(t0,.35)})});
 put('CIB',cx,0,3.5,{sc:2.4,m:GT<tP?'happy':'worry',...(GT<38.9?walk(GT,8,1-ez((GT-38.3)/.6)):{}),look:[sn(GT*1.5)*7,0],brow:GT>tP?5:0});
 const c=CHS.CIB.sp;let ui='';if(GT>tO)ui+=TXT('👀',540,300,130,'#fff',0,pop(GT,tO))+TXT('👀',220,520,90,'#fff',8,pop(GT,tO+.2))+TXT('👀',860,560,90,'#fff',-8,pop(GT,tO+.35));
 camA([[35.65,.3,0,-120,-2],[37,.1,0,-40,0],[tO-.2,.12,0,-40,0],[tO,.26,0,-80,0,'c'],[40.7,.36,0,-110,1]]);
 FX.ui=ui;FX.tint=GT>tO?[80,0,90,.08*ez((GT-tO)/1)]:null;FX.vig=.35+.3*ez((GT-tO)/1.5)},'dip');
// 8) Elias se aproxima e avisa
shot('twn2',40.7,(t,u)=>{const tAp=wt(14,'aproximou',.5),tN=wt(15,'não volte',.1),tCa=wt(15,'casa',.2);
 const ex=lp(2.9,1.0,ez((GT-40.9)/(tAp-40.9))),wk=GT<tAp;
 put('CIB',-1.1,0,2,{sc:2.5,m:GT<ps(15)?'worry':'scared',look:[8,-2],brow:5,sq:SQ(ps(15),.6),brr:GT>ps(15)?3:1.7});
 put('ELI',ex,0,2.2,{sc:2.6,flip:-1,m:'blank',mt:'talkd',...(GT<tAp+.3?walk(GT,6,1-ez((GT-tAp+.45)/.6)):{sq:SQ(tAp+.3,.3)}),look:[-8,0],brow:3});
 const e=CHS.ELI.sp;let ui='';if(GT>tAp&&GT<ps(15))ui+=TXT('ELIAS',e[0],e[1]-e[2]*400,74,'#c9b8ff',0,pop(GT,tAp));
 if(GT>tN)ui+=TXT('NÃO VOLTE!',540,300,124,'#ff3b3b',-3,pop(GT,tN)*(1+.03*sn(GT*8)));
 const F=foc(e[0],e[1]-e[2]*240,.42);
 camA([[40.7,.06,0,0,0],[tAp,.12,-100,0,0],[ps(15),.2,F[0]*.5,F[1]*.5,0],[tN-.2,.3,F[0]*.7,F[1]*.7,0],[tN,.42,F[0],F[1],0,'c'],[48.5,.48,F[0],F[1],-1]]);
 FX.ui=ui;FX.vig=.55;FX.tint=GT>tN?[120,0,40,.1]:[60,0,90,.06];FX.shake=GT>tN?3*sh1(GT,[tN],3):0},'wl');
// 9) Hotel
shot('hot',48.5,(t,u)=>{const tH=wt(16,'dormir',.2),off=wt(16,'hotel',.8);
 const lie=GT>off+.28,yw=ez((GT-tH)/.25)*(1-ez((GT-tH-.9)/.25));put('CIB',lie?.75:.6,lie?.95:0,lie?-2.75:-.9,{sc:1,top:!lie,m:lie?'sleepy':yw>.05?'talka':'worry',mry:yw>.05?3+yw*20:undefined,mrx:yw>.05?16:undefined,rot:lie?-86:0,aR:lie?-10:-20-130*yw,aL:lie?10:20+130*yw,nobob:lie,look:lie?[0,0]:[6,0],sy:1+.02*sn(GT*2)+.04*yw,nodrift:lie,brr:lie?.9:1.7});
 let ui='';const f=CHS.CIB.sp;if(GT>off+.3){const z=zp(f[0]+80,f[1]-160);ui+=ZZZ(GT,z[0],z[1])}
 if(GT<tH)ui+=TXT('🏨 HOTEL',540,300,100,'#ffd23f',-3,pop(GT,48.6));
 camA([[48.5,.2,0,60,1],[tH,.12,0,40,0],[52.35,.3,0,120,-1]]);
 FX.ui=ui;FX.dark=.5*ez((GT-off)/.3);FX.vig=.5+.15*ez((GT-off)/.3)},'dip');
// 10) Acordou... em casa de novo! (efeito de rebobinar)
shot('bed',52.35,(t,u)=>{const tC=wt(18,'casa',.2),tW=ps(18);
 const vh=GT<tW?1-ez((GT-52.35)/(tW-52.35))*.85:Math.max(0,.15-(GT-tW)*.5);
 put('CIB',0,.85,-2.6,{sc:1,sit:1,m:GT<tW?'sleepy':'shock',aR:tw(-20,-150,tW,.28),aL:tw(20,150,tW,.28),brow:tw(0,8,tW,.2),look:GT>tW?[0,4]:[0,0],nobob:GT<tW,sq:SQ(tW,1.3),brr:GT>tW?3.5:.9});
 let ui='';if(GT<tW)ui+=`<g opacity="${(.6+.4*sn(GT*20)).toFixed(2)}">`+TXT('◀◀ REBOBINANDO',540,250,70,'#fff',0,1)+'</g>'+TXT('07:00',540,560,150,'#7dff6b',0,1+.04*sn(GT*6));
 if(GT>tW)ui+=RAYS(GT,tW,540,860,.4,18)+TXT('EM CASA?!',540,300,140,'#ffd23f',-4,pop(GT,tC-.15));
 camA([[52.35,.45,0,250,4],[tW-.1,.25,0,150,-2],[tW,.45,0,260,0,'c'],[55.7,.5,0,280,1]]);
 FX.ui=ui;FX.vhs=vh;FX.shake=12*sh1(GT,[tW],6);FX.gl=GT>tW?[[540,860,760,'255,235,190',.7*sh1(GT,[tW],6)]]:null},'glitch');
// 11) A mae
shot('bed',55.7,(t,u)=>{const tE=wt(21,'engravida',.3),tF=ps(20),mx=lp(2.0,.62,ez((GT-55.9)/1.1));
 put('CIB',-.55,.85,-2.6,{sc:1,sit:1,m:GT<tE?'worry':'shock',look:[9,0],aR:tw(-20,-150,tE,.25),aL:tw(20,150,tE,.25),brow:tw(3,9,tE,.2),sq:SQ(tE,1.2),extra:GT>tE?`<ellipse cx="-42" cy="-208" rx="18" ry="10" fill="#ff3b6b" opacity=".7"/><ellipse cx="42" cy="-208" rx="18" ry="10" fill="#ff3b6b" opacity=".7"/>`:''});
 put('MAE',mx,0,-.3,{sc:1.0,top:1,flip:-1,m:'happy',mt:'talk',...(GT<57?walk(GT,8):{}),look:[-8,0],aR:tw(-20,-90,tF-.15,.35)+(GT>tF?20*sn(GT*6)*ob(GT,tF+.2,.3):0),sq:SQ(56.95,.4)});
 let ui='';if(GT>tE)ui+=TXT('😳',300,420,140,'#fff',0,pop(GT,tE))+TXT('MÃE!!',720,330,120,'#ff5d8f',6,pop(GT,tE+.3));
 if(GT>ps(19)&&GT<tF)ui+=TXT('💗',CHS.MAE.sp[0],CHS.MAE.sp[1]-CHS.MAE.sp[2]*420,90,'#fff',0,pop(GT,ps(19)));
 const m=CHS.MAE.sp,F=foc(m[0],m[1]-m[2]*240,.3);
 camA([[55.7,.1,0,40,0],[tF,.2,F[0]*.6,F[1]*.6,0],[tE-.1,.24,F[0]*.6,F[1]*.6,0],[tE,.24,60,120,-2,'c'],[61.45,.28,70,140,0]]);
 FX.ui=ui;FX.shake=8*sh1(GT,[tE],6)},'wr');
// 12) Revivendo o mesmo dia -> LOOP TEMPORAL
shot(null,61.45,(t,u)=>{const tM=wt(22,'mesmo dia',.2),tL=wt(23,'loop',.1);FX.bg=c=>vortex(c,GT,GT>tL?2.2:1,GT>tL?1:0);
 put('CIB',0,0,0,{px:[540,1480+20*sn(GT*2)],ku:2.1,m:GT<tL?'worry':'shock',rot:GT>tL?28*sn((GT-tL)*5):6*sn(GT*2),aR:-120+20*sn(GT*5),aL:120-20*sn(GT*5.3),brow:7,nodrift:1,nobob:1,zz:2});
 let ui='';if(GT<tL+.2){const fl=((GT-61.45)*1.4)%1;ui+=`<g transform="translate(540 480) scale(.8)">${CAL(fl)}</g>`;if(GT>tM)ui+=TXT('DE NOVO?!',540,250,104,'#ffd23f',-4,pop(GT,tM))}
 for(let i=0;i<4;i++){const a=GT*1.2+i*1.57;ui+=`<g transform="translate(${(540+380*cs(a)).toFixed(1)} ${(1250+520*sn(a)).toFixed(1)}) scale(.5)">${CLOCK(GT,-12)}</g>`}
 if(GT>tL){ui+=TXT('LOOP',540,560,210,'#7ef2ff',-4,pop(GT,tL)*(1+.04*sn(GT*8)))+TXT('TEMPORAL',540,740,150,'#ff7ab8',4,pop(GT,tL+.25))+RAYS(GT,tL,540,620,.45,20,'#fff')}
 camA([[61.45,.4,0,0,-4],[62.2,.08,0,0,2],[tL-.1,.12,0,0,-2],[tL,.3,0,0,0,'c'],[67.6,.4,0,0,6]]);
 FX.ui=ui;FX.shake=3+12*sh1(GT,[tL],5);FX.vhs=.25*sh1(GT,[61.5],3)},'glitch');
// 13) Volta para a cidade (estrada a noite)
shot('roadN',67.6,(t,u)=>{const z=lp(2,-7,ez((GT-67.6)/3.1)),p=pj(CSH.pl.VP,.2*sn(GT*2),0,z),ku=kuAt(p,2.6);
 sprite(CAR({bump:-3*ab(sn(GT*11))-1.5*sn(GT*17),roll:-3*cs(GT*2),night:1}),p[0],p[1],ku,p[2],'C');
 let ui=SPEED(GT,.45,'#c9d8ff',540,820)+TXT('ELIAS...',540,330,104,'#c9b8ff',-3,pop(GT,wt(24,'Elias',.1)));
 camA([[67.6,.3,0,200,-3],[69,.12,0,80,2],[70.7,.2,0,120,-2]]);
 FX.ui=ui;FX.gl=[[p[0],p[1]-ku*120,380,'255,240,180',.25]]},'wu');
// 14) Moradores parados na rua, olhando
shot('twn3',70.7,(t,u)=>{const tPa=wt(25,'parados',.2),tO=wt(25,'olhando',.2);
 [['T1',-2.2,-2],['T2',2.2,-2.2],['R4',-3.6,-5],['T3',0,-5.4],['R5',3.6,-5.6],['R6',-1.8,-8.6]].forEach(([k,x,z],i)=>{const g=ez((GT-tO-i*.07)/.35),r=(14+3*sn(GT*6+i)).toFixed(1);put(k,x*.8,0,z,{sc:2.4,m:'blank',still:1,look:[-x*1.2,4],noblink:1,extra:g>0?`<g opacity="${(.9*g).toFixed(2)}"><circle cx="-25" cy="-232" r="${r}" fill="rgb(255,40,70)"/><circle cx="25" cy="-232" r="${r}" fill="rgb(255,40,70)"/></g>`:''})});
 const cz=lp(7,4.5,ez((GT-70.7)/2.5));put('CIB',0,0,cz,{sc:2.4,back:1,m:'worry',hat:1,...(GT<73.5?walk(GT,5,1-ez((GT-72.9)/.6)):{}),extra:''});
 let ui='';if(GT>tPa)ui+=TXT('PARADOS...',540,300,110,'#c9b8ff',-3,pop(GT,tPa));
 camA([[70.7,.3,0,120,-3],[72,.14,0,40,0],[tPa,.18,0,0,0],[tO,.36,0,-120,0,'c'],[76.25,.44,0,-160,1.5]]);
 FX.ui=ui;FX.vig=.6+.2*ez((GT-tO)/1);FX.tint=GT>tO?[200,0,40,.08]:null;FX.fog=1},'dip');
// 15) Elias aparece de novo
shot('twn3',76.25,(t,u)=>{const tAp=wt(26,'apareceu',.1),tS=wt(28,'sabe',.2),tEs=wt(28,'escapar',.4);
 const ea=ez((GT-tAp+.2)/.5);
 put('CIB',-1.1,0,2,{sc:2.5,m:GT<tAp?'worry':'scared',look:[8,0],brow:7,sq:GT<tS?SQ(tAp,1):SQ(tS,.6),aR:tw(-20,-45,tAp,.3),aL:tw(20,45,tAp,.3),brr:GT>tAp?3.4:1.7});
 if(GT>tS-.2){const q=pj(CSH.pl.VP,1.0,0,2.2),kk=kuAt(q,2.7),au=ez((GT-tS+.2)/.4);sprite(AURA(GT,au),q[0],q[1],kk,q[2]+.01,'C3')}
 put('ELI',1.0,0,2.2,{sc:2.7,flip:-1,m:GT>tS?'angry':'blank',mt:'talkd',look:[-6,GT>tS?-6:0],brow:GT>tS?6:2,op:ea,tilt:-2});
 const e=CHS.ELI.sp,F=foc(e[0],e[1]-e[2]*240,.45);let ui='';
 if(GT>tS)ui+=TXT('ELE SABE...',540,300,120,'#ff3b3b',-3,pop(GT,tS)*(1+.03*sn(GT*7)));
 camA([[76.25,.12,0,0,0],[tAp,.12,0,0,0],[tAp+.05,.3,F[0]*.7,F[1]*.7,-1,'c'],[ps(27),.34,F[0]*.8,F[1]*.8,0],[tS,.46,F[0],F[1],0,'c'],[83.65,.52,F[0],F[1],-2]]);
 FX.ui=ui;FX.vig=.7;FX.tint=GT>tS?[160,0,40,.12+.05*sn(GT*4)]:[50,0,90,.08];FX.flash=.45*sh1(GT,[tAp],12);FX.fog=1;FX.shake=4*sh1(GT,[tS],3)},'flash');
// 16) "ELE QUEM?!"
shot('twn3',83.65,(t,u)=>{const tQ=ps(30),tB=pe(30)+.15;
 const b=ez((GT-tB)/.8);put('CIB',0,0,3,{sc:2.8,m:GT<tQ?'worry':'shock',mt:'talkd',aR:tw(-20,-160,tQ,.25)+(GT>tQ?10*sn(GT*14):0),aL:tw(20,160,tQ,.25)-(GT>tQ?10*sn(GT*13):0),brow:9,look:[0,-3],sq:GT<tB+.3?SQ(tQ,1.4):SQ(tB+.3,.8),brr:4});
 let ui='';if(GT>tB)sprite(BOSS(b,GT),540,900-110*b,1.3,500,'C4');
 if(GT>tQ)ui+=TXT('ELE QUEM?!',540,330,150,'#fff',-4,pop(GT,tQ)*(1+.04*sn(GT*10)))+RAYS(GT,tQ,540,330,.4,16,'#ffd23f');
 if(GT>86.9)ui+=TXT('CONTINUA...',540,1580,110,'#ffd23f',0,pop(GT,86.9));
 camA([[83.65,.1,0,0,0],[tQ-.05,.16,0,40,0],[tQ,.42,0,260,-3,'c'],[tB,.3,0,140,0],[88,.2,0,60,0]]);
 FX.ui=ui;FX.vig=.7;FX.tint=GT>tB?[120,0,30,.18*b]:null;FX.shake=14*sh1(GT,[tQ,tB+.3],5);FX.fog=1},'zoom');
SH.forEach((s,i)=>{s.t1=i<SH.length-1?SH[i+1].t0:TOTAL+1});SH[2].lit=SH[3].lit='car';
function clamp(v,a,b){return Math.max(a,Math.min(b,v))}
// ---------- RENDER DE UM QUADRO ----------
const load=(im,src)=>new Promise(r=>{if(im.getAttribute('src')==src)return r();im.onload=r;im.src=src});
window.F=async gt=>{GT=gt;const sh=SH.find(s=>gt>=s.t0&&gt<s.t1)||SH[SH.length-1];
 if(sh!=CSH){CSH=sh;sh.pl=sh.plate?getPl(sh.plate):{VP:getPl('road').VP,tf:1,cam:{}};if(sh.plate){await Promise.all([load($('iA'),`plates/${sh.plate}_A.png`),load($('iB'),`plates/${sh.plate}_B.png`)]);$('LA').style.display=$('LB').style.display=''}else{$('LA').style.display=$('LB').style.display='none'}}
 const t=gt-sh.t0,u=cl(t/(sh.t1-sh.t0));CU=u;FX={};FR=[];SHD=[];for(const k in CHS)CHS[k].g.style.display='none';sh.f(t,u);
 FR.sort((a,b)=>b.z-a.z).forEach(c=>(c.top?cw2:cw).appendChild(c.g));
 const LI=FX.lit||LIT[sh.lit||sh.plate||'vtx'];setLit(LI);const sdx=-LI.d[0]*.5;
 $('sg').innerHTML=SHD.map(([x,y,k])=>`<ellipse cx="${(x+sdx*60*k).toFixed(1)}" cy="${(y+4*k).toFixed(1)}" rx="${(95*k).toFixed(1)}" ry="${(18*k).toFixed(1)}" transform="rotate(${(sdx*6).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="rgba(10,0,25,${(.38*(LI.sh/.35)).toFixed(2)})"/>`).join('');
 $('sg2').innerHTML=SHD.map(([x,y,k])=>`<ellipse cx="${x.toFixed(1)}" cy="${(y+2*k).toFixed(1)}" rx="${(58*k).toFixed(1)}" ry="${(9*k).toFixed(1)}" fill="rgba(5,0,15,.55)"/>`).join('');
 // perspectiva atmosferica: personagens distantes perdem contraste e saturacao (neblina)
 FR.forEach(c=>{if(c.k=='C'||!CSH.plate||!c.sp){c.g.style.filter='';return}const k=cl((c.sp[2]>0?(.55-c.sp[2])/.45:0));c.g.style.filter=k>.02?`saturate(${(1-.45*k).toFixed(2)}) contrast(${(1-.25*k).toFixed(2)}) brightness(${(1-.08*k).toFixed(2)})`:''});
 bg.clearRect(0,0,W,H);if(FX.bg)FX.bg(bg);
 const zb=FX.cz||0,pn=FX.cpn||[0,0],Tn=trans(gt,sh),sk=FX.shake||0;
 let z0=(1+zb+.02*emph(gt)+(FX.punch||0))*Tn.s-1;
 const dx=sk*sn(gt*61)+pn[0]+Tn.dx+5*sn(gt*.31)+3*sn(gt*.77),dy=sk*sn(gt*53+1)+pn[1]+Tn.dy+4*sn(gt*.27+2),ox=`${dx}px,${dy}px`,rl=(FX.roll||0)+Tn.r+.3*sn(gt*.5);
 const bl=Tn.bx>.4||Tn.by>.4?'url(#mbx)':'';$('mbg').setAttribute('stdDeviation',`${Tn.bx.toFixed(1)} ${Tn.by.toFixed(1)}`);
 $('LA').style.transform=`translate(${ox}) scale(${1+z0}) rotate(${rl}deg)`;$('SV').style.transform=$('SV2').style.transform=`translate(${ox}) scale(${1+z0*1.06}) rotate(${rl}deg)`;$('LB').style.transform=`translate(${ox}) scale(${1+z0*1.16}) rotate(${rl}deg)`;
 $('BG').style.transform=`scale(${1+z0*.5}) rotate(${rl*.5}deg)`;
 const bri=FX.dark?`brightness(${1-FX.dark})`:'',dof=FX.dof!=null?FX.dof:(sh.plate?Math.min(5,Math.max(0,(zb-.16)*16)):0);
 $('LA').style.filter=((dof>.3?`blur(${dof.toFixed(1)}px)`:'')+' '+bl+' '+bri).trim()||'none';$('LB').style.filter=((dof>.3?`blur(${(dof*.6).toFixed(1)}px)`:'')+' '+bl+' '+bri).trim()||'none';
 $('SV').style.filter=('drop-shadow(-4px 0 2px rgba(255,170,80,.28)) drop-shadow(4px 0 2px rgba(120,150,255,.25)) '+bl+' '+bri).trim();
 const c=oc;c.clearRect(0,0,W,H);c.globalCompositeOperation='lighter';
 (FX.gl||[]).forEach(([x,y,r,col,al])=>{if(al>0){const q=c.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${col},${al})`);q.addColorStop(1,`rgba(${col},0)`);c.fillStyle=q;c.fillRect(x-r,y-r,2*r,2*r)}});
 // poeira/vagalumes no ar (cenas externas)
 if(sh.plate&&sh.plate!='bed'&&sh.plate!='hot'){const night=sh.plate=='twn3'||sh.plate=='roadN';for(let i=0;i<36;i++){const hx=a=>Math.abs(sn(i*a)*43758.5453)%1,X=(hx(12.9)*W+gt*(20+30*hx(3.3)))%W,Y=((.1+.8*hx(78.2))*H-gt*(10+14*hx(9.1))%H+H)%H,r=2+3*hx(5.5);c.fillStyle=night?`rgba(190,160,255,${(.15+.25*ab(sn(gt*1.4+i))).toFixed(3)})`:`rgba(255,230,170,${(.1+.2*ab(sn(gt*1.4+i))).toFixed(3)})`;c.beginPath();c.arc(X,Y,r,0,6.3);c.fill()}}
 c.globalCompositeOperation='source-over';
 if(FX.drive){for(let i=0;i<3;i++){const ph=((gt*.55+i/3)%1),x=lp(-500,1600,ph);const g2=c.createLinearGradient(x-260,0,x+260,0);g2.addColorStop(0,'rgba(20,8,30,0)');g2.addColorStop(.5,'rgba(20,8,30,.16)');g2.addColorStop(1,'rgba(20,8,30,0)');c.fillStyle=g2;c.save();c.translate(x,1000);c.rotate(-.35);c.translate(-x,-1000);c.fillRect(x-260,-600,520,3200);c.restore()}}
 if(FX.fog){for(let i=0;i<3;i++){const y=1250+i*180+30*sn(gt*.4+i),gr=c.createLinearGradient(0,y-220,0,y+220);gr.addColorStop(0,'rgba(120,90,180,0)');gr.addColorStop(.5,`rgba(120,90,180,${(.16+.05*sn(gt*.7+i)).toFixed(3)})`);gr.addColorStop(1,'rgba(120,90,180,0)');c.fillStyle=gr;c.fillRect(0,y-220,W,440)}}
 if(FX.tint){c.fillStyle=`rgba(${FX.tint[0]},${FX.tint[1]},${FX.tint[2]},${FX.tint[3]})`;c.fillRect(0,0,W,H)}
 // grade de cor cinematografica + vinheta (mais forte conforme o suspense)
 let gr=c.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(60,40,200,.14)');gr.addColorStop(1,'rgba(255,110,40,.10)');c.fillStyle=gr;c.fillRect(0,0,W,H);
 const vg=FX.vig!=null?FX.vig:.5;gr=c.createRadialGradient(W/2,H*.5,H*.22,W/2,H*.5,H*.7);gr.addColorStop(0,'rgba(10,0,20,0)');gr.addColorStop(1,`rgba(8,0,20,${vg})`);c.fillStyle=gr;c.fillRect(0,0,W,H);
 // VHS / rebobinar (loop temporal)
 const vh=Math.max(FX.vhs||0,Tn.vhs||0);if(vh>.01){for(let i=0;i<7;i++){const y=(rnd(Math.floor(gt*24)+i,7.7)*H),h=10+rnd(i+Math.floor(gt*24),2.3)*60;c.fillStyle=`rgba(255,255,255,${(.18*vh).toFixed(3)})`;c.fillRect(0,y,W,h);c.fillStyle=`rgba(255,40,200,${(.12*vh).toFixed(3)})`;c.fillRect(rnd(i,5)*80,y+h,W,6)}
  for(let y=0;y<H;y+=6){c.fillStyle=`rgba(0,0,0,${(.18*vh).toFixed(3)})`;c.fillRect(0,y,W,2)}
  $('SV').style.filter+=` drop-shadow(${(14*vh).toFixed(1)}px 0 0 rgba(255,0,80,.6)) drop-shadow(${(-14*vh).toFixed(1)}px 0 0 rgba(0,220,255,.6))`}
 // grao de filme
 for(let i=0;i<220;i++){const x=rnd(i+gt*97,1.7)*W,y=rnd(i+gt*31,8.3)*H;c.fillStyle=i%2?'rgba(255,255,255,.05)':'rgba(0,0,0,.06)';c.fillRect(x,y,3,3)}
 const fl=Math.max(Tn.fl,FX.flash||0);if(fl>0){c.fillStyle=`rgba(${FX.flash>Tn.fl?'255,255,255':Tn.col},${fl})`;c.fillRect(0,0,W,H)}
 const fd=Math.max(.6*cl(1-gt/.15),cl((gt-(TOTAL-.5))/.5));if(fd>0){c.fillStyle=`rgba(0,0,0,${fd})`;c.fillRect(0,0,W,H)}
 $('UI').innerHTML=FX.ui||'';$('UI').style.opacity=1-fd;$('st').style.filter=FX.grade||'contrast(1.05) saturate(1.07)'};
// ---------- LISTA DE EFEITOS SONOROS (sincronizada com a imagem) ----------
window.getSFX=()=>{const L=[],a=(t,k,v=1)=>L.push([+t.toFixed(3),k,v]);
 SH.forEach((s,i)=>{if(i&&s.tin){const k=s.tin=='zoom'?'zoom':s.tin.startsWith('flash')?'flash':s.tin=='glitch'?'rewind':s.tin=='dip'?'dark':'whoosh';a(s.t0-(k=='rewind'?.35:.18),k,.9)}});
 // 0 gancho
 a(0,'hit',1.2);a(0,'riser_loop',1);a(.12,'pop',.8);a(.4,'pop',.8);[.6,1.3,2.1,2.9].forEach(x=>a(x,'tick',.7));
 // 1 estrada
 a(3.8,'amb_road',1);a(3.8,'engine',1);a(wt(2,'Colinas',.2),'chime',.8);a(wt(2,'Colinas',.2),'pop',.7);
 // 2 celular
 a(10.35,'engine_in',1);for(let t=wt(3,'tocou',.1);t<ps(5)-.3;t+=1.0)a(t,'ring',.9);a(wt(4,'Clarona',.2),'sting',.8);a(ps(5),'grunt_horn',.6);
 // 3 reclamacao
 a(16.45,'engine_in',.8);a(wt(6,'dinheiro'),'cash',.8);a(wt(6,'rápidos'),'swish',.7);a(wt(6,'internet'),'pop',.7);a(wt(6,'desaparecem',.3),'poof',.9);
 // 4 veado + colisao
 {const tV=wt(7,'veado',.2),tF=wt(8,'frear',.2),tC=wt(8,'colidindo',.3);a(21.3,'amb_road',1);a(21.3,'engine',1);a(tV,'sting_hi',1);a(tV-.3,'swish',.6);a(tF,'screech',1.1);a(tC,'crash',1.3);a(tC,'hit',1.2);a(tC+.05,'glass',.8);a(tC+.35,'boing',.6)}
 // 5 panico
 a(27.8,'heart',.8);a(28.6,'heart',.8);a(29.4,'heart',.8);
 // 6 comedia
 {const tAn=wt(10,'animal',.2);a(tAn+.25,'boing',.9);a(tAn+.3,'tweet',.4);a(ps(11)-.35,'ufa',.35);a(wt(12,'ele',.3),'ding',.9);a(wt(12,'ele',.3)+.6,'slide',.7)}
 // 7 cidade olhando
 a(35.65,'amb_town',1);a(wt(13,'olhando',.2)-.4,'creak',.7);a(wt(13,'olhando',.2),'sting_low',1.1);a(wt(13,'olhando',.2)+.1,'drone',1);
 // 8 Elias
 for(let t=40.9;t<wt(14,'aproximou',.5);t+=.5)a(t,'step',.7);a(wt(14,'aproximou',.5),'sting_low',.8);a(wt(15,'não volte',.1),'hit',.75);a(wt(15,'não volte',.1),'sting_hi',.45);
 // 9 hotel
 a(48.5,'amb_night',1);a(wt(16,'hotel',.8),'click',1);a(wt(16,'hotel',.8)+.4,'snore',.6);a(wt(16,'hotel',.8)+1.8,'snore',.6);
 // 10 acordou em casa (LOOP)
 a(52.35,'rewind',1.1);a(ps(18),'alarm',.8);a(ps(18),'hit',1);a(ps(18)+.1,'birds',.8);
 // 11 mae
 a(55.9,'door',.8);for(let t=55.9;t<57;t+=.42)a(t,'step',.5);a(wt(21,'engravida',.3),'record',.9);a(wt(21,'engravida',.3)+.2,'boing',.6);
 // 12 loop temporal
 a(61.45,'riser_loop',1);for(let t=61.6;t<67.5;t+=.5)a(t,'tick',.55);a(wt(22,'mesmo dia',.2),'pop',.8);a(wt(23,'loop',.1),'loop_hit',1.3);a(wt(23,'loop',.1)+.25,'pop',.7);
 // 13 estrada noite
 a(67.6,'engine_fast',1);a(67.6,'amb_night',.6);
 // 14 moradores parados
 a(70.7,'amb_night',1);a(70.7,'drone',1);{const t0=wt(25,'parados',.2);for(let t=t0;t<76.2;t+=.85)a(t,'heart',.9);a(wt(25,'olhando',.2),'sting_low',1.2);a(wt(25,'olhando',.2),'whisper',.8)}
 // 15 Elias de novo
 a(wt(26,'apareceu',.1),'hit',1.2);a(wt(26,'apareceu',.1),'thunder',.55);a(76.25,'drone',1);a(wt(28,'sabe',.2),'sting_low',.6);a(pe(28)+.05,'whisper',.6);
 // 16 ELE QUEM
 a(ps(30),'hit',1.3);a(ps(30),'sting_hi',1);a(pe(30)+.15,'monster',1.3);a(pe(30)+.15,'thunder',1);a(86.9,'final',1.1);
 L.sort((x,y)=>x[0]-y[0]);return L};
