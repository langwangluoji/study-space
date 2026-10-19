const fs=require('fs'),path=require('path'),assert=require('node:assert/strict');
const {chromium}=require('playwright');
const config=JSON.parse(fs.readFileSync('traffic.config.json','utf8'));
const courseUpdateIds=JSON.parse(fs.readFileSync('site-updates.config.json','utf8')).filter(entry=>entry.category==='课程内容').map(entry=>'update-'+entry.id);
const root=path.resolve('docs/.vitepress/dist'),origin=config.origin,base=origin+config.base;
const mime={'.html':'text/html','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.svg':'image/svg+xml','.png':'image/png','.jpg':'image/jpeg','.woff2':'font/woff2'};
const fixture={version:1,startDate:config.startDate,timeZone:config.timeZone,endpoint:config.endpoint,activation:null,updatedAt:'2026-10-20T03:00:00Z',days:Array.from({length:7},(_,i)=>({date:'2026-10-'+(14+i),pv:i===6?3:2,uv:1,complete:i<6,observedAt:'2026-10-20T03:00:00Z'})),errors:[]};
const errors=[],cases=[],checks=[];let phase='complete',posts=0,livePV=5,liveUV=2;
async function run(){
 const browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
 try{
 const context=await browser.newContext();
 await context.route('**/*',async route=>{
  const request=route.request(),url=new URL(request.url());
  const cors={'Access-Control-Allow-Origin':origin,'Access-Control-Allow-Methods':'GET,POST,OPTIONS','Access-Control-Allow-Headers':'x-bsz-referer,authorization','Access-Control-Expose-Headers':'Set-Bsz-Identity'};
  if(request.url()===config.endpoint){
   if(request.method()==='OPTIONS')return route.fulfill({status:204,headers:cors});
   assert(!request.headers().referer,'Actual reading URL must not be sent');
   const counter=request.headers()['x-bsz-referer'];assert(counter.startsWith(origin+config.counterPrefix));
   if(phase==='gap'&&counter.endsWith('2026-10-16'))return route.fulfill({status:503,headers:cors,body:'offline'});
   if(phase==='counter-error')return route.fulfill({status:429,headers:cors,body:'limited'});
   if(request.method()==='POST'){posts++;livePV++;if(!request.headers().authorization)liveUV++;else assert.equal(request.headers().authorization,'test-anonymous-identity')}
   const body=phase==='counter-reset'?{page_pv:0,page_uv:0}:phase==='counter-malformed'?{site_pv:99999}:{page_pv:livePV,page_uv:liveUV,site_pv:99999,site_uv:8888};
   return route.fulfill({status:200,headers:{...cors,'Set-Bsz-Identity':'test-anonymous-identity'},contentType:'application/json',body:JSON.stringify({success:true,data:body})});
  }
  if(request.url()===config.historyUrl){
   if(phase==='history-error')return route.fulfill({status:503,headers:cors,body:'offline'});
   const history=JSON.parse(JSON.stringify(fixture));if(phase==='gap')history.days=history.days.filter(d=>d.date!=='2026-10-16');
   return route.fulfill({status:200,headers:cors,contentType:'application/json',body:JSON.stringify(history)});
  }
  if(url.origin===origin&&url.pathname.startsWith(config.base)){
   let file=path.resolve(root,decodeURIComponent(url.pathname.slice(config.base.length))||'index.html');
   if(!file.startsWith(root+path.sep))return route.fulfill({status:403,body:'outside'});
   if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
   if(!fs.existsSync(file))throw Error('Missing fixture asset: '+url.pathname);
   return route.fulfill({status:200,contentType:mime[path.extname(file)]||'application/octet-stream',body:fs.readFileSync(file)});
  }
  throw Error('Unmocked external URL: '+request.url());
 });
 const page=await context.newPage();page.on('pageerror',e=>errors.push(e.message));await page.clock.install({time:new Date('2026-10-20T04:00:00Z')});
 for(const width of [1440,1024,390,320])for(const theme of ['light','dark']){
  await page.setViewportSize({width,height:900});await page.addInitScript(t=>localStorage.setItem('vitepress-theme-appearance',t),theme);
  for(const slug of ['','updates.html']){
   await page.goto(base+slug,{waitUntil:'networkidle'});
   if(!slug)await page.waitForFunction(()=>document.querySelector('[data-stat=total]')?.textContent==='17');
   const layout=await page.evaluate(()=>({width:document.documentElement.clientWidth,scroll:document.documentElement.scrollWidth}));assert(layout.scroll<=layout.width+1,`Overflow ${width}/${theme}/${slug}`);cases.push({width,theme,slug:slug||'index',...layout});
  }
 }
 assert.equal(posts,0,'Automated browsers must not submit real visits');checks.push('16 desktop/mobile and light/dark layouts; automated browser exclusion');
 await page.setViewportSize({width:1440,height:900});await page.goto(base,{waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('[data-stat=total]')?.textContent==='17');assert.equal(await page.locator('[data-stat=today]').innerText(),'2');checks.push('Daily sums exclude host counters and do not double-count today from JSON');
 assert.equal(await page.locator('.traffic-calendar button[tabindex="0"]').count(),1);await page.locator('[data-date="2026-10-20"]').focus();await page.keyboard.press('ArrowUp');assert((await page.locator('.traffic-day-detail').innerText()).includes('2026-10-19'));await page.keyboard.press('Home');assert((await page.locator('.traffic-day-detail').innerText()).includes('启用当天'));checks.push('Keyboard calendar navigation uses a single day tab stop; activation day is partial');
 await page.getByRole('button',{name:'页面访问',exact:true}).click();assert((await page.locator('.traffic-chart').getAttribute('aria-label')).includes('页面访问'));await page.getByLabel('访问趋势时间范围').selectOption('7');await page.getByText('查看每日数据表',{exact:true}).click();assert.equal(await page.locator('.traffic-data tbody tr').count(),7);checks.push('PV/UV, range control and accessible daily table agree');
 phase='gap';await page.getByRole('button',{name:'重新读取',exact:true}).click();await page.waitForFunction(()=>document.querySelector('[data-stat=total]')?.textContent==='—');assert.equal(await page.locator('[data-date="2026-10-16"]').getAttribute('data-level'),'unknown');assert.equal(await page.locator('.chart-line').count(),2);checks.push('Missing historical day stays unknown and breaks the trend; total is withheld');
 for(const state of ['counter-error','counter-malformed','counter-reset','history-error']){phase=state;await page.getByRole('button',{name:'重新读取',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.traffic-status button')?.disabled===false);assert.equal(await page.locator('[data-stat=total]').innerText(),'—');assert((await page.locator('.traffic-status').innerText()).includes('不可用'));}checks.push('429, malformed response, counter regression and history failure preserve data and expose state');
 phase='counter-reset';await page.reload({waitUntil:'networkidle'});await page.waitForFunction(()=>document.querySelector('.traffic-status')?.textContent.includes('计数回退'));assert.equal(await page.locator('[data-stat=total]').innerText(),'—');assert.equal(await page.locator('[data-stat=today]').innerText(),'—');assert((await page.locator('.traffic-day-detail').innerText()).includes('3 次页面访问'));checks.push('Fresh-page counter reset is compared with the saved day; lower values never replace the historical graph');
 phase='complete';await page.goto(base+'updates.html',{waitUntil:'networkidle'});await page.getByRole('button',{name:'课程内容',exact:true}).click();assert.deepEqual(await page.locator('.updates-list>li').evaluateAll(nodes=>nodes.map(node=>node.id)),courseUpdateIds);checks.push('Content-update category filter matches every configured course release in order');
 // Simulate a human browser entirely on intercepted fixture routes.
 await page.addInitScript(()=>Object.defineProperty(navigator,'webdriver',{get:()=>false}));
 await page.goto(base,{waitUntil:'networkidle'});await page.waitForFunction(()=>localStorage.getItem('study-space-counter-identity')==='test-anonymous-identity');assert.equal(posts,1);const firstUV=liveUV;
 await page.evaluate(()=>{location.hash='site-updates';history.replaceState(null,'',location.pathname+'?course=ml#site-updates')});await page.getByRole('button',{name:'重新读取',exact:true}).click();await page.waitForFunction(()=>document.querySelector('.traffic-status button')?.disabled===false);assert.equal(posts,1);
 const nextPost=page.waitForResponse(r=>r.url()===config.endpoint&&r.request().method()==='POST');await page.getByRole('link',{name:'全部更新',exact:true}).click();await nextPost;assert.equal(posts,2);assert.equal(liveUV,firstUV);
 await page.reload({waitUntil:'networkidle'});assert.equal(posts,3);assert.equal(liveUV,firstUV);checks.push('First load, SPA path and refresh count once; hash/query/read retry do not; anonymous identity persists');
 assert.deepEqual(errors,[]);fs.writeFileSync('reports/home-activity-ui.json',JSON.stringify({status:'PASS',fixtureData:true,cases,checks,runtimeErrors:errors},null,2)+'\n');console.log('Activity UI PASS');
 }finally{await browser.close()}
}
run().catch(e=>{console.error(e);process.exitCode=1});

