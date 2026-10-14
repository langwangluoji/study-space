<script setup>
import {computed,ref,onMounted,onUnmounted} from 'vue';import {withBase,useData} from 'vitepress';
const props=defineProps({id:{type:String,required:true},title:String});const {isDark}=useData();const hash=ref('');
const sync=()=>hash.value=/^#page=\d+$/.test(location.hash)?location.hash:'';
onMounted(()=>{sync();window.addEventListener('hashchange',sync)});onUnmounted(()=>window.removeEventListener('hashchange',sync));
const url=computed(()=>withBase('/material-viewer/index.html')+'?id='+encodeURIComponent(props.id)+'&theme='+(isDark.value?'dark':'light')+hash.value);
</script>
<template><section class="material-reader"><p><a :href="url" target="_blank" rel="noopener noreferrer">在新窗口阅读原资料</a> · <a :href="url.replace(/#.*$/,'')+'&download=1'" target="_blank" rel="noopener noreferrer">下载原文件</a></p><iframe loading="lazy" :src="url" :title="title+' · 原资料在线预览'" allow="fullscreen"></iframe><p class="material-reader-note">可翻页、跳页、缩放或全屏阅读。PPT、Word 显示原排版的 PDF 阅读版，原件可在窗口内下载。</p></section></template>
<style scoped>.material-reader{margin:22px 0}.material-reader iframe{display:block;width:100%;height:78vh;min-height:500px;border:1px solid var(--vp-c-divider);border-radius:7px;background:var(--vp-c-bg-soft)}.material-reader-note{font-size:13px;color:var(--vp-c-text-2)}@media(max-width:600px){.material-reader iframe{height:76vh;min-height:440px}}</style>
