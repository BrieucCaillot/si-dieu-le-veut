import GUI from 'lil-gui'
import useStore from '@/composables/useStore'

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
  private isSkipingIntro = false
  isEnded = false

  /**
   * Create default blocks
   */
  setup() {
    if (useStore().isDebugType.value) {
      this.createIsolated(useStore().debugType.value)
    } else {
      OtherManager.create(OTHERS.SPLASHSCREEN)
      OtherManager.create(OTHERS.CINEMATIC_1)
      OtherManager.create(OTHERS.CINEMATIC_2)
      OtherManager.create(OTHERS.CINEMATIC_3)
      OtherManager.create(OTHERS.TUTORIAL)
    }

    if (WebGL.debug.isActive()) {
      this.debugFolder = WebGL.debug.addFolder('Blocks')
      this.debugFolder.add(this, 'currentIndex').name('Current index').listen().disable()
      this.debugFolder.add(this.instances, 'length').name('Number of blocks').listen().disable()
      this.debugFolder.add(OrdalieManager, 'difficulty').name('Difficulty').listen().disable()
      this.debugFolder.add(this.debugParams(), 'getAll').name('Get All With Type')
      this.debugFolder.add(this.debugParams(), 'increaseDifficulty').name('🎲 Increase Difficulty')
      this.debugFolder.add(this.debugParams(), 'decreaseDifficulty').name('🎲 Decrease Difficulty')
      this.debugFolder.add(this, 'currentIndex').name('Current Blocks Index').listen().disable()
      this.debugFolder.add(OtherManager, 'currentIndex').name('Current Other Index').listen().disable()
    }
  }

  /**
   * Start blocks system
   */
  start() {
    if (this.isStarted) return
    this.isStarted = true

    useStore().isSkippingIntro.value && this.skipIntro()

    const currentType = this.getCurrent().getType() as OTHERS | ORDALIES | TRANSITIONS

    // console.log('fking current type in start ', currentType)

    if (this.isOther(currentType as OTHERS)) {
      return OtherManager.startNext()
    }
    if (this.isOrdalie(currentType as ORDALIES)) {
      return OrdalieManager.startNext()
    }
    if (this.isTransition(currentType as TRANSITIONS)) {
      return TransitionManager.startNext()
    }
  }

  /**
   * End blocks system
   */
  end() {
    console.log('🏠 END OF BLOCK SYSTEM')
    this.isEnded = true
  }

  /**
   * Skip intro and go directly to first ordalie
   */
  skipIntro() {
    if (this.isSkipingIntro) return
    this.isSkipingIntro = true

    console.log('🏠 SKIP INTRO')

    // Stop splashscreen
    OtherManager.getSplashscreen().instance.kill()
    // Create nexts blocks
    OrdalieManager.createNext()
    TransitionManager.createNext()
    // Change current index to ordalie created
    this.currentIndex = 5
    OtherManager.setCurrentIndex(4)
    this.goToNext()
  }

  /**
   * Create isolated block from type
   */
  createIsolated(_type: OTHERS | ORDALIES | TRANSITIONS) {
    if (this.isOther(_type as OTHERS)) {
      OtherManager.create(_type as OTHERS)
    }
    if (this.isOrdalie(_type as ORDALIES)) {
      OrdalieManager.create(_type as ORDALIES)
    }
    if (this.isTransition(_type as TRANSITIONS)) {
      TransitionManager.create(_type as TRANSITIONS)
    }
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
    console.log('➡️ -- CREATE NEXT')

    // IF PLAYER IS DEAD & PREVIOUS BLOCKS IS TRANSITION TYPE, CREATE DEATH BLOCK
    if (OrdalieManager.isPlayerDead && this.isTransition(this.getLast().getType() as TRANSITIONS)) {
      OtherManager.create(OTHERS.DEAD)
      OtherManager.create(OTHERS.END)
      return
    }

    // PREVENT TO CREATE BLOCK WHEN SOME BLOCKS ARE ALREADY CREATED
    // ONLY HAPPENDS ON DEBUG
    if (this.getAll().indexOf(this.getCurrent()) < this.getAll().length - 2) return

    // IF PREVIOUS BLOCK IS OTHER TUTORIAL, CREATE ORDALIE BLOCK
    if (this.getLast().getType() === OTHERS.TUTORIAL) {
      return OrdalieManager.createNext()
    }

    // PREVENT TO CREATE NEXT OTHER BLOCK AT START
    if ([OTHERS.SPLASHSCREEN, OTHERS.CINEMATIC_1, OTHERS.CINEMATIC_2, OTHERS.CINEMATIC_3, OTHERS].includes(this.getCurrent().getType() as OTHERS)) return

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

    if (this.getNext() === undefined) return console.log('🤡 No next block')
    if ([OTHERS.END].includes(this.getNext().getType() as OTHERS)) return this.end() // END OF BLOCK SYSTEM

    let nextPosX = null
    if (this.isSkipingIntro) {
      nextPosX = this.getCurrent().getCenter().x
    } else {
      nextPosX = this.getNext().getCenter().x
      this.createNext()
    }

    WebGL.camera.setPositionX({
      x: nextPosX,
      onComplete: () => {
        const currentType = this.getCurrent().getType()

        this.isSkipingIntro = false

        if (currentType === OTHERS.SPLASHSCREEN) return OtherManager.startNext()

        // // IF NEXT BLOCK IS AN OTHER, START NEXT OTHER
        if (this.isOther(currentType as OTHERS)) return OtherManager.startNext()
        // // IF NEXT BLOCK IS AN ORDALIE, START NEXT ORDALIE
        if (this.isOrdalie(currentType as ORDALIES)) return OrdalieManager.startNext()
        // // IF NEXT BLOCK IS A TRANSITION, START NEXT TRANSITION
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
        console.log('Transitions ' + console.log(TransitionManager.getAll()))
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
