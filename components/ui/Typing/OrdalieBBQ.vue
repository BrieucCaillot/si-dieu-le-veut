<template>
  <div class="text-[25px]">
    <div ref="parent1" class="fixed top-0 left-4">
      <div class="text-[#BCA8A2]" ref="placeholder1"></div>
    </div>
    <div ref="parent2" class="fixed top-0 left-4">
      <div class="text-[#BCA8A2]" ref="placeholder2"></div>
    </div>
    <div ref="parent3" class="fixed top-0 left-4">
      <div class="text-[#BCA8A2]" ref="placeholder3"></div>
    </div>

    <div class="flex fixed flex-col top-32 text-black" ref="chronometer">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import { random } from '@/class/three/utils/Maths'
import AudioManager from '@/class/three/utils/AudioManager'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

const BASE_SCALE = 1
const MAX_SCALE = 1.48
const MAX_DISPLAY_TIME = {
  MIN: 7,
  MAX: 9,
}
const NB_WORDS_TO_WRITE = 10
const BASE_BURNING = 0
const MAX_BURNING = 0.3
const START_BURNING_TIME = 2
const BASE_COLOR = { r: 202, g: 191, b: 191 }
const TARGET_COLOR = { r: 197, g: 0, b: 0 }

let COUNTER = 0
let GAME_RUNNING = false

const chronometer = ref<HTMLDivElement>()

const parent1 = ref<HTMLDivElement>()
const parent2 = ref<HTMLDivElement>()
const parent3 = ref<HTMLDivElement>()

const placeholder1 = ref<HTMLDivElement>()
const placeholder2 = ref<HTMLDivElement>()
const placeholder3 = ref<HTMLDivElement>()

let positions = [
  { x: 0, y: 0 },
  { x: 0, y: 0 },
  { x: 0, y: 0 },
]

const ordalie = ref()

let parentArray = []
let refArray = []

let words = [
  'Attrapoire',
  'Ardre',
  'Batelage',
  'Bigre',
  'Carnade',
  'Chiaberna',
  'Deable',
  'Douloir',
  'Esbigner',
  'Estrapade',
  'Fallace',
  'Fredain',
  'Gorrin',
  'Grevain',
  'Quarteler',
  'Merdaille',
  'Mordiable',
  'Porpisser',
  'Por-Diu',
  'Trouiller',
  'Tudieu',
  'Vain-dieu',
  'Vergogne',
]

let displayedWords = []
let wordToType = null
let wordToTypeIndex = 0
let lettersToType = null
let letterToType = null
let wordIndex = 0

onMounted(() => initialization())

onUnmounted(() => {
  document.removeEventListener('keydown', newChar)
})

// get translate values of the words
const getTranslate = (el: HTMLDivElement, index: number) => {
  const style = window.getComputedStyle(el)
  const matrix = new WebKitCSSMatrix(style.transform)
  positions[index].x = matrix.m41
  positions[index].y = matrix.m42
}

//init function, executed once
const initialization = () => {
  document.addEventListener('keydown', newChar)

  // ordalie.value = OrdalieManager.getByIndex(0).instance
  ordalie.value = OrdalieManager.getCurrent().instance

  refArray.push(placeholder1, placeholder2, placeholder3)
  parentArray.push(parent1, parent2, parent3)

  for (let i = 0; i < 3; i++) {
    ordalie.value.setHTMLPosition(parentArray[i].value, i)
    getTranslate(parentArray[i].value, i)
    pickWord(i)
  }

  GAME_RUNNING = true
  gsap.ticker.add(update)
}

//when one word is completed, replace it and check if the game is complete
const replaceWord = () => {
  gsap.to(ordalie.value.texts[wordIndex].material.uniforms.uDissolve, {
    value: 0,
    duration: 1,
  })

  displayedWords = displayedWords.filter((displayedWord) => displayedWord.word !== wordToType)
  ordalie.value.makeAStep()

  wordToType = null
  lettersToType = null
  wordToTypeIndex = 0
  letterToType = null

  COUNTER++

  if (COUNTER === NB_WORDS_TO_WRITE) gameWon()

  if (words.length === 0) {
    refArray[wordIndex].value.textContent = ''
    wordIndex = null
    return
  }

  if (COUNTER > NB_WORDS_TO_WRITE - 3) {
    refArray[wordIndex].value.textContent = ''
    gsap.to(ordalie.value.texts[wordIndex].material.uniforms.uDissolve, {
      value: 1.1,
      duration: 1,
    })
    return
  }

  pickWord(wordIndex)
  wordIndex = null
}

const pickWord = (index: number) => {
  const selectedWord = words[Math.floor(Math.random() * words.length)]
  const matchingLetter = displayedWords.filter((displayedWord) => displayedWord.word.charAt(0) === selectedWord.charAt(0))

  if (matchingLetter.length > 0) {
    return pickWord(index)
  }

  words = words.filter((word) => word !== selectedWord)
  displayedWords.push({
    word: selectedWord,
    displayTime: 0,
    maxDisplayTime: Math.round(random(MAX_DISPLAY_TIME.MIN, MAX_DISPLAY_TIME.MAX)),
    color: BASE_COLOR,
    index: index,
    mesh: ordalie.value.texts[index],
  })

  const splittedWord = selectedWord.split('')

  refArray[index].value.textContent = ''

  splittedWord.forEach((letter) => {
    const span = document.createElement('span')
    span.setAttribute('class', 'inline-block')

    span.innerHTML = letter

    refArray[index].value.appendChild(span)
  })

  parentArray[index].value.style.transform = `translate(
    ${positions[index].x - parentArray[index].value.offsetWidth / 2}px,
    ${positions[index].y - parentArray[index].value.offsetHeight / 2}px
  )`

  return selectedWord
}

const selectWordToType = (e: KeyboardEvent) => {
  for (let i = 0; i < displayedWords.length; i++) {
    if (e.key.toLowerCase() === displayedWords[i].word.charAt(0).toLowerCase()) {
      wordIndex = displayedWords[i].index

      refArray[wordIndex].value.children.item(wordToTypeIndex).classList.remove('text-[#BCA8A2]')
      refArray[wordIndex].value.children.item(wordToTypeIndex).classList.add('text-typingDoneColor')

      wordToType = displayedWords[i].word
      lettersToType = wordToType.split('')
      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]
      AudioManager.play('success')
      break
    }
  }
}

const newChar = (e: KeyboardEvent) => {
  if (!GAME_RUNNING) return

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
}

const gameWon = () => {
  GAME_RUNNING = false
  ordalie.value.gameWon()
  gsap.ticker.remove(update)
}

const gameOver = () => {
  GAME_RUNNING = false
  ordalie.value.gameOver()

  for (let i = 0; i < refArray.length; i++) {
    gsap.to(refArray[i].value, {
      opacity: 0,
      duration: 0.5,
    })
  }
  gsap.ticker.remove(update)
}

const update = (time: any, deltaTime: number, frame: any) => {
  for (let i = 0; i < displayedWords.length; i++) {
    //increment display time of each word
    displayedWords[i].displayTime += deltaTime * 0.001

    //get current ref in array with the for loop
    const currentRef = refArray[displayedWords[i].index].value

    //from 0 to 1
    const progress = displayedWords[i].displayTime / displayedWords[i].maxDisplayTime

    // for debug purposes, display the remaining time
    // chronometer.value.children.item(i).innerHTML = displayedWords[i].maxDisplayTime + displayedWords[i].word + Math.round(displayedWords[i].displayTime)

    //color transition according to the time
    //notice that progress is multiplied by 2 so it progresses 2 times faster
    const r = BASE_COLOR.r + (TARGET_COLOR.r - BASE_COLOR.r) * (progress * 2)
    const g = BASE_COLOR.g + (TARGET_COLOR.g - BASE_COLOR.g) * (progress * 2)
    const b = BASE_COLOR.b + (TARGET_COLOR.b - BASE_COLOR.b) * (progress * 2)
    currentRef.style.color = `rgba(${r}, ${g}, ${b}, 1)`

    //scale transition from base_scale to max_scale
    currentRef.style.transform = `scale(${BASE_SCALE + (MAX_SCALE - BASE_SCALE) * progress})`

    //control the uDissolve value to start burning the paper after START_BURNING_TIME
    if (displayedWords[i].displayTime > START_BURNING_TIME) {
      displayedWords[i].mesh.material.uniforms.uDissolve.value = BASE_BURNING + (MAX_BURNING - BASE_BURNING) * progress
    }

    //if display time reaches max display time, its a game over
    if (displayedWords[i].displayTime > displayedWords[i].maxDisplayTime) {
      gameOver()
    }
  }
}
</script>
