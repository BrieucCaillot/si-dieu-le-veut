import gsap from 'gsap'
import GUI from 'lil-gui'
import * as THREE from 'three'

import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Block from '@/class/three/World/Block'
import OtherManager from '@/class/three/World/Other/OtherManager'
import TransitionManager from '@/class/three/World/Transition/TransitionManager'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

import fragmentShader from '@/class/three/shaders/burning/fragment.glsl'
import vertexShader from '@/class/three/shaders/burning/vertex.glsl'

class Transition {
  block: Block
  instance: any
  animation!: { [key: string]: any }
  debugFolder: GUI
  updateId: () => void
  text: THREE.Mesh
  transitionObj: THREE.Mesh

  constructor(_type: TRANSITIONS) {
    this.block = new Block(_type)
    this.block.toggleGarde(false)
    this.block.toggleCharacter(false)
    this.block.showFront()

    this.changeMaterial()

    this.setAnimation()
    this.updateId = this.update

    this.block.getModel().scene.traverse((object: THREE.Object3D) => {
      if (object.name === 'texte') {
        this.text = object as THREE.Mesh
      }
    })
  }

  start() {
    this.block.showBehind()
    if (OrdalieManager.isPlayerDead) return this.hide()
    this.onStart()
    gsap.ticker.add(this.updateId)
    TransitionManager.onStarted()
  }

  onStart() {
    useStore().isTransition.value = true

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

  changeMaterial() {
    const objs = this.block.getModel().scene.children.filter((obj) => obj.material)

    this.transitionObj = objs.find((obj) => obj.material.name === 'transition_texture')

    const uniforms = {
      uNoise: { value: WebGL.resources.getItems('COMMON', 'noise-3') },
      uGradient: { value: WebGL.resources.getItems('COMMON', 'gradient-1') },
      uDissolve: { value: 0 },
    }

    const texture = this.transitionObj.material.map
    texture.encoding = THREE.LinearEncoding

    const newTransitionMat = new THREE.ShaderMaterial({
      uniforms: { ...uniforms, uTexture: { value: texture } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    })

    this.transitionObj.material = newTransitionMat

    const backgroundObj = objs.find((obj) => obj.material.name === 'background')

    const newBackgroundMat = new THREE.ShaderMaterial({
      uniforms: { ...uniforms, uTexture: { value: null } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
    })

    backgroundObj.material = newBackgroundMat
  }

  hide() {
    gsap.to(this.transitionObj.material.uniforms.uDissolve, {
      delay: 1,
      value: 1,
      duration: 3,
      ease: 'linear',
      onComplete: () => {
        OtherManager.startNext()
      },
    })
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
