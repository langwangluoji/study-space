import assert from 'node:assert/strict';
import fs from 'node:fs';
import {PhotoMath} from '../docs/.vitepress/theme/photogrammetry-labs.js';
let checks=0;const near=(a,b,t=1e-8)=>{assert.ok(Math.abs(a-b)<t,`${a} != ${b}`);checks++};
// Independent image/ground similarity, mm/um/m conversions.
near(PhotoMath.scale(150,1500,0,5).denominator,10000);
near(PhotoMath.scale(150,1500,0,5).gsd,.05);
for(const f of [50,150,250])for(const B of [100,300,600])for(const h of [-100,0,500]){
 const H=1500,X=220,D=H-h;
 const left=f*X/D,right=f*(X-B)/D,p=left-right;
 near(PhotoMath.stereo(f,B,H,p,.01).Z,h);
 const dp=1e-4;
 const derivative=(PhotoMath.stereo(f,B,H,p+dp,0).Z-PhotoMath.stereo(f,B,H,p-dp,0).Z)/(2*dp);
 near(derivative*.01,PhotoMath.stereo(f,B,H,p,.01).sigmaZ,1e-6);
}
for(const r of [0,40,100])for(const h of [0,100,700]){
 const H=1500,f=150,X=r*(H-h)/f;
 // Project the top and its vertical ground-foot independently.
 const top=f*X/(H-h),base=f*X/H;
 near(top-base,PhotoMath.relief(r,h,H).d);
}
// Coordinate convention and transpose: rotate a camera ray, then undo it.
const angle=.31,c=Math.cos(angle),s=Math.sin(angle);
const q=[20,-3,-100],world=[c*q[0]+s*q[2],q[1],-s*q[0]+c*q[2]];
const back=[c*world[0]-s*world[2],world[1],s*world[0]+c*world[2]];
back.forEach((v,i)=>near(v,q[i]));
near(PhotoMath.collinearity(150,back[0],back[1],-back[2],0).x,-150*q[0]/q[2]);
near(PhotoMath.collinearity(150,40,-6,200,0).x,30);
near(PhotoMath.collinearity(150,40,-6,200,0).y,-4.5);
near(PhotoMath.collinearity(100,100,50,1000,0).qz,-1000);
for(const H of [1000,1500])for(const h of [0,200]){
 const f=150,B=300,X=220;
 const left=PhotoMath.collinearity(f,X,0,H,h).x;
 const right=PhotoMath.collinearity(f,X-B,0,H,h).x;
 near(PhotoMath.stereo(f,B,H,left-right,.01).Z,h);
}
const p0=100,dp=10,D0=1000,exact=D0*dp/(p0+dp),linear=D0*dp/p0;
near(exact,90.90909090909);near(Math.abs(linear-exact)/exact,dp/p0);
assert.equal(PhotoMath.scale(150,100,100,5),null);assert.equal(PhotoMath.stereo(150,100,1500,0,.01),null);checks+=2;
const space=JSON.parse(fs.readFileSync('study-space.config.json','utf8'));
const course=space.courses.find(c=>c.id==='photogrammetry');assert.ok(course);checks++;
const sources=JSON.parse(fs.readFileSync('public/photogrammetry/sources.json','utf8'));
assert.equal(sources.length,8);assert.ok(sources.every(s=>s.publicFullPdf===false&&s.sha256.length===64));checks+=2;
const reading=JSON.parse(fs.readFileSync('public/photogrammetry/reading.json','utf8'));
const lessons=Array.isArray(reading)?reading:reading.lessons;
assert.equal(lessons.length,12);checks++;
for(const lesson of lessons){assert.ok(lesson.pdfPages.every(p=>p>=1&&p<=491));checks++}
const resources=JSON.parse(fs.readFileSync('resources.config.json','utf8')).filter(r=>r.course==='photogrammetry');
assert.equal(resources.length,8);assert.ok(resources.every(r=>r.localOnly&&!r.file&&!r.external));checks+=2;
const pages=['course-photogrammetry',...course.chapters.map(c=>c.slug),'photogrammetry-sources',...sources.map(s=>s.reader.slice(1).replace('.html',''))];
const content=pages.map(slug=>{const md=fs.readFileSync(`docs/${slug}.md`,'utf8');assert.equal((md.match(/\$\$/g)||[]).length%2,0,slug+' formula delimiters');const html=fs.readFileSync(`docs/.vitepress/dist/${slug}.html`,'utf8');assert.ok(!/data-mjx-error|<merror/.test(html));checks+=2;return {slug,sourceBytes:Buffer.byteLength(md),formulas:(html.match(/<mjx-container/g)||[]).length}});
const result={status:'PASS',checks,pages:content,numerics:'independent stereo projection, finite-difference uncertainty, top/base projection, coordinate inverse, unit conversion, exact/linear disparity comparison',sourcePolicy:'8 local PDF readers; no full textbook upload'};
fs.mkdirSync('reports',{recursive:true});fs.writeFileSync('reports/photogrammetry-verification.json',JSON.stringify(result,null,2)+'\n');console.log(`${checks} checks passed across ${content.length} photogrammetry pages.`);
