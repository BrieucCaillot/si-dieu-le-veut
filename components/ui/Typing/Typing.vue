<template>
  <div id="typing">
    <OrdalieCroix v-if="showOrdalie(ORDALIES.CROIX)" />
    <OrdalieBBQ v-if="showOrdalie(ORDALIES.BBQ)" />
    <OrdalieFood v-if="showOrdalie(ORDALIES.FOOD)" />
    <TransitionTyping :type="currentOther" v-if="currentOther !== null" />
  </div>
</template>

<script setup lang="ts">
import OrdalieCroix from '@/components/ui/Typing/OrdalieCroix.vue'
import OrdalieBBQ from '@/components/ui/Typing/OrdalieBBQ.vue'
import OrdalieFood from '@/components/ui/Typing/OrdalieFood.vue'
import TransitionTyping from '@/components/ui/Typing/TransitionTyping.vue'

import ORDALIES from '@/constants/ORDALIES'

const currentOrdalie = ref(null)
const currentOther = ref(null)

onMounted(() => {
  currentOrdalie.value = useStore().currentOrdalie.value
  currentOther.value = useStore().currentOther.value
})

watch(useStore().currentOrdalie, (value: ORDALIES) => (currentOrdalie.value = value))
watch(useStore().currentOther, (value) => {
  currentOther.value = value

  console.log('current other new value', value)
})

const showOrdalie = (_ordalie: ORDALIES) => currentOrdalie.value === _ordalie

// const
</script>
