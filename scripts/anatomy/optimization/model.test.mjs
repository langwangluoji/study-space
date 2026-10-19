import assert from 'node:assert/strict';
import * as M from './model.mjs';
let checks=0;const near=(a,b,t=1e-10)=>{assert.ok(Math.abs(a-b)<t,`${a} vs ${b}`);checks++};
for(const c of [1,2,2.8,3,4]){const r=M.constrained(c);near(r.point[0]-2+r.lambda,0);near(4*(r.point[1]-1)+r.lambda,0);near(r.slack*r.lambda,0);near(r.value,r.dual);near(r.normalForce,Math.hypot(...r.reaction));assert.ok(r.slack>=-1e-12&&r.lambda>=0);}
near(M.constrained().normalForce,.8*Math.SQRT2);near(M.constrained().value,.4);
for(const a of [.1,.3,.5,1])near(M.line(a).value,4-20*a+34*a*a);
near(M.line(5/17).slope,0);assert.equal(M.line(1).armijo,false);assert.equal(M.line(.5).armijo,true);
near(M.leastSquares().point[0],29/30);near(M.leastSquares().point[1],32/15);near(M.leastSquares().value,1/600);
near(M.fusion().mean,11.6);near(M.fusion().variance,.8);near(M.penalty().x,-.1);near(M.penalty().nuNext,-1);
for(const mu of [.01,.1,1]){const r=M.barrier(mu);near(r.residual,0);near(r.lambda*r.slack,mu);}
for(const d of [.2,.7,1.3])near(M.trust(d).rho,1);
for(const p of [[2,1],[-1,0],[1.5,1.2]]){const v=M.projected(p);assert.ok(v[0]+v[1]<=2+1e-12);checks++;}
near(M.cgSteps()[2].point[0],2);near(M.cgSteps()[2].point[1],1);
// Central difference independently checks the presented energy gradient.
for(const p of [[.2,.3],[1.2,.8],[2,1]])for(let i=0;i<2;i++){const a=[...p],b=[...p];a[i]+=1e-5;b[i]-=1e-5;near((M.energy(a)-M.energy(b))/2e-5,M.gradient(p)[i],1e-8);}
console.log(JSON.stringify({status:'PASS',checks,scope:'independent stationary conditions, exact line polynomial, force normalization, finite differences, examples; no claim of general theorem proof'}));
