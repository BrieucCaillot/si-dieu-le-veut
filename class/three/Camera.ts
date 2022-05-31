import GUI from 'lil-gui'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
import gsap from 'gsap'

import { clamp } from '@/class/three/utils/Maths'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'

class Camera extends THREE.EventDispatcher {
  private parent: THREE.Group
  instance: THREE.PerspectiveCamera
  private target: THREE.Vector3 = new THREE.Vector3(0, 0, 0.1)
  private fov = 0
  private targetDebugMesh: THREE.Mesh
  private controls: OrbitControls
  private planeWidth = 1.4072
  private currentPosX = 0
  private debugFolder: GUI
  private debugParams = {
    parallaxFactor: 0.01,
    moveXSpeed: 0.1,
  }

  constructor() {
    super()

    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('camera')

    this.setInstance()
    // this.setTargetDebug()
    // this.setControls()

    if (WebGL.debug.isActive()) {
      this.debugFolder.add(this.debugParams, 'parallaxFactor', 0, 0.5).step(0.01)
      this.debugFolder.add(this.debugParams, 'moveXSpeed', 0.0001, 0.5).step(0.1)
      this.debugFolder.add(this.parent.position, 'x')
      this.debugFolder.add(this.parent.position, 'z')
    }
  }

  private setInstance() {
    this.parent = new THREE.Group()
    // const fov = (180 * (2 * Math.atan(WebGL.sizes.height / (2 * this.perspective)))) / Math.PI
    this.parent.position.set(0, 0, 16)
    this.instance = new THREE.PerspectiveCamera(0, WebGL.sizes.width / WebGL.sizes.height, 1, 1000)
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

    if (WebGL.debug.isActive()) {
      this.debugFolder.add(this.controls, 'enabled')
    }
  }
  getXFOV() {
    // Convert angle to radiant
    const FOV = this.instance.fov
    let yFovRadiant = (FOV * Math.PI) / 180
    // Calculate X-FOV Radiant
    let xFovRadiant = 2 * Math.atan(Math.tan(yFovRadiant / 2) * (window.innerWidth / window.innerHeight))
    // Convert back to angle
    let xFovAngle = (xFovRadiant * 180) / Math.PI
    return xFovAngle
  }
  /**
   * Convert vertical field of view to horizontal field of view, given an aspect
   * ratio. See https://arstechnica.com/civis/viewtopic.php?f=6&t=37447
   *
   * @param vfov - The vertical field of view.
   * @param aspect - The aspect ratio, which is generally width/height of the viewport.
   * @returns - The horizontal field of view.
   */
  vfovToHfov(vfov: number, aspect: number): number {
    const { tan, atan } = Math
    return atan(aspect * tan(vfov / 2)) * 2
  }

  /**
   * Get the distance from the camera to fit an object in view by either its
   * horizontal or its vertical dimension.
   *
   * @param size - This should be the width or height of the object to fit.
   * @param fov - If `size` is the object's width, `fov` should be the horizontal
   * field of view of the view camera. If `size` is the object's height, then
   * `fov` should be the view camera's vertical field of view.
   * @returns - The distance from the camera so that the object will fit from
   * edge to edge of the viewport.
   */
  _distanceToFitObjectInView(size: number, fov: number): number {
    const { tan } = Math
    return size / (2 * tan(fov / 2))
  }

  distanceToFitObjectToView(cameraAspect: number, cameraVFov: number, objWidth: number, objHeight: number): number {
    const objAspect = objWidth / objHeight
    const cameraHFov = this.vfovToHfov(cameraVFov, cameraAspect)

    let distance: number = 0

    if (objAspect > cameraAspect) {
      distance = this._distanceToFitObjectInView(objHeight, cameraVFov)
    } else if (objAspect <= cameraAspect) {
      distance = this._distanceToFitObjectInView(objWidth, cameraHFov)
    }

    return distance
  }

  private setFov() {
    let dist = this.parent.position.z - 0
    let height = 1 // desired height to fit
    let width = this.planeWidth // desired width to fit
    const vFOV = 2 * Math.atan(height / (2 * dist)) * (180 / Math.PI)
    const hFOV = 2 * Math.atan(Math.tan(vFOV / 2) * this.instance.aspect)
    // console.log({ vFOV })
    // console.log({ hFOV })
    // console.log({ width })
    // console.log({ 'aspect ': WebGL.sizes.aspect })

    if (WebGL.sizes.aspect < this.planeWidth) {
      console.log('accroché sur les bords')
      height = 2 * Math.tan(vFOV / 2) * dist
      width = 2 * Math.tan(hFOV / 2) * dist
      this.fov = 2 * Math.atan(height / (2 * dist))
    } else {
      console.log('accroché en haut')
      this.fov = vFOV
    }

    this.instance.fov = this.fov
    this.instance.updateProjectionMatrix()
  }

  getPosition() {
    return this.parent.position
  }

  moveOnX(direction: 'left' | 'right') {
    if (!this.instance) return

    const maxBlocksX = Blocks.getLast().getPosition().x
    const directionCoef = direction === 'right' ? -1 : 1
    this.currentPosX += this.debugParams.moveXSpeed * directionCoef
    this.currentPosX = clamp(this.currentPosX, 0, maxBlocksX)

    gsap.to([this.parent.position, this.target], {
      x: this.currentPosX,
      duration: 0.5,
    })
  }

  onResize() {
    this.instance.aspect = WebGL.sizes.width / WebGL.sizes.height
    this.setFov()
  }

  onUpdate() {
    // this.setSmooth()
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
