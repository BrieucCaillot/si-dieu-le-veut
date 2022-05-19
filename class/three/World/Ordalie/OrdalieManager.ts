import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import ORDALIES from '@/constants/ORDALIES'
import DIFFICULTY from '@/constants/DIFFICULTY'

class OrdalieManager {
  ordalies: Ordalie[] = []
  activeOrdalie: Ordalie
  difficulty: DIFFICULTY

  constructor() {
    this.difficulty = DIFFICULTY.EASY
  }

  create(_type: ORDALIES) {
    this.ordalies.push(new Ordalie(_type))
  }

  setDifficulty(difficulty: DIFFICULTY) {
    this.difficulty = difficulty
  }

  getDifficulty() {
    return this.difficulty
  }

  onOrdalieCreated() {}

  onOrdalieFinished() {}
}

export default new OrdalieManager()
