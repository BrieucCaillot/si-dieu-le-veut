import * as THREE from 'three'
import { watch } from 'vue'

import ORDALIES from '@/constants/ORDALIES'
import useStore from '@/composables/useStore'

import WebGL from '@/class/three/WebGL'
import Character from '@/class/three/World/Character'
import Croix from '@/class/three/World/Croix'

class World extends THREE.EventDispatcher {
  character: Character
  croix: Croix

  constructor() {
    super()

    // Wait for resources
    watch(useStore().resourcesLoaded, (value) => this.onResourcesLoaded())
  }

  onResourcesLoaded() {
    console.log('All Resources loaded')
    const items = WebGL.resources.getItems(ORDALIES.ORDALIES_1, 'model')
    // console.log('Example to load a resource ', items)
    // OrdalieManager.createOrdalie(ORDALIES.ORDALIES_1)

    this.croix = new Croix()
  }

  onUpdate() {
    if (!useStore().resourcesLoaded.value) return

    this.croix.update()
    // this.character.update()
  }
}

export default World
