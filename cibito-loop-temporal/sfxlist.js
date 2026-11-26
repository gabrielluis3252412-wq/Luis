// Exporta a lista de efeitos sonoros (tempo, tipo, volume) e as frases -> sfx.json
const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const b=await chromium.launch();const pg=await b.newPage();await pg.goto('file://'+__dirname+'/story.html');
 const d=await pg.evaluate(()=>({sfx:getSFX(),total:TOTAL,phrases:PHRASES,off:ENVOFF}));fs.writeFileSync(__dirname+'/sfx.json',JSON.stringify(d));console.log(d.sfx.length,'efeitos');await b.close()})();
