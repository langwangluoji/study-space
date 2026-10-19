// One physical XY calibration bench. Every rendered solid has its true audit shape.
export function bench(k, state, A=null){
 const P=k.fitProjection([-150,150].flatMap(x=>[-140,140].flatMap(y=>[-12,35].map(z=>[x,y,z]))),680,370,{pad:30,azimuth:48,elevation:35});
 const R=A?A.recorder(P):null,items=[];let serial=0,motion='';
 const put=(name,svg,shape,at,physical=false)=>{svg='<g data-motion="'+motion+'" data-part="'+name+'">'+svg+'</g>';const item={name,svg,physical,motion,shapes:shape?[R?R.solid(shape):shape]:[],at,piece:'',move:[0,0,0]};if(R&&shape)R.put(item);items.push({...item,key:k.depthOf(at,P)});};
 const slab=(name,x,y,w,d,z,h,tone='mid',lit=false)=>{const plan={x,y,w,d,r:Math.min(1.2,w/5,d/5)};put(name,k.solidSvg(k.slabOf(plan,z,h,P,4,.35),{tone,lit}),A?A.slab(plan,z,h,{name}):null,[x+w/2,y+d/2,z+h/2],true);};
 const cyl=(name,x,y,r,z,h,tone='mid')=>put(name,k.solidSvg(k.cylinder(x,y,r,z,h,P,40,.25),{tone}),A?A.cylinder(x,y,r,z,h,{name}):null,[x,y,z+h/2],true);
 const line=(name,d,tone='faint',free=false)=>put(name,k.lineSvg(d,{tone,free}),null,[0,0,50]);
 const dots=(points,z)=>put('screw heads',k.dotsSvg(points.map(([x,y])=>k.iso([x,y,z],P)),{size:.45,tone:'mid'}),null,[0,0,z]);
 for(const x of [-125,125])for(const y of [-115,115]){slab('stand.foot.'+serial++,x-6,y-6,12,12,-12,5,'lo');cyl('leveling stem.'+serial++,x,y,3,-7,2);}
 slab('stand.surface plate',-145,-135,290,270,-5,5,'mid');
 line('bed rim',k.planOutline({x:-139,y:-129,w:278,d:258,r:4},0,P),'lo');
 dots([[-134,-124],[-134,124],[134,-124],[134,124]],0);
 for(const y of [-68,62])slab('X guide rail.'+y,-90,y,180,6,0,4);
 for(const x of [-96,90])for(const y of [-70,60]){slab('X end block.'+serial++,x,y,6,10,0,7);dots([[x+3,y+5]],7);}
 // Encased servo cartridges generate the commanded force. Their covers remain closed.
 for(const [x,y] of [[-130,-19],[-130,4],[104,75],[104,90]]){
  slab('actuator mounting shoe.'+serial++,x,y,22,11,0,2,'lo');
  slab('servo cartridge.'+serial++,x+2,y+1,18,9,2,8);
  slab('cartridge lid.'+serial++,x+2,y+1,18,9,10,1,'hi');
  dots([[x+5,y+3],[x+17,y+8]],11);
 }
 const X=(state.point[0]-1)*15,Y=(state.point[1]-.5)*15;
 motion='x';
 for(const y of [-68,62])for(const x of [X-17,X+9])slab('X sliding pad.'+serial++,x,y,8,6,4,2,'hi');
 slab('X carriage',X-20,-80,40,160,6,4,'mid');
 for(const x of [X-14,X+9])slab('Y guide rail.'+serial++,x,-63,5,126,10,3);
 for(const y of [-79,75])slab('Y end stop.'+serial++,X-18,y,36,4,10,5);
 motion='xy';
 for(const x of [X-14,X+9])slab('Y sliding pad.'+serial++,x,Y-9,5,18,13,1,'hi');
 slab('Y carriage',X-16,Y-12,32,24,14,3,'hi',true);
 dots([[X-12,Y-8],[X+12,Y-8],[X-12,Y+8],[X+12,Y+8]],17);
 cyl('reference probe',X,Y,2,17,5,'hi');
 motion='';
 // The two analog gauges are ordinary load sensors: total normal force is λ√2.
 for(const [x,label] of [[0,'gradient'],[45,'normal force']]){
  slab(label+' pedestal',x-10,105,20,18,0,5,'mid');
  cyl(label+' gauge',x,114,9,5,4,'hi');
  const ticks=k.radialTicks(x,114,7.7,20,5,9,[.8,1.5],P);
  line(label+' ticks',ticks.minor,'lo');line(label+' major',ticks.major,'mid');
  const value=label==='normal force'?(state.normalForce||0):Math.hypot(state.point[0]-2,4*(state.point[1]-1));
  const angle=-Math.PI*.7+Math.min(value/6,1)*Math.PI*1.4;
  line(label+' needle',k.lineOnTop([x,114],[x+6*Math.cos(angle),114+6*Math.sin(angle)],9.15,P),'hi','end');
  cyl(label+' hub',x,114,1,9,.3,'mid');
 }
 // Physical scale strips; ticks are rooted in their drawn edges.
 slab('X ruler',-87,-91,174,7,0,.6,'lo');
 const xt=k.topTicks(-84,84,7,5,-90.7,.6,[1.4,3],P);line('X minor ticks',xt.minor,'lo');line('X major ticks',xt.major,'mid');
 slab('Y ruler',115,-60,7,120,0,.6,'lo');
 for(let y=-56;y<=56;y+=7)line('Y tick.'+y,k.lineOnTop([115,y],[y%14===0?118.5:117,y],.6,P),'lo');
 if(state.wall){
  const c=state.c,shift=((c-1.5)*15+2*Math.SQRT2)/2,L=145,u=Math.SQRT1_2;
  // Blade front plane lies r=2 beyond the reference-probe centre at g=0.
  const mid=[shift,shift],v=[u,-u],n=[u,u],corners=[[-L,0],[L,0],[L,2],[-L,2]].map(([a,b])=>[mid[0]+a*v[0]+b*n[0],mid[1]+a*v[1]+b*n[1]]);
  for(const sign of [-1,1]){const a=[mid[0]+sign*(L-4)*v[0],mid[1]+sign*(L-4)*v[1]];slab('wall footing.'+sign,a[0]-5,a[1]-5,10,10,0,3,'lo');slab('wall upright.'+sign,a[0]-2,a[1]-2,4,4,3,14);}
  const shape=A?A.extruded(corners,17,5,{name:'contact blade'}):null;
  put('contact blade',k.solidSvg(k.extrude(corners,17,5,P,{convex:true}),{tone:'hi'}),shape,[shift,shift,19.5],true);
 }
 const record=R?A.settle(R,P):null;
 // Horizontal layers follow real stacked assemblies. The negative-X end stops
 // sit behind their rails from this camera; their positive-X mates sit in front.
 const layer=item=>(item.name==='contact blade'?20:item.name.startsWith('X end block.')&&item.at[0]<0?1.9:item.at[2])*1000+item.key-(item.motion?k.depthOf([X,item.motion==='xy'?Y:0,0],P):0);
 // Audit precisely the painter order used by the browser, not a separate settled order.
 const physical=items.filter(i=>i.physical);
 if(R)R.items.forEach((item,i)=>{item.key=layer(physical[i]);});
 const ordered=physical.sort((a,b)=>layer(a)-layer(b));
 return {P,record:R,parts:items.filter(x=>x.physical).length,svg:k.figureSvg({width:680,height:370,label:'双轴伺服校准台：真实导轨、移动滑台、参考测头、刻度与测力表。位置和所有读数来自同一数学模型。',body:ordered.map(i=>i.svg).concat(items.filter(i=>!i.physical).map(i=>i.svg))})};
}
