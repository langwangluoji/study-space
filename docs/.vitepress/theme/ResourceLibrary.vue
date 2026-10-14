<script setup>
import { computed, ref, watch, nextTick, onMounted, onUnmounted } from 'vue';
import { withBase } from 'vitepress';
import resources from '../resource-catalog.json';
import space from '../../../study-space.config.json';
const query = ref(''), course = ref('all'), type = ref('all'), availability = ref('all');
const searchInput=ref(null);
const labels = Object.fromEntries(space.courses.map(c => [c.id,c.title]));
const types = [...new Set(resources.map(r => r.type))];
const hasLocal=resources.some(r=>r.localOnly);
const filtered = computed(() => resources.filter(r =>
  (course.value === 'all' || r.course === course.value) && (type.value === 'all' || r.type === type.value) &&
  (availability.value === 'all' || (availability.value === 'download' && (r.file || r.archiveId || r.external)) || (availability.value === 'local' && r.localOnly)) &&
  (!query.value.trim() || `${r.title} ${r.description} ${r.author} ${r.format} ${labels[r.course]}`.toLowerCase().includes(query.value.trim().toLowerCase()))));
function reset(){query.value='';course.value='all';type.value='all';availability.value='all';nextTick(()=>searchInput.value?.focus())}
function size(bytes){return bytes<1048576?`${(bytes/1024).toFixed(0)} KB`:`${(bytes/1048576).toFixed(1)} MB`}
function syncUrl(){
  const params=new URLSearchParams(location.search), key=params.get('course')??location.hash.slice(1);
  course.value=Object.hasOwn(labels,key)?key:'all';
  type.value=types.includes(params.get('type'))?params.get('type'):'all';
  availability.value=params.get('availability')==='download'?'download':params.get('availability')==='local'&&hasLocal?'local':'all';
  query.value=params.get('q')??'';
}
function updateUrl(){
  const url=new URL(location.href);
  for(const [key,value] of [['course',course.value],['type',type.value],['availability',availability.value],['q',query.value]]){
    if(value==='all'||value==='')url.searchParams.delete(key);else url.searchParams.set(key,value);
  }
  if(Object.hasOwn(labels,url.hash.slice(1)))url.hash='';
  history.replaceState(history.state,'',url.pathname+url.search+url.hash);
}
let stop;
onMounted(()=>{syncUrl();updateUrl();stop=watch([query,course,type,availability],updateUrl);window.addEventListener('hashchange',syncUrl);window.addEventListener('popstate',syncUrl)});
onUnmounted(()=>{stop?.();window.removeEventListener('hashchange',syncUrl);window.removeEventListener('popstate',syncUrl)});
</script>
<template>
  <section class="resource-library" aria-label="学习资源目录">
    <div class="resource-filters">
      <label class="resource-search">搜索资源<input ref="searchInput" v-model="query" type="search" aria-label="搜索资源" placeholder="教材、作者、关键词…" /></label>
      <label>课程<select v-model="course" aria-label="课程"><option value="all">全部课程</option><option v-for="c in space.courses" :key="c.id" :value="c.id">{{c.title}}</option></select></label>
      <label>类型<select v-model="type" aria-label="类型"><option value="all">全部类型</option><option v-for="t in types" :key="t">{{t}}</option></select></label>
      <label>获取方式<select v-model="availability" aria-label="获取方式"><option value="all">全部资料</option><option value="download">可下载</option><option v-if="hasLocal" value="local">仅本地存档</option></select></label>
    </div>
    <div class="resource-result"><p role="status" aria-live="polite" aria-atomic="true">{{filtered.length}} / {{resources.length}} 份资料</p><button type="button" @click="reset">重置筛选</button></div>
    <div class="resource-grid">
      <article v-for="r in filtered" :key="r.id" class="resource-card">
        <div class="resource-meta"><span>{{r.type}} · {{r.format}}</span><span :class="['availability', {local:r.localOnly}]">{{r.localOnly?'仅本地存档':r.publicCopy?'公开副本可下载':r.accessUrl?'官方获取':r.file||r.archiveId?'原件可下载':r.external?'外部下载':'在线索引'}}</span></div>
        <h3>{{r.title}}</h3><p class="resource-author">{{r.author}}<template v-if="r.pages"> · {{r.pages}} 页</template><template v-if="r.bytes"> · {{size(r.bytes)}}</template></p><p>{{r.description}}</p><span class="resource-course">{{labels[r.course]}}</span>
        <div class="resource-actions">
          <a :href="withBase(r.preview)" :aria-label="'阅读：'+r.title">{{r.localOnly?'查看说明与出处':r.reader==='file'?'阅读资料说明':'在线阅读'}} <span aria-hidden="true">→</span></a>
          <a v-if="r.file" :href="withBase(r.file)" :aria-label="'下载 '+r.format+'：'+r.title" :download="r.originalFilename||''">下载 {{r.format}}</a>
          <a v-else-if="r.archiveId" :href="withBase('/material-viewer/index.html')+'?id='+encodeURIComponent(r.archiveId)+'&download=1'" :aria-label="'下载 '+r.format+'：'+r.title" target="_blank" rel="noopener">下载 {{r.format}}</a>
          <a v-if="r.alternate" :href="withBase(r.alternate)" :aria-label="'下载 PDF：'+r.title" download>下载 PDF</a>
          <a v-if="r.release" :href="r.release" target="_blank" rel="noopener noreferrer">版本发布页 ↗</a>
          <a v-if="r.external" :href="r.external" :aria-label="'外部 PDF 直链：'+r.title" target="_blank" rel="noopener noreferrer">{{r.externalLabel??'PDF 直链'}} ↗</a>
          <a v-if="r.accessUrl" :href="r.accessUrl" target="_blank" rel="noopener noreferrer">{{r.accessLabel??'官方阅读与获取'}} ↗</a>
          <a v-if="r.source" :href="r.source" target="_blank" rel="noopener noreferrer">作者／维护项目 ↗</a>
        </div>
      </article>
    </div>
    <div v-if="!filtered.length" class="resource-empty"><h3>没有匹配的资料</h3><p>试试更短的关键词，或重置课程、类型和获取方式。</p><button type="button" @click="reset">查看全部资料</button></div>
  </section>
</template>
