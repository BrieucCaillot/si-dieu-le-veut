<template>
  <div>
    <div v-for="(word, i) in wordList" :key="i">
      <span class="cadre opacity-0" :ref="(el) => (wordList[i] ? (wordList[i].el = el) : null)" v-SplitText>{{ word.word }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import gsap from 'gsap'

import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import AudioManager from '@/class/three/utils/AudioManager'
import { random } from '@/class/three/utils/Maths'
import WORDS_LIST from '@/constants/WORDS_LIST'
import ORDALIES from '@/constants/ORDALIES'
import { KEY } from '@/constants/KEY'

const ordalie = ref()
const wordList = ref([])
let displayedWords = []

let COUNTER = 0
const NB_WORDS_TO_WRITE = 10
let CURRENT_TIME_BEFORE_NEW_WORD = 0
const TIME_BEFORE_NEW_WORD = {
  MIN: 1.8,
  MAX: 2.2,
}
let COUNT_WORDS = 0
let index = 0
const MAX_DISPLAY_TIME = {
  MIN: 13,
  MAX: 15,
}

let wordToType = null
let wordToTypeIndex = 0
let lettersToType = null
let letterToType = null
let wordIndex = 0

let words = WORDS_LIST[ORDALIES.FOOD]

onMounted(() => initialization())

onUnmounted(() => {
  document.removeEventListener('keydown', newChar)
})

const vSplitText = {
  created: (el) => {
    const textToSplit = el.textContent.split('')
    el.textContent = ''
    textToSplit.forEach((letter) => {
      const span = document.createElement('span')
      span.innerHTML = letter
      span.setAttribute('class', 'inline-block text-food-base')
      el.appendChild(span)
    })
  },
}

const initialization = () => {
  document.addEventListener('keydown', newChar)

  ordalie.value = OrdalieManager.getCurrent().instance

  MAX_DISPLAY_TIME.MIN = ordalie.value.difficultyData.minDisplayTime
  MAX_DISPLAY_TIME.MAX = ordalie.value.difficultyData.maxDisplayTime

  TIME_BEFORE_NEW_WORD.MIN = ordalie.value.difficultyData.minTimeBeforeNewWord
  TIME_BEFORE_NEW_WORD.MAX = ordalie.value.difficultyData.maxTimeBeforeNewWord

  gsap.ticker.add(update)
}

const pickWord = () => {
  //pick a random word
  const selectedWord = words[Math.floor(Math.random() * words.length)]

  // //get in an array words starting with the same letters
  const matchingLetter = displayedWords.filter((displayedWord) => displayedWord.charAt(0) === selectedWord.charAt(0))

  // //if there is already a word starting with the same letter, pick another word
  if (matchingLetter.length > 0) {
    return pickWord()
  }

  // //remove the selected word from the list
  words = words.filter((word) => word !== selectedWord)

  const selectedPath = ordalie.value.getRandomPath()

  wordList.value.push({
    word: selectedWord,
    path: selectedPath,
    mesh: ordalie.value.createInstance(selectedPath, index),
    displayTime: 0,
    maxDisplayTime: Math.round(random(MAX_DISPLAY_TIME.MIN, MAX_DISPLAY_TIME.MAX)),
    progress: 0,
    index: index,
    wordCompleted: false,
    scale: 1,
  })

  displayedWords.push(selectedWord)

  index++

  COUNT_WORDS++

  return selectedWord
}

const newChar = (e: KeyboardEvent) => {
  if (!wordToType) {
    selectWordToType(e)
  } else {
    if (KEY.includes(e.key)) return
    if (letterToType.toLowerCase() === e.key.toLowerCase()) {
      AudioManager.play('success')

      wordList.value[wordIndex].el.children.item(wordToTypeIndex).classList.remove('text-food-error')
      wordList.value[wordIndex].el.children.item(wordToTypeIndex).classList.remove('text-food-base')
      wordList.value[wordIndex].el.children.item(wordToTypeIndex).classList.add('text-food-valid')

      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]
      if (!letterToType) replaceWord()
    } else {
      const expectedLetterDOM = wordList.value[wordIndex].el.children.item(wordToTypeIndex)
      expectedLetterDOM.classList.add('text-food-error')
      AudioManager.play('typing-error')
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

const selectWordToType = (e: KeyboardEvent) => {
  for (let i = 0; i < displayedWords.length; i++) {
    if (e.key.toLowerCase() === displayedWords[i].charAt(0).toLowerCase()) {
      wordToType = displayedWords[i]
      lettersToType = wordToType.split('')

      const displayed = wordList.value.find((display) => display.word === wordToType)
      wordIndex = displayed.index
      wordList.value[wordIndex].el.children.item(wordToTypeIndex).classList.remove('text-food-base')
      wordList.value[wordIndex].el.children.item(wordToTypeIndex).classList.add('text-food-valid')

      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]
      AudioManager.play('success')
      break
    }
  }
}

const replaceWord = async () => {
  const displayedToRemove = wordList.value.find((display) => display.word === wordToType)

  displayedWords = displayedWords.filter((word) => word !== wordToType)

  gsap.to(displayedToRemove, {
    duration: 1,
    scale: 0,
  })

  gsap.to(displayedToRemove.el.parentElement, {
    duration: 1,
    opacity: 0,
  })

  wordToType = null
  lettersToType = null
  wordToTypeIndex = 0
  letterToType = null

  COUNTER++

  if (COUNTER % Math.floor(NB_WORDS_TO_WRITE / 2) === 0) {
    ordalie.value.updateFurnace()
  }

  //shader transition
  await ordalie.value.startBiteTransition(displayedToRemove.mesh)

  //dispose 3d
  ordalie.value.disposeInstance(displayedToRemove.mesh.name)

  //remove from update
  wordList.value[displayedToRemove.index].wordCompleted = true

  //remove dom elem
  displayedToRemove.el.parentNode.removeChild(displayedToRemove.el)

  if (COUNTER === NB_WORDS_TO_WRITE) gameWon()
}

const gameWon = () => {
  ordalie.value.gameWon()
  gsap.ticker.remove(update)
}

const gameOver = () => {
  for (let i = 0; i < wordList.value.length; i++) {
    const current = wordList.value[i]
    if (current.el && !current.wordCompleted) {
      gsap.to(current.el, {
        opacity: 0,
        duration: 0.25,
      })
    }
  }

  ordalie.value.gameOver()
  gsap.ticker.remove(update)
}

const update = (time: number, deltaTime: number, frame: number) => {
  CURRENT_TIME_BEFORE_NEW_WORD -= deltaTime * 0.001

  if (CURRENT_TIME_BEFORE_NEW_WORD < 0 && COUNT_WORDS < NB_WORDS_TO_WRITE) {
    pickWord()
    CURRENT_TIME_BEFORE_NEW_WORD = random(TIME_BEFORE_NEW_WORD.MIN, TIME_BEFORE_NEW_WORD.MAX)
  }

  for (let i = 0; i < wordList.value.length; i++) {
    const current = wordList.value[i]

    if (current.el && !current.wordCompleted) {
      current.displayTime += deltaTime * 0.001
      current.progress = current.displayTime / current.maxDisplayTime

      if (current.el.style.opacity <= 1) {
        current.el.style.opacity = current.displayTime / 0.25
      }

      // gsap.to(current.el, {
      //   opacity: 1,
      //   duration: 0.25,
      // })

      if (current.progress >= 1) {
        current.progress = 0
        current.displayTime = 0

        gameOver()
        return
      }

      ordalie.value.updateHTML(current.el, current.mesh, current.scale)
      ordalie.value.updateMesh(current.mesh, current.path, current.progress)
    }
  }
}
</script>
