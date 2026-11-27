// Renderiza todos os quadros em frames/ (JPEG). Uso: node render.js [workers] [escala]
// escala 1.3333 = 2K (1440x2560, padrao); 1 = 1080x1920; 2 = 4K (2160x3840)
const {chromium}=require('playwright'),fs=require('fs'),FPS=+(process.env.FPS||30);
const NW=+(process.argv[2]||4),DSF=+(process.argv[3]||process.env.ESCALA||4/3);fs.mkdirSync(__dirname+'/frames',{recursive:true});
let N=0;
async function work(w){let i=w;while(i<N){const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:DSF});
 pg.on('pageerror',e=>console.log('ERR',e.message));await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);
 let n=0;while(i<N&&n<120){const f=`${__dirname}/frames/${String(i).padStart(5,'0')}.jpg`;if(!fs.existsSync(f)){await pg.evaluate(t=>F(t),i/FPS);await pg.screenshot({path:f,type:'jpeg',quality:93})}i+=NW;n++}
 await b.close();console.log('worker',w,'ate',i)}}
(async()=>{const b=await chromium.launch();const pg=await b.newPage();await pg.goto('file://'+__dirname+'/story.html');const T=await pg.evaluate(()=>TOTAL);await b.close();
 N=Math.round(T*FPS);console.log('duracao',T,'s ->',N,'quadros |',Math.round(1080*DSF)+'x'+Math.round(1920*DSF));const t=Date.now();await Promise.all([...Array(NW).keys()].map(work));console.log('OK',N,'quadros',(Date.now()-t)/1000,'s')})();
