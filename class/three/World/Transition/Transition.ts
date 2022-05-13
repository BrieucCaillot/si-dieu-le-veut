import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import WebGL from '@/class/three/WebGL'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import TRANSITIONS from '@/constants/TRANSITIONS'

class Transition extends THREE.EventDispatcher {
  type: TRANSITIONS
  model: GLTF

  constructor(_type: TRANSITIONS) {
    super()

    this.type = _type
    this.setModel()
  }

  setModel() {
    this.model = WebGL.resources.getItems(this.type, 'model')
  }
}

export default Transition
