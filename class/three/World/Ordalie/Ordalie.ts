import ORDALIES from '@/constants/ORDALIES'
import Block from '@/class/three/World/Block'

class Ordalie {
  constructor(_type: ORDALIES) {
    new Block(_type)
  }
}

export default Ordalie
