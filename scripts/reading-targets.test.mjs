import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const file=new URL('../docs/.vitepress/theme/reading-targets.js',import.meta.url);
// Load the production registry against the actual JSON catalogs, outside Vite.
const source=fs.readFileSync(file,'utf8').replace(/^import (\w+) from '([^']+)';$/gm,(_,name,path)=>`const ${name}=${fs.readFileSync(new URL(path,file),'utf8')};`);
const {readingTitle}=await import('data:text/javascript;base64,'+Buffer.from(source).toString('base64'));
const course=JSON.parse(fs.readFileSync(new URL('../optics.config.json',import.meta.url),'utf8'));
test('all independent optics sections and chapter reviews support reading positions',()=>{
  for(const chapter of course)for(const page of [...chapter.topics,chapter.review]){
    assert.equal(readingTitle('/study-space/'+page.slug+'.html#any-section'),page.title,page.slug);
  }
});
test('preserved optics articles remain registered; arbitrary URLs stay excluded',()=>{
  for(const slug of ['optics-waves','optics-incoherent','optics-laser','optics-propagation','optics-propagation-ii']){
    assert.ok(readingTitle('/study-space/'+slug+'.html'),slug);
  }
  assert.equal(readingTitle('/study-space/unknown-optics.html'),undefined);
});
