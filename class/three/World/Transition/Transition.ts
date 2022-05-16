import TRANSITIONS from '@/constants/TRANSITIONS'
import Block from '@/class/three/World/Block'

class Transition extends Block {
  constructor(_type: TRANSITIONS) {
    super(_type)
  }
}

export default Transition
