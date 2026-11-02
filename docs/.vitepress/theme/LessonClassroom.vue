<script setup>
import { computed, ref, watch } from 'vue';
import { withBase } from 'vitepress';
import { lessons, lessonById, curveFor } from './classroom-model.js';

const props = defineProps({ lesson: { type: String, default: 'optimization' }, headingLevel: { type: Number, default: 3 } });
const effectiveHeadingLevel = computed(() => props.lesson === 'all' ? 2 : Math.max(2, Math.min(5, props.headingLevel)));
const headingTag = computed(() => `h${effectiveHeadingLevel.value}`);
const stageHeadingTag = computed(() => `h${effectiveHeadingLevel.value + 1}`);
const selectedLesson = ref(props.lesson === 'all' ? 'optimization' : props.lesson);
const current = computed(() => lessonById(selectedLesson.value));
const stage = ref('prediction');
const selection = ref(null);
const value = ref(current.value.initial);
const stages = [{ id: 'prediction', name: '预测' }, { id: 'experiment', name: '实验' }, { id: 'explanation', name: '解释' }];
watch(() => props.lesson, id => { selectedLesson.value = id === 'all' ? 'optimization' : id; });
watch(current, lesson => { value.value = lesson.initial; selection.value = null; stage.value = 'prediction'; });
const result = computed(() => current.value.model(Number(value.value)));
const feedback = computed(() => selection.value === null ? '可以先选一个想法，也可以直接拖动或阅读解释。' : current.value.choices[selection.value].feedback);
const fmt = (number, digits = 2) => Number(number).toFixed(digits);
const controlValue = computed(() => `${fmt(value.value, current.value.step < 1 ? 2 : 0)} ${current.value.unit}`.trim());
const readings = computed(() => {
  const r = result.value;
  switch (current.value.id) {
    case 'optimization': return [['最优位置', `(${fmt(r.x)}, ${fmt(r.y)})`], ['乘子 λ', fmt(r.lambda)], ['代价 q', fmt(r.q)]];
    case 'ml': return [['一步后参数', `(${fmt(r.w0)}, ${fmt(r.w1)})`], ['更新前 L', fmt(r.before, 3)], ['更新后 L', fmt(r.loss, 5)]];
    case 'photogrammetry': return [['比例尺', `1 : ${fmt(r.denominator, 0)}`], ['比值 f/H', r.scale.toExponential(3)], ['焦距', '152 mm']];
    case 'geodesy': return [['地心纬度 Φ', `${fmt(r.phi, 4)}°`], ['纬差 B−Φ', `${fmt(r.differenceMinutes, 3)}′`]];
    case 'remote-sensing': return [['足迹宽度', `${fmt(r.footprint, 4)} m`], ['小角近似', `${fmt(r.approximate, 4)} m`]];
    case 'insar': return [['合成强度', fmt(r.intensity, 3)], ['合成振幅', fmt(r.amplitude, 3)]];
    case 'optics': return [['偏振态', r.kind], ['分量峰值 Ax / Ay', '1 / 1']];
    default: return [];
  }
});
const chart = computed(() => {
  const lesson = current.value, points = curveFor(lesson);
  if (!points.length) return null;
  const ys = points.map(point => point[1]);
  const low = Math.min(0, ...ys), high = Math.max(...ys, .001);
  const padding = (high - low) * .1;
  const min = low < 0 ? low - padding : 0, max = high + padding;
  const px = x => 58 + (x - lesson.min) / (lesson.max - lesson.min) * 348;
  const py = y => 214 - (y - min) / (max - min) * 164;
  return { path: points.map(([x, y], i) => `${i ? 'L' : 'M'}${px(x).toFixed(2)},${py(y).toFixed(2)}`).join(' '),
    x: px(Number(value.value)), y: py(result.value[lesson.y]), zero: py(0),
    top: max, bottom: min, reference: lesson.id === 'ml' ? py(result.value.before) : lesson.id === 'insar' ? py(2) : null };
});
const trajectory = computed(() => current.value.id === 'optics' ? result.value.points.map(([x, y], i) => `${i ? 'L' : 'M'}${(230 + x * 85).toFixed(2)},${(133 - y * 85).toFixed(2)}`).join(' ') : '');
const optPosition = computed(() => ({ x: 105 + result.value.x * 76, y: 245 - result.value.y * 76 }));
const optBoundary = computed(() => {
  const c = Number(value.value);
  return { x1: 55, y1: 245 - (c + 50 / 76) * 76, x2: 395, y2: 245 - (c - 290 / 76) * 76 };
});
function preset() { value.value = current.value.preset; }
</script>

<template>
  <section class="lesson-classroom" :class="{ 'lesson-classroom--gallery': lesson === 'all' }" :aria-label="`${current.course}问题课堂`">
    <label v-if="lesson === 'all'" class="lc-selector">
      <span>选择一门课程</span>
      <select v-model="selectedLesson"><option v-for="item in lessons" :key="item.id" :value="item.id">{{ item.course }}</option></select>
    </label>
    <div class="lc-heading"><span class="lc-course">{{ current.course }} · 问题课堂</span><component :is="headingTag" class="lc-heading-title">{{ current.title }}</component><p>{{ current.intro }}</p></div>
    <div class="lc-workspace">
      <div class="lc-discussion">
        <div class="lc-stages" role="group" aria-label="课堂阶段，随时切换">
          <button v-for="(item, index) in stages" :key="item.id" type="button" :aria-pressed="stage === item.id" @click="stage = item.id"><span>{{ index + 1 }}</span>{{ item.name }}</button>
        </div>
        <div v-if="stage === 'prediction'" class="lc-stage">
          <component :is="stageHeadingTag" class="lc-stage-title">{{ current.question }}</component>
          <div class="lc-choices" role="group" aria-label="选择你的预测">
            <button v-for="(item, index) in current.choices" :key="item.label" type="button" :aria-pressed="selection === index" @click="selection = index"><span aria-hidden="true">{{ selection === index ? '●' : '○' }}</span>{{ item.label }}</button>
          </div>
          <p class="lc-feedback" aria-live="polite">{{ feedback }}</p>
        </div>
        <div v-else-if="stage === 'experiment'" class="lc-stage">
          <component :is="stageHeadingTag" class="lc-stage-title">动手检验刚才的想法</component><p>{{ current.experiment }}</p>
          <button type="button" class="lc-preset" @click="preset">调到 {{ current.preset }} {{ current.unit }}</button>
        </div>
        <div v-else class="lc-stage">
          <component :is="stageHeadingTag" class="lc-stage-title">把观察和公式连起来</component><p>{{ current.explanation }}</p><p class="lc-formula">{{ current.formula }}</p>
        </div>
      </div>
      <div class="lc-bench">
        <div class="lc-bench-title"><span>{{ current.id === 'optics' ? '电场端点轨迹' : current.id === 'optimization' ? '移动挡板，寻找最优位置' : current.yLabel }}</span><button type="button" @click="value = current.initial">复位</button></div>
        <svg v-if="current.id === 'optimization'" class="lc-plot lc-positioning" viewBox="0 0 460 290" role="img" :aria-label="`约束 x 加 y 不大于 ${value}，最优位置 ${fmt(result.x)}，${fmt(result.y)}`">
          <svg x="55" y="30" width="340" height="225" viewBox="55 30 340 225" overflow="hidden">
            <path d="M105 30V255M181 30V255M257 30V255M333 30V255M55 169H395M55 93H395" class="lc-grid" />
            <polygon :points="`${optBoundary.x1},${optBoundary.y1} ${optBoundary.x2},${optBoundary.y2} 395,600 55,600`" class="lc-feasible" />
            <ellipse cx="257" cy="169" rx="108" ry="54" class="lc-contour" /><ellipse cx="257" cy="169" rx="152" ry="76" class="lc-contour" />
            <ellipse cx="257" cy="169" :rx="Math.sqrt(2 * result.q) * 76" :ry="Math.sqrt(2 * result.q) * 38" class="lc-curve" />
            <line :x1="optBoundary.x1" :y1="optBoundary.y1" :x2="optBoundary.x2" :y2="optBoundary.y2" class="lc-boundary" />
          </svg>
          <path d="M55 245H412M105 255V23" class="lc-axis" />
          <g class="lc-plot-labels"><text x="91" y="267">0</text><text x="176" y="267">1</text><text x="252" y="267">2</text><text x="328" y="267">3</text><text x="81" y="175">1</text><text x="81" y="99">2</text><text x="419" y="249">x</text><text x="120" y="32">y</text></g>
          <circle cx="257" cy="169" r="6" class="lc-target" /><text x="268" y="193" class="lc-plot-labels">目标 (2, 1)</text>
          <circle :cx="optPosition.x" :cy="optPosition.y" r="8" class="lc-point" />
        </svg>
        <svg v-else-if="current.id === 'optics'" class="lc-plot" viewBox="0 0 460 270" role="img" :aria-label="`相位差 ${value} 度，${result.kind}；电场端点轨迹`">
          <path d="M104 133H357M230 25V242" class="lc-axis" />
          <rect x="145" y="48" width="170" height="170" class="lc-grid" fill="none" />
          <path :d="trajectory" class="lc-curve" />
          <circle cx="315" :cy="133 - 85 * result.points[0][1]" r="6" class="lc-point" />
          <g class="lc-plot-labels"><text x="364" y="139">Ex</text><text x="238" y="36">Ey</text><text x="237" y="150">0</text><text x="314" y="239">1</text><text x="130" y="239">−1</text><text x="213" y="53">1</text><text x="201" y="221">−1</text></g>
        </svg>
        <svg v-else-if="chart" class="lc-plot" viewBox="0 0 460 270" role="img" :aria-label="`${current.control}与${current.yLabel}的关系，紫点表示当前读数`">
          <path d="M58 50H406M58 132H406" class="lc-grid" />
          <path d="M58 35V214H421" class="lc-axis" />
          <line x1="58" x2="406" :y1="chart.zero" :y2="chart.zero" class="lc-grid" />
          <line v-if="chart.reference !== null" x1="58" x2="406" :y1="chart.reference" :y2="chart.reference" class="lc-reference" />
          <path :d="chart.path" class="lc-curve" />
          <line :x1="chart.x" :x2="chart.x" :y1="chart.y" y2="214" class="lc-reference" />
          <circle :cx="chart.x" :cy="chart.y" r="7" class="lc-point" />
          <g class="lc-plot-labels"><text x="65" y="34">{{ current.yLabel }}</text><text x="50" y="236">{{ current.min }}</text><text x="398" y="236" text-anchor="end">{{ current.max }}</text><text x="58" y="258">{{ current.control }} {{ current.unit ? `(${current.unit})` : '' }}</text><text x="8" y="55">{{ current.id === 'photogrammetry' ? chart.top.toExponential(0) : fmt(chart.top, 1) }}</text><text x="8" y="217">{{ fmt(chart.bottom, 0) }}</text></g>
        </svg>
        <label class="lc-control"><span>{{ current.control }}<strong>{{ controlValue }}</strong></span><input v-model.number="value" type="range" :min="current.min" :max="current.max" :step="current.step" :aria-label="current.control" :aria-valuetext="controlValue" /><span class="lc-range-ends"><span>{{ current.min }} {{ current.unit }}</span><span>{{ current.max }} {{ current.unit }}</span></span></label>
        <output class="lc-readings" aria-live="polite"><span v-for="[name, reading] in readings" :key="name">{{ name }}<b>{{ reading }}</b></span></output>
        <p class="lc-condition">{{ current.condition }}</p>
      </div>
    </div>
    <div class="lc-reading-link"><a :href="withBase(current.href)">{{ current.link }} <span aria-hidden="true">↗</span></a><span>预测、实验和解释可以随时切换</span></div>
  </section>
</template>
