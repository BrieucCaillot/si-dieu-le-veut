import gsap from 'gsap'

import ORDALIES from '@/constants/ORDALIES'

import Block from '@/class/three/World/Block'
import OrdalieCroix from '@/class/three/World/Ordalie/OrdalieCroix'
import OrdalieBBQ from '@/class/three/World/Ordalie/OrdalieBBQ'
import OrdalieCauldron from '@/class/three/World/Ordalie/OrdalieCauldron'

class Ordalie {
  block: Block
  instance: OrdalieCroix | OrdalieBBQ | OrdalieCauldron
  updateId: () => void

  constructor(_type: ORDALIES) {
    this.block = new Block(_type)
    switch (_type) {
      case ORDALIES.CROIX:
        this.instance = new OrdalieCroix(this)
        break
      case ORDALIES.BBQ:
        this.instance = new OrdalieBBQ(this)
        break
      case ORDALIES.CAULDRON:
        this.instance = new OrdalieCauldron(this)
        break
    }
    this.updateId = this.update
    this.start()
  }

  start() {
    gsap.ticker.add(this.updateId)
  }

  end() {
    gsap.ticker.remove(this.updateId)
  }

  update = () => {
    this.instance && this.instance.update()
  }
}

export default Ordalie
