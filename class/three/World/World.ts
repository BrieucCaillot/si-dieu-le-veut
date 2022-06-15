import * as THREE from 'three'

import useStore from '@/composables/useStore'

import Social from '@/class/three/utils/Social'
import Blocks from '@/class/three/World/Blocks'
import AudioManager from '@/class/three/utils/AudioManager'

class World extends THREE.EventDispatcher {
  constructor() {
    super()

    AudioManager.setup()
    Social.setup()
    Blocks.setup()
  }

  onUpdate() {
    if (!useStore().resourcesLoaded.value) return
    Blocks.update()
  }
}

export default World
