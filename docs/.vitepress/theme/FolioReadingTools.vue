<script setup>
import { computed, nextTick, onMounted, onUnmounted, ref, watch } from 'vue';
import { useRoute, withBase } from 'vitepress';
import { useSidebar } from 'vitepress/theme';
import { courseForPath, courseNames, reviewFor, isResourcePath, isCourseOverview } from './course-experience.js';
import { readingTitle } from './reading-targets.js';
import { saveReadingPosition, readReadingState, READING_EVENT } from './reading-position.js';
import FolioDirectoryTree from './FolioDirectoryTree.vue';

const route = useRoute();
const { sidebar } = useSidebar();
const course = computed(() => isResourcePath(route.path) ? null : courseForPath(route.path));
const fontSize = ref('18');
const focused = ref(false);
const dialog = ref(null);
const drawer = ref('');
const outline = ref([]);
const desktop = ref(false);
const desktopOpen = ref(true);
const desktopTab = ref('course');
const desktopPanel = ref(null);
const activeSection = ref('');
const desktopVisible = computed(() => desktop.value && desktopOpen.value && !focused.value);
const drawerTitle = computed(() => drawer.value === 'course' ? '课程目录' : '本页大纲');
const chapterIndex = computed(() => (course.value?.chapters || []).findIndex(c => route.path.split('/').pop()?.replace('.html', '') === c.slug));
const directory = computed(() => {
  const rows = [];
  const walk = (items, depth = 0) => { for (const item of items || []) { rows.push({ text: item.text, href: item.link, depth }); walk(item.items, depth + 1); } };
  walk(sidebar.value);
  return rows;
});
let opener, oldOverflow = '', locked = false, observer, scrollTimer, readyTimer, routeToken = 0, currentPath = '', currentTitle = '', headings = [], mounted = false;
let lastMeasuredRecord = null, recordingCleared = false;
const cleanHeading = el => { const clone = el.cloneNode(true); clone.querySelectorAll('.header-anchor').forEach(a => a.remove()); return clone.textContent.trim(); };
function applyPresentation() {
  if (!mounted) return;
  const root = document.documentElement;
  if (course.value) {
    root.dataset.folioReading = course.value.id;
    root.classList.toggle('folio-course-overview', isCourseOverview(route.path));
    root.classList.toggle('folio-focus', focused.value);
    root.classList.toggle('folio-review', /\/review-[^/]+\.html$/.test(route.path));
    root.classList.toggle('folio-directory-open', desktopVisible.value);
    root.style.setProperty('--folio-reading-size', fontSize.value + 'px');
  } else {
    root.removeAttribute('data-folio-reading');
    root.classList.remove('folio-course-overview', 'folio-focus', 'folio-review', 'folio-directory-open');
    root.style.removeProperty('--folio-reading-size');
  }
}
function setFont() { try { localStorage.setItem('study-space-reading-font-v1', fontSize.value); } catch {} applyPresentation(); }
function toggleFocus() { focused.value = !focused.value; applyPresentation(); }
function rememberDirectory() { try { localStorage.setItem('study-space-desktop-directory-v1', desktopOpen.value ? 'open' : 'closed'); } catch {} applyPresentation(); }
async function closeDesktop() {
  desktopOpen.value = false; rememberDirectory();
  await nextTick();
  document.querySelector('.folio-directory-reopen')?.focus({ preventScroll: true });
}
async function showDesktop(kind = 'course', focus = false) {
  desktopTab.value = kind; desktopOpen.value = true; focused.value = false;
  refreshOutline(); rememberDirectory();
  await nextTick();
  if (focus) desktopPanel.value?.querySelector('.folio-directory-tabs button[aria-pressed="true"]')?.focus({ preventScroll: true });
}
function visibleFocusables() {
  return [...(dialog.value?.querySelectorAll('a[href],button,select,[tabindex="0"]') || [])].filter(el => !el.disabled && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
}
function unlock() { if (locked) { document.body.style.overflow = oldOverflow; locked = false; } }
function closeDrawer(restore = true) {
  const wasOpen = dialog.value?.open;
  if (wasOpen) dialog.value.close();
  drawer.value = '';
  unlock();
  if (restore && wasOpen && opener?.isConnected) opener.focus({ preventScroll: true });
}
async function openDrawer(kind, event) {
  if (desktop.value && !focused.value) { await showDesktop(kind, true); return; }
  opener = event.currentTarget;
  drawer.value = kind;
  // Include targets inside folded supplements; following their IDs uses the site's existing reveal hook.
  refreshOutline();
  await nextTick();
  if (!dialog.value || !course.value) return;
  oldOverflow = document.body.style.overflow;
  locked = true;
  document.body.style.overflow = 'hidden';
  dialog.value.showModal();
  visibleFocusables()[0]?.focus();
}
function keydown(event) {
  if (event.key === 'Escape') { event.preventDefault(); closeDrawer(); }
  if (event.key !== 'Tab') return;
  const list = visibleFocusables(), first = list[0], last = list.at(-1);
  if (!first) { event.preventDefault(); dialog.value?.focus(); return; }
  if (event.shiftKey && (document.activeElement === first || !dialog.value.contains(document.activeElement))) { event.preventDefault(); last.focus(); }
  else if (!event.shiftKey && (document.activeElement === last || !dialog.value.contains(document.activeElement))) { event.preventDefault(); first.focus(); }
}
function decorateReviewTables() {
  if (!/\/review-[^/]+\.html$/.test(route.path)) return;
  for (const table of document.querySelectorAll('.vp-doc table')) {
    const headers=[...table.querySelectorAll('thead tr:first-child th')];
    if(headers.length<2||headers.length>5||headers.some(h=>h.colSpan!==1))continue;
    table.dataset.folioStacked='true';table.setAttribute('role','table');
    table.querySelector('thead')?.setAttribute('role','rowgroup');table.querySelector('tbody')?.setAttribute('role','rowgroup');
    headers.forEach(h=>h.setAttribute('role','columnheader'));
    table.querySelectorAll('tr').forEach(row=>row.setAttribute('role','row'));
    table.querySelectorAll('tbody tr').forEach(row=>[...row.cells].forEach((cell,index)=>{cell.dataset.folioLabel=headers[index]?.textContent.trim()||'';cell.setAttribute('role','cell')}));
  }
}
function refreshOutline() {
  decorateReviewTables();
  headings = [...document.querySelectorAll('.VPDoc .main .vp-doc :is(h2,h3,h4,h5,h6)[id]')];
  outline.value = headings.filter(el => ['H2', 'H3'].includes(el.tagName)).map(el => ({ id: el.id, text: cleanHeading(el), depth: el.tagName === 'H3' ? 1 : 0 }));
}
function persistMeasuredPosition() {
  if (lastMeasuredRecord && !recordingCleared) saveReadingPosition(lastMeasuredRecord);
}
function savePosition(preferHash = false) {
  if (recordingCleared || !currentPath || currentPath !== route.path.split('#')[0] || !readingTitle(currentPath)) return;
  const visible = headings.filter(el => el.isConnected && el.getClientRects().length && getComputedStyle(el).visibility !== 'hidden');
  // Last visible heading above the reading line; this remains the active section until the next heading arrives.
  let active = visible.filter(el => el.getBoundingClientRect().top <= 160).at(-1);
  if (preferHash && location.hash) {
    try {
      const target = document.getElementById(decodeURIComponent(location.hash.slice(1)));
      if (target && visible.includes(target)) active = target;
    } catch {}
  }
  lastMeasuredRecord = { path: currentPath + (active ? '#' + encodeURIComponent(active.id) : ''), title: currentTitle, section: active ? cleanHeading(active) : '', updatedAt: Date.now() };
  activeSection.value = active?.id || '';
  persistMeasuredPosition();
}
function queuePosition() { clearTimeout(scrollTimer); scrollTimer = setTimeout(savePosition, 160); }
function onScroll() { if (currentPath === route.path.split('#')[0]) { recordingCleared = false; queuePosition(); } }
function onReadingChange() {
  if (!readReadingState().latest) { lastMeasuredRecord = null; recordingCleared = true; clearTimeout(scrollTimer); }
}
function stopTracking() { observer?.disconnect(); clearTimeout(scrollTimer); clearTimeout(readyTimer); }
async function startPage() {
  const token = ++routeToken;
  stopTracking(); closeDrawer(false); applyPresentation();
  currentPath = ''; currentTitle = ''; headings = []; outline.value = []; activeSection.value = ''; lastMeasuredRecord = null; recordingCleared = false;
  if (!course.value) return;
  await nextTick();
  if (token !== routeToken) return;
  refreshOutline();
  currentPath = route.path.split('#')[0];
  const heading = document.querySelector('.VPDoc .main .vp-doc h1');
  currentTitle = heading ? cleanHeading(heading) : readingTitle(currentPath) || course.value.title;
  // Let hash navigation and the existing folded-details reveal complete before measuring headings.
  readyTimer = setTimeout(() => {
    if (token !== routeToken) return;
    refreshOutline(); savePosition(true);
    if ('IntersectionObserver' in window) {
      observer = new IntersectionObserver(queuePosition, { rootMargin: '-80px 0px -60% 0px', threshold: [0, 1] });
      headings.forEach(el => observer.observe(el));
    }
  }, 650);
}
function resize() { closeDrawer(false); desktop.value = window.matchMedia('(min-width: 1100px)').matches; applyPresentation(); }
function pagehide() { persistMeasuredPosition(); }
// VitePress may reset scroll before route watchers run. Persist the last measurement,
// rather than replacing it with coordinates from the next page's navigation.
const unwatch = watch(() => route.path, () => { if (mounted) { persistMeasuredPosition(); startPage(); } }, { flush: 'pre' });
onMounted(() => {
  mounted = true;
  try { const stored = localStorage.getItem('study-space-reading-font-v1'); if (['17','18','20'].includes(stored)) fontSize.value = stored; } catch {}
  try { desktopOpen.value = localStorage.getItem('study-space-desktop-directory-v1') !== 'closed'; } catch {}
  desktop.value = window.matchMedia('(min-width: 1100px)').matches;
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', resize);
  window.addEventListener('pagehide', pagehide);
  window.addEventListener(READING_EVENT, onReadingChange);
  startPage();
});
onUnmounted(() => {
  persistMeasuredPosition(); mounted = false; routeToken++; unwatch(); stopTracking(); closeDrawer(false);
  window.removeEventListener('scroll', onScroll); window.removeEventListener('resize', resize); window.removeEventListener('pagehide', pagehide); window.removeEventListener(READING_EVENT, onReadingChange);
  document.documentElement.removeAttribute('data-folio-reading');
  document.documentElement.classList.remove('folio-course-overview', 'folio-focus', 'folio-review', 'folio-directory-open');
  document.documentElement.style.removeProperty('--folio-reading-size');
});
</script>
<template>
  <div v-if="course" class="folio-reading-tools">
    <nav class="folio-course-paths" aria-label="课程阅读入口">
      <a class="folio-course-name" :href="withBase(course.entry)">{{ courseNames[course.id] || course.title }}</a>
      <div class="folio-course-modes"><a :href="withBase(course.start)">系统学习</a><a :href="withBase(reviewFor(course))">复习</a><a :href="withBase(course.source)">课件与原件</a></div>
    </nav>
    <div class="folio-reader-controls" aria-label="阅读设置">
      <div class="folio-directory-buttons"><button type="button" :aria-expanded="desktop && !focused ? desktopVisible && desktopTab === 'course' : drawer === 'course'" :aria-controls="desktop && !focused ? 'folio-desktop-directory' : 'folio-reading-dialog'" @click="openDrawer('course', $event)">课程目录</button><button type="button" :aria-expanded="desktop && !focused ? desktopVisible && desktopTab === 'page' : drawer === 'page'" :aria-controls="desktop && !focused ? 'folio-desktop-directory' : 'folio-reading-dialog'" @click="openDrawer('page', $event)">本页大纲</button></div>
      <div class="folio-type-controls"><label for="folio-reading-size">字号</label><select id="folio-reading-size" v-model="fontSize" @change="setFont"><option value="17">17</option><option value="18">18</option><option value="20">20</option></select><button type="button" :aria-pressed="focused" @click="toggleFocus">{{ focused ? '退出专注' : '专注阅读' }}</button></div>
    </div>
    <p v-if="chapterIndex >= 0" class="folio-chapter-caption">{{ courseNames[course.id] }} / {{ String(chapterIndex + 1).padStart(2, '0') }}</p>
    <Teleport to="body">
      <aside v-if="desktop" v-show="desktopVisible" id="folio-desktop-directory" ref="desktopPanel" class="folio-desktop-directory" :aria-label="courseNames[course.id] + '阅读目录'" @keydown.esc.prevent="closeDesktop">
        <div class="folio-directory-heading"><a :href="withBase(course.entry)">{{ courseNames[course.id] }}</a><button type="button" aria-label="收起目录" @click="closeDesktop">收起 <span aria-hidden="true">‹</span></button></div>
        <div class="folio-directory-tabs" aria-label="目录内容"><button type="button" :aria-pressed="desktopTab === 'course'" @click="desktopTab = 'course'">课程目录</button><button type="button" :aria-pressed="desktopTab === 'page'" @click="desktopTab = 'page'; refreshOutline()">本页大纲</button></div>
        <div class="folio-directory-scroll">
          <nav v-if="desktopTab === 'course'" aria-label="可展开的课程目录"><FolioDirectoryTree :items="sidebar" :current-path="route.path" :current-section="activeSection" /></nav>
          <nav v-else aria-label="本页章节"><ul class="folio-directory-tree folio-desktop-outline"><li v-for="heading in outline" :key="heading.id" :class="{ 'is-subsection': heading.depth }"><a :href="'#' + encodeURIComponent(heading.id)" :aria-current="activeSection === heading.id ? 'location' : undefined">{{ heading.text }}</a></li></ul><p v-if="!outline.length">本页没有分节标题。</p></nav>
        </div>
        <a class="folio-directory-all" :href="withBase('/courses.html')">全部课程</a>
      </aside>
      <button v-if="desktop && !desktopOpen && !focused" class="folio-directory-reopen" type="button" aria-expanded="false" aria-controls="folio-desktop-directory" @click="showDesktop('course', true)"><span aria-hidden="true">☰</span> 展开目录</button>
      <dialog id="folio-reading-dialog" ref="dialog" class="folio-reading-dialog" aria-labelledby="folio-drawer-title" @keydown="keydown" @cancel.prevent="closeDrawer()" @close="unlock" @click="event => { if (event.target === dialog) closeDrawer(); }">
        <div class="folio-drawer-heading"><h2 id="folio-drawer-title">{{ drawerTitle }}</h2><button type="button" aria-label="关闭目录" @click="closeDrawer()">关闭 <span aria-hidden="true">×</span></button></div>
        <nav v-if="drawer === 'course'" aria-label="完整课程目录"><ul class="folio-drawer-links"><li v-for="(row, index) in directory" :key="index" :style="{ '--depth': row.depth }"><a v-if="row.href" :href="withBase(row.href)" :aria-current="withBase(row.href).split('#')[0] === route.path ? 'page' : undefined" @click="closeDrawer(false)">{{ row.text }}</a><strong v-else>{{ row.text }}</strong></li></ul><p v-if="!directory.length">本课程的章节可从<a :href="withBase(course.entry)" @click="closeDrawer(false)">课程总览</a>进入。</p></nav>
        <nav v-else aria-label="本页章节"><ul class="folio-drawer-links"><li v-for="heading in outline" :key="heading.id" :style="{ '--depth': heading.depth }"><a :href="'#' + encodeURIComponent(heading.id)" @click="closeDrawer(false)">{{ heading.text }}</a></li></ul><p v-if="!outline.length">本页没有分节标题。</p></nav>
      </dialog>
    </Teleport>
  </div>
</template>
