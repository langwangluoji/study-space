import fs from 'node:fs';
import path from 'node:path';
import assert from 'node:assert/strict';
import {createHash} from 'node:crypto';
const catalog=JSON.parse(fs.readFileSync('public/materials/catalog.json','utf8'));
const hash=b=>createHash('sha256').update(b).digest('hex'),ids=new Set(),verified=new Set();
let parts=0,storedBytes=0;
for(const r of catalog){
  assert(!ids.has(r.id),'Duplicate material ID');ids.add(r.id);
  assert(r.preview.pages>0);assert(['original-pdf','office-pdf-export'].includes(r.preview.kind));
  for(const s of [r.original,r.preview]){
    assert(s.filename&&s.bytes>0&&/^[a-f\d]{64}$/.test(s.sha256));
    assert(Boolean(s.url)!==Boolean(s.parts),'Each source needs one location');
    if(verified.has(s.sha256))continue;
    const whole=createHash('sha256');let total=0;
    if(s.url){
      assert(!s.url.startsWith('/')&&!s.url.includes('..')&&!s.url.includes(':'));
      const data=fs.readFileSync(path.join('public',s.url));whole.update(data);total=data.length;
    }else{
      assert(s.parts.length>0);
      for(const p of s.parts){
        const match=p.url.match(/^https:\/\/raw\.githubusercontent\.com\/langwangluoji\/study-space\/([a-f\d]{40})\/(materials\/storage\/[a-f\d]{64}\/\d{5}\.bin)$/);
        assert(match,'Material URLs must be pinned to an immutable data commit');
        assert.equal(p.start,total);assert(p.bytes<=8*1024*1024);
        const data=fs.readFileSync(match[2]);assert.equal(data.length,p.bytes);assert.equal(hash(data),p.sha256);whole.update(data);total+=data.length;parts++;storedBytes+=data.length;
      }
    }
    assert.equal(total,s.bytes);assert.equal(whole.digest('hex'),s.sha256,'Original reconstruction hash differs: '+r.id);verified.add(s.sha256);
  }
}
const resources=JSON.parse(fs.readFileSync('resources.config.json','utf8'));
for(const r of catalog){
  const resource=resources.find(s=>s.archiveId===r.id)||resources.find(s=>s.id===r.id&&(s.reader==='publisher'||s.publicCopy));
  assert(resource,'Original missing from resource library: '+r.id);assert.equal(resource.course,r.course);assert(!resource.localOnly);
  if(resource.reader==='publisher'){assert(/^https:\/\//.test(resource.accessUrl));assert(!resource.archiveId,'Publisher entry must not expose the archived full scan')}
  if(resource.publicCopy){assert(resource.file&&fs.existsSync(path.join('public',resource.file)));assert(!resource.archiveId,'Public copy must not link to the original archived file')}
}
function size(dir){return fs.readdirSync(dir,{withFileTypes:true}).reduce((n,f)=>n+(f.isDirectory()?size(path.join(dir,f.name)):fs.statSync(path.join(dir,f.name)).size),0)}
const publicBytes=size('public');assert(publicBytes<850*1024*1024,'Public deploy exceeds budget');
const report={status:'PASS',originals:catalog.length,publisherReferences:resources.filter(r=>r.reader==='publisher').length,publicCopies:resources.filter(r=>r.publicCopy).length,byCourse:Object.fromEntries([...new Set(catalog.map(r=>r.course))].map(c=>[c,catalog.filter(r=>r.course===c).length])),previewPages:catalog.reduce((n,r)=>n+r.preview.pages,0),originalBytes:catalog.reduce((n,r)=>n+r.original.bytes,0),uniqueSourceVersions:verified.size,storedParts:parts,storedBytes,publicBytes,checks:['All original files reconstruct to their SHA-256','All PDF export bytes match their recorded SHA-256','Every archived source has a public reader/download, publisher access, or a declared public copy','Chunk URLs use immutable commit revisions','Large archives remain outside the Pages artifact']};
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/materials-integrity.json',JSON.stringify(report,null,2)+'\n');console.log(JSON.stringify(report,null,2));
