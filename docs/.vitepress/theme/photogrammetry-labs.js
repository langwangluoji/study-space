
  'use strict';
  const finitePositive = (...values) => values.every(x => Number.isFinite(x) && x > 0);
  const PhotoMath = {
    collinearity(f, X, Y, H, h) {
      const Z = H - h;
      if (!finitePositive(f, Z) || !Number.isFinite(X) || !Number.isFinite(Y)) return null;
      return { x: f * X / Z, y: f * Y / Z, Z, qz: -Z };
    },
    scale(f, H, h, pixelPitch) {
      const distance = H - h;
      if (!finitePositive(f, distance, pixelPitch)) return null;
      return { distance, scale: f / (distance * 1000), denominator: distance * 1000 / f, gsd: distance * pixelPitch / (f * 1000) };
    },
    stereo(f, B, H, p, sigmaP) {
      if (!finitePositive(f, B, H, p) || !Number.isFinite(sigmaP) || sigmaP < 0) return null;
      return { Z: H - f * B / p, distance: f * B / p, groundParallax: f * B / H, sigmaZ: f * B * sigmaP / (p * p) };
    },
    relief(r, h, H) {
      if (!finitePositive(H) || !Number.isFinite(r) || r < 0 || !Number.isFinite(h) || h < 0 || h >= H) return null;
      return { d: r * h / H, rBase: r * (1 - h / H), ratio: h / H };
    }
  };
  Object.freeze(PhotoMath);
  let sequence = 0;
  const fmt = (v, digits = 2) => v.toLocaleString('zh-CN', { maximumFractionDigits: digits });
  const styles = `.photo-lab{padding:1.2rem;border:1px solid #c4d6d4;border-radius:18px;background:#f4f8f7;color:#163d3b;overflow:hidden}.photo-lab *{box-sizing:border-box}.photo-lab h3{margin:0 0 .5rem}.photo-lab p{line-height:1.7}.photo-lab-controls{display:grid;grid-template-columns:repeat(auto-fit,minmax(180px,1fr));gap:1rem}.photo-lab label{display:block;font-size:.92rem;line-height:1.6}.photo-lab input{width:100%;accent-color:#087f8c}.photo-lab output{font-weight:700;color:#087f8c}.photo-lab-results{display:flex;flex-wrap:wrap;gap:1rem;padding:1rem 0;font-size:1.1rem;font-weight:600}.photo-lab svg{display:block;width:100%;max-width:650px;margin:auto;background:white;border-radius:12px}.photo-lab svg text{font:14px system-ui,sans-serif;fill:#163d3b}.photo-lab-formula{padding:.8rem;background:white;border-radius:10px;font-family:system-ui,sans-serif;line-height:1.8}.photo-lab-note{font-size:.9rem}.photo-lab-warning{color:#9a4c10;font-weight:600}`;
  const definitions = {
    collinearity: {
      title: '光线共线 · Collinearity',
      intro: '物点 P、相机投影中心 S、像点 a 在同一条直线上。相机把空间中的方向变成像片上的位置。先让物点左右移动，再抬高物点，观察像点位置如何改变。',
      controls: [['f','主距 f · principal distance',50,250,150,1,'mm'],['X','物点横向坐标 X · horizontal position',-400,400,180,10,'m'],['H','相机至基准面的距离 H',1000,3000,1500,50,'m'],['h','物点高出基准面的高度 h',0,800,200,10,'m']],
      formula: '地面Z向上：C = (0, 0, H)，P = (X, Y, h)，R = I，主点为0。<br>相机向量 q = P − C = (X, Y, h − H)，qz &lt; 0；等效像面 z = −f。<br>x = −f X/(h − H) = f X/(H − h)，y 同理；本实验 Y = 0。f、x、y用mm，X、Y、H、h用m，比值无量纲。',
      note: '图和正文使用同一约定：+Z向上，地面点低于相机时qz为负，向场景的等效像方向取z = −f。两负号相消，因此正X对应正x。短像向量与长物向量共线但长度不同；图中像面为便于看清而放大，不表示物理感光片的位置。相机旋转、主点和畸变固定为理想值；本实验未限定像幅，计算值不自动保证在实际视场内或没有遮挡。',
      update(v) {
        const a = PhotoMath.collinearity(v.f,v.X,0,v.H,v.h);
        const px = 310 + v.X * .4, py = 170 + a.Z/3000*115;
        const planeY = 45 + v.f/250*90;
        const ix = 310 + v.X*.4*(planeY-45)/(py-45);
        return {results: `x = ${fmt(a.x)} mm　｜　y = 0 mm　｜　D = H − h = ${fmt(a.Z,0)} m　｜　qz = ${fmt(a.qz,0)} m`, svg: `<line x1="65" y1="${planeY}" x2="555" y2="${planeY}" stroke="#de8d36" stroke-width="3"/><line x1="310" y1="12" x2="310" y2="325" stroke="#adc6c0" stroke-dasharray="5 4"/><line x1="310" y1="45" x2="560" y2="45" stroke="#adc6c0"/><path d="M310 45 L${ix} ${planeY} L${px} ${py}" fill="none" stroke="#087f8c" stroke-width="2"/><circle cx="310" cy="45" r="6" fill="#163d3b"/><circle cx="${px}" cy="${py}" r="6" fill="#087f8c"/><circle cx="${ix}" cy="${planeY}" r="6" fill="#de8d36"/><text x="70" y="${planeY-17}">等效像面 z = −f</text><text x="325" y="32">C 摄影中心</text><text x="${px+10}" y="${py+20}">P (X, 0, h)</text><text x="${ix+10}" y="${planeY+23}">a，x = ${fmt(a.x)} mm</text><text x="540" y="35">+X</text><text x="210" y="22">+Z 向上 ↑</text><text x="80" y="316">qz = h − H &lt; 0，D = H − h &gt; 0</text>`};
      }
    },
    scale: {
      title: '比例尺与像元 · Scale & GSD',
      intro: '相机离地面越远，同一块地面在照片上就越小。主距 f（principal distance）越大，同一块地面在照片上就越大。先调航高，再调主距，观察结果。',
      controls: [['f','主距 f · principal distance',50,250,150,1,'mm'],['H','摄站高程 Hₛ · camera elevation',500,5000,1500,50,'m'],['h','地面高程 h · terrain elevation',0,400,100,10,'m'],['pixelPitch','像元尺寸 · pixel pitch',2,15,5,0.1,'μm']],
      formula: 's = f / (Hₛ − h) = 1/m；比例尺写作 1 : m，m = (Hₛ − h) / f。<br>相对航高 H = Hₛ − h；GSD = (Hₛ − h) × 像元尺寸 / f。计算前统一长度单位：f 从 mm 转为 m，像元尺寸从 μm 转为 m。',
      note: 'GSD（ground sampling distance，地面采样距离）是一个像元对应的地面长度，不等于实际能分辨的最小目标。这里假定垂直摄影、局部水平地面，忽略镜头畸变。图是几何示意，所选等效像面与正文z = −f、地面Z向上的约定一致，不按实际尺寸比例绘制。',
      update(v) {
        const a = PhotoMath.scale(v.f,v.H,v.h,v.pixelPitch);
        const width = 90 + (v.H-v.h)/5000*160;
        const plane = 90 + v.f/250*55;
        return { results: `比例尺 1 : ${fmt(a.denominator,0)}　｜　GSD ${fmt(a.gsd*100,2)} cm/像元`, svg: `<line x1="80" y1="275" x2="540" y2="275" stroke="#527e77" stroke-width="3"/><path d="M${310-width} 275 L310 45 L${310+width} 275" stroke="#087f8c" fill="none" stroke-width="2"/><line x1="240" y1="${plane}" x2="380" y2="${plane}" stroke="#de8d36" stroke-width="4"/><line x1="310" y1="45" x2="310" y2="275" stroke="#9fb3ad" stroke-dasharray="5 4"/><circle cx="310" cy="45" r="5" fill="#163d3b"/><text x="322" y="40">S 投影中心</text><text x="390" y="${plane+5}">像平面</text><text x="275" y="${(plane+45)/2}">f</text><text x="325" y="225">Hₛ − h = ${fmt(a.distance,0)} m</text><text x="100" y="303">局部地面 · ground</text><text x="28" y="25">中心投影 · central projection</text>` };
      }
    },
    stereo: {
      title: '视差测高 · Stereo parallax',
      intro: '两次摄影从不同位置看同一个点。这个点在左右像片的横向位置差叫视差 p（parallax）。在下面的理想像对中，点越高、离相机越近，视差越大。先固定 f、B、H 增大 p，看 h 如何变；再增大 σp，看高程误差如何变。',
      controls: [['f','主距 f · principal distance',50,250,150,1,'mm'],['B','摄影基线 B · baseline',50,600,300,10,'m'],['H','基准面以上航高 H',500,3000,1500,50,'m'],['p','测得绝对横视差 p · x-parallax',5,150,30,0.5,'mm'],['sigmaP','视差标准差 σp · parallax uncertainty',0.001,0.1,0.01,0.001,'mm']],
      formula: 'p = f B / (H − h)　→　h = H − f B / p。<br>σh ≈ |∂h/∂p| σp = f B σp / p²。f、p、σp 均用 mm；B、H、h、σh 均用 m。',
      note: 'h是点相对基准面的高程，D = H − h为向下距离。与正文统一采用地面Z向上、R = I、等效像面z = −f；左片xL = fX/D，右片xR = f(X − B)/D，所以p = xL − xR = fB/D为正，无需另换像坐标符号。适用条件：两相机等高，光轴平行且竖直，基线水平，像坐标方向一致；已消除畸变。p 是同名点的绝对横视差，不是相对另一点的视差差。σp 是两个像点之差的标准差；若左右像点各有独立标准差 σx，则 σp = √2 σx。这里只传播视差的小误差，暂把 f、B、H 当作精确值。比较同一地面点的基线作用时，B 加倍也要把 p 加倍，此时 σh 减半；只改 B 而固定 p，相当于换了点的高程。',
      update(v) {
        const a = PhotoMath.stereo(v.f,v.B,v.H,v.p,v.sigmaP);
        const b = 40 + v.B /600 * 150;
        const z = 270 - Math.max(-0.3,Math.min(0.85,a.Z/v.H))*180;
        const warning = a.Z < 0 ? '当前组合得到负高程：点在基准面以下。参数独立可调，因此不一定对应常见地形。' : a.Z/v.H > .85 ? '点已接近相机高度。实际测量还受重叠范围、像片尺寸与遮挡限制。' : '';
        return {results: `h = ${fmt(a.Z)} m　｜　σh ≈ ${fmt(a.sigmaZ,3)} m　｜　基准面视差 p₀ = ${fmt(a.groundParallax)} mm`, warning, svg: `<line x1="55" y1="270" x2="565" y2="270" stroke="#527e77"/><line x1="${310-b}" y1="48" x2="${310+b}" y2="48" stroke="#de8d36" stroke-width="3"/><text x="290" y="35">B</text><path d="M${310-b} 48 L310 ${z} L${310+b} 48" stroke="#087f8c" fill="none" stroke-width="2"/><circle cx="${310-b}" cy="48" r="6" fill="#163d3b"/><circle cx="${310+b}" cy="48" r="6" fill="#163d3b"/><circle cx="310" cy="${z}" r="6" fill="#de8d36"/><text x="${310-b-20}" y="77">S₁</text><text x="${310+b+10}" y="77">S₂</text><text x="325" y="${z-8}">P，h = ${fmt(a.Z)} m</text><text x="60" y="294">基准面 h = 0 · datum</text><text x="26" y="320">示意图：点高程显示范围有限，以计算数值为准。</text>`};
      }
    },
    relief: {
      title: '高差位移 · Relief displacement',
      intro: '垂直像片上，高出基准面的物体顶点会向外偏。想象一栋楼：屋顶的像点通常比楼底的像点更远离像片中心。离中心越远、楼越高，位移越大。',
      controls: [['r','高点像距 r · radial distance',0,120,60,1,'mm'],['h','高点高度 h · height above datum',0,800,100,10,'m'],['H','基准面以上航高 H',1000,5000,1500,50,'m']],
      formula: 'd = r h / H；r₀ = r − d = r (1 − h/H)。<br>r：高点的像点到中心距离；r₀：同一竖线在基准面交点的像距；d：两像点的径向距离，三者均为 mm。',
      note: '模型要求垂直像片，中心是主点（principal point），H 相对同一基准面，0 ≤ h < H。这里 r 指高点像距；若用基准面像距 r₀，应写 d = r₀ h/(H − h)。该垂直投影关系本身不要求 h/H 很小，但 h/H 大时不能再近似 d ≪ r，实际图像还可能存在遮挡。倾斜像片不能直接套用此式。',
      update(v) {
        const a = PhotoMath.relief(v.r,v.h,v.H);
        const r = v.r*1.6, r0=a.rBase*1.6;
        return { results: `向外位移 d = ${fmt(a.d)} mm　｜　基准点像距 r₀ = ${fmt(a.rBase)} mm　｜　h/H = ${fmt(a.ratio*100,1)}%`, warning: a.ratio > .2 ? 'h/H 已较大：保留完整几何关系，不要把 r 与 r₀ 混用；真实像片还需检查遮挡。' : '', svg: `<rect x="60" y="40" width="500" height="250" rx="8" fill="none" stroke="#adc6c0"/><line x1="95" y1="165" x2="${310+r}" y2="165" stroke="#adc6c0" stroke-dasharray="4 4"/><circle cx="310" cy="165" r="5" fill="#163d3b"/><circle cx="${310+r0}" cy="165" r="6" fill="#087f8c"/><circle cx="${310+r}" cy="165" r="6" fill="#de8d36"/><line x1="${310+r0}" y1="120" x2="${310+r}" y2="120" stroke="#de8d36" stroke-width="4"/><text x="${310+(r+r0)/2}" y="108" text-anchor="middle">d（向外）</text><text x="270" y="198">O 主点</text><text x="${310+r0}" y="224" text-anchor="middle">a₀ 基准点像</text><text x="${310+r}" y="250" text-anchor="middle">a 高点像</text><text x="78" y="63">像平面俯视 · image plane</text>`};
      }
    }
  };
  function renderLab(type, container) {
    if (typeof document === 'undefined') return;
    if (typeof container === 'string') container = document.querySelector(container);
    if (!container) throw new Error('renderLab: a container element is required');
    const def = definitions[type];
    if (!def) throw new Error('Unknown lab type: ' + type);
    if (!document.getElementById('photo-lab-styles')) {
      const style = document.createElement('style'); style.id = 'photo-lab-styles'; style.textContent = styles; document.head.appendChild(style);
    }
    const id = 'photo-lab-' + (++sequence);
    const values = Object.fromEntries(def.controls.map(c => [c[0],c[4]]));
    container.innerHTML = `<section class="photo-lab"><h3>${def.title}</h3><p>${def.intro}</p><div class="photo-lab-controls">${def.controls.map(c => `<label for="${id}-${c[0]}">${c[1]}<br><output for="${id}-${c[0]}" data-value="${c[0]}">${c[4]} ${c[6]}</output><input id="${id}-${c[0]}" data-key="${c[0]}" type="range" min="${c[2]}" max="${c[3]}" value="${c[4]}" step="${c[5]}"></label>`).join('')}</div><div class="photo-lab-results" aria-live="polite"></div><svg viewBox="0 0 620 340" role="img" aria-label="${def.title}几何示意"></svg><p class="photo-lab-formula">${def.formula}</p><p class="photo-lab-warning" aria-live="polite"></p><p class="photo-lab-note">${def.note}</p></section>`;
    const update = () => {
      const result = def.update(values);
      container.querySelector('.photo-lab-results').textContent = result.results;
      container.querySelector('svg').innerHTML = result.svg;
      container.querySelector('.photo-lab-warning').textContent = result.warning || '';
    };
    container.querySelectorAll('input').forEach(input => input.addEventListener('input', () => {
      const key = input.dataset.key; values[key] = Number(input.value);
      const control = def.controls.find(c => c[0] === key);
      container.querySelector(`[data-value="${key}"]`).textContent = fmt(values[key],3) + ' ' + control[6];
      update();
    }));
    update();
  };
export { PhotoMath, renderLab };
