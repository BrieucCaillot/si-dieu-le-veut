import * as THREE from 'three'
import { watch } from 'vue'

import ORDALIES from '@/constants/ORDALIES'
import OTHERS from '@/constants/OTHERS'
import TRANSITIONS from '@/constants/TRANSITIONS'
import useStore from '@/composables/useStore'

import Character from '@/class/three/World/Character'
import Environment from '@/class/three/World/old/Environment'
import Croix from '@/class/three/World/Croix'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Block from '@/class/three/World/Block'
import Blocks from '@/class/three/World/Blocks'
import TransitionManager from './Transition/TransitionManager'
import AudioManager from '../utils/AudioManager'

class World extends THREE.EventDispatcher {
  character: Character
  environment: Environment

  croix: Croix

  constructor() {
    super()

    // Wait for resources
    AudioManager.setup()
    watch(useStore().resourcesLoaded, (value) => this.onResourcesLoaded())
  }

  onResourcesLoaded() {
    console.log('All Resources loaded')
    this.environment = new Environment()

    Blocks.createBlock(OTHERS.INTRO)
    Blocks.createBlock(OTHERS.DIDACTICIEL)

    OrdalieManager.create(ORDALIES.ORDALIES_1)
    TransitionManager.create(TRANSITIONS.TRANSITION_1)

    // this.croix = new Croix()
  }

  onUpdate() {
    if (!useStore().resourcesLoaded.value) return

    // this.croix.update()
    // this.character.update()
  }
}

export default World
