<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'
defineProps({ english: { type: String, default: '' }, chinese: { type: String, default: '' }, terms: { type: String, default: '' }, task: { type: String, default: '读出英文中的关键术语，再用自己的话解释它。' } })
const mode = ref('parallel')
const modes = [{ value: 'chinese', label: '中文优先' }, { value: 'parallel', label: '中英并读' }, { value: 'english', label: 'English first' }]
const key = 'optimization-reading-mode-v1'
function receive(event) {
  const value = event.detail || event.newValue
  if ((event.type !== 'storage' || event.key === key) && modes.some(m => m.value === value)) mode.value = value
}
function change(event) {
  mode.value = event.target.value
  try { localStorage.setItem(key, mode.value) } catch { /* Reading still works without storage. */ }
  window.dispatchEvent(new CustomEvent('optimization-reading-change', { detail: mode.value }))
}
onMounted(() => {
  try { const saved = localStorage.getItem(key); if (modes.some(m => m.value === saved)) mode.value = saved } catch { /* Optional preference. */ }
  window.addEventListener('optimization-reading-change', receive)
  window.addEventListener('storage', receive)
})
onBeforeUnmount(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('optimization-reading-change', receive)
    window.removeEventListener('storage', receive)
  }
})
</script>

<template>
  <section class="opt-reading" aria-label="中英阅读练习">
    <div class="reading-controls"><strong>Reading practice · 阅读练习</strong><label>阅读模式 <select :value="mode" @change="change"><option v-for="m in modes" :key="m.value" :value="m.value">{{ m.label }}</option></select></label></div>
    <p class="reading-note">英文句子是本站原创练习句，非教材引文。先理解，再回到教材核对原文。</p>
    <p v-if="terms" class="reading-terms"><strong>Key terms · 术语：</strong><span lang="en">{{ terms }}</span></p>
    <template v-if="mode === 'chinese'">
      <p lang="zh-CN">{{ chinese }}</p>
      <details><summary>展开英文句子 / English &amp; terminology<span v-if="!terms" class="english-preview" lang="en"> · {{ english.length > 76 ? english.slice(0, 76) + '…' : english }}</span></summary><p lang="en">{{ english }}</p></details>
    </template>
    <template v-else-if="mode === 'parallel'">
      <p lang="en" class="reading-english">{{ english }}</p><p lang="zh-CN">{{ chinese }}</p>
    </template>
    <template v-else>
      <p lang="en" class="reading-english">{{ english }}</p>
      <details><summary>需要时查看中文提示</summary><p lang="zh-CN">{{ chinese }}</p></details>
    </template>
    <p class="reading-task"><strong>Try it · 小任务：</strong>{{ task }}</p>
    <slot />
  </section>
</template>

<style scoped>
.opt-reading{margin:1.4rem 0;padding:1.15rem 1.3rem;border:1px solid var(--vp-c-divider);border-left:4px solid var(--vp-c-brand-1);border-radius:12px;background:var(--vp-c-bg-soft)}
.reading-controls{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}.reading-controls label{font-size:.85rem}.reading-controls select{margin-left:6px;background:var(--vp-c-bg);border:1px solid var(--vp-c-divider);padding:5px 8px;border-radius:5px;color:var(--vp-c-text-1)}
.opt-reading p{white-space:pre-line}.reading-note{font-size:.8rem;color:var(--vp-c-text-2)}.reading-english{font-size:1.05rem;line-height:1.8}.reading-task{font-size:.9rem;border-top:1px solid var(--vp-c-divider);padding-top:12px}.opt-reading summary{cursor:pointer;color:var(--vp-c-brand-1)}select:focus-visible,summary:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:3px}
.reading-terms,.english-preview{font-size:.85rem}.english-preview{color:var(--vp-c-text-2)}
</style>
