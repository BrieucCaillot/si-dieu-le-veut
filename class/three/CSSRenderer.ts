import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer'
import WebGL from '@/class/three/WebGL'

class CSSRenderer extends THREE.EventDispatcher {
  instance: CSS3DRenderer | null = null

  constructor() {
    super()

    this.instance
    this.setInstance()
  }

  setInstance() {
    this.instance = new CSS3DRenderer()
    this.instance.setSize(WebGL.sizes.width, WebGL.sizes.height)
  }

  onResize() {
    this.instance!.setSize(WebGL.sizes.width, WebGL.sizes.height)
  }

  onUpdate() {
    this.instance!.render(WebGL.scene, WebGL.camera.instance!)
  }
}

export default CSSRenderer
