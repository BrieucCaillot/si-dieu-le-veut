import GUI from 'lil-gui'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Transition from '@/class/three/World/Transition/Transition'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'

class Blocks {
  private blocksInstances: Block[] = []
  private blocksWidth: number = 0
  private debugFolder: GUI

  /**
   * Create default blocks
   */
  setup() {
    this.create(OTHERS.INTRO)
    // this.create(OTHERS.INTRO_CONTEXT)
    // this.create(OTHERS.TUTORIAL)

    OrdalieManager.create(ORDALIES.CROIX)

    if (WebGL.debug.active) {
      this.debugFolder = WebGL.debug.gui.addFolder('Blocks')
      this.debugFolder.add(this.debugParams(), 'getAll').name('Get All With Type')
      this.debugFolder.add(this.debugParams(), 'createNext').name('Create Next')
    }
  }

  /**
   * Create block from type
   */
  create(_type: OTHERS | ORDALIES | TRANSITIONS) {
    return new Block(_type)
  }

  /**
   * Get all blocks
   */
  getAll() {
    return this.blocksInstances
  }

  /**
   * Get block from index
   */
  getFromIndex(index: number) {
    return this.blocksInstances[index]
  }

  /**
   * Get last block
   */
  getLast() {
    return this.blocksInstances[this.blocksInstances.length - 1]
  }

  /**
   * Get width witl all blocks
   */
  getWidth() {
    return this.blocksWidth
  }

  /**
   * On Block created
   */
  onCreated(block: Block) {
    this.blocksWidth += block.getSize().x
    this.blocksInstances.push(block)
  }

  /**
   * Create block from latest block created
   */
  createNext() {
    // IF PREVIOUS BLOCK IS ORDALIE, CREATE TRANSITION
    if (Object.values(ORDALIES).includes(this.getLast().getType() as ORDALIES)) {
      return TransitionManager.createNext()
    }
    // IF PREVIOUS BLOCK IS TRANSITION, CREATE ORDALIE
    if (Object.values(TRANSITIONS).includes(this.getLast().getType() as TRANSITIONS)) {
      return OrdalieManager.createNext()
    }
  }

  /**
   * Debug params
   */
  private debugParams() {
    return {
      getAll: () => {
        console.log(this.getAll())
        console.log(this.getAll().map((block) => block.getType()))
      },
      createNext: () => this.createNext(),
    }
  }
}

export default new Blocks()
