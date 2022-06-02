import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'

import useStore from '@/composables/useStore'
import { Source, ALL_SOURCES, SourceType } from '@/constants/SOURCES'
import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

class Resources extends THREE.EventDispatcher {
  sources = ALL_SOURCES
  loaders: {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader
    cubeTextureLoader: THREE.CubeTextureLoader
  }
  itemsLoaded: {}
  resourcesLoaded: boolean

  constructor() {
    super()

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
    }
    this.itemsLoaded = {}

    this.startLoading()
  }

  async startLoading() {
    const promises = []

    for (const key of Object.keys(this.sources)) {
      promises.push(this.loadItems({ key, sources: this.sources[key] }))
    }

    Promise.all(promises).then((values) => {
      values.forEach((value) => (this.itemsLoaded[value.type] = value.assets))
      useStore().resourcesLoaded.value = true
    })
  }

  async loadItems({ key, sources }: { key: keyof OTHERS | ORDALIES | TRANSITIONS; sources: Source[] }) {
    return new Promise((resolve, reject) => {
      const itemsToLoad = sources.length
      let numberOfItemsLoaded = 0
      const itemsLoaded = {
        type: key,
        assets: [],
      }

      // Load each source
      for (const source of sources) {
        this.loaders[source.type].load(source.path as string, (file) => {
          if (source.type === SourceType.texture) {
            file.encoding = THREE.sRGBEncoding
            file.wrapS = file.wrapT = THREE.RepeatWrapping
          }
          // if (source.type === )
          itemsLoaded.assets.push({
            name: source.name,
            file,
          })
          numberOfItemsLoaded++
          if (itemsToLoad === numberOfItemsLoaded) {
            resolve(itemsLoaded)
          }
        })
      }
    })
  }

  getItems(type: OTHERS | ORDALIES | TRANSITIONS | 'COMMON', name: string) {
    // console.log(this.itemsLoaded['COMMON'].filter((item) => item.name === 'dust').map((item) => item.file))
    return this.itemsLoaded[type].filter((item) => item.name === name).map((item) => item.file)[0]
  }
}

export default Resources
