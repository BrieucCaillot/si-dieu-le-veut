<template>
  <div>
    <div class="fixed top-1/4 left-1/2 transform -translate-y-1/2 -translate-x-1/2 w-1/2 flex justify-around">
      <span class="bg-white text-3xl p-4" ref="placeholder1"></span>
      <span class="bg-white text-3xl p-4" ref="placeholder2" data-module="2"></span>
      <span class="bg-white text-3xl p-4" ref="placeholder3" data-module="3"></span>
    </div>
    <input type="text" id="input-typing" class="fixed bottom-0 left-0" :ref="(el: any) => (inputRef = el)" v-on:keydown="newChar" />
  </div>
</template>

<script setup lang="ts">
const inputRef = ref<HTMLInputElement>()

const placeholder1 = ref<HTMLSpanElement>()
const placeholder2 = ref<HTMLSpanElement>()
const placeholder3 = ref<HTMLSpanElement>()

let refArray = []
let words = ['trespassez', 'vertu', 'delivrance', 'cherité', 'perdon', 'vaille', 'sepulchrez', 'jugement', 'gisés']
let displayedWords = []
let completed = []

onMounted(() => initialization())
refArray.push(placeholder1, placeholder2, placeholder3)

const initialization = () => {
  for (let i = 0; i < 3; i++) {
    const selectedWord = words[Math.floor(Math.random() * words.length)]
    words = words.filter((word) => word !== selectedWord)
    displayedWords.push(selectedWord)
    refArray[i].value.innerHTML = selectedWord
  }

  console.log(words)
  console.log(displayedWords)
}

const newChar = (e: KeyboardEvent) => {
  console.log('new char')
}
</script>
