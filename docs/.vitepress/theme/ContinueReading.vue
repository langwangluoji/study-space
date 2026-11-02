<script setup>
import { computed, onMounted, onUnmounted, ref } from 'vue';
import { withBase } from 'vitepress';
import { courseNames } from './course-experience.js';
import { readReadingState, clearReadingPositions, READING_EVENT } from './reading-position.js';
const state = ref({ latest: null, byCourse: {} });
const showHistory = ref(false);
const notice = ref('');
const recent = computed(() => state.value.latest);
const history = computed(() => Object.values(state.value.byCourse).filter(r => r.path !== recent.value?.path));
const refresh = () => { state.value = readReadingState(); };
function clear() { if (clearReadingPositions()) { refresh(); showHistory.value = false; notice.value = '已清除本机阅读记录'; } else notice.value = '浏览器未允许清除记录'; }
function dateLabel(record) { return record.updatedAt ? new Date(record.updatedAt).toLocaleDateString('zh-CN', { month: 'long', day: 'numeric' }) : '旧版阅读位置'; }
onMounted(() => { refresh(); window.addEventListener(READING_EVENT, refresh); window.addEventListener('storage', refresh); });
onUnmounted(() => { window.removeEventListener(READING_EVENT, refresh); window.removeEventListener('storage', refresh); });
</script>
<template>
  <section class="continue-reading-block" aria-label="本机阅读位置">
    <a v-if="recent" class="continue-reading" :href="recent.path">
      <span>继续上次阅读<small>{{ courseNames[recent.courseId] }} · {{ dateLabel(recent) }}</small></span>
      <strong>{{ recent.title }}<small v-if="recent.section">{{ recent.section }}</small></strong>
      <span aria-hidden="true">↗</span>
    </a>
    <a v-else class="continue-reading continue-reading-empty" :href="withBase('/study-guide.html')"><span>还没有阅读记录<small>在此浏览器读过的章节会显示在这里</small></span><strong>选择学习路线</strong><span aria-hidden="true">↗</span></a>
    <div v-if="recent" class="continue-reading-actions">
      <span>记录保存在此浏览器</span>
      <button v-if="history.length" type="button" :aria-expanded="showHistory" aria-controls="reading-course-history" @click="showHistory = !showHistory">{{ showHistory ? '收起课程记录' : '按课程查看' }}</button>
      <button type="button" @click="clear">清除阅读位置</button>
    </div>
    <ul v-if="showHistory" id="reading-course-history" class="continue-reading-history"><li v-for="record in history" :key="record.courseId"><a :href="record.path"><span>{{ courseNames[record.courseId] }}</span><strong>{{ record.title }}</strong><small v-if="record.section">{{ record.section }}</small></a></li></ul>
    <span class="folio-sr-only" role="status">{{ notice }}</span>
  </section>
</template>
