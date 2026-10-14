/* Offline reader and streamed-original integration checks.
 * Run after the site build and material storage generation:
 *   PLAYWRIGHT_MODULE=... PLAYWRIGHT_CHANNEL=msedge node scripts/check-materials-ui.cjs
 * Optional: MATERIAL_UI_ROOT=public (reader-only run), MATERIAL_STORAGE_ROOT=...,
 * MATERIAL_CATALOG=..., MATERIAL_INPUT=..., MATERIAL_UI_REPORT=... .
 * The original viewer and service worker run unchanged. Only immutable raw
 * GitHub part requests are fulfilled with the corresponding local storage file.
 */
const fs=require('node:fs'),path=require('node:path'),http=require('node:http');
const crypto=require('node:crypto'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const site=path.resolve(__dirname,'..'),prefix='/study-space/';
const root=path.resolve(site,process.env.MATERIAL_UI_ROOT||'docs/.vitepress/dist');
const storage=path.resolve(site,process.env.MATERIAL_STORAGE_ROOT||'materials/storage');
const catalogPath=path.resolve(site,process.env.MATERIAL_CATALOG||'public/materials/catalog.json');
const inputPath=path.resolve(site,process.env.MATERIAL_INPUT||'../work/materials-input.json');
const reportPath=path.resolve(site,process.env.MATERIAL_UI_REPORT||'reports/materials-ui.json');
const screenRoot=path.join(site,'reports/materials-screenshots');
const timeout=Number(process.env.MATERIAL_UI_TIMEOUT||120000);
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8',
 '.mjs':'text/javascript; charset=utf-8','.css':'text/css; charset=utf-8','.json':'application/json',
 '.svg':'image/svg+xml','.png':'image/png','.pdf':'application/pdf','.woff':'font/woff',
 '.woff2':'font/woff2','.ttf':'font/ttf','.otf':'font/otf','.wasm':'application/wasm',
 '.bcmap':'application/octet-stream','.bin':'application/octet-stream'};
const report={status:'running',startedAt:new Date().toISOString(),root:path.relative(site,root),storage:path.relative(site,storage),
 catalogPath:path.relative(site,catalogPath),networkMode:'raw GitHub parts mapped to immutable local files',
 cases:[],downloads:[],errors:[],serverDownloadRequests:[],selectedCasePattern:process.env.MATERIAL_UI_CASES||null};
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
function inside(parent,target){const rel=path.relative(parent,target);return rel===''||(!rel.startsWith('..'+path.sep)&&rel!=='..'&&!path.isAbsolute(rel))}
function writeReport(){fs.mkdirSync(path.dirname(reportPath),{recursive:true});fs.writeFileSync(reportPath,JSON.stringify(report,null,2)+'\n')}
let server,browser,origin,currentTracker;
const verifiedParts=new Map();

async function startServer(){
 server=http.createServer((req,res)=>{
  let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
  if(!pathname.startsWith(prefix)){res.writeHead(404).end();return}
  let file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
  if(!inside(root,file)){res.writeHead(403).end();return}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
  if(!fs.existsSync(file)){if(pathname.includes('/material-download/'))report.serverDownloadRequests.push({path:pathname,status:404});res.writeHead(404).end();return}
  const size=fs.statSync(file).size;
  if(size===0){res.writeHead(req.headers.range?416:200,{'Content-Type':mime[path.extname(file)]||'application/octet-stream','Content-Length':'0'}).end();return}
  let start=0,end=size-1,status=200;
  if(req.headers.range){
   const m=/^bytes=(\d*)-(\d*)$/.exec(req.headers.range);
   if(!m){res.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return}
   if(m[1]){start=Number(m[1]);end=m[2]?Math.min(Number(m[2]),end):end}
   else if(m[2])start=Math.max(0,size-Number(m[2]));
   if(start>end||start>=size){res.writeHead(416,{'Content-Range':`bytes */${size}`}).end();return}
   status=206;res.setHeader('Content-Range',`bytes ${start}-${end}/${size}`);
  }
  res.statusCode=status;res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
  res.setHeader('Accept-Ranges','bytes');res.setHeader('Content-Length',end-start+1);
  res.setHeader('Cache-Control','no-store');
  if(req.method==='HEAD'){res.end();return}
  const stream=fs.createReadStream(file,{start,end});stream.on('error',()=>res.destroy());stream.pipe(res);
 });
 await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
 origin=`http://127.0.0.1:${server.address().port}`;
}
function sourceParts(records){
 const parts=new Map();
 for(const r of records)for(const source of [r.original,r.preview])for(const p of source.parts||[])parts.set(p.url,p);
 return parts;
}
function newTracker(){return {requestedBytes:0,requests:[],unique:new Map(),pageErrors:[],httpErrors:[],consoleErrors:[],failedRequests:[],readerModules:[]}}
function snapshot(t){return {requests:t.requests.length,requestedBytes:t.requestedBytes,
 uniqueBytes:[...t.unique.values()].reduce((a,b)=>a+b,0),uniqueParts:t.unique.size,
 partUrls:[...t.unique.keys()]}}
async function routedContext(parts,{width=1280,height=900}={}){
 const context=await browser.newContext({viewport:{width,height},deviceScaleFactor:1,
  acceptDownloads:true,serviceWorkers:'allow'}),tracker=newTracker();currentTracker=tracker;
 // Context routing, rather than page routing, also catches SW-owned fetches.
 await context.route('https://raw.githubusercontent.com/**',async route=>{
  const url=route.request().url(),part=parts.get(url);
  try{
   assert(part,'Unexpected remote source URL: '+url);
   const match=new URL(url).pathname.match(/\/materials\/storage\/([a-f0-9]{64})\/(\d{5}\.bin)$/);
   assert(match,'Unexpected archive URL shape: '+url);
   const file=path.resolve(storage,match[1],match[2]);assert(inside(storage,file));
   const label=path.relative(site,file);assert(fs.existsSync(file),'Local immutable part missing: '+label);
   const bytes=fs.readFileSync(file);assert.equal(bytes.length,part.bytes,'Part byte length: '+label);
   if(!verifiedParts.has(file)){assert.equal(hash(bytes),part.sha256,'Part SHA-256: '+label);verifiedParts.set(file,true)}
   tracker.requestedBytes+=bytes.length;tracker.unique.set(url,bytes.length);
   tracker.requests.push({url,bytes:bytes.length,serviceWorker:!!route.request().serviceWorker()});
   await route.fulfill({status:200,contentType:'application/octet-stream',
    headers:{'Access-Control-Allow-Origin':'*','Cache-Control':'public, max-age=31536000, immutable'},body:bytes});
  }catch(e){tracker.httpErrors.push(e.message);await route.abort('failed')}
 });
 await context.route('**/*',async route=>{
  // No accidental CI network use. Raw archive URLs fall back to the earlier
  // specific handler; all other unexpected external URLs are rejected.
  const u=new URL(route.request().url());
  if(u.origin===origin||u.protocol==='blob:'||u.protocol==='data:')return route.continue();
  if(u.hostname==='raw.githubusercontent.com')return route.fallback();
  tracker.httpErrors.push('Unexpected external request: '+u.href);await route.abort('failed');
 });
 context.on('page',p=>{
  p.on('pageerror',e=>tracker.pageErrors.push(e.message));
  p.on('console',m=>{if(m.type()==='error')tracker.consoleErrors.push(m.text())});
  p.on('response',r=>{if(r.status()>=400)tracker.httpErrors.push(`HTTP ${r.status()} ${r.url()}`);
   if(new URL(r.url()).pathname.endsWith('/material-viewer/viewer.js'))r.body().then(bytes=>tracker.readerModules.push({url:r.url(),sha256:hash(bytes),
    retryHandler:bytes.toString().match(/el\('retry'\)\.onclick=([^;]+)/)?.[1]})).catch(()=>{});
  });
 });
 context.on('requestfailed',r=>tracker.failedRequests.push({url:r.url(),error:r.failure()?.errorText,serviceWorker:!!r.serviceWorker(),
  expectedDownloadNavigation:r.url().includes('/material-download/')&&r.failure()?.errorText==='net::ERR_ABORTED'}));
 return {context,tracker,page:await context.newPage()};
}
async function waitRendered(page,n,{allowBlank=false}={}){
 const result=await page.waitForFunction(expected=>{
  const c=document.querySelector('#canvas'),s=document.querySelector('#status');
  if(s?.classList.contains('error'))return {error:s.textContent};
  return c?.dataset.page===String(expected)&&c.width>0&&c.height>0&&/^第 \d+ \/ \d+ 页$/.test(s?.textContent||'');
 },n,{timeout});
 const state=await result.jsonValue();await result.dispose();
 if(state?.error)throw Error(state.error);
 // A resolved PDF.js render promise plus non-white pixels verifies actual
 // painting, rather than just a canvas element or ready flag being present.
 const rendered=await page.evaluate(()=>{
  const canvas=document.querySelector('#canvas'),ctx=canvas.getContext('2d');
  const {width,height}=canvas;let nonwhite=0,samples=0;
  for(let y=0;y<height;y+=Math.max(1,Math.floor(height/90)))for(let x=0;x<width;x+=Math.max(1,Math.floor(width/90))){
   const d=ctx.getImageData(x,y,1,1).data;samples++;if(d[3]&&Math.min(d[0],d[1],d[2])<238)nonwhite++;
  }
  return {width,height,nonwhite,samples,textSpans:document.querySelectorAll('#text span').length,
   displayedPage:canvas.dataset.page,status:document.querySelector('#status').textContent,
   total:Number(document.querySelector('#page').max),documentWidth:document.documentElement.scrollWidth,
   viewport:innerWidth,paperWidth:document.querySelector('#paper').clientWidth,
   canvasCSSWidth:canvas.getBoundingClientRect().width,paperScrollWidth:document.querySelector('#paper').scrollWidth};
 });
 assert(allowBlank||rendered.nonwhite>0,'Canvas has no visible page content: '+n);return rendered;
}
async function go(page,id,n=1,theme='light'){
 await page.goto(`${origin}${prefix}material-viewer/index.html?id=${encodeURIComponent(id)}&theme=${theme}#page=${n}`,{waitUntil:'domcontentloaded'});
 return waitRendered(page,n);
}
async function setPage(page,n){
 await page.locator('#page').fill(String(n));
 // Commit through a real focus change. A synthetic change leaves the number
 // input dirty and causes a duplicate native change on the later retry click.
 await page.locator('#page').press('Tab');
}
async function jump(page,n,options){await setPage(page,n);const r=await waitRendered(page,n,options);assert(page.url().endsWith('#page='+n),'Page URL must retain page selection');return r}
async function zoom(page,value,n){
 const old=await page.locator('#canvas').evaluate(c=>({width:c.width,height:c.height}));
 await page.locator('#zoom').selectOption(value);
 await page.waitForFunction(prev=>{const c=document.querySelector('#canvas');return c&&(c.width!==prev.width||c.height!==prev.height)},old,{timeout});
 return waitRendered(page,n);
}
function assertNoErrors(t){assert.deepEqual(t.pageErrors,[],'Reader JavaScript errors');assert.deepEqual(t.httpErrors,[],'Reader HTTP/routing errors');assert.deepEqual(t.consoleErrors,[],'Reader console errors')}
async function caseRun(name,fn){
 const item={name,status:'running'};report.cases.push(item);
 if(process.env.MATERIAL_UI_CASES&&!new RegExp(process.env.MATERIAL_UI_CASES).test(name)){item.status='not-run';item.reason='Selected-case debug run';return}
 try{Object.assign(item,await fn(item));item.status='pass';console.log(name,'PASS')}
 catch(e){item.status='fail';item.error=e.message;report.errors.push(name+': '+e.message);console.error(name,'FAIL',e.message)}
 if(currentTracker)item.diagnostics={network:snapshot(currentTracker),pageErrors:currentTracker.pageErrors,httpErrors:currentTracker.httpErrors,
  consoleErrors:currentTracker.consoleErrors,failedRequests:currentTracker.failedRequests,readerModules:currentTracker.readerModules};
 writeReport();
}
async function run(){
 assert(fs.existsSync(catalogPath),'Generate public/materials/catalog.json first');
 assert(fs.existsSync(path.join(root,'material-viewer/index.html')),'Build/copy the viewer into MATERIAL_UI_ROOT first');
 const records=JSON.parse(fs.readFileSync(catalogPath,'utf8'));
 assert.equal(records.length,43,'All 43 material records must be published');
 const byId=new Map(records.map(r=>[r.id,r])),parts=sourceParts(records);
 // The private source inventory is useful locally, but must not be a CI dependency.
 if(fs.existsSync(inputPath)){
  const inputById=new Map(JSON.parse(fs.readFileSync(inputPath,'utf8')).map(r=>[r.id,r]));
  for(const r of records)if(inputById.has(r.id))assert.equal(r.preview.pages,inputById.get(r.id).pdf_preview_pages,'Catalog preview page count: '+r.id);
  report.optionalLocalInventoryChecked=true;
 }else report.optionalLocalInventoryChecked=false;
 for(const id of ['slide-1','insar-book','leedl','rs-campbell-introduction','rs-english-summary'])assert(byId.has(id),'Missing scenario record '+id);
 const expectedPages=id=>Number(byId.get(id).preview.pages);
 report.catalogRecords=records.length;report.partURLs=parts.size;
 fs.mkdirSync(screenRoot,{recursive:true});await startServer();
 browser=await chromium.launch({headless:true,timeout:30000,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{}),
  ...(process.env.PLAYWRIGHT_EXECUTABLE?{executablePath:process.env.PLAYWRIGHT_EXECUTABLE}:{})});

 await caseRun('ML PPT first/last page and desktop zoom',async()=>{
  const {context,page,tracker}=await routedContext(parts);
  try{const first=await go(page,'slide-1');assert.equal(first.total,expectedPages('slide-1'));
   assert(await page.locator('#prev').isDisabled());await page.locator('#next').click();await waitRendered(page,2);
   const last=await jump(page,first.total);assert(await page.locator('#next').isDisabled());
   const at100=await zoom(page,'1',first.total),at200=await zoom(page,'2',first.total);
   assert(Math.abs(at200.width/at100.width-2)<.01,'200% canvas size doubles 100%');
   await page.screenshot({path:path.join(screenRoot,'ml-ppt-desktop-200.png')});
   assertNoErrors(tracker);return {id:'slide-1',first,last,at100,at200,network:snapshot(tracker),consoleErrors:tracker.consoleErrors};
  }finally{await context.close()}
 });
 await caseRun('ML PPT phone fit/zoom and dark theme',async()=>{
  const {context,page,tracker}=await routedContext(parts,{width:390,height:844});
  try{const fit=await go(page,'slide-1',1,'dark');assert.equal(fit.documentWidth,390,'Fit reader must not overflow the document');
   assert(fit.canvasCSSWidth<fit.paperWidth,'Fit page stays within reading panel');assert(await page.locator('body').evaluate(b=>b.classList.contains('dark')));
   const enlarged=await zoom(page,'2',1);assert.equal(enlarged.documentWidth,390,'Zoom overflow belongs inside paper scroller');
   assert(enlarged.paperScrollWidth>enlarged.paperWidth,'Large page can pan horizontally in reading panel');
   await page.locator('#zoom').selectOption('fit');await waitRendered(page,1);
   await page.screenshot({path:path.join(screenRoot,'ml-ppt-phone-fit.png')});assertNoErrors(tracker);
   return {id:'slide-1',fit,enlarged,network:snapshot(tracker),consoleErrors:tracker.consoleErrors};
  }finally{await context.close()}
 });
 await caseRun('InSAR scanned textbook original page',async()=>{
  const {context,page,tracker}=await routedContext(parts);
  try{const first=await go(page,'insar-book');assert.equal(first.total,expectedPages('insar-book'));
   const page34=await jump(page,34);await page.screenshot({path:path.join(screenRoot,'insar-book-page34.png')});
   assertNoErrors(tracker);return {id:'insar-book',first,page34,network:snapshot(tracker),consoleErrors:tracker.consoleErrors};
  }finally{await context.close()}
 });
 for(const id of ['leedl','rs-campbell-introduction'])await caseRun(id+' chunked on-demand first/middle/last',async()=>{
  const {context,page,tracker}=await routedContext(parts);
  try{const source=byId.get(id).preview;assert(source.parts?.length>1,'Large book must use chunked storage');
   const first=await go(page,id);assert.equal(first.total,expectedPages(id));const afterFirst=snapshot(tracker);
   assert(afterFirst.uniqueBytes<source.bytes,'First page must not download the entire book');
   const firstURLs=new Set(afterFirst.partUrls),middle=await jump(page,Math.floor(first.total/2));
   const knownBlank=id==='rs-campbell-introduction'&&first.total===675&&source.sha256==='d4ede094820cd90029ed2495d8011a56769d1c0b8d6454713c79bc3f9ff3d7b2';
   let beforeLast;
   if(knownBlank){beforeLast=await jump(page,673);await page.screenshot({path:path.join(screenRoot,id+'-before-last.png')})}
   const last=await jump(page,first.total,{allowBlank:knownBlank}),afterJumps=snapshot(tracker);
   assert(afterJumps.uniqueParts>=2,'Reader must exercise more than one immutable chunk');
   const deferred=afterJumps.partUrls.filter(u=>!firstURLs.has(u));
   if(source.parts.length>3)assert(deferred.length>0,'Distant page must exercise a previously unread chunk');
   await page.screenshot({path:path.join(screenRoot,id+'-last.png')});assertNoErrors(tracker);
   return {id,totalBytes:source.bytes,totalParts:source.parts.length,first,middle,last,afterFirst,afterJumps,
    firstReadFraction:afterFirst.uniqueBytes/source.bytes,deferredChunks:deferred,consoleErrors:tracker.consoleErrors,
    ...(knownBlank?{beforeLast,knownBlankEvidence:'Original file p675 visually rendered with Poppler and inspected: white; original p674 also has no extracted text, so p673 verifies visible content. Exception is pinned to the original SHA-256.'}:{})};
  }finally{await context.close()}
 });
 await caseRun('Word 20-page PDF reading copy',async()=>{
  const {context,page,tracker}=await routedContext(parts);
  try{const first=await go(page,'rs-english-summary');assert.equal(first.total,20);
   const last=await jump(page,20);await page.screenshot({path:path.join(screenRoot,'word-page20.png')});
   assertNoErrors(tracker);return {id:'rs-english-summary',first,last,network:snapshot(tracker),consoleErrors:tracker.consoleErrors};
  }finally{await context.close()}
 });

 if(fs.existsSync(path.join(root,'book-leedl.html')))await caseRun('Built parent page embeds a readable LeeDL iframe',async()=>{
  const {context,page,tracker}=await routedContext(parts);
  try{let parentLoadObserved=false;page.on('load',()=>{parentLoadObserved=true});
   await page.goto(`${origin}${prefix}book-leedl.html`,{waitUntil:'domcontentloaded'});
   const iframe=page.locator('iframe[src*="material-viewer"]').first();await iframe.scrollIntoViewIfNeeded();
   await page.waitForFunction(()=>{
    const frame=document.querySelector('iframe[src*="material-viewer"]');
    return frame?.contentDocument?.querySelector('#canvas')?.dataset.page==='1';
   },null,{timeout});
   const handle=await iframe.elementHandle(),frame=await handle.contentFrame();assert(frame,'Embedded reader frame exists');
   const first=await waitRendered(frame,1);assert.equal(first.total,expectedPages('leedl'));
   const parent=await page.evaluate(()=>({readyState:document.readyState,title:document.title,
    iframeSrc:document.querySelector('iframe[src*="material-viewer"]').getAttribute('src'),
    documentWidth:document.documentElement.scrollWidth,viewport:innerWidth}));
   assert(parent.documentWidth<=parent.viewport+1,'Embedded parent does not overflow horizontally');
   const network=snapshot(tracker);assert(network.uniqueBytes<byId.get('leedl').preview.bytes,'Embedded first page is still on demand');
   await page.screenshot({path:path.join(screenRoot,'embedded-leedl-parent.png')});assertNoErrors(tracker);
   return {id:'leedl',first,parent,parentLoadObserved,readyCondition:'parent DOMContentLoaded followed by iframe completed canvas render',network};
  }finally{await context.close()}
 });
 else report.cases.push({name:'Built parent page embeds a readable LeeDL iframe',status:'not-run',reason:'Reader-only root has no generated parent page; run default built-site root for this check.'});

 await caseRun('Chunk fetch 503 shows error and recovers on retry',async()=>{
  const {context,page,tracker}=await routedContext(parts);
  try{const source=byId.get('insar-l3').preview;assert(source.parts?.length,'Retry scenario requires chunked PDF');
   const urls=new Set(source.parts.map(p=>p.url));let fail=true,injected=0;
   await context.route('https://raw.githubusercontent.com/**',async route=>{
    if(fail&&urls.has(route.request().url())){injected++;return route.fulfill({status:503,contentType:'text/plain',
     headers:{'Access-Control-Allow-Origin':'*','Cache-Control':'no-store'},body:'Injected test failure'})}
    return route.fallback();
   });
   await page.goto(`${origin}${prefix}material-viewer/index.html?id=insar-l3`,{waitUntil:'domcontentloaded'});
   await page.waitForFunction(()=>document.querySelector('#status')?.classList.contains('error')&&!document.querySelector('#retry')?.hidden,null,{timeout});
   assert(injected>0,'503 must be exercised by an actual archive read');
   const errorStatus=await page.locator('#status').textContent();assert(errorStatus?.trim(),'Failed read shows a human-readable status');
   await page.screenshot({path:path.join(screenRoot,'archive-503-error.png')});
   fail=false;await Promise.all([page.waitForEvent('domcontentloaded',{timeout}),page.locator('#retry').click()]);
   const recovered=await waitRendered(page,1);
   assert.equal(recovered.total,expectedPages('insar-l3'));assert(await page.locator('#retry').isHidden(),'Retry control hides after success');
   assert.deepEqual(tracker.pageErrors,[],'No uncaught script errors on failed read/retry');
   const unexpected=tracker.httpErrors.filter(e=>!source.parts.some(p=>e==='HTTP 503 '+p.url));
   assert.deepEqual(unexpected,[],'Only the deliberate 503 is allowed');
   await page.screenshot({path:path.join(screenRoot,'archive-retry-success.png')});
   return {id:'insar-l3',injected503Requests:injected,errorStatus,recovered,network:snapshot(tracker),
    expectedHTTPErrors:tracker.httpErrors,expectedConsoleErrors:tracker.consoleErrors};
  }finally{await context.close()}
 });

 await caseRun('Later chunk 503 rebuilds loaded PDF and retains selected page',async caseItem=>{
  const {context,page,tracker}=await routedContext(parts);
  await page.addInitScript(()=>{
   window.__materialStatusTimeline=[];window.__materialTestStage='initial';let last='';
   new MutationObserver(()=>{const s=document.querySelector('#status');if(s&&s.textContent!==last){last=s.textContent;
    window.__materialStatusTimeline.push({time:performance.now(),stage:window.__materialTestStage,status:last,error:s.classList.contains('error')})}
   }).observe(document,{subtree:true,childList:true,characterData:true,attributes:true});
  });
  try{const source=byId.get('leedl').preview;assert(source.parts?.length>2,'Later chunk scenario requires a large archived PDF');
   const first=await go(page,'leedl'),afterFirst=snapshot(tracker),loadedURLs=new Set(afterFirst.partUrls);
   await page.evaluate(()=>window.__materialTestStage='first-ready');
   const newURLs=new Set(source.parts.filter(p=>!loadedURLs.has(p.url)).map(p=>p.url));
   assert(newURLs.size>0,'First page must leave deferred chunks unread');let fail=true,injected=0;
   await context.route('https://raw.githubusercontent.com/**',async route=>{
    if(fail&&newURLs.has(route.request().url())){injected++;return route.fulfill({status:503,contentType:'text/plain',
     headers:{'Access-Control-Allow-Origin':'*','Cache-Control':'no-store'},body:'Injected later-chunk failure'})}
    return route.fallback();
   });
   await page.evaluate(()=>window.__materialTestStage='request-page163');await setPage(page,163);
   await page.waitForFunction(()=>document.querySelector('#status')?.classList.contains('error')&&!document.querySelector('#retry')?.hidden,null,{timeout});
   assert(injected>0,'Jump 163 must actually encounter an unread chunk');
   const errorStatus=await page.locator('#status').textContent();assert(errorStatus?.trim(),'Later-chunk failure shows a status');
   assert.equal(await page.locator('#page').inputValue(),'163','Failed read keeps the requested page number');
   await page.screenshot({path:path.join(screenRoot,'later-chunk-503-error.png')});
   fail=false;await page.evaluate(()=>window.__materialTestStage='click-retry');
   caseItem.beforeRetry={status:await page.locator('#status').textContent(),network:snapshot(tracker)};
   await Promise.all([page.waitForEvent('domcontentloaded',{timeout}),page.locator('#retry').click()]);
   caseItem.afterRetryClick={status:await page.locator('#status').textContent(),network:snapshot(tracker)};
   // Wait for the replacement document before inspecting page render state;
   // the previous document briefly retains its error status during reload.
   const recovered=await waitRendered(page,163);
   assert.equal(recovered.total,expectedPages('leedl'));assert(page.url().endsWith('#page=163'),'Rebuilt reader retains target page');
   assert(await page.locator('#retry').isHidden());await page.locator('#next').click();const next=await waitRendered(page,164);
   assert.deepEqual(tracker.pageErrors,[],'No uncaught error while rebuilding destroyed PDF');
   assert.deepEqual(tracker.httpErrors.filter(e=>!source.parts.some(p=>e==='HTTP 503 '+p.url)),[],'No unexpected HTTP failure');
   await page.screenshot({path:path.join(screenRoot,'later-chunk-retry-page164.png')});
   return {id:'leedl',first,afterFirst,injected503Requests:injected,errorStatus,recovered,next,
    afterRetry:snapshot(tracker),expectedHTTPErrors:tracker.httpErrors,expectedConsoleErrors:tracker.consoleErrors};
  }finally{caseItem.statusTimeline=await page.evaluate(()=>window.__materialStatusTimeline).catch(()=>[]);await context.close()}
 });

 await caseRun('Real service-worker DOCX and Chinese PPTX downloads SHA-256',async()=>{
  const ppt=records.filter(r=>/^slide-(?:[4-9]|1[0-5])$/.test(r.id)&&r.original.parts?.length&&/\.pptx$/i.test(r.original.filename))
   .sort((a,b)=>a.original.bytes-b.original.bytes)[0];
  assert(ppt,'Need an archived ML lecture 4–15 PPTX');assert(/[\u4e00-\u9fff]/.test(ppt.original.filename),'PPTX must exercise a Chinese original filename');
  const candidates=[byId.get('rs-english-summary'),ppt],items=[];report.downloadDiagnostics=[];
  for(const candidate of candidates){
   assert(candidate?.original.parts?.length,'Need a chunked original to exercise streaming service worker');
   const {context,page,tracker}=await routedContext(parts);
   try{await go(page,candidate.id);const before=snapshot(tracker);
    const pending=page.waitForEvent('download',{timeout});await page.locator('#download').click();const download=await pending;
    report.downloadDiagnostics.push({id:candidate.id,url:download.url(),filename:download.suggestedFilename(),
     worker:await page.evaluate(async()=>({controller:!!navigator.serviceWorker.controller,registrationActive:!!(await navigator.serviceWorker.getRegistration())?.active,status:document.querySelector('#status').textContent}))});
    const failure=await download.failure();assert.equal(failure,null,'Browser original download completes');const local=await download.path();
    assert.equal(download.suggestedFilename(),candidate.original.filename,'Original filename preserved, including Chinese when present');
    const bytes=fs.readFileSync(local),actualHash=hash(bytes);assert.equal(bytes.length,candidate.original.bytes);assert.equal(actualHash,candidate.original.sha256);
    assert(await page.evaluate(async()=>!!(await navigator.serviceWorker.getRegistration())?.active),'Actual SW is active');
    const swRequests=tracker.requests.filter(r=>r.serviceWorker);
    assert(swRequests.length>0,'Original chunks must be fetched by the real service worker');assertNoErrors(tracker);
    const item={id:candidate.id,filename:download.suggestedFilename(),chineseFilename:/[\u4e00-\u9fff]/.test(download.suggestedFilename()),
     bytes:bytes.length,sha256:actualHash,serviceWorkerPartRequests:swRequests.length,before,after:snapshot(tracker)};
    report.downloads.push(item);items.push(item);
   }finally{await context.close()}
  }
  return {downloads:items};
 });
 assert.equal(report.errors.length,0,'Some material viewer integration checks failed');
 report.status='pass';
}
run().catch(e=>{report.status='fail';report.fatal=e.message.split('\n')[0];console.error(e.stack||e);process.exitCode=1})
 .finally(async()=>{try{await browser?.close()}finally{if(server)await new Promise(r=>server.close(r));report.finishedAt=new Date().toISOString();writeReport();console.log('Report:',reportPath)}});
