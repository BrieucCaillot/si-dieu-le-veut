import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import DIFFICULTY_DATAS from '@/constants/DIFFICULTY_DATA'
import { clamp } from '@/class/three/utils/Maths'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

class Camera extends THREE.EventDispatcher {
  private parent: THREE.Group
  instance: THREE.PerspectiveCamera
  private target: THREE.Vector3 = new THREE.Vector3(0, 0, 0.1)
  private targetDebugMesh: THREE.Mesh
  private minPos = {
    x: 0,
    z: 13,
  }
  private maxPos = {
    x: 0,
    z: 30,
  }
  private controls: OrbitControls
  private planeWidth = 1.4072
  private currentPosX = 0
  private isMoving = false
  private debugFolder: GUI
  private debugParams = {
    canScroll: false,
    parallaxFactor: 0.1,
    moveXSpeed: 0.1,
  }

  constructor() {
    super()

    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('camera')

    this.setInstance()
    this.setEvents()

    if (WebGL.debug.isActive()) {
      this.debugFolder.add(this.debugParams, 'parallaxFactor', 0, 0.5).step(0.01)
      this.debugFolder.add(this.debugParams, 'moveXSpeed', 0.0001, 0.5).step(0.1)
      this.debugFolder.add(this.debugParams, 'canScroll').listen()
      this.debugFolder.add(this.parent.position, 'x')
      this.debugFolder.add(this.parent.position, 'z')
    }
  }

  private setInstance() {
    this.parent = new THREE.Group()
    this.parent.position.set(0, 0, 13)
    this.instance = new THREE.PerspectiveCamera(0, WebGL.sizes.width / WebGL.sizes.height, 0.1, 1000)
    this.instance.position.set(0, 0, 0)
    this.setFov()
    this.parent.add(this.instance)
    WebGL.scene.add(this.parent)
  }

  private setTargetDebug() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x345678 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.multiplyScalar(0.05)
    this.targetDebugMesh = mesh
    WebGL.scene.add(mesh)
  }

  private setControls() {
    this.controls = new OrbitControls(this.instance!, WebGL.canvas)
    this.controls.enableDamping = true
    this.controls.enabled = false

    if (WebGL.debug.isActive()) this.debugFolder.add(this.controls, 'enabled')
  }

  private setEvents() {
    document.addEventListener('keydown', (e) => {
      switch (e.key) {
        case 'ArrowLeft':
          this.moveOnX('left')
          break
        case 'ArrowRight':
          this.moveOnX('right')
          break
        case 'ArrowUp':
          this.moveOnZ('forward')
          break
        case 'ArrowDown':
          this.moveOnZ('backward')
          break
      }
    })
  }

  private setFov() {
    let dist = this.parent.position.z - 0
    let height = 1 // desired height to fit
    let fov = 0

    if (WebGL.sizes.aspect < this.planeWidth) {
      fov = 2 * Math.atan(this.planeWidth / (2 * dist) / this.instance.aspect) * (180 / Math.PI)
    } else {
      fov = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI)
    }

    this.instance.fov = fov
    this.instance.updateProjectionMatrix()
  }

  getPosition() {
    return this.parent.position
  }

  /**
   * Returns if camera can move
   */
  private canMove() {
    return this.instance && (Blocks.isEnded || this.debugParams.canScroll)
  }

  /**
   * Move Horizontally
   */
  moveOnX(direction: 'left' | 'right') {
    if (!this.canMove()) return

    this.maxPos.x = Blocks.getLast().getPosition().x
    const directionCoef = direction === 'right' ? 1 : -1
    this.currentPosX += directionCoef * this.debugParams.moveXSpeed
    this.currentPosX = clamp(this.currentPosX, this.minPos.x, this.maxPos.x)

    gsap.to([this.parent.position, this.target], {
      x: this.currentPosX,
      onUpdate: this.onPositionChange,
      duration: 0.5,
    })
  }

  /**
   * Move in Depth
   */
  moveOnZ(direction: 'forward' | 'backward') {
    if (!this.canMove() || this.isMoving) return
    gsap.to(this.parent.position, {
      z: direction === 'forward' ? this.minPos.z : this.maxPos.z,
      duration: 0.5,
      onStart: () => {
        this.isMoving = true
      },
      onComplete: () => {
        this.isMoving = false
      },
    })
  }

  onResize() {
    this.instance.aspect = WebGL.sizes.width / WebGL.sizes.height
    this.setFov()
  }

  onUpdate() {
    this.setSmooth()
    this.targetDebugMesh?.position.copy(this.target)
  }

  onPositionChange() {
    WebGL.postProcessing.onCameraMove()
  }

  setPositionX({ x, onStart, onComplete }: { x: number; onStart?: () => void; onComplete?: () => void }) {
    console.log('📷 MOVING..')
    const duration = DIFFICULTY_DATAS[OrdalieManager.getDifficulty()]['CAMERA'].moveDuration ?? 0.5

    gsap.to([this.parent.position, this.target], {
      x,
      duration,
      ease: 'power1.inOut',
      onStart: () => {
        this.isMoving = true
        onStart?.()
      },
      onUpdate: this.onPositionChange,
      onComplete: () => {
        this.isMoving = false
        onComplete?.()
      },
    })
  }

  private setSmooth() {
    this.instance.position.x += (WebGL.mouse.screenPosition.x - this.instance.position.x) * this.debugParams.parallaxFactor
    this.instance.position.y += (WebGL.mouse.screenPosition.y - this.instance.position.y) * this.debugParams.parallaxFactor
    this.instance.lookAt(this.target)
  }

  destroy() {
    this.controls!.dispose()
  }
}

export default Camera
