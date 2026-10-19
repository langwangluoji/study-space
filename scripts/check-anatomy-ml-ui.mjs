import {chromium} from 'playwright';
import assert from 'node:assert/strict';
import fs from 'node:fs/promises';
import {pathToFileURL} from 'node:url';
import path from 'node:path';
import {LINE_ENDS} from './anatomy/scripts/line-ends.mjs';
const browser=await chromium.launch({...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{}),headless:true});
const results=[];
try{
 for(const mode of ['calibration','fisher','relu','hog'])for(const width of [900,390])for(const theme of ['light','dark']){
  const p=await browser.newPage({viewport:{width,height:900},reducedMotion:'reduce'}),errors=[];
  p.on('pageerror',e=>errors.push(e.message));
  await p.goto(pathToFileURL(path.resolve(`public/anatomy/ml/${mode}.html`)).href+'?theme='+theme);
  const readout=await p.locator('#numbers').textContent();assert(readout);
  const size=await p.evaluate(()=>({w:document.documentElement.scrollWidth,v:innerWidth,h:document.body.scrollHeight}));assert(size.w<=width);
  if(mode==='calibration'){await p.locator('#fit').click();assert((await p.locator('#numbers').textContent()).includes('0.2250'));}
  if(mode==='hog'){await p.locator('#v').fill('3');assert((await p.locator('#numbers').textContent()).includes('4/4'));}
  await p.screenshot({path:`reports/anatomy-ml/${mode}-${width}-${theme}.png`,fullPage:true});
  for(const value of [await p.locator('#u').getAttribute('min'),await p.locator('#u').getAttribute('max')]){
   await p.locator('#u').fill(value);const lines=await p.evaluate('('+LINE_ENDS+')({show:false})');assert.equal(lines.ends,0);assert.equal(await p.locator('svg').count(),1);
  }
  await p.locator('#u').focus();const before=await p.locator('#u').inputValue();await p.keyboard.press('ArrowLeft');assert.notEqual(await p.locator('#u').inputValue(),before);
  await p.locator('#play').click();assert.equal(await p.locator('#play').getAttribute('aria-pressed'),'false');
  if(width===900){await p.setViewportSize({width:2720,height:1800});await p.addStyleTag({content:'.iso-page{width:calc(100% - 32px)!important}'});await p.screenshot({path:`reports/anatomy-ml/${mode}-4x-${theme}.png`,fullPage:true});}
  assert.deepEqual(errors,[]);results.push({mode,width,theme,readout,size,consoleErrors:errors,lineEnds:0,keyboard:true,reducedMotion:true});await p.close();
 }
 // Real timed animation must change the same model value used by the SVG.
 const p=await browser.newPage();await p.goto(pathToFileURL(path.resolve('public/anatomy/ml/calibration.html')).href);await p.locator('#play').click();const before=await p.locator('#numbers').textContent();await p.waitForTimeout(500);assert.notEqual(await p.locator('#numbers').textContent(),before);
 await p.locator('#play').click();const paused=await p.evaluate(()=>window.anatomyState().frames);await p.waitForTimeout(200);assert.equal(await p.evaluate(()=>window.anatomyState().frames),paused);
 await p.locator('#play').click();await p.evaluate(()=>{const tail=document.createElement('div');tail.style.height='2200px';document.body.append(tail);window.scrollTo(0,1600)});await p.waitForTimeout(150);const off=await p.evaluate(()=>window.anatomyState());assert.equal(off.visible,false);await p.waitForTimeout(250);assert.equal(await p.evaluate(()=>window.anatomyState().frames),off.frames);await p.close();
 await fs.writeFile('reports/anatomy-ml/browser-checks.json',JSON.stringify({passed:true,cases:results,animatedModel:true,pausedFramesStopped:true,offscreenFramesStopped:true},null,2));console.log(`ML figures: ${results.length} viewport/theme cases PASS; keyboard, reduced motion, line ends, timed model PASS`);
}finally{await browser.close();}
