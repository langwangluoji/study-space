import test from 'node:test';
import assert from 'node:assert/strict';
import * as m from './model.mjs';

const near = (actual, expected, tolerance = 1e-8) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected} (±${tolerance})`);
const vectorNear = (actual, expected, tolerance) => actual.forEach((v, i) => near(v, expected[i], tolerance));

test('WGS84 forward coordinates match equator, pole and independently tabulated 45° reference', () => {
  assert.equal(typeof m.blhToXyz, 'function');
  const equator = m.blhToXyz({B: 0, L: 90, h: 100});
  vectorNear([equator.X, equator.Y, equator.Z], [0, 6378237, 0], 1e-8);
  const pole = m.blhToXyz({B: 90, L: -120, h: 0});
  near(pole.Z, 6356752.314245179, 1e-8);
  const ref = m.blhToXyz({B: 45, L: 45, h: 0});
  vectorNear([ref.X, ref.Y, ref.Z], [3194419.145060575, 3194419.145060575, 4487348.408865919], 1e-7);
});

test('sphere f=0, negative heights and both antimeridians retain their geometry', () => {
  const p = m.blhToXyz({B: 30, L: 0, h: -10, a: 100, f: 0});
  vectorNear([p.X, p.Y, p.Z], [77.94228634059948, 0, 45], 1e-10);
  for (const L of [-180, 180]) near(m.blhToXyz({B: 0, L, h: -50}).X, -6378087);
});

test('inverse solves independent WGS84 references, pole convention and geocentre rejection', () => {
  const q = m.xyzToBlh({X: 3194419.145060575, Y: 3194419.145060575, Z: 4487348.408865919});
  near(q.B, 45, 1e-10); near(q.L, 45); near(q.h, 0, 1e-7);
  const pole = m.xyzToBlh({X: 0, Y: 0, Z: -6356752.314245179});
  near(pole.B, -90); near(pole.L, 0); near(pole.h, 0);
  assert.equal(pole.longitudeDefined, false);
  assert.throws(() => m.xyzToBlh({X: 0, Y: 0, Z: 0}), /地心|centre|center/);
  for (const f of [0, 1 / 298.257223563]) for (const B of [-90, -70, 0, 45, 89.999999, 90]) for (const L of [-180, -71, 0, 123, 180]) {
    const point = m.blhToXyz({B, L, h: -700, f});
    const inverse = m.xyzToBlh({...point, f});
    near(inverse.B, B, 1e-8); near(inverse.h, -700, 1e-5);
    if (Math.abs(B) < 90) near(Math.cos((inverse.L - L) * Math.PI / 180), 1, 1e-12);
  }
});

test('inverse rejects deep-interior normal ambiguities and declares its normalized-radius teaching domain', () => {
  for (const point of [{X: 1, Y: 0, Z: 0}, {X: 0, Y: 0, Z: 1}, {X: 1000, Y: 2000, Z: -3000}, {X: 6378137 * .989, Y: 0, Z: 0}]) {
    assert.throws(() => m.xyzToBlh(point), /近地表|深部|0\.99/);
  }
  const boundary = m.xyzToBlh({X: 6378137 * .99, Y: 0, Z: 0});
  near(boundary.B, 0); near(boundary.h, -63781.37, 1e-8);
  const sphereBoundary = m.xyzToBlh({X: 99, Y: 0, Z: 0, a: 100, f: 0});
  near(sphereBoundary.h, -1);
  assert.throws(() => m.xyzToBlh({X: 98.9, Y: 0, Z: 0, a: 100, f: 0}), /0\.99/);
  const high = m.xyzToBlh({X: 6378137 + 20000000, Y: 0, Z: 0});
  near(high.B, 0); near(high.h, 20000000);
});

test('ENU maps ECEF axes correctly and covers four north-clockwise azimuth quadrants', () => {
  vectorNear(Object.values(m.enuFromDelta({B: 0, L: 0, dx: 1, dy: 2, dz: 3})).slice(0, 3), [2, 3, 1]);
  for (const [E, N, azimuth] of [[1, 1, 45], [1, -1, 135], [-1, -1, 225], [-1, 1, 315]]) {
    const p = m.enuFromDelta({B: 0, L: 0, dx: 0, dy: E, dz: N});
    near(p.azimuth, azimuth); near(p.zenith, 90); near(p.range, Math.SQRT2);
  }
  const vertical = m.enuFromDelta({B: 0, L: 0, dx: 10, dy: 0, dz: 0});
  assert.equal(vertical.azimuth, null); near(vertical.elevation, 90); near(vertical.zenith, 0);
  const zero = m.enuFromDelta({B: 52, L: 120, dx: 0, dy: 0, dz: 0});
  assert.equal(zero.azimuth, null); assert.equal(zero.elevation, null); assert.equal(zero.zenith, null);
  const any = m.enuFromDelta({B: 31.2, L: 121.5, dx: 765, dy: -321, dz: 74});
  near(Math.hypot(any.E, any.N, any.U), Math.hypot(765, -321, 74), 1e-10);
});

test('active right-handed Z rotation preserves norm and transpose is its inverse', () => {
  const R = m.rotationZ(90);
  vectorNear(m.applyMatrix(R, [1, 0, 0]), [0, 1, 0], 1e-12);
  const v = [12, -4, 7], rotated = m.applyMatrix(m.rotationZ(47), v);
  near(Math.hypot(...rotated), Math.hypot(...v));
  vectorNear(m.applyMatrix(m.rotationZ(-47), rotated), v, 1e-12);
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) near(R[i].reduce((s, v, k) => s + v * R[j][k], 0), i === j ? 1 : 0, 1e-12);
});

test('pivot stays fixed without translation and standard translation yields same affine transform', () => {
  const pivot = [100, 200, 30];
  vectorNear(m.pivotTransform({point: pivot, pivot, angle: 60, scale: 1.2}).point, pivot, 1e-10);
  const p = m.pivotTransform({point: [103, 204, 32], pivot, angle: 90, scale: 2, translation: [5, 8, -1]});
  vectorNear(p.point, [97, 214, 33], 1e-10);
  const rotated = m.applyMatrix(m.rotationZ(90), [103, 204, 32]);
  vectorNear(rotated.map((v, i) => 2 * v + p.standardTranslation[i]), p.point, 1e-10);
});

test('BLH analytic Jacobian agrees with finite differences, degree columns and radial height unit vector', () => {
  const args = {B: 31.2, L: 121.5, h: 54};
  const J = m.blhJacobian(args);
  for (const [j, key, step] of [[0, 'B', 1e-4], [1, 'L', 1e-4], [2, 'h', .1]]) {
    const plus = m.blhToXyz({...args, [key]: args[key] + step});
    const minus = m.blhToXyz({...args, [key]: args[key] - step});
    ['X', 'Y', 'Z'].forEach((k, i) => near(J[i][j], (plus[k] - minus[k]) / (2 * step), 1e-4));
  }
  near(Math.hypot(...J.map(row => row[2])), 1, 1e-12);
});

test('celestial hour angle wraps and maps meridian zenith and west horizon consistently', () => {
  const top = m.celestialCoordinates({rightAscension: 30, declination: 45, siderealAngle: 20, longitude: 10, latitude: 45});
  near(top.hourAngle, 0); near(top.elevation, 90, 1e-6);
  const west = m.celestialCoordinates({rightAscension: 0, declination: 0, siderealAngle: 90, longitude: 0, latitude: 0});
  near(west.hourAngle, 90); near(west.E, -1); near(west.U, 0); near(west.azimuth, 270);
  const wrap = m.celestialCoordinates({rightAscension: 350, declination: 0, siderealAngle: 10, longitude: 0, latitude: 0});
  near(wrap.hourAngle, 20);
});

test('time offsets use supplied leap offset, TT-TAI is 32.184 seconds and UT1 uses DUT1', () => {
  assert.throws(() => m.timeScales({utcSeconds: 0}), /deltaAT/);
  const t = m.timeScales({utcSeconds: 100, deltaAT: 37, dut1: -.2});
  near(t.TAI, 137); near(t.TT, 169.184); near(t.UT1, 99.8);
  near(m.timeScales({utcSeconds: 100, deltaAT: 10, dut1: 0}).TT, 142.184);
});

test('invalid and non-finite inputs are rejected rather than emitting misleading geometry', () => {
  assert.throws(() => m.blhToXyz({B: 91, L: 0, h: 0}));
  assert.throws(() => m.blhToXyz({B: 0, L: NaN, h: 0}));
  assert.throws(() => m.blhToXyz({B: 0, L: 0, h: 0, a: -1}));
  assert.throws(() => m.blhToXyz({B: 0, L: 0, h: 0, f: 1}));
  assert.throws(() => m.rotationZ(Infinity));
});
