import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'
import Blocks from './World/Blocks'

class Camera extends THREE.EventDispatcher {
  parent: THREE.Group
  instance: THREE.PerspectiveCamera
  target: THREE.Vector3 = new THREE.Vector3(0, 0, 0)
  controls: OrbitControls
  isGoingBack: boolean = false
  debugFolder: { [key: string]: any }
  debugParams: { [key: string]: any }

  constructor() {
    super()

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('camera')

    this.debugParams = {
      parallaxFactor: 0.18,
      moveXSpeed: 0.3,
    }

    this.setInstance()
    // this.setControls()
    this.setFov()
  }

  setInstance() {
    this.parent = new THREE.Group()
    this.parent.position.set(0, 0, 16)
    this.instance = new THREE.PerspectiveCamera(0, WebGL.sizes.width / WebGL.sizes.height, 1, 1000)
    this.instance.position.set(0, 0, 0)
    this.parent.add(this.instance)

    this.setFov()
    WebGL.scene.add(this.parent)

    if (WebGL.debug.active) {
      this.debugFolder.add(this.debugParams, 'parallaxFactor', 0, 1.9).step(0.1)
      this.debugFolder.add(this.debugParams, 'moveXSpeed', 0.0001, 2).step(0.1)
      this.debugFolder.add(this.parent.position, 'x')
      this.debugFolder.add(this.parent.position, 'z')
    }
  }

  setPlane() {
    const geometry = new THREE.PlaneGeometry(20, 20)
    geometry.rotateX(-Math.PI / 2)
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff, side: THREE.DoubleSide })
    const mesh = new THREE.Mesh(geometry, material)
    WebGL.scene.add(mesh)
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
    const dist = this.parent.position.z - 0 // plane position z
    const height = (WebGL.sizes.height / WebGL.sizes.width) * 2 // plane height
    this.instance.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI)
    this.instance!.updateProjectionMatrix()
  }

  moveOnX(direction: 'left' | 'right') {
    if (!this.instance || this.isGoingBack) return
    const isRight = direction === 'right'
    const isOverlappingBlocksStart = this.parent.position.x <= 0 - 0.01
    const isOverlappingBlocksEnd = this.parent.position.x >= Blocks.getBlocksMaxWidth()
    const targets = [this.parent.position, this.target]

    const x = this.debugParams.moveXSpeed
    const directionCoef = isRight ? -1 : 1

    if (isOverlappingBlocksStart) {
      gsap.to(targets, {
        x: '+=' + 0.1,
        ease: 'power2.easeInOut',
        duration: 1.5,
        onStart: () => (this.isGoingBack = true),
        onComplete: () => (this.isGoingBack = false),
      })

      console.log('overlapping blocks end')
      return
    }

    if (isOverlappingBlocksEnd) {
      gsap.to(targets, {
        x: '-=' + 0.1,
        ease: 'power2.easeInOut',
        duration: 1.5,
        onStart: () => (this.isGoingBack = true),
        onComplete: () => (this.isGoingBack = false),
      })

      console.log('overlapping blocks end')
      return
    }

    gsap.to(targets, {
      x: '+=' + x * directionCoef,
      ease: 'power2.easeInOut',
    })

    if (isOverlappingBlocksStart) {
      console.log('overlapping blocks start')
    }

    if (isOverlappingBlocksStart && isOverlappingBlocksEnd) return
  }

  onResize() {
    this.instance!.aspect = WebGL.sizes.width / WebGL.sizes.height
    this.setFov()
    this.instance!.updateProjectionMatrix()
  }

  onUpdate() {
    this.setSmooth()
  }

  setSmooth() {
    this.instance.position.x += (WebGL.mouse.screenPosition.x - this.instance.position.x) * this.debugParams.parallaxFactor
    this.instance.position.y += (WebGL.mouse.screenPosition.y - this.instance.position.y) * this.debugParams.parallaxFactor
    this.instance.lookAt(this.target)
  }

  destroy() {
    this.controls!.dispose()
  }
}

export default Camera
