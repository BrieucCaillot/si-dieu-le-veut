<template>
  <div id="home" class="mx-10">
    <OrdalieCroix v-if="croix" />
    <OrdalieBBQ v-if="bbq" />
    <OrdalieCauldron v-if="cauldron" />
  </div>
</template>

<script setup lang="ts">
import OrdalieCroix from '@/components/ui/Typing/OrdalieCroix.vue'
import OrdalieBBQ from '@/components/ui/Typing/OrdalieBBQ.vue'
import OrdalieCauldron from '@/components/ui/Typing/OrdalieCauldron.vue'

const croix = ref(false)
const bbq = ref(true)
const cauldron = ref(false)

onMounted(() => {
  watch(useStore().ordalieCroix, (value) => {
    if (value) croix.value = true
  })
})
</script>
