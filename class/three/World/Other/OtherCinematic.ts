import Other from '@/class/three/World/Other/Other'

class OtherCinematic {
  private instance: Other

  constructor(_other: Other) {
    this.instance = _other
  }

  start() {
    // switch (this.type) {
    //   case OTHERS.CINEMATIC_1:
    //     this.delayEnd()
    //     break
    //   case OTHERS.CINEMATIC_2:
    //     // this.playVideo()
    //     this.delayEnd()
    //     break
    //   case OTHERS.CINEMATIC_3:
    //     this.delayEnd()
    //     break
    // }
  }

  // end() {
  //   this.instance.end()
  // }

  private delayEnd() {
    // setTimeout(() => {
    //   if (WebGL.camera.getIsMoving()) return
    //   console.log('CALLING EEEND')
    //   this.end()
    // }, 6000)
  }

  update() {}
}

export default OtherCinematic
