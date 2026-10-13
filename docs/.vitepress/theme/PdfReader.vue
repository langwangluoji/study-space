<script setup>
import {ref,onMounted,onUnmounted} from 'vue';import {withBase} from 'vitepress';
const props=defineProps({src:String,title:String});const hash=ref('');
const sync=()=>hash.value=/^#page=\d+$/.test(location.hash)?location.hash:'';
onMounted(()=>{sync();window.addEventListener('hashchange',sync)});onUnmounted(()=>window.removeEventListener('hashchange',sync));
</script>
<template><div class="pdf-reader"><p class="pdf-help">若预览为空或手机无法内嵌 PDF，可<a :href="withBase('/'+src)+hash" target="_blank" rel="noopener noreferrer">在新标签页打开</a>，或<a :href="withBase('/'+src)" download>下载 PDF</a>后阅读。</p><iframe loading="lazy" :src="withBase('/'+src)+hash" :title="title"></iframe></div></template>
