const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict'),crypto=require('node:crypto');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(!pathname.startsWith(prefix)){res.writeHead(404).end();return}
 let file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return}
 if(!fs.existsSync(file)){res.writeHead(404).end();return}
 const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
async function run(){
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`,base=origin+prefix;
 let browser;const checks=[],errors=[];fs.mkdirSync('reports/screenshots',{recursive:true});
 try{
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`${r.status()} ${r.url()}`)});
 await page.goto(base+'course-insar.html',{waitUntil:'networkidle'});
 assert((await page.locator('.VPSidebar').innerText()).includes('第一章 · 微波遥感基础'));
 assert(!(await page.locator('.VPSidebar').innerText()).includes('Fisher'));
 assert((await page.locator('.page-context').innerText()).includes('InSAR'));
 await page.screenshot({path:'reports/screenshots/insar-overview.png'});checks.push('dedicated course sidebar and page context');
 await page.goto(base+'insar-imaging.html#i2-ground-range',{waitUntil:'networkidle'});await page.screenshot({path:'reports/screenshots/insar-formula-desktop.png'});
 await page.goto(base+'insar-imaging.html#i2-range-history',{waitUntil:'networkidle'});await page.screenshot({path:'reports/screenshots/insar-illustrated-formula.png'});
 for(const slug of ['insar-microwave','insar-imaging','insar-interpretation']){
  await page.goto(base+slug+'.html',{waitUntil:'networkidle'});
  const figures=page.locator('.source-figure .figure-open');
  for(let i=0;i<await figures.count();i++){
   await figures.nth(i).click();const dlg=page.locator('dialog[open]');assert.equal(await dlg.count(),1);
   await dlg.locator('img').evaluate(im=>im.loading='eager');await dlg.locator('img').evaluate(im=>im.complete?Promise.resolve():new Promise(r=>im.onload=r));
   assert(await dlg.locator('img').evaluate(im=>im.naturalWidth>0));await dlg.getByRole('button',{name:'关闭配图',exact:true}).click();assert.equal(await page.locator('dialog[open]').count(),0);
  }
  checks.push(slug+' all figures open and close');
 }
 const figures=JSON.parse(fs.readFileSync('public/insar/figures/manifest.json','utf8'));
 for(const f of figures){const response=await page.request.get(base+'insar/figures/'+f.file);assert.equal(response.status(),200);assert.equal(crypto.createHash('sha256').update(await response.body()).digest('hex'),f.sha256)}
 checks.push('all figure bytes match provenance manifest');
 for(const f of figures.filter(f=>f.file.endsWith('.svg'))){
  await page.goto(base+'insar/figures/'+f.file,{waitUntil:'networkidle'});
  const clipped=await page.evaluate(()=>{const s=document.querySelector('svg'),v=s.viewBox.baseVal;return [...s.querySelectorAll('text')].filter(t=>{const b=t.getBBox();return b.x<v.x-1||b.y<v.y-1||b.x+b.width>v.x+v.width+1||b.y+b.height>v.y+v.height+1}).map(t=>t.textContent)});
  assert.deepEqual(clipped,[],f.file+' clipped labels');
 }
 checks.push('SVG text bounding boxes remain within viewBox');
 await page.goto(base+'resources.html#insar',{waitUntil:'networkidle'});
 assert.equal(await page.getByLabel('课程',{exact:true}).inputValue(),'insar');assert.equal(await page.locator('.resource-card').count(),5);
 assert.equal(await page.locator('.resource-card a[aria-label^="下载 "]').count(),5);await page.getByLabel('获取方式',{exact:true}).selectOption('download');assert.equal(await page.locator('.resource-card').count(),5);
 const downloadEvent=page.waitForEvent('download');await page.getByRole('link',{name:'下载 ZIP：InSAR 前三章 · 离线讲义与配图',exact:true}).click();const download=await downloadEvent;assert.equal(download.suggestedFilename(),'insar-first-three-chapters.zip');
 const bytes=await page.request.get(base+'insar/downloads/insar-first-three-chapters.zip');assert.equal(crypto.createHash('sha256').update(await bytes.body()).digest('hex'),crypto.createHash('sha256').update(fs.readFileSync('public/insar/downloads/insar-first-three-chapters.zip')).digest('hex'));
 checks.push('InSAR filter, four readable downloadable originals and actual matching ZIP download');
 await page.goto(base+'course-insar.html',{waitUntil:'networkidle'});await page.getByRole('button',{name:'搜索课程笔记',exact:true}).click();await page.locator('input[type=search]').fill('相干斑');
 const result=page.locator('.VPLocalSearchBox a[href*="insar-interpretation.html"]').first();await result.waitFor();await result.click();await page.waitForURL('**/insar-interpretation.html*');checks.push('Chinese search retrieves InSAR chapter');
 await page.goto(base+'insar-imaging.html#i2-example-bandwidth',{waitUntil:'networkidle'});assert(await page.locator('#i2-example-bandwidth').evaluate(el=>el.closest('details').open));await page.goto(base,{waitUntil:'networkidle'});assert((await page.locator('.continue-reading').getAttribute('href')).includes('insar-imaging.html#i2-example-bandwidth'));checks.push('deep extra anchor expands and continue-reading preserves it');
 await page.setViewportSize({width:390,height:900});await page.goto(base+'insar-imaging.html#i2-ground-range',{waitUntil:'networkidle'});await page.screenshot({path:'reports/screenshots/insar-formula-mobile.png'});
 await page.locator('.VPLocalNav .menu').click();assert((await page.locator('.VPSidebar').innerText()).includes('SAR 图像特征'));await page.locator('.VPBackdrop').click({position:{x:378,y:100}});checks.push('mobile dedicated course menu');
 assert.deepEqual(errors,[]);fs.writeFileSync('reports/insar-ui-verification.json',JSON.stringify({status:'PASS',checks,runtimeErrors:errors},null,2)+'\n');console.log('InSAR UI PASS:',checks.length,'checks');
 }finally{await browser?.close();server.close()}
}
run().catch(e=>{console.error(e);fs.writeFileSync('reports/insar-ui-verification.json',JSON.stringify({status:'FAIL',error:e.message},null,2)+'\n');server.close();process.exitCode=1});
