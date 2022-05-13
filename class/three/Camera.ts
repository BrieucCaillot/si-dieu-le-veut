import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'

class Camera extends THREE.EventDispatcher {
  instance: THREE.PerspectiveCamera
  controls: OrbitControls
  debugFolder: { [key: string]: any }

  constructor() {
    super()

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('camera')

    this.setInstance()
    // this.setControls()
    this.setFov()
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(0, WebGL.sizes.width / WebGL.sizes.height, 1, 1000)
    this.instance.position.set(0, 0, 16)
    this.setFov()
    WebGL.scene.add(this.instance)
  }

  setControls() {
    this.controls = new OrbitControls(this.instance!, WebGL.canvas)
    this.controls.enableDamping = true
    this.controls.enabled = false

    if (WebGL.debug.active) {
      this.debugFolder.add(this.controls, 'enabled')
    }
  }

  setFov() {
    const dist = this.instance.position.z - 0 // plane position z
    const height = (WebGL.sizes.height / WebGL.sizes.width) * 2 // plane height
    this.instance.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI)
    this.instance!.updateProjectionMatrix()
  }

  moveOnX(direction: 'left' | 'right') {
    const x = this.instance.position.x + 0.4 * (direction === 'left' ? -1 : 1)
    gsap.to(this.instance.position, {
      x,
      duration: 0.3,
      ease: 'power2.easeInOut',
    })
  }

  onResize() {
    this.instance!.aspect = WebGL.sizes.width / WebGL.sizes.height
    this.setFov()
    this.instance!.updateProjectionMatrix()
  }

  onUpdate() {
    // this.controls!.update()
  }

  destroy() {
    this.controls!.dispose()
  }
}

export default Camera
