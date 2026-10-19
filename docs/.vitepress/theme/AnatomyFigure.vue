<script setup>
import { computed, ref, onMounted, onUnmounted, nextTick } from 'vue';
import { withBase, useData } from 'vitepress';
import {rsLanguage} from './remoteSensingLanguage.js';
const props=defineProps({src:{type:String,required:true},title:{type:String,required:true},height:{type:Number,default:650},poster:String,titleEn:String});
const {isDark}=useData();const frame=ref(null),measured=ref(0),ready=ref(false);
const url=computed(()=>{const at=props.src.indexOf('?'),path=at<0?props.src:props.src.slice(0,at),q=new URLSearchParams(at<0?'':props.src.slice(at+1));q.set('theme',isDark.value?'dark':'light');q.set('lang',rsLanguage.value);return withBase(path)+'?'+q.toString()});
const figureTitle=computed(()=>props.titleEn?(rsLanguage.value==='en'?props.titleEn:rsLanguage.value==='both'?props.title+' / '+props.titleEn:props.title):props.title);
const openLabel=computed(()=>props.titleEn&&rsLanguage.value==='en'?'Open interactive figure ↗':'单独打开交互图 ↗');
const frameHeight=computed(()=>Math.max(320,Math.min(1100,measured.value||props.height)));
function resize(event){if(event.source!==frame.value?.contentWindow||event.origin!==location.origin||event.data?.type!=='anatomy:size')return;const n=Number(event.data.height);if(Number.isFinite(n)&&n>=200&&n<=1600)measured.value=n}
onMounted(async()=>{window.addEventListener('message',resize);await nextTick();ready.value=true});onUnmounted(()=>window.removeEventListener('message',resize));
</script>
<template><figure class="anatomy-figure"><iframe v-if="ready" :key="url" ref="frame" loading="lazy" :src="url" :title="figureTitle" :style="{height:frameHeight+'px'}" sandbox="allow-scripts allow-same-origin" /><div v-else :style="{height:props.height+'px'}" aria-hidden="true" /><figcaption><span>{{figureTitle}}</span><a :href="url" target="_blank" rel="noopener">{{openLabel}}</a><a v-if="poster" :href="withBase(poster)" target="_blank" rel="noopener">查看静态图</a></figcaption></figure></template>
<style scoped>.anatomy-figure{margin:1.6rem 0;border:1px solid var(--vp-c-divider);border-radius:12px;overflow:hidden;background:var(--vp-c-bg-soft)}.anatomy-figure iframe{display:block;width:100%;border:0;background:transparent}.anatomy-figure figcaption{display:flex;flex-wrap:wrap;gap:.5rem 1rem;align-items:center;padding:.7rem 1rem;font-size:.82rem;line-height:1.6;border-top:1px solid var(--vp-c-divider)}.anatomy-figure figcaption span{flex:1;min-width:150px}.anatomy-figure figcaption a{white-space:nowrap}@media print{.anatomy-figure iframe{height:440px!important}.anatomy-figure figcaption a{display:none}}</style>
