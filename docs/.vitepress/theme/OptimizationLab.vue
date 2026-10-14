<script setup>
import { ref, computed, watch } from 'vue'
import { convexSample, ridgeSample, kktSample, gradientRun, barrierSample } from './optimization-math.js'
const props = defineProps({ kind: { type: String, default: 'convex', validator: v => ['convex', 'ridge', 'gradient', 'kkt', 'barrier'].includes(v) } })
const a = ref(-1.5), b = ref(1.5), theta = ref(0.5), lambda = ref(1), kappa = ref(8), alpha = ref(0.15), method = ref('fixed'), c = ref(1), candidate = ref(false), testX = ref(1), testLambda = ref(1)
const shownSteps = ref(0), mu = ref(0.5)
watch([kappa, alpha, method], () => { shownSteps.value = 0 })
const cv = computed(() => convexSample(a.value, b.value, theta.value))
const rd = computed(() => ridgeSample(lambda.value))
const kk = computed(() => kktSample(c.value))
const check = computed(() => candidate.value ? kktSample(c.value, testX.value, testLambda.value) : kk.value)
const fullRun = computed(() => gradientRun(kappa.value, alpha.value, method.value))
const run = computed(() => ({ rows: fullRun.value.rows.slice(0, shownSteps.value + 1), status: shownSteps.value >= fullRun.value.rows.length - 1 ? fullRun.value.status : 'ready' }))
const br = computed(() => barrierSample(c.value, mu.value))
const last = computed(() => run.value.rows.at(-1))
const tableRows = computed(() => run.value.rows.length <= 10 ? run.value.rows : [...run.value.rows.slice(0, 8), ...run.value.rows.slice(-2)])
const statusText = computed(() => ({ ready: `当前 ${run.value.rows.length - 1} 步：可继续迭代`, converged: '梯度范数 < 10⁻⁶：已达到实验收敛阈值', diverged: '发散：数值超过实验安全范围，已停止', limit: '已运行 60 步，尚未达到收敛阈值' }[run.value.status]))
function fmt(v) { return v == null ? '—' : !Number.isFinite(v) ? '∞' : (Math.abs(v) >= 1e5 || (Math.abs(v) > 0 && Math.abs(v) < 0.001)) ? v.toExponential(2) : v.toFixed(3) }
const px = x => 45 + (x + 3) / 7 * 445
const py = y => 220 - y / 13 * 195
const gx = x => 260 + x * 48
const gy = y => 130 - y * 27
function curve(fn, lo = -3, hi = 4) { return Array.from({ length: 121 }, (_, i) => { const x = lo + (hi - lo) * i / 120; return `${i ? 'L' : 'M'} ${px(x)} ${py(fn(x))}` }).join(' ') }
const convexCurve = curve(x => x * x)
const ridgeCurve = computed(() => curve(x => 0.5 * ((x - 1) ** 2 + (x - 3) ** 2) + 0.5 * lambda.value * x * x))
const kktCurve = curve(x => 0.5 * (x - 2) ** 2)
const tangent = computed(() => curve(x => cv.value.z ** 2 + 2 * cv.value.z * (x - cv.value.z)))
const trajectory = computed(() => run.value.rows.filter(r => Math.abs(r.x) <= 4.8 && Math.abs(r.y) <= 4).map(r => `${gx(r.x)},${gy(r.y)}`).join(' '))
const clipped = computed(() => run.value.rows.some(r => Math.abs(r.x) > 4.8 || Math.abs(r.y) > 4))
function reset() {
  a.value = -1.5; b.value = 1.5; theta.value = 0.5; lambda.value = 1; kappa.value = 8; alpha.value = 0.15; method.value = 'fixed'; c.value = 1; candidate.value = false; testX.value = 1; testLambda.value = 1
  shownSteps.value = 0; mu.value = 0.5
}
function advance(steps) { shownSteps.value = Math.min(fullRun.value.rows.length - 1, shownSteps.value + steps) }
const finished = computed(() => shownSteps.value >= fullRun.value.rows.length - 1)
const titles = { convex: '凸性：弦、切线与 Jensen gap', ridge: '正则化：拟合误差与模型大小', gradient: '迭代法：步长与条件数', kkt: 'KKT：约束与乘子的配合', barrier: '障碍法：从严格可行点逼近边界' }
</script>

<template>
  <section class="opt-lab" :aria-label="titles[kind]">
    <header><strong>Interactive lab · {{ titles[kind] }}</strong><button type="button" @click="reset">重置 Reset</button></header>
    <template v-if="kind === 'convex'">
      <p>函数 f(x) = x²。移动两个端点和混合权重，比较函数曲线、弦（chord）与切线（tangent）。</p>
      <p class="predict"><strong>先预测：</strong>固定端点，θ 从 0.5 靠近 0 时，弦与曲线的差距会增大还是减小？再操作验证。</p>
      <div class="controls">
        <label>a = {{ fmt(a) }}<input v-model.number="a" type="range" min="-2" max="0" step="0.05" /></label>
        <label>b = {{ fmt(b) }}<input v-model.number="b" type="range" min="0.1" max="2" step="0.05" /></label>
        <label>θ = {{ fmt(theta) }}<input v-model.number="theta" type="range" min="0.05" max="0.95" step="0.05" /></label>
      </div>
      <svg viewBox="0 0 520 260" role="img" aria-label="x平方的蓝色曲线，紫色弦和橙色切线，绿色线段表示Jensen差值">
        <svg x="0" y="0" width="520" height="245" overflow="hidden"><path class="axis" :d="`M45 ${py(0)} H490 M${px(0)} 25 V230`"/><path class="curve" :d="convexCurve"/><path class="tangent" :d="tangent"/><path class="chord" :d="`M${px(a)} ${py(a*a)} L${px(b)} ${py(b*b)}`"/><path class="gap" :d="`M${px(cv.z)} ${py(cv.value)} V${py(cv.chord)}`"/><circle class="point" :cx="px(cv.z)" :cy="py(cv.value)" r="5"/><circle class="chord-point" :cx="px(cv.z)" :cy="py(cv.chord)" r="5"/></svg>
        <text x="470" y="240">x</text><text x="250" y="18">f(x)</text><text x="45" y="255">−3</text><text :x="px(0)" y="255">0</text><text x="480" y="255">4</text>
      </svg>
      <p class="legend"><span class="blue">━ f(x)</span><span class="purple">━ 弦 / chord</span><span class="orange">┄ 切线 / tangent</span><span class="green">━ gap</span></p>
      <div class="metrics"><span>z = (1−θ)a + θb <b>{{ fmt(cv.z) }}</b></span><span>f(z) <b>{{ fmt(cv.value) }}</b></span><span>弦的高度 <b>{{ fmt(cv.chord) }}</b></span><span>Jensen gap <b>{{ fmt(cv.gap) }}</b></span></div>
      <p>差值 = (1−θ)f(a) + θf(b) − f(z) = θ(1−θ)(a−b)² ≥ 0。切线位于整条曲线下方；弦位于两端点之间的曲线上方。</p>
      <p class="prompt"><strong>观察：</strong>固定 a、b，把 θ 移到 0.5；为什么 gap 最大？把端点靠近，gap 如何变化？</p>
      <p class="limit">范围：这是一个一维凸函数的示例。图形帮助形成直觉，凸性的定义要求对定义域中所有端点与权重成立。</p>
    </template>

    <template v-else-if="kind === 'ridge'">
      <p>用同一个常数 x 拟合两个观测 1、3：min ½[(x−1)²+(x−3)²] + ½λx²。λ 越大，越重视小的参数。</p>
      <p class="predict"><strong>先预测：</strong>λ = 0 时 x* 是多少？把 λ 增大后，它会向哪个方向移动？</p>
      <div class="controls"><label>λ = {{ fmt(lambda) }}<input v-model.number="lambda" type="range" min="0" max="10" step="0.1" /></label></div>
      <svg viewBox="0 0 520 260" role="img" aria-label="正则化目标函数曲线与其最小值位置，绿色竖线标出最优参数">
        <svg x="0" y="0" width="520" height="245" overflow="hidden"><path class="axis" :d="`M45 ${py(0)} H490 M${px(0)} 25 V230`"/><path class="curve" :d="ridgeCurve"/><path class="gap" :d="`M${px(rd.x)} ${py(0)} V${py(rd.total)}`"/><circle class="point" :cx="px(rd.x)" :cy="py(rd.total)" r="6"/></svg><text x="470" y="240">x</text><text x="250" y="18">目标 / objective</text><text x="45" y="255">−3</text><text :x="px(0)" y="255">0</text><text x="480" y="255">4</text>
      </svg>
      <div class="metrics"><span>x* = 4/(2+λ)<b>{{ fmt(rd.x) }}</b></span><span>拟合误差 / data loss<b>{{ fmt(rd.residual) }}</b></span><span>½λx*² / penalty<b>{{ fmt(rd.penalty) }}</b></span><span>目标值 / objective<b>{{ fmt(rd.total) }}</b></span></div>
      <p>对 x 求导得到 (2+λ)x−4 = 0。因为二阶导数 2+λ > 0，这个驻点就是唯一最小值。</p>
      <p class="prompt"><strong>观察：</strong>把 λ 从 0 慢慢增大。x* 更接近 0，但拟合误差为什么变大？比较不同 λ 的目标值时，惩罚权重本身也变了。</p>
      <p class="limit">范围：这里只演示一个参数的 ridge regression（岭回归），没有测试集，不能据此选择真实任务的最佳 λ。图中目标值超过 13 的部分被裁切。</p>
    </template>

    <template v-else-if="kind === 'gradient'">
      <p>从 (3, 2) 出发最小化 f(x,y) = ½(x²+κy²)。Hessian 的特征值为 1、κ；κ ≥ 1 就是条件数（condition number）。更窄的谷底意味着方向尺度差异更大。</p>
      <p class="predict"><strong>先预测：</strong>设 κ = 8、α = 0.30，下一步 y 的符号与大小如何变化？先算 y(1−ακ)，再点击单步。改变方法或参数会回到起点。</p>
      <div class="controls">
        <label>κ = {{ kappa }}<input v-model.number="kappa" type="range" min="1" max="40" step="1" /></label>
        <label>初始步长 α = {{ fmt(alpha) }}<input v-model.number="alpha" type="range" min="0.01" max="1" step="0.01" :disabled="method==='newton'" /></label>
        <label>方法 / Method<select v-model="method"><option value="fixed">固定步长 Gradient descent</option><option value="armijo">Armijo 回溯线搜索</option><option value="newton">Newton 牛顿法（全步）</option></select></label>
      </div>
      <div class="step-controls"><button type="button" :disabled="finished" @click="advance(1)">单步 +1</button><button type="button" :disabled="finished" @click="advance(10)">多步 +10</button><button type="button" :disabled="finished" @click="advance(60)">运行至停止（最多 60 步）</button><button type="button" @click="shownSteps=0">回到起点</button></div>
      <svg viewBox="0 0 520 260" role="img" aria-label="二次函数等高线与迭代轨迹，起点为3,2，最优点为原点">
        <path class="axis" d="M25 130 H495 M260 20 V240"/>
        <ellipse v-for="level in [0.5,2,4,8]" :key="level" class="contour" cx="260" cy="130" :rx="Math.sqrt(2*level)*48" :ry="Math.sqrt(2*level/kappa)*27"/>
        <polyline class="chord" :points="trajectory" fill="none"/><circle v-for="row in run.rows.filter(r=>Math.abs(r.x)<=4.8 && Math.abs(r.y)<=4)" :key="row.iteration" :cx="gx(row.x)" :cy="gy(row.y)" r="2.5" class="chord-point"/>
        <circle class="point" cx="260" cy="130" r="5"/><text x="270" y="148">(0,0)</text><text :x="gx(3)-25" :y="gy(2)-12">start (3,2)</text><text x="485" y="148">x</text><text x="270" y="22">y</text>
      </svg>
      <p class="legend"><span class="blue">○ 等高线 / contour</span><span class="purple">━ 轨迹 / iterates</span></p>
      <div class="metrics"><span>状态<b>{{ statusText }}</b></span><span>最终 f<b>{{ fmt(last.f) }}</b></span><span>最终 ‖∇f‖₂<b>{{ fmt(last.norm) }}</b></span><span>固定步收敛区间<b>0 &lt; α &lt; {{ fmt(2/kappa) }}</b></span></div>
      <p v-if="clipped" class="warning">部分迭代点超出图窗，图中仅显示窗口内的点；这些点之间的连线不代表全部中间轨迹。数值表仍保留迭代结果。</p>
      <p v-if="method === 'fixed'">更新：(x,y) ← (x−αx, y−ακy)。当 α = 2/κ 时 y 方向可能持续振荡；超过阈值会放大误差。</p>
      <p v-else-if="method === 'armijo'">每一步从滑块 α 开始，若 f(z+td) ≤ f(z)+¼t∇f(z)ᵀd 未满足，就把 t 减半；方向 d = −∇f。表中 step 是实际接受的步长。</p>
      <p v-else>牛顿方向 d = −H⁻¹∇f = (−x,−y)，取全步 t = 1。这一严格凸二次函数一步就到原点。</p>
      <div class="table-scroll"><table><caption>Iteration log · 超过 10 行时显示前 8 行与最后 2 行</caption><thead><tr><th>k</th><th>x</th><th>y</th><th>f</th><th>‖∇f‖₂</th><th>step</th><th>回溯次数</th></tr></thead><tbody><tr v-for="row in tableRows" :key="row.iteration"><td>{{ row.iteration }}</td><td>{{ fmt(row.x) }}</td><td>{{ fmt(row.y) }}</td><td>{{ fmt(row.f) }}</td><td>{{ fmt(row.norm) }}</td><td>{{ fmt(row.step) }}</td><td>{{ row.backtracks }}</td></tr></tbody></table></div>
      <p class="prompt"><strong>观察：</strong>先设 κ = 8、α = 0.30，看固定步法的轨迹；再选 Armijo。保持同样起点，为什么实际接受步长变小了？最后试 Newton。</p>
      <p class="limit">范围：最多运行 60 步；发散检测是实验数值保护，不是一般数学判定。图的 x、y 显示比例不同。一般非线性问题的 Newton 法需要更多迭代，也可能需要线搜索。</p>
    </template>

    <template v-else-if="kind === 'barrier'">
      <p>同样考虑 p(x) = ½(x−2)²、x ≤ c。障碍子问题为 min p(x)−μ log(c−x)，定义域只允许 x &lt; c、μ &gt; 0。</p>
      <p class="predict"><strong>先预测：</strong>设 c = 1。如果 μ 逐渐变小，子问题解会靠近边界还是远离边界？它能在 μ &gt; 0 时到达边界吗？</p>
      <div class="controls"><label>约束上界 c = {{ fmt(c) }}<input v-model.number="c" type="range" min="-2" max="3" step="0.1" /></label><label>μ = {{ fmt(mu) }}<input v-model.number="mu" type="range" min="0.001" max="2" step="0.001" /></label></div>
      <svg viewBox="0 0 520 260" role="img" aria-label="绿色可行区域内橙色点为障碍子问题解，紫色点为原始问题精确最优解">
        <rect x="45" y="25" :width="px(c)-45" height="195" class="feasible"/><path class="axis" :d="`M45 ${py(0)} H490 M${px(0)} 25 V230`"/><path class="curve" :d="kktCurve"/><path class="gap" :d="`M${px(c)} 25 V220`"/><circle class="chord-point" :cx="px(kk.x)" :cy="py(kk.p)" r="6"/><circle class="candidate-point" :cx="px(br.x)" :cy="py(br.p)" r="5"/><text :x="px(c)+7" y="40">c</text><text x="55" y="45">可行 / feasible</text><text x="470" y="240">x</text><text x="250" y="18">原始 p(x)</text><text x="45" y="255">−3</text><text :x="px(0)" y="255">0</text><text x="480" y="255">4</text>
      </svg>
      <p class="legend"><span class="purple">● 原始最优 x*</span><span class="orange">● 障碍子问题 xμ</span><span class="blue">━ 原始目标 p(x)</span></p>
      <div class="metrics"><span>障碍子问题解 xμ<b>{{ fmt(br.x) }}</b></span><span>严格可行余量 c−xμ<b>{{ fmt(br.slack) }}</b></span><span>λμ = μ/(c−xμ)<b>{{ fmt(br.multiplier) }}</b></span><span>λμ(c−xμ) = μ<b>{{ fmt(br.complementarity) }}</b></span><span>原始最优解 x*<b>{{ fmt(kk.x) }}</b></span><span>原始目标差 p(xμ)−p(x*)<b>{{ fmt(br.p-kk.p) }}</b></span></div>
      <div class="metrics"><span>驻点残差 |xμ−2+λμ|<b>{{ fmt(Math.abs(br.stationarity)) }}</b></span><span>对偶下界 g(λμ)<b>{{ fmt(br.dual) }}</b></span><span>原始—对偶间隙 p−g<b>{{ fmt(br.gap) }}</b></span></div>
      <p>驻点方程 x−2+μ/(c−x) = 0 给出 xμ = [c+2−√((c−2)²+4μ)]/2。μ &gt; 0 时保持严格可行。只要定义 λ = μ/(c−x)，任何严格可行候选点都满足 λ(c−x) = μ；这条乘积关系本身不是求解通过的证据。</p>
      <p>本例对偶函数 g(λ) = (2−c)λ−½λ²。任意严格可行候选点的实际间隙为 p(x)−g(λ) = μ+½(x−2+λ)²；只有驻点残差为零，间隙才等于 μ。本实验解析求解后同时检查这两个量。</p>
      <p class="prompt"><strong>观察：</strong>比较 c = 1（原始最优点在边界）与 c = 3（原始最优点在内部）。μ 变小时，障碍解分别向哪里靠近？</p>
      <p class="limit">范围：图显示原始目标 p，不是障碍目标。橙点是障碍子问题的精确解，是原始问题的近似解；本实验用解析公式，不模拟一般内点法的 Newton 迭代。互补残差的大小为 μ，而非 0。</p>
    </template>

    <template v-else-if="kind === 'kkt'">
      <p>min p(x) = ½(x−2)²，约束 g(x) = x−c ≤ 0。Lagrangian（拉格朗日函数）L = p(x)+λg(x)。</p>
      <p class="predict"><strong>先预测：</strong>如果 c 恰好等于 2，约束活跃吗？对应的乘子必须大于 0 吗？再移动 c 验证。</p>
      <div class="controls"><label>约束上界 c = {{ fmt(c) }}<input v-model.number="c" type="range" min="-2" max="3" step="0.1" /></label><label class="check"><input v-model="candidate" type="checkbox" /> 自选候选点，检查 KKT 条件</label></div>
      <div v-if="candidate" class="controls"><label>候选 x = {{ fmt(testX) }}<input v-model.number="testX" type="range" min="-2" max="3" step="0.1" /></label><label>候选 λ = {{ fmt(testLambda) }}<input v-model.number="testLambda" type="range" min="-1" max="5" step="0.1" /></label></div>
      <svg viewBox="0 0 520 260" role="img" aria-label="目标函数的抛物线，绿色阴影为x小于等于c的可行域，紫色点为最优解">
        <rect x="45" y="25" :width="px(c)-45" height="195" class="feasible"/><path class="axis" :d="`M45 ${py(0)} H490 M${px(0)} 25 V230`"/><path class="curve" :d="kktCurve"/><path class="gap" :d="`M${px(c)} 25 V220`"/><circle class="chord-point" :cx="px(kk.x)" :cy="py(kk.p)" r="6"/><circle v-if="candidate" class="candidate-point" :cx="px(testX)" :cy="py(check.p)" r="6"/><text :x="px(c)+7" y="40">c</text><text x="55" y="45">可行 / feasible</text><text x="470" y="240">x</text><text x="250" y="18">p(x)</text><text x="45" y="255">−3</text><text :x="px(0)" y="255">0</text><text x="480" y="255">4</text>
      </svg>
      <div class="metrics"><span>最优 x* = min(2,c)<b>{{ fmt(kk.x) }}</b></span><span>最优 λ* = max(0,2−c)<b>{{ fmt(kk.multiplier) }}</b></span><span>最优 p(x*)<b>{{ fmt(kk.p) }}</b></span><span>g(x*)<b>{{ fmt(kk.g) }}</b></span></div>
      <p>{{ c < 2 ? '约束活跃：最优点在边界，乘子 > 0。' : c === 2 ? '约束活跃：最优点在边界，但乘子 = 0。活跃不意味着乘子一定为正。' : '约束不活跃：最优点在可行域内部，乘子 = 0。' }}</p>
      <div class="metrics"><span>{{ candidate ? '候选点' : '最优点' }} p(x)<b>{{ fmt(check.p) }}</b></span><span>g(x) = x−c<b>{{ fmt(check.g) }}</b></span><span>原始可行残差 max(0,g)<b>{{ fmt(check.feasibility) }}</b></span><span>对偶可行残差 max(0,−λ)<b>{{ fmt(check.dualFeasibility) }}</b></span><span>驻点残差 |x−2+λ|<b>{{ fmt(check.stationarity) }}</b></span><span>互补残差 |λg|<b>{{ fmt(check.complementarity) }}</b></span></div>
      <p>四项残差都为 0 才满足这里的 KKT 条件。这个问题的目标与约束均为凸，且存在严格可行点，所以 KKT 条件刻画最优解。</p>
      <p class="prompt"><strong>观察：</strong>先设 c = 2，注意活跃约束与零乘子可以同时出现。然后设 c = 1，自选 x = 2、λ = 0：驻点与互补条件成立，为何仍不是可行解？</p>
      <p class="limit">范围：这里是一个带单个不等式的一维凸问题。非凸问题中，满足 KKT 通常只代表候选点；不能直接断言全局最优。显示小数有舍入，请按公式核对。</p>
    </template>
  </section>
</template>

<style scoped>
.step-controls{display:flex;gap:8px;flex-wrap:wrap;margin:12px 0 18px}.step-controls button:disabled{opacity:.5;cursor:default}.predict{padding:10px 12px;background:var(--vp-c-bg);border:1px dashed var(--vp-c-divider);border-radius:8px;font-size:.9rem}
.opt-lab{margin:1.6rem 0;padding:1.2rem;border:1px solid var(--vp-c-divider);border-radius:14px;background:var(--vp-c-bg-soft)}header{display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap}button,select{background:var(--vp-c-bg);border:1px solid var(--vp-c-divider);border-radius:6px;padding:5px 10px;color:var(--vp-c-text-1)}button{cursor:pointer}.controls{display:flex;flex-wrap:wrap;gap:16px;margin:1rem 0}.controls label{flex:1 1 155px;font-size:.9rem;display:flex;flex-direction:column;gap:8px}.controls input[type=range]{width:100%;accent-color:var(--vp-c-brand-1)}.controls .check{flex-direction:row;align-items:center}.check input{accent-color:var(--vp-c-brand-1)}svg{display:block;width:100%;max-height:340px;background:var(--vp-c-bg);border-radius:10px}svg text{fill:var(--vp-c-text-2);font-size:12px}.axis{stroke:var(--vp-c-divider);stroke-width:1.5;fill:none}.curve{stroke:#2681cc;stroke-width:2.5;fill:none}.tangent{stroke:#d7771f;stroke-width:2;stroke-dasharray:6 4;fill:none}.chord{stroke:#9859c9;stroke-width:2.5;fill:none}.gap{stroke:#139b78;stroke-width:3;fill:none}.point{fill:#2681cc}.chord-point{fill:#9859c9}.candidate-point{fill:#d7771f;stroke:var(--vp-c-text-1);stroke-width:1}.contour{fill:none;stroke:#2681cc;stroke-width:1.4;opacity:.55}.feasible{fill:#139b78;opacity:.1}.legend{display:flex;gap:18px;flex-wrap:wrap;font-size:.85rem}.blue{color:#2681cc}.purple{color:#9859c9}.orange{color:#d7771f}.green{color:#139b78}.metrics{display:grid;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:10px;margin:15px 0}.metrics span{font-size:.8rem;padding:10px;background:var(--vp-c-bg);border:1px solid var(--vp-c-divider);border-radius:8px}.metrics b{display:block;font-size:1rem;margin-top:5px;overflow-wrap:anywhere}.prompt{border-left:3px solid var(--vp-c-brand-1);padding-left:12px}.limit{font-size:.8rem;color:var(--vp-c-text-2)}.warning{font-size:.85rem;color:var(--vp-c-text-1);padding:10px;border:1px solid #d7771f;border-radius:6px}.table-scroll{overflow:auto}table{font-size:.8rem;width:100%;white-space:nowrap}caption{text-align:left;color:var(--vp-c-text-2);font-size:.8rem;margin:8px 0}button:focus-visible,select:focus-visible,input:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:3px}@media(max-width:540px){.opt-lab{padding:.8rem}.controls{gap:10px}.metrics{grid-template-columns:1fr 1fr}header strong{font-size:.9rem}}
</style>
