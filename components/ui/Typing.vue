<template>
  <div>
    <div class="text-white" id="typing">{{ textToWrite }}</div>
    <input type="text" v-on:keydown="newChar" v-on:keyup.enter="confirmWord" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue'
//
export default {
  setup() {
    const inputRef = ref('')
    const textToWrite = ref(
      'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Explicabo aliquam fugit eligendi cum pariatur sint ducimus eum impedit nobis? Fuga doloremque ex delectus maxime maiores molestias ipsum incidunt ea esse necessitatibus quod harum magni.'
    )

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
        console.log('good')

        wordProgressIndex++
        letterToType = lettersToType[wordProgressIndex]
        console.log('new letter', letterToType)

        if (!letterToType) {
          console.log('undefined, next word')
          wordProgressIndex = 0
          index++
          wordToType = textToWriteSplit[index]
          lettersToType = wordToType.split('')
          letterToType = lettersToType[wordProgressIndex]

          console.log(wordProgressIndex, index, wordToType, lettersToType, letterToType)
        }
      } else {
        console.log('wrong letter!')
      }
    }

    return {
      confirmWord,
      newChar,
      inputRef,
      textToWrite,
    }
  },
}
</script>
