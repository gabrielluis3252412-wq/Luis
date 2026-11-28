// Previa de quadros: node pvt.js [--hd] 1.5 12 30  -> pvt.jpg (tempos em segundos). --hd = 1440x2560 (2K, igual ao video)
const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const a=process.argv.slice(2),hd=a.includes('--hd'),ts=a.filter(x=>x!='--hd').map(Number),D=hd?4/3:1;
 const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920},deviceScaleFactor:D});
 await pg.addInitScript(d=>{window.RS=d},D);pg.on('pageerror',e=>console.log('ERR',e.message));pg.on('console',m=>{if(m.type()=='error'||m.type()=='warning')console.log('CONSOLE',m.text())});
 await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);
 const cdp=await pg.context().newCDPSession(pg);fs.mkdirSync(__dirname+'/_pv',{recursive:true});
 for(const t of ts){await pg.evaluate(t=>F(t),t);const r=await cdp.send('Page.captureScreenshot',{format:'jpeg',quality:85,optimizeForSpeed:true,clip:{x:0,y:0,width:1080,height:1920,scale:D}});fs.writeFileSync(`${__dirname}/_pv/${t.toFixed(2)}.jpg`,Buffer.from(r.data,'base64'))}
 await b.close();
 const {execSync}=require('child_process');const L=ts.map(t=>`_pv/${t.toFixed(2)}.jpg`).join(' ');
 execSync(`python3 -c "
import sys
from PIL import Image
f=sys.argv[1:];n=len(f);C=min(n,6);R=(n+C-1)//C
s=Image.new('RGB',(360*C,640*R))
for i,p in enumerate(f):s.paste(Image.open(p).resize((360,640)),((i%C)*360,(i//C)*640))
s.save('pvt.jpg',quality=88)" ${L}`,{cwd:__dirname});console.log('pvt.jpg')})();
