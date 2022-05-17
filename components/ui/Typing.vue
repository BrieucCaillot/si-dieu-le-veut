<template>
  <div>
    <div class="text-white" id="typing" v-SplitText></div>
    <input type="text" :ref="(el: any) => (inputRef = el)" v-on:keydown="newChar" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AudioManager from '@/class/three/utils/AudioManager'
import Blocks from '@/class/three/World/Blocks'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import OrdalieCroix from '@/class/three/World/Ordalie/OrdalieCroix'

const inputRef = ref<HTMLInputElement>()
const textToWrite = ref(
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo aliquam fugit eligendi cum pariatur sint ducimus eum impedit nobis? Fuga doloremque ex delectus maxime maiores molestias ipsum incidunt ea esse necessitatibus quod harum magni.'
)

const ordalie = ref<OrdalieCroix>()

onMounted(() => {
  inputRef.value.focus()

  watch(useStore().resourcesLoaded, () => {
    ordalie.value = OrdalieManager.ordalies[0].ordalie
  })
})

const currentWordDOM = ref(null)

const vSplitText = {
  beforeMount: (el: HTMLDivElement) => {
    textToWriteSplit.forEach((word) => {
      const splittedWord = word.split('')
      const div = document.createElement('div')
      div.setAttribute('class', 'word-item inline mr-[5px]')
      el.append(div)

      splittedWord.forEach((letter) => {
        const span = document.createElement('span')
        span.innerHTML = letter
        div.appendChild(span)
      })
    })

    currentWordDOM.value = el.querySelector('.word-item')
    console.log(currentWordDOM.value)

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
  lettersToType = wordToType.split('')
  letterToType = lettersToType[wordProgressIndex]

  currentWordDOM.value = currentWordDOM.value.nextSibling

  // console.log(wordProgressIndex, index, wordToType, lettersToType, letterToType)
}

const newChar = (e: KeyboardEvent) => {
  // if (e.key === 'Enter') return
  // console.log('new char', e)

  if (letterToType === e.key.toLowerCase()) {
    // console.log('good')

    // WebGL.world.croix.invertTimeScale()

    ordalie.value.armsUp()

    currentWordDOM.value.children.item(wordProgressIndex).classList.add('text-green')
    // currentLetterDOM.value = currentLetterDOM.value.nextSibling
    AudioManager.play('success')

    wordProgressIndex++
    letterToType = lettersToType[wordProgressIndex]
    // console.log('new letter', letterToType)

    if (!letterToType) wordCompleted()
  } else {
    // console.log('wrong letter!')
  }
}
</script>
