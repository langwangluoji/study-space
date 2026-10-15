<script setup>
import {ref,onMounted,onBeforeUnmount} from 'vue';
const props=defineProps({title:{type:String,required:true},pages:{type:Number,required:true}});
const fileName=ref(''),blob=ref(''),page=ref(1),error=ref('');
function sync(){const m=location.hash.match(/^#page=(\d+)$/);if(m)page.value=Math.max(1,Math.min(props.pages,Number(m[1])))}
function select(e){const f=e.target.files?.[0];if(!f)return;if(!/\.pdf$/i.test(f.name)){error.value='请选择 PDF 文件。';return}if(blob.value)URL.revokeObjectURL(blob.value);blob.value=URL.createObjectURL(f);fileName.value=f.name;error.value='';}
onMounted(()=>{sync();window.addEventListener('hashchange',sync)});
onBeforeUnmount(()=>{if(blob.value)URL.revokeObjectURL(blob.value);window.removeEventListener('hashchange',sync)});
</script>
<template><section class="photo-local-reader"><h2>原资料与导读并排读</h2><p>选择本机的 {{title}}。文件只在当前浏览器中读取，不上传；换页或刷新后可能需要重新选择。页面上给出的 PDF 页指从 1 开始的文件页，先确认文件版本一致。</p><label>选择本地 PDF <input type="file" accept="application/pdf,.pdf" @change="select"></label><label>PDF 文件页 <input v-model.number="page" type="number" min="1" :max="pages" @change="page=Math.min(pages,Math.max(1,Number(page)||1))"></label><p v-if="error" role="alert">{{error}}</p><p v-if="!blob">尚未选择文件。请在“摄影测量”文件夹中选择对应资料；英文扫描本不使用全书固定页码偏移。</p><template v-else><p>{{fileName}} · 第 {{page}} 页 · <a :href="blob+'#page='+page" target="_blank" rel="noopener">在新标签页阅读</a></p><iframe :key="blob+page" :src="blob+'#page='+page" :title="title+' 本地 PDF 阅读'" /><p>手机或内置浏览器可能忽略 PDF 页码跳转，请在 PDF 查看器中手动输入第 {{page}} 页。</p></template></section></template>
<style scoped>.photo-local-reader{border:1px solid var(--vp-c-divider);border-radius:12px;background:var(--vp-c-bg-soft);padding:22px;margin:24px 0}.photo-local-reader label{display:block;margin:14px 0}.photo-local-reader input{max-width:100%;padding:7px;border:1px solid var(--vp-c-divider);border-radius:6px}.photo-local-reader input[type=number]{width:100px}.photo-local-reader iframe{width:100%;height:700px;border:1px solid var(--vp-c-divider);background:white}.photo-local-reader p{font-size:14px;line-height:1.8}</style>
