import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'

import CHARACTER from '@/constants/CHARACTER'

class Croix extends THREE.EventDispatcher {
  debugFolder: { [key: string]: any } | undefined
  resource: GLTF
  baseTexture: THREE.Texture | undefined
  model!: GLTF
  animation!: { [key: string]: any }
  ambientLight: THREE.AmbientLight

  constructor({ model }) {
    super()

    // Debug
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('Personnage de face')

    // Resource
    // this.resource = WebGL.resources.itemsLoaded['croixModel'] as GLTF
    this.model = model

    console.log(this.model)

    this.model.scene.position.y = -0.4
    this.model.scene.scale.multiplyScalar(0.5)

    this.setAnimation()
  }

  setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.model.scene)

    this.animation.actions = {
      Croix_Descend: this.animation.mixer.clipAction(this.model.animations[0]),
      Croix_idle: this.animation.mixer.clipAction(this.model.animations[1]),
    }

    this.animation.actions.Croix_Descend.clampWhenFinished = true
    this.animation.actions.Croix_Descend.loop = THREE.LoopOnce

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
