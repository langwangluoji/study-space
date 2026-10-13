<script setup>
import { withBase } from 'vitepress';
import space from '../../../study-space.config.json';
defineProps({ compact: Boolean });
</script>
<template>
  <div class="space-courses">
    <article v-for="(c,i) in space.courses" :key="c.id" class="space-course hub-course">
      <div class="course-heading"><span class="hub-eyebrow">{{c.field}}</span><span class="course-number" aria-hidden="true">0{{i+1}}</span></div>
      <p class="course-subtitle">{{c.subtitle}}</p><h3><a :href="withBase(c.entry)">{{c.title}}</a></h3><p>{{c.summary}}</p>
      <div class="course-scope">{{c.scope}}<span>{{c.status}}</span></div>
      <ul class="hub-tags" aria-label="课程主题"><li v-for="t in c.tags" :key="t">{{t}}</li></ul>
      <p v-if="!compact" class="course-prerequisites">先修基础：{{c.prerequisites}}</p>
      <div class="course-links"><a class="hub-entry" :href="withBase(c.entry)">进入课程 <span aria-hidden="true">→</span></a><a v-if="!compact" :href="withBase(c.source)">来源说明</a></div>
    </article>
  </div>
</template>
