import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'

import { CroixInterface } from '@/constants/DIFFICULTY_DATA'

import WebGL from '@/class/three/WebGL'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import setHTMLPosition from '@/class/three/utils/setHTMLPosition'
import ANIMATIONS from '@/constants/ANIMATIONS'
import SOUNDS from '@/constants/SOUNDS'
import ORDALIES from '@/constants/ORDALIES'
import { getFrame } from '@/class/three/utils/Maths'
import AudioManager from '@/class/three/utils/AudioManager'

class OrdalieCroix {
  instance: Ordalie
  rigCuisinierFront
  animation: {
    mixer: THREE.AnimationMixer
    actions: {
      [key: string]: {
        action: THREE.AnimationAction
        frames: {
          frame: number
          sound: string
        }[]
        lastFrame: number
      }
    }
    play: (name: string) => void
  }
  // Gameplay
  debugObject: any
  timeScaleController: any
  difficultyData: CroixInterface
  container: HTMLDivElement
  planeTextReference: THREE.Mesh
  delay: number

  debugFolder: GUI

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.difficultyData = this.instance.block.getDifficultyData() as CroixInterface

    this.planeTextReference = this.instance.block.getModel().scene.children.find((child) => child.name === 'text') as THREE.Mesh

    this.setRigCuisinierFront()
    // this.toggleRigCuisinierFront(false)
    this.setAnimation()
  }

  setContainer(container: HTMLDivElement) {
    this.container = container
  }

  start() {
    window.addEventListener('resize', this.onResize)
    this.animation.play(ANIMATIONS.CROIX.SIDE_ENTREE)
    this.animation.play(ANIMATIONS.CROIX.FRONT_ENTREE)
    AudioManager.play('ordalie_croix_intro')
  }

  end() {
    window.removeEventListener('resize', this.onResize)
    this.instance.end()
    AudioManager.fadeOut('ordalie', 500)
  }

  onResize = () => {
    this.updateHTML()
  }

  private setRigCuisinierFront() {
    this.rigCuisinierFront = this.instance.block.getModel().scene.children.find((child) => child.name === 'RIG_Cuisinier_FRONT')
  }

  private toggleRigCuisinierFront(_value) {
    this.rigCuisinierFront.visible = _value
  }

  private setAnimation() {
    const mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)

    this.animation = {
      mixer,
      actions: {
        [ANIMATIONS.CROIX.FRONT_BRAS]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[0]),
          frames: SOUNDS[ORDALIES.CROIX][ANIMATIONS.CROIX.FRONT_BRAS].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.CROIX.FRONT_ENTREE]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[1]),
          frames: SOUNDS[ORDALIES.CROIX][ANIMATIONS.CROIX.FRONT_ENTREE].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.CROIX.FRONT_MORT]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[2]),
          frames: SOUNDS[ORDALIES.CROIX][ANIMATIONS.CROIX.FRONT_MORT].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.CROIX.FRONT_SORTIE]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[3]),
          frames: SOUNDS[ORDALIES.CROIX][ANIMATIONS.CROIX.FRONT_SORTIE].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.CROIX.SIDE_ENTREE]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[4]),
          frames: SOUNDS[ORDALIES.CROIX][ANIMATIONS.CROIX.SIDE_ENTREE].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.CROIX.SIDE_SORTIE]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[5]),
          frames: SOUNDS[ORDALIES.CROIX][ANIMATIONS.CROIX.SIDE_SORTIE].frames,
          lastFrame: 0,
        },
      },
      play: (name: string) => {
        this.animation.actions[name].action.play()
      },
    }

    this.delay = this.animation.actions[ANIMATIONS.CROIX.FRONT_ENTREE].action._clip.duration

    this.animation.actions[ANIMATIONS.CROIX.SIDE_ENTREE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.CROIX.SIDE_ENTREE].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.CROIX.FRONT_ENTREE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.CROIX.FRONT_ENTREE].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.CROIX.SIDE_SORTIE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.CROIX.SIDE_SORTIE].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.CROIX.FRONT_SORTIE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.CROIX.FRONT_SORTIE].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.loop = THREE.LoopOnce
    this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.timeScale = this.difficultyData.fallingSpeedArm

    this.animation.actions[ANIMATIONS.CROIX.FRONT_MORT].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.CROIX.FRONT_MORT].action.loop = THREE.LoopOnce

    this.animation.mixer.addEventListener('finished', (e) => this.onFinish(e))
  }

  onFinish(e) {
    const characterPos = new THREE.Vector3()

    //fin de l'anim classique, le mec a perdu
    if (e.direction === 1 && e.action._clip.name === ANIMATIONS.CROIX.FRONT_BRAS) {
      this.gameOver()
      return
    }

    if (e.action._clip.name === ANIMATIONS.CROIX.SIDE_ENTREE) {
      characterPos.set(this.instance.block.getCharacterRoot().position.x, this.instance.block.getCharacterRoot().position.y, this.instance.block.getCharacterRoot().position.z)
      this.toggleRigCuisinierFront(true)
      this.instance.block.getCharacterRoot().position.set(characterPos.x, characterPos.y, characterPos.z)
      // this.animation.actions['Croix_CuisinierSIDE_Entree'].stop()
      this.animation.actions[ANIMATIONS.CROIX.FRONT_ENTREE].action.stop()
      this.animation.play(ANIMATIONS.CROIX.FRONT_BRAS)
    }

    //le mec tape tellement vite qu'il remonte l'anim jusqu'au début
    if (e.direction === -1 && e.action._clip.name === ANIMATIONS.CROIX.FRONT_BRAS) {
      this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.stop()
      this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.play()
    }

    if (e.action._clip.name === ANIMATIONS.CROIX.SIDE_SORTIE || e.action._clip.name === ANIMATIONS.CROIX.FRONT_MORT) {
      this.end()
    }
  }

  armsUp() {
    this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.timeScale = -1

    setTimeout(() => {
      this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.timeScale = this.difficultyData.fallingSpeedArm
      // this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.timeScale = this.difficultyData.fallingSpeedArm
    }, 100)
  }

  gameWon() {
    this.animation.actions[ANIMATIONS.CROIX.SIDE_ENTREE].action.stop()
    // this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].stop()
    this.animation.play(ANIMATIONS.CROIX.SIDE_SORTIE)
    this.animation.play(ANIMATIONS.CROIX.FRONT_SORTIE)
    AudioManager.play('ordalie_croix_outro')
  }

  gameOver() {
    AudioManager.play('ordalie_croix_death')
    OrdalieManager.setIsDead(true)
    this.animation.actions[ANIMATIONS.CROIX.FRONT_BRAS].action.stop()
    this.animation.actions[ANIMATIONS.CROIX.FRONT_MORT].action.play()
  }

  updateHTML() {
    const positions = setHTMLPosition(this.planeTextReference)

    this.container.style.transform = `translate(${positions.topLeft.x}px,${positions.topLeft.y}px)`
    this.container.style.width = positions.width + 'px'

    const fontSize = positions.width / 27.78
    this.container.style.fontSize = fontSize - 1 + 'px'

    const lineHeight = positions.width / 24.19
    this.container.style.lineHeight = lineHeight + 'px'
  }

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001 * this.instance.block.getSpeedCoef())

    // for (const animation of Object.values(this.animation.actions)) {
    //   const time = animation.action.time
    //   const currentFrame = Math.ceil(getFrame(time))
    //   if (animation.action._clip.name === 'Croix_CuisinierFRONT_Mort') {
    //     console.log(animation.action._clip.name, currentFrame)
    //   }

    //   for (let j = 0; j < animation.frames.length; j++) {
    //     if (animation.frames[j].frame === currentFrame && animation.frames[j].frame !== animation.lastFrame) {
    //       AudioManager.play(animation.frames[j].sound)
    //     }
    //   }

    //   animation.lastFrame = currentFrame
    // }
  }
}

export default OrdalieCroix
