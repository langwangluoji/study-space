<script setup>
import { computed, ref } from 'vue';
defineProps({mode: {type:String, required:true}});
const latitude=ref(45), longitude=ref(0), height=ref(0), angle=ref(90);
const rad=v=>v*Math.PI/180;
const valid=computed(()=>[latitude.value,longitude.value,height.value].every(v=>typeof v==='number'&&Number.isFinite(v))&&Math.abs(latitude.value)<=90&&Math.abs(longitude.value)<=180&&height.value>=-1000&&height.value<=100000);
const ellipsoid=computed(()=>{
  if(!valid.value)return null;
  const a=6378137,f=1/298.257223563,e2=2*f-f*f,B=rad(latitude.value),L=rad(longitude.value),h=height.value;
  const W=Math.sqrt(1-e2*Math.sin(B)**2),N=a/W,M=a*(1-e2)/W**3;
  const X=(N+h)*Math.cos(B)*Math.cos(L),Y=(N+h)*Math.cos(B)*Math.sin(L),Z=(N*(1-e2)+h)*Math.sin(B);
  return {X,Y,Z,M,N,phi:Math.atan2(Z,Math.hypot(X,Y))*180/Math.PI,north:M*Math.PI/180,east:N*Math.cos(B)*Math.PI/180};
});
const rotation=computed(()=>{
  if(typeof angle.value!=='number'||!Number.isFinite(angle.value)||Math.abs(angle.value)>180)return null;
  const t=rad(angle.value),c=Math.cos(t),s=Math.sin(t);
  return {c,s,x:150+100*c,activeY:150-100*s,passiveY:150+100*s};
});
const format=(v,d=3)=>Math.abs(v)<0.0000001?(0).toFixed(d):v.toFixed(d);
</script>

<template>
  <section class="geodesy-lab" :aria-label="mode==='ellipsoid'?'椭球坐标交互算例':'主动与被动旋转交互算例'">
    <template v-if="mode==='ellipsoid'">
      <h3>改变经纬度，检查坐标与曲率</h3>
      <p>WGS84 几何模型；输入角度为度，高度沿椭球法线。</p>
      <div class="geodesy-inputs">
        <label>大地纬度 B（度）<input v-model.number="latitude" type="number" min="-90" max="90" step="1"></label>
        <label>经度 L（度）<input v-model.number="longitude" type="number" min="-180" max="180" step="1"></label>
        <label>椭球高 h（m）<input v-model.number="height" type="number" min="-1000" max="100000" step="10"></label>
      </div>
      <div v-if="ellipsoid" aria-live="polite">
        <dl class="geodesy-results">
          <div><dt>X / m</dt><dd>{{format(ellipsoid.X)}}</dd></div><div><dt>Y / m</dt><dd>{{format(ellipsoid.Y)}}</dd></div><div><dt>Z / m</dt><dd>{{format(ellipsoid.Z)}}</dd></div>
          <div><dt>子午曲率 M / m</dt><dd>{{format(ellipsoid.M)}}</dd></div><div><dt>卯酉曲率 N / m</dt><dd>{{format(ellipsoid.N)}}</dd></div><div><dt>空间点地心纬度 / 度</dt><dd>{{format(ellipsoid.phi,6)}}</dd></div>
        </dl>
        <p>参考椭球面（h=0）在当前纬度的纬度微增长度系数为 {{format(ellipsoid.north)}} m，平行圈每度经差长度为 {{format(ellipsoid.east)}} m。前者是局部导数，不能当作整整一度的精确子午线弧长。它们不随输入高度改变；若计算输入点的等椭球高面，应分别使用 (M+h)π/180 与 (N+h)cosB·π/180。</p>
      </div>
      <p v-else role="alert">请输入有效数值：纬度 −90～90°，经度 −180～180°，高度 −1000～100000 m。</p>
    </template>
    <template v-else>
      <h3>同一正角，两种旋转含义</h3>
      <label>绕 z 轴右手正角 θ（度）<input v-model.number="angle" type="range" min="-180" max="180" step="1"></label>
      <p>θ = {{angle}}°。原向量为 (1, 0, 0)，图示从 +z 方向观察。</p>
      <template v-if="rotation">
        <svg viewBox="0 0 300 300" role="img" aria-label="灰色为原向量，蓝色为主动旋转的向量，橙色为被动旋转后的坐标分量">
          <circle cx="150" cy="150" r="100" fill="none" stroke="currentColor" opacity=".18" />
          <path d="M20 150 H280 M150 280 V20" stroke="currentColor" opacity=".3" /><text x="280" y="143">x</text><text x="159" y="24">y</text>
          <path d="M150 150 H250" stroke="#68778b" stroke-width="4" />
          <line x1="150" y1="150" :x2="rotation.x" :y2="rotation.activeY" stroke="#2563eb" stroke-width="5" />
          <circle :cx="rotation.x" :cy="rotation.activeY" r="6" fill="#2563eb" />
          <line x1="150" y1="150" :x2="rotation.x" :y2="rotation.passiveY" stroke="#c26a10" stroke-width="4" stroke-dasharray="8 5" />
          <circle :cx="rotation.x" :cy="rotation.passiveY" r="6" fill="#c26a10" />
        </svg>
        <div aria-live="polite">
          <p><strong>蓝色实线，主动：</strong>固定轴，旋转向量。结果 ({{format(rotation.c)}}, {{format(rotation.s)}}, 0)。</p>
          <p><strong>橙色虚线，被动：</strong>向量固定、轴转动后得到分量 ({{format(rotation.c)}}, {{format(-rotation.s)}}, 0)。图中把分量画在公共数值轴上比较，它不表示原几何向量真的反向转动。</p>
        </div>
      </template>
      <p v-else role="alert">角度必须为 −180～180° 内的有限数值。</p>
    </template>
  </section>
</template>

<style scoped>
.geodesy-lab{border:1px solid var(--vp-c-divider);border-radius:12px;padding:20px;margin:24px 0;background:var(--vp-c-bg-soft)}
.geodesy-lab h3{margin-top:0}.geodesy-inputs{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:16px}
label{display:block;font-size:14px;font-weight:600}input{display:block;width:100%;border:1px solid var(--vp-c-divider);border-radius:6px;padding:7px 10px;background:var(--vp-c-bg);color:var(--vp-c-text-1);margin-top:6px}input[type=range]{padding:0;accent-color:var(--vp-c-brand-1)}input:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:2px}
.geodesy-results{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px;margin-top:20px}.geodesy-results div{border-bottom:1px solid var(--vp-c-divider);padding-bottom:8px}dt{font-size:13px;color:var(--vp-c-text-2)}dd{margin:0;font-family:var(--vp-font-family-mono);font-size:15px;overflow-wrap:anywhere}svg{display:block;width:min(100%,320px);margin:0 auto}svg text{fill:currentColor}
@media(max-width:600px){.geodesy-inputs,.geodesy-results{grid-template-columns:1fr}.geodesy-lab{padding:16px}}
</style>
