import Transition from '@/class/three/World/Transition/Transition'

import TRANSITIONS from '@/constants/TRANSITIONS'

class TransitionManager {
  transitions: Transition[] = []

  constructor() {}

  createTransitions() {
    this.transitions.push(new Transition(TRANSITIONS.TRANSITION_1))
  }

  onTransitionCreated() {
    console.log('Transition created')
  }

  onTransitionFinished() {
    console.log('Transition finished')
  }
}

export default TransitionManager
