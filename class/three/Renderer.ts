import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'

class Renderer extends THREE.EventDispatcher {
  instance: THREE.WebGLRenderer | null = null

  constructor() {
    super()

    this.instance
    this.setInstance()

    const params = {
      color: '#f2e7d9f',
    }

    if (WebGL.debug.isActive()) {
      const folder = WebGL.debug.addFolder('Renderer')
      folder.addColor(params, 'color').onChange((value) => {
        this.instance.setClearColor(value)
      })
    }
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: WebGL.canvas,
      antialias: false,
      stencil: false,
      depth: false,
    })
    this.instance.outputEncoding = THREE.sRGBEncoding

    this.instance.setSize(WebGL.sizes.width, WebGL.sizes.height)
    this.instance.setClearColor(0xf9f2e7, 1)
    this.instance.setPixelRatio(WebGL.sizes.pixelRatio)
  }

  onResize() {
    this.instance.setSize(WebGL.sizes.width, WebGL.sizes.height)
    this.instance.setPixelRatio(WebGL.sizes.pixelRatio)
  }

  onUpdate() {
    this.instance.render(WebGL.scene, WebGL.camera.instance!)
  }

  destroy() {
    this.instance.dispose()
  }
}

export default Renderer
