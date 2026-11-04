import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
import {expect} from 'playwright/test';

const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(!pathname.startsWith(prefix)){res.writeHead(404).end();return;}
 const file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base=`http://127.0.0.1:${server.address().port}${prefix}`;
const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:process.platform==='win32'?{channel:'msedge'}:{})});
const cases=[],errors=[];
try{
 const page=await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
 const traffic=JSON.parse(fs.readFileSync('traffic.config.json','utf8'));
 for(const endpoint of [traffic.endpoint,traffic.historyUrl])await page.route(endpoint,r=>r.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({success:true,data:{page_pv:0,page_uv:0},version:1,startDate:traffic.startDate,timeZone:traffic.timeZone,days:[],errors:[]})}));
 page.on('pageerror',e=>errors.push(e.message));
 const data=JSON.parse(fs.readFileSync('reports/geodesy-figures.json','utf8'));
 for(const {slug}of data.topicFigures){
  await page.goto(base+slug+'.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
  const images=page.locator('.vp-doc img:visible');
  const embeds=page.locator('.vp-doc iframe');
  assert(await images.count()>0||await embeds.count()>0,slug+' missing rendered figure');
  if(await images.count()===0)await embeds.first().contentFrame().locator('svg').waitFor();
  for(const image of await images.all()){
   await image.scrollIntoViewIfNeeded();
   await expect.poll(()=>image.evaluate(i=>i.complete&&i.naturalWidth>0)).toBeTruthy();
  }
  assert.equal(await page.locator('mjx-merror,[data-mjx-error]').count(),0,slug+' formula rendering');
  cases.push({slug,images:await images.count(),embeds:await embeds.count()});
 }
 const representatives=['coordinate-forward','coordinate-differentials','ellipsoid-parameter-change','frame-rotation','local-polar','seven-parameters','pivot-models','parameter-estimation','gauss-solution','orbit-gravity','orbit-earth-motion','rotation'];
 fs.mkdirSync('reports/screenshots',{recursive:true});
 for(const topic of representatives){
  await page.goto(base+'geodesy-'+topic+'.html',{waitUntil:'domcontentloaded'});
  await page.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
  const figure=page.locator('.source-figure').first();await figure.scrollIntoViewIfNeeded();
  const caption=figure.locator('figcaption');assert((await caption.innerText()).length>25);
  for(const width of [1440,390,320])for(const theme of ['light','dark']){
   await page.setViewportSize({width,height:width===1440?1000:844});
   await page.evaluate(t=>document.documentElement.classList.toggle('dark',t==='dark'),theme);
   await figure.scrollIntoViewIfNeeded();
   assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),topic+': outer overflow '+width);
   const button=figure.locator('.figure-open');await button.focus();await page.keyboard.press('Enter');
   const dialog=figure.locator('dialog');await expect(dialog).toBeVisible();
   await expect(dialog.locator('img')).toHaveJSProperty('complete',true);
   await page.keyboard.press('Escape');await expect(dialog).not.toBeVisible();
   if(['coordinate-differentials','frame-rotation','orbit-earth-motion'].includes(topic)&&((width===1440&&theme==='light')||(width===320&&theme==='dark')))
    await page.screenshot({path:`reports/screenshots/geodesy-figure-${topic}-${width}-${theme}.png`});
  }
  if(topic==='orbit-earth-motion'){
   const source=page.locator('.source-figure').filter({has:page.locator('.figure-open img[src$="source-polar-motion-2001-2005.png"]')});
   await source.locator('.figure-open').click();await expect(source.locator('dialog')).toContainText('幻灯片 40');
   assert(!(await source.locator('dialog').innerText()).includes('PDF 文件页'));await page.keyboard.press('Escape');
  }
 }
 // Old automatic deep links still identify headings inside the advanced fold.
 for(const [slug,label,oldId]of [['geodesy-local-polar','旋转向量为什么比普通向量多一个符号','旋转向量为什么比普通向量多一个符号'],['geodesy-pivot-models','范士 Veis：用参考点的局部轴表达旋转','范士-veis-用参考点的局部轴表达旋转']]){
  await page.goto(base+slug+'.html',{waitUntil:'domcontentloaded'});
  const heading=page.locator('h2').filter({hasText:label});assert.equal(await heading.count(),1);
  const id=await heading.getAttribute('id');assert.equal(id,oldId,'old automatic anchor changed');
  await page.goto(base+slug+'.html#'+encodeURIComponent(oldId),{waitUntil:'domcontentloaded'});
  assert.equal(await page.locator('h2').filter({hasText:label}).count(),1);
  await expect(page.locator('h2').filter({hasText:label})).toBeVisible();
 }
 assert.deepEqual(errors,[]);
 const report={status:'PASS',topicPages:cases.length,imageCases:cases,representativePages:representatives.length,viewportThemeDialogCases:representatives.length*6,widths:[1440,390,320],themes:['light','dark'],keyboardDialog:true,slideLocator:true,oldFoldedAnchors:true,errors};
 fs.writeFileSync('reports/geodesy-figure-browser.json',JSON.stringify(report,null,2)+'\n');
 console.log('PASS 31 topic images; 72 viewport/theme/keyboard-dialog cases; slide locator and old folded anchors');
}finally{await browser.close();server.close();}
