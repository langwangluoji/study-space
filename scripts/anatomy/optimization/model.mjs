// Mathematical state is independent of presentation and time-based easing.
export const energy = ([x,y], k=4) => .5*((x-2)**2+k*(y-1)**2);
export const gradient = ([x,y],k=4) => [x-2,k*(y-1)];
export function constrained(c=2,k=4){
 const lambda=Math.max(0,(3-c)/(1+1/k));
 const point=[2-lambda,1-lambda/k], slack=c-point[0]-point[1];
 return {point,lambda,slack,normalGap:slack/Math.SQRT2,reaction:[-lambda,-lambda],normalForce:lambda*Math.SQRT2,value:energy(point,k),dual:lambda*(3-c)-.5*lambda*lambda*(1+1/k)};
}
export function line(alpha,c1=.1,c2=.9){
 const point=[2*alpha,4*alpha],value=energy(point),slope=-20+68*alpha;
 return {point,value,slope,armijo:value<=4-20*c1*alpha+1e-12,wolfe:slope>=-20*c2,strong:Math.abs(slope)<=20*c2,exact:5/17};
}
export function projected(point,c=2){const excess=Math.max(0,point[0]+point[1]-c);return [point[0]-excess/2,point[1]-excess/2];}
export function barrier(mu=.1,c=1){
 const slack=.5*(c-2+Math.sqrt((c-2)**2+4*mu)),x=c-slack,lambda=mu/slack;
 return {x,slack,lambda,residual:x-2+lambda,gap:mu};
}
export function penalty(rho=10,nu=0){const x=-(1+nu)/rho;return {x,nuNext:nu+rho*x,violation:Math.abs(x)};}
export function fusion(P=4,R=1){const variance=1/(1/P+1/R);return {mean:variance*(10/P+12/R),variance};}
export function leastSquares(lambda=0){
 // A=[[1,0],[0,1],[-1,1]], b=[1,2.1,1.2], optional λI penalty.
 const a=2+lambda,det=a*a-1,b=[-.2,3.3],point=[(a*b[0]+b[1])/det,(b[0]+a*b[1])/det];
 const residual=[point[0]-1,point[1]-2.1,-point[0]+point[1]-1.2];
 return {point,residual,value:.5*residual.reduce((s,r)=>s+r*r,0)+.5*lambda*point.reduce((s,v)=>s+v*v,0)};
}
export function trust(delta=.7,nonlinear=false){
 const base=[0,0],g=nonlinear?[-3.6,-4]:[-2,-4],B=nonlinear?[3.4,4]:[1,4];
 const f=([x,y])=>energy([x,y])+(nonlinear?.05*(x-2)**4:0);
 const ng=Math.hypot(...g),curvature=g[0]*g[0]*B[0]+g[1]*g[1]*B[1];
 const t=Math.min(delta/ng,ng*ng/curvature),step=g.map(v=>-t*v);
 const predicted=-(g[0]*step[0]+g[1]*step[1]+.5*(B[0]*step[0]**2+B[1]*step[1]**2));
 const actual=f(base)-f(step);
 return {point:step,actual,predicted,rho:actual/predicted,delta,nonlinear};
}
export function cgSteps(){
 let x=[0,0],r=[-2,-4],p=r.map(v=>-v);const rows=[{point:[...x],residual:[...r]}];
 for(let n=0;n<2;n++){const Ap=[p[0],4*p[1]],rr=r[0]**2+r[1]**2,alpha=rr/(p[0]*Ap[0]+p[1]*Ap[1]);x=x.map((v,i)=>v+alpha*p[i]);const next=r.map((v,i)=>v+alpha*Ap[i]),beta=(next[0]**2+next[1]**2)/rr;p=next.map((v,i)=>-v+beta*p[i]);r=next;rows.push({point:[...x],residual:[...r],alpha});}return rows;
}
export function finiteDifference(h=.01,noise=.0001){const f=x=>x*x;return {value:(f(1+h)-f(1-h)+2*noise)/(2*h),exact:2,h,noise};}
