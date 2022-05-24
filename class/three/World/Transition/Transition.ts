import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'

import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'
import TransitionManager from './TransitionManager'

class Transition {
  block: Block
  instance: any
  animation!: { [key: string]: any }
  debugFolder: GUI
  updateId: () => void

  constructor(_type: TRANSITIONS) {
    this.block = new Block(_type)
    this.updateId = this.update
  }

  start() {
    this.onStart()
    gsap.ticker.add(this.updateId)
    TransitionManager.onStarted()
  }

  onStart() {
    console.log('🏴‍☠️ STARTED ' + this.block.getType())

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('Transition')
    this.setAnimation()
  }

  end() {
    this.onEnd()
    TransitionManager.onEnded()
  }

  onEnd() {
    console.log('🏴‍☠️ ENDED' + this.block.getType())
  }

  setAnimation() {
    this.animation = {}
    this.animation.mixer = new THREE.AnimationMixer(this.block.getModel().scene)
    // console.log(this.block.getModel().animations.map((anim) => anim.name))
    this.animation.actions = {
      Transition_Garde1: this.animation.mixer.clipAction(this.block.getModel().animations[0]),
      Transition_Garde2: this.animation.mixer.clipAction(this.block.getModel().animations[1]),
      Transition_Cuisinier: this.animation.mixer.clipAction(this.block.getModel().animations[2]),
    }

    this.animation.actions['Transition_Garde1'].clampWhenFinished = true
    this.animation.actions['Transition_Garde1'].loop = THREE.LoopOnce
    this.animation.actions['Transition_Garde2'].clampWhenFinished = true
    this.animation.actions['Transition_Garde2'].loop = THREE.LoopOnce
    this.animation.actions['Transition_Cuisinier'].clampWhenFinished = true
    this.animation.actions['Transition_Cuisinier'].loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      if (e.action.getClip().name === 'Transition_Garde1') this.end()
    })

    // Debug
    if (WebGL.debug.active) {
      this.debugFolder.add(this.debugParams().animations, 'playGroupAnim')
    }
  }

  update = () => {
    const { deltaTime } = WebGL.time

    this.animation.mixer.update(deltaTime * 0.001)
  }

  private debugParams() {
    return {
      animations: {
        playGroupAnim: () => {
          this.animation.play('Transition_Garde1')
          this.animation.play('Transition_Garde2')
          this.animation.play('Transition_Cuisinier')
        },
      },
    }
  }
}

export default Transition
