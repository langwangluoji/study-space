<script setup>
import { ref, onMounted } from 'vue';
import { withBase } from 'vitepress';
import {readingTitle} from './reading-targets.js';
const recent=ref(null);
onMounted(()=>{try{const saved=JSON.parse(localStorage.getItem('study-space-last-reading-v1'));const title=readingTitle(saved?.path);if(title)recent.value={path:saved.path,title}}catch{}});
</script>
<template><a v-if="recent" class="continue-reading" :href="recent.path"><span>继续上次阅读<small>记录保存在此浏览器</small></span><strong>{{recent.title}}</strong><span aria-hidden="true">→</span></a><a v-else class="continue-reading" :href="withBase('/study-guide.html')"><span>第一次来到这里？</span><strong>选一条适合自己的学习路线</strong><span aria-hidden="true">→</span></a></template>
