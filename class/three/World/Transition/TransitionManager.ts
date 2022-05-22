import TRANSITIONS from '@/constants/TRANSITIONS'

import Transition from '@/class/three/World/Transition/Transition'

class TransitionManager {
  private transitions: any[] = []
  private lastType: TRANSITIONS
  private active: Transition

  /**
   * Create transition from type
   */
  create = (_type: TRANSITIONS) => {
    this.transitions.push(new Transition(_type))
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
    return this.transitions
  }

  /**
   * Get active transition
   */
  getActive() {
    return this.active
  }

  /**
   * When transition created
   */
  onTransitionCreated() {
    console.log('Transition created')
  }

  /**
   * When transition finished
   */
  onTransitionFinished() {
    console.log('Transition finished')
  }
}

export default new TransitionManager()
