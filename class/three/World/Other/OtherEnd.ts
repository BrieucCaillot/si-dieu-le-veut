import GUI from 'lil-gui'

import Other from '@/class/three/World/Other/Other'

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
    setTimeout(() => this.end(), 100)
  }

  end() {
    console.log('This is the end other end')
    this.instance.end()
  }

  update() {}
}

export default OtherEnd
