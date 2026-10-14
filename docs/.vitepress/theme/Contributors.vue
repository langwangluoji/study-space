<script setup>
import { withBase } from 'vitepress';
import contributors from '../../../contributors.config.json';
</script>
<template>
  <div class="contributor-grid">
    <article v-for="person in contributors" :key="person.handle" class="contributor-card">
      <img :src="withBase(person.avatar)" :alt="person.name+' 的 GitHub 头像'" width="64" height="64" loading="lazy">
      <div><span class="guide-label">{{person.role}}</span><h3><a :href="person.profile" target="_blank" rel="noopener noreferrer">{{person.name}} <span aria-hidden="true">↗</span></a></h3><p class="contributor-handle">@{{person.handle}}</p><p>{{person.contribution}}</p></div>
    </article>
  </div>
</template>
