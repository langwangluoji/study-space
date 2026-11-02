<script setup>
import { computed } from 'vue';
import { useRoute, withBase } from 'vitepress';
import {courseForPath,isResourcePath} from './course-experience.js';
const route=useRoute();
const feedback=computed(()=> 'https://github.com/langwangluoji/study-space/issues/new?title='+encodeURIComponent('内容反馈：'+route.path.split('/').pop())+'&body='+encodeURIComponent('页面：https://langwangluoji.github.io'+route.path+'\n\n具体位置或锚点：\n\n问题与依据：\n\n建议修订：\n'));
const context=computed(()=>{
  if(isResourcePath(route.path))return {label:'资料中心',href:'/resources.html'};
  const course=courseForPath(route.path);
  if(course)return {label:course.title,href:course.entry};
  if(route.path.includes('/about'))return {label:'关于网站',href:'/about.html'};
  return {label:'课程与学习',href:'/courses.html'};
});
</script>
<template><nav class="page-context" aria-label="当前位置"><a :href="withBase('/')">学习空间</a><span aria-hidden="true">/</span><a :href="withBase(context.href)">{{context.label}}</a><a class="page-feedback" :href="feedback" target="_blank" rel="noopener noreferrer">反馈本页问题 ↗</a></nav></template>
