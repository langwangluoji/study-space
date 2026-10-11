<script setup>
import {ref,onMounted,onUnmounted,watch} from 'vue';
import {drawViz} from './draw-viz.js';
const props=defineProps({id:String});const canvas=ref(),readout=ref(),value=ref(50);let observer,themeObserver;
function draw(){if(canvas.value&&readout.value)drawViz(props.id,canvas.value,Number(value.value),readout.value)}
onMounted(()=>{observer=new ResizeObserver(draw);observer.observe(canvas.value);themeObserver=new MutationObserver(draw);themeObserver.observe(document.documentElement,{attributes:true,attributeFilter:['class']});draw()});
onUnmounted(()=>{observer?.disconnect();themeObserver?.disconnect()});watch(value,draw);
</script>
<template><div class="concept-viz"><label :for="'viz-'+id">调整图中参数</label><input :id="'viz-'+id" type="range" min="0" max="100" v-model="value"><canvas ref="canvas" role="img" :aria-label="id.toUpperCase()+' 互动示意图'"></canvas><p ref="readout" class="readout" aria-live="polite"></p><p class="viz-note">概念示意与正文公式配合阅读；图中坐标与缩放不作为实验结果。</p></div></template>
