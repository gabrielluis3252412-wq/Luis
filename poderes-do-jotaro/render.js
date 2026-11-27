// Renderiza os quadros em frames/ (JPEG). Uso: node render.js [processos=4] [fps=60] [escala=2] [inicio] [fim]
// escala 2 = 2160x3840 (4K vertical); o desenho e vetorial, entao sai nitido na resolucao final.
const {chromium}=require('playwright'),fs=require('fs');
const NW=+(process.argv[2]||4),FPS=+(process.argv[3]||60),D=+(process.argv[4]||2),A=process.argv[5],B=process.argv[6];
const OUT=__dirname+'/frames';fs.mkdirSync(OUT,{recursive:true});
let N=0,I0=0,done=0,T0=Date.now();
async function work(w){let i=I0+w;while(i<N){const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:D});
 await pg.addInitScript(d=>{window.RS=d},D);pg.on('pageerror',e=>console.log('ERR',e.message));
 await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);const cdp=await pg.context().newCDPSession(pg);
 let n=0;while(i<N&&n<160){const f=`${OUT}/${String(i).padStart(5,'0')}.jpg`;if(!fs.existsSync(f)){await pg.evaluate(t=>F(t),i/FPS);
   const r=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:94,optimizeForSpeed:true,clip:{x:0,y:0,width:1080,height:1920,scale:D}});fs.writeFileSync(f+'.tmp',Buffer.from(r.data,'base64'));fs.renameSync(f+'.tmp',f);done++}
  i+=NW;n++}
 await b.close();const el=(Date.now()-T0)/1000;console.log(`processo ${w} ate ${i} | ${done} quadros em ${el.toFixed(0)} s (${(el/Math.max(1,done)).toFixed(2)} s/quadro)`)}}
(async()=>{const b=await chromium.launch();const pg=await b.newPage();await pg.goto('file://'+__dirname+'/story.html');const T=await pg.evaluate(()=>TOTAL);await b.close();
 N=Math.round(T*FPS);if(A!=null)I0=+A;if(B!=null)N=Math.min(N,+B);console.log('duracao',T,'s ->',Math.round(T*FPS),'quadros a',FPS,'fps; renderizando',I0,'a',N-1);
 await Promise.all([...Array(NW).keys()].map(work));console.log('OK',(Date.now()-T0)/1000,'s')})();
