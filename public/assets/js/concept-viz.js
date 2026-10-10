(function () {
  const color = (name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const fit = (canvas) => {
    const dpr = Math.min(devicePixelRatio || 1, 2), w = Math.max(300, canvas.clientWidth || 600), h = 280;
    canvas.width = w * dpr; canvas.height = h * dpr;
    const c = canvas.getContext('2d'); c.setTransform(dpr, 0, 0, dpr, 0, 0); c.clearRect(0, 0, w, h);
    return { c, w, h };
  };
  const line = (c, points, stroke, width = 2, dash = []) => { c.strokeStyle = stroke; c.lineWidth = width; c.setLineDash(dash); c.beginPath(); points.forEach((p, i) => i ? c.lineTo(p[0], p[1]) : c.moveTo(p[0], p[1])); c.stroke(); c.setLineDash([]); };
  const dot = (c, x, y, fill, r = 5) => { c.fillStyle = fill; c.beginPath(); c.arc(x, y, r, 0, Math.PI * 2); c.fill(); };
  const text = (c, s, x, y, fill) => { c.fillStyle = fill || color('--muted'); c.font = '13px system-ui'; c.fillText(s, x, y); };
  const axes = (c, w, h) => { line(c, [[35, 18], [35, h - 30], [w - 18, h - 30]], color('--line')); };
  const map = (v, a, b) => a + v * (b - a);

  function drawViz(id, canvas, value, readout) {
    const v = value / 100, { c, w, h } = fit(canvas), A = color('--accent'), H = color('--highlight'), B = color('--bad'), G = color('--good'), D = color('--dim');
    let report = '';
    axes(c, w, h);
    switch (id) {
      case 'a1': { const degree = 1 + Math.round(v * 9); const pts = []; for (let i=0;i<150;i++){const x=i/149,y=.18+.65*x+(degree-2)*.012*Math.sin((degree+1)*Math.PI*x)/(.08+x*(1-x));pts.push([35+x*(w-55),h-30-y*(h-55)]);} line(c,pts,A,3); [[.05,.22],[.25,.38],[.48,.51],[.7,.68],[.92,.8]].forEach(p=>dot(c,35+p[0]*(w-55),h-30-p[1]*(h-55),H)); report=`M=${degree}：次数改变可用形状；高次数开始追逐点间噪声。`; break; }
      case 'a2': { const col=Math.min(3,Math.floor(v*4)); for(let r=0;r<4;r++)for(let k=0;k<4;k++){c.fillStyle=k===col?A:'transparent';c.strokeStyle=D;c.fillRect(55+k*48,35+r*42,44,38);c.strokeRect(55+k*48,35+r*42,44,38);text(c,((r+1)*(k+1)).toString(),69+k*48,59+r*42,k===col?'#06101d':D);} line(c,[[270,115],[w-70,115]],H,4); report=`高亮第 ${col+1} 列：列=一种基函数；行×权重得到一个样本的预测。`; break; }
      case 'a3': { const e=map(v,-2,2),sq=e*e; line(c,[[w*.25,h-30],[w*.25,h-30-e*55]],B,12); c.fillStyle=A;c.fillRect(w*.58,h-30-sq*35,54,sq*35); text(c,'残差 e',w*.18,30);text(c,'代价 e²',w*.53,30);report=`e=${e.toFixed(2)}，e²=${sq.toFixed(2)}：符号消失，大误差被放大。`; break; }
      case 'a4': { const x=map(v,-2.4,2.4),loss=x*x,px=35+(x+3)/6*(w-55),py=h-30-loss/9*(h-55); const curve=[];for(let i=0;i<120;i++){const q=-3+i/20;curve.push([35+(q+3)/6*(w-55),h-30-q*q/9*(h-55)]);}line(c,curve,A,3);dot(c,px,py,H,7);line(c,[[px,py],[px-Math.sign(x)*55,py+35]],B,4);report=`θ=${x.toFixed(2)}，梯度=2θ=${(2*x).toFixed(2)}；箭头反向指向更低损失。`;break; }
      case 'a5': { const slope=map(v,.2,1.2),points=[[0,1],[1,2],[2,2]],sx=x=>55+x*(w-110)/2,sy=y=>h-35-y*(h-75)/3;line(c,[[sx(0),sy(1)],[sx(2),sy(1+2*slope)]],A,3);let sse=0;points.forEach(([x,y])=>{const p=1+slope*x;sse+=(y-p)**2;line(c,[[sx(x),sy(y)],[sx(x),sy(p)]],B);dot(c,sx(x),sy(y),H);});report=`w₀=1，w₁=${slope.toFixed(2)}，SSE=${sse.toFixed(3)}；回代残差才能验算。`;break; }
      case 'a6': { const tx=map(v,80,w*.7),ty=55;line(c,[[55,h-45],[w-45,70]],D,3);const dx=w-100,dy=115-h,ux=dx/Math.hypot(dx,dy),uy=dy/Math.hypot(dx,dy),rx=tx-55,ry=ty-(h-45),len=rx*ux+ry*uy,px=55+len*ux,py=h-45+len*uy;line(c,[[55,h-45],[tx,ty]],H,4);line(c,[[55,h-45],[px,py]],A,4);line(c,[[px,py],[tx,ty]],B,2,[5,5]);report='蓝色是可达到的最近预测；红色残差与模型列空间垂直。';break; }
      case 'a7': { const sigma=map(v,.35,1.4),cx=w/2,base=h-35,pts=[];for(let i=0;i<160;i++){const x=-3+i*6/159,y=Math.exp(-x*x/(2*sigma*sigma))/(sigma*2.506);pts.push([35+(x+3)/6*(w-55),base-y*170]);}line(c,pts,A,3);const r=.9,like=Math.exp(-r*r/(2*sigma*sigma))/(sigma*2.506);dot(c,35+(r+3)/6*(w-55),base-like*170,H,7);report=`σ=${sigma.toFixed(2)}，固定残差 r=0.90 的密度=${like.toFixed(3)}；−log 后出现 r²/(2σ²)。`;break; }
      case 'a8': { const prior=map(v,.05,.95),lh=.8,fp=.2,post=prior*lh/(prior*lh+(1-prior)*fp);[['先验',prior,A],['证据后',post,H]].forEach((d,i)=>{text(c,d[0],55,55+i*75);c.fillStyle=D;c.fillRect(120,35+i*75,w-170,30);c.fillStyle=d[2];c.fillRect(120,35+i*75,(w-170)*d[1],30);});report=`P(H)=${prior.toFixed(2)} → P(H|E)=${post.toFixed(3)}；后验=先验×似然再归一化。`;break; }
      case 'a9': { const e=map(v,-2.5,2.5),px=x=>35+(x+3)/6*(w-55),py=y=>h-30-y/7*(h-55);const l1=[],l2=[];for(let i=0;i<120;i++){const x=-3+i/20;l1.push([px(x),py(Math.abs(x))]);l2.push([px(x),py(x*x/2)]);}line(c,l1,H,3);line(c,l2,A,3);dot(c,px(e),py(e*e/2),A);report=`误差=${e.toFixed(2)}；蓝=L2，黄=L1。损失表达“哪类错误更贵”。`;break; }
      case 'a10': { const eta=map(v,.03,1.15),path=[];let x=2.6;for(let i=0;i<9;i++){path.push(x);x-=eta*2*x;}const px=x=>35+(x+3)/6*(w-55),py=y=>h-30-y/9*(h-55),curve=[];for(let i=0;i<120;i++){const q=-3+i/20;curve.push([px(q),py(q*q)]);}line(c,curve,D,2);line(c,path.map(q=>[px(q),py(q*q)]),A,3);path.forEach(q=>dot(c,px(q),py(q*q),H,3));report=`η=${eta.toFixed(2)}；${Math.abs(x)<.1?'收敛到谷底':'步长过大时会跨过谷底并振荡'}。`;break; }
      case 'a11': { const size=1+Math.round(v*31),trueG=.65;for(let i=0;i<size;i++){const g=trueG+.55*Math.sin(i*2.3+value);line(c,[[55+i*(w-100)/size,h-40],[55+i*(w-100)/size,h-40-g*120]],i%2?A:H,2);}report=`batch=${size}；样本平均让梯度噪声大致随批量增大而减小。`;break; }
      case 'a12': { const complexity=1+Math.round(v*9),px=x=>35+x/10*(w-55),py=y=>h-30-y*(h-60),train=[],val=[];for(let x=0;x<=10;x++){train.push([px(x),py(.9-.07*x)]);val.push([px(x),py(.62-.08*x+.009*x*x)]);}line(c,train,A,3);line(c,val,H,3);dot(c,px(complexity),py(.62-.08*complexity+.009*complexity*complexity),H,7);report=`复杂度=${complexity}；训练误差继续降，验证误差会出现转折。`;break; }
      case 'a13': { const lambda=map(v,0,8),raw=[2.2,-1.4,.8],shrunk=raw.map(x=>x/(1+lambda));shrunk.forEach((x,i)=>{const y=55+i*62;line(c,[[w/2,y],[w/2+x*65,y]],A,10);text(c,`w${i+1}=${x.toFixed(2)}`,55,y+5);});report=`λ=${lambda.toFixed(2)}；岭解连续收缩大权重，但通常不会精确变成 0。`;break; }
      case 'a14': { const t=map(v,.25,1.2),cx=w/2,cy=h/2;c.strokeStyle=A;c.lineWidth=3;c.strokeRect(cx-75*t,cy-75*t,150*t,150*t);c.save();c.translate(cx,cy);c.rotate(Math.PI/4);c.strokeStyle=H;c.strokeRect(-53*t,-53*t,106*t,106*t);c.restore();dot(c,cx+75*t,cy,H,7);report=`约束半径=${t.toFixed(2)}；L1 的尖角落在坐标轴上，更容易得到零分量。`;break; }
      case 'a15': { const fold=Math.min(4,Math.floor(v*5));for(let i=0;i<5;i++){c.fillStyle=i===fold?H:A;c.fillRect(45+i*(w-80)/5,75,(w-95)/5,70);text(c,i===fold?'验证':'训练',48+i*(w-80)/5,165);}report=`第 ${fold+1} 折作验证；均值和方差必须只用其余训练折计算。`;break; }
      case 'b1': { const angle=map(v,-.8,.8),cx=w/2,cy=h/2;line(c,[[cx-220,cy-angle*220],[cx+220,cy+angle*220]],A,3);const px=cx+70,py=cy-75,d=(py-cy-angle*(px-cx))/Math.sqrt(1+angle*angle);dot(c,px,py,H,7);line(c,[[px,py],[px,py-d]],B,2,[5,5]);report=`边界斜率=${angle.toFixed(2)}；几何距离需要除以法向量范数。`;break; }
      case 'b2': { const p=[.15+.35*v,.7-.3*v,.15-.05*v],target=[0,1,0];p.forEach((x,i)=>{c.fillStyle=A;c.fillRect(70+i*120,h-30-x*180,55,x*180);line(c,[[70+i*120,h-30-target[i]*180],[125+i*120,h-30-target[i]*180]],H,4);});report=`平方误差=${p.reduce((s,x,i)=>s+(x-target[i])**2,0).toFixed(3)}；输出可不在概率单纯形内。`;break; }
      case 'b3': { const spread=map(v,.35,1.2),px=x=>35+(x+4)/8*(w-55),py=y=>h-30-y*170;[-1.2,1.2].forEach((mu,j)=>{const pts=[];for(let i=0;i<120;i++){const x=-4+i/15,y=Math.exp(-((x-mu)**2)/(2*spread**2))/(spread*2.506);pts.push([px(x),py(y)]);}line(c,pts,j?H:A,3);});line(c,[[px(0),25],[px(0),h-30]],D,2,[5,5]);report=`共享 σ=${spread.toFixed(2)}；两类方差相同，log 密度差中的二次项相消。`;break; }
      case 'b4': { const step=map(v,0,1),x1=95+step*90,y1=75+step*40;line(c,[[70,h-35],[w-55,55]],A,3);dot(c,x1,y1,B,8);line(c,[[x1,y1],[x1+55,y1-35]],H,4);report=`更新进度=${step.toFixed(2)}；只让误分类点推动边界朝正确一侧移动。`;break; }
      case 'b5': { const a=map(v,-6,6),sig=x=>1/(1+Math.exp(-x)),pts=[];for(let i=0;i<140;i++){const x=-7+i/10;pts.push([35+(x+7)/14*(w-55),h-30-sig(x)*(h-55)]);}line(c,pts,A,3);dot(c,35+(a+7)/14*(w-55),h-30-sig(a)*(h-55),H,7);report=`logit=${a.toFixed(2)} → p=${sig(a).toFixed(3)}；BCE(t=1)=${(-Math.log(sig(a))).toFixed(3)}。`;break; }
      case 'b6': { const temp=map(v,.25,3),logits=[2.2,1.1,-.4],ex=logits.map(x=>Math.exp(x/temp)),sum=ex.reduce((a,b)=>a+b),p=ex.map(x=>x/sum);p.forEach((x,i)=>{c.fillStyle=i===0?H:A;c.fillRect(70+i*120,h-30-x*190,60,x*190);text(c,x.toFixed(3),73+i*120,h-38-x*190);});report=`温度=${temp.toFixed(2)}，概率和=${p.reduce((a,b)=>a+b,0).toFixed(3)}；低温更尖锐。`;break; }
      case 'c1': { [[.25,.25,0],[.75,.75,0],[.25,.75,1],[.75,.25,1]].forEach(p=>dot(c,55+p[0]*(w-100),35+p[1]*(h-70),p[2]?H:A,8));const bend=map(v,.2,.8);line(c,[[w*.2,h*.52],[w*bend,h*.52],[w*bend,h*.2]],G,4);report=`隐藏门位置=${bend.toFixed(2)}；两条线性门组合后可围出 XOR 的非线性区域。`;break; }
      case 'c2': { const mix=v,px=x=>35+(x+4)/8*(w-55),py=y=>h/2-y*55,relu=[],sig=[];for(let i=0;i<120;i++){const x=-4+i/15;relu.push([px(x),py(Math.max(0,x))]);sig.push([px(x),py(1/(1+Math.exp(-x)))]);}line(c,relu,A,3);line(c,sig,H,3);report=`混合控制=${mix.toFixed(2)}；ReLU 正区间导数 1，sigmoid 饱和区导数接近 0。`;break; }
      case 'c3': { const noise=map(v,0,1),path=[];let x=-2.3,y=1.7;for(let i=0;i<18;i++){path.push([x,y]);x-=.18*(2*x+noise*Math.sin(i*7));y-=.18*(4*y+noise*Math.cos(i*5));}for(let r=1;r<5;r++){c.strokeStyle=D;c.beginPath();c.ellipse(w/2,h/2,r*45,r*24,0,0,Math.PI*2);c.stroke();}line(c,path.map(p=>[w/2+p[0]*55,h/2+p[1]*45]),A,3);report=`mini-batch 噪声=${noise.toFixed(2)}；Hessian 的不同曲率让路径在窄谷中之字形。`;break; }
      case 'c4': { const phase=Math.min(3,Math.floor(v*4)),xs=[70,w*.35,w*.65,w-70],ys=[h/2,h*.32,h*.68,h/2];for(let i=0;i<3;i++)line(c,[[xs[i],ys[i]],[xs[i+1],ys[i+1]]],i<phase?H:A,4);xs.forEach((x,i)=>{dot(c,x,ys[i],i===phase?H:A,10);text(c,['x','a,z','logit','L'][i],x-8,ys[i]-16);});report=`阶段 ${phase+1}/4：前向保存中间量；反向复用损失对节点的敏感度。`;break; }
      case 'c5': { const eps=10**map(v,-7,-1),trueG=.42,num=trueG+eps*eps+1e-9/eps;c.fillStyle=A;c.fillRect(w*.28,h-30-trueG*300,70,trueG*300);c.fillStyle=H;c.fillRect(w*.58,h-30-num*300,70,num*300);text(c,'解析',w*.3,h-10);text(c,'数值',w*.6,h-10);report=`ε=${eps.toExponential(1)}，相对误差=${(Math.abs(num-trueG)/(Math.abs(num)+Math.abs(trueG))).toExponential(2)}；过大截断，过小舍入。`;break; }
      default: report = id;
    }
    readout.textContent = report;
  }

  function init() {
    document.querySelectorAll('[data-viz]').forEach((lab) => {
      const canvas = lab.querySelector('canvas'), input = lab.querySelector('input[type="range"]'), readout = lab.querySelector('.readout');
      if (!canvas || !input || !readout) return;
      const draw = () => drawViz(lab.dataset.viz, canvas, Number(input.value), readout);
      input.addEventListener('input', draw); addEventListener('resize', draw); draw();
    });
  }
  addEventListener('DOMContentLoaded', init);
}());
