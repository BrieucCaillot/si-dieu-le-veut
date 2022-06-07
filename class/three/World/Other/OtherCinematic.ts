import * as THREE from 'three'
import GUI from 'lil-gui'

import OTHERS from '@/constants/OTHERS'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import Other from '@/class/three/World/Other/Other'

class OtherCinematic {
  private instance: Other
  private type: OTHERS
  private videoMesh
  private debugFolder: GUI

  private cinematicVideo?: HTMLVideoElement

  constructor(_other: Other) {
    this.instance = _other
    this.type = this.instance.block.getType() as OTHERS

    this.type === OTHERS.CINEMATIC_2 && this.setVideo()
  }

  start() {
    switch (this.type) {
      case OTHERS.CINEMATIC_1:
        this.delayEnd()
        break
      case OTHERS.CINEMATIC_2:
        // this.playVideo()
        this.delayEnd()
        break
      case OTHERS.CINEMATIC_3:
        this.delayEnd()
        break
    }
  }

  end() {
    this.instance.end()
  }

  private delayEnd() {
    setTimeout(() => {
      if (WebGL.camera.getIsMoving()) return
      console.log('CALLING EEEND')
      this.end()
    }, 6000)
  }

  private setVideo() {
    this.cinematicVideo = document.querySelector('#cinematic-video') as HTMLVideoElement

    const videoTexture = new THREE.VideoTexture(this.cinematicVideo)
    videoTexture.needsUpdate = true
    videoTexture.flipY = false

    this.videoMesh = this.instance.block.getModel().scene.children.find((mesh) => mesh.name === 'video') as THREE.Mesh
    this.videoMesh.material = new THREE.MeshBasicMaterial({ map: videoTexture })
  }

  private playVideo() {
    this.cinematicVideo.play()
    this.cinematicVideo.addEventListener('ended', () => this.onVideoPlayed())
  }

  private onVideoPlayed() {
    this.end()
    console.log('📹 VIDEO PLAYED')
  }

  update() {}
}

export default OtherCinematic
