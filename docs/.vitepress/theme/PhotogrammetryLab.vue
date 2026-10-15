<script setup>
import { ref, onMounted, watch } from 'vue'
import { renderLab } from './photogrammetry-labs.js'

const props = defineProps({ type: { type: String, default: 'scale' } })
const host = ref(null)
const redraw = () => { if (host.value) renderLab(props.type, host.value) }
onMounted(redraw)
watch(() => props.type, redraw)
</script>

<template>
  <div ref="host" class="photogrammetry-lab-host">
    <p>交互实验加载后可调整参数 · Interactive lab</p>
  </div>
</template>
