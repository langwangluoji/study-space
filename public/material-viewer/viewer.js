import * as pdfjs from '../vendor/pdfjs/pdf.min.js';
pdfjs.GlobalWorkerOptions.workerSrc=new URL('../vendor/pdfjs/pdf.worker.min.js',import.meta.url).href;
const args=new URLSearchParams(location.search),id=args.get('id');
document.body.classList.toggle('dark',args.get('theme')==='dark');
const el=s=>document.getElementById(s),base=new URL('../',location.href),status=el('status');
let record,resource,pdf,transport,loadingTask,textLayer,current=Number(location.hash.match(/page=(\d+)/)?.[1]||1),generation=0,renderTask,retryAction='preview';
const requests=new Map(),cache=new Map();
function report(message,error=false,action='preview'){status.textContent=message;status.classList.toggle('error',error);el('retry').hidden=!error;if(error)retryAction=action}
async function partBytes(part){
 if(cache.has(part.url))return cache.get(part.url);
 if(!requests.has(part.url))requests.set(part.url,(async()=>{
  const r=await fetch(part.url,{cache:'force-cache'});if(!r.ok)throw Error('文件暂时无法读取，请稍后重试。');
  const bytes=new Uint8Array(await r.arrayBuffer());if(bytes.length!==part.bytes)throw Error('原文件片段不完整，请重新加载。');
  const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(digest!==part.sha256)throw Error('资料片段校验失败，请重新加载。');
  cache.set(part.url,bytes);while(cache.size>3)cache.delete(cache.keys().next().value);return bytes;
 })().finally(()=>requests.delete(part.url)));
 return requests.get(part.url);
}
class ArchiveTransport extends pdfjs.PDFDataRangeTransport{
 constructor(source){super(source.bytes,new Uint8Array(0),false,source.filename);this.source=source}
 requestDataRange(begin,end){(async()=>{
  const selected=this.source.parts.filter(p=>p.start<end&&p.start+p.bytes>begin),out=new Uint8Array(end-begin);
  for(const part of selected){const data=await partBytes(part),start=Math.max(begin,part.start),stop=Math.min(end,part.start+part.bytes);out.set(data.subarray(start-part.start,stop-part.start),start-begin)}
  if(!this.aborted&&this===transport)this.onDataRange(begin,out);
 })().catch(error=>{if(this.aborted||this!==transport)return;report(error.message,true);loadingTask?.destroy()})}
 abort(){this.aborted=true;/* Shared immutable fetches may finish, but cannot update a new reader. */}
}
async function showPage(){
 if(!pdf)return;const seq=++generation;renderTask?.cancel();textLayer?.cancel();current=Math.max(1,Math.min(pdf.numPages,Number.isFinite(current)?Math.round(current):1));el('page').value=current;el('prev').disabled=current===1;el('next').disabled=current===pdf.numPages;report('正在载入第 '+current+' 页…');
 try{
  const page=await pdf.getPage(current);if(seq!==generation)return;
  const natural=page.getViewport({scale:1}),scale=el('zoom').value==='fit'?Math.min(2,Math.max(.2,(el('paper').clientWidth-28)/natural.width)):Number(el('zoom').value),viewport=page.getViewport({scale}),ratio=Math.min(devicePixelRatio||1,2),canvas=el('canvas');
  canvas.width=Math.floor(viewport.width*ratio);canvas.height=Math.floor(viewport.height*ratio);canvas.style.width=viewport.width+'px';canvas.style.height=viewport.height+'px';el('page-wrap').style.width=viewport.width+'px';el('page-wrap').style.height=viewport.height+'px';
  renderTask=page.render({canvasContext:canvas.getContext('2d'),viewport,transform:ratio===1?null:[ratio,0,0,ratio,0,0],background:'rgb(255,255,255)'});await renderTask.promise;if(seq!==generation)return;
  el('text').replaceChildren();el('text').style.setProperty('--scale-factor',scale);el('text').style.setProperty('--total-scale-factor',scale);
  const text=await page.getTextContent();if(seq!==generation)return;textLayer=new pdfjs.TextLayer({textContentSource:text,container:el('text'),viewport});await textLayer.render();if(seq!==generation)return;
  history.replaceState(null,'',location.pathname+location.search+'#page='+current);report('第 '+current+' / '+pdf.numPages+' 页');canvas.dataset.page=String(current);document.body.dataset.ready='true';
 }catch(e){if(seq===generation&&e.name!=='RenderingCancelledException')report('预览暂未完成：'+e.message,true)}
}
async function open(){
 try{
  ++generation;transport?.abort();renderTask?.cancel();textLayer?.cancel();report('正在加载原资料…');await loadingTask?.destroy();pdf=null;cache.clear();document.body.dataset.ready='false';
  const response=await fetch(new URL('resources-catalog.json',base),{cache:'no-store'});if(!response.ok)throw Error('资料入口暂时无法读取，请重试。');
  const resources=await response.json();resource=resources.find(r=>r.archiveId===id||r.id===id);
  if(resource?.reader==='publisher'){
   record=null;el('title').textContent=resource.title;document.title=resource.title+' · 正版获取';
   for(const name of ['prev','next','page','zoom','full'])el(name).disabled=true;
   el('paper').hidden=true;el('download').textContent='前往正版获取';el('download').href=resource.accessUrl;el('download').target='_blank';el('download').rel='noopener noreferrer';
   el('hint').replaceChildren();const link=document.createElement('a');link.href=resource.accessUrl;link.target='_blank';link.rel='noopener noreferrer';link.textContent=resource.accessLabel||'出版社正版入口';el('hint').append(link);
   if(resource.excerptUrl){const excerpt=document.createElement('a');excerpt.href=resource.excerptUrl;excerpt.target='_blank';excerpt.rel='noopener noreferrer';excerpt.textContent='出版社试读';el('hint').append(' · ',excerpt)}
   report('请通过出版社获取正版教材或查看试读。');document.body.dataset.ready='true';return;
  }
  const records=await (await fetch(new URL('materials/catalog.json',base))).json();record=records.find(r=>r.id===id);if(!record)throw Error('未找到这份资料。');
  if(resource?.publicCopy){
   const url=resource.file.replace(/^\//,''),source={url,bytes:resource.bytes,sha256:resource.publicSha256,filename:resource.title+'（公开副本）.pdf',mime:'application/pdf',pages:resource.pages};
   record={...record,title:resource.title+'（公开副本）',original:source,preview:source};el('download').textContent='下载公开副本';el('hint').textContent=resource.description;
  }
  el('title').textContent=record.title;document.title=record.title+' · 原资料';
  const source=record.preview;transport=source.parts?new ArchiveTransport(source):null;
  loadingTask=pdfjs.getDocument({...(transport?{range:transport,length:source.bytes,rangeChunkSize:131072,disableAutoFetch:true,disableStream:true}:{url:new URL(source.url,base).href}),isEvalSupported:false,cMapUrl:new URL('../vendor/pdfjs/cmaps/',import.meta.url).href,cMapPacked:true,standardFontDataUrl:new URL('../vendor/pdfjs/standard_fonts/',import.meta.url).href,wasmUrl:new URL('../vendor/pdfjs/wasm/',import.meta.url).href});
  pdf=await loadingTask.promise;el('total').textContent='/ '+pdf.numPages;el('page').max=pdf.numPages;await showPage();if(args.get('download')==='1')await downloadOriginal();
 }catch(e){report('预览暂未完成：'+e.message,true)}
}
async function downloadOriginal(){
 if(resource?.reader==='publisher')return;
 if(!record)return;const original=record.original;report('正在准备原文件下载…');
 try{
  if(original.url){const a=document.createElement('a');a.href=new URL(original.url,base);a.download=original.filename;a.click();report('已开始下载原文件。');return}
  if('serviceWorker' in navigator){
   const reg=await navigator.serviceWorker.register(new URL('material-download-worker.js',base),{scope:base.pathname});await navigator.serviceWorker.ready;
   if(!reg.active)throw Error('下载服务尚未就绪，请重试。');
   if(!navigator.serviceWorker.controller)await new Promise((resolve,reject)=>{const timer=setTimeout(()=>reject(Error('下载服务正在启动，请再点一次下载。')),8000);navigator.serviceWorker.addEventListener('controllerchange',()=>{clearTimeout(timer);resolve()},{once:true})});
   // A download attribute bypasses service workers in Chromium. Navigate to the
   // stream route and let its Content-Disposition header initiate the download.
   const a=document.createElement('a');a.href=new URL('material-download/'+encodeURIComponent(id)+'/'+encodeURIComponent(original.filename),base);a.click();report('已开始下载原文件；文件较大时请等待浏览器完成。');
  }else{
   const buffers=[];for(const part of original.parts)buffers.push(await partBytes(part));const url=URL.createObjectURL(new Blob(buffers,{type:original.mime}));const a=document.createElement('a');a.href=url;a.download=original.filename;a.click();setTimeout(()=>URL.revokeObjectURL(url),60000);report('已开始下载原文件。');
  }
 }catch(e){report('下载暂未完成：'+e.message,true,'download')}
}
el('prev').onclick=()=>{current--;showPage()};el('next').onclick=()=>{current++;showPage()};el('page').onchange=()=>{current=Number(el('page').value);showPage()};el('zoom').onchange=showPage;el('full').onclick=()=>document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen();
// A failed custom range read can leave PDF.js destruction waiting on its
// pending page request. Recreate this frame, retaining the requested page,
// rather than waiting indefinitely for that old worker to settle.
el('retry').onclick=()=>{if(retryAction==='download')return downloadOriginal();history.replaceState(null,'',location.pathname+location.search+'#page='+current);location.reload()};
el('download').onclick=e=>{if(resource?.reader==='publisher')return;e.preventDefault();downloadOriginal()};
// The parent propagates citation page changes through the iframe fragment.
// A fragment navigation keeps this document alive, so render the new page.
addEventListener('hashchange',()=>{const page=Number(location.hash.match(/page=(\d+)/)?.[1]||1);if(page!==current){current=page;showPage()}});
let resized;addEventListener('resize',()=>{clearTimeout(resized);resized=setTimeout(()=>{if(el('zoom').value==='fit')showPage()},250)});addEventListener('pagehide',()=>{renderTask?.cancel();pdf?.destroy()});open();
