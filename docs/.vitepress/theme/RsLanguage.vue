<script setup>
import {computed,nextTick} from 'vue';
import {rsLanguage,rsSearchNotice,showRsLanguage} from './remoteSensingLanguage.js';
const label=computed(()=>rsLanguage.value==='en'?'Reading language':'阅读语言 / Reading language');
async function change(event){
  const headings=[...document.querySelectorAll('.vp-doc h2')];
  const current=headings.filter(h=>h.getBoundingClientRect().top<150).at(-1)??headings[0];
  const offset=current?.getBoundingClientRect().top;
  showRsLanguage(event.target.value);await nextTick();
  if(current)requestAnimationFrame(()=>window.scrollBy({top:current.getBoundingClientRect().top-offset,behavior:'instant'}));
}
</script>
<template>
  <div class="rs-language-toolbar">
    <label><span>{{label}}</span><select :value="rsLanguage" @change="change"><option value="zh">中文</option><option value="en">English</option><option value="both">双语 / Bilingual</option></select></label>
    <p v-if="rsSearchNotice" role="status">搜索定位已显示双语内容，可在此选择阅读语言。 / Both languages are shown for search navigation.</p>
    <p v-else>{{rsLanguage==='en'?'Definitions, conditions and figures share the same concept anchors.':'中英讲解共用概念定位；图注和交互标签随语言切换。'}}</p>
  </div>
</template>
<style scoped>
.rs-language-toolbar{padding:16px 18px;margin:24px 0 30px;border:1px solid var(--vp-c-divider);border-radius:10px;background:var(--vp-c-bg-soft)}label{display:flex;align-items:center;gap:16px;flex-wrap:wrap;font-weight:600;font-size:14px}select{font:inherit;background:var(--vp-c-bg);color:var(--vp-c-text-1);border:1px solid var(--vp-c-divider);padding:7px 32px 7px 12px;border-radius:6px;appearance:auto}.rs-language-toolbar p{font-size:13px;line-height:1.7;margin:8px 0 0;color:var(--vp-c-text-2)}select:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:3px}
</style>
