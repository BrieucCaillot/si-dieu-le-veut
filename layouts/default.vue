<template>
  <div class="layout">
    <Loader v-if="showLoader" />
    <Header />
    <main id="main" class="page">
      <Canvas />
      <CSS3Renderer />
      <slot v-if="!showLoader" />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/Header.vue'
import Canvas from '@/components/three/Canvas.vue'
import CSS3Renderer from '@/components/three/CSS3Renderer.vue'
import Loader from '@/components/ui/Loader.vue'

const showLoader = ref(true)

onMounted(() => {
  watch(useStore().isLoaderHidden, () => {
    showLoader.value = false
  })
})

console.log('SETUP DEFAULT LAYOUT')
</script>
