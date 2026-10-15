import fs from 'node:fs';
import assert from 'node:assert/strict';
const data=JSON.parse(fs.readFileSync('public/photogrammetry/derivations.json','utf8'));
const order=JSON.parse(fs.readFileSync('public/photogrammetry/order.json','utf8'));
assert.deepEqual(data.sections.map(x=>x.section),order.sections.map(x=>x.section));
assert.equal(data.sections.length,56);
const pages=new Map();let equations=0;
for(const row of data.sections){
 const [path,id]=row.derivation.split('#');
 const slug=path.replace(/^\//,'').replace(/\.html$/,'');
 if(!pages.has(slug))pages.set(slug,{md:fs.readFileSync(`docs/${slug}.md`,'utf8'),html:fs.readFileSync(`docs/.vitepress/dist/${slug}.html`,'utf8')});
 const {md,html}=pages.get(slug);
 assert.ok(md.includes(`{#${id}}`)||md.includes(`<span id="${id}">`),row.section+' source anchor');
 assert.ok(html.includes(`id="${id}"`),row.section+' rendered anchor');
 assert.ok(!/看本节公式怎样推出来|公式推导路线|\]\([^)]*photogrammetry-derivations/.test(md),row.section+' no separate derivation navigation');
 assert.ok(!/^#{2,5} .*补推导/gm.test(md),row.section+' no appended derivation headings');
 assert.ok(row.characters>100,row.section+' substantive integrated prose');
 assert.equal((md.match(/\$\$/g)||[]).length%2,0,slug+' delimiters');
 assert.ok(!/data-mjx-error|<merror/.test(html),slug+' math rendering');
 assert.ok(!/undefined|NaN/.test(md),slug+' assembly');
 assert.ok(!/[\u0000-\u0008\u000b\u000c\u000e-\u001f\t]/.test(md),slug+' no accidental escape characters');
}
const guide=fs.readFileSync('docs/.vitepress/dist/photogrammetry-derivations.html','utf8');
assert.ok(!/data-mjx-error|<merror/.test(guide),'prerequisite guide math');
assert.ok(fs.existsSync('public/photogrammetry/figures/derivation-dot-cross.svg'),'prerequisite spatial diagram');
for(const {md,html} of pages.values()){
 const ids=[...md.matchAll(/\{#([^}]+)\}|<span id="([^"]+)"/g)].map(x=>x[1]??x[2]);
 assert.equal(new Set(ids).size,ids.length,'duplicate source IDs');
 equations+=(html.match(/<mjx-container/g)||[]).length;
}
const result={status:'PASS',mainSections:data.sections.length,chapters:pages.size,renderedMathExpressions:equations,inlineDisplayEquations:data.sections.reduce((n,x)=>n+x.displayEquations,0),scope:'All existing main sections use integrated prose; no appended derivation headings or separate derivation links; inherited coverage verified separately'};
fs.writeFileSync('reports/photogrammetry-derivations-verification.json',JSON.stringify(result,null,2)+'\n');
console.log(result);
