import {chromium} from 'playwright';
import {mkdirSync,writeFileSync,readFileSync} from 'node:fs';
import {catalog} from './earth-observation/catalog.mjs';
import {LINE_ENDS} from './scripts/line-ends.mjs';
const out='reports/anatomy-earth';mkdirSync(out,{recursive:true});
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({viewport:{width:960,height:1100},reducedMotion:'reduce'}),errors=[],rows=[];
page.on('pageerror',e=>errors.push(e.message));
const only=process.argv.find(v=>v.startsWith('--only='))?.slice(7).split(',');
for(const theme of ['dark','light'])for(const [mode,info] of Object.entries(catalog).filter(([key])=>!only||only.includes(key))){
 const url=`http://127.0.0.1:8793/anatomy/earth-observation/${info.course}.html?mode=${mode}&theme=${theme}`;
 await page.goto(url);await page.waitForFunction(()=>window.earthFigure);
 const before=await page.evaluate(()=>window.earthFigure.model.text);
 const line=await page.evaluate(`(${LINE_ENDS})({select:'#drawing'})`);
 await page.screenshot({path:`${out}/${mode}-${theme}-desktop.png`,fullPage:true});
 const first=page.locator('#controls input').first();await first.focus();await first.press('ArrowRight');
 const after=await page.evaluate(()=>window.earthFigure.model.text);
 rows.push({mode,theme,lines:line.lines,ends:line.ends,lineProblems:line.problems,before,after,parts:await page.evaluate(()=>window.earthFigure.parts),overflow:await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth)});
 await page.setViewportSize({width:390,height:1000});await page.screenshot({path:`${out}/${mode}-${theme}-phone.png`,fullPage:true});
 if(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth))errors.push(mode+' '+theme+' phone overflow');
 await page.setViewportSize({width:960,height:1100});
 console.log(mode,theme,'line ends:',line.problems.length);
}
// The reduced-motion setting forbids the tour from starting.
await page.locator('#tour').click();if(await page.locator('#tour').getAttribute('aria-pressed')!=='false')errors.push('reduced motion tour');
await browser.close();let previous=[];if(only){try{previous=JSON.parse(readFileSync(`${out}/browser-checks.json`,'utf8')).rows.filter(r=>!only.includes(r.mode));}catch{}}
writeFileSync(`${out}/browser-checks.json`,JSON.stringify({rows:[...previous,...rows],errors},null,2));if(errors.length||rows.some(r=>r.lineProblems.length)){console.error(errors);process.exitCode=1;}else console.log(`Browser checks passed: ${rows.length} mode/theme states, ${rows.length*2} screenshots`);
