import gsap from 'gsap'

import OTHERS from '@/constants/OTHERS'

import Block from '@/class/three/World/Block'
import OtherManager from '@/class/three/World/Other/OtherManager'
import OtherSplashscreen from '@/class/three/World/Other/OtherSplashscreen'
import OtherCinematic from '@/class/three/World/Other/OtherCinematic'
import OtherTutorial from '@/class/three/World/Other/OtherTutorial'
import OtherDead from '@/class/three/World/Other/OtherDead'
import OtherEnd from '@/class/three/World/Other/OtherEnd'

class Other {
  block: Block
  instance: OtherSplashscreen | OtherCinematic | OtherTutorial | OtherEnd
  updateId: () => void
  isEnded = false
  isSplashscreen = false

  constructor(_type: OTHERS) {
    this.block = new Block(_type)
    switch (_type) {
      case OTHERS.SPLASHSCREEN:
        this.instance = new OtherSplashscreen(this)
        break
      case OTHERS.CINEMATIC_1:
        this.instance = new OtherCinematic(this)
        break
      case OTHERS.CINEMATIC_2:
        this.instance = new OtherCinematic(this)
        break
      case OTHERS.CINEMATIC_3:
        this.instance = new OtherCinematic(this)
        break
      case OTHERS.TUTORIAL:
        this.instance = new OtherTutorial(this)
        break
      case OTHERS.END:
        this.instance = new OtherEnd(this)
        break
      case OTHERS.DEAD:
        this.instance = new OtherDead(this)
        break
    }
    this.updateId = this.update
    this.isSplashscreen = [OTHERS.SPLASHSCREEN].includes(_type)

    // Show behind for all except dead
    if ([OTHERS.DEAD].includes(_type)) return
    this.block.showBehind()
  }

  start() {
    this.instance.start()
    OtherManager.onStarted()

    // Add update only if we are on Splashscreen
    if (this.isSplashscreen) {
      gsap.ticker.add(this.updateId)
    } else {
      // Prevent to add event on Splashscreen
      document.addEventListener('keydown', this.onSpacePressed)
    }
  }

  end() {
    // Prevent to call it twice with SpacePressed
    if (this.isEnded) return
    this.isEnded = true

    OtherManager.onEnded()
    if (this.isSplashscreen) return
    document.removeEventListener('keydown', this.onSpacePressed)
  }

  update = () => {
    this.instance && this.instance.update()
    console.log(`🔁 ${this.block.getType()}`)
  }

  onSpacePressed = (e: KeyboardEvent) => {
    // Prevent to skip when key pressed is not Space or user is on the splashscreen
    if (e.code !== 'Space') return

    if (![OTHERS.DEAD, OTHERS.END].includes(this.block.getType() as OTHERS)) {
      // Play animation for the next others
      OtherManager.getSplashscreen().instance.playAnimFromOther(this.block.getType() as OTHERS)
    }

    this.end()
  }
}

export default Other
