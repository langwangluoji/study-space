import fs from 'node:fs';
import * as k from './kit/iso-kit.mjs';
import * as A from './kit/audit.mjs';
import {paintOrder} from './ml-order.mjs';
import {kitScript} from './scripts/inline-kit.mjs';

// Figure tier. Four teaching instruments: calibration bench, projection ruler,
// zero-stop slide and image/block inspection tray. All displayed values are
// computed by the same pure model used to position their moving parts.
export function model(mode,u,v=1){
  if(mode==='calibration'){
    const x=[-1,0,1,2],t=[0,1,1,4],y=x.map(x=>u+v*x),r=y.map((y,i)=>y-t[i]);
    return {x,t,y,r,L:r.reduce((s,r)=>s+r*r,0)/8,g:[r.reduce((a,b)=>a+b,0)/4,r.reduce((s,r,i)=>s+r*x[i],0)/4]};
  }
  if(mode==='fisher'){
    const groups=[[[-2,-1],[-1,0],[-2,1]],[[1,0],[2,1],[1,2]]],w=[Math.cos(u),Math.sin(u)];
    const z=groups.map(g=>g.map(p=>p[0]*w[0]+p[1]*w[1])),means=z.map(g=>g.reduce((a,b)=>a+b)/g.length);
    const sw=z.reduce((s,g,j)=>s+g.reduce((s,z)=>s+(z-means[j])**2,0),0);
    return {groups,w,z,means,sw,J:sw>1e-12?(means[1]-means[0])**2/sw:null};
  }
  if(mode==='relu')return {a:u,z:Math.max(0,u),derivative:u===0?null:u>0?1:0};
  const b=Math.round(u),n=5-b,blocks=n*n,index=Math.max(0,Math.min(blocks-1,Math.round(v))); return {b,blocks,index,ox:index%n,oy:Math.floor(index/n),per:b*b*9,D:blocks*b*b*9};
}
export function drawing(mode,u,v,record=null){
  const P=k.fitProjection([...k.boxCorners({x:-150,y:-90,w:300,d:180,r:0},-16,0),...(mode==='calibration'?[-90,-30,30,90].map(x=>[x,0,202]):[[0,0,36]])],680,390,{pad:mode==='calibration'?18:50,azimuth:36,elevation:mode==='calibration'?27:34});
  const items=[];
  function slab(x,y,w,d,z,h,tone='mid',lit=false){const plan={x,y,w,d,r:Math.min(2,w/4,d/4)};const svg=k.solidSvg(k.slabOf(plan,z,h,P,4,.4),{tone,lit});const item={key:items.length,svg,ring:k.roundedPlan(plan,4),z,h};items.push(item);record?.({type:'slab',plan,z,h},item,P);return item;}
  // Rubber pads, metal base, four corner fasteners, edge rulers and end clamps.
  for(const x of [-136,124])for(const y of [-76,64]){slab(x,y,12,12,-16,6,'lo');slab(x,y,12,12,-10,2,'mid');}
  slab(-148,-88,296,176,-8,8,'lo');
  for(const x of [-140,134])for(const y of [-80,74])slab(x,y,6,6,0,1,'hi');
  for(const y of [-84,78]){slab(-128,y,256,5,0,2,'lo');for(let x=-120;x<=120;x+=10)slab(x,y,1,x%50===0?5:2,2,.4,'mid');}
  if(mode==='calibration'){
    const m=model(mode,u,v);
    // Four fixed observation posts with a target contact and a moving predicted
    // contact. A vertical measuring blade spans exactly the signed residual.
    for(let i=0;i<4;i++){
      const x=-90+60*i,zt=76+22*m.t[i],zy=76+22*m.y[i];
      slab(x-11,-12,22,36,0,6,'mid');const rail=slab(x-2,-3,4,6,6,192,'lo');
      for(let z=16;z<196;z+=12)rail.svg+=k.lineSvg(k.pathOf([k.iso([x-1,3,z],P),k.iso([x+1,3,z],P),k.iso([x+1,3,z+.3],P),k.iso([x-1,3,z+.3],P)],true),{tone:'mid'});
      // Observation clamp behind the guide, prediction carriage in front.
      slab(x-8,-11,16,8,zt-2,4,'hi');
      slab(x-5,3,10,16,zy-2,4,'hi',true);
      // Two nonintersecting feeler arms meet a thin residual blade. They are
      // supported by their own clamp; the blade measures the vertical gap.
      slab(x+8,-11,2,32,zt-1,2,'mid');
      slab(x+5,11,3,10,zy-1,2,'mid');
      const gap=Math.abs(zt-zy);
      if(gap>2)slab(x+8,19,2,2,Math.min(zt,zy)+1,Math.max(.001,gap-2),'hi',true);
    }
  }else if(mode==='fisher'){
    const m=model(mode,u),scale=34;
    slab(-110,-70,220,148,0,4,'mid');
    for(const [j,g] of m.groups.entries())for(const [x,y]of g){slab(scale*x-4,scale*y-4,8,8,4,6,j?'hi':'lo',j===1);}
    const c=Math.cos(u),s=Math.sin(u),nx=-s*8,ny=c*8;
    const ring=[[-110*c+nx,-110*s+ny],[110*c+nx,110*s+ny],[110*c-nx,110*s-ny],[-110*c-nx,-110*s-ny]];
    const item={key:items.length,svg:k.solidSvg(k.extrude(ring,20,3,P),{tone:'hi'}),ring,z:20,h:3};items.push(item);record?.({type:'ring',ring,z:20,h:3},item,P);
    for(const [j,g]of m.z.entries())for(const [i,z]of g.entries()){const lane=-5+2*(j*3+i);slab(z*scale*c-s*lane-.6,z*scale*s+c*lane-.6,1.2,1.2,23,5,'hi',j===1);}
    slab(-8,-8,16,16,4,16,'mid');
  }else if(mode==='relu'){
    // Parallel input/output slides. Output carriage meets a physical zero stop.
    for(const y of [-30,24]){slab(-110,y,220,8,0,6,'mid');for(const x of [-116,110])slab(x,y-4,6,16,0,15,'hi');}
    slab(-3,20,6,16,6,19,'hi');
    slab(u*38-8,-36,16,20,6,15,'hi');
    slab(Math.max(0,u)*38+3,20,16,16,6,15,'hi',true);
    for(const x of [-76,-38,0,38,76])slab(x,-20,1,8,0,1,'hi');
  }else{
    const m=model(mode,u,v);slab(-76,-76,152,152,0,5,'mid');
    // Sixteen image cells on a contact sheet; raised frame encloses b×b cells.
    for(let j=0;j<4;j++)for(let i=0;i<4;i++){
      slab(-70+36*i,-70+36*j,28,28,5,1,(i+j)%2?'mid':'lo');
      for(let h=0;h<3;h++)slab(-68+36*i,-66+36*j+h*8,24,2,6,1,'hi');
    }
    const side=36*m.b,ox=36*m.ox,oy=36*m.oy;for(const [x,y,w,d] of [[-74+ox,-74+oy,side+3,3],[-74+ox,-71+oy,3,side-3],[-74+side+ox,-71+oy,3,side-3],[-74+ox,-74+side+oy,side+3,3]])slab(x,y,w,d,5,5,'hi',true);
  }
  paintOrder(items,P,k);record?.finish?.(P);return items.sort((a,b)=>a.key-b.key).map(x=>x.svg).join('');
}
const settings={
 calibration:{title:'用同一组观测校准直线',min:-.5,max:1.5,step:.01,value:0,label:'截距 w₀',caption:'后侧夹块的参考高度是观测 t，前侧滑块的是预测 y。两者的有符号高度差为 r=y−t；竖尺显示测臂间隔，符号看相对高度与读数。四个 r 的平方共同决定损失。'},
 fisher:{title:'旋转投影尺，比较分离与波动',min:0,max:3.14,step:.01,value:0,label:'投影方向 θ（弧度）',caption:'样本位置保持不变，旋转的是单位投影方向。两类投影标记分列在并排刻道，沿尺坐标都是 wᵀx；J 是中心差平方与类内散度之比，不是准确率或概率。'},
 relu:{title:'零位挡块：负输入不推动输出',min:-2,max:2,step:.01,value:-1,label:'预激活 a',caption:'上轨记录输入，下轨记录 max(0,a)。这是函数的机械类比；在零点左右斜率不同，不能给出普通导数。'},
 hog:{title:'移动观察框，数清 HOG 的维数',min:1,max:4,step:1,value:3,label:'Block 边长（Cell）',caption:'图像为 32×32 像素，每格为 8×8 像素，方向箱为 9，Block 每次移动一格。亮框显示一个归一化邻域；完整描述子遍历所有合法位置。格内纹理仅示意，具体方向投票见正文。'}
};
const out='public/anatomy/ml';fs.mkdirSync(out,{recursive:true});
for(const [mode,s]of Object.entries(settings)){
 const controls=`<div class="controls"><label>${s.label}<input id="u" type="range" min="${s.min}" max="${s.max}" step="${s.step}" value="${s.value}"></label>${mode==='calibration'?'<label>斜率 w₁<input id="v" type="range" min="-.5" max="1.5" step=".01" value="1"></label><button id="fit">到最小二乘解</button>':mode==='hog'?'<label>Block 位置<input id="v" type="range" min="0" max="3" step="1" value="0"></label>':''}<button id="play" aria-pressed="false">演示</button></div><output id="numbers" aria-live="polite"></output>`;
 const facts=mode==='calibration'?'<p>四测头从左到右：x=[−1,0,1,2]，固定观测 t=[0,1,1,4]。各高度为教学映射，同一组参数产生四个预测。</p>':mode==='fisher'?'<p>固定样本：C₁={(−2,−1),(−1,0),(−2,1)}；C₂={(1,0),(2,1),(1,2)}。横纵坐标同单位；并排刻道只用于排开标记，不改变沿尺投影坐标。</p>':'';
 const body=k.plateHtml({fig:'ML',title:s.title,hint:'拖动滑块，或用方向键逐步调整',body:k.figureSvg({width:680,height:390,label:s.title,body:drawing(mode,s.value,1)}),caption:s.caption})+controls+facts;
 const live=`${paintOrder.toString().replace(/^export /,'')}\nconst MODE=${JSON.stringify(mode)}, SETTINGS=${JSON.stringify(s)};${model.toString()}\n${drawing.toString().replace(/^export /,'').replace(/\bk\./g,'').replace('paintOrder(items,P,k)','paintOrder(items,P,{iso,depthOf,towardViewer})')}\nconst k=undefined;const u=document.querySelector('#u'),v=document.querySelector('#v'),numbers=document.querySelector('#numbers');let current=+u.value,slope=v?+v.value:1,playing=false,visible=true,last=0,elapsed=0,frameId=0,frames=0;const reduced=matchMedia('(prefers-reduced-motion: reduce)');document.body.dataset.theme=new URLSearchParams(location.search).get('theme')||'light';function updateDrawing(markup){const svg=document.querySelector('svg'),holder=document.createElementNS('http://www.w3.org/2000/svg','svg');holder.innerHTML=markup;const next=[...holder.children],old=[...svg.children];if(next.length!==old.length||next.some((e,i)=>e.tagName!==old[i].tagName)){svg.replaceChildren(...next);return;}for(let i=0;i<next.length;i++){for(const a of [...old[i].attributes])if(!next[i].hasAttribute(a.name))old[i].removeAttribute(a.name);for(const a of next[i].attributes)if(old[i].getAttribute(a.name)!==a.value)old[i].setAttribute(a.name,a.value);}}function render(){if(MODE==='hog'){v.max=model(MODE,current,slope).blocks-1;slope=Math.min(slope,+v.max);v.value=slope}updateDrawing(drawing(MODE,current,slope));const m=model(MODE,current,slope);numbers.textContent=MODE==='calibration'?'w₀='+current.toFixed(2)+'，w₁='+slope.toFixed(2)+'；r=['+m.r.map(x=>x.toFixed(2)).join(', ')+']；L='+m.L.toFixed(4)+'；∇L=['+m.g.map(x=>x.toFixed(3)).join(', ')+']':MODE==='fisher'?'θ='+current.toFixed(2)+'；投影均值=['+m.means.map(x=>x.toFixed(2)).join(', ')+']；类内散度='+m.sw.toFixed(3)+'；J='+(m.J===null?'退化':m.J.toFixed(3)):MODE==='relu'?'a='+current.toFixed(2)+'；ReLU(a)='+m.z.toFixed(2)+'；导数='+(m.derivative===null?'零点不存在':m.derivative):'当前 Block='+(m.index+1)+'/'+m.blocks+'；Block 数='+m.blocks+'；每 Block='+m.per+' 维；总维数='+m.D;document.querySelector('[data-readout]').textContent=MODE==='calibration'?'L = '+m.L.toFixed(3):MODE==='hog'?m.D+' 维':MODE==='relu'?'z = '+m.z.toFixed(2):'J = '+(m.J===null?'—':m.J.toFixed(2));}function stop(){playing=false;cancelAnimationFrame(frameId);frameId=0;last=0;document.querySelector('#play').setAttribute('aria-pressed','false');}function schedule(){if(!frameId&&playing&&visible&&!document.hidden&&!reduced.matches)frameId=requestAnimationFrame(frame);}u.oninput=()=>{stop();current=+u.value;render()};if(v)v.oninput=()=>{stop();slope=+v.value;render()};document.querySelector('#fit')?.addEventListener('click',()=>{stop();u.value=current=.9;v.value=slope=1.2;render()});document.querySelector('#play').onclick=()=>{if(reduced.matches){current=SETTINGS.value;render();return}playing=!playing;document.querySelector('#play').setAttribute('aria-pressed',String(playing));if(playing)schedule();else{cancelAnimationFrame(frameId);frameId=0;last=0}};new IntersectionObserver(e=>{visible=e[0].isIntersecting;if(visible)schedule();else{cancelAnimationFrame(frameId);frameId=0;last=0}}).observe(document.querySelector('main'));document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(frameId);frameId=0;last=0}else schedule()});reduced.addEventListener('change',stop);function frame(t){frameId=0;frames++;const dt=last?Math.min((t-last)/1000,.05):0;last=t;if(playing&&visible&&!document.hidden&&!reduced.matches){elapsed+=dt;const f=(1-Math.cos(elapsed*.55))/2;current=SETTINGS.min+(SETTINGS.max-SETTINGS.min)*f;if(MODE==='hog'){current=Math.round(current);slope=Math.floor(elapsed)%model(MODE,current,0).blocks;}u.value=current;render();schedule()}}render();new ResizeObserver(()=>parent.postMessage({type:'anatomy:size',height:document.body.scrollHeight},location.origin)).observe(document.body);window.anatomyModel=model;window.anatomyState=()=>({mode:MODE,current,slope,playing,visible,frames});`;
 let html=k.pageHtml({title:s.title,theme:'light',body,script:kitScript()+live,width:760}).replace('<html lang="en">','<html lang="zh-CN">').replace('</head>','<style>.iso-page{margin:12px auto 20px}.controls{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.controls label{flex:1;min-width:130px}input{display:block;width:100%}button{background:var(--anatomy-face);color:var(--anatomy-strong);border:1px solid var(--anatomy-mid);border-radius:6px;padding:7px 12px}output{display:block;min-height:54px;margin-top:14px;font-variant-numeric:tabular-nums}.iso-plate-corner{font-size:10px}@media(max-width:420px){.iso-plate-corner[data-corner="title"]{max-width:62%;font-size:9px}.iso-plate-corner[data-corner="hint"]{max-width:55%;font-size:8px}}</style></head>');
 fs.writeFileSync(`${out}/${mode}.html`,html);
}
console.log('ML Anatomy: 4 standalone figures generated');

if(process.argv.includes('--audit')){
 const logs=[];
 for(const [mode,u,v]of [['calibration',0,1],['calibration',.9,1.2],['calibration',-.5,-.5],['calibration',1.5,1.5],['fisher',0,1],['fisher',1.57,1],['relu',-2,1],['relu',0,1],['relu',2,1],['hog',1,0],['hog',3,3],['hog',4,0]]){
  let R;const drawn=[];const record=(d,item,P)=>{R??=A.recorder(P);const name=mode+'.'+drawn.length,meta={name,ground:d.type==='slab'&&d.z===-16};const shape=d.type==='slab'?A.slab(d.plan,d.z,d.h,meta,4):d.type==='ring'?A.extruded(d.ring,d.z,d.h,meta):A.prism(d.F,d.poly,d.s0,d.s1,meta);R.solid(shape);const ri=R.put({name,key:item.key,shapes:[shape],svg:item.svg});drawn.push([item,ri]);};record.finish=P=>{A.settle(R,P);for(const [item,ri]of drawn){ri.key=item.key;ri.svg=item.svg}};drawing(mode,u,v,record);const result=A.audit(R);logs.push({mode,u,v,solids:R.solids.length,failures:A.failures(result),result});console.log(mode,u,v,A.report(result));
 }
 fs.mkdirSync('reports/anatomy-ml',{recursive:true});fs.writeFileSync('reports/anatomy-ml/geometry-audit.json',JSON.stringify(logs,null,2));if(logs.some(x=>x.failures))process.exitCode=1;else console.log('ML audit passed');
}
