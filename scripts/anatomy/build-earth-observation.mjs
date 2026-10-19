import {mkdirSync,writeFileSync,cpSync,readFileSync} from 'node:fs';
import {dirname,resolve} from 'node:path';
import {fileURLToPath} from 'node:url';
import * as A from './kit/audit.mjs';
import {catalog,defaults} from './earth-observation/catalog.mjs';
import {scene} from './earth-observation/scene.mjs';
const here=dirname(fileURLToPath(import.meta.url)),out=resolve(here,'../../public/anatomy/earth-observation');
mkdirSync(out,{recursive:true});mkdirSync(resolve(out,'runtime'),{recursive:true});
cpSync(resolve(here,'kit'),resolve(out,'runtime/kit'),{recursive:true});
cpSync(resolve(here,'earth-observation'),resolve(out,'runtime/earth-observation'),{recursive:true});
const css=readFileSync(resolve(here,'kit/iso.css'),'utf8');
const style=`${css}\n*{box-sizing:border-box}html,body{margin:0;min-height:0}body{font:14px/1.5 system-ui,sans-serif;background:var(--anatomy-paper);color:var(--anatomy-text)}main{max-width:960px;margin:0 auto;padding:14px;border:1px solid currentColor;border-radius:8px}.head,.toolbar{display:flex;gap:12px;align-items:center;justify-content:space-between}.head{font-size:13px}h1{font-size:16px;font-weight:500;margin:0}select,button{font:inherit;background:transparent;color:inherit;border:1px solid #8887;border-radius:4px;padding:5px;max-width:100%}select option{color:#222;background:#fff}#drawing svg{width:100%;height:auto;display:block}#readout{overflow-wrap:anywhere;display:block;min-height:3.5em;font-variant-numeric:tabular-nums;font-size:13px}#caption{font-size:12px;opacity:.8}#controls{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 20px;margin:8px 0}label{min-width:0;display:grid;grid-template-columns:1fr auto;font-size:12px;gap:4px}input{grid-column:1/-1;width:100%;accent-color:currentColor}output{font-variant-numeric:tabular-nums}.toolbar{justify-content:flex-start;flex-wrap:wrap}button[aria-pressed=true]{background:#7774}button:focus-visible,input:focus-visible,select:focus-visible{outline:2px solid currentColor;outline-offset:3px}@media(max-width:450px){.toolbar label{width:100%;display:flex;flex-wrap:wrap;min-width:0}.toolbar select{width:100%;min-width:0}.head h1{overflow-wrap:anywhere;min-width:0}main{padding:9px}.head{align-items:flex-start}h1{font-size:14px}#controls{grid-template-columns:1fr}#drawing{margin:0 -8px}#readout{font-size:12px;min-height:4em}}`;
for(const course of ['geodesy','remote-sensing','insar']){
 const mode=Object.keys(catalog).find(k=>catalog[k].course===course),s=scene(mode,defaults(mode));
 writeFileSync(resolve(out,`${course}.html`),`<!doctype html><html lang="zh-CN"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${catalog[mode].title}</title><style>${style}</style><body class="iso" data-theme="dark" data-course="${course}"><main><header class="head"><span id="fig">${catalog[mode].id}</span><h1 id="title">${catalog[mode].title}</h1></header><div id="drawing">${s.svg}</div><output id="readout" aria-live="polite"></output><div class="toolbar"><label>演示<select id="mode" aria-label="选择教学机制"></select></label><button id="reset" type="button">恢复示例</button><button id="tour" type="button" aria-pressed="false">缓慢巡览</button></div><div id="controls"></div><p id="caption"></p></main><script type="module" src="./runtime/earth-observation/runtime.mjs"></script></body></html>`);
}
if(process.argv.includes('--audit')){
 const report=[],only=process.argv.find(s=>s.startsWith('--only='))?.slice(7).split(',');
 for(const mode of Object.keys(catalog).filter(k=>!only||only.includes(k))) {
   const p=defaults(mode),poses=[['default',p]];
   const first=catalog[mode].controls[0];
   poses.push(['low',{...p,[first.key]:first.min}],['high',{...p,[first.key]:first.max}]);
   for(const [pose,values] of poses){const s=scene(mode,values),r=A.audit(s.R);const errors=A.failures(r);report.push({mode,pose,parts:s.parts,errors,ordering:'runtime 0.25px raycast, geometry cache only; same keys audited'});if(errors){console.log(mode,pose);console.log(A.report(r));}}
 }
 const evidence=resolve(here,'../../reports/anatomy-earth');mkdirSync(evidence,{recursive:true});
 let previous=[];if(only){try{previous=JSON.parse(readFileSync(resolve(evidence,'geometry-audit.json'),'utf8')).filter(r=>!only.includes(r.mode));}catch{}}
 writeFileSync(resolve(evidence,'geometry-audit.json'),JSON.stringify([...previous,...report],null,2));
 const failed=report.filter(v=>v.errors);console.log(failed.length?`${failed.length} geometry states failed`:`audit passed: ${report.length} actual geometry states`);if(failed.length)process.exitCode=1;
}
console.log('Built 3 Earth-observation teaching instruments / 20 modes, 21 embeds');
