const query=new URLSearchParams(location.search);document.body.dataset.theme=query.get('theme')==='dark'?'dark':'light';
const modes={
 convex:['凸集：合格位置之间能走吗？',[['t','线段参数 t',0,1,.01,.5]],'a=(0,0)、b=(1.5,.5)都满足x+y≤2。一般凸性的全称证明仍需线性不等式。'],
 energy:['曲率：同样移动一格，哪次代价更高？',[['x','位置 x',-.3,2.6,.02,1],['y','位置 y',-.2,2.2,.02,.5]],'q=½[(x−2)²+4(y−1)²]；∇q=(x−2,4(y−1))，H=diag(1,4)。表盘显示力模，卡片保留梯度符号。控制器模拟正刚度，机械缓动不是梯度下降。'],
 kkt:['弹性载荷未消失，谁抵消它？',[['c','挡板截距 c',1,4,.02,2]],'g=x+y−c，∇g=(1,1)不是单位法向。测力表读||R||=λ√2，另列乘子λ。c=3时约束活动但反力为零。显示范围不是额外盒约束。'],
 line:['方向选定，这一步多远才合格？',[['alpha','步长 α',0,1,.01,.5]],'从原点沿p=(2,4)试步；φ(α)=4−20α+34α²。Armijo c₁=.1，Wolfe c₂=.9。下一步按钮扫描1→.5→.25→5/17。'],
 trust:['先看实际下降与模型预测的比。',[['delta','行程半径 Δ',.1,2,.02,.7],['nonlinear','非二次模板 0/1',0,1,1,0]],'环限制算法步，不是原问题约束。这里求Cauchy步。精确二次且B=H时ρ恒1；切换非二次后f=q+.05(x−2)⁴，同时重算g/H。'],
 fitting:['三只表不能同时归零，怎样折中？',[],'A=[[1,0],[0,1],[−1,1]]，b=(1,2.1,1.2)。最小二乘满足Aᵀr=0，不要求每个残差为零。'],
 ridge:['中心偏好怎样改变同一份拟合？',[['lambda','正则强度 λ',0,10,.1,1]],'目标½||Az−b||²+λ||z||²/2。它改变模型，而非仅缩小算法步；这里只解释L2，不模拟L1稀疏性。'],
 fusion:['两只表意见不同，精度怎样决定折中？',[['P','先验方差 P',.2,8,.1,4],['R','测量方差 R',.2,8,.1,1]],'独立线性高斯：先验均值10、观测12，P⁺=(1/P+1/R)⁻¹，μ⁺=P⁺(10/P+12/R)。台上x=μ⁺−10只是显示平移，真实均值在读数栏。'],
 projection:['半空间最近点为什么沿法向？',[['x','待投影点 x',0,2.6,.02,2],['y','待投影点 y',0,2.2,.02,1]],'欧氏投影p=a−max(0,a₁+a₂−2)(1,1)/2。已经可行的点不动；闭凸集合的投影性质仍需正文条件。'],
 equality:['锁住自由度后，梯度必须为零吗？',[['c','等式 x+y=c',1,3,.02,2]],'仿射导轨的自由方向满足Ap=0。此例乘子λ=(3−c)/1.25，x=2−λ，y=1−λ/4；等式乘子可正可负。'],
 barrier:['互补正确就一定是精确中心吗？',[['mu','障碍权重 μ',.01,1,.01,.1]],'主动软墙模拟½(x−2)²−μlog(1−x)，λ=μ/(1−x)。本页计算精确中心r=x−2+λ≈0，故gap=μ；任意内部点还需看r，普通弹簧不天然产生log势能。'],
 cg:['第二方向为何保留第一步的进展？',[['index','CG步号',0,2,1,1]],'A=diag(1,4)，b=(2,4)。控制程序执行CG，不是自由机械运动。二维SPD精确算术至多两步；浮点和非线性不能照搬。'],
 secant:['两次测力，知道全部刚度矩阵了吗？',[['s','探测位移 s',.1,1,.02,.5]],'固定y沿x探测：维持静态的外加载荷之差y=s，所以割线刚度y/s=1。此次只量一个方向，二维其它方向仍未确定。'],
 derivative:['间隔更小，导数为什么可能更差？',[['h','差分间隔 h',.001,.2,.001,.01]],'f=x²在x=1中心差分；两次能量读数叠加±10⁻⁴的示意误差，得到2+10⁻⁴/h。不是随机噪声统计保证，也不是AD误差。'],
 penalty:['有限罚参数为什么仍有偏离？',[['rho','罚参数 ρ',1,30,1,10],['nu','乘子估计 ν',-1,0,.02,0]],'min x且x=0：内层解x=−(1+ν)/ρ。ν=0是纯二次罚，ν=−1恢复原解；下一步执行ν⁺=ν+ρx，这是算法动作。'],
 design:['同方向重复，为何仍有测不到的方向？',[['angle','第二测头方向 θ',0,90,1,60]],'v₁=(1,0)，v₂=(cosθ,sinθ)，单位独立方差。M=Σvvᵀ，det M=sin²θ。θ=0秩1，无有限二维协方差；转动补上盲方向。']
};
let mode=query.get('mode') in modes?query.get('mode'):'energy',values={},visible=true,frame=0,display=[1,.5],target=[1,.5],last=0;
const stage=document.querySelector('.iso-stage'),controls=document.querySelector('#controls'),metrics=document.querySelector('#metrics'),plot=document.querySelector('#plot'),reduced=matchMedia('(prefers-reduced-motion: reduce)');
const fmt=v=>Math.abs(v)<1e-9?'0':Number(v).toFixed(4).replace(/0+$/,'').replace(/\.$/,'');
document.querySelector('#mode').innerHTML=Object.entries(modes).map(([v,a])=>'<option value="'+v+'">'+a[0]+'</option>').join('');
function sample(){let point=[values.x??1,values.y??.5],wall=false,c=values.c??2,normalForce=0,fields=[];
 if(mode==='convex'){point=[1.5*values.t,.5*values.t];wall=true;fields=[['位置',point.map(fmt).join(', ')],['约束余量',fmt(2-point[0]-point[1])]];}
 if(mode==='energy')fields=[['q',fmt(energy(point))],['∇q',gradient(point).map(fmt).join(', ')],['H特征值','1, 4']];
 if(mode==='kkt'){const r=constrained(c);point=r.point;wall=true;normalForce=r.normalForce;fields=[['λ（乘子）',fmt(r.lambda)],['||R||（法向力）',fmt(r.normalForce)],['R向量',r.reaction.map(fmt).join(', ')],['q / 对偶下界',fmt(r.value)+' / '+fmt(r.dual)],['约束余量s / 实际间隙',fmt(r.slack)+' / '+fmt(r.normalGap)],['位置',point.map(fmt).join(', ')]];}
 if(mode==='line'){const r=line(values.alpha);point=r.point;fields=[['φ(α)',fmt(r.value)],['φ′(α)',fmt(r.slope)],['Armijo',r.armijo?'通过':'拒绝'],['弱/强Wolfe曲率',(r.wolfe?'通过':'拒绝')+' / '+(r.strong?'通过':'拒绝')]];}
 if(mode==='trust'){const r=trust(values.delta,Boolean(values.nonlinear));point=r.point;fields=[['实际/预测下降',fmt(r.actual)+' / '+fmt(r.predicted)],['ρ',fmt(r.rho)],['||p|| / Δ',fmt(Math.hypot(...point))+' / '+fmt(values.delta)]];}
 if(mode==='fitting'||mode==='ridge'){const r=leastSquares(mode==='ridge'?values.lambda:0);point=r.point;fields=[['参数',point.map(fmt).join(', ')],['残差',r.residual.map(fmt).join(', ')],['目标',fmt(r.value)]];}
 if(mode==='fusion'){const r=fusion(values.P,values.R);point=[r.mean-10,1];fields=[['后验均值',fmt(r.mean)],['后验方差',fmt(r.variance)]];}
 if(mode==='projection'){const a=[values.x,values.y];point=projected(a);fields=[['原点',a.map(fmt).join(', ')],['投影',point.map(fmt).join(', ')],['距离',fmt(Math.hypot(a[0]-point[0],a[1]-point[1]))]];}
 if(mode==='equality'){const l=(3-c)/1.25;point=[2-l,1-l/4];fields=[['位置',point.map(fmt).join(', ')],['等式乘子',fmt(l)],['x+y−c',fmt(point[0]+point[1]-c)]];}
 if(mode==='barrier'){const r=barrier(values.mu);point=[r.x,1];fields=[['x',fmt(r.x)],['λs / μ',fmt(r.lambda*r.slack)+' / '+fmt(values.mu)],['驻点残差',fmt(r.residual)]];}
 if(mode==='cg'){const r=cgSteps()[values.index];point=r.point;fields=[['步号',values.index],['位置',point.map(fmt).join(', ')],['残差',r.residual.map(fmt).join(', ')]];}
 if(mode==='secant'){point=[1+values.s,1];fields=[['位移s / 力差y',fmt(values.s)+' / '+fmt(values.s)],['y/s',1]];}
 if(mode==='derivative'){const r=finiteDifference(values.h);point=[1+values.h,1];fields=[['数值导数 / 真导数',fmt(r.value)+' / 2'],['绝对误差',fmt(Math.abs(r.value-2))]];}
 if(mode==='penalty'){const r=penalty(values.rho,values.nu);point=[r.x,1];fields=[['x / 约束违背',fmt(r.x)+' / '+fmt(r.violation)],['下次乘子ν⁺',fmt(r.nuNext)]];}
 if(mode==='design'){const th=values.angle*Math.PI/180,det=Math.sin(th)**2;point=[1+Math.cos(th),.5+Math.sin(th)];fields=[['det M',fmt(det)],['二维协方差',det<1e-10?'不存在有限逆':'M⁻¹存在']];}
 return {point,wall,c,normalForce,fields};}
function drawPlot(s){
 const px=x=>35+530*x,py=y=>112-80*y,path=p=>'M'+p.map(a=>a.join(',')).join('L');let content='';
 if(mode==='line'){const curve=Array.from({length:101},(_,i)=>[px(i/100),py((4-20*i/100+34*(i/100)**2)/20)]);content='<path d="'+path(curve)+'"/><path d="'+path([[px(0),py(.2)],[px(1),py(.1)]])+'" stroke-dasharray="5 4"/><circle cx="'+px(values.alpha)+'" cy="'+py(line(values.alpha).value/20)+'" r="4" fill="currentColor"/><text x="40" y="16">实线φ(α) · 虚线Armijo界 · α从0到1</text>';}
 else if(mode==='design'){const a=values.angle*Math.PI/180;content='<path d="M180,105L420,105M180,105L'+(180+200*Math.cos(a))+','+(105-85*Math.sin(a))+'"/><text x="30" y="20">测头方向：重合时另一方向不可辨识</text>';}
 else content='';
 plot.toggleAttribute('hidden',!content);
 plot.innerHTML=content;
}
let liveParts=[],liveProjection=null;
function renderBench(){const a=bench(k,{...sample(),point:[1,.5]});liveProjection=a.P;stage.innerHTML=a.svg;liveParts=[...stage.querySelectorAll('[data-motion="x"],[data-motion="xy"]')];}
function draw(){const P=liveProjection,origin=k.iso([0,0,0],P),x=(display[0]-1)*15,y=(display[1]-.5)*15;
 for(const part of liveParts){const p=k.iso([x,part.dataset.motion==='xy'?y:0,0],P);part.setAttribute('transform','translate('+(p[0]-origin[0])+','+(p[1]-origin[1])+')');}
 const value=Math.hypot(display[0]-2,4*(display[1]-1)),angle=-Math.PI*.7+Math.min(value/6,1)*Math.PI*1.4;
 const needle=stage.querySelector('[data-part="gradient needle"] path');if(needle)needle.setAttribute('d',k.lineOnTop([0,114],[6*Math.cos(angle),114+6*Math.sin(angle)],9.15,P));document.querySelector('[data-readout]').textContent='当前台面 x='+fmt(display[0])+' · y='+fmt(display[1]);}
function tick(now){const dt=last?Math.min((now-last)/1000,.04):.02;last=now;display=display.map((v,i)=>reduced.matches?target[i]:v+(target[i]-v)*(1-Math.exp(-dt/.15)));if(Math.hypot(display[0]-target[0],display[1]-target[1])<.002)display=[...target];draw();frame=visible&&display.some((v,i)=>v!==target[i])?requestAnimationFrame(tick):0;}
function update(){const s=sample();renderBench();target=[...s.point];metrics.innerHTML=s.fields.map(([a,b])=>'<p>'+a+'<br><strong>'+b+'</strong></p>').join('');drawPlot(s);if(reduced.matches||mode==='kkt'||mode==='convex'){display=[...target];draw();}else if(visible&&!frame){last=0;frame=requestAnimationFrame(tick);}for(const input of controls.querySelectorAll('input'))input.closest('label').querySelector('output').textContent=fmt(values[input.name]);}
function reset(){values=Object.fromEntries(modes[mode][1].map(([id,,,,,v])=>[id,v]));document.querySelector('#mode').value=mode;document.querySelector('#question').textContent=modes[mode][0];document.querySelector('#explain').textContent=modes[mode][2];controls.innerHTML=modes[mode][1].map(([id,label,min,max,step,v])=>'<label class="control">'+label+' <output>'+v+'</output><input name="'+id+'" aria-label="'+label+'" type="range" min="'+min+'" max="'+max+'" step="'+step+'" value="'+v+'"></label>').join('');update();}
controls.addEventListener('input',e=>{values[e.target.name]=Number(e.target.value);update();});document.querySelector('#mode').addEventListener('change',e=>{mode=e.target.value;reset();});document.querySelector('#reset').onclick=reset;
document.querySelector('#step').onclick=()=>{const first=modes[mode][1][0];if(!first)return;if(mode==='line'){const seq=[1,.5,.25,5/17],i=seq.findIndex(a=>Math.abs(a-values.alpha)<1e-6);values.alpha=seq[(i+1)%seq.length];}else if(mode==='cg')values.index=(values.index+1)%3;else if(mode==='penalty')values.nu=penalty(values.rho,values.nu).nuNext;else values[first[0]]=Math.min(first[3],values[first[0]]+Math.max(first[4],(first[3]-first[2])/5));for(const input of controls.querySelectorAll('input'))input.value=values[input.name];update();};
stage.addEventListener('keydown',e=>{const i=e.key==='ArrowUp'||e.key==='ArrowDown'?1:0,def=modes[mode][1][i];if(e.key==='Home'){reset();e.preventDefault();return;}if(!def||!['ArrowLeft','ArrowRight','ArrowUp','ArrowDown'].includes(e.key))return;e.preventDefault();values[def[0]]=Math.min(def[3],Math.max(def[2],values[def[0]]+def[4]*(e.key==='ArrowLeft'||e.key==='ArrowDown'?-1:1)));controls.querySelector('[name="'+def[0]+'"]').value=values[def[0]];update();});
stage.addEventListener('pointerdown',e=>{const def=modes[mode][1][0];if(!def)return;const box=stage.getBoundingClientRect(),v=Math.max(0,Math.min(1,(e.clientX-box.left)/box.width));values[def[0]]=def[2]+Math.round(v*(def[3]-def[2])/def[4])*def[4];controls.querySelector('[name="'+def[0]+'"]').value=values[def[0]];update();stage.focus();});
new IntersectionObserver(entries=>{visible=entries.at(-1).isIntersecting;if(!visible&&frame){cancelAnimationFrame(frame);frame=0;}if(visible)update();}).observe(stage);
new ResizeObserver(()=>parent.postMessage({type:'anatomy:size',height:document.body.scrollHeight},location.origin)).observe(document.body);
window.optimizationState=()=>({mode,values:{...values},display:[...display],visible,frame,...sample()});reset();
