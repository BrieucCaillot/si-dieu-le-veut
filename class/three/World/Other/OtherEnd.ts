import GUI from 'lil-gui'
import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import Other from '@/class/three/World/Other/Other'
import Block from '@/class/three/World/Block'

class OtherEnd {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI

  constructor(_other: Other) {
    this.instance = _other

    // if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('Other Transition')
  }

  start() {
    console.log('Started OtherEnd')
  }

  end() {
    this.instance.end()
  }

  update() {
    console.log('Update OtherEnd')
  }
}

export default OtherEnd
