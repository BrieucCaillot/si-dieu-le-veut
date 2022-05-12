import * as THREE from 'three'

import { ORDALIES } from '@/constants/ORDALIES'

import WebGL from '@/class/three/WebGL'
import OrdalieResources from '@/class/three/Ordalie/OrdalieResources'
import OrdalieManager from './OrdalieManager'

class Ordalie extends THREE.EventDispatcher {
  type: ORDALIES
  model: any

  constructor({ _type = ORDALIES.ORDALIES_1 }: { _type: ORDALIES }) {
    super()

    this.type = _type

    OrdalieResources.loadResources(this.type)
    // this.setModel()
  }

  setModel() {
    // WebGL.scene.add(this.resources.itemsLoaded.model)
  }
}

export default Ordalie
