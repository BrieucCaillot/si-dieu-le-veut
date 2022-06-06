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

  // Reload if switching from mobile to desktop & vice versa
  watch(isMobile, (newValue, oldValue) => {
    if (oldValue === null) return
    newValue !== oldValue && window.location.reload()
  })
})
</script>
