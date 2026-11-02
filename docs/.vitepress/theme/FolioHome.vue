<script setup>
import { computed, nextTick, ref } from 'vue';
import { withBase } from 'vitepress';
import space from '../../../study-space.config.json';
import CourseArtwork from './CourseArtwork.vue';
import FolioCatalog from './FolioCatalog.vue';
import ContinueReading from './ContinueReading.vue';
import SiteUpdates from './SiteUpdates.vue';
import SiteTraffic from './SiteTraffic.vue';
const selectedId = ref(space.courses.find(c => c.id === 'optimization')?.id || space.courses[0]?.id);
const selected = computed(() => space.courses.find(c => c.id === selectedId.value) || space.courses[0]);
const title = computed(() => selected.value.title.replace(' · 双教材讲义', ''));
const coverTitle = ref(null);
async function selectCourse(id) {
  selectedId.value = id;
  await nextTick();
  coverTitle.value?.focus({ preventScroll: true });
  coverTitle.value?.scrollIntoView({ block: 'center', behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth' });
}
</script>

<template>
  <main class="folio-page folio-home">
    <section class="folio-cover" aria-labelledby="folio-cover-title"><div class="folio-cover-copy"><p class="folio-cover-field">{{ selected.field }}</p><h1 id="folio-cover-title" ref="coverTitle" tabindex="-1" :class="{ 'folio-long-title': title.length > 7 }">{{ title }}</h1><p class="folio-cover-summary">{{ selected.summary }}</p><div class="folio-cover-links"><a class="folio-primary-link" :href="withBase(selected.start)">开始学习 <span aria-hidden="true">↗</span></a><a :href="withBase(selected.entry)">课程目录</a><a :href="withBase(`/review-${selected.id}.html`)">考点复习</a><a :href="withBase(selected.source)">教材与原件</a></div></div><div class="folio-cover-art"><CourseArtwork :course-id="selected.id" :decorative="false" /><span>{{ selected.tags.join(' / ') }}</span></div></section>
    <div class="folio-cover-bottom"><p>{{ selected.scope }}</p><a :href="withBase('/classroom.html')">带着问题进入课堂 <span aria-hidden="true">↗</span></a></div>
    <div class="folio-home-body"><ContinueReading /><FolioCatalog compact :selected-id="selectedId" @select-course="selectCourse" />
      <section class="folio-paths" aria-labelledby="folio-paths-title"><h2 id="folio-paths-title">按今天的目标出发。</h2><div class="folio-path-grid"><a :href="withBase('/classroom.html')"><strong>问题课堂</strong><span>从一个问题进入概念、图解与讲义。</span></a><a :href="withBase('/study-guide.html')"><strong>找一条学习路线</strong><span>查看先修基础、阅读顺序与知识衔接。</span></a><a :href="withBase('/review-guide.html')"><strong>准备考试复习</strong><span>先串概念和适用条件，再回到正文。</span></a><a class="hub-resource" :href="withBase('/resources.html')"><strong>查找原始资料</strong><span>按课程查找教材、课件、代码和离线包。</span></a></div></section>
      <section id="site-updates" class="folio-updates" aria-labelledby="folio-updates-title"><div class="folio-section-head"><h2 id="folio-updates-title">最近更新</h2><a :href="withBase('/updates.html')">查看全部更新</a></div><SiteUpdates compact /></section>
      <div class="folio-quiet"><SiteTraffic /></div>
      <footer class="folio-footer"><p>Study Space<br><span>讲义、原始来源与可操作的数学。</span></p><nav aria-label="关于学习空间"><a :href="withBase('/extensions.html')">扩展阅读</a><a :href="withBase('/about.html')">关于这个空间</a><a :href="withBase('/contribute.html')">参与整理</a></nav></footer>
    </div>
  </main>
</template>
