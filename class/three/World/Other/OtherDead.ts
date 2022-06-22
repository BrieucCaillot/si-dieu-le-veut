import GUI from 'lil-gui'
import * as THREE from 'three'

import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import Other from '@/class/three/World/Other/Other'
import AudioManager from '@/class/three/utils/AudioManager'

class OtherDead {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI
  allMaterials: THREE.Material[]
  text: THREE.Mesh
  metre: THREE.Mesh

  constructor(_other: Other) {
    this.instance = _other

    // Update position to last transition to overlap it
    this.instance.block.getModel().scene.visible = false
    this.moveBehindTransition()

    this.text = this.instance.block.getModel().scene.children.find((mesh: THREE.Mesh) => mesh.name === 'texte')
    this.metre = this.instance.block.getModel().scene.children.find((mesh: THREE.Mesh) => mesh.name === 'metre')
  }

  start() {
    AudioManager.play('gameover')
    this.instance.block.moveDefault()
    setTimeout(() => this.end(), 8000)
  }

  moveBehindTransition() {
    if (!TransitionManager.getLast()?.block.getPosition()) return
    const { x, y } = TransitionManager.getLast()?.block.getPosition()
    this.instance.block.moveFarBehind()
    this.instance.block.updatePosition(new THREE.Vector3(x, y, 0.202))

    this.instance.block.getModel().scene.visible = true
  }

  end() {
    this.instance.end()
  }

  update() {}
}

export default OtherDead
