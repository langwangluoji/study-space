<script setup>
import { ref, computed } from 'vue'
import { scalarFusion, fusionCosts } from './fusion-math.js'
const priorMean = 10
const priorSigma = ref(2), sensorSigma = ref(1), measurement = ref(12)
const estimate = computed(() => scalarFusion(priorMean, priorSigma.value, measurement.value, sensorSigma.value))
const range = computed(() => ({ lo: Math.min(priorMean, measurement.value) - 3, hi: Math.max(priorMean, measurement.value) + 3 }))
const minCost = computed(() => fusionCosts(estimate.value.mean, priorMean, priorSigma.value, measurement.value, sensorSigma.value).total)
const yMax = computed(() => Math.max(5, minCost.value + 3))
const px = x => 45 + (x - range.value.lo) / (range.value.hi - range.value.lo) * 440
const py = cost => 220 - cost / yMax.value * 195
const curves = computed(() => {
  const paths = { prior: '', sensor: '', total: '' }
  for (let i = 0; i <= 160; i++) {
    const x = range.value.lo + (range.value.hi - range.value.lo) * i / 160
    const costs = fusionCosts(x, priorMean, priorSigma.value, measurement.value, sensorSigma.value)
    for (const key of Object.keys(paths)) paths[key] += `${i ? 'L' : 'M'}${px(x)} ${py(costs[key])} `
  }
  return paths
})
const fmt = v => v.toFixed(3)
function reset() { priorSigma.value = 2; sensorSigma.value = 1; measurement.value = 12 }
</script>

<template>
  <section class="fusion-lab" aria-label="一维高斯传感器融合与MAP优化实验">
    <header><strong>Fusion lab · 一维传感器融合</strong><button type="button" @click="reset">重置 Reset</button></header>
    <p>先验（prior）给出位置估计 m = 10、标准差 σp；传感器直接测量同一位置，读数 z、噪声标准差 σz。把两条信息按可信程度组合，得到后验（posterior）。这里的位置、读数、标准差使用同一任意长度单位。</p>
    <p class="predict"><strong>先预测：</strong>默认先验 σp = 2、传感器 σz = 1，谁更可信？融合结果会更靠近 10 还是 12？先作判断，再调大传感器标准差。</p>
    <div class="controls">
      <label>先验标准差 σp = {{ fmt(priorSigma) }}<input v-model.number="priorSigma" type="range" min="0.25" max="5" step="0.05" /></label>
      <label>传感器标准差 σz = {{ fmt(sensorSigma) }}<input v-model.number="sensorSigma" type="range" min="0.25" max="5" step="0.05" /></label>
      <label>传感器读数 z = {{ fmt(measurement) }}<input v-model.number="measurement" type="range" min="6" max="16" step="0.1" /></label>
    </div>
    <p>MAP（maximum a posteriori，最大后验）等价于最小化 J(x) = ½(x−10)²/Pp + ½(z−x)²/R，其中 Pp = σp²、R = σz²。方差越小，残差的权重越大。</p>
    <svg viewBox="0 0 520 265" role="img" aria-label="蓝色先验代价与橙色测量代价之和是紫色总目标，紫色最小值为融合后验均值">
      <svg x="0" y="0" width="520" height="230" overflow="hidden">
        <path class="axis" d="M45 25 V220 H485" />
        <path class="prior-curve" :d="curves.prior"/><path class="sensor-curve" :d="curves.sensor"/><path class="total-curve" :d="curves.total"/>
        <path class="prior-line" :d="`M${px(priorMean)} 28 V220`"/><path class="sensor-line" :d="`M${px(measurement)} 28 V220`"/>
        <path class="mean-line" :d="`M${px(estimate.mean)} ${py(minCost)} V220`"/><circle class="point" :cx="px(estimate.mean)" :cy="py(minCost)" r="5"/>
      </svg>
      <text x="48" y="18">代价 / cost</text><text x="18" y="225">0</text><text x="8" y="40">{{ yMax.toFixed(1) }}</text>
      <text x="45" y="245">{{ range.lo.toFixed(1) }}</text><text x="470" y="245">{{ range.hi.toFixed(1) }}</text><text x="250" y="260">位置 x / position</text>
    </svg>
    <p class="legend"><span class="blue">━ 先验代价 / prior cost</span><span class="orange">━ 测量代价 / sensor cost</span><span class="purple">━ 总目标 / total cost</span></p>
    <p class="figure-note">蓝、橙虚线分别标出先验均值与传感器读数。图画的是代价，低处更好；紫色曲线不是概率密度。纵轴随代价变化，超出图窗的曲线被裁切。</p>
    <div class="metrics">
      <span>后验均值 / MAP mean<b>{{ fmt(estimate.mean) }}</b></span><span>后验标准差 / posterior σ<b>{{ fmt(estimate.sigma) }}</b></span>
      <span>传感器权重 / Kalman gain K<b>{{ fmt(estimate.gain) }}</b></span><span>先验权重 1−K<b>{{ fmt(estimate.priorWeight) }}</b></span>
      <span>创新 z−m / innovation<b>{{ fmt(estimate.innovation) }}</b></span><span>后验方差 P<b>{{ fmt(estimate.variance) }}</b></span>
    </div>
    <p>P = (1/Pp + 1/R)⁻¹，m_post = P(m/Pp + z/R) = m + K(z−m)，K = Pp/(Pp+R)。在这个模型中，高斯后验的均值与 MAP 相同。</p>
    <p class="prompt"><strong>观察：</strong>① 令两个标准差相等，均值是否成为两点的中点？② 保持标准差不变，移动 z，后验标准差是否变化？③ 让传感器变得很不确定，结果会更靠近哪个估计？</p>
    <details><summary>为什么后验标准差变小？</summary><p>先验与测量提供独立信息，精度（precision = 1/variance）相加，得到 1/P = 1/Pp + 1/R。因此 P 小于两个输入方差。若两条信息相关，直接相加可能重复计算信息，造成虚假的高置信度；真实系统必须建模相关性。</p></details>
    <p class="limit"><strong>假设与限制：</strong>这是标量、线性、独立高斯误差的单次 update。先验位置误差与测量噪声独立，传感器直接观测位置，标准差已知。它只帮助理解 MAP 与 Kalman measurement update 的关系。完整组合惯导还涉及时间传播、位置/速度/姿态状态、IMU 偏置、坐标系和相关协方差；本实验不实现导航系统，也不模拟真实传感器数据。</p>
  </section>
</template>

<style scoped>
.fusion-lab{margin:1.6rem 0;padding:1.2rem;border:1px solid var(--vp-c-divider);border-radius:14px;background:var(--vp-c-bg-soft)}header{display:flex;justify-content:space-between;align-items:center;gap:12px;flex-wrap:wrap}button{cursor:pointer;background:var(--vp-c-bg);border:1px solid var(--vp-c-divider);border-radius:6px;padding:5px 10px;color:var(--vp-c-text-1)}.controls{display:flex;gap:16px;flex-wrap:wrap;margin:1rem 0}.controls label{flex:1 1 155px;display:flex;flex-direction:column;gap:8px;font-size:.9rem}.controls input{width:100%;accent-color:var(--vp-c-brand-1)}.predict{padding:10px 12px;background:var(--vp-c-bg);border:1px dashed var(--vp-c-divider);border-radius:8px;font-size:.9rem}svg{display:block;width:100%;max-height:350px;background:var(--vp-c-bg);border-radius:10px}svg text{fill:var(--vp-c-text-2);font-size:12px}.axis{stroke:var(--vp-c-divider);stroke-width:1.5;fill:none}.prior-curve{stroke:#2681cc;stroke-width:2;fill:none}.sensor-curve{stroke:#d7771f;stroke-width:2;fill:none}.total-curve{stroke:#9859c9;stroke-width:3;fill:none}.prior-line{stroke:#2681cc;stroke-dasharray:5 5;opacity:.65;fill:none}.sensor-line{stroke:#d7771f;stroke-dasharray:5 5;opacity:.65;fill:none}.mean-line{stroke:#9859c9;stroke-width:2;fill:none}.point{fill:#9859c9}.legend{display:flex;gap:14px;flex-wrap:wrap;font-size:.85rem}.blue{color:#2681cc}.orange{color:#d7771f}.purple{color:#9859c9}.figure-note,.limit{font-size:.8rem;color:var(--vp-c-text-2)}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:15px 0}.metrics span{padding:10px;background:var(--vp-c-bg);border:1px solid var(--vp-c-divider);border-radius:8px;font-size:.8rem}.metrics b{display:block;margin-top:5px;font-size:1.1rem}.prompt{padding-left:12px;border-left:3px solid var(--vp-c-brand-1)}summary{cursor:pointer;color:var(--vp-c-brand-1)}button:focus-visible,input:focus-visible,summary:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:3px}@media(max-width:540px){.fusion-lab{padding:.8rem}.metrics{grid-template-columns:1fr 1fr}header strong{font-size:.9rem}}
</style>
