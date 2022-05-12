import Ordalie from '@/class/three/Ordalie/Ordalie'
import OrdalieResources from '@/class/three/Ordalie/OrdalieResources'

import { ORDALIES } from '@/constants/ORDALIES'

class OrdalieManager {
  ordalies: Ordalie[]
  ordaliesResources!: { [key in ORDALIES]: any[] }

  createOrdalie(_type: ORDALIES) {
    new Ordalie({
      _type: _type,
    })
  }

  onOrdalieCreated() {}

  onOrdalieFinished() {}
}

export default new OrdalieManager()
