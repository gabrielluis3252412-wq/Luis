const SSA=2,W=1080,H=1920,PW=1188*SSA,PH=2112*SSA,$=id=>document.getElementById(id);
let GA,GB;
function drawP(G,lay,VP,eye,S){const g=G.g,u=G.u;g.viewport(0,0,g.drawingBufferWidth,g.drawingBufferHeight);const bg=S.bg||[.1,.07,.3];g.clearColor(lay=='A'?bg[0]:0,lay=='A'?bg[1]:0,lay=='A'?bg[2]:0,lay=='A'?1:0);g.depthMask(true);g.clear(g.COLOR_BUFFER_BIT|g.DEPTH_BUFFER_BIT);g.enable(g.DEPTH_TEST);g.enable(g.BLEND);
 const LPs=new Float32Array(15),LCs=new Float32Array(15);S.L.forEach((l,i)=>{LPs.set(l.slice(0,3),i*3);LCs.set(l.slice(3,6),i*3)});
 g.uniformMatrix4fv(u.VP,false,VP);g.uniform3fv(u.cam,eye);g.uniform3fv(u.LP,LPs);g.uniform3fv(u.LC,LCs);g.uniform3fv(u.ka,S.ka);g.uniform3fv(u.kb,S.kb);g.uniform3fv(u.sunD,norm(S.sun));g.uniform3fv(u.sunC,S.sunc);g.uniform3fv(u.fogc,S.fogc);g.uniform1f(u.fogd,S.fogd);g.uniform1f(u.T,0);g.uniform1fv(u.miss,new Float32Array(S.miss));
 const ls=OB.filter(o=>o.set==S.n&&o.lay==lay).map(o=>({o,m:o.m,d:(o.m[12]-eye[0])**2+(o.m[13]-eye[1])**2+(o.m[14]-eye[2])**2})),tr=o=>o.mode==5||o.mode==6||o.mode==9,list=[...ls.filter(x=>!tr(x.o)).sort((a,b)=>a.d-b.d),...ls.filter(x=>tr(x.o))];
 for(const {o,m} of list){const b=bufs(G,o.g);g.bindBuffer(g.ARRAY_BUFFER,b.pb);g.enableVertexAttribArray(G.pl);g.vertexAttribPointer(G.pl,3,g.FLOAT,false,0,0);g.bindBuffer(g.ARRAY_BUFFER,b.nb);g.enableVertexAttribArray(G.nl);g.vertexAttribPointer(G.nl,3,g.FLOAT,false,0,0);g.bindBuffer(g.ELEMENT_ARRAY_BUFFER,b.ib);
  g.uniformMatrix4fv(u.M,false,m);g.uniform3fv(u.col,o.col);g.uniform3fv(u.emis,o.emis);g.uniform3fv(u.pc,o.pc);g.uniform1f(u.mode,o.mode);g.uniform1f(u.spec,o.spec);g.uniform1f(u.alpha,o.alpha);
  g.blendFuncSeparate(g.ONE,g.ONE_MINUS_SRC_ALPHA,g.ONE,g.ONE_MINUS_SRC_ALPHA);g.depthMask(!(o.mode==5||o.mode==6||o.mode==9));g.drawElements(g.TRIANGLES,b.c,g.UNSIGNED_SHORT,0)}
 g.readPixels(0,0,1,1,g.RGBA,g.UNSIGNED_BYTE,new Uint8Array(4))}
window.plate=key=>{const P=PLATES[key],S=SETS[P.set];S.n=P.set;if(!GA){$('A').width=PW;$('A').height=PH;$('B').width=PW;$('B').height=PH;GA=mkGL($('A'));GB=mkGL($('B'))}
 const c=P.cam,V=look(c.eye,c.tg),VP=mul(persp(c.fov,W/H,.1,400),V);drawP(GA,'A',VP,c.eye,S);drawP(GB,'B',VP,c.eye,S);return[$('A').toDataURL('image/png'),$('B').toDataURL('image/png')]};
