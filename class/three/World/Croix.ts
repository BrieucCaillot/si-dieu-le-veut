import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'

import { EntitiesName } from '@/constants/ENTITIES'

class Croix extends THREE.EventDispatcher {
  debugFolder: { [key: string]: any } | undefined
  resource: GLTF
  baseTexture: THREE.Texture | undefined
  model!: THREE.Object3D
  animation!: { [key: string]: any }

  constructor() {
    super()

    // Debug
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('Personnage de face')

    // Resource
    this.resource = WebGL.resources.itemsLoaded['croixModel'] as GLTF
    this.model = this.resource.scene

    this.setAnimation()
    // this.play('Croix_idle')
    // this.play('Croix_Descend')
    WebGL.scene.add(this.resource.scene)

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

    console.log(this.animation)

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
    console.log(this.animation.actions)

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
    // console.log(deltaTime)

    this.animation.mixer.update(deltaTime * 0.001)

    // console.log(this.animation.actions['Croix_Descend'].time)
  }
}

export default Croix
