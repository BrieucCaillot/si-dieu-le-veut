import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { KTX2Loader } from 'three/examples/jsm/loaders/KTX2Loader'

import useStore from '@/composables/useStore'
import { Source, ALL_SOURCES, SourceType } from '@/constants/SOURCES'
import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'

class Resources extends THREE.EventDispatcher {
  sources = ALL_SOURCES
  loaders: {
    gltfLoader: GLTFLoader
    textureLoader: THREE.TextureLoader
    ktx2Loader: KTX2Loader
  }
  itemsLoaded: {}
  resourcesLoaded: boolean

  constructor() {
    super()

    this.loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      ktx2Loader: new KTX2Loader(),
    }
    this.loaders.ktx2Loader.setTranscoderPath('/basis/')
    this.loaders.ktx2Loader.detectSupport(WebGL.renderer.instance)
    this.loaders.gltfLoader.setKTX2Loader(this.loaders.ktx2Loader)
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
          if (source.encoding) file.encoding = source.encoding
          if (source.wrap) file.wrapS = file.wrapT = THREE.RepeatWrapping

          if (source.type === SourceType.ktx2) {
            console.log(source)
          }

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
    return this.itemsLoaded[type].filter((item) => item.name === name).map((item) => item.file)[0]
  }
}

export default Resources
