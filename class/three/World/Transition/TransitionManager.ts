import TRANSITIONS from '@/constants/TRANSITIONS'

import Blocks from '@/class/three/World/Blocks'
import Transition from '@/class/three/World/Transition/Transition'

class TransitionManager {
  private instances: Transition[] = []
  private currentIndex = -1
  private lastCreated: TRANSITIONS
  private alreadyPlayed: TRANSITIONS[] = []

  /**
   * Create transition from type
   */
  create(_type: TRANSITIONS) {
    const transition = new Transition(_type)
    this.instances.push(transition)
    this.lastCreated = _type
  }

  /**
   * Create next transition
   */
  createNext() {
    const randomIndex = Math.floor(Math.random() * Object.values(TRANSITIONS).length)
    const randomTransition = Object.values(TRANSITIONS)[randomIndex]

    // Recall the function if the random transition picked is already played
    if (this.alreadyPlayed.includes(randomTransition)) return this.createNext()
    // Recall the function if the previous transition played is the same as the random transition picked
    if (this.lastCreated === randomTransition) return this.createNext()

    this.create(randomTransition)
  }

  /**
   * Get all transitions
   */
  getAll() {
    return this.instances
  }

  getByIndex(index: number) {
    return this.instances[index]
  }

  /**
   * Get active transition
   */
  getCurrent() {
    return this.instances[this.currentIndex]
  }

  /**
   * Get last transition
   */
  getLast() {
    return this.instances[this.instances.length - 1]
  }

  /**
   * Start next transition
   */
  startNext() {
    // console.log('🏴‍☠️ START NEXT')
    this.currentIndex++
    this.getCurrent().start()
  }

  /**
   * On Transition started
   */
  onStarted() {
    console.log('🏴‍☠️ STARTED ' + this.getCurrent().block.getType())
    useStore().currentType.value = this.getCurrent().block.getType()
    Blocks.onStarted()
  }

  /**
   * On Transition ended
   */
  onEnded() {
    console.log('🏴‍☠️ ENDED ' + this.getCurrent().block.getType())
    useStore().currentType.value = null
    Blocks.onEnded()
  }
}

export default new TransitionManager()
