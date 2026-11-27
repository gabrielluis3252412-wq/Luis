// Renderiza os cenarios 3D (mesmo codigo dos projetos anteriores) em PNG: fundo A + primeiro plano B.
// Uso: node plates.js [--ss 3] [--out 2376x4224] [--dir plates] str twn3 ...
// Padrao: supersampling 3x e saida 2376x4224 (cenarios para o video 2160x3840, com 10% de margem).
const {chromium}=require('playwright'),fs=require('fs');
const a=process.argv.slice(2);let SS=3,OUT=[2376,4224],DIR='plates';const keys=[];
for(let i=0;i<a.length;i++){if(a[i]=='--ss')SS=+a[++i];else if(a[i]=='--out')OUT=a[++i].split('x').map(Number);else if(a[i]=='--dir')DIR=a[++i];else keys.push(a[i])}
(async()=>{const b=await chromium.launch({args:['--use-gl=angle','--use-angle=swiftshader','--enable-unsafe-swiftshader','--ignore-gpu-blocklist']});
 const pg=await b.newPage({viewport:{width:800,height:800}});pg.on('pageerror',e=>console.log('ERR',e));
 await pg.addInitScript(s=>{window.SSA_OVR=s},SS);await pg.goto('file://'+__dirname+'/plates.html');fs.mkdirSync(`${__dirname}/${DIR}`,{recursive:true});
 for(const k of keys){const t=Date.now();const [A,B]=await pg.evaluate(k=>plate(k),k);
  fs.writeFileSync(`${__dirname}/${DIR}/${k}_A.png`,Buffer.from(A.split(',')[1],'base64'));fs.writeFileSync(`${__dirname}/${DIR}/${k}_B.png`,Buffer.from(B.split(',')[1],'base64'));console.log(k,(Date.now()-t)/1000,'s')}
 await b.close();
 // reduz com Lanczos (bordas sem serrilhado)
 require('child_process').execSync(`python3 -c "import sys\nfrom PIL import Image\nW,H=int(sys.argv[1]),int(sys.argv[2])\nfor f in sys.argv[3:]:\n im=Image.open(f);im.resize((W,H),Image.LANCZOS).save(f,optimize=True)" ${OUT[0]} ${OUT[1]} ${keys.map(k=>`${__dirname}/${DIR}/${k}_A.png ${__dirname}/${DIR}/${k}_B.png`).join(' ')}`)})();
