const fs=require('node:fs'),path=require('node:path'),http=require('node:http'),assert=require('node:assert/strict');
const {chromium}=require(process.env.PLAYWRIGHT_MODULE||'playwright');
const root=path.resolve('docs/.vitepress/dist'),prefix='/study-space/';
const mime={'.html':'text/html; charset=utf-8','.js':'text/javascript','.mjs':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.svg':'image/svg+xml'};
const server=http.createServer((req,res)=>{
  const pathname=decodeURIComponent(new URL(req.url,'http://localhost').pathname);
  if(!pathname.startsWith(prefix)){res.writeHead(404).end();return}
  let file=path.resolve(root,pathname.slice(prefix.length)||'index.html');
  if(!file.startsWith(root+path.sep)&&file!==root){res.writeHead(403).end();return}
  if(fs.existsSync(file)&&fs.statSync(file).isDirectory())file=path.join(file,'index.html');
  if(!fs.existsSync(file)&&fs.existsSync(file+'.html'))file+='.html';
  if(!fs.existsSync(file)){res.writeHead(404).end();return}
  res.setHeader('Content-Type',mime[path.extname(file)]||'application/octet-stream');fs.createReadStream(file).pipe(res);
});
const pairs=[
  ['辐照度','irradiance'],['辐射出射度','radiant exitance'],['辐亮度','radiance'],['反照率','albedo'],['发射率','emissivity'],
  ['亮度温度','brightness temperature'],['地球静止轨道','geostationary orbit'],['太阳同步轨道','Sun-synchronous orbit'],['视场','field of view'],
  ['瞬时视场','instantaneous field of view'],['地面采样距离','ground sampling distance'],['空间分辨率','spatial resolution'],
  ['数字量化值','digital number'],['摆扫','whiskbroom scanning'],['合成孔径雷达','synthetic aperture radar']
];
(async()=>{
  await new Promise(resolve=>server.listen(0,'127.0.0.1',resolve));
  const base=`http://127.0.0.1:${server.address().port}${prefix}`;let browser;
  try{
    browser=await chromium.launch({headless:true,...(process.env.PLAYWRIGHT_CHANNEL?{channel:process.env.PLAYWRIGHT_CHANNEL}:{})});
    const page=await browser.newPage({viewport:{width:1280,height:800}});await page.goto(base+'course-remote-sensing.html',{waitUntil:'networkidle'});
    await page.getByRole('button',{name:'搜索课程笔记',exact:true}).click();const input=page.locator('input[type=search]');const results=[];
    for(const [zh,en] of pairs)for(const query of [zh,en]){
      await input.fill(query);const result=page.locator('.VPLocalSearchBox a[href*="remote-sensing"]').first();await result.waitFor({state:'visible'});
      const href=await result.getAttribute('href');assert(href&&href.includes('remote-sensing'),query);results.push({query,href});
    }
    assert.equal(results.length,30);fs.writeFileSync('reports/remote-sensing-search.json',JSON.stringify({status:'PASS',queries:results},null,2)+'\n');
    console.log('Remote-sensing bilingual search PASS: 30/30');
  }finally{await browser?.close();server.close()}
})().catch(error=>{fs.writeFileSync('reports/remote-sensing-search.json',JSON.stringify({status:'FAIL',error:error.message},null,2)+'\n');console.error(error);server.close();process.exitCode=1});
