import GUI from 'lil-gui'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'
import OtherManager from '@/class/three/World/Other/OtherManager'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'

class Blocks {
  private instances: Block[] = []
  private width: number = 0
  private currentInstance: Block
  private debugFolder: GUI

  /**
   * Create default blocks
   */
  setup() {
    OtherManager.create(OTHERS.INTRO)
    OtherManager.create(OTHERS.INTRO_CONTEXT)
    OtherManager.create(OTHERS.TUTORIAL)

    OrdalieManager.create(ORDALIES.CROIX)
    // this.setCurrent(this.instances[1])

    if (WebGL.debug.active) {
      this.debugFolder = WebGL.debug.gui.addFolder('Blocks')
      this.debugFolder.add(this.debugParams(), 'getAll').name('Get All With Type')
      this.debugFolder.add(this.debugParams(), 'createNext').name('Create Next')
      this.debugFolder.add(this.debugParams(), 'createOrdalieCroix').name('Create Ordalie Croix')
      this.debugFolder.add(this.debugParams(), 'createOrdalieBBQ').name('Create Ordalie BBQ')
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
    return this.instances
  }

  /**
   * Get block from index
   */
  getFromIndex(index: number) {
    return this.instances[index]
  }

  /**
   * Get last block
   */
  getLast() {
    return this.instances[this.instances.length - 1]
  }

  /**
   * Get width witl all blocks
   */
  getWidth() {
    return this.width
  }

  /**
   * Get Set current instance in view
   */
  getCurrent() {
    return this.currentInstance
  }

  /**
   * Set current instance in view
   */
  setCurrent(block: Block) {
    this.currentInstance = block
  }

  /**
   * On Block created
   */
  onCreated(block: Block) {
    this.width += block.getSize().x
    this.instances.push(block)
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

  goToNext() {}

  /**
   * Update
   */
  update() {
    if (!this.instances.length) return
    // if (WebGL.camera.getPosition().x >= this.currentInstance.getCenter().x) {
    // console.log(this.currentInstance.getType())
    // }
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
      createOrdalieCroix: () => {
        OrdalieManager.create(ORDALIES.CROIX)
      },
      createOrdalieBBQ: () => {
        OrdalieManager.create(ORDALIES.BBQ)
      },
      createNext: () => this.createNext(),
    }
  }
}

export default new Blocks()
