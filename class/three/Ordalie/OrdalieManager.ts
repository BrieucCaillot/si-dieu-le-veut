import Ordalie from '@/class/three/Ordalie/Ordalie'

import { ORDALIES } from '@/constants/ORDALIES'

class OrdalieManager {
  ordalies: Ordalie[]

  constructor() {
    this.createOrdalie()
  }

  createOrdalie() {
    new Ordalie({
      _type: ORDALIES.ORDALIES_1,
    })
  }
}

export default OrdalieManager
