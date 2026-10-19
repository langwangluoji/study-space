import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';
const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.woff2':'font/woff2'};
const server=http.createServer((req,res)=>{
 const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
 if(!pathname.startsWith(prefix)){res.writeHead(404).end();return;}
 let file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
 if(!file.startsWith(root+path.sep)){res.writeHead(403).end();return;}
 if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
 if(!fs.existsSync(file)||fs.statSync(file).isDirectory()){res.writeHead(404).end();return;}
 res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const origin=`http://127.0.0.1:${server.address().port}`,browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
const cases=[],errors=[];fs.mkdirSync('reports/anatomy-integration',{recursive:true});
try{
 const p=await browser.newPage({viewport:{width:390,height:900},reducedMotion:'reduce'});
 p.on('pageerror',e=>errors.push(e.message));
 await p.route('https://**',r=>r.abort());
 const reps=[['lecture-1','/ml/calibration'],['lecture-2','/ml/fisher'],['lecture-3','/ml/relu'],['lecture-4','/ml/hog'],['optimization-bv-05','/optimization/'],['photogrammetry-en-04','/photogrammetry/'],['geodesy-intro-frames','/earth-observation/'],['remote-sensing-ch2','/earth-observation/'],['insar-microwave','/earth-observation/']];
 for(const [slug,part]of reps){
  await p.goto(origin+prefix+slug+'.html',{waitUntil:'networkidle'});
  const el=p.locator(`.anatomy-figure iframe[src*="${part}"]`).first();await el.scrollIntoViewIfNeeded();
  const frame=await el.contentFrame();await frame.locator('svg').first().waitFor();
  await p.waitForTimeout(300);
  const inner=await frame.locator('body').evaluate(e=>({w:e.scrollWidth,h:e.scrollHeight,v:innerWidth,text:e.innerText.length}));
  assert(inner.text>80);assert(inner.w<=inner.v+1,slug+' embedded overflow');
  const size1=await el.boundingBox();await p.waitForTimeout(200);const size2=await el.boundingBox();assert(Math.abs(size1.height-size2.height)<2,slug+' resize feedback');
  const url=await el.getAttribute('src');assert(url.startsWith(prefix+'anatomy/'));assert(url.includes('theme='));
  await p.screenshot({path:`reports/anatomy-integration/${slug}-phone.png`});cases.push({slug,url,inner,height:size2.height,stableResize:true});
 }
 await p.goto(origin+prefix+'remote-sensing-ch2.html');await p.getByLabel(/阅读语言/).selectOption('en');
 const remote=p.locator('.anatomy-figure iframe').first();await remote.scrollIntoViewIfNeeded();const rf=await remote.contentFrame();
 await rf.locator('h1').filter({hasText:/[A-Za-z]/}).waitFor();assert((await remote.getAttribute('src')).includes('lang=en'));
 assert(!/[\u3400-\u9fff]/.test(await remote.getAttribute('title')));
 await p.setViewportSize({width:1440,height:900});await p.getByRole('switch').click();await p.waitForTimeout(300);assert((await remote.getAttribute('src')).includes('theme=dark'));
 assert.deepEqual(errors,[]);
 fs.writeFileSync('reports/anatomy-integration/checks.json',JSON.stringify({passed:true,cases,languageAndTheme:true,errors},null,2));
 console.log('Anatomy integration: 9 embedded instruments, phone sizing, language and theme PASS');
}finally{await browser.close();server.close();}
