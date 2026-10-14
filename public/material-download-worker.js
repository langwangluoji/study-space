const base=new URL('./',self.location.href);
self.addEventListener('install',()=>self.skipWaiting());self.addEventListener('activate',event=>event.waitUntil(self.clients.claim()));
self.addEventListener('fetch',event=>{
 const url=new URL(event.request.url),prefix=base.pathname+'material-download/';if(url.origin!==base.origin||!url.pathname.startsWith(prefix))return;
 event.respondWith((async()=>{
  const id=decodeURIComponent(url.pathname.slice(prefix.length).split('/')[0]),records=await (await fetch(new URL('materials/catalog.json',base))).json(),record=records.find(r=>r.id===id);if(!record)return new Response('未找到原文件',{status:404});
  const file=record.original;if(file.url)return Response.redirect(new URL(file.url,base),302);
  let index=0;const stream=new ReadableStream({async pull(controller){
   if(index>=file.parts.length){controller.close();return}
   try{const part=file.parts[index++],response=await fetch(part.url,{cache:'force-cache'});if(!response.ok)throw Error('原件读取失败');const bytes=await response.arrayBuffer();if(bytes.byteLength!==part.bytes)throw Error('原件片段不完整');const digest=Array.from(new Uint8Array(await crypto.subtle.digest('SHA-256',bytes)),b=>b.toString(16).padStart(2,'0')).join('');if(digest!==part.sha256)throw Error('原件校验不一致');controller.enqueue(new Uint8Array(bytes))}catch(error){controller.error(error)}
  }});
  return new Response(stream,{headers:{'Content-Type':file.mime,'Content-Length':String(file.bytes),'Content-Disposition':"attachment; filename*=UTF-8''"+encodeURIComponent(file.filename),'Cache-Control':'no-store','X-Content-Type-Options':'nosniff'}});
 })().catch(()=>new Response('原文件暂时无法下载，请回到资料页重试。',{status:502})));});
