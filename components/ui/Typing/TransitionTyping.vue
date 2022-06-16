<template>
  <div class="absolute left-0 font-primary opacity-0" v-SplitText ref="domText"></div>
</template>

<script setup lang="ts">
import OTHERS from '@/constants/OTHERS'
import Blocks from '@/class/three/World/Blocks'
import AudioManager from '@/class/three/utils/AudioManager'
import OtherManager from '@/class/three/World/Other/OtherManager'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import setHTMLPosition from '@/class/three/utils/setHTMLPosition'

import gsap from 'gsap'

const domText = ref<HTMLDivElement>(null)
const text = ref('')
const currentBlock = ref()
const props = defineProps(['type'])
let index = 0
let fontSizeCoef = null
let lettersToType = null
let letterToType = null

onMounted(() => {
  document.addEventListener('keydown', newChar)

  const isTransition = Blocks.isTransition(props.type)
  const isOtherEnd = props.type === OTHERS.END

  // Debug
  // console.log('IS OTHER END : ', isOtherEnd)
  // console.log('IS TRANSITION : ', isTransition)

  if (isTransition) {
    currentBlock.value = TransitionManager.getCurrent()
    fontSizeCoef = 2.22
  } else if (isOtherEnd) {
    currentBlock.value = OtherManager.getCurrent().instance
    fontSizeCoef = 3.26
    domText.value.classList.add('-top-[10px]')
  }

  gsap.to(domText.value, {
    opacity: 1,
    duration: 0.25,
  })

  gsap.ticker.add(positionHTML)

  lettersToType = text.value.split('')
  letterToType = lettersToType[index]
  console.log('broo ', letterToType)
})

onUnmounted(() => {
  clearEvents()
  gsap.ticker.remove(positionHTML)
})

const clearEvents = () => {
  document.removeEventListener('keydown', newChar)
}

const positionHTML = () => {
  const positions = setHTMLPosition(currentBlock.value.text)
  domText.value.style.transform = `translate3d(${positions.topLeft.x}px,${positions.topLeft.y}px, 0)`
  domText.value.style.fontSize = positions.width / fontSizeCoef + 'px'
}

const vSplitText = {
  mounted: (el: HTMLDivElement) => {
    if (Blocks.isTransition(props.type)) {
      text.value = 'coupable'
    } else if (props.type === 'END') {
      text.value = 'résurrection'
    }

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
  clearEvents()

  if (props.type.startsWith('Transition')) {
    currentBlock.value.hide()
    gsap.to(domText.value, {
      opacity: 0,
      duration: 0.25,
      delay: 2,
    })
  }

  if (props.type === 'END') {
    currentBlock.value.onRetry()
  }
}
</script>
