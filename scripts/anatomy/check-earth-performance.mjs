import {chromium} from 'playwright';
import {writeFileSync} from 'node:fs';
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage(),rows=[];
for(const [mode,course] of [['frame','geodesy'],['latitude','geodesy'],['phase','insar'],['chirp','insar'],['energy','remote-sensing']]){
 await page.goto(`http://127.0.0.1:8793/anatomy/earth-observation/${course}.html?mode=${mode}`);await page.waitForFunction(()=>window.earthFigure);
 const times=[];for(let i=0;i<3;i++)times.push(await page.evaluate(()=>{const e=document.querySelector('#controls input'),start=performance.now();e.value=Number(e.value)+Number(e.step);e.dispatchEvent(new Event('input'));return performance.now()-start;}));
 rows.push({mode,inputToDOMmilliseconds:times,median:times.sort((a,b)=>a-b)[1]});
}
await browser.close();writeFileSync('reports/anatomy-earth/performance-checks.json',JSON.stringify(rows,null,2));console.log(rows);
