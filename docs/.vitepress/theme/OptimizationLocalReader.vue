<script setup>
import {ref,onBeforeUnmount,computed} from 'vue';
const book=ref('bv'),page=ref(1),blob=ref(''),name=ref(''),error=ref('');
const offset=computed(()=>book.value==='bv'?14:22),limit=computed(()=>book.value==='bv'?700:664);
const physical=computed(()=>Math.max(1,Math.min(limit.value,Number(page.value)||1))+offset.value);
function select(e){const f=e.target.files?.[0];if(!f)return;if(!/\.pdf$/i.test(f.name)){error.value='请选择 PDF 文件。';return}if(blob.value)URL.revokeObjectURL(blob.value);blob.value=URL.createObjectURL(f);name.value=f.name;error.value='';}
onBeforeUnmount(()=>{if(blob.value)URL.revokeObjectURL(blob.value)});
</script>
<template><section class="local-reader"><h3>用你本机的原书配合导读</h3><p>选择本地 PDF 后在当前浏览器打开；文件不会被本站上传。先确认所选教材与下方书目一致，再用印刷页定位。浏览器是否内嵌 PDF 取决于设备；无法预览时用“在新页阅读”。</p><label>页码规则 <select v-model="book"><option value="bv">BV · 印刷页 + 14</option><option value="nw">NW 第二版 · 印刷页 + 22</option></select></label><label>正文印刷页 <input type="number" v-model="page" min="1" :max="limit"></label><p>对应 PDF 物理页：{{physical}}（1 开始计数；目录罗马页不适用）</p><label>选择本地原书 <input type="file" accept="application/pdf,.pdf" @change="select"></label><p v-if="error" role="alert">{{error}}</p><template v-if="blob"><p>{{name}} · <a :href="blob+'#page='+physical" target="_blank" rel="noopener">在新页阅读 PDF 第 {{physical}} 页 →</a></p><iframe :key="blob+physical" :src="blob+'#page='+physical" title="本地教材 PDF 阅读窗口"/></template></section></template>
<style scoped>.local-reader{padding:20px;border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft);margin:24px 0}label{display:block;margin:12px 0}input,select{max-width:100%;border:1px solid var(--vp-c-divider);padding:6px;border-radius:5px}iframe{width:100%;height:650px;border:1px solid var(--vp-c-divider);margin-top:12px}p{font-size:14px}</style>
