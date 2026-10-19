// Pure teaching models. SI units unless a control explicitly names another unit.
export const rad = d => d * Math.PI / 180;
export const deg = r => r * 180 / Math.PI;
export const wrap = r => Math.atan2(Math.sin(r), Math.cos(r));
export const sinc = x => Math.abs(x) < 1e-12 ? 1 : Math.sin(Math.PI*x)/(Math.PI*x);
export const WGS84 = {a:6378137, f:1/298.257223563};
export function ellipsoid(B=45,h=0,A=0,f=WGS84.f) {
  const a=WGS84.a,e2=f*(2-f),b=a*(1-f),s=Math.sin(rad(B)),c=Math.cos(rad(B));
  const N=a/Math.sqrt(1-e2*s*s),M=a*(1-e2)/(1-e2*s*s)**1.5;
  const p=(N+h)*c,z=(N*(1-e2)+h)*s;
  return {a,b,e2,N,M,p,z,B,u:deg(Math.atan2((b/a)*s,c)),phi:deg(Math.atan2(z,p)),
    RA:M*N/(N*Math.cos(rad(A))**2+M*Math.sin(rad(A))**2),
    latitudeScale:(M+h)*Math.PI/180,longitudeScale:(N+h)*c*Math.PI/180};
}
export function rotation(theta,active=false) { const c=Math.cos(rad(theta)),s=Math.sin(rad(theta)); return {x:c,y:(active?1:-1)*s,z:0,norm:1}; }
export function reduction(D=1000,H1=100,H2=100,R=6371000) {
  const q=Math.sqrt(Math.max(0,D*D-(H2-H1)**2)),d=q/Math.sqrt((1+H1/R)*(1+H2/R));
  return {q,d,S:2*R*Math.asin(d/(2*R)),delta:2*R*Math.asin(d/(2*R))-d};
}
export function sphereRoute(B=45,A=45,S=100000,R=6371000) {
  const b=rad(B),a=rad(A),t=S/R,b2=Math.asin(Math.sin(b)*Math.cos(t)+Math.cos(b)*Math.sin(t)*Math.cos(a));
  const l=Math.atan2(Math.sin(a)*Math.sin(t)*Math.cos(b),Math.cos(t)-Math.sin(b)*Math.sin(b2));
  return {B2:deg(b2),L2:deg(l),sigma:deg(t)};
}
export function midpoint(B=45,S=100000) {
  // Exactly solvable q(B)=cos(B) diagnostic: midpoint along symmetric latitude interval.
  const d=S/6371000,b=rad(B),qM=(Math.cos(b-d/2)+Math.cos(b+d/2))/2,qm=Math.cos(b);
  return {qm,qM,difference:qm-qM,secondOrder:d*d*Math.cos(b)/8};
}
export function planck(lambdaMicron=10,T=300) {const l=lambdaMicron*1e-6;return 2*6.62607015e-34*299792458**2/l**5/Math.expm1(6.62607015e-34*299792458/(l*1.380649e-23*T))*1e-6;}
export function brightnessTemperature(l=10,T=300,epsilon=.9) {const lm=l*1e-6,c2=6.62607015e-34*299792458/1.380649e-23;return c2/(lm*Math.log1p(Math.expm1(c2/(lm*T))/epsilon));}
export function orbit(H=700) {const R=6371000,r=R+H*1000,mu=3.986004418e14,v=Math.sqrt(mu/r);return {v,T:2*Math.PI*r/v/60};}
export function scan(H=700,d=10,f=1000,dt=.01) {const beta=d/f,v=orbit(H).v*6371000/(6371000+H*1000);return {beta,footprint:2*H*1000*Math.tan(beta/2),along:v*dt};}
export function terrain(theta=35,alpha=20,beta=30) { const omega=theta-alpha;return {omega,local:Math.abs(omega),jacobian:Math.sin(rad(omega)),layover:alpha>theta,shadow:beta>90-theta,foreshortening:omega>=0?100*(1-Math.sin(rad(omega))):null};}
export function phase(dr=1,lambda=55.5) {const unwrapped=4*Math.PI*dr/lambda;return {unwrapped,wrapped:wrap(unwrapped),degrees:deg(wrap(unwrapped)),cycles:unwrapped/(2*Math.PI)};}
export function penetration(lambda=.0555,er=5,ei=.5,z=.1,theta=35) {const alpha=2*Math.PI/lambda*Math.sqrt((Math.hypot(er,ei)-er)/2),transmitted=Math.asin(Math.sin(rad(theta))/Math.sqrt(er)),length=z/Math.cos(transmitted);return {alpha,dA:1/alpha,dP:1/(2*alpha),returnPower:Math.exp(-4*alpha*length)};}
export function chirp(B=20,T=10) {return {K:B/T,rangeResolution:299792458/(2*B*1e6),BT:B*T,correlation:q=>Math.abs(q)>T?0:(1-Math.abs(q)/T)*sinc(B/T*q*(T-Math.abs(q)))};}
export function aperture(x=0,R0=1000,v=100,lambda=.0555) {const R=Math.hypot(R0,x);return {R,phase:-4*Math.PI*R/lambda,doppler:-2*v*x/(lambda*R)};}
export function random(seed=1234567) {let n=seed>>>0;return ()=>{n=(1664525*n+1013904223)>>>0;return (n+.5)/4294967296;};}
export function speckle(looks=1,seed=17) {const rng=random(seed),values=Array.from({length:64},()=>{let sum=0;for(let j=0;j<looks;j++){let re=0,im=0;for(let k=0;k<32;k++){const p=2*Math.PI*rng();re+=Math.cos(p);im+=Math.sin(p);}sum+=(re*re+im*im)/32;}return sum/looks;});const mean=values.reduce((a,b)=>a+b)/values.length,variance=values.reduce((a,b)=>a+(b-mean)**2,0)/values.length;return {values,mean,variance,theoreticalVariance:31/(32*looks),fullyDevelopedVariance:1/looks};}
export function coherence(N=16,rho=.8,seed=29) { const rng=random(seed),normal=()=>Math.sqrt(-2*Math.log(rng()))*Math.cos(2*Math.PI*rng());let re=0,im=0,p=0,q=0;const samples=[];for(let i=0;i<N;i++){let ar=normal(),ai=normal(),br=rho*ar+Math.sqrt(1-rho*rho)*normal(),bi=rho*ai+Math.sqrt(1-rho*rho)*normal();re+=ar*br+ai*bi;im+=ai*br-ar*bi;p+=ar*ar+ai*ai;q+=br*br+bi*bi;samples.push([ar,ai,br,bi]);}return {gamma:Math.hypot(re,im)/Math.sqrt(p*q),phase:Math.atan2(im,re),samples};}
