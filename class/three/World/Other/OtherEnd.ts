import GUI from 'lil-gui'

import Other from '@/class/three/World/Other/Other'

class OtherEnd {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI

  constructor(_other: Other) {
    this.instance = _other
  }

  start() {
    setTimeout(() => this.end(), 100)
  }

  end() {
    this.instance.end()
  }

  update() {}
}

export default OtherEnd
