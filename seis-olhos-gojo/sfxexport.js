// Exporta efeitos (tempo, tipo, volume), cortes e frases -> sfx.json. Uso: node sfxexport.js
const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const b=await chromium.launch();const pg=await b.newPage();pg.on('pageerror',e=>console.log('ERR',e.message));await pg.goto('file://'+__dirname+'/story.html');
 const d=await pg.evaluate(()=>({sfx:getSFX(),total:TOTAL,phrases:PHRASES,cuts:SH.map(s=>s.t0)}));fs.writeFileSync(__dirname+'/sfx.json',JSON.stringify(d));console.log(d.sfx.length,'efeitos');await b.close()})();
