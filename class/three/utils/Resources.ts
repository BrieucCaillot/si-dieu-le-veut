import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Source, commonSources } from '@/constants/SOURCES'

class Resources extends THREE.EventDispatcher {
  sources: Source[] = commonSources
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
    this.toLoad = this.sources.length
    this.itemsLoaded = []
    this.totalLoaded = 0
    this.resourcesLoaded = false

    this.startLoading()
  }

  startLoading() {
    // Load each source
    for (const source of commonSources) {
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
