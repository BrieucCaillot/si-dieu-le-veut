import ORDALIES from '@/constants/ORDALIES'
import DIFFICULTY from '@/constants/DIFFICULTY'

import Blocks from '@/class/three/World/Blocks'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'

class OrdalieManager {
  private instances: Ordalie[] = []
  private currentIndex = 0
  private lastCreated: ORDALIES
  private difficulty: DIFFICULTY

  constructor() {
    this.setDifficulty(DIFFICULTY.EASY)
  }

  /**
   * Create ordalie from type
   */
  create(_type: ORDALIES) {
    const ordalie = new Ordalie(_type)
    this.instances.push(ordalie)
    this.lastCreated = _type
  }

  /**
   * Create next ordalie
   */
  createNext() {
    const random = Math.floor(Math.random() * 2)

    // @TODO Define logic
    switch (this.lastCreated) {
      case ORDALIES.CROIX:
        this.create(random === 0 ? ORDALIES.FOOD : ORDALIES.BBQ)
        break
      case ORDALIES.BBQ:
        this.create(random === 0 ? ORDALIES.CROIX : ORDALIES.FOOD)
        break
      case ORDALIES.FOOD:
        this.create(random === 0 ? ORDALIES.FOOD : ORDALIES.CROIX)
        break
    }
  }

  /**
   * Get all ordalies
   */
  getAll() {
    return this.instances
  }

  /**
   * Get ordalie by index
   */
  getByIndex(index: number) {
    return this.instances[index]
  }

  /**
   * Get current ordalie
   */
  getCurrent() {
    return this.instances[this.currentIndex]
  }

  /**
   * Set ordalies difficulty
   */
  setDifficulty(_difficulty: DIFFICULTY) {
    this.difficulty = _difficulty
  }

  /**
   * Get ordalies difficulty
   */
  getDifficulty() {
    return this.difficulty
  }

  /**
   * On Other started
   */
  onStarted() {
    console.log('🎲 STARTED ' + this.getCurrent().block.getType())
    Blocks.onStarted()
  }

  /**
   * On Other ended
   */
  onEnded() {
    console.log('🎲 ENDED ' + this.getCurrent().block.getType())
    Blocks.onEnded()
  }
}

export default new OrdalieManager()
