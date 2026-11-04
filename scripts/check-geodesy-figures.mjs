import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import crypto from 'node:crypto';
import {readNote,compileNote} from './geodesy-publish.mjs';

const vault=path.resolve('knowledge/geodesy'), notes=path.join(vault,'lessons');
const crops=JSON.parse(fs.readFileSync(path.join(vault,'data/figure-source-crops.json'),'utf8'));
const redraws=JSON.parse(fs.readFileSync(path.join(vault,'data/figure-redraws.json'),'utf8'));
const topics=[], assets=new Set(); let captionBlocks=0;
for(const name of fs.readdirSync(notes).filter(n=>n.endsWith('.md'))){
  const s=fs.readFileSync(path.join(notes,name),'utf8'),{data}=readNote(s);
  const images=[...s.matchAll(/!\[[^\]]+\]\(\.\.\/assets\/figures\/([^)]*)\)/g)].map(m=>m[1]);
  for(const asset of images){
    assets.add(asset);const local=path.join(vault,'assets/figures',asset),pub=path.resolve('public/geodesy/figures',asset);
    assert(fs.existsSync(local),name+': missing '+asset);
    assert(fs.readFileSync(local).equals(fs.readFileSync(pub)),asset+': public/offline image mismatch');
  }
  for(const m of s.matchAll(/<!-- source-figure: (.+?) -->([\s\S]*?)<!-- \/source-figure -->/g)){
    const meta=JSON.parse(m[1]),caption=m[2].replace(/!\[[^\]]*\]\([^)]*\)/,'').trim();
    assert(caption.length>12,name+': source image needs a readable offline caption');
    const published=compileNote('---\nslug: geodesy-figure-check\n---\n'+m[0]);
    assert(published.includes(caption),name+': publisher lost figure caption');
    assert(meta.original||meta.page||meta.locator,name+': missing source locator');captionBlocks++;
  }
  if(data.chapter>0&&data.order>0){assert(images.length>0,name+': no static figure');topics.push({slug:data.slug,title:data.title,figures:images});}
}
assert.equal(topics.length,31);
for(const item of crops.figures){
  const bytes=fs.readFileSync(path.join(vault,'assets/figures',item.asset));
  assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),item.sha256,item.asset+': crop changed without provenance update');
  assert(assets.has(item.asset),item.asset+': extracted but not used');
}
for(const item of redraws.figures) assert(assets.has(item.asset),item.asset+': redraw not used');
const report={status:'PASS',date:'2026-11-04',topics:topics.length,captionBlocks,uniqueAssets:assets.size,newRedraws:redraws.figures.length,newSourceCrops:crops.figures.length,topicFigures:topics};
const inventory=JSON.parse(fs.readFileSync(path.join(vault,'data/figure-inventory.json'),'utf8')).figures;
assert.equal(inventory.length,assets.size);
for(const figure of inventory)assert.equal(figure.sha256,crypto.createHash('sha256').update(fs.readFileSync(path.join(vault,'assets/figures',figure.asset))).digest('hex'));
for(const name of ['figure-inventory.json','figure-inventory.md']) assert(fs.readFileSync(path.join(vault,'data',name)).equals(fs.readFileSync(path.resolve('public/geodesy/data',name))),name+': public/offline inventory mismatch');
fs.writeFileSync('reports/geodesy-figures.json',JSON.stringify(report,null,2)+'\n');
console.log(`PASS ${topics.length} illustrated topics; ${captionBlocks} portable captions; ${assets.size} identical offline/public figures`);
