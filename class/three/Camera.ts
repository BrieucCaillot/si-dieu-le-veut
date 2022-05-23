import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import { clamp } from '@/class/three/utils/Maths'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import Character from '@/class/three/World/Character'

class Camera extends THREE.EventDispatcher {
  private parent: THREE.Group
  instance: THREE.PerspectiveCamera
  private target: THREE.Vector3 = new THREE.Vector3(0, 0, 0.1)
  private targetDebugMesh: THREE.Mesh
  private controls: OrbitControls
  private currentPosX = 0
  private debugFolder: GUI

  constructor() {
    super()

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('camera')

    this.setInstance()
    this.setTargetDebug()
    // this.setControls()
    this.setFov()

    if (WebGL.debug.active) {
      this.debugFolder.add(this.debugParams(), 'parallaxFactor', 0, 1.9).step(0.1)
      this.debugFolder.add(this.debugParams(), 'moveXSpeed', 0.0001, 2).step(0.1)
      this.debugFolder.add(this.parent.position, 'x')
      this.debugFolder.add(this.parent.position, 'z')
    }
  }

  private setInstance() {
    this.parent = new THREE.Group()
    this.parent.position.set(0, 0, 16)
    this.instance = new THREE.PerspectiveCamera(0, WebGL.sizes.width / WebGL.sizes.height, 1, 1000)
    this.instance.position.set(0, 0, 0)
    this.parent.add(this.instance)
    this.setFov()
    WebGL.scene.add(this.parent)
  }

  private setTargetDebug() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x345678 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.multiplyScalar(0.1)
    this.targetDebugMesh = mesh
    WebGL.scene.add(mesh)
  }

  private setControls() {
    this.controls = new OrbitControls(this.instance!, WebGL.canvas)
    this.controls.enableDamping = true
    this.controls.enabled = false

    if (WebGL.debug.active) {
      this.debugFolder.add(this.controls, 'enabled')
    }
  }

  private setFov() {
    const dist = this.parent.position.z - 0 // plane position z
    const height = (WebGL.sizes.height / WebGL.sizes.width) * 2 // plane height
    this.instance.fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI)
    this.instance!.updateProjectionMatrix()
  }

  getPosition() {
    return this.parent.position
  }

  moveOnX(direction: 'left' | 'right') {
    if (!this.instance) return

    const maxBlocksX = Blocks.getLast().getPosition().x
    const directionCoef = direction === 'right' ? -1 : 1
    this.currentPosX += 0.09 * directionCoef
    this.currentPosX = clamp(this.currentPosX, 0, maxBlocksX)

    gsap.to([this.parent.position, this.target], {
      x: this.currentPosX,
      duration: 0.5,
    })
  }

  onResize() {
    this.instance!.aspect = WebGL.sizes.width / WebGL.sizes.height
    this.setFov()
    this.instance!.updateProjectionMatrix()
  }

  onUpdate() {
    this.setSmooth()
    this.targetDebugMesh?.position.copy(this.target)
  }

  setPositionX(x: number, cb: Function = () => {}) {
    console.log('📷 MOVING..')
    gsap.to([this.parent.position, this.target], {
      x,
      duration: 5,
      ease: 'power.easeOut',
      onComplete: () => cb(),
    })
  }

  setLookAtCharacter() {
    this.instance.lookAt(Character.getPosition())
  }

  private setSmooth() {
    this.instance.position.x += (WebGL.mouse.screenPosition.x - this.instance.position.x) * this.debugParams().parallaxFactor
    this.instance.position.y += (WebGL.mouse.screenPosition.y - this.instance.position.y) * this.debugParams().parallaxFactor
    this.instance.lookAt(this.target)
  }

  destroy() {
    this.controls!.dispose()
  }

  private debugParams() {
    return {
      parallaxFactor: 0.18,
      moveXSpeed: 0.3,
    }
  }
}

export default Camera
