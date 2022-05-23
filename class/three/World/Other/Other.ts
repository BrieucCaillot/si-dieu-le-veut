import gsap from 'gsap'

import OTHERS from '@/constants/OTHERS'

import Block from '@/class/three/World/Block'
import OtherIntro from '@/class/three/World/Other/OtherIntro'
import OtherIntroContext from '@/class/three/World/Other/OtherIntroContext'
import OtherTutorial from '@/class/three/World/Other/OtherTutorial'
import OtherManager from './OtherManager'

class Other {
  block: Block
  instance: OtherIntro | OtherIntroContext | OtherTutorial
  updateId: () => void

  constructor(_type: OTHERS) {
    this.block = new Block(_type)
    switch (_type) {
      case OTHERS.INTRO:
        this.instance = new OtherIntro(this)
        break
      case OTHERS.INTRO_CONTEXT:
        this.instance = new OtherIntroContext(this)
        break
      case OTHERS.TUTORIAL:
        this.instance = new OtherTutorial(this)
        break
    }
    this.updateId = this.update
  }

  start() {
    this.instance.start()
    gsap.ticker.add(this.updateId)
    OtherManager.onStarted()
  }

  end() {
    gsap.ticker.remove(this.updateId)
    OtherManager.onEnded()
  }

  update = () => {
    this.instance && this.instance.update()
  }
}

export default Other
