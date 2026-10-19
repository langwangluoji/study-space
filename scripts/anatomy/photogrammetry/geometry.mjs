import * as k from '../kit/iso-kit.mjs';
// A real stereo comparator bench: two cameras on vertical slides, fiducial
// image carriers, a terrain target and a graduated measuring carriage.
export const P=k.fitProjection([[-155,-90,-18],[155,75,0],[-95,-45,255],[65,-45,255]],720,490,{pad:26,azimuth:43,elevation:30});
function turnedBox(p,pivot,angle){
 const c=Math.cos(angle),s=Math.sin(angle),turn=([x,y,z])=>[pivot[0]+c*(x-pivot[0])+s*(z-pivot[2]),y,pivot[2]-s*(x-pivot[0])+c*(z-pivot[2])];
 const {x,y,w,d}=p.plan,verts=[[x,y,p.z],[x+w,y,p.z],[x+w,y+d,p.z],[x,y+d,p.z],[x,y,p.z+p.h],[x+w,y,p.z+p.h],[x+w,y+d,p.z+p.h],[x,y+d,p.z+p.h]].map(turn);
 const faces=[[[0,3,2,1],[0,0,-1]],[[4,5,6,7],[0,0,1]],[[0,1,5,4],[0,-1,0]],[[1,2,6,5],[1,0,0]],[[2,3,7,6],[0,1,0]],[[3,0,4,7],[-1,0,0]]];
 const a=P.azimuth*Math.PI/180,e=(P.elevation??30)*Math.PI/180,V=[Math.cos(a)*Math.cos(e),Math.sin(a)*Math.cos(e),Math.sin(e)],dot=(x,y)=>x.reduce((n,v,i)=>n+v*y[i],0),shades=['','','',''];let top='',fill='',outline='';
 for(const[ids,n]of faces){const norm=[c*n[0]+s*n[2],n[1],-s*n[0]+c*n[2]];if(dot(norm,V)<=1e-9)continue;const path=k.pathOf(ids.map(i=>k.iso(verts[i],P)),true);fill+=path;outline+=path;if(n[2]>0)top+=path;else shades[Math.min(3,Math.max(0,Math.round(1.5+norm[0]+norm[1])))]+=path;}
 return {paths:{fill,top,shades,outline,crease:'',bevel:''},centre:turn(p.at),axes:[[c,0,-s],[0,1,0],[s,0,c]],half:[w/2,d/2,p.h/2],vertices:verts};
}
export function rigParts(s,mode='stereo'){
 const parts=[];const slab=(name,x,y,w,d,z,h,tone='mid',lit=false)=>{const plan={x,y,w,d,r:Math.min(1.8,w/5,d/5)};parts.push({name,plan,z,h,paths:k.slabOf(plan,z,h,P,4,.35),tone,lit,at:[x+w/2,y+d/2,z+h/2]})};
 const cylinder=(name,x,y,r,z,h,tone='mid')=>parts.push({name,circle:[x,y,r],z,h,paths:k.cylinder(x,y,r,z,h,P,24),tone,at:[x,y,z+h/2]});
 for(const [i,[x,y]] of [[-135,-65],[135,-65],[-135,52],[135,52]].entries()){slab(`stand.foot${i}`,x-7,y-7,14,14,-18,8,'lo');slab(`footpad${i}`,x-6,y-6,12,12,-10,2,'lo')}
 slab('base',-150,-82,300,155,-8,8,'lo');
 for(const [i,[x,y]] of [[-141,-73],[141,-73],[-141,64],[141,64]].entries())cylinder(`base-screw${i}`,x,y,1.3,0,1,'mid');
 // Rear long rail and its four separate supports are the baseline control.
 for(let i=0;i<4;i++)slab(`rail-foot${i}`,-115+i*70,-62,9,18,0,7);
 slab('baseline-rail',-122,-58,236,10,7,5);
 slab('scale-strip',-122,-40,236,5,0,.6,'lo');
 for(const x of [-126,114])slab(`stop${x}`,x,-62,4,18,0,14);
 const height=19+s.H*.14;let xs=[-70,-70+s.B*.14],centres=[];
 if(mode==='resection'){const t=s._camera; if(t)xs[0]+=t[0]*.14;}
 for(let i=0;i<2;i++){
  const x=xs[i],z=height+(mode==='resection'&&i===0?(s._camera?.[2]??1000)-1000:0)*.14;
  slab(`slide${i}`,x-10,-62,20,18,12,5);
  for(const dx of [-6,4])slab(`bushing${i}-${dx}`,x+dx,-60,2,14,17,3);
  slab(`post${i}`,x-3,-55,6,6,17,z-17);
  slab(`collar${i}`,x-6,-59,12,14,z,5);
  slab(`arm${i}`,x-3,-45,6,16,z,4);
  slab(`camera${i}`,x-12,-29,24,20,z,13,'hi');
  cylinder(`camera-dial${i}`,x+4,-52,.7,z+5,3);
  slab(`lens-flange${i}`,x-7,-26,14,14,z-3,3,'hi');
  slab(`lens${i}`,x-5,-24,10,10,z-9,6,'hi',true);
  slab(`image-carrier${i}`,x-9,-27,18,16,z+13,1,'mid');
  for(const dx of [-10,8])slab(`film-clip${i}-${dx}`,x+dx,-27,2,16,z+14,1.5,'hi');
  centres.push([x,-19,z-9]);
  if(mode==='resection'&&i===0){const dy=(s._camera?.[1]??0)*.14;for(const p of parts.filter(p=>/^(slide0|bushing0|post0|collar0|arm0|camera0|camera-dial0|lens-flange0|lens0|image-carrier0|film-clip0)/.test(p.name))){if(p.circle){p.circle[1]+=dy;p.paths=k.cylinder(...p.circle,p.z,p.h,P,24)}else{p.plan.y+=dy;p.paths=k.slabOf(p.plan,p.z,p.h,P,4,.35)}p.at[1]+=dy;}centres[0][1]+=dy;}
  if(mode==='pose'&&i===0){const angle=s.angle*Math.PI/180,pivot=[x,-29,z+2];for(const p of parts.filter(p=>/^(camera0$|lens-flange0|lens0$|image-carrier0|film-clip0)/.test(p.name))){const turned=turnedBox(p,pivot,angle);p.paths=turned.paths;p.oriented=turned;p.at=turned.centre;} // The small dial is fixed on the mounting collar, not on the tilting camera.
   const c=Math.cos(angle),si=Math.sin(angle);centres[0]=[x-11*si,-19,z+2-11*c];
  }
 }
 slab('terrain-tray',-126,-35,240,80,0,5,'mid');
 slab('terrain-inlay',-122,-31,232,72,5,.6,'lo');
 const length=20*s.scale*.14;
 slab('gauge-fixed-foot',20,30,1,7,5.6,1);
 slab('gauge-moving-foot',20+length-1,30,1,7,5.6,1);
 slab('gauge-rule',20,32,length,3,6.6,1,'hi',mode==='orientation');
 // Target is supported on a height carriage, never floating in space.
 const tx=-70+s.X*.14,ty=-19+s.Y*.14,tz=8.6+s.h*.14;
 slab('target-foot',tx-7,ty-6,14,12,5.6,3);
 slab('target-stem',tx-1,ty-1,2,2,8.6,Math.max(.001,tz-8.6));
 slab('target-plate',tx-6,ty-5,12,10,tz,1.4,'hi',true);
 // Front comparator image plates and the four sampling cells share one holder.
 for(let i=0;i<2;i++){
  const x=-99+i*94;
  slab(`image-foot${i}`,x-3,48,66,8,0,6);
  slab(`image-back${i}`,x-3,48,66,8,6,3);
  slab(`image-glass${i}`,x,48.2,60,7.6,9,.8,'hi');
  for(const xx of [x-3,x+60])slab(`image-edge${i}-${xx}`,xx,48,3,8,9,2,'mid');
 }
 cylinder('height-knob',125,30,7,0,5);cylinder('height-crown',125,30,4,5,3);
 return {parts,centres,target:[tx,ty,tz+1.4]};
}
export function partSvg(p){return `<g data-part="${p.name}">${k.solidSvg({...p.paths,shades:p.paths.shades.map(d=>d||'M0 0')},{tone:p.tone,lit:p.lit,crease:'faint'})}</g>`}
export function rigSvg(s,mode,order){const r=rigParts(s,mode),rank=new Map(order.map((n,i)=>[n,i]));r.parts.sort((a,b)=>(rank.get(a.name)??0)-(rank.get(b.name)??0));return {body:r.parts.map(partSvg).join(''),...r};}
