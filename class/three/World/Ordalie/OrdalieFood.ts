import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import WebGL from '@/class/three/WebGL'

const PATH = [
  [-0.3289377689361572, 0.0, 0.040099889039993286],
  [-0.15812578797340393, -0.0011454608757048845, 0.04631344601511955],
  [-0.01618696004152298, -0.0063365548849105835, 0.06104547902941704],
  [0.1036330908536911, -0.01338682696223259, 0.07843302190303802],
  [0.2080887258052826, -0.02010982669889927, 0.09261313080787659],
  [0.3039342761039734, -0.02431909739971161, 0.09772282838821411],
  [0.39792418479919434, -0.023828186094760895, 0.08789919316768646],
  [0.49681273102760315, -0.016450639814138412, 0.05727923661470413],
  [0.6073542833328247, 0.0, 0.0],
]

class OrdalieFood {
  instance: Ordalie
  animation: { [key: string]: any }
  debugFolder: GUI
  path: THREE.CatmullRomCurve3
  mesh: THREE.Mesh
  debug: {
    progress: number
  }

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.debug = {
      progress: 0,
    }

    this.setAnimation()

    this.setPath()

    this.start()
    gsap.ticker.add(() => this.update())

    this.mesh = new THREE.Mesh(new THREE.BoxGeometry(0.05, 0.05, 0.05), new THREE.MeshBasicMaterial({ color: 0xff0000 }))
    WebGL.scene.add(this.mesh)
  }

  start() {
    if (WebGL.debug.isActive()) {
      this.debugFolder = WebGL.debug.addFolder('OrdalieFood')
      this.debugFolder.add(this.debug, 'progress', 0, 1).step(0.01)
    }
    console.log('start')

    // setTimeout(() => {
    //   this.end()
    // }, 3000)
  }

  end() {
    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  private setPath() {
    for (let i = 0; i < PATH.length; i++) {
      const x = PATH[i][0]
      const y = PATH[i][1]
      const z = PATH[i][2]
      PATH[i] = new THREE.Vector3(x, z, -y)
    }

    this.path = new THREE.CatmullRomCurve3(PATH)

    const radius = 0.01
    const geometry = new THREE.TubeGeometry(this.path, 20, radius, 20, false)
    const material = new THREE.MeshNormalMaterial({
      side: THREE.DoubleSide,
      wireframe: true,
    })
    const tube = new THREE.Mesh(geometry, material)
    WebGL.scene.add(tube)
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

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)

    const point = this.path.getPointAt(this.debug.progress)
    this.mesh.position.set(point.x, point.y, point.z)
  }
}

export default OrdalieFood
