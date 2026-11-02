<script setup>
import { computed } from 'vue';
import { useRoute } from 'vitepress';
import { courseForPath, isCourseOverview, isResourcePath } from './course-experience.js';
import CourseArtwork from './CourseArtwork.vue';
const route = useRoute();
const course = computed(() => isCourseOverview(route.path) && !isResourcePath(route.path) ? courseForPath(route.path) : null);
</script>
<template>
  <div v-if="course" class="folio-course-masthead" :data-course="course.id" aria-hidden="true">
    <CourseArtwork :course-id="course.id" />
    <span>{{ course.tags?.join(' / ') }}</span>
  </div>
</template>
