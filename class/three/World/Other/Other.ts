import gsap from 'gsap'

import OTHERS from '@/constants/OTHERS'

import Blocks from '@/class/three/World/Blocks'
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
  }

  start() {
    this.instance.start()
    gsap.ticker.add(this.updateId)
    OtherManager.onStarted()

    document.addEventListener('keydown', this.onSpacePressed)
  }

  end() {
    if (this.isEnded) return
    this.isEnded = true
    gsap.ticker.remove(this.updateId)
    OtherManager.onEnded()
    document.removeEventListener('keydown', this.onSpacePressed)
  }

  update = () => {
    this.instance && this.instance.update()
    console.log(`🔁 ${this.block.getType()}`)
  }

  onSpacePressed = (e: KeyboardEvent) => {
    if (e.code !== 'Space') return
    // if (Blocks.isOther(this.block.getType() as OTHERS)) Blocks.setCurrentIsFirstOrdalie()
    this.end()
  }
}

export default Other
