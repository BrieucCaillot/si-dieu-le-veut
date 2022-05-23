import GUI from 'lil-gui'
import * as THREE from 'three'

import Other from '@/class/three/World/Other/Other'
import Block from '@/class/three/World/Block'

class OtherIntro {
  other: Other
  block: Block
  animation!: { [key: string]: any }
  debugFolder: GUI

  constructor(_other: Other) {
    this.other = _other
    this.block = _other.block
  }

  setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.block.getModel().scene)
  }

  update() {
    console.log('Update OtherIntro')
  }
}

export default OtherIntro
