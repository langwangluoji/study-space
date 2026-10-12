<script setup>
import {ref} from 'vue';
import {withBase} from 'vitepress';
defineProps({src:{type:String,required:true},alt:{type:String,required:true},source:{type:String,required:true},page:{type:[String,Number],required:true},printed:{type:[String,Number],required:true},note:{type:String,default:''}});
const dialog=ref(null);
function open(){dialog.value?.showModal()}
function close(){dialog.value?.close()}
</script>
<template>
  <figure class="source-figure">
    <button class="figure-open" type="button" @click="open" :aria-label="'放大查看：'+alt"><img :src="withBase(src)" :alt="alt" loading="lazy"><span>点击放大</span></button>
    <figcaption>{{alt}}。来源：{{source}}，PDF 文件页 {{page}}，原页码 {{printed}}。<span v-if="note">{{note}}</span></figcaption>
    <dialog ref="dialog" class="figure-dialog" @click="e=>{if(e.target===dialog)close()}">
      <button class="figure-close" type="button" @click="close" aria-label="关闭配图">关闭 ×</button>
      <img :src="withBase(src)" :alt="alt"><p>{{source}} · 文件页 {{page}} · 原页码 {{printed}}</p>
    </dialog>
  </figure>
</template>
<style scoped>
.source-figure{margin:26px 0}.figure-open{display:block;position:relative;width:100%;border:1px solid var(--vp-c-divider);border-radius:8px;background:#fff;padding:16px;cursor:zoom-in}.figure-open img{display:block;max-height:440px;width:auto;max-width:100%;margin:0 auto;object-fit:contain}.figure-open span{display:block;font-size:12px;text-align:right;color:#50657e;margin-top:6px}.figure-open:focus-visible,.figure-close:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:4px}figcaption{font-size:13px;line-height:1.7;color:var(--vp-c-text-2);margin-top:10px}.figure-dialog{width:min(95vw,1200px);max-height:92vh;border:1px solid var(--vp-c-divider);border-radius:10px;padding:20px;background:var(--vp-c-bg);color:var(--vp-c-text-1);overflow:auto}.figure-dialog::backdrop{background:#000b}.figure-dialog img{display:block;background:white;width:100%;height:auto;margin:18px auto}.figure-close{display:block;margin-left:auto;padding:6px 12px;border:1px solid var(--vp-c-divider);border-radius:6px;font-size:14px}.figure-dialog p{font-size:13px}.figure-dialog:not([open]){display:none}
</style>
