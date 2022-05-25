<template>
  <div>
    <OrdalieCroix v-if="croix" />
    <OrdalieBBQ v-if="bbq" />
    <OrdalieCauldron v-if="cauldron" />
  </div>
</template>

<script setup lang="ts">
import OrdalieCroix from '@/components/ui/Typing/OrdalieCroix.vue'
import OrdalieBBQ from '@/components/ui/Typing/OrdalieBBQ.vue'
import OrdalieCauldron from '@/components/ui/Typing/OrdalieCauldron.vue'
import ORDALIES from '@/constants/ORDALIES'

const croix = ref(false)
const bbq = ref(false)
const cauldron = ref(false)

onMounted(() => displayOrdalie(useStore().currentOrdalie.value))

watch(useStore().currentOrdalie, (value) => {
  console.log('watch', value)

  displayOrdalie(value)
})

const displayOrdalie = (value) => {
  switch (value) {
    case ORDALIES.CROIX:
      croix.value = true
      bbq.value = false
      cauldron.value = false
      break

    case ORDALIES.BBQ:
      croix.value = false
      bbq.value = true
      cauldron.value = false
      break

    case ORDALIES.CAULDRON:
      croix.value = false
      bbq.value = false
      cauldron.value = true
      break

    case null:
      croix.value = false
      bbq.value = false
      cauldron.value = false

    default:
      break
  }
}
</script>
