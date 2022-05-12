import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Source, ALL_SOURCES } from '@/constants/SOURCES'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

class Resources extends THREE.EventDispatcher {
  sources = ALL_SOURCES
  loaders: {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader
    cubeTextureLoader: THREE.CubeTextureLoader
  }
  toLoad: number
  itemsLoaded: [key: string, value: GLTF | THREE.Texture | THREE.CubeTexture][] = []
  totalLoaded: number
  resourcesLoaded: boolean

  constructor() {
    super()

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    }
    this.toLoad = Object.keys(this.sources).length
    this.itemsLoaded = []
    this.totalLoaded = 0
    this.resourcesLoaded = false

    this.startLoading()
  }

  startLoading() {
    console.log(this.sources)
    console.log(this.toLoad)
    console.log(Object.entries(this.sources))
    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.loaders.gltfLoader.load(source.path as string, (file) => {
            this.sourceLoaded(source, file)
          })
          break
        case 'texture':
          this.loaders.textureLoader.load(source.path as string, (file) => {
            this.sourceLoaded(source, file)
          })
          break
        case 'cubeTexture':
          this.loaders.cubeTextureLoader.load(source.path as [], (file) => {
            this.sourceLoaded(source, file)
          })
          break
      }
    }
  }

  sourceLoaded(source: Source, file: GLTF | THREE.Texture | THREE.CubeTexture) {
    this.itemsLoaded[source.name] = file

    this.totalLoaded++

    if (this.totalLoaded === this.toLoad) {
      this.dispatchEvent({
        type: 'resourcesLoaded',
      })
    }
  }

  getItem(name: string): GLTF | THREE.Texture | THREE.CubeTexture {
    return this.itemsLoaded[name]
  }
}

export default Resources
