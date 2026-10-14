import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import assert from 'node:assert/strict';

// One-time source preparation. The public results are checked in so that the
// normal build requires no private work directory or source PDF installation.
const hash=b=>crypto.createHash('sha256').update(b).digest('hex');
const chapters=['insar-microwave','insar-imaging','insar-interpretation'];
const titles=['第一讲 · 微波遥感基础','第二讲 · 合成孔径雷达成像原理','第三讲 · SAR 图像特征及解译'];
const sources=JSON.parse(fs.readFileSync('public/insar/source-manifest.json','utf8'));
const figures=JSON.parse(fs.readFileSync('public/insar/figures/manifest.json','utf8'));
const lectures=[];
for(let chapter=1;chapter<=3;chapter++){
 const input=JSON.parse(fs.readFileSync(`../work/insar-revision-ch${chapter}.json`,'utf8'));
 const md=fs.readFileSync(`docs/${chapters[chapter-1]}.md`,'utf8');
 const source=input.source_file||input.source||['第一讲-微波遥感基础-202609(1).pdf','第二讲-合成孔径雷达成像原理-202609.pdf','第三讲-SAR图像特征及解译-202610.pdf'][chapter-1];
 const original=sources.find(s=>s.filename===source);assert(original,'Missing source fingerprint');
 const pages=input.pages.map(p=>({page:p.page??p.pdf_page,
  title:String(p.original_topic||p.topic||p.title).trim(),anchor:(p.anchor||p.target_anchor).replace(/^#/,''),
  note:String(p.modification||p.change||p.handling||p.note||p.coverage_after).trim(),
  review_method:p.visual_review||p.review_method||(p.formula_check?.visual?'原页视觉核对':'联系表逐页核对，关键公式页另放大检查'),
  review_status:p.status||'see_formula_conditions',
  formula_check:p.formula_check||p.formula_checks||p.mathematical_check||null})).sort((a,b)=>a.page-b.page);
 lectures.push({id:'L'+chapter,title:titles[chapter-1],chapter:chapters[chapter-1],
  source,source_sha256:original.sha256,lesson_sha256:hash(Buffer.from(md)),pages});
 const sidecar=JSON.parse(fs.readFileSync(`../work/insar-revision-ch${chapter}-figures.json`,'utf8'));
 const additions=Array.isArray(sidecar)?sidecar:sidecar.figures;
 for(const f of additions){
  const name=path.win32.basename(f.file||f.filename||f.path);const file='public/insar/figures/'+name;const bytes=fs.readFileSync(file);
  const originalGraphic=name.endsWith('.svg');let width,height;
  if(name.endsWith('.png')){width=bytes.readUInt32BE(16);height=bytes.readUInt32BE(20)}
  else{const viewBox=bytes.toString().match(/viewBox="([^"]+)"/);assert(viewBox,'Missing SVG viewBox');const v=viewBox[1].split(/\s+/).map(Number);width=v[2];height=v[3]}
  const record={file:name,source_id:originalGraphic?'ORIGINAL':'L'+chapter,
   source:originalGraphic?'Study Space teaching diagram':source,
   ...(originalGraphic?{}:{file_page:f.file_page??f.source_page??f.pdf_page??f.page}),
   operation:originalGraphic?'original SVG; schematic, not to scale':'full-page render; no content edited',
   width,height,sha256:hash(bytes)};
  const previous=figures.find(r=>r.file===name);if(previous)Object.assign(previous,record);else figures.push(record);
 }
}
fs.writeFileSync('public/insar/ppt-coverage.json',JSON.stringify({schema_version:1,
 scope:'课堂前三讲逐页主题与讲义对照；主要公式由原图、推导及独立数值复核，非全部任务参数认证',lectures},null,2)+'\n');
fs.writeFileSync('public/insar/figures/manifest.json',JSON.stringify(figures,null,2)+'\n');
const catalog=JSON.parse(fs.readFileSync('public/materials/catalog.json','utf8'));
for(const source of sources){const r=catalog.find(r=>r.original.filename===source.filename);assert(r&&r.original.sha256===source.sha256);source.public_full_text=true;source.archive_id=r.id}
fs.writeFileSync('public/insar/source-manifest.json',JSON.stringify(sources,null,2)+'\n');
console.log('Prepared three lecture audits and '+figures.length+' attributed figures.');
