const { chromium } = require('playwright');
const fs=require('node:fs');
const base=process.env.AUDIT_BASE||'http://127.0.0.1:8781/study-space/';
let auditBrowser;
(async()=>{
 const browser=auditBrowser=await chromium.launch({channel:'msedge',headless:true});
 const context=await browser.newContext({viewport:{width:390,height:900}});
 const page=await context.newPage();const issues=[],checks=[],errors=[];
 page.on('pageerror',e=>errors.push(e.message));
 await page.setViewportSize({width:1440,height:900});await page.goto(base,{waitUntil:'networkidle'});await page.locator('.hub-entry').click();await page.waitForURL('**/course-ml.html');checks.push({name:'homepage course entry',url:page.url()});
 await page.locator('.VPSwitchAppearance').first().click();const dark=await page.locator('html').evaluate(e=>e.classList.contains('dark'));await page.locator('.vp-doc a[href$="lecture-2.html#b1"]').click();await page.locator('#b1').waitFor();checks.push({name:'SPA route preserves theme and B1 link',themeBefore:dark,themeAfter:await page.locator('html').evaluate(e=>e.classList.contains('dark')),url:page.url()});
 await page.setViewportSize({width:390,height:900});
 await page.goto(base+'lecture-2.html',{waitUntil:'networkidle'});
 await page.getByRole('button',{name:'本页大纲',exact:true}).click();
 await page.keyboard.press('Escape');
 const outlineClosed=await page.locator('.VPLocalNav .items').waitFor({state:'hidden',timeout:2000}).then(()=>true,()=>false);
 checks.push({name:'mobile outline Escape after transition',closed:outlineClosed});
 await page.goto(base+'resources.html',{waitUntil:'networkidle'});
 checks.push({name:'resources mobile body width',...(await page.evaluate(()=>({viewport:innerWidth,scroll:document.documentElement.scrollWidth,links:[...document.querySelectorAll('.vp-doc a')].map(a=>({text:a.textContent,href:a.href}))})))});
 for(const slug of ['lecture-1','lecture-2','lecture-3']){
  await page.setViewportSize({width:1440,height:900});await page.goto(base+slug+'.html',{waitUntil:'networkidle'});
  const headers=await page.locator('.VPDocAsideOutline .outline-link').allTextContents();
  checks.push({name:slug+' outline',count:headers.length,headers});
  const ids=await page.locator('.concept-viz input').evaluateAll(es=>es.map(e=>e.id));
  for(const id of ids){
   const input=page.locator('#'+id);await input.evaluate(e=>{for(let p=e.parentElement;p;p=p.parentElement)if(p.tagName==='DETAILS')p.open=true});
   await page.waitForTimeout(100);const beforeCanvas=await input.locator('..').locator('canvas').evaluate(e=>e.toDataURL());
   const before=await input.locator('..').locator('.readout').textContent();
   await input.focus();await page.keyboard.press('End');await page.waitForTimeout(50);
   const after=await input.locator('..').locator('.readout').textContent();
   const afterCanvas=await input.locator('..').locator('canvas').evaluate(e=>e.toDataURL());
   if(before===after&&beforeCanvas===afterCanvas)issues.push({name:'diagram canvas and readout unchanged',id,before,after});
  }
  checks.push({name:slug+' keyboard diagrams',count:ids.length});
 }
 await page.goto(base+'lecture-3.html#c5-numerical-check',{waitUntil:'networkidle'});
 checks.push({name:'direct folded hash',visible:await page.locator('#c5-numerical-check').isVisible(),top:await page.locator('#c5-numerical-check').evaluate(e=>e.getBoundingClientRect().top)});
 await page.goto(base+'lecture-2.html',{waitUntil:'networkidle'});await page.keyboard.press('Control+k');await page.locator('input[type=search]').fill('不存在的知识条目');await page.waitForTimeout(1500);checks.push({name:'search empty state',text:await page.locator('.VPLocalSearchBox').innerText()});await page.keyboard.press('Escape');
 for(const [slug,prefix,count] of [['lecture-1','a',15],['lecture-2','b',6],['lecture-3','c',5],['cifar10-practice','p',16]]){
  await page.goto(base+slug+'.html',{waitUntil:'networkidle'});const absent=[];for(let i=prefix==='p'?0:1;i<(prefix==='p'?count:count+1);i++)if(await page.locator('#'+prefix+i).count()!==1)absent.push(prefix+i);checks.push({name:slug+' legacy anchors',count,absent});if(absent.length)issues.push({name:'legacy anchors absent',slug,absent});
 }
 await page.setViewportSize({width:320,height:900});await page.goto(base+'book-prml.html#page=243',{waitUntil:'networkidle'});checks.push({name:'mobile PDF with alternative download',frame:await page.locator('iframe').getAttribute('src'),download:await page.locator('.vp-doc a[href$="books/prml.pdf"]').count(),width:await page.evaluate(()=>document.documentElement.scrollWidth)});
 for(const file of ['books/prml.pdf','books/mml.pdf','slides/lecture-1.pdf','slides/lecture-2.pdf','slides/lecture-3.pdf','slides/lecture-1.pptx','slides/lecture-2.pptx','slides/lecture-3.pptx','downloads/cifar10_mlp_tutorial.py','downloads/rewrite_reference_checks.py','downloads/CIFAR10_MLP_逐步练习.ipynb','MISSION.md']){const response=await page.request.get(base+file);checks.push({name:'download '+file,status:response.status()});if(response.status()!==200)issues.push({name:'download unreachable',file,status:response.status()})}
 // Both canonical section keys and legacy page-qualified keys are supported by the reader.
 await page.evaluate(()=>localStorage.setItem('ml-course-progress-v1',JSON.stringify({a1:false,'lecture-1:a1':true,other:true})));
 await page.goto(base+'lecture-1.html',{waitUntil:'networkidle'});await page.locator('.learning-overview summary').click();const first=page.locator('.learning-mark input').first();
 const initial=await first.isChecked();await first.uncheck();await page.reload({waitUntil:'networkidle'});const afterReload=await page.locator('.learning-mark input').first().isChecked();
 checks.push({name:'qualified legacy progress cleared',initial,afterReload,stored:await page.evaluate(()=>localStorage.getItem('ml-course-progress-v1'))});if(afterReload)issues.push({name:'unread progress reappears after reload',reproduction:'set progress {a1:false,"lecture-1:a1":true}, open A1 learning records, uncheck 已读 A1, reload',impact:'legacy page-qualified true overrides newly saved false'});
 await page.evaluate(()=>localStorage.setItem('ml-course-progress-v1',JSON.stringify({'lecture-1:a1':true,other:true})));
 await page.reload({waitUntil:'networkidle'});await page.locator('.learning-overview summary').click();const imported=page.locator('.learning-mark input').first();const importedTrue=await imported.isChecked();await imported.uncheck();await page.reload({waitUntil:'networkidle'});const cleared=!await page.locator('.learning-mark input').first().isChecked();const preserved=await page.evaluate(()=>JSON.parse(localStorage.getItem('ml-course-progress-v1')).other===true);checks.push({name:'import old qualified key then clear persists',importedTrue,cleared,preserved});if(!importedTrue||!cleared||!preserved)issues.push({name:'legacy-only progress migration or clear failed',importedTrue,cleared,preserved});
 await browser.close();const report={status:issues.length||errors.length?'FAIL':'PASS',date:new Date().toISOString(),base,checks,issues,runtimeErrors:errors};fs.writeFileSync('reports/subagent-function-audit.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify({status:report.status,checks:checks.length,issues,runtimeErrors:errors},null,2));
})().catch(async e=>{console.error(e);await auditBrowser?.close();process.exitCode=1});
