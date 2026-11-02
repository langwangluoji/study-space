<script setup>
import { computed } from 'vue';
const props = defineProps({ courseId: { type: String, required: true }, decorative: { type: Boolean, default: true } });
const labels = {
  optimization: '凸优化：椭圆等高线与约束边界的接触点',
  optics: '光学：围绕传播轴振荡的正弦波',
  geodesy: '大地测量：参考椭球上的经纬网与测量三角形',
  photogrammetry: '摄影测量：两幅影像的投影光线交会到同一地面点',
  insar: 'InSAR：两个雷达位置与地形点之间的观测几何',
  'remote-sensing': '遥感：卫星轨道与面向地球的传感器视场',
  ml: '机器学习：输入层、隐藏层与输出层组成的神经网络'
};
const wave = computed(() => Array.from({ length: 161 }, (_, i) => `${i ? 'L' : 'M'}${15 + i * 2.5},${150 - 72 * Math.sin(i / 160 * Math.PI * 6)}`).join(' '));
const network = [{ x: 55, y: 75 }, { x: 55, y: 225 }, { x: 205, y: 60 }, { x: 205, y: 150 }, { x: 205, y: 240 }, { x: 365, y: 100 }, { x: 365, y: 200 }];
const edges = network.slice(0, 2).flatMap(a => network.slice(2, 5).map(b => ({ a, b }))).concat(network.slice(2, 5).flatMap(a => network.slice(5).map(b => ({ a, b }))));
</script>

<template>
  <svg class="folio-artwork" viewBox="0 0 430 300" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" :role="decorative ? undefined : 'img'" :aria-hidden="decorative ? 'true' : undefined" :aria-label="decorative ? undefined : (labels[courseId] || labels.ml)" focusable="false">
    <g v-if="courseId === 'optimization'">
      <g stroke-width="2"><ellipse v-for="r in [32, 63, 94, 125, 156, 188]" :key="r" cx="235" cy="150" :rx="r" :ry="r / 2" /></g>
      <path d="M62 44 316 298" stroke-width="5" /><path d="M93 30v238M25 222h392" stroke-width="1" stroke-dasharray="3 8" />
      <circle cx="179" cy="161" r="10" class="folio-artwork-point" stroke-width="2" />
    </g>
    <g v-else-if="courseId === 'optics'">
      <circle cx="215" cy="150" r="116" stroke-width="1" /><path d="M15 150h400M80 30v240M215 30v240M350 30v240" stroke-width="1" stroke-dasharray="4 9" /><path :d="wave" stroke-width="4" />
    </g>
    <g v-else-if="courseId === 'geodesy'">
      <ellipse cx="215" cy="150" rx="156" ry="116" /><ellipse cx="215" cy="150" rx="60" ry="116" stroke-width="1.5" /><ellipse cx="215" cy="150" rx="114" ry="116" stroke-width="1.5" /><ellipse cx="215" cy="150" rx="156" ry="43" stroke-width="1.5" /><path d="M59 150h312M215 34v232" stroke-width="1.5" /><path d="M97 220 241 63 344 196Z" stroke-width="4.5" /><circle v-for="p in [[97,220],[241,63],[344,196]]" :key="p[0]" :cx="p[0]" :cy="p[1]" r="5" class="folio-artwork-point" />
    </g>
    <g v-else-if="courseId === 'photogrammetry'">
      <path d="M64 62 290 248 365 57 125 248Z" stroke-width="1.5" /><path d="M64 62 215 245 365 57M125 248h165" stroke-width="4" /><path d="M17 93 114 32M316 24 413 85" stroke-width="7" /><circle cx="64" cy="62" r="12" /><circle cx="365" cy="57" r="12" /><path d="M99 265h224M64 62h301" stroke-width="1" stroke-dasharray="4 8" /><circle cx="215" cy="245" r="8" class="folio-artwork-point" />
    </g>
    <g v-else-if="courseId === 'insar'">
      <path d="M63 52 213 224 364 59M63 52 364 59" stroke-width="2" /><path d="M29 267 94 207 150 241 212 185 286 240 361 210 405 267" stroke-width="4" /><path d="M52 83q45 2 63-24M43 108q70 3 98-39M34 133q95 4 133-53" /><path d="m40 29 47 47m-47 0 47-47m276-39 22 22-22 22-22-22Z" stroke-width="5" /><path d="M212 185v67" stroke-width="1" stroke-dasharray="3 7" />
    </g>
    <g v-else-if="courseId === 'remote-sensing'">
      <circle cx="215" cy="207" r="87" /><path d="M135 171q80 62 160 0M130 218q85 53 170 0M215 120v174" stroke-width="1.5" /><path d="M215 58 135 171M215 58 295 171" stroke-width="2" /><ellipse cx="215" cy="151" rx="192" ry="70" transform="rotate(-22 215 151)" stroke-width="1" stroke-dasharray="4 7" /><path d="m184 39 31-18 31 18-31 18Z" fill="currentColor" /><path d="m184 39-51 29-28-15 51-29m90 15 51-29 28 15-51 29" stroke-width="4" />
    </g>
    <g v-else>
      <line v-for="(edge, i) in edges" :key="i" :x1="edge.a.x" :y1="edge.a.y" :x2="edge.b.x" :y2="edge.b.y" stroke-width="1.5" /><circle v-for="(node, i) in network" :key="i" :cx="node.x" :cy="node.y" r="19" class="folio-artwork-node" stroke-width="3.5" /><circle cx="205" cy="150" r="7" fill="currentColor" stroke="none" />
    </g>
  </svg>
</template>
