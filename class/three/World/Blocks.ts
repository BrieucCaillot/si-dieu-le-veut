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
  private isStarted = false

  /**
   * Create default blocks
   */
  setup() {
    // OtherManager.create(OTHERS.SPLASHSCREEN)
    // OtherManager.create(OTHERS.CINEMATIC)
    // OtherManager.create(OTHERS.TUTORIAL)

    OrdalieManager.create(ORDALIES.BBQ)

    if (WebGL.debug.isActive()) {
      this.debugFolder = WebGL.debug.addFolder('Blocks')
      this.debugFolder.add(this, 'currentIndex').name('Current index').listen().disable()
      this.debugFolder.add(this.instances, 'length').name('Number of blocks').listen().disable()
      this.debugFolder.add(OrdalieManager, 'difficulty').name('Difficulty').listen().disable()
      this.debugFolder.add(this.debugParams(), 'getAll').name('Get All With Type')
      this.debugFolder.add(this.debugParams(), 'increaseDifficulty').name('🎲 Increase Difficulty')
      this.debugFolder.add(this.debugParams(), 'decreaseDifficulty').name('🎲 Decrease Difficulty')
      this.debugFolder.add(this.debugParams(), 'createNext').name('Create Next')
    }

    // Start
    document.addEventListener('keydown', (e) => useStore().showLoader.value === false && e.code === 'Space' && this.start())
  }

  /**
   * Start blocks system
   */
  start() {
    if (this.isStarted) return

    this.isStarted = true
    const currentType = this.getCurrent().getType() as OTHERS | ORDALIES

    if (this.isOther(currentType as OTHERS)) {
      return OtherManager.startFirst()
    }
    if (this.isOrdalie(currentType as ORDALIES)) {
      return OrdalieManager.startFirst()
    }
  }

  /**
   * End blocks system
   */
  end() {
    OtherManager.create(OTHERS.END)
    console.log('☠️ Player is dead ' + OrdalieManager.isPlayerDead)
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
    if (Object.values(OTHERS).includes(this.getCurrent().getType() as OTHERS)) return

    console.log('➡️ -- CREATED NEXT')

    // IF PREVIOUS BLOCK IS ORDALIE, CREATE TRANSITION
    if (this.isOrdalie(this.getLast().getType() as ORDALIES)) {
      return TransitionManager.createNext()
    }
    // IF PREVIOUS BLOCK IS TRANSITION, CREATE ORDALIE
    if (this.isTransition(this.getLast().getType() as TRANSITIONS)) {
      return OrdalieManager.createNext()
    }
  }

  /**
   * Go to next block
   */
  private goToNext() {
    console.log('➡️ -- GO TO NEXT')

    if (OrdalieManager.isPlayerDead) return this.end()
    if (this.getNext() === undefined) return console.log('🤡 No next block')

    const nextPosX = this.getNext().getCenter().x

    WebGL.camera.setPositionX({
      x: nextPosX,
      onStart: () => {
        this.createNext()
      },
      onComplete: () => {
        const currentType = this.getCurrent().getType()
        if (currentType === OTHERS.SPLASHSCREEN) return OtherManager.startNext()
        // // IF NEXT BLOCK IS AN OTHER
        // START NEXT OTHER
        if (this.isOther(currentType as OTHERS)) return OtherManager.startNext()

        // if (OrdalieManager.isPlayerDead) {
        //   console.log('Player is dead')
        //   this.end()
        // }

        // // IF NEXT BLOCK IS AN ORDALIE
        // START NEXT ORDALIE
        if (this.isOrdalie(currentType as ORDALIES)) return OrdalieManager.startNext()
        // // IF NEXT BLOCK IS A TRANSITION
        // START NEXT TRANSITION
        if (this.isTransition(currentType as TRANSITIONS)) return TransitionManager.startNext()
      },
    })
  }

  /**
   * Debug
   *
   */
  private debugParams() {
    return {
      getAll: () => {
        console.log(this.getAll())
        console.log(this.getAll().map((block) => block.getType()))
        console.log('Ordalies' + console.log(OrdalieManager.getAll()))
        console.log('Others ' + console.log(OtherManager.getAll()))
      },
      increaseDifficulty: () => OrdalieManager.increaseDifficulty(),
      decreaseDifficulty: () => OrdalieManager.decreaseDifficulty(),
      createNext: () => this.createNext(),
      goToNext: () => this.goToNext(),
    }
  }

  /**
   * Update
   */
  update() {
    if (!this.instances.length) return
  }

  isOther(type: OTHERS) {
    return Object.values(OTHERS).includes(type)
  }

  isOrdalie(type: ORDALIES) {
    return Object.values(ORDALIES).includes(type)
  }

  isTransition(type: TRANSITIONS) {
    return Object.values(TRANSITIONS).includes(type)
  }
}

export default new Blocks()
