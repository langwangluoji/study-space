import {catalog,defaults,evaluate} from './catalog.mjs';
import {scene} from './scene.mjs';
import {english,englishReadout,plotLabels} from './english.mjs';
const course=document.body.dataset.course,params=new URLSearchParams(location.search),modes=Object.keys(catalog).filter(k=>catalog[k].course===course||(course==='remote-sensing'&&k==='terrain'));
let mode=modes.includes(params.get('mode'))?params.get('mode'):modes[0],p=defaults(mode),visible=true,tour=false,timer=0;
const lang=['en','both'].includes(params.get('lang'))?params.get('lang'):'zh';
const local=(zh,en)=>lang==='en'&&en?en:lang==='both'&&en?zh+' / '+en:zh;
const $=s=>document.querySelector(s),reduced=matchMedia('(prefers-reduced-motion: reduce)');
document.body.dataset.theme=params.get('theme')==='light'?'light':'dark';
for(const key of modes){const o=document.createElement('option');o.value=key;o.textContent=catalog[key].id+' · '+local(catalog[key].title,english[key]?.title);$('#mode').append(o);}
$('#reset').textContent=local('恢复示例','Reset example');$('#tour').textContent=local('缓慢巡览','Slow tour');$('#mode').parentNode.firstChild.textContent=local('演示','Mechanism');
if(lang==='en')document.documentElement.lang='en';
function render(){
 const info=catalog[mode],s=scene(mode,p),en=english[mode],plot=plotLabels[mode];
 $('#drawing').innerHTML=s.svg;
 $('#drawing svg').setAttribute('aria-label',local(info.title,en?.title)+'. '+local(info.note,en?.note));
 $('#readout').textContent=local(s.model.text,en?englishReadout(s.model.text):null);
 $('#caption').textContent=local(info.note,en?.note)+' '+local(plot?.[0]??'',plot?.[1]);
 $('#fig').textContent=info.id;$('#title').textContent=local(info.title,en?.title);document.title=$('#title').textContent;
 window.earthFigure={mode,p:{...p},model:s.model,parts:s.parts,lang};
}
function setup(){const info=catalog[mode];$('#mode').value=mode;$('#controls').replaceChildren();for(const [index,c] of info.controls.entries()){const label=document.createElement('label'),span=document.createElement('span'),value=document.createElement('output'),input=document.createElement('input'),text=local(c.label,english[mode]?.labels[index]);span.textContent=text;value.textContent=String(Number(p[c.key].toPrecision(7)));input.type='range';input.id='control-'+c.key;input.min=c.min;input.max=c.max;input.step=c.step;input.value=p[c.key];input.setAttribute('aria-label',text);input.addEventListener('input',()=>{tour=false;$('#tour').setAttribute('aria-pressed','false');p[c.key]=Number(input.value);value.textContent=String(Number(p[c.key].toPrecision(7)));render();});label.append(span,value,input);$('#controls').append(label);}render();}
$('#mode').addEventListener('change',e=>{mode=e.target.value;p=defaults(mode);tour=false;setup();});
$('#reset').addEventListener('click',()=>{p=defaults(mode);tour=false;setup();});
$('#tour').addEventListener('click',()=>{tour=!tour&&!reduced.matches;$('#tour').setAttribute('aria-pressed',String(tour));});
new IntersectionObserver(es=>{visible=es.at(-1).isIntersecting;}).observe($('#drawing'));
// Discrete, calm instrument tour; no motion at all for reduced-motion users.
timer=setInterval(()=>{if(!tour||!visible||document.hidden||reduced.matches)return;const c=catalog[mode].controls[0],i=$('#control-'+c.key);p[c.key]=Math.min(c.max,p[c.key]+(c.max-c.min)/12);if(p[c.key]>=c.max)p[c.key]=c.min;i.value=p[c.key];i.previousElementSibling.textContent=String(Number(p[c.key].toFixed(4)));render();},2400);
addEventListener('pagehide',()=>clearInterval(timer));
new ResizeObserver(()=>{const height=Math.ceil(document.body.scrollHeight);if(height!==window.lastHeight){window.lastHeight=height;parent.postMessage({type:'anatomy:size',height},location.origin);}}).observe(document.body);
setup();
