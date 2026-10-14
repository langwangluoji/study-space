import fs from 'node:fs';
import assert from 'node:assert/strict';

// The checked-in audit is the portable input. Local extraction files are not
// needed to rebuild the source-to-lesson reading index.
const audit=JSON.parse(fs.readFileSync('public/insar/ppt-coverage.json','utf8'));
const expected={L1:92,L2:106,L3:59};
const clean=s=>String(s??'').replaceAll('|','／').replace(/[\r\n]+/g,' ');
const out=['<!-- insar-ppt-coverage:start -->','## 按课堂原页查讲义 {#ppt-coverage}','',
 '以下逐页对应三份课堂 PDF。点击文件页可打开原件的对应页，点击讲义位置可回到解释与推导。标题、目录、历史资料和重复图例也列出，但不把它们误写成新的理论知识点。教材和本站推导负责补足理解，不改变课堂材料的主次关系。',''];
let count=0;
for(const lecture of audit.lectures){
 assert.equal(lecture.pages.length,expected[lecture.id]);
 const md=fs.readFileSync('docs/'+lecture.chapter+'.md','utf8');
 const seen=new Set();
 out.push(`<details><summary>${clean(lecture.title)} · ${expected[lecture.id]} 个文件页</summary>`,'',
 '| 原件文件页 | 课堂主题 | 讲义位置 | 阅读说明 |','| --- | --- | --- | --- |');
 for(const row of lecture.pages){
  assert(Number.isInteger(row.page)&&row.page>=1&&row.page<=expected[lecture.id]&&!seen.has(row.page),'Invalid/duplicate original page');seen.add(row.page);
  assert(row.title&&row.anchor&&row.note&&![row.title,row.anchor,row.note].includes('undefined'),'Incomplete coverage record');
  assert(md.includes('{#'+row.anchor+'}'),'Coverage target not in current lesson: '+lecture.id+' '+row.page+' '+row.anchor);
  assert(!/^[A-Z]:[\\/]|file:\/\//i.test(row.note),'Private path in public coverage');
  out.push(`| [${row.page}](material-insar-${lecture.id.toLowerCase()}.html#page=${row.page}) | ${clean(row.title)} | [${clean(row.label||row.title)}](${lecture.chapter}.html#${row.anchor}) | ${clean(row.note)} |`);
 }
 count+=seen.size;out.push('','</details>','');
}
assert.equal(count,257);out.push('逐页主题和讲义定位也保留在[课堂页码对照清单](insar/ppt-coverage.json)。','',
 '<!-- insar-ppt-coverage:end -->','');
const sourcePath='docs/insar-sources.md';let source=fs.readFileSync(sourcePath,'utf8');
const block=out.join('\n')+'\n';
if(source.includes('<!-- insar-ppt-coverage:start -->'))source=source.replace(/<!-- insar-ppt-coverage:start -->[\s\S]*?<!-- insar-ppt-coverage:end -->\s*/,block);
else source=source.replace('## 配图索引 {#figures}',block+'## 配图索引 {#figures}');
fs.writeFileSync(sourcePath,source);console.log('InSAR PPT reading index: '+count+' original pages; all lesson anchors verified.');
