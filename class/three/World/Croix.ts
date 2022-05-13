import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'

import CHARACTER from '@/constants/CHARACTER'

class Croix extends THREE.EventDispatcher {
  debugFolder: { [key: string]: any } | undefined
  resource: GLTF
  baseTexture: THREE.Texture | undefined
  model!: THREE.Object3D
  animation!: { [key: string]: any }
  ambientLight: THREE.AmbientLight

  constructor() {
    super()

    // Debug
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('Personnage de face')

    // Resource
    // this.resource = WebGL.resources.itemsLoaded['croixModel'] as GLTF
    this.resource = WebGL.resources.getItems(CHARACTER.ALL, 'model')
    this.model = this.resource.scene

    this.setAnimation()
    // this.play('Croix_idle')
    // this.play('Croix_Descend')
    WebGL.scene.add(this.resource.scene)

    this.ambientLight = new THREE.AmbientLight(0xffffff, 10)
    WebGL.scene.add(this.ambientLight)

    setTimeout(() => {
      this.invertTimeScale()
    }, 2000)
  }

  setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.model)
    this.animation.actions = {
      Croix_Descend: this.animation.mixer.clipAction(this.resource.animations[0]),
      Croix_idle: this.animation.mixer.clipAction(this.resource.animations[1]),
    }

    if (WebGL.debug.active) {
      this.debugFolder!.add(this.debugParams().animations, 'armsUp')
      this.debugFolder!.add(this.debugParams().animations, 'playCroix')
    }
  }

  debugParams() {
    return {
      animations: {
        armsUp: () => this.invertTimeScale(),
        playCroix: () => {
          this.animation.actions['Croix_Descend'].play()
        },
      },
    }
  }

  invertTimeScale() {
    this.animation.actions['Croix_Descend'].timeScale = -1

    setTimeout(() => {
      this.animation.actions['Croix_Descend'].timeScale = 1
    }, 100)
  }

  play(animationName: string) {
    this.animation.actions[animationName].play()
  }

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default Croix
