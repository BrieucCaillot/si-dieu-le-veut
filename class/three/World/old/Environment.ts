import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'

class Environment extends THREE.EventDispatcher {
  debugFolder!: { [key: string]: any }
  ambiantLight: THREE.AmbientLight
  environmentMap: { [key: string]: any } = {}

  constructor() {
    super()

    // Debug
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.addFolder('environment')

    this.setAmbiantLight()
  }

  setAmbiantLight() {
    this.ambiantLight = new THREE.AmbientLight(0xffffff, 2)
    WebGL.scene.add(this.ambiantLight)
  }
}

export default Environment
