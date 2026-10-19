import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {PhotoMath} from '../../../docs/.vitepress/theme/photogrammetry-labs.js';
import {DEFAULT,RESECTION,evaluate,project,CONTROLS} from './model.mjs';
import {rigParts} from './geometry.mjs';
let checks=0;const near=(a,b,t=1e-8)=>{assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);checks++};
const s={...DEFAULT},a=evaluate(s);near(a.left.x,30);near(a.left.y,15);near(a.right.x,-15);near(a.p,45);near(a.sigma,1/9);near(a.footprint,1533.3333333333333);near(a.overlap,80.43478260869566);near(a.px.col,14499.5);near(a.px.row,9999.5);
const narrow=evaluate({...s,width:36});assert.equal(narrow.visible,false);near(narrow.common,0);near(narrow.footprint,240);checks++;
for(const B of [200,300,400,600])for(const h of [0,100,400]){
 const st={...s,B,h},v=evaluate(st);near(v.p,s.f*B/(s.H-h));near(PhotoMath.stereo(s.f,B,s.H,v.p,.005).Z,h);near(v.left.x,PhotoMath.collinearity(s.f,s.X,s.Y,s.H,h).x);
}
for(const angle of [-12,-6,0,6,12]){
 const st={...s,angle},v=evaluate(st,'pose'),g=rigParts(st,'pose').centres[0];near((g[0]+70)/.14,v.C[0]);near((g[1]+19)/.14,v.C[1]);near((g[2]-10)/.14,v.C[2]);
}
for(const scale of [1,5,8]){const g=rigParts({...s,scale},'orientation').parts.find(p=>p.name==='gauge-rule');near(g.plan.w/.14,20*scale);}
near(RESECTION.at(-1).rms,0,1e-9);RESECTION.at(-1).theta.forEach((v,i)=>near(v,[0,0,1000,0,0,0][i],1e-7));
const wrong=evaluate({...s,wrong:10},'epipolar');near(wrong.wrongHeight,181.81818181818187);near(wrong.wrongRight.y-wrong.right.y,0);
const noisy=evaluate({...s,noise:.03},'adjustment');assert.ok(noisy.cross.gap>.19&&noisy.cross.gap<.21);checks++;
const dom=evaluate({...s,X:100,Y:50,h:20},'ortho');near(dom.bilinear,22.5);near((dom.left.x-15)/.01,30.6122448979593);
assert.ok(RESECTION.every((row,i)=>!i||row.rms<=RESECTION[i-1].rms));checks++;
const count=rigParts(s).parts.length;assert.ok(count>=40&&count<=80);checks++;
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..');fs.writeFileSync(path.join(root,'reports/anatomy-photogrammetry/model-verification.json'),JSON.stringify({status:'PASS',checks,parts:count,source:'Original PhotoMath comparison, camera/geometry origin equality, visible-field clipping, stereo precision and known numeric examples'},null,2));console.log(`${checks} model checks passed; ${count} functional solids`);
