import ORDALIES from '@/constants/ORDALIES'
import DIFFICULTY from '@/constants/DIFFICULTY'

import Blocks from '@/class/three/World/Blocks'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'

class OrdalieManager {
  private instances: Ordalie[] = []
  private currentIndex = -1
  private nbPerDifficulty = 3
  private isDead = false
  private difficulty: DIFFICULTY = DIFFICULTY.EASY
  private lastCreated: ORDALIES
  private alreadyPlayed: ORDALIES[] = []

  constructor() {}

  /**
   * Create ordalie from type
   */
  create(_type: ORDALIES) {
    const ordalie = new Ordalie(_type)
    this.instances.push(ordalie)
    this.lastCreated = _type
  }

  shouldIncreaseDifficulty() {
    return this.alreadyPlayed.length % this.nbPerDifficulty === 0
  }

  /**
   * Create next ordalie
   */
  createNext() {
    const randomIndex = Math.floor(Math.random() * Object.values(ORDALIES).length)
    const randomOrdalie = Object.values(ORDALIES)[randomIndex]

    // Recall the function if the random ordalie picked is already played
    if (this.alreadyPlayed.includes(randomOrdalie)) return this.createNext()
    // Recall the function if the previous ordalie played is the same as the random ordalie picked
    if (this.lastCreated === randomOrdalie) return this.createNext()

    this.create(randomOrdalie)
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
   * Increase difficulty
   */
  increaseDifficulty() {
    const difficulties = Object.keys(DIFFICULTY)
    const currentDifficultyIndex = difficulties.indexOf(this.difficulty)
    if (currentDifficultyIndex === difficulties.length - 1) return
    this.setDifficulty(difficulties[currentDifficultyIndex + 1] as DIFFICULTY)
    console.log('🎲 ++ INCREASED DIFFICULTY ')
  }

  /**
   * Decrease difficulty
   */
  decreaseDifficulty() {
    const difficulties = Object.keys(DIFFICULTY)
    const currentDifficultyIndex = difficulties.indexOf(this.difficulty)
    if (currentDifficultyIndex === 0) return
    this.setDifficulty(difficulties[currentDifficultyIndex - 1] as DIFFICULTY)
    console.log('🎲 -- DECREASED DIFFICULTY ')
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
    // Add ordalie type to already played
    this.alreadyPlayed.push(this.getCurrent().block.getType() as ORDALIES)

    if (this.shouldIncreaseDifficulty()) {
      this.increaseDifficulty()
      this.alreadyPlayed = []
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
