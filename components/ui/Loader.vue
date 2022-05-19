<template>
  <div ref="root" id="loader">
    <div class="character">
      <div class="character-body"></div>
      <div ref="arms" class="character-arms"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const root = ref(null)
const arms = ref(null)

onMounted(() => {
  const rotateAnim = gsap.to(arms.value, {
    duration: 1,
    rotation: 360,
    repeat: -1,
    ease: 'linear',
  })

  watch(useStore().resourcesLoaded, () => {
    gsap.to(root.value, {
      duration: 0.8,
      autoAlpha: 0,
      ease: 'power3.inOut',
      onComplete: () => {
        useStore().isLoaderHidden.value = true
        rotateAnim.kill()
      },
    })
  })
})
</script>
