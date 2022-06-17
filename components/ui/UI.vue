<template>
  <Mobile />
  <!-- <Header /> -->
  <main id="main" class="page">
    <template v-if="startWebGL">
      <Loader v-if="showLoader" />
      <Video />
      <Canvas />
      <Typing />
      <Score v-if="isEndOrDead()" />
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
import Score from '@/components/ui/Score.vue'

import { isMobileTest } from '@/class/three/utils/isMobile'
import Blocks from '@/class/three/World/Blocks'
import ORDALIES from '@/constants/ORDALIES'
import OTHERS from '@/constants/OTHERS'
import TRANSITIONS from '@/constants/TRANSITIONS'

const route = useRoute()
const startWebGL = ref(false)

const currentType = ref(null)

const { isMobile, showLoader } = useStore()

onMounted(() => {
  isMobile.value = isMobileTest()
  showLoader.value = !isMobile.value
  startWebGL.value = !isMobile.value

  currentType.value = useStore().currentType.value
})

watch(useStore().currentType, (value: OTHERS | ORDALIES | TRANSITIONS) => {
  currentType.value = value
})

const isEndOrDead = () => {
  return currentType.value === OTHERS.END || currentType.value === OTHERS.DEAD
}
</script>
