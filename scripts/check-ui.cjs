const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.pdf':'application/pdf','.py':'text/plain; charset=utf-8','.md':'text/plain; charset=utf-8','.ipynb':'application/json'};
const server=http.createServer((req,res)=>{
 let pathname;try{pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname)}catch{res.writeHead(400).end();return}
 if(!pathname.startsWith(prefix)){res.writeHead(404).end();return}
 let file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
 if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}
 if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
 if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
 if(!fs.existsSync(file)){res.writeHead(404).end();return}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');res.setHeader('Cache-Control','no-store');fs.createReadStream(file).pipe(res);
});
async function run(){
 await new Promise(r=>server.listen(0,'127.0.0.1',r));const origin=`http://127.0.0.1:${server.address().port}`;let browser;
 const errors=[],cases=[],checks=[];fs.mkdirSync('reports/screenshots',{recursive:true});
 try{
 browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
 const page=await browser.newPage();page.on('pageerror',e=>errors.push(e.message));page.on('response',r=>{if(r.status()>=400)errors.push(`HTTP ${r.status()} ${r.url()}`)});
 const pages=['index','course-ml','lecture-1','lecture-2','lecture-3','cifar10-practice','resources','read-notebook','read-sources','read-downloads-cifar10_mlp_tutorial','read-downloads-rewrite_reference_checks','read-README','textbooks','book-prml','book-mml','book-leedl','slides-lecture-1','slides-lecture-2','slides-lecture-3','verification'];
 for(const width of (process.env.UI_WIDTHS?process.env.UI_WIDTHS.split(',').map(Number):[1440,390,320])){
  await page.setViewportSize({width,height:900});
  for(const theme of ['light','dark']){
   await page.addInitScript(t=>localStorage.setItem('vitepress-theme-appearance',t),theme);
   for(const slug of (process.env.UI_PAGES?process.env.UI_PAGES.split(','):pages)){
    await page.goto(origin+prefix+(slug==='index'?'':slug+'.html'),{waitUntil:'networkidle'});
    const defaultOpen=await page.locator('.vp-doc details[open]').count();assert.equal(defaultOpen,0,'Extras must start closed: '+slug);
    await page.evaluate(()=>document.querySelectorAll('.vp-doc details').forEach(d=>d.open=true));
    const report=await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,math:document.querySelectorAll('mjx-container').length,errors:document.querySelectorAll('[data-mjx-error],merror').length,brokenImages:[...document.querySelectorAll('.vp-doc img')].filter(i=>!i.complete||!i.naturalWidth).map(i=>i.src),dark:document.documentElement.classList.contains('dark')}));
    assert(report.scroll<=width+1,`Page overflow: ${slug} ${width} ${report.scroll}`);assert.equal(report.errors,0,slug+' math');assert.deepEqual(report.brokenImages,[],slug+' images');assert.equal(report.dark,theme==='dark');
    cases.push({slug,width,theme,...report});
    if(['course-ml','lecture-1','lecture-3'].includes(slug))await page.screenshot({path:`reports/screenshots/${slug}-${width}-${theme}.png`});
   }
  }
  console.log('UI width',width,'PASS');
 }
 // Import original storage without clearing other keys.
 const legacy=await browser.newContext({viewport:{width:1440,height:900}});const old=await legacy.newPage();
 await old.addInitScript(()=>{localStorage.setItem('ml-course-theme','dark');localStorage.setItem('ml-course-progress-v1',JSON.stringify({practice:true,a1:true,other:true}));localStorage.setItem('ml-course-mastery-v1',JSON.stringify({'lecture-1:a1':true,'lecture-2:b1':true}));});
 await old.goto(origin+prefix+'lecture-1.html',{waitUntil:'networkidle'});assert(await old.locator('html').evaluate(el=>el.classList.contains('dark')));assert.equal(await old.locator('.learning-mark').first().locator('input:checked').count(),2);checks.push('legacy theme/progress/mastery imported');
 await old.locator('.learning-mark').first().locator('input').first().click();assert(await old.evaluate(()=>{const p=JSON.parse(localStorage.getItem('ml-course-progress-v1'));return p.a1===false&&p.other===true}));checks.push('single completion update preserves unrelated records');
 await old.locator('.VPSwitchAppearance').first().click();await old.waitForFunction(()=>!document.documentElement.classList.contains('dark'));checks.push('theme toggle works');
 await old.locator('.VPNavBarMenuLink').filter({hasText:'机器学习'}).click();await old.locator('.vp-doc a[href$="lecture-2.html#b1"]').click();await old.locator('#b1').waitFor();assert.equal(await old.locator('.learning-mark').first().locator('input:checked').count(),1);checks.push('SPA route initializes legacy mastery');
 await old.goto(origin+prefix+'cifar10-practice.html#p15',{waitUntil:'networkidle'});assert(await old.locator('.learning-mark').last().locator('input').first().isChecked());checks.push('legacy practice completion imported');await legacy.close();
 await page.setViewportSize({width:1440,height:900});await page.goto(origin+prefix+'lecture-3.html',{waitUntil:'networkidle'});
 await page.keyboard.press('Control+k');await page.locator('input[type=search]').fill('同一网络的梯度复算');
 const result=page.locator('.VPLocalSearchBox a[href*="c5-numerical-check"]').first();await result.waitFor();await result.click();
 await page.waitForFunction(()=>document.getElementById('c5-numerical-check')?.closest('details')?.open);assert(await page.locator('#c5-numerical-check').isVisible());checks.push('same-page search opens closed extra');
 await page.keyboard.press('Control+k');await page.locator('input[type=search]').fill('矩阵');await page.locator('.VPLocalSearchBox .result').first().waitFor();await page.keyboard.press('Escape');checks.push('Chinese keyword search');
 await page.goto(origin+prefix+'lecture-1.html',{waitUntil:'networkidle'});await page.keyboard.press('Control+k');await page.locator('input[type=search]').fill('同一网络的梯度复算');await page.locator('.VPLocalSearchBox a[href*="c5-numerical-check"]').first().click();await page.waitForFunction(()=>document.getElementById('c5-numerical-check')?.closest('details')?.open);checks.push('cross-page search expands ancestors');
 await page.goto(origin+prefix+'lecture-1.html#a5',{waitUntil:'networkidle'});await page.locator('#a5-viz').evaluate(el=>{el.closest('details').open=true});const range=page.locator('#viz-a5');const before=await range.locator('..').locator('.readout').textContent();await range.evaluate(el=>{el.value='85';el.dispatchEvent(new Event('input',{bubbles:true}))});await page.waitForFunction(()=>document.querySelector('#viz-a5')?.parentElement.querySelector('.readout').textContent.includes('1.05'));const after=await range.locator('..').locator('.readout').textContent();assert.notEqual(before,after);checks.push('Vue diagram responds after route switch');
 for(const width of [390,320]){await page.setViewportSize({width,height:900});await page.goto(origin+prefix+'lecture-1.html',{waitUntil:'networkidle'});const menu=page.locator('.VPLocalNav .menu');await menu.click();assert(await page.locator('.VPSidebar').isVisible());await page.locator('.VPBackdrop').click();await page.getByRole('button',{name:'本页大纲',exact:true}).click();assert(await page.locator('.VPLocalNav .items').isVisible());await page.keyboard.press('Escape');checks.push(`mobile separate menus ${width}`)}
 await page.goto(origin+prefix+'book-prml.html#page=243',{waitUntil:'networkidle'});assert((await page.locator('iframe').getAttribute('src')).endsWith('#page=243'));checks.push('PDF page hash preserved');
 for(const file of ['books/prml.pdf','books/mml.pdf','slides/lecture-1.pdf','slides/lecture-2.pdf','slides/lecture-3.pdf','slides/lecture-1.pptx','slides/lecture-2.pptx','slides/lecture-3.pptx','downloads/cifar10_mlp_tutorial.py','downloads/rewrite_reference_checks.py','downloads/CIFAR10_MLP_逐步练习.ipynb','MISSION.md']){const response=await page.request.get(origin+prefix+file);assert.equal(response.status(),200,file)}checks.push('PDF, PPTX, notebook, scripts and marker paths reachable');
 assert.deepEqual(errors,[]);fs.writeFileSync('reports/ui-verification.json',JSON.stringify({status:'PASS',cases,checks,runtimeErrors:errors},null,2)+'\n');console.log('All UI checks PASS');
 }finally{await browser?.close();server.close()}
}
run().catch(e=>{console.error(e);server.close();process.exitCode=1});
