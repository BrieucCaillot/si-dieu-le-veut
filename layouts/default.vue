<template>
  <div class="layout">
    <Mobile />
    <!-- <Header /> -->
    <main id="main" class="page">
      <template v-if="startWebGL">
        <Loader v-if="showLoader" />
        <Video />
        <Canvas />
        <HUD />
      </template>
      <slot v-if="is404 || !showLoader" />
    </main>
  </div>
</template>

<script setup lang="ts">
import WebGL from '@/class/three/WebGL'
import Canvas from '@/components/three/Canvas.vue'

import Header from '@/components/ui/Header.vue'
import Loader from '@/components/ui/Loader.vue'
import Video from '@/components/ui/Video.vue'
import HUD from '@/components/ui/HUD.vue'
import Mobile from '@/components/ui/Mobile.vue'

const route = useRoute()
const startWebGL = ref(false)
const is404 = ref(false)

const { isMobile, showLoader, isDebug } = useStore()

isDebug.value = route.name === 'debug'
is404.value = route.name === '404'

onMounted(() => {
  isMobile.value = window.matchMedia('(max-width: 768px)').matches
  showLoader.value = !is404.value && !isMobile.value
  startWebGL.value = !is404.value && !isMobile.value
})
</script>
