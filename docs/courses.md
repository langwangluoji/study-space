---
layout: page
title: 课程目录
description: 按课程或主题查找讲义，查看学习范围、先修基础与来源。
sidebar: false
---

<script setup>
import { withBase } from 'vitepress';
</script>

<main class="folio-page folio-directory">
  <header class="folio-directory-intro"><h1>从一门课，<br>展开知识线。</h1><p>先看学习范围与先修基础，再沿章节连续阅读。讲义、复习与原始资料，从同一处进入。</p></header>
  <FolioCatalog />
  <nav class="folio-directory-guides" aria-label="学习指南"><a :href="withBase('/study-guide.html')">自学路线</a><a :href="withBase('/review-guide.html')">复习路线</a><a :href="withBase('/classroom.html')">问题课堂</a><a :href="withBase('/resources.html')">资料库</a></nav>
</main>
