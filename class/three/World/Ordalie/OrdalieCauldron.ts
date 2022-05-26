import Ordalie from '@/class/three/World/Ordalie/Ordalie'

class OrdalieCauldron {
  instance: Ordalie

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
  }

  start() {
    // TODO START
  }

  end() {
    this.instance.end()
  }

  update() {}
}

export default OrdalieCauldron
