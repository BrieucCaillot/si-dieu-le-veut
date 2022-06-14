import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap, { SteppedEase } from 'gsap'

import PATHS from '@/constants/PATHS'
import { FoodInterface } from '@/constants/DIFFICULTY_DATA'
import setHTMLPosition from '@/class/three/utils/setHTMLPosition'

import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import WebGL from '@/class/three/WebGL'

import fragmentShader from '@/class/three/shaders/bite/fragment.glsl'
import vertexShader from '@/class/three/shaders/bite/vertex.glsl'

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
  BASE_PATHS: any[]

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.difficultyData = this.instance.block.getDifficultyData() as FoodInterface

    this.debug = {
      progress: 0,
      displayTime: 0,
      maxDisplayTime: 5,
    }

    this.BASE_PATHS = JSON.parse(JSON.stringify(PATHS))

    this.paths = []
    this.setPath()
  }

  getRandomPath() {
    return this.paths[Math.floor(Math.random() * this.paths.length)]
  }

  createInstance(path: THREE.CatmullRomCurve3, i: number) {
    const clone = this.mesh.clone()
    clone.scale.set(1.5, 1.5, 1.5)
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
    const point = path.getPointAt(0)

    clone.position.set(point.x, point.y, point.z)
    WebGL.scene.add(clone)

    return clone
  }

  startBiteTransition(mesh: THREE.Mesh<THREE.BufferGeometry, THREE.ShaderMaterial>) {
    return new Promise<void>((resolve, reject) => {
      const uniform = mesh.material.uniforms.uProgress

      gsap.to(uniform, {
        value: 0,
        ease: SteppedEase.config(4),
        duration: 0.5,
        onComplete: () => {
          resolve()
        },
      })
    })
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

    this.biteTexture = WebGL.resources.getItems(this.instance.block.getType(), 'miam') as THREE.Texture

    this.textures = [
      WebGL.resources.getItems(this.instance.block.getType(), 'bread') as THREE.Texture,
      WebGL.resources.getItems(this.instance.block.getType(), 'cheese') as THREE.Texture,
      WebGL.resources.getItems(this.instance.block.getType(), 'cake') as THREE.Texture,
    ]

    this.geometry = new THREE.PlaneGeometry(0.05, 0.05)
    this.material = new THREE.ShaderMaterial({
      transparent: true,
      fragmentShader: fragmentShader,
      vertexShader: vertexShader,
    })

    this.mesh = new THREE.Mesh(this.geometry, this.material)
  }

  end() {
    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  updateHTML(container: HTMLElement, mesh: THREE.Mesh, scale: number) {
    const positions = setHTMLPosition(mesh)
    container.style.transform = `translate3d(${positions.center.x - container.offsetWidth / 2}px,${positions.center.y}px, 0) scale3d(${scale}, ${scale}, ${scale})`
    container.style.fontSize = WebGL.sizes.width / 57.6 + 'px'
  }

  setPath() {
    for (let i = 0; i < this.BASE_PATHS.length; i++) {
      for (let j = 0; j < this.BASE_PATHS[i].length; j++) {
        const x = this.BASE_PATHS[i][j][0]
        const y = this.BASE_PATHS[i][j][1]
        const z = this.BASE_PATHS[i][j][2]
        this.BASE_PATHS[i][j] = new THREE.Vector3(x + this.instance.block.getPosition().x, z, -y)
      }

      this.paths.push(new THREE.CatmullRomCurve3(this.BASE_PATHS[i]))

      // this.instance.block.getModel().scene.attach(this.paths[i])

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

  gameWon() {
    this.end()
  }

  gameOver() {
    console.log('game over food ')
    OrdalieManager.setIsDead(true)
    this.end()
  }

  updateMesh(mesh: THREE.Mesh, path: THREE.CatmullRomCurve3, progress: number) {
    const point = path.getPointAt(1 - progress)
    mesh.position.set(point.x, point.y, point.z)
  }

  update() {
    // const { deltaTime } = WebGL.time
    // this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieFood
