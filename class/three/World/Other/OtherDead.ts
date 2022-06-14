import GUI from 'lil-gui'
import * as THREE from 'three'

import OTHERS from '@/constants/OTHERS'

import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import OtherManager from '@/class/three/World/Other/OtherManager'
import Other from '@/class/three/World/Other/Other'

class OtherDead {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI
  allMaterials: THREE.Material[]

  constructor(_other: Other) {
    this.instance = _other

    // Update position to last transition to overlap it
    const lastBlockPosition = TransitionManager.getLast().block.getPosition()
    this.instance.block.updatePosition(new THREE.Vector3(lastBlockPosition.x, lastBlockPosition.y, lastBlockPosition.z - 0.4))
  }

  start() {
    setTimeout(() => this.end(), 8000)
  }

  end() {
    this.instance.end()
  }

  update() {}
}

export default OtherDead
