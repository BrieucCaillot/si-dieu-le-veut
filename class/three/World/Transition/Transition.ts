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

import characterBurningFrag from '@/class/three/shaders/characterBurning/fragment.glsl'
import characterBurningVert from '@/class/three/shaders/characterBurning/vertex.glsl'

import backgroundBurningFrag from '@/class/three/shaders/backgroundBurning/fragment.glsl'
import backgroundBurningVert from '@/class/three/shaders/backgroundBurning/vertex.glsl'

class Transition {
  block: Block
  instance: any
  animation!: { [key: string]: any }
  updateId: () => void
  text: THREE.Mesh
  characterSide: THREE.Mesh
  planeTexture: THREE.Mesh
  planeBackground: THREE.Mesh
  backgroundMaterial: THREE.Mesh
  uniforms: {
    uNoise: { value: THREE.Texture }
    uGradient: { value: THREE.Texture }
    uDissolve: { value: number }
  }

  constructor(_type: TRANSITIONS) {
    this.block = new Block(_type)
    this.block.toggleGarde(false)
    this.block.toggleCharacter(false)

    this.setPlaneRefs()
    this.changeMaterials()

    this.setAnimation()
    this.updateId = this.update

    this.text = this.block.getModel().scene.children.find((mesh: THREE.Mesh) => mesh.name === 'texte')
  }

  start() {
    if (OrdalieManager.isPlayerDead) return this.hide()

    this.block.showBehind()
    this.block.toggleGarde(true)
    this.block.toggleCharacter(true)
    this.debugParams().animations.playGroupAnim()

    gsap.ticker.add(this.updateId)
    TransitionManager.onStarted()
  }

  end() {
    this.block.showDefault()
    this.block.toggleCharacter(false)
    this.block.toggleGarde(false, true)
    gsap.ticker.remove(this.updateId)
    TransitionManager.onEnded()
  }

  setPlaneRefs() {
    const objs = this.block.getModel().scene.children.filter((obj) => obj.material)
    this.planeTexture = objs.find((obj) => obj.material.name === 'transition_texture')
    this.planeBackground = objs.find((obj) => obj.material.name === 'background')
  }

  changeMaterials() {
    this.uniforms = {
      uNoise: { value: WebGL.resources.getItems('COMMON', 'noise-3') },
      uGradient: { value: WebGL.resources.getItems('COMMON', 'gradient-1') },
      uDissolve: { value: 0 },
    }

    const texture = this.planeTexture.material.map

    this.planeTexture.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: texture } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    })

    this.planeBackground.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: null } },
      vertexShader: backgroundBurningVert,
      fragmentShader: backgroundBurningFrag,
    })

    // Character
    this.characterSide = this.block.getCharacterSide()
    const characterTexture = this.characterSide.material.map
    this.characterSide.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: characterTexture } },
      vertexShader: characterBurningVert,
      fragmentShader: characterBurningFrag,
    })

    // Garde

    const gardeMesh = this.block.getGardeModel().children.find((mesh: THREE.Mesh) => mesh.name === 'Garde')
    const gardeTexture = gardeMesh.material.map
    gardeMesh.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: gardeTexture } },
      vertexShader: characterBurningVert,
      fragmentShader: characterBurningFrag,
    })
  }

  hide() {
    gsap.to([this.planeTexture.material.uniforms.uDissolve, this.characterSide.material.uniforms.uDissolve], {
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
