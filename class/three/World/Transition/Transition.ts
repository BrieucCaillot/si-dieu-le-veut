import TRANSITIONS from '@/constants/TRANSITIONS'
import Block from '@/class/three/World/Block'

class Transition {
  constructor(_type: TRANSITIONS) {
    new Block(_type)
  }
}

export default Transition
