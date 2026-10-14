const fs=require('node:fs'),crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const base='https://langwangluoji.github.io/study-space/';
const records=JSON.parse(fs.readFileSync('public/materials/catalog.json','utf8'));
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const report={status:'RUNNING',base,checkedAt:new Date().toISOString(),readers:[],downloads:[],errors:[]};
let browser;
async function ready(frame,page){await frame.waitForFunction(n=>document.querySelector('#canvas')?.dataset.page===String(n)&&document.body.dataset.ready==='true'&&/^第 /.test(document.querySelector('#status')?.textContent),page,{timeout:180000})}
async function run(){
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{}),...(process.env.ALL_PROXY?{proxy:{server:process.env.ALL_PROXY}}:{})});
 const context=await browser.newContext(),page=await context.newPage({viewport:{width:1360,height:1000}});
 const observe=p=>{p.on('pageerror',e=>report.errors.push(e.message));p.on('response',r=>{if(r.status()>=400)report.errors.push(`HTTP ${r.status()} ${r.url()}`)})};context.on('page',observe);observe(page);
 const catalogResponse=await page.request.get(base+'materials/catalog.json');assert.equal(catalogResponse.status(),200);const remote=await catalogResponse.json();assert.deepEqual(remote,records);
 await page.goto(base+'resources.html',{waitUntil:'networkidle',timeout:120000});await page.getByLabel('获取方式',{exact:true}).selectOption('download');
 for(const [course,count] of [['ml',21],['geodesy',6],['insar',5],['remote-sensing',15]]){await page.getByLabel('课程',{exact:true}).selectOption(course);assert.equal(await page.locator('.resource-card').count(),count,course+' online downloadable resources')}
 for(const [id,number] of [['insar-book',34],['slide-11',29],['geo-s4',5],['rs-english-summary',20]]){
  await page.goto(base+'material-viewer/index.html?id='+id+'#page='+number,{waitUntil:'domcontentloaded',timeout:120000});await ready(page,number);assert.equal(await page.locator('#total').textContent(),'/ '+records.find(r=>r.id===id).preview.pages);report.readers.push({id,page:number,status:await page.locator('#status').textContent()});
 }
 await page.goto(base+'book-leedl.html#page=163',{waitUntil:'domcontentloaded',timeout:120000});
 await page.locator('.material-reader iframe').scrollIntoViewIfNeeded();
 const iframe=page.frameLocator('.material-reader iframe');await iframe.locator('#canvas[data-page="163"]').waitFor({timeout:180000});report.readers.push({id:'leedl',page:163,embedded:true});
 await page.evaluate(()=>{location.hash='#page=200'});await iframe.locator('#canvas[data-page="200"]').waitFor({timeout:180000});report.readers.push({id:'leedl',page:200,embedded:true,parentHashChanged:true});
 for(const id of ['rs-zhao-analysis','rs-campbell-introduction']){
  await page.goto(base+'material-'+id+'.html#page=4',{waitUntil:'domcontentloaded',timeout:120000});await page.locator('.material-reader iframe').scrollIntoViewIfNeeded();await page.frameLocator('.material-reader iframe').locator('#canvas[data-page="4"]').waitFor({timeout:180000});report.readers.push({id,page:4,embedded:true});
 }
 // Exercise actual remote streaming, not mocked archive routes.
 const original=records.find(r=>r.id==='slide-11').original;await page.goto(base+'material-viewer/index.html?id=slide-11',{waitUntil:'domcontentloaded',timeout:120000});await ready(page,1);
 const pending=page.waitForEvent('download',{timeout:180000});await page.locator('#download').click();const download=await pending;assert.equal(await download.failure(),null);assert.equal(download.suggestedFilename(),original.filename);const bytes=fs.readFileSync(await download.path());assert.equal(bytes.length,original.bytes);assert.equal(hash(bytes),original.sha256);report.downloads.push({id:'slide-11',filename:original.filename,bytes:bytes.length,sha256:original.sha256});
 await page.setViewportSize({width:390,height:844});await page.goto(base+'material-viewer/index.html?id=insar-l3&theme=dark#page=12',{waitUntil:'domcontentloaded',timeout:120000});await ready(page,12);assert(await page.locator('body').evaluate(b=>b.classList.contains('dark')));assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));
 fs.mkdirSync('reports/materials-screenshots',{recursive:true});await page.screenshot({path:'reports/materials-screenshots/production-phone-insar.png'});
 assert.deepEqual(report.errors,[]);report.status='PASS';console.log('Production originals PASS:',report.readers.length,'readers, Chinese PPTX byte-exact download and phone');
}
run().catch(e=>{report.status='FAIL';report.error=e.message;console.error(e);process.exitCode=1}).finally(async()=>{await browser?.close();fs.writeFileSync('reports/materials-production.json',JSON.stringify(report,null,2)+'\n')});
