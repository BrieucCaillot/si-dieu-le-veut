<template>
  <div id="typing">
    <OrdalieCroix v-if="isOrdalie(ORDALIES.CROIX)" />
    <OrdalieBBQ v-if="isOrdalie(ORDALIES.BBQ)" />
    <OrdalieFood v-if="isOrdalie(ORDALIES.FOOD)" />
    <TransitionTyping :type="currentType" v-if="isTransitionOrOtherEnd" />
  </div>
</template>

<script setup lang="ts">
import ORDALIES from '@/constants/ORDALIES'
import OTHERS from '@/constants/OTHERS'
import TRANSITIONS from '@/constants/TRANSITIONS'

import Blocks from '@/class/three/World/Blocks'
import OrdalieCroix from '@/components/ui/Typing/OrdalieCroix.vue'
import OrdalieBBQ from '@/components/ui/Typing/OrdalieBBQ.vue'
import OrdalieFood from '@/components/ui/Typing/OrdalieFood.vue'
import TransitionTyping from '@/components/ui/Typing/TransitionTyping.vue'

const currentType = ref(null)
const isTransitionOrOtherEnd = ref(false)

onMounted(() => {
  currentType.value = useStore().currentType.value
})

watch(useStore().currentType, (value: OTHERS | ORDALIES | TRANSITIONS) => {
  currentType.value = value
  isTransitionOrOtherEnd.value = Blocks.isTransition(value as TRANSITIONS) || value === (OTHERS.END as OTHERS)
})

const isOrdalie = (_ordalie: ORDALIES) => currentType.value === _ordalie
</script>
