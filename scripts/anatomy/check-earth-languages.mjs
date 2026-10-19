import assert from 'node:assert/strict';
import {writeFileSync} from 'node:fs';
import {chromium} from 'playwright';
import {english} from './earth-observation/english.mjs';
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({viewport:{width:390,height:1000},reducedMotion:'reduce'}),rows=[];
for(const lang of ['en','both'])for(const mode of Object.keys(english)){
 await page.goto(`http://127.0.0.1:8793/anatomy/earth-observation/${mode==='terrain'?'insar':'remote-sensing'}.html?mode=${mode}&theme=light&lang=${lang}`);await page.waitForFunction(()=>window.earthFigure);
 const title=await page.locator('#title').textContent(),labels=await page.locator('#controls label span').allTextContents(),note=await page.locator('#caption').textContent();
 assert.ok(title.includes(english[mode].title));assert.ok(note.includes(english[mode].note));assert.deepEqual(labels,english[mode].labels.map((en,i)=>lang==='en'?en:labels[i]));
 if(lang==='en')assert.ok(!/[\u4e00-\u9fff]/.test([title,note,await page.locator('#readout').textContent(),...labels].join(' ')),mode+' English text');
 assert.ok(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 await page.screenshot({path:`reports/anatomy-earth/${mode}-${lang}-phone.png`,fullPage:true});rows.push({mode,lang,title,labels,pass:true});
}
await browser.close();writeFileSync('reports/anatomy-earth/language-checks.json',JSON.stringify(rows,null,2));console.log('14 English/bilingual mode checks passed');
