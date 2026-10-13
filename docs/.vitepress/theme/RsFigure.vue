<script setup>
import {computed,ref} from 'vue';
import {withBase} from 'vitepress';
import {rsLanguage} from './remoteSensingLanguage.js';
import figures from '../../../public/remote-sensing/figures/manifest.json';
const props=defineProps({id:{type:String,required:true}});
const figure=computed(()=>figures.figures.find(f=>f.id===props.id));
const dialog=ref(null);
const tr=(zh,en)=>rsLanguage.value==='en'?en:rsLanguage.value==='both'?zh+' / '+en:zh;
const title=computed(()=>figure.value?tr(figure.value.title_zh,figure.value.title_en):props.id);
</script>
<template>
  <figure v-if="figure" class="rs-source-figure">
    <button class="rs-figure-open" type="button" :aria-label="tr('放大课件图：','Enlarge source figure: ')+title" @click="dialog.showModal()"><img :src="withBase(figure.src)" :alt="title" loading="lazy"><span>{{tr('查看课件原图','View lecture figure')}}</span></button>
    <figcaption><strong>{{title}}</strong><br>{{tr('来源','Source')}}：{{figure.source}} · {{tr('文件页','File page')}} {{figure.page}} · {{tr('汇总文件页','Compiled PDF page')}} {{figure.summary_page}}<span v-if="figure.credit"> · {{figure.credit}}</span><p>{{tr(figure.note_zh,figure.note_en)}}</p></figcaption>
    <dialog ref="dialog" class="rs-figure-dialog" @click="event=>{if(event.target===dialog)dialog.close()}">
      <button type="button" class="rs-figure-close" @click="dialog.close()">{{tr('关闭','Close')}} ×</button><h3>{{title}}</h3><div class="rs-figure-scroll"><img :src="withBase(figure.src)" :alt="title"></div><p>{{figure.source}} · {{tr('文件页','File page')}} {{figure.page}} · {{tr('汇总文件页','Compiled PDF page')}} {{figure.summary_page}}</p><p>{{tr(figure.note_zh,figure.note_en)}}</p>
    </dialog>
  </figure>
</template>
<style scoped>
.rs-source-figure{margin:28px 0}.rs-figure-open{display:block;width:100%;padding:10px;border:1px solid var(--vp-c-divider);border-radius:8px;background:white;cursor:zoom-in}.rs-figure-open img{display:block;width:auto;max-width:100%;max-height:460px;margin:auto}.rs-figure-open span{display:block;font-size:12px;color:#33516d;text-align:right;margin:6px}figcaption{font-size:13px;line-height:1.8;color:var(--vp-c-text-2);margin-top:10px}figcaption p{margin:6px 0!important}.rs-figure-dialog{width:min(94vw,1200px);max-height:92vh;overflow:auto;background:var(--vp-c-bg);color:var(--vp-c-text-1);border:1px solid var(--vp-c-divider);border-radius:10px;padding:18px}.rs-figure-dialog::backdrop{background:#000b}.rs-figure-dialog h3{font-size:18px}.rs-figure-scroll{overflow:auto}.rs-figure-scroll img{width:100%;min-width:650px;background:white}.rs-figure-close{display:block;margin-left:auto;border:1px solid var(--vp-c-divider);border-radius:5px;padding:5px 12px}.rs-figure-dialog p{font-size:13px;line-height:1.7}.rs-figure-open:focus-visible,.rs-figure-close:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:3px}
</style>
