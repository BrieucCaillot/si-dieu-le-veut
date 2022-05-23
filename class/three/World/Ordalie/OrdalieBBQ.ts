import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import Block from '@/class/three/World/Block'
import WebGL from '@/class/three/WebGL'

import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

class OrdalieBBQ {
  ordalie: Ordalie
  block: Block
  texts: THREE.Object3D[]
  animation: { [key: string]: any }
  debugFolder: GUI
  forwardSpeed = 0.3

  constructor(_ordalie: Ordalie) {
    this.ordalie = _ordalie
    this.block = _ordalie.block
    this.texts = []
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('character')

    this.ordalie.block.getModel().scene.traverse((mesh) => {
      if (mesh.name.startsWith('text')) {
        this.texts.push(mesh)
      }
    })

    this.setAnimation()
  }

  setHTMLPosition(container: HTMLDivElement, i: number) {
    //récupérer la taille de ce plane
    const planeSize = new THREE.Box3().setFromObject(this.texts[i])

    const topLeftCorner3D = new THREE.Vector3(planeSize.min.x, planeSize.max.y, planeSize.max.z)
    const topRightCorner3D = new THREE.Vector3(planeSize.max.x, planeSize.max.y, planeSize.max.z)

    //récupérer la position dans l'espace 2D de ce point en haut à gauche
    topLeftCorner3D.project(WebGL.camera.instance)
    const x1 = (topLeftCorner3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth
    const y = (topLeftCorner3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight

    topRightCorner3D.project(WebGL.camera.instance)
    const x2 = (topRightCorner3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth

    container.style.transform = `translate(${x1}px,${y}px)`

    const width = Math.abs(x1 - x2)
    container.style.width = width + 'px'
  }

  setAnimation() {
    this.animation = {}

    // Mixer
    this.animation.mixer = new THREE.AnimationMixer(this.ordalie.block.getModel().scene)

    // Actions
    this.animation.actions = {}

    this.animation.actions.idleLeft = this.animation.mixer.clipAction(this.block.getModel().animations[0])
    this.animation.actions.idleRight = this.animation.mixer.clipAction(this.block.getModel().animations[1])
    this.animation.actions.walkLeftRight = this.animation.mixer.clipAction(this.block.getModel().animations[2])
    this.animation.actions.walkRightLeft = this.animation.mixer.clipAction(this.block.getModel().animations[3])

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
      this.debugFolder.add(this.debugParams().animations, 'playWalkLeftRight')
      this.debugFolder.add(this.debugParams().animations, 'playWalkRightLeft')
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
          console.log('allo')

          this.animation.play('walkLeftRight')
        },
        playWalkRightLeft: () => {
          this.animation.play('walkRightLeft')
        },
      },
    }
  }

  makeAStep() {
    console.log('current position is', this.block.getCharacterModel().position.x)
    this.debugParams().animations.playWalkLeftRight()
    gsap.to(this.block.getCharacterModel().position, {
      x: this.block.getCharacterModel().position.x + this.forwardSpeed,
      onComplete: () => {
        console.log('new position is', this.block.getCharacterModel().position.x)
      },
    })
  }

  update() {
    const { deltaTime } = WebGL.time

    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieBBQ
