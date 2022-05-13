import OTHERS from '@/constants/OTHERS'

import WebGL from '@/class/three/WebGL'

class Intro {
  static create() {
    const model = WebGL.resources.getItems(OTHERS.INTRO, 'model')
    WebGL.scene.add(model.scene)
  }
}

export default Intro
