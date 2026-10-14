<script setup>
import { computed, ref } from 'vue';
import { withBase } from 'vitepress';
import paths from '../../../learning-paths.config.json';
import space from '../../../study-space.config.json';
import catalog from '../resource-catalog.json';
const course=ref('all');
const filtered=computed(()=>paths.filter(p=>course.value==='all'||p.course===course.value));
const materials=Object.fromEntries(catalog.map(r=>[r.id,r]));
const labels=Object.fromEntries(space.courses.map(c=>[c.id,c.title]));
</script>
<template>
  <section class="extension-library" aria-label="按问题选择扩展资料">
    <div class="guide-tabs" role="group" aria-label="扩展资料所属课程">
      <button type="button" :aria-pressed="course==='all'" @click="course='all'">全部课程</button>
      <button v-for="c in space.courses" :key="c.id" type="button" :aria-pressed="course===c.id" @click="course=c.id">{{c.title}}</button>
    </div>
    <p class="guide-count" role="status" aria-live="polite" aria-atomic="true">{{filtered.length}} 条阅读建议 · 从问题出发，读完回到正文</p>
    <div class="extension-grid">
      <article v-for="p in filtered" :key="p.id" class="guide-card" :id="p.id">
        <p class="guide-label">{{labels[p.course]}}</p><h3>{{p.title}}</h3><p>{{p.purpose}}</p>
        <ol aria-label="按需阅读建议"><li v-for="step in p.steps" :key="step">{{step}}</li></ol>
        <div class="extension-materials"><span>按需查阅 · 不要求整本读完</span>
          <a v-for="id in p.resources" :key="id" :href="withBase(materials[id].preview)">{{materials[id].title}} <small>{{materials[id].localOnly?'来源说明 · 原件仅维护者存档':materials[id].reader==='file'?'资料说明 · 可下载原件':'阅读入口'}}</small></a>
          <p v-if="p.resources.includes('insar-lecture-package')" class="resource-access">离线包不含课堂 PDF 与完整教材。</p>
        </div>
        <a class="guide-return" :href="withBase(p.returnTo)">{{p.returnLabel}} <span aria-hidden="true">→</span></a>
      </article>
    </div>
  </section>
</template>
