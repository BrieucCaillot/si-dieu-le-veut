<template>
  <div>
    <div v-for="(word, i) in displayedWords" :key="i" class="relative">
      <span class="cadre" :ref="(el) => (displayedWords[i] ? (displayedWords[i].el = el) : null)">{{ word.word }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import gsap from 'gsap'

const ordalie = ref()
const wordsRefs = ref([])
const displayedWords = ref([])

let CURRENT_TIME_BEFORE_NEW_WORD = 2
const TIME_BEFORE_NEW_WORD = 2
const MAX_WORDS = 5
// const MAX_DISPLA
let index = 0

let wordToType = null
let wordToTypeIndex = 0
let lettersToType = null
let letterToType = null
let wordIndex = 0

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

// let displayedWords = []

onMounted(() => initialization())

onUnmounted(() => {
  document.removeEventListener('keydown', newChar)
})

const initialization = () => {
  document.addEventListener('keydown', newChar)
  console.log('OnMounted Food')

  ordalie.value = OrdalieManager.getByIndex(0).instance
  // ordalie.value = OrdalieManager.getCurrent().instance

  // wordList.value.push('new word')

  // ordalie.value.setHTMLPosition(test.value)
  console.log(displayedWords.value)
  gsap.ticker.add(update)

  // ordalie.value.start()
}

const pickWord = () => {
  //pick a random word
  const selectedWord = words[Math.floor(Math.random() * words.length)]

  //get in an array words starting with the same letters
  const matchingLetter = displayedWords.value.filter((displayedWord) => displayedWord.word.charAt(0) === selectedWord.charAt(0))

  //if there is already a word starting with the same letter, pick another word
  if (matchingLetter.length > 0) {
    return pickWord()
  }

  //remove the selected word from the list
  words = words.filter((word) => word !== selectedWord)

  const selectedPath = ordalie.value.getRandomPath()

  displayedWords.value.push({
    word: selectedWord,
    path: selectedPath,
    mesh: ordalie.value.createInstance(selectedPath, index),
    displayTime: 0,
    maxDisplayTime: 5,
    progress: 0,
    index: index,
  })

  index++

  return selectedWord
}

const newChar = (e: KeyboardEvent) => {
  // if (!GAME_RUNNING) return
  if (!wordToType) {
    selectWordToType(e)
  } else {
    if (letterToType.toLowerCase() === e.key.toLowerCase()) {
      console.log('good letter')
      //     // console.log(refArray[wordIndex].value.children.item(wordToTypeIndex))
      //     refArray[wordIndex].value.children.item(wordToTypeIndex).classList.remove('text-[#BCA8A2]')
      //     refArray[wordIndex].value.children.item(wordToTypeIndex).classList.add('text-typingDoneColor')
      //     AudioManager.play('success')
      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]

      // console.log('')

      if (!letterToType) replaceWord()
    } else {
      //     const expectedLetterDOM = refArray[wordIndex].value.children.item(wordToTypeIndex)
      //     gsap.to(expectedLetterDOM, {
      //       scale: 2,
      //       duration: 0.1,
      //     })
      //     gsap.to(expectedLetterDOM, {
      //       scale: 1,
      //       duration: 0.1,
      //       delay: 0.1,
      //     })
    }
  }
}

const selectWordToType = (e: KeyboardEvent) => {
  for (let i = 0; i < displayedWords.value.length; i++) {
    if (e.key.toLowerCase() === displayedWords.value[i].word.charAt(0).toLowerCase()) {
      // wordIndex = displayedWords.value[i].index
      // refArray[wordIndex].value.children.item(wordToTypeIndex).classList.remove('text-[#BCA8A2]')
      // refArray[wordIndex].value.children.item(wordToTypeIndex).classList.add('text-typingDoneColor')
      wordToType = displayedWords.value[i].word
      lettersToType = wordToType.split('')
      wordToTypeIndex++
      letterToType = lettersToType[wordToTypeIndex]

      console.log('selected word', wordToType)

      // AudioManager.play('success')
      break
    }
  }
}

const replaceWord = () => {
  const displayedToRemove = displayedWords.value.find((display) => display.word === wordToType)
  ordalie.value.disposeInstance(displayedToRemove.mesh.name)
  displayedWords.value = displayedWords.value.filter((display) => display.word !== wordToType)

  wordToType = null
  lettersToType = null
  wordToTypeIndex = 0
  letterToType = null

  // COUNTER++

  // if (COUNTER === NB_WORDS_TO_WRITE) gameWon()
}

const update = (time, deltaTime, frame) => {
  CURRENT_TIME_BEFORE_NEW_WORD -= deltaTime * 0.001

  if (CURRENT_TIME_BEFORE_NEW_WORD < 0 && displayedWords.value.length < MAX_WORDS) {
    // console.log('new word, selected:', pickWord())
    pickWord()

    CURRENT_TIME_BEFORE_NEW_WORD = TIME_BEFORE_NEW_WORD
  }

  for (let i = 0; i < displayedWords.value.length; i++) {
    const current = displayedWords.value[i]
    current.displayTime += deltaTime * 0.001
    current.progress = current.displayTime / current.maxDisplayTime

    if (current.progress >= 1) {
      current.progress = 0
      current.displayTime = 0
    }

    if (current.el) {
      ordalie.value.setHTMLPosition(current.el, current.mesh)
    }
    ordalie.value.updateMesh(current.mesh, current.path, current.progress)

    // console.log(current.el.value)

    // console.log(current.ref)
    // console.log(current.progress)
  }

  // if (displayedWords.value.length) {
  // }
  // ordalie.value.setHTMLPosition(test.value)
}
</script>
