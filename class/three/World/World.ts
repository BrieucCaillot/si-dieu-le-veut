import * as THREE from 'three'
import { watch } from 'vue'

import ORDALIES from '@/constants/ORDALIES'
import OTHERS from '@/constants/OTHERS'
import TRANSITIONS from '@/constants/TRANSITIONS'
import useStore from '@/composables/useStore'

import Character from '@/class/three/World/Character'
import Environment from '@/class/three/World/old/Environment'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Blocks from '@/class/three/World/Blocks'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import AudioManager from '../utils/AudioManager'

class World extends THREE.EventDispatcher {
  environment: Environment

  constructor() {
    super()

    // Wait for resources
    AudioManager.setup()
    watch(useStore().resourcesLoaded, (value) => this.onResourcesLoaded())
  }

  onResourcesLoaded() {
    console.log('All Resources loaded')
    this.environment = new Environment()
    Character.setup()

    Blocks.createBlock(OTHERS.INTRO)
    Blocks.createBlock(OTHERS.INTRO_CONTEXT)
    Blocks.createBlock(OTHERS.TUTORIAL)

    OrdalieManager.create(ORDALIES.CROIX)
    TransitionManager.create(TRANSITIONS.TRANSITION_1)
    OrdalieManager.create(ORDALIES.BBQ)
    Blocks.createBlock(OTHERS.END)
  }

  onUpdate() {
    if (!useStore().resourcesLoaded.value) return
    Character.update()
  }
}

export default World
