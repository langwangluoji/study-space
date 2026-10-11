import fs from 'node:fs';import path from 'node:path';
const root=path.resolve('docs/.vitepress/dist'),base='/study-space/';
const walk=(p)=>fs.readdirSync(p,{withFileTypes:true}).flatMap(e=>e.isDirectory()?walk(path.join(p,e.name)):[path.join(p,e.name)]);
const html=walk(root).filter(p=>p.endsWith('.html'));const errors=[];let checked=0;
for(const file of html){
 const source=fs.readFileSync(file,'utf8');
 if(/data-mjx-error|<merror|class="mjx-merror"/.test(source))errors.push(`公式渲染失败: ${path.basename(file)}`);
 if(/MathJax\s*=|tex-svg\.js|library-index\.js/.test(source))errors.push(`重复运行脚本: ${file}`);
 for(const match of source.matchAll(/(?:href|src)="([^"]+)"/g)){
  let url=match[1].replaceAll('&amp;','&');if(/^(https?:|data:|mailto:|tel:|javascript:)/.test(url))continue;
  const [pathname,hash]=url.split('#');let decoded;try{decoded=decodeURIComponent(pathname.split('?')[0])}catch{errors.push(`非法链接: ${url}`);continue}
  if(!decoded&&!hash)continue;
  let target=decoded.startsWith(base)?path.join(root,decoded.slice(base.length)):decoded.startsWith('/')?path.join(root,decoded.slice(1)):path.resolve(path.dirname(file),decoded||path.basename(file));
  if(!target.startsWith(root)) {errors.push(`越界链接: ${url}`);continue}
  if(fs.existsSync(target)&&fs.statSync(target).isDirectory())target=path.join(target,'index.html');
  if(!fs.existsSync(target)&&!path.extname(target)&&fs.existsSync(target+'.html'))target+='.html';
  if(!fs.existsSync(target)){errors.push(`${path.basename(file)} 缺失文件 ${url}`);continue}
  if(hash&&target.endsWith('.html')&&!/^page=/.test(hash)){
   const body=fs.readFileSync(target,'utf8');const id=decodeURIComponent(hash);
   if(!body.includes(`id="${id}"`))errors.push(`${path.basename(file)} 缺失锚点 ${url}`);
  }checked++;
 }
}
for(const c of JSON.parse(fs.readFileSync('course.config.json','utf8'))){const src=fs.readFileSync(path.join(root,c.slug+'.html'),'utf8');for(const s of c.sections)if(!src.includes(`id="${s.id}"`))errors.push('旧锚点丢失: '+s.id)}
if(errors.length)throw Error([...new Set(errors)].join('\n'));
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/build-check.json',JSON.stringify({status:'PASS',pages:html.length,links:checked,base,version:'1.6.4',legacyAnchors:42},null,2)+'\n');console.log(`通过: ${html.length} 页，${checked} 个内部链接/资源，42 个旧锚点。`);
