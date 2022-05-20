<template>
  <div>
    <div class="text-white fixed w-1/2 top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2" id="typing" v-SplitText></div>
    <input type="text" id="input-typing" class="fixed bottom-0 left-0" :ref="(el: any) => (inputRef = el)" v-on:keydown="newChar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AudioManager from '@/class/three/utils/AudioManager'
import Blocks from '@/class/three/World/Blocks'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import OrdalieCroix from '@/class/three/World/Ordalie/OrdalieCroix'
import gsap from 'gsap'

const inputRef = ref<HTMLInputElement>()
const textToWrite = ref(
  "Priés pour nous trespassez, vous qui vivez, et nous aidez en la vertu de charité, n'est rienz que tant vaille a nostre delivrance come la vertu de cherité, de pitié et de perdon."
)

const ordalie = ref<OrdalieCroix>()

onMounted(() => {
  inputRef.value.focus()
  ordalie.value = OrdalieManager.ordalies[0].ordalie
})

const currentWordDOM = ref(null)

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
    // currentLetterDOM.value = el.querySelector('span')
  },
}

//progress in the array
let index = 0
//reference array with all the words
const textToWriteSplit = textToWrite.value.toLowerCase().split(' ')
//word to type
let wordToType = textToWriteSplit[index]
//progress in the word
let wordProgressIndex = 0
//letters array to type
let lettersToType = wordToType.split('')
//letter to type
let letterToType = lettersToType[wordProgressIndex]

// console.log('word to type is', wordToType)

const wordCompleted = () => {
  // console.log('undefined, next word')
  wordProgressIndex = 0
  index++
  wordToType = textToWriteSplit[index]

  if (!wordToType) {
    console.log('end game')

    return
  }
  lettersToType = wordToType.split('')
  letterToType = lettersToType[wordProgressIndex]

  currentWordDOM.value = currentWordDOM.value.nextSibling

  // console.log(wordProgressIndex, index, wordToType, lettersToType, letterToType)
}

const newChar = (e: KeyboardEvent) => {
  if (letterToType === e.key.toLowerCase()) {
    ordalie.value.armsUp()
    currentWordDOM.value.children.item(wordProgressIndex).classList.add('text-green')
    AudioManager.play('success')

    wordProgressIndex++
    letterToType = lettersToType[wordProgressIndex]
    // console.log('new letter', letterToType)

    if (!letterToType) wordCompleted()
  } else {
    //wrong letter
    const letter = currentWordDOM.value.children.item(wordProgressIndex)

    gsap.to(letter, {
      scale: 10,
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
