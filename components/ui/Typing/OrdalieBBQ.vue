<template>
  <div>
    <div class="border-2 fixed top-0 left-0 w-[300px] h-[100px] text-[#BCA8A2] text-center" ref="placeholder1"></div>
    <div class="border-2 fixed top-0 left-0 w-[300px] h-[100px] text-[#BCA8A2] text-center" ref="placeholder2"></div>
    <div class="border-2 fixed top-0 left-0 w-[300px] h-[100px] text-[#BCA8A2] text-center" ref="placeholder3"></div>

    <div class="flex fixed flex-col top-32 text-black" ref="chronometer">
      <span></span>
      <span></span>
      <span></span>
    </div>

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
const BASE_COLOR = { r: 202, g: 191, b: 191 }
const TARGET_COLOR = { r: 197, g: 0, b: 0 }

const inputRef = ref<HTMLInputElement>()
const chronometer = ref<HTMLDivElement>()

const placeholder1 = ref<HTMLDivElement>()
const placeholder2 = ref<HTMLDivElement>()
const placeholder3 = ref<HTMLDivElement>()

const ordalie = ref()

let refArray = []

let words = ['trespassez', 'vertu', 'delivrance', 'cherité', 'perdon', 'vaille', 'sepulchrez', 'jugement', 'gisés']
let displayedWords = []
let wordToType = null
let wordToTypeIndex = 0
let lettersToType = null
let letterToType = null
let wordIndex = 0

onMounted(() => initialization())

const initialization = () => {
  document.getElementById('input-typing').focus()
  ordalie.value = OrdalieManager.getByIndex(0).ordalie
  refArray.push(placeholder1, placeholder2, placeholder3)

  for (let i = 0; i < 3; i++) {
    refArray[i].value.style.fontSize = `${BASE_SIZE}px`
    pickWord(i)
    ordalie.value.setHTMLPosition(refArray[i].value, i)
  }

  // time.value.children.item(0).innerHTML = MAX_DISPLAY_TIME.toString()

  gsap.ticker.add(incrementChrono)

  setTimeout(() => {
    // placeholder1.value.style.color = 'rgba(0, 0, 0)'
    // placeholder1.value.style.transform = `scale(${2})`
  }, 1000)
}

const replaceWord = () => {
  displayedWords = displayedWords.filter((displayedWord) => displayedWord.word !== wordToType)

  refArray[wordIndex].value.classList.remove('border-red')

  ordalie.value.makeAStep()

  wordToType = null
  lettersToType = null
  wordToTypeIndex = 0
  letterToType = null

  if (words.length === 0) {
    refArray[wordIndex].value.textContent = ''
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
    color: BASE_COLOR,
    index: index,
  })

  const splittedWord = selectedWord.split('')

  refArray[index].value.textContent = ''

  splittedWord.forEach((letter) => {
    const span = document.createElement('span')
    span.setAttribute('class', 'inline-block ')
    span.innerHTML = letter
    refArray[index].value.appendChild(span)
  })

  return selectedWord
}

const selectWordToType = (e: KeyboardEvent) => {
  for (let i = 0; i < displayedWords.length; i++) {
    if (e.key.toLowerCase() === displayedWords[i].word.charAt(0)) {
      wordIndex = displayedWords[i].index

      // console.log(refArray[wordIndex].value.children.item(wordToTypeIndex))
      refArray[wordIndex].value.children.item(wordToTypeIndex).classList.remove('text-[#BCA8A2]')
      refArray[wordIndex].value.children.item(wordToTypeIndex).classList.add('text-typingDoneColor')

      wordToType = displayedWords[i].word
      lettersToType = wordToType.split('')
      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]
      AudioManager.play('success')

      refArray[wordIndex].value.classList.add('border-red')

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
      // console.log(refArray[wordIndex].value.children.item(wordToTypeIndex))
      refArray[wordIndex].value.children.item(wordToTypeIndex).classList.remove('text-[#BCA8A2]')
      refArray[wordIndex].value.children.item(wordToTypeIndex).classList.add('text-typingDoneColor')

      AudioManager.play('success')
      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]

      if (!letterToType) replaceWord()
    } else {
      const expectedLetterDOM = refArray[wordIndex].value.children.item(wordToTypeIndex)

      // console.log(expectedLetterDOM)

      gsap.to(expectedLetterDOM, {
        scale: 2,
        duration: 0.1,
      })

      gsap.to(expectedLetterDOM, {
        scale: 1,
        duration: 0.1,
        delay: 0.1,
      })
      // console.log('wrong letter')
    }
  }
}

const incrementChrono = (time, deltaTime, frame) => {
  for (let i = 0; i < displayedWords.length; i++) {
    const currentRef = refArray[displayedWords[i].index].value

    displayedWords[i].displayTime += deltaTime * 0.001
    // if (time.value) {
    //   console.log('jamais')

    //   time.value.children.item(i).innerHTML = displayedWords[i].word + Math.round(displayedWords[i].displayTime)
    // }
    chronometer.value.children.item(i).innerHTML = displayedWords[i].word + Math.round(displayedWords[i].displayTime)
    // console.log(time.value)

    const r = BASE_COLOR.r + (TARGET_COLOR.r - BASE_COLOR.r) * ((displayedWords[i].displayTime / displayedWords[i].maxDisplayTime) * 2)
    const g = BASE_COLOR.g + (TARGET_COLOR.g - BASE_COLOR.g) * ((displayedWords[i].displayTime / displayedWords[i].maxDisplayTime) * 2)
    const b = BASE_COLOR.b + (TARGET_COLOR.b - BASE_COLOR.b) * ((displayedWords[i].displayTime / displayedWords[i].maxDisplayTime) * 2)
    currentRef.style.color = `rgba(${r}, ${g}, ${b}, 1)`

    currentRef.style.fontSize = `${BASE_SIZE + (MAX_SIZE - BASE_SIZE) * (displayedWords[i].displayTime / displayedWords[i].maxDisplayTime)}px`

    if (displayedWords[i].displayTime > displayedWords[i].maxDisplayTime) {
      console.log("c'est perdu")
      gsap.ticker.remove(incrementChrono)
    }
  }
}
</script>
