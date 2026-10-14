import fs from 'node:fs';
import path from 'node:path';
import {createHash} from 'node:crypto';

// Local source paths belong only to the input inventory, never to the public catalog.
const [input, revision] = process.argv.slice(2);
if (!input || !revision || !/^[a-f0-9]{40}$|^PREPARE$/.test(revision)) throw Error('Usage: node scripts/prepare-materials.mjs <local-inventory.json> <data-commit|PREPARE>');
const records=JSON.parse(fs.readFileSync(input,'utf8')), chunkSize=8*1024*1024;
const hash=data=>createHash('sha256').update(data).digest('hex');
const publicRoot=path.resolve('public'), processed=new Map();
const mime={PDF:'application/pdf',PPTX:'application/vnd.openxmlformats-officedocument.presentationml.presentation',DOCX:'application/vnd.openxmlformats-officedocument.wordprocessingml.document'};
function archive(file,filename,expected,format){
  const data=fs.readFileSync(file),sha256=hash(data);
  if(sha256!==expected)throw Error('Source hash changed: '+filename);
  const relative=path.relative(publicRoot,path.resolve(file));
  const result={filename,bytes:data.length,sha256,mime:mime[format]};
  if(!relative.startsWith('..')&&!path.isAbsolute(relative)) return {...result,url:relative.replaceAll('\\','/')};
  if(processed.has(sha256))return {...result,...processed.get(sha256)};
  const dir='materials/storage/'+sha256;fs.mkdirSync(dir,{recursive:true});
  const parts=[];
  for(let start=0,index=0;start<data.length;start+=chunkSize,index++){
    const part=data.subarray(start,Math.min(start+chunkSize,data.length)),name=String(index).padStart(5,'0')+'.bin',filePath=dir+'/'+name;
    if(!fs.existsSync(filePath)||hash(fs.readFileSync(filePath))!==hash(part))fs.writeFileSync(filePath,part);
    parts.push({url:`https://raw.githubusercontent.com/langwangluoji/study-space/${revision}/${filePath}`,start,bytes:part.length,sha256:hash(part)});
  }
  processed.set(sha256,{parts});return {...result,parts};
}
const catalog=records.map(r=>({
  id:r.id,title:r.title,course:r.course,type:r.type,author:r.author,format:r.format,
  coverageNote:r.coverage_note,
  original:archive(r.source_path,r.original_filename,r.sha256,r.format),
  preview:{...archive(r.pdf_preview_path,r.format==='PDF'?r.original_filename:r.id+'.pdf',r.pdf_preview_sha256,'PDF'),pages:r.pdf_preview_pages,kind:r.format==='PDF'?'original-pdf':'office-pdf-export'}
}));
fs.mkdirSync('public/materials',{recursive:true});
fs.writeFileSync('public/materials/catalog.json',JSON.stringify(catalog,null,2)+'\n');
const unique=new Map();for(const r of catalog)for(const s of [r.original,r.preview])for(const p of s.parts??[])unique.set(p.url,p.bytes);
console.log(JSON.stringify({originals:catalog.length,previewPages:catalog.reduce((n,r)=>n+r.preview.pages,0),storedParts:unique.size,storedBytes:[...unique.values()].reduce((a,b)=>a+b,0),revision},null,2));
