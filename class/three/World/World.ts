import * as THREE from 'three'
import WebGL from '@/class/three/WebGL'

import Floor from '@/class/three/World/Floor'
import Character from '@/class/three/World/Character'
import Environment from '@/class/three/World/Environment'
import Billboard from '@/class/three/Billboard/Billboard'
import OrdalieFactory from '~~/class/three/Ordalie/OrdalieManager'

class World extends THREE.EventDispatcher {
  floor: Floor
  character: Character
  environment: Environment
  billboard: Billboard
  ordalieFactory: OrdalieFactory

  constructor() {
    super()

    // Wait for resources
    WebGL.resources.addEventListener('resourcesLoaded', () => this.onResourcesLoaded())
  }

  onResourcesLoaded() {
    console.log('Resources loaded')
    WebGL.resources.resourcesLoaded = true
    // this.floor = new Floor()
    // this.character = new Character()
    this.environment = new Environment()
    this.ordalieFactory = new OrdalieFactory()
    // this.billboard = new Billboard()
  }

  onUpdate() {
    if (!WebGL.resources.resourcesLoaded) return
    // this.billboard.update()
  }
}

export default World
