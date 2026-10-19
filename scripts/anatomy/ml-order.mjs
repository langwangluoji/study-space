// Orthographic painter order for the actual convex slabs used by the ML rigs.
// Each visible face carries an affine view-depth function. Intersect projected
// faces analytically, then topologically sort the resulting front/back graph.
// This same function runs during geometry audit and in the browser.
export function paintOrder(items,P,K){
 const area=p=>p.reduce((s,a,i)=>{const b=p[(i+1)%p.length];return s+a[0]*b[1]-b[0]*a[1]},0)/2;
 function clip(poly,bound){
  let out=poly,sgn=Math.sign(area(bound));
  for(let j=0;j<bound.length&&out.length;j++){
   const a=bound[j],b=bound[(j+1)%bound.length],side=p=>sgn*((b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0]));
   const input=out;out=[];
   for(let i=0;i<input.length;i++){
    const p=input[i],q=input[(i+1)%input.length],dp=side(p),dq=side(q),ip=dp>=-1e-7,iq=dq>=-1e-7;
    if(ip)out.push(p);
    if(ip!==iq){const t=dp/(dp-dq);out.push([p[0]+t*(q[0]-p[0]),p[1]+t*(q[1]-p[1])]);}
   }
  }return out;
 }
 const overlap=(a,b)=>a[0]<b[2]&&a[2]>b[0]&&a[1]<b[3]&&a[3]>b[1];
 const bbox=p=>[Math.min(...p.map(p=>p[0])),Math.min(...p.map(p=>p[1])),Math.max(...p.map(p=>p[0])),Math.max(...p.map(p=>p[1]))];
 function face(world){
  const p=world.map(w=>[...K.iso(w,P),K.depthOf(w,P)]);if(Math.abs(area(p))<1e-8)return null;
  let i=1,j=2,det=0;
  for(;j<p.length;j++){det=(p[i][0]-p[0][0])*(p[j][1]-p[0][1])-(p[j][0]-p[0][0])*(p[i][1]-p[0][1]);if(Math.abs(det)>1e-7)break;}
  if(j===p.length)return null;
  const [x,y,z]=p[0],a=p[i],b=p[j];
  const dx=((a[2]-z)*(b[1]-y)-(b[2]-z)*(a[1]-y))/det;
  const dy=((a[0]-x)*(b[2]-z)-(b[0]-x)*(a[2]-z))/det;
  return {p,bbox:bbox(p),depth:q=>z+dx*(q[0]-x)+dy*(q[1]-y)};
 }
 const toward=K.towardViewer(P);
 const faces=items.map(item=>{
  const {ring,z,h}=item,ccw=area(ring)>0,world=[ring.map(([x,y])=>[x,y,z+h])];
  for(let j=0;j<ring.length;j++){
   const a=ring[j],b=ring[(j+1)%ring.length],dx=b[0]-a[0],dy=b[1]-a[1];
   if((ccw?1:-1)*(dy*toward[0]-dx*toward[1])>1e-8)world.push([[...a,z],[...b,z],[...b,z+h],[...a,z+h]]);
  }
  const f=world.map(face).filter(Boolean);return {f,bbox:bbox(f.flatMap(f=>f.p))};
 });
 const edges=items.map(()=>new Set()),indegree=items.map(()=>0);
 for(let a=0;a<items.length;a++)for(let b=a+1;b<items.length;b++){
  if(!overlap(faces[a].bbox,faces[b].bbox))continue;
  let af=false,bf=false;
  for(const fa of faces[a].f)for(const fb of faces[b].f){
   if(!overlap(fa.bbox,fb.bbox))continue;
   const intersection=clip(fa.p,fb.p);if(intersection.length<3||Math.abs(area(intersection))<.015)continue;
   const centre=intersection.reduce((s,p)=>[s[0]+p[0]/intersection.length,s[1]+p[1]/intersection.length],[0,0]);
   const delta=fa.depth(centre)-fb.depth(centre);if(delta>.015)af=true;else if(delta<-.015)bf=true;
  }
  if(af&&bf)throw Error(`Interlocking ML parts ${a}/${b}`);
  if(af||bf){const back=af?b:a,front=af?a:b;edges[back].add(front);indegree[front]++;}
 }
 const queue=items.map((_,i)=>i).filter(i=>!indegree[i]),order=[];
 while(queue.length){const i=queue.shift();order.push(i);for(const j of edges[i])if(--indegree[j]===0)queue.push(j);}
 if(order.length!==items.length)throw Error('ML painter order cycle');
 order.forEach((i,rank)=>items[i].key=rank);
 return items;
}
