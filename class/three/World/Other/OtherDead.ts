import GUI from 'lil-gui'
import * as THREE from 'three'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Block from '@/class/three/World/Block'
import Other from '@/class/three/World/Other/Other'

class OtherDead {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI
  allMaterials: THREE.Material[]

  constructor(_other: Other) {
    this.instance = _other

    this.getMaterials()
    this.hideMaterials()
  }

  getMaterials() {
    this.allMaterials = this.instance.block
      .getModel()
      .scene.children.filter((child) => child.name.includes('decor'))
      .map((child) => child.material)
  }

  hideMaterials() {
    console.log('Hide materials')
    gsap.set([this.allMaterials], {
      opacity: 0,
    })
  }

  showMaterials() {
    console.log('Show materials')

    gsap.set([this.allMaterials], {
      opacity: 1,
      duration: 0.5,
      stagger: 0.1,
    })
  }

  start() {
    console.log('Start OtherDead')
    this.showMaterials()
  }

  end() {
    this.instance.end()
  }

  update() {
    console.log('Update OtherEnd')
  }
}

export default OtherDead
