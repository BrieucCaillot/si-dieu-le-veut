import OTHERS from '@/constants/OTHERS'

import Other from '@/class/three/World/Other/Other'

class OtherCinematic {
  private instance: Other

  constructor(_other: Other) {
    this.instance = _other
    this.type = this.instance.block.getType() as OTHERS
  }

  start() {}

  end() {}

  update() {}
}

export default OtherCinematic
