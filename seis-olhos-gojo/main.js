// =====================================================================
//  E SE VOCE TIVESSE OS SEIS OLHOS?  (1080x1920, 24 fps)
//  Mesmo motor do "Cibito e o Loop Temporal": personagens 2D (lib.js) sobre
//  cenarios 3D prontos (plates/). Tempos vem de roteiro.js (frases reais do audio).
// =====================================================================
const W=1080,H=1920,$=id=>document.getElementById(id),sn=Math.sin,cs=Math.cos,ab=Math.abs;
const cl=x=>x<0?0:x>1?1:x,ez=x=>{x=cl(x);return x*x*(3-2*x)},lp=(a,b,x)=>a+(b-a)*x;
const OFF=ENVOFF;
const PH=PHR.map(p=>p[0]),PT=PHR.map(p=>[p[1],p[2]]);
const ps=i=>PT[i-1][0]+OFF,pe=i=>PT[i-1][1]+OFF;
const nrm=x=>x.toLowerCase().replace(/[^a-zà-ú0-9]/g,'');
const wt=(i,w,f=.5)=>{const q=nrm(w.split(' ')[0]);if(typeof PWD!='undefined'&&PWD&&PWD[i-1]){const x=PWD[i-1].find(z=>nrm(z[0]).startsWith(q));if(x)return x[1]+(x[2]-x[1])*f+OFF}const s=PH[i-1].toLowerCase(),p=Math.max(0,s.indexOf(w.toLowerCase()));return ps(i)+(pe(i)-ps(i))*(p+w.length*f)/s.length};
const OLDT=Math.round((pe(Math.min(21,PH.length))+3.0)*24)/24,TOTAL=PH.length>21?Math.round((pe(PH.length)+1.45)*24)/24:OLDT;window.TOTAL=TOTAL;window.PHRASES=PH.map((t,i)=>[t,ps(i+1),pe(i+1)]);
// energia da voz por quadro (pulsa o brilho dos olhos com a narracao)
const vox=t=>ENV[Math.floor((t-OFF)*24)]||0;
const mouthAt=(k,t)=>({o:0,w:0,on:0});
const EMP=[];const emph=t=>EMP.reduce((mx,h)=>Math.max(mx,Math.exp(-((t-h)**2)/.05)),0);
const ST=(sz)=>`stroke="${INK}" stroke-width="${sz*.16}" paint-order="stroke" stroke-linejoin="round"`;
const TXT=(s,x,y,sz,c,rot=0,sc=1,fw=900,op=1)=>`<text x="0" y="0" transform="translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) rotate(${rot}) scale(${(+sc).toFixed(3)})" font-size="${sz}" text-anchor="middle" fill="${c}" ${ST(sz)} font-family="Poppins,Arial Black,sans-serif" font-weight="${fw}" opacity="${op}">${s}</text>`;
const S4=S.replace('"7"','"4"');
// expressoes extras (mesmo desenho, so combinacoes novas de palpebra/sobrancelha/boca)
Object.assign(M,{closed:{lid:.97,br:'f',mo:'l'},strain:{lid:.12,br:'a',mo:'f'},focus:{lid:0,br:'a',mo:'l'},calm:{lid:0,br:'f',mo:'s2'},wow:{lid:0,br:'u',mo:'o'}});
// ---------- PERSONAGENS (design original preservado) ----------
const HOOD=`<path d="M-62-250C-92-236-94-176-84-146Q-70-134-58-146C-54-186-58-226-58-246Z" fill="#b5651d" ${S}/><path d="M62-250C92-236 94-176 84-146Q70-134 58-146C54-186 58-226 58-246Z" fill="#b5651d" ${S}/><g transform="translate(0 -18)"><path d="M-72-238C-80-332 80-332 72-238Q0-258-72-238Z" fill="#b5651d" ${S}/><path d="M-60-292L-76-348L-30-318Z" fill="#b5651d" ${S}/><path d="M-58-300L-66-332L-40-316Z" fill="#f0a98a"/><path d="M60-292L76-348L30-318Z" fill="#b5651d" ${S}/><path d="M58-300L66-332L40-316Z" fill="#f0a98a"/><path d="M-16-316L-8-340L0-322L10-344L18-316Z" fill="#3a1f14" ${S4}/><ellipse cy="-284" rx="34" ry="22" fill="#f6c8a0" ${S}/><ellipse cx="-11" cy="-286" rx="4.5" ry="6" fill="#1b1024"/><ellipse cx="11" cy="-286" rx="4.5" ry="6" fill="#1b1024"/>${[-44,-24,-4,16,36].map((x,i)=>`<circle cx="${x}" cy="${-238+(i%2)*4}" r="12" fill="#3a1f14" ${S4}/>`).join('')}</g>${[[-80,-212],[-84,-192],[80,-212],[84,-192]].map(([x,y])=>`<circle cx="${x}" cy="${y}" r="10" fill="#3a1f14" ${S4}/>`).join('')}`;
const EH='#1e1214';
const ELI_FX=`<path fill-rule="evenodd" d="M-64-232Q-66-170-30-150Q0-136 30-150Q66-170 64-232Q52-206 30-212Q0-222-30-212Q-52-206-64-232ZM-20-198A20 14 0 1 0 20-198A20 14 0 1 0-20-198Z" fill="${EH}" ${S4}/><path d="M40-218L50-198" stroke="#a0624a" stroke-width="4" stroke-linecap="round"/><path d="M-48-268L-10-262M10-262L48-268" stroke="${EH}" stroke-width="12" stroke-linecap="round"/>`;
const ELI_HAT=[[-72,-252,24],[-78,-218,20],[-72,-188,16],[72,-252,24],[78,-218,20],[72,-188,16],[-52,-290,24],[-18,-304,26],[18,-304,26],[52,-290,24]].map(([x,y,r])=>`<circle cx="${x}" cy="${y}" r="${r}" fill="${EH}" ${S}/>`).join('')+`<path d="M-62-280Q-10-300 40-258Q10-268-20-262Q-40-262-62-250Z" fill="${EH}"/><path d="M-30-300Q10-290 30-268" fill="none" stroke="#4a3238" stroke-width="5" stroke-linecap="round"/>`;
const ELI_BX=`<path d="M-50-176L-60-30H-14L-6-150ZM50-176L60-30H14L6-150Z" fill="#241a1e" ${S4}/><path d="M-26-176L0-140L26-176" fill="none" stroke="#4a3a40" stroke-width="5"/><rect x="-52" y="-106" width="104" height="14" fill="#140c10"/><rect x="-12" y="-110" width="24" height="22" rx="3" fill="none" stroke="#b89a6a" stroke-width="4"/>`;
const CHD={CIB:{sk:'#f6c8a0',hc:'#3a1f14',hs:'short',sh:'#1c1620',pa:'#2a1c18',shoe:'#3a2418',ic:'#111',hat:HOOD,id:1},
 T1:{sk:'#e8b088',hc:'#222',hs:'short',sh:'#ff5d8f',pa:'#3a3f7a',ic:'#4a2c1a',id:2},T2:{sk:'#8d5a3a',hc:'#111',hs:'curly',sh:'#2ec4b6',pa:'#3a3f7a',ic:'#333',id:3},T3:{sk:'#f6c9a0',hc:'#d9892b',hs:'long',sh:'#ffbe0b',pa:'#7b5cff',ic:'#2b6',id:4},
 R4:{sk:'#c98b5b',hc:'#777',hs:'bun',sh:'#7a5cff',pa:'#334',ic:'#333',id:9},R5:{sk:'#f2c29a',hc:'#a33',hs:'long',sh:'#4caf50',pa:'#2b2b3a',ic:'#2a5',id:10},
 ELI:{sk:'#f0c8a0',hc:EH,hs:'curly',sh:'#1a1214',pa:'#1e1618',shoe:'#1a1010',ic:'#111',fx:ELI_FX,hat:ELI_HAT,bx:ELI_BX,id:12}};
// Seis Olhos: iris azul luminosa + halo (dentro da cabeca: acompanha olhar e cabeca)
const SIXFX=id=>`<g class="pp"><g id="sx${id}">${[-25,25].map(x=>`<circle cx="${x}" cy="-232" r="36" fill="url(#eglow)"/>`).join('')}</g><g id="sxi${id}">${[-25,25].map(x=>`<circle cx="${x}" cy="-232" r="14" fill="#1596ff" stroke="#e8fbff" stroke-width="3"/><circle cx="${x}" cy="-232" r="8.5" fill="#8ff0ff"/><circle cx="${x}" cy="-232" r="3.6" fill="#08245e"/><circle cx="${x+5}" cy="-237" r="3.2" fill="#fff"/>`).join('')}</g></g>`;
// venda preta (desce de baixo do capuz ate os olhos)
const BLINDFX=id=>`<g id="bf${id}"><path d="M-72-257Q0-271 72-257L73-210Q0-220-73-210Z" fill="#15111b" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M-64-246Q0-257 64-246" stroke="rgba(255,255,255,.13)" stroke-width="5" fill="none" stroke-linecap="round"/><g id="bft${id}" style="transform-origin:68px -234px"><path d="M66-248Q104-252 122-226Q98-232 70-224ZM66-230Q106-222 114-188Q94-204 68-214Z" fill="#15111b" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/></g></g>`;
const CHS={},cw=$('cw'),cw2=$('cw2'),oc=$('O').getContext('2d'),bg=$('BG').getContext('2d');
const mkg=()=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML='<g class="in"></g><g class="ex"></g>';cw.appendChild(g);return{g,in:g.firstChild,ex:g.lastChild,key:''}};
for(const k in CHD)CHS[k]={...mkg(),d:CHD[k],id:CHD[k].id};['C','C2','C3','C4','C5','C6'].forEach(k=>CHS[k]={...mkg(),d:null,id:99});
const PLS={bed:1.2,hot:1.2,liv:1.2,kit:1.1,str:1.25,prc:1.35,prcW:1.35},PLC={};let CSH=null,GT=0,FR=[],FX={},CU=0,SHD=[];
const getPl=k=>{if(!PLC[k]){const c=PLATES[k].cam,VP=mul(persp(c.fov,W/H,.1,90),look(c.eye,c.tg));PLC[k]={VP,tf:Math.tan(c.fov/2),cam:c}}return PLC[k]};
function put(k,x,y,z,o={}){const C=CHS[k],P=CSH.pl,t=GT,id=C.id,p=o.px?[o.px[0],o.px[1],1]:pj(P.VP,x,y,z),ku=o.ku||.0046*(H/2)/(P.tf*p[2])*(o.sc||1)*(PLS[CSH.plate]||1),lm=mouthAt(k,t),spk=lm.on;
 let mood=o.m||'happy';if(spk&&o.mt)mood=o.mt;const rx=k=='CIB'&&REAC&&GT<REAC.t1-.12;if(rx){mood=['shock','scared','worry','sad','sleepy','blank','strain'].includes(mood)?'talkd':['angry','focus'].includes(mood)?'talka':'talk';o={...o,talk:.9,mry:undefined}}const six=o.six!=null,bl=o.blind!=null;const key=[mood,o.fr||'',o.pd?o.pd.join():'',o.hat===0?0:1,six?1:0,bl?1:0,o.hold?1:0].join('|');
 if(C.key!=key){C.key=key;const d={...C.d};if(o.hat===0)d.hat='';if(six)d.ic='#1d6fd6';d.fx=(d.fx||'')+(six?SIXFX(id):'')+(bl?BLINDFX(id):'');
  C.in.innerHTML=ch({...d,m:mood,front:o.fr,walk:1,pd:o.pd,hold:o.hold});const q=n=>$(n+id);C.el={aR:q('aR'),aL:q('aL'),lgL:q('lgL'),lgR:q('lgR'),mo:q('mo'),bl:q('bl'),bw:q('bw'),hg:q('hg'),bd:q('bd'),pp:C.g.querySelectorAll('.pp'),sx:q('sx'),sxi:q('sxi'),bf:q('bf'),bft:q('bft')}}
 const e=C.el,em=emph(t),g=spk*(o.gest??1)*(.4+lm.o);
 e.aR&&(e.aR.style.transform=`rotate(${o.aR??(sn(t*1.6+id)*3+g*16*sn(t*4.1+id*2)+em*9)}deg)`);e.aL&&(e.aL.style.transform=`rotate(${o.aL??(sn(t*1.4+id)*-3-g*16*sn(t*3.7+id*3)-em*9)}deg)`);
 const LGv=o.lg!=null?o.lg:2.2*sn(t*1.1+id);e.lgL&&(e.lgL.style.transform=`rotate(${LGv}deg)`);e.lgR&&(e.lgR.style.transform=`rotate(${-LGv}deg)`);
 if(e.mo){let ry=3,rx=14;if(o.mry!=null){ry=o.mry;rx=o.mrx||14}else if(o.talk>0){ry=3+o.talk*11*ab(sn(t*13+id*2));rx=14+o.talk*2}e.mo.setAttribute('ry',ry.toFixed(1));e.mo.setAttribute('rx',rx.toFixed(1))}
 const bp=3.1+.53*id,bph=((t+id*1.7)%bp)/bp;e.bl&&(e.bl.style.transform=`scaleY(${o.noblink||(six&&o.six>.05)?1:(bph>.962?.1:1)})`);
 e.bw&&e.bw.setAttribute('transform',`translate(0 ${(-em*9-(o.brow||0)).toFixed(1)})`);
 if(e.hg){e.hg.style.transformOrigin='0px -186px';e.hg.style.transform=`rotate(${((o.still?0:3*sn(t*.9+id)+.6*sn(t*2.3+id*2))+em*3+(o.tilt||0)).toFixed(2)}deg)`}
 const brt=o.still?0:sn(t*(o.brr||1.7)+id);e.bd&&(e.bd.style.transform=`scale(${(1+.005*brt).toFixed(4)},${(1+.014*brt).toFixed(4)})`);
 const sac=o.still||o.look?[0,0]:[(rnd(Math.floor(t*.8+id*.37),3.1)-.5)*5,(rnd(Math.floor(t*.8+id*.37),7.3)-.5)*2.5];
 e.pp&&e.pp.forEach(q=>q.setAttribute('transform',`translate(${((o.still?0:1.2*sn(t*.9+id*3))+sac[0]+(o.look?o.look[0]:0)).toFixed(1)} ${((o.still?0:.8*sn(t*1.3+id))+sac[1]+(o.look?o.look[1]:0)).toFixed(1)})`));
 if(e.sx){const s=cl(o.six),pu=1+.12*sn(t*7.3)+.25*vox(t);e.sx.setAttribute('opacity',(s*Math.min(1,pu)).toFixed(3));e.sx.setAttribute('transform',`translate(0 -232) scale(${(.7+.45*s*pu).toFixed(3)}) translate(0 232)`);e.sxi.setAttribute('opacity',cl(s*2.5).toFixed(3))}
 if(e.bf){const b=cl(o.blind);e.bf.style.display=b>.01?'':'none';e.bf.setAttribute('transform',`translate(0 ${(-(1-ez(b))*74).toFixed(1)})`);e.bft&&(e.bft.style.transform=`rotate(${(9*sn(t*6.5+id)+5*sn(t*11)).toFixed(1)}deg)`)}
 C.ex.innerHTML=o.extra||'';
 const bob=o.bobv!=null?o.bobv:(o.nobob||o.still?0:sn(t*3.2+id)*2*(o.bob||1));
 C.g.setAttribute('transform',`translate(${(p[0]+(o.nodrift||o.still?0:6*sn(t*.8+id*2))).toFixed(1)} ${(p[1]+bob).toFixed(1)}) scale(${(ku*(o.flip||1)*(o.sx||1)*(o.sq?o.sq.sx:1)*(1+.03*em)).toFixed(4)} ${(ku*(o.sy||1)*(o.sq?o.sq.sy:1)*(1-.025*em)).toFixed(4)}) rotate(${o.rot!=null?o.rot:(o.still?0:1.3*sn(t*.9+id))}) ${o.sit?'translate(0 90)':''}`);
 C.g.style.display='';C.g.style.opacity=o.op??1;C.z=o.zz??p[2];C.top=o.top;C.k=k;C.sit=o.sit?1:0;C.sp=[p[0],p[1]+(o.sit?90*ku:0),ku];FR.push(C);if(o.shd||(!o.px&&!o.sit&&y<.4&&!o.noshd))SHD.push([p[0],p[1],ku])}
function sprite(svg,x,y,sc,z,sl='C',rot=0,op=1){const C=CHS[sl];C.in.innerHTML=svg;C.ex.innerHTML='';C.g.setAttribute('transform',`translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) scale(${(+sc).toFixed(4)}) rotate(${rot})`);C.g.style.display='';C.g.style.opacity=op;C.z=z;C.k='C';C.top=0;FR.push(C)}
const sh1=(t,tm,dk=6)=>{let m=0;tm.forEach(b=>{const d=t-b;if(d>=0)m=Math.max(m,Math.exp(-d*dk))});return m};
const pop=(t,b)=>{const d=t-b;return d<0?0:1+.35*Math.exp(-d*7)*cs(d*30)};
const rnd=(i,a)=>Math.abs(sn(i*a+a)*43758.5453)%1;
const walk=(t,s=10,k=1)=>{const c=sn(t*s),a=ab(c);return{lg:34*c*k,aR:-30*c*k,aL:30*c*k,rot:2.2*sn(t*s*.5)*k,bobv:-8*(1-a)*k,sq:{sx:1+.018*a*k,sy:1-.03*a*k},tilt:2*sn(t*s+1.2)*k}};
const ob=(t,t0,d=.3)=>{const x=(t-t0)/d;if(x<=0)return 0;if(x>=1)return 1;const c=1.9,y=x-1;return 1+(c+1)*y*y*y+c*y*y};
const tw=(a,b,t0,d=.3)=>{const ant=GT<t0&&GT>t0-.1?sn((GT-t0+.1)/.1*Math.PI)*.1:0;return a+(b-a)*(ob(GT,t0,d)-ant)};
const SQ=(t0,k=1)=>{const d=GT-t0;if(d<-.1||d>.7)return{sx:1,sy:1};if(d<0){const a=sn((d+.1)/.1*Math.PI/2);return{sx:1+.05*a*k,sy:1-.07*a*k}}const e=Math.exp(-d*8)*cs(d*24);return{sx:1-.06*e*k,sy:1+.09*e*k}};
const kuAt=(p,sc)=>.0046*(H/2)/(CSH.pl.tf*p[2])*sc;
const P3=(x,y,z,sc=1)=>{const p=pj(CSH.pl.VP,x,y,z);return[p[0],p[1],kuAt(p,sc*(PLS[CSH.plate]||1)),p[2]]};
const RAYS=(t,t0,x,y,life=.35,n=16,col='#fff')=>{const d=t-t0;if(d<0||d>life)return'';const k=d/life;let s='';for(let i=0;i<n;i++){const a=i/n*6.283+rnd(i,3.3)*.3,r1=90+260*k,r2=r1+160*(1-k)+30,l=`x1="${(x+cs(a)*r1).toFixed(1)}" y1="${(y+sn(a)*r1).toFixed(1)}" x2="${(x+cs(a)*r2).toFixed(1)}" y2="${(y+sn(a)*r2).toFixed(1)}"`;s+=`<line ${l} stroke="${INK}" stroke-width="22" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/><line ${l} stroke="${col}" stroke-width="11" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/>`}return s};
const SWEAT=(x,y,a=1)=>`<path transform="translate(${x} ${y})" d="M0-20Q14 4 0 14Q-14 4 0-20Z" fill="#9ad0ff" opacity="${a}" ${S4}/>`;
// ---------- EFEITOS DOS SEIS OLHOS ----------
const CY='#4fd2ff',CY2='#bff4ff';
// simbolo do infinito (desenhado, a fonte nao tem o glifo)
const INF=(x,y,s,col=CY,a=1,rot=0)=>`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${rot}) scale(${s.toFixed(3)})" opacity="${a.toFixed(2)}"><path d="M0 0C30-46 96-46 96 0C96 46 30 46 0 0C-30-46-96-46-96 0C-96 46-30 46 0 0Z" fill="none" stroke="${INK}" stroke-width="30" stroke-linejoin="round"/><path d="M0 0C30-46 96-46 96 0C96 46 30 46 0 0C-30-46-96-46-96 0C-96 46-30 46 0 0Z" fill="none" stroke="${col}" stroke-width="16" stroke-linejoin="round"/></g>`;
// emblema: seis aneis girando (motivo visual dos Seis Olhos)
const EMB=(x,y,r,t,a,col=CY)=>{if(a<=0)return'';let s=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(t*22).toFixed(1)})" opacity="${a.toFixed(2)}" fill="none" stroke="${col}">`;for(let i=0;i<6;i++){const q=i/6*6.283;s+=`<circle cx="${(cs(q)*r).toFixed(1)}" cy="${(sn(q)*r).toFixed(1)}" r="${(r*.3).toFixed(1)}" stroke-width="5"/><circle cx="${(cs(q)*r).toFixed(1)}" cy="${(sn(q)*r).toFixed(1)}" r="${(r*.1).toFixed(1)}" fill="${col}" stroke="none"/>`}return s+`<circle r="${(r*1.42).toFixed(1)}" stroke-width="3" stroke-dasharray="18 14"/><circle r="${(r*.62).toFixed(1)}" stroke-width="6"/></g>`};
// aura de energia amaldicoada (chamas + correntes de fluxo), em unidades do personagem
const FLAME=(t,a,c1,c2,sc=1,seed=0,flow=0)=>{if(a<=.01)return'';let s='';const n=11;
 for(let L=0;L<2;L++)for(let i=0;i<n;i++){const u=i/(n-1)*2-1,x=u*118*sc,h=(250+80*sn(t*(7+L*2)+i*1.9+seed)+55*(i%2))*sc*(1-.55*u*u)*(L?.7:1),w=30*sc;
  s+=`<path d="M${(x-w).toFixed(1)} 10Q${(x-w*.6).toFixed(1)} ${(-h*.55).toFixed(1)} ${(x+12*sn(t*5+i)).toFixed(1)} ${(-h).toFixed(1)}Q${(x+w*.6).toFixed(1)} ${(-h*.55).toFixed(1)} ${(x+w).toFixed(1)} 10Z" fill="${L?c2:c1}" opacity="${(.42*a).toFixed(3)}"/>`}
 s=`<ellipse cx="0" cy="${(-150*sc).toFixed(1)}" rx="${(150*sc).toFixed(1)}" ry="${(220*sc).toFixed(1)}" fill="${c1}" opacity="${(.22*a).toFixed(3)}"/>`+s;
 if(flow>0){for(let j=0;j<3;j++){const ry=150+j*30,rx=70+j*18;s+=`<ellipse cx="0" cy="-160" rx="${rx*sc}" ry="${ry*sc}" transform="rotate(${(j*28-28+6*sn(t+j)).toFixed(1)} 0 -160)" fill="none" stroke="${c2}" stroke-width="${7*sc}" stroke-dasharray="${26*sc} ${22*sc}" stroke-dashoffset="${(-t*(160+j*40)*sc).toFixed(1)}" opacity="${(.85*flow*a).toFixed(3)}"/>`}
  for(let i=0;i<14;i++){const ph=(t*.55+rnd(i,4.1))%1,x=(rnd(i,9.7)-.5)*210*sc+12*sn(t*3+i),y=-(ph*360)*sc;s+=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${((4+5*rnd(i,2.2))*sc).toFixed(1)}" fill="#fff" opacity="${(flow*a*sn(ph*3.14)).toFixed(3)}"/>`}}
 return s};
// coloca uma aura atras de um personagem ja posicionado (camada aditiva, acompanha a camera)
const aura=(k,a,c1,c2,sc=1,flow=0,seed=0)=>{const p=CHS[k].sp;if(!p||a<=.01)return;FX.aw=(FX.aw||'')+`<g transform="translate(${p[0].toFixed(1)} ${p[1].toFixed(1)}) scale(${p[2].toFixed(4)})">${FLAME(GT,a,c1,c2,sc,seed,flow)}</g>`};
const fw=s=>{FX.fw=(FX.fw||'')+s};
// posicao dos olhos/peito de um personagem (coordenadas da cena, antes da camera)
const eyeP=k=>{const p=CHS[k].sp;return[p[0],p[1]-232*p[2]]},chestP=k=>{const p=CHS[k].sp;return[p[0],p[1]-150*p[2]]};
const eyeGlow=(k,a,r=1)=>{const p=CHS[k].sp,e=eyeP(k);if(a<=0)return;(FX.gls=FX.gls||[]).push([e[0]-25*p[2],e[1],40*p[2]*r,'110,210,255',.42*a],[e[0]+25*p[2],e[1],40*p[2]*r,'110,210,255',.42*a],[e[0],e[1]+20*p[2],170*p[2]*r,'40,120,255',.16*a])};
// anel de varredura (onda que sai dos olhos)
const SCAN=(x,y,t0,life=1.1,R=1500,col=CY)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,e=1-(1-k)*(1-k);return`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(40+R*e).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${(26*(1-k)+3).toFixed(1)}" opacity="${(.9*(1-k)).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(40+R*e*.82).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(6*(1-k)).toFixed(1)}" opacity="${(.7*(1-k)).toFixed(2)}"/>`};
// anel de onda no espaco (deformacao do Ilimitado)
const RIP=(x,y,t0,life=.8,R=300,col=CY2)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life;return`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(R*k).toFixed(1)}" ry="${(R*k).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${(10*(1-k)+1.5).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`};
// esfera de refracao do Ilimitado (em volta do personagem)
const SPHERE=(x,y,r,a,t)=>a<=.01?'':`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)})" opacity="${a.toFixed(2)}"><circle r="${r.toFixed(1)}" fill="url(#sph)"/><circle r="${r.toFixed(1)}" fill="none" stroke="${CY2}" stroke-width="3" opacity=".6"/>${[0,1,2].map(i=>`<ellipse rx="${r.toFixed(1)}" ry="${(r*(.18+.1*i)).toFixed(1)}" transform="rotate(${(t*(18+i*9)+i*60).toFixed(1)})" fill="none" stroke="${CY}" stroke-width="2.5" stroke-dasharray="${(r*.25).toFixed(1)} ${(r*.12).toFixed(1)}" opacity=".55"/>`).join('')}</g>`;
// HUD de analise em volta dos olhos (unidades do personagem)
const EYEHUD=(k,a,t)=>{const p=CHS[k].sp;if(!p||a<=.01)return;const e=eyeP(k),u=p[2];let s=`<g transform="translate(${e[0].toFixed(1)} ${e[1].toFixed(1)}) scale(${u.toFixed(4)})" opacity="${a.toFixed(2)}" fill="none">`;
 [-25,25].forEach((x,j)=>{s+=`<g transform="translate(${x} 0)"><circle r="34" stroke="${CY}" stroke-width="2.5" stroke-dasharray="10 6" transform="rotate(${(t*90*(j?1:-1)).toFixed(1)})"/><circle r="46" stroke="${CY2}" stroke-width="1.5" stroke-dasharray="40 20 6 20" transform="rotate(${(-t*50*(j?1:-1)).toFixed(1)})"/></g>`});
 for(let i=0;i<8;i++){const q=i/8*6.283+t*.6,r1=70,r2=95+10*sn(t*4+i);s+=`<line x1="${(cs(q)*r1).toFixed(1)}" y1="${(sn(q)*r1*.6).toFixed(1)}" x2="${(cs(q)*r2).toFixed(1)}" y2="${(sn(q)*r2*.6).toFixed(1)}" stroke="${CY}" stroke-width="2"/>`}
 fw(s+'</g>')};
// sobrecarga de informacao (fragmentos de dados voando)
const GLY=['ENERGIA 87%','FLUXO ↑','Δ 0.003','x 241 · y 88','◎ ALVO','RISCO 12%','DIST 3.4 m','01101001','18:42:07','PULSO 120','⚠','SCAN','LUZ 4100K','VENTO 2 m/s','?','!!','Σ 9.81','#3FA2'];
const OVER=(t,a,cx=540,cy=900)=>{if(a<=.01)return'';let s='';const n=Math.round(46*a);for(let i=0;i<n;i++){const L=.8+.9*rnd(i,3.3),ph=((t+rnd(i,7.1)*L)%L)/L,an=rnd(i,12.9)*6.283,R=120+ph*(600+500*rnd(i,1.7)),x=cx+cs(an)*R,y=cy+sn(an)*R*1.35,sz=22+30*rnd(i,5.5)*(.6+ph),fl=rnd(Math.floor(t*18)+i,2.9)>.15?1:.2,col=rnd(i,8.8)>.82?'#ff4d6d':rnd(i,6.6)>.5?CY2:'#fff';
 if(i%4==0)s+=`<rect x="${(x-sz*2).toFixed(1)}" y="${(y-sz*.9).toFixed(1)}" width="${(sz*4).toFixed(1)}" height="${(sz*1.5).toFixed(1)}" fill="none" stroke="${col}" stroke-width="2" opacity="${(a*(1-ph)*.6*fl).toFixed(2)}"/>`;
 s+=`<text x="${x.toFixed(1)}" y="${y.toFixed(1)}" font-size="${sz.toFixed(0)}" text-anchor="middle" fill="${col}" font-family="Poppins,DejaVu Sans,sans-serif" font-weight="800" opacity="${(a*sn(ph*3.14)*fl).toFixed(2)}">${GLY[i%GLY.length]}</text>`}return s};
// cartela de capitulo (Ponto 1/2/3)
const CARD=(t0,t1,n,title,col=CY)=>{if(GT<t0||GT>t1)return'';const a=ob(GT,t0,.4),o=1-ez((GT-t1+.3)/.3),w=1240*a;
 return`<g opacity="${o.toFixed(2)}"><g transform="translate(540 330) rotate(-5)"><rect x="${(-w/2).toFixed(1)}" y="-100" width="${w.toFixed(1)}" height="200" fill="#070a24" opacity=".86"/><rect x="${(-w/2).toFixed(1)}" y="-100" width="${w.toFixed(1)}" height="10" fill="${col}"/><rect x="${(-w/2).toFixed(1)}" y="90" width="${w.toFixed(1)}" height="10" fill="${col}"/><rect x="${(-w/2+w*((GT*.7)%1)).toFixed(1)}" y="-100" width="60" height="200" fill="#fff" opacity=".08"/></g>`+TXT(`PONTO ${n}`,540,283,50,col,-5,pop(GT,t0+.12))+TXT(title,540,392,112,'#fff',-5,pop(GT,t0+.25))+'</g>'};
// criatura amaldicoada (design original), braco estica ate (fx,fy) em unidades locais
const CURSE=(o={})=>{const t=GT,fx=o.fx??-170,fy=o.fy??-200,sx=-100,sy=-215,mx=(sx+fx)/2,my=(sy+fy)/2-50,st=o.str||0,jit=st*3*sn(t*47);
 const eye=(x,y,r)=>`<ellipse cx="${x}" cy="${y}" rx="${r}" ry="${r*.8}" fill="#ffe14d" ${S4}/><ellipse cx="${x-r*.15}" cy="${y}" rx="${r*.22}" ry="${r*.62}" fill="#d8143a"/>`;
 return`<g transform="translate(${jit.toFixed(1)} 0)"><ellipse cy="6" rx="180" ry="26" fill="rgba(0,0,0,.4)"/>${[-120,-60,0,60,120].map((x,i)=>`<path d="M${x-24}-40Q${(x+16*sn(t*7+i)).toFixed(1)} 22 ${x+24}-40Z" fill="#2a1038" ${S4}/>`).join('')}
<path d="M-70-370L-108-462L-28-392ZM70-370L108-462L28-392Z" fill="#2a1038" ${S}/>
<path d="M-160-60Q-205-270-95-372Q0-432 95-372Q205-270 160-60Q0-18-160-60Z" fill="#3b1a52" ${S}/><path d="M-118-92Q0-62 118-92Q98-206 0-228Q-98-206-118-92Z" fill="#562873"/>
${eye(-62,-300,26)}${eye(14,-322,34)}${eye(80,-288,22)}${eye(-20,-258,15)}${eye(58,-240,13)}
<path d="M-86-176Q0-${(118-30*(o.mouth||0)).toFixed(0)} 86-176Q62-${(104-40*(o.mouth||0)).toFixed(0)} 0-${(92-40*(o.mouth||0)).toFixed(0)}Q-62-${(104-40*(o.mouth||0)).toFixed(0)}-86-176Z" fill="#12040f" ${S}/>${[-60,-30,0,30,60].map(x=>`<path d="M${x-10}-168L${x}-150L${x+10}-168Z" fill="#fff8e8"/>`).join('')}
<path d="M${sx} ${sy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${fx.toFixed(1)} ${fy.toFixed(1)}" stroke="${INK}" stroke-width="62" fill="none" stroke-linecap="round"/><path d="M${sx} ${sy}Q${mx.toFixed(1)} ${my.toFixed(1)} ${fx.toFixed(1)} ${fy.toFixed(1)}" stroke="#3b1a52" stroke-width="46" fill="none" stroke-linecap="round"/>
<g transform="translate(${fx.toFixed(1)} ${fy.toFixed(1)}) rotate(${(st*4*sn(t*39)).toFixed(1)})"><circle r="52" fill="#3b1a52" ${S}/><path d="M-30-34Q-52-6-30 28M-6-44Q-26 0-6 40" stroke="${INK}" stroke-width="6" fill="none" stroke-linecap="round"/>${[-36,-12,12].map(y=>`<path d="M-48 ${y}L-78 ${y+8}L-48 ${y+18}Z" fill="#e8dcc8" ${S4}/>`).join('')}</g></g>`};
// ---------- CAMERA ----------
const camA=K=>{let i=0;while(i<K.length-1&&GT>=K[i+1][0])i++;const a=K[i],b=K[i+1];let v;
 if(!b||GT<a[0]||b[5]==='c')v=a.slice(1,5);else{const w=ez((GT-a[0])/(b[0]-a[0]));v=[1,2,3,4].map(j=>lp(a[j],b[j],w))}
 const z=Math.max(v[0],.012+.034*Math.abs(v[3])),mx=Math.max(0,540*z-16),my0=-Math.max(0,920*z-16),my1=Math.max(0,1000*z-16);
 FX.cz=z;FX.cpn=[Math.max(-mx,Math.min(mx,v[1])),Math.max(my0,Math.min(my1,v[2]))];FX.roll=v[3]};
const foc=(x,y,z)=>{const S=1+z*1.06;return[-(x-540)*S,-(y-1000)*S]};
// ---------- TRANSICOES ----------
const TDUR=.24;
const trans=(gt,sh)=>{const R={dx:0,dy:0,s:1,bx:0,by:0,fl:0,col:'255,255,255',r:0,vhs:0};const i=SH.indexOf(sh),nx=SH[i+1];
 const ap=(type,p,io)=>{const e=p*p;
  if(type=='wl'||type=='wr'){const dr=(type=='wl'?-1:1)*(io=='out'?1:-1);R.s=1+.34*e;R.dx=dr*e*190;R.bx=e*50;R.r=dr*e*1.6}
  else if(type=='wu'){const dr=io=='out'?-1:1;R.s=1+.3*e;R.dy=dr*e*260;R.by=e*60}
  else if(type=='zoom'){R.s=1+.55*e;R.bx=R.by=e*12}
  else if(type.startsWith('flash')){R.s=1+.08*e;R.fl=Math.min(.95,e*1.1);R.col=type=='flashO'?'255,170,90':type=='flashR'?'255,40,60':type=='flashB'?'140,215,255':type=='flashP'?'190,110,255':'255,255,255';R.bx=R.by=e*5}
  else if(type=='dip'){R.fl=e*.92;R.col='3,4,18'}
  else if(type=='glitch'){R.vhs=Math.max(R.vhs,p);R.dx=(rnd(Math.floor(gt*40),3.1)-.5)*120*p;R.bx=p*30}};
 const ti=gt-sh.t0,dI=sh.tin=='dip'||sh.tin=='glitch'?.4:TDUR;if(sh.tin&&ti<dI)ap(sh.tin,1-ti/dI,'in');
 const dO=nx&&(nx.tin=='dip'||nx.tin=='glitch')?.4:TDUR;if(nx&&nx.tin&&gt>sh.t1-dO)ap(nx.tin,(gt-(sh.t1-dO))/dO,'out');return R};
// ---------- LUZ DOS PERSONAGENS 2D (integracao com o cenario 3D) ----------
const LIT={bed:{amb:[.62,.68,1],rim:[140,190,255],d:[-1,-.5],sh:.34,ri:.8},str:{amb:[.72,.72,1],rim:[160,170,255],d:[-1,-.8],sh:.42,ri:.85},
 twn:{amb:[1,.98,.95],rim:[255,235,190],d:[1,-.8],sh:.3,ri:.75},liv:{amb:[.95,.86,.92],rim:[255,180,220],d:[1,-.5],sh:.34,ri:.75},
 prcW:{amb:[.7,.74,1],rim:[150,180,255],d:[-1,-.7],sh:.42,ri:.85},twn3:{amb:[.68,.7,.98],rim:[160,170,255],d:[-1,-.8],sh:.45,ri:.85},
 hot:{amb:[.74,.62,.66],rim:[255,150,110],d:[-1,-.3],sh:.45,ri:.75},kit:{amb:[1,.94,.94],rim:[255,240,220],d:[-.4,-1],sh:.3,ri:.7},
 road:{amb:[1,.92,.86],rim:[255,180,100],d:[1,-.6],sh:.34,ri:.95},cos:{amb:[.86,.92,1.08],rim:[110,200,255],d:[0,-1],sh:.3,ri:1}};
// luz azul dos olhos somada a luz da cena
const blueLit=(L,k)=>({amb:L.amb.map((v,i)=>lp(v,[.82,.92,1.12][i],k*.5)),rim:L.rim.map((v,i)=>Math.round(lp(v,[110,205,255][i],k))),d:L.d,sh:L.sh,ri:lp(L.ri,1,k)});
document.body.insertAdjacentHTML('beforeend',`<svg width="0" height="0" style="position:absolute"><filter id="lit" x="-3%" y="-3%" width="106%" height="106%" color-interpolation-filters="sRGB">
<feColorMatrix id="litA" in="SourceGraphic" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0" result="tint"/>
<feGaussianBlur in="SourceAlpha" stdDeviation="4" result="erb"/><feComponentTransfer in="erb" result="er"><feFuncA type="linear" slope="10" intercept="-8.8"/></feComponentTransfer>
<feOffset id="litO1" in="er" dx="0" dy="0" result="o1"/><feComposite in="er" in2="o1" operator="out" result="rimM"/><feGaussianBlur in="rimM" stdDeviation="1.6" result="rimB"/>
<feFlood id="litR" flood-color="rgb(255,200,120)" flood-opacity=".8"/><feComposite in2="rimB" operator="in" result="rim"/>
<feOffset id="litO2" in="er" dx="0" dy="0" result="o2"/><feComposite in="er" in2="o2" operator="out" result="shM"/><feGaussianBlur in="shM" stdDeviation="9" result="shB"/><feComposite in="shB" in2="er" operator="in" result="shC"/>
<feFlood id="litS" flood-color="rgb(30,10,50)" flood-opacity=".3"/><feComposite in2="shC" operator="in" result="shd"/>
<feMerge><feMergeNode in="tint"/><feMergeNode in="shd"/><feMergeNode in="rim"/></feMerge></filter>
<filter id="mbx" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur id="mbg" stdDeviation="0 0"/></filter>
<filter id="warp" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920" color-interpolation-filters="sRGB"><feFlood flood-color="rgb(128,128,128)" result="fl"/><feImage id="wimg" x="0" y="0" width="10" height="10" preserveAspectRatio="none" result="im"/><feMerge result="map"><feMergeNode in="fl"/><feMergeNode in="im"/></feMerge><feDisplacementMap id="wdm" in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="sonar" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920" color-interpolation-filters="sRGB"><feComponentTransfer in="SourceGraphic" result="dk"><feFuncR id="sdR" type="linear" slope="1"/><feFuncG id="sdG" type="linear" slope="1"/><feFuncB id="sdB" type="linear" slope="1"/></feComponentTransfer><feConvolveMatrix in="SourceGraphic" order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" result="ed"/><feColorMatrix id="scm" in="ed" type="matrix" values="0 0 0 0 0 .5 .5 .5 0 0 .9 .9 .9 0 0 0 0 0 1 0" result="edc"/><feMorphology in="edc" operator="dilate" radius="1.2" result="edd"/><feGaussianBlur in="edd" stdDeviation="1.4" result="edb"/><feBlend in="dk" in2="edb" mode="screen"/></filter></svg>`);
// mapa de deslocamento radial (lente que dobra o espaco)
{const n=256,cv=document.createElement('canvas');cv.width=cv.height=n;const c=cv.getContext('2d'),im=c.createImageData(n,n);
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const u=i/(n-1)*2-1,v=j/(n-1)*2-1,r=Math.hypot(u,v),k=(i+j*n)*4;let dx=0,dy=0;if(r<1&&r>1e-3){const a=Math.pow(sn(Math.PI*r),2)*(1-r*.3);dx=-u/r*a;dy=-v/r*a}
  im.data[k]=128+127*dx;im.data[k+1]=128+127*dy;im.data[k+2]=128;im.data[k+3]=255}
 c.putImageData(im,0,0);$('wimg').setAttribute('href',cv.toDataURL())}
let LITK='';const setLit=L=>{const k=JSON.stringify(L);if(k==LITK)return;LITK=k;const a=L.amb,n=Math.hypot(L.d[0],L.d[1])||1,dx=L.d[0]/n,dy=L.d[1]/n;
 $('litA').setAttribute('values',`${a[0]} 0 0 0 0 0 ${a[1]} 0 0 0 0 0 ${a[2]} 0 0 0 0 0 1 0`);
 $('litO1').setAttribute('dx',(-dx*7).toFixed(1));$('litO1').setAttribute('dy',(-dy*7).toFixed(1));$('litR').setAttribute('flood-color',`rgb(${L.rim.join()})`);$('litR').setAttribute('flood-opacity',(L.ri*.62).toFixed(2));
 $('litO2').setAttribute('dx',(dx*34).toFixed(1));$('litO2').setAttribute('dy',(dy*34).toFixed(1));$('litS').setAttribute('flood-opacity',L.sh)};
// ---------- FUNDO COSMICO (canvas) ----------
function cosmos(c,t,o={}){const g=c.createRadialGradient(540,950,0,540,950,1500);g.addColorStop(0,o.c0||'#1d3d9a');g.addColorStop(.42,o.c1||'#0b1352');g.addColorStop(1,'#02030e');c.fillStyle=g;c.fillRect(0,0,W,H);
 c.globalCompositeOperation='lighter';const k=o.k??1;
 for(let i=0;i<7;i++){const x=540+460*sn(i*2.1+t*.06),y=950+760*cs(i*1.3+t*.05),r=420+140*sn(i+t*.25);const q=c.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,i%2?`rgba(50,120,255,${.2*k})`:`rgba(${o.warm?'255,90,140':'130,70,255'},${.15*k})`);q.addColorStop(1,'rgba(0,0,0,0)');c.fillStyle=q;c.fillRect(x-r,y-r,2*r,2*r)}
 for(let i=0;i<190;i++){const z=rnd(i,3.7),x=(rnd(i,12.9)*W+t*(8+30*z)*(o.dr??1))%W,y=rnd(i,78.2)*H,a=(.25+.75*z)*(.45+.55*ab(sn(t*(1+z*3)+i)));c.fillStyle=`rgba(205,228,255,${a.toFixed(3)})`;const s=1+z*3.2;c.fillRect(x,y,s,s)}
 if(o.streak){for(let i=0;i<26;i++){const an=rnd(i,9.1)*6.283,ph=(t*o.streak+rnd(i,4.2))%1,r1=80+ph*1300,L=120+ph*360;c.strokeStyle=`rgba(150,215,255,${(.5*ph*(1-ph)*2).toFixed(3)})`;c.lineWidth=2+ph*5;c.beginPath();c.moveTo(540+cs(an)*r1,(o.sy||950)+sn(an)*r1);c.lineTo(540+cs(an)*(r1+L),(o.sy||950)+sn(an)*(r1+L));c.stroke()}}
 c.globalCompositeOperation='source-over'}
// ---------- PLANOS ----------
const SH=[];const shot=(plate,t0,f,tin)=>SH.push({plate,t0,f,tin});
const C=CHS;
// ===== 0) GANCHO: acordar com os Seis Olhos =====
const tOpen=wt(1,'tivesse',.3),tSix=wt(1,'Seis',.0),tGojo=wt(1,'Gojo',.3);
shot('bed',0,(t,u)=>{
 const on=ob(GT,tOpen,.25),six=GT<tOpen?0:Math.min(1,on*1.1)*(.75+.25*sn(GT*5));
 put('CIB',0,.85,-2.6,{sc:1,sit:1,m:GT<tOpen?'closed':GT<tSix?'wow':'focus',six:GT<tOpen?0:six,aR:tw(-18,-40,tOpen,.3),aL:tw(18,40,tOpen,.3),brow:tw(0,7,tOpen,.25),sq:SQ(tOpen,1.2),nobob:1,brr:GT<tOpen?.9:2.6,look:[0,0]});
 const e=eyeP('CIB'),ku=C.CIB.sp[2];
 if(GT<tOpen){const lk=.35+.25*sn(GT*9)+.4*cl((GT-tOpen+.6)/.6);(FX.gls=[]).push([e[0],e[1]+6*ku,170*ku,'80,190,255',.5*lk])}else eyeGlow('CIB',six,1+.8*sh1(GT,[tOpen],4));
 FX.pf=[[e[0],e[1],260*ku,28,'150,220,255',.5+.5*on,'rise']];
 let ui=TXT('E SE VOCÊ TIVESSE',540,250,70,'#fff',-3,pop(GT,.05));
 if(GT>tSix-.05)ui+=TXT('OS SEIS OLHOS?',540,368,112,CY,-3,pop(GT,tSix)*(1+.025*sn(GT*6)));
 const ez0=zpE(e);if(GT>tOpen)ui+=SCAN(ez0[0],ez0[1],tOpen,.9,900)+RAYS(GT,tOpen,ez0[0],ez0[1],.4,18,CY2);
 
 const F=foc(e[0],e[1]+40*ku,.95),F2=foc(e[0],e[1],1.55);
 camA([[0,.95,F[0],F[1],-2],[tOpen-.05,1.05,F[0],F[1],0],[tOpen,1.2,F[0]*1.1,F[1]*1.1,1,'c'],[tSix-.05,.7,F[0]*.75,F[1]*.75,-1],[tSix,1.55,F2[0],F2[1],0,'c'],[ps(2),1.7,F2[0],F2[1],1]]);
 FX.ui=ui;FX.night=1;FX.vig=.75;FX.shake=14*sh1(GT,[tOpen],5)+6*sh1(GT,[tSix],6);FX.flash=.3*sh1(GT,[tOpen],10);FX.flcol='150,220,255';FX.lit=blueLit(LIT.bed,six);FX.chroma=4*sh1(GT,[tOpen,tSix],5)},'');
// ===== 1) "o poder mais absurdo" (espaco cosmico) =====
const tAbs=wt(2,'rara',.1),tJK=wt(2,'habilidade',.1);
shot(null,ps(2)-.15,(t,u)=>{FX.bg=c=>cosmos(c,GT,{streak:.35});
 const fl=sn(GT*1.6)*14;put('CIB',0,0,0,{px:[540,1420+fl],ku:2.05,m:GT<tAbs?'awe':'grin',six:1,aR:tw(-40,-150,tAbs-.25,.45)+6*sn(GT*3),aL:tw(40,150,tAbs-.25,.45)-6*sn(GT*3.2),lg:6*sn(GT*2),brow:tw(0,6,tAbs,.3),sq:SQ(tAbs,.8),nodrift:1,nobob:1,rot:2*sn(GT*.8),zz:2,look:[0,-3]});
 aura('CIB',.9,'#1f7bff','#7fe6ff',1.15,1,0);eyeGlow('CIB',1,1.1);const c0=chestP('CIB'),ku=C.CIB.sp[2];
 FX.pf=[[c0[0],c0[1],380*ku,40,'140,215,255',.9,'orbit']];FX.rays=[[c0[0],c0[1]-60*ku,.35+.25*sh1(GT,[tAbs],2),'90,170,255',14,1400]];
 let ui='';if(GT>tJK)ui+=TXT('UMA HABILIDADE',540,270,76,'#fff',-3,pop(GT,tJK));if(GT>tAbs-.05)ui+=TXT('TÃO RARA',540,400,150,'#ffd23f',-3,pop(GT,tAbs+.1)*(1+.03*sn(GT*7)))+RAYS(GT,tAbs+.1,540,380,.4,16,'#ffe27a');
 camA([[ps(2)-.15,.55,0,-250,-3],[tAbs-.3,.18,0,-60,2],[tAbs,.05,0,0,0,'c'],[ps(3),.12,0,-40,-1.5]]);
 FX.ui=ui;FX.shake=10*sh1(GT,[tAbs],5)+1.5;FX.lit=LIT.cos;FX.flash=.3*sh1(GT,[tAbs],9);FX.flcol='180,230,255'},'flashB');
// ===== 2) "Mas existe um detalhe..." (rua a noite, clima muda) =====
const tDet=wt(3,'poderosos',.2),tVida=wt(3,'mundo',.3);
shot('str',ps(3)-.05,(t,u)=>{
 put('CIB',0,0,1.6,{sc:1.05,m:GT<tDet?'calm':'cool',six:.75+.15*sn(GT*4),look:[0,2],brr:1.3});eyeGlow('CIB',.75);aura('CIB',ob(GT,tDet,.4)*.6,'#1f7bff','#7fe6ff',1,1);
 const e=eyeP('CIB'),F=foc(e[0],e[1]+120*C.CIB.sp[2],.5);
 let ui='';if(GT>wt(3,'feiticeiros',.1))ui+=TXT('UM DOS FEITICEIROS',540,270,70,'#fff',-2,pop(GT,wt(3,'feiticeiros',.1)));if(GT>tDet)ui+=TXT('MAIS PODEROSOS',540,390,112,CY,-2,pop(GT,tDet)*(1+.02*sn(GT*7)));
 camA([[ps(3)-.2,.02,0,0,0],[tDet,.25,F[0]*.6,F[1]*.6,0],[ps(4),.52,F[0],F[1],1]]);
 FX.ui=ui;FX.vig=.7;FX.fog=1;FX.lit=blueLit(LIT.str,.7);FX.shake=6*sh1(GT,[tDet],6);FX.gl=[[540,560,700,'90,120,255',.12]]},'dip');
// ===== 3) PONTO 1: A VISAO =====
const tVis=wt(4,'visão',.3);
shot(null,ps(4)-.25,(t,u)=>{FX.bg=c=>cosmos(c,GT,{k:.6,dr:.4});
 const s=cl(.45+.55*ob(GT,tVis,.35));put('CIB',0,0,0,{px:[540,1040+232*4.6],ku:4.6,m:'focus',six:s,look:[sn(GT*1.1)*3,0],nodrift:1,nobob:1,still:0,rot:0,zz:2});
 eyeGlow('CIB',s,1.2);const e=eyeP('CIB'),ku=C.CIB.sp[2];EYEHUD('CIB',ob(GT,tVis,.4),GT);
 let ui=CARD(ps(4)-.2,ps(5)-.05,1,'A VISÃO');ui+=SCAN(e[0],e[1],tVis,1,1100);
 camA([[ps(4)-.25,.0,0,0,-2],[ps(5),.16,0,40,1]]);
 FX.ui=ui;FX.pf=[[e[0],e[1],520,30,'140,215,255',.8,'in']];FX.lit=blueLit(LIT.cos,1);FX.vig=.7;FX.shake=6*sh1(GT,[tVis],6);FX.flash=.35*sh1(GT,[tVis],10);FX.flcol='150,220,255'},'zoom');
// ===== 4a) A cidade vista pelos Seis Olhos: energia ao redor das pessoas =====
const RES=[['T1',-2.3,-1.2,'#ff5d8f','#ffc2d4'],['T2',2.2,-2.0,'#2ee6c8','#c8fff4'],['T3',-.5,-5.2,'#ffbe0b','#fff1b8'],['R4',2.9,-6.8,'#9b6bff','#e2d4ff'],['R5',-3.2,-8.2,'#4caf50','#d4ffd6']];
const tPer=wt(5,'enxergar',.4),tRed=wt(5,'energia',.3);
shot('twn',ps(5)-.1,(t,u)=>{
 const vis=ob(GT,tPer+.15,.35);
 RES.forEach(([k,x,z,c1,c2],i)=>{put(k,x,0,z,{sc:2.4,m:'happy',look:[-x*1.5,0],...(i==2?walk(GT,7,.6):{})});});
 put('CIB',-.9,0,4.6,{sc:2.3,m:GT<tPer?'calm':'awe',six:.6+.4*vis,look:[7,-2],tilt:-3,brr:1.6});eyeGlow('CIB',.6+.4*vis);
 RES.forEach(([k,x,z,c1,c2],i)=>{const d=Math.hypot(x+.9,z-4.6),a=cl((GT-tPer-.15-d*.06)/.35);aura(k,a,c1,c2,1,a*.5,i)});
 const e=eyeP('CIB'),ez0=zpE(e);let ui=SCAN(ez0[0],ez0[1],tPer+.1,1.2,1700);
 if(GT>tRed)ui+=TXT('ENERGIA AMALDIÇOADA',540,320,74,CY,-3,pop(GT,tRed));
 const F=foc(e[0],e[1],.35);
 camA([[ps(5)-.1,.36,F[0],F[1],-1],[tPer,.4,F[0]*1.05,F[1]*1.05,0],[tPer+.15,.08,0,-60,0,'c'],[ps(6),.03,0,-40,1]]);
 FX.ui=ui;FX.vis=vis;FX.lit=blueLit(LIT.twn,vis*.8);FX.flash=.4*sh1(GT,[tPer+.15],9);FX.flcol='150,220,255';FX.chroma=3*sh1(GT,[tPer+.15],6)},'wr');
// ===== 4b) identificar o fluxo / detalhes que outros feiticeiros nao notam =====
const tFlu=wt(6,'perceber',.2),tDtl=wt(6,'detalhes',.2),tFei=wt(6,'outras',.2),tJam=wt(6,'jamais',.3);
shot('twn',ps(6)-.05,(t,u)=>{
 RES.forEach(([k,x,z,c1,c2],i)=>{const conf=(k=='R4'||k=='T3')&&GT>tFei;put(k,x,0,z,{sc:2.4,m:conf?'worry':'happy',look:conf?[6*sn(GT*2+i),-4]:[-x*1.5,0],tilt:conf?6*sn(GT*1.5+i):0});
  aura(k,1,c1,c2,1,k=='T1'?ob(GT,tFlu,.4):(k=='T2'&&GT>tDtl?1:.35),i)});
 const p1=C.T1.sp,p2=C.T2.sp;
 // reticulo no fluxo (T1) e lupa de detalhe (T2)
 if(GT>tFlu-.1&&GT<tDtl+.1){const a=ob(GT,tFlu-.1,.3);fw(`<g transform="translate(${p1[0].toFixed(1)} ${(p1[1]-160*p1[2]).toFixed(1)}) scale(${p1[2].toFixed(4)})" opacity="${a.toFixed(2)}"><rect x="-170" y="-220" width="340" height="420" fill="none" stroke="${CY}" stroke-width="6" stroke-dasharray="60 280"/><circle r="40" fill="none" stroke="${CY2}" stroke-width="4" transform="rotate(${GT*120})" stroke-dasharray="20 12"/></g>`)}
 if(GT>tDtl-.1){const a=ob(GT,tDtl-.1,.3),x=p2[0],y=p2[1]-200*p2[2];fw(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(p2[2]*a).toFixed(4)})"><circle r="120" fill="rgba(120,220,255,.12)" stroke="${CY2}" stroke-width="8"/><path d="M84 84L170 170" stroke="${CY2}" stroke-width="18" stroke-linecap="round"/>${[0,1,2,3].map(i=>`<circle cx="${(50*cs(GT*3+i*1.57)).toFixed(1)}" cy="${(50*sn(GT*3+i*1.57)).toFixed(1)}" r="9" fill="#fff"/>`).join('')}</g>`)}
 let ui='';if(GT>tDtl)ui+=TXT('DETALHES',540,300,120,CY,-3,pop(GT,tDtl));
 if(GT>tFei){[['R4'],['T3']].forEach(([k],i)=>{const p=C[k].sp,q=zpS(p[0]+40*p[2],p[1]-360*p[2]);ui+=TXT('?',q[0],q[1],110,'#fff',8*sn(GT*3+i),pop(GT,tFei+i*.12))})}
 if(GT>tJam)ui+=TXT('JAMAIS NOTARIAM',540,430,66,'#ffd23f',-3,pop(GT,tJam));
 const F1=foc(p1[0],p1[1]-170*p1[2],.5),F2=foc(p2[0],p2[1]-180*p2[2],.55);
 camA([[ps(6)-.1,.42,F1[0],F1[1],-1],[tDtl-.25,.5,F1[0],F1[1],1],[tDtl-.05,.55,F2[0],F2[1],0,'c'],[tFei-.15,.6,F2[0],F2[1],-1],[tFei,.1,0,-40,0,'c'],[ps(7),.14,0,-60,1]]);
 FX.ui=ui;FX.vis=1;FX.lit=blueLit(LIT.twn,.8)},'zoom');
// ===== 5) A sala: alguem escondendo uma energia gigantesca =====
const tSala=wt(7,'como',.4),tPer2=wt(7,'descobrir',.3),tGig=wt(7,'invisível',.15);
shot('liv',ps(7)-.2,(t,u)=>{
 const vis=ob(GT,tPer2,.3),cx=lp(-2.1,-.85,ez((GT-ps(7)+.2)/(tSala-ps(7)+.6))),wk=GT<tSala+.35,big=ob(GT,tGig,.35);
 put('T3',-.15,.55,-2.45,{sc:1,sit:1,m:'happy',look:[-4,0]});
 put('ELI',.95,0,-2.1,{sc:1.05,flip:-1,m:GT<tGig?'blank':'smirk',look:[-7,0],brow:2,still:GT<tGig,brr:1.2});
 put('CIB',cx,0,-1.55,{sc:1,m:GT<tPer2?'calm':GT<tGig?'focus':'shock',six:.5+.5*vis,look:GT<tGig?[8,0]:[10,-3],...(wk?walk(GT,8,1-ez((GT-tSala-.05)/.3)):{}),sq:SQ(tGig,1.3),...(GT>tGig?{aR:tw(-20,-60,tGig,.3),aL:tw(20,60,tGig,.3)}:{}),brow:GT>tGig?9:0});
 eyeGlow('CIB',.5+.5*vis);
 aura('T3',vis*.8,'#ffbe0b','#fff1b8',.8,.3,2);
 aura('ELI',vis*(GT<tGig?.18:1.6),'#7a2cff','#d6a8ff',GT<tGig?.7:lp(.7,3.6,big),GT>tGig?1:0,5);
 const pe2=C.ELI.sp;let ui='';
 if(GT>tGig){ui+=TXT('UM MUNDO',540,235,64,'#fff',-4,pop(GT,tGig-.1))+TXT('INVISÍVEL',540,385,140,'#c98bff',-4,pop(GT,tGig)*(1+.03*sn(GT*9)));const q=zpS(pe2[0],pe2[1]-200*pe2[2]);ui+=RAYS(GT,tGig,q[0],q[1],.45,18,'#c98bff')}
 const F=foc(pe2[0],pe2[1]-210*pe2[2],.45);
 camA([[ps(7)-.2,.05,0,0,-1],[tPer2,.1,-40,0,0],[tGig-.35,.16,F[0]*.4,F[1]*.4,0],[tGig,.45,F[0],F[1],-2,'c'],[ps(8),.34,F[0]*.8,F[1]*.8,1]]);
 FX.ui=ui;FX.vis=vis*.85;FX.lit=blueLit(LIT.liv,vis*.6);FX.shake=16*sh1(GT,[tGig],4);FX.flash=.5*sh1(GT,[tGig],10);FX.flcol='190,120,255';FX.chroma=6*sh1(GT,[tGig],4);
 if(GT>tGig)FX.tint=[90,0,160,.12*big]},'dip');
// ===== 6) Os olhos ja estariam analisando tudo (close) =====
const tEnt=1e9,tAna=wt(7,'diante',.1);
shot('liv',wt(7,'escondido',0)-.15,(t,u)=>{
 put('ELI',.95,0,-2.1,{sc:1.05,flip:-1,m:'smirk',look:[-7,0],still:1});aura('ELI',.55,'#7a2cff','#d6a8ff',2.6,.6,5);
 const lk=[(rnd(Math.floor(GT*3.2),3.1)-.5)*14,(rnd(Math.floor(GT*3.2),7.7)-.5)*6];
 put('CIB',-.85,0,-1.55,{sc:1,m:GT<tAna?'awe':'focus',six:1,look:lk,brow:3,tilt:-2,brr:2.4});eyeGlow('CIB',1,1.1);
 EYEHUD('CIB',ob(GT,CSH.t0,.4),GT);
 const e=eyeP('CIB'),ku=C.CIB.sp[2];
 // linhas de analise ligando o olho ao ambiente
 for(let i=0;i<6;i++){const a=cl((GT-CSH.t0-i*.25)/.3);if(a>0){const tx=e[0]+(i%2?1:-1)*(160+90*i)*ku,ty=e[1]+(-120+60*i)*ku;fw(`<path d="M${e[0].toFixed(1)} ${e[1].toFixed(1)}L${tx.toFixed(1)} ${ty.toFixed(1)}" stroke="${CY}" stroke-width="${(2.5*ku).toFixed(2)}" stroke-dasharray="${(8*ku).toFixed(1)} ${(6*ku).toFixed(1)}" opacity="${(.8*a).toFixed(2)}"/><rect x="${(tx-26*ku).toFixed(1)}" y="${(ty-16*ku).toFixed(1)}" width="${(52*ku).toFixed(1)}" height="${(32*ku).toFixed(1)}" fill="none" stroke="${CY2}" stroke-width="${(2*ku).toFixed(2)}" opacity="${a.toFixed(2)}"/>`)}}
 let ui='';if(GT>tEnt&&GT<tAna)ui+=TXT('?',300,560,130,'#fff',-8,pop(GT,tEnt));
 if(GT>tAna){const dots='.'.repeat(1+Math.floor(GT*4)%3);ui+=TXT('ESCONDIDO'+dots,540,330,92,CY,-2,pop(GT,tAna));ui+=`<rect x="290" y="372" width="500" height="22" rx="11" fill="#0b1240" stroke="${CY}" stroke-width="4"/><rect x="296" y="378" width="${(488*cl((GT-tAna)/1.3)).toFixed(1)}" height="10" rx="5" fill="${CY}"/>`}
 const F=foc(e[0],e[1]+30*ku,1.0);
 camA([[CSH.t0,.85,F[0],F[1],-2],[ps(8),1.05,F[0],F[1],2]]);
 FX.ui=ui;FX.vis=.6;FX.lit=blueLit(LIT.liv,1);FX.pf=[[e[0],e[1],300*ku,22,'150,220,255',.6,'in']]},'zoom');
// ===== 7) PONTO 2: O CONTROLE - nao e energia infinita =====
const tInf=wt(8,'infinita',.15),tNao=wt(8,'não',.1);
shot(null,ps(8)-.3,(t,u)=>{FX.bg=c=>cosmos(c,GT,{k:.8,c0:'#22318a',c1:'#0b0f42'});
 put('CIB',0,0,0,{px:[540,1560],ku:2.0,m:GT<tInf?'focus':'calm',six:1,look:[0,-6],aR:-14,aL:14,nodrift:1,zz:2});eyeGlow('CIB',1);aura('CIB',.55,'#1f7bff','#7fe6ff',1,.6);
 let ui=CARD(ps(8)-.25,tInf-.15,2,'O CONTROLE');
 if(GT>tInf-.2){const a=ob(GT,tInf-.2,.35),x=540,y=700+12*sn(GT*2);ui+=`<g opacity="${a.toFixed(2)}"><circle cx="${x}" cy="${y}" r="230" fill="rgba(60,150,255,.12)"/></g>`+INF(x,y,1.9*pop(GT,tInf-.2),CY,1,sn(GT*2)*3)+TXT('ENERGIA INFINITA?',540,330,82,'#fff',-3,pop(GT,tInf));
  const tx=pe(8)-.4;if(GT>tx){const k=ob(GT,tx,.25);ui+=`<g transform="translate(540 700) rotate(-12) scale(${(1.6-.6*k).toFixed(3)})" opacity="${k.toFixed(2)}"><path d="M-200-150L200 150M200-150L-200 150" stroke="${INK}" stroke-width="64" stroke-linecap="round"/><path d="M-200-150L200 150M200-150L-200 150" stroke="#ff3b5c" stroke-width="40" stroke-linecap="round"/></g>`+TXT('NÃO',540,1000,130,'#ff3b5c',-6,pop(GT,tx+.05))}}
 camA([[ps(8)-.3,.0,0,0,-2],[tInf,.08,0,-120,0],[ps(9),.12,0,-160,2]]);
 FX.ui=ui;FX.lit=LIT.cos;FX.vig=.6;FX.shake=8*sh1(GT,[pe(8)-.4],7)},'flashB');
// ===== 8) Controle com precisao extraordinaria =====
const tImp=1e9,tCon=wt(9,'controlar',.3),tPre=wt(9,'precisão',.2),tExt=wt(9,'absurda',.3);
shot('prcW',ps(9)-.15,(t,u)=>{
 const cond=ob(GT,tCon,.6),prec=ob(GT,tPre,.35);
 put('CIB',0,0,5.6,{sc:.95,top:1,m:GT<tCon?'focus':'calm',six:1,aR:tw(-14,-62,tCon-.2,.5),aL:tw(14,62,tCon-.2,.5),look:[0,6],brr:1.4});eyeGlow('CIB',1);
 const p=C.CIB.sp,ku=p[2];
 // aura selvagem -> condensada em contorno fino e preciso
 aura('CIB',1-.75*cond,'#1f7bff','#7fe6ff',1.25-.25*cond,.2+.8*cond);
 const ox=p[0],oy=p[1]-108*ku,orbR=(46-14*prec+3*sn(GT*9))*ku;
 if(GT>tCon-.3){const a=ob(GT,tCon-.3,.4);let s=`<g opacity="${a.toFixed(2)}">`;
  for(let i=0;i<9;i++){const sx=ox+(i-4)*60*ku,sy=p[1]-(250+40*ab(i-4))*ku,off=(-GT*200).toFixed(1);s+=`<path d="M${sx.toFixed(1)} ${sy.toFixed(1)}Q${((sx+ox)/2).toFixed(1)} ${(sy+60*ku).toFixed(1)} ${ox.toFixed(1)} ${oy.toFixed(1)}" fill="none" stroke="${CY2}" stroke-width="${(3*ku).toFixed(2)}" stroke-dasharray="${(14*ku).toFixed(1)} ${(10*ku).toFixed(1)}" stroke-dashoffset="${off}" opacity=".85"/>`}
  s+=`<circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="${(orbR*2.6).toFixed(1)}" fill="url(#eglow)"/><circle cx="${ox.toFixed(1)}" cy="${oy.toFixed(1)}" r="${orbR.toFixed(1)}" fill="#e8fbff" stroke="${CY}" stroke-width="${(5*ku).toFixed(2)}"/>`;
  if(prec>0)s+=`<g transform="translate(${ox.toFixed(1)} ${oy.toFixed(1)}) rotate(${(GT*40).toFixed(1)})" opacity="${prec.toFixed(2)}" fill="none" stroke="${CY2}" stroke-width="${(3*ku).toFixed(2)}"><circle r="${(orbR*2).toFixed(1)}" stroke-dasharray="${(8*ku).toFixed(1)} ${(8*ku).toFixed(1)}"/><path d="M${(-orbR*3).toFixed(1)} 0H${(-orbR*1.4).toFixed(1)}M${(orbR*1.4).toFixed(1)} 0H${(orbR*3).toFixed(1)}M0 ${(-orbR*3).toFixed(1)}V${(-orbR*1.4).toFixed(1)}M0 ${(orbR*1.4).toFixed(1)}V${(orbR*3).toFixed(1)}"/></g>`;
  fw(s+'</g>');(FX.gls=FX.gls||[]).push([ox,oy,orbR*7,'120,210,255',.6*a])}
 let ui='';if(GT>tImp-.1&&GT<tCon)ui+=TXT('MUITO MAIS',540,320,96,'#fff',-3,pop(GT,tImp-.1));
 if(GT>tPre)ui+=TXT('PRECISÃO',540,330,132,CY,-3,pop(GT,tPre)*(1+.02*sn(GT*8)));
 if(GT>tExt)ui+=TXT('ABSURDA',540,450,80,'#ffd23f',-3,pop(GT,tExt));
 const F=foc(ox,oy-40*ku,.5);
 camA([[ps(9)-.15,.05,0,-80,-2],[tCon-.2,.2,F[0]*.5,F[1]*.5,0],[tPre-.05,.3,F[0]*.7,F[1]*.7,0],[tPre,.55,F[0],F[1],0,'c'],[ps(10),.6,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=blueLit(LIT.prcW,1);FX.shake=5*sh1(GT,[tPre],7);FX.flash=.25*sh1(GT,[tPre],12);FX.flcol='180,235,255'},'wl');
// ===== 9) Desperdicio praticamente insignificante =====
const tDes=wt(10,'desperdício',.3),tIns=wt(10,'insignificante',.3);
shot('prcW',ps(10)-.15,(t,u)=>{
 put('CIB',0,0,5.6,{sc:.95,top:1,m:'calm',six:1,aR:-62,aL:62,look:[0,4],brr:1.2});eyeGlow('CIB',.9);aura('CIB',.3,'#1f7bff','#7fe6ff',1,1);
 const p=C.CIB.sp,ku=p[2],c0=chestP('CIB');
 // gotas de energia que escapariam sao puxadas de volta
 let s='';for(let i=0;i<12;i++){const ph=((GT*.8+rnd(i,3.1))%1),an=rnd(i,7.7)*6.283,r=(260-ph*250)*ku;s+=`<circle cx="${(c0[0]+cs(an)*r).toFixed(1)}" cy="${(c0[1]+sn(an)*r).toFixed(1)}" r="${(9*ku*(1-ph*.6)).toFixed(1)}" fill="${CY2}" opacity="${(sn(ph*3.14)).toFixed(2)}"/>`}fw(s);
 const lv=lp(34,.01,ez((GT-tDes)/(tIns-tDes+.3)));const val=lv<1?lv.toFixed(2).replace('.',','):Math.round(lv);
 let ui='';if(GT>tDes-.2){const a=ob(GT,tDes-.2,.3);ui+=`<g opacity="${a.toFixed(2)}"><rect x="200" y="300" width="680" height="200" rx="26" fill="#070a24" opacity=".8" stroke="${CY}" stroke-width="5"/><rect x="240" y="410" width="600" height="46" rx="23" fill="#16204e"/><rect x="246" y="416" width="${(588*lv/34).toFixed(1)}" height="34" rx="17" fill="${lv>5?'#ff6b6b':CY}"/></g>`+TXT('DESPERDÍCIO',540,385,58,'#fff',0,a)+TXT(`${val}%`,540,575,lv<1?110:90,lv<1?CY:'#ff6b6b',0,lv<1?pop(GT,tIns):a)}
 const F=foc(c0[0],c0[1],.35);
 camA([[ps(10)-.15,.3,F[0],F[1]-120,1],[ps(11),.42,F[0],F[1]-140,-1]]);
 FX.ui=ui;FX.lit=blueLit(LIT.prcW,1);FX.vig=.6},'zoom');
// ===== 10a) A tecnica Ilimitada: o espaco se dobra =====
const tIli=wt(11,'Ilimitada',.3),tEsp=wt(12,'espaço',.3),tRed2=wt(12,'redor',.3);
shot('twn3',ps(11)-.2,(t,u)=>{
 const raise=ob(GT,tIli-.35,.4);
 put('CIB',0,0,3.4,{sc:2.4,m:GT<tIli?'focus':'cool',six:1,aR:tw(-16,-118,tIli-.35,.4),aL:16,look:[0,-2],brr:1.5,sq:SQ(tIli,.6)});eyeGlow('CIB',1);aura('CIB',.6,'#1f7bff','#7fe6ff',1,1);
 const c0=chestP('CIB'),ku=C.CIB.sp[2],sp=ob(GT,tEsp-.2,.5);
 FX.warp=[c0[0],c0[1],lp(160,1500,cl((GT-tIli)/1.1))*(GT<tEsp?1:0)+(GT>=tEsp?330*ku*(1+.06*sn(GT*5)):0),GT<tIli?0:GT<tEsp?90*(1-cl((GT-tIli)/1.1)):70*sp];
 fw(SPHERE(c0[0],c0[1]-20*ku,250*ku,sp*.9,GT)+RIP(c0[0],c0[1],tIli,.9,900*ku)+RIP(c0[0],c0[1],tIli+.18,.9,700*ku)+RIP(c0[0],c0[1],tRed2,.8,500*ku));
 let ui='';if(GT>tIli-.05)ui+=INF(540,560,.9*pop(GT,tIli),CY,1,sn(GT*2)*4)+TXT('ILIMITADA',540,330,128,'#fff',-3,pop(GT,tIli+.05));
 if(GT>tEsp)ui+=TXT('O ESPAÇO SE DOBRA',540,455,58,CY2,-3,pop(GT,tEsp));
 const F=foc(c0[0],c0[1],.3);
 camA([[ps(11)-.2,.38,F[0],F[1]+60,-3],[tIli,.25,F[0]*.8,F[1]*.8,0,'c'],[tEsp,.1,0,-60,2],[ps(13),.14,0,-80,-1]]);
 FX.ui=ui;FX.lit=blueLit(LIT.twn3,1);FX.shake=12*sh1(GT,[tIli],5);FX.flash=.4*sh1(GT,[tIli],9);FX.flcol='170,230,255';FX.vig=.65;FX.chroma=5*sh1(GT,[tIli],4)},'flashB');
// ===== 10b) Os inimigos nao conseguem encostar =====
const tIni=wt(13,'criando',.1),tImpd=wt(13,'defesa',.2),tSim=wt(13,'poucos',.2),tEnc=wt(13,'superar',.3);
shot('twn3',ps(13)-.15,(t,u)=>{
 const mx=lp(4.2,1.65,ob(GT,tImpd-.5,.5)),mz=2.8;
 put('CIB',-.75,0,3.4,{sc:2.4,m:GT<tIni?'focus':'cool',six:1,aR:-16,aL:16,look:[8,-2],brr:1.3});eyeGlow('CIB',1);
 const p=C.CIB.sp,ku=p[2],c0=[p[0],p[1]-170*ku],Rb=250*ku;
 const mp=P3(mx,0,mz,1.15),mk=mp[2];
 // punho: rapido no comeco e desacelera para sempre (nunca encosta)
 const tgx=c0[0]+Rb+24*ku,tgy=c0[1]-20*ku,st0=[mp[0]-170*mk,mp[1]-210*mk],d=GT<tImpd?1:Math.exp(-3.4*(GT-tImpd)),fxs=tgx+(st0[0]-tgx)*d,fys=tgy+(st0[1]-tgy)*d;
 const push=GT>tImpd?cl((GT-tImpd)/.4):0;
 sprite(CURSE({fx:(fxs-mp[0])/mk,fy:(fys-mp[1])/mk,str:push,mouth:.5+.5*push}),mp[0],mp[1],mk,mp[3],'C2');
 const sp=.8+.2*push;fw(SPHERE(c0[0],c0[1]-20*ku,Rb,sp,GT));
 FX.warp=[c0[0],c0[1],330*ku,55+25*push];
 if(GT>tImpd){let s='';for(let i=0;i<4;i++)s+=RIP(tgx-8*ku,tgy,tImpd+.25+i*.45,.7,140*ku);fw(s)}
 let ui='';if(GT>tIni-.1)ui+=TXT('!',zpS(mp[0],mp[1]-480*mk)[0],zpS(mp[0],mp[1]-480*mk)[1],120,'#ff3b5c',0,pop(GT,tIni-.1));
 if(GT>tEnc)ui+=TXT('NEM ENCOSTA',540,330,118,CY,-3,pop(GT,tEnc)*(1+.03*sn(GT*8)));
 const F=foc((tgx+c0[0])/2,(tgy+c0[1]-60*ku)/2,.55),Fw=foc((c0[0]+mp[0])/2,c0[1],.05);
 camA([[ps(13)-.15,.05,Fw[0],Fw[1],-2],[tImpd,.12,Fw[0],Fw[1],0],[tSim-.1,.3,F[0]*.6,F[1]*.6,0],[tSim,.55,F[0],F[1],2,'c'],[ps(14),.62,F[0],F[1],-1]]);
 FX.ui=ui;FX.lit=blueLit(LIT.twn3,1);FX.shake=3*push+10*sh1(GT,[tImpd+.25],6);FX.vig=.65;FX.dof=GT>tSim?4:null},'wr');
// ===== 11) PONTO 3: O PRECO =====
const tVer=wt(14,'existe',.2),tPro=wt(14,'preço',.3);
shot('hot',ps(14)-.3,(t,u)=>{
 const fk=rnd(Math.floor(GT*12),5.1)>.25?1:.25;
 put('CIB',0,0,-1.1,{sc:1,top:1,m:GT<tPro?'worry':'strain',six:.6*fk,look:[0,3],brow:tw(2,7,tPro,.4),brr:2.6,tilt:-3});eyeGlow('CIB',.45*fk);
 const e=eyeP('CIB'),F=foc(e[0],e[1]+150*C.CIB.sp[2],.42);
 let ui=CARD(ps(14)-.2,ps(15)-.05,3,'O PREÇO','#ff4d6d');
 camA([[ps(14)-.3,.08,F[0]*.3,F[1]*.3,0],[ps(15),.42,F[0],F[1],-1.5]]);
 FX.ui=ui;FX.lit=LIT.hot;FX.vig=.85;FX.grade='contrast(1.1) saturate(.55)';FX.dark=.15;FX.tint=[120,10,30,.08]},'dip');
// ===== 12) Sobrecarga: informacao o tempo todo, desgaste =====
const tInfo=wt(15,'informações',.2),tCons=wt(15,'constantemente',.3),tDsg=wt(16,'desgaste',.2);
shot('kit',ps(15)-.15,(t,u)=>{
 const ov=cl((GT-ps(15)+.15)/1.6),fk=rnd(Math.floor(GT*16),2.3)>.2?1:.3;
 put('CIB',0,0,-1.7,{sc:1,m:GT<tDsg?'strain':'angry',six:fk,aR:tw(-20,-152,tInfo-.2,.35)+4*sn(GT*13),aL:tw(20,152,tInfo-.2,.35)-4*sn(GT*12),look:[(rnd(Math.floor(GT*6),3.1)-.5)*12,2],brow:9,tilt:5*sn(GT*2.3),rot:2*sn(GT*17)*ov,brr:3.6,sq:SQ(tDsg,1),
  extra:SWEAT(-80,-300,.9)+SWEAT(90,-280,.7*ov)});eyeGlow('CIB',fk,1+.5*ov);
 const e=eyeP('CIB'),q=zpE(e);let ui=OVER(GT,ov,q[0],q[1]);
 if(GT>tDsg)ui+=TXT('DESGASTE',540,330,140,'#ff4d6d',-4,pop(GT,tDsg)*(1+.03*sn(GT*11)));
 const F=foc(e[0],e[1]+60*C.CIB.sp[2],.55);
 camA([[ps(15)-.15,.2,F[0]*.4,F[1]*.4,0],[tCons,.4,F[0]*.8,F[1]*.8,2],[tDsg,.62,F[0],F[1],-3,'c'],[ps(17),.7,F[0],F[1],3]]);
 FX.ui=ui;FX.vis=ov*(rnd(Math.floor(GT*9),1.3)>.5?.8:.35);FX.lit=blueLit(LIT.kit,fk*.8);FX.shake=3+5*ov+14*sh1(GT,[tDsg],6);FX.chroma=4+10*ov;FX.vhs=.18*ov;FX.vig=.8;
 FX.tint=GT>tDsg?[255,30,60,.1+.06*ab(sn(GT*8))]:null;FX.flash=.4*sh1(GT,[tDsg],10);FX.flcol='255,60,90'},'glitch');
// ===== 13) A venda: menos esforco, mas continua percebendo =====
const tVen=wt(17,'venda',.15),tRedz=wt(17,'reduzir',.2),tAmb=wt(17,'esforço',.2);
shot('bed',ps(17)-.2,(t,u)=>{
 const b=ob(GT,tVen-.35,.5),son=ob(GT,tAmb-.1,.6);
 put('CIB',0,.85,-2.6,{sc:1,sit:1,m:GT<tVen?'strain':'calm',six:GT<tVen?1:.35,blind:b,aR:GT<tVen+.4?tw(-20,-150,tVen-.9,.3):tw(-150,-18,tVen+.4,.4),aL:GT<tVen+.4?tw(20,150,tVen-.9,.3):tw(150,18,tVen+.4,.4),look:[0,2],brow:GT<tVen?8:0,brr:GT<tVen?3:1.1,nobob:1});
 eyeGlow('CIB',GT<tVen?1:.18);const e=eyeP('CIB'),q=zpE(e);
 let ui=OVER(GT,GT<tVen?.85:0,q[0],q[1]);
 if(GT>tVen)ui+=TXT('A VENDA',540,320,118,'#fff',-3,pop(GT,tVen));
 if(GT>tRedz)ui+=TXT('MENOS ESFORÇO',540,440,62,CY2,-3,pop(GT,tRedz));
 if(GT>tAmb-.1){ui+=SCAN(q[0],q[1],tAmb-.1,1.3,1600,CY)+SCAN(q[0],q[1],tAmb+.6,1.3,1600,CY)}
 const F=foc(e[0],e[1]+40*C.CIB.sp[2],.7);
 camA([[ps(17)-.2,.7,F[0],F[1],2],[tVen-.1,.78,F[0],F[1],0],[tVen+.5,.5,F[0]*.7,F[1]*.7,0],[tAmb-.1,.25,F[0]*.4,F[1]*.4,0],[ps(18),.12,0,60,-1]]);
 FX.ui=ui;FX.night=1;FX.sonar=son;FX.chroma=GT<tVen?6:0;FX.vhs=GT<tVen?.12:0;FX.lit=blueLit(LIT.bed,GT<tVen?1:.3);FX.flash=.3*sh1(GT,[tVen],8);FX.flcol='20,20,40';FX.vig=.7},'wl');
// ===== 14) Habilidade rara, precisa de controle (meditacao) =====
const tRar=wt(18,'raras',.3),tCtr=wt(18,'Jujutsu',.1);
shot('prcW',ps(18)-.2,(t,u)=>{
 const ctl=ob(GT,tCtr,.6);
 put('CIB',0,0,3.6,{sc:1,top:1,m:'calm',six:.3,blind:1,aR:tw(-12,-36,tCtr-.1,.5),aL:tw(12,36,tCtr-.1,.5),look:[0,0],still:0,brr:.8,bob:.4});eyeGlow('CIB',.16);
 aura('CIB',.75-.35*ctl,'#1f7bff','#7fe6ff',1.15-.25*ctl,1,3);
 const c0=chestP('CIB'),ku=C.CIB.sp[2];FX.pf=[[c0[0],c0[1],(300-80*ctl)*ku,26,'150,220,255',.7,'orbit']];
 let ui='';if(GT>tRar)ui+=TXT('RARÍSSIMA',540,320,118,'#ffd23f',-3,pop(GT,tRar));
 if(GT>tCtr)ui+=TXT('DE JUJUTSU KAISEN',540,450,60,CY,-3,pop(GT,tCtr));
 camA([[ps(18)-.2,.0,0,-260,-2],[tRar,.12,0,-100,0],[ps(19),.3,0,40,2]]);
 FX.ui=ui;FX.lit=blueLit(LIT.prcW,.5);FX.vig=.6},'dip');
// ===== 15) Final: potencial extraordinario (tira a venda ao por do sol) =====
const tFor=wt(19,'forte',.3),tPot=wt(20,'potencial',.0),tXt=wt(20,'extraordinário',.25);
shot('road',ps(19)-.3,(t,u)=>{
 const lift=ob(GT,tPot-.55,.6),fl=ob(GT,tPot,.35);
 put('CIB',0,0,6.4,{sc:1.9,m:GT<tPot?'calm':'focus',six:GT<tPot?.2:fl,blind:1-lift,aR:GT<tPot+.3?tw(-16,-160,tPot-.85,.35):tw(-160,-20,tPot+.3,.4),aL:16,look:[0,-2],brr:1.4,tilt:2*sn(GT*1.3)});eyeGlow('CIB',GT<tPot?.1:fl,1.3);
 const e=eyeP('CIB'),ku=C.CIB.sp[2],q=zpE(e);
 if(GT>tPot)aura('CIB',fl*.8,'#1f7bff','#7fe6ff',1.2,1);
 FX.flare=GT>tPot?[[e[0]-25*ku,e[1],fl],[e[0]+25*ku,e[1],fl]]:[];FX.rays=[[560,560,.3+.3*fl,'255,200,140',16,1700]];
 let ui='';if(GT>tFor){const a=ob(GT,tFor,.3);ui+=TXT('O MAIS FORTE?',540,320,104,'#fff',-3,pop(GT,tFor));if(GT>pe(19)+.05){const k=ob(GT,pe(19)+.05,.3);ui+=`<path d="M150 ${288}L${(150+780*k).toFixed(1)} ${280}" stroke="#ff3b5c" stroke-width="22" stroke-linecap="round" opacity="${a.toFixed(2)}"/>`}}
 if(GT>tPot-.05)ui=TXT('POTENCIAL',540,330,140,CY,-3,pop(GT,tPot))+SCAN(q[0],q[1],tPot,1,1400,CY);
 if(GT>tXt)ui+=TXT('EXTRAORDINÁRIO',540,455,78,'#ffd23f',-3,pop(GT,tXt));
 const F=foc(e[0],e[1]+200*ku,.25),F2=foc(e[0],e[1],.85);
 camA([[ps(19)-.3,.05,0,-200,-2],[tFor,.18,F[0],F[1],0],[tPot-.6,.32,F[0],F[1],0],[tPot-.05,.85,F2[0],F2[1],0,'c'],[ps(21),.6,F2[0]*.8,F2[1]*.8,2]]);
 FX.ui=ui;FX.lit=blueLit(LIT.road,fl*.7);FX.shake=10*sh1(GT,[tPot],6);FX.flash=.45*sh1(GT,[tPot],8);FX.flcol='200,240,255';FX.vig=.5},'flashO');
// ===== 16) A pergunta: voce teria coragem? =====
const tAg=ps(21),tCor=wt(21,'coragem',.2),tDsp=wt(21,'despertar',.2),tEnd=pe(21)+.25;
shot(null,ps(21)-.3,(t,u)=>{FX.bg=c=>cosmos(c,GT,{k:.5+.5*ob(GT,tDsp,.4),streak:GT>tDsp?.5:0,dr:.3});
 const awk=ob(GT,tDsp,.3);
 put('CIB',0,0,0,{px:[540,1040+232*3.4],ku:3.4,m:GT<tDsp?'calm':'focus',six:.35+.65*awk,look:[0,0],nodrift:1,nobob:1,zz:2});eyeGlow('CIB',.35+.65*awk,1+.6*sh1(GT,[tDsp],3));
 const e=eyeP('CIB'),ku=C.CIB.sp[2];if(GT>tDsp)aura('CIB',awk*.9,'#1f7bff','#7fe6ff',1.2,1);
 FX.pf=[[e[0],e[1],420,30,'150,220,255',.4+.6*awk,GT>tDsp?'rise':'in']];
 let ui='';if(GT<tEnd){if(GT>tCor-.6)ui+=TXT('VOCÊ TERIA',540,270,80,'#fff',-3,pop(GT,tCor-.6));if(GT>tCor)ui+=TXT('CORAGEM?',540,400,150,'#ffd23f',-3,pop(GT,tCor)*(1+.02*sn(GT*6)))}
 if(GT>tDsp)ui+=SCAN(e[0],e[1],tDsp,1,1500)+EMB(540,1040,330,GT,.4*awk);
 if(GT>tEnd){const a=ob(GT,tEnd,.4);ui+=`<rect x="0" y="1290" width="1080" height="330" fill="#04061a" opacity="${(.82*a).toFixed(2)}"/>`+TXT('VOCÊ DESPERTARIA?',540,1400,84,CY,-2,pop(GT,tEnd))+TXT('COMENTE: SIM ou NÃO',540,1520,62,'#fff',-2,pop(GT,tEnd+.3))+TXT('E SE VOCÊ TIVESSE',540,270,70,'#fff',-3,pop(GT,tEnd+.1))+TXT('OS SEIS OLHOS?',540,385,112,CY,-3,pop(GT,tEnd+.2))}
 const F=foc(e[0],e[1],.6);
 camA([[ps(21)-.3,.05,0,0,-1],[tCor,.35,F[0]*.6,F[1]*.6,0],[tDsp,.6,F[0],F[1],0,'c'],[tEnd,.2,0,0,0],[OLDT,.28,0,0,1]]);
 FX.ui=ui;FX.lit=blueLit(LIT.cos,awk);FX.vig=.85-.25*awk;FX.shake=12*sh1(GT,[tDsp],5);FX.flash=.6*sh1(GT,[tDsp],8);FX.flcol='170,230,255';FX.chroma=5*sh1(GT,[tDsp],4)},'dip');
// ===== 17) ENCERRAMENTO: like + inscreva-se (Cibito precisa da sua ajuda) =====
if(PH.length>21){
const T0=OLDT,tLock=wt(22,'desbloquear',.3),tPod=wt(22,'poder',.2),tMas=wt(23,'mas',.1),tAju=wt(23,'ajuda',.0),tLik=wt(24,'like',.0),tPress=wt(24,'like',.9)+.05,
 tIns=wt(24,'inscreva',.0),tCan=wt(24,'canal',.3),tFor2=wt(24,'força',.0),tCur=wt(25,'curtida',.0),tTra=wt(25,'transformação',.35),tSer=wt(26,'será',.0),tEndO=pe(26)+.25;
// icones em unidades de tela (desenhados no mesmo traco grosso)
const THUMB=(c='#fff')=>`<path d="M-58 2H-28V70H-58Z" fill="${c}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/><path d="M-20 4L8-44Q16-70 34-58Q44-50 38-20H70Q90-18 84 4L72 58Q68 72 52 72H-20Z" fill="${c}" stroke="${INK}" stroke-width="9" stroke-linejoin="round"/>`;
const LIKEB=(on,pr)=>`<circle r="128" fill="rgba(0,0,0,.28)" cy="10"/><circle r="122" fill="${on?'url(#likeg)':'#fff'}" stroke="${INK}" stroke-width="12"/><circle r="104" fill="none" stroke="${on?'rgba(255,255,255,.35)':'rgba(31,123,255,.18)'}" stroke-width="8"/><g transform="translate(4 -6) scale(${(1.05+.12*pr).toFixed(3)})">${THUMB(on?'#fff':'#1f7bff')}</g>`;
const SUBB=(on)=>`<rect x="-300" y="-72" width="600" height="144" rx="72" fill="rgba(0,0,0,.3)" transform="translate(0 10)"/><rect x="-300" y="-72" width="600" height="144" rx="72" fill="${on?'#3a3a46':'#ff1f3d'}" stroke="${INK}" stroke-width="12"/><text y="22" font-size="62" text-anchor="middle" fill="#fff" font-family="Poppins,DejaVu Sans" font-weight="900">${on?'INSCRITO ✓':'INSCREVA-SE'}</text>`;
const BELL=(sw,ring)=>`<g transform="rotate(${sw.toFixed(1)} 0 -70)"><path d="M-62 40Q-58-50 0-66Q58-50 62 40L80 62H-80Z" fill="#ffd23f" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><circle cy="-74" r="14" fill="#ffd23f" stroke="${INK}" stroke-width="8"/><circle cy="78" r="18" fill="#ffd23f" stroke="${INK}" stroke-width="8"/><path d="M-36-20Q-30-40-12-46" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/></g>`+(ring>0?[1,2].map(i=>`<path d="M${-100-i*26}-40Q${-120-i*30} 0 ${-100-i*26} 40M${100+i*26}-40Q${120+i*30} 0 ${100+i*26} 40" stroke="#ffd23f" stroke-width="10" fill="none" stroke-linecap="round" opacity="${(ring*(.9-.3*i)).toFixed(2)}"/>`).join(''):'');
const CURSOR=`<path d="M0 0L0 88L22 68L38 104L54 96L38 62L66 60Z" fill="#fff" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/>`;
const LOCK=(sh,cr,op)=>`<g transform="rotate(${sh.toFixed(1)})"><path d="M-46-30V${(-70-60*op).toFixed(0)}Q-46${(-130-60*op).toFixed(0)} 0${(-130-60*op).toFixed(0)}Q46${(-130-60*op).toFixed(0)} 46${(-70-60*op).toFixed(0)}V-30" fill="none" stroke="${INK}" stroke-width="30"/><path d="M-46-30V${(-70-60*op).toFixed(0)}Q-46${(-130-60*op).toFixed(0)} 0${(-130-60*op).toFixed(0)}Q46${(-130-60*op).toFixed(0)} 46${(-70-60*op).toFixed(0)}V-30" fill="none" stroke="#c9ced8" stroke-width="16"/><rect x="-80" y="-40" width="160" height="130" rx="24" fill="#ffc02e" stroke="${INK}" stroke-width="12"/><circle cy="12" r="16" fill="${INK}"/><path d="M0 18V50" stroke="${INK}" stroke-width="14" stroke-linecap="round"/>${cr>0?`<path d="M-60-30L-20 10L-40 40L0 80M50-30L20 0L40 30" stroke="${CY2}" stroke-width="${(4+5*cr).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${cr.toFixed(2)}"/>`:''}</g>`;
const FINGER=`<path d="M-7 4V40Q0 50 7 40V4Z" fill="#f6c8a0" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
document.querySelector('#SV defs').insertAdjacentHTML('beforeend','<linearGradient id="likeg" x1="0" y1="-1" x2="0" y2="1"><stop offset="0" stop-color="#5fd0ff"/><stop offset="1" stop-color="#1f5bff"/></linearGradient>');
shot('twn3',T0,(t,u)=>{
 const inn=ob(GT,T0+.12,.5),jy=(1-inn)*900,pressA=GT>tPress-.25&&GT<tPress+.35,flex=GT>tFor2&&GT<tCur+.2,tr=ob(GT,tTra,.3),ser=GT>tSer;
 // pose do Cibito, sincronizada com cada frase
 let aR=-20+6*sn(GT*5),aL=20-6*sn(GT*4.6),m='grin',hold=null,tilt=4*sn(GT*2.2),brow=0,look=[0,-2];
 if(GT>tMas-.1&&GT<tAju-.05){m='hope';aR=-30;aL=30;brow=4;look=[6,0]}
 if(GT>=tAju-.05&&GT<tIns-.1){m=GT<tLik?'happy':'grin';hold=FINGER;aR=GT<tLik-.15?tw(-30,-105,tAju-.05,.3):GT<tPress-.25?tw(-105,-72,tLik-.15,.3):GT<tPress?-38:tw(-38,-74,tPress,.18);look=[8,-4]}
 if(GT>=tIns-.1&&GT<tFor2){m='grin';aR=-120+10*sn(GT*9);aL=20;look=[-6,-8]}
 if(flex){m='focus';aR=-150+6*sn(GT*14);aL=150-6*sn(GT*14);brow=8}
 if(GT>=tCur+.2&&!ser){m=GT<tTra?'awe':'grin';aR=-40+8*sn(GT*6);aL=40-8*sn(GT*6)}
 if(ser){m='worry';aR=-14;aL=14;brow=5;look=[0,-6]}
 const six=Math.min(1,.55+.25*sh1(GT,[tPod],2)+.35*tr+(flex?.3:0)),px=[380,1560+jy];
 put('CIB',0,0,0,{px,ku:2.1,top:1,m,six,hold,aR,aL,tilt,brow,look,nodrift:1,bob:1.5,brr:3,sq:GT<T0+.8?SQ(T0+.45,1.3):pressA?SQ(tPress,.6):flex?SQ(tFor2,1):SQ(tTra,1.2)});
 eyeGlow('CIB',six,1+.6*tr);aura('CIB',.45+.4*(flex?1:0)+.5*tr,'#1f7bff','#7fe6ff',1.1+.5*tr,1);
 const p=C.CIB.sp,ku=p[2],c0=chestP('CIB'),e=eyeP('CIB');
 // cadeado do "novo poder" acima da cabeca: treme, racha e quase abre
 const lockA=ob(GT,tLock-.2,.4)*(1-ob(GT,tAju-.3,.3)*.6)*(GT>tLik-.2&&GT<tCur?0:1),crack=cl((GT-tPod)/.4)*.5+.5*cl((GT-tCur)/(tTra-tCur)),opn=tr*.35;
 if(lockA>0)fw(`<g transform="translate(${(p[0]+330).toFixed(1)} ${(p[1]-560+30*sn(GT*2)).toFixed(1)}) scale(${(lockA*.8*(1+.08*sh1(GT,[tPod,tTra],5))).toFixed(3)})">${LOCK((GT>tPod?6:2)*sn(GT*30)*(.4+crack),crack,opn)}</g>`);
 // botao de LIKE: surge com impacto, balanca e e pressionado pela mao do Cibito
 const lkA=GT<tLik-.15?0:ob(GT,tLik-.15,.45),on=GT>tPress,lsq=pressA?SQ(tPress,1.6):{sx:1,sy:1},lx=p[0]+210*ku,ly=p[1]-185*ku;
 if(lkA>0&&GT<tFor2+.4){const out=1-ob(GT,tFor2-.15,.3),sc=lkA*out*(.95+.05*sn(GT*6))*(1+.12*sh1(GT,[tPress],7));
  fw(`<g transform="translate(${lx.toFixed(1)} ${ly.toFixed(1)}) rotate(${(5*sn(GT*4)).toFixed(1)}) scale(${(1.15*sc*lsq.sx).toFixed(3)} ${(1.15*sc*lsq.sy).toFixed(3)})">${LIKEB(on,sh1(GT,[tPress],6))}</g>`+RIP(lx,ly,tPress,.6,320,'#7fd8ff')+RIP(lx,ly,tPress+.12,.6,240,'#fff'));
  if(on){let s='';for(let i=0;i<10;i++){const d=GT-tPress,a=rnd(i,3.3)*6.283,r=60+520*d*(.5+rnd(i,7.1)),o=cl(1-d/1.2);if(o>0)s+=`<g transform="translate(${(lx+cs(a)*r).toFixed(1)} ${(ly+sn(a)*r-120*d).toFixed(1)}) scale(${(.22+.18*rnd(i,5.5)).toFixed(2)})" opacity="${o.toFixed(2)}">${i%2?THUMB('#5fd0ff'):`<path d="M0 30C-60-10-50-70 0-34C50-70 60-10 0 30Z" fill="#ff3b6b" stroke="${INK}" stroke-width="10"/>`}</g>`}fw(s)}}
 // INSCREVA-SE + cursor + sino
 const sbA=GT<tIns-.2?0:ob(GT,tIns-.2,.4),sOn=GT>tCan,sx0=540+(1-sbA)*900,sy0=640;
 let ui='';
 if(sbA>0&&GT<tFor2+.4){const out=1-ob(GT,tFor2-.15,.3),ssq=GT>tCan&&GT<tCan+.5?SQ(tCan,1.3):{sx:1,sy:1};
  fw(`<g transform="translate(${(sx0-60).toFixed(1)} ${sy0}) scale(${(out*ssq.sx*(1+.06*sh1(GT,[tCan],7))).toFixed(3)} ${(out*ssq.sy).toFixed(3)})">${SUBB(sOn)}</g>`+RIP(sx0-60,sy0,tCan,.6,380,'#ff7a8a'));
  const bA=ob(GT,tCan+.1,.35)*out;if(bA>0)fw(`<g transform="translate(860 ${sy0-150}) scale(${(.85*bA).toFixed(3)})">${BELL(28*Math.exp(-(GT-tCan-.1)*2.2)*sn((GT-tCan)*16),Math.exp(-(GT-tCan-.1)*1.5))}</g>`);
  const cp=ob(GT,tIns+.1,.5),cx=lp(1150,sx0+30,cp),cy=lp(1150,sy0+20,cp),cs2=GT>tCan-.06&&GT<tCan+.12?.82:1;if(GT<tCan+.6)fw(`<g transform="translate(${cx.toFixed(1)} ${cy.toFixed(1)}) scale(${(cs2*1.15).toFixed(2)})" opacity="${cl(1-(GT-tCan-.3)/.3).toFixed(2)}">${CURSOR}</g>`)}
 // medidor de curtidas -> transformacao
 if(GT>tCur-.2){const a=ob(GT,tCur-.2,.35),f=GT<tTra?lp(.12,.92,ez((GT-tCur)/(tTra-tCur))):lp(.92,.99,cl((GT-tTra)/.5)),blink=ser&&sn(GT*18)>0?1:.65,val=Math.round(f*100);
  ui+=`<g opacity="${a.toFixed(2)}"><rect x="140" y="1330" width="800" height="150" rx="30" fill="#070a24" opacity=".85" stroke="${CY}" stroke-width="6"/><rect x="330" y="1380" width="580" height="54" rx="27" fill="#16204e"/><rect x="336" y="1386" width="${(568*f).toFixed(1)}" height="42" rx="21" fill="${ser?`rgba(255,210,63,${blink})`:CY}"/></g><g transform="translate(240 1410) scale(.6)" opacity="${a.toFixed(2)}">${THUMB('#5fd0ff')}</g>`+TXT(`PODER ${val}%`,620,1315,54,'#fff',0,a);
  // curtidas voando ate o Cibito
  if(GT<tTra+.2){let s='';for(let i=0;i<8;i++){const ph=((GT-tCur)*1.1+i/8)%1;const q=zpE([c0[0],c0[1]]),x=lp(240,q[0],ez(ph)),y=lp(1410,q[1],ez(ph))-160*sn(ph*3.14);s+=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(.3*(1-ph*.5)).toFixed(2)})" opacity="${sn(ph*3.14).toFixed(2)}">${THUMB('#5fd0ff')}</g>`}ui+=s}}
 // textos
 if(GT>tLock-.1&&GT<tMas)ui+=TXT('NOVO PODER',540,330,120,'#ffd23f',-3,pop(GT,tPod-.05))+(GT>wt(22,'animação',0)?TXT('DESBLOQUEANDO...',540,440,58,CY2,-3,pop(GT,wt(22,'animação',0))):'');
 if(GT>tAju-.05&&GT<tLik-.2)ui+=TXT('PRECISO DA',540,290,72,'#fff',-4,pop(GT,tAju-.05))+TXT('SUA AJUDA!',540,410,136,CY,-4,pop(GT,tAju+.08)*(1+.03*sn(GT*8)));
 if(GT>tLik-.15&&GT<tIns-.1)ui+=TXT('DEIXE O LIKE!',540,330,118,'#5fd0ff',-3,pop(GT,tLik-.15));
 if(GT>tFor2-.05&&GT<tCur-.2)ui+=TXT('MOSTRE SUA',540,290,72,'#fff',-3,pop(GT,tFor2-.05))+TXT('FORÇA!',540,420,160,'#ffd23f',-3,pop(GT,tFor2+.1)*(1+.04*sn(GT*10)))+RAYS(GT,tFor2+.1,540,400,.45,18,'#ffe27a');
 if(GT>tTra-.05&&GT<tSer)ui+=TXT('TRANSFORMAÇÃO',540,330,104,CY,-3,pop(GT,tTra));
 if(ser&&GT<tEndO+.2)ui+=TXT('SERÁ QUE ELE',540,300,76,'#fff',-3,pop(GT,tSer))+TXT('VAI CONSEGUIR?',540,410,110,'#ffd23f',-3,pop(GT,wt(26,'conseguir',0)));
 // final elegante: iris se fechando no olho brilhante do Cibito
 const ir=ob(GT,tEndO,.7);if(GT>tEndO){const q=zpE(e),R=lp(1500,0,ez(cl((GT-tEndO)/.8)));ui+=`<path fill-rule="evenodd" d="M-10-10H1090V1930H-10ZM${(q[0]-R).toFixed(1)} ${q[1].toFixed(1)}a${R.toFixed(1)} ${R.toFixed(1)} 0 1 0 ${(2*R).toFixed(1)} 0a${R.toFixed(1)} ${R.toFixed(1)} 0 1 0 ${(-2*R).toFixed(1)} 0Z" fill="#02030c"/><circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${R.toFixed(1)}" fill="none" stroke="${CY}" stroke-width="${(10*(1-ir*.5)).toFixed(1)}"/>`+(R<200?EMB(q[0],q[1],90,GT,cl((200-R)/150)*(1-cl((GT-tEndO-.8)/.4))):'')}
 FX.pf=[[c0[0],c0[1],420*ku/2.1,34,'150,220,255',.7+.3*tr,flex||tr>0?'rise':'orbit']];
 const F=foc(e[0],e[1]+120*ku,.4),Fp=foc(e[0],e[1],.85),Fw=foc(640,1100,.08);
 camA([[T0,.45,F[0],F[1],-3],[T0+.6,.22,F[0]*.6,F[1]*.6,1],[tMas,.25,F[0]*.6,F[1]*.6,0],[tAju-.1,.3,F[0]*.7,F[1]*.7,0],[tAju,.48,F[0],F[1],-2,'c'],[tLik-.25,.5,F[0],F[1],0],[tLik-.15,.06,Fw[0],Fw[1],0,'c'],[tFor2-.1,.06,Fw[0],Fw[1],1],[tFor2,.3,F[0]*.8,F[1]*.8,-2,'c'],[tCur,.12,0,0,0],[tTra,.35,F[0],F[1],0,'c'],[tSer,.4,F[0],F[1],0],[tEndO+.6,.85,Fp[0],Fp[1],0]]);
 FX.ui=ui;FX.lit=blueLit(LIT.twn3,.8+.2*tr);FX.vig=.55;FX.shake=14*sh1(GT,[T0+.45],5)+6*sh1(GT,[tPress,tCan],8)+12*sh1(GT,[tFor2,tTra],5);
 FX.flash=Math.max(.9*cl(1-(GT-T0)/.35),.35*sh1(GT,[tPod,tPress],10),.6*sh1(GT,[tTra],7));FX.flcol=GT<T0+.4?'190,235,255':'170,230,255';FX.chroma=5*sh1(GT,[tFor2,tTra],4);
 if(GT>tCur)FX.rays=[[c0[0],c0[1]-60*ku,.25+.4*tr,'90,170,255',16,1500]]},'');
}
// ---------- REACOES DO CIBITO NAS PAUSAS DA NARRACAO (balao + "voz" de desenho) ----------
const RWORD={1:'UAU!',3:'SÉRIO?!',4:'NOSSA!',6:'HEHE!',7:'!!',8:'HÃ?',9:'ISSO!',10:'PERFEITO!',11:'HA!',12:'OPA!',13:'NEM VEM!',14:'AI...',15:'É MUITA COISA!',16:'CHEGA!',17:'UFA...',18:'HMM...',19:'SERÁ?',20:'VAMOS!',21:'E AÍ?',22:'POR FAVOR!',23:'BORA!',24:'AAAH!',25:'QUASE!'};
const REACTS=[];for(let i=1;i<PH.length;i++){const g0=pe(i),g1=i==21?OLDT-.75:ps(i+1);if(RWORD[i]&&g1-g0>=.25)REACTS.push({i,w:RWORD[i],t0:g0+.03,t1:Math.max(g1,g0+.55)})}
window.REACTS=REACTS;let REAC=null;
const BUBBLE=(x,y,txt,k,flip)=>{const w=Math.max(150,txt.length*34+70),h=104,s=pop(GT,k);return`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(s*(1+.03*sn(GT*14))).toFixed(3)})"><path d="M${-w/2} ${-h/2}H${w/2}Q${w/2+18} ${-h/2} ${w/2+18} 0Q${w/2+18} ${h/2} ${w/2} ${h/2}H${flip?-w/2+70:w/2-50}L${flip?-w/2+30:w/2-10} ${h/2+44}L${flip?-w/2+40:w/2-90} ${h/2}H${-w/2}Q${-w/2-18} ${h/2} ${-w/2-18} 0Q${-w/2-18} ${-h/2} ${-w/2} ${-h/2}Z" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><text y="18" font-size="54" text-anchor="middle" fill="${INK}" font-family="Poppins,DejaVu Sans,sans-serif" font-weight="900">${txt}</text></g>`};
SH.forEach((s,i)=>{s.t1=i<SH.length-1?SH[i+1].t0:TOTAL+1});
// conversao cena -> tela (usa o transform real do quadro anterior; atualizado em F)
let XF={s:1,dx:0,dy:0,cr:1,sr:0};
const zpS=(x,y)=>{const X=(x-540)*XF.s,Y=(y-1000)*XF.s;return[540+XF.dx+X*XF.cr-Y*XF.sr,1000+XF.dy+X*XF.sr+Y*XF.cr]};
const zpE=p=>zpS(p[0],p[1]);const FXs=()=>XF.s;
// ---------- RENDER DE UM QUADRO ----------
const load=(im,src)=>new Promise(r=>{if(im.getAttribute('src')==src)return r();im.onload=r;im.src=src});
window.F=async gt=>{GT=gt;const sh=SH.find(s=>gt>=s.t0&&gt<s.t1)||SH[SH.length-1];
 if(sh!=CSH){CSH=sh;sh.pl=sh.plate?getPl(sh.plate):{VP:getPl('road').VP,tf:1,cam:{}};if(sh.plate){await Promise.all([load($('iA'),`plates/${sh.plate}_A.png`),load($('iB'),`plates/${sh.plate}_B.png`),load($('iV'),`plates/${sh.plate}_A.png`),load($('iW'),`plates/${sh.plate}_B.png`)]);$('LA').style.display=$('LB').style.display=''}else{$('LA').style.display=$('LB').style.display='none'}}
 // transform da camera calculado antes da cena (para converter posicoes 3D em tela no mesmo quadro)
 const pre=()=>{const zb=FX.cz||0,pn=FX.cpn||[0,0],Tn=trans(gt,sh),sk=FX.shake||0,z0=(1+zb+(FX.punch||0))*Tn.s-1,dx=sk*sn(gt*61)+pn[0]+Tn.dx+5*sn(gt*.31)+3*sn(gt*.77),dy=sk*sn(gt*53+1)+pn[1]+Tn.dy+4*sn(gt*.27+2),rl=(FX.roll||0)+Tn.r+.3*sn(gt*.5);return{zb,Tn,z0,dx,dy,rl}};
 REAC=REACTS.find(r=>gt>=r.t0&&gt<r.t1)||null;
 const t=gt-sh.t0,u=cl(t/(sh.t1-sh.t0));CU=u;
 // passo 1: roda a cena so para descobrir a camera; passo 2: roda de novo com XF correto
 for(let pass=0;pass<2;pass++){FX={};FR=[];SHD=[];for(const k in CHS)CHS[k].g.style.display='none';sh.f(t,u);const q=pre(),ra=q.rl*Math.PI/180;XF={s:1+q.z0*1.06,dx:q.dx,dy:q.dy,cr:cs(ra),sr:sn(ra)}}
 const {zb,Tn,z0,dx,dy,rl}=pre();
 FR.sort((a,b)=>b.z-a.z).forEach(c=>(c.top?cw2:cw).appendChild(c.g));
 const LI=FX.lit||LIT[sh.lit||sh.plate||'cos'];setLit(LI);const sdx=-LI.d[0]*.5;
 $('sg').innerHTML=SHD.map(([x,y,k])=>`<ellipse cx="${(x+sdx*60*k).toFixed(1)}" cy="${(y+4*k).toFixed(1)}" rx="${(95*k).toFixed(1)}" ry="${(18*k).toFixed(1)}" transform="rotate(${(sdx*6).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="rgba(10,0,25,${(.38*(LI.sh/.35)).toFixed(2)})"/>`).join('');
 $('sg2').innerHTML=SHD.map(([x,y,k])=>`<ellipse cx="${x.toFixed(1)}" cy="${(y+2*k).toFixed(1)}" rx="${(58*k).toFixed(1)}" ry="${(9*k).toFixed(1)}" fill="rgba(5,0,15,.55)"/>`).join('');
 $('aw').innerHTML=FX.aw||'';$('fw').innerHTML=FX.fw||'';
 FR.forEach(c=>{if(c.k=='C'||!CSH.plate||!c.sp){c.g.style.filter='';return}const k=cl((c.sp[2]>0?(.55-c.sp[2])/.45:0));c.g.style.filter=k>.02?`saturate(${(1-.45*k).toFixed(2)}) contrast(${(1-.25*k).toFixed(2)}) brightness(${(1-.08*k).toFixed(2)})`:''});
 bg.clearRect(0,0,W,H);if(FX.bg)FX.bg(bg);
 const ox=`${dx}px,${dy}px`;
 const bl=Tn.bx>.4||Tn.by>.4?'url(#mbx)':'';$('mbg').setAttribute('stdDeviation',`${Tn.bx.toFixed(1)} ${Tn.by.toFixed(1)}`);
 $('LA').style.transform=`translate(${ox}) scale(${1+z0}) rotate(${rl}deg)`;$('SV').style.transform=$('SV2').style.transform=`translate(${ox}) scale(${1+z0*1.06}) rotate(${rl}deg)`;$('LB').style.transform=`translate(${ox}) scale(${1+z0*1.16}) rotate(${rl}deg)`;
 $('BG').style.transform=`scale(${1+z0*.5}) rotate(${rl*.5}deg)`;
 // filtros do cenario: noite, visao dos Seis Olhos, espaco dobrado (Ilimitado), percepcao com a venda
 let pf='';const vs=FX.vis||0;
 if(FX.night)pf+=` brightness(${(.5).toFixed(2)}) saturate(.65) hue-rotate(-12deg)`;

 if(FX.warp&&FX.warp[3]>.5){const [wx,wy,wr,ws]=FX.warp,R=wr;$('wimg').setAttribute('x',(wx-R).toFixed(1));$('wimg').setAttribute('y',(wy-R).toFixed(1));$('wimg').setAttribute('width',(2*R).toFixed(1));$('wimg').setAttribute('height',(2*R).toFixed(1));$('wdm').setAttribute('scale',ws.toFixed(1));pf+=' url(#warp)'}
 if(FX.sonar>.01){const k=1-.75*FX.sonar;['sdR','sdG','sdB'].forEach(i=>$(i).setAttribute('slope',k.toFixed(3)));const g=(4.5*FX.sonar*(.75+.25*sn(gt*4))).toFixed(3);$('scm').setAttribute('values',`0 0 0 0 0 ${(.55*g).toFixed(3)} ${(.55*g).toFixed(3)} ${(.55*g).toFixed(3)} 0 0 ${g} ${g} ${g} 0 0 0 0 0 1 0`);pf+=' url(#sonar)'}
 const bri=FX.dark?`brightness(${1-FX.dark})`:'',dof=FX.dof!=null?FX.dof:(sh.plate?Math.min(6,Math.max(0,(zb-.16)*12)):0);
 $('LA').style.filter=((dof>.3?`blur(${dof.toFixed(1)}px)`:'')+pf+' '+bl+' '+bri).trim()||'none';$('LB').style.filter=((dof>.3?`blur(${(dof*.6).toFixed(1)}px)`:'')+pf+' '+bl+' '+bri).trim()||'none';
 // visao dos Seis Olhos: copia do cenario em azul por cima, com opacidade = intensidade (sem cores intermediarias)
 const VF=' sepia(1) hue-rotate(172deg) saturate(2.3) brightness(.7) contrast(1.15)',von=sh.plate&&vs>.01;$('LV').style.display=$('LW').style.display=von?'':'none';
 if(von){$('LV').style.transform=$('LA').style.transform;$('LW').style.transform=$('LB').style.transform;$('LV').style.filter=$('LA').style.filter.replace('none','')+VF;$('LW').style.filter=$('LB').style.filter.replace('none','')+VF;$('LV').style.opacity=$('LW').style.opacity=Math.min(1,vs).toFixed(3)}
 const chr=FX.chroma||0;
 $('SV').style.filter=('drop-shadow(-4px 0 2px rgba(255,170,80,.22)) drop-shadow(4px 0 2px rgba(120,170,255,.3)) '+(chr>.5?`drop-shadow(${chr.toFixed(1)}px 0 0 rgba(255,0,80,.45)) drop-shadow(${(-chr).toFixed(1)}px 0 0 rgba(0,220,255,.45)) `:'')+bl+' '+bri).trim();
 const c=oc;c.clearRect(0,0,W,H);
 if(FX.night){c.fillStyle='rgba(10,20,80,.28)';c.fillRect(0,0,W,H)}
 c.globalCompositeOperation='lighter';
 const glow=(x,y,r,col,al)=>{if(al<=0||r<=0)return;const q=c.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${col},${Math.min(1,al)})`);q.addColorStop(1,`rgba(${col},0)`);c.fillStyle=q;c.fillRect(x-r,y-r,2*r,2*r)};
 (FX.gl||[]).forEach(g=>glow(...g));
 (FX.gls||[]).forEach(([x,y,r,col,al])=>{const p=zpS(x,y);glow(p[0],p[1],r*XF.s,col,al)});
 // raios de luz volumetricos
 (FX.rays||[]).forEach(([x,y,a,col,n,L])=>{const p=zpS(x,y);for(let i=0;i<n;i++){const an=i/n*6.283+gt*.05+rnd(i,2.2)*.3,w=.05+.06*rnd(i,4.4),l=L*(.6+.4*rnd(i,6.6));const g2=c.createRadialGradient(p[0],p[1],0,p[0],p[1],l);g2.addColorStop(0,`rgba(${col},${(a*.35).toFixed(3)})`);g2.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g2;c.beginPath();c.moveTo(p[0],p[1]);c.arc(p[0],p[1],l,an-w,an+w);c.closePath();c.fill()}});
 // particulas de energia
 (FX.pf||[]).forEach(([x,y,R,n,col,a,kind])=>{const p=zpS(x,y),RR=R*XF.s;for(let i=0;i<n;i++){const ph=(gt*(.25+.35*rnd(i,3.3))+rnd(i,7.7))%1,an=rnd(i,12.9)*6.283+(kind=='orbit'?gt*(.6+rnd(i,2.1)):0);let px,py;
  if(kind=='rise'){px=p[0]+(rnd(i,5.1)-.5)*RR*2+10*sn(gt*2+i);py=p[1]+RR*(.6-ph*1.8)}else if(kind=='in'){const r=RR*(1-ph);px=p[0]+cs(an)*r;py=p[1]+sn(an)*r}else{const r=RR*(.55+.45*rnd(i,9.9));px=p[0]+cs(an)*r;py=p[1]+sn(an)*r*.45}
  const s=(2+5*rnd(i,4.4))*Math.max(.6,XF.s*.6),al=a*sn(ph*3.14)*(.5+.5*ab(sn(gt*5+i)));glow(px,py,s*4,col,al*.5);c.fillStyle=`rgba(235,250,255,${(al).toFixed(3)})`;c.fillRect(px-s/2,py-s/2,s,s)}});
 // lens flare anamorfico (azul)
 (FX.flare||[]).forEach(([x,y,a])=>{if(a<=0)return;const p=zpS(x,y);glow(p[0],p[1],160*a,'200,240,255',.8*a);c.save();c.translate(p[0],p[1]);c.scale(9,.12);glow(0,0,90,'120,200,255',.9*a);c.restore();for(let k=1;k<4;k++){const gx=lp(p[0],540,k*.5),gy=lp(p[1],1000,k*.5);glow(gx,gy,30+k*25,'90,170,255',.18*a)}});
 c.globalCompositeOperation='source-over';
 if(FX.fog){for(let i=0;i<3;i++){const y=1250+i*180+30*sn(gt*.4+i),gr=c.createLinearGradient(0,y-220,0,y+220);gr.addColorStop(0,'rgba(90,100,180,0)');gr.addColorStop(.5,`rgba(90,100,180,${(.14+.05*sn(gt*.7+i)).toFixed(3)})`);gr.addColorStop(1,'rgba(90,100,180,0)');c.fillStyle=gr;c.fillRect(0,y-220,W,440)}}
 if(FX.tint){c.fillStyle=`rgba(${FX.tint[0]},${FX.tint[1]},${FX.tint[2]},${FX.tint[3]})`;c.fillRect(0,0,W,H)}
 // grade de cor (sombras azuladas, altas luzes quentes) + vinheta
 let gr=c.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(40,60,200,.12)');gr.addColorStop(1,'rgba(255,120,60,.06)');c.fillStyle=gr;c.fillRect(0,0,W,H);
 const vg=FX.vig!=null?FX.vig:.5;gr=c.createRadialGradient(W/2,H*.5,H*.22,W/2,H*.5,H*.7);gr.addColorStop(0,'rgba(5,0,20,0)');gr.addColorStop(1,`rgba(4,0,18,${vg})`);c.fillStyle=gr;c.fillRect(0,0,W,H);
 const vh=Math.max(FX.vhs||0,Tn.vhs||0);if(vh>.01){for(let i=0;i<7;i++){const y=(rnd(Math.floor(gt*24)+i,7.7)*H),h=10+rnd(i+Math.floor(gt*24),2.3)*60;c.fillStyle=`rgba(180,230,255,${(.18*vh).toFixed(3)})`;c.fillRect(0,y,W,h);c.fillStyle=`rgba(255,40,120,${(.12*vh).toFixed(3)})`;c.fillRect(rnd(i,5)*80,y+h,W,6)}
  for(let y=0;y<H;y+=6){c.fillStyle=`rgba(0,0,0,${(.15*vh).toFixed(3)})`;c.fillRect(0,y,W,2)}}
 for(let i=0;i<220;i++){const x=rnd(i+gt*97,1.7)*W,y=rnd(i+gt*31,8.3)*H;c.fillStyle=i%2?'rgba(255,255,255,.045)':'rgba(0,0,0,.055)';c.fillRect(x,y,3,3)}
 const fl=Math.max(Tn.fl,FX.flash||0);if(fl>0){c.fillStyle=`rgba(${(FX.flash||0)>Tn.fl?(FX.flcol||'255,255,255'):Tn.col},${fl})`;c.fillRect(0,0,W,H)}
 const fd=gt<OLDT?cl((gt-(OLDT-.6))/.6):0;if(fd>0){c.fillStyle=`rgba(0,0,0,${fd})`;c.fillRect(0,0,W,H)}
 if(REAC&&FR.includes(CHS.CIB)&&CHS.CIB.sp&&CHS.CIB.g.style.opacity!=='0'){const p=CHS.CIB.sp,ku=p[2],q=zpS(p[0],p[1]-(CHS.CIB.sit?240:330)*ku),fl=q[0]>620,bx=Math.min(860,Math.max(220,q[0]+(fl?-200:200))),by=Math.min(1420,Math.max(560,q[1]-90)),fo=1-cl((gt-REAC.t1+.12)/.12);FX.ui=(FX.ui||'')+`<g opacity="${fo.toFixed(2)}">`+BUBBLE(bx,by,REAC.w,REAC.t0,!fl)+'</g>'}
 $('UI').innerHTML=FX.ui||'';$('UI').style.opacity=1-fd;$('st').style.filter=FX.grade||'contrast(1.06) saturate(1.1)'};
