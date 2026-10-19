import assert from 'node:assert/strict';
import fs from 'node:fs';
import {model,drawing} from './anatomy/build-ml.mjs';
let count=0;
const near=(a,b,e=1e-8)=>{assert(Math.abs(a-b)<e,`${a} != ${b}`);count++};
near(model('calibration',0,1).L,.75);
near(model('calibration',.9,1.2).L,.225);
near(model('calibration',.1,1.075).L,.60671875);
for(const a of [-.5,0,.9,1.5])for(const b of [-.5,0,1.2,1.5]){
 const m=model('calibration',a,b),h=1e-5;
 near(m.g[0],(model('calibration',a+h,b).L-model('calibration',a-h,b).L)/(2*h));
 near(m.g[1],(model('calibration',a,b+h).L-model('calibration',a,b-h).L)/(2*h));
}
for(let i=0;i<31;i++){
 const theta=i*Math.PI/30,m=model('fisher',theta);
 near(m.w[0]**2+m.w[1]**2,1);
 const z=m.groups.map(g=>g.map(([x,y])=>x*Math.cos(theta)+y*Math.sin(theta)));
 near(m.J,(m.means[0]-m.means[1])**2/z.reduce((s,g,j)=>s+g.reduce((s,z)=>s+(z-m.means[j])**2,0),0));
}
assert.equal(model('relu',0).derivative,null);count++;
for(const a of [-2,-.1,.1,2]){near(model('relu',a).z,Math.max(0,a));near(model('relu',a).derivative,a>0?1:0);}
for(const [b,d]of [[1,144],[2,324],[3,324],[4,144]]){
 const m=model('hog',b,99);assert.equal(m.D,d);assert.equal(m.index,m.blocks-1);count+=2;
}
let painterStates=0;
for(const mode of ['calibration','fisher','relu','hog'])for(let i=0;i<30;i++){
 const u=mode==='calibration'?-.5+2*i/29:mode==='fisher'?3.14*i/29:mode==='relu'?-2+4*i/29:1+i%4;
 drawing(mode,u,mode==='calibration'?-.5+2*(29-i)/29:mode==='hog'?i%16:1);painterStates++;
}
fs.mkdirSync('reports/anatomy-ml',{recursive:true});
fs.writeFileSync('reports/anatomy-ml/model-checks.json',JSON.stringify({passed:true,count,painterStates,checks:['calibration residuals, independent central differences and one update','Fisher normalized projection and within scatter','ReLU zero kink','HOG dimensions and legal positions']},null,2));
console.log(`ML Anatomy model: ${count} checks PASS`);
