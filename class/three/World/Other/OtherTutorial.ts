import GUI from 'lil-gui'

import OtherManager from '@/class/three/World/Other/OtherManager'
import Other from '@/class/three/World/Other/Other'

class OtherTutorial {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI

  constructor(_other: Other) {
    this.instance = _other
  }

  start() {
    this.instance.block.moveBehind()
  }

  end() {
    this.instance.block.moveDefault()
    this.instance.end()
  }

  update() {}
}

export default OtherTutorial
