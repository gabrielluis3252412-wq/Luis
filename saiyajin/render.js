// Renderiza todos os quadros em frames/ (JPEG). Uso: node render.js [workers]
const {chromium}=require('playwright'),fs=require('fs'),FPS=24;
const NW=+(process.argv[2]||4);fs.mkdirSync(__dirname+'/frames',{recursive:true});
let N=0;
async function work(w){let i=w;while(i<N){const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920}});
 pg.on('pageerror',e=>console.log('ERR',e.message));await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);
 let n=0;while(i<N&&n<120){const f=`${__dirname}/frames/${String(i).padStart(5,'0')}.jpg`;if(!fs.existsSync(f)){await pg.evaluate(t=>F(t),i/FPS);await pg.screenshot({path:f,type:'jpeg',quality:93})}i+=NW;n++}
 await b.close();console.log('worker',w,'ate',i)}}
(async()=>{const b=await chromium.launch();const pg=await b.newPage();await pg.goto('file://'+__dirname+'/story.html');const T=await pg.evaluate(()=>TOTAL);await b.close();
 N=Math.round(T*FPS);console.log('duracao',T,'s ->',N,'quadros');const t=Date.now();await Promise.all([...Array(NW).keys()].map(work));console.log('OK',N,'quadros',(Date.now()-t)/1000,'s')})();
