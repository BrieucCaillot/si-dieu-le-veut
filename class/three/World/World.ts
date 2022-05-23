import * as THREE from 'three'
import { watch } from 'vue'

import useStore from '@/composables/useStore'

import Environment from '@/class/three/World/old/Environment'
import Blocks from '@/class/three/World/Blocks'
import AudioManager from '@/class/three/utils/AudioManager'
import Character from '@/class/three/World/Character'

class World extends THREE.EventDispatcher {
  environment: Environment

  constructor() {
    super()

    // Wait for resources
    watch(useStore().resourcesLoaded, (value) => this.onResourcesLoaded())
  }

  onResourcesLoaded() {
    console.log('All Resources loaded')
    this.environment = new Environment()

    AudioManager.setup()
    Blocks.setup()
  }

  onUpdate() {
    if (!useStore().resourcesLoaded.value) return
    Blocks.update()
  }
}

export default World
