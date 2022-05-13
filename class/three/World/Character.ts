import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'

import CHARACTER from '@/constants/CHARACTER'

class Character extends THREE.EventDispatcher {
  debugFolder: { [key: string]: any } | undefined
  resource: GLTF
  baseTexture: THREE.Texture | undefined
  model!: THREE.Object3D
  animation!: { [key: string]: any }

  constructor() {
    super()

    // Debug
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('character')

    // Resource
    this.resource = WebGL.resources.itemsLoaded['characterModel'] as GLTF
    this.baseTexture = WebGL.resources.itemsLoaded['characterTexture'] as THREE.Texture

    this.setModel()
    this.setAnimation()

    window.addEventListener('keydown', this.onKeyPressed)
  }

  setModel() {
    this.model = this.resource.scene
    this.model.scale.set(1, 1, 1)
    this.model.name = EntitiesName.CHARACTER
    // this.model.rotateY(Math.PI / 2)
    WebGL.scene.add(this.model)

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
      }
    })
  }

  setAnimation() {
    this.animation = {}

    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.model)

    // Actions
    this.animation.actions = {}

    this.animation.actions.idleLeft = this.animation.mixer.clipAction(this.resource.animations[0])
    this.animation.actions.idleRight = this.animation.mixer.clipAction(this.resource.animations[1])
    this.animation.actions.walkLeftRight = this.animation.mixer.clipAction(this.resource.animations[2])
    this.animation.actions.walkRightLeft = this.animation.mixer.clipAction(this.resource.animations[3])

    this.animation.actions.current = this.animation.actions.idleRight
    this.animation.actions.current.play()

    // Play the action
    this.animation.play = (name: string) => {
      const newAction = this.animation.actions[name]
      if (name === 'walkLeftRight' || name === 'walkRightLeft') {
        newAction.setLoop(THREE.LoopOnce)
        newAction.clampWhenFinished = false
      }
      const oldAction = this.animation.actions.current
      oldAction.stop()
      newAction.play()
      // newAction.crossFadeFrom(oldAction, 1)

      this.animation.actions.current = newAction
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      switch (e.action._clip.name) {
        case 'Walk_Left-Right':
          this.animation.play('idleRight')
          break
        case 'Walk_Right-Left':
          this.animation.play('idleLeft')
          break
      }
    })

    // Debug
    if (WebGL.debug.active) {
      // this.debugFolder!.add(this.debugParams().animations, 'playIdleLeft')
      // this.debugFolder!.add(this.debugParams().animations, 'playIdleRight')
      this.debugFolder!.add(this.debugParams().animations, 'playWalkLeftRight')
      this.debugFolder!.add(this.debugParams().animations, 'playWalkRightLeft')
    }
  }

  debugParams() {
    return {
      animations: {
        playIdleLeft: () => {
          this.animation.play('idleLeft')
        },
        playIdleRight: () => {
          this.animation.play('idleRight')
        },
        playWalkLeftRight: () => {
          this.animation.play('walkLeftRight')
        },
        playWalkRightLeft: () => {
          this.animation.play('walkRightLeft')
        },
      },
    }
  }

  onKeyPressed = (e) => {
    const forward = 0.3
    switch (e.key) {
      case 'a':
        this.debugParams().animations.playWalkLeftRight()
        gsap.to(this.model.position, {
          x: this.model.position.x + forward,
        })
        break

      case 'd':
        this.debugParams().animations.playWalkRightLeft()
        gsap.to(this.model.position, {
          x: this.model.position.x + forward,
        })
        break
    }
  }

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default Character
