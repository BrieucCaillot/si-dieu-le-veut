<template>
  <div id="typing">
    <OrdalieCroix v-if="showOrdalie(ORDALIES.CROIX)" />
    <OrdalieBBQ v-if="showOrdalie(ORDALIES.BBQ)" />
    <OrdalieFood v-if="showOrdalie(ORDALIES.FOOD)" />
    <TransitionTyping v-if="isTransition" />
  </div>
</template>

<script setup lang="ts">
import OrdalieCroix from '@/components/ui/Typing/OrdalieCroix.vue'
import OrdalieBBQ from '@/components/ui/Typing/OrdalieBBQ.vue'
import OrdalieFood from '@/components/ui/Typing/OrdalieFood.vue'
import TransitionTyping from '@/components/ui/Typing/TransitionTyping.vue'

import ORDALIES from '@/constants/ORDALIES'

const currentOrdalie = ref(null)
const isTransition = ref(null)

onMounted(() => {
  currentOrdalie.value = useStore().currentOrdalie.value
  isTransition.value = useStore().isTransition.value
})

watch(useStore().currentOrdalie, (value: ORDALIES) => (currentOrdalie.value = value))
watch(useStore().isTransition, (value: boolean) => {
  isTransition.value = value
})

const showOrdalie = (_ordalie: ORDALIES) => currentOrdalie.value === _ordalie

// const
</script>
