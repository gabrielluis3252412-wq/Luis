// =====================================================================
//  E SE VOCE TIVESSE O PODER DO SAITAMA?  (1080x1920, 24 fps)
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
const OLDT=1e9,TOTAL=Math.round((pe(PH.length)+1.35)*24)/24;window.TOTAL=TOTAL;window.PHRASES=PH.map((t,i)=>[t,ps(i+1),pe(i+1)]);
// energia da voz por quadro (pulsa o brilho dos olhos com a narracao)
const vox=t=>ENV[Math.floor((t-OFF)*24)]||0;
const mouthAt=(k,t)=>({o:0,w:0,on:0});
const EMP=[];const EMPW=['absurdo','saitama','soco','treinar','limites','tres','cem','quilometros','esforco','impossivel','milhares','inacreditavel','musculos','resistentes','velocidade','cabelos','careca','menor','saltar','predios','absurdas','gigantescos','medo','colossal','punho','destruir','desviaria','atras','poderoso','nuvens','derrotado','segundos','assustador','nunca','adversario','desafio','coracao','acelerar','comente','poder'];const emph=t=>EMP.reduce((mx,h)=>Math.max(mx,Math.exp(-((t-h)**2)/.05)),0);
if(typeof PWD!='undefined'&&PWD)PWD.forEach(L=>L.forEach(w=>{const q=w[0].toLowerCase().normalize('NFD').replace(/[^a-z]/g,'');if(EMPW.includes(q))EMP.push(w[1]+OFF+.05)}));
const ST=(sz)=>`stroke="${INK}" stroke-width="${sz*.16}" paint-order="stroke" stroke-linejoin="round"`;
const TXT=(s,x,y,sz,c,rot=0,sc=1,fw=900,op=1)=>`<text x="0" y="0" transform="translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) rotate(${rot}) scale(${(+sc).toFixed(3)})" font-size="${sz}" text-anchor="middle" fill="${c}" ${ST(sz)} font-family="Poppins,Arial Black,sans-serif" font-weight="${fw}" opacity="${op}">${s}</text>`;
const S4=S.replace('"7"','"4"');
// expressoes extras (mesmo desenho, so combinacoes novas de palpebra/sobrancelha/boca)
Object.assign(M,{stare:{lid:.34,br:'a',mo:'l'},closed:{lid:.97,br:'f',mo:'l'},strain:{lid:.12,br:'a',mo:'f'},focus:{lid:0,br:'a',mo:'l'},calm:{lid:0,br:'f',mo:'s2'},wow:{lid:0,br:'u',mo:'o'}});
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
// canvases na resolucao real do quadro (ex.: 2K = 1440x2560 com deviceScaleFactor 4/3); o desenho continua em unidades de 1080x1920
{const DPR=window.devicePixelRatio||1;[['O',oc],['BG',bg]].forEach(([id,c])=>{$(id).width=Math.round(1080*DPR);$(id).height=Math.round(1920*DPR);c.setTransform(DPR,0,0,DPR,0,0)})}
const mkg=()=>{const g=document.createElementNS('http://www.w3.org/2000/svg','g');g.innerHTML='<g class="in"></g><g class="ex"></g>';cw.appendChild(g);return{g,in:g.firstChild,ex:g.lastChild,key:''}};
for(const k in CHD)CHS[k]={...mkg(),d:CHD[k],id:CHD[k].id};['C','C2','C3','C4','C5','C6'].forEach(k=>CHS[k]={...mkg(),d:null,id:99});
const PLS={bed:1.2,hot:1.2,liv:1.2,kit:1.1,str:1.25,prc:1.35,prcW:1.35},PLC={};let CSH=null,GT=0,FR=[],FX={},CU=0,SHD=[];
const getPl=k=>{if(!PLC[k]){const c=PLATES[k].cam,VP=mul(persp(c.fov,W/H,.1,90),look(c.eye,c.tg));PLC[k]={VP,tf:Math.tan(c.fov/2),cam:c}}return PLC[k]};
function put(k,x,y,z,o={}){const C=CHS[k],P=CSH.pl,t=GT,id=C.id,p=o.px?[o.px[0],o.px[1],1]:pj(P.VP,x,y,z),ku=o.ku||.0046*(H/2)/(P.tf*p[2])*(o.sc||1)*(PLS[CSH.plate]||1),lm=mouthAt(k,t),spk=lm.on;
 let mood=o.m||'happy';if(spk&&o.mt)mood=o.mt;const rx=['CIB','CHR','BAL'].includes(k)&&REAC&&GT<REAC.t1-.12;if(rx){mood=['shock','scared','worry','sad','sleepy','blank','strain'].includes(mood)?'talkd':['angry','focus'].includes(mood)?'talka':'talk';o={...o,talk:.9,mry:undefined}}const six=o.six!=null,bl=o.blind!=null;const key=[mood,o.fr||'',o.pd?o.pd.join():'',o.hat===0?0:1,six?1:0,bl?1:0,o.hold?1:0,o.hv||''].join('|');
 if(C.key!=key){C.key=key;const d={...C.d};if(o.hat===0)d.hat='';if(o.hatS!=null)d.hat=o.hatS;if(six)d.ic='#1d6fd6';d.fx=(d.fx||'')+(six?SIXFX(id):'')+(bl?BLINDFX(id):'');
  let hh=ch({...d,m:mood,front:o.fr,walk:1,pd:o.pd,hold:o.hold});if(d.bald)hh=hh.replace(/<path d="M-66-232C-76-318[^>]*>/,'').replace(/<path d="M-?63-214Q-?72-250 ?-?54-284"[^>]*>/g,'');C.in.innerHTML=hh;const q=n=>$(n+id);C.el={aR:q('aR'),aL:q('aL'),lgL:q('lgL'),lgR:q('lgR'),mo:q('mo'),bl:q('bl'),bw:q('bw'),hg:q('hg'),bd:q('bd'),pp:C.g.querySelectorAll('.pp'),sx:q('sx'),sxi:q('sxi'),bf:q('bf'),bft:q('bft'),scf:q('scf'),gl:q('gl')}}
 const frz=o.frz||['GB1','GB2','GC1'].includes(k),lv=frz?0:o.still?.4:1,e=C.el,em=frz?0:emph(t),g=spk*(o.gest??1)*(.4+lm.o);
 e.aR&&(e.aR.style.transform=`rotate(${o.aR??(sn(t*1.6+id)*3+g*16*sn(t*4.1+id*2)+em*9)}deg)`);e.aL&&(e.aL.style.transform=`rotate(${o.aL??(sn(t*1.4+id)*-3-g*16*sn(t*3.7+id*3)-em*9)}deg)`);
 const LGv=o.lg!=null?o.lg:2.2*sn(t*1.1+id);e.lgL&&(e.lgL.style.transform=`rotate(${LGv}deg)`);e.lgR&&(e.lgR.style.transform=`rotate(${-LGv}deg)`);
 if(e.mo){let ry=3,rx=14;if(o.mry!=null){ry=o.mry;rx=o.mrx||14}else if(o.talk>0){ry=3+o.talk*11*ab(sn(t*13+id*2));rx=14+o.talk*2}e.mo.setAttribute('ry',ry.toFixed(1));e.mo.setAttribute('rx',rx.toFixed(1))}
 const bp=3.1+.53*id,bph=((t+id*1.7)%bp)/bp;e.bl&&(e.bl.style.transform=`scaleY(${o.noblink||frz||(six&&o.six>.05)?1:(bph>.962?.1:1)})`);
 e.bw&&e.bw.setAttribute('transform',`translate(0 ${(-em*9-(o.brow||0)).toFixed(1)})`);
 if(e.hg){e.hg.style.transformOrigin='0px -186px';e.hg.style.transform=`rotate(${(lv*(3*sn(t*.9+id)+.6*sn(t*2.3+id*2)+1.6*vox(t)*sn(t*5.3+id))+em*3+(o.tilt||0)).toFixed(2)}deg)`}
 const brt=lv*sn(t*(o.brr||1.7)+id);e.bd&&(e.bd.style.transform=`scale(${(1+.005*brt).toFixed(4)},${(1+.014*brt).toFixed(4)})`);
 const sac=frz||o.look?[0,0]:[(rnd(Math.floor(t*.8+id*.37),3.1)-.5)*5,(rnd(Math.floor(t*.8+id*.37),7.3)-.5)*2.5];
 e.pp&&e.pp.forEach(q=>q.setAttribute('transform',`translate(${(lv*1.2*sn(t*.9+id*3)+sac[0]+(o.look?o.look[0]:0)).toFixed(1)} ${(lv*.8*sn(t*1.3+id)+sac[1]+(o.look?o.look[1]:0)).toFixed(1)})`));
 if(e.sx){const s=cl(o.six),pu=1+.12*sn(t*7.3)+.25*vox(t);e.sx.setAttribute('opacity',(s*Math.min(1,pu)).toFixed(3));e.sx.setAttribute('transform',`translate(0 -232) scale(${(.7+.45*s*pu).toFixed(3)}) translate(0 232)`);e.sxi.setAttribute('opacity',cl(s*2.5).toFixed(3))}
 if(e.bf){const b=cl(o.blind);e.bf.style.display=b>.01?'':'none';e.bf.setAttribute('transform',`translate(0 ${(-(1-ez(b))*74).toFixed(1)})`);e.bft&&(e.bft.style.transform=`rotate(${(9*sn(t*6.5+id)+5*sn(t*11)).toFixed(1)}deg)`)}
 if(e.scf){const w=o.wind??1;e.scf.style.transform=`rotate(${(-8*w+(6+8*w)*sn(t*(7+3*w)+id)+4*sn(t*13)).toFixed(1)}deg) scaleX(${(1+.12*w).toFixed(2)})`}
 if(e.gl){const g=cl(o.glint??.3);e.gl.setAttribute('opacity',g.toFixed(2));e.gl.style.transform=`rotate(${(t*40).toFixed(0)}deg) scale(${(.25+.9*g*(1+.15*sn(t*9))).toFixed(3)})`}
 C.ex.innerHTML=o.extra||'';
 const bob=o.bobv!=null?o.bobv:(o.nobob?0:lv*sn(t*3.2+id)*2*(o.bob||1));
 C.g.setAttribute('transform',`translate(${(p[0]+(o.nodrift?0:lv*6*sn(t*.8+id*2))).toFixed(1)} ${(p[1]+bob).toFixed(1)}) scale(${(ku*(o.flip||1)*(o.sx||1)*(o.sq?o.sq.sx:1)*(1+.03*em)).toFixed(4)} ${(ku*(o.sy||1)*(o.sq?o.sq.sy:1)*(1-.025*em)).toFixed(4)}) rotate(${o.rot!=null?o.rot:lv*1.3*sn(t*.9+id)}) ${o.sit?'translate(0 90)':''}`);
 C.g.style.display='';C.g.style.opacity=o.op??1;C.z=o.zz??p[2];C.top=o.top;C.k=k;C.sil=o.sil;C.hf=o.hf;C.sit=o.sit?1:0;C.sp=[p[0],p[1]+(o.sit?90*ku:0),ku];FR.push(C);if(o.shd||(!o.px&&!o.sit&&y<.4&&!o.noshd))SHD.push([p[0],p[1],ku])}
function sprite(svg,x,y,sc,z,sl='C',rot=0,op=1){const C=CHS[sl];C.hf=0;C.sil=0;C.sp=null;C.in.innerHTML=svg;C.ex.innerHTML='';C.g.setAttribute('transform',`translate(${(+x).toFixed(1)} ${(+y).toFixed(1)}) scale(${(+sc).toFixed(4)}) rotate(${rot})`);C.g.style.display='';C.g.style.opacity=op;C.z=z;C.k='C';C.top=0;FR.push(C)}
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
// raios eletricos em volta (Super Saiyajin)
const BOLTS=(x,y,R,t,a,col=GOLD2,n=5)=>{if(a<=0)return'';let s='';const fr=Math.floor(t*14);for(let i=0;i<n;i++){if(rnd(fr+i*7,3.1)>.55)continue;let px=x+(rnd(fr+i,1.3)-.5)*R*2,py=y+(rnd(fr+i,2.7)-.5)*R*2.6,d=`M${px.toFixed(1)} ${py.toFixed(1)}`;for(let k=0;k<5;k++){px+=(rnd(fr+i*5+k,4.4)-.5)*R*.5;py+=(rnd(fr+i*5+k,8.8)-.2)*R*.35;d+=`L${px.toFixed(1)} ${py.toFixed(1)}`}
 s+=`<path d="${d}" stroke="${INK}" stroke-width="${(R*.05).toFixed(1)}" fill="none" stroke-linejoin="round" opacity="${(.6*a).toFixed(2)}"/><path d="${d}" stroke="${col}" stroke-width="${(R*.025).toFixed(1)}" fill="none" stroke-linejoin="round" opacity="${a.toFixed(2)}"/>`}return s};
// pedras flutuando com a energia
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
document.querySelector('#SV defs').insertAdjacentHTML('beforeend','<linearGradient id="pillg" x1="0" x2="1" y1="0" y2="0"><stop offset="0" stop-color="#ffb300" stop-opacity="0"/><stop offset=".3" stop-color="#ffcf40" stop-opacity=".55"/><stop offset=".5" stop-color="#fffbe6" stop-opacity=".95"/><stop offset=".7" stop-color="#ffcf40" stop-opacity=".55"/><stop offset="1" stop-color="#ffb300" stop-opacity="0"/></linearGradient>');
const PILLAR=(k,a,w=1)=>{if(a<=.01)return;const p=CHS[k].sp,ku=p[2],ww=320*ku*w*(1+.06*sn(GT*23));FX.aw=(FX.aw||'')+`<rect x="${(p[0]-ww/2).toFixed(1)}" y="-700" width="${ww.toFixed(1)}" height="${(p[1]+720).toFixed(1)}" fill="url(#pillg)" opacity="${Math.min(1,a).toFixed(2)}"/>`};
const CRACKS=(x,y,ku,a)=>{if(a<=0)return'';let s='';for(let i=0;i<8;i++){const an=i/8*6.283+.2,L=(120+160*rnd(i,3.3))*ku*a;let d=`M${x.toFixed(1)} ${y.toFixed(1)}`;for(let k=1;k<=4;k++){const r=L*k/4;d+=`L${(x+cs(an)*r+(rnd(i*7+k,5.1)-.5)*30*ku).toFixed(1)} ${(y+sn(an)*r*.28+(rnd(i*7+k,8.3)-.5)*8*ku).toFixed(1)}`}s+=`<path d="${d}" stroke="${INK}" stroke-width="${(9*ku).toFixed(1)}" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="${d}" stroke="${GOLD2}" stroke-width="${(3.5*ku).toFixed(1)}" fill="none" stroke-linecap="round" opacity="${(.6+.4*ab(sn(GT*12+i))).toFixed(2)}"/>`}return s};
const DUST=(x,y,t0,ku,life=1.1)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,R=(80+900*(1-(1-k)*(1-k)))*ku;let s=`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${R.toFixed(1)}" ry="${(R*.22).toFixed(1)}" fill="none" stroke="#fff3c8" stroke-width="${(14*(1-k)*ku+1).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/>`;for(let i=0;i<16;i++){const a=i/16*6.283;s+=`<circle cx="${(x+cs(a)*R).toFixed(1)}" cy="${(y+sn(a)*R*.22-30*ku*k).toFixed(1)}" r="${((22+20*rnd(i,4.4))*ku*(.5+k)).toFixed(1)}" fill="#d9c9a8" stroke="${INK}" stroke-width="${(3*ku).toFixed(1)}" opacity="${(.8*(1-k)).toFixed(2)}"/>`}return s};
const SPEEDG=(a,cx=540,cy=1000)=>{if(a<=0)return'';let s='';for(let i=0;i<34;i++){const an=rnd(i,9.1)*6.283,ph=(GT*3.4+rnd(i,4.2))%1,r1=480+rnd(i,7.7)*160+ph*80,L=140+rnd(i,2.2)*220;s+=`<line x1="${(cx+cs(an)*r1).toFixed(1)}" y1="${(cy+sn(an)*r1*1.5).toFixed(1)}" x2="${(cx+cs(an)*(r1+L)).toFixed(1)}" y2="${(cy+sn(an)*(r1+L)*1.5).toFixed(1)}" stroke="${i%3?GOLD2:'#fff'}" stroke-width="${(5+rnd(i,6)*7).toFixed(1)}" stroke-linecap="round" opacity="${(a*(.4+.5*rnd(i,1.1))).toFixed(2)}"/>`}return s};
// pisca entre a forma antiga e a nova antes de firmar (estilo anime)
const flick=(t0,dur=.9,rate=10)=>GT>=t0?true:GT<t0-dur?false:rnd(Math.floor(GT*rate),5.3)<cl((GT-t0+dur)/dur)*.85;
// =====================================================================
//  E SE VOCE TIVESSE O PODER DO SAITAMA?  - planos (Cibito e o "voce" da historia)
//  O protagonista e o Cibito: treina, perde o cabelo e vira um heroi careca ORIGINAL
//  (cachecol vermelho, capuz caido nas costas). Nenhum personagem de One Punch Man e desenhado.
// =====================================================================
const GOLD='#ffd23f',GOLD2='#fff1a8',RED='#ff3b47',ORG='#ff8a1f',SKY='#5fd0ff',HC='#3a1f14',HB='#b5651d';
const wn=(i,w,n=1,f=.2)=>{const q=nrm(w);const L=(PWD&&PWD[i-1])||[];let c=0;for(const x of L){if(nrm(x[0]).startsWith(q)&&++c==n)return x[1]+(x[2]-x[1])*f+OFF}return wt(i,w,f)};
// capuz do Cibito com mechas removiveis (bits 0-4 franja, 5-8 laterais, 9 topete)
const HOODN=(m=1023)=>{const on=i=>(m>>i)&1;return `<path d="M-62-250C-92-236-94-176-84-146Q-70-134-58-146C-54-186-58-226-58-246Z" fill="${HB}" ${S}/><path d="M62-250C92-236 94-176 84-146Q70-134 58-146C54-186 58-226 58-246Z" fill="${HB}" ${S}/><g transform="translate(0 -18)"><path d="M-72-238C-80-332 80-332 72-238Q0-258-72-238Z" fill="${HB}" ${S}/><path d="M-60-292L-76-348L-30-318Z" fill="${HB}" ${S}/><path d="M-58-300L-66-332L-40-316Z" fill="#f0a98a"/><path d="M60-292L76-348L30-318Z" fill="${HB}" ${S}/><path d="M58-300L66-332L40-316Z" fill="#f0a98a"/>${on(9)?`<path d="M-16-316L-8-340L0-322L10-344L18-316Z" fill="${HC}" ${S4}/>`:''}<ellipse cy="-284" rx="34" ry="22" fill="#f6c8a0" ${S}/><ellipse cx="-11" cy="-286" rx="4.5" ry="6" fill="#1b1024"/><ellipse cx="11" cy="-286" rx="4.5" ry="6" fill="#1b1024"/>${[-44,-24,-4,16,36].map((x,i)=>on(i)?`<circle cx="${x}" cy="${-238+(i%2)*4}" r="12" fill="${HC}" ${S4}/>`:'').join('')}</g>${[[-80,-212],[-84,-192],[80,-212],[84,-192]].map(([x,y],i)=>on(5+i)?`<circle cx="${x}" cy="${y}" r="10" fill="${HC}" ${S4}/>`:'').join('')}`};
const HAIRP=[[-44,-256],[-24,-252],[-4,-256],[16,-252],[36,-256],[-80,-212],[-84,-192],[80,-212],[84,-192],[1,-348]];
// heroi careca: brilho na cabeca, capuz caido nas costas e cachecol vermelho
const SHINE=id=>`<ellipse cx="-26" cy="-276" rx="24" ry="11" transform="rotate(-28 -26 -276)" fill="#fff" opacity=".55"/><g id="gl${id}" style="transform-origin:-30px -282px"><path d="M-30-322L-23-289L10-282L-23-275L-30-242L-37-275L-70-282L-37-289Z" fill="#fff" stroke="#fff6c0" stroke-width="3"/><circle cx="-30" cy="-282" r="10" fill="#fff"/></g>`;
const SCARF=id=>`<path d="M-74-202Q-64-160 0-158Q64-160 74-202Q58-176 0-174Q-58-176-74-202Z" fill="${HB}" ${S4}/><path d="M-52-188Q0-168 52-188L58-160Q0-140-58-160Z" fill="#e8343f" ${S4}/><g id="scf${id}" style="transform-origin:-36px -166px"><path d="M-36-168Q-80-170-128-146Q-104-138-114-108Q-76-134-40-150Z" fill="#e8343f" ${S4}/><path d="M-44-158Q-80-152-108-138" stroke="rgba(255,255,255,.35)" stroke-width="5" fill="none"/></g>`;
Object.assign(CHD,{CHR:{...CHD.CIB,id:24},BAL:{...CHD.CIB,hat:'',bald:1,fx:SHINE(20),bx:SCARF(20),id:20},
 GB1:{...CHD.CIB,hat:'',bald:1,fx:SHINE(21),bx:SCARF(21),id:21},GB2:{...CHD.CIB,hat:'',bald:1,fx:SHINE(22),bx:SCARF(22),id:22},GC1:{...CHD.CIB,id:23}});
for(const k of ['CHR','BAL','GB1','GB2','GC1'])CHS[k]={...mkg(),d:CHD[k],id:CHD[k].id};
// mechas caindo (unidades do personagem): L=[[indice,t0],...]
const HAIRFALL=L=>{let s='';L.forEach(([i,t0],j)=>{const d=GT-t0;if(d<0||d>1.6)return;const [x,y]=HAIRP[i],vx=(x<0?-1:1)*(40+60*rnd(j,3.1)),yy=Math.min(-12,y+260*d*d*3.2),xx=x+vx*d+8*sn(d*14+j),r=i<5?12:i<9?10:14,o=d<1.1?1:1-(d-1.1)/.5;
 s+=i==9?`<path transform="translate(${xx.toFixed(1)} ${yy.toFixed(1)}) rotate(${(d*400*(j%2?1:-1)).toFixed(0)})" d="M-16 14L-8-12L0 4L10-14L18 14Z" fill="${HC}" ${S4} opacity="${o.toFixed(2)}"/>`:`<circle cx="${xx.toFixed(1)}" cy="${yy.toFixed(1)}" r="${r}" fill="${HC}" ${S4} opacity="${o.toFixed(2)}"/>`});return s};
// capuz voando para tras (revela a careca)
const HOODFLY=(t0,dir=-1)=>{const d=GT-t0;if(d<0||d>1.4)return'';const k=d/1.4;return`<g transform="translate(${(dir*420*k).toFixed(1)} ${(-380*k+620*k*k).toFixed(1)}) rotate(${(dir*-260*k).toFixed(1)} 0 -250)" opacity="${(1-k*k).toFixed(2)}">${HOODN(0)}</g>`};
// ---------- O MONSTRO COLOSSAL: criatura de SOMBRA (design original inspirado na referencia enviada) ----------
// corpo negro de contorno rasgado com brilho vermelho nas bordas, olhos vermelhos, sorriso enorme de dentes pontudos,
// bracos longos com garras curvas, tentaculos de sombra e fumaca na base.
// unidades locais: pes em (0,0), altura ~1000. fr/fl = maos [x,y]; mo = boca 0-1; ey: mad|ko|wow|conf; back = de costas
const KJP={a:{b:'#0c0710',d:'#050307',lv:'#ff2340',lvg:'255,35,64',hot:'#ffe0e4'},g:{b:'#071009',d:'#030604',lv:'#86ff3a',lvg:'134,255,58',hot:'#ecffd8'},
 p:{b:'#0d0714',d:'#050309',lv:'#b84dff',lvg:'184,77,255',hot:'#f2e2ff'},r:{b:'#120807',d:'#070302',lv:'#ff7a1a',lvg:'255,122,26',hot:'#fff0dc'}};
// contorno rasgado: pontas irregulares, maiores na metade de cima
const JAG=(cx,cy,rx,ry,n,amp,seed,t)=>{let d='';for(let i=0;i<n;i++){const a=i/n*6.283-Math.PI/2,up=Math.max(0,-sn(a)),r=i%2?1+amp*(.35+.65*rnd(i,seed))*(.3+up):.96+.02*sn(t*3+i);d+=(i?'L':'M')+(cx+cs(a)*rx*r+4*sn(t*2+i*1.3)).toFixed(1)+' '+(cy+sn(a)*ry*r).toFixed(1)}return d+'Z'};
// contorno rasgado a partir de uma forma base (pontas para fora, maiores em cima)
const JAGP=(B,m,amp,seed,t,cx=0,cy=-500)=>{let d='',k=0;for(let i=0;i<B.length;i++){const [x0,y0]=B[i],[x1,y1]=B[(i+1)%B.length];for(let j=0;j<m;j++,k++){const u=j/m,x=lp(x0,x1,u),y=lp(y0,y1,u),dx=x-cx,dy=y-cy,L=Math.hypot(dx,dy)||1,up=cl((-dy/L+.2)),e=k%2?amp*(.35+.65*rnd(k,seed))*(.25+up)*L:-.03*L;
 d+=(k?'L':'M')+(x+dx/L*e+3*sn(t*2.2+k)).toFixed(1)+' '+(y+dy/L*e).toFixed(1)}}return d+'Z'};
const TORSO=[[-210,-240],[-290,-400],[-345,-560],[-300,-690],[-170,-760],[0,-780],[170,-760],[300,-690],[345,-560],[290,-400],[210,-240],[0,-200]];
// tentaculo de sombra que balanca (com um galho)
const TEND=(x,y,ang,L,w,t,seed,P)=>{let px=x,py=y,a=ang,d=`M${x.toFixed(1)} ${y.toFixed(1)}`,h=d;const pts=[];for(let i=1;i<=7;i++){a+=.3*sn(t*1.6+seed+i*.9)+(rnd(seed,i)-.5)*.45;px+=cs(a)*L/7;py+=sn(a)*L/7;d+=`L${px.toFixed(1)} ${py.toFixed(1)}`;if(i<=3)h+=`L${px.toFixed(1)} ${py.toFixed(1)}`;pts.push([px,py,a])}
 const b=pts[3];d+=`M${b[0].toFixed(1)} ${b[1].toFixed(1)}l${(cs(b[2]+.9)*L*.28).toFixed(1)} ${(sn(b[2]+.9)*L*.28).toFixed(1)}`;
 return `<path d="${d}" stroke="${P.lv}" stroke-width="${(w*.5+8).toFixed(1)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><path d="${h}" stroke="${P.lv}" stroke-width="${(w+8).toFixed(1)}" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity=".8"/><path d="${d}" stroke="${P.b}" stroke-width="${(w*.5).toFixed(1)}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="${h}" stroke="${P.b}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`};
// mao com garras curvas (ang = direcao do braco, em radianos; open 0-1 abre os dedos)
const HAND=(x,y,ang,s,P,open=1)=>{let o=`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${(ang*57.2958-90).toFixed(1)}) scale(${s.toFixed(3)})"><path d="M-74-46Q-96 40-52 76H52Q96 40 74-46Q0-78-74-46Z" fill="${P.b}" stroke="${P.lv}" stroke-width="8" stroke-linejoin="round"/>`;
 [-1.5,-.5,.5,1.5].forEach(k=>{const a=k*.36*open,bx=k*32,by=62,L=230-34*ab(k),tx=bx+sn(a)*L-k*8,ty=by+cs(a)*L,mx=bx+sn(a)*L*.5+k*10,my=by+cs(a)*L*.55;
  o+=`<path d="M${bx-17} ${by}Q${(mx-20).toFixed(0)} ${my.toFixed(0)} ${tx.toFixed(0)} ${ty.toFixed(0)}Q${(mx+14).toFixed(0)} ${(my-12).toFixed(0)} ${bx+17} ${by}Z" fill="${P.d}" stroke="${P.lv}" stroke-width="6" stroke-linejoin="round"/><path d="M${bx-5} ${by+12}Q${mx.toFixed(0)} ${(my-4).toFixed(0)} ${(tx-3).toFixed(0)} ${(ty-10).toFixed(0)}" stroke="#e8d4d4" stroke-width="3" fill="none" opacity=".5"/>`});
 return o+`<path d="M-62 0Q-150 40-164 140Q-116 66-48 34Z" fill="${P.d}" stroke="${P.lv}" stroke-width="6" stroke-linejoin="round"/></g>`};
const KJ=(o={})=>{const t=GT,P=KJP[o.pal||'a'],mo=o.mo||0,lvA=(.55+.45*ab(sn(t*4.3+(o.seed||0)))).toFixed(2),bk=o.back,F=(o.bigF||92)/92,ey=o.ey||'mad';
 const fr=o.fr||[250,-430],fl=o.fl||[-250,-430];
 const arm=(sx,sy,f0,sd)=>{const f=[f0[0]+sd*85,f0[1]+50],mx=(sx+f[0])/2+sd*120,my=(sy+f[1])/2+90,d=`M${sx} ${sy}Q${mx.toFixed(0)} ${my.toFixed(0)} ${f[0].toFixed(0)} ${f[1].toFixed(0)}`,ang=Math.atan2(f[1]-my,f[0]-mx);
  return `<path d="${d}" stroke="${P.lv}" stroke-width="118" fill="none" stroke-linecap="round" opacity=".9"/><path d="${d}" stroke="${P.b}" stroke-width="104" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${P.lv}" stroke-width="5" stroke-dasharray="22 50 8 34" fill="none" opacity="${lvA}"/>`+TEND(mx,my-30,-Math.PI/2+sd*.9,150,12,t,sd*3+4,P)+HAND(f[0],f[1],ang,1.05*F,P,o.grip?.25:1)};
 let s=`<ellipse cy="10" rx="330" ry="46" fill="rgba(0,0,0,.45)"/>`;
 // tentaculos atras do corpo
 [[-230,-640,-2.5,260],[-160,-720,-2.0,300],[220,-650,-.65,270],[150,-730,-1.1,310],[-260,-520,-2.9,220],[270,-520,-.25,230]].forEach(([x,y,a,L],i)=>s+=TEND(x,y,a,L,22,t,i*2.3,P));
 // pernas (quase escondidas pela fumaca)
 s+=`<path d="M-170-320L-235 0H-70L-90-320Z" fill="${P.b}" stroke="${P.lv}" stroke-width="7" stroke-linejoin="round"/><path d="M170-320L235 0H70L90-320Z" fill="${P.b}" stroke="${P.lv}" stroke-width="7" stroke-linejoin="round"/>`;
 if(!bk)s+=arm(-220,-610,fl,-1);
 // tronco curvado de contorno rasgado
 s+=`<path d="${JAGP(TORSO,5,.16,3,t)}" fill="${P.b}" stroke="${P.lv}" stroke-width="9" stroke-linejoin="round"/>`;
 s+=bk?[-640,-575,-510,-445,-380].map((y,i)=>`<path d="M-26 ${y}L0 ${y-40}L26 ${y}Z" fill="${P.lv}" opacity="${lvA}"/>`).join('')+`<path d="M-150-600L-90-520L-130-450M150-610L100-540L140-470" stroke="${P.lv}" stroke-width="7" fill="none" stroke-linecap="round" opacity="${lvA}"/>`
  :`<path d="M-200-560L-150-500L-170-430M190-580L150-520L170-460M-30-420L0-370L-20-320" stroke="${P.lv}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${lvA}"/>`;
 // cabeca: coroa de pontas, olhos vermelhos e o sorriso de dentes
 s+=`<g transform="rotate(${(o.ht||0).toFixed(1)} 0 -720) translate(${(o.hx||0).toFixed(1)} 0)">`;
 [[-110,-880,-2.2,190],[-40,-920,-1.75,230],[40,-920,-1.35,230],[110,-880,-.95,190]].forEach(([x,y,a,L],i)=>s+=TEND(x,y,a,L,18,t,i*4.1+1,P));
 s+=`<path d="${JAG(0,-775,170,138,40,.55,7,t)}" fill="${P.b}" stroke="${P.lv}" stroke-width="9" stroke-linejoin="round"/>`;
 if(!bk){
  if(ey=='ko')s+=[-70,70].map(x=>`<path d="M${x-24}-822L${x+24}-778M${x+24}-822L${x-24}-778" stroke="${P.lv}" stroke-width="13" stroke-linecap="round" opacity=".7"/>`).join('');
  else if(ey=='wow')s+=[-70,70].map(x=>`<ellipse cx="${x}" cy="-800" rx="34" ry="36" fill="${P.lv}"/><ellipse cx="${x}" cy="-800" rx="16" ry="18" fill="${P.hot}"/><circle cx="${x}" cy="-800" r="5" fill="${P.d}"/>`).join('');
  else s+=[-1,1].map((sd,i)=>{const x=sd*70,sq=ey=='conf'&&i?.45:1;return`<path d="M${x-sd*52} ${-790}Q${x-sd*8} ${-790-34*sq} ${x+sd*54} ${-818}Q${x+sd*14} ${-790+20*sq} ${x-sd*52} ${-790}Z" fill="${P.lv}"/><path d="M${x-sd*30} ${-795}Q${x} ${-795-16*sq} ${x+sd*34} ${-810}Q${x+sd*6} ${-795+8*sq} ${x-sd*30} ${-795}Z" fill="${P.hot}"/><ellipse cx="${x+sd*6+(o.look||0)}" cy="-800" rx="4" ry="${(9*sq).toFixed(1)}" fill="${P.d}"/>`}).join('');
  // sorriso enorme: duas fileiras de dentes pontudos
  const U=x=>-742+42*(x/158)**2,G=x=>(16+mo*92)*(1-(x/162)**2);let mp=`M-158 ${U(-158)}`,lp_='';for(let x=-158;x<=158;x+=12)mp+=`L${x} ${U(x).toFixed(1)}`;for(let x=158;x>=-158;x-=12)lp_+=`L${x} ${(U(x)+G(x)).toFixed(1)}`;
  s+=`<path d="${mp}${lp_}Z" fill="#20030a" stroke="${P.lv}" stroke-width="5" stroke-linejoin="round"/>`;let te='';
  for(let i=0;i<14;i++){const x=-145+i*22.3,u=U(x),g=G(x),L=Math.max(14,g*.62+12);te+=`<path d="M${(x-10).toFixed(1)} ${(u-2).toFixed(1)}L${x.toFixed(1)} ${(u+L).toFixed(1)}L${(x+10).toFixed(1)} ${(u-2).toFixed(1)}Z" fill="#f2e6da" stroke="${INK}" stroke-width="2"/>`;
   const x2=x+11,u2=U(x2)+G(x2),L2=Math.max(12,G(x2)*.55+10);if(x2<150)te+=`<path d="M${(x2-9).toFixed(1)} ${(u2+2).toFixed(1)}L${x2.toFixed(1)} ${(u2-L2).toFixed(1)}L${(x2+9).toFixed(1)} ${(u2+2).toFixed(1)}Z" fill="#e8dacb" stroke="${INK}" stroke-width="2"/>`}
  s+=te}
 s+=`</g>`;
 if(!bk)s+=arm(220,-610,fr,1);else s+=arm(-220,-610,fl,-1)+arm(220,-610,fr,1);
 // fumaca na base e lascas de sombra se desprendendo
 for(let i=0;i<9;i++){const x=(i-4)*78+18*sn(t*1.3+i),r=70+30*rnd(i,4.4)+10*sn(t*2+i);s+=`<ellipse cx="${x.toFixed(0)}" cy="${(-20-15*rnd(i,2.1)).toFixed(0)}" rx="${r.toFixed(0)}" ry="${(r*.5).toFixed(0)}" fill="#120a14" opacity=".82"/>`}
 for(let i=0;i<14;i++){const ph=(t*.35+rnd(i,3.7))%1,x=(rnd(i,8.1)-.5)*560+40*sn(t+i),y=-620-ph*520,z=8+14*rnd(i,5.5);s+=`<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(t*90+i*40).toFixed(0)})" d="M${-z} 0L0 ${-z*.7}L${z} ${-z*.2}L${z*.3} ${z*.8}Z" fill="${P.b}" stroke="${P.lv}" stroke-width="3" opacity="${(sn(ph*3.14)*.9).toFixed(2)}"/>`}
 if(o.q)s+=`<g transform="translate(${o.q[0]} ${o.q[1]}) scale(${o.q[2]||1})">${TXT('?',0,0,260,'#fff')}</g>`;
 return s};
// coloca o monstro (sprite) e acende as rachaduras de lava
const mon=(sl,x,y,s,o={})=>{let g=KJ(o);if(o.sx!=null||o.sy!=null)g=`<g transform="scale(${(o.sx??1).toFixed(3)} ${(o.sy??1).toFixed(3)})">${g}</g>`;if(o.center)g=`<g transform="translate(0 480)">${g}</g>`;if(o.clip!=null)g=`<clipPath id="kc${sl}"><rect x="-3000" y="-4000" width="6000" height="${(4000+o.clip).toFixed(0)}"/></clipPath><g clip-path="url(#kc${sl})">${g}</g>`;sprite(g,x,y,s,o.z??60,sl,o.rot||0,o.op??1);CHS[sl].hf=o.hf||0;CHS[sl].sp=null;const P=KJP[o.pal||'a'],op=o.op??1;if(!o.noglow){(FX.gls=FX.gls||[]).push([x,y-480*s,560*s,P.lvg,.16*op]);if(!o.back&&o.ey!='ko'&&!o.rot&&!o.center){const ex=(o.sx??1)*s;[-70,70].forEach(dx=>FX.gls.push([x+(dx+(o.hx||0))*ex,y-805*s,85*s,P.lvg,.7*op],[x+(dx+(o.hx||0))*ex,y-805*s,30*s,'255,235,240',.5*op]))}}};
const monPt=(x,y,s,lx,ly)=>[x+lx*s,y+ly*s];
// ---------- PECAS DE INTERFACE ----------
const FIST=(x,y,s,c='#f6c8a0',r=0)=>`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) rotate(${r}) scale(${s.toFixed(3)})"><path d="M-54-40Q-60-74-26-74H40Q70-74 70-40V30Q70 66 30 66H-24Q-60 66-60 30Z" fill="${c}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><path d="M-30-74V-20M4-74V-20M38-74V-20" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><path d="M-60-6Q-90-10-90 20Q-88 44-50 40" fill="${c}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/></g>`;
const RAIN=(a,ang=.25)=>{if(a<=0)return'';let s='';for(let i=0;i<110;i++){const ph=(GT*(1.6+rnd(i,2.2))+rnd(i,7.7))%1,x=rnd(i,12.9)*1300-120+ph*ang*700,y=ph*2200-150,L=40+50*rnd(i,4.4);s+=`<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x-L*ang).toFixed(0)}" y2="${(y-L).toFixed(0)}" stroke="#bfd6ff" stroke-width="${(2+2*rnd(i,5.1)).toFixed(1)}" opacity="${(a*(.35+.4*rnd(i,6.6))).toFixed(2)}"/>`}return s};
const COUNTER=(x,y,a,n,label,col='#fff',sz=1)=>a<=0?'':`<g opacity="${a.toFixed(2)}" transform="translate(${x} ${y}) scale(${sz})"><rect x="-230" y="-86" width="460" height="172" rx="32" fill="#0b0718" opacity=".82" stroke="${col}" stroke-width="6"/></g>`+TXT(n,x,y+10*sz,92*sz,col,0,a)+TXT(label,x,y+62*sz,38*sz,'#fff',0,a);
const BAR=(x,y,w,lab,v,col,a,mx)=>{const k=cl(v);return `<g opacity="${a.toFixed(2)}"><text x="${x}" y="${y-14}" font-size="40" fill="#fff" font-family="Poppins" font-weight="900" ${ST(40)}>${lab}</text><rect x="${x}" y="${y}" width="${w}" height="46" rx="23" fill="#1a1230" stroke="${INK}" stroke-width="6"/><rect x="${x+6}" y="${y+6}" width="${((w-12)*k).toFixed(1)}" height="34" rx="17" fill="${col}"/>${mx?`<text x="${x+w-14}" y="${y-14}" font-size="40" text-anchor="end" fill="${GOLD}" font-family="Poppins" font-weight="900" ${ST(40)}>MAX!</text>`:''}</g>`};
const STAMP=(x,y,t0,txt,col=RED,sz=150,rot=-8)=>{if(GT<t0)return'';const d=GT-t0,s=d<.12?lp(2.4,1,ez(d/.12)):1+.04*Math.exp(-d*6)*sn(d*40);return`<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s.toFixed(3)})"><rect x="${-txt.length*sz*.36-40}" y="${-sz*.72}" width="${txt.length*sz*.72+80}" height="${sz*1.12}" rx="18" fill="none" stroke="${col}" stroke-width="14"/></g>`+TXT(txt,x,y+sz*.12,sz,col,rot,s)};
const ECG=(a,bpm,t0,x=540,y=1360,w=820,col='#4dff88')=>{if(a<=0)return'';let d='';const per=60/bpm;for(let i=0;i<=120;i++){const u=i/120,tt=GT-(1-u)*2.2,ph=((tt-t0)/per)%1;const v=ph>.1&&ph<.14?-120:ph>.14&&ph<.18?60:ph>.18&&ph<.22?-20:0;d+=(i?'L':'M')+(x-w/2+u*w).toFixed(1)+' '+(y+v*(.5+.5*Math.min(1,bpm/90))).toFixed(1)}
 return `<g opacity="${a.toFixed(2)}"><rect x="${x-w/2-30}" y="${y-170}" width="${w+60}" height="260" rx="28" fill="#03100a" opacity=".8" stroke="${col}" stroke-width="5"/><path d="${d}" fill="none" stroke="${col}" stroke-width="7" stroke-linejoin="round"/></g>`+TXT(`${Math.round(bpm)} BPM`,x+w/2-110,y-110,44,col,0,a)};
const HEART=(x,y,s,col='#ff3b6b')=>`<path transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)})" d="M0 34C-80-20-62-92 0-50C62-92 80-20 0 34Z" fill="${col}" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/>`;
// nuvens desenhadas no canvas (abrem com o vento do soco)
const CLD=[];for(let i=0;i<34;i++)CLD.push([rnd(i,3.3)*1500-210,rnd(i,5.7)*1100-160,120+190*rnd(i,8.1),rnd(i,9.9)]);
function sky(c,t,o={}){const g=c.createLinearGradient(0,0,0,H);g.addColorStop(0,o.top||'#2a2f7a');g.addColorStop(.55,o.mid||'#c24f7a');g.addColorStop(1,o.bot||'#ffb35a');c.fillStyle=g;c.fillRect(0,0,W,H);
 const op=o.open||0,cx=o.cx??540,cy=o.cy??520;
 if(op>0){const R=op*1700;const q=c.createRadialGradient(cx,cy,0,cx,cy,R);q.addColorStop(0,'rgba(255,255,240,.95)');q.addColorStop(.25,'rgba(150,210,255,.85)');q.addColorStop(1,'rgba(90,160,255,0)');c.fillStyle=q;c.fillRect(0,0,W,H)}
 CLD.forEach(([x,y,r,z],i)=>{let dx=x-cx,dy=(y-cy)*1.3,dd=Math.hypot(dx,dy)||1,push=op*(900+700*z)*Math.exp(-dd/1600);const X=x+dx/dd*push+(o.drift??20)*sn(t*.2+i),Y=y+dy/dd*push*.6;
  c.fillStyle=`rgba(${o.cc||'255,214,200'},${(.85-.3*z).toFixed(2)})`;for(let k=0;k<4;k++){c.beginPath();c.ellipse(X+(k-1.5)*r*.45,Y+(k%2?-1:1)*r*.12,r*.55,r*.3,0,0,6.283);c.fill()}
  c.fillStyle=`rgba(${o.cs||'190,110,150'},.35)`;c.beginPath();c.ellipse(X,Y+r*.2,r*1.1,r*.16,0,0,6.283);c.fill()});
 if(o.city){c.fillStyle=o.city;for(let i=0;i<16;i++){const w=60+60*rnd(i,1.1),h=120+260*rnd(i,2.3),x=i*72-30;c.fillRect(x,H-h,w,h);c.fillStyle='rgba(255,220,140,.55)';for(let r=0;r<h/40-1;r++)for(let q=0;q<w/26-1;q++)if(rnd(i*31+r*7+q,4.4)>.6)c.fillRect(x+8+q*24,H-h+16+r*38,10,16);c.fillStyle=o.city}}}
const LIT2={twn2:{amb:[1,.84,.76],rim:[255,180,110],d:[0,-1],sh:.4,ri:1},prc:{amb:[1,.96,.92],rim:[255,240,210],d:[1,-.7],sh:.3,ri:.7},roadN:{amb:[.6,.66,.95],rim:[150,170,255],d:[-1,-.7],sh:.45,ri:.8},dor:{amb:[.95,.9,.9],rim:[255,220,170],d:[0,-1],sh:.3,ri:.7},tvw:{amb:[.9,.88,1],rim:[120,160,255],d:[0,-1],sh:.3,ri:.8}};Object.assign(LIT,LIT2);
Object.assign(LIT,{cbd:{amb:[1,.98,.96],rim:[255,245,220],d:[1,-.8],sh:.3,ri:.75},cbdS:{amb:[1,.82,.74],rim:[255,170,100],d:[0,-1],sh:.4,ri:1},
 zgh:{amb:[.95,.8,.72],rim:[255,160,100],d:[-.4,-1],sh:.42,ri:.95},zghN:{amb:[.66,.7,1],rim:[150,170,255],d:[-1,-.8],sh:.45,ri:.85},
 apt:{amb:[1,.97,.9],rim:[255,240,210],d:[1,-.5],sh:.28,ri:.7},aptN:{amb:[.75,.72,.9],rim:[140,180,255],d:[1,-.4],sh:.38,ri:.85},
 prq:{amb:[1,.9,.82],rim:[255,190,120],d:[-.4,-1],sh:.32,ri:.9},prqN:{amb:[.6,.66,.95],rim:[150,180,255],d:[-1,-.7],sh:.45,ri:.8},prqW:{amb:[.95,.97,1.05],rim:[230,240,255],d:[0,-1],sh:.25,ri:.7},
 tlh:{amb:[.66,.7,1],rim:[150,175,255],d:[-1,-.7],sh:.42,ri:.85},tlhS:{amb:[1,.82,.74],rim:[255,170,100],d:[0,-1],sh:.4,ri:1}});
const HL={amb:[1.06,.98,.9],rim:[255,235,190],d:[1,-.8],sh:.3,ri:1};
// pose de soco do heroi careca: arma o braco -> golpe -> segura
const fastLines=(a,dir=1,y0=0,y1=H)=>{if(a<=0)return'';let s='';for(let i=0;i<26;i++){const y=y0+rnd(i,3.1)*(y1-y0),ph=(GT*5+rnd(i,7.3))%1,x=dir>0?-300+ph*1700:1380-ph*1700,L=200+300*rnd(i,1.9);s+=`<line x1="${x.toFixed(0)}" y1="${y.toFixed(0)}" x2="${(x-dir*L).toFixed(0)}" y2="${y.toFixed(0)}" stroke="#fff" stroke-width="${(3+6*rnd(i,4.2)).toFixed(1)}" stroke-linecap="round" opacity="${(a*(.3+.5*rnd(i,8.8))).toFixed(2)}"/>`}return s};
const DEBRIS=(x,y,t0,s,n=14,col='#7a6a62')=>{const d=GT-t0;if(d<0||d>1.8)return'';let o='';for(let i=0;i<n;i++){const a=-Math.PI/2+(rnd(i,t0+1)-.5)*2.4,v=s*(500+700*rnd(i,t0+2)),px=x+cs(a)*v*d,py=y+sn(a)*v*d+900*s*d*d,z=s*(10+22*rnd(i,t0+3));o+=`<path transform="translate(${px.toFixed(1)} ${py.toFixed(1)}) rotate(${(d*500*(i%2?1:-1)).toFixed(0)})" d="M${-z} ${-z*.5}L${-z*.2} ${-z}L${z} ${-z*.4}L${z*.7} ${z*.7}L${-z*.6} ${z*.6}Z" fill="${col}" stroke="${INK}" stroke-width="${(z*.2).toFixed(1)}" opacity="${cl(2-d*1.2).toFixed(2)}"/>`}return o};
const SHOCK=(x,y,t0,R,col='#fff',life=.7,ry=.35)=>{const d=GT-t0;if(d<0||d>life)return'';const k=d/life,e=1-(1-k)*(1-k);return`<ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(R*e).toFixed(1)}" ry="${(R*e*ry).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${(28*(1-k)+2).toFixed(1)}" opacity="${(1-k).toFixed(2)}"/><ellipse cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" rx="${(R*e*.75).toFixed(1)}" ry="${(R*e*.75*ry).toFixed(1)}" fill="none" stroke="${INK}" stroke-width="${(8*(1-k)).toFixed(1)}" opacity="${(.5*(1-k)).toFixed(2)}"/>`};
const TWINK=(x,y,t0,s=1)=>{const d=GT-t0;if(d<0||d>.7)return'';const k=d/.7,r=s*90*sn(k*Math.PI);return`<path transform="translate(${x} ${y}) rotate(${(k*90).toFixed(0)})" d="M0 ${-r}L${r*.18} ${-r*.18}L${r} 0L${r*.18} ${r*.18}L0 ${r}L${-r*.18} ${r*.18}L${-r} 0L${-r*.18} ${-r*.18}Z" fill="#fff" stroke="${GOLD}" stroke-width="4"/>`};

// ===== 0a) ABERTURA A FRIO: o soco no monstro antes de qualquer explicacao =====
const tH=.72,tLand=2.05,tTiv=wt(1,'tivesse',.1),tPd1=wt(1,'poder',.1),tSai=wt(1,'Saitama',.05),tCap=wt(1,'capaz',0);
shot('cbd',0,(t,u)=>{
 const up=ez(cl(GT/.5)),fly=cl((GT-tH-.1)/1.5),fe=1-(1-fly)*(1-fly);
 // monstro: cabeca estala para tras no impacto e ele sai voando ate virar uma estrela no ceu
 const mx=lp(700,930,fe),my=lp(1190,190,fe)-260*sn(fly*3.1),ms=lp(1.12,.03,fe),mr=lp(0,-540,fe);
 if(fly<1)mon('C',mx,my,ms,{pal:'g',mo:GT<tH?.55+.25*ab(sn(GT*9)):.9,ey:GT<tH+.12?'mad':'ko',ht:GT<tH?-4:lp(0,28,ez(cl((GT-tH)/.15))),hx:GT<tH?0:-30,fr:[260,-380],fl:GT<tH?[-300,-560]:[-280,-300],rot:mr,z:80,hf:inHit([tH],.1)?1:0,noglow:fly>.3});
 // heroi careca: sobe, arma, golpeia, fica no ar (hit-stop) e cai pousando com poeira
 const pc=PUNCH(tH),fall=cl((GT-tH-.25)/(tLand-tH-.25)),hy=GT<tH+.25?lp(1500,450,up):lp(450,1520,fall*fall),hx=GT<tH+.25?lp(330,415,up):lp(415,470,fall);
 const land=GT>tLand,pose=land?{m:'blank',aR:-14,aL:14,sq:SQ(tLand,1.3),look:[0,0]}:{m:GT<tH+.2?'angry':'focus',aR:lp(-20,-95,Math.max(0,pc)),aL:GT<tH?30:40,tilt:6*pc,brow:9,rot:GT<tH+.25?-6:lp(-6,0,fall)};
 put('BAL',0,0,0,{px:[hx,hy],ku:.95,top:1,nodrift:1,nobob:!land,glint:sh1(GT,[tSai],3),...pose});
 const p=C.BAL.sp,A=armPos('BAL',lp(-20,-95,Math.max(0,pc)),1),f=monPt(700,1190,1.12,-120,-800);let s='';
 if(smearOn([tH]))s+=SMEAR(A,'#fff');s+=STARB(f[0],f[1],tH,1.4,GOLD2,.4)+SPARKS(f[0],f[1],tH,1.3)+SHOCK(f[0],f[1],tH,900,'#fff',.6,1)+SHOCK(f[0],f[1],tH+.08,650,GOLD2,.6,1);
 s+=DUST(p[0],1520,tLand,1.1,1)+CRACKS(p[0],1520,1.1,ob(GT,tLand,.3))+DEBRIS(p[0],1520,tLand,1.1)+TWINK(930,190,tH+1.55,1.3);
 if(GT>tH&&GT<tH+.5)s+=fastLines(1-cl((GT-tH)/.5),1,f[1]-260,f[1]+260);fw(s);
 let ui='';if(GT>tTiv)ui+=TXT('E SE VOCÊ TIVESSE',540,250,70,'#fff',-3,pop(GT,tTiv));
 if(GT>tPd1)ui+=TXT('O PODER ABSURDO',540,360,88,GOLD,-3,pop(GT,tPd1));
 if(GT>tSai)ui+=TXT('DO SAITAMA?',540,480,112,'#fff',-3,pop(GT,tSai)*(1+.02*sn(GT*6)))+FIST(540,630,.8*pop(GT,tSai+.12),'#f6c8a0',-12)+RAYS(GT,tSai,540,470,.45,18,GOLD2);
 const Fh=foc(500,380,.55),Fl=foc(500,1250,.15),Fw=foc(540,1000,.02);
 const Fm=foc(700,1190-790*1.12,1.7);camA([[0,1.75,Fm[0],Fm[1],-2],[.3,2.0,Fm[0],Fm[1],1],[.32,.62,Fh[0],Fh[1]+260,-3,'c'],[tH-.05,.42,Fh[0],Fh[1],2],[tH,.7,Fh[0],Fh[1],-2,'c'],[tH+.3,.5,Fh[0],Fh[1],0],[tH+1.1,.12,Fw[0],Fw[1],1],[tLand,.2,Fl[0],Fl[1],0],[tCap,.3,Fl[0],Fl[1]+40,-1]]);
 FX.cz+=.1*sh1(GT,[tH],6);FX.roll+=8*sh1(GT,[tH],5);
 FX.ui=ui;FX.lit=HL;FX.shake=(GT<.32?6:4*cl(1-GT/.4))+44*sh1(GT,[tH],5)**1.5+22*sh1(GT,[tLand],6)+10*sh1(GT,[.32],9);if(GT<.32){FX.vig=.85;FX.grade='contrast(1.2) saturate(1.2)'}FX.flash=Math.max(.6*sh1(GT,[tH],8),.2*sh1(GT,[tLand],9));FX.flcol='255,250,230';FX.chroma=7*sh1(GT,[tH],4);
 FX.impact=GT>=tH&&GT<tH+.085;if(FX.impact)FX.flash=0},'');
// ===== 0b) "capaz de derrotar qualquer inimigo": tres monstros caem em sequencia =====
const tQua=wt(1,'qualquer',.1),tIni1=wt(1,'inimigo',.3),tCom1=wt(1,'com',0),Q3=[tCap+.15,tQua+.05,tIni1];
shot(null,tCap-.12,(t,u)=>{FX.bg=c=>{sky(c,GT,{top:'#3a0d2e',mid:'#a3243c',bot:'#ff8a3d',city:'#2a0f2a',drift:60})};
 const MS=[[230,1500,.62,'a'],[560,1380,.5,'p'],[860,1530,.66,'r']];let s='';
 MS.forEach(([x,y,sc,pal],i)=>{const h=Q3[i],d=GT-h,k=d>0?ez(cl(d/.45)):0;mon(['C','C2','C3'][i],x+(d>0?(i==1?0:(i?1:-1))*120*k:0),y+60*k,sc,{pal,mo:d>0?.2:.6+.2*sn(GT*8+i),ey:d>0?'ko':'mad',rot:(i==2?1:-1)*75*k,ht:d>0?20:0,hf:inHit([h],.09)?1:0,z:70-i});
  const f=[x,y-800*sc];s+=STARB(f[0],f[1],h,1,GOLD2,.35)+SPARKS(f[0],f[1],h,1)+TWINK(f[0],f[1]-80,h+.25,.8)});
 // o heroi aparece colado em cada monstro (teleporte) com imagens residuais
 const i=Q3.reduce((a,h,j)=>GT>h-.18?j:a,0),h=Q3[i],x=MS[i][0]-(i==2?260:-200)*(i==2?1:1),y=MS[i][1]-800*MS[i][2]+330,fl=i==2?1:-1;
 const pc=PUNCH(h);put('BAL',0,0,0,{px:[x,y],ku:.9,top:1,flip:i==2?1:-1,m:'focus',brow:8,aR:lp(-20,-95,Math.max(0,pc)),aL:30,nodrift:1,nobob:1,rot:-8*fl});
 if(smearOn([h]))s+=SMEAR(armPos('BAL',lp(-20,-95,Math.max(0,pc)),1,i==2?1:-1),'#fff');
 Q3.forEach((h2,j)=>{if(j<i&&GT-h2<.6)put(['GB1','GB2'][j%2],0,0,0,{px:[MS[j][0]-(j==2?260:-200),MS[j][1]-800*MS[j][2]+330],ku:.9,flip:j==2?1:-1,m:'focus',still:1,op:(.5*(1-(GT-h2)/.6)).toFixed(2)})});
 fw(s);
 let ui=fastLines(.25,i==2?1:-1);if(GT>tQua)ui+=TXT('QUALQUER',540,300,110,'#fff',-3,pop(GT,tQua))+TXT('INIMIGO',540,425,130,RED,-3,pop(GT,tQua+.15));
 camA([[tCap-.12,.1,0,40,-2],[tCom1,.2,0,0,2]]);FX.cz+=.12*sh1(GT,Q3,8);FX.roll+=5*(sh1(GT,[Q3[0],Q3[2]],6)-sh1(GT,[Q3[1]],6));
 FX.ui=ui;FX.lit={amb:[1.05,.85,.8],rim:[255,150,90],d:[0,-1],sh:.4,ri:1};FX.shake=26*sh1(GT,Q3,6);FX.flash=.5*sh1(GT,Q3,10);FX.flcol='255,240,220';FX.impact=Q3.some(h=>GT>=h&&GT<h+.045);if(FX.impact)FX.flash=0},'flash');
// ===== 0c) "com apenas um soco?": close no punho e no brilho da careca =====
const tAp=wt(1,'apenas',.1),tSoc=wt(1,'soco',.1);
shot('cbd',tCom1-.1,(t,u)=>{
 const r=ob(GT,tAp-.1,.35);put('BAL',0,0,3.4,{sc:2.4,fr:'R',m:GT<tSoc?'cool':'blank',aR:lp(-14,-122,r),aL:14,look:[3,-3],glint:sh1(GT,[tSoc],3),sq:SQ(tAp-.1,.8),brr:1.2});
 const A=armPos('BAL',-122,1),e=eyeP('BAL'),ku=C.BAL.sp[2],q=zpE(A.f);
 fw(STARB(A.f[0]+30*ku,A.f[1]-50*ku,tSoc,ku*.45,GOLD2,.3)+BOLTS(A.f[0],A.f[1],70*ku,GT,.5*r,'#fff'));
 FX.pf=[[A.f[0],A.f[1],140*ku,22,'255,230,160',r,'orbit']];(FX.gls=FX.gls||[]).push([A.f[0],A.f[1],160*ku,'255,220,150',.35*r]);
 let ui='';if(GT>tAp)ui+='';if(GT>tSoc)ui+=TXT('1 SOCO',540,420,170,GOLD,-3,pop(GT,tSoc)*(1+.03*sn(GT*8)))+RAYS(GT,tSoc,q[0],q[1],.45,16,'#fff');
 const F=foc(A.f[0],(A.f[1]+e[1])/2+40*ku,.35);camA([[tCom1-.1,.6,F[0],F[1]+120,-3],[tSoc,.42,F[0],F[1],0,'c'],[ps(2),.5,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=HL;FX.shake=14*sh1(GT,[tSoc],6);FX.flash=.4*sh1(GT,[tSoc],10);FX.flcol='255,250,230'},'zoom');
// ===== 1) treinar ate ultrapassar os limites humanos (3 anos antes) =====
const tDec=wt(2,'decidisse',.2),tTre=wt(2,'treinar',.1),tUlt=wt(2,'ultrapassar',.3),tHum=wt(2,'humanos',.2);
shot('apt',ps(2)-.25,(t,u)=>{
 const fis=ob(GT,tDec,.3);put('CIB',.45,0,-.6,{sc:.95,top:1,m:GT<tDec?'calm':'angry',brow:GT<tDec?0:8,aR:lp(-14,-6,fis),aL:lp(14,6,fis),sq:SQ(tDec,1),look:[0,-2],rot:GT>tDec?.8*sn(GT*30)*fis:0});
 const p=C.CIB.sp,ku=p[2],e=eyeP('CIB');
 // medidor "LIMITE HUMANO": a barra passa da linha e a linha racha
 const mA=ob(GT,tTre-.1,.3),v=GT<tUlt?lp(.15,.78,ez(cl((GT-tTre)/(tUlt-tTre)))):lp(.78,1,ez(cl((GT-tUlt)/.5))),br=GT>tUlt+.2;
 let ui=GT<ps(2)+.9?`<g opacity="${(1-cl((GT-ps(2)-.6)/.3)).toFixed(2)}"><rect x="60" y="150" width="400" height="80" rx="16" fill="#0b0718" opacity=".8"/></g>`+TXT('3 ANOS ANTES...',260,206,46,'#fff',0,1-cl((GT-ps(2)-.6)/.3)):'';
 if(mA>0){const x0=150,y0=1340,w=780;ui+=`<g opacity="${mA.toFixed(2)}"><rect x="${x0-20}" y="${y0-90}" width="${w+40}" height="200" rx="30" fill="#0b0718" opacity=".85" stroke="#fff" stroke-width="6"/><rect x="${x0}" y="${y0}" width="${w}" height="60" rx="30" fill="#2a1b40"/><rect x="${x0+6}" y="${y0+6}" width="${((w-12)*v).toFixed(1)}" height="48" rx="24" fill="${br?GOLD:SKY}"/><rect x="${x0+w*.78-5}" y="${y0-26}" width="10" height="112" fill="${RED}" transform="${br?`rotate(${(14*ob(GT,tUlt+.2,.3)).toFixed(1)} ${x0+w*.78} ${y0+30})`:''}"/></g>`+TXT('LIMITE HUMANO',x0+w*.78,y0-38,38,RED,0,mA)+(br?STARB(x0+w*.78,y0+30,tUlt+.2,.8,GOLD2,.4)+DEBRIS(x0+w*.78,y0+30,tUlt+.2,.6,10,RED):'')}
 if(GT>tTre)ui+=TXT('TREINAR',540,320,140,'#fff',-3,pop(GT,tTre));if(GT>tUlt)ui+='';
 const F=foc(e[0],e[1]+200*ku,.3);camA([[ps(2)-.25,.05,0,0,-1],[tDec,.2,F[0]*.6,F[1]*.6,0],[tUlt,.34,F[0],F[1],1,'c'],[ps(3),.4,F[0],F[1],0]]);
 FX.ui=ui;FX.lit=LIT.apt;FX.vhs=cl(1-(GT-ps(2)+.25)/.5)*.7;FX.grade='contrast(1.04) saturate(.95) sepia(.12)';FX.shake=10*sh1(GT,[tUlt+.2],6)+3*sh1(GT,[tDec],8)},'glitch');
// ===== 2) a rotina: 3 anos | 100 flexoes | 100 abdominais | 100 agachamentos | 10 km | todos os dias =====
const tTres=wt(3,'três',.1),tC1=wn(3,'cem',1,0),tC2=wn(3,'cem',2,0),tC3=wn(3,'cem',3,0),tCor=wt(3,'correria',0),tDez=wt(3,'dez',.1),tTod=wt(3,'todos',0),tDia=wt(3,'dias',.2);
const SW=(a,b,n0,n1)=>Math.round(lp(n0,n1,cl((GT-a)/(b-a))));
// a) tres anos: calendario voando
shot('prq',ps(3)-.15,(t,u)=>{
 const jj=ab(sn(GT*7.5));put('CIB',-.3,0,1.6,{sc:1.0,m:'focus',brow:6,aR:lp(-20,-160,jj),aL:lp(20,160,jj),lg:lp(0,12,jj),bobv:-30*jj,sq:{sx:1-.04*jj,sy:1+.05*jj}});
 let ui='';const a=ob(GT,ps(3),.3);for(let k=0;k<6;k++){const ph=((GT-ps(3))*2.6+k/6)%1,x=lp(720,1250,ph),y=lp(900,300,ph)+80*sn(ph*6+k),r=lp(0,70,ph);ui+=`<g transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${r.toFixed(0)}) scale(${(.7-.3*ph).toFixed(2)})" opacity="${(a*(1-ph)).toFixed(2)}"><rect x="-130" y="-150" width="260" height="300" rx="20" fill="#fff" stroke="${INK}" stroke-width="10"/><rect x="-130" y="-150" width="260" height="80" rx="20" fill="${RED}" stroke="${INK}" stroke-width="10"/><text y="80" font-size="130" text-anchor="middle" fill="${INK}" font-family="Poppins" font-weight="900">${1+((Math.floor((GT-ps(3))*2.6)+k)*7)%28}</text></g>`}
 ui+=`<g opacity="${a.toFixed(2)}" transform="translate(850 720) rotate(6) scale(.5)"><rect x="-250" y="-190" width="500" height="380" rx="30" fill="#fff" stroke="${INK}" stroke-width="12"/><rect x="-250" y="-190" width="500" height="110" rx="30" fill="${RED}" stroke="${INK}" stroke-width="12"/><text y="-112" font-size="64" text-anchor="middle" fill="#fff" font-family="Poppins" font-weight="900">ANO</text><text y="130" font-size="200" text-anchor="middle" fill="${INK}" font-family="Poppins" font-weight="900">${Math.min(3,1+Math.floor(cl((GT-ps(3))/(tC1-.3-ps(3)))*3))}</text></g>`;
 if(GT>tTres)ui+=TXT('3 ANOS',540,330,150,GOLD,-3,pop(GT,tTres));
 camA([[ps(3)-.15,.12,0,60,-2],[tC1,.2,0,60,1]]);FX.ui=ui;FX.lit=LIT.prq},'wl');
// b) 100 flexoes
shot('apt',tC1-.12,(t,u)=>{
 const r=.5+.5*sn((GT-tC1)*9.5),th=lp(57,71,r);put('CIB',-.55,0,-.6,{sc:.9,top:1,m:'strain',brow:8,rot:th,aR:28-th,aL:28-th,lg:0,nobob:1,nodrift:1,bobv:0,look:[6,0],extra:SWEAT(-60,-300,.7*r)});
 const ui=COUNTER(540,330,1,String(SW(tC1,tC2-.15,0,100)),'FLEXÕES',GOLD)+TXT('100',540,210,0,'#fff',0,0);
 const pq=C.CIB.sp||[540,1300,1],Fq=foc(pq[0]+120*pq[2],pq[1]-60*pq[2],.2);camA([[tC1-.12,.14,Fq[0],Fq[1],1],[tC2,.2,Fq[0],Fq[1],-1]]);FX.ui=ui;FX.lit=LIT.apt},'wr');
// c) 100 abdominais
shot('prq',tC2-.12,(t,u)=>{
 const r=.5+.5*sn((GT-tC2)*9.5),th=lp(-88,-28,r);put('CIB',0,0,1.8,{sc:1.05,top:1,m:'strain',brow:8,rot:th,aR:-150,aL:150,nobob:1,nodrift:1,look:[-6,-4],extra:SWEAT(60,-300,.7*r)});
 const ui=COUNTER(540,330,1,String(SW(tC2,tC3-.15,0,100)),'ABDOMINAIS',SKY);
 const pq=C.CIB.sp||[540,1300,1],Fq=foc(pq[0]-100*pq[2],pq[1]-60*pq[2],.12);camA([[tC2-.12,.08,Fq[0],Fq[1],-1],[tC3,.14,Fq[0],Fq[1],1]]);FX.ui=ui;FX.lit=LIT.prq},'wl');
// d) 100 agachamentos
shot('tlhS',tC3-.12,(t,u)=>{
 const r=.5+.5*sn((GT-tC3)*9.5-1.57);put('CIB',0,0,.4,{sc:1.0,m:'strain',brow:8,aR:lp(-30,-92,r),aL:lp(30,92,r),bobv:40*r*C.CIB.sp?.[2]||0,sq:{sx:1+.14*r,sy:1-.2*r},nobob:1,extra:SWEAT(-70,-300,.6*r)});
 const ui=COUNTER(540,330,1,String(SW(tC3,tCor-.15,0,100)),'AGACHAMENTOS','#7dff9a');
 const p=C.CIB.sp,F=foc(p[0],p[1]-150*p[2],.35);camA([[tC3-.12,.15,F[0],F[1],2],[tCor,.2,F[0],F[1],0]]);FX.ui=ui;FX.lit=LIT.tlhS},'wu');
// e) correr 10 km
shot('prq',tCor-.12,(t,u)=>{
 const wk=walk(GT,15,1.3);put('CIB',0,0,2.2,{sc:1.1,m:'strain',brow:7,...wk,look:[0,-2],extra:SWEAT(-80,-290,.6)});
 const p=C.CIB.sp,ku=p[2];let s='';for(let k=0;k<4;k++){const d=((GT*3.2+k/4)%1);s+=`<circle cx="${(p[0]+(k%2?-50:50)*ku-40*d*ku).toFixed(0)}" cy="${(p[1]-10*ku).toFixed(0)}" r="${((18+40*d)*ku).toFixed(0)}" fill="#d8c3a5" opacity="${(.6*(1-d)).toFixed(2)}"/>`}fw(s);
 const km=lp(0,10,cl((GT-tCor)/(tTod-tCor)));let ui=fastLines(.35,-1,200,900)+COUNTER(540,330,1,km.toFixed(1).replace('.',',')+' KM','CORRIDA','#ffb15a');
 const F=foc(p[0],p[1]-170*ku,.2);camA([[tCor-.12,.05,F[0],F[1]+40,-2],[tTod,.42,F[0],F[1],2]]);FX.ui=ui;FX.lit=LIT.prq;FX.shake=3+1.5*ab(sn(GT*15))},'flashO');
// f) todos os dias: o dia e a noite se alternando (cortes rapidos)
{const n=Math.max(4,Math.round((ps(4)-.25-(tTod-.1))/.16)),dt=(ps(4)-.25-(tTod-.1))/n;for(let k=0;k<n;k++){const t0=tTod-.1+k*dt;
 shot(['prq','prqN','prqW'][k%3],t0,(t,u)=>{const wk=walk(GT,15,1.2);put('CIB',0,0,2.2,{sc:1.1,m:'strain',brow:7,...wk});
  let ui=fastLines(.3,-1,200,900)+COUNTER(540,330,1,'DIA '+SW(tTod-.1,ps(4)-.3,1,1095),'TODOS OS DIAS',k%2?SKY:GOLD);
  const p=C.CIB.sp,F=foc(p[0],p[1]-170*p[2],.2);camA([[t0,.12+k*.006,F[0],F[1],0]]);FX.ui=ui;FX.lit=LIT[['prq','prqN','prqW'][k%3]]},k?'':'zoom')}}
// ===== 3) no inicio, o corpo sofre (chuva, noite) =====
const tIn=wt(4,'início',.1),tSof=wt(4,'sofreria',.1),tEsf=wt(4,'esforço',.2);
shot('prqN',ps(4)-.25,(t,u)=>{
 const fall=ob(GT,tEsf,.35),r=GT<tEsf?.5+.5*sn((GT-ps(4))*5):0,th=lp(lp(60,70,r),84,fall),tr=GT<tEsf?2.5*sn(GT*60):0;
 put('CIB',0,0,2.2,{sc:1.05,m:GT<tSof?'strain':'sad',brow:5,rot:th+tr*.3,aR:28-th+tr,aL:28-th-tr,nobob:1,nodrift:1,look:[6,4],extra:SWEAT(-60,-300,.8)+SWEAT(40,-270,.6)});
 const p=C.CIB.sp;let ui=RAIN(1,.22);if(GT>tIn)ui+='';if(GT>tSof)ui+=TXT('SOFRIMENTO',540,300,104,'#8fb4ff',-3,pop(GT,tSof));
 const q=zpS(p[0]+150*p[2],p[1]);ui+=RIP(q[0],q[1]+10,tEsf+.15,.6,320,'#bfd6ff');
 const F=foc(p[0]+120*p[2],p[1]-60*p[2],.45);camA([[ps(4)-.25,.12,F[0],F[1]-60,-2],[tEsf,.22,F[0],F[1],-4],[ps(5),.26,F[0],F[1],-4]]);
 FX.ui=ui;FX.lit=LIT.prqN;FX.vig=.85;FX.fog=1;FX.shake=8*sh1(GT,[tEsf+.15],6);FX.grade='contrast(1.05) saturate(.7) brightness(.92)'},'dip');
// ===== 4) mas voce continuaria, mesmo quando todos diziam que era impossivel =====
const tCon=wt(5,'continuaria',.1),tTodos=wt(5,'todos',0),tDis=wt(5,'dissessem',0),tImp=wt(5,'impossível',.1);
shot('cbd',ps(5)-.2,(t,u)=>{
 const wk=walk(GT,11,1);put('CIB',lp(0,0,0),0,lp(1.6,4.2,ez(cl((GT-ps(5))/(pe(5)-ps(5))))),{sc:1.9,m:'angry',brow:9,...wk,look:[0,-2],extra:SWEAT(-80,-290,.5)});
 const P=[['T1',-2.1,2.4,'IMPOSSÍVEL!'],['T3',2.0,2.0,'DESISTE!'],['R4',-1.9,.9,'LOUCURA!'],['T2',1.8,.6,'NUNCA!']];let ui='';
 P.forEach(([k,x,z,w],i)=>{put(k,x,0,z,{sc:1.7,m:i%2?'smirk':'talkd',talk:GT>tTodos+i*.2?.8:0,tilt:4*sn(GT*3+i),look:[x<0?6:-6,0],flip:x<0?1:-1,aR:-40+20*sn(GT*6+i),aL:20});
  if(GT>tTodos+i*.22){const p=C[k].sp,q=zpS(p[0],p[1]-340*p[2]);ui+=BUBBLE(Math.min(860,Math.max(220,q[0])),Math.max(560,q[1]-40),w,tTodos+i*.22,x<0)}});
 if(GT>tCon)ui+=''+TXT('CONTINUARIA',540,300,104,GOLD,-3,pop(GT,tCon+.12));
 if(GT>tImp)ui+=STAMP(540,1330,tImp,'IMPOSSÍVEL?',RED,96,-6);
 camA([[ps(5)-.2,.08,0,-40,-1],[ps(6),.18,0,-80,1]]);FX.ui=ui;FX.lit=LIT.cbd},'wr');
// ===== 5) milhares de repeticoes... algo inacreditavel =====
const tMil=wt(6,'milhares',.1),tRep=wt(6,'repetições',.2),tAlg=wt(6,'algo',0),tInc=wt(6,'inacreditável',.2);
const RH=[];for(let t=ps(6)+.1,i=0;t<tAlg-.25;t+=i%3==2?.36:.24,i++)RH.push(t);
shot('tlh',ps(6)-.2,(t,u)=>{
 const R=RH.filter((h,i)=>i%2==0),L=RH.filter((h,i)=>i%2==1),cR=pick(R.map(PUNCH)),cL=pick(L.map(PUNCH)),lun=Math.max(0,cR,cL),st=GT>tAlg-.1;
 put('CIB',.08*lun,0,1.4,{sc:1.0,top:1,m:st?'shock':inHit(RH)?'talka':'angry',mry:!st&&inHit(RH)?10:undefined,brow:st?0:8,aR:lp(-20,-95,cR),aL:lp(20,95,cL),tilt:4*(cR-cL),look:st?[0,-8]:[8*(cR-cL),0],bob:.5,sq:st?SQ(tAlg,1.2):{sx:1+.05*lun,sy:1-.04*lun},still:st});
 const p=C.CIB.sp,ku=p[2];let s='';
 R.forEach(h=>{if(smearOn([h]))s+=SMEAR(armPos('CIB',lp(-20,-95,cR),1),'#fff');const A=armPos('CIB',-95,1);s+=STARB(A.f[0]+30*ku,A.f[1],h,ku*.5)});
 L.forEach(h=>{if(smearOn([h]))s+=SMEAR(armPos('CIB',lp(20,95,cL),-1),'#fff');const A=armPos('CIB',95,-1);s+=STARB(A.f[0]-30*ku,A.f[1],h,ku*.5)});
 if(st){const e=eyeP('CIB');(FX.gls=FX.gls||[]).push([e[0],e[1]-60*ku,260*ku,'255,230,150',.5*ob(GT,tInc,.4)]);FX.pf=[[e[0],e[1],300*ku,26,'255,235,170',ob(GT,tInc,.4),'orbit']]}fw(s);
 const n=SW(ps(6),tAlg-.2,0,100000);let ui=COUNTER(540,600,ob(GT,ps(6),.3)*(st?1-cl((GT-tAlg)/.3):1),n.toLocaleString('pt-BR'),'REPETIÇÕES',GOLD,.95);
 if(GT>tMil&&!st)ui+=TXT('MILHARES',540,300,124,'#fff',-3,pop(GT,tMil))+'';
 if(GT>tInc)ui+=''+TXT('INACREDITÁVEL',540,300,96,GOLD,-3,pop(GT,tInc+.1)*(1+.03*sn(GT*9)));
 const e=eyeP('CIB'),Fp=foc(p[0],p[1]-150*ku,.45),Fe=foc(e[0],e[1]+80*ku,1.1);camA([[ps(6)-.2,.15,Fp[0],Fp[1],-2],[tAlg-.12,.3,Fp[0],Fp[1],2],[tAlg,1.0,Fe[0],Fe[1],0,'c'],[ps(7),1.15,Fe[0],Fe[1],0]]);
 const tr=sh1(GT,RH,9);FX.cz+=.05*tr*(st?0:1);FX.ui=ui;FX.lit=LIT.tlh;FX.shake=st?3*sh1(GT,[tAlg],4):2+14*tr*tr;FX.flash=Math.max(st?0:.1*sh1(GT,RH,20),.7*sh1(GT,[tAlg],7));FX.flcol='255,255,255';FX.vig=st?.9:.5},'flash');
// ===== 6a) musculos extremamente resistentes =====
const tMus=wt(7,'músculos',.1),tExt=wt(7,'extremamente',.2),tRes=wt(7,'resistentes',.3),tSua=wt(7,'sua',0),tVel=wt(7,'velocidade',.2),tAum=wt(7,'aumentaria',.3),tDe=wt(7,'repente',0)-.2;
const STATS=(a,f,r,v)=>a<=0?'':`<g opacity="${a.toFixed(2)}"><rect x="110" y="500" width="860" height="360" rx="34" fill="#0b0718" opacity=".86" stroke="${GOLD}" stroke-width="6"/></g>`+BAR(160,580,760,'FORÇA',f,RED,a,f>.99)+BAR(160,690,760,'RESISTÊNCIA',r,GOLD,a,r>.99)+BAR(160,800,760,'VELOCIDADE',v,SKY,a,v>.99);
shot('prq',ps(7)-.2,(t,u)=>{
 const fx=ob(GT,tMus-.1,.35),pw=ob(GT,tRes,.3);put('CIB',0,0,1.8,{sc:1.15,m:GT<tRes?'strain':'grin',brow:8,aR:lp(-14,-150,fx)+6*sn(GT*30)*(1-pw),aL:lp(14,150,fx)-6*sn(GT*30)*(1-pw),sq:SQ(tRes,1.2),look:[0,-4]});
 const p=C.CIB.sp,ku=p[2],c0=chestP('CIB');let s='';
 s+=TWINK(c0[0]-90*ku,c0[1]-160*ku,tRes,1)+TWINK(c0[0]+100*ku,c0[1]-60*ku,tRes+.2,.8);fw(s);
 let ui=STATS(ob(GT,tMus,.3),lp(.3,1,ez(cl((GT-tMus)/.8))),lp(.25,1,ez(cl((GT-tExt)/.9))),.3);if(GT>tMus)ui+=TXT('MÚSCULOS',540,300,120,'#fff',-3,pop(GT,tMus));if(GT>tRes)ui+='';
 const F=foc(c0[0],c0[1]-140*ku,.3);camA([[ps(7)-.2,.2,F[0],F[1],-2],[tRes,.36,F[0],F[1],0,'c'],[tSua,.4,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=LIT.prq;FX.shake=8*sh1(GT,[tRes],6);FX.flash=.3*sh1(GT,[tRes],10);FX.flcol='255,240,200';FX.pf=[[c0[0],c0[1],260*ku,20,'255,220,140',pw,'rise']]},'zoom');
// ===== 6b) velocidade aumentaria =====
shot('prq',tSua-.15,(t,u)=>{
 const ZP=[tVel-.15,tVel+.25,tAum-.05,tAum+.3],xs=[0,-1.3,1.3,-.8,.8],ix=ZP.reduce((a,h,j)=>GT>h?j+1:a,0);
 put('CIB',xs[ix],0,1.8,{sc:1.15,m:'focus',brow:8,aR:-30,aL:30,look:[0,0],rot:ix%2?6:-6,nobob:1});
 ZP.forEach((h,j)=>{const d=GT-h;if(d>0&&d<.45)put('GC1',xs[j],0,1.8,{sc:1.15,m:'focus',still:1,op:(.5*(1-d/.45)).toFixed(2)})});
 const p=C.CIB.sp;let ui=STATS(1,1,1,lp(.3,1,ez(cl((GT-tVel)/(tAum-tVel+.3)))))+fastLines(.5*sh1(GT,ZP,3),ix%2?1:-1,500,1200);
 ZP.forEach(h=>ui+=SHOCK(zpS(p[0],p[1])[0],zpS(p[0],p[1])[1]-20,h,380,'#fff',.4,.3));
 if(GT>tVel)ui+=TXT('VELOCIDADE',540,300,118,SKY,-3,pop(GT,tVel));if(GT>tAum)ui+='';
 camA([[tSua-.15,.12,0,-80,0],[tDe,.15,0,-80,0]]);FX.cz+=.06*sh1(GT,ZP,8);FX.ui=ui;FX.lit=LIT.prq;FX.shake=10*sh1(GT,ZP,8)},'wr');
// ===== 6c) de repente... os cabelos comecam a cair =====
const tCab=wt(7,'cabelos',.2),tCom7=wt(7,'começariam',.2),tCai=wt(7,'cair',.1);
const FALL1=[[2,tCab],[0,tCom7],[6,tCom7+.25],[9,tCai],[4,tCai+.2]];
let HMASK=1023;const hm=L=>L.reduce((m,[i,t0])=>GT>=t0?m&~(1<<i):m,1023);
shot('apt',tDe,(t,u)=>{
 const m=hm(FALL1);put('CHR',.45,0,-.6,{sc:.95,top:1,hatS:HOODN(m),hv:'h'+m,m:GT<tCab?'calm':'shock',brow:GT<tCab?0:10,look:GT<tCab?[0,0]:[0,-11],aR:-14,aL:14,sq:SQ(tCab,.8),extra:HAIRFALL(FALL1),still:GT>tCab});
 const p=C.CHR.sp,ku=p[2],e=eyeP('CHR');let ui='';if(GT>tDe+.15&&GT<tCab)ui+=TXT('DE REPENTE...',540,300,96,'#fff',-3,pop(GT,tDe+.15));
 if(GT>tCab)ui+=TXT('O CABELO?!',540,300,110,'#ffb7a0',-3,pop(GT,tCab))+(GT>tCai?'':'');
 const F=foc(e[0],e[1]+260*ku,.5),F2=foc(e[0],e[1]+200*ku,.7);camA([[tDe,.4,F[0],F[1],0],[tCab,.55,F[0],F[1],0,'c'],[ps(8),.7,F2[0],F2[1],-2]]);
 FX.ui=ui;FX.lit=LIT.apt;FX.vig=.7;FX.shake=4*sh1(GT,[tCab,tCai],8)},'dip');
// ===== 7) ate ficar completamente careca! =====
const tFic=wt(8,'ficar',.1),tCpl=wt(8,'completamente',.1),tCar=wt(8,'careca',0);
const FALL2=[[1,tFic],[3,tFic+.12],[5,tCpl],[7,tCpl+.15],[8,tCpl+.3]];
shot('apt',ps(8)-.15,(t,u)=>{
 const bald=GT>=tCar,m=hm([...FALL1,...FALL2]);
 if(!bald)put('CHR',.45,0,-.6,{sc:.95,top:1,hatS:HOODN(m),hv:'h'+m,m:'shock',brow:10,look:[0,-11],aR:-14,aL:14,still:1,extra:HAIRFALL(FALL2),sq:SQ(tFic,.6)});
 else put('BAL',.45,0,-.6,{sc:.95,top:1,m:'blank',look:[0,0],aR:-14,aL:14,still:1,glint:Math.max(sh1(GT,[tCar+.15],2.2),.25),wind:.2,extra:HOODFLY(tCar,-1)+HAIRFALL(FALL2),sq:SQ(tCar,1.4)});
 const k=bald?'BAL':'CHR',p=C[k].sp,ku=p[2],e=eyeP(k),hd=[e[0],e[1]-70*ku],q=zpE(hd);
 if(bald){FX.rays=[[hd[0]-30*ku,hd[1]-30*ku,.55*sh1(GT,[tCar],1.2)+.12,'255,250,220',18,1500]];(FX.gls=FX.gls||[]).push([hd[0]-30*ku,hd[1]-40*ku,200*ku,'255,255,230',.6*sh1(GT,[tCar+.1],1.5)])}
 let ui='';if(bald)ui+=TXT('CARECA!',540,330,165,'#fff',-5,pop(GT,tCar)*(1+.04*sn(GT*12)))+RAYS(GT,tCar,q[0],q[1],.5,22,'#fff')+TWINK(q[0]-60,q[1]-60,tCar+.25,1.4);
 else if(GT>tCpl)ui+='';
 const F=foc(e[0],e[1]+200*ku,.75),Fw=foc(e[0],e[1]+260*ku,.4);camA([[ps(8)-.15,.7,F[0],F[1],0],[tCar-.05,.9,F[0],F[1],1],[tCar,.4,Fw[0],Fw[1],-3,'c'],[ps(9),.46,Fw[0],Fw[1],-2]]);
 FX.ui=ui;FX.lit=LIT.apt;FX.shake=4*sh1(GT,[tFic,tFic+.12,tCpl,tCpl+.15,tCpl+.3],12)+22*sh1(GT,[tCar],5);FX.flash=.55*sh1(GT,[tCar],8);FX.flcol='255,255,245';FX.chroma=6*sh1(GT,[tCar],4)},'zoom');
// ===== 8) a menor das preocupacoes =====
const tMen=wt(9,'menor',.1),tPre=wt(9,'preocupações',.2);
shot('tlhS',ps(9)-.2,(t,u)=>{
 const sr=ob(GT,tMen-.1,.4)*(1-ob(GT,pe(9)-.1,.3));put('BAL',0,0,.6,{sc:1,m:GT<tMen?'blank':'cool',aR:lp(-14,-70,sr),aL:lp(14,70,sr),tilt:-6*sr,look:[4,-2],glint:.3,wind:1});
 const hp=P3(.8,0,1.0);sprite(`<g transform="rotate(82)">${HOODN(0)}</g>`,hp[0],hp[1]-10,hp[2]*.9,hp[3]+.1,'C',0,1);
 let ui='';if(GT>tMen)ui+=''+'';
 const e=eyeP('BAL'),ku=C.BAL.sp[2],F=foc(e[0],e[1]+160*ku,.3);camA([[ps(9)-.2,.15,F[0],F[1]+60,-1],[ps(10),.32,F[0],F[1],1]]);FX.ui=ui;FX.lit=LIT.tlhS;FX.vig=.5},'wl');
// ===== 9a) saltar por cima de predios =====
const tSal=wt(10,'saltar',.1),tPre2=wt(10,'prédios',.2),tCorr=wt(10,'correr',0),tVab=wt(10,'velocidades',.2),tEnf=wt(10,'enfrentar',0),tGig=wt(10,'gigantescos',.2),tMed=wt(10,'medo',.1);
shot('cbd',ps(10)-.2,(t,u)=>{
 const tJ=tSal+.18,cr=GT<tJ?ob(GT,tSal-.35,.3):0,j=cl((GT-tJ)/(tCorr-.15-tJ)),je=ez(j);
 let px,py,ku;if(GT<tJ){const p=P3(0,0,3.4);px=p[0];py=p[1];ku=p[2]*2.2}else{px=lp(540,1000,je);py=lp(1690,1250,je)-1150*sn(Math.min(1,j*1.1)*Math.PI*.92);ku=lp(.95,.5,je)}
 if(GT<tJ)put('BAL',0,0,3.4,{sc:2.2,m:'focus',brow:6,aR:lp(-14,40,cr),aL:lp(14,-40,cr),sq:{sx:1+.15*cr,sy:1-.22*cr},bobv:30*cr,nobob:1,glint:.3,wind:.6});
 else put('BAL',0,0,0,{px:[px,py],ku:Math.max(.3,ku),top:1,m:'cool',aR:-160,aL:40,rot:lp(-10,25,j),nodrift:1,nobob:1,lg:20,glint:.5,wind:2});
 const g=P3(0,0,3.4);fw(DUST(g[0],g[1],tJ,1.8,1)+CRACKS(g[0],g[1],1.6,ob(GT,tJ,.3))+DEBRIS(g[0],g[1],tJ,1.4)+SHOCK(g[0],g[1],tJ,700,'#fff',.6,.3));
 let ui=GT>tJ?fastLines(.25,1):'';if(GT>tSal)ui+=TXT('SALTAR',540,280,130,'#fff',-3,pop(GT,tSal));if(GT>tPre2)ui+='';
 const Fg=foc(g[0],g[1]-300,.25);camA([[ps(10)-.2,.2,Fg[0],Fg[1],-1],[tJ,.3,Fg[0],Fg[1],0],[tJ+.01,.06,0,60,0,'c'],[tCorr,.0,0,0,3]]);
 FX.ui=ui;FX.lit=HL;FX.shake=24*sh1(GT,[tJ],5);FX.flash=.3*sh1(GT,[tJ],10);FX.flcol='255,255,255'},'flash');
// ===== 9b) correr em velocidades absurdas =====
shot('zghN',tCorr-.12,(t,u)=>{
 const k=cl((GT-tCorr)/(tEnf-.2-tCorr)),pass=[tCorr+.15,tVab+.15,tVab+.55],ix=pass.reduce((a,h,j)=>GT>h?j+1:a,0),xs=[-3,3,-3,3];
 const wk=walk(GT,24,1.5);put('BAL',lp(-2.2,2.2,((GT-tCorr)*.9)%1),0,2.6,{sc:1.25,m:'blank',...wk,rot:14,glint:.3,wind:2.5,op:.95});
 for(let g=1;g<=2;g++)put(['GB1','GB2'][g-1],lp(-2.2,2.2,((GT-tCorr-.06*g)*.9)%1),0,2.6,{sc:1.25,m:'blank',still:1,rot:14,op:(.4-.15*g).toFixed(2)});
 const p=C.BAL.sp;let ui=fastLines(.9,1,300,1700)+SHOCK(zpS(p[0],p[1])[0],zpS(p[0],p[1])[1]-120,tVab,520,'#fff',.5,1)+SHOCK(zpS(p[0],p[1])[0],zpS(p[0],p[1])[1]-120,tVab+.4,520,SKY,.5,1);
 const sp=Math.round(lp(120,1500,ez(k)));ui+=`<g transform="translate(540 780) scale(.8)"><path d="M-260 0A260 260 0 0 1 260 0" fill="none" stroke="#fff" stroke-width="18" opacity=".35"/><path d="M-260 0A260 260 0 0 1 ${(-260*cs(Math.PI*k)).toFixed(1)} ${(-260*sn(Math.PI*k)).toFixed(1)}" fill="none" stroke="${RED}" stroke-width="22" stroke-linecap="round"/><line x1="0" y1="0" x2="${(-230*cs(Math.PI*k)).toFixed(1)}" y2="${(-230*sn(Math.PI*k)).toFixed(1)}" stroke="#fff" stroke-width="12" stroke-linecap="round"/><circle r="26" fill="#fff" stroke="${INK}" stroke-width="8"/></g>`+TXT(sp+' KM/H',540,870,64,'#fff',0,1);
 if(GT>tCorr)ui+='';if(GT>tVab)ui+='';
 camA([[tCorr-.12,.25,0,-150,-3],[tEnf,.32,0,-150,3]]);FX.ui=ui;FX.lit=LIT.zghN;FX.shake=6+10*sh1(GT,[tVab,tVab+.4],6);FX.chroma=4},'wr');
// ===== 9c) enfrentar monstros gigantescos sem sentir medo =====
shot('zghN',tEnf-.2,(t,u)=>{
 const ro=ob(GT,tEnf,.5);mon('C',600,1520+(1-ro)*400,1.0,{pal:'p',mo:.75+.2*ab(sn(GT*11)),ey:'mad',fr:[300,-520],fl:[-260,-260+60*sn(GT*4)],ht:6*sn(GT*13),z:90});
 const yw=GT>tSem?ob(GT,tSem,.3):0;put('BAL',-.3,0,4.6,{sc:2.4,fr:'R',m:yw>.5&&GT<tMed+.6?'wow':'blank',aR:yw>.5?-150:-14,aL:14,look:[3,-6],glint:.3,wind:1.5,still:1});
 const p=C.BAL.sp;let ui='';if(GT>tGig)ui+='';if(GT>tSem)ui+=TXT('SEM MEDO',540,300,140,'#fff',-3,pop(GT,tSem));
 ui+=ECG(ob(GT,tSem,.3),60,tSem,540,1330,700);
 const F=foc(p[0],p[1]-300,.12);camA([[tEnf-.2,.05,0,80,-2],[tSem-.05,.22,F[0],F[1],0],[ps(11),.26,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=LIT.zghN;FX.shake=4+10*sh1(GT,[tEnf],4);FX.vig=.7},'dip');
const tSem=wt(10,'sem',0);
// ===== 10) um inimigo colossal surge no meio da cidade =====
const tCol=wt(11,'colossal',.1),tSur=wt(11,'surgiria',0),tCid=wt(11,'cidade',.2);
shot('cbdS',ps(11)-.2,(t,u)=>{
 const ri=ob(GT,tSur-.2,1.4),rOff=(1-ri)*1100;mon('C',540,1175+rOff,.95,{clip:-rOff/.95,pal:'a',mo:GT>tCid?.85:.3,ey:'mad',fr:[290,-430+40*sn(GT*2)],fl:[-290,-430],ht:3*sn(GT*1.7),z:95});
 const pp=[['T1',-1.2,1.8,0],['T2',.9,2.4,1],['T3',-.3,3.0,2],['R5',1.6,3.5,3]];pp.forEach(([k,x,z,i])=>{const wk=walk(GT+i,16,1.3);put(k,x+.2*sn(GT*2+i),0,z+((GT-ps(11))*1.2)%1.5,{sc:1.6,m:'scared',brow:8,...wk,extra:SWEAT(-80,-300,.8)})});
 if(GT>tCid+.3){const k=cl((GT-tCid-.3)/1.2);put('BAL',0,0,lp(4.6,2.2,k),{sc:2,sil:1,...walk(GT,16,1.2),wind:2})}
 let ui='';if(GT>tCol)ui+=TXT('COLOSSAL',540,300,160,RED,-3,pop(GT,tCol)*(1+.03*sn(GT*9)));if(GT>tCid)ui+='';
 fw(DEBRIS(540,1150,tSur,1.2,18)+DEBRIS(300,1180,tSur+.3,.9,10)+DEBRIS(800,1180,tSur+.5,.9,10));
 camA([[ps(11)-.2,.0,0,60,-2],[tSur,.0,0,40,0],[ps(12),.06,0,-40,1]]);
 FX.ui=ui;FX.lit=LIT.cbdS;FX.shake=6+20*ri*(1-ri)*4*(GT<tCid+1?1:.3);FX.tint=[160,0,30,.1];FX.fog=1},'dip');
// ===== 11-12) SEQUENCIA DO SOCO (encarada -> arrancada -> volta pelas costas -> punho -> soco -> freeze -> onda de choque) =====
const tLev=wt(12,'levantaria',.1),tPun=wt(12,'punho',.1),tDst=wt(12,'destruir',.2),tTud=wt(12,'tudo',.1);
const tDsv=wt(13,'desviaria',0),tGol=wt(13,'golpe',0),tApa=wt(13,'apareceria',0),tAtr=wt(13,'atrás',.1),tAce=wt(13,'acertaria',0),tSo2=wt(13,'soco',.15),tPod=wt(13,'poderoso',.1),tQue=wt(13,'que',0),tVen=wt(13,'vento',.1),tNuv=wt(13,'nuvens',.1);
const MX=600,MY=1185,MS=1.0,tDash=tDsv-.1,tSlam=tDsv+.28,tFist=Math.max(tAtr+.5,tAce-.35),tLat=tFist+.5,tHit=Math.max(tSo2,tLat+.42),tFz=tHit+.05,tRel=tHit+.42;
// vento: poeira e pedacinhos de entulho subindo e passando pela tela (unidades de tela)
const WINDDUST=(a,dir=-1,k=1)=>{if(a<=0)return'';let s='';for(let i=0;i<46;i++){const sp=.25+.5*rnd(i,3.1),ph=(GT*sp*k+rnd(i,7.7))%1,x=dir<0?1180-ph*1400:-100+ph*1400,y=600+rnd(i,2.9)*1300-ph*260*rnd(i,4.4)+30*sn(GT*2+i),z=rnd(i,5.5);
 s+=i%3?`<ellipse cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" rx="${(30+60*z).toFixed(0)}" ry="${(10+16*z).toFixed(0)}" fill="#e8c9a4" opacity="${(a*.22*sn(ph*3.14)).toFixed(2)}"/>`:`<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(GT*300*(i%2?1:-1)+i*50).toFixed(0)})" d="M-${(6+8*z).toFixed(0)} -4L0 -${(8+8*z).toFixed(0)}L${(8+8*z).toFixed(0)} 2L2 ${(7+6*z).toFixed(0)}Z" fill="#6e6058" stroke="${INK}" stroke-width="3" opacity="${(a*.9*sn(ph*3.14)).toFixed(2)}"/>`}return s};
// linhas radiais de foco (estilo manga) para o freeze frame
const FOCUSL=(cx,cy,a,seed=0)=>{if(a<=0)return'';let s='';for(let i=0;i<64;i++){const an=i/64*6.283+rnd(i,seed+1)*.08,r1=260+160*rnd(i,seed+2),w=.012+.02*rnd(i,seed+3);s+=`<path d="M${(cx+cs(an-w)*r1).toFixed(0)} ${(cy+sn(an-w)*r1).toFixed(0)}L${(cx+cs(an)*2300).toFixed(0)} ${(cy+sn(an)*2300).toFixed(0)}L${(cx+cs(an+w)*r1).toFixed(0)} ${(cy+sn(an+w)*r1).toFixed(0)}Z" fill="${i%2?'#fff':INK}" opacity="${(a*(i%2?.55:.8)).toFixed(2)}"/>`}return s};
// punho gigante em close: os dedos se fecham (k 0 -> 1)
const BIGFIST=(x,y,s,k,sh=0)=>{const sk='#f6c8a0',L=lp(150,46,ez(k));let f='';[-78,-26,26,78].forEach((dx,i)=>{const l=L*(1-.08*ab(i-1.5)),cy=-60;f+=`<rect x="${dx-24}" y="${(cy-l).toFixed(1)}" width="48" height="${(l+40).toFixed(1)}" rx="24" fill="${sk}" stroke="${INK}" stroke-width="10"/>`+(k>.6?`<path d="M${dx-16} ${(cy-l+14).toFixed(1)}Q${dx} ${(cy-l+4).toFixed(1)} ${dx+16} ${(cy-l+14).toFixed(1)}" stroke="${INK}" stroke-width="6" fill="none"/>`:'')});
 return`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${s.toFixed(3)}) rotate(${sh.toFixed(1)})"><path d="M-120-60Q-128 120-40 150H70Q130 120 122-60Z" fill="${sk}" stroke="${INK}" stroke-width="12" stroke-linejoin="round"/>${f}<g transform="rotate(${lp(-50,8,ez(k)).toFixed(1)} -110 40)"><rect x="-170" y="10" width="110" height="54" rx="27" fill="${sk}" stroke="${INK}" stroke-width="10"/></g><path d="M-60 60Q0 80 60 60" stroke="rgba(0,0,0,.18)" stroke-width="10" fill="none"/><path d="M-92-${(L+30).toFixed(0)}Q-70-${(L+52).toFixed(0)}-40-${(L+40).toFixed(0)}" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" opacity=".7"/><rect x="-130" y="140" width="260" height="140" fill="#1c1620" stroke="${INK}" stroke-width="12"/><rect x="-136" y="150" width="272" height="30" fill="#e8343f" stroke="${INK}" stroke-width="8"/></g>`};
document.body.insertAdjacentHTML('beforeend','<svg width="0" height="0" style="position:absolute"><filter id="mbp" x="-10%" y="-5%" width="120%" height="110%"><feGaussianBlur id="mbpg" stdDeviation="0 0"/></filter></svg>');
// monstro como "billboard" no mundo 3D: fica no mesmo lugar em qualquer angulo de camera
const MW={x:1.14,z:-28.25,h:20.3};
const monProj=(wx=MW.x,wz=MW.z,wy=0)=>{const P=CSH.pl,f=pj(P.VP,wx,wy,wz),t=pj(P.VP,wx,wy+MW.h,wz);return[f[0],f[1],Math.hypot(t[0]-f[0],t[1]-f[1])/1000,f[2]]};
const monW=(sl,o={},wx,wz)=>{const m=monProj(wx,wz);mon(sl,m[0],m[1],m[2],{z:m[3],...o});return m};
const tP0=tHit-.3,tPunch=tHit-.06,tFz2=tHit+.05,tRel2=tHit+.33,tWide=tRel2+.3;
// 1) AMEACA: contra-plongee por cima do ombro do heroi; o monstro ruge e ergue o punho
shot('cbdR_low',ps(12)-.15,(t,u)=>{
 const rz=ob(GT,tLev,1.0),ro=Math.max(0,sn(cl((GT-tLev+.2)/1.3)*Math.PI));
 const m=monW('C',{pal:'a',mo:.35+.6*ro,ey:'mad',fr:[lp(290,160,rz),lp(-430,-1020,rz)],bigF:lp(92,125,rz),fl:[-300,-420+30*sn(GT*2)],ht:2*sn(GT*1.5)+4*ro});
 put('BAL',-.35,0,3.0,{sil:1,still:1,wind:3,aR:-10,aL:10,sc:1});
 const hd=[m[0],m[1]-800*m[2]];(FX.gls=FX.gls||[]).push([hd[0]-70*m[2],hd[1],140*m[2],'255,30,60',.5],[hd[0]+70*m[2],hd[1],140*m[2],'255,30,60',.5]);
 let s=WINDDUST(.9,-1);const fh=monPt(m[0],m[1],m[2],lp(290,160,rz),lp(-430,-1020,rz));s+=DEBRIS(fh[0],fh[1],tLev+.6,1.3,14,'#5a4a4a');fw(s);
 const F=foc(hd[0],hd[1]+500*m[2],.05);camA([[ps(12)-.15,.0,F[0]*.3,F[1]*.3+120,-3],[tDst-.25,.14,F[0]*.6,F[1]*.6,1]]);
 FX.ui='';FX.lit={amb:[.7,.5,.55],rim:[255,80,80],d:[.3,-1],sh:.5,ri:1};FX.shake=2+9*ro;FX.vig=.8;FX.tint=[150,0,30,.08];FX.grade='contrast(1.15) saturate(1.05)'},'flashR');
// 2) O HEROI OBSERVA: contraplano no rosto, luz do por do sol de frente; a sombra do punho cobre o quadro
shot('cbdR_rev',tDst-.25,(t,u)=>{
 const k=cl((GT-tDst+.25)/(tTud+.5-tDst)),dn=ez(cl((GT-tTud+.05)/.3));
 put('BAL',-.35,0,3.0,{sc:1.05,m:GT<tDst?'blank':'stare',brow:GT<tDst?0:5,aR:-12,aL:12,look:[1,-5],still:1,noblink:GT>tDst+.2,glint:.6,wind:2.5+1.5*k});
 const p=C.BAL.sp,ku=p[2],e=eyeP('BAL');
 let s=WINDDUST(.6+.4*k,1,1.3);for(let i=0;i<10;i++){const ph=((GT-tDst)*(.5+.3*rnd(i,2.2))+rnd(i,4.1))%1,x=p[0]+(rnd(i,6.3)-.5)*520*ku,y=p[1]-ph*500*ku;s+=`<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(GT*200+i*36).toFixed(0)})" d="M-9-6L-2-12L10-4L6 9L-8 7Z" fill="#7a6a62" stroke="${INK}" stroke-width="3" opacity="${(sn(ph*3.14)).toFixed(2)}"/>`}fw(s);
 let ui=dn>0?`<rect x="0" y="0" width="1080" height="${(1920*dn*.6).toFixed(0)}" fill="url(#shdg)" opacity="${(.8*dn).toFixed(2)}"/>`:'';
 (FX.gls=FX.gls||[]).push([p[0]+380,p[1]-900*ku,700,'255,40,60',.16+.1*sn(GT*6)]);
 const F0=foc(e[0],e[1]+240*ku,.3),F1=foc(e[0],e[1]+40*ku,1.9);camA([[tDst-.25,.3,F0[0],F0[1],2],[tTud+.25,1.9,F1[0],F1[1],-1]]);
 FX.ui=ui;FX.lit={amb:[1.08,.86,.74],rim:[255,60,80],d:[-1,-.3],sh:.38,ri:1};FX.vig=.55+.3*k;FX.shake=1+2*k+6*dn;FX.grade=`contrast(${(1.08+.12*k).toFixed(2)}) saturate(1.08)`},'');
// 3) O ATAQUE: o punho gigante desce sobre o heroi (plano aberto, heroi em silhueta)
shot('cbdS',tTud+.25,(t,u)=>{
 const g=P3(-.35,0,3.0),tg=[(g[0]-MX)/MS,(g[1]-MY)/MS-180],wu=ez(cl((GT-tTud-.25)/.35)),dn=ez(cl((GT-tTud-.6)/(tDash-.12-tTud-.6)));
 const fx=lp(lp(160,240,wu),tg[0]*.55,dn),fy=lp(lp(-1020,-1120,wu),tg[1]*.6,dn);
 monW('C',{pal:'a',mo:.9,ey:'mad',fr:[fx,fy],bigF:125+40*dn,fl:[-300,-430],ht:-6*wu+10*dn});
 put('BAL',-.35,0,3.0,{sc:1.3,sil:1,still:1,wind:4,aR:-10,aL:10});
 let s=dn>0?fastLines(.6*dn,1,0,1200).replace(/x1/g,'x1'):'';const fp=monPt(MX,MY,MS,fx,fy);(FX.gls=FX.gls||[]).push([fp[0],fp[1],300+300*dn,'255,40,60',.35]);
 if(dn>0){for(let i=0;i<14;i++){const a=rnd(i,4.4)*6.283,r=160+120*rnd(i,2.1);s+=`<line x1="${(fp[0]+cs(a)*r).toFixed(0)}" y1="${(fp[1]+sn(a)*r-200*dn).toFixed(0)}" x2="${(fp[0]+cs(a)*r).toFixed(0)}" y2="${(fp[1]+sn(a)*r-200*dn-260*dn).toFixed(0)}" stroke="#fff" stroke-width="6" stroke-linecap="round" opacity="${(.6*dn).toFixed(2)}"/>`}}
 fw(s+WINDDUST(.8,-1,1.5));
 const F=foc(g[0],g[1]-600,.1),F2=foc(lp(g[0],fp[0],.5),lp(g[1]-300,fp[1],.5),.22);camA([[tTud+.25,.04,F[0],F[1],0],[tTud+.6,.06,F[0],F[1],-1],[tDash-.12,.22,F2[0],F2[1],3]]);
 FX.ui='';FX.lit=LIT.cbdS;FX.shake=3+14*dn;FX.vig=.75;FX.tint=[150,0,30,.07];FX.grade='contrast(1.14) saturate(1.05)'},'');
document.querySelector('#SV defs').insertAdjacentHTML('beforeend','<linearGradient id="shdg" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#05020a" stop-opacity="1"/><stop offset="1" stop-color="#05020a" stop-opacity="0"/></linearGradient>');
// 4-5) ESQUIVA + TRAVELLING: camera lateral acompanhando a arrancada; o punho explode o asfalto onde ele estava
shot('cbdR_side',tDash-.12,(t,u)=>{
 const d=GT-tDash,acc=cl(d/.45),run=d>0,zz=run?lp(3.0,2.05,ez(cl(d/1.2))):3.0;
 const wk=walk(GT,30,1.7);put('BAL',-.35,0,zz,{sc:1.15,m:'focus',brow:8,...(run?wk:{}),aR:run?60+10*sn(GT*30):-30,aL:run?-60-10*sn(GT*30):30,rot:run?lp(0,22,acc):-6,sq:run?{sx:1+.07*acc,sy:1-.05*acc}:SQ(tDash,1.7),nobob:!run,glint:.5,wind:4,top:1,flip:1});
 const p=C.BAL.sp,ku=p[2];let s='';
 if(run){for(let gI=1;gI<=2;gI++){const dd=d-.07*gI;if(dd>0)put(['GB1','GB2'][gI-1],-.35,0,lp(3.0,2.05,ez(cl(dd/1.2))),{sc:1.15,m:'focus',rot:22*cl(dd/.45),op:(.42-.14*gI).toFixed(2)})}
  const tx=p[0]-40*ku,ty=p[1]-150*ku;s+=`<path d="M${tx.toFixed(0)} ${ty.toFixed(0)}Q${(tx-300).toFixed(0)} ${(ty+20*sn(GT*9)).toFixed(0)} ${(tx-820*acc).toFixed(0)} ${(ty+50).toFixed(0)}" stroke="${GOLD2}" stroke-width="${(34*ku*acc).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".45"/><path d="M${tx.toFixed(0)} ${ty.toFixed(0)}Q${(tx-280).toFixed(0)} ${ty.toFixed(0)} ${(tx-760*acc).toFixed(0)} ${(ty+40).toFixed(0)}" stroke="#fff" stroke-width="${(11*ku*acc).toFixed(1)}" fill="none" stroke-linecap="round" opacity=".85"/>`;
  for(let i=0;i<16;i++){const age=((GT*6+i/16)%1),x=p[0]-age*1000*acc-30,y=p[1]-8*ku-age*70;s+=`<circle cx="${x.toFixed(0)}" cy="${y.toFixed(0)}" r="${((22+70*age)*ku).toFixed(0)}" fill="#e2c7a5" stroke="${INK}" stroke-width="3" opacity="${(.7*(1-age)*acc).toFixed(2)}"/>`}}
 const g=P3(-.35,0,3.0),dn=ez(cl((GT-tSlam+.22)/.22));if(GT<tSlam+.45){const fy=lp(-600,g[1]-230,dn);s+=HAND(g[0],fy,Math.PI/2,2.1,KJP.a,.5)}
 s+=SHOCK(g[0],g[1],tSlam,1200,'#fff',.8,.3)+DUST(g[0],g[1],tSlam,1.6,1.2)+CRACKS(g[0],g[1],1.6,ob(GT,tSlam,.3))+DEBRIS(g[0],g[1],tSlam,1.3,24);fw(s);
 let ui=run?fastLines(.45+.5*acc,-1,700,1800):'';
 // travelling: a camera acompanha o heroi lateralmente, o fundo passa borrado
 const F=foc(p[0],p[1]-190*ku,.5),zc=.5,mxp=540*zc-20;FX.cz=zc;FX.cpn=[Math.max(-mxp,Math.min(mxp,F[0])),Math.max(-(920*zc-20),Math.min(1000*zc-20,F[1]))];FX.boost=.12;FX.roll=run?-2.5*acc:0;FX.mbx=run?34*acc:0;
 FX.ui=ui;FX.lit={amb:[1.02,.84,.76],rim:[255,170,100],d:[-1,-.4],sh:.4,ri:1};FX.shake=3+42*sh1(GT,[tSlam],4)**1.4+4*acc;FX.flash=Math.max(.35*sh1(GT,[tSlam],8),.2*sh1(GT,[tDash],12));FX.flcol='255,220,180';FX.chroma=3*acc+6*sh1(GT,[tSlam],4);FX.bok=.3},'');
// 6) CORRE EM DIRECAO AO MONSTRO: de tras do heroi, ele dispara pela avenida
shot('cbdS',tApa-.05,(t,u)=>{
 const k=ez(cl((GT-tApa+.05)/.42));monW('C',{pal:'a',mo:.5,ey:'conf',look:-14+28*sn(GT*4),fr:[250,-430],fl:[-290,-430],ht:-6*sn(GT*5)});
 const z=lp(2.6,-16,k);put('BAL',.2*sn(GT*9),0,z,{sc:1.25,sil:1,...walk(GT,30,1.6),wind:4});
 const p=C.BAL.sp;let s='';for(let i=0;i<10;i++){const age=(GT*7+i/10)%1;s+=`<circle cx="${(p[0]+(rnd(i,2.2)-.5)*60).toFixed(0)}" cy="${(p[1]+age*260).toFixed(0)}" r="${(16+60*age).toFixed(0)}" fill="#e2c7a5" opacity="${(.6*(1-age)).toFixed(2)}"/>`}fw(s);
 const ui=fastLines(.5,1,0,1920);
 camA([[tApa-.05,.05,0,80,0],[tApa+.37,.22,0,-40,0]]);
 FX.ui=ui;FX.lit=LIT.cbdS;FX.shake=4;FX.vig=.7;FX.dof=2},'zoom');
// 7a) O GIRO: camera 3/4 de frente, desliza enquanto o rastro do heroi da a volta no monstro
shot('cbdR_fl',tApa+.37,(t,u)=>{
 const k=ez(cl((GT-tApa-.37)/(tAtr+.05-tApa-.37))),th=k*Math.PI*.55;
 const m=monW('C',{pal:'a',mo:.4,ey:'conf',look:-10+20*k,sx:Math.max(.25,cs(th)),fr:[260,-440],fl:[-300,-420],hx:-30*k});
 let s='';const cx=m[0],cy=m[1]-160*m[2];for(let i=0;i<7;i++){const a=Math.PI*.15+k*Math.PI*1.3-i*.13,x=cx+520*m[2]*cs(a),y=cy+120*m[2]*sn(a);s+=`<ellipse cx="${x.toFixed(0)}" cy="${(y-60).toFixed(0)}" rx="${(46-5*i).toFixed(0)}" ry="${(95-10*i).toFixed(0)}" fill="${i?'#fff':GOLD2}" opacity="${(.55-.07*i).toFixed(2)}"/>`}
 s+=`<path d="M${(cx+520*m[2]*cs(Math.PI*.15+k*Math.PI*1.3)).toFixed(0)} ${(cy+120*m[2]*sn(Math.PI*.15+k*Math.PI*1.3)-60).toFixed(0)}A${(520*m[2]).toFixed(0)} ${(120*m[2]).toFixed(0)} 0 0 0 ${(cx+520*m[2]*cs(Math.PI*.15+k*Math.PI*1.3-1.1)).toFixed(0)} ${(cy+120*m[2]*sn(Math.PI*.15+k*Math.PI*1.3-1.1)-60).toFixed(0)}" stroke="${GOLD2}" stroke-width="14" fill="none" opacity=".6" stroke-linecap="round"/>`;fw(s+WINDDUST(.5,1));
 FX.cz=.12;FX.cpn=[lp(120,-140,k),-20];FX.roll=lp(-5,6,k);FX.mbx=10+14*k;
 FX.ui=fastLines(.4,1);FX.lit=LIT.cbdS;FX.vig=.65;FX.shake=3},'');
// 7b) REVELACAO: por tras do monstro, o heroi surge derrapando nas costas dele
shot('cbdR_back',tAtr+.05,(t,u)=>{
 const sk=ob(GT,tAtr+.05,.25),looks=GT>tAtr+.25;
 monW('C',{pal:'a',back:1,hx:looks?-25:0,ht:looks?-5:0,q:looks?[230,-1120,1]:null,fr:[260,-440],fl:[-290,-420]});
 put('BAL',lp(1.6,.9,sk),0,-41,{sc:1.2,m:'focus',brow:7,aR:-30,aL:40,rot:lp(-18,0,sk),nodrift:1,nobob:1,glint:.6,wind:3,sq:SQ(tAtr+.05,1.2),top:1});
 const p=C.BAL.sp,ku=p[2];let s=DUST(p[0],p[1],tAtr+.05,ku*1.3,.9)+SHOCK(p[0],p[1],tAtr+.05,500,'#fff',.5,.3)+TWINK(p[0],p[1]-330*ku,tAtr+.1,1.4);
 for(let i=0;i<5;i++){const d=GT-tAtr;if(d<.55)s+=`<line x1="${(p[0]+60+i*40+400*d).toFixed(0)}" y1="${(p[1]-i*14).toFixed(0)}" x2="${(p[0]+260+i*40+400*d).toFixed(0)}" y2="${(p[1]-i*14).toFixed(0)}" stroke="#e2c7a5" stroke-width="12" stroke-linecap="round" opacity="${(1-d/.55).toFixed(2)}"/>`}fw(s+WINDDUST(.5,1));
 const F=foc(p[0]+120,p[1]-500*ku,.12);camA([[tAtr+.05,.2,F[0]-80,F[1],-3,'c'],[tFist,.12,F[0],F[1],0]]);
 FX.ui='';FX.lit={amb:[1.05,.85,.75],rim:[255,120,90],d:[0,-1],sh:.4,ri:1};FX.vig=.65;FX.shake=3+10*sh1(GT,[tAtr+.05],7)},'wl');
// 4a) o tempo desacelera: close no punho se fechando
shot(null,tFist,(t,u)=>{FX.bg=c=>{const g=c.createRadialGradient(540,1000,100,540,1000,1300);g.addColorStop(0,'#5a2a3a');g.addColorStop(1,'#0a0410');c.fillStyle=g;c.fillRect(0,0,W,H)};
 const k=cl((GT-tFist)/(tLat-tFist-.08)),tr=k>.85?3*sn(GT*80):0;
 let s=FOCUSL(540,980,.35+.3*k,7);s+=BIGFIST(540,1150,2.2+.25*k,k,tr);
 for(let i=0;i<26;i++){const ph=((GT-tFist)*.35+rnd(i,4.4))%1,a=rnd(i,9.1)*6.283,r=700*(1-ph);s+=`<circle cx="${(540+cs(a)*r).toFixed(0)}" cy="${(900+sn(a)*r).toFixed(0)}" r="${(4+5*rnd(i,2.2)).toFixed(1)}" fill="${GOLD2}" opacity="${(sn(ph*3.14)).toFixed(2)}"/>`}
 fw(s);FX.gls=[[540,900,500,'255,200,140',.25+.3*k]];
 FX.ui='';FX.lit=HL;FX.vig=.8;FX.shake=k>.85?4:0;FX.grade='contrast(1.15) saturate(.9)'},'flash');
// 9-10) ENQUADRAMENTO LATERAL -> PAUSA DRAMATICA -> SOCO (impact frame, luz intensa, freeze)
shot('cbdR_back',tLat,(t,u)=>{
 const G0=GT,fz=G0>=tFz2&&G0<tRel2,ps_=G0>=tP0&&G0<tPunch;if(fz)GT=tFz2;
 const tl=ps_?tP0+(G0-tP0)*.06:G0;   // na pausa o tempo quase para
 const pull=ez(cl((tl-tLat)/(tP0-tLat))),strike=G0>=tPunch?ez(cl((GT-tPunch)/.06)):0,arm=G0<tPunch?lp(-20,32,pull)+(ps_?1.5*sn(G0*70):0):lp(32,-95,strike);
 const hitd=GT>=tHit;mon('C',840,1950,2.6,{pal:'a',back:1,z:60,hf:inHit([tHit],.1)||fz?1:0,ht:hitd?-12:0,sx:hitd?.86:1,sy:hitd?1.06:1,fr:hitd?[420,-700]:[260,-440],fl:hitd?[-420,-700]:[-290,-420]});
 put('BAL',0,0,0,{px:[340,1520],ku:1.6,top:1,m:G0<tHit?'focus':'angry',brow:10,aR:arm,aL:40,tilt:G0<tHit?-4*pull:6,look:[8,-4],glint:ps_?1:.6,wind:ps_?.3:3,nobob:1,nodrift:1,noblink:1,frz:ps_||fz,sq:G0<tHit?{sx:1-.05*pull,sy:1+.04*pull}:{sx:1.08,sy:.94},rot:G0<tHit?-8*pull:6});
 const A=armPos('BAL',arm,1),f=[A.f[0]+40,A.f[1]];let s='';
 if(G0<tHit){FX.pf=[[A.f[0],A.f[1],260,30,'255,240,200',pull,'in']];s+=FOCUSL(f[0],f[1],ps_?.55:.25*pull,3)}
 if(G0>=tPunch&&G0<tHit+.03)s+=SMEAR(A,'#fff');
 s+=STARB(f[0],f[1],tHit,2.6,GOLD2,.5)+SPARKS(f[0],f[1],tHit,2.4)+SHOCK(f[0],f[1],tHit,900,'#fff',.25,1);
 if(fz)s+=FOCUSL(f[0],f[1],.9,11)+RIP(f[0],f[1],tHit,.6,260,'#fff');
 fw(s);if(G0>=tHit&&G0<tHit+.25)FX.bloom=[f[0],f[1],1-cl((G0-tHit)/.25)];
 let ui='';if(ps_)ui+=`<rect width="1080" height="1920" fill="#000" opacity="${(.25*cl((G0-tP0)/.08)).toFixed(2)}"/>`;
 const F=foc(f[0],f[1],.55),Fz=foc(f[0],f[1],.85),Fe=foc(eyeP('BAL')[0],eyeP('BAL')[1],1.2);
 GT=G0;camA([[tLat,.35,F[0],F[1]+120,4],[tP0-.02,.55,Fz[0],Fz[1],-2],[tP0,1.2,Fe[0],Fe[1],0,'c'],[tPunch-.01,1.3,Fe[0],Fe[1],0],[tPunch,.62,Fz[0],Fz[1],-3,'c'],[tHit,.85,Fz[0],Fz[1],0,'c'],[tRel2,.95,Fz[0],Fz[1],0]]);
 FX.ui=ui;FX.lit={amb:[1.02,.86,.8],rim:[255,200,130],d:[1,-.3],sh:.45,ri:1};FX.vig=G0<tHit?.92:.6;FX.dark=G0<tHit?(ps_?.32:.2):0;FX.boost=G0>=tHit&&G0<tHit+.2&&!fz?.5*(1-cl((G0-tHit)/.2)):0;
 FX.shake=fz||ps_?0:48*sh1(G0,[tHit],3)**1.5;FX.flash=0;FX.chroma=fz?0:12*sh1(G0,[tHit],3);
 FX.impact=G0>=tHit&&G0<tHit+.042;FX.grade=fz?'contrast(1.55) saturate(.3) brightness(1.05)':ps_?'contrast(1.25) saturate(.45)':G0<tHit?'contrast(1.18) saturate(.7)':'contrast(1.1) saturate(1.15)'},'');
// 10b) REACAO DO MONSTRO: close no rosto, a onda do soco atravessa a cara; dentes estilhacam
shot('cbdR_low',tRel2,(t,u)=>{
 const d=GT-tRel2,k=cl(d/(tWide-tRel2)),wob=Math.exp(-d*9)*sn(d*60);
 const m=monW('C',{pal:'a',mo:1,ey:'wow',ht:-14*ez(k)+6*wob,hx:-30*ez(k),sx:1+.12*wob,sy:1-.1*wob,fr:[480,-860+80*sn(d*30)],fl:[-480,-860+80*sn(d*30+1)]});
 const hd=[m[0],m[1]-790*m[2]],mo=[m[0],m[1]-700*m[2]];let s=RIP(hd[0],hd[1],tRel2,.35,700*m[2],'#fff')+RIP(hd[0],hd[1],tRel2+.08,.35,520*m[2],'#ffd0d6');
 for(let i=0;i<16;i++){const a=-Math.PI/2+(rnd(i,3.3)-.5)*2.6,v=(300+700*rnd(i,5.5)),x=mo[0]+cs(a)*v*d,y=mo[1]+sn(a)*v*d+900*d*d,z=8+10*rnd(i,7.7);s+=`<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(d*700*(i%2?1:-1)).toFixed(0)})" d="M${-z} 0L0 ${-z*2}L${z} 0Z" fill="#f2e6da" stroke="${INK}" stroke-width="3"/>`}
 fw(s);(FX.gls=FX.gls||[]).push([hd[0]-70*m[2],hd[1]-10*m[2],200*m[2],'255,235,240',.6],[hd[0]+70*m[2],hd[1]-10*m[2],200*m[2],'255,235,240',.6]);
 const F=foc(hd[0],hd[1]+60*m[2],.9);camA([[tRel2,1.0,F[0],F[1],-6,'c'],[tWide,.85,F[0],F[1],4]]);
 FX.ui='';FX.lit=LIT.cbdS;FX.vig=.75;FX.shake=30*Math.exp(-d*6);FX.chroma=10*Math.exp(-d*5);FX.flash=.5*Math.exp(-d*18);FX.flcol='255,255,255';FX.grade='contrast(1.22) saturate(1.15)'},'');
// 10c) LANCAMENTO: plano aberto, a onda de choque atravessa o cenario e o monstro e arremessado para o ceu
shot('cbdR_back',tWide,(t,u)=>{
 const d=GT-tWide,lt=cl(d/(tQue-.05-tWide)),fly=ez(lt);
 const m0=monProj(),ms=lp(m0[2],.03,ez(cl(lt*1.3))),mx=lp(m0[0],600,fly),my=lp(m0[1]-480*m0[2],260,ez(cl(lt*1.15)));
 mon('C',mx,my,ms,{center:1,pal:'a',ey:'ko',mo:.9,z:m0[3],rot:lp(0,560,fly),noglow:1});
 put('BAL',1.0,0,-31.5,{sc:1.35,m:'angry',brow:9,aR:-95,aL:40,tilt:5,rot:5,glint:.8,wind:4,still:1,top:1});
 const p=C.BAL.sp,ku=p[2],A=armPos('BAL',-95,1),f=A.f;let s=SHOCK(f[0],f[1],tWide-.05,2800,'#fff',.9,.45)+SHOCK(f[0],f[1],tWide+.08,2300,GOLD2,.9,.45)+SHOCK(f[0],p[1],tWide,2600,'#ead6bd',1,.18);
 s+=DEBRIS(f[0],p[1],tWide,1.6,26)+DEBRIS(f[0]-300,p[1]+40,tWide+.06,1.2,16,'#8a7a70')+DEBRIS(f[0]+300,p[1]+20,tWide+.1,1.2,16,'#8a7a70')+SPARKS(540,700,tWide+.05,2.2,'#fff')+SPARKS(300,900,tWide+.1,1.6,'#dff')+SPARKS(800,850,tWide+.12,1.6,'#dff');
 for(let i=0;i<22;i++){const a=rnd(i,1.7)*6.283,r=150+2200*d*(.6+.4*rnd(i,2.4));s+=`<ellipse cx="${(f[0]+cs(a)*r).toFixed(0)}" cy="${(p[1]+sn(a)*r*.35).toFixed(0)}" rx="${(90+140*d).toFixed(0)}" ry="${(34+50*d).toFixed(0)}" fill="#ead6bd" opacity="${(.55*cl(1-d/.8)).toFixed(2)}"/>`}
 s+=TWINK(mx,my,tQue-.25,1.6);fw(s);
 FX.warp=d<.7?[f[0],f[1],lp(200,1900,cl(d/.7)),120*(1-cl(d/.7))]:null;
 const ui=TXT('UM SOCO',540,300,150,'#fff',-4,pop(GT,tWide+.05))+fastLines(.5*(1-lt),1);
 camA([[tWide,.2,0,120,3,'c'],[tQue-.05,.05,0,40,-1]]);
 FX.ui=ui;FX.lit={amb:[1.05,.9,.82],rim:[255,210,150],d:[0,-1],sh:.4,ri:1};FX.vig=.55;FX.shake=40*Math.exp(-d*4);FX.flash=.75*Math.exp(-d*9);FX.flcol='255,250,235';FX.chroma=8*Math.exp(-d*4);FX.boost=.25*Math.exp(-d*5);FX.bok=.5},'');
// ===== 12d) o vento abriria caminho entre as nuvens =====
shot(null,tQue-.05,(t,u)=>{const op=ez(cl((GT-tVen+.2)/(tNuv-tVen+.6)));FX.bg=c=>sky(c,GT,{top:'#3a3f9a',mid:'#d0587a',bot:'#ffb35a',open:op,cx:540,cy:520,city:'#2a1330',drift:10});
 const k=cl((GT-tQue)/(pe(13)+.4-tQue)),my=lp(1500,520,ez(k)),ms=lp(.5,.02,ez(k));if(k<1)mon('C',540+40*sn(GT*3),my,ms,{center:1,pal:'a',ey:'ko',mo:.9,rot:GT*900%360,z:50,noglow:1,op:1-cl((k-.85)/.15)});
 let s='';const R=op;if(R>0)s+=`<path d="M${(540-140*R).toFixed(0)} 1920L${(540-420*R).toFixed(0)} -100L${(540+420*R).toFixed(0)} -100L${(540+140*R).toFixed(0)} 1920Z" fill="#fff" opacity="${(.22*R*(1-k*.5)).toFixed(2)}"/>`;
 for(let i=0;i<5;i++)s+=SHOCK(540,lp(1500,500,i/4),tQue+i*.12,lp(500,1300,i/4),'#fff',.9,.25);fw(s+TWINK(540,520,pe(13)+.25,2));
 let ui=fastLines(.5,1,0,0);if(GT>tVen)ui+='';if(GT>tNuv-.1)ui+='';
 camA([[tQue-.05,.0,0,200,0],[ps(14),.1,0,0,2]]);FX.rays=[[540,520,.4+.5*op,'255,240,210',22,2000]];
 FX.ui=ui;FX.lit=HL;FX.shake=14*sh1(GT,[tQue],3)+4;FX.flash=.5*sh1(GT,[tQue-.05],7)},'wu');
// ===== 13) o monstro derrotado em segundos =====
const tDer=wt(14,'derrotado',.1),tSeg=wt(14,'segundos',.2);
shot('zgh',ps(14)-.2,(t,u)=>{
 put('BAL',0,0,3.4,{sc:1.6,fr:'R',m:'blank',aR:-122,aL:14,look:[0,-4],glint:.6,wind:1.8,still:1});
 [['T1',-1.9,2.2],['T3',1.9,2.6]].forEach(([k,x,z],i)=>put(k,x,0,z,{sc:1.6,m:'happy',aR:-150+20*sn(GT*9+i),aL:150-20*sn(GT*9+i),bobv:-30*ab(sn(GT*7+i)),flip:x<0?1:-1}));
 const p=C.BAL.sp,ku=p[2],A=armPos('BAL',-122,1);fw(CRACKS(p[0],p[1],ku*1.4,1)+DEBRIS(540,200,ps(14),1,16,'#8a7a70')+TWINK(A.f[0],A.f[1]-40,tDer,1));
 let ui='';ui+=STAMP(540,360,tDer,'K.O.',RED,140,-8);
 if(GT>tSeg){const n=Math.min(3,Math.floor((GT-tSeg)*9)+1);ui+=COUNTER(540,600,ob(GT,tSeg,.25),`00:0${n}`,'SEGUNDOS','#fff')}
 const F=foc(p[0],p[1]-180*ku,.2);camA([[ps(14)-.2,.0,0,-100,-2],[tDer,.18,F[0],F[1],0,'c'],[ps(15),.22,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=LIT.zgh;FX.shake=14*sh1(GT,[tDer],6);FX.flash=.3*sh1(GT,[tDer],10);FX.rays=[[540,1150,.35,'255,210,140',16,1700]];FX.fog=1},'flashO');
// ===== 14) depois de vencer todas as batalhas... algo assustador =====
const tVen2=wt(15,'vencer',.1),tBat=wt(15,'batalhas',.2),tPer=wt(15,'perceberia',.1),tAss=wt(15,'assustador',.2);
shot('zghN',ps(15)-.25,(t,u)=>{
 mon('C2',470,1640,.5,{pal:'p',ey:'ko',mo:.6,rot:-82,z:91,noglow:1});mon('C3',610,1660,.52,{pal:'r',ey:'ko',mo:.5,rot:84,z:92,noglow:1});mon('C',560,1560,.42,{pal:'g',ey:'ko',mo:.7,rot:-95,z:93,noglow:1});
 put('BAL',0,0,0,{px:[545,1470],ku:.9,sit:1,m:GT<tAss?'blank':'sad',aR:-14,aL:14,look:[0,4],glint:.2,wind:.6,brr:1});
 let ui='';const n=SW(ps(15),tBat+.3,1,999);ui+=COUNTER(540,600,ob(GT,ps(15),.3),(n>=999?'999+':String(n)),'VITÓRIAS',GOLD,.85);
 if(GT>tVen2&&GT<tPer)ui+='';if(GT>tAss)ui+=TXT('ALGO ASSUSTADOR...',540,330,82,'#b8c4ff',-3,pop(GT,tAss));
 const e=eyeP('BAL'),F=foc(e[0],e[1]+120,.7);camA([[ps(15)-.25,.05,0,-60,-1],[tPer,.12,F[0]*.2,F[1]*.2,0],[pe(15)+.3,.7,F[0],F[1],0]]);
 FX.ui=ui;FX.lit=LIT.zghN;FX.vig=lp(.55,.82,cl((GT-tPer)/1.5));FX.grade=`contrast(1.05) saturate(${lp(1.05,.55,cl((GT-tPer)/1.5)).toFixed(2)})`},'dip');
// ===== 15) nunca mais um adversario a sua altura =====
const tNun=wt(16,'nunca',.1),tAdv=wt(16,'adversário',.1),tAlt=wt(16,'altura',.1);
shot('tlh',ps(16)-.25,(t,u)=>{
 put('BAL',.3,0,-1.4,{sc:.9,m:'blank',aR:-14,aL:14,look:[0,2],glint:.15,wind:2.2,brr:.9});
 let s='';for(let i=0;i<9;i++){const ph=((GT*.35+rnd(i,4.4))%1),x=lp(-60,1140,ph),y=lp(900,1500,rnd(i,2.2))+40*sn(GT*3+i);s+=`<path transform="translate(${x.toFixed(0)} ${y.toFixed(0)}) rotate(${(GT*200+i*40).toFixed(0)})" d="M-14 0Q0-12 14 0Q0 12-14 0Z" fill="#c9783a" stroke="${INK}" stroke-width="3" opacity=".8"/>`}
 let ui=s;if(GT>tNun)ui+=TXT('NENHUM ADVERSÁRIO',540,300,92,'#fff',-3,pop(GT,tNun));if(GT>tAdv)ui+='';
 ui+=STATS(0,0,0,0)+`<g opacity="${ob(GT,tAlt,.3).toFixed(2)}">`+BAR(160,600,760,'DESAFIO',.02+.02*sn(GT*3),RED,1,0)+'</g>';
 camA([[ps(16)-.25,.1,-40,-110,-1],[ps(17),.26,40,-70,1]]);FX.ui=ui;FX.lit=LIT.tlh;FX.vig=.85;FX.fog=1;FX.grade='contrast(1.05) saturate(.6)'},'dip');
// ===== 16) talvez o maior desafio nao fosse derrotar monstros =====
const tTal=wt(17,'talvez',.1),tDes=wt(17,'desafio',.1),tNao=wt(17,'não',0),tMon=wt(17,'monstros',.1);
shot('aptN',ps(17)-.25,(t,u)=>{
 const yw=GT>tDes-.2&&GT<tNao+.5;put('BAL',.1,0,-2.6,{sc:1,m:yw?'wow':'sleepy',aR:yw?-150:-14,aL:14,sit:1,look:[0,4],glint:.15,wind:.2,brr:.7,tilt:yw?-8:3});
 const p=C.BAL.sp,ku=p[2];let s='';[0,1,2].forEach(i=>{const ph=(GT*.6+i/3)%1;s+=TXT('Z',p[0]+(90+60*ph)*ku,p[1]-(330+200*ph)*ku,(40+30*ph)*ku*2,'#fff',-10,1,900,(1-ph)*(yw?0:1))});fw(s);
 let ui='';if(GT>tTal)ui+=TXT('O MAIOR DESAFIO',540,300,96,'#fff',-3,pop(GT,tDes));if(GT>tMon)ui+='';
 const F=foc(p[0],p[1]-60*ku,.35);camA([[ps(17)-.25,.15,F[0]-60,F[1],-1],[ps(18),.48,F[0]+20,F[1],1]]);FX.ui=ui;FX.lit=LIT.aptN;FX.vig=.75;FX.grade='contrast(1.03) saturate(.75)'},'wl');
// ===== 17) algo que ainda fizesse seu coracao acelerar =====
const tEnc=wt(18,'encontrar',.1),tAin=wt(18,'ainda',.1),tCor2=wt(18,'coração',.1),tAce2=wt(18,'acelerar',.1);
shot('tlhS',ps(18)-.2,(t,u)=>{
 const sp=ob(GT,tAce2,.3),silA=ob(GT,tCor2-.1,.5);
 sprite(KJ({pal:'r',ey:'mad',mo:.2,fr:[260,-420],fl:[-260,-420]}),760,1090,.24,99,'C',0,silA);CHS.C.sil=1;CHS.C.hf=0;
 (FX.gls=FX.gls||[]).push([760-15,1090-192,20,'255,40,60',silA],[760+15,1090-192,20,'255,40,60',silA]);
 put('BAL',-.45,0,1.2,{sc:1.0,m:GT<tCor2?'blank':GT<tAce2?'awe':'grin',brow:GT>tAce2?4:0,aR:GT>tAce2?tw(-14,-40,tAce2,.3):-14,aL:14,look:[0,-6],glint:.4+.4*sp,wind:1.6,sq:SQ(tAce2,1)});
 const p=C.BAL.sp,ku=p[2],c0=chestP('BAL'),bpm=GT<tAce2?lp(48,62,cl((GT-tCor2)/.6)):lp(62,170,ez(cl((GT-tAce2)/.7)));
 let ui=ECG(ob(GT,tEnc,.3)*(GT>tCor2+.33&&GT<tAce2-.02?0:1),bpm,tEnc,360,800,460,GT>tAce2?'#ff5d7a':'#4dff88');if(GT>tCor2){const bt=((GT-tCor2)*bpm/60)%1,q=zpE(c0);ui+=HEART(q[0]-40*ku*1.9,q[1],.9*(1+.25*Math.exp(-bt*8))*silA,'#ff3b6b')}
 if(GT>tEnc)ui+='';if(GT>tAce2)ui+=TXT('ACELERAR!',540,300,120,'#ff5d7a',-3,pop(GT,tAce2)*(1+.04*sn(GT*14)))+'';
 const F=foc(p[0]+120,p[1]-260*ku,.15),Fs=foc(760,1000,.6);camA([[ps(18)-.2,.1,F[0],F[1],0],[tCor2,.22,F[0],F[1],0],[tCor2+.4,.55,Fs[0],Fs[1],0,'c'],[tAce2,.3,F[0],F[1],0,'c'],[ps(19),.34,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=LIT.tlhS;FX.vig=.6;FX.shake=6*sp*ab(sn(GT*25));FX.rays=[[540,1150,.3,'255,200,140',16,1700]]},'dip');
// ===== 18) COMENTE "CARECA" =====
const tCmt=wt(19,'Comente',0),tCrc=wt(19,'careca',0),tAcc=wt(19,'aceitaria',.1),tPdr=wt(19,'poder',.1),tEND=pe(19)+.2;
const TOTAL2=Math.round((pe(19)+1.35)*24)/24;
shot('cbd',ps(19)-.25,(t,u)=>{
 const hp=ob(GT,ps(19)-.1,.45);put('BAL',0,0,3.4,{sc:2.4,m:GT<tPdr?'grin':'cool',brow:4,fr:'R',aR:lp(-14,-122,hp),aL:lp(14,40,hp),tilt:-4,look:[2,-4],glint:Math.max(.4,sh1(GT,[tPdr],2)),wind:2.5,sq:SQ(ps(19)-.1,1.2)});
 const p=C.BAL.sp,ku=p[2],A=armPos('BAL',-122,1),c0=chestP('BAL'),e=eyeP('BAL');FX.rays=[[c0[0],c0[1]-100*ku,.45,'255,230,160',18,1800]];FX.pf=[[A.f[0],A.f[1],160*ku,22,'255,240,200',1,'orbit']];
 fw(TWINK(e[0]-30*ku,e[1]-80*ku,tPdr,1.6)+STARB(A.f[0],A.f[1],tCmt,ku*.7,GOLD2,.35));
 let ui='';if(GT>tCmt-.05)ui+=TXT('COMENTE',540,270,104,'#fff',-3,pop(GT,tCmt-.05));
 const L='CARECA',nL=Math.max(0,Math.min(6,Math.floor((GT-tCrc)/.09)+1));if(GT>tCrc)ui+=TXT([...L].map((c,i)=>`<tspan opacity="${i<nL?1:0}">${c}</tspan>`).join(''),540,440,180,GOLD,-3,pop(GT,tCrc+(nL-1)*.09)*(1+.03*sn(GT*9)));
 if(GT>tCrc)ui+=RAYS(GT,tCrc+.45,540,410,.5,20,GOLD2);
 // caixa de comentario sendo digitada e enviada
 const bA=ob(GT,tCrc-.2,.35),typed=L.slice(0,Math.max(0,Math.min(6,Math.floor((GT-tCrc)/.09)+1))),sent=GT>tAcc;
 if(bA>0)ui+=`<g opacity="${bA.toFixed(2)}" transform="translate(540 ${(1360+(1-bA)*200).toFixed(0)})"><rect x="-440" y="-80" width="880" height="160" rx="80" fill="#fff" stroke="${INK}" stroke-width="10"/><circle cx="-360" cy="0" r="50" fill="#f6c8a0" stroke="${INK}" stroke-width="7"/><path d="M-392-8Q-382-42-360-44Q-338-42-328-8" fill="none" stroke="#fff" stroke-width="7" stroke-linecap="round"/><circle cx="360" cy="0" r="56" fill="${sent?'#1f7bff':'#c9ced8'}" stroke="${INK}" stroke-width="8"/><path d="M336-22L392 0L336 22L346 0Z" fill="#fff" stroke="#fff" stroke-width="4" stroke-linejoin="round"/></g>`+
  `<text x="${(540-280).toFixed(0)}" y="${(1382+(1-bA)*200).toFixed(0)}" font-size="64" fill="${INK}" font-family="Poppins" font-weight="900" opacity="${bA.toFixed(2)}">${typed}${!sent&&sn(GT*12)>0?'|':''}</text>`+(sent?RIP(900,1360,tAcc,.6,240,'#1f7bff')+RIP(900,1360,tAcc+.12,.6,180,'#fff'):'');
 if(sent){for(let i=0;i<8;i++){const d=GT-tAcc,a=rnd(i,3.3)*6.283,r=60+500*d*(.5+rnd(i,7.1)),o=cl(1-d/1.1);if(o>0)ui+=HEART(900+cs(a)*r,1360+sn(a)*r-150*d,.35*o,i%2?'#ff3b6b':'#ffd23f')}}
 // fechamento: iris no brilho da careca
 if(GT>tEND){const q=zpE([e[0]-30*ku,e[1]-70*ku]),R=lp(1500,0,ez(cl((GT-tEND)/.9)));ui+=`<path fill-rule="evenodd" d="M-10-10H1090V1930H-10ZM${(q[0]-R).toFixed(1)} ${q[1].toFixed(1)}a${R.toFixed(1)} ${R.toFixed(1)} 0 1 0 ${(2*R).toFixed(1)} 0a${R.toFixed(1)} ${R.toFixed(1)} 0 1 0 ${(-2*R).toFixed(1)} 0Z" fill="#02030c"/>`}
 const F=foc(c0[0],c0[1]+150*ku,.25);camA([[ps(19)-.25,.6,F[0],F[1]+200,-3],[ps(19)+.2,.2,F[0],F[1],0],[tCrc,.28,F[0],F[1],-1,'c'],[tEND,.34,F[0],F[1],1]]);
 FX.ui=ui;FX.lit=HL;FX.shake=12*sh1(GT,[ps(19)-.05,tCrc],6)+3*sh1(GT,[tCrc+.09,tCrc+.18,tCrc+.27,tCrc+.36,tCrc+.45],10);FX.flash=Math.max(.5*cl(1-(GT-ps(19)+.25)/.3),.35*sh1(GT,[tPdr],8));FX.flcol='255,250,230'},'flash');

// ---------- REACOES DO CIBITO NAS PAUSAS DA NARRACAO (balao + "voz" de desenho) ----------
const RWORD={1:'EU?!',2:'BORA!',3:'UFA...',4:'AI...',5:'NÃO DESISTO!',6:'HÃ?',7:'MEU CABELO!',8:'...',9:'TANTO FAZ.',10:'FÁCIL.',14:'PRÓXIMO!',18:'HEHE!'};
const REACTS=[];for(let i=1;i<PH.length;i++){const g0=pe(i),g1=ps(i+1);if(RWORD[i]&&g1-g0>=.25)REACTS.push({i,w:RWORD[i],t0:g0+.03,t1:Math.max(g1,g0+.55)})}
window.REACTS=REACTS;let REAC=null;
const BUBBLE=(x,y,txt,k,flip)=>{const w=Math.max(150,txt.length*34+70),h=104,s=pop(GT,k);return`<g transform="translate(${x.toFixed(1)} ${y.toFixed(1)}) scale(${(s*(1+.03*sn(GT*14))).toFixed(3)})"><path d="M${-w/2} ${-h/2}H${w/2}Q${w/2+18} ${-h/2} ${w/2+18} 0Q${w/2+18} ${h/2} ${w/2} ${h/2}H${flip?-w/2+70:w/2-50}L${flip?-w/2+30:w/2-10} ${h/2+44}L${flip?-w/2+40:w/2-90} ${h/2}H${-w/2}Q${-w/2-18} ${h/2} ${-w/2-18} 0Q${-w/2-18} ${-h/2} ${-w/2} ${-h/2}Z" fill="#fff" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><text y="18" font-size="54" text-anchor="middle" fill="${INK}" font-family="Poppins,DejaVu Sans,sans-serif" font-weight="900">${txt}</text></g>`};
SH.forEach((s,i)=>{s.t1=i<SH.length-1?SH[i+1].t0:TOTAL+1});
// conversao cena -> tela (usa o transform real do quadro anterior; atualizado em F)
let XF={s:1,dx:0,dy:0,cr:1,sr:0};
const zpS=(x,y)=>{const X=(x-540)*XF.s,Y=(y-1000)*XF.s;return[540+XF.dx+X*XF.cr-Y*XF.sr,1000+XF.dy+X*XF.sr+Y*XF.cr]};
const zpE=p=>zpS(p[0],p[1]);const FXs=()=>XF.s;
const SUNP={cbdS:[[0,10,-210],.2,'255,190,120'],tlhS:[[0,2,-200],.24,'255,180,110'],prq:[[-25,10,-150],.2,'255,210,150'],zgh:[[-20,14,-210],.18,'255,170,120'],cbd:[[30,60,-200],.1,'255,250,230']};
const BOKP={cbdS:.5,tlhS:.45,prq:.4,zgh:.5,zghN:.3,prqN:.25,tlh:.25,aptN:.2},BOKC={zghN:'170,190,255',prqN:'170,200,255',tlh:'180,200,255',aptN:'255,210,150'};
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
 const bri=FX.dark?`brightness(${1-FX.dark})`:FX.boost?`brightness(${(1+FX.boost).toFixed(2)})`:'',dof=FX.dof!=null?FX.dof:(sh.plate?Math.min(6,Math.max(0,(zb-.16)*12)):0);
 const mbp=(FX.mbx||0)>.5?' url(#mbp)':'';$('mbpg').setAttribute('stdDeviation',`${(FX.mbx||0).toFixed(1)} 0`);$('LA').style.filter=((dof>.3?`blur(${dof.toFixed(1)}px)`:'')+pf+mbp+' '+bl+' '+bri).trim()||'none';$('LB').style.filter=((dof>.3?`blur(${(dof*.6).toFixed(1)}px)`:'')+pf+mbp+' '+bl+' '+bri).trim()||'none';
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
 // raios de sol automaticos nos cenarios de por do sol/amanhecer (posicao real do sol no cenario 3D)
 if(!FX.rays&&!FX.norays&&SUNP[sh.plate]){const sp=pj(CSH.pl.VP,...SUNP[sh.plate][0]);if(sp[2]>0)FX.rays=[[sp[0],sp[1],SUNP[sh.plate][1],SUNP[sh.plate][2],16,1900]]}
 // raios de luz volumetricos
 (FX.rays||[]).forEach(([x,y,a,col,n,L])=>{const p=zpS(x,y);for(let i=0;i<n;i++){const an=i/n*6.283+gt*.05+rnd(i,2.2)*.3,w=.05+.06*rnd(i,4.4),l=L*(.6+.4*rnd(i,6.6));const g2=c.createRadialGradient(p[0],p[1],0,p[0],p[1],l);g2.addColorStop(0,`rgba(${col},${(a*.35).toFixed(3)})`);g2.addColorStop(1,`rgba(${col},0)`);c.fillStyle=g2;c.beginPath();c.moveTo(p[0],p[1]);c.arc(p[0],p[1],l,an-w,an+w);c.closePath();c.fill()}});
 // particulas de energia
 (FX.pf||[]).forEach(([x,y,R,n,col,a,kind])=>{const p=zpS(x,y),RR=R*XF.s;for(let i=0;i<n;i++){const ph=(gt*(.25+.35*rnd(i,3.3))+rnd(i,7.7))%1,an=rnd(i,12.9)*6.283+(kind=='orbit'?gt*(.6+rnd(i,2.1)):0);let px,py;
  if(kind=='rise'){px=p[0]+(rnd(i,5.1)-.5)*RR*2+10*sn(gt*2+i);py=p[1]+RR*(.6-ph*1.8)}else if(kind=='in'){const r=RR*(1-ph);px=p[0]+cs(an)*r;py=p[1]+sn(an)*r}else{const r=RR*(.55+.45*rnd(i,9.9));px=p[0]+cs(an)*r;py=p[1]+sn(an)*r*.45}
  const s=(2+5*rnd(i,4.4))*Math.max(.6,XF.s*.6),al=a*sn(ph*3.14)*(.5+.5*ab(sn(gt*5+i)));glow(px,py,s*4,col,al*.5);c.fillStyle=`rgba(235,250,255,${(al).toFixed(3)})`;c.fillRect(px-s/2,py-s/2,s,s)}});
 // lens flare anamorfico (azul)
 (FX.flare||[]).forEach(([x,y,a])=>{if(a<=0)return;const p=zpS(x,y);glow(p[0],p[1],160*a,'200,240,255',.8*a);c.save();c.translate(p[0],p[1]);c.scale(9,.12);glow(0,0,90,'120,200,255',.9*a);c.restore();for(let k=1;k<4;k++){const gx=lp(p[0],540,k*.5),gy=lp(p[1],1000,k*.5);glow(gx,gy,30+k*25,'90,170,255',.18*a)}});
 // poeira/brilho fora de foco em primeiro plano (profundidade), com paralaxe da camera
 const bk=FX.bok!=null?FX.bok:(BOKP[sh.plate]||0);if(bk>0){const bc=FX.bokc||BOKC[sh.plate]||'255,220,170';for(let i=0;i<16;i++){const z=.5+rnd(i,3.7),x=((rnd(i,1.9)*1300+gt*(14+20*z)+dx*z*1.4)%1300+1300)%1300-110,y=rnd(i,7.3)*H+dy*z*1.4+30*sn(gt*.4+i),r=30+70*z;glow(x,y,r,bc,bk*(.18+.2*rnd(i,5.1))*(.6+.4*sn(gt*.8+i)))}}
 if(FX.bloom){const [bx,by,ba]=FX.bloom,p=zpS(bx,by);glow(p[0],p[1],1400*ba+200,'255,245,215',.9*ba);glow(p[0],p[1],380*ba+60,'255,255,255',ba)}
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
 const RCH=['CIB','CHR','BAL'].map(k=>CHS[k]).find(c=>FR.includes(c)&&c.sp&&+c.g.style.opacity>.5);if(REAC&&RCH){const p=RCH.sp,ku=p[2],q=zpS(p[0],p[1]-(RCH.sit?240:330)*ku),fl=q[0]>620,fc=zpS(p[0],p[1]-(RCH.sit?145:235)*ku),hr=78*ku*XF.s;let bx=Math.min(860,Math.max(220,q[0]+(fl?-200:200))),by=q[1]-90;if(by<560){by=560;const sx=fc[0]+(fl?-1:1)*(hr+240);if(sx>=200&&sx<=880&&fc[1]-hr<560+70)bx=sx;else if(fc[1]+hr>500){bx=Math.min(860,Math.max(220,fc[0]+(fl?-1:1)*60));by=Math.min(1420,fc[1]+hr+120)}}by=Math.min(1420,by);const fo=1-cl((gt-REAC.t1+.12)/.12);FX.ui=(FX.ui||'')+`<g opacity="${fo.toFixed(2)}">`+BUBBLE(bx,by,REAC.w,REAC.t0,!fl)+'</g>'}
 const te=sh.t1-gt,uo=te<.16&&sh!=SH[SH.length-1]?ez(te/.16):1;
 $('UI').innerHTML=FX.ui||'';$('UI').style.opacity=((1-fd)*uo).toFixed(3);$('UI').style.transformOrigin='540px 900px';$('UI').style.transform=uo<1?`scale(${(1+(1-uo)*.08).toFixed(3)})`:'none';$('st').style.filter=FX.impact?'grayscale(1) invert(1) contrast(2.4) brightness(1.05)':(FX.grade||'contrast(1.06) saturate(1.1)')};
