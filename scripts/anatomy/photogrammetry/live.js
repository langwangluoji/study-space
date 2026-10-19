const mode=new URLSearchParams(location.search).get('mode') in MODES?new URLSearchParams(location.search).get('mode'):'stereo';
let state={...DEFAULT},target={...DEFAULT},playing=false,visible=true,frame=0,last=0,clock=0;
if(mode==='ortho'){state.X=target.X=100;state.Y=target.Y=50;state.h=target.h=20;}
const still=matchMedia('(prefers-reduced-motion: reduce)'),ui=document.getElementById('controls');
document.querySelector('[data-corner="fig"]').textContent='Fig '+MODES[mode][0];
document.querySelector('[data-corner="title"]').textContent=MODES[mode][1];
document.querySelector('[data-corner="hint"]').textContent='拖动滑块 · 箭头键精调';
document.querySelector('.iso-legend').lastElementChild.textContent=MODES[mode][2]+' 同一摄影测量台按本步骤选择控制量；所有长度与读数来自共享模型。';
const stage=document.querySelector('.iso-stage'),svg=stage.querySelector('svg'),refs=new Map([...svg.querySelectorAll('[data-part]')].map(el=>[el.dataset.part,el]));
// Paths change only on the moving physical pieces. All static parts stay intact.
function updatePaths(el,p){const paths=p.paths;const group=el.firstElementChild;group.toggleAttribute('data-lit',!!p.lit);group.querySelector('.iso-fill').setAttribute('d',paths.fill);group.querySelector('.iso-top').setAttribute('d',paths.top);group.querySelector('.iso-edge').setAttribute('d',paths.outline);for(const e of group.querySelectorAll('.iso-shade'))e.setAttribute('d',paths.shades[+e.dataset.shade]||'');for(const [cl,key] of [['.iso-crease','crease'],['.iso-bevel','bevel']]){const e=group.querySelector(cl);if(e)e.setAttribute('d',paths[key]||'');}}
const rayGroup=document.createElementNS('http://www.w3.org/2000/svg','g');rayGroup.setAttribute('data-rays','');svg.appendChild(rayGroup);
for(let i=0;i<2;i++){const p=document.createElementNS(svg.namespaceURI,'path');p.setAttribute('class','iso-line');p.setAttribute('data-tone','hi');rayGroup.appendChild(p);}
const dots=document.createElementNS(svg.namespaceURI,'g');dots.setAttribute('class','iso-dots');dots.setAttribute('data-tone','hi');rayGroup.appendChild(dots);
for(let i=0;i<3;i++){const c=document.createElementNS(svg.namespaceURI,'circle');c.setAttribute('r','1.4');dots.appendChild(c);}
const images=document.createElementNS(svg.namespaceURI,'g');images.setAttribute('data-images','');svg.appendChild(images);
const ticks=topTicks(-118,110,3.5,5,-40,.6,[1.6,3.2],P);const ruler=document.createElementNS(svg.namespaceURI,'g');ruler.innerHTML=lineSvg(ticks.minor,{tone:'lo'})+lineSvg(ticks.major,{tone:'mid'});svg.appendChild(ruler);
// The two live marks sit on the two real front comparator plates.
for(let i=0;i<2;i++){const c=document.createElementNS(svg.namespaceURI,'circle');c.setAttribute('r','2.2');c.setAttribute('fill','var(--anatomy-lit)');images.appendChild(c);}
if(mode==='ortho'){const cells=document.createElementNS(svg.namespaceURI,'g');[10,20,30,40].forEach((value,i)=>{const x=-99+(i%2)*30,y=48.2+Math.floor(i/2)*3.8;const el=document.createElementNS(svg.namespaceURI,'path');el.setAttribute('d',pathOf([[x,y,9.85],[x+30,y,9.85],[x+30,y+3.8,9.85],[x,y+3.8,9.85]].map(p=>iso(p,P)),true));el.setAttribute('fill',`rgb(${value},${value},${value})`);cells.appendChild(el);});images.prepend(cells);}
const imageMarks=[...images.querySelectorAll('circle')];
const inputEls=new Map();
for(const [key,label,min,max,step] of CONTROLS[mode]){const l=document.createElement('label'),span=document.createElement('span'),input=document.createElement('input');span.textContent=label;input.type='range';Object.assign(input,{min,max,step,value:target[key]});input.setAttribute('aria-label',label);l.append(span,input);ui.append(l);inputEls.set(key,{input,span,label});input.addEventListener('input',()=>{stop();target[key]=Number(input.value);persist();run();});}
const button=document.getElementById('tour');
function stop(){playing=false;button.setAttribute('aria-pressed','false');button.textContent='播放本步';}
function persist(){try{localStorage.setItem('photo-rig-case-v1',JSON.stringify({B:target.B,H:target.H,h:target.h,width:target.width}));}catch{}}
window.addEventListener('storage',event=>{if(event.key!=='photo-rig-case-v1'||!event.newValue)return;try{const next=JSON.parse(event.newValue);for(const key of ['B','H','h','width'])if(Number.isFinite(next[key]))target[key]=next[key];syncInputs();run();}catch{}});
function syncInputs(){for(const [key,{input}]of inputEls)input.value=target[key];}
function draw(){
 state._camera=RESECTION[Math.round(state.iteration)]?.theta;
 const r=rigParts(state,mode);for(const p of r.parts){const dynamic=/^(slide|bushing|post|collar|arm|camera|lens|image-carrier|film-clip|target|gauge)/.test(p.name);if(dynamic)updatePaths(refs.get(p.name),p);}
 const a=evaluate(state,mode),mapPoint=p=>[-70+p[0]*.14,-19+p[1]*.14,10+p[2]*.14];
 const intersect=['epipolar','quality','adjustment'].includes(mode)&&a.cross;
 const ends=intersect?[mapPoint(a.cross.L),mapPoint(a.cross.R)]:[r.target,r.target];
 const endpoints=[...r.centres,intersect?mapPoint(a.cross.point):r.target],screen=endpoints.map(p=>iso(p,P));
 for(let i=0;i<2;i++)rayGroup.children[i].setAttribute('d',pathOf([screen[i],iso(ends[i],P)]));
 [...dots.children].forEach((c,i)=>{c.setAttribute('cx',screen[i][0]);c.setAttribute('cy',screen[i][1]);});
 // Occlusion: the light ray is below its camera's lens, in front of the ground.
 [a.left,a.wrongRight].forEach((point,i)=>{const x=mode==='ortho'&&i===0?-99+state.u*60:-99+i*94+30+point.x/state.width*60,y=mode==='ortho'&&i===0?48.2+state.v*7.6:52+point.y/state.width*5;const p=iso([x,y,10],P),c=imageMarks[i];c.setAttribute('cx',p[0]);c.setAttribute('cy',p[1]);c.style.display=Math.abs(point.x)<=state.width/2&&Math.abs(point.y)<=state.width/2?'':'none';});
 const text=describe(state,mode);document.querySelector('[data-readout]').textContent=text[0];document.getElementById('result').textContent=text[1];document.getElementById('boundary').textContent=text[2];
 for(const [key,{span,label}]of inputEls)span.textContent=label+'：'+fmt(state[key],Number.isInteger(+inputEls.get(key).input.step)?0:3);
 stage.setAttribute('aria-label',MODES[mode][1]+'；'+text[0]);
}
function tick(now){frame=0;if(!visible)return;const dt=last?Math.min((now-last)/1000,.04):.016;last=now;if(playing&&!still.matches){clock+=dt;const[key,,lo,hi]=CONTROLS[mode][0];target[key]=lo+(hi-lo)*(.5-.5*Math.cos(clock*.65));if(key==='iteration')target[key]=Math.round(target[key]);syncInputs();}
 let moving=false;for(const key of Object.keys(DEFAULT)){const d=target[key]-state[key];state[key]=still.matches||key==='iteration'||key==='width'?target[key]:Math.abs(d)<.00001?target[key]:state[key]+d*(1-Math.exp(-dt/.18));if(Math.abs(target[key]-state[key])>.00001)moving=true;}
 draw();if(playing&&!still.matches||moving)frame=requestAnimationFrame(tick);}
function run(){if(!frame&&visible){last=0;frame=requestAnimationFrame(tick);}}
button.addEventListener('click',()=>{playing=!playing;if(still.matches){const[key,,lo,hi]=CONTROLS[mode][0];target[key]=target[key]===lo?hi:lo;playing=false;}button.setAttribute('aria-pressed',String(playing));button.textContent=playing?'暂停':'播放本步';run();});
document.getElementById('reset').addEventListener('click',()=>{stop();target={...DEFAULT};if(mode==='ortho')Object.assign(target,{X:100,Y:50,h:20});persist();syncInputs();run();});
stage.addEventListener('keydown',e=>{const key=CONTROLS[mode][0][0],input=inputEls.get(key).input;if(!['ArrowRight','ArrowUp','ArrowLeft','ArrowDown','Home','End'].includes(e.key))return;e.preventDefault();stop();target[key]=e.key==='Home'?+input.min:e.key==='End'?+input.max:Math.max(+input.min,Math.min(+input.max,target[key]+(+input.step)*(e.key==='ArrowRight'||e.key==='ArrowUp'?1:-1)));syncInputs();persist();run();});
new IntersectionObserver(es=>{visible=es.at(-1).isIntersecting;if(visible)run();else if(frame){cancelAnimationFrame(frame);frame=0;}}).observe(stage);
document.addEventListener('visibilitychange',()=>{visible=!document.hidden;if(visible)run();else if(frame){cancelAnimationFrame(frame);frame=0;}});
still.addEventListener('change',()=>{if(still.matches)stop();run();});
window.addEventListener('message',event=>{if(event.origin!==location.origin)return;const theme=event.data?.theme;if(theme==='light'||theme==='dark')document.body.dataset.theme=theme;});
const requested=new URLSearchParams(location.search).get('theme');if(requested==='light'||requested==='dark')document.body.dataset.theme=requested;
new ResizeObserver(()=>parent.postMessage({type:'anatomy:size',height:document.body.scrollHeight},location.origin)).observe(document.body);
window.photoRig={get state(){return state},get target(){return target},get activity(){return {playing,visible,frame}},mode,set(values){Object.assign(target,values);syncInputs();run();},evaluate,describe};
draw();
