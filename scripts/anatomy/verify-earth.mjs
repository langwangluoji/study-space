import assert from 'node:assert/strict';
import {mkdirSync,writeFileSync} from 'node:fs';
import * as m from './earth-observation/model.mjs';
import {catalog,defaults,evaluate} from './earth-observation/catalog.mjs';
const checks=[];
function near(name,actual,expected,tol){assert.ok(Math.abs(actual-expected)<=tol,`${name}: ${actual} versus ${expected}`);checks.push({name,actual,expected,tolerance:tol,pass:true});}
let e=m.ellipsoid();near('reduced latitude WGS84 45',e.u,44.9037878494,1e-10);near('surface geocentric latitude',e.phi,44.8075767840,1e-10);
near('height-space latitude uses XYZ',m.ellipsoid(45,100000).phi,m.deg(Math.atan2(m.ellipsoid(45,100000).z,m.ellipsoid(45,100000).p)),1e-12);
near('north normal radius',m.ellipsoid(45,0,0).RA,e.M,1e-8);near('east normal radius',m.ellipsoid(45,0,90).RA,e.N,1e-8);
near('height meridian scale',m.ellipsoid(45,100).latitudeScale-e.latitudeScale,100*Math.PI/180,1e-10);
near('passive 90 y',m.rotation(90).y,-1,1e-15);near('active 90 y',m.rotation(90,true).y,1,1e-15);
near('reference-plane chord',m.reduction().d,999.9843041236026,1e-7);near('chord arc micrometres',m.reduction().delta*1e6,1.02648,.003);
near('sphere east equator',m.sphereRoute(0,90,Math.PI*6371000/2).L2,90,1e-12);
near('midpoint exact versus O(S2)',m.midpoint(45,1000).difference,m.midpoint(45,1000).secondOrder,1e-15);
near('Planck 10um 300K',m.planck(),9.9240333300707,1e-9);near('emission brightness temperature',m.brightnessTemperature(),293.6005657,1e-7);
near('circular orbit 700km',m.orbit().T,98.6236306,1e-7);near('IFOV radians',m.scan().beta,.01,1e-15);
near('phase 1mm',m.phase().unwrapped,0.2264210921506157,1e-14);near('phase wrap half wavelength',m.phase(27.75).wrapped,0,1e-14);
let p=m.penetration();near('power depth half amplitude depth',p.dP,p.dA/2,1e-15);near('surface return',m.penetration(.0555,5,.5,0).returnPower,1,1e-15);
near('chirp BT',m.chirp().BT,200,1e-15);near('matched filter zero lag',m.chirp().correlation(0),1,1e-15);near('finite correlation support',m.chirp().correlation(11),0,1e-15);near('20 MHz range resolution',m.chirp().rangeResolution,7.49481145,1e-10);
near('Doppler at closest approach',m.aperture().doppler,0,1e-15);near('symmetric aperture range',m.aperture(-40).R,m.aperture(40).R,1e-15);
near('terrain jacobian',m.terrain().jacobian,Math.sin(m.rad(15)),1e-15);near('layover signed omega',m.terrain(35,45).omega,-10,1e-15);near('physical incidence nonnegative',m.terrain(35,45).local,10,1e-15);
assert.equal(m.terrain(35,45).layover,true);assert.equal(m.terrain(35,20,60).shadow,true);
near('finite 32-scatterer variance 16 looks',m.speckle(16).theoreticalVariance,31/512,1e-15);near('fully-developed speckle limit',m.speckle(16).fullyDevelopedVariance,1/16,1e-15);assert.deepEqual(m.speckle(),m.speckle());
near('N=1 coherence bias',m.coherence(1,.2).gamma,1,1e-14);near('identical coherence',m.coherence(64,1).gamma,1,1e-14);
for(const mode of Object.keys(catalog)){const p=defaults(mode);for(const c of catalog[mode].controls)for(const x of [c.min,c.max]){const r=evaluate(mode,{...p,[c.key]:x});assert.ok(!/NaN|Infinity/.test(r.text),mode+' finite readout');assert.ok(r.series.every(v=>v.every(Number.isFinite)),mode+' finite plot');}checks.push({name:mode+' all control extremes finite',pass:true});}
mkdirSync('reports/anatomy-earth',{recursive:true});writeFileSync('reports/anatomy-earth/numerical-checks.json',JSON.stringify(checks,null,2));console.log(`${checks.length} numerical/model checks passed`);
