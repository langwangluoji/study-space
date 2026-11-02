// Small, deterministic classroom models. Angles enter in degrees; no browser state.
const radians = degrees => degrees * Math.PI / 180;
const degrees = radians => radians * 180 / Math.PI;
export const calibration = { x: [-1, 0, 1, 2], t: [0, 1, 1, 4] };
export const wgs84Flattening = 1 / 298.257223563;
export const wgs84E2 = 2 * wgs84Flattening - wgs84Flattening ** 2;

export function positioning(c) {
  const lambda = c < 3 ? .8 * (3 - c) : 0;
  const x = 2 - lambda, y = 1 - lambda / 4;
  return { c, lambda, x, y, q: ((x - 2) ** 2 + 4 * (y - 1) ** 2) / 2 };
}
export function gradientStep(eta) {
  const { x, t } = calibration;
  const residualBefore = x.map((v, i) => v - t[i]);
  const gradient = [residualBefore.reduce((a, b) => a + b, 0) / 4,
    residualBefore.reduce((sum, r, i) => sum + r * x[i], 0) / 4];
  const w0 = -eta * gradient[0], w1 = 1 - eta * gradient[1];
  const predictions = x.map(v => w0 + w1 * v);
  const residuals = predictions.map((v, i) => v - t[i]);
  return { eta, w0, w1, gradient, predictions, residuals,
    before: residualBefore.reduce((sum, r) => sum + r * r, 0) / 8,
    loss: residuals.reduce((sum, r) => sum + r * r, 0) / 8 };
}
export function photographScale(height, focalMetres = .152) {
  return { height, focalMetres, scale: focalMetres / height, denominator: height / focalMetres };
}
export function latitude(B, e2 = wgs84E2) {
  const angle = radians(B);
  const phi = degrees(Math.atan2((1 - e2) * Math.sin(angle), Math.cos(angle)));
  return { B, phi, differenceMinutes: (B - phi) * 60, e2 };
}
export function detectorFootprint(betaMrad, height = 1000) {
  const beta = betaMrad / 1000;
  return { betaMrad, beta, height, footprint: 2 * height * Math.tan(beta / 2), approximate: height * beta };
}
export function interference(deltaDegrees) {
  const delta = radians(deltaDegrees);
  const real = 1 + Math.cos(delta), imaginary = Math.sin(delta);
  return { deltaDegrees, real, imaginary, intensity: Math.max(0, 2 + 2 * Math.cos(delta)), amplitude: Math.hypot(real, imaginary) };
}
export function polarization(deltaDegrees) {
  const delta = radians(deltaDegrees);
  const sine = Math.sin(delta), cosine = Math.cos(delta);
  const kind = Math.abs(sine) < 1e-10 ? '线偏振' : Math.abs(cosine) < 1e-10 ? '圆偏振' : '椭圆偏振';
  const points = Array.from({ length: 121 }, (_, i) => {
    const phase = i * 2 * Math.PI / 120;
    return [Math.cos(phase), Math.cos(phase + delta)];
  });
  return { deltaDegrees, kind, points, major: Math.sqrt(1 + Math.abs(cosine)), minor: Math.sqrt(Math.max(0, 1 - Math.abs(cosine))) };
}
const choice = (label, feedback) => ({ label, feedback });
export const lessons = [
  {
    id: 'optimization', course: '最优化', title: '放宽约束，最优代价会增加吗？',
    intro: '一个点想靠近 (2, 1)，挡板要求 x + y ≤ c。只移动挡板，保持目标不变。',
    question: '把 c 从 2 向上调，新的最小代价会怎样？',
    choices: [choice('会增加', '旧的可行点仍然可选。最小化时，增加选择不会让最优代价更大。'), choice('不会增加', '可行集扩大，最优值不增。到 c = 3 后，代价已经为零，再放宽会保持不变。'), choice('一定持续降低', '到 c = 3，自由最优点已经可行。继续放宽，代价保持为零。')],
    experiment: '把 c 调到 3，再继续向右。观察最优位置与代价何时停止变化。',
    explanation: '放宽约束扩大可行集，旧的最优点仍然可选，所以最小值不增。c < 3 时最优点在挡板上；c ≥ 3 时停在 (2, 1)，乘子和代价均为零。c = 3 也说明活动约束的乘子可以为零。',
    condition: '仅改变约束右端 c；q = ½[(x−2)² + 4(y−1)²]，没有额外盒约束。',
    formula: 'c < 3：λ = 0.8(3−c)，x = 2−λ，y = 1−λ/4；c ≥ 3：λ = 0。',
    control: '挡板 c', min: 1, max: 3.5, step: .1, initial: 2, unit: '', preset: 3,
    href: '/optimization-bv-05#positioning-kkt', link: '继续读 KKT 最优证书', model: positioning, y: 'q', yLabel: '最小代价 q',
  },
  {
    id: 'ml', course: '机器学习', title: '沿负梯度走一步，损失一定变小吗？',
    intro: '用四次校准观测拟合一条直线。从同一个初值出发，只改变一次更新的学习率。',
    question: '保持负梯度方向，步长越大，损失就越低吗？',
    choices: [choice('是，方向对就行', '方向只决定局部趋势。步长过大可能越过低谷，让一次更新后的损失反而增大。'), choice('还要看步长', '方向和步长共同决定结果。把学习率从 0.1 调到 1.5，比较更新前后的损失。'), choice('每一步都必须求正规方程', '本次用已知梯度直接更新参数，再计算四个残差；不需要先求正规方程。')],
    experiment: '每次拖动都从 (w₀,w₁) = (0,1) 重新走一步，不是连续训练。比较紫点与更新前的水平虚线。',
    explanation: '初值的梯度为 (−1,−0.75)，所以 w₀ = η、w₁ = 1 + 0.75η。η = 0.1 时损失由 0.75 降至 0.60671875；较大的正步长也可能把损失抬高。',
    condition: 'x = [−1,0,1,2]，t = [0,1,1,4]；损失为 Σ(预测−目标)² / 8，一次全批量更新。',
    formula: 'w新 = w旧 − η∇L；L = (1/2N)Σ(w₀ + w₁xᵢ − tᵢ)²，N = 4。',
    control: '学习率 η', min: 0, max: 2, step: .05, initial: .1, unit: '', preset: 1.5,
    href: '/lecture-1#a10', link: '继续读步长条件', model: gradientStep, y: 'loss', yLabel: '一步后的损失 L',
  },
  {
    id: 'photogrammetry', course: '摄影测量', title: '飞得更高，同一物体在片上会更大吗？',
    intro: '固定焦距 152 mm，改变相对同一水平地面的摄影高度。比较影像长度与地面长度的比。',
    question: '相对航高从 1000 m 加倍到 2000 m，比例尺怎样变？',
    choices: [choice('比值加倍', '比例尺比值为 f/H。焦距固定而分母加倍，比值变为一半。'), choice('比值减半', '同一物体在片上的长度减半，比例尺分母则加倍。'), choice('比值不变', '固定的是焦距。航高改变了中心投影的几何比例，因此尺度会变化。')],
    experiment: '把 H 从 1000 m 调到 2000 m，比较比例尺分母。注意“分母变大”和“比例尺变大”方向相反。',
    explanation: '在水平地面、近似垂直摄影条件下，s = f/H。固定 f 时航高加倍，比例尺比值减半，分母加倍。这是几何尺度关系，不直接等于定位精度。',
    condition: '水平参考面、近似垂直摄影；H 为相对该地面的高度，f = 0.152 m，长度单位一致。',
    formula: 's = 像长 / 地面长 = f/H；比例尺分母 m = H/f。',
    control: '相对航高 H', min: 500, max: 2500, step: 100, initial: 1000, unit: 'm', preset: 2000,
    href: '/photogrammetry-en-02#w3-hofrymp', link: '继续读摄影比例尺', model: photographScale, y: 'scale', yLabel: '比例尺比值 f/H',
  },
  {
    id: 'geodesy', course: '大地测量', title: '同一个点，两种纬度会相等吗？',
    intro: '沿 WGS84 椭球面移动点 P。大地纬度看外法线，地心纬度看从地心指向 P 的向径。',
    question: '椭球面上大地纬度 B = 45° 时，地心纬度 Φ 是多少？',
    choices: [choice('也是 45°', 'WGS84 是扁椭球。45° 处法线与地心向径方向不同；赤道和极点才在本模型中相等。'), choice('略小于 45°', '北半球中纬度处，地心向径更靠近赤道面，Φ 约为 44.8076°。'), choice('略大于 45°', '由 tan Φ = (1−e²)tan B，0 < B < 90° 且 e² > 0 时可知 Φ < B。')],
    experiment: '先看 45° 的纬差，再移到赤道和极点。图中纵轴是 B−Φ，单位为角分。',
    explanation: '纬度描述同一个椭球面点，但量角方向不同。atan2 写法保留南北半球的符号，并能连续处理极点。南半球的有符号纬差为负；赤道和两极纬差为零。',
    condition: 'WGS84：f = 1/298.257223563，e² = 2f−f²；点在椭球面上，h = 0。',
    formula: 'Φ = atan2((1−e²)sin B, cos B)；图示纬差为 60(B−Φ) 角分。',
    control: '大地纬度 B', min: -90, max: 90, step: 1, initial: 45, unit: '°', preset: 90,
    href: '/geodesy-ellipsoid-coordinates#latitude-relations', link: '继续读三种纬度', model: latitude, y: 'differenceMinutes', yLabel: 'B−Φ / 角分',
  },
  {
    id: 'remote-sensing', course: '遥感基础', title: '瞬时视场变宽，地面足迹怎样变？',
    intro: '在平地天底观测模型中，保持相对高度 1000 m，改变单探元的角 IFOV。',
    question: '小角度条件下，IFOV 从 1 mrad 加倍到 2 mrad，足迹约怎样变？',
    choices: [choice('宽度约加倍', '小角度时 g ≈ Hβ，高度固定，角范围加倍，地面足迹宽度约加倍。'), choice('宽度减半', '更宽的角范围在同一地面上覆盖更宽的足迹，而不是更窄。'), choice('有效分辨率必然提高一倍', '足迹是几何投影尺度。有效分辨率还受光学、运动、噪声和处理影响，不能由该比值直接推出。')],
    experiment: '比较精确平地公式与小角近似。这里调的是单探元角范围，不是整体 FOV，也不是输出像元大小。',
    explanation: '平地、天底对称几何给出 g = 2H tan(β/2)，小角度下约为 Hβ。角 IFOV、地面足迹、GSD 和有效分辨率应分别判断；把产品重采样成更小网格不会增加观测细节。',
    condition: '平坦地面、天底对称观测，相对高度 H = 1000 m；输入 mrad 在计算中转为 rad。',
    formula: 'β(rad) = β(mrad)/1000；g = 2H tan(β/2) ≈ Hβ。',
    control: '角 IFOV β', min: .2, max: 3, step: .1, initial: 1, unit: 'mrad', preset: 2,
    href: '/remote-sensing-ch4#rs4-ifov', link: '继续读 IFOV 与分辨率', model: detectorFootprint, y: 'footprint', yLabel: '地面足迹宽度 g / m',
  },
  {
    id: 'insar', course: 'InSAR', title: '两个单位振幅相加，强度一定等于 2 吗？',
    intro: '把两路同频、同极化回波的复振幅相加。保持两路振幅都为 1，只改变稳定的相位差。',
    question: '两路同相时，合成强度是多少？',
    choices: [choice('2', '同相先相加振幅：1 + 1 = 2，再取模平方，得到强度 4。直接相加强度会丢掉干涉项。'), choice('4', '同相的复振幅相长，合成振幅为 2，强度为 4。反相时同样的两路可完全相消。'), choice('与相位差无关', '相干叠加包含 2cos δ 的干涉项。相位差改变时，强度在 0 到 4 之间变化。')],
    experiment: '把相位差依次调为 0°、90°、180°。图上虚线 2 是两路强度直接相加的数值。',
    explanation: '两路单位复振幅相加，I = |1 + exp(iδ)|² = 2 + 2cos δ。同相强度为 4，正交相位为 2，反相为 0。非相干平均时交叉项可消失，与这里的稳定相位差不同。',
    condition: '同频、同极化、同一接收位置，单位振幅；相位关系在观察时间内稳定，采用归一化强度。',
    formula: 's = 1 + exp(iδ)；I = |s|² = 2 + 2cos δ。',
    control: '相位差 δ', min: 0, max: 360, step: 5, initial: 90, unit: '°', preset: 180,
    href: '/insar-microwave#microwave-interference', link: '继续读相干与干涉', model: interference, y: 'intensity', yLabel: '合成强度 I',
  },
  {
    id: 'optics', course: '光学', title: '两个等幅正交分量，何时画出圆？',
    intro: '固定同一位置，观察电场端点一个周期内的轨迹。两个正交分量同频、等幅且相位差稳定。',
    question: '相位差为 90°，两个分量等幅时，合电场属于哪种偏振？',
    choices: [choice('线偏振', '同相或反相给出直线。等幅正交分量相差四分之一周期时，端点沿圆周运动。'), choice('圆偏振', '正交、等幅、相差四分之一周期共同给出圆。若两振幅不等，这个相位差会给出椭圆。'), choice('自然光', '这里两个分量有稳定相位关系，轨迹确定。自然光的各波列没有这种长期稳定的相位关系。')],
    experiment: '把相位差依次调到 0°、45°、90°、180°。图线是固定位置随时间的电场轨迹，圆点标记 θ = 0 的电场端点。',
    explanation: '等幅归一化后 Ex = cos θ，Ey = cos(θ + δ)。δ = 0° 或 180° 给出线偏振；δ = 90° 给出圆偏振；其余所示角度给出椭圆。轨迹位于垂直传播方向的平面内，不是光的空间传播路径。',
    condition: '沿用传播 II PPT 第35—37页：同频、同向传播、正交电场、恒定相位差；此处另固定 Ax = Ay = 1。',
    formula: 'Ex = cos θ，Ey = cos(θ + δ)；横轴 Ex，纵轴 Ey，均按分量峰值归一化。',
    control: '相位差 δ', min: 0, max: 180, step: 5, initial: 45, unit: '°', preset: 90,
    href: '/optics-propagation-ii', link: '继续读偏振态与相位条件', model: polarization,
  },
];

export function lessonById(id) { return lessons.find(lesson => lesson.id === id) || lessons[0]; }
export function curveFor(lesson, samples = 100) {
  if (!lesson.y) return [];
  return Array.from({ length: samples + 1 }, (_, i) => {
    const x = lesson.min + (lesson.max - lesson.min) * i / samples;
    return [x, lesson.model(x)[lesson.y]];
  });
}
