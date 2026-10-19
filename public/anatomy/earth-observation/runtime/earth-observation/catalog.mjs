import * as m from './model.mjs';
const c=(key,label,min,max,value,step=1)=>({key,label,min,max,value,step});
const B=c('B','大地纬度 B / °',-80,80,45), A=c('A','方位角 A / °',0,180,45), S=c('S','距离 S / km',1,200,100), H=c('h','椭球高 h / m',0,3000,0,10);
export const catalog={
 frame:{course:'geodesy',id:'G1',title:'固定靶点与旋转标尺',controls:[c('angle','标尺转角 θ / °',-180,180,45),c('active','0 被动换基 / 1 主动旋转',0,1,0)],note:'共原点正交基。被动：靶点固定、标尺旋转；主动：标尺固定、靶臂旋转。',kind:'rotary'},
 latitude:{course:'geodesy',id:'G2',title:'同一测站的三种纬度',controls:[B,H,c('f','扁率 f（WGS84 为 0.00335281）',.00335281066474748,.2,.00335281066474748,.0001)],note:'图体与读数使用同一扁率；增大扁率可观察差别。h 的机械行程放大 200 倍；空间地心纬度始终由 atan2(Z,p) 求得。',kind:'globe'},
 curvature:{course:'geodesy',id:'G3',title:'接触点固定，曲率规转向',controls:[B,A],note:'A 从北起算；方位曲率是两个主曲率的加权和。平行圈半径 N cos B 不是法截面曲率半径。',kind:'globe'},
 metric:{course:'geodesy',id:'G4',title:'经纬增量对应多少米',controls:[B,H,c('delta','角增量 / °',.001,.1,.01,.001)],note:'固定椭球高表面：南北尺度 M+h，东西尺度 (N+h)cos B；角必须先换成弧度。',kind:'globe'},
 geodesic:{course:'geodesy',id:'G5',title:'沿曲面前进的方向',controls:[B,A,S],note:'此台用球面精确大圆作可复算演示，R=6371 km；椭球大地线的方程与误差边界见正文。',kind:'globe'},
 reduction:{course:'geodesy',id:'G6',title:'从斜距到参考面弧长',controls:[c('D','斜距 D / m',100,3000,1000),c('H1','测站高 H₁ / m',0,200,100),c('H2','目标高 H₂ / m',0,200,100)],note:'球面局部模型 R=6371 km；要求 D≥|H₂−H₁|。先去高差，再归算至参考球，最后弦转弧。仪器行程按高度比例显示。',kind:'rail'},
 midpoint:{course:'geodesy',id:'G7',title:'中点值与端点平均值',controls:[B,S],note:'用 q(B)=cos B、球面纬度对称区间检验泰勒项；这不是完整高斯椭球解算器。实际中点与端点平均须由正文迭代确定。',kind:'rail'},
 energy:{course:'remote-sensing',id:'R1',title:'同一田块的能量账本',controls:[c('incident','入射功率 / W',10,100,100),c('reflect','反射率 ρ',0,1,.3,.01),c('transmit','透射份额：剩余能量的比例',0,1,.2,.01)],note:'先选 ρ，再在剩余部分分配透射与吸收；ρ+τ+α=1。相机只接收其中一个方向的一小部分。 / Energy balance does not uniquely determine surface properties.',kind:'optical'},
 radiometry:{course:'remote-sensing',id:'R2',title:'转动接收孔径',controls:[c('angle','面法线与视线夹角 θ / °',0,85,45),c('L','辐亮度 L / W m⁻² sr⁻¹',1,100,10)],note:'dA=0.01 m²、dΩ=0.001 sr。dΦ=L cosθ dA dΩ；Lambert 半球出射度 M=πL。 / Radiance and exitance have different units.',kind:'optical'},
 thermal:{course:'remote-sensing',id:'R3',title:'热源、谱带与亮温',controls:[c('T','温度 T / K',250,350,300),c('lambda','波长 λ / μm',3,20,10,.1),c('epsilon','发射率 ε',.1,1,.9,.01)],note:'只计地表自发射，不含反射下行辐射与大气。谱辐亮度按每 μm；亮温通过反演 Planck 定律求得。 / Emission-only model.',kind:'optical'},
 reflectance:{course:'remote-sensing',id:'R4',title:'光源方向与观测方向',controls:[c('sun','入射天顶角 / °',0,80,30),c('view','观测天顶角 / °',0,80,20),c('rho','Lambert 反射率 ρ',.05,1,.3,.01)],note:'理想 Lambert 样片：L=ρE₀cosθs/π，E₀=1000 W/m²。改变观测角会改变孔径接收通量，不改变该理想面的 L。 / Real BRDF can be directional.',kind:'optical'},
 orbit:{course:'remote-sensing',id:'R5',title:'轨道一圈与观测机会',controls:[c('height','轨道高度 / km',300,1000,700),c('angle','轨道相位 / °',0,360,30)],note:'圆轨道二体模型；图上卫星沿轨道运行。周期不等于某地重访周期，模型不实现 J₂ 太阳同步。 / Orbit period is not revisit time.',kind:'globe'},
 scanner:{course:'remote-sensing',id:'R6',title:'沿轨采样与瞬时视场',controls:[c('height','高度 H / km',300,1000,700),c('d','探元宽 d / mm',1,20,10),c('f','焦距 f / mm',500,2000,1000),c('dt','采样间隔 Δt / s',.001,.1,.01,.001)],note:'β≈d/f，地面瞬时足迹 2H tan(β/2)，沿轨间隔 vgΔt。足迹不等于输出 GSD，采样间隔不等于积分时间。 / Footprint and sampling differ.',kind:'rail'},
 phase:{course:'insar',id:'I1',title:'往返路径与相位盘',controls:[c('dr','第二次距离增量 ΔR / mm',-30,30,1,.1),c('lambda','波长 λ / mm',30,240,55.5,.1)],note:'s=exp(−i4πR/λ)，干涉量 s₁s₂*；读数 Δφ=+4π(R₂−R₁)/λ。相位盘显示包裹角，完整周期计数另列。',kind:'radar'},
 penetration:{course:'insar',id:'I2',title:'介质中的幅度与功率衰减',controls:[c('er','相对介电常数 ε′',2,12,5,.1),c('ei','损耗项 ε″',.01,2,.5,.01),c('z','垂直埋深 z / m',0,.5,.1,.01)],note:'λ=0.0555 m，入射角35°；弱折射近似 θt=asin(sinθ/√ε′)。忽略界面透射损失；幅度深度1/α、单程功率深度1/(2α)。',kind:'radar'},
 chirp:{course:'insar',id:'I3',title:'长脉冲经过匹配滤波',controls:[c('band','带宽 B / MHz',1,50,20),c('duration','脉宽 T / μs',1,30,10)],note:'矩形包络线性调频脉冲的有限时宽自相关；ΔR≈c/(2B) 是高时带积近似。图中横轴为延迟/脉宽，不把近似零点当精确值。',kind:'radar'},
 aperture:{course:'insar',id:'I4',title:'滑轨上各位置的相干记录',controls:[c('x','沿轨位置 x / m',-50,50,0),c('R0','最近斜距 R₀ / m',500,2000,1000)],note:'λ=0.0555 m，v=100 m/s；R(x)=√(R₀²+x²)，fD=−2vx/(λR)。聚焦必须同时做距离徙动对齐与相位补偿。',kind:'radar'},
 terrain:{course:'insar',id:'R7 · I5',title:'同一坡面进入斜距坐标',controls:[c('theta','入射角 θ / °',15,60,35),c('alpha','迎坡坡角 α / °',0,70,20),c('beta','背坡坡角 β / °',0,75,30)],note:'二维剖面：ω=θ−α，局部入射角=|ω|，dR/ds=sinω。迎坡反序与背坡自阴影为几何判别；完整遮挡还需逐射线可见性。',kind:'terrain'},
 speckle:{course:'insar',id:'I6',title:'复振幅叠加后的颗粒',controls:[c('looks','独立视数 M',1,16,1),c('seed','样本种子',1,100,17)],note:'每像元先叠加32个单位散射复振幅再取模平方；64像元样本。该有限模型的强度方差为31/(32M)，充分发展极限为1/M；均值归一为1，有限样本统计量会波动。',kind:'radar'},
 coherence:{course:'insar',id:'I7',title:'窗口内的复相关',controls:[c('N','窗口样本数 N',1,64,16),c('rho','总体相关系数 ρ',0,1,.8,.01),c('seed','样本种子',1,100,29)],note:'固定随机种子的复高斯样本，读数为有限窗口估计。N=1 时非零样本恒得 |γ̂|=1；高相干也不等于纯形变。',kind:'radar'}
};
export const defaults=mode=>Object.fromEntries(catalog[mode].controls.map(c=>[c.key,c.value]));
export function evaluate(mode,p) {
 const e=m.ellipsoid(p.B??45,p.h??0,p.A??0,mode==='latitude'?p.f:m.WGS84.f), n=(x,d=3)=>Number(x).toFixed(d);
 let text='',series=[],angle=p.angle??p.A??p.B??0,travel=0,globeF=mode==='latitude'?p.f:m.WGS84.f;
 if(mode==='frame'){const r=m.rotation(p.angle,!!p.active);text=`(${n(r.x)}, ${n(r.y)}, 0)；长度 ${r.norm}`;angle=p.active?p.angle:0;series=Array.from({length:61},(_,i)=>[i/60,Math.sin(m.rad(i*6-p.angle))]);}
 if(mode==='latitude'){text=`B ${n(p.B,5)}° · u ${n(e.u,5)}° · Φh ${n(e.phi,5)}°`;angle=p.B;travel=p.h/50;series=[[0,p.B/90],[.5,e.u/90],[1,e.phi/90]];}
 if(mode==='curvature'){text=`M ${n(e.M)} m · N ${n(e.N)} m · Rₐ ${n(e.RA)} m`;angle=p.A;series=Array.from({length:41},(_,i)=>[i/40,(m.ellipsoid(p.B,0,i*4.5).RA-e.M)/(e.N-e.M||1)]);}
 if(mode==='metric'){text=`南北 ${n(e.latitudeScale*p.delta)} m · 东西 ${n(e.longitudeScale*p.delta)} m`;angle=p.B;travel=p.h/50;series=[[0,0],[1,e.longitudeScale/e.latitudeScale]];}
 if(mode==='geodesic'){const r=m.sphereRoute(p.B,p.A,p.S*1000);text=`球面终点 B₂ ${n(r.B2,6)}° · ΔL ${n(r.L2,6)}°`;angle=p.B;travel=p.S/10;series=Array.from({length:41},(_,i)=>[i/40,(m.sphereRoute(p.B,p.A,p.S*1000*i/40).B2-p.B)/5]);}
 if(mode==='reduction'){const r=m.reduction(p.D,p.H1,p.H2);text=p.D<Math.abs(p.H2-p.H1)?'输入无效：斜距小于高差':`q ${n(r.q,6)} m · d ${n(r.d,6)} m · 弦弧差 ${n(r.delta*1e6,3)} μm`;travel=(p.H2-p.H1)/8;series=[[0,p.H1/200],[1,p.H2/200]];}
 if(mode==='midpoint'){const r=m.midpoint(p.B,p.S*1000);text=`qₘ−qᴹ ${n(r.difference,9)} · 二阶项 ${n(r.secondOrder,9)}`;travel=p.S/5;series=Array.from({length:41},(_,i)=>[i/40,Math.cos(m.rad(p.B)+(i/40-.5)*p.S/6371)]);}
 if(mode==='energy'){const tau=(1-p.reflect)*p.transmit,alpha=1-p.reflect-tau;text=`反射 ${n(p.incident*p.reflect,1)} W · 透射 ${n(p.incident*tau,1)} W · 吸收 ${n(p.incident*alpha,1)} W`;angle=p.reflect*80;series=[[0,p.reflect],[.5,tau],[1,alpha]];}
 if(mode==='radiometry'){const flux=p.L*Math.cos(m.rad(p.angle))*.01*.001;text=`孔径通量 ${n(flux*1e6,3)} μW · M ${n(Math.PI*p.L)} W/m²`;angle=p.angle;series=Array.from({length:41},(_,i)=>[i/40,Math.cos(m.rad(i*2.125))]);}
 if(mode==='thermal'){text=`Lλ ${n(p.epsilon*m.planck(p.lambda,p.T))} W/(m²·sr·μm) · TB ${n(m.brightnessTemperature(p.lambda,p.T,p.epsilon))} K`;travel=(p.T-300)/3;series=Array.from({length:61},(_,i)=>[i/60,p.epsilon*m.planck(3+i*17/60,p.T)/25]);}
 if(mode==='reflectance'){const L=p.rho*1000*Math.cos(m.rad(p.sun))/Math.PI;text=`L ${n(L)} W/(m²·sr) · 相对接收通量 ${n(Math.cos(m.rad(p.view)))}`;angle=p.view;series=Array.from({length:41},(_,i)=>[i/40,L/320]);}
 if(mode==='orbit'){const r=m.orbit(p.height);text=`周期 ${n(r.T,5)} min · 轨道速度 ${n(r.v)} m/s`;angle=p.angle;travel=(p.height-300)/30;series=Array.from({length:41},(_,i)=>[i/40,m.orbit(300+i*700/40).T/120]);}
 if(mode==='scanner'){const r=m.scan(p.height,p.d,p.f,p.dt);text=`β ${n(r.beta*1000)} mrad · 足迹 ${n(r.footprint)} m · 沿轨间隔 ${n(r.along)} m`;travel=r.along/15;series=[[0,0],[.5,r.footprint/15000],[1,r.along/700]];}
 if(mode==='phase'){const r=m.phase(p.dr,p.lambda);text=`包裹 ${n(r.degrees,3)}° · 未包裹 ${n(r.unwrapped)} rad · ${n(r.cycles)} 周`;angle=r.degrees;travel=p.dr;series=Array.from({length:65},(_,i)=>[i/64,Math.cos(i/64*4*Math.PI+r.unwrapped)]);}
 if(mode==='penetration'){const r=m.penetration(.0555,p.er,p.ei,p.z);text=`dA ${n(r.dA*1000)} mm · dP ${n(r.dP*1000)} mm · 双程功率 ${n(r.returnPower,6)}`;travel=p.z*50;series=Array.from({length:41},(_,i)=>[i/40,Math.exp(-4*r.alpha*i/40*.5)]);}
 if(mode==='chirp'){const r=m.chirp(p.band,p.duration);text=`BT ${n(r.BT,0)} · ΔR≈ ${n(r.rangeResolution)} m`;travel=p.duration;series=Array.from({length:301},(_,i)=>{const t=(i/300-.5)*2*p.duration;return [i/300,r.correlation(t)];});}
 if(mode==='aperture'){const r=m.aperture(p.x,p.R0);text=`R ${n(r.R,6)} m · fD ${n(r.doppler)} Hz · ΔR ${n(r.R-p.R0,6)} m`;travel=p.x;series=Array.from({length:81},(_,i)=>[i/80,Math.cos(m.aperture(i/80*100-50,p.R0).phase)]);}
 if(mode==='terrain'){const r=m.terrain(p.theta,p.alpha,p.beta);text=`ω ${n(r.omega,1)}° · θlocal ${n(r.local,1)}° · dR/ds ${n(r.jacobian)} · ${r.layover?'迎坡反序':'迎坡正常'} / ${r.shadow?'背坡自阴影':'无背坡自阴影'}`;angle=p.alpha;travel=p.theta;series=Array.from({length:41},(_,i)=>[i/40,Math.sin(m.rad(p.theta-i*70/40))]);}
 if(mode==='speckle'){const r=m.speckle(p.looks,p.seed);text=`样本均值 ${n(r.mean)} · 方差 ${n(r.variance)} · 理论方差 ${n(r.theoreticalVariance)}`;series=r.values.map((v,i)=>[i/63,v/4]);travel=p.looks*2;}
 if(mode==='coherence'){const r=m.coherence(p.N,p.rho,p.seed);text=`|γ̂| ${n(r.gamma,6)} · 样本相位 ${n(m.deg(r.phase))}° · N=${p.N}`;angle=m.deg(r.phase);series=r.samples.map((v,i)=>[i/Math.max(1,p.N-1),(v[0]*v[2]+v[1]*v[3])/6]);travel=p.N/2;}
 return {text,series,angle,travel:Math.max(-50,Math.min(50,travel)),globeF,e};
}
