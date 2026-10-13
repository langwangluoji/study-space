import fs from 'node:fs';
const names={campbell:'Campbell, Wynne & Thomas · Introduction to Remote Sensing, 6th ed. (2023)',ccrs:'Canada Centre for Remote Sensing · Fundamentals of Remote Sensing'};
const maps=JSON.parse(fs.readFileSync('remote-sensing-textbook.config.json','utf8').replace(/^\uFEFF/,''));
const bookFigures=JSON.parse(fs.readFileSync('public/remote-sensing/textbook-figures/manifest.json','utf8')).figures;
if(new Set(maps.map(r=>r.anchor)).size!==maps.length)throw Error('Duplicate textbook map anchor');
const out=['<!-- textbook-crosswalk:start -->','## 逐节教材对照与阅读 / Section-by-section textbook reading {#rs-sources-crosswalk}','','<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">','','以下覆盖已建成的前四章全部36个主知识节（含章末阅读路线）。以老师推荐的第六版为主要参考，CCRS教程为辅助。正文中的“教材对照与阅读”定位本页条目；可按所列PDF文件页在本地教材跳转，并用印刷页与原图号确认位置。每条同时给出概念边界和返回正文入口。第五至第九章尚未建立正式学习正文，仍见课程范围记录。','','</div>','','<div class="rs-lang" data-rs-lang="en" lang="en">','','This index covers all 36 main sections in the four existing chapters, including end-of-chapter reading routes. The instructor-recommended sixth edition is the primary reference, with the CCRS tutorial as a supplement. Lesson reading links open the matching record here. Use the PDF file page in your local book, then confirm the printed page and figure number. Each record gives concept boundaries and a return link. Chapters 5–9 do not yet have formal lessons.','','</div>',''];
for(let chapter=1;chapter<=4;chapter++){
 out.push('### 第'+chapter+'章 / Chapter '+chapter+' {#rs-book-chapter-'+chapter+'}','','| 知识点 / Concept | 教材定位 / Reading location |','| --- | --- |');
 for(const r of maps.filter(r=>r.chapter===chapter))out.push('| ['+r.zh+' / '+r.en+'](#rs-book-'+r.anchor+') | '+r.readings.map(x=>(x.book==='campbell'?'Campbell 6e':'CCRS')+' · PDF '+x.filePages).join('<br>')+' |');
 out.push('');
 for(const r of maps.filter(r=>r.chapter===chapter)){
  out.push('#### '+r.zh+' / '+r.en+' {#rs-book-'+r.anchor+'}','');
  for(const [lang,label,change] of [['zh','阅读重点与概念边界',r.changesZh],['en','Reading focus and concept boundaries',r.changesEn]]){
   out.push('<div class="rs-lang" data-rs-lang="'+lang+'" lang="'+(lang==='zh'?'zh-CN':'en')+'">','','| '+(lang==='zh'?'教材与章小节 | PDF文件页 | 印刷页':'Book and section | PDF file pages | Printed pages')+' |','| --- | --- | --- |');
   for(const x of r.readings)out.push('| '+names[x.book]+'<br>'+x.section.replace(/\|/g,'/')+' | '+x.filePages+' | '+(x.printedPages||'—')+' |');
   out.push('',label+'：'+change,'','['+(lang==='zh'?'返回正文':'Return to the lesson')+'](/remote-sensing-ch'+chapter+'#'+r.anchor+')','');
   const matching=bookFigures.filter(f=>f.target_anchor===r.anchor);
   if(matching.length)out.push(matching.map(f=>'['+(lang==='zh'?f.title_zh:f.title_en)+'](#rs-figure-'+f.id+')').join(' · '),'');
   out.push('</div>','');
  }
 }
}
out.push('## 英文教材原图索引 / Original English textbook figures {#rs-sources-textbook-figures}','','<div class="rs-lang" data-rs-lang="zh" lang="zh-CN">','','新增11幅教材原图，按原PDF渲染并裁切，保留英文标签、原图注、图号和署名；没有重绘或替换坐标数据。原图旁的双语说明解释术语和适用条件。教材整本继续本地存档；精选配图用于本课程学习资料。裁切框、尺寸和来源校验值见[教材图清单](/remote-sensing/textbook-figures/manifest.json)。','','</div>','','<div class="rs-lang" data-rs-lang="en" lang="en">','','Eleven textbook figures are rendered and cropped from the supplied PDFs, retaining original English labels, captions, figure numbers and credits. Figures and coordinates have not been redrawn. Adjacent bilingual notes explain terminology and assumptions. Complete books remain locally archived; selected figures support these course-study materials. Crop boxes, sizes and source hashes are recorded in the [textbook figure manifest](/remote-sensing/textbook-figures/manifest.json).','','</div>','');
for(const f of bookFigures)out.push('<details><summary>'+f.title_zh+' / '+f.title_en+' · '+(f.figure_number||'')+' · PDF '+f.page+'</summary>','','<RsFigure id="'+f.id+'" />','','</details>','');
out.push('<!-- textbook-crosswalk:end -->');
let source=fs.readFileSync('docs/remote-sensing-sources.md','utf8');
const section=out.join('\n')+'\n\n';
if(source.includes('<!-- textbook-crosswalk:start -->'))source=source.replace(/<!-- textbook-crosswalk:start -->[\s\S]*?<!-- textbook-crosswalk:end -->\s*/,section);
else source=source.replace('## 原课件图索引',section+'## 原课件图索引');
fs.writeFileSync('docs/remote-sensing-sources.md',source);
const errors=[];
for(const r of maps){
 const text=fs.readFileSync('docs/remote-sensing-ch'+r.chapter+'.md','utf8');
 if(!text.includes('{#'+r.anchor+'}'))errors.push('Missing lesson anchor '+r.anchor);
 if((text.match(new RegExp('remote-sensing-sources#rs-book-'+r.anchor+'[)\\s]','g'))||[]).length<2)errors.push('Missing bilingual reading links '+r.anchor);
}
for(const f of bookFigures){
 if(!maps.some(r=>r.anchor===f.target_anchor))errors.push('Unmapped figure '+f.id);
 if(!fs.existsSync('public'+f.src))errors.push('Missing figure '+f.src);
}
if(errors.length)throw Error(errors.join('\n'));
fs.writeFileSync('public/remote-sensing/textbook-crosswalk.json',JSON.stringify({scope:'Existing Chapters 1–4',sections:maps,figures:bookFigures.map(f=>({id:f.id,anchor:f.target_anchor}))},null,2)+'\n');
fs.writeFileSync('reports/textbook-crosswalk-check.json',JSON.stringify({status:'PASS',sections:maps.length,languageLinks:maps.length*2,textbookFigures:bookFigures.length,chapters:[1,2,3,4]},null,2)+'\n');
console.log('Textbook crosswalk: '+maps.length+' sections, '+maps.length*2+' bilingual reading links, '+bookFigures.length+' figures.');
