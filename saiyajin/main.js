// =====================================================================
//  E SE VOCE FOSSE UM SAIYAJIN?  (1080x1920, 24 fps)
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
const OLDT=Math.round((pe(Math.min(26,PH.length))+3.4)*24)/24,TOTAL=PH.length>26?Math.round((pe(PH.length)+1.45)*24)/24:OLDT;window.TOTAL=TOTAL;window.PHRASES=PH.map((t,i)=>[t,ps(i+1),pe(i+1)]);
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
 let mood=o.m||'happy';if(spk&&o.mt)mood=o.mt;const rx=['CIB','CSS','CUI'].includes(k)&&REAC&&GT<REAC.t1-.12;if(rx){mood=['shock','scared','worry','sad','sleepy','blank','strain'].includes(mood)?'talkd':['angry','focus'].includes(mood)?'talka':'talk';o={...o,talk:.9,mry:undefined}}const six=o.six!=null,bl=o.blind!=null;const key=[mood,o.fr||'',o.pd?o.pd.join():'',o.hat===0?0:1,six?1:0,bl?1:0,o.hold?1:0].join('|');
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
 C.g.style.display='';C.g.style.opacity=o.op??1;C.z=o.zz??p[2];C.top=o.top;C.k=k;C.sil=o.sil;C.hf=o.hf;C.sit=o.sit?1:0;C.sp=[p[0],p[1]+(o.sit?90*ku:0),ku];FR.push(C);if(o.shd||(!o.px&&!o.sit&&y<.4&&!o.noshd))SHD.push([p[0],p[1],ku])}
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
// rival Saiyajin ORIGINAL (arquetipo do rival orgulhoso; design proprio, no traco do projeto)
const RIV_HAIR=`<path d="M-70-250L-100-332L-62-312L-80-414L-32-342L-22-456L6-350L32-446L46-340L88-404L66-300L100-322L70-250Z" fill="#17121f" ${S}/><path d="M-30-350L-22-420M10-360L28-430M50-330L76-382" stroke="#4d4470" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M-60-272L-44-246L-30-272L-14-244L2-272L18-246L32-272L46-250L60-274Z" fill="#17121f"/>`;
const RIV_FX=`<path d="M30-262L50-212" stroke="#b55a5a" stroke-width="4" stroke-linecap="round"/><path d="M-44-212Q-34-206-24-212M24-212Q34-206 44-212" stroke="rgba(27,16,36,.35)" stroke-width="4" fill="none"/>`;
const RIV_BX=`<ellipse cx="-50" cy="-172" rx="26" ry="15" fill="#b3192e" ${S4}/><ellipse cx="50" cy="-172" rx="26" ry="15" fill="#b3192e" ${S4}/><path d="M-40-166H40L44-116Q0-102-44-116Z" fill="#6b7383" ${S4}/><path d="M-30-150H30" stroke="#b3192e" stroke-width="10"/><path d="M-36-130H36" stroke="rgba(255,255,255,.35)" stroke-width="5"/><rect x="-52" y="-104" width="104" height="12" fill="#111"/>`;
Object.assign(CHD,{RIV:{sk:'#e8b48c',hc:'#17121f',hs:'short',sh:'#2a1838',pa:'#1e1028',shoe:'#3a3442',ic:'#c81e3a',hat:RIV_HAIR,fx:RIV_FX,bx:RIV_BX,id:18}});CHS.RIV={...mkg(),d:CHD.RIV,id:18};
document.querySelector('#SV defs').insertAdjacentHTML('beforeend','<radialGradient id="pball"><stop offset="0" stop-color="#fff2ff"/><stop offset=".35" stop-color="#d48cff"/><stop offset="1" stop-color="#6a1aa8" stop-opacity="0"/></radialGradient>');
const PBALL=s=>`<g transform="translate(0 46) scale(${(+s).toFixed(3)})"><circle r="60" fill="url(#pball)"/><circle r="22" fill="#f6e4ff" stroke="#b56bff" stroke-width="4"/></g>`;
const darkAura=(k,a,sc=1.2)=>aura(k,a,'#5a12a0','#d49bff',sc,1,6);
const rivEyes=(k,a)=>{const e=eyeP(k),ku=C[k].sp[2];(FX.gls=FX.gls||[]).push([e[0]-25*ku,e[1],16*ku,'255,40,70',.22*a],[e[0]+25*ku,e[1],16*ku,'255,40,70',.22*a])};
// ---------- COMBATE: antecipacao, smear, hit-stop, impact frame, hit-flash e tremor "trauma^2" ----------
// curva do braco: recua (antecipacao) -> golpe rapido -> segura no contato (hit-stop) -> volta com leve overshoot
const PUNCH=h=>{const d=GT-h;if(d<-.16||d>.55)return 0;if(d<-.06)return -.35*sn((d+.16)/.1*Math.PI/2);if(d<0)return lp(-.35,1,ez((d+.06)/.06));if(d<.09)return 1;return Math.max(0,1-ez((d-.09)/.35))+.08*sn((d-.09)*30)*Math.exp(-(d-.09)*8)};
const pick=a=>a.reduce((x,y)=>ab(y)>ab(x)?y:x,0);
const smearOn=hs=>hs.some(h=>{const d=GT-h;return d>-.06&&d<.035});
const REC=h=>{const d=GT-h;if(d<.09)return 0;if(d<.3)return ez((d-.09)/.21);return Math.max(0,1-ez((d-.3)/.7))};
const RECH=h=>{const d=GT-h;return d<.09?0:ez((d-.09)/.32)};
const inHit=(hs,dur=.09)=>hs.some(h=>GT>=h&&GT<h+dur);
// posicao do ombro e do punho (mesma geometria do braco do personagem)
const armPos=(k,ang,side=1,flip=1)=>{const p=CHS[k].sp,ku=p[2],a=ang*Math.PI/180,vx=side*31.8,vy=66,x=vx*cs(a)-vy*sn(a),y=vx*sn(a)+vy*cs(a);return{s:[p[0]+flip*side*44*ku,p[1]-170*ku],f:[p[0]+flip*(side*44+x)*ku,p[1]+(-170+y)*ku],ku}};
const SMEAR=(A,col='#fff',a=1)=>{const[sx,sy]=A.s,[ex,ey]=A.f,ku=A.ku,dx=ex-sx,dy=ey-sy,L=Math.hypot(dx,dy)||1,ux=dx/L,uy=dy/L,nx=-uy,ny=ux,w=30*ku;
 let s=`<path d="M${(sx+nx*w*.25).toFixed(1)} ${(sy+ny*w*.25).toFixed(1)}L${(ex+nx*w).toFixed(1)} ${(ey+ny*w).toFixed(1)}L${(ex+ux*w*.6).toFixed(1)} ${(ey+uy*w*.6).toFixed(1)}L${(ex-nx*w).toFixed(1)} ${(ey-ny*w).toFixed(1)}L${(sx-nx*w*.25).toFixed(1)} ${(sy-ny*w*.25).toFixed(1)}Z" fill="${col}" opacity="${(.5*a).toFixed(2)}"/>`;
 for(let i=-1;i<=1;i++){const o=i*w*.85;s+=`<line x1="${(ex-ux*190*ku+nx*o).toFixed(1)}" y1="${(ey-uy*190*ku+ny*o).toFixed(1)}" x2="${(ex-ux*50*ku+nx*o).toFixed(1)}" y2="${(ey-uy*50*ku+ny*o).toFixed(1)}" stroke="${col}" stroke-width="${(7*ku).toFixed(1)}" stroke-linecap="round" opacity="${(.85*a).toFixed(2)}"/>`}return s};
// estrela de impacto (desenho de "impact frame" no traco do projeto)
const STARB=(x,y,t0,s,col=GOLD2,life=.32)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,R=s*(70+130*Math.sqrt(k));let p='',q='';for(let i=0;i<16;i++){const a=i/16*6.283+t0*3,r=i%2?R*.42:R*(.8+.45*rnd(i,t0+1));p+=(i?'L':'M')+(x+cs(a)*r).toFixed(1)+' '+(y+sn(a)*r).toFixed(1);q+=(i?'L':'M')+(x+cs(a)*r*.5).toFixed(1)+' '+(y+sn(a)*r*.5).toFixed(1)}
 return`<path d="${p}Z" fill="#fff" stroke="${INK}" stroke-width="${(10*s).toFixed(1)}" stroke-linejoin="round" opacity="${(1-k*k).toFixed(2)}"/><path d="${q}Z" fill="${col}" opacity="${(1-k).toFixed(2)}"/>`};
const SPARKS=(x,y,t0,s,col=GOLD2)=>{const d=GT-t0;if(d<0||d>.45)return'';const k=d/.45;let o='';for(let i=0;i<12;i++){const a=rnd(i,t0+2)*6.283,v=s*(300+400*rnd(i,t0+5)),px=x+cs(a)*v*d,py=y+sn(a)*v*d+500*d*d;o+=`<line x1="${px.toFixed(1)}" y1="${py.toFixed(1)}" x2="${(px-cs(a)*40*s).toFixed(1)}" y2="${(py-sn(a)*40*s).toFixed(1)}" stroke="${col}" stroke-width="${(6*s*(1-k)).toFixed(1)}" stroke-linecap="round"/>`}return o};
// ===== 0) GANCHO: derrubado... e levanta mais forte =====
const tDer=wt(2,'derrota',.2),tFor=wt(2,'forte',.1),tSai=wt(1,'Saiyajin',.2);
shot('twn2',0,(t,u)=>{
 const up=ob(GT,tFor-.45,.55),gl=cl((GT-tFor+.1)/.3);
 const k=GT>tFor?'CSS':'CIB';put(k,lp(-1.6,.2,up),0,3.2,{sc:2.4,m:GT<tFor-.45?'sad':GT<tFor?'angry':'grin',rot:lp(84,0,up),aR:lp(-60,-30,up),aL:lp(60,30,up),nobob:up<1,brow:6,sq:SQ(tFor,1.2),six:GT>tFor?.0:undefined,extra:GT<tFor?SWEAT(-80,-300,.8):''});
 const c0=chestP(k),ku=C[k].sp[2],pre=GT<tFor?.35+.35*ab(sn(GT*5.5))*(.5+.5*cl(GT/tFor)):0;if(GT>tFor){goldAura(k,gl);fw(BOLTS(c0[0],c0[1],170*ku,GT,gl));FX.pf=[[c0[0],c0[1],330*ku,30,'255,220,120',gl,'rise']]}
 else{const rr=lp(84,0,up)*Math.PI/180,bx=C[k].sp[0]+150*ku*sn(rr),by=C[k].sp[1]-150*ku*cs(rr);fw(BOLTS(bx,by,200*ku,GT,pre*.8)+RIP(bx,by,Math.floor(GT/.75)*.75,.6,420*ku,GOLD2));(FX.gls=FX.gls||[]).push([bx,by,320*ku,'255,200,90',pre*.7]);FX.pf=[[bx,by,300*ku,26,'255,220,120',pre,'in']]}
 const p=C[k].sp,q=zpS(p[0],p[1]);let ui=TXT('E SE VOCÊ FOSSE',540,250,72,'#fff',-3,pop(GT,.05))+(GT>tSai-.1?TXT('UM SAIYAJIN?',540,370,108,GOLD,-3,pop(GT,tSai-.1)*(1+.025*sn(GT*6))):'');
 ui+=RIP(q[0],q[1],0,.7,500,'#ffe9b0')+RAYS(GT,tFor,q[0],q[1]-300,.45,18,GOLD2);
 if(GT>tDer-.1&&GT<tFor)ui+=TXT('DERROTA...',540,500,64,'#ff6b6b',-3,pop(GT,tDer-.1));
 if(GT>tFor)ui+=TXT('MAIS FORTE!',540,500,84,GOLD2,-3,pop(GT,tFor));
 const rr=lp(84,0,up)*Math.PI/180,F=foc(p[0]+260*p[2]*sn(rr),p[1]-200*p[2]*cs(rr),.4);
 camA([[0,.42,F[0],F[1],-4],[.6,.22,F[0],F[1],2],[2.2,.32,F[0],F[1],-2],[tFor-.1,.38,F[0],F[1],0],[tFor,.18,F[0]*.5,F[1]*.5,-2,'c'],[ps(3),.24,F[0]*.6,F[1]*.6,1]]);
 FX.ui=ui;FX.lit=GT>tFor?{amb:[1.05,.95,.8],rim:[255,220,120],d:[0,-1],sh:.3,ri:1}:LIT.road;FX.shake=18*sh1(GT,[0],4)+14*sh1(GT,[tFor],5)+(GT<tFor?5*sh1(GT,[0,.75,1.5,2.25,3,3.75],9):0);FX.flash=Math.max(.5*cl(1-GT/.25),.55*sh1(GT,[tFor],9));FX.flcol='255,235,170';FX.chroma=5*sh1(GT,[tFor],4)},'');
// ===== 1) raca guerreira mais temida do universo =====
const tRac=wt(3,'raças',.2),tTem=wt(3,'temidas',.2);
shot(null,ps(3)-.2,(t,u)=>{FX.bg=c=>{cosmos(c,GT,{warm:1,c0:'#5a1a3a',c1:'#1a0820'});planet(c,820,560,150,GT,0)};
 [['T1',-2.6],['T2',-1.3],['T3',1.3],['R4',2.6],['R5',0]].forEach(([k,x],i)=>{const a=ob(GT,ps(3)+i*.15,.4);put(k,0,0,0,{px:[540+x*150,1250-ab(x)*20],ku:1.25,m:'angry',sil:1,op:a,still:1,zz:3})});
 put('CIB',0,0,0,{px:[540,1640],ku:2.1,m:'angry',brow:7,aR:-30,aL:30,zz:1,nodrift:1});
 [['T1',-2.6],['T2',-1.3],['T3',1.3],['R4',2.6],['R5',0]].forEach(([k,x])=>{const e=eyeP(k),ku=C[k].sp[2];(FX.gls=FX.gls||[]).push([e[0]-25*ku,e[1],30,'255,40,60',.9],[e[0]+25*ku,e[1],30,'255,40,60',.9])});
 let ui='';if(GT>tRac)ui+=TXT('RAÇA GUERREIRA',540,300,88,'#ff5d6d',-3,pop(GT,tRac));if(GT>tTem)ui+=TXT('A MAIS TEMIDA DO UNIVERSO',540,410,52,'#fff',-3,pop(GT,tTem));
 camA([[ps(3)-.2,.3,0,-120,-2],[ps(4),.05,0,0,1]]);
 FX.ui=ui;FX.lit={amb:[.8,.7,.8],rim:[255,90,110],d:[0,-1],sh:.4,ri:1};FX.vig=.75;FX.tint=[120,0,30,.08]},'flashR');
// ===== 2) treinado desde pequeno: sequencia de socos (antecipacao + smear + impacto) =====
const tPeq=wt(4,'pequeno',.2),tTre=wt(4,'treinado',.2),tIni=wt(4,'inimigos',0);
const TRH=[];for(let t=ps(4)+.15,i=0;t<tIni-.35;t+=i%3==2?.5:.3,i++)TRH.push(t);
shot('prcW',ps(4)-.2,(t,u)=>{
 const R=TRH.filter((h,i)=>i%2==0),L=TRH.filter((h,i)=>i%2==1),cR=pick(R.map(PUNCH)),cL=pick(L.map(PUNCH)),lun=Math.max(0,cR,cL);
 put('CIB',.08*lun,0,4.2,{sc:.8,top:1,m:inHit(TRH)?'talka':'angry',mry:inHit(TRH)?10:undefined,brow:8,aR:lp(-20,-95,cR),aL:lp(20,95,cL),tilt:4*(cR-cL),rot:2*(cR-cL),look:[8*(cR-cL),0],bob:.5,sq:{sx:1+.05*lun,sy:1-.04*lun}});
 const p=C.CIB.sp,ku=p[2];let s='';
 R.forEach(h=>{if(smearOn([h]))s+=SMEAR(armPos('CIB',lp(-20,-95,cR),1),'#fff');const A=armPos('CIB',-95,1);s+=STARB(A.f[0]+30*ku,A.f[1],h,ku*.55)+SPARKS(A.f[0],A.f[1],h,ku*.7)});
 L.forEach(h=>{if(smearOn([h]))s+=SMEAR(armPos('CIB',lp(20,95,cL),-1),'#fff');const A=armPos('CIB',95,-1);s+=STARB(A.f[0]-30*ku,A.f[1],h,ku*.55)+SPARKS(A.f[0],A.f[1],h,ku*.7)});fw(s);
 let ui='';if(GT>tPeq)ui+=TXT('DESDE PEQUENO',540,300,92,'#fff',-3,pop(GT,tPeq));if(GT>tTre)ui+=TXT('TREINO!',540,420,120,GOLD,-3,pop(GT,tTre)*(1+.04*sn(GT*14)));
 const tr=sh1(GT,TRH,9),F=foc(p[0],p[1]-150*ku,.45);camA([[ps(4)-.2,.3,F[0],F[1],-2],[tIni,.48,F[0],F[1],2]]);FX.cz+=.05*tr;
 FX.ui=ui;FX.lit=LIT.prcW;FX.shake=2+16*tr*tr;FX.flash=.12*sh1(GT,TRH,20);FX.flcol='255,255,255'},'wr');
const BURSTX=(x,y,t0,ku)=>{const d=GT-t0;if(d<0||d>.25)return'';const k=d/.25;let s=`<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${((30+90*k)*ku).toFixed(1)}" fill="none" stroke="#fff" stroke-width="${(10*(1-k)*ku).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`;for(let i=0;i<6;i++){const a=i/6*6.283+.3;s+=`<line x1="${(x+cs(a)*40*ku).toFixed(1)}" y1="${(y+sn(a)*40*ku).toFixed(1)}" x2="${(x+cs(a)*(60+110*k)*ku).toFixed(1)}" y2="${(y+sn(a)*(60+110*k)*ku).toFixed(1)}" stroke="${GOLD2}" stroke-width="${(8*(1-k)*ku).toFixed(1)}" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/>`}return s};
// ===== 3) inimigos capazes de destruir planetas =====
const tDes=wt(4,'destruir',.3),tPla=wt(4,'planetas',.3);
shot(null,tIni-.1,(t,u)=>{const bm=cl((GT-tDes)/1.1);FX.bg=c=>{cosmos(c,GT,{warm:1,k:.7});planet(c,560,820,230,GT,bm)};
 const tTh=tDes-.4,hasB=GT<tTh+.05;put('RIV',0,0,0,{px:[850,1660],ku:1.9,flip:-1,m:'grin',hold:hasB?PBALL(.4+.8*ob(GT,tIni,.8)):undefined,aR:GT<tTh?tw(-20,-165,tIni+.1,.5):tw(-165,-60,tTh,.15),aL:20,nodrift:1,zz:1,brow:4,look:[-6,-4]});darkAura('RIV',.75,1.2);rivEyes('RIV',1);
 if(GT>tTh&&GT<tDes+.05){const k=ez(cl((GT-tTh)/(tDes-tTh))),x=lp(700,560,k),y=lp(1010,820,k);fw(`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(1.4-.5*k).toFixed(2)})"><circle r="70" fill="url(#pball)"/><circle r="26" fill="#f6e4ff"/></g>`)}
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
 put(k,lp(-2,0,up),0,lp(2.6,4.6,up),{sc:2.6,m:GT<tRec?'sad':GT<tDra?'focus':'grin',rot:lp(80,0,up),aR:lp(-60,-24,up),aL:lp(60,24,up),nobob:up<1,brow:5,sq:SQ(tDra,1.2),extra:GT<tDra?SWEAT(-80,-300,.8)+SWEAT(70,-260,.6):''});
 const c0=chestP(k),ku=C[k].sp[2];if(GT>tDra){goldAura(k,pw*.9);fw(BOLTS(c0[0],c0[1],170*ku,GT,pw*.7))}
 let ui='';if(GT>tExt&&GT<tRec)ui+=TXT('BATALHA EXTREMA',540,300,84,'#ff6b6b',-3,pop(GT,tExt));
 if(GT>tRec-.1)ui+=TXT('SE RECUPERA...',540,300,84,'#fff',-3,pop(GT,tRec-.1));
 const mv=GT<tDra?lp(.08,.22,ez((GT-tRec)/1)):lp(.22,1,ez((GT-tDra)/.6));if(GT>tRec){const a=ob(GT,tRec,.3);ui+=`<g opacity="${a.toFixed(2)}"><rect x="140" y="1330" width="800" height="150" rx="30" fill="#1a0a08" opacity=".85" stroke="${GOLD}" stroke-width="6"/><rect x="180" y="1380" width="720" height="54" rx="27" fill="#3a2410"/><rect x="186" y="1386" width="${(708*mv).toFixed(1)}" height="42" rx="21" fill="${GOLD}"/></g>`+TXT(GT>tDra?'PODER x10!':'PODER',540,1300,GT>tDra?104:60,GOLD,-3,GT>tDra?pop(GT,tDra):a)}
 const rr=lp(80,0,up)*Math.PI/180,pp=C[k].sp,F=foc(pp[0]+150*pp[2]*sn(rr),pp[1]-150*pp[2]*cs(rr),.3);camA([[ps(6)-.2,.34,F[0],F[1],-3],[tRec,.3,F[0],F[1],0],[tDra,.15,F[0]*.5,F[1]*.5,2,'c'],[ps(8),.2,F[0]*.5,F[1]*.5,0]]);
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
 const rise=ob(GT,ps(10)+.3,.9);put('RIV',1.5,0,1.4,{sc:3.9,flip:-1,m:GT<tImp?'smirk':'grin',aR:28,aL:-28,brow:6,look:[-6,6],bobv:-(1-rise)*900,nodrift:1});darkAura('RIV',.4+.5*rise,1.3);rivEyes('RIV',rise);
 put('CIB',-1,0,4.2,{sc:2.3,m:GT<tImp?'worry':'scared',look:[4,-10],brow:6,sq:SQ(tImp,1)});
 let ui='';if(GT>tImp)ui+=TXT('IMPOSSÍVEL',540,300,128,'#ff4d6d',-3,pop(GT,tImp))+TXT('DE DERROTAR',540,410,72,'#fff',-3,pop(GT,tImp+.15));
 camA([[ps(10)-.25,.0,0,0,-2],[tImp,.12,0,-40,0,'c'],[ps(11),.16,0,-60,2]]);
 FX.ui=ui;FX.lit=LIT.twn3;FX.vig=.8;FX.shake=4*rise+10*sh1(GT,[tImp],5);FX.tint=[90,0,60,.12];FX.fog=1},'dip');
// ===== 8) amigos em perigo =====
const tPer=wt(11,'perigo',.2);
shot('twn3',ps(11)-.2,(t,u)=>{
 [['T1',-1.6,0],['T3',-.3,1],['R4',1.1,2]].forEach(([k,x,i])=>put(k,x,0,1.8,{sc:2.1,m:'scared',rot:4*sn(GT*18+i),look:[-3,-8],brow:8,extra:SWEAT(-80,-300,.8)}));
 put('RIV',.4,0,-1.6,{sc:3.3,flip:-1,m:'grin',hold:PBALL(1+.12*sn(GT*9)),aR:-95,aL:24,brow:6,look:[-4,6]});darkAura('RIV',.9,1.3);rivEyes('RIV',1);
 let ui='';if(GT>tPer)ui+=TXT('AMIGOS EM PERIGO',540,320,92,'#ff4d6d',-3,pop(GT,tPer)*(1+.03*sn(GT*9)));
 camA([[ps(11)-.2,.3,0,120,-2],[ps(12),.2,0,60,1]]);
 FX.ui=ui;FX.lit=LIT.twn3;FX.vig=.8;FX.tint=[200,0,30,.12+.06*ab(sn(GT*6))];FX.shake=3},'wr');
// ---- efeitos extras da transformacao ----
Object.assign(CHD,{CSH:{...CHD.CIB,hat:HOODC(GOLD),id:19}});CHS.CSH={...mkg(),d:CHD.CSH,id:19};
document.querySelector('#SV defs').insertAdjacentHTML('beforeend','<linearGradient id="pillg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#ffb300" stop-opacity="0"/><stop offset=".3" stop-color="#ffcf40" stop-opacity=".55"/><stop offset=".5" stop-color="#fffbe6" stop-opacity=".95"/><stop offset=".7" stop-color="#ffcf40" stop-opacity=".55"/><stop offset="1" stop-color="#ffb300" stop-opacity="0"/></linearGradient>');
const PILLAR=(k,a,w=1)=>{if(a<=.01)return;const p=CHS[k].sp,ku=p[2],ww=320*ku*w*(1+.06*sn(GT*23));FX.aw=(FX.aw||'')+`<rect x="${(p[0]-ww/2).toFixed(1)}" y="-700" width="${ww.toFixed(1)}" height="${(p[1]+720).toFixed(1)}" fill="url(#pillg)" opacity="${Math.min(1,a).toFixed(2)}"/>`};
const CRACKS=(x,y,ku,a)=>{if(a<=0)return'';let s='';for(let i=0;i<8;i++){const an=i/8*6.283+.2,L=(120+160*rnd(i,3.3))*ku*a;let d=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let k=1;k<=4;k++){const r=L*k/4;d+=`L${(x+cs(an)*r+(rnd(i*7+k,5.1)-.5)*30*ku).toFixed(1)} ${(y+sn(an)*r*.28+(rnd(i*7+k,8.3)-.5)*8*ku).toFixed(1)}`}s+=`<path d="${d}" stroke="${INK}" stroke-width="${(9*ku).toFixed(1)}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" stroke="${GOLD2}" stroke-width="${(3.5*ku).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(.6+.4*ab(sn(GT*12+i))).toFixed(2)}"/>`}return s};
const DUST=(x,y,t0,ku,life=1.1)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,R=(80+900*(1-(1-k)*(1-k)))*ku;let s=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${R.toFixed(1)}" ry="${(R*.22).toFixed(1)}" fill="none" stroke="#fff3c8" stroke-width="${(14*(1-k)*ku+1).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`;for(let i=0;i<16;i++){const a=i/16*6.283;s+=`<circle cx="${(x+cs(a)*R).toFixed(1)}" cy="${(y+sn(a)*R*.22-30*ku*k).toFixed(1)}" r="${((22+20*rnd(i,4.4))*ku*(.5+k)).toFixed(1)}" fill="#d9c9a8" stroke="${INK}" stroke-width="${(3*ku).toFixed(1)}" opacity="${(.8*(1-k)).toFixed(2)}"/>`}return s};
const SPEEDG=(a,cx=540,cy=1000)=>{if(a<=0)return'';let s='';for(let i=0;i<34;i++){const an=rnd(i,9.1)*6.283,ph=(GT*3.4+rnd(i,4.2))%1,r1=480+rnd(i,7.7)*160+ph*80,L=140+rnd(i,2.2)*220;s+=`<line x1="${(cx+cs(an)*r1).toFixed(1)}" y1="${(cy+sn(an)*r1*1.5).toFixed(1)}" x2="${(cx+cs(an)*(r1+L)).toFixed(1)}" y2="${(cy+sn(an)*(r1+L)*1.5).toFixed(1)}" stroke="${i%3?GOLD2:'#fff'}" stroke-width="${(5+rnd(i,6)*7).toFixed(1)}" stroke-linecap="round" opacity="${(a*(.4+.5*rnd(i,1.1))).toFixed(2)}"/>`}return s};
// pisca entre a forma antiga e a nova antes de firmar (estilo anime)
const flick=(t0,dur=.9,rate=10)=>GT>=t0?true:GT<t0-dur?false:rnd(Math.floor(GT*rate),5.3)<cl((GT-t0+dur)/dur)*.85;
const GLIT={amb:[1.05,.95,.8],rim:[255,220,120],d:[0,-1],sh:.3,ri:1};
// ===== 9) raiva: energia jamais vista =====
const tRai=wt(12,'raiva',.2),tLib=wt(13,'liberar',.2),tJam=wt(13,'jamais',.2);
shot('twn3',ps(12)-.15,(t,u)=>{
 const rg=cl((GT-tRai)/2.4),scr=GT>tLib,flk=rnd(Math.floor(GT*18),3.7)<rg*.7,k=flk&&scr?'CSS':'CIB';
 put(k,0,0,3.6,{sc:2.5,m:scr?'talka':'angry',mry:scr?16+4*sn(GT*30):undefined,mrx:18,aR:-25-20*rg,aL:25+20*rg,brow:10,rot:3*rg*sn(GT*40),tilt:2*sn(GT*33),nobob:1,sq:SQ(tLib,1.1)});
 const p=C[k].sp,c0=chestP(k),ku=p[2];goldAura(k,rg*(flk?1:.45));PILLAR(k,scr?(flk?.55:.18)*rg:0,.8);
 fw(CRACKS(p[0],p[1],ku,ob(GT,tLib-.1,.6))+DUST(p[0],p[1],tLib,ku)+ROCKS(c0[0],c0[1]+120*ku,300*ku,GT,rg)+BOLTS(c0[0],c0[1],180*ku,GT,rg*rg));
 FX.pf=[[c0[0],c0[1]+100*ku,320*ku,30,'255,220,120',rg,'rise']];
 let ui=scr?SPEEDG(.45*rg):'';if(GT>tRai)ui+=TXT('RAIVA',540,310,150,'#ff4d6d',-4,pop(GT,tRai)*(1+.05*sn(GT*20)));if(GT>tJam)ui+=TXT('ENERGIA JAMAIS VISTA',540,430,62,GOLD2,-3,pop(GT,tJam));
 const e=eyeP(k),F=foc(e[0],e[1]+140*ku,.55),Fw=foc(p[0],p[1]-170*ku,.12);camA([[ps(12)-.15,.15,F[0]*.3,F[1]*.3,0],[tLib-.05,.45,F[0]*.8,F[1]*.8,-2],[tLib,.14,Fw[0],Fw[1],0,'c'],[tJam,.3,F[0]*.6,F[1]*.6,1],[ps(14),.6,F[0],F[1],2]]);
 FX.ui=ui;FX.lit={...LIT.twn3,rim:flk?[255,220,120]:[255,90,90],ri:1};FX.vig=.85;FX.shake=2+12*rg+14*sh1(GT,[tLib],5);FX.chroma=6*rg;FX.tint=[255,40,40,.06*rg];FX.flash=Math.max(flk&&scr?.12:0,.4*sh1(GT,[tLib],9));FX.flcol='255,230,150'},'zoom');
// ===== 10) cabelo dourado (pisca ate firmar) =====
const tDou=wt(14,'dourado',.0);
shot('twn3',ps(14)-.25,(t,u)=>{
 const on=flick(tDou,1.0,11),k=on?'CSH':'CIB',fl=on&&GT<tDou;
 put(k,0,0,3.6,{sc:2.5,m:'angry',brow:9,aR:-40,aL:40,nobob:1,sq:SQ(tDou,1.4),tilt:fl?4*sn(GT*40):0});goldAura(k,GT>tDou?1:on?.7:.35);PILLAR(k,GT>tDou?.75:on?.45:.08,1);
 const p=C[k].sp,ku=p[2],hd=[p[0],p[1]-330*ku],q=zpS(hd[0],hd[1]);fw(BOLTS(hd[0],hd[1],140*ku,GT,1));
 if(GT>tDou)FX.pf=[[hd[0],hd[1],240*ku,30,'255,230,140',1,'rise']];
 let ui=GT>tDou?SPEEDG(.5*(1-cl((GT-tDou)/1.2))+.15,q[0],q[1]):'';if(GT>tDou)ui+=TXT('DOURADO',540,330,150,GOLD,-3,pop(GT,tDou))+RAYS(GT,tDou,q[0],q[1],.5,20,GOLD2);
 const F=foc(hd[0],hd[1]+60*ku,.9);camA([[ps(14)-.25,.85,F[0],F[1]+80,-2],[tDou,.95,F[0],F[1],1,'c'],[ps(15),1.0,F[0],F[1],0]]);
 FX.ui=ui;FX.lit=on?GLIT:LIT.twn3;FX.shake=(fl?6:0)+16*sh1(GT,[tDou],5);FX.flash=Math.max(fl?.22:0,.7*sh1(GT,[tDou],8));FX.flcol='255,235,160';FX.chroma=(fl?3:0)+6*sh1(GT,[tDou],4)},'flashO');
// ===== 11) olhos mudam (cabelo ja dourado) =====
const tOlh=wt(15,'mudariam',.0);
shot('twn3',ps(15)-.15,(t,u)=>{
 const on=flick(tOlh,.6,12),k=on?'CSS':'CSH';put(k,0,0,3.6,{sc:2.5,m:'focus',brow:6,look:[0,0],nobob:1,still:1,noblink:1});
 const e=eyeP(k),ku=C[k].sp[2],q=zpE(e);if(on)(FX.gls=FX.gls||[]).push([e[0]-25*ku,e[1],40*ku,'60,240,200',GT>tOlh?.5:.3],[e[0]+25*ku,e[1],40*ku,'60,240,200',GT>tOlh?.5:.3]);
 let ui='';if(GT>tOlh)ui+=TXT('OS OLHOS MUDAM',540,320,96,'#3ff0c8',-3,pop(GT,tOlh))+SCAN(q[0],q[1],tOlh,.8,900,'#3ff0c8');
 const F=foc(e[0],e[1],1.6);camA([[ps(15)-.15,1.55,F[0],F[1],0],[ps(16),1.7,F[0],F[1],0]]);
 FX.ui=ui;FX.lit=GLIT;FX.flash=Math.max(on&&GT<tOlh?.2:0,.5*sh1(GT,[tOlh],10));FX.flcol='170,255,230';FX.shake=6*sh1(GT,[tOlh],6)},'zoom');
// ===== 12) a aura gigantesca explode =====
const tAur=wt(16,'aura',.2),tExp=wt(16,'explodiria',.3);
shot('twn3',ps(16)-.2,(t,u)=>{
 const ex=ob(GT,tExp-.1,.4),pre=cl((GT-ps(16))/(tExp-ps(16)));put('CSS',0,0,3.4,{sc:2.4,m:GT<tExp-.1?'angry':'talka',mry:GT>tExp-.1&&GT<tExp+1.2?18:undefined,mrx:18,brow:9,aR:-150*ex-20*(1-ex),aL:150*ex+20*(1-ex),sq:SQ(tExp,1.5),nobob:1,rot:GT<tExp?2*pre*sn(GT*45):0});
 const p=C.CSS.sp,c0=chestP('CSS'),ku=p[2];goldAura('CSS',.6+.4*ex,1.2+1.8*ex);PILLAR('CSS',.3*pre+1.1*ex,1+1.6*ex);
 fw(CRACKS(p[0],p[1],ku,.3+.7*ex)+DUST(p[0],p[1],tExp,ku,1.3)+BOLTS(c0[0],c0[1],220*ku,GT,1,GOLD2,7)+ROCKS(c0[0],c0[1]+150*ku,420*ku,GT,ex)+RIP(c0[0],c0[1],tExp,.8,1400,'#fff3a0')+RIP(c0[0],c0[1],tExp+.15,.8,1100,GOLD));
 FX.warp=GT>tExp?[c0[0],c0[1],lp(200,1600,cl((GT-tExp)/.9)),90*(1-cl((GT-tExp)/.9))]:null;
 FX.pf=[[c0[0],c0[1],500*ku,40,'255,220,120',.3+.7*ex,'rise']];FX.rays=[[c0[0],c0[1],.15*pre+.5*ex,'255,200,90',18,1800]];
 let ui=SPEEDG(GT>tExp?.6*(1-cl((GT-tExp)/1.6))+.12:.2*pre);if(GT>tAur)ui+=TXT('AURA GIGANTESCA',540,320,98,GOLD,-3,pop(GT,tAur));
 const e=eyeP('CSS'),F=foc(e[0],e[1]+100*ku,.5);camA([[ps(16)-.2,.3,F[0]*.6,F[1]*.6,-2],[tExp-.1,.55,F[0],F[1],0],[tExp,.0,0,0,0,'c'],[ps(17),.08,0,-30,2]]);
 FX.ui=ui;FX.lit={amb:[1.1,.98,.8],rim:[255,225,130],d:[0,-1],sh:.25,ri:1};FX.shake=4+6*pre+22*sh1(GT,[tExp],3);FX.flash=.85*sh1(GT,[tExp],6);FX.flcol='255,240,190';FX.chroma=8*sh1(GT,[tExp],3)},'wu');
// ===== 13) o lendario Super Saiyajin =====
const tLen=wt(17,'lendário',.2),tSup=wt(17,'Super',.0);
shot('twn3',ps(17)-.2,(t,u)=>{
 put('CSS',0,0,4.8,{sc:2.3,m:'cool',brow:5,aR:-14,aL:14,look:[0,-2]});const c0=chestP('CSS'),ku=C.CSS.sp[2];goldAura('CSS',1,1.5);fw(BOLTS(c0[0],c0[1],200*ku,GT,.9));
 FX.pf=[[c0[0],c0[1],420*ku,36,'255,220,120',1,'rise']];FX.rays=[[c0[0],c0[1]-100*ku,.4,'255,200,90',16,1600]];
 let ui='';if(GT>tLen)ui+=TXT('O LENDÁRIO',540,245,70,'#fff',-3,pop(GT,tLen));if(GT>tSup)ui+=TXT('SUPER',540,355,130,GOLD,-3,pop(GT,tSup))+TXT('SAIYAJIN',540,470,112,GOLD,-3,pop(GT,tSup+.2)*(1+.02*sn(GT*6)))+RAYS(GT,tSup,540,380,.5,22,GOLD2);
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
// ===== 15a) batalhas cada vez mais dificeis: jab, defesa, choque de punhos e golpe final =====
const tBat=wt(19,'batalhas',.2),tDif2=wt(19,'difíceis',.2);
shot('twn3',ps(19)-.15,(t,u)=>{
 const E=ps(20)-.15,h0=tBat,h1=tBat+.6,h2=Math.min(tDif2,E-.8),h3=Math.min(h2+.42,E-.3),CH=[h0,h2,h3],RH=[h1,h2],ALL=[h0,h1,h2,h3];
 const cA=pick(CH.map(PUNCH)),rA=pick(RH.map(PUNCH)),grd=GT>h1-.2&&GT<h1+.4,kb=RECH(h3);
 const cx=-.85+.32*Math.max(0,cA)-.28*REC(h1)-.18*REC(h2),rx=1.6-.32*Math.max(0,rA)+.4*REC(h0)+.18*REC(h2)+1.5*kb;
 const scr=GT>h3-.1&&GT<h3+.5;
 put('CSS',cx,0,3.2,{sc:2.3,m:scr?'talka':grd?'strain':'angry',mry:scr?17:undefined,mrx:18,brow:9,aR:grd?-150:lp(-20,-95,cA),aL:grd?150:20,tilt:5*Math.max(0,cA)-6*REC(h1),sq:SQ(GT<h1?h0:GT<h2?h1:GT<h3?h2:h3,.9),hf:inHit([h1],.07)});goldAura('CSS',.85,1.2);
 const rHit=GT>h0&&GT<h0+.6||GT>h3;
 put('RIV',rx,0,3.2,{sc:2.3,flip:-1,m:rHit?'shock':'angry',brow:9,aR:lp(-20,-95,rA),aL:rHit?-60:20,tilt:rHit?-12*REC(h0)-18*kb:5*Math.max(0,rA),rot:-30*kb,sq:SQ(GT<h1?h0:GT<h2?h1:GT<h3?h2:h3,1),hf:inHit([h0,h3],.08),look:rHit?[6,-6]:[-6,0]});darkAura('RIV',.7*(1-.5*kb),1.15);
 const cs_=C.CSS.sp,rs=C.RIV.sp,ku=cs_[2],cc=chestP('CSS'),rc=chestP('RIV'),mid=[(cc[0]+rc[0])/2,cc[1]-40*ku],rf=eyeP('RIV');let s='';
 if(smearOn(CH))s+=SMEAR(armPos('CSS',lp(-20,-95,cA),1),GOLD2);if(smearOn(RH))s+=SMEAR(armPos('RIV',lp(-20,-95,rA),1,-1),'#d9a8ff');
 s+=STARB(rf[0]-20*ku,rf[1]+20*ku,h0,ku*.8)+SPARKS(rf[0],rf[1],h0,ku);
 s+=STARB(cc[0]+60*ku,cc[1]-60*ku,h1,ku*.7,'#d9a8ff')+SPARKS(cc[0]+60*ku,cc[1]-60*ku,h1,ku,'#e8c8ff');
 s+=STARB(mid[0],mid[1],h2,ku*1.5,'#fff3a0',.4)+RIP(mid[0],mid[1],h2,.6,700*ku,'#fff')+RIP(mid[0],mid[1],h2+.1,.6,500*ku,GOLD)+SPARKS(mid[0],mid[1],h2,ku*1.4)+DUST(mid[0],cs_[1],h2,ku)+CRACKS(mid[0],cs_[1],ku,ob(GT,h2,.4)*(1-cl((GT-h2-1.5)/.5)));
 s+=STARB(rc[0],rc[1],h3,ku*1.2,GOLD2,.4)+SPARKS(rc[0],rc[1],h3,ku*1.3)+DUST(rs[0],rs[1],h3+.15,ku,.9);
 if(kb>0&&kb<1){for(let i=0;i<4;i++)s+=`<line x1="${(rs[0]-(60+i*40)*ku).toFixed(1)}" y1="${(rs[1]-(80+i*60)*ku).toFixed(1)}" x2="${(rs[0]-(260+i*40)*ku).toFixed(1)}" y2="${(rs[1]-(80+i*60)*ku).toFixed(1)}" stroke="#fff" stroke-width="${(8*ku).toFixed(1)}" stroke-linecap="round" opacity="${(.7*(1-kb)).toFixed(2)}"/>`}
 fw(s);
 let ui='';if(GT>tBat)ui+=TXT('BATALHAS',540,310,110,'#fff',-3,pop(GT,tBat));if(GT>tDif2)ui+=TXT('CADA VEZ MAIS DIFÍCEIS',540,425,60,'#ff6b6b',-3,pop(GT,tDif2));
 const tr=Math.max(.5*sh1(GT,[h0,h1],6),sh1(GT,[h2,h3],5));
 const Fm=foc(mid[0],mid[1]+80*ku,.2),Fc=foc(mid[0],mid[1],.34),Fk=foc(rs[0]-140*ku,rs[1]-200*ku,.2);camA([[ps(19)-.15,.16,Fm[0],Fm[1],-2],[h2-.05,.22,Fm[0],Fm[1],0],[h2,.34,Fc[0],Fc[1],0,'c'],[h3-.05,.3,Fc[0],Fc[1],0],[h3+.1,.18,Fk[0],Fk[1],0,'c'],[ps(20),.14,Fk[0],Fk[1],3]]);
 FX.cz+=.08*sh1(GT,ALL,8);FX.roll+=6*(sh1(GT,[h0,h3],6)-sh1(GT,[h1],6));
 FX.ui=ui;FX.lit={amb:[1,.92,.85],rim:[255,225,130],d:[1,-.6],sh:.3,ri:1};FX.shake=3+38*tr*tr;FX.flash=Math.max(.35*sh1(GT,[h0,h1],12),.75*sh1(GT,[h2,h3],9));FX.flcol='255,250,230';FX.chroma=6*sh1(GT,[h2,h3],5);
 FX.impact=GT>=h2&&GT<h2+.045||GT>=h3&&GT<h3+.045;if(FX.impact)FX.flash=0},'zoom');
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
 const x0=-.2+off*.0;const side=atk.reduce((s,h,i)=>GT>h-.08?(i%2?-1:1):s,0);const xC=-.7+side*.5;
 put('CUI',xC,0,3.4,{sc:2.3,m:'calm',aR:-12,aL:12,look:[0,0],still:1,tilt:-side*4});silvAura('CUI',.7,1.1);
 // imagens residuais onde ele estava
 atk.forEach((h,i)=>{const d=GT-h;if(d>0&&d<.5){const g=i%2?'G1':'G2',sd=i?(i-1)%2?-1:1:0;put(g,-.7+sd*.5,0,3.4,{sc:2.3,m:'calm',still:1,op:(.45*(1-d/.5)).toFixed(2)})}});
 const mp=P3(2.2,0,1.6,1.25),pc=C.CUI.sp,ku=pc[2];const lastA=atk.filter(h=>GT>h-.25).pop()||atk[0],ap=cl((GT-lastA+.25)/.25),tg=[pc[0]-side*0+(GT<lastA?0:0),pc[1]-200*ku];
 const pu=pick(atk.map(h=>PUNCH(h-.04))),pr=Math.max(0,pu);put('RIV',lp(2.0,1.1,pr),0,3.4,{sc:2.3,flip:-1,m:pr>.5?'talka':'angry',mry:pr>.5?12:undefined,brow:9,aR:lp(15,-95,pu),aL:20,tilt:6*pu,sq:{sx:1+.06*pr,sy:1-.05*pr}});darkAura('RIV',.6,1.1);
 {let s='';if(smearOn(atk.map(h=>h-.04)))s+=SMEAR(armPos('RIV',lp(15,-95,pu),1,-1),'#d9a8ff');const A=armPos('RIV',-95,1,-1),ku2=C.RIV.sp[2];atk.forEach(h=>{const d=GT-h;if(d>0&&d<.35){const k=d/.35;for(let i=-1;i<=1;i++)s+=`<line x1="${(A.f[0]-(40+520*k)*ku2).toFixed(1)}" y1="${(A.f[1]+i*34*ku2).toFixed(1)}" x2="${(A.f[0]-(200+620*k)*ku2).toFixed(1)}" y2="${(A.f[1]+i*34*ku2).toFixed(1)}" stroke="#e9dcff" stroke-width="${(9*ku2*(1-k)).toFixed(1)}" stroke-linecap="round" opacity="${(1-k).toFixed(2)}"/>`}});fw(s)}
 let s='';atk.forEach(h=>s+=RIP(P3(-.7,0,3.4)[0],pc[1]-200*ku,h,.35,200,SILV));fw(s);
 let ui='';if(GT>tSoz)ui+=TXT('REAGE SOZINHO',540,320,96,SILV,-3,pop(GT,tSoz));if(GT>tQua)ui+=TXT('QUASE IMPOSSÍVEL',540,440,62,'#fff',-3,pop(GT,tQua));
 camA([[ps(22)-.2,.12,-60,-40,-1],[ps(23),.2,-60,-60,1]]);
 FX.ui=ui;FX.lit={amb:[.92,.96,1.1],rim:[220,232,255],d:[1,-.6],sh:.3,ri:1};FX.shake=5*atk.reduce((m,h)=>Math.max(m,Math.exp(-((GT-h)**2)/.004)),0);FX.vig=.7},'flash');
// ===== 18) uma verdade que poucos entendem =====
const tVer=wt(23,'verdade',.2),tPou=wt(23,'poucos',.2);
shot('road',ps(23)-.25,(t,u)=>{
 put('CIB',0,0,4.6,{sc:2.3,m:'calm',aR:-14,aL:14,look:[0,-3],brr:1});
 let ui='';if(GT>tVer)ui+=TXT('UMA VERDADE',540,320,108,'#fff',-3,pop(GT,tVer));if(GT>tPou)ui+=TXT('QUE POUCOS ENTENDEM',540,435,60,GOLD2,-3,pop(GT,tPou));
 const e=eyeP('CIB'),ku=C.CIB.sp[2],F=foc(e[0],e[1]+200*ku,.3);camA([[ps(23)-.25,.0,0,-260,-1],[ps(24),.3,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=LIT.road;FX.vig=.55;FX.rays=[[560,560,.35,'255,200,140',16,1700]]},'dip');
// ===== 19) nao sao extraordinarios porque nunca sao derrotados (ele cai) =====
const tNun=wt(24,'nunca',.1),tDrr=wt(24,'derrotados',.2);
shot('road',ps(24)-.2,(t,u)=>{
 const fall=ob(GT,tDrr-.25,.6);put('CIB',lp(0,-2,fall),0,lp(4.6,2.6,fall),{sc:2.3,m:GT<tDrr-.25?'worry':'sad',rot:lp(0,84,fall),aR:-30,aL:30,nobob:1,brow:4,extra:SWEAT(-80,-300,.7)});
 const p=C.CIB.sp,q=zpS(p[0],p[1]);let ui='';if(GT>tNun)ui+=TXT('NUNCA DERROTADOS?',540,320,92,'#fff',-3,pop(GT,tNun));
 ui+=RIP(q[0],q[1],tDrr+.3,.6,500,'#e8ddd0');
 const rr=lp(0,84,fall)*Math.PI/180,Fl=foc(p[0]+150*p[2]*sn(rr),p[1]-150*p[2]*cs(rr),.3);camA([[ps(24)-.2,.2,0,-100,0],[tDrr-.2,.25,0,-80,0],[tDrr+.4,.3,Fl[0],Fl[1],-4],[ps(25),.34,Fl[0],Fl[1],-4]]);
 FX.ui=ui;FX.lit=LIT.road;FX.vig=.65;FX.shake=12*sh1(GT,[tDrr+.3],5);FX.grade='contrast(1.05) saturate(.75)'},'wr');
// ===== 20) mesmo depois de cair, sempre se tornam mais fortes =====
const tCai=wt(25,'cair',.2),tSem=wt(26,'sempre',.1),tMfo=wt(26,'fortes',.0),tEnd=pe(26)+.35;
shot('road',ps(25)-.2,(t,u)=>{
 const up=ob(GT,tCai+.2,.8),gold=ob(GT,tMfo-.15,.4),k=GT>tMfo-.15?'CSS':'CIB';
 put(k,lp(-2,0,up),0,lp(2.6,4.6,up),{sc:2.6,m:GT<tCai+.2?'sad':GT<tMfo?'focus':'grin',rot:lp(84,0,up),aR:lp(-30,-20,up),aL:lp(30,20,up),nobob:up<1,brow:6,sq:SQ(tMfo,1.3)});
 const c0=chestP(k),ku=C[k].sp[2];if(k=='CSS'){goldAura(k,gold,1.3);fw(BOLTS(c0[0],c0[1],180*ku,GT,gold));FX.pf=[[c0[0],c0[1],380*ku,36,'255,220,120',gold,'rise']]}
 FX.rays=[[560,560,.3+.4*gold,'255,210,130',18,1800]];
 let ui='';if(GT>tCai&&GT<tEnd)ui+=TXT('MESMO DEPOIS DE CAIR...',540,320,70,'#fff',-3,pop(GT,tCai));if(GT>tMfo&&GT<tEnd)ui+=TXT('MAIS FORTES',540,440,124,GOLD,-3,pop(GT,tMfo)*(1+.03*sn(GT*7)));
 if(GT>tEnd){ui+=TXT('E VOCÊ?',540,300,110,'#fff',-3,pop(GT,tEnd))+TXT('CAIRIA OU LEVANTARIA?',540,420,74,GOLD,-3,pop(GT,tEnd+.15))}
 const pp=C[k].sp,rr=lp(84,0,up)*Math.PI/180,Fl=foc(pp[0]+150*pp[2]*sn(rr),pp[1]-150*pp[2]*cs(rr),.3),F=foc(c0[0],c0[1]-60*ku,.3);camA([[ps(25)-.2,.34,Fl[0],Fl[1],-4],[tCai+.2,.3,Fl[0],Fl[1],-2],[tCai+.9,.25,F[0]*.6,F[1]*.6,0],[tMfo-.1,.32,F[0],F[1],0],[tMfo,.1,0,-40,0,'c'],[OLDT,.2,0,-60,1]]);
 FX.ui=ui;FX.lit=k=='CSS'?{amb:[1.1,.98,.82],rim:[255,220,120],d:[0,-1],sh:.3,ri:1}:LIT.road;FX.shake=14*sh1(GT,[tMfo],5);FX.flash=.6*sh1(GT,[tMfo],8);FX.flcol='255,240,190'},'');

// ===== 17) ENCERRAMENTO: like + inscreva-se (Cibito precisa da sua ajuda) =====
if(PH.length>26){
const T0=OLDT,tLock=wt(27,'desbloquear',.3),tPod=wt(27,'poder',.2),tMas=wt(28,'mas',.1),tAju=wt(28,'ajuda',.0),tLik=wt(29,'like',.0),tPress=wt(29,'like',.9)+.05,
 tIns=wt(29,'inscreva',.0),tCan=wt(29,'canal',.3),tFor2=wt(29,'força',.0),tCur=wt(30,'curtida',.0),tTra=wt(30,'transformação',.35),tSer=wt(31,'será',.0),tEndO=pe(31)+.25;
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
 const kk=GT<tTra?'CIB':GT<tSer?'CSS':(rnd(Math.floor(GT*9),4.7)<.55?'CSS':'CIB'),px=[380,1560+jy];
 put(kk,0,0,0,{px,ku:2.1,top:1,m,hold,aR,aL,tilt,brow,look,nodrift:1,bob:1.5,brr:3,sq:GT<T0+.8?SQ(T0+.45,1.3):pressA?SQ(tPress,.6):flex?SQ(tFor2,1):SQ(tTra,1.2)});
 goldAura(kk,(kk=='CSS'?.6:.25)+.35*(flex?1:0)+.4*tr,1.1+.5*tr);if(kk=='CSS'||flex){const cc=chestP(kk),uk=C[kk].sp[2];fw(BOLTS(cc[0],cc[1],170*uk,GT,kk=='CSS'?.9:.5))}
 const p=C[kk].sp,ku=p[2],c0=chestP(kk),e=eyeP(kk);
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
 if(GT>tLock-.1&&GT<tMas)ui+=TXT('NOVO PODER',540,330,120,'#ffd23f',-3,pop(GT,tPod-.05))+(GT>wt(27,'animação',0)?TXT('DESBLOQUEANDO...',540,440,58,CY2,-3,pop(GT,wt(27,'animação',0))):'');
 if(GT>tAju-.05&&GT<tLik-.2)ui+=TXT('PRECISO DA',540,290,72,'#fff',-4,pop(GT,tAju-.05))+TXT('SUA AJUDA!',540,410,136,CY,-4,pop(GT,tAju+.08)*(1+.03*sn(GT*8)));
 if(GT>tLik-.15&&GT<tIns-.1)ui+=TXT('DEIXE O LIKE!',540,330,118,'#5fd0ff',-3,pop(GT,tLik-.15));
 if(GT>tFor2-.05&&GT<tCur-.2)ui+=TXT('MOSTRE SUA',540,290,72,'#fff',-3,pop(GT,tFor2-.05))+TXT('FORÇA!',540,420,160,'#ffd23f',-3,pop(GT,tFor2+.1)*(1+.04*sn(GT*10)))+RAYS(GT,tFor2+.1,540,400,.45,18,'#ffe27a');
 if(GT>tTra-.05&&GT<tSer)ui+=TXT('TRANSFORMAÇÃO',540,330,104,GOLD,-3,pop(GT,tTra));
 if(ser&&GT<tEndO+.2)ui+=TXT('SERÁ QUE ELE',540,300,76,'#fff',-3,pop(GT,tSer))+TXT('VAI CONSEGUIR?',540,410,92,'#ffd23f',-3,pop(GT,wt(31,'conseguir',0)));
 // final elegante: iris se fechando no olho brilhante do Cibito
 const ir=ob(GT,tEndO,.7);if(GT>tEndO){const q=zpE(e),R=lp(1500,0,ez(cl((GT-tEndO)/.8)));ui+=`<path fill-rule="evenodd" d="M-10-10H1090V1930H-10ZM${(q[0]-R).toFixed(1)} ${q[1].toFixed(1)}a${R.toFixed(1)} ${R.toFixed(1)} 0 1 0 ${(2*R).toFixed(1)} 0a${R.toFixed(1)} ${R.toFixed(1)} 0 1 0 ${(-2*R).toFixed(1)} 0Z" fill="#02030c"/><circle cx="${q[0].toFixed(1)}" cy="${q[1].toFixed(1)}" r="${R.toFixed(1)}" fill="none" stroke="${GOLD}" stroke-width="${(10*(1-ir*.5)).toFixed(1)}"/>`+(R<200?EMB(q[0],q[1],90,GT,cl((200-R)/150)*(1-cl((GT-tEndO-.8)/.4)),GOLD):'')}
 FX.pf=[[c0[0],c0[1],420*ku/2.1,34,'255,220,120',.7+.3*tr,flex||tr>0?'rise':'orbit']];
 const F=foc(e[0],e[1]+120*ku,.4),Fp=foc(e[0],e[1],.85),Fw=foc(640,1100,.08);
 camA([[T0,.45,F[0],F[1],-3],[T0+.6,.22,F[0]*.6,F[1]*.6,1],[tMas,.25,F[0]*.6,F[1]*.6,0],[tAju-.1,.3,F[0]*.7,F[1]*.7,0],[tAju,.48,F[0],F[1],-2,'c'],[tLik-.25,.5,F[0],F[1],0],[tLik-.15,.06,Fw[0],Fw[1],0,'c'],[tFor2-.1,.06,Fw[0],Fw[1],1],[tFor2,.3,F[0]*.8,F[1]*.8,-2,'c'],[tCur,.12,0,0,0],[tTra,.35,F[0],F[1],0,'c'],[tSer,.4,F[0],F[1],0],[tEndO+.6,.85,Fp[0],Fp[1],0]]);
 FX.ui=ui;FX.lit=kk=='CSS'?{amb:[1.05,.95,.82],rim:[255,225,130],d:[0,-1],sh:.3,ri:1}:LIT.twn3;FX.vig=.55;FX.shake=14*sh1(GT,[T0+.45],5)+6*sh1(GT,[tPress,tCan],8)+12*sh1(GT,[tFor2,tTra],5);
 FX.flash=Math.max(.9*cl(1-(GT-T0)/.35),.35*sh1(GT,[tPod,tPress],10),.6*sh1(GT,[tTra],7));FX.flcol=GT<T0+.4?'255,240,200':'255,235,170';FX.chroma=5*sh1(GT,[tFor2,tTra],4);
 if(GT>tCur)FX.rays=[[c0[0],c0[1]-60*ku,.25+.4*tr,'255,200,90',16,1500]]},'');
}
// ---------- REACOES DO CIBITO NAS PAUSAS DA NARRACAO (balao + "voz" de desenho) ----------
const RWORD={1:'EU?!',2:'HEHE!',3:'UAU!',4:'SÉRIO?!',5:'O QUÊ?',7:'ISSO!',8:'HMM...',9:'BORA!',10:'GULP!',11:'NÃO!',13:'GRRR!',14:'!!',15:'WOW!',16:'AAAAH!',17:'HEHE!',18:'MAIS!',20:'DEUSES?!',21:'SHHH...',22:'FÁCIL!',23:'HMM...',24:'AI!',27:'POR FAVOR!',28:'BORA!',29:'AAAH!',30:'QUASE!'};
const REACTS=[];for(let i=1;i<PH.length;i++){const g0=pe(i),g1=ps(i+1);if(RWORD[i]&&g1-g0>=.25)REACTS.push({i,w:RWORD[i],t0:g0+.03,t1:Math.max(g1,g0+.55)})}
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
 FR.forEach(c=>{if(c.hf){c.g.style.filter='brightness(2.6) saturate(.15)';return}if(c.sil){c.g.style.filter='brightness(0) drop-shadow(0 0 8px rgba(255,60,80,.7))';return}if(c.k=='C'||!CSH.plate||!c.sp){c.g.style.filter='';return}const k=cl((c.sp[2]>0?(.55-c.sp[2])/.45:0));c.g.style.filter=k>.02?`saturate(${(1-.45*k).toFixed(2)}) contrast(${(1-.25*k).toFixed(2)}) brightness(${(1-.08*k).toFixed(2)})`:''});
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
 const RCH=['CIB','CSS','CUI'].map(k=>CHS[k]).find(c=>FR.includes(c)&&c.sp&&+c.g.style.opacity>.5);if(REAC&&RCH){const p=RCH.sp,ku=p[2],q=zpS(p[0],p[1]-(RCH.sit?240:330)*ku),fl=q[0]>620,bx=Math.min(860,Math.max(220,q[0]+(fl?-200:200))),by=Math.min(1420,Math.max(560,q[1]-90)),fo=1-cl((gt-REAC.t1+.12)/.12);FX.ui=(FX.ui||'')+`<g opacity="${fo.toFixed(2)}">`+BUBBLE(bx,by,REAC.w,REAC.t0,!fl)+'</g>'}
 $('UI').innerHTML=FX.ui||'';$('UI').style.opacity=1-fd;$('st').style.filter=FX.impact?'grayscale(1) invert(1) contrast(2.4) brightness(1.05)':(FX.grade||'contrast(1.06) saturate(1.1)')};
