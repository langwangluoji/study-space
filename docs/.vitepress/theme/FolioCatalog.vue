<script setup>
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import space from '../../../study-space.config.json';
import CourseArtwork from './CourseArtwork.vue';
defineProps({ compact: Boolean, selectedId: { type: String, default: '' } });
const emit = defineEmits(['select-course']);
const query = ref('');
const folioOrder = ['optimization', 'geodesy', 'ml', 'insar', 'remote-sensing', 'optics', 'photogrammetry'];
const orderedCourses = [...space.courses].sort((a, b) => {
  const position = course => { const index = folioOrder.indexOf(course.id); return index < 0 ? folioOrder.length : index; };
  return position(a) - position(b);
});
const courses = computed(() => {
  const terms = query.value.trim().toLocaleLowerCase().split(/\s+/).filter(Boolean);
  return orderedCourses.filter(course => {
    const text = [course.title, course.subtitle, course.field, course.summary, course.scope, course.prerequisites, ...course.tags, ...(course.chapters || []).map(ch => ch.title)].join(' ').toLocaleLowerCase();
    return terms.every(term => text.includes(term));
  });
});
const shortTitle = course => course.title.replace(' · 双教材讲义', '');
</script>

<template>
  <section class="folio-catalog" :class="{ 'folio-catalog-compact': compact }" aria-labelledby="folio-library-title">
    <header class="folio-library-head"><div><h2 id="folio-library-title">把一门课，展开来读。</h2><p>{{ space.courses.length }} 门课程，沿教材与课堂顺序进入。</p></div><label class="folio-search">查找课程或主题<input v-model="query" type="search" name="course-search" placeholder="试试「光学」或「矩阵」" autocomplete="off" /></label></header>
    <p v-if="query.trim()" class="folio-search-status" role="status">找到 {{ courses.length }} 门课程</p>
    <div class="folio-course-grid">
      <article v-for="course in courses" :key="course.id" class="hub-course folio-tile" :class="`folio-course-${course.id}`" :data-course-id="course.id" :data-selected="compact && selectedId === course.id ? 'true' : undefined">
        <div class="folio-tile-heading"><span>{{ course.field }}</span><button v-if="compact" class="folio-select" type="button" :aria-pressed="selectedId === course.id" :aria-label="`在封面查看${shortTitle(course)}`" @click="emit('select-course', course.id)">{{ selectedId === course.id ? '封面展示中' : '选作封面' }}</button></div>
        <h3>{{ shortTitle(course) }}</h3>
        <button v-if="compact" class="folio-art-select" type="button" :aria-label="`在封面查看${shortTitle(course)}`" :aria-pressed="selectedId === course.id" @click="emit('select-course', course.id)"><CourseArtwork :course-id="course.id" /></button><CourseArtwork v-else :course-id="course.id" />
        <p v-if="!compact" class="folio-tile-summary">{{ course.summary }}</p><p class="folio-tile-scope">{{ course.scope }}</p><p v-if="!compact" class="folio-prerequisites">先修基础：{{ course.prerequisites }}</p>
        <ul class="folio-topics" aria-label="课程主题"><li v-for="tag in course.tags" :key="tag">{{ tag }}</li></ul>
        <nav class="folio-tile-links" :aria-label="`${shortTitle(course)}学习入口`"><a class="hub-entry" :href="withBase(course.entry)">进入课程</a><a :href="withBase(`/review-${course.id}.html`)">复习</a><a :href="withBase(course.source)">来源</a></nav>
      </article>
    </div>
    <div v-if="!courses.length" class="folio-empty" role="status"><h3>没有匹配的课程。</h3><p>换一个课程名或主题，例如「辐射」「神经网络」或「几何」。</p><button type="button" @click="query = ''">查看全部课程</button></div>
  </section>
</template>
