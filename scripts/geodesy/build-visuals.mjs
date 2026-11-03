import {mkdir, readFile, writeFile} from 'node:fs/promises';
import {fileURLToPath} from 'node:url';
import {dirname, resolve} from 'node:path';
import * as model from './model.mjs';

// Six Figure-size teaching drawings. The geometric objects themselves are the
// explanation: ellipsoid sections, sight circle, pivot plane, celestial sphere
// and clocks. Every point and readout is derived from the same pure model.
// Physical parts: two meridian/equator rims, 36 graticule/tick segments, axes,
// origin hub, normal rod, sight point, projection feet and engraved labels.
const ROOT = resolve(dirname(fileURLToPath(import.meta.url)), '../..');
const specifications = {
  'blh-xyz': {title: '从大地坐标到空间直角坐标', subtitle: '沿椭球法线确定高度，再把平行圈投影到 X、Y 轴。', fields: [
    ['B', '大地纬度 B / °', 40, -90, 90, 1], ['L', '经度 L / °', 35, -180, 180, 1], ['h', '椭球高 h / m', 600000, -1000, 1000000, 1000]],
    caption: '两个剖面使用相同的米制比例及 WGS84 真扁率。左图沿 +Z 俯视；右图为点所在子午面，横轴 p=√(X²+Y²)。B 是椭球法线与赤道面的夹角；φ 是空间点 P 的地心纬度。h 沿法线量取。示例采用较高的 P 以显示高度线段。'},
  inverse: {title: '从 X、Y、Z 反解 B、L、h', subtitle: '先找子午面，再沿椭球法线定位 Q 与 P。', fields: [
    ['X', 'X / m', 3194419.145060575, -8000000, 8000000, 1000], ['Y', 'Y / m', 3194419.145060575, -8000000, 8000000, 1000], ['Z', 'Z / m', 4487348.408865919, -8000000, 8000000, 1000]],
    caption: 'L=atan2(Y,X) 保留四象限信息；p 与 Z 决定子午面内的位置。Q 是由反解纬度确定的椭球面点，QP 沿法线给出 h。教学域为归一化半径 √[(X²+Y²)/a²+Z²/b²]≥0.99（b=a(1−f)），覆盖近地表及椭球外部；更深处可能有多个法线解，面板拒绝求解。极轴上的经度无唯一值，数值采用 L=0° 报告约定并省略经度角弧；地心的 B、L 无唯一解。图按实际比例显示 WGS84 椭球，近地表高度可小于一个像素。'},
  'local-polar': {title: '局部 ENU 与站心极坐标', subtitle: '方位角从北顺时针，天顶距从向上方向量起。', fields: [
    ['B', '测站纬度 B / °', 31.2, -90, 90, .1], ['L', '测站经度 L / °', 121.5, -180, 180, .1], ['dx', 'ΔX / m', -800, -2000, 2000, 10], ['dy', 'ΔY / m', 600, -2000, 2000, 10], ['dz', 'ΔZ / m', 400, -2000, 2000, 10]],
    caption: '左图把水平分量投影到东—北平面；右图把视线展开到水平距离 ρ 与 U 构成的竖直面。两图共同表达同一条测站到目标的向量。A=atan2(E,N)，e=atan2(U,ρ)，z=90°−e。极点的 E、N 轴依输入经度选定的约定子午面建立，方位角相对这组水平轴量取。竖直视线的方位角无定义；零向量的三个角均无定义。'},
  'transform-pivot': {title: '绕枢轴的主动旋转、缩放与平移', subtitle: '沿 +Z 俯视，右手正角把 +X 转向 +Y。', fields: [
    ['px', '原始点 P 的 X / m', 3, -5, 5, .1], ['py', '原始点 P 的 Y / m', 1, -5, 5, .1], ['cx', '枢轴 C 的 X / m', 1, -3, 3, .1], ['cy', '枢轴 C 的 Y / m', 1, -3, 3, .1], ['angle', '主动旋转 θ / °', 60, -180, 180, 1], ['scale', '尺度因子 s', 1.2, .2, 2, .05], ['tx', '随后平移 tX / m', 1, -3, 3, .1], ['ty', '随后平移 tY / m', -.5, -3, 3, .1]],
    caption: '平面展示 Z 分量为零的精确算例。依次计算 P−C、Rz(θ)(P−C)、sRz(θ)(P−C)，最后加 C+t。由同一变换可得标准形式 P′=sRzP+T，其中 T=C+t−sRzC。枢轴坐标与标准平移参数共同决定等价表达。'},
  celestial: {title: '赤经、恒星角与天体时角', subtitle: '让本地子午面转动，观察天体在站心天空的位置。', fields: [
    ['alpha', '赤经 α / °', 40, 0, 360, 1], ['delta', '赤纬 δ / °', 20, -90, 90, 1], ['theta', '格林尼治恒星角 θG / °', 80, 0, 360, 1], ['L', '测站东经 λ / °', 30, -180, 180, 1], ['B', '测站纬度 B / °', 35, -90, 90, 1]],
    caption: '左图是从北天极看向赤道面的角度关系：本地恒星角 θL=θG+λ，H=θL−α。右图用同一 H、δ 和测站纬度计算单位天球上的 ENU 方向。H 取 −180°～180°，西向为正；图中角弧给出最短有向差。极点的水平轴与本地子午面依输入经度约定，方位角相对该轴量取。该几何教学模型采用一致的赤经和恒星角定义，未加入折射、岁差或章动改正。'},
  time: {title: 'UTC、TAI、TT 与 UT1 的秒差', subtitle: '统一标号的参考历元，逐项计算时标差。', fields: [
    ['utc', 'UTC 参考历元后的秒数', 100, 0, 86400, 1], ['deltaAT', '输入 ΔAT=TAI−UTC / s', 37, 0, 100, 1], ['dut1', '输入 DUT1=UT1−UTC / s', -.2, -.9, .9, .01]],
    caption: 'TAI=UTC+ΔAT，TT=TAI+32.184 s，UT1=UTC+DUT1。ΔAT=37 s 是可编辑的演示输入，须按所求日期查闰秒表；页面不把它当作当前日期的自动值。横轴以 UTC 为零点表示时标读数差，下方将 DUT1 单独放大。秒数计算适用于同一 ΔAT 区段，不用于解析跨闰秒的民用日期。'}
};

// Kept in one serializable function so build-time fallback and browser updates
// execute exactly the same drawing code. No network or module imports at runtime.
function figure(mode, v, M) {
  const width = 800, height = 490;
  const F = (n, digits = 3) => n === null ? '无定义' : (Math.abs(n) < 5e-10 ? 0 : n).toLocaleString('en-US', {minimumFractionDigits: digits, maximumFractionDigits: digits});
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
  const out = [];
  const line = (a, b, color = 'ink', extra = '') => `<path d="M${a[0]},${a[1]}L${b[0]},${b[1]}" class="${color}" fill="none" ${extra}/>`;
  const dot = (p, color = 'accent', radius = 5) => `<circle cx="${p[0]}" cy="${p[1]}" r="${radius}" class="${color} fill"/>`;
  const text = (p, value, color = 'ink', extra = '') => `<text x="${p[0]}" y="${p[1]}" class="${color}" ${extra}>${esc(value)}</text>`;
  const path = (points, color = 'grid', extra = '') => `<path d="${points.map((p, i) => `${i ? 'L' : 'M'}${p[0]},${p[1]}`).join('')}" class="${color}" fill="none" ${extra}/>`;
  const arc = (c, r, start, end, color = 'accent') => path(Array.from({length: 61}, (_, i) => {const a = M.rad(start + (end - start) * i / 60); return [c[0] + r * Math.cos(a), c[1] - r * Math.sin(a)];}), color, 'stroke-width="3"');
  const circle = (c, r, color = 'grid') => `<circle cx="${c[0]}" cy="${c[1]}" r="${r}" class="${color}" fill="none"/>`;
  const metric = (label, value, unit = '') => [label, `${value}${unit ? ` ${unit}` : ''}`];
  const heading = (x, label) => text([x, 38], label, 'ink', 'font-size="17" font-weight="650"');
  const angleTickRing = (c, r) => Array.from({length: 36}, (_, i) => {
    const a = M.rad(i * 10), inner = r - (i % 3 ? 4 : 9);
    return line([c[0] + inner * Math.cos(a), c[1] - inner * Math.sin(a)], [c[0] + r * Math.cos(a), c[1] - r * Math.sin(a)], 'grid');
  }).join('');
  let rows = [], note = '';

  if (mode === 'blh-xyz' || mode === 'inverse') {
    const inverse = mode === 'inverse';
    const p3 = inverse ? {X: v.X, Y: v.Y, Z: v.Z} : M.blhToXyz(v);
    const geo = inverse ? M.xyzToBlh(p3) : {...v, longitudeDefined: Math.abs(v.B) !== 90};
    const q3 = M.blhToXyz({...geo, h: 0}), p = Math.hypot(p3.X, p3.Y), q = Math.hypot(q3.X, q3.Y);
    const a = M.WGS84.a, b = a * (1 - M.WGS84.f);
    const size = Math.max(a, Math.hypot(p3.X, p3.Y), Math.abs(p3.Z)) * 1.12, k = 145 / size;
    const C1 = [200, 250], C2 = [595, 250];
    const xy = (x, y) => [C1[0] + x * k, C1[1] - y * k];
    const pz = (p, z) => [C2[0] + p * k, C2[1] - z * k];
    out.push(heading(42, '赤道面投影：先看经度 L'), heading(427, '子午面：纬度 B 与法线高 h'));
    out.push(circle(C1, a * k), angleTickRing(C1, a * k));
    for (const factor of [-1, -.5, 0, .5, 1]) {
      const xx = factor * a, span = Math.sqrt(Math.max(0, a * a - xx * xx));
      out.push(line(xy(xx, -span), xy(xx, span), 'faint'), line(xy(-span, xx), xy(span, xx), 'faint'));
    }
    out.push(line([30, C1[1]], [365, C1[1]], 'ink', 'marker-end="url(#arrow)"'), line([C1[0], 418], [C1[0], 75], 'ink', 'marker-end="url(#arrow)"'));
    out.push(text([354, 273], '+X'), text([213, 82], '+Y'), text([181, 272], 'O'));
    const xyPoint = xy(p3.X, p3.Y);
    out.push(line(C1, xyPoint, 'accent', 'stroke-width="3"'), line(xyPoint, xy(p3.X, 0), 'muted', 'stroke-dasharray="5 4"'), line(xyPoint, xy(0, p3.Y), 'muted', 'stroke-dasharray="5 4"'), dot(xyPoint), text([xyPoint[0] + 9, xyPoint[1] - 10], 'Pxy', 'accent'));
    if (geo.longitudeDefined) out.push(arc(C1, 51, 0, geo.L), text([C1[0] + 58 * Math.cos(M.rad(geo.L / 2)), C1[1] - 58 * Math.sin(M.rad(geo.L / 2)) - 5], 'L', 'accent'));
    else out.push(text([42, 411], '极轴：经度无唯一值，省略 L 角弧', 'muted'));
    out.push(text([42, 451], `p = √(X²+Y²) = ${F(p)} m`, 'muted'));
    out.push(path(Array.from({length: 181}, (_, i) => {const t = 2 * Math.PI * i / 180; return pz(a * Math.cos(t), b * Math.sin(t));}), 'body', 'stroke-width="2"'));
    out.push(line([430, C2[1]], [770, C2[1]], 'ink', 'marker-end="url(#arrow)"'), line([C2[0], 418], [C2[0], 75], 'ink', 'marker-end="url(#arrow)"'));
    out.push(text([753, 273], '+p'), text([608, 82], '+Z'), text([578, 272], 'O'));
    const P = pz(p, p3.Z), Q = pz(q, q3.Z), normal = [Math.cos(M.rad(geo.B)), Math.sin(M.rad(geo.B))];
    const normalFoot = pz(q - q3.Z / Math.tan(M.rad(geo.B) || 1e-30), 0);
    if (Math.abs(geo.B) > .001 && Math.abs(geo.B) < 89.999) out.push(line(normalFoot, pz(q + normal[0] * a * .26, q3.Z + normal[1] * a * .26), 'north', 'stroke-dasharray="6 4"'));
    else out.push(line(pz(q - normal[0] * a * .25, q3.Z - normal[1] * a * .25), pz(q + normal[0] * a * .25, q3.Z + normal[1] * a * .25), 'north', 'stroke-dasharray="6 4"'));
    out.push(line(C2, P, 'muted', 'stroke-dasharray="5 4"'), line(Q, P, 'accent', 'stroke-width="5"'), dot(Q, 'north', 4), dot(P, 'accent', 5));
    const phi = M.deg(Math.atan2(p3.Z, p));
    out.push(arc(C2, 48, 0, phi, 'muted'), arc(C2, 72, 0, geo.B, 'north'));
    out.push(text([C2[0] + 54 * Math.cos(M.rad(phi / 2)), C2[1] - 54 * Math.sin(M.rad(phi / 2)) + 13], 'φ', 'muted'), text([C2[0] + 81 * Math.cos(M.rad(geo.B / 2)), C2[1] - 81 * Math.sin(M.rad(geo.B / 2)) - 3], 'B', 'north'));
    out.push(text([P[0] + 9, P[1] - 9], 'P', 'accent'), text([Q[0] + 9, Q[1] + 20], 'Q', 'north'), text([430, 451], 'WGS84 真扁率 · 法线为绿色虚线', 'muted'));
    rows = inverse ? [metric('大地纬度 B', F(geo.B, 8), '°'), metric('经度 L', geo.longitudeDefined ? F(geo.L, 8) : '无唯一值；约定 0', '°'), metric('椭球高 h', F(geo.h), 'm'), metric('迭代次数', geo.iterations)] : [metric('X', F(p3.X), 'm'), metric('Y', F(p3.Y), 'm'), metric('Z', F(p3.Z), 'm'), metric('地心纬度 φ', F(phi, 8), '°')];
    note = inverse ? '反解使用固定点迭代与法线投影；归一化半径须≥0.99，深部可能多解，不能以某一分支收敛判定唯一性。' : 'N=a/√(1−e²sin²B)；X=(N+h)cosBcosL，Y=(N+h)cosBsinL，Z=[N(1−e²)+h]sinB。';
  }

  if (mode === 'local-polar') {
    const r = M.enuFromDelta(v), horizontal = Math.hypot(r.E, r.N), bound = Math.max(1, r.range), k = 135 / bound;
    const C1 = [205, 250], C2 = [535, 250], point = [C1[0] + r.E * k, C1[1] - r.N * k], side = [C2[0] + horizontal * k, C2[1] - r.U * k];
    out.push(heading(35, '水平投影：从北向东量 A'), heading(427, '视线竖直面：量 e 与 z'));
    if (Math.abs(v.B) === 90) out.push(text([38, 68], '极点：水平轴依输入经线约定，A 相对该轴', 'muted', 'font-size="13"'));
    out.push(circle(C1, 135), circle(C1, 67.5), angleTickRing(C1, 135));
    out.push(line([35, 250], [375, 250], 'east', 'marker-end="url(#arrow)"'), line([205, 418], [205, 80], 'north', 'marker-end="url(#arrow)"'));
    out.push(text([360, 274], 'E', 'east'), text([216, 88], 'N', 'north'), text([216, 415], 'S', 'muted'), text([35, 274], 'W', 'muted'), text([181, 274], '站'));
    out.push(line(C1, point, 'accent', 'stroke-width="4"'), dot(point), line(point, [point[0], 250], 'muted', 'stroke-dasharray="5 4"'), line(point, [205, point[1]], 'muted', 'stroke-dasharray="5 4"'));
    if (r.azimuth !== null) out.push(arc(C1, 45, 90, 90 - r.azimuth, 'accent'), text([252, 208], 'A', 'accent'));
    out.push(text([38, 450], `E=${F(r.E)} m；N=${F(r.N)} m`, 'muted'));
    out.push(line([442, 250], [752, 250], 'ink', 'marker-end="url(#arrow)"'), line([535, 418], [535, 80], 'north', 'marker-end="url(#arrow)"'));
    out.push(text([745, 274], 'ρ'), text([546, 86], 'U', 'north'), text([506, 274], '站'));
    out.push(line(C2, side, 'accent', 'stroke-width="4"'), line(side, [side[0], 250], 'muted', 'stroke-dasharray="5 4"'), dot(side), text([side[0] + 7, side[1] - 7], '目标', 'accent'));
    if (r.elevation !== null) out.push(arc(C2, 49, 0, r.elevation, 'accent'), arc(C2, 70, 90, r.elevation, 'north'), text([C2[0] + 57, C2[1] - 13], 'e', 'accent'), text([C2[0] + 32, C2[1] - 71], 'z', 'north'));
    out.push(text([430, 450], `ρ=${F(horizontal)} m；U=${F(r.U)} m`, 'muted'));
    rows = [metric('斜距 r', F(r.range), 'm'), metric('方位角 A', F(r.azimuth), '°'), metric('高度角 e', F(r.elevation), '°'), metric('天顶距 z', F(r.zenith), '°')];
    note = 'E=−sinL·ΔX+cosL·ΔY；N=−sinBcosL·ΔX−sinBsinL·ΔY+cosB·ΔZ；U=cosBcosL·ΔX+cosBsinL·ΔY+sinB·ΔZ。';
  }

  if (mode === 'transform-pivot') {
    const P = [v.px, v.py, 0], C = [v.cx, v.cy, 0], t = [v.tx, v.ty, 0];
    const rotated = M.pivotTransform({point: P, pivot: C, angle: v.angle}), scaled = M.pivotTransform({point: P, pivot: C, angle: v.angle, scale: v.scale}), final = M.pivotTransform({point: P, pivot: C, angle: v.angle, scale: v.scale, translation: t});
    const points = [P, C, rotated.point, scaled.point, final.point, [0, 0, 0]], bound = Math.max(5, ...points.flatMap(p => [Math.abs(p[0]), Math.abs(p[1])])) * 1.2, k = 176 / bound, O = [400, 250];
    const at = p => [O[0] + p[0] * k, O[1] - p[1] * k];
    out.push(heading(35, '坐标平面 XY：各阶段共用同一米制比例'));
    for (let i = -Math.ceil(bound); i <= bound; i++) out.push(line(at([i, -bound]), at([i, bound]), 'faint'), line(at([-bound, i]), at([bound, i]), 'faint'));
    out.push(line([145, 250], [668, 250], 'ink', 'marker-end="url(#arrow)"'), line([400, 441], [400, 64], 'ink', 'marker-end="url(#arrow)"'), text([657, 274], '+X'), text([412, 72], '+Y'), text([380, 272], 'O'));
    const screenC = at(C), screenP = at(P), R = at(rotated.point), S = at(scaled.point), Q = at(final.point), radius = Math.hypot(P[0] - C[0], P[1] - C[1]) * k, start = M.deg(Math.atan2(P[1] - C[1], P[0] - C[0]));
    out.push(circle(screenC, radius, 'grid'), arc(screenC, radius, start, start + v.angle, 'north'), line(screenC, screenP, 'muted', 'stroke-width="2"'), line(screenC, S, 'north', 'stroke-width="3"'), line(S, Q, 'accent', 'stroke-width="3" marker-end="url(#accentArrow)"'), line(O, screenC, 'muted', 'stroke-dasharray="5 4"'));
    out.push(dot(screenP, 'muted'), dot(R, 'north', 3), dot(S, 'north', 5), dot(Q), dot(screenC, 'ink', 5));
    out.push(text([screenP[0] + 9, screenP[1] - 11], 'P', 'muted'), text([screenC[0] + 9, screenC[1] + 20], 'C', 'ink'), text([S[0] - 5, S[1] - 13], 'sR(P−C)+C', 'north', 'text-anchor="end"'), text([Q[0] + 9, Q[1] + 20], 'P′', 'accent'));
    out.push(text([35, 461], `刻度间隔 1 m · θ=${F(v.angle, 1)}° · s=${F(v.scale, 2)}`, 'muted'));
    rows = [metric('结果 X′', F(final.point[0]), 'm'), metric('结果 Y′', F(final.point[1]), 'm'), metric('等价标准平移 TX', F(final.standardTranslation[0]), 'm'), metric('等价标准平移 TY', F(final.standardTranslation[1]), 'm')];
    note = 'P′=C+t+sRz(θ)(P−C)=sRz(θ)P+T；Rz=[cosθ, −sinθ, 0; sinθ, cosθ, 0; 0, 0, 1]。';
  }

  if (mode === 'celestial') {
    const r = M.celestialCoordinates({rightAscension: v.alpha, declination: v.delta, siderealAngle: v.theta, longitude: v.L, latitude: v.B}), C = [202, 250], radius = 136;
    const on = (angle, rr = radius) => [C[0] + rr * Math.cos(M.rad(angle)), C[1] - rr * Math.sin(M.rad(angle))];
    out.push(heading(35, '赤道面角度：从北天极看'), heading(421, '站心天球：ENU 单位方向'));
    out.push(circle(C, radius), angleTickRing(C, radius), line([40, 250], [370, 250], 'grid'), line([202, 410], [202, 85], 'grid'));
    out.push(line(C, on(0), 'muted'), text([337, 274], '春分点 γ', 'muted', 'text-anchor="end"'));
    out.push(line(C, on(v.alpha), 'accent', 'stroke-width="3"'), line(C, on(r.localSiderealAngle), 'north', 'stroke-width="3"'), dot(on(v.alpha)), dot(on(r.localSiderealAngle), 'north'));
    out.push(arc(C, 48, 0, v.alpha, 'accent'), arc(C, 71, 0, r.localSiderealAngle, 'north'), arc(C, 107, v.alpha, v.alpha + r.hourAngle, 'east'));
    out.push(text([48, 438], `α=${F(v.alpha, 1)}° · θL=${F(r.localSiderealAngle, 1)}°`, 'muted'), text([48, 462], '蓝：赤经圈；绿：本地子午圈；橙弧：H', 'muted'));
    const O = [601, 269], k = 129, view = ([e, n, u]) => [O[0] + k * (.83 * e - .52 * n), O[1] - k * (.25 * e + .4 * n + .88 * u)];
    const horizon = Array.from({length: 121}, (_, i) => view([Math.cos(i * Math.PI / 60), Math.sin(i * Math.PI / 60), 0]));
    out.push(path(horizon, 'body', 'stroke-width="2"'), path(Array.from({length: 121}, (_, i) => view([Math.cos(i * Math.PI / 60), 0, Math.sin(i * Math.PI / 60)])), 'faint'), path(Array.from({length: 121}, (_, i) => view([0, Math.cos(i * Math.PI / 60), Math.sin(i * Math.PI / 60)])), 'faint'));
    for (const [dir, label, color] of [[[1.16, 0, 0], 'E', 'east'], [[0, 1.16, 0], 'N', 'north'], [[0, 0, 1.23], 'U / 天顶', 'ink']]) {
      const end = view(dir); out.push(line(O, end, color, 'marker-end="url(#arrow)"'), text([end[0] + 6, end[1] - 5], label, color));
    }
    const sky = view([r.E, r.N, r.U]), foot = view([r.E, r.N, 0]);
    out.push(line(O, sky, 'accent', 'stroke-width="4"'), line(sky, foot, 'muted', 'stroke-dasharray="5 4"'), dot(sky), text([sky[0] + 10, sky[1] - 8], '天体', 'accent'), dot(O, 'ink', 3));
    out.push(text([425, 438], Math.abs(v.B) === 90 ? '极点：水平轴依输入经线约定，A 相对该轴' : r.U >= 0 ? '天体在几何地平面上方' : '天体在几何地平面下方', 'muted', Math.abs(v.B) === 90 ? 'font-size="13"' : ''), text([425, 462], `赤纬 δ=${F(v.delta, 1)}°；测站纬度 B=${F(v.B, 1)}°`, 'muted'));
    rows = [metric('本地时角 H（西向正）', F(r.hourAngle), '°'), metric('方位角 A（北起顺时针）', F(r.azimuth), '°'), metric('高度角 e', F(r.elevation), '°'), metric('单位方向 (E,N,U)', `(${F(r.E)}, ${F(r.N)}, ${F(r.U)})`)];
    note = 'H=wrap180(θG+λ−α)；E=−cosδsinH，N=cosBsinδ−sinBcosδcosH，U=sinBsinδ+cosBcosδcosH。';
  }

  if (mode === 'time') {
    const r = M.timeScales({utcSeconds: v.utc, deltaAT: v.deltaAT, dut1: v.dut1}), start = 220, span = 485, max = Math.max(80, v.deltaAT + 42), x = offset => start + span * offset / max;
    out.push(heading(35, '时标读数差：以同一瞬间的 UTC 读数为零点'));
    out.push(text([220, 73], '单位：秒；横轴按比例', 'muted'));
    for (let n = 0; n <= max; n += 10) {
      out.push(line([x(n), 90], [x(n), 314], 'faint'), text([x(n), 85], n, 'muted', 'text-anchor="middle"'));
    }
    for (const [i, name, color] of [[0, 'UTC', 'ink'], [1, 'TAI', 'east'], [2, 'TT', 'accent'], [3, 'UT1', 'north']]) {
      const y = 116 + i * 56, offset = r[name] - r.UTC;
      out.push(text([45, y + 5], name, color, 'font-size="20" font-weight="650"'), line([start - 12, y], [723, y], 'grid'), line([x(offset), y - 12], [x(offset), y + 12], color, 'stroke-width="4"'), dot([x(offset), y], color, 4), text([141, y + 5], `${F(offset, 3)} s`, color, 'text-anchor="middle"'));
    }
    const y = 150;
    out.push(line([x(0), y], [x(v.deltaAT), y], 'east', 'stroke-width="2"'), text([(x(0) + x(v.deltaAT)) / 2, y - 7], 'ΔAT', 'east', 'text-anchor="middle"'), line([x(v.deltaAT), 208], [x(v.deltaAT + 32.184), 208], 'accent', 'stroke-width="2"'), text([(x(v.deltaAT) + x(v.deltaAT + 32.184)) / 2, 201], '+32.184 s', 'accent', 'text-anchor="middle"'));
    const cx = 467, k = 220, cy = 390;
    out.push(text([45, 347], 'DUT1 放大尺', 'ink', 'font-size="17" font-weight="650"'), line([cx - k, cy], [cx + k, cy], 'ink'));
    for (let i = -10; i <= 10; i++) {
      const xx = cx + i * k / 10; out.push(line([xx, cy], [xx, cy + (i % 5 ? 6 : 11)], 'grid'));
      if (i % 5 === 0) out.push(text([xx, cy + 31], `${F(i / 10, 1)} s`, 'muted', 'text-anchor="middle"'));
    }
    out.push(line([cx, cy - 29], [cx, cy + 12], 'muted', 'stroke-dasharray="4 3"'), dot([cx + v.dut1 * k, cy], 'north', 7), text([cx + v.dut1 * k, cy - 14], 'UT1−UTC', 'north', 'text-anchor="middle"'), text([45, 461], 'ΔAT 由日期对应的闰秒表给出；DUT1 由地球定向参数给出。', 'muted'));
    rows = ['UTC', 'TAI', 'TT', 'UT1'].map(name => metric(`${name} / 统一参考历元秒数`, F(r[name]), 's'));
    note = '示例 ΔAT 与 DUT1 均为手动输入；TT−TAI 始终为 32.184 s。日期切换及闰秒表查询交由正式时间服务处理。';
  }
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" role="img" aria-label="${esc(specificationsTitle(mode))}"><title>${esc(specificationsTitle(mode))}</title><desc>修改下方输入可同步更新几何图形与数值。各图图注说明坐标、方向及比例。</desc><style>.ink{stroke:#334155;fill:#334155}.accent{stroke:#1767b7;fill:#1767b7}.north{stroke:#187a67;fill:#187a67}.east{stroke:#ad5b12;fill:#ad5b12}.muted{stroke:#64748b;fill:#64748b}.grid{stroke:#bbc8d7;fill:none}.faint{stroke:#dde5ec;fill:none}.body{stroke:#72889c;fill:none}path,line,circle{stroke-width:1.3}path[class]{fill:none!important}text{stroke:none!important;font:15px system-ui,sans-serif}.fill{stroke:none}svg{background:#f8fafc}</style><defs><marker id="arrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" fill="#64748b"/></marker><marker id="accentArrow" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 0L10 5L0 10Z" fill="#1767b7"/></marker></defs>${out.join('')}</svg>`;
  return {svg, rows, note};
}

// This helper is serialized alongside figure(), whose closure is deliberately
// limited to model arguments and this title mapping.
function specificationsTitle(mode) {
  return {'blh-xyz': '大地坐标正算的赤道面与子午面图', inverse: '空间直角坐标反解的投影与法线图', 'local-polar': '东—北水平投影与视线竖直面图', 'transform-pivot': '绕枢轴主动旋转、缩放与平移图', celestial: '赤道面时角与站心天球方向图', time: 'UTC、TAI、TT 和 UT1 时标差图'}[mode];
}

function runtime(spec, mode, M, draw) {
  const form = document.querySelector('form'), picture = document.querySelector('#picture'), result = document.querySelector('#results'), status = document.querySelector('#status'), note = document.querySelector('#formula');
  const update = () => {
    const values = {};
    for (const [key] of spec.fields) {
      const field = form.elements.namedItem(key);
      if (field.value.trim() === '' || !field.validity.valid) {
        field.setAttribute('aria-invalid', 'true');
        status.textContent = '请输入有效范围内的数值；图形保留上一次有效输入。';
        return;
      }
      field.removeAttribute('aria-invalid'); values[key] = Number(field.value);
    }
    try {
      const frame = draw(mode, values, M);
      picture.innerHTML = frame.svg; result.replaceChildren();
      for (const [label, value] of frame.rows) {
        const group = document.createElement('div'), dt = document.createElement('dt'), dd = document.createElement('dd');
        dt.textContent = label; dd.textContent = value; group.append(dt, dd); result.append(group);
      }
      note.textContent = frame.note; status.textContent = '';
    } catch (error) {status.textContent = error.message;}
  };
  form.addEventListener('input', update);
  form.addEventListener('submit', event => event.preventDefault());
  form.addEventListener('reset', () => requestAnimationFrame(update));
  const theme = document.querySelector('#theme');
  theme.addEventListener('click', () => {
    const dark = document.documentElement.dataset.theme !== 'dark';
    document.documentElement.dataset.theme = dark ? 'dark' : 'light';
    theme.setAttribute('aria-pressed', String(dark)); theme.textContent = dark ? '浅色' : '深色';
  });
}

const pageCss = `:root{font-family:system-ui,"Microsoft YaHei",sans-serif;color:#24364a;background:#f8fafc;--panel:#fff;--border:#d5dfe9;--muted:#576b7e;--input:#fff;color-scheme:light}*{box-sizing:border-box}body{margin:0;padding:20px}main{max-width:1000px;margin:auto}header{display:flex;justify-content:space-between;gap:16px;align-items:start}h1{font-size:23px;line-height:1.4;margin:0 0 8px}p{line-height:1.7}.intro{color:var(--muted);margin:0 0 16px}.controls{display:grid;grid-template-columns:repeat(auto-fit,minmax(155px,1fr));gap:12px;border-top:1px solid var(--border);padding-top:16px}label{font-size:13px;font-weight:650;display:block}input{width:100%;display:block;font:15px ui-monospace,monospace;margin-top:7px;padding:9px;border:1px solid var(--border);border-radius:6px;background:var(--input);color:inherit}input[aria-invalid=true]{border-color:#c7472d}button{font:inherit;white-space:nowrap;padding:8px 13px;border:1px solid var(--border);border-radius:6px;background:var(--panel);color:inherit;cursor:pointer}button:hover{border-color:#1767b7}button:focus-visible,input:focus-visible{outline:3px solid #367cba;outline-offset:3px}.tools{display:flex;gap:8px}figure{margin:8px 0 20px;border:1px solid var(--border);border-radius:10px;overflow:hidden;background:var(--panel)}.picture{overflow-x:auto}svg{display:block;width:100%;min-width:540px;height:auto}figcaption{font-size:13px;line-height:1.7;padding:12px 16px;border-top:1px solid var(--border);color:var(--muted)}dl{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 24px;margin:18px 0}dl div{border-bottom:1px solid var(--border);padding-bottom:10px}dt{font-size:12px;color:var(--muted)}dd{margin:5px 0 0;font:16px ui-monospace,monospace;overflow-wrap:anywhere}#status{color:#b73f25;font-size:14px;min-height:22px;margin:10px 0}#formula{font-size:13px;color:var(--muted);overflow-wrap:anywhere}.hint{font-size:12px;color:var(--muted);margin:5px 0 12px}[data-theme=dark]{color:#d7e5f1;background:#13202d;--panel:#1b2b3b;--border:#3d5265;--muted:#adbed0;--input:#213345;color-scheme:dark}[data-theme=dark] svg{background:#182a3a}[data-theme=dark] svg .ink{stroke:#d6e2ee;fill:#d6e2ee}[data-theme=dark] svg .accent{stroke:#70b9ff;fill:#70b9ff}[data-theme=dark] svg .north{stroke:#6bd0b7;fill:#6bd0b7}[data-theme=dark] svg .east{stroke:#f1b373;fill:#f1b373}[data-theme=dark] svg .muted{stroke:#a6b9cc;fill:#a6b9cc}[data-theme=dark] svg .grid{stroke:#526a7e;fill:none}[data-theme=dark] svg .faint{stroke:#314b61;fill:none}[data-theme=dark] svg .body{stroke:#83a1b8;fill:none}[data-theme=dark] svg text{stroke:none!important}@media(max-width:560px){body{padding:12px}h1{font-size:20px}header{display:block}.tools{margin:12px 0}.controls{grid-template-columns:repeat(2,minmax(0,1fr))}dl{gap:12px}dd{font-size:14px}figcaption{padding:10px 12px}}@media(prefers-reduced-motion:reduce){*{scroll-behavior:auto!important}}`;
const esc = value => String(value).replace(/[&<>"']/g, c => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
const modelSource = (await readFile(new URL('./model.mjs', import.meta.url), 'utf8')).replace(/^export /gm, '');
const exposed = 'WGS84,rad,deg,wrap360,wrap180,blhToXyz,xyzToBlh,enuFromDelta,rotationZ,applyMatrix,pivotTransform,blhJacobian,celestialCoordinates,timeScales';
const output = resolve(ROOT, 'public/geodesy/interactive'), staticOutput = resolve(ROOT, 'knowledge/geodesy/assets/figures');
const localOutput = resolve(ROOT, 'knowledge/geodesy/assets/interactive');
await mkdir(output, {recursive: true}); await mkdir(staticOutput, {recursive: true}); await mkdir(localOutput, {recursive: true});
for (const [mode, spec] of Object.entries(specifications)) {
  const defaults = Object.fromEntries(spec.fields.map(([key, , value]) => [key, value])), initial = figure(mode, defaults, model);
  const html = `<!doctype html><html lang="zh-CN" data-theme="light"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="color-scheme" content="light dark"><title>${esc(spec.title)}</title><style>${pageCss}</style></head><body><main><header><div><h1>${esc(spec.title)}</h1><p class="intro">${esc(spec.subtitle)}</p></div><div class="tools"><button id="theme" type="button" aria-pressed="false" aria-label="切换深色或浅色外观">深色</button><button form="controls" type="reset">重置</button></div></header><figure><div id="picture" class="picture">${initial.svg}</div><figcaption>${esc(spec.caption)}</figcaption></figure><p class="hint">直接编辑数值或使用方向键微调；窄屏图形可横向滚动查看。</p><form id="controls" class="controls" novalidate>${spec.fields.map(([key, label, value, min, max, step]) => `<label for="${key}">${esc(label)}<input id="${key}" name="${key}" type="number" min="${min}" max="${max}" step="any" inputmode="decimal" value="${value}" data-step="${step}" required></label>`).join('')}</form><p id="status" role="status" aria-live="polite"></p><dl id="results" aria-live="polite">${initial.rows.map(([label, value]) => `<div><dt>${esc(label)}</dt><dd>${esc(value)}</dd></div>`).join('')}</dl><p id="formula">${esc(initial.note)}</p></main><script>(()=>{${modelSource}\nconst M={${exposed}};${specificationsTitle.toString()}\nconst figure=${figure.toString()};(${runtime.toString()})(${JSON.stringify(spec)},${JSON.stringify(mode)},M,figure);})();</script></body></html>`;
  await writeFile(resolve(output, `${mode}.html`), html);
  await writeFile(resolve(localOutput, `${mode}.html`), html);
  await writeFile(resolve(staticOutput, `lab-${mode}.svg`), initial.svg);
  console.log(`geodesy: ${mode}.html + lab-${mode}.svg`);
}
