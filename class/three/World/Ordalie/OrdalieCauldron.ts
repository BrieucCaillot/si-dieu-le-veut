import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import Block from '@/class/three/World/Block'

class OrdalieCauldron {
  instance: Ordalie
  block: Block

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.block = _ordalie.block
  }

  start() {
    // TODO START
  }

  end() {
    this.instance.end()
  }

  update() {
    // console.log('Update OrdalieCauldron')
  }
}

export default OrdalieCauldron
