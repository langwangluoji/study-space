import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';
export function generateCatalog(){
  const space=JSON.parse(fs.readFileSync('study-space.config.json','utf8'));
  const resources=JSON.parse(fs.readFileSync('resources.config.json','utf8'));
  const courses=new Set(), ids=new Set();
  const localPath=(url,root)=>{
    if(typeof url!=='string'||!url.startsWith('/')||url.startsWith('//'))throw Error('目录中的站内路径必须以单个 / 开头: '+url);
    const result=path.resolve(root,decodeURIComponent(url.split('#')[0]).slice(1));
    if(!result.startsWith(path.resolve(root)+path.sep))throw Error('目录路径越界: '+url);
    return result;
  };
  for(const c of space.courses){
    if(!c.id||courses.has(c.id))throw Error('重复或缺失课程 ID: '+c.id);
    courses.add(c.id);
    for(const key of ['entry','start','source']){
      const file=localPath(c[key],'docs').replace(/\.html$/,'.md');
      if(!fs.existsSync(file))throw Error('课程入口缺失: '+c[key]);
    }
  }
  const versions=JSON.parse(fs.readFileSync('reports/source-versions.json','utf8'));
  const materials=JSON.parse(fs.readFileSync('public/geodesy/materials/manifest.json','utf8'));
  const materialPages={S1:29,S2:8,S3:60,S5:294};
  for(const r of resources.filter(r=>r.reader)){
    const output=localPath(r.preview,'docs').replace(/\.html$/,'.md');
    if(!r.file||!['pdf','file'].includes(r.reader))throw Error('无效资料阅读配置: '+r.id);
    const download=`<a href="/study-space${r.file}" download>下载原 ${r.format}</a>`;
    const owner=space.courses.find(c=>c.id===r.course);
    if(!owner)throw Error('资料阅读页所属课程不存在: '+r.id);
    const preview=r.reader==='pdf'?`<PdfReader src="${r.file.slice(1)}" title="${r.title}" />`:'下载原文件后使用 '+(r.format==='DOCX'?'Word':'PowerPoint')+' 或兼容阅读器打开。此页面提供资料说明，不在浏览器执行原文件。';
    fs.writeFileSync(output,`---\ntitle: ${JSON.stringify(r.title)}\nprev: false\nnext: false\n---\n\n# ${r.title}\n\n[返回资料中心](resources.html#${r.course}) · ${download}\n\n${r.author}。${r.description}\n\n${preview}\n\n## 对应知识与来源\n\n[课程总览](${owner.entry.slice(1)}) · [来源与页码索引](${owner.source.slice(1)})${r.materialId?' · [原件校验清单](geodesy/materials/manifest.json)':''}\n\n原资料保留原署名与内容，网页整理的范围以课程总览和来源索引为准。\n`);
  }
  const enriched=resources.map(r=>{
    for(const key of ['id','title','course','type','author','description','preview','format'])if(typeof r[key]!=='string'||!r[key])throw Error('资料缺少字段 '+key);
    if(ids.has(r.id)||!courses.has(r.course))throw Error('重复资料 ID 或未知课程: '+r.id);
    ids.add(r.id);
    if(!fs.existsSync(localPath(r.preview,'docs').replace(/\.html$/,'.md')))throw Error('资料预览不存在: '+r.preview);
    if(r.localOnly&&(r.file||r.external||r.alternate))throw Error('本地资料不能显示下载: '+r.id);
    for(const key of ['source','external','release'])if(r[key]&&!/^https:\/\//.test(r[key]))throw Error('外部链接必须使用 HTTPS: '+r.id);
    const result={...r};
    for(const key of ['file','alternate'])if(r[key]){
      const file=localPath(r[key],'public');
      if(!fs.existsSync(file))throw Error('资料下载不存在: '+r[key]);
      if(key==='file')result.bytes=fs.statSync(file).size;
    }
    const version=versions.find(v=>'/'+v.file===(r.alternate??r.file));
    if(version)result.pages=version.pages;
    if(r.materialId){
      const material=materials.find(m=>m.id===r.materialId);
      const file=localPath(r.file,'public');
      if(!material||'/geodesy/materials/'+material.file!==r.file||createHash('sha256').update(fs.readFileSync(file)).digest('hex')!==material.sha256)throw Error('原资料校验不符: '+r.id);
      if(materialPages[r.materialId])result.pages=materialPages[r.materialId];
    }
    return result;
  });
  const paths=JSON.parse(fs.readFileSync('learning-paths.config.json','utf8'));
  const pathIds=new Set();
  for(const p of paths){
    if(!p.id||pathIds.has(p.id)||!courses.has(p.course))throw Error('扩展路线 ID 或课程无效: '+p.id);
    pathIds.add(p.id);
    if(!p.title||!p.purpose||!p.returnLabel||!Array.isArray(p.steps)||!p.steps.length)throw Error('扩展路线说明不完整: '+p.id);
    if(!Array.isArray(p.resources)||!p.resources.length||p.resources.some(id=>!resources.some(r=>r.id===id&&r.course===p.course)))throw Error('扩展路线资料无效: '+p.id);
    if(!fs.existsSync(localPath(p.returnTo,'docs').replace(/\.html$/,'.md')))throw Error('扩展路线返回页缺失: '+p.id);
  }
  fs.writeFileSync('docs/.vitepress/resource-catalog.json',JSON.stringify(enriched,null,2)+'\n');
  fs.writeFileSync('public/resources-catalog.json',JSON.stringify(enriched,null,2)+'\n');
  const ml=JSON.parse(fs.readFileSync('course.config.json','utf8'));
  const geodesy=JSON.parse(fs.readFileSync('geodesy.config.json','utf8'));
  const catalog={siteTitle:'Study Space · 学习空间',courses:space.courses.map(c=>({id:c.id,title:c.title,category:c.field,url:c.entry.slice(1),description:c.summary,status:c.status,chapters:c.id==='ml'?ml.map(ch=>({id:ch.slug,title:ch.title,url:ch.slug+'.html',points:ch.sections.length})):c.id==='geodesy'?geodesy.map(ch=>({id:ch.slug,title:ch.title,url:ch.slug+'.html',topics:ch.topics})):c.chapters??[]}))};
  fs.writeFileSync('public/course-catalog.json',JSON.stringify(catalog,null,2)+'\n');
  console.log(`目录核对通过：${courses.size} 门课程，${resources.length} 份资料。`);
}
