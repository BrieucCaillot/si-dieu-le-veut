<template>
  <div>
    <div class="text-white" id="typing" v-SplitText></div>
    <input type="text" :ref="(el) => (inputRef = el)" v-on:keydown="newChar" v-on:keyup.enter="confirmWord" class="" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import AudioManager from '@/class/three/utils/AudioManager'

const inputRef = ref<HTMLInputElement>()
const textToWrite = ref(
  'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo aliquam fugit eligendi cum pariatur sint ducimus eum impedit nobis? Fuga doloremque ex delectus maxime maiores molestias ipsum incidunt ea esse necessitatibus quod harum magni.'
)

onMounted(() => {
  inputRef.value.focus()
})

const currentLetterDOM = ref(null)

const vSplitText = {
  beforeMount: (el: HTMLDivElement) => {
    textToWriteSplit.forEach((word) => {
      const splittedWord = word.split('')
      splittedWord.forEach((letter) => {
        const span = document.createElement('span')
        span.innerHTML = letter
        el.appendChild(span)
      })
    })

    currentLetterDOM.value = el.querySelector('span')
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

const confirmWord = () => {
  // console.log('confirm word!', inputRef.value)
  // if(inputRef.value === wordToType){
  //   inputRef.value = ''
  // }
}

const newChar = (e: KeyboardEvent) => {
  // if (e.key === 'Enter') return
  // console.log('new char', e)

  if (letterToType === e.key.toLowerCase()) {
    // console.log('good')

    currentLetterDOM.value.classList.add('text-green')
    currentLetterDOM.value = currentLetterDOM.value.nextSibling
    AudioManager.play('success')

    wordProgressIndex++
    letterToType = lettersToType[wordProgressIndex]
    // console.log('new letter', letterToType)

    if (!letterToType) {
      // console.log('undefined, next word')
      wordProgressIndex = 0
      index++
      wordToType = textToWriteSplit[index]
      lettersToType = wordToType.split('')
      letterToType = lettersToType[wordProgressIndex]

      // console.log(wordProgressIndex, index, wordToType, lettersToType, letterToType)
    }
  } else {
    // console.log('wrong letter!')
  }
}
</script>
