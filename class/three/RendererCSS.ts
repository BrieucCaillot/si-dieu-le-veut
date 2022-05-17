import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'

class RendererCSS {
  container: HTMLElement
  instance: CSS3DRenderer
  cssScene: THREE.Scene = new THREE.Scene()
  debugFolder: { [key: string]: any } | undefined

  constructor() {}

  setup(_container: HTMLElement) {
    this.instance = new CSS3DRenderer()
    this.instance.setSize(WebGL.sizes.width, WebGL.sizes.height)
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.top = '0'
    this.container = _container
    this.container.appendChild(this.instance.domElement)

    // Debug
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('renderer css')

    setTimeout(() => {
      this.createText()
    }, 1000)
  }

  createText() {
    const textHtml = document.querySelector('#text') as HTMLElement
    const textObject = new CSS3DObject(textHtml)
    textObject.position.x = 0.5
    textObject.position.y = 0.5

    // this.cssScene.add(textObject)
    // this.cssScene.position.set
    this.cssScene.scale.set(0.01, 0.01, 0.01)

    // Debug
    if (WebGL.debug.active) {
      // this.debugFolder!.add(this.debugParams().animations, 'playIdleLeft')
      // this.debugFolder!.add(this.debugParams().animations, 'playIdleRight')
      this.debugFolder!.add(this.cssScene.position, 'x').name('position x')
      this.debugFolder!.add(this.cssScene.position, 'y').name('position y')
      this.debugFolder!.add(this.cssScene.position, 'z').name('position z')

      this.debugFolder!.add(this.cssScene.scale, 'x').name('scale x')
      this.debugFolder!.add(this.cssScene.scale, 'y').name('scale y')
      this.debugFolder!.add(this.cssScene.scale, 'z').name('scale z')
    }
  }

  onUpdate() {
    this.instance.render(this.cssScene, WebGL.camera.instance!)
  }
}

export default new RendererCSS()
