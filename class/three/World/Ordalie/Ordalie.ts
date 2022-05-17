import ORDALIES from '@/constants/ORDALIES'
import Block from '@/class/three/World/Block'
import Croix from '@/class/three/World/Croix'

class Ordalie {
  block: Block
  constructor(_type: ORDALIES) {
    this.block = new Block(_type)

    switch (_type) {
      case ORDALIES.CROIX:
        new Croix({ model: this.block.model })
        break

      default:
        break
    }
  }
}

export default Ordalie
