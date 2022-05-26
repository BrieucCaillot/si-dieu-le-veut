import GUI from 'lil-gui'

import Other from '@/class/three/World/Other/Other'

class OtherCinematic {
  instance: Other
  debugFolder: GUI

  constructor(_other: Other) {
    this.instance = _other
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
      // }, 5000)
    }, 20)
  }

  update() {
    console.log('🔁 OtherCinematic')
  }
}

export default OtherCinematic
