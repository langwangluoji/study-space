<script setup>
import { computed } from 'vue';
import { useRoute, withBase } from 'vitepress';
import space from '../../../study-space.config.json';
const route=useRoute();
const feedback=computed(()=> 'https://github.com/langwangluoji/study-space/issues/new?title='+encodeURIComponent('内容反馈：'+route.path.split('/').pop())+'&body='+encodeURIComponent('页面：https://langwangluoji.github.io'+route.path+'\n\n具体位置或锚点：\n\n问题与依据：\n\n建议修订：\n'));
const context=computed(()=>{
  const p=route.path.replace('/study-space/','');
  if(/^(course-geodesy|geodesy-(?!source|plan))/.test(p))return {label:'大地测量',href:'/course-geodesy.html'};
  if(/^(course-ml|lecture-|cifar10-practice)/.test(p))return {label:'机器学习',href:'/course-ml.html'};
  const course=space.courses.filter(c=>!['ml','geodesy'].includes(c.id)).find(c=>p===c.entry.slice(1)||p.startsWith(c.id+'-'));
  if(course)return {label:course.title,href:course.entry};
  if(/^(resources|textbooks|book-|slides-|material-|read-(?!README)|geodesy-source)/.test(p))return {label:'资料中心',href:'/resources.html'};
  return {label:'学习空间',href:'/courses.html'};
});
</script>
<template><nav class="page-context" aria-label="当前位置"><a :href="withBase('/')">学习空间</a><span aria-hidden="true">/</span><a :href="withBase(context.href)">{{context.label}}</a><a class="page-feedback" :href="feedback" target="_blank" rel="noopener noreferrer">反馈本页问题 ↗</a></nav></template>
