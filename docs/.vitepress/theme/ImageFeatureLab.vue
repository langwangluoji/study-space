<script setup>
import { ref, computed } from 'vue';
const props=defineProps({mode:{type:String,required:true}});
const cell=ref(8),block=ref(3),bins=9;
const cells=computed(()=>32/cell.value);
const dimension=computed(()=>block.value>cells.value?null:(cells.value-block.value+1)**2*block.value**2*bins);
const bitValues=ref([0,1,1,0,0,1,0,1]);
const positions=[0,1,2,7,-1,3,6,5,4];
const lbpValue=computed(()=>bitValues.value.reduce((sum,bit,p)=>sum+bit*2**p,0));
const bitText=computed(()=>[...bitValues.value].reverse().join(''));
</script>
<template>
  <section v-if="props.mode==='hog'" class="feature-lab" aria-label="HOG 维数交互演示">
    <h4>HOG 维数计算器</h4>
    <p>图像固定为 32×32，9 个方向箱，Block 步长固定为 1 Cell。绿色区域标出左上角一个 Block。</p>
    <div class="hog-layout">
      <div>
        <div class="feature-controls">
          <label>Cell 边长（像素）<select v-model.number="cell" data-feature="cell"><option v-for="n in [2,4,8,16]" :key="n" :value="n">{{n}}</option></select></label>
          <label>Block 边长（Cell）<select v-model.number="block" data-feature="block"><option v-for="n in [1,2,3,4]" :key="n" :value="n">{{n}}</option></select></label>
        </div>
        <p class="feature-result" aria-live="polite"><strong data-feature="dimension">{{dimension===null?'不适用':dimension}}</strong><span v-if="dimension!==null">维 HOG 向量</span></p>
        <p v-if="dimension===null">Block 大于图像中的 Cell 网格，请选择较小的 Block。</p>
        <template v-else><p>{{cells}}×{{cells}} 个 Cell，{{cells-block+1}}×{{cells-block+1}} 个 Block，每 Block {{block*block*bins}} 维。</p><p class="feature-note">OpenCV：blockSize=({{block*cell}},{{block*cell}}) 像素，blockStride=({{cell}},{{cell}}) 像素。</p></template>
      </div>
      <div class="hog-grid" :style="{gridTemplateColumns:`repeat(${cells},1fr)`}" aria-hidden="true"><span v-for="n in cells*cells" :key="n" :class="{selected:dimension!==null&&((n-1)%cells)<block&&Math.floor((n-1)/cells)<block}">{{cells<=8?'↗':''}}</span></div>
    </div>
  </section>
  <section v-else class="feature-lab" aria-label="LBP 编码交互演示">
    <h4>局部二值编码演示</h4><p>中心灰度固定为 100。点击邻居，在 80 与 120 之间切换。p0 从左上角开始，顺时针编号。邻居 ≥ 中心记 1，否则记 0。</p>
    <div class="lbp-layout"><div class="lbp-grid"><template v-for="p in positions" :key="p"><span v-if="p<0" class="lbp-center">中心 100</span><button v-else type="button" :aria-pressed="Boolean(bitValues[p])" :aria-label="`邻居 p${p}，灰度 ${bitValues[p]?120:80}，点击切换`" @click="bitValues[p]=1-bitValues[p]">p{{p}} · {{bitValues[p]?120:80}}</button></template></div><div><p class="feature-result" aria-live="polite"><strong data-feature="lbp">{{lbpValue}}</strong><span>十进制编码</span></p><p>二进制（p7…p0）：<code>{{bitText}}</code></p><p class="feature-note">位权为 2ᵖ。本演示使用合成灰度值，展示单像素编码；整图分类通常再统计区域编码直方图。</p></div></div>
  </section>
</template>
<style scoped>
.feature-lab{border:1px solid var(--vp-c-divider);background:var(--vp-c-bg-soft);border-radius:8px;padding:22px;margin:24px 0;overflow:hidden}.feature-lab h4{margin:0 0 12px}.feature-lab p{font-size:14px;line-height:1.8}.hog-layout{display:grid;grid-template-columns:minmax(0,1fr) 175px;gap:24px;align-items:center}.feature-controls{display:flex;flex-wrap:wrap;gap:16px}.feature-controls label{display:grid;gap:6px;font-size:13px}.feature-controls select{display:block;appearance:auto;border:1px solid var(--vp-c-divider);padding:7px 12px;border-radius:4px;background:var(--vp-c-bg);min-width:112px}.feature-result{display:flex;flex-wrap:wrap;gap:12px;align-items:baseline}.feature-result strong{font-size:36px;line-height:1.4;color:var(--vp-c-brand-1)}.feature-result span{font-size:13px}.feature-note{color:var(--vp-c-text-2);overflow-wrap:anywhere}.hog-grid{display:grid;width:175px;height:175px;gap:2px}.hog-grid span{border:1px solid var(--vp-c-divider);display:grid;place-items:center;font-size:12px}.hog-grid .selected{background:var(--vp-c-brand-soft);border-color:var(--vp-c-brand-1);color:var(--vp-c-brand-1)}.lbp-layout{display:grid;grid-template-columns:225px minmax(0,1fr);gap:25px;align-items:center}.lbp-grid{display:grid;grid-template-columns:repeat(3,1fr);gap:5px}.lbp-grid button,.lbp-center{display:grid;place-items:center;min-height:57px;border:1px solid var(--vp-c-divider);background:var(--vp-c-bg);border-radius:3px;font-size:13px}.lbp-grid button[aria-pressed=true]{background:var(--vp-c-brand-1);color:var(--vp-c-bg)}.lbp-center{background:var(--vp-c-brand-soft);font-weight:600}.feature-lab button:focus-visible,.feature-lab select:focus-visible{outline:3px solid var(--vp-c-brand-1);outline-offset:2px}@media(max-width:640px){.feature-lab{padding:16px}.hog-layout,.lbp-layout{grid-template-columns:minmax(0,1fr)}.hog-grid{margin:auto}.lbp-grid{max-width:225px;width:100%;margin:auto}}@media print{.feature-lab{break-inside:avoid}}
</style>
