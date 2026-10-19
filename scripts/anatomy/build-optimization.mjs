import {readFileSync,writeFileSync,mkdirSync} from 'node:fs';
import {dirname,resolve} from 'node:path';import {fileURLToPath} from 'node:url';
import * as k from './kit/iso-kit.mjs';import * as A from './kit/audit.mjs';
import {kitScript} from './scripts/inline-kit.mjs';import {bench} from './optimization/geometry.mjs';import * as M from './optimization/model.mjs';
const here=dirname(fileURLToPath(import.meta.url)),root=resolve(here,'../..'),out=resolve(root,'public/anatomy/optimization'),reports=resolve(root,'reports/anatomy-optimization');mkdirSync(out,{recursive:true});mkdirSync(reports,{recursive:true});
const initial={point:[1.2,.8],wall:true,c:2,normalForce:.8*Math.SQRT2};
const art=bench(k,initial,A);console.log('physical solids:',art.parts);
if(process.argv.includes('--audit')){
 const snapshots=[initial,...[1,2.5,3,4].map(c=>({...M.constrained(c),wall:true,c})),...[0,.5,1].map(alpha=>({...M.line(alpha),wall:false,c:2})),{point:[-.3,-.2],wall:false,c:2},{point:[2.6,2.2],wall:false,c:2}];
 const results=[];
 for(let i=0;i<snapshots.length;i++){const a=bench(k,snapshots[i],A),r=A.audit(a.record,a.P);const count=A.failures(r);console.log('pose',i,A.report(r));results.push({pose:i,state:snapshots[i],solids:a.parts,failures:count,result:r});}
 writeFileSync(resolve(reports,'geometry-audit.json'),JSON.stringify(results,null,2));
 const n=results.reduce((sum,r)=>sum+r.failures,0);console.log(n?`audit failed: ${n}`:'audit passed');if(n)process.exitCode=1;
}
const model=readFileSync(resolve(here,'optimization/model.mjs'),'utf8').replace(/^export /gm,'');
const geometry=readFileSync(resolve(here,'optimization/geometry.mjs'),'utf8').replace(/^export /gm,'');
const live=readFileSync(resolve(here,'optimization/live.js'),'utf8');
const kk='{fitProjection,depthOf,iso,solidSvg,slabOf,cylinder,extrude,dotsSvg,lineSvg,planOutline,radialTicks,topTicks,lineOnTop,figureSvg}';
const styles=readFileSync(resolve(here,'optimization/style.css'),'utf8');
const content='<div class="toolbar"><select id="mode" aria-label="实验主题"></select><button id="reset">复位</button><button id="step">下一步</button></div><p class="explain" id="question"></p><div class="iso-stage" tabindex="0" role="group" aria-label="校准台：方向键调整参数">'+art.svg+'</div><div id="controls" class="controls"></div><p class="explain muted">以下为控制器目标读数；台面缓动趋近目标，当前位置见卡片右下。</p><div class="metrics" id="metrics" aria-live="polite"></div><svg id="plot" class="plot" viewBox="0 0 600 130" role="img" aria-label="同步数学曲线"></svg><p class="explain" id="explain"></p>';
const body='<style>'+styles+'</style>'+k.plateHtml({fig:'OPT · 实验台',title:'同一张台，连续理解最优化',hint:'点击参数；方向键微调，Home复位',readout:'模型与读数同源',keys:[],caption:'理想无摩擦双轴伺服校准台。控制器模拟指定弹性势能，封闭执行器施加相应载荷；马达执行算法步，缓动不是自然动力学。装置只解释本例，不代替一般定理。',body:content});
writeFileSync(resolve(out,'positioning.html'),k.pageHtml({title:'最优化 · 同一张校准台',theme:'light',width:740,body,script:kitScript()+`\n(function(){const k=${kk};${model}\n${geometry}\n${live}\n})();`}));
console.log('wrote',resolve(out,'positioning.html'));
