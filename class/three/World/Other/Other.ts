import OTHERS from '@/constants/OTHERS'

import Block from '@/class/three/World/Block'
import OtherIntro from '@/class/three/World/Other/OtherIntro'
import OtherIntroContext from '@/class/three/World/Other/OtherIntroContext'

class Other {
  block: Block
  other: OtherIntro | OtherIntroContext

  constructor(_type: OTHERS) {
    this.block = new Block(_type)
    switch (_type) {
      case OTHERS.INTRO:
        this.other = new OtherIntro(this)
        break
      case OTHERS.INTRO_CONTEXT:
        this.other = new OtherIntroContext(this)
        break
    }
  }
}

export default Other
