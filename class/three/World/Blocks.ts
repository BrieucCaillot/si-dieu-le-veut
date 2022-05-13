import Block from '@/class/three/World/Block'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

class Blocks {
  private blocksInstances: Block[] = []

  constructor() {}

  createBlock(_type: OTHERS | ORDALIES | TRANSITIONS) {
    new Block(_type)
  }

  public getBlockInstances() {
    return this.blocksInstances
  }

  public getBlockInstance(index: number) {
    return this.blocksInstances[index]
  }

  public getLastBlockInstance() {
    return this.blocksInstances[this.blocksInstances.length - 1]
  }

  public onBlockCreated(block: Block) {
    this.blocksInstances.push(block)
    console.log(this.blocksInstances)
  }
}

export default new Blocks()
