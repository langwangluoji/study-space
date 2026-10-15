<script setup>
import { computed, onMounted, ref } from 'vue'
import { withBase } from 'vitepress'
import reading from '../../../public/photogrammetry/reading.json'

const KEY = 'photogrammetry-reading-v1'
const mode = ref('bridge')
const query = ref('')
const reviewOnly = ref(false)
const progress = ref({})
const selection = ref({})
const results = ref({})
const predictions = ref({})
const message = ref('')
const backup = ref(null)
const mounted = ref(false)
const lessons = reading.lessons
const visible = computed(() => {
  const q = query.value.trim().toLocaleLowerCase()
  return lessons.filter(l => (!reviewOnly.value || progress.value[l.id] === 'review') &&
    (!q || [l.title, l.english, l.chinese, l.section, ...l.keywords.flat()].join(' ').toLocaleLowerCase().includes(q)))
})
const mastered = computed(() => Object.values(progress.value).filter(s => s === 'mastered').length)
const reviews = computed(() => Object.values(progress.value).filter(s => s === 'review').length)
function validate(value) {
  if (!value || typeof value !== 'object' || Array.isArray(value)) return {}
  return Object.fromEntries(lessons.filter(l => ['review', 'mastered'].includes(value[l.id])).map(l => [l.id, value[l.id]]))
}
function save() {
  if (!mounted.value) return
  try { localStorage.setItem(KEY, JSON.stringify({ progress: progress.value, mode: mode.value })) }
  catch { message.value = '浏览器无法保存记录；本次练习仍可继续，关闭页面后可能丢失。' }
}
function setMode(event) { mode.value = event.target.value; save() }
function mark(id, state) { progress.value = { ...progress.value, [id]: state }; save() }
function submit(lesson) {
  if (selection.value[lesson.id] === undefined) return
  const correct = Number(selection.value[lesson.id]) === lesson.correctIndex
  results.value = { ...results.value, [lesson.id]: correct ? 'correct' : 'incorrect' }
  mark(lesson.id, correct ? 'mastered' : 'review')
}
function retry(id) {
  const next = { ...results.value }; delete next[id]; results.value = next
  const choice = { ...selection.value }; delete choice[id]; selection.value = choice
}
function reset() {
  backup.value = { ...progress.value }
  try { localStorage.setItem(`${KEY}-backup`, JSON.stringify(backup.value)) } catch { /* In-memory recovery remains available. */ }
  progress.value = {}; results.value = {}; selection.value = {}; predictions.value = {}; save()
  message.value = '学习记录已重置，可用“恢复上次记录”撤销。'
}
function restore() {
  if (!backup.value) return
  progress.value = validate(backup.value); save(); message.value = '已恢复上次学习记录。'
}
onMounted(() => {
  mounted.value = true
  try {
    const raw = localStorage.getItem(KEY)
    if (raw) {
      const saved = JSON.parse(raw); progress.value = validate(saved.progress)
      if (['bridge', 'english'].includes(saved.mode)) mode.value = saved.mode
    }
    const previous = localStorage.getItem(`${KEY}-backup`)
    if (previous) backup.value = validate(JSON.parse(previous))
  } catch { message.value = '未能读取旧记录，已从空状态开始；可正常练习并重新保存。' }
})
</script>

<template>
  <section class="photo-reading" aria-label="摄影测量双语阅读工作台">
    <div class="reading-tools">
      <label>显示顺序 <select :value="mode" @change="setMode"><option value="bridge">中文支架 · Bilingual</option><option value="english">English-first</option></select></label>
      <label class="search">搜索主题或术语 <input v-model="query" type="search" placeholder="例如：orientation / 定向" /></label>
      <label><input v-model="reviewOnly" type="checkbox" /> 仅待复习 ({{ reviews }})</label>
    </div>
    <p class="progress">已掌握 {{ mastered }} / {{ lessons.length }} · 待复习 {{ reviews }}。记录保存在当前浏览器；三级梯度可自由选择。</p>
    <progress :value="mastered" :max="lessons.length" aria-label="已掌握课程进度" />
    <div class="record-tools"><button type="button" @click="reset">重置学习记录</button><button type="button" :disabled="!backup" @click="restore">恢复上次记录</button></div>
    <p v-if="message" role="status">{{ message }}</p>
    <p v-if="!visible.length" class="empty" role="status">{{ reviewOnly ? '当前筛选下没有待复习课程。取消筛选可查看全部小课。' : '没有找到相符主题。试试英文关键词或清空搜索。' }} <button type="button" @click="query = ''; reviewOnly = false">显示全部</button></p>
    <article v-for="lesson in visible" :key="lesson.id" class="lesson" :aria-labelledby="`photo-reading-${lesson.id}`">
      <header><span class="number">{{ String(lesson.id).padStart(2, '0') }}</span><h3 :id="`photo-reading-${lesson.id}`">{{ lesson.title }}</h3><span class="status">{{ progress[lesson.id] === 'mastered' ? '已掌握' : progress[lesson.id] === 'review' ? '待复习' : '未开始' }}</span></header>
      <p class="source">{{ lesson.section }} · 印刷 p.{{ lesson.printedPages.join(', ') }} · PDF 页 {{ lesson.pdfPages.join(', ') }}<br /><a :href="withBase(`/photogrammetry-material-english.html#page=${lesson.pdfPages[0]}`)">打开本机原著阅读器 ↗</a></p>
      <p v-if="mode === 'bridge'">{{ lesson.chinese }}</p>
      <blockquote lang="en">{{ lesson.english }}</blockquote>
      <details v-if="mode === 'english'"><summary>展开中文支架</summary><p>{{ lesson.chinese }}</p></details>
      <details><summary>拆句提示 · Parse the sentence</summary><p>{{ lesson.sentenceHint }}</p></details>
      <dl class="terms"><template v-for="term in lesson.keywords" :key="term[0]"><dt lang="en">{{ term[0] }}</dt><dd>{{ term[1] }}</dd></template></dl>
      <p v-if="lesson.formula" class="formula">{{ lesson.formula }}</p><p v-if="lesson.conditions" class="conditions"><strong>成立条件：</strong>{{ lesson.conditions }}</p>
      <p><strong>回到原著：</strong>{{ lesson.readingTask }}</p>
      <details><summary>术语误区 · Watch out</summary><p>{{ lesson.misconception }}</p></details>
      <form class="self-check" @submit.prevent="submit(lesson)">
        <fieldset :disabled="Boolean(results[lesson.id])">
          <legend>先预测，再看解释 · {{ lesson.check }}</legend>
          <label :for="`prediction-${lesson.id}`">先写自己的理由（选填，不保存）</label>
          <textarea :id="`prediction-${lesson.id}`" v-model="predictions[lesson.id]" rows="2" placeholder="我的预测是……因为……" />
          <label v-for="(choice, index) in lesson.choices" :key="index" class="choice"><input v-model="selection[lesson.id]" type="radio" :name="`photo-choice-${lesson.id}`" :value="index" /> {{ choice }}</label>
        </fieldset>
        <button v-if="!results[lesson.id]" type="submit" :disabled="selection[lesson.id] === undefined">提交预测并看解释</button>
        <div v-else class="feedback" role="status"><strong>{{ results[lesson.id] === 'correct' ? '判断正确，已记录为掌握。' : '这次判断需要修正，已加入待复习。' }}</strong><p>{{ lesson.answer }}</p><button type="button" @click="retry(lesson.id)">再试一次</button></div>
      </form>
      <div class="record-tools"><button type="button" @click="mark(lesson.id, 'review')">留待复习</button><button v-if="results[lesson.id] === 'correct'" type="button" @click="mark(lesson.id, 'mastered')">标记已掌握</button></div>
    </article>
  </section>
</template>

<style scoped>
.photo-reading{margin:1.5rem 0}.reading-tools,.record-tools{display:flex;flex-wrap:wrap;gap:12px;align-items:center}.reading-tools{padding:18px;border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft)}.reading-tools label{font-size:.88rem}.reading-tools .search{flex:1;min-width:220px}.search input{width:100%;margin-top:5px}select,input[type=search],textarea{border:1px solid var(--vp-c-divider);border-radius:6px;padding:7px 9px;background:var(--vp-c-bg);color:var(--vp-c-text-1)}select{margin-left:6px}progress{width:100%;height:9px;accent-color:var(--vp-c-brand-1)}.progress,.source,.conditions{font-size:.85rem;color:var(--vp-c-text-2)}button{border:1px solid var(--vp-c-divider);border-radius:7px;padding:6px 11px;background:var(--vp-c-bg-soft);color:var(--vp-c-text-1);cursor:pointer;font-size:.85rem}button:disabled{opacity:.5;cursor:default}.record-tools{margin:12px 0}.lesson{margin:22px 0;padding:22px;border:1px solid var(--vp-c-divider);border-radius:14px}.lesson header{display:flex;align-items:baseline;gap:10px;flex-wrap:wrap}.lesson h3{margin:0;flex:1;font-size:1.1rem}.number{color:var(--vp-c-brand-1);font-weight:700}.status{font-size:.78rem;color:var(--vp-c-text-2)}blockquote{font-size:1.07rem;line-height:1.8}.terms{display:grid;grid-template-columns:minmax(120px,1fr) 2fr;gap:7px 14px;font-size:.9rem;margin:16px 0}.terms dt{font-weight:600}.terms dd{margin:0}.formula{font-family:var(--vp-font-family-mono);padding:12px;background:var(--vp-c-bg-soft);overflow-x:auto}summary{cursor:pointer;color:var(--vp-c-brand-1);padding:5px 0}.self-check{margin:18px 0;padding:15px;background:var(--vp-c-bg-soft);border-radius:10px}.self-check fieldset{border:0;padding:0;margin:0}.self-check legend{font-weight:600;margin-bottom:12px}.self-check textarea{display:block;width:100%;resize:vertical;margin:6px 0 12px}.choice{display:block;margin:9px 0}.self-check>button{margin-top:10px}.feedback{margin-top:12px}.feedback p{margin:8px 0}.empty{padding:20px;background:var(--vp-c-bg-soft);border-radius:10px}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible,summary:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:3px}@media(max-width:600px){.lesson{padding:16px}.terms{grid-template-columns:1fr;gap:3px}.terms dd{margin-bottom:9px}.reading-tools .search{min-width:100%}.source{overflow-wrap:anywhere}}
</style>
