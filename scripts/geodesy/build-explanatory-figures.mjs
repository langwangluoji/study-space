// Static teaching diagrams: all geometric coordinates use the course models.
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {blhToXyz, xyzToBlh, blhJacobian, rad, deg} from './model.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');
const out = path.join(root, 'knowledge/geodesy/assets/figures');
const C = {ink:'#24384b', muted:'#667b8e', grid:'#d5dfe6', blue:'#216aa5', green:'#147d6e', orange:'#ad6419', red:'#b84745'};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;');
const text = (x,y,s,color='ink',size=19) => `<text x="${x}" y="${y}" fill="${C[color]??color}" font-size="${size}">${esc(s)}</text>`;
const line = (a,b,color='ink',arrow=false,dash=false) => `<path d="M${a} L${b}" fill="none" stroke="${C[color]}" stroke-width="${arrow?2.8:1.7}"${dash?' stroke-dasharray="6 5"':''}${arrow?` marker-end="url(#${color})"`:''}/>`;
const dot = (p,label,dx=9,dy=-10,color='blue') => `<circle cx="${p[0]}" cy="${p[1]}" r="4.5" fill="${C[color]}"/>`+text(p[0]+dx,p[1]+dy,label,color,18);
const curve = (points,color='ink',dash=false) => `<path d="${points.map((p,i)=>(i?'L':'M')+p.join(',')).join(' ')}" fill="none" stroke="${C[color]}" stroke-width="2"${dash?' stroke-dasharray="6 5"':''}/>`;
const panel = (x,y,w,h,title) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="12" fill="#fff" stroke="${C.grid}"/>`+text(x+20,y+31,title,'ink',21);
const circle = (x,y,r,color='grid') => `<circle cx="${x}" cy="${y}" r="${r}" fill="none" stroke="${C[color]}" stroke-width="2"/>`;
const arc = (cx,cy,r,start,end,color='blue') => curve(Array.from({length:31},(_,i)=>{const t=rad(start+(end-start)*i/30);return [cx+r*Math.cos(t),cy-r*Math.sin(t)];}),color);
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]];
const add = (a,b) => a.map((v,i)=>v+b[i]);
const mul = (v,s) => v.map(x=>x*s);
const figures = [];
function save(name,title,body,hint,height=620) {
  const markers=Object.entries(C).map(([key,value])=>`<marker id="${key}" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M0,0 L10,5 L0,10z" fill="${value}"/></marker>`).join('');
  const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1000" height="${height}" viewBox="0 0 1000 ${height}" role="img" aria-labelledby="title desc"><title id="title">${esc(title)}</title><desc id="desc">${esc(hint)}</desc><defs>${markers}</defs><rect width="1000" height="${height}" fill="#f6f9fb"/><g font-family="Microsoft YaHei, Noto Sans CJK SC, sans-serif">${text(28,38,title,'ink',25)}${body}${text(28,height-23,hint,'muted',17)}</g></svg>\n`;
  fs.writeFileSync(path.join(out,name+'.svg'),svg);figures.push({asset:name+'.svg',kind:'redrawn',model:'scripts/geodesy/model.mjs',title,exaggerated:true});
}
function meridian(B,h,a=12,f=.25) {
  const s=blhToXyz({B,L:0,h:0,a,f}),p=blhToXyz({B,L:0,h,a,f});
  return {s:[s.X,s.Z],p:[p.X,p.Z],c:[0,-f*(2-f)*a/Math.sqrt(1-f*(2-f)*Math.sin(rad(B))**2)*Math.sin(rad(B))]};
}
function ellipse(cx,cy,a,b,scale) {
  return curve(Array.from({length:181},(_,i)=>{const t=-Math.PI/2+i*Math.PI/180;return [cx+scale*a*Math.cos(t),cy-scale*b*Math.sin(t)];}),'muted');
}

// Forward: normal-intercept geometry and longitude projection.
{
  const g=meridian(40,2), S=v=>[170+17*v[0],315-17*v[1]];
  let b=panel(20,65,470,490,'① 子午面：先脚点，再沿法线加 h')+ellipse(170,315,12,9,17);
  b+=line([45,315],[460,315],'grid',true)+line([170,480],[170,118],'grid',true)+text(439,341,'p')+text(181,132,'Z');
  b+=line(S(g.c),S(g.p),'blue',true)+line(S([0,0]),S(g.p),'orange',false,true)+dot(S([0,0]),'O',-23,22,'muted')+dot(S(g.c),'C',-25,8)+dot(S(g.s),'S',9,15)+dot(S(g.p),'P',9,-12);
  b+=line(S(g.c),add(S(g.c),[91,0]),'grid',false,true)+arc(...S(g.c),46,0,40,'blue')+text(...add(S(g.c),[52,-13]),'B','blue',19);
  b+=text(350,208,'h','blue')+text(228,335,'p₀ = N cos B','green',18)+text(42,503,'C 是法线与地轴的交点；CS = N。','muted',17);
  b+=panel(510,65,470,490,'② 赤道面：用经度分成 X、Y');
  const O=[605,430],P=[872,227];
  b+=line(O,[945,430],'ink',true)+line(O,[605,150],'ink',true)+line(O,P,'blue',true)+line(P,[872,430],'grid',false,true)+line(P,[605,227],'grid',false,true);
  b+=arc(...O,65,0,37)+text(678,410,'L','blue')+dot(P,'投影点')+text(914,455,'X')+text(579,155,'Y');
  b+=text(651,479,'X = p cos L；Y = p sin L','green')+text(651,514,'p = (N + h) cos B','green');
  save('coordinate-meridian','从法线脚点到空间坐标',b,'扁率与高度放大示意；B 沿法线量取，地心向径只作比较。');
}
// Inverse: update line C_i P; it is not the trial normal C_i S_i.
{
  const a=12,f=.25,B=40,h=2,g=meridian(B,h,a,f),e2=f*(2-f);
  const update=b=>deg(Math.atan2(g.p[1]+e2*a/Math.sqrt(1-e2*Math.sin(rad(b))**2)*Math.sin(rad(b)),g.p[0]));
  const initial=deg(Math.atan2(g.p[1],g.p[0])), trials=[initial,update(initial),B];let b='';
  trials.forEach((angle,i)=>{const x=20+i*327,cx=x+105,cy=333,scale=10;const S=v=>[cx+scale*v[0],cy-scale*v[1]];const t=meridian(angle,0,a,f);
    b+=panel(x,65,310,490,['① 地心纬度初值','② 更新椭球修正项','③ 法线条件自洽'][i])+ellipse(cx,cy,a,a*(1-f),scale)+line([x+20,cy],[x+287,cy],'grid')+line([cx,460],[cx,168],'grid');
    b+=line(S(t.c),S(t.s),'muted',false,true)+line(S(t.c),S(g.p),'blue',true)+dot(S(g.p),'P',5,-12)+dot(S(t.c),'Cᵢ',-31,12)+dot(S(t.s),'Sᵢ',8,17,'muted');
    b+=text(x+20,476,`Bᵢ = ${angle.toFixed(3)}°`,'green',18)+text(x+20,511,i===2?'Cᵢ、Sᵢ、P 共线':'蓝线 CᵢP 的方向给出 Bᵢ₊₁','muted',16);
  });
  save('inverse-steps','纬度反算：固定 P，更新法线条件',b,'教学椭球 a = 12、f = 1/4 放大差异；虚线为试算法线，蓝线为下一步方向。');
}
// Derivative columns supply the shared direction basis.
{
  const B=35,L=25,J=blhJacobian({B,L,h:0}),cols=[0,1,2].map(j=>J.map(row=>row[j]));
  const [n,e,u]=cols.map(v=>mul(v,1/Math.hypot(...v)));
  const S=v=>[267+150*(v[0]-.75*v[1]),365+150*(.3*v[0]+.45*v[1]-.9*v[2])];
  const p=mul(u,.8); let b=panel(20,65,470,490,'① 从法线构造三根单位轴');
  for(const [v,label,col,dx,dy] of [[[1,0,0],'X','muted',6,20],[[0,1,0],'Y','muted',-25,20],[[0,0,1],'k / Z','muted',-20,-10]])b+=line(S([0,0,0]),S(mul(v,1.3)),col,true)+text(...add(S(mul(v,1.3)),[dx,dy]),label,col,17);
  for(const [v,label,col,dx,dy] of [[u,'eᵤ','blue',10,-5],[e,'eₑ','orange',-20,25],[n,'eₙ','green',-28,-10]])b+=line(S(p),S(add(p,mul(v,.65))),col,true)+text(...add(S(add(p,mul(v,.65))),[dx,dy]),label,col,21);
  b+=dot(S(p),'P',-20,22)+text(42,485,'上向沿法线；东向沿纬圈。','muted',18)+text(42,518,'示例 B = 35°、L = 25°','muted',17);
  b+=panel(510,65,470,490,'② 构造方向，再作点积投影');
  ['eᵤ = (cos B cos L, cos B sin L, sin B)','eₑ = (k × eᵤ) / ‖k × eᵤ‖','eₙ = eᵤ × eₑ','Q = [eₑ  eₙ  eᵤ]','(E, Nloc, U)ᵀ = Qᵀ Δr'].forEach((s,i)=>b+=text(535,147+i*67,s,i<3?['blue','orange','green'][i]:'ink',i===0?17:21));
  b+=text(535,511,'极点先选参考经线，再定义东、北。','muted',17);
  save('local-basis','局部基：上向 → 东向 → 北向 → 投影',b,'箭头表示单位方向，不表示实际长度；ENU 是右手基。');
  if(Math.hypot(...add(cross(e,n),mul(u,-1)))>1e-12)throw Error('Local basis handedness');
}
{
  let b=panel(20,65,470,490,'① 纬度：局部曲率半径加上高度');const O=[138,390],M=145,h=45,A=50,D=18;
  b+=arc(...O,M,0,100,'muted')+arc(...O,M+h,0,100,'blue');
  const P=(r,a)=>[O[0]+r*Math.cos(rad(a)),O[1]-r*Math.sin(rad(a))];
  b+=line(O,P(M+h,A),'green',true)+line(O,P(M+h,A+D),'green',true)+arc(...O,55,A,A+D,'green')+dot(O,'局部曲率中心',-95,28,'muted');
  b+=text(213,317,'M','muted')+text(250,255,'h','blue')+text(158,305,'dB','green')+text(42,466,'北向长度 ≈ (M + h) dB','green',22)+text(42,505,'局部密切圆；dB 是法线方向变化。','muted',17);
  b+=panel(510,65,470,490,'② 经度：沿纬圈转过 dL');const O2=[703,308],R=127;
  b+=circle(...O2,R,'muted')+line(O2,[O2[0]+R,O2[1]],'orange',true)+line(O2,[O2[0]+R*Math.cos(rad(35)),O2[1]-R*Math.sin(rad(35))],'orange',true)+arc(...O2,51,0,35,'orange');
  b+=text(753,287,'dL','orange')+text(569,145,'纬圈半径 p = (N + h) cos B','blue',19)+text(535,466,'东向长度 ≈ p dL','orange',22)+text(535,505,'高度：上向长度 = dh。','blue',20);
  save('differential-scales','雅可比的三列：每一种小变化怎样成为长度',b,'dB、dL 使用弧度；曲率中心不是地心；等 h 曲面一般不是另一张旋转椭球。');
}
{
  const g=meridian(40,4,10,.2),r={X:g.p[0],Y:0,Z:g.p[1]},params=[[10,.2],[11,.35]];let b='';
  params.forEach(([a,f],i)=>{const x=20+i*490,cx=x+135,cy=340,S=v=>[cx+14*v[0],cy-14*v[1]],geo=xyzToBlh({...r,a,f}),foot=blhToXyz({...geo,h:0,a,f});
    b+=panel(x,65,470,490,i?'② 参考椭球改变，P 仍固定':'① 原椭球与原法线')+ellipse(cx,cy,a,a*(1-f),14)+line([x+20,cy],[x+440,cy],'grid')+line([cx,455],[cx,135],'grid');
    b+=line(S([foot.X,foot.Z]),S(g.p),'blue',true)+dot(S(g.p),'固定 P',8,-12)+dot(S([foot.X,foot.Z]),i?'S₂':'S₁',-35,17,'green');
    b+=text(x+22,480,`B = ${geo.B.toFixed(2)}°；h = ${geo.h.toFixed(3)}`,'blue',20)+text(x+22,515,`a = ${a}；f = ${f.toFixed(2)}（教学参数）`,'muted',17);
  });
  save('ellipsoid-change','换参考面：空间点不动，经纬高标签改变',b,'两图坐标轴和比例相同；参数差异放大；脚点与法线由正反算计算。');
}
{
  let b='';for(let i=0;i<2;i++){const x=20+i*490,O=[x+150,350],S=(r,a)=>[O[0]+r*Math.cos(rad(a)),O[1]-r*Math.sin(rad(a))];
    b+=panel(x,65,470,490,i?'② 主动：轴不动，向量转 +30°':'① 被动：向量不动，轴转 +30°');
    b+=line(O,S(255,0),'muted',true)+line(O,S(185,90),'muted',true)+text(...S(265,0),'x','muted')+text(...S(193,90),'y','muted');
    if(!i){b+=line(O,S(245,30),'blue',true)+line(O,S(170,120),'blue',true)+text(...add(S(245,30),[4,0]),"x′",'blue')+text(...add(S(170,120),[0,-5]),"y′",'blue');
      const end=S(190,0),proj=S(190*Math.cos(rad(30)),30);b+=line(end,proj,'grid',false,true)+line(O,end,'red',true)+text(...add(end,[8,22]),'固定 v','red');
    }else b+=line(O,S(190,0),'red',false,true)+line(O,S(190,30),'red',true)+text(...add(S(190,30),[8,0]),'转后的 v','red');
    b+=arc(...O,66,0,30,'blue')+text(x+35,455,i?'分量：(cos 30°, +sin 30°)':'新分量：(cos 30°, −sin 30°)','ink',20)+text(x+35,504,i?'转 +90°： (1,0) → (0,+1)':'轴转 +90°： (1,0) → (0,−1)','muted',19);
  }save('rotation-comparison','相同正角，两个明确的几何问题',b,'沿 +Z 向原点看，正角逆时针；被动图中的物理向量始终不动。');
}
{
  let b=panel(20,65,960,490,'目标系中闭合的三条向量');const Ot=[135,418],Os=[368,310],P=[780,166];
  b+=line(Ot,Os,'orange',true)+line(Os,P,'green',true)+line(Ot,P,'blue',true)+dot(Ot,'Oₜ',-35,27)+dot(Os,'Oₛ',-20,-15)+dot(P,'P',10,-12);
  b+=text(217,392,'t','orange',25)+text(485,217,'s R rₛ','green',26)+text(409,335,'rₜ','blue',25);
  for(const [o,tilt,col] of [[Ot,0,'muted'],[Os,20,'muted']])for(const a of [tilt,tilt+90])b+=line(o,[o[0]+75*Math.cos(rad(a)),o[1]-75*Math.sin(rad(a))],col,true);
  b+=text(71,490,'rₜ = t + s R rₛ；s = 1 + μ','ink',25)+text(553,490,'t：从目标原点指向源原点','orange',20);
  save('seven-parameter-vectors','七参数：先表达相对向量，再加目标系中的原点位置',b,'三角形的三条边全部用目标系分量表达；R 的方向为源分量 → 目标分量。');
}
{
  let b=panel(20,65,470,245,'① 同名点：覆盖区域，避免共线');
  [[110,170],[235,230],[390,150],[340,256]].forEach((p,i)=>b+=dot(p,'P'+(i+1),8,-8,'green'));
  b+=line([60,272],[445,272],'red',false,true);
  for(const x of [80,230,400])b+=`<circle cx="${x}" cy="272" r="4" fill="${C.red}"/>`;
  b+=text(42,296,'共线会缺秩；沿线加点仍不可辨识。','muted',17);
  b+=panel(510,65,470,245,'② 一点三式，逐点堆叠');
  ['l₁ = A₁ β','l₂ = A₂ β','⋮','lₙ = Aₙ β'].forEach((s,i)=>b+=text(565,136+i*40,s,'blue',23));b+=text(775,182,'3n 行 × 7 列','green',20)+text(775,224,'检查秩与残差','muted',18);
  b+=panel(20,330,960,225,'③ 从框架参数传播到经纬高');
  const items=[['平移、旋转、尺度',42,200],['合成 dXYZ',294,160],['投影为 NEU',505,175],['除以长度标尺',730,205]];
  for(const [label,x,w]of items){b+=`<rect x="${x}" y="414" width="${w}" height="62" rx="8" fill="#edf4fa" stroke="${C.grid}"/>`+text(x+14,452,label,'blue',19);}
  for(const [a,z]of [[[242,445],[286,445]],[[454,445],[497,445]],[[680,445],[722,445]]])b+=line(a,z,'green',true);
  b+=text(43,518,'更换椭球时，先扣除椭球参数的空间贡献 K dθ。','muted',18);
  save('parameter-estimation-flow','同名点 → 七参数 → XYZ 改正 → 经纬高改正',b,'点位分布是几何示意；三维求解需检查设计矩阵秩，图上的点数本身不能保证可解。');
}
{
  let b='';const columns=[['正算：起点、方位角、距离',20,['输入 B₁、L₁、A₁₂、S','估计中间引数 Bm、Am','计算 N、t、u 及三组差值','更新 Bm、Am；检查变化量','满足容限后求终点与反方位角','正反算闭合 + 独立大地线对比']],['反算：两个端点',510,['输入 B₁、L₁、B₂、L₂','经差连续展开；求 Bm、ΔB、ΔL','先算一阶北东分量 X₀、Y₀','加入三次改正，得到 X、Y','atan2(Y,X) 求 Am；hypot 求 S','计算 ΔA，恢复 A₁₂、A₂₁']]];
  for(const [title,x,steps]of columns){b+=panel(x,65,470,490,title);steps.forEach((s,i)=>{const y=125+i*65;b+=`<rect x="${x+28}" y="${y}" width="414" height="45" rx="7" fill="${i===5?'#e7f4ef':'#edf4fa'}" stroke="${C.grid}"/>`+text(x+41,y+28,s,i===5?'green':'ink',17);if(i<5)b+=line([x+235,y+45],[x+235,y+62],'blue',true);});}
  b+=`<path d="M45,356 L32,356 L32,211 L45,211" fill="none" stroke="${C.orange}" stroke-width="2" marker-end="url(#orange)"/>`;
  save('gauss-flow','高斯平均引数：正算迭代与反算分量法',b,'正算未达容限则继续；达上限仍未收敛则返回失败并停止。迭代残差与级数截断误差分开检查。');
}
// Zonal, sectorial and tesseral patterns from unnormalised n=2 harmonics.
{
  let b='';const configs=[['带谐：n = 2，m = 0',0],['扇谐：n = 2，m = 2',2],['田谐 n=2，m=1（sin λ）',1]];
  configs.forEach(([title,m],i)=>{const x=20+i*327,cx=x+155,cy=282,R=108;b+=panel(x,65,310,490,title);
    for(let yy=-R;yy<R;yy+=4)for(let xx=-R;xx<R;xx+=4){if(xx*xx+yy*yy>R*R)continue;const z=-yy/R,y=xx/R,X=Math.sqrt(Math.max(0,1-z*z-y*y)),lon=Math.atan2(y,X),lat=Math.asin(z);const value=m===0?(3*z*z-1)/2:m===2?(1-z*z)*Math.cos(2*lon):z*Math.cos(lat)*Math.sin(lon);b+=`<rect x="${cx+xx}" y="${cy+yy}" width="4.1" height="4.1" fill="${value>=0?'#437fa8':'#c48246'}" opacity="${.25+.75*Math.min(1,Math.abs(value)*(m===1?2:1))}"/>`;}
    b+=circle(cx,cy,R,'muted')+text(x+24,445,['仅随纬度变化','经向分区，m = n','纬向与经向共同分区'][i],'green',19)+text(x+24,493,'蓝 / 棕：基函数的正 / 负','muted',17);
  });save('spherical-harmonics','球谐项：用 n、m 读出空间分区',b,'同为 n = 2 的未归一化实球谐示意；颜色表示符号，不是地形或实际重力异常。');
}
{
  let b='';for(let i=0;i<2;i++){const x=20+i*490,cx=x+230,cy=325;b+=panel(x,65,470,490,i?'② 极移：相对地壳观察':'① 岁差、章动：相对天球观察');
    if(!i){b+=`<ellipse cx="${cx}" cy="180" rx="115" ry="43" fill="none" stroke="${C.grid}" stroke-width="2"/>`;
      const pts=Array.from({length:151},(_,j)=>{const a=j*Math.PI/75;return[cx+115*Math.cos(a)+8*Math.cos(12*a),180+43*Math.sin(a)+6*Math.sin(12*a)];});b+=curve(pts,'blue')+line([cx,cy],[cx+70,145],'green',true)+circle(cx,cy,55,'muted')+text(x+43,458,'平滑轴迹：岁差','green',21)+text(x+43,500,'叠加小摆动：章动','blue',21);
    }else{b+=circle(cx,cy,115,'muted')+line([cx-150,cy],[cx+160,cy],'grid')+line([cx,cy+150],[cx,cy-150],'grid');
      b+=curve(Array.from({length:241},(_,j)=>{const a=j*Math.PI/45;return[cx+35*Math.cos(a)+12*Math.cos(a*.84),cy+35*Math.sin(a)+12*Math.sin(a*.84)];}),'orange')+text(x+40,458,'图中轨迹是放大后的概念示意。','orange',18)+text(x+40,500,'真实轨迹另见课件历史观测图。','muted',18);
    }}save('earth-motion-reference','同一根轴：观察参考不同，描述的运动也不同',b,'本图不计算实际天极或极移预报；周期与幅度放大，只展示两种观察参考。');
}

fs.writeFileSync(path.join(root,'knowledge/geodesy/data/figure-redraws.json'),JSON.stringify({date:'2026-11-04',figures},null,2)+'\n');
console.log(`Geodesy explanatory figures: ${figures.length} deterministic SVGs`);
