import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import Block from '@/class/three/World/Block'

class OrdalieCauldron {
  ordalie: Ordalie
  block: Block

  constructor(_ordalie: Ordalie) {
    this.ordalie = _ordalie
    this.block = _ordalie.block
  }

  update() {
    // console.log('Update OrdalieCauldron')
  }
}

export default OrdalieCauldron
