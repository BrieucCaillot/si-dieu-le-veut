import OTHERS from '@/constants/OTHERS'

import WebGL from '@/class/three/WebGL'

class Didacticiel {
  static create() {
    const model = WebGL.resources.getItems(OTHERS.DIDACTICIEL, 'model')
    WebGL.scene.add(model.scene)
  }
}

export default Didacticiel
