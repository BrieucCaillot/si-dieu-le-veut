<template>
  <div>
    <!-- <div class=" flex justify-around space-x-4"> -->
    <div class="border-2 bg-transparent p-4 w-[300px] h-[100px] flex justify-center items-center">
      <span class="inline-block fixed top-0 left-0" ref="placeholder1"></span>
    </div>
    <div class="border-2 bg-transparent p-4 w-[300px] h-[100px] flex justify-center items-center">
      <span class="inline-block fixed top-0 left-0" ref="placeholder2"></span>
    </div>
    <div class="border-2 bg-transparent p-4 w-[300px] h-[100px] flex justify-center items-center">
      <span class="inline-block fixed top-0 left-0" ref="placeholder3"></span>
    </div>
    <!-- </div> -->
    <input type="text" id="input-typing" class="fixed bottom-0 left-0" :ref="(el: any) => (inputRef = el)" v-on:keydown="newChar" />
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'
import AudioManager from '@/class/three/utils/AudioManager'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

const BASE_SIZE = 20
const MAX_SIZE = 40
const MAX_DISPLAY_TIME = 10

const inputRef = ref<HTMLInputElement>()

const placeholder1 = ref<HTMLSpanElement>()
const placeholder2 = ref<HTMLSpanElement>()
const placeholder3 = ref<HTMLSpanElement>()

const ordalie = ref()

let refArray = []

let words = ['trespassez', 'vertu', 'delivrance', 'cherité', 'perdon', 'vaille', 'sepulchrez', 'jugement', 'gisés']
let displayedWords = []
let wordToType = null
let wordToTypeIndex = null
let lettersToType = null
let letterToType = null
let wordIndex = null

onMounted(() => initialization())

const initialization = () => {
  ordalie.value = OrdalieManager.getByIndex(0).ordalie
  refArray.push(placeholder1, placeholder2, placeholder3)

  for (let i = 0; i < 3; i++) {
    refArray[i].value.style.fontSize = `${BASE_SIZE}px`
    pickWord(i)
    ordalie.value.setHTMLPosition(refArray[i].value, i)
  }

  gsap.ticker.add(incrementChrono)
}

const replaceWord = () => {
  displayedWords = displayedWords.filter((displayedWord) => displayedWord.word !== wordToType)

  refArray[wordIndex].value.parentNode.classList.remove('border-red')

  ordalie.value.makeAStep()

  wordToType = null
  lettersToType = null
  wordToTypeIndex = null
  letterToType = null

  if (words.length === 0) {
    refArray[wordIndex].value.innerHTML = ''
    wordIndex = null
    return
  }

  pickWord(wordIndex)
  wordIndex = null
}

const pickWord = (index) => {
  const selectedWord = words[Math.floor(Math.random() * words.length)]
  const matchingLetter = displayedWords.filter((displayedWord) => displayedWord.word.charAt(0) === selectedWord.charAt(0))

  if (matchingLetter.length > 0) {
    return pickWord(index)
  }

  words = words.filter((word) => word !== selectedWord)
  displayedWords.push({
    word: selectedWord,
    displayTime: 0,
    maxDisplayTime: MAX_DISPLAY_TIME,
    index: index,
  })

  refArray[index].value.innerHTML = selectedWord

  return selectedWord
}

const selectWordToType = (e: KeyboardEvent) => {
  for (let i = 0; i < displayedWords.length; i++) {
    if (e.key.toLowerCase() === displayedWords[i].word.charAt(0)) {
      wordIndex = displayedWords[i].index
      wordToType = displayedWords[i].word
      lettersToType = wordToType.split('')
      wordToTypeIndex = 1
      letterToType = lettersToType[wordToTypeIndex]
      AudioManager.play('success')

      console.log()

      refArray[wordIndex].value.parentNode.classList.add('border-red')

      break
    }
  }
}

const newChar = (e: KeyboardEvent) => {
  if (!wordToType) {
    selectWordToType(e)
  } else {
    if (letterToType.toLowerCase() === e.key.toLowerCase()) {
      // console.log('good letter')

      AudioManager.play('success')
      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]

      if (!letterToType) replaceWord()
    } else {
      // console.log('wrong letter')
    }
  }
}

const incrementChrono = (time, deltaTime, frame) => {
  for (let i = 0; i < displayedWords.length; i++) {
    const currentRef = refArray[displayedWords[i].index].value

    displayedWords[i].displayTime += deltaTime * 0.001
    currentRef.innerHTML = displayedWords[i].word + Math.round(displayedWords[i].displayTime)
    currentRef.style.fontSize = `${BASE_SIZE + (MAX_SIZE - BASE_SIZE) * (displayedWords[i].displayTime / displayedWords[i].maxDisplayTime)}px`

    if (displayedWords[i].displayTime > displayedWords[i].maxDisplayTime) {
      // console.log("c'est perdu")
      gsap.ticker.remove(incrementChrono)
    }
  }
}
</script>
