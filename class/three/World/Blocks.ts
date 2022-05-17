import Block from '@/class/three/World/Block'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

class Blocks {
  private blocksInstances: Block[] = []
  private blocksWidth: number = 0

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

  public getBlocksWidth() {
    return this.blocksWidth
  }

  public getBlocksMaxWidth() {
    return this.blocksWidth - this.getLastBlock().getSize().x
  }

  public getLastBlock() {
    return this.blocksInstances[this.blocksInstances.length - 1]
  }

  public getBlockPlaneText(_index: number) {
    return {
      mesh: this.getBlockInstance(_index).getPlaneText(),
      box: this.getBlockInstance(_index).getPlaneTextBox(),
    }
  }

  public onBlockCreated(block: Block) {
    this.blocksWidth += block.getSize().x
    this.blocksInstances.push(block)
  }
}

export default new Blocks()
