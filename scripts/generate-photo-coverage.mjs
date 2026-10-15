import fs from 'node:fs';
const research='../research/';
const entries=[
[1,1,'定义、任务和发展',1,2],[1,2,'发展阶段与数字摄影测量',3,6],[1,3,'影像信息学',6,7],
[2,1,'航空影像获取',8,21],[2,2,'遥感影像',22,29],
[3,1,'航空摄影',30,33],[3,2,'中心投影',34,35],[3,3,'特殊点线面',36,37],[3,4,'常用坐标系',37,39],[3,5,'内外方位',40,42],[3,6,'空间变换与共线方程',43,48],[3,7,'像点位移',49,53],
[4,1,'人眼立体视觉与立体量测',54,59],[4,2,'立体像对与立体测图',60,62],[4,3,'相对与绝对定向元素',63,65],[4,4,'立体测图概述',65,70],
[5,1,'解析概述',71,72],[5,2,'空间后方交会',72,78],[5,3,'前方交会',78,81],[5,4,'解析相对定向',81,89],[5,5,'解析绝对定向',89,93],[5,6,'双像光束法严密解',93,96],
[6,1,'空中三角测量概述',97,100],[6,2,'航带网法',101,105],[6,3,'独立模型法区域网',106,108],[6,4,'光束法区域网',109,113],[6,5,'GPS辅助空三',114,121],[6,6,'机载POS对地定位',122,127]];
const sections=entries.map(([c,n,title,a,b])=>({section:`${c}-${n}`,title,printed:[a,b],pdf:[a+9,b+9],target:`/photogrammetry-wang-${c<=4?'0'+c:'ch'+c}.html#${c<=2?'section-'+c+'-'+n:c<=4?'s'+c+'-'+n:'s'+c+n}`}));
for(const filename of [research+'wang12-coverage.json','research/wang34-coverage.json',research+'wang56-coverage.json']){
 const meta=JSON.parse(fs.readFileSync(filename,'utf8'));
 const rows=meta.sections??meta.chapters.flatMap(c=>c.sections);
 for(const row of rows){const entry=sections.find(s=>s.section===row.section);if(entry){entry.coverage=row.coverage;entry.boundary=row.simplified??row.boundary??'概念与推导展开；原图和历史参数按来源回读';}}
}
const introPath=research+'ppt-coverage/chapter1-mapping.json';
if(!fs.existsSync(introPath))throw new Error('119-page introduction map is required');
const sourceIntro=JSON.parse(fs.readFileSync(introPath,'utf8'));
const intro=Array.isArray(sourceIntro)?sourceIntro:sourceIntro.pages??sourceIntro.items;
if(!intro)throw new Error('Unknown introduction map schema');
const ppts=[...intro.map(x=>({...x,source:'ppt-intro',page:x.page??x.pdfPage,target:x.target??x.anchor,topic:x.topic??x.title,kind:x.kind??x.category})),...JSON.parse(fs.readFileSync(research+'ppt-coverage/chapter3-mapping.json','utf8'))];
const order=JSON.parse(fs.readFileSync('public/photogrammetry/order.json','utf8'));
function englishPosition(target){
 const [path,id]=target.split('#'),md=fs.readFileSync('docs'+path.replace('.html','.md'),'utf8');
 const headingPos=md.indexOf(`{#${id}}`),spanPos=md.indexOf(`<span id="${id}">`);
 const pos=headingPos>=0?headingPos:spanPos;if(pos<0)throw Error('Missing new prose anchor '+target);
 const matches=[...md.slice(0,pos+id.length+5).matchAll(/^## (\d+\.\d+) [^\n]*\{#(e[^}]+)\}/gm)];
 const last=matches.at(-1);if(!last)throw Error('No English section for '+target);
 return {section:last[1],target:path+'#'+last[2]};
}
for(const item of [...sections,...ppts]){
 item.sourceTarget=item.target;
 const moved=order.routes[item.target];if(!moved)throw Error('Unmapped old source '+item.target);
 item.target=moved;
 if(item.source==='ppt-sensors'){
  if(item.page>=104&&item.page<=105)item.target='/photogrammetry-en-03.html#sensor-scanners-after';
  if(item.page>=131&&item.page<=132)item.target='/photogrammetry-en-03.html#sensor-timing-calibration-after';
  if(item.page>=137)item.target='/photogrammetry-en-03.html#sensor-active-platforms-after';
 }
 if(item.source==='ppt-intro'&&item.page===27)item.target='/photogrammetry-en-02.html#intro-inverse-case';
 if(item.source==='ppt-intro'&&item.page===28)item.target='/photogrammetry-en-03.html#intro-line-stereo-case';
 item.englishSection=englishPosition(item.target).section;
}
for(const source of ['ppt-intro','ppt-sensors']){
 const found=ppts.filter(x=>x.source===source);const total=source==='ppt-intro'?119:146;
 if(found.length!==total||new Set(found.map(x=>x.page)).size!==total||found.some(x=>!x.target||!x.topic||!x.kind))throw new Error('Incomplete map '+source);
}
// Raw extraction and page evidence remain in local research. Public index is a crosswalk.
const publicPpts=ppts.map(({source,page,topic,kind,target,review,sourceTarget,englishSection})=>({source,page,topic,kind,target,review,sourceTarget,englishSection}));
const coverage={scope:'英文教材顺序；融合王书前六章28节与两课件265物理页；不是逐字转录',englishCoreSections:order.sections.filter(s=>s.chapter<=5),sections,ppts:publicPpts};
fs.writeFileSync('public/photogrammetry/coverage.json',JSON.stringify(coverage,null,2)+'\n');
let md='# 教材与PPT · 逐节逐页覆盖\n\n主讲义按英文教材顺序，来源索引用于查漏。每条现在直接指向重组后的实际正文，而非旧王书目录。PPT页码使用阅读器的**物理页**，不是页脚编号；历史、提纲、重复与参考页分别处理，不计作新推导。\n\n[回到学习路线](./course-photogrammetry.md) · [两书符号和迁移](./photogrammetry-conventions.md) · [校验与边界](./photogrammetry-quality.md)\n\n## 英文核心顺序：41节 {#english}\n\n这些小节顺序经原著目录PDF9核对。章节入口存在不代表全书细节都已重写；当前深度见各节正文与范围说明。\n\n|英文原节|主题|原著印刷/PDF起页|融合讲义|\n|---|---|---|---|\n';
for(const x of coverage.englishCoreSections)md+=`|${x.section}|${x.en} · ${x.zh}|${x.printedPage} / ${x.pdfPage}|[阅读](${x.target})|\n`;
md+='\n## 王书前六章：28节 {#wang}\n\n扫描正文页码在此范围内为印刷页加9。原节可能拆入多个英文主题；下表提供主入口，正文段落仍保留原书出处。\n\n|原节|主题|印刷页 / PDF页|英文主位置|融合正文|\n|---|---|---|---|---|\n';
for(const x of sections)md+=`|${x.section}|${x.title}|${x.printed.join('–')} / ${x.pdf.join('–')}|${x.englishSection}|[对应正文](${x.target})|\n`;
const names={concept:'概念',formula:'公式/推导',figure:'图示',example:'案例/计算',history:'历史',outline:'标题/提纲',reference:'参考',duplicate:'重复',admin:'课程说明'};
for(const [source,title] of [['ppt-intro','绪论PPT：119页'],['ppt-sensors','传感系统PPT：146页']]){
 md+=`\n## ${title} {#${source}}\n\n同一连续推导的多页可能指向同一段；图示和算例的独有信息在正文就地解释。\n\n|物理页|页内主题|处理类型|英文小节|正文定位|\n|---|---|---|---|---|\n`;
 for(const x of ppts.filter(x=>x.source===source).sort((a,b)=>a.page-b.page))md+=`|${x.page}|${x.topic.replaceAll('|',' / ')}|${names[x.kind]??x.kind}|${x.englishSection}|[讲义段落](${x.target})|\n`;
}
md+='\n## 如何自己核对 {#how}\n\n在资料入口选择本机PPT，按物理页打开，再点本表正文链接。检查三件事：原页的概念是否解释；公式符号、单位和条件是否交代；原图或算例独有信息是否在正文中出现。整段只给一个宽泛标题不能满足这三项。完整教材的旧设备参数与课程行政信息保留查阅语境，不要求背诵。\n';
fs.writeFileSync('docs/photogrammetry-coverage.md',md);
console.log(`Coverage generated: ${sections.length} textbook sections, ${ppts.length} PPT pages.`);
