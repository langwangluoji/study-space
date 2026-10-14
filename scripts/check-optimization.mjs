import assert from 'node:assert/strict';
import fs from 'node:fs';
import {convexSample,ridgeSample,kktSample,barrierSample,gradientRun} from '../docs/.vitepress/theme/optimization-math.js';
import {scalarFusion,fusionCosts} from '../docs/.vitepress/theme/fusion-math.js';
let checks=0;
function near(a,b,tol=1e-9){assert.ok(Math.abs(a-b)<=tol,`${a} != ${b}`);checks++}
for(const a of [-2,-.5,0])for(const b of [.1,1,2])for(const t of [0,.1,.5,1]){
 const sample=convexSample(a,b,t);near(sample.chord-sample.value,sample.gap);assert.ok(sample.gap>=0);checks++;
}
for(const l of [0,.1,2,10]){const r=ridgeSample(l);near((2+l)*r.x-4,0);assert.ok(r.total<=.5*((r.x+.01-1)**2+(r.x+.01-3)**2)+.5*l*(r.x+.01)**2);checks++}
for(const c of [-2,0,1,2,3]){
 const k=kktSample(c);near(k.stationarity,0);near(k.complementarity,0);near(k.feasibility,0);near(k.dualFeasibility,0);near(k.p,(2-c)*k.multiplier-.5*k.multiplier**2);
 for(const mu of [.001,.1,2]){const b=barrierSample(c,mu);assert.ok(b.x<c);checks++;near(b.x-2+b.multiplier,0);near(b.multiplier*(c-b.x),mu);near(b.gap,mu+.5*b.stationarity**2);near(b.gap,mu)}
}
const fixed=gradientRun(8,.1,'fixed',60);near(fixed.rows[1].x,2.7);near(fixed.rows[1].y,.4);
assert.equal(gradientRun(8,.3,'fixed',60).status,'diverged');checks++;
const newton=gradientRun(8,1,'newton');assert.equal(newton.status,'converged');near(newton.rows.at(-1).x,0);near(newton.rows.at(-1).y,0);
for(const k of [1,8,40]){const r=gradientRun(k,1,'armijo');for(let i=1;i<r.rows.length;i++){const prev=r.rows[i-1],curr=r.rows[i];const rhs=prev.f-.25*curr.step*prev.norm**2;assert.ok(curr.f<=rhs+1e-10);checks++}}
for(const ps of [.25,1,2,5])for(const ss of [.25,1,2,5])for(const z of [6,10,12,16]){
 const f=scalarFusion(10,ps,z,ss);near((f.mean-10)/ps**2+(f.mean-z)/ss**2,0,1e-8);near(f.gain,ps**2/(ps**2+ss**2));assert.ok(f.variance<ps**2&&f.variance<ss**2);checks++;
 const loss=fusionCosts(f.mean,10,ps,z,ss).total;assert.ok(loss<=fusionCosts(f.mean+.1,10,ps,z,ss).total+1e-10);checks++;
}
near(scalarFusion(10,2,12,1).mean,11.6);near(scalarFusion(10,2,12,1).variance,.8);
// Independent two-step scalar LQR arithmetic.
const P2=1,P1=1+P2/(1+P2),P0=1+P1/(1+P1);near(P1,1.5);near(P0,1.6);
const u0=-P1/(1+P1)*2,x1=2+u0,u1=-P2/(1+P2)*x1,x2=x1+u1;near(u0,-1.2);near(u1,-.4);near(4+x1*x1+u0*u0+u1*u1+x2*x2,6.4);
const course=JSON.parse(fs.readFileSync('study-space.config.json','utf8')).courses.find(c=>c.id==='optimization');
assert.equal(course.chapters.length,30);checks++;
assert.equal(course.start,'/optimization-bv-01.html');checks++;
assert.ok(course.chapters.every(c=>/^optimization-(bv|nw)-\d{2}$/.test(c.slug)));checks++;
const pages=['course-optimization','optimization-prerequisites','optimization-reading','optimization-sources',...course.chapters.map(c=>c.slug),'optimization-bv-a','optimization-bv-b','optimization-bv-c','optimization-nw-a','optimization-nw-b'];
const content=[];
for(const slug of pages){const md=fs.readFileSync(`docs/${slug}.md`,'utf8');assert.equal((md.match(/^\$\$/gm)||[]).length%2,0);const html=fs.readFileSync(`docs/.vitepress/dist/${slug}.html`,'utf8');assert.ok(!/data-mjx-error|<merror|class="mjx-merror"/.test(html));if(/^optimization-(bv|nw)-/.test(slug)){const minimum=/\d{2}$/.test(slug)?4000:2000;assert.ok(Buffer.byteLength(md)>=minimum,slug+' lacks substantive explanation');assert.ok(!md.includes('<OptimizationDiagnostic'));checks+=2}content.push({slug,bytes:Buffer.byteLength(md),math:(html.match(/<mjx-container/g)||[]).length});checks++}
assert.ok(!/第\s*\d+\s*周|12\s*周/.test(fs.readFileSync('docs/course-optimization.md','utf8')));checks++;
const result={status:'PASS',checks,pages:content,numerics:'analytic stationary conditions, Armijo inequality, exact scalar LQR and linear Gaussian posterior; synthetic data only'};
fs.writeFileSync('reports/optimization-verification.json',JSON.stringify(result,null,2)+'\n');console.log(JSON.stringify(result,null,2));
