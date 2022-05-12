import * as THREE from 'three'
import WebGL from '@/class/three/WebGL'

import Floor from '@/class/three/World/Floor'
import Character from '@/class/three/World/Character'
import Environment from '@/class/three/World/Environment'
import OrdalieManager from '@/class/three/Ordalie/OrdalieManager'
import { ORDALIES } from '@/constants/ORDALIES'

class World extends THREE.EventDispatcher {
  floor: Floor
  character: Character
  environment: Environment

  constructor() {
    super()

    // Wait for resources
    WebGL.resources.addEventListener('resourcesLoaded', () => this.onResourcesLoaded())
  }

  onResourcesLoaded() {
    console.log('Resources loaded')
    WebGL.resources.resourcesLoaded = true
    this.environment = new Environment()
    // OrdalieManager.createOrdalie(ORDALIES.ORDALIES_1)
  }

  onUpdate() {
    if (!WebGL.resources.resourcesLoaded) return
    // this.billboard.update()
  }
}

export default World
