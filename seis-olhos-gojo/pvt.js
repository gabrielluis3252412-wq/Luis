// Previa de quadros: node pvt.js 1.5 12 30  -> pvt.jpg (tempos em segundos)
const {chromium}=require('playwright');
(async()=>{const ts=process.argv.slice(2).map(Number);const b=await chromium.launch();const pg=await b.newPage({viewport:{width:1080,height:1920}});
 pg.on('pageerror',e=>console.log('ERR',e.message));await pg.goto('file://'+__dirname+'/story.html');await pg.evaluate(()=>document.fonts.ready);
 const fs=require('fs');fs.mkdirSync(__dirname+'/_pv',{recursive:true});
 for(const t of ts){await pg.evaluate(t=>F(t),t);await pg.screenshot({path:`${__dirname}/_pv/${t.toFixed(2)}.jpg`,type:'jpeg',quality:80})}
 await b.close();
 const {execSync}=require('child_process');const L=ts.map(t=>`_pv/${t.toFixed(2)}.jpg`).join(' ');
 execSync(`python3 -c "
import sys
from PIL import Image
f=sys.argv[1:];n=len(f);C=min(n,6);R=(n+C-1)//C
s=Image.new('RGB',(270*C,480*R))
for i,p in enumerate(f):s.paste(Image.open(p).resize((270,480)),((i%C)*270,(i//C)*480))
s.save('pvt.jpg',quality=85)" ${L}`,{cwd:__dirname});console.log('pvt.jpg')})();
