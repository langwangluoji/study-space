const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.json':'application/json','.png':'image/png','.svg':'image/svg+xml','.webp':'image/webp','.pdf':'application/pdf'};
const server=http.createServer((req,res)=>{const url=decodeURIComponent(new URL(req.url,'http://localhost').pathname);const file=path.resolve(root,url.slice(prefix.length)||'index.html');if(!url.startsWith(prefix)||!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404).end();return}res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res)});
async function run(){
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const base=`http://127.0.0.1:${server.address().port}${prefix}`;let browser;const checks=[],errors=[];
 try{
  browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});const page=await browser.newPage({viewport:{width:1440,height:960}});page.on('pageerror',e=>errors.push(e.message));
  await page.route('**/material-viewer/index.html*',r=>r.fulfill({status:200,contentType:'text/html',body:'<!doctype html><title>Reader entry inspection</title>'}));
  // The unified PDF.js reader and immutable archive bytes passed their separate
  // integration checks; this regression exercises navigation into that reader.
  const allResources=JSON.parse(fs.readFileSync('resources.config.json','utf8'));
  const space=JSON.parse(fs.readFileSync('study-space.config.json','utf8'));
  const names={ml:space.courses.find(c=>c.id==='ml').title+'资料',geodesy:'大地测量资料',insar:'InSAR 资料','remote-sensing':'遥感资料'};
  for(const course of space.courses){
   await page.goto(base+'resources.html?course='+course.id,{waitUntil:'networkidle'});
   const entries=allResources.filter(r=>r.course===course.id);
   assert.equal(await page.locator('.resource-card').count(),entries.length,course.id+' resource cards retained');
   assert.equal(await page.locator('.VPSidebarItem.level-0').count(),space.courses.length+1,'One resource group per course plus the resource hub');
   assert.equal(await page.getByRole('heading',{name:/ · 原资料$/}).count(),0,'No separate original-file libraries');
   const group=page.locator('.VPSidebarItem.level-0').filter({has:page.getByRole('heading',{name:names[course.id],exact:true})});
   assert.equal(await group.count(),1,course.id+' has exactly one library');
   if((await group.getAttribute('class')).includes('collapsed'))await group.locator(':scope > .item').press('Enter');
   const subgroups=group.locator('.VPSidebarItem.level-1.collapsible');
   for(let i=0;i<await subgroups.count();i++){const sub=subgroups.nth(i);if((await sub.getAttribute('class')).includes('collapsed'))await sub.locator(':scope > .item').click()}
   for(const resource of entries){const link=group.locator(`a[href$="${resource.preview}"]`);assert.equal(await link.count(),1,'Unique resource entry: '+resource.id);assert(await link.isVisible(),'Reachable resource entry: '+resource.id)}
   if(course.id==='ml'){
    assert.equal(await page.getByLabel('课程',{exact:true}).locator('option[value="ml"]').textContent(),'机器学习与遥感图像分析');
    for(let n=1;n<=15;n++)assert(entries.some(r=>r.id==='slide-'+n),'ML lecture retained: '+n);
   }
  }
  checks.push('four courses each own exactly one collapsible library; all 49 resources have a unique visible index entry, including ML lectures 1–15');
  const resources=allResources.filter(r=>r.course==='remote-sensing');
  await page.goto(base+'resources.html?course=remote-sensing',{waitUntil:'networkidle'});assert.equal(await page.locator('.resource-card').count(),15);assert.equal(await page.locator('.resource-card .availability.local').count(),0);
  const rootGroup=page.locator('.VPSidebarItem.level-0').filter({has:page.getByRole('heading',{name:'遥感资料',exact:true})});assert.equal(await rootGroup.count(),1);assert((await rootGroup.getAttribute('class')).includes('collapsed'));
  assert.equal(await page.getByRole('heading',{name:'遥感原理与基础 · 原资料',exact:true}).count(),0);
  await rootGroup.locator(':scope > .item').press('Enter');assert(!(await rootGroup.getAttribute('class')).includes('collapsed'));
  for(const title of ['课件与汇总','课程笔记与调研','参考教材'])await rootGroup.getByRole('button',{name:new RegExp('^'+title)}).first().click();
  for(const r of resources)assert(await rootGroup.locator(`a[href$="${r.preview}"]`).isVisible(),r.id);
  fs.mkdirSync('reports/screenshots',{recursive:true});await page.screenshot({path:'reports/screenshots/remote-resource-sidebar.png'});
  checks.push('one collapsible remote-sensing group with three subgroups and all 15 material links; keyboard expansion works');
  await page.getByLabel('获取方式',{exact:true}).selectOption('download');assert.equal(await page.locator('.resource-card').count(),15);
  for(const id of ['rs-zhao-analysis','rs-campbell-introduction']){const r=resources.find(item=>item.id===id);assert(r?.reader==='archive'&&r.archiveId===id,'Textbook original reader restored: '+id);const card=page.locator('.resource-card').filter({has:page.getByRole('heading',{name:r.title,exact:true})});assert.equal(await card.locator('a[href="'+r.accessUrl+'"]').count(),1,'Supplemental publisher link remains visible: '+id);assert.equal(await card.getByRole('link',{name:'下载 PDF：'+r.title,exact:true}).count(),1,'Textbook original download remains visible: '+id)}
  checks.push('all 15 remote-sensing materials retain downloads; the two textbook originals and supplemental publisher links are visible');
  for(const r of resources){await page.goto(base+r.preview.slice(1),{waitUntil:'domcontentloaded'});await page.locator('.vp-doc h1').waitFor();assert((await page.locator('.vp-doc h1').innerText()).includes(r.title));assert((await page.locator('.page-context').innerText()).includes('资料中心'));assert.equal(await page.getByRole('heading',{name:'遥感资料',exact:true}).count(),1);if(r.reader==='archive'){await page.locator('iframe').waitFor({state:'attached'});assert((await page.locator('iframe').getAttribute('src')).includes('id='+r.archiveId))}if(r.reader==='publisher'){assert.equal(await page.locator('iframe').count(),0);assert(await page.locator(`a[href="${r.accessUrl}"]`).count()>0)}}
  checks.push('all 15 entries retain resource navigation and correctly enter the unified archive reader or public PDF; publisher links are supplemental');
  await page.goto(base+'material-rs-ch3.html#page=120',{waitUntil:'domcontentloaded'});await page.waitForFunction(()=>document.querySelector('iframe')?.src.endsWith('#page=120'));
  await page.goto(base+'remote-sensing-ch4.html#rs4-scanning',{waitUntil:'domcontentloaded'});const sourceLink=page.locator('#rs-figure-pushbroom a[href*="material-rs-ch4"]');assert((await sourceLink.getAttribute('href')).includes('#page='));
  checks.push('original PDF page hashes and lecture-figure source links are preserved');
  await page.goto(base+'insar-sources.html',{waitUntil:'domcontentloaded'});
  assert((await page.locator('.page-context').innerText()).includes('资料中心'));
  assert.equal(await page.locator('.VPSidebarItem.level-0').count(),5);
  await page.goto(base+'course-ml.html',{waitUntil:'domcontentloaded'});
  assert((await page.locator('.vp-doc h1').innerText()).includes('机器学习与遥感图像分析'));
  assert((await page.locator('.page-context').innerText()).includes('机器学习与遥感图像分析'));
  checks.push('InSAR source index uses the unified resource navigation; ML course title and breadcrumb use the combined course name');
  for(const width of [390,320]){await page.setViewportSize({width,height:844});await page.goto(base+'resources.html?course=remote-sensing',{waitUntil:'domcontentloaded'});assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth));await page.locator('.VPLocalNav .menu').click();assert(await page.getByRole('heading',{name:'遥感资料',exact:true}).isVisible())}
  checks.push('resource cards and sidebar fit 390px and 320px phone screens');
  assert.deepEqual(errors,[]);fs.writeFileSync('reports/remote-resource-navigation.json',JSON.stringify({status:'PASS',checks,errors,scope:'navigation regression; unified PDF.js rendering and original bytes are verified separately'},null,2)+'\n');console.log('Remote resource navigation PASS:',checks.length,'checks');
 }catch(error){fs.writeFileSync('reports/remote-resource-navigation.json',JSON.stringify({status:'FAIL',checks,error:error.message},null,2)+'\n');throw error}
 finally{await browser?.close();server.close()}
}
run().catch(e=>{console.error(e);process.exitCode=1});
