<template>
  <div>
    <p ref="meters" class="text-[231px] text-[#f9bd65] score opacity-0">{{ (useHUD().score.value + 25) * 10 }}m</p>
    <p class="absolute top-0 left-0 text-[35px] text-black-primary z-30 font-primary leading-[30px] opacity-0" ref="subtitle">
      C’est la longeur de la tapisserie qui retrace le supplice de ce pauvre cuisinier. <br />Cela correspond à <span>{{ useHUD().score.value }}</span> ordalies survécues.
    </p>
  </div>
</template>

<script setup lang="ts">
import useHUD from '@/composables/useHUD'
import OtherManager from '@/class/three/World/Other/OtherManager'
import setHTMLPosition from '@/class/three/utils/setHTMLPosition'
import gsap from 'gsap'

const currentBlock = ref(null)
const meters = ref<HTMLSpanElement>(null)
const subtitle = ref<HTMLSpanElement>(null)

onMounted(() => {
  currentBlock.value = OtherManager.getCurrent()

  //   window.addEventListener('resize', resize)
  gsap.ticker.add(resize)

  gsap.to(meters.value, {
    opacity: 1,
    duration: 0.3,
  })

  gsap.to(subtitle.value, {
    opacity: 1,
    duration: 0.3,
    delay: 0.3,
  })

  resize()
})

onUnmounted(() => {
  gsap.ticker.remove(resize)
  //   window.removeEventListener('resize', resize)
})

const resize = () => {
  console.log('resize')

  const positionMeter = setHTMLPosition(currentBlock.value.instance.metre)
  const positionSubtitle = setHTMLPosition(currentBlock.value.instance.text)

  meters.value.style.width = positionMeter.width + 'px'
  meters.value.style.transform = `translate3d(${positionMeter.topLeft.x}px, ${positionMeter.topLeft.y}px, 0)`
  meters.value.style.fontSize = positionMeter.width / 2.34 + 'px'

  subtitle.value.style.width = positionSubtitle.width + 'px'
  subtitle.value.style.transform = `translate3d(${positionSubtitle.topLeft.x}px, ${positionSubtitle.topLeft.y}px, 0)`
  subtitle.value.style.fontSize = positionSubtitle.width / 11.57 + 'px'
  subtitle.value.style.lineHeight = positionSubtitle.width / 13.5 + 'px'
}
</script>
