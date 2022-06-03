<template>
  <div id="mobile" v-if="isMobile">
    <div class="mobile-img"></div>
  </div>
</template>

<script setup>
const eventResize = ref(null)
const { isMobile } = useStore()

onMounted(() => {
  eventResize.value = window.addEventListener('resize', () => {
    isMobile.value = window.matchMedia('(max-width: 768px)').matches
  })
})
</script>
