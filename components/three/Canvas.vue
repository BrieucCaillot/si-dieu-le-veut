<template>
  <canvas id="canvas" :ref="(el) => (canvas = el)" class="fixed top-0 left-0 h-full w-full z-0"></canvas>
</template>

<script setup lang="ts">
import WebGL from '@/class/three/WebGL'

const canvas = ref(null)

onMounted(() => {
  watch(useStore().imgLoaded, (value) => {
    value && WebGL.setup(canvas.value)
  })
})
</script>
