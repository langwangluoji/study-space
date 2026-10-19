import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import * as k from './kit/iso-kit.mjs';
import * as A from './kit/audit.mjs';
import {kitScript} from './scripts/inline-kit.mjs';
import {P,rigParts,rigSvg} from './photogrammetry/geometry.mjs';
import {DEFAULT,MODES,RESECTION,evaluate} from './photogrammetry/model.mjs';
const here=path.dirname(fileURLToPath(import.meta.url)),root=path.resolve(here,'../..'),out=path.join(root,'public/anatomy/photogrammetry'),report=path.join(root,'reports/anatomy-photogrammetry');
fs.mkdirSync(out,{recursive:true});fs.mkdirSync(report,{recursive:true});
function recorded(s,mode='stereo'){
 const r=rigParts(s,mode),R=A.recorder(P);
 for(const p of r.parts){const shape=p.oriented?A.orientedBox(p.oriented.centre,p.oriented.axes,p.oriented.half,{name:p.name}):p.circle?A.cylinder(...p.circle,p.z,p.h,{name:p.name}):A.slab(p.plan,p.z,p.h,{name:p.name});R.put({name:p.name,at:p.at,svg:k.solidSvg(p.paths),shapes:[R.solid(shape)]});}
 A.settle(R,P);return R;
}
const R=recorded(DEFAULT),order=R.items.slice().sort((a,b)=>a.key-b.key).map(x=>x.name);
const svg=rigSvg(DEFAULT,'stereo',order);
const modelSource=fs.readFileSync(path.join(here,'photogrammetry/model.mjs'),'utf8').replace(/^export /gm,'');
const geometrySource=fs.readFileSync(path.join(here,'photogrammetry/geometry.mjs'),'utf8').replace(/^import .*\n/gm,'').replace(/^export /gm,'');
const aliases='const k={fitProjection,slabOf,cylinder,solidSvg,pathOf,iso};';
const live=fs.readFileSync(path.join(here,'photogrammetry/live.js'),'utf8');
const body=k.plateHtml({fig:'Fig 04',title:'浮游测标与视差',hint:'拖动滑块 · 箭头键精调',readout:'p=45mm',body:`<div class="iso-stage" tabindex="0" aria-label="共享立体相机测量台">${k.figureSvg({width:720,height:490,label:'两台安装在基线轨和升降立柱上的测量相机，观察同一地形测标；前排两片量测窗与测高旋钮。',body:svg.body})}</div><div id="controls"></div><div class="actions"><button id="reset">重置共同案例</button><button id="tour" aria-pressed="false">播放本步</button></div><p id="result" aria-live="polite"></p><p id="boundary"></p>`,caption:'同一测量台贯穿十步；结构按同一几何模型移动，主距/像元与地面长度各用自己的单位。相机、像窗和测标是实体，投影线连接摄影中心与目标。装置为教学测量台，不按航空器实际尺寸仿真。'});
const html=k.pageHtml({title:'摄影测量 · 共享相机测量台',theme:'light',body,script:kitScript()+aliases+modelSource+geometrySource+`const ORDER=${JSON.stringify(order)};`+live});
const style=`<style>html{margin:0;padding:0;background:transparent!important}body{margin:0;padding:0;background:var(--anatomy-card)!important}.iso-page{width:100%;margin:0 auto}.iso{max-width:900px;margin:auto;padding:12px 2px;font-family:system-ui,sans-serif}.iso-figure{margin:2px 1px 12px}.iso-plate{padding:46px 18px 62px}.iso-stage{outline-offset:3px}.iso-stage svg{width:100%;height:auto;display:block}#controls{display:grid;grid-template-columns:repeat(auto-fit,minmax(170px,1fr));gap:12px;margin-top:8px}label{font-size:13px;display:grid;gap:6px;color:var(--anatomy-text)}input{width:100%;accent-color:var(--anatomy-text)}button{font:inherit;font-size:13px;padding:7px 10px;border:1px solid var(--anatomy-mid);background:var(--anatomy-card);color:var(--anatomy-text);cursor:pointer}.actions{display:flex;flex-wrap:wrap;gap:8px;margin-top:14px}#result{font-size:14px;line-height:1.7;color:var(--anatomy-text)}#boundary{font-size:12px;line-height:1.65;color:var(--anatomy-muted)}.iso-plate-corner[data-corner=readout]{max-width:65%;white-space:normal;text-align:right;line-height:1.5}.iso-plate-corner[data-corner=title]{max-width:70%;white-space:normal;text-align:right;line-height:1.4}@media(max-width:440px){.iso-plate{padding:50px 10px 75px}.iso-plate-corner{font-size:9px}.iso-plate-corner[data-corner=hint]{max-width:46%;white-space:normal;line-height:1.5;bottom:0}.iso-plate-corner[data-corner=readout]{max-width:47%}#controls{grid-template-columns:1fr}.iso-legend{font-size:12px}}</style>`;
fs.writeFileSync(path.join(out,'camera-rig.html'),html.replace('</head>','<link rel="icon" href="data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22/%3E">'+style+'</head>'));
if(process.argv.includes('--audit')){
 const states=[DEFAULT,{...DEFAULT,B:200},{...DEFAULT,B:600},{...DEFAULT,H:700},{...DEFAULT,H:1500},{...DEFAULT,h:400},{...DEFAULT,X:-300,Y:0},{...DEFAULT,X:400,Y:250},...[-12,-6,0,6,12].map(angle=>({...DEFAULT,mode:'pose',angle})),{...DEFAULT,mode:'resection',_camera:RESECTION[0].theta},{...DEFAULT,mode:'orientation',scale:1},{...DEFAULT,mode:'orientation',scale:8},{...DEFAULT,mode:'pose',angle:-12,B:200},{...DEFAULT,B:200,H:700,h:400}];
 const result=[];
 for(const [i,s] of states.entries()){const r=recorded(s,s.mode??'stereo');for(const item of r.items)item.key=order.indexOf(item.name);const audit=A.audit(r,P),n=A.failures(audit);console.log(`state ${i}: ${n} failures`);if(n)console.log(A.report(audit));result.push({state:s,failures:n,parts:r.items.length,report:audit});}
 fs.writeFileSync(path.join(report,'geometry-audit.json'),JSON.stringify(result,null,2));
 if(result.some(x=>x.failures))process.exitCode=1;else console.log('audit passed');
}
const a=evaluate(DEFAULT);if(Math.abs(a.p-45)>1e-10||Math.abs(a.overlap-80.43478260869566)>1e-9||RESECTION.at(-1).rms>1e-8)throw Error('model regression');
fs.writeFileSync(path.join(report,'model-baseline.json'),JSON.stringify({parts:svg.parts.length,default:DEFAULT,readout:a,resection:RESECTION,scope:'default analytic identities and six-parameter synthetic resection; geometry audit is separate'},null,2));
console.log(`wrote ${out}/camera-rig.html · ${svg.parts.length} solids · ${Object.keys(MODES).length} modes`);
