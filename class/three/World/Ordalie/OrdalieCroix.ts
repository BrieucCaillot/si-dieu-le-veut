import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'

import { remap } from '@/class/three/utils/Maths'
import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import DIFFICULTY from '@/constants/DIFFICULTY'
import ORDALIES from '@/constants/ORDALIES'
import DATAS, { CroixInterface } from '@/constants/DIFFICULTY_DATA'
import DIFFICULTY_DATAS from '@/constants/DIFFICULTY_DATA'

class OrdalieCroix {
  block: Block
  // Model
  model: GLTF
  character: THREE.Mesh
  animation!: { [key: string]: any }

  // Gameplay
  debugObject: any
  timeScaleController: any
  gameplayParams: CroixInterface

  debugFolder: { [key: string]: any } | undefined

  constructor() {
    this.block = new Block(ORDALIES.CROIX)
    this.model = this.block.getModel()
    this.character = this.block.getCharacterModel()
    this.gameplayParams = DIFFICULTY_DATAS[OrdalieManager.difficulty].CROIX

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('OrdalieCroixGame')

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
      //le mec tape tellement vite qu'il remonte l'anim jusqu'au début
      if (e.direction === -1) {
        this.animation.actions['Croix_Descend'].stop()
        this.animation.actions['Croix_Descend'].play()
      } else {
        //fin de l'anim classique, le mec a perdu
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
    this.animation.actions.Croix_Descend.timeScale = this.gameplayParams.fallingSpeedArm

    if (WebGL.debug.active) {
      this.debugFolder!.add(this.debugParams().animations, 'armsUp')
      this.debugFolder!.add(this.debugParams().animations, 'startGame')
      this.debug()
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
    this.animation.actions['Croix_Descend'].timeScale = this.gameplayParams.upSpeedArm

    setTimeout(() => {
      this.animation.actions['Croix_Descend'].timeScale = this.gameplayParams.fallingSpeedArm
    }, this.gameplayParams.upDurationArm)
  }

  play(animationName: string) {
    this.animation.actions[animationName].play()
  }

  debug() {
    this.debugObject = {
      timeScale: this.animation.actions['Croix_Descend'].timeScale,
      time: this.animation.actions['Croix_Descend'].time,

      animations: {
        armsUp: () => this.armsUp(),
        startGame: () => {
          this.animation.actions['Croix_Descend'].play()
          document.getElementById('input-typing').focus()
        },
      },
    }
    this.debugFolder.add(this.debugObject, 'timeScale').listen().disable()
    this.debugFolder.add(this.debugObject, 'time').step(0.01).listen().disable()
    this.debugFolder.add(this.debugObject.animations, 'armsUp')
    this.debugFolder.add(this.debugObject.animations, 'startGame')
  }

  update() {
    const { deltaTime } = WebGL.time

    // console.log(this.animation.actions.Croix_Descend.time)
    // const remapped = remap(this.animation.actions.Croix_Descend.time, 0, this.character.animations[0].duration, 1, 0)

    // if (remapped > 0) return

    // this.timeScaleController.updateDispla

    this.debugObject.timeScale = this.animation.actions['Croix_Descend'].timeScale
    this.debugObject.time = this.animation.actions['Croix_Descend'].time

    this.animation.mixer.update(deltaTime * 0.001)
    // console.log(remapped)
  }
}

export default OrdalieCroix
