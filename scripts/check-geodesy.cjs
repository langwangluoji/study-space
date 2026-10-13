const {chromium}=require('playwright');
const assert=require('node:assert/strict');
const fs=require('node:fs');
const base=process.argv[2]||'http://127.0.0.1:4175/study-space/';
(async()=>{
 const chapters=JSON.parse(fs.readFileSync('geodesy.config.json','utf8'));
 assert.equal(chapters.length,2);assert.deepEqual(chapters.map(c=>c.topics.length),[4,6]);
 const slugs=['course-geodesy',...chapters.flatMap(c=>[c.slug,...c.topics.map(t=>t.slug)]),'geodesy-rotation','geodesy-orbit','geodesy-projection','geodesy-control','geodesy-height','geodesy-sources','geodesy-plan'];
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:process.platform==='win32'?{channel:'msedge'}:{})});
 const page=await browser.newPage({viewport:{width:1440,height:1000}});
 const failures=[],checks=[];
 page.on('pageerror',e=>failures.push(e.message));page.on('response',r=>{if(r.status()>=400)failures.push(r.status()+' '+r.url())});
 try{
  for(const slug of slugs){
   const r=await page.goto(base+slug+'.html',{waitUntil:'networkidle'});assert.equal(r.status(),200);
   const sidebar=await page.locator('.VPSidebar').innerText();if(slug==='geodesy-sources')assert(sidebar.includes('全部资源'));else assert(sidebar.includes('第一章 大地测量绪论')&&sidebar.includes('第二章 椭球面数学性质'));assert(!sidebar.includes('第八单元'));
   assert.equal(await page.locator('mjx-merror,[data-mjx-error]').count(),0);
   await page.locator('.vp-doc img[loading=lazy]').evaluateAll(imgs=>imgs.forEach(i=>i.loading='eager'));
   await page.waitForFunction(()=>[...document.querySelectorAll('.vp-doc img')].every(i=>i.complete&&i.naturalWidth>0));
  }
  checks.push(slugs.length+' pages, two main chapters, 4+6 topic routes, formula rendering and source images');
  const coverage=JSON.parse(fs.readFileSync('public/geodesy/coverage.json','utf8'));
  assert.equal(coverage.entries.length,89);
  assert.equal(new Set(coverage.entries.map(e=>e.source+':'+e.file_page)).size,89);
  assert.equal(coverage.entries.filter(e=>e.status==='excluded').length,2);
  await page.goto(base+'geodesy-normal-curvature.html',{waitUntil:'networkidle'});
  const proof=page.locator('#normal-section-coordinate-proof');
  assert.equal(await proof.evaluate(el=>el.closest('details').open),false);
  await page.locator('details summary').filter({hasText:'坐标变换'}).click();
  assert(await proof.isVisible());
  await page.goto(base+'geodesy-normal-curvature.html#normal-section-coordinate-proof',{waitUntil:'networkidle'});
  assert(await proof.evaluate(el=>el.closest('details').open));
  await page.goto(base+'geodesy-math.html#first-fundamental-form',{waitUntil:'networkidle'});
  assert(await page.locator('#first-fundamental-form').isVisible());
  await page.goto(base+'geodesy-metric.html#first-fundamental-form',{waitUntil:'networkidle'});
  assert(await page.locator('#first-fundamental-form').isVisible());
  for(const [slug,file] of [['geodesy-intro-frames','frame-chain.svg'],['geodesy-intro-gravity','height-reference.svg'],['geodesy-normal-curvature','local-curvature.svg']]){
   await page.goto(base+slug+'.html',{waitUntil:'networkidle'});
   const fig=page.locator('.source-figure').filter({has:page.locator('img[src$="'+file+'"]')});
   const caption=await fig.locator('figcaption').innerText();assert(caption.includes('本站绘制')&&!caption.includes('PDF 文件页'));
   await fig.locator('.figure-open').click();assert(await fig.locator('dialog').isVisible());await page.keyboard.press('Escape');
  }
  await page.goto(base+'geodesy-normal-curvature.html',{waitUntil:'networkidle'});
  await page.keyboard.press('Control+k');await page.locator('input[type=search]').fill('从局部截面方程核对Euler公式');
  await page.locator('.VPLocalSearchBox a[href*="normal-section-coordinate-proof"]').first().click();
  await page.waitForFunction(()=>document.getElementById('normal-section-coordinate-proof')?.closest('details')?.open);
  checks.push('89 source-page decisions, original SVG captions/modals, moved metric anchors and searchable folded coordinate proof');

  const reading=[{slug:'course-geodesy',title:'大地测量课程总览'},...chapters.flatMap(c=>[{slug:c.slug,title:c.title},...c.topics])];
  for(const [i,item] of reading.entries()){
   await page.goto(base+item.slug+'.html',{waitUntil:'networkidle'});
   for(const [direction,neighbor] of [['prev',reading[i-1]],['next',reading[i+1]]]){
    const button=page.locator('.VPDocFooter .pager-link.'+direction);
    if(!neighbor){assert.equal(await button.count(),0);continue}
    assert.equal(await button.locator('.title').innerText(),neighbor.title);
    const url=new URL(await button.getAttribute('href'),base);
    assert.equal(url.pathname,new URL(neighbor.slug+'.html',base).pathname);
   }
  }
  await page.goto(base+'course-geodesy.html',{waitUntil:'networkidle'});
  await page.locator('.VPDocFooter .pager-link.next').click();await page.waitForURL('**/geodesy-intro.html');
  checks.push('all 13 main reading pages: correct pager titles, destinations, boundaries and next click');

  await page.goto(base+'geodesy-local-directions.html',{waitUntil:'networkidle'});
  const inputs=page.locator('.geodesy-lab input');
  await inputs.nth(0).fill('0');assert((await page.locator('.geodesy-results').innerText()).includes('6378137.000'));
  await inputs.nth(0).fill('90');assert((await page.locator('.geodesy-results').innerText()).includes('6356752.314'));
  await inputs.nth(0).fill('91');assert(await page.locator('.geodesy-lab [role=alert]').count());
  await inputs.nth(0).fill('');assert(await page.locator('.geodesy-lab [role=alert]').count());await inputs.nth(0).fill('45');
  const mark=page.getByLabel('已读 GE-LOCAL',{exact:true});await mark.check();await page.reload();assert(await mark.isChecked());
  checks.push('coordinate boundaries, empty input and persisted learning mark');
  await page.goto(base+'geodesy-rotation.html',{waitUntil:'networkidle'});
  assert((await page.locator('.geodesy-lab').innerText()).includes('(0.000, 1.000, 0)'));
  const slider=page.locator('input[type=range]');await slider.focus();await page.keyboard.press('ArrowLeft');assert.equal(await slider.inputValue(),'89');
  checks.push('active/passive rotation and keyboard control');

  await page.goto(base+'geodesy-ellipsoid-coordinates.html',{waitUntil:'networkidle'});
  const firstFigure=page.locator('.figure-open').first();await firstFigure.focus();await page.keyboard.press('Enter');
  assert.equal(await page.locator('.figure-dialog[open]').count(),1);assert((await page.locator('.figure-dialog[open]').innerText()).includes('文件页 13'));
  await page.keyboard.press('Escape');assert.equal(await page.locator('.figure-dialog[open]').count(),0);assert(await firstFigure.evaluate(e=>e===document.activeElement));
  await firstFigure.click();await page.getByRole('button',{name:'关闭配图',exact:true}).first().click();assert.equal(await page.locator('.figure-dialog[open]').count(),0);
  checks.push('figure enlargement, provenance, Escape, close button and focus restoration');
  await page.keyboard.press('Control+k');await page.locator('input[type=search]').fill('Meusnier');
  await page.locator('.VPLocalSearchBox a[href*="geodesy-normal-curvature"]').first().waitFor();await page.keyboard.press('Escape');
  checks.push('theorem cross-page search');

  for(const theme of ['light','dark']){
   await page.addInitScript(t=>localStorage.setItem('vitepress-theme-appearance',t),theme);
   for(const width of [320,390]){
    await page.setViewportSize({width,height:844});
    for(const slug of ['course-geodesy','geodesy-intro-observations',...chapters[1].topics.map(t=>t.slug)]){
     await page.goto(base+slug+'.html',{waitUntil:'networkidle'});
     assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),width+'px overflow on '+slug);
    }
    await page.goto(base+'geodesy-ellipsoid-coordinates.html',{waitUntil:'networkidle'});await page.locator('.figure-open').first().click();
    assert(await page.evaluate(()=>document.querySelector('dialog[open]').getBoundingClientRect().width<=innerWidth));
    await page.keyboard.press('Escape');
   }
  }
  checks.push('320px/390px light/dark topics, formulas and image dialog');
  fs.mkdirSync('reports/screenshots',{recursive:true});
  await page.setViewportSize({width:1440,height:1000});
  await page.goto(base+'course-geodesy.html',{waitUntil:'networkidle'});await page.screenshot({path:'reports/screenshots/geodesy-overview.png'});
  await page.goto(base+'geodesy-normal-curvature.html',{waitUntil:'networkidle'});await page.screenshot({path:'reports/screenshots/geodesy-proof.png'});
  await page.goto(base+'geodesy-ellipsoid-coordinates.html',{waitUntil:'networkidle'});await page.locator('.source-figure').first().scrollIntoViewIfNeeded();await page.locator('.source-figure').first().screenshot({path:'reports/screenshots/geodesy-source-figure.png'});
  await page.setViewportSize({width:390,height:844});await page.goto(base+'geodesy-local-directions.html',{waitUntil:'networkidle'});await page.locator('.geodesy-lab').screenshot({path:'reports/screenshots/geodesy-mobile.png'});
  for(const [slug,anchor] of [['geodesy-intro','g1-frame'],['geodesy-ellipsoid','g3-ecef'],['geodesy-rotation','g4-enu'],['geodesy-orbit','g8-frames']]){
   await page.goto(base+slug+'.html#'+anchor,{waitUntil:'networkidle'});assert(await page.locator('#'+anchor).count());
  }
  checks.push('legacy chapter and auxiliary anchors preserved');
  await page.goto(base,{waitUntil:'networkidle'});assert.equal(await page.locator('.hub-course').count(),JSON.parse(fs.readFileSync('study-space.config.json','utf8')).courses.length);
  await page.goto(base+'lecture-3.html',{waitUntil:'networkidle'});assert((await page.locator('.VPSidebar').innerText()).includes('机器学习'));assert(await page.locator('mjx-container').count()>0);
  checks.push('ML homepage/sidebar/formula regression');
  assert.deepEqual(failures,[]);
  const report={status:'PASS',pages:slugs.length,checks,errors:failures};fs.writeFileSync('reports/geodesy-browser.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report));
 }finally{await browser.close()}
})().catch(e=>{console.error(e);process.exitCode=1});
