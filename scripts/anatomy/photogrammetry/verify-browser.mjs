import {chromium} from 'playwright';
import fs from 'node:fs';
import path from 'node:path';
import {fileURLToPath} from 'node:url';
import {LINE_ENDS} from '../scripts/line-ends.mjs';
import {MODES} from './model.mjs';
const root=path.resolve(path.dirname(fileURLToPath(import.meta.url)),'../../..'),out=path.join(root,'reports/anatomy-photogrammetry');
const executable=[process.env.CHROME_PATH,chromium.executablePath(),'C:/Program Files/Microsoft/Edge/Application/msedge.exe','C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe'].find(p=>p&&fs.existsSync(p));
const browser=await chromium.launch({headless:true,...(executable?{executablePath:executable}:{})});const rows=[],errors=[];
const actions={scale:{width:36},pixel:{X:250,Y:150},pose:{angle:12},stereo:{h:200,B:400},epipolar:{wrong:10,noise:0},resection:{iteration:4},orientation:{scale:8},adjustment:{noise:.03},quality:{wrong:10},ortho:{h:20,u:.75,v:.75}};
try{
for(const mode of Object.keys(MODES))for(const theme of ['light','dark']){
 const context=await browser.newContext({viewport:{width:980,height:1100},deviceScaleFactor:1,reducedMotion:'reduce'}),page=await context.newPage(),issues=[];
 page.on('pageerror',e=>issues.push(e.message));page.on('console',m=>{if(m.type()==='error')issues.push(m.text())});
 await page.goto(`http://127.0.0.1:4186/anatomy/photogrammetry/camera-rig.html?mode=${mode}&theme=${theme}`);await page.waitForFunction(()=>window.photoRig);await page.waitForTimeout(120);
 await page.locator('.iso-figure').screenshot({path:path.join(out,`${mode}-${theme}-desktop.png`)});
 await page.evaluate(v=>window.photoRig.set(v),actions[mode]);await page.waitForTimeout(150);
 const line=await page.evaluate(`(${LINE_ENDS})({show:false})`);
 const reading=await page.locator('#result').textContent();const readout=await page.locator('[data-readout]').textContent();
 if(line.problems.length)errors.push({mode,theme,line});
 if(/NaN|undefined|Infinity/.test(reading+readout))errors.push({mode,theme,reading});
 await page.setViewportSize({width:390,height:1100});await page.waitForTimeout(100);
 await page.locator('.iso-figure').screenshot({path:path.join(out,`${mode}-${theme}-390-action.png`)});
 const overflow=await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);if(overflow)errors.push({mode,theme,error:'horizontal overflow'});
 // Keyboard works without a pointer. Home then ArrowRight must increase the first control.
 await page.locator('.iso-stage').focus();await page.keyboard.press('Home');await page.waitForTimeout(30);const old=await page.evaluate(()=>({...window.photoRig.target}));await page.keyboard.press('ArrowRight');await page.waitForTimeout(50);const next=await page.evaluate(()=>({...window.photoRig.target}));
 const first=await page.locator('input').first().getAttribute('aria-label');if(JSON.stringify(old)===JSON.stringify(next))errors.push({mode,theme,error:'keyboard did not move'});
 await page.locator('#tour').click();await page.waitForTimeout(30);const reduced=await page.evaluate(()=>window.photoRig.activity.playing===false);if(!reduced)errors.push({mode,theme,error:'reduced motion tour'});
 rows.push({mode,theme,readout,reading,lines:line.lines,ends:line.ends,lineFailures:line.problems.length,overflow,keyboard:true,firstControl:first,reducedMotion:reduced,console:issues});if(issues.length)errors.push({mode,theme,issues});
 await context.close();console.log(`${mode}/${theme}: lines ${line.problems.length}, keyboard checked`);
}
const context=await browser.newContext({viewport:{width:980,height:800}}),page=await context.newPage();await page.goto('http://127.0.0.1:4186/anatomy/photogrammetry/camera-rig.html?mode=stereo&theme=light');await page.locator('#tour').click();
const samples=[];for(const ms of [100,250,400]){await page.waitForTimeout(ms);samples.push(await page.evaluate(()=>({h:window.photoRig.state.h,p:window.photoRig.evaluate(window.photoRig.state).p})));}
await page.locator('.iso-stage').screenshot({path:path.join(out,'stereo-motion-detail.png'),scale:'css'});
await page.setViewportSize({width:980,height:220});await page.evaluate(()=>window.scrollTo(0,document.body.scrollHeight));await page.waitForTimeout(100);const offscreen=await page.evaluate(()=>window.photoRig.activity);if(offscreen.visible||offscreen.frame)errors.push({error:'offscreen animation continued',offscreen});
fs.writeFileSync(path.join(out,'browser-verification.json'),JSON.stringify({status:errors.length?'FAIL':'PASS',rows,motion:{samples,offscreen},errors},null,2));console.log(JSON.stringify({status:errors.length?'FAIL':'PASS',cases:rows.length,errors:errors.length}));if(errors.length)process.exitCode=1;
await context.close();
}finally{await browser.close();}
