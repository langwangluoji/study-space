<script setup>
import { ref } from 'vue';
import { withBase } from 'vitepress';
import creator from '../../../creator.config.json';
const avatarFailed=ref(false);
</script>
<template>
  <div class="creator-identity"><img v-if="!avatarFailed" :src="withBase(creator.avatar)" :alt="creator.name+' 的 GitHub 头像'" width="96" height="96" @error="avatarFailed=true"><span v-else class="creator-monogram" aria-hidden="true">SZ</span><div><p class="hub-eyebrow">MADE BY / 网站制作者</p><h1>{{creator.name}}</h1><p class="creator-handle">@{{creator.handle}} · Study Space</p></div></div>
  <div class="hero-actions"><a class="space-button primary" :href="creator.profile" target="_blank" rel="noopener noreferrer">GitHub 主页 <span aria-hidden="true">↗</span></a><a class="space-button" :href="creator.repository" target="_blank" rel="noopener noreferrer">网站源码 <span aria-hidden="true">↗</span></a></div>
</template>
