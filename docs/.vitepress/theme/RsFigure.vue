<script setup>
import {computed,ref} from 'vue';
import {withBase} from 'vitepress';
import {rsLanguage} from './remoteSensingLanguage.js';
import figures from '../../../public/remote-sensing/figures/manifest.json';
import textbookFigures from '../../../public/remote-sensing/textbook-figures/manifest.json';
const props=defineProps({id:{type:String,required:true}});
const figure=computed(()=>[...figures.figures,...textbookFigures.figures].find(f=>f.id===props.id));
const isTextbook=computed(()=>figure.value?.kind==='textbook');
const dimensions=computed(()=>Array.isArray(figure.value?.dimensions)?figure.value.dimensions:[figure.value?.dimensions?.width,figure.value?.dimensions?.height]);
const dialog=ref(null);
const tr=(zh,en)=>rsLanguage.value==='en'?en:rsLanguage.value==='both'?zh+' / '+en:zh;
const title=computed(()=>figure.value?tr(figure.value.title_zh,figure.value.title_en):props.id);
</script>
<template>
  <figure v-if="figure" :id="'rs-figure-'+figure.id" class="rs-source-figure" :data-source-kind="isTextbook?'textbook':'lecture'">
    <button class="rs-figure-open" type="button" :aria-label="tr(isTextbook?'放大教材图：':'放大课件图：','Enlarge '+(isTextbook?'textbook':'lecture')+' figure: ')+title" @click="dialog.showModal()"><img :src="withBase(figure.src)" :alt="title" loading="lazy" :width="dimensions[0]" :height="dimensions[1]"><span>{{tr(isTextbook?'查看教材原图':'查看课件原图',isTextbook?'View textbook figure':'View lecture figure')}}</span></button>
    <figcaption><strong>{{title}}</strong><br>{{tr('来源','Source')}}：{{figure.source}} · {{tr('PDF文件页','PDF file page')}} {{figure.page}}<span v-if="figure.printed_page"> · {{tr('印刷页','Printed page')}} {{figure.printed_page}}</span><span v-if="figure.figure_number"> · {{tr('原图号','Original figure')}} {{figure.figure_number}}</span><span v-if="figure.summary_page"> · {{tr('汇总文件页','Compiled PDF page')}} {{figure.summary_page}}</span><span v-if="figure.credit"> · {{figure.credit}}</span><p>{{tr(figure.note_zh,figure.note_en)}}</p><a v-if="isTextbook&&figure.target_anchor" :href="withBase('/remote-sensing-sources.html#rs-book-'+figure.target_anchor)">{{tr('教材对照与阅读定位','Textbook comparison and reading location')}} →</a></figcaption>
    <dialog ref="dialog" class="rs-figure-dialog" @click="event=>{if(event.target===dialog)dialog.close()}">
      <button type="button" class="rs-figure-close" @click="dialog.close()">{{tr('关闭','Close')}} ×</button><h3>{{title}}</h3><div class="rs-figure-scroll"><img :src="withBase(figure.src)" :alt="title"></div><p>{{figure.source}} · {{tr('PDF文件页','PDF file page')}} {{figure.page}}<span v-if="figure.printed_page"> · {{tr('印刷页','Printed page')}} {{figure.printed_page}}</span><span v-if="figure.figure_number"> · {{tr('原图号','Original figure')}} {{figure.figure_number}}</span><span v-if="figure.summary_page"> · {{tr('汇总文件页','Compiled PDF page')}} {{figure.summary_page}}</span></p><p>{{tr(figure.note_zh,figure.note_en)}}</p>
    </dialog>
  </figure>
</template>
<style scoped>
.rs-source-figure{margin:28px 0}.rs-figure-open{display:block;width:100%;padding:10px;border:1px solid var(--vp-c-divider);border-radius:8px;background:white;cursor:zoom-in}.rs-figure-open img{display:block;width:auto;max-width:100%;max-height:460px;margin:auto}.rs-figure-open span{display:block;font-size:12px;color:#33516d;text-align:right;margin:6px}figcaption{font-size:13px;line-height:1.8;color:var(--vp-c-text-2);margin-top:10px}figcaption p{margin:6px 0!important}.rs-figure-dialog{width:min(94vw,1200px);max-height:92vh;overflow:auto;background:var(--vp-c-bg);color:var(--vp-c-text-1);border:1px solid var(--vp-c-divider);border-radius:10px;padding:18px}.rs-figure-dialog::backdrop{background:#000b}.rs-figure-dialog h3{font-size:18px}.rs-figure-scroll{overflow:auto}.rs-figure-scroll img{width:100%;min-width:650px;background:white}.rs-figure-close{display:block;margin-left:auto;border:1px solid var(--vp-c-divider);border-radius:5px;padding:5px 12px}.rs-figure-dialog p{font-size:13px;line-height:1.7}.rs-figure-open:focus-visible,.rs-figure-close:focus-visible{outline:2px solid var(--vp-c-brand-1);outline-offset:3px}
</style>
