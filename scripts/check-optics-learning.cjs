const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.png':'image/png','.json':'application/json'};
const server=http.createServer((req,res)=>{
 let name;try{name=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 let file=path.resolve(root,name.startsWith(prefix)?name.slice(prefix.length):'__missing__');
 if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
 if(!file.startsWith(root+path.sep)||!fs.existsSync(file)){res.writeHead(404).end();return}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
(async()=>{
 let base=process.argv[2];if(!base){await new Promise(r=>server.listen(0,'127.0.0.1',r));base=`http://127.0.0.1:${server.address().port}${prefix}`}
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
 const errors=[],cases=[],checks=[];const out=process.env.OPTICS_QA_DIR||'reports/screenshots';fs.mkdirSync(out,{recursive:true});
 try{
  const p=await browser.newPage({reducedMotion:'reduce'}),traffic=JSON.parse(fs.readFileSync('traffic.config.json','utf8'));
  for(const url of [traffic.endpoint,traffic.historyUrl])await p.context().route(url,r=>r.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({success:true,data:{page_pv:0,page_uv:0},version:1,days:[],errors:[]})}));
  p.on('pageerror',e=>errors.push(e.message));
  await p.addInitScript(()=>{if(top===window){const theme=new URLSearchParams(location.search).get('__optics_theme');if(theme)localStorage.setItem('vitepress-theme-appearance',theme)}});
  const legacyChapters=['optics-waves','optics-incoherent','optics-laser','optics-propagation','optics-propagation-ii'];
  const numbered=fs.existsSync('optics.config.json');
  const chapters=[...legacyChapters,...(numbered?['optics-ch02-s01','optics-ch06-s03','optics-ch09-s01','optics-ch09-s02','optics-ch09-s05','optics-ch09-review']:[])];
  for(const width of [390,1024,1440])for(const theme of ['light','dark'])for(const slug of ['course-optics','optics-learning',...chapters]){
   await p.setViewportSize({width,height:960});await p.goto(base+slug+'.html?__optics_theme='+theme,{waitUntil:'domcontentloaded'});
   await p.waitForFunction(()=>document.getElementById('app')?.__vue_app__);await p.evaluate(()=>document.fonts.ready);
   await p.waitForFunction(t=>document.documentElement.classList.contains('dark')===(t==='dark'),theme);
   await p.locator('.vp-doc img').evaluateAll(items=>items.forEach(x=>x.loading='eager'));
   await p.waitForFunction(()=>[...document.querySelectorAll('.vp-doc img')].every(x=>x.complete&&x.naturalWidth>0));
   assert.equal(await p.locator('.vp-doc details[open]').count(),0,slug+' default fold');
   const first=p.locator('.vp-doc details.optics-derivation').filter({has:p.locator('mjx-container')}).first();
   if(await first.count()){
    await first.locator('summary').click();assert(await first.evaluate(x=>x.open));
    assert(await first.locator('mjx-container').count()>0,slug+' folded maths rendered');
    await first.locator('summary').click();assert(!(await first.evaluate(x=>x.open)));
   }
   const report=await p.evaluate(()=>({width:innerWidth,scroll:document.documentElement.scrollWidth,mathErrors:document.querySelectorAll('mjx-merror,[data-mjx-error],merror').length,hiddenHeadings:[...document.querySelectorAll('.vp-doc h1,.vp-doc h2,.vp-doc h3,.vp-doc h4')].filter(h=>h.closest('details')).length,images:document.querySelectorAll('.vp-doc img').length}));
   assert(report.scroll<=width+1,slug+' overflow '+report.scroll);assert.equal(report.mathErrors,0,slug+' maths');assert.equal(report.hiddenHeadings,0,slug+' headings');cases.push({slug,theme,...report});
   if(slug==='optics-propagation-ii')console.log('Optics UI',width,theme,'PASS');
   if(slug==='optics-laser'&&width===1440&&theme==='light'){
    await p.locator('#_4-1-光强往返一次-阈值逐步推导').scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'optics-selfstudy-laser.png')});
   }
   if(slug==='optics-propagation-ii'&&width===390&&theme==='light'){
    await p.locator('.vp-doc img').nth(3).scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'optics-selfstudy-mobile.png')});
   }
   if(numbered&&slug==='optics-ch09-s01'&&width===1440&&theme==='light'){
    await p.locator('.vp-doc img').first().scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'optics-interface-fresnel-desktop.png')});
   }
   if(numbered&&slug==='optics-ch09-s05'&&width===390&&theme==='light'){
    await p.locator('.vp-doc img').first().scrollIntoViewIfNeeded();await p.screenshot({path:path.join(out,'optics-polarization-test-mobile.png')});
   }
  }
  const legacy=JSON.parse(fs.readFileSync('optics-legacy-anchors.json','utf8'));let legacyCount=0;
  for(const [slug,ids] of Object.entries(legacy)){
   await p.goto(base+slug+'.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
   const result=await p.evaluate(ids=>ids.map(id=>{const els=[...document.querySelectorAll('[id]')].filter(e=>e.id===id);return {id,count:els.length,closed:!!els[0]?.closest('details:not([open])')}}),ids);
   for(const r of result){assert.equal(r.count,1,slug+' '+r.id);if(chapters.includes(slug))assert(!r.closed,slug+' hidden legacy '+r.id)}legacyCount+=ids.length;
  }
  const map=JSON.parse(fs.readFileSync('optics-learning-source-map.json','utf8'));
  for(const chapter of map.chapters){
   const item=chapter.pages.at(-1);await p.goto(base+item.learningUrl,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
   const anchor=p.locator('[id="'+item.learningAnchor+'"]');assert.equal(await anchor.count(),1);assert(!(await anchor.evaluate(e=>!!e.closest('details:not([open])'))));
  }
  if(numbered){
   await p.setViewportSize({width:1440,height:960});await p.goto(base+'optics-learning.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
   const tree=p.locator('#folio-desktop-directory');assert.equal(await tree.locator('summary').filter({hasText:/^第[1-9]章 /}).count(),9);
   await tree.locator('summary').filter({hasText:/^第9章 /}).click();await tree.locator('a').filter({hasText:/^9\.2 /}).click();await p.waitForFunction(()=>document.querySelector('.vp-doc h1')?.textContent.includes('9.2'));
   checks.push('nine chapter tree and independent 9.2 navigation');
   for(const [id,subject] of [['_1-激光器的三要素是什么-分别起什么作用','激光三要素'],['_12-sase-与种子自由电子激光有什么区别','FEL'],['_19-什么是黑体-黑体为什么也会发光','黑体']]){
    await p.goto(base+'review-optics.html#'+encodeURIComponent(id),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
    const heading=await p.evaluate(id=>{const a=document.getElementById(id);return [...document.querySelectorAll('.vp-doc h1,.vp-doc h2,.vp-doc h3,.vp-doc h4,.vp-doc h5')].find(h=>a.compareDocumentPosition(h)&Node.DOCUMENT_POSITION_FOLLOWING)?.textContent},id);
    assert(heading?.includes(subject),id+' semantic location '+heading);
   }
   checks.push('legacy concept links resolve to their subject after heading-depth migration');
  }
  checks.push(cases.length+' responsive/theme layouts','native derivation toggle and mathematical rendering','all headings and learning legacy targets outside folds',legacyCount+' legacy anchors','five source deep links');
  assert.deepEqual(errors,[]);fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/optics-learning-ui.json',JSON.stringify({status:'PASS',base,cases,checks,errors},null,2)+'\n');console.log('Optics learning UI PASS:',cases.length,'layouts;',legacyCount,'legacy anchors.');
 }finally{await browser.close();server.close()}
})().catch(e=>{console.error(e);server.close();process.exitCode=1});
