import gsap from 'gsap'

import ORDALIES from '@/constants/ORDALIES'

import Block from '@/class/three/World/Block'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import OrdalieCroix from '@/class/three/World/Ordalie/OrdalieCroix'
import OrdalieBBQ from '@/class/three/World/Ordalie/OrdalieBBQ'
import OrdalieFood from '@/class/three/World/Ordalie/OrdalieFood'
import OrdalieCauldron from '@/class/three/World/Ordalie/OrdalieCauldron'

class Ordalie {
  block: Block
  instance: OrdalieCroix | OrdalieBBQ | OrdalieFood | OrdalieCauldron
  updateId: () => void

  constructor(_type: ORDALIES) {
    this.block = new Block(_type)
    this.block.toggleCharacter(false)

    switch (_type) {
      case ORDALIES.CROIX:
        this.instance = new OrdalieCroix(this)
        break
      case ORDALIES.BBQ:
        this.instance = new OrdalieBBQ(this)
        break
      case ORDALIES.FOOD:
        this.instance = new OrdalieFood(this)
        break
      // case ORDALIES.CAULDRON:
      //   this.instance = new OrdalieCauldron(this)
      //   break
    }
    this.updateId = this.update
  }

  start() {
    this.instance.start()
    gsap.ticker.add(this.updateId)
    OrdalieManager.onStarted()
    this.block.toggleCharacter(true)
  }

  end() {
    gsap.ticker.remove(this.updateId)
    OrdalieManager.onEnded()
    if (OrdalieManager.isPlayerDead) return
    this.block.toggleCharacter(false)
  }

  update = () => {
    this.instance && this.instance.update()
    console.log(`🔁 ${this.block.getType()}`)
  }
}

export default Ordalie
