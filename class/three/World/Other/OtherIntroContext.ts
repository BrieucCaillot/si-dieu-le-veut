import Other from '@/class/three/World/Other/Other'
import Block from '@/class/three/World/Block'

class OtherIntroContext {
  other: Other
  block: Block

  constructor(_other: Other) {
    this.other = _other
    this.block = _other.block
  }

  update() {
    console.log('Update OtherIntroContext')
  }
}

export default OtherIntroContext
