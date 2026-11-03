// Pure geodesy teaching models. Angles are degrees; lengths are metres.
export const WGS84 = Object.freeze({a: 6378137, f: 1 / 298.257223563});
export const rad = degrees => degrees * Math.PI / 180;
export const deg = radians => radians * 180 / Math.PI;
export const wrap360 = degrees => ((degrees % 360) + 360) % 360;
export const wrap180 = degrees => wrap360(degrees + 180) - 180;

function finite(values) {
  if (!values.every(Number.isFinite)) throw new RangeError('输入必须是有限数值。');
}
function ellipsoid(a, f) {
  finite([a, f]);
  if (a <= 0 || f < 0 || f >= 1) throw new RangeError('椭球要求 a > 0，0 ≤ f < 1。');
  return {e2: f * (2 - f), b: a * (1 - f)};
}
function latitude(B, L) {
  finite([B, L]);
  if (Math.abs(B) > 90) throw new RangeError('纬度 B 必须位于 −90°～90°。');
}

export function blhToXyz({B, L, h, a = WGS84.a, f = WGS84.f}) {
  latitude(B, L); finite([h]);
  const {e2} = ellipsoid(a, f), b = rad(B), l = rad(L);
  const sb = Math.sin(b), cb = Math.cos(b), N = a / Math.sqrt(1 - e2 * sb * sb);
  return {X: (N + h) * cb * Math.cos(l), Y: (N + h) * cb * Math.sin(l), Z: (N * (1 - e2) + h) * sb};
}

// The geocentre has no unique latitude or longitude. On the polar axis L=0
// is an explicit reporting convention. The inverse teaching domain is
// hypot(X/a,Y/a,Z/b) >= 0.99, including the near surface and exterior.
// Deep points are rejected before iteration because normal coordinates may
// be nonunique there, even when one numerical branch happens to converge.
export function xyzToBlh({X, Y, Z, a = WGS84.a, f = WGS84.f}) {
  finite([X, Y, Z]);
  const {e2, b} = ellipsoid(a, f), p = Math.hypot(X, Y);
  if (Math.hypot(p, Z) < 1e-9) throw new RangeError('地心的 B、L 无唯一解（geocentre）。');
  if (Math.hypot(p / a, Z / b) < .99) throw new RangeError('反解教学域要求归一化半径 √[(X²+Y²)/a²+Z²/b²] ≥ 0.99；椭球深部可能有多个法线解，请选近地表或外部点。');
  if (p < 1e-9) return {B: Z < 0 ? -90 : 90, L: 0, h: Math.abs(Z) - b, iterations: 0, longitudeDefined: false};
  let B = Math.atan2(Z, p * (1 - e2)), iterations = 0;
  for (; iterations < 100; iterations++) {
    const N = a / Math.sqrt(1 - e2 * Math.sin(B) ** 2);
    const next = Math.atan2(Z + e2 * N * Math.sin(B), p);
    if (Math.abs(next - B) < 2e-15) {B = next; iterations++; break;}
    B = next;
  }
  if (iterations >= 100) throw new RangeError('此点的反解未收敛；请选择近地表坐标。');
  const N = a / Math.sqrt(1 - e2 * Math.sin(B) ** 2);
  // Projection onto the ellipsoid normal avoids division by cos(B) at poles.
  const h = p * Math.cos(B) + Z * Math.sin(B) - N * (1 - e2 * Math.sin(B) ** 2);
  return {B: deg(B), L: deg(Math.atan2(Y, X)), h, iterations, longitudeDefined: true};
}

function polar(E, N, U) {
  const horizontal = Math.hypot(E, N), range = Math.hypot(horizontal, U);
  const azimuth = horizontal <= 1e-12 * Math.max(1, range) ? null : wrap360(deg(Math.atan2(E, N)));
  const elevation = range === 0 ? null : deg(Math.atan2(U, horizontal));
  return {E, N, U, range, azimuth, elevation, zenith: elevation === null ? null : 90 - elevation};
}
export function enuFromDelta({B, L, dx, dy, dz}) {
  latitude(B, L); finite([dx, dy, dz]);
  const b = rad(B), l = rad(L), sb = Math.sin(b), cb = Math.cos(b), sl = Math.sin(l), cl = Math.cos(l);
  return polar(-sl * dx + cl * dy, -sb * cl * dx - sb * sl * dy + cb * dz, cb * cl * dx + cb * sl * dy + sb * dz);
}
export function rotationZ(angle) {
  finite([angle]);
  const c = Math.cos(rad(angle)), s = Math.sin(rad(angle));
  return [[c, -s, 0], [s, c, 0], [0, 0, 1]];
}
export function applyMatrix(matrix, vector) {
  return matrix.map(row => row.reduce((sum, value, i) => sum + value * vector[i], 0));
}
// Active right-handed rotation: q = p0 + t + s Rz(angle)(p - p0).
// Therefore standard translation T = p0 + t - s Rz(angle)p0.
export function pivotTransform({point, pivot = [0, 0, 0], translation = [0, 0, 0], angle = 0, scale = 1}) {
  finite([...point, ...pivot, ...translation, angle, scale]);
  const matrix = rotationZ(angle), shifted = point.map((v, i) => v - pivot[i]);
  const rotated = applyMatrix(matrix, shifted), rotatedPivot = applyMatrix(matrix, pivot);
  return {point: rotated.map((v, i) => pivot[i] + translation[i] + scale * v), standardTranslation: pivot.map((v, i) => v + translation[i] - scale * rotatedPivot[i]), matrix};
}

// Columns are derivatives per degree B, per degree L, and per metre h.
export function blhJacobian({B, L, h, a = WGS84.a, f = WGS84.f}) {
  latitude(B, L); finite([h]);
  const {e2} = ellipsoid(a, f), b = rad(B), l = rad(L), sb = Math.sin(b), cb = Math.cos(b), sl = Math.sin(l), cl = Math.cos(l);
  const w2 = 1 - e2 * sb * sb, N = a / Math.sqrt(w2), M = a * (1 - e2) / w2 ** 1.5, k = Math.PI / 180;
  return [[-(M + h) * sb * cl * k, -(N + h) * cb * sl * k, cb * cl], [-(M + h) * sb * sl * k, (N + h) * cb * cl * k, cb * sl], [(M + h) * cb * k, 0, sb]];
}

// Geometric equatorial-to-horizon teaching model: no refraction/precession.
// siderealAngle is Greenwich apparent/mean angle, consistently paired with RA.
export function celestialCoordinates({rightAscension, declination, siderealAngle, longitude, latitude: B}) {
  latitude(B, longitude); latitude(declination, rightAscension); finite([siderealAngle]);
  const hourAngle = wrap180(siderealAngle + longitude - rightAscension), H = rad(hourAngle), d = rad(declination), b = rad(B);
  const E = -Math.cos(d) * Math.sin(H), N = Math.cos(b) * Math.sin(d) - Math.sin(b) * Math.cos(d) * Math.cos(H), U = Math.sin(b) * Math.sin(d) + Math.cos(b) * Math.cos(d) * Math.cos(H);
  return {hourAngle, localSiderealAngle: wrap360(siderealAngle + longitude), ...polar(E, N, U)};
}

// Seconds referenced to a common labelled epoch, within a UTC segment whose
// deltaAT is supplied. This arithmetic does not parse leap-second civil dates.
export function timeScales({utcSeconds = 0, deltaAT, dut1 = 0}) {
  if (!Number.isFinite(deltaAT)) throw new RangeError('请提供 deltaAT = TAI − UTC（秒）。');
  finite([utcSeconds, dut1]);
  return {UTC: utcSeconds, TAI: utcSeconds + deltaAT, TT: utcSeconds + deltaAT + 32.184, UT1: utcSeconds + dut1, deltaAT, dut1};
}
