<template>
  <canvas id="canvas" :ref="(el) => (canvas = el)" class="fixed top-0 left-0 h-full w-full z-0"></canvas>
</template>

<script setup lang="ts">
import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'

const canvas = ref(null)

onMounted(() => {
  WebGL.setup(canvas.value)

  console.log(Blocks)
})
</script>
