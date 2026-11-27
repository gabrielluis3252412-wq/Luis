// Renderiza os cenarios 3D em PNG para 2K (1584x2816, supersampling 1.5x) (fundo A + primeiro plano B). Uso: node plates.js road hot twn3
const {chromium}=require('playwright'),fs=require('fs');
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const pg=await b.newPage({viewport:{width:800,height:800}});pg.on('pageerror',e=>console.log('ERR',e));
 await pg.goto('file://'+__dirname+'/plates.html');
 for(const k of process.argv.slice(2)){const t=Date.now();const [A,B]=await pg.evaluate(k=>plate(k),k);
  fs.writeFileSync(`${__dirname}/plates/${k}_A.png`,Buffer.from(A.split(',')[1],'base64'));fs.writeFileSync(`${__dirname}/plates/${k}_B.png`,Buffer.from(B.split(',')[1],'base64'));console.log(k,(Date.now()-t)/1000)}
 await b.close();
 // supersampling 2x -> reduz com Lanczos (bordas sem serrilhado)
 require('child_process').execSync(`python3 -c "import sys\nfrom PIL import Image\nfor f in sys.argv[1:]:\n im=Image.open(f);im.resize((1584,2816),Image.LANCZOS).save(f,optimize=True)" ${process.argv.slice(2).map(k=>`${__dirname}/plates/${k}_A.png ${__dirname}/plates/${k}_B.png`).join(' ')}`)})();
