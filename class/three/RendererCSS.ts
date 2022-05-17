import * as THREE from 'three'
import { CSS3DRenderer, CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'

class RendererCSS {
  container: HTMLElement
  instance: CSS3DRenderer
  scene: THREE.Scene = new THREE.Scene()

  constructor() {}

  setup(_container: HTMLElement) {
    this.instance = new CSS3DRenderer()
    this.instance.setSize(WebGL.sizes.width, WebGL.sizes.height)
    this.instance.domElement.style.position = 'absolute'
    this.instance.domElement.style.top = '0'
    this.container = _container
    this.container.appendChild(this.instance.domElement)

    // setTimeout(() => {
    //   this.createText()
    // }, 1000)
  }

  createText() {
    const element = document.querySelector('#text') as HTMLElement
    const object = new CSS3DObject(element)
    // object.position.multiplyScalar(75)

    object.matrixAutoUpdate = false
    object.updateMatrix()

    // console.log(Blocks.getBlockPlaneText(0).box)
    // console.log(Blocks.getBlockPlaneText(0).mesh)
    // console.log(Blocks.getBlockInstance(0).model)
    // console.log(x, y)

    const pos = Blocks.getBlockPlaneText(0).mesh.position
    console.log(pos)
    // Blocks.getBlockPlaneText(0).mesh.position.x = -0.5 * WebGL.camera.instance.aspect
    object.position.copy(new THREE.Vector3(0, 0, -5))
    // object.scale.copy(Blocks.getBlockPlaneText(0).scale)
    // console.log(Blocks.getBlockPlaneText(0))
    // console.log(Blocks.getBlockPlaneText(0).geometry.computeBoundingBox())
    console.log(object)
    // this.scene.add(object)
  }

  onUpdate() {
    this.instance.render(this.scene, WebGL.camera.instance!)
  }
}

export default new RendererCSS()
