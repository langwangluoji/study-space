<script setup>
import { withBase } from 'vitepress';
const props = defineProps({ items: { type: Array, default: () => [] }, currentPath: String, currentSection: String });
const pagePath = value => {
  const path = (value || '').split('#')[0].replace(/\.html$/, '');
  const base = withBase('/').replace(/\/$/, '');
  return path.startsWith(base + '/') ? path.slice(base.length) : path;
};
const samePage = link => !!link && pagePath(link) === pagePath(props.currentPath);
const containsPage = item => samePage(item.link) || (item.items || []).some(containsPage);
function current(link) {
  if (!samePage(link)) return undefined;
  const hash = link.split('#')[1];
  if (!hash) return 'page';
  try { return decodeURIComponent(hash) === props.currentSection ? 'location' : undefined; } catch { return undefined; }
}
</script>
<template>
  <ul class="folio-directory-tree">
    <li v-for="(item, index) in items" :key="item.link || item.text || index">
      <details v-if="item.items?.length" :open="containsPage(item)">
        <summary>{{ item.text }}</summary>
        <a v-if="item.link" class="folio-directory-intro" :href="withBase(item.link)" :aria-current="current(item.link)">本章导读</a>
        <FolioDirectoryTree :items="item.items" :current-path="currentPath" :current-section="currentSection" />
      </details>
      <a v-else-if="item.link" :href="withBase(item.link)" :aria-current="current(item.link)">{{ item.text }}</a>
      <span v-else>{{ item.text }}</span>
    </li>
  </ul>
</template>
