<template>
  <Mobile />
  <!-- <Header /> -->
  <main id="main" class="page">
    <template v-if="startWebGL">
      <Loader v-if="showLoader" />
      <Video />
      <Canvas />
      <Typing />
      <HUD />
    </template>

    <slot />
  </main>
</template>

<script setup lang="ts">
import Canvas from '@/components/three/Canvas.vue'

import Loader from '@/components/ui/Loader.vue'
import Video from '@/components/ui/Video.vue'
import HUD from '@/components/ui/HUD.vue'
import Mobile from '@/components/ui/Mobile.vue'
import Typing from '@/components/ui/Typing/Typing.vue'

import { isMobileTest } from '@/class/three/utils/isMobile'

const route = useRoute()
const startWebGL = ref(false)

const { isMobile, showLoader } = useStore()

onMounted(() => {
  isMobile.value = isMobileTest()
  showLoader.value = !isMobile.value
  startWebGL.value = !isMobile.value
})
</script>
