<template>
  <div>
    <div class="fixed top-0 left-0 text-croix-base text-[27px] pr-[15px] hidden" id="typing" ref="containerRef" v-SplitText></div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import { ref, onMounted } from 'vue'

import AudioManager from '@/class/three/utils/AudioManager'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

const texts = [
  'Pr',
  // "Sire, envoiez vous sainz ainglez de paradix a moy, por me défendre, enluminer et eschaufier en l'amour de la veritey et la bialtey que est en ce saint sacrement contenu.",
  // "O vous mors qui gisés es sepulchrez, levez vous, sire aidés moy, perdonnez moy, confortez moy, aies merci de moy. Ainsi soit il, c'est amen.",
]

const currentWordDOM = ref(null)
const containerRef = ref<HTMLDivElement>()
const textToWrite = ref(texts[Math.floor(Math.random() * texts.length)])

const ordalie = ref()

onMounted(() => {
  document.addEventListener('keydown', newChar)
  ordalie.value = OrdalieManager.getCurrent().instance
  // ordalie.value = OrdalieManager.getByIndex(0).instance
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
      div.setAttribute('class', 'word-item inline mr-[5px] whitespace-nowrap')
      el.append(div)

      splittedWord.forEach((letter) => {
        const span = document.createElement('span')
        span.innerHTML = letter
        span.setAttribute('class', 'inline-block')
        div.appendChild(span)
      })
    })

    currentWordDOM.value = el.querySelector('.word-item')
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

// console.log('word to type is', wordToType)
const gameWon = () => {
  ordalie.value.gameWon()
}

const wordCompleted = () => {
  // console.log('undefined, next word')
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
  if (!e.code.startsWith('Key') && !e.code.startsWith('Digit') && !e.code.startsWith('Semicolon')) {
    return
  }

  if (letterToType.toLowerCase() === e.key.toLowerCase() && wordToType) {
    ordalie.value.armsUp()
    currentWordDOM.value.children.item(wordProgressIndex).classList.remove('text-croix-error')
    currentWordDOM.value.children.item(wordProgressIndex).classList.add('text-croix-valid')
    AudioManager.play('success')

    wordProgressIndex++
    letterToType = lettersToType[wordProgressIndex]
    // console.log('new letter', letterToType)
    if (!letterToType) wordCompleted()
  } else {
    //wrong letter
    const letter = currentWordDOM.value.children.item(wordProgressIndex)
    letter.classList.add('text-croix-error')

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
}
</script>
