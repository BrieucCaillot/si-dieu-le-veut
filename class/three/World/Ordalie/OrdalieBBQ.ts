import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import Block from '@/class/three/World/Block'

class OrdalieBBQ {
  ordalie: Ordalie
  block: Block

  constructor(_ordalie: Ordalie) {
    this.ordalie = _ordalie
    this.block = _ordalie.block
  }

  update() {
    // console.log('Update OrdalieBBQ')
  }
}

export default OrdalieBBQ
