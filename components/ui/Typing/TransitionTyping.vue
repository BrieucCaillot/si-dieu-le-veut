<template>
  <div class="absolute top-0 left-0 font-primary" v-SplitText ref="domText"></div>
</template>

<script setup lang="ts">
import AudioManager from '@/class/three/utils/AudioManager'
import gsap from 'gsap'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import setHTMLPosition from '@/class/three/utils/setHTMLPosition'

const domText = ref<HTMLDivElement>(null)
const text = ref('coupable')
const transition = ref()

let index = 0
let lettersToType = null
let letterToType = null

onMounted(() => {
  document.addEventListener('keydown', newChar)
  window.addEventListener('resize', resize)

  // transition.value = TransitionManager.getByIndex(0)
  transition.value = TransitionManager.getCurrent()

  const positions = setHTMLPosition(transition.value.text)
  domText.value.style.transform = `translate3d(${positions.topLeft.x}px,${positions.topLeft.y}px, 0)`
  domText.value.style.fontSize = positions.width / 2.22 + 'px'

  lettersToType = text.value.split('')
  letterToType = lettersToType[index]
})

onUnmounted(() => {
  document.removeEventListener('keydown', newChar)
  window.removeEventListener('resize', resize)
})

const resize = () => {
  const positions = setHTMLPosition(transition.value.text)
  domText.value.style.transform = `translate3d(${positions.topLeft.x}px,${positions.topLeft.y}px, 0)`
  domText.value.style.fontSize = positions.width / 2.22 + 'px'
}

const vSplitText = {
  created: (el: HTMLDivElement) => {
    const textToSplit = text.value.split('')

    textToSplit.forEach((letter) => {
      const span = document.createElement('span')
      span.innerHTML = letter
      span.setAttribute('class', 'inline-block text-food-base')
      el.appendChild(span)
    })
  },
}

const newChar = (e: KeyboardEvent) => {
  if (letterToType.toLowerCase() === e.key.toLowerCase()) {
    AudioManager.play('success')

    domText.value.children.item(index).classList.add('text-food-valid')

    index++
    letterToType = lettersToType[index]

    if (!letterToType) completed()
  } else {
    const expectedLetterDOM = domText.value.children.item(index)
    expectedLetterDOM.classList.add('text-food-error')

    gsap.to(expectedLetterDOM, {
      scale: 2,
      duration: 0.1,
    })
    gsap.to(expectedLetterDOM, {
      scale: 1,
      duration: 0.1,
      delay: 0.1,
    })
  }
}

const completed = () => {
  console.log('game over')
}
</script>
