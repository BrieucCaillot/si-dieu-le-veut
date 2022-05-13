import Ordalie from '@/class/three/World/Ordalie/Ordalie'

import ORDALIES from '@/constants/ORDALIES'

class OrdalieManager {
  ordalies: Ordalie[] = []

  constructor() {}

  create(_type: ORDALIES) {
    this.ordalies.push(new Ordalie(_type))
  }

  onOrdalieCreated() {}

  onOrdalieFinished() {}
}

export default new OrdalieManager()
