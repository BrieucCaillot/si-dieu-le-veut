import * as THREE from 'three'

import ORDALIES from '@/constants/ORDALIES'

import WebGL from '@/class/three/WebGL'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

class Ordalie extends THREE.EventDispatcher {
  type: ORDALIES
  model: GLTF

  constructor(_type: ORDALIES) {
    super()

    this.type = _type
    this.setModel()
  }

  setModel() {
    this.model = WebGL.resources.getItems(this.type, 'model')
    WebGL.scene.add(this.model.scene)
    // WebGL.scene.add(this.resources.itemsLoaded.model)
  }
}

export default Ordalie
