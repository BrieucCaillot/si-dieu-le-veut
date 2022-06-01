<template>
  <div>
    <div v-for="(word, i) in words" :key="i" class="relative">
      <span class="cadre" :ref="(el) => (itemRefs[i] = el)">{{ word }}</span>
    </div>
    <!-- <div ref="test" class="cadre">fromage</div> -->
  </div>
</template>

<script setup lang="ts">
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import gsap from 'gsap'
const ordalie = ref()
const test = ref<HTMLDivElement>()

const itemRefs = ref([])
const words = ref(['truc', 'allo'])

onMounted(() => {
  // console.log(itemRefs)

  // ordalie.value = OrdalieManager.getByIndex(0).instance
  ordalie.value = OrdalieManager.getCurrent().instance

  // setTimeout(() => {
  //   words.value.push('ouais')

  //   console.log(itemRefs)
  // }, 2000)

  // ordalie.value.setHTMLPosition(test.value)
  // gsap.ticker.add(update)
  // ordalie.value.start()
})

const update = (time, deltaTime, frame) => {
  // ordalie.value.setHTMLPosition(test.value)
}
</script>
