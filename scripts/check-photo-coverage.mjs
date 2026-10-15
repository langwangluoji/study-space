import fs from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(fs.readFileSync('public/photogrammetry/coverage.json','utf8'));
let checks=0;const ok=(x,msg)=>{assert.ok(x,msg);checks++};
ok(data.sections.length===28,'28 textbook sections');
const order=JSON.parse(fs.readFileSync('public/photogrammetry/order.json','utf8'));
const toc=JSON.parse(fs.readFileSync('research/english-core-order.json','utf8'));
ok(order.sections.filter(x=>x.chapter<=5).length===41,'41 English core sections');
for(const chapter of toc.chapters){
 const actual=order.sections.filter(s=>s.chapter===chapter.number).map(s=>s.section);
 assert.deepEqual(actual,chapter.sections.map(s=>s.number));checks++;
}
for(const [source,n] of [['ppt-intro',119],['ppt-sensors',146]]){
 const pages=data.ppts.filter(x=>x.source===source).map(x=>x.page).sort((a,b)=>a-b);
 assert.deepEqual(pages,Array.from({length:n},(_,i)=>i+1));checks++;
}
const cache=new Map();
for(const item of [...data.sections,...data.ppts]){
 ok(item.topic||item.title,'topic required');
 ok(item.target.startsWith('/photogrammetry-en-'),'coverage must point to reordered prose');
 ok(item.englishSection,'English topic location required');
 const [path,id]=item.target.split('#');ok(id,'specific anchor required '+item.target);
 const slug=path.replace(/^\//,'').replace(/\.html$/,'');
 if(!cache.has(slug))cache.set(slug,fs.readFileSync(`docs/.vitepress/dist/${slug}.html`,'utf8'));
 ok(cache.get(slug).includes(`id="${id}"`),'built anchor missing '+item.target);
 const md=fs.readFileSync(`docs/${slug}.md`,'utf8');
 const marker=new RegExp(`\\{#${id}\\}|<span id="${id}"></span>`);const after=md.split(marker)[1];
 ok(after&&after.split(/\n## /)[0].length>120,'substantive section required '+item.target);
}
const main=['01','02','03','04','05'].map(x=>'photogrammetry-en-'+x);
const other=['06','07','08'].map(x=>'photogrammetry-en-'+x).concat('photogrammetry-conventions');
let figures=0,formulas=0;
for(const slug of [...main,...other]){
 const md=fs.readFileSync(`docs/${slug}.md`,'utf8'),html=fs.readFileSync(`docs/.vitepress/dist/${slug}.html`,'utf8');
 ok(!/data-mjx-error|<merror/.test(html),'math render '+slug);
 ok((md.match(/\$\$/g)||[]).length%2===0,'formula pairing '+slug);
 const ids=[...md.matchAll(/\{#([^}]+)\}|<span id="([^"]+)"/g)].map(x=>x[1]??x[2]);ok(new Set(ids).size===ids.length,'unique explicit IDs '+slug);
 ok(!/undefined|xsim H/.test(md),'no assembly corruption '+slug);
 for(const match of md.matchAll(/<SourceFigure\s[^>]*src="([^"]+)"/g)){
  ok(fs.existsSync('public'+match[1]),'figure exists '+match[1]);figures++;
 }
 formulas+=(html.match(/<mjx-container/g)||[]).length;
 if(main.includes(slug))ok((md.match(/[\u3400-\u9fff]/g)||[]).length>4000,'substantial teaching prose '+slug);
}
const result={status:'PASS',checks,englishCoreSections:41,textbookSections:data.sections.length,pptPages:data.ppts.length,figures,renderedFormulas:formulas,scope:'English TOC order, migrated real prose anchors, substantial sections, full physical page sequence, source assets and math rendering'};
fs.writeFileSync('reports/photogrammetry-coverage-verification.json',JSON.stringify(result,null,2)+'\n');console.log(result);
