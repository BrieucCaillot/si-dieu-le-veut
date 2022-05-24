import GUI from 'lil-gui'
import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'

class Environment extends THREE.EventDispatcher {
  ambiantLight: THREE.AmbientLight
  environmentMap: { [key: string]: any } = {}
  debugFolder: GUI

  constructor() {
    super()

    // Debug
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('environment')

    this.setAmbiantLight()
  }

  setAmbiantLight() {
    this.ambiantLight = new THREE.AmbientLight(0xffffff, 3)
    WebGL.scene.add(this.ambiantLight)
  }
}

export default Environment
