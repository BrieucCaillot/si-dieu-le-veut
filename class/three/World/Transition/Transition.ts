import TRANSITIONS from '@/constants/TRANSITIONS'

import Block from '@/class/three/World/Block'

class Transition {
  block: Block

  constructor(_type: TRANSITIONS) {
    this.block = new Block(_type)
  }
}

export default Transition
