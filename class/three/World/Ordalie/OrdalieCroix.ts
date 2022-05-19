import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import { remap } from '@/class/three/utils/Maths'
import ORDALIES from '@/constants/ORDALIES'
import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'

class OrdalieCroix {
  block: Block
  model: GLTF
  character: THREE.Mesh
  gameRolling: boolean
  animation!: { [key: string]: any }
  debugFolder: { [key: string]: any } | undefined

  constructor() {
    this.block = new Block(ORDALIES.CROIX)
    this.model = this.block.getModel()
    this.character = this.block.getCharacterModel()

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('OrdalieCroixGame')

    this.gameRolling = true

    // this.model.scene.position.y = -0.4
    // this.model.scene.scale.multiplyScalar(0.5)

    this.setCharacterAnimations()
    this.setAnimation()
  }

  setCharacterAnimations() {
    this.character.animations = this.model.animations
  }

  setAnimation() {
    this.animation = {}

    console.log(this.character.animations)
    this.animation.mixer = new THREE.AnimationMixer(this.model.scene)

    this.animation.mixer.addEventListener('finished', (e) => {
      console.log(e)

      if (e.direction === -1) {
      }

      // this.animation.actions['Croix_Descend'].timeScale = 1
      // this.animation.actions['Croix_Descend'].play()
    })

    this.animation.actions = {
      Croix_Descend: this.animation.mixer.clipAction(this.model.animations[0]),
      Croix_idle: this.animation.mixer.clipAction(this.model.animations[1]),
    }

    this.animation.actions.Croix_Descend.clampWhenFinished = true
    this.animation.actions.Croix_Descend.loop = THREE.LoopOnce
    this.animation.actions.Croix_Descend.timeScale = 0.5

    console.log(this.animation.actions.Croix_Descend)

    if (WebGL.debug.active) {
      this.debugFolder!.add(this.debugParams().animations, 'armsUp')
      this.debugFolder!.add(this.debugParams().animations, 'startGame')
    }
  }

  debugParams() {
    return {
      animations: {
        armsUp: () => this.armsUp(),
        startGame: () => {
          this.animation.actions['Croix_Descend'].play()
          console.log('play ' + this.animation.actions['Croix_Descend'])
        },
      },
    }
  }

  armsUp() {
    this.animation.actions['Croix_Descend'].timeScale = -1

    setTimeout(() => {
      this.animation.actions['Croix_Descend'].timeScale = 0.5
    }, 100)
  }

  play(animationName: string) {
    this.animation.actions[animationName].play()
  }

  update() {
    const { deltaTime } = WebGL.time

    // console.log(this.animation.actions.Croix_Descend.time)
    // const remapped = remap(this.animation.actions.Croix_Descend.time, 0, this.character.animations[0].duration, 1, 0)

    // if (remapped > 0) return

    this.animation.mixer.update(deltaTime * 0.001)
    // console.log(remapped)
  }
}

export default OrdalieCroix
