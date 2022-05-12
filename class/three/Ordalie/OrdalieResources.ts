import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Source } from '@/constants/SOURCES'
import { ORDALIES } from '@/constants/ORDALIES'
import { ORDALIE_SOURCES } from '@/constants/SOURCES'

import WebGL from '@/class/three/WebGL'
import OrdalieManager from './OrdalieManager'

class OrdalieResources extends THREE.EventDispatcher {
  loaders: {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader
    cubeTextureLoader: THREE.CubeTextureLoader
  }

  constructor() {
    super()

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    }
  }

  shouldLoadResources(_type: ORDALIES) {
    return !OrdalieManager.ordaliesResources[_type]
  }

  loadResources(_type: ORDALIES) {
    console.log('load resources')
    if (!this.shouldLoadResources) return

    const sources = ORDALIE_SOURCES[_type]
    const itemsLoaded = []

    let totalLoaded = 0

    const toLoad = sources.length

    const sourceLoaded = (source: Source, file: GLTF | THREE.Texture | THREE.CubeTexture) => {
      itemsLoaded[source.name] = file

      totalLoaded++

      if (totalLoaded === toLoad) {
        console.log('resources loaded ', _type)
        OrdalieManager.ordaliesResources[_type] = itemsLoaded
        console.log(OrdalieManager.ordaliesResources)
      }
    }

    // Load each source
    for (const source of sources) {
      switch (source.type) {
        case 'gltfModel':
          this.gltfLoader.load(source.path as string, (file) => {
            sourceLoaded(source, file)
          })
          break
        case 'texture':
          this.textureLoader.load(source.path as string, (file) => {
            sourceLoaded(source, file)
          })
          break
        case 'cubeTexture':
          this.cubeTextureLoader.load(source.path as [], (file) => {
            sourceLoaded(source, file)
          })
          break
      }
    }
  }
}

export default new OrdalieResources()
