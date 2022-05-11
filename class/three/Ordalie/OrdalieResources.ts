import * as THREE from 'three'
import { GLTF, GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import { Source } from '@/constants/SOURCES'
import { ORDALIES } from '@/constants/ORDALIES'
import { ORDALIE_SOURCES } from '@/constants/SOURCES'

import WebGL from '@/class/three/WebGL'

class OrdalieResources extends THREE.EventDispatcher {
  gltfLoader: GLTFLoader
  textureLoader: THREE.TextureLoader
  cubeTextureLoader: THREE.CubeTextureLoader

  toLoad: number
  itemsLoaded: [key: string, value: GLTF | THREE.Texture | THREE.CubeTexture][] = []
  totalLoaded: number
  resourcesLoaded: boolean

  type: ORDALIES | string
  sources: Source[]

  constructor({ _type = '' }: { _type: ORDALIES | string }) {
    super()

    const { gltfLoader, textureLoader, cubeTextureLoader } = WebGL.resources.loaders

    this.gltfLoader = gltfLoader
    this.textureLoader = textureLoader
    this.cubeTextureLoader = cubeTextureLoader

    this.type = _type

    this.sources = ORDALIE_SOURCES[this.type]
    this.itemsLoaded = []
    this.totalLoaded = 0
    this.resourcesLoaded = false

    this.loadResources()
  }

  loadResources() {
    this.toLoad = this.sources.length

    // Load each source
    for (const source of this.sources) {
      switch (source.type) {
        case 'gltfModel':
          this.gltfLoader.load(source.path as string, (file) => {
            this.sourceLoaded(source, file)
          })
          break
        case 'texture':
          this.textureLoader.load(source.path as string, (file) => {
            this.sourceLoaded(source, file)
          })
          break
        case 'cubeTexture':
          this.cubeTextureLoader.load(source.path as [], (file) => {
            this.sourceLoaded(source, file)
          })
          break
      }
    }
  }

  sourceLoaded(source: Source, file: GLTF | THREE.Texture | THREE.CubeTexture) {
    this.itemsLoaded[source.name] = file

    this.totalLoaded++

    if (this.totalLoaded === this.toLoad)
      this.dispatchEvent({
        type: 'ordalieResourcesLoaded',
      })
  }
}

export default OrdalieResources
