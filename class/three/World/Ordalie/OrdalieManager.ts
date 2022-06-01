import ORDALIES from '@/constants/ORDALIES'
import DIFFICULTY from '@/constants/DIFFICULTY'

import Blocks from '@/class/three/World/Blocks'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'

class OrdalieManager {
  private instances: Ordalie[] = []
  private currentIndex = -1
  private nbPerDifficulty = 3
  private isDead = false
  private difficulty: DIFFICULTY
  private lastCreated: ORDALIES
  private currentDifficultyOrdalie = 0

  constructor() {
    this.setDifficulty(DIFFICULTY.EASY)
  }

  /**
   * Create ordalie from type
   */
  create(_type: ORDALIES) {
    const ordalie = new Ordalie(_type)
    this.instances.push(ordalie)
    // this.addCurrentDifficultyOrdalies(_type)
    this.lastCreated = _type
  }

  shouldIncreaseDifficulty() {
    return this.currentDifficultyOrdalie % 3 === 0
  }

  /**
   * Create next ordalie
   */
  createNext() {
    const random = Math.floor(Math.random() * 2)

    switch (this.lastCreated) {
      case ORDALIES.CROIX:
        this.create(random === 0 ? ORDALIES.FOOD : ORDALIES.BBQ)
        break
      case ORDALIES.BBQ:
        this.create(random === 0 ? ORDALIES.CROIX : ORDALIES.FOOD)
        break
      case ORDALIES.FOOD:
        this.create(random === 0 ? ORDALIES.BBQ : ORDALIES.CROIX)
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
    // console.log(this.instances)

    return this.instances[this.currentIndex]
  }

  /**
   * Set ordalies difficulty
   */
  setDifficulty(_difficulty: DIFFICULTY) {
    this.difficulty = _difficulty
  }

  /**
   * Increase difficulty
   */
  increaseDifficulty() {
    const difficulties = Object.keys(DIFFICULTY)
    const currentDifficultyIndex = difficulties.indexOf(this.difficulty)
    if (currentDifficultyIndex === difficulties.length - 1) return
    this.setDifficulty(difficulties[currentDifficultyIndex + 1] as DIFFICULTY)
    console.log('🎲 ++  INCREASED DIFFICULTY ')
  }

  /**
   * Get ordalies difficulty
   */
  getDifficulty() {
    return this.difficulty
  }

  /**
   * Set isDead
   */
  setIsDead(_value: boolean) {
    this.isDead = _value
  }

  get isPlayerDead() {
    return this.isDead
  }

  /**
   * Start first ordalie
   */
  startFirst() {
    this.getByIndex(0).start()
  }

  /**
   * Start next ordalie
   */
  startNext() {
    // console.log('🎲 START NEXT')
    this.currentIndex++
    this.getCurrent().start()
  }

  /**
   * On Ordalie started
   */
  onStarted() {
    console.log('🎲 STARTED ' + this.getCurrent().block.getType())
    useStore().currentOrdalie.value = this.getCurrent().block.getType()
    Blocks.onStarted()
  }

  onPlayed() {
    this.currentDifficultyOrdalie++

    if (this.shouldIncreaseDifficulty()) {
      this.increaseDifficulty()
      this.currentDifficultyOrdalie = 0
    }
  }

  /**
   * On Ordalie ended
   */
  onEnded() {
    console.log('🎲 ENDED ' + this.getCurrent().block.getType())
    useStore().currentOrdalie.value = null
    this.onPlayed()
    Blocks.onEnded()
  }
}

export default new OrdalieManager()
