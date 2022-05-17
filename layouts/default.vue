<template>
  <div class="layout">
    <Header />
    <main id="main" class="page">
      <Canvas />
      <CSS3Renderer />
      <slot />
    </main>
  </div>
</template>

<script setup lang="ts">
import Header from '@/components/ui/Header.vue'
import Canvas from '@/components/three/Canvas.vue'
import CSS3Renderer from '@/components/three/CSS3Renderer.vue'

console.log('SETUP DEFAULT LAYOUT')
</script>

<style lang="scss" scoped></style>
