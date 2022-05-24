import TRANSITIONS from '@/constants/TRANSITIONS'

import Transition from '@/class/three/World/Transition/Transition'

class TransitionManager {
  private instances: Transition[] = []
  private currentIndex = -1
  private lastType: TRANSITIONS

  /**
   * Create transition from type
   */
  create = (_type: TRANSITIONS) => {
    const transition = new Transition(_type)
    this.instances.push(transition)
    this.lastType = _type
  }

  /**
   * Create next transition
   */
  createNext() {
    // @TODO Define logic
    switch (this.lastType) {
      case TRANSITIONS.TRANSITION_1:
        this.create(TRANSITIONS.TRANSITION_2)
        break
      case TRANSITIONS.TRANSITION_2:
        this.create(TRANSITIONS.TRANSITION_1)
        break
      default:
        this.create(TRANSITIONS.TRANSITION_1)
        break
    }
  }

  /**
   * Get all transitions
   */
  getAll() {
    return this.instances
  }

  /**
   * Get active transition
   */
  getCurrent() {
    return this.instances[this.currentIndex]
  }

  /**
   * Start next transition
   */
  startNext() {
    console.log('🏴‍☠️ START NEXT')
    this.currentIndex++
    this.getCurrent().start()
  }

  /**
   * On Transition started
   */
  onStarted() {
    console.log('🏴‍☠️ STARTED')
  }

  /**
   * On Transition ended
   */
  onEnded() {
    console.log('🏴‍☠️ ENDED')
  }
}

export default new TransitionManager()
