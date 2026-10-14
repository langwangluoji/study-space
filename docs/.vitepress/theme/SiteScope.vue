<script setup>
import { withBase } from 'vitepress';
import space from '../../../study-space.config.json';
import resources from '../../../resources.config.json';
</script>
<template>
  <div class="scope-summary"><strong>{{space.courses.length}} 门课程</strong><span>{{resources.length}} 份资源条目 · 范围持续更新</span></div>
  <div class="scope-grid">
    <article v-for="c in space.courses" :key="c.id" class="scope-card"><h3><a :href="withBase(c.entry)">{{c.title}}</a></h3><p>{{c.scope}}</p><span>{{c.status}}</span><a :href="withBase('/resources.html?course='+c.id)">查找这门课的资料 →</a></article>
  </div>
</template>
