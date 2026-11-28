// =====================================================================
//  E SE VOCE DESPERTASSE OS PODERES DO JOTARO?  (2160x3840, 60 fps)
//  Mesmo motor de "Cibito e o Loop Temporal", "Seis Olhos" e "Saiyajin": personagens 2D
//  (lib.js) sobre cenarios 3D prontos (plates/). Tempos vem de roteiro.js (frases e palavras
//  reais do audio). Coordenadas da cena em 1080x1920; o quadro sai em 2x (deviceScaleFactor 2).
// =====================================================================
const W=1080,H=1920,$=id=>document.getElementById(id),sn=Math.sin,cs=Math.cos,ab=Math.abs;
const cl=x=>x<0?0:x>1?1:x,ez=x=>{x=cl(x);return x*x*(3-2*x)},lp=(a,b,x)=>a+(b-a)*x;
const OFF=ENVOFF;
const PH=PHR.map(p=>p[0]),PT=PHR.map(p=>[p[1],p[2]]);
const ps=i=>PT[i-1][0]+OFF,pe=i=>PT[i-1][1]+OFF;
const nrm=x=>x.toLowerCase().replace(/[^a-zà-ú0-9]/g,'');
const wt=(i,w,f=.5)=>{const q=nrm(w.split(' ')[0]);if(typeof PWD!='undefined'&&PWD&&PWD[i-1]){const x=PWD[i-1].find(z=>nrm(z[0]).startsWith(q));if(x)return x[1]+(x[2]-x[1])*f+OFF}const s=PH[i-1].toLowerCase(),p=Math.max(0,s.indexOf(w.toLowerCase()));return ps(i)+(pe(i)-ps(i))*(p+w.length*f)/s.length};
const TOTAL=Math.round((pe(PH.length)+2.6)*60)/60;window.TOTAL=TOTAL;window.PHRASES=PH.map((t,i)=>[t,ps(i+1),pe(i+1)]);
// energia da voz por quadro (pulsa o brilho dos olhos com a narracao)
const vox=t=>ENV[Math.floor((t-OFF)*24)]||0;
const mouthAt=(k,t)=>({o:0,w:0,on:0});
const EMP=[];const emph=t=>EMP.reduce((mx,h)=>Math.max(mx,Math.exp(-((t-h)**2)/.05)),0);
const ST=(sz)=>`stroke="${INK}" stroke-width="${sz*.16}" paint-order="stroke" stroke-linejoin="round"`;
const TXT=(s,x,y,sz,c,rot=0,sc=1,fw=900,op=1)=>`<text x="0" y="0" transform="translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) rotate(${rot}) scale(${(+sc).toFixed(3)})" font-size="${sz}" text-anchor="middle" fill="${c}" ${ST(sz)} font-family="Poppins,Arial Black,sans-serif" font-weight="${fw}" opacity="${op}">${s}</text>`;
const S4=S.replace('"7"','"4"');
// expressoes extras (mesmo desenho, so combinacoes novas de palpebra/sobrancelha/boca)
Object.assign(M,{closed:{lid:.97,br:'f',mo:'l'},strain:{lid:.12,br:'a',mo:'f'},focus:{lid:0,br:'a',mo:'l'},calm:{lid:0,br:'f',mo:'s2'},wow:{lid:0,br:'u',mo:'o'}});
// ---- personagens e efeitos base ----
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
const RS=window.RS||2,PDIR=window.PDIR||'plates';for(const cv of [$('BG'),$('O')]){cv.width=W*RS;cv.height=H*RS}oc.setTransform(RS,0,0,RS,0,0);bg.setTransform(RS,0,0,RS,0,0);
const mkg=()=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML='<g class="bk"></g><g class="in"></g><g class="ex"></g>';cw.appendChild(g);return{g,bk:g.children[0],in:g.children[1],ex:g.children[2],key:''}};
for(const k in CHD)CHS[k]={...mkg(),d:CHD[k],id:CHD[k].id};['C','C2','C3','C4','C5','C6','C7','C8','S1','S2','S3','S4'].forEach(k=>CHS[k]={...mkg(),d:null,id:99});
const PLS={bed:1.2,hot:1.2,liv:1.2,kit:1.1,str:1.25,prc:1.35,prcW:1.35},PLC={};let CSH=null,GT=0,FR=[],FX={},CU=0,SHD=[];
const getPl=k=>{if(!PLC[k]){const c=PLATES[k].cam,VP=mul(persp(c.fov,W/H,.1,90),look(c.eye,c.tg));PLC[k]={VP,tf:Math.tan(c.fov/2),cam:c}}return PLC[k]};
function put(k,x,y,z,o={}){const C=CHS[k],P=CSH.pl,t=GT,id=C.id,p=o.px?[o.px[0],o.px[1],1]:pj(P.VP,x,y,z),ku=o.ku||.0046*(H/2)/(P.tf*p[2])*(o.sc||1)*(PLS[CSH.plate]||1),lm=mouthAt(k,t),spk=lm.on;
 let mood=o.m||'happy';if(spk&&o.mt)mood=o.mt;const rx=['CIB','CJ'].includes(k)&&REAC&&GT<REAC.t1-.12;if(rx){mood=['shock','scared','worry','sad','sleepy','blank','strain'].includes(mood)?'talkd':['angry','focus'].includes(mood)?'talka':'talk';o={...o,talk:.9,mry:undefined}}const six=o.six!=null,bl=o.blind!=null;const key=[mood,o.fr||'',o.pd?o.pd.join():'',o.hat===0?0:1,six?1:0,bl?1:0,o.hold?o.hold.length:0].join('|');
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
 C.ex.innerHTML=o.extra||'';C.bk.innerHTML=o.back||'';
 const bob=o.bobv!=null?o.bobv:(o.nobob||o.still?0:sn(t*3.2+id)*2*(o.bob||1));
 C.g.setAttribute('transform',`translate(${(p[0]+(o.nodrift||o.still?0:6*sn(t*.8+id*2))).toFixed(1)} ${(p[1]+bob).toFixed(1)}) scale(${(ku*(o.flip||1)*(o.sx||1)*(o.sq?o.sq.sx:1)*(1+.03*em)).toFixed(4)} ${(ku*(o.sy||1)*(o.sq?o.sq.sy:1)*(1-.025*em)).toFixed(4)}) rotate(${o.rot!=null?o.rot:(o.still?0:1.3*sn(t*.9+id))}) ${o.sit?'translate(0 90)':''}`);
 C.g.style.display='';C.g.style.opacity=o.op??1;C.z=o.zz??p[2];C.top=o.top;C.k=k;C.sil=o.sil;C.hf=o.hf;C.frz=o.frz||0;C.nolit=o.nolit;C.sit=o.sit?1:0;C.sp=[p[0],p[1]+(o.sit?90*ku:0),ku];FR.push(C);if(o.shd||(!o.px&&!o.sit&&y<.4&&!o.noshd))SHD.push([p[0],p[1],ku])}
function sprite(svg,x,y,sc,z,sl='C',rot=0,op=1){const C=CHS[sl];C.in.innerHTML=svg;C.ex.innerHTML='';C.bk.innerHTML='';C.frz=0;C.nolit=1;C.hf=0;C.sil=0;C.sp=null;C.g.setAttribute('transform',`translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) scale(${(+sc).toFixed(4)}) rotate(${rot})`);C.g.style.display='';C.g.style.opacity=op;C.z=z;C.k='C';C.top=0;FR.push(C)}
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
  else if(type.startsWith('flash')){R.s=1+.08*e;R.fl=Math.min(.42,e*.6);R.col=type=='flashO'?'255,170,90':type=='flashR'?'255,40,60':type=='flashB'?'140,215,255':type=='flashP'?'190,110,255':'255,255,255';R.bx=R.by=e*5}
  else if(type=='dip'){R.fl=e*.92;R.col='3,4,18'}
  else if(type=='glitch'){R.vhs=Math.max(R.vhs,p);R.dx=(rnd(Math.floor(gt*40),3.1)-.5)*120*p;R.bx=p*30}};
 const ti=gt-sh.t0,dI=sh.tin=='dip'||sh.tin=='glitch'?.4:TDUR;if(sh.tin&&ti<dI)ap(sh.tin,1-ti/dI,'in');
 const dO=nx&&(nx.tin=='dip'||nx.tin=='glitch')?.4:TDUR;if(nx&&nx.tin&&gt>sh.t1-dO)ap(nx.tin,(gt-(sh.t1-dO))/dO,'out');return R};
// ---------- LUZ DOS PERSONAGENS 2D (integracao com o cenario 3D) ----------
const LIT={bed:{amb:[.62,.68,1],rim:[140,190,255],d:[-1,-.5],sh:.34,ri:.8},str:{amb:[.72,.72,1],rim:[160,170,255],d:[-1,-.8],sh:.42,ri:.85},
 twn:{amb:[1,.98,.95],rim:[255,235,190],d:[1,-.8],sh:.3,ri:.75},liv:{amb:[.95,.86,.92],rim:[255,180,220],d:[1,-.5],sh:.34,ri:.75},
 prcW:{amb:[.7,.74,1],rim:[150,180,255],d:[-1,-.7],sh:.42,ri:.85},twn3:{amb:[.68,.7,.98],rim:[160,170,255],d:[-1,-.8],sh:.45,ri:.85},
 hot:{amb:[.74,.62,.66],rim:[255,150,110],d:[-1,-.3],sh:.45,ri:.75},kit:{amb:[1,.94,.94],rim:[255,240,220],d:[-.4,-1],sh:.3,ri:.7},
 road:{amb:[1,.92,.86],rim:[255,180,100],d:[1,-.6],sh:.34,ri:.95},twn2:{amb:[1,.88,.82],rim:[255,175,95],d:[0,-1],sh:.36,ri:1},cos:{amb:[.86,.92,1.08],rim:[110,200,255],d:[0,-1],sh:.3,ri:1}};
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
<filter id="litT" color-interpolation-filters="sRGB"><feColorMatrix id="litTA" type="matrix" values="1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1 0"/></filter>
<filter id="mbx" x="-30%" y="-10%" width="160%" height="120%"><feGaussianBlur id="mbg" stdDeviation="0 0"/></filter>
<filter id="warp" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920" color-interpolation-filters="sRGB"><feFlood flood-color="rgb(128,128,128)" result="fl"/><feImage id="wimg" x="0" y="0" width="10" height="10" preserveAspectRatio="none" result="im"/><feMerge result="map"><feMergeNode in="fl"/><feMergeNode in="im"/></feMerge><feDisplacementMap id="wdm" in="SourceGraphic" in2="map" scale="0" xChannelSelector="R" yChannelSelector="G"/></filter>
<filter id="sonar" filterUnits="userSpaceOnUse" x="0" y="0" width="1080" height="1920" color-interpolation-filters="sRGB"><feComponentTransfer in="SourceGraphic" result="dk"><feFuncR id="sdR" type="linear" slope="1"/><feFuncG id="sdG" type="linear" slope="1"/><feFuncB id="sdB" type="linear" slope="1"/></feComponentTransfer><feConvolveMatrix in="SourceGraphic" order="3" kernelMatrix="-1 -1 -1 -1 8 -1 -1 -1 -1" preserveAlpha="true" result="ed"/><feColorMatrix id="scm" in="ed" type="matrix" values="0 0 0 0 0 .5 .5 .5 0 0 .9 .9 .9 0 0 0 0 0 1 0" result="edc"/><feMorphology in="edc" operator="dilate" radius="1.2" result="edd"/><feGaussianBlur in="edd" stdDeviation="1.4" result="edb"/><feBlend in="dk" in2="edb" mode="screen"/></filter></svg>`);
// mapa de deslocamento radial (lente que dobra o espaco)
{const n=256,cv=document.createElement('canvas');cv.width=cv.height=n;const c=cv.getContext('2d'),im=c.createImageData(n,n);
 for(let j=0;j<n;j++)for(let i=0;i<n;i++){const u=i/(n-1)*2-1,v=j/(n-1)*2-1,r=Math.hypot(u,v),k=(i+j*n)*4;let dx=0,dy=0;if(r<1&&r>1e-3){const a=Math.pow(sn(Math.PI*r),2)*(1-r*.3);dx=-u/r*a;dy=-v/r*a}
  im.data[k]=128+127*dx;im.data[k+1]=128+127*dy;im.data[k+2]=128;im.data[k+3]=255}
 c.putImageData(im,0,0);$('wimg').setAttribute('href',cv.toDataURL())}
let LITK='';const setLit=L=>{const k=JSON.stringify(L);if(k==LITK)return;LITK=k;const a=L.amb,n=Math.hypot(L.d[0],L.d[1])||1,dx=L.d[0]/n,dy=L.d[1]/n;
 $('litA').setAttribute('values',`${a[0]} 0 0 0 0 0 ${a[1]} 0 0 0 0 0 ${a[2]} 0 0 0 0 0 1 0`);$('litTA').setAttribute('values',`${a[0]} 0 0 0 0 0 ${a[1]} 0 0 0 0 0 ${a[2]} 0 0 0 0 0 1 0`);
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

// ---------- COMBATE (do projeto Saiyajin) ----------
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

// ---------- REACOES DO CIBITO NAS PAUSAS DA NARRACAO (balao + "voz" de desenho) ----------
let REACTS=[],REAC=null;window.REACTS=REACTS;
const BUBBLE=(x,y,txt,k,flip)=>{const w=Math.max(150,txt.length*34+70),h=104,s=pop(GT,k);return`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(s*(1+.03*sn(GT*14))).toFixed(3)})"><path d="M${-w/2} ${-h/2}H${w/2}Q${w/2+18} ${-h/2} ${w/2+18} 0Q${w/2+18} ${h/2} ${w/2} ${h/2}H${flip?-w/2+70:w/2-50}L${flip?-w/2+30:w/2-10} ${h/2+44}L${flip?-w/2+40:w/2-90} ${h/2}H${-w/2}Q${-w/2-18} ${h/2} ${-w/2-18} 0Q${-w/2-18} ${-h/2} ${-w/2} ${-h/2}Z" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><text y="18" font-size="54" text-anchor="middle" fill="${INK}" font-family="Poppins,DejaVu Sans,sans-serif" font-weight="900">${txt}</text></g>`};
// fecha a lista de planos e monta as reacoes (chamado no fim de main.js)
const finalize=RW=>{SH.forEach((s,i)=>{s.t1=i<SH.length-1?SH[i+1].t0:TOTAL+1});
 for(let i=1;i<PH.length;i++){const g0=pe(i),g1=ps(i+1);if(RW[i]&&g1-g0>=.25)REACTS.push({i,w:RW[i],t0:g0+.03,t1:Math.max(g1,g0+.55)})}};
// conversao cena -> tela (usa o transform real do quadro; atualizado em F)
let XF={s:1,dx:0,dy:0,cr:1,sr:0};
const zpS=(x,y)=>{const X=(x-540)*XF.s,Y=(y-1000)*XF.s;return[540+XF.dx+X*XF.cr-Y*XF.sr,1000+XF.dy+X*XF.sr+Y*XF.cr]};
const zpE=p=>zpS(p[0],p[1]);
// ---------- RENDER DE UM QUADRO ----------
const load=(im,src)=>new Promise(r=>{if(im.getAttribute('src')==src)return r();im.onload=()=>{im.dataset.ok=1;r()};im.onerror=()=>{im.dataset.ok='';r()};im.src=src});
const setOp=(id,a)=>{const e=$(id);if(a<=.002||!e.dataset.ok){e.style.display='none';return}e.style.display='block';e.style.opacity=Math.min(1,a).toFixed(3)};
let TONE=null;const LITM=new Map();
window.F=async gt=>{GT=gt;const sh=SH.find(s=>gt>=s.t0&&gt<s.t1)||SH[SH.length-1];
 if(sh!=CSH){CSH=sh;sh.pl=sh.plate?getPl(sh.plate):{VP:getPl('road').VP,tf:1,cam:{}};
  if(sh.plate){const P=`${PDIR}/${sh.plate}`,al=sh.alt;const L=[];for(const y of 'AB'){L.push(load($('i'+y),`${P}_${y}.png`),load($('i'+y+'b'),`${P}_${y}b.webp`));
    if(al)L.push(load($('i'+y+'x'),`${P}_${y}${al}.webp`),load($('i'+y+'xb'),`${P}_${y}${al}b.webp`));else{$('i'+y+'x').dataset.ok='';$('i'+y+'xb').dataset.ok=''}}
   await Promise.all(L);$('LA').style.display=$('LB').style.display=''}else{$('LA').style.display=$('LB').style.display='none'}}
 // transform da camera calculado antes da cena (para converter posicoes 3D em tela no mesmo quadro)
 const pre=()=>{const zb=FX.cz||0,pn=FX.cpn||[0,0],Tn=trans(gt,sh),sk=FX.shake||0,z0=(1+zb+(FX.punch||0))*Tn.s-1,dx=sk*sn(gt*71)+sk*.5*sn(gt*143+2)+pn[0]+Tn.dx+5*sn(gt*.31)+3*sn(gt*.77),dy=sk*sn(gt*59+1)+sk*.5*sn(gt*131)+pn[1]+Tn.dy+4*sn(gt*.27+2),rl=(FX.roll||0)+Tn.r+.3*sn(gt*.5);return{zb,Tn,z0,dx,dy,rl}};
 REAC=REACTS.find(r=>gt>=r.t0&&gt<r.t1)||null;
 const t=gt-sh.t0,u=cl(t/(sh.t1-sh.t0));CU=u;
 // passo 1: roda a cena so para descobrir a camera; passo 2: roda de novo com XF correto
 for(let pass=0;pass<2;pass++){FX={};FR=[];SHD=[];for(const k in CHS)CHS[k].g.style.display='none';sh.f(t,u);const q=pre(),ra=q.rl*Math.PI/180;XF={s:1+q.z0*1.06,dx:q.dx,dy:q.dy,cr:cs(ra),sr:sn(ra)}}
 const {zb,Tn,z0,dx,dy,rl}=pre();
 FR.sort((a,b)=>b.z-a.z).forEach(c=>(c.top?cw2:cw).appendChild(c.g));
 const LI=FX.lit||LIT[sh.lit||sh.plate||'cos']||LIT.cos;setLit(LI);const sdx=-LI.d[0]*.5;
 $('sg').innerHTML=SHD.map(([x,y,k])=>`<ellipse cx="${(x+sdx*60*k).toFixed(1)}" cy="${(y+4*k).toFixed(1)}" rx="${(95*k).toFixed(1)}" ry="${(18*k).toFixed(1)}" transform="rotate(${(sdx*6).toFixed(1)} ${x.toFixed(1)} ${y.toFixed(1)})" fill="rgba(10,0,25,${(.38*(LI.sh/.35)).toFixed(2)})"/>`).join('');
 $('sg2').innerHTML=SHD.map(([x,y,k])=>`<ellipse cx="${x.toFixed(1)}" cy="${(y+2*k).toFixed(1)}" rx="${(58*k).toFixed(1)}" ry="${(9*k).toFixed(1)}" fill="rgba(5,0,15,.55)"/>`).join('');
 $('aw').innerHTML=FX.aw||'';$('fw').innerHTML=FX.fw||'';
 // luz por personagem (filtro so na area de cada um: bem mais leve em 4K) + congelado / silhueta / perspectiva atmosferica
 const fzc=FX.frzc=='g'?' sepia(.55) saturate(1.4)':' sepia(.35) hue-rotate(205deg) saturate(1.3)';
 FR.forEach(c=>{const kk=c.sp?c.sp[2]:1,ar=(c.shp?1000*1300*(c.ss||1)*(c.ss||1):260*420)*kk*kk*(XF.s*RS)**2;const lk=CSH.t0+'|'+(c.k||'');if(!LITM.has(lk))LITM.set(lk,ar>5e6);let f=c.nolit?'':LITM.get(lk)?'url(#litT)':'url(#lit)';
  if(c.hf)f='brightness(2.6) saturate(.15)';else if(c.sil)f='brightness(0) drop-shadow(0 0 8px rgba(255,60,80,.7))';
  else if(c.frz>.01){const z=cl(c.frz);f+=` saturate(${(1-.85*z).toFixed(2)}) brightness(${(1-.12*z).toFixed(2)}) contrast(${(1+.15*z).toFixed(2)})`+(z>.5?fzc:'')}
  else if(c.k!='C'&&CSH.plate&&c.sp){const k=cl((c.sp[2]>0?(.55-c.sp[2])/.45:0));if(k>.02)f+=` saturate(${(1-.45*k).toFixed(2)}) contrast(${(1-.25*k).toFixed(2)}) brightness(${(1-.08*k).toFixed(2)})`}
  c.g.style.filter=f.trim()||'none'});
 bg.clearRect(0,0,W,H);if(FX.bg)FX.bg(bg);
 const ox=`${dx}px,${dy}px`;
 const bl='';  // desfoque de camada inteira removido (risco de a camada sumir em closes)$('mbg').setAttribute('stdDeviation',`${Tn.bx.toFixed(1)} ${Tn.by.toFixed(1)}`);
 $('LA').style.transform=`translate(${ox}) scale(${1+z0}) rotate(${rl}deg)`;$('SV').style.transform=$('SV2').style.transform=`translate(${ox}) scale(${1+z0*1.06}) rotate(${rl}deg)`;$('LB').style.transform=`translate(${ox}) scale(${1+z0*1.16}) rotate(${rl}deg)`;
 $('BG').style.transform=`scale(${1+z0*.5}) rotate(${rl*.5}deg)`;
 // cenario: profundidade de campo e variantes (noite / tempo parado) trocadas por opacidade
 const dof=FX.dof!=null?FX.dof:(sh.plate?Math.min(6,Math.max(0,(zb-.16)*12)):0),db=cl(dof/6),xv=sh.alt?cl(FX.alt??(sh.altOn?1:0)):0,b3=Math.min(1,db*3);
 for(const y of 'AB'){const full=xv>.999;setOp('i'+y+'b',full?0:b3);setOp('i'+y,full?0:1-db);setOp('i'+y+'xb',xv*b3);setOp('i'+y+'x',xv*(1-db))}  // camada coberta pela variante nao e desenhada
 let pf='';
 if(FX.warp&&FX.warp[3]>.5){const [wx,wy,wr,ws]=FX.warp,R=wr;$('wimg').setAttribute('x',(wx-R).toFixed(1));$('wimg').setAttribute('y',(wy-R).toFixed(1));$('wimg').setAttribute('width',(2*R).toFixed(1));$('wimg').setAttribute('height',(2*R).toFixed(1));$('wdm').setAttribute('scale',ws.toFixed(1));pf+=' url(#warp)'}
 const bri=FX.dark?`brightness(${1-FX.dark})`:'';
 $('LA').style.filter=(pf+' '+bl+' '+bri).trim()||'none';$('LB').style.filter=(pf+' '+bl+' '+bri).trim()||'none';
 const chr=FX.chroma||0;
 $('SV').style.filter=bri||'none';  // sem drop-shadow na camada inteira
 const c=oc;c.clearRect(0,0,W,H);
 c.globalCompositeOperation='lighter';
 const glow=(x,y,r,col,al)=>{if(al<=0||r<=0)return;const q=c.createRadialGradient(x,y,0,x,y,r);q.addColorStop(0,`rgba(${col},${Math.min(1,al)})`);q.addColorStop(1,`rgba(${col},0)`);c.fillStyle=q;c.fillRect(x-r,y-r,2*r,2*r)};
 (FX.gl||[]).forEach(g=>glow(...g));
 (FX.gls||[]).forEach(([x,y,r,col,al])=>{const p=zpS(x,y);glow(p[0],p[1],r*XF.s,col,al)});
 // raios de luz volumetricos
 (FX.rays||[]).forEach(([x,y,a,col,n,L])=>{const p=zpS(x,y);for(let i=0;i<n;i++){const an=i/n*6.283+gt*.05+rnd(i,2.2)*.3,w=.05+.06*rnd(i,4.4),l=L*(.6+.4*rnd(i,6.6));const g2=c.createRadialGradient(p[0],p[1],0,p[0],p[1],l);g2.addColorStop(0,`rgba(${col},${(a*.35).toFixed(3)})`);g2.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g2;c.beginPath();c.moveTo(p[0],p[1]);c.arc(p[0],p[1],l,an-w,an+w);c.closePath();c.fill()}});
 // particulas de energia
 (FX.pf||[]).forEach(([x,y,R,n,col,a,kind,sp=1])=>{const p=zpS(x,y),RR=R*XF.s,tt=FX.pfT!=null?FX.pfT:gt;for(let i=0;i<n;i++){const ph=(tt*(.25+.35*rnd(i,3.3))*sp+rnd(i,7.7))%1,an=rnd(i,12.9)*6.283+(kind=='orbit'?tt*(.6+rnd(i,2.1)):0);let px,py;
  if(kind=='rise'){px=p[0]+(rnd(i,5.1)-.5)*RR*2+10*sn(tt*2+i);py=p[1]+RR*(.6-ph*1.8)}else if(kind=='in'){const r=RR*(1-ph);px=p[0]+cs(an)*r;py=p[1]+sn(an)*r}else if(kind=='out'){const r=RR*ph;px=p[0]+cs(an)*r;py=p[1]+sn(an)*r}else{const r=RR*(.55+.45*rnd(i,9.9));px=p[0]+cs(an)*r;py=p[1]+sn(an)*r*.45}
  const s=(2+5*rnd(i,4.4))*Math.max(.6,XF.s*.6),al=a*sn(ph*3.14)*(.5+.5*ab(sn(tt*5+i)));glow(px,py,s*4,col,al*.5);c.fillStyle=`rgba(235,250,255,${(al).toFixed(3)})`;c.fillRect(px-s/2,py-s/2,s,s)}});
 // lens flare anamorfico
 (FX.flare||[]).forEach(([x,y,a,col='120,200,255'])=>{if(a<=0)return;const p=zpS(x,y);glow(p[0],p[1],160*a,'230,240,255',.8*a);c.save();c.translate(p[0],p[1]);c.scale(9,.12);glow(0,0,90,col,.9*a);c.restore();for(let k=1;k<4;k++){const gx=lp(p[0],540,k*.5),gy=lp(p[1],1000,k*.5);glow(gx,gy,30+k*25,col,.18*a)}});
 c.globalCompositeOperation='source-over';
 if(FX.fog){for(let i=0;i<3;i++){const y=1250+i*180+30*sn(gt*.4+i),gr=c.createLinearGradient(0,y-220,0,y+220);gr.addColorStop(0,'rgba(90,100,180,0)');gr.addColorStop(.5,`rgba(90,100,180,${(.14+.05*sn(gt*.7+i)).toFixed(3)})`);gr.addColorStop(1,'rgba(90,100,180,0)');c.fillStyle=gr;c.fillRect(0,y-220,W,440)}}
 if(FX.tint){c.fillStyle=`rgba(${FX.tint[0]},${FX.tint[1]},${FX.tint[2]},${FX.tint[3]})`;c.fillRect(0,0,W,H)}
 // retícula de mangá (flashback)
 if(FX.tone>0){if(!TONE){const t=document.createElement('canvas');t.width=t.height=12;const q=t.getContext('2d');q.fillStyle='#1b1024';q.beginPath();q.arc(6,6,2.6,0,6.283);q.fill();TONE=c.createPattern(t,'repeat')}c.globalAlpha=FX.tone;c.fillStyle=TONE;c.fillRect(0,0,W,H);c.globalAlpha=1}
 // grade de cor (sombras azuladas, altas luzes quentes) + vinheta
 let gr=c.createLinearGradient(0,0,0,H);gr.addColorStop(0,'rgba(40,60,200,.12)');gr.addColorStop(1,'rgba(255,120,60,.06)');c.fillStyle=gr;c.fillRect(0,0,W,H);
 const vg=FX.vig!=null?FX.vig:.5;gr=c.createRadialGradient(W/2,H*.5,H*.22,W/2,H*.5,H*.7);gr.addColorStop(0,'rgba(5,0,20,0)');gr.addColorStop(1,`rgba(4,0,18,${vg})`);c.fillStyle=gr;c.fillRect(0,0,W,H);
 const vh=Math.max(FX.vhs||0,Tn.vhs||0);if(vh>.01){for(let i=0;i<7;i++){const y=(rnd(Math.floor(gt*24)+i,7.7)*H),h=10+rnd(i+Math.floor(gt*24),2.3)*60;c.fillStyle=`rgba(180,230,255,${(.18*vh).toFixed(3)})`;c.fillRect(0,y,W,h);c.fillStyle=`rgba(255,40,120,${(.12*vh).toFixed(3)})`;c.fillRect(rnd(i,5)*80,y+h,W,6)}
  for(let y=0;y<H;y+=6){c.fillStyle=`rgba(0,0,0,${(.15*vh).toFixed(3)})`;c.fillRect(0,y,W,2)}}
 for(let i=0;i<260;i++){const x=rnd(i+gt*97,1.7)*W,y=rnd(i+gt*31,8.3)*H;c.fillStyle=i%2?'rgba(255,255,255,.04)':'rgba(0,0,0,.05)';c.fillRect(x,y,2.2,2.2)}
 const fl=Math.min(.4,Math.max(Tn.fl,(FX.flash||0)*.6));if(fl>0){c.fillStyle=`rgba(${(FX.flash||0)>Tn.fl?(FX.flcol||'255,255,255'):Tn.col},${fl})`;c.fillRect(0,0,W,H)}
 if(FX.black>0){c.fillStyle=`rgba(0,0,0,${cl(FX.black)})`;c.fillRect(0,0,W,H)}
 // inversao de cores do tempo parado (circulos em "difference": negativo dentro da esfera)
 const inv=FX.inv||[];$('INV').style.display=inv.length?'':'none';if(inv.length)$('INV').innerHTML=inv.map(([x,y,r,a,sc])=>{const p=sc?[x,y]:zpS(x,y),R=sc?r:r*XF.s;return R>=2400?`<rect width="1080" height="1920" fill="#fff" opacity="${cl(a).toFixed(3)}"/>`:`<circle cx="${p[0].toFixed(1)}" cy="${p[1].toFixed(1)}" r="${Math.max(0,R).toFixed(1)}" fill="#fff" opacity="${cl(a).toFixed(3)}"/>`}).join('');
 const RCH=['CIB','CJ'].map(k=>CHS[k]).find(c=>FR.includes(c)&&c.sp&&+c.g.style.opacity>.5);if(REAC&&RCH){const p=RCH.sp,ku=p[2],q=zpS(p[0],p[1]-(RCH.sit?240:330)*ku),fl=q[0]>620,bx=Math.min(860,Math.max(220,q[0]+(fl?-200:200))),by=Math.min(1420,Math.max(560,q[1]-90)),fo=1-cl((gt-REAC.t1+.12)/.12);FX.ui=(FX.ui||'')+`<g opacity="${fo.toFixed(2)}">`+BUBBLE(bx,by,REAC.w,REAC.t0,!fl)+'</g>'}
 $('UI').innerHTML=FX.ui||'';$('st').style.filter=FX.grade||'none'};
