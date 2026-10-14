<script setup>
import {computed,ref} from 'vue';
import {withBase} from 'vitepress';
import updates from '../../../site-updates.config.json';
const props=defineProps({compact:Boolean});
const category=ref('全部更新');
const categories=['全部更新',...new Set(updates.map(u=>u.category))];
const entries=computed(()=>props.compact?updates.slice(0,3):updates.filter(u=>category.value==='全部更新'||u.category===category.value));
</script>
<template>
  <div v-if="!compact" class="activity-tabs" role="group" aria-label="更新类型"><button v-for="c in categories" :key="c" :aria-pressed="category===c" @click="category=c">{{c}}</button></div>
  <ol class="updates-list">
    <li v-for="entry in entries" :key="entry.id" :id="'update-'+entry.id"><div class="update-date"><time :datetime="entry.date">{{entry.date}}</time><span>{{entry.category}}</span></div><div class="update-body"><h3>{{entry.title}}</h3><p>{{entry.summary}}</p><div class="update-links"><a v-for="link in entry.links" :key="link.url" :href="withBase(link.url)">{{link.label}} <span aria-hidden="true">→</span></a></div></div></li>
  </ol>
  <p v-if="!compact" class="activity-note" role="status">{{entries.length}} 条更新。记录重要内容与使用体验变化，不把每次构建当作内容修订。</p>
</template>
