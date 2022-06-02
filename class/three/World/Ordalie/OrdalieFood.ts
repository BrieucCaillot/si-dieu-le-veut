import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import WebGL from '@/class/three/WebGL'

import PATHS from '@/constants/PATHS'

class OrdalieFood {
  instance: Ordalie
  animation: { [key: string]: any }
  debugFolder: GUI
  path: THREE.CatmullRomCurve3
  mesh: THREE.Mesh
  debug: {
    progress: number
    displayTime: number
    maxDisplayTime: number
  }
  paths: THREE.CatmullRomCurve3[]

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.debug = {
      progress: 0,
      displayTime: 0,
      maxDisplayTime: 5,
    }

    this.paths = []

    this.setAnimation()
    this.setPath()

    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
  }

  getRandomPath() {
    return this.paths[Math.floor(Math.random() * this.paths.length)]
  }

  createInstance(path: THREE.CatmullRomCurve3, i: number) {
    const clone = this.mesh.clone()
    clone.name = 'clone_' + i
    const point = path.getPointAt(1)
    clone.position.set(point.x, point.y, point.z)
    WebGL.scene.add(clone)

    return clone
  }

  disposeInstance(name: string) {
    let mesh = WebGL.scene.children.find((mesh) => mesh.name === name) as THREE.Mesh

    WebGL.scene.remove(mesh)

    mesh.geometry.dispose()
    mesh.material.dispose()
    if (mesh.material.map) mesh.material.map.dispose()

    mesh = null
  }

  start() {
    if (WebGL.debug.isActive()) {
      this.debugFolder = WebGL.debug.addFolder('OrdalieFood')
      this.debugFolder.add(this.debug, 'progress', 0, 1).step(0.01)
    }

    // setTimeout(() => {
    //   this.end()
    // }, 3000)
  }

  end() {
    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  setHTMLPosition(container: HTMLSpanElement, mesh: THREE.Mesh) {
    const objectSize = new THREE.Box3().setFromObject(mesh)

    const topLeftCorner3D = new THREE.Vector3(objectSize.min.x, objectSize.max.y, objectSize.max.z)
    const topRightCorner3D = new THREE.Vector3(objectSize.max.x, objectSize.max.y, objectSize.max.z)
    const bottomLeftCorner3D = new THREE.Vector3(objectSize.min.x, objectSize.min.y, objectSize.max.z)

    const center3D = new THREE.Vector3((topLeftCorner3D.x + topRightCorner3D.x) / 2, bottomLeftCorner3D.y, objectSize.max.z)

    // console.log(center3D)

    center3D.project(WebGL.camera.instance)
    const x1 = (center3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth
    const y1 = (center3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight

    container.style.transform = `translate(${x1 - container.offsetWidth / 2}px,${y1}px)`
  }

  private setPath() {
    for (let i = 0; i < PATHS.length; i++) {
      for (let j = 0; j < PATHS[i].length; j++) {
        const x = PATHS[i][j][0]
        const y = PATHS[i][j][1]
        const z = PATHS[i][j][2]
        PATHS[i][j] = new THREE.Vector3(x, z, -y)
      }

      this.paths.push(new THREE.CatmullRomCurve3(PATHS[i]))

      // const radius = 0.01
      // const geometry = new THREE.TubeGeometry(this.paths[i], 20, radius, 20, false)
      // const material = new THREE.MeshNormalMaterial({
      //   side: THREE.DoubleSide,
      //   wireframe: true,
      // })
      // const tube = new THREE.Mesh(geometry, material)
      // WebGL.scene.add(tube)
    }
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)

    this.animation.actions = {}

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => {})
  }

  updateMesh(mesh: THREE.Mesh, path: THREE.CatmullRomCurve3, progress: number) {
    const point = path.getPointAt(1 - progress)
    mesh.position.set(point.x, point.y, point.z)
    mesh.updateMatrix()
  }

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieFood
