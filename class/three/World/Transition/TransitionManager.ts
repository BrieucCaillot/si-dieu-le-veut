import Transition from '@/class/three/World/Transition/Transition'
import Block from '@/class/three/World/Block'

import TRANSITIONS from '@/constants/TRANSITIONS'

class TransitionManager {
  transitions: Transition[] = []

  constructor() {}

  create(_type: TRANSITIONS) {
    this.transitions.push(new Block(_type))
  }

  onTransitionCreated() {
    console.log('Transition created')
  }

  onTransitionFinished() {
    console.log('Transition finished')
  }
}

export default new TransitionManager()
