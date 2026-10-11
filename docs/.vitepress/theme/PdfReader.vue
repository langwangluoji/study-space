<script setup>
import {ref,onMounted,onUnmounted} from 'vue';import {withBase} from 'vitepress';
const props=defineProps({src:String,title:String});const hash=ref('');
const sync=()=>hash.value=/^#page=\d+$/.test(location.hash)?location.hash:'';
onMounted(()=>{sync();window.addEventListener('hashchange',sync)});onUnmounted(()=>window.removeEventListener('hashchange',sync));
</script>
<template><iframe loading="lazy" :src="withBase('/'+src)+hash" :title="title"></iframe></template>
