import GUI from 'lil-gui'
import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import Other from '@/class/three/World/Other/Other'
import Block from '@/class/three/World/Block'

class OtherCinematic {
  instance: Other
  debugFolder: GUI

  constructor(_other: Other) {
    this.instance = _other

    // if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.gui.addFolder('Other Intro Context')
  }

  start() {
    this.playVideo()
  }

  end() {
    this.instance.end()
  }

  private playVideo() {
    // TODO: Play video
    setTimeout(() => {
      console.log('📹 VIDEO PLAYED')
      this.end()
    }, 5000)
  }

  update() {
    console.log('🔁 OtherCinematic')
  }
}

export default OtherCinematic
