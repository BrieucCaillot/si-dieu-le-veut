import ORDALIES from '@/constants/ORDALIES'
import Block from '@/class/three/World/Block'

class Ordalie extends Block {
  constructor(_type: ORDALIES) {
    super(_type)
  }
}

export default Ordalie
