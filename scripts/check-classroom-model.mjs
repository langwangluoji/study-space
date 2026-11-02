import assert from 'node:assert/strict';
import { positioning, gradientStep, photographScale, latitude, detectorFootprint, interference, polarization, lessons, curveFor } from '../docs/.vitepress/theme/classroom-model.js';
const near = (actual, expected, tolerance = 1e-10) => assert.ok(Math.abs(actual - expected) <= tolerance, `${actual} != ${expected}`);

near(positioning(1).q, 1.6);
const p = positioning(2);
near(p.x, 1.2); near(p.y, .8); near(p.lambda, .8); near(p.q, .4);
for (const c of [3, 3.5]) { const p = positioning(c); near(p.q, 0); near(p.lambda, 0); near(p.x, 2); near(p.y, 1); }
near(positioning(3).x + positioning(3).y, 3); // active with zero multiplier
for (const c of [1, 2, 2.9, 3, 3.5]) {
  const p = positioning(c);
  assert.ok(p.x + p.y <= c + 1e-12);
  near(p.x - 2 + p.lambda, 0); near(4 * (p.y - 1) + p.lambda, 0);
  near(p.lambda * (p.x + p.y - c), 0);
}
near(gradientStep(0).loss, .75);
const gd = gradientStep(.1);
near(gd.w0, .1); near(gd.w1, 1.075); near(gd.loss, .60671875);
near(gradientStep(1.5).loss, 1.32421875); // large step raises loss
assert.ok(gradientStep(2).loss > gradientStep(0).loss);
near(photographScale(1000).scale, .000152);
near(photographScale(2000).scale, photographScale(1000).scale / 2);
near(photographScale(500).denominator, 500 / .152);
near(latitude(0).phi, 0); near(latitude(90).phi, 90); near(latitude(-90).phi, -90);
near(latitude(45).phi, 44.80757678401803, 1e-11);
near(latitude(-45).phi, -latitude(45).phi);
near(latitude(45, 0).phi, 45); // spherical limit
near(detectorFootprint(0).footprint, 0);
near(detectorFootprint(1).footprint, 1.0000000833333416);
near(detectorFootprint(2).footprint, 2.000000666666933);
near(detectorFootprint(2).approximate, 2);
for (const [delta, intensity] of [[0, 4], [90, 2], [180, 0], [360, 4]]) {
  const r = interference(delta); near(r.intensity, intensity); near(r.amplitude ** 2, intensity);
}
for (const [delta, kind] of [[0, '线偏振'], [45, '椭圆偏振'], [90, '圆偏振'], [180, '线偏振']]) {
  const r = polarization(delta); assert.equal(r.kind, kind);
  near(r.points[0][0], 1); near(r.points[0][1], Math.cos(delta * Math.PI / 180));
  const [x0, y0] = r.points[0], [x1, y1] = r.points.at(-1);
  near(x0, x1); near(y0, y1);
}
for (const [x, y] of polarization(90).points) near(x * x + y * y, 1);
for (const lesson of lessons) {
  assert.equal(lesson.choices.length, 3);
  if (lesson.y) assert.ok(curveFor(lesson).every(([x, y]) => Number.isFinite(x) && Number.isFinite(y)));
}
console.log('Classroom models passed: seven lessons, numeric reference points, KKT boundary, zero-step/large-step GD, hemispheres/poles/sphere, unit conversion, phase endpoints.');
