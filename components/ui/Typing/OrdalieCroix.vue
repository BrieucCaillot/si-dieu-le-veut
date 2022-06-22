<template>
  <div>
    <div class="fixed top-2 left-0 text-croix-base text-[27px] pr-[15px] hidden" id="typing" ref="containerRef" v-SplitText></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import AudioManager from '@/class/three/utils/AudioManager'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import WORDS_LIST from '@/constants/WORDS_LIST'
import ORDALIES from '@/constants/ORDALIES'
import { MAP, KEY } from '@/constants/KEY'

const currentWordDOM = ref(null)
const containerRef = ref<HTMLDivElement>()
const textToWrite = ref(WORDS_LIST[ORDALIES.CROIX][Math.floor(Math.random() * WORDS_LIST[ORDALIES.CROIX].length)])

const ordalie = ref()

onMounted(() => {
  document.addEventListener('keydown', newChar)

  ordalie.value = OrdalieManager.getCurrent().instance
  ordalie.value.setContainer(containerRef.value)
  ordalie.value.updateHTML()

  setTimeout(() => {
    containerRef.value.classList.remove('hidden')
  }, Math.round(ordalie.value.delay) * 1000)
})

onUnmounted(() => {
  document.removeEventListener('keydown', newChar)
})

const vSplitText = {
  beforeMount: (el: HTMLDivElement) => {
    textToWriteSplit.forEach((word) => {
      const splittedWord = word.split('')
      const div = document.createElement('div')
      div.setAttribute('class', 'inline-block mr-[5px]')
      el.append(div)

      splittedWord.forEach((letter) => {
        const span = document.createElement('span')
        span.innerHTML = letter
        span.setAttribute('class', 'inline-block')
        div.appendChild(span)
      })
    })

    currentWordDOM.value = el.children.item(0)
  },
}

//progress in the array
let index = 0
//reference array with all the words
const textToWriteSplit = textToWrite.value.split(' ')
//word to type
let wordToType = textToWriteSplit[index]
//progress in the word
let wordProgressIndex = 0
//letters array to type
let lettersToType = wordToType.split('')
//letter to type
let letterToType = lettersToType[wordProgressIndex]

const gameWon = () => {
  ordalie.value.gameWon()
}

const wordCompleted = () => {
  wordProgressIndex = 0
  index++
  wordToType = textToWriteSplit[index]

  if (!wordToType) {
    gameWon()
    return
  }
  lettersToType = wordToType.split('')
  letterToType = lettersToType[wordProgressIndex]

  currentWordDOM.value = currentWordDOM.value.nextSibling
}

const newChar = (e: KeyboardEvent) => {
  if (KEY.includes(e.key) || OrdalieManager.isPlayerDead) return
  // Fix apostrophe Dead key returned
  let key = e.key.toLowerCase()
  key = key === 'dead' ? `'` : key

  const inMap = MAP.has(letterToType.toLowerCase())

  let correspondance = null
  if (inMap) correspondance = MAP.get(letterToType.toLowerCase())

  if (wordToType) {
    if (letterToType.toLowerCase() === key || correspondance === key) validChar()
    else invalidChar()
  }

  if (!letterToType) wordCompleted()
}

const validChar = () => {
  ordalie.value.armsUp()
  currentWordDOM.value.children.item(wordProgressIndex).classList.remove('text-croix-error')
  currentWordDOM.value.children.item(wordProgressIndex).classList.add('text-croix-valid')
  AudioManager.play('success')

  wordProgressIndex++
  letterToType = lettersToType[wordProgressIndex]
}

const invalidChar = () => {
  const letter = currentWordDOM.value.children.item(wordProgressIndex)
  letter.classList.add('text-croix-error')

  AudioManager.play('typing-error')

  gsap.to(letter, {
    scale: 2,
    duration: 0.1,
  })

  gsap.to(letter, {
    scale: 1,
    duration: 0.1,
    delay: 0.1,
  })
}
</script>
