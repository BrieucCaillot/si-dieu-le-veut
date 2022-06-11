import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'

import TRANSITIONS from '@/constants/TRANSITIONS'
import OTHERS from '@/constants/OTHERS'

import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'
import OtherManager from '@/class/three/World/Other/OtherManager'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import OrdalieManager from '../Ordalie/OrdalieManager'

class Transition {
  block: Block
  instance: any
  animation!: { [key: string]: any }
  debugFolder: GUI
  updateId: () => void

  constructor(_type: TRANSITIONS) {
    this.block = new Block(_type)
    this.block.toggleGarde(false)
    this.block.toggleCharacter(false)
    this.block.showFront()

    this.setAnimation()
    this.updateId = this.update
  }

  start() {
    if (OrdalieManager.isPlayerDead) return this.hideTransition()
    this.block.showBehind()
    this.onStart()
    gsap.ticker.add(this.updateId)
    TransitionManager.onStarted()
  }

  onStart() {
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('Transition')
    this.block.toggleGarde(true)
    this.block.toggleCharacter(true)
    this.debugParams().animations.playGroupAnim()
  }

  end() {
    this.onEnd()
    gsap.ticker.remove(this.updateId)
    TransitionManager.onEnded()
    this.block.toggleCharacter(false)
  }

  onEnd() {
    if (this.debugFolder) this.debugFolder.destroy()
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.block.getModel().scene)
    this.animation.actions = {
      Transition_Garde: this.animation.mixer.clipAction(this.block.getModel().animations[0]),
      Transition_Cuisinier: this.animation.mixer.clipAction(this.block.getModel().animations[1]),
    }

    this.animation.actions['Transition_Garde'].clampWhenFinished = true
    this.animation.actions['Transition_Garde'].loop = THREE.LoopOnce
    this.animation.actions['Transition_Cuisinier'].clampWhenFinished = true
    this.animation.actions['Transition_Cuisinier'].loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      e.action.getClip().name.includes('Garde') && this.end()
    })

    // Debug
    this.debugFolder?.add(this.debugParams().animations, 'playGroupAnim')
  }

  hideTransition() {
    const transitionMaterials = new Set()
    this.block
      .getModel()
      .scene.children.filter((obj) => obj instanceof THREE.Mesh)
      .map((child) => transitionMaterials.add(child.material))

    gsap.to([[...transitionMaterials]], {
      opacity: 0,
      duration: 3,
      stagger: 1,
      onStart: () => this.showDeath(),
    })
  }

  showDeath() {
    OtherManager.startNext()
  }

  update = () => {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001 * this.block.getDifficultyData().speedCoef)
    console.log(`🔁 ${this.block.getType()}`)
  }

  private debugParams() {
    return {
      animations: {
        playGroupAnim: () => {
          this.animation.play('Transition_Garde')
          this.animation.play('Transition_Cuisinier')
        },
      },
    }
  }
}

export default Transition
