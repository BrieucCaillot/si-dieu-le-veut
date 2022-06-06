<template>
  <div ref="root" id="loader">
    <div ref="loaderImgEl" class="loader-img">
      <span class="loader-text">{{ currentSentence }}</span>
    </div>
    <button ref="textStartEl" class="loader-text--start">
      <span>{{ textStart }}</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

const root = ref<HTMLElement>(null)
const currentIndex = ref(0)
const sentences = ref(['Cuisson du gâteau...', 'Ecriture des prières...', 'Appel à Dieu...', 'Broderie de la scène...', 'Construction du bûcher...', 'Affutage des lames...'])
const currentSentence = ref(sentences.value[0])
const loaderImgEl = ref<HTMLDivElement>(null)
const textStartEl = ref<HTMLButtonElement>(null)
const textStart = ref('Clique pour commencer')

const onClick = () => {
  gsap.to(root.value, {
    duration: 0.8,
    autoAlpha: 0,
    ease: 'power3.inOut',
    onComplete: () => (useStore().showLoader.value = false),
  })
}

const showTextStart = () => {
  gsap.to(textStartEl.value, {
    duration: 0.8,
    autoAlpha: 1,
    ease: 'power3.inOut',
    onComplete: () => textStartEl.value.addEventListener('click', onClick),
  })
}

onBeforeUnmount(() => {
  textStartEl.value.removeEventListener('click', onClick)
})

onMounted(() => {
  const changeSentencesInterval = setInterval(() => {
    currentIndex.value++
    currentSentence.value = sentences.value[currentIndex.value % sentences.value.length]
  }, 1000)

  watch(useStore().resourcesLoaded, () => {
    // Stop css inifinite css animation
    loaderImgEl.value.style.animationIterationCount = '1'
    clearInterval(changeSentencesInterval)
    currentSentence.value = ''

    showTextStart()
    // }, 2000)
  })
})
</script>
