import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap, { SteppedEase } from 'gsap'

import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import WebGL from '@/class/three/WebGL'

import fragmentShader from '@/class/three/shaders/bite/fragment.glsl'
import vertexShader from '@/class/three/shaders/bite/vertex.glsl'

import PATHS from '@/constants/PATHS'
import { FoodInterface } from '@/constants/DIFFICULTY_DATA'

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
  geometry: THREE.PlaneGeometry
  material: THREE.ShaderMaterial
  textures: THREE.Texture[]
  biteTexture: THREE.Texture
  difficultyData: FoodInterface

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.difficultyData = this.instance.block.getDifficultyData() as FoodInterface
    console.log(this.difficultyData)

    this.debug = {
      progress: 0,
      displayTime: 0,
      maxDisplayTime: 5,
    }

    this.paths = []

    this.setAnimation()
    this.setPath()

    this.biteTexture = WebGL.resources.getItems(this.instance.block.getType(), 'miam') as THREE.Texture

    this.textures = [
      WebGL.resources.getItems(this.instance.block.getType(), 'bread') as THREE.Texture,
      WebGL.resources.getItems(this.instance.block.getType(), 'cheese') as THREE.Texture,
      WebGL.resources.getItems(this.instance.block.getType(), 'cake') as THREE.Texture,
    ]

    // for (let i = 0; i < this.textures.length; i++) {
    //   this.textures[i].encoding = THREE.sRGBEncoding
    // }

    this.geometry = new THREE.PlaneGeometry(0.05, 0.05)
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  getRandomPath() {
    return this.paths[Math.floor(Math.random() * this.paths.length)]
  }

  createInstance(path: THREE.CatmullRomCurve3, i: number) {
    const clone = this.mesh.clone()
    // clone.scale.set(2, 2, 2)
    const material = new THREE.ShaderMaterial({
      uniforms: {
        uMap: { value: this.textures[Math.floor(Math.random() * this.textures.length)] },
        uMask: { value: this.biteTexture },
        uGradient: { value: WebGL.resources.getItems('COMMON', 'gradient') as THREE.Texture },
        uProgress: { value: 4 },
        spriteSheetSize: { value: new THREE.Vector2(320, 64) },
        spriteSize: { value: new THREE.Vector2(64, 64) },
      },
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
      depthTest: false,
      transparent: true,
    })

    clone.material = material

    clone.name = 'clone_' + i
    const point = path.getPointAt(1)
    clone.position.set(point.x, point.y, point.z)
    WebGL.scene.add(clone)

    return clone
  }

  startBiteTransition(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>) {
    console.log('start bite transition', mesh)
    return new Promise<void>((resolve, reject) => {
      const uniform = mesh.material.uniforms.uProgress
      console.log('uniform is', uniform)

      gsap.to(uniform, {
        value: 0,
        ease: SteppedEase.config(4),
        duration: 0.5,
        onComplete: () => {
          resolve()
        },
      })
    })
    // let uniform
  }

  disposeInstance(name: string) {
    let mesh = WebGL.scene.children.find((mesh) => mesh.name === name) as THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>

    WebGL.scene.remove(mesh)

    mesh.geometry.dispose()
    mesh.material.dispose()

    mesh = null
  }

  start() {
    if (WebGL.debug.isActive()) {
      this.debugFolder = WebGL.debug.addFolder('OrdalieFood')
      // this.debugFolder.add(this.debug, 'progress', 0, 1).step(0.01)
    }

    // setTimeout(() => {
    //   this.end()
    // }, 3000)
  }

  end() {
    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  setHTMLPosition(container: HTMLSpanElement, mesh: THREE.Mesh, scale: number) {
    const objectSize = new THREE.Box3().setFromObject(mesh)

    const topLeftCorner3D = new THREE.Vector3(objectSize.min.x, objectSize.max.y, objectSize.max.z)
    const topRightCorner3D = new THREE.Vector3(objectSize.max.x, objectSize.max.y, objectSize.max.z)
    const bottomLeftCorner3D = new THREE.Vector3(objectSize.min.x, objectSize.min.y, objectSize.max.z)

    const center3D = new THREE.Vector3((topLeftCorner3D.x + topRightCorner3D.x) / 2, bottomLeftCorner3D.y, objectSize.max.z)

    center3D.project(WebGL.camera.instance)
    const x1 = (center3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth
    const y1 = (center3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight

    container.style.transform = `translate3d(${x1 - container.offsetWidth / 2}px,${y1}px, 0) scale3d(${scale}, ${scale}, ${scale})`
  }

  private setPath() {
    for (let i = 0; i < PATHS.length; i++) {
      for (let j = 0; j < PATHS[i].length; j++) {
        const x = PATHS[i][j][0]
        const y = PATHS[i][j][1]
        const z = PATHS[i][j][2]
        PATHS[i][j] = new THREE.Vector3(x + this.instance.block.getPosition().x, z, -y)
      }

      this.paths.push(new THREE.CatmullRomCurve3(PATHS[i]))

      // this.instance.block.getModel().scene.attach(this.paths[i])
      // console.log(this.instance.block.getModel())
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
