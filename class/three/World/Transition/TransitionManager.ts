import TRANSITIONS from '@/constants/TRANSITIONS'

import Transition from '@/class/three/World/Transition/Transition'

class TransitionManager {
  private instances: any[] = []
  private currentIndex = 0
  private lastType: TRANSITIONS

  /**
   * Create transition from type
   */
  create = (_type: TRANSITIONS) => {
    this.instances.push(new Transition(_type))
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
   * On Transition started
   */
  onStarted() {
    console.log('STARTED TRANSITION')
  }

  /**
   * On Transition ended
   */
  onEnded() {
    console.log('ENDED TRANSITION')
  }
}

export default new TransitionManager()
