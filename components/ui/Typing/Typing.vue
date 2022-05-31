<template>
  <OrdalieCroix v-if="showOrdalie(ORDALIES.CROIX)" />
  <OrdalieBBQ v-if="showOrdalie(ORDALIES.BBQ)" />
  <OrdalieFood v-if="showOrdalie(ORDALIES.FOOD)" />
  <OrdalieCauldron v-if="showOrdalie(ORDALIES.CAULDRON)" />
</template>

<script setup lang="ts">
import OrdalieCroix from '@/components/ui/Typing/OrdalieCroix.vue'
import OrdalieBBQ from '@/components/ui/Typing/OrdalieBBQ.vue'
import OrdalieFood from '@/components/ui/Typing/OrdalieFood.vue'
import OrdalieCauldron from '@/components/ui/Typing/OrdalieCauldron.vue'
import ORDALIES from '@/constants/ORDALIES'

const currentOrdalie = ref(null)

onMounted(() => (currentOrdalie.value = useStore().currentOrdalie.value))

watch(useStore().currentOrdalie, (value: ORDALIES) => (currentOrdalie.value = value))

const showOrdalie = (_ordalie: ORDALIES) => currentOrdalie.value === _ordalie
</script>
