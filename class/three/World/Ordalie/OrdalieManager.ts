import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import Block from '@/class/three/World/Block'

import ORDALIES from '@/constants/ORDALIES'
import Blocks from '@/class/three/World/Blocks'

class OrdalieManager {
  ordalies: Ordalie[] = []

  constructor() {}

  create(_type: ORDALIES) {
    new Ordalie(_type)
    // this.ordalies.push(new Ordalie(_type))
  }

  onOrdalieCreated() {}

  onOrdalieFinished() {}
}

export default new OrdalieManager()
