// Renderiza os quadros em frames/ (JPEG). Uso: node render.js [processos=4] [fps=60] [escala=4/3] [inicio] [fim]
// escala 1.333333333333 = 1440x2560 (2K vertical); o desenho e vetorial, entao sai nitido na resolucao final.
// OUT=pasta node render.js ...  grava em outra pasta (para comparar duas renderizacoes, quadro a quadro).
const {chromium}=require('playwright'),fs=require('fs');
const NW=+(process.argv[2]||4),FPS=+(process.argv[3]||60),D=+(process.argv[4]||4/3),A=process.argv[5],B=process.argv[6];
const OUT=process.env.OUT||__dirname+'/frames';fs.mkdirSync(OUT,{recursive:true});
// o Chrome so entrega o quadro depois de terminar todas as etapas de pintura (nada de pedaco faltando sob carga)
const ARGS=['--run-all-compositor-stages-before-draw'];
let N=0,I0=0,done=0,T0=Date.now(),LUZ={};
// Pre-passo: a luz de cada personagem (contorno iluminado ou so a tinta, conforme o tamanho na tela) e decidida no
// primeiro quadro em que ele aparece no plano, percorrendo o plano em ordem. A tabela vai para todos os processos,
// entao a escolha nao muda no meio do plano quando um processo reinicia o navegador nem alterna entre processos.
async function preLuz(SHS){const idx=j=>{const t=j/FPS,k=SHS.findIndex(s=>t>=s[0]&&t<s[1]);return k<0?SHS.length-1:k};
 const runs=[];for(let j=0;j<N;j++){const k=idx(j),r=runs[runs.length-1];if(r&&r.k==k)r.b=j;else runs.push({k,a:j,b:j})}
 const L=[...Array(NW)].map(()=>({n:0,r:[]}));runs.filter(r=>r.b>=I0).sort((x,y)=>(y.b-y.a)-(x.b-x.a)).forEach(r=>{const m=L.reduce((p,c)=>c.n<p.n?c:p);m.r.push(r);m.n+=r.b-r.a+1});
 const b=await chromium.launch({args:ARGS});
 const parts=await Promise.all(L.map(async l=>{const pg=await b.newPage({viewport:{width:1080,height:1920}});await pg.addInitScript(d=>{window.RS=d},D);
  await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);
  for(const r of l.r)for(let j=r.a;j<=r.b;j++)await pg.evaluate(t=>F(t),j/FPS);const e=await pg.evaluate(()=>[...LITM]);await pg.close();return e}));
 await b.close();return Object.fromEntries(parts.flat())}
async function work(w){let i=I0+w;while(i<N){const b=await chromium.launch({args:ARGS});const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:D});
 await pg.addInitScript(([d,l])=>{window.RS=d;window.LITPRE=l},[D,LUZ]);pg.on('pageerror',e=>console.log('ERR',e.message));
 await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);const cdp=await pg.context().newCDPSession(pg);
 let n=0;while(i<N&&n<160){const f=`${OUT}/${String(i).padStart(5,'0')}.jpg`;if(!fs.existsSync(f)){await pg.evaluate(t=>F(t),i/FPS);await pg.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(()=>setTimeout(r,0)))));  // espera o navegador terminar de pintar
   const r=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:94,optimizeForSpeed:true,clip:{x:0,y:0,width:1080,height:1920,scale:D}});fs.writeFileSync(f+'.tmp',Buffer.from(r.data,'base64'));fs.renameSync(f+'.tmp',f);done++}
  i+=NW;n++}
 await b.close();const el=(Date.now()-T0)/1000;console.log(`processo ${w} ate ${i} | ${done} quadros em ${el.toFixed(0)} s (${(el/Math.max(1,done)).toFixed(2)} s/quadro)`)}}
(async()=>{const b=await chromium.launch();const pg=await b.newPage();await pg.goto('file://'+__dirname+'/story.html');const [T,SHS]=await pg.evaluate(()=>[TOTAL,SH.map(s=>[s.t0,s.t1])]);await b.close();
 N=Math.round(T*FPS);if(A!=null)I0=+A;if(B!=null)N=Math.min(N,+B);console.log('duracao',T,'s ->',Math.round(T*FPS),'quadros a',FPS,'fps; renderizando',I0,'a',N-1);
 LUZ=await preLuz(SHS);console.log('luz decidida para',Object.keys(LUZ).length,'personagens/planos em',((Date.now()-T0)/1000).toFixed(0),'s');
 await Promise.all([...Array(NW).keys()].map(work));console.log('OK',(Date.now()-T0)/1000,'s')})();
