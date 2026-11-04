import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import { compileNote, readNote } from './geodesy-publish.mjs';

const dir = path.resolve('knowledge/geodesy/lessons');
const files = fs.readdirSync(dir).filter(n => n.endsWith('.md'));
const slugs = new Set(files.map(n => n.slice(0,-3)));
const errors = [];
let worked = 0, selfchecks = 0, headings = 0, links = 0;
for (const file of files) {
  const source = fs.readFileSync(path.join(dir,file),'utf8').replace(/\r\n/g,'\n');
  const {data} = readNote(source);
  const out = compileNote(source, {slugs});
  if (/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/.test(source)) errors.push(file+': control character');
  if (/<(?:AnatomyFigure|SourceFigure|LearningMark|GeodesyLab)\b/.test(source)) errors.push(file+': website-only component in canonical note');
  if (/^#{1,6} .*\{#[^}]+\}/m.test(source)) errors.push(file+': website-only heading attribute in Obsidian');
  if (data.chapter > 0 && data.order > 0) {
    if (!/!\[[^\]]+\]\(\.\.\/assets\/figures\/[^)]+\)/.test(source)) errors.push(file+': missing offline static figure');
    if (!/例题|算例/.test(source)) errors.push(file+': missing worked example');
    const count = Math.max((source.match(/自测\s*\d/g) ?? []).length, (source.split(/## 自检/)[1]?.match(/^\d\. /gm) ?? []).length, (source.split(/## 自检/)[1]?.match(/^> \[!info\]- \d\./gm) ?? []).length);
    if (count < 2) errors.push(file+': fewer than two selfchecks ('+count+')');
    worked++; selfchecks += count;
  }
  for (const match of source.replace(/^> ?/gm,'').matchAll(/^(#{1,6} [^\n]+)/gm)) {
    if (!out.includes(match[1])) errors.push(file+': publishing lost heading '+match[1]);
    headings++;
  }
  for (const match of source.matchAll(/\[[^\]]*\]\(([^)]+)\)/g)) {
    const href = match[1];
    if (/^(https?:|mailto:|#)/.test(href)) continue;
    const [name,hash] = href.split('#');
    const target = path.resolve(dir,decodeURIComponent(name));
    if (!fs.existsSync(target)) { errors.push(file+': missing local link '+href); continue; }
    if (hash && target.endsWith('.md')) {
      const text = fs.readFileSync(target,'utf8').replace(/^> ?/gm,'');
      const title = decodeURIComponent(hash);
      if (![...text.matchAll(/^#{1,6} (.+)$/gm)].some(m => m[1].trim() === title)) errors.push(file+': missing native heading '+href);
    }
    links++;
  }
}
const coverage = JSON.parse(fs.readFileSync('knowledge/geodesy/coverage.json','utf8'));
assert.equal(coverage.entries.length,285);
assert.equal(new Set(coverage.entries.map(e=>e.source+':'+e.file_page)).size,285);
for (const entry of coverage.entries) if (!slugs.has(entry.topic.split('#')[0])) errors.push('Coverage missing topic '+entry.topic);
const counts = Object.fromEntries(['S1','S3','S7','S8','S9','S10','S11','S6'].map(id=>[id,coverage.entries.filter(e=>e.source===id).length]));
assert.deepEqual(counts,{S1:29,S3:60,S7:11,S8:28,S9:30,S10:10,S11:33,S6:84});
if(errors.length) throw Error(errors.join('\n'));
const report = {status:'PASS',notes:files.length,topicsWithWorkedExamples:worked,selfchecks,headingsPreserved:headings,localLinks:links,sourcePages:285,sourceCounts:counts};
fs.writeFileSync('reports/geodesy-content-quality.json',JSON.stringify(report,null,2)+'\n');
console.log(JSON.stringify(report));
