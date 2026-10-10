import fs from 'node:fs';
import path from 'node:path';
const root=process.cwd(), docs=path.join(root,'docs');
const python=fs.readFileSync('public/downloads/cifar10_mlp_tutorial.py','utf8');
const codeMap=JSON.parse(fs.readFileSync('practice-code.config.json','utf8'));
fs.mkdirSync(path.join(docs,'_fragments/generated'),{recursive:true});
for(const [id,names] of Object.entries(codeMap)){
 const chunks=names.map(name=>{
  const re=new RegExp(`^(?:def|class) ${name}\\b`,'m');const hit=re.exec(python);
  if(!hit)throw Error('代码来源缺失: '+name);
  const tail=python.slice(hit.index);const next=/\n(?=def |class |@dataclasses|if __name__)/.exec(tail);
  return tail.slice(0,next?.index??tail.length).trim();
 });
 fs.writeFileSync(path.join(docs,'_fragments/generated',id+'-code.md'),'```python\n'+chunks.join('\n\n')+'\n```\n');
}
const normalizeMarkdown=src=>src.split(/(```[\s\S]*?```)/g).map(p=>p.startsWith('```')?p:p.replace(/<p[^>]*>/g,'\n\n').replace(/<\/p>/g,'\n\n').replace(/\\\[([\s\S]*?)\\\]/g,(_,tex)=>'\n\n$$\n'+tex.trim()+'\n$$\n\n').replace(/\\\(([\s\S]*?)\\\)/g,(_,tex)=>'$'+tex+'$')).join('');
const course=JSON.parse(fs.readFileSync('course.config.json','utf8'));
const slugSet=new Set(), ids=new Set();
for(const [chapterIndex,chapter] of course.entries()){
  if(slugSet.has(chapter.slug)) throw Error('重复页面: '+chapter.slug);
  slugSet.add(chapter.slug);
  const prev=chapterIndex?{text:course[chapterIndex-1].title,link:'/'+course[chapterIndex-1].slug}:{text:'课程总览',link:'/course-ml'};
  const next=chapterIndex<course.length-1?{text:course[chapterIndex+1].title,link:'/'+course[chapterIndex+1].slug}:false;
  let text=`---\ntitle: ${chapter.title}\nprev: ${JSON.stringify(prev)}\nnext: ${JSON.stringify(next)}\n---\n\n# ${chapter.title}\n\n本讲可以连续阅读。具体算例、练习和互动图默认收起；结论所需条件保留在正文。\n\n`;
  for(const section of chapter.sections){
    if(ids.has(section.id))throw Error('重复知识点: '+section.id);ids.add(section.id);
    const source=path.resolve(docs,section.source);
    if(!source.startsWith(docs+path.sep)||!fs.existsSync(source))throw Error('缺失或非法片段: '+section.source);
    const fragment=fs.readFileSync(source,'utf8');
    if(!fragment.includes(`{#${section.id}}`))throw Error('缺失旧锚点: '+section.id);
    const heading=fragment.split('\n')[0];
    if(!heading.includes(section.title))throw Error('配置标题与片段不一致: '+section.id);
    text+=`<!--@include: ./${section.source}-->\n\n<LearningMark section="${section.id}" />\n\n`;
  }
  fs.writeFileSync(path.join(docs,chapter.slug+'.md'),text);
}
const staticRoot=path.join(root,'public');
const readers=[['read-sources','资料来源与使用边界','sources.md'],['read-downloads-cifar10_mlp_tutorial','实践脚本阅读版','downloads/cifar10_mlp_tutorial.py'],['read-downloads-rewrite_reference_checks','数学核验脚本阅读版','downloads/rewrite_reference_checks.py']];
for(const [slug,title,file] of readers){
  const src=fs.readFileSync(path.join(staticRoot,file),'utf8');
  fs.writeFileSync(path.join(docs,slug+'.md'),`# ${title}\n\n<a href="/study-space/${file}">下载源文件</a> · 阅读版在构建时由源文件生成。\n\n`+(file.endsWith('.md')?src:'```python\n'+src+'\n```\n'));
}
const notebookFile='downloads/CIFAR10_MLP_逐步练习.ipynb';
const notebook=JSON.parse(fs.readFileSync(path.join(staticRoot,notebookFile),'utf8'));
const cells=notebook.cells.map((c,i)=>{
  const source=(Array.isArray(c.source)?c.source.join(''):c.source).replaceAll('../cifar10-practice.html','cifar10-practice.html').replaceAll('](cifar10_mlp_tutorial.py)','](downloads/cifar10_mlp_tutorial.py)');
  return c.cell_type==='markdown'?normalizeMarkdown(source):`<details><summary>代码单元 ${i+1}</summary>\n\n### 代码单元 ${i+1} {#cell-${i+1}}\n\n\`\`\`python\n${source}\n\`\`\`\n\n</details>`;
});
fs.writeFileSync(path.join(docs,'read-notebook.md'),`# 逐步 Notebook 阅读版\n\n[下载 Notebook](${notebookFile})。保留运行单元顺序；历史输出请查阅资料中心。\n\n`+cells.join('\n\n'));
fs.writeFileSync(path.join(docs,'read-README.md'),fs.readFileSync('README.md','utf8'));
console.log(`生成 ${course.length} 个整讲页面、${ids.size} 个知识点与 5 个来源阅读页。`);
