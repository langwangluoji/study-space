import {chromium} from 'playwright';
const browser=await chromium.launch({headless:true,channel:'msedge'}),page=await browser.newPage({viewport:{width:720,height:1000},deviceScaleFactor:4,reducedMotion:'reduce'});
for(const theme of ['dark','light'])for(const [mode,course]of [['frame','geodesy'],['latitude','geodesy'],['midpoint','geodesy'],['energy','remote-sensing'],['phase','insar'],['terrain','insar']]){
 await page.goto(`http://127.0.0.1:8793/anatomy/earth-observation/${course}.html?mode=${mode}&theme=${theme}`);await page.waitForFunction(()=>window.earthFigure);
 await page.locator('#drawing').screenshot({path:`reports/anatomy-earth/${mode}-${theme}-4x.png`});
}
await browser.close();console.log('12 representative mechanism close-ups at 4x written');
