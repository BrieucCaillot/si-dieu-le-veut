import DIFFICULTY from '@/constants/DIFFICULTY'

const score = ref<number>(0)
const difficulty = ref<DIFFICULTY>(DIFFICULTY.EASY)

export default () => {
  return {
    score,
    difficulty,
  }
}
