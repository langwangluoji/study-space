import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {chromium} from 'playwright';

const root = path.resolve('docs/.vitepress/dist'), prefix = '/study-space/';
const mime = {'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.svg':'image/svg+xml','.json':'application/json','.png':'image/png','.woff2':'font/woff2'};
const server = http.createServer((req,res) => {
  const pathname = decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if (!pathname.startsWith(prefix)) {res.writeHead(404).end();return;}
  let file = path.resolve(root,pathname.slice(prefix.length)||'index.html');
  if (!file.startsWith(root+path.sep)) {res.writeHead(403).end();return;}
  if (!fs.existsSync(file) && fs.existsSync(file+'.html')) file += '.html';
  if (!fs.existsSync(file) || fs.statSync(file).isDirectory()) {res.writeHead(404).end();return;}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');
  fs.createReadStream(file).pipe(res);
});
await new Promise(r=>server.listen(0,'127.0.0.1',r));
const base = `http://127.0.0.1:${server.address().port}${prefix}`;
const browser = await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:process.platform==='win32'?{channel:'msedge'}:{})});
const cases = [], errors = [];
try {
  const page = await browser.newPage({viewport:{width:1440,height:1000},reducedMotion:'reduce'});
  const traffic = JSON.parse(fs.readFileSync('traffic.config.json','utf8'));
  for (const url of [traffic.endpoint,traffic.historyUrl]) await page.route(url,r=>r.fulfill({status:200,contentType:'application/json',headers:{'Access-Control-Allow-Origin':'*'},body:JSON.stringify({success:true,data:{page_pv:0,page_uv:0},version:1,startDate:traffic.startDate,timeZone:traffic.timeZone,days:[],errors:[]})}));
  page.on('pageerror',e=>errors.push(e.message));
  const topics = [
    ['geodesy-coordinate-forward','blh-xyz'],['geodesy-coordinate-inverse','inverse'],
    ['geodesy-local-polar','local-polar'],['geodesy-pivot-models','transform-pivot'],
    ['geodesy-orbit-celestial-sphere','celestial'],['geodesy-orbit-time-systems','time']
  ];
  fs.mkdirSync('reports/screenshots',{recursive:true});
  for (const [slug,mode] of topics) {
    await page.goto(base+slug+'.html',{waitUntil:'networkidle'});
    await page.waitForFunction(()=>document.getElementById('app')?.__vue_app__);
    const figure = page.locator(`iframe[src*="/geodesy/interactive/${mode}.html"]`);
    await figure.scrollIntoViewIfNeeded();
    const frame = figure.contentFrame();
    await frame.locator('svg').waitFor();
    const input = frame.locator('input').first(), initial = await input.inputValue();
    const initialReadout = await frame.locator('dl').innerText();
    await input.fill('');
    assert((await frame.locator('#status').innerText()).length>0,mode+' empty input');
    await frame.getByRole('button',{name:/重置|恢复/}).click();
    assert.equal(await input.inputValue(),initial);
    await input.focus();await page.keyboard.press('ArrowUp');
    assert.notEqual(await input.inputValue(),initial,mode+' keyboard update');
    assert.notEqual(await frame.locator('dl').innerText(),initialReadout,mode+' live readout');
    await frame.getByRole('button',{name:/重置|恢复/}).click();
    assert.equal(await frame.locator('dl').innerText(),initialReadout);
    assert.equal(await page.locator('mjx-merror,[data-mjx-error]').count(),0);
    await page.screenshot({path:`reports/screenshots/geodesy-${mode}-desktop.png`,fullPage:false});
    for (const width of [390,320]) {
      await page.setViewportSize({width,height:844});
      assert(await page.evaluate(()=>document.documentElement.scrollWidth<=innerWidth+1),slug+' outer overflow');
      assert(await frame.locator('body').evaluate(e=>e.scrollWidth<=innerWidth+1),mode+' embedded overflow');
    }
    await page.screenshot({path:`reports/screenshots/geodesy-${mode}-mobile.png`,fullPage:false});
    await page.setViewportSize({width:1440,height:1000});
    cases.push({slug,mode,inputResetKeyboard:true,mobileWidths:[390,320]});
  }
  assert.deepEqual(errors,[]);
  // check-ui.cjs already runs the established source-figure, pager, search,
  // progress and old-anchor checks. This runner covers only the new embeds.
  fs.writeFileSync('reports/geodesy-new-browser.json',JSON.stringify({status:'PASS',cases,errors,legacyCourseChecks:'scripts/check-ui.cjs'},null,2)+'\n');
  console.log('PASS six new embedded diagrams, desktop and 390/320px, inputs/reset/keyboard');
} finally {await browser.close();server.close();}
