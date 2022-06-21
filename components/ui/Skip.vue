<template>
  <div id="skip" ref="root">
    <button ref="btnSkip" @click="onClick" class="btn">
      <span>Appuie pour skip</span>
    </button>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import Blocks from '@/class/three/World/Blocks'

const root = ref<HTMLElement>(null)

const onClick = () => {
  useStore().isSkippingIntro.value = true
  skip()
}

const hideSkipButton = () => {
  gsap.to(root.value, {
    duration: 0.8,
    autoAlpha: 0,
    ease: 'power3.inOut',
    onComplete: () => {
      useStore().showSkip.value = false
    },
  })
}

const skip = () => {
  Blocks.skipIntro()
  hideSkipButton()
}

watch(useStore().isSkippingIntro, (newValue: boolean | string, oldValue: boolean) => {
  newValue === true && skip()
  newValue === 'hide' && hideSkipButton()
})
</script>
