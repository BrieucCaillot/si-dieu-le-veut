import Transition from '@/class/three/World/Transition/Transition'

import TRANSITIONS from '@/constants/TRANSITIONS'

class TransitionManager {
  transitions: Transition[] = []

  constructor() {}

  create(_type: TRANSITIONS) {
    this.transitions.push(new Transition(_type))
  }

  onTransitionCreated() {
    console.log('Transition created')
  }

  onTransitionFinished() {
    console.log('Transition finished')
  }
}

export default new TransitionManager()
