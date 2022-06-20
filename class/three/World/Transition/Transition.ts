import gsap from 'gsap'
import * as THREE from 'three'

import ANIMATIONS from '@/constants/ANIMATIONS'
import TRANSITIONS from '@/constants/TRANSITIONS'
import SOUNDS, { TRANSITION_4 } from '@/constants/SOUNDS'

import AudioManager from '@/class/three/utils/AudioManager'
import { getFrame } from '@/class/three/utils/Maths'

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

    this.block.moveBehind()
    this.block.toggleGarde(true)
    this.block.toggleCharacter(true)
    this.debugParams().animations.playGroupAnim()

    AudioManager.play('transition_ambient')

    TransitionManager.onStarted()
    gsap.ticker.add(this.updateId)
  }

  end() {
    AudioManager.fadeOut('transition_ambient', 100)
    this.block.moveDefault()
    this.block.toggleCharacter(false)

    setTimeout(() => {
      this.block.toggleGarde(false)
      this.block.dipose()
      this.animation.mixer.uncacheRoot(this.block.getModel().scene)
    }, 6000)

    TransitionManager.onEnded()
    gsap.ticker.remove(this.updateId)
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

    // if (WebGL.debug.isActive()) {
    //   const folder = WebGL.debug.addFolder('Transition')
    //   folder.add(this.uniforms.uDissolve, 'value', 0, 1, 0.01).name('Dissolve')
    // }

    // Scene
    this.planeTexture.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: this.planeTexture.material.map } },
      vertexShader: vertexShader,
      fragmentShader: fragmentShader,
      transparent: true,
    })

    // Background
    this.planeBackground.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uColor: { value: this.planeBackground.material.color } },
      vertexShader: backgroundBurningVert,
      fragmentShader: backgroundBurningFrag,
      transparent: true,
    })

    // Character
    this.characterSide = this.block.getCharacterSide()
    this.characterSide.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: this.characterSide.material.map } },
      vertexShader: characterBurningVert,
      fragmentShader: characterBurningFrag,
    })

    // Garde
    const gardeMesh = this.block.getGardeModel().children.find((mesh: THREE.Mesh) => mesh.name === 'Garde')
    gardeMesh.material = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms, uTexture: { value: gardeMesh.material.map } },
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
    const mixer = new THREE.AnimationMixer(this.block.getModel().scene)

    console.log(this.block.getType())

    if (this.block.getType() === TRANSITIONS.TRANSITION_4) {
    }

    this.animation = {
      mixer,
      actions: {
        [ANIMATIONS.TRANSITION.GARDE]: {
          action: mixer.clipAction(this.block.getModel().animations[0]),
          frames: this.block.getType() === TRANSITIONS.TRANSITION_4 ? TRANSITION_4[ANIMATIONS.TRANSITION.GARDE].frames : SOUNDS['TRANSITIONS'][ANIMATIONS.TRANSITION.GARDE].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.TRANSITION.CUISINIER]: {
          action: mixer.clipAction(this.block.getModel().animations[1]),
          frames: this.block.getType() === TRANSITIONS.TRANSITION_4 ? TRANSITION_4[ANIMATIONS.TRANSITION.CUISINIER].frames : SOUNDS['TRANSITIONS'][ANIMATIONS.TRANSITION.CUISINIER].frames,
          lastFrame: 0,
        },
      },
      play: (name: string) => {
        this.animation.actions[name].action.play()
      },
    }

    this.animation.actions[ANIMATIONS.TRANSITION.GARDE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.TRANSITION.GARDE].action.loop = THREE.LoopOnce
    this.animation.actions[ANIMATIONS.TRANSITION.CUISINIER].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.TRANSITION.CUISINIER].action.loop = THREE.LoopOnce

    // Play the action

    this.animation.mixer.addEventListener('finished', (e) => {
      e.action.getClip().name.includes('Garde') && this.end()
    })
  }

  update = () => {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001 * this.block.getSpeedCoef())
    console.log(`🔁 ${this.block.getType()}`)

    for (const animation of Object.values(this.animation.actions)) {
      const time = animation.action.time
      const currentFrame = Math.ceil(getFrame(time))
      if (animation.action._clip.name === 'Croix_CuisinierFRONT_Mort') {
        console.log(animation.action._clip.name, currentFrame)
      }

      for (let j = 0; j < animation.frames.length; j++) {
        if (animation.frames[j].frame === currentFrame && animation.frames[j].frame !== animation.lastFrame) {
          AudioManager.play(animation.frames[j].sound)
        }
      }

      animation.lastFrame = currentFrame
    }
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
