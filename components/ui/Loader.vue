<template>
  <div ref="root" id="loader">
    <div class="loader-img"></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const root = ref(null)

onMounted(() => {
  watch(useStore().resourcesLoaded, () => {
    gsap.to(root.value, {
      duration: 0.8,
      autoAlpha: 0,
      ease: 'power3.inOut',
      delay: 1,
      onComplete: () => {
        useStore().showLoader.value = false
      },
    })
  })
})
</script>
