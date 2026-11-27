// Renderiza os quadros que faltam em frames/ (JPEG). Uso: node render.js [workers] [escala]
// escala 1.3333 = 2K (1440x2560, padrao); 1 = 1080x1920; 2 = 4K (2160x3840). FPS=60 por padrao (FPS=30 para 30 fps).
// So os quadros que ainda nao existem sao renderizados, divididos igualmente entre os processos
// (ex.: de 30 para 60 fps basta renderizar os quadros impares: o quadro i de 30 fps e o quadro 2i de 60 fps).
// Antes de cada captura espera dois quadros de animacao: com filtros pesados o navegador podia capturar camadas ainda sem pintar.
const {chromium}=require('playwright'),fs=require('fs'),FPS=+(process.env.FPS||60);
const NW=+(process.argv[2]||4),DSF=+(process.argv[3]||process.env.ESCALA||4/3);fs.mkdirSync(__dirname+'/frames',{recursive:true});
const fp=i=>`${__dirname}/frames/${String(i).padStart(5,'0')}.jpg`;
let TODO=[];
async function work(w){const mine=TODO.filter((_,k)=>k%NW==w);let k=0;while(k<mine.length){const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:DSF});
 pg.on('pageerror',e=>console.log('ERR',e.message));await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);
 let n=0;while(k<mine.length&&n<120){const i=mine[k];await pg.evaluate(t=>F(t),i/FPS);await pg.evaluate(()=>new Promise(r=>requestAnimationFrame(()=>requestAnimationFrame(r))));await pg.screenshot({path:fp(i),type:'jpeg',quality:93});k++;n++}
 await b.close();console.log('worker',w,'feitos',k,'de',mine.length)}}
(async()=>{const b=await chromium.launch();const pg=await b.newPage();await pg.goto('file://'+__dirname+'/story.html');const T=await pg.evaluate(()=>TOTAL);await b.close();
 const N=Math.round(T*FPS);for(let i=0;i<N;i++)if(!fs.existsSync(fp(i)))TODO.push(i);
 console.log('duracao',T,'s ->',N,'quadros |',Math.round(1080*DSF)+'x'+Math.round(1920*DSF),'|',FPS,'fps | faltam',TODO.length);const t=Date.now();await Promise.all([...Array(NW).keys()].map(work));console.log('OK',N,'quadros',(Date.now()-t)/1000,'s')})();
