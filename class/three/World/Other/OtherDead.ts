import GUI from 'lil-gui'
import * as THREE from 'three'
import gsap from 'gsap'

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
    this.instance.block.updatePosition(TransitionManager.getLast().block.getPosition())

    this.getMaterials()
    this.hideMaterials()
  }

  getMaterials() {
    this.allMaterials = this.instance.block.getModel().scene.children.map((child) => child.material)
    // .find((mat) => mat.name !== 'bg')

    console.log(this.allMaterials)
  }

  hideMaterials() {
    gsap.set([this.allMaterials], {
      opacity: 0,
    })
  }

  showMaterials() {
    gsap.to([this.allMaterials], {
      opacity: 1,
      duration: 2,
      stagger: 1,
    })
  }

  start() {
    OtherManager.create(OTHERS.END)

    this.showMaterials()

    setTimeout(() => this.end(), 5000)
  }

  end() {
    this.instance.end()
  }

  update() {}
}

export default OtherDead
