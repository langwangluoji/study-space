// One case, one convention: ground Z up, R camera -> world, equivalent plane z=-f.
// Projection lengths mm; ground m; pitch micrometres; rotations radians.
export const DEFAULT = Object.freeze({ f:150,H:1000,h:0,B:300,X:200,Y:100,pitch:10,width:230,noise:0,angle:0,iteration:0,scale:5,wrong:0,u:.25,v:.5 });
export const CONTROLS = {
 scale:[['H','摄站高程 H / m',700,1500,10],['B','基线 B / m',200,600,10],['width','像幅边长 / mm',36,230,194]],
 pixel:[['X','物点 X / m',-300,400,5],['Y','物点 Y / m',0,250,5]],
 pose:[['angle','相机绕 Y 轴 / °',-12,12,.5],['X','物点 X / m',-200,400,5]],
 stereo:[['h','物点高程 h / m',0,400,5],['B','同一物点：基线 B / m',200,600,10]],
 epipolar:[['wrong','沿核线误匹配 / mm',0,20,.5],['noise','偏离核线 / mm',0,.1,.005]],
 resection:[['iteration','六参数后交：迭代步',0,4,1]],
 orientation:[['scale','绝对定向尺度 / m每模型单位',1,8,.1]],
 adjustment:[['noise','右像 y 误差 / mm',0,.1,.005]],
 quality:[['wrong','沿核线误匹配 / mm',0,20,.5],['B','基线 B / m',200,600,10]],
 ortho:[['h','DEM高程 / m',0,100,1],['u','四像元插值 u',0,1,.05],['v','四像元插值 v',0,1,.05]]
};
export const MODES = {
 scale:['01','尺度与共同覆盖','升降摄站或改变基线；同一P是否仍在两张像幅内？'],
 pixel:['02','像元 → 毫米 → 射线','移动地面测标；行向下、像y向上，所以两者符号相反。'],
 pose:['03','同一向量换坐标','只转相机轴，不改变物点；先减摄影中心，再乘Rᵀ。'],
 stereo:['04','浮游测标与视差','抬高同一P或移动右相机；视差由几何自动更新。'],
 epipolar:['05','核线不保证同名点','沿核线故意选错点：核线残差可以为零，地面高程仍会错。'],
 resection:['06','控制点找回相机','按迭代步观察同一组六控制点的像方残差与相机改正。'],
 orientation:['07','模型如何获得尺度','相对几何不变；改变模型到地面的尺度，长度随之改变。'],
 adjustment:['08','有噪射线与交会','给右像y增加误差；最近点中点与像方最小二乘须分清。'],
 quality:['09','用独立点验收','比较核线残差、预测σh与独立检查偏差；三者回答不同问题。'],
 ortho:['10','地图格点回像片取色','DEM高程确定射线落点，四个灰度按u、v加权；不是凭空增加细节。']
};
export function rotation(w) {
 const a=Math.hypot(...w),[x,y,z]=w,K=[[0,-z,y],[z,0,-x],[-y,x,0]],I=[[1,0,0],[0,1,0],[0,0,1]];
 const s=a<1e-10?1:Math.sin(a)/a,t=a<1e-10?.5:(1-Math.cos(a))/(a*a);
 return I.map((row,i)=>row.map((v,j)=>v+s*K[i][j]+t*K[i].reduce((s,k,n)=>s+k*K[n][j],0)));
}
export function project(point,centre,f=150,R=[[1,0,0],[0,1,0],[0,0,1]]) {
 const q=R[0].map((_,j)=>point.reduce((s,v,i)=>s+R[i][j]*(v-centre[i]),0));
 return q[2]<-1e-10?{x:-f*q[0]/q[2],y:-f*q[1]/q[2],q}:null;
}
export function solve(A,b) {
 const m=A.map((r,i)=>[...r,b[i]]),n=b.length;
 for(let j=0;j<n;j++){let p=j;for(let i=j+1;i<n;i++)if(Math.abs(m[i][j])>Math.abs(m[p][j]))p=i;
 if(Math.abs(m[p][j])<1e-13)return null;[m[p],m[j]]=[m[j],m[p]];let q=m[j][j];for(let k=j;k<=n;k++)m[j][k]/=q;
 for(let i=0;i<n;i++)if(i!==j){q=m[i][j];for(let k=j;k<=n;k++)m[i][k]-=q*m[j][k];}}
 return m.map(r=>r[n]);
}
export function leastSquares(A,b){const n=A[0].length;return solve(Array.from({length:n},(_,i)=>Array.from({length:n},(_,j)=>A.reduce((s,r)=>s+r[i]*r[j],0))),Array.from({length:n},(_,i)=>A.reduce((s,r,k)=>s+r[i]*b[k],0)));}
export const CONTROL_POINTS=[[-200,-150,0],[200,-150,30],[200,150,80],[-200,150,20],[0,-80,100],[70,90,50]];
export function resectionTrace(){
 const obs=CONTROL_POINTS.flatMap(p=>{const q=project(p,[0,0,1000]);return[q.x,q.y]}),predict=t=>CONTROL_POINTS.flatMap(p=>{const q=project(p,t.slice(0,3),150,rotation(t.slice(3)));return[q.x,q.y]});
 let t=[10,-8,1020,.003,-.002,.004];const trace=[];
 for(let iter=0;iter<5;iter++){
 const pred=predict(t),res=obs.map((v,i)=>v-pred[i]),eps=[.001,.001,.001,1e-7,1e-7,1e-7];
 const J=pred.map((_,i)=>eps.map((e,j)=>{const a=t.slice(),b=t.slice();a[j]+=e;b[j]-=e;return(predict(a)[i]-predict(b)[i])/(2*e)}));
 trace.push({theta:t.slice(),rms:Math.sqrt(res.reduce((s,x)=>s+x*x,0)/12),residual:res});
 const d=leastSquares(J,res);if(!d)break;t=t.map((x,i)=>x+d[i]);
 }return trace;
}
export const RESECTION = resectionTrace();
export function closestIntersection(l,r,s) {
 const a=[l.x,l.y,-s.f],b=[r.x,r.y,-s.f],dot=(u,v)=>u.reduce((x,y,i)=>x+y*v[i],0),base=[s.B,0,0];
 const aa=dot(a,a),bb=dot(b,b),ab=dot(a,b),nn=solve([[aa,-ab],[-ab,bb]],[dot(a,base),-dot(b,base)]);
 if(!nn)return null;const L=a.map((v,i)=>v*nn[0]+[0,0,s.H][i]),R=b.map((v,i)=>v*nn[1]+[s.B,0,s.H][i]);
 return {point:L.map((v,i)=>(v+R[i])/2),gap:Math.hypot(...L.map((v,i)=>v-R[i])),L,R};
}
export function evaluate(s,mode='stereo'){
 const angle=mode==='pose'?s.angle*Math.PI/180:0;
 // A real rear hinge is 11 bench units above the perspective centre. Its tilt
 // moves C as well as the axes; the same C drives the drawing and projection.
 const C=mode==='pose'?[-11*Math.sin(angle)/.14,0,s.H+11*(1-Math.cos(angle))/.14]:[0,0,s.H];
 const P=[s.X,s.Y,s.h],left=project(P,C,s.f,rotation([0,angle,0])),right=project(P,[s.B,0,s.H],s.f),p=left.x-right.x,D=s.H-s.h;
 const footprint=s.width*D/s.f,common=Math.max(0,footprint-s.B),inFrame=q=>Math.abs(q.x)<=s.width/2&&Math.abs(q.y)<=s.width/2;
 const wrongRight={x:right.x-s.wrong,y:right.y+s.noise}; const cross=closestIntersection(left,wrongRight,s);
 const N=23000,c0=(N-1)/2,px={col:c0+left.x/(s.pitch*.001),row:c0-left.y/(s.pitch*.001)};
 return {P,C,left,right,p,D,footprint,common,overlap:common/footprint*100,visible:inFrame(left)&&inFrame(right),sigma:D*D/(s.f*s.B)*.005,cross,wrongRight,px,bilinear:10*(1-s.u)*(1-s.v)+20*s.u*(1-s.v)+30*(1-s.u)*s.v+40*s.u*s.v,trace:RESECTION[Math.min(4,Math.round(s.iteration))],wrongHeight:s.H-s.f*s.B/(p+s.wrong)};
}
export const fmt=(x,n=3)=>Number.isFinite(x)?x.toFixed(n):'不可解';
export function describe(s,mode){const a=evaluate(s,mode),f=fmt;
 const texts={
 scale:[`1:${f(a.D*1000/s.f,2)} · GSD ${f(a.D*s.pitch/(s.f*1000),6)} m`,`像幅 ${s.width}mm；地面宽 ${f(a.footprint)}m；共同覆盖 ${f(a.common)}m（${f(a.overlap,4)}%）。同一P${a.visible?'在两片内':'超出至少一片'}。`,`垂直摄影、局部水平地面。36mm、D1000m、B300m时宽240m，无重叠；230mm默认宽1533.333m。`],
 pixel:[`x=${f(a.left.x)} · y=${f(a.left.y)} mm`,`默认230mm方幅、10μm像元，23000²采样；主点(11499.5,11499.5)，亚像元(c,r)=(${f(a.px.col,1)},${f(a.px.row,1)})。`,`零基像素中心0…22999；相对主点的列右正、行下正。该网格是教学设定，不是具体相机规格。`],
 pose:[`qz=${f(a.left.q[2])}m`,`后铰轴转动使C=(${a.C.map(x=>f(x)).join(',')})m；R为camera→world。q=Rᵀ(P−C)，x=${f(a.left.x)}mm，y=${f(a.left.y)}mm。`,`转轴距摄影中心有偏置，所以转动也改变C；图与计算共同使用更新后的C。零转角恢复共同案例。地面Z向上、等效像面z=−f。`],
 stereo:[`p=${f(a.p)}mm · h=${f(s.h)}m`,`左(${f(a.left.x)},${f(a.left.y)})mm；右(${f(a.right.x)},${f(a.right.y)})mm。σp=5μm时σh≈${f(a.sigma,6)}m。`,`移动B时同一P固定，p自动同步。仅等高、平行、已校正像对能用h=H−fB/p；σ只传播视差小误差。`],
 epipolar:[`核线距离=${f(s.noise)}mm`,`沿核线错移${f(s.wrong)}mm；由错点得h=${f(a.wrongHeight)}m（真值${f(s.h)}m）。线内残差不能证明点匹配正确。`,`共面是必要条件；重复纹理或遮挡会使同一核线有多候选。此处故意注入错配，不以纹理分数冒充真值。`],
 resection:[`第${Math.round(s.iteration)}步 · RMS ${f(a.trace.rms,8)}mm`,`C=(${a.trace.theta.slice(0,3).map(x=>f(x,6)).join(', ')})m；局部旋转向量=(${a.trace.theta.slice(3).map(x=>f(x,8)).join(', ')})rad。`,`六控制点坐标与公开脚本相同；用中心差分Jacobian及最小二乘。局部旋转向量不是教材欧拉角；不能混用偏导。`],
 orientation:[`λ=${f(s.scale,1)}m/模型单位`,`模型20单位 → 地面${f(20*s.scale,1)}m。改变尺度后形状及相对夹角不变，基准原点和姿态还需控制点。`,`相对定向只有五个可定自由度；绝对定向有三平移、三旋转及一尺度。λ仅在两侧同单位时无量纲。`],
 adjustment:[`右像Δy=${f(s.noise)}mm`,`两射线最近距离${f(a.cross.gap,6)}m；最近点中点P≈(${a.cross.point.map(x=>f(x,6)).join(', ')})m。`,`最近射线中点最小化空间距离，不严格等于最小像方重投影误差。相机在此固定；光束法还会共同改正相机与点。`],
 quality:[`预测σh≈${f(a.sigma,6)}m`,`核线残差0mm仍可能有独立高程偏差${f(a.wrongHeight-s.h)}m。检查点未参与求解；单点只报偏差，不能当统计RMSE。`,`预测σ依赖模型与σp假设；检查点验证外部准确度，残差揭示观测拟合。多检查点才计算RMSE与样本数。`],
 ortho:[`双线性灰度=${f(a.bilinear,2)}`,`灰度窗10/20/30/40，u=${f(s.u,2)},v=${f(s.v,2)}。P高程${f(s.h)}m→x=${f(a.left.x)}mm；错用0m表面横向偏${f((a.left.x-s.f*s.X/s.H)/(s.pitch*.001),2)}像元。`,`先用DEM确定三维点，再正投影到原像取色。裸地DEM不能自动消除建筑屋顶位移，遮挡需另检；插值不创造分辨率。`]
 };return texts[mode];}
