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
  private currentIndex = 0
  private debugFolder: GUI

  /**
   * Create default blocks
   */
  setup() {
    OtherManager.create(OTHERS.INTRO)
    OtherManager.create(OTHERS.INTRO_CONTEXT)
    OtherManager.create(OTHERS.TUTORIAL)

    OrdalieManager.create(ORDALIES.CROIX)

    if (WebGL.debug.active) {
      this.debugFolder = WebGL.debug.gui.addFolder('Blocks')
      this.debugFolder.add(this.debugParams(), 'getCurrentIndex').name('Current index')
      this.debugFolder.add(this.debugParams(), 'start').name('Start')
      this.debugFolder.add(this.debugParams(), 'getAll').name('Get All With Type')
      this.debugFolder.add(this.debugParams(), 'createNext').name('Create Next')
      this.debugFolder.add(this.debugParams(), 'createOrdalieCroix').name('Create Ordalie Croix')
      this.debugFolder.add(this.debugParams(), 'createOrdalieBBQ').name('Create Ordalie BBQ')
      this.debugFolder.add(this.debugParams(), 'goToNext').name('Go To Next')
    }
  }

  /**
   * Start blocks system
   */
  start() {
    // this.goToNext()
    OtherManager.startFirst()
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
  getByIndex(index: number) {
    return this.instances[index]
  }

  /**
   * Get current block instance in view
   */
  getCurrent() {
    return this.instances[this.currentIndex]
  }

  /**
   * Get next block to show
   */
  getNext() {
    return this.instances[this.currentIndex + 1]
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
   * On Block created
   */
  onCreated(block: Block) {
    this.width += block.getSize().x
    this.instances.push(block)
  }

  /**
   * On Block Started
   */
  onStarted() {
    console.log('🏠 ON STARTED')
  }

  /**
   * On Block Ended
   */
  onEnded() {
    console.log('🏠 ON ENDED')
    this.goToNext()
    this.currentIndex++
  }

  /**
   * Create block from latest block created
   */
  private createNext() {
    // IF PREVIOUS BLOCK IS ORDALIE, CREATE TRANSITION
    if (this.isOrdalie(this.getLast())) {
      return TransitionManager.createNext()
    }
    // IF PREVIOUS BLOCK IS TRANSITION, CREATE ORDALIE
    if (this.isTransition(this.getLast())) {
      return OrdalieManager.createNext()
    }
  }

  /**
   * Go to next block
   */
  private goToNext() {
    console.log('➡️ -- GO TO NEXT')

    if (this.getCurrent().getType() === OTHERS.INTRO) return OtherManager.startNext()
    if (this.getNext().getType() === ORDALIES.CROIX) return console.log('⭕ TODO FOR ORDALIES')

    const nextPosX = this.getNext().getCenter().x

    WebGL.camera.setPositionX(nextPosX, () => {
      // IF NEXT BLOCK IS ORDALIE,
      // START FROM ORDALIE MANAGER
      // if (this.isOrdalie(this.getNext())) {
      //   console.log('--- TODO ---')
      //   console.log('--- GO TO ORDALIE MANAGER ---')
      //   return
      //   // return OrdalieManager.startNext()
      // } else
      if (this.isOther(this.getCurrent())) {
        return OtherManager.startNext()
      }

      // // IF PREVIOUS BLOCK IS ORDALIE, GO TO TRANSITION
      // if (this.isOrdalie(this.getNext())) {
      //   console.log('-- Go to next transition')
      //   // return TransitionManager.goToNext()
      // }
      // // IF PREVIOUS BLOCK IS TRANSITION, CREATE ORDALIE
      // if (this.isTransition(this.getNext())) {
      //   console.log('-- Go to next ordalie')
      //   // return OrdalieManager.goToNext()
      // }
    })
  }

  /**
   * Update
   */
  update() {
    if (!this.instances.length) return
  }

  /**
   * Debug params
   */
  private debugParams() {
    return {
      getCurrentIndex: () => console.log(this.currentIndex),
      start: () => this.start(),
      getAll: () => {
        console.log(this.getAll())
        console.log(this.getAll().map((block) => block.getType()))
        console.log('Others ' + console.log(OtherManager.getAll()))
      },
      createOrdalieCroix: () => {
        OrdalieManager.create(ORDALIES.CROIX)
      },
      createOrdalieBBQ: () => {
        OrdalieManager.create(ORDALIES.BBQ)
      },
      createNext: () => this.createNext(),
      goToNext: () => this.goToNext(),
    }
  }

  private isOther(block: Block) {
    return Object.values(OTHERS).includes(block.getType() as OTHERS)
  }

  private isOrdalie(block: Block) {
    return Object.values(ORDALIES).includes(block.getType() as ORDALIES)
  }

  private isTransition(block: Block) {
    return Object.values(TRANSITIONS).includes(block.getType() as TRANSITIONS)
  }
}

export default new Blocks()
