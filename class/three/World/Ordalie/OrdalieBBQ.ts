import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import Block from '@/class/three/World/Block'
import WebGL from '@/class/three/WebGL'

import fragmentShader from '@/class/three/shaders/burning/fragment.glsl'
import vertexShader from '@/class/three/shaders/burning/vertex.glsl'

// import { UniformsUtils } from 'three'

import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

class OrdalieBBQ {
  ordalie: Ordalie
  block: Block
  texts: THREE.Mesh[]
  animation: { [key: string]: any }
  debugFolder: GUI
  forwardSpeed = 0.12
  modulo = 0
  uniforms: any

  constructor(_ordalie: Ordalie) {
    this.ordalie = _ordalie
    this.block = _ordalie.block
    this.texts = []
    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('character')

    this.ordalie.block.getModel().scene.traverse((mesh) => {
      if (mesh.name.startsWith('text')) {
        this.texts.push(mesh)
        console.log(mesh.name)
      }
    })

    console.log(this.texts)

    this.setAnimation()

    const texture = this.texts[0].material.map
    const noise = WebGL.resources.getItems(this.block.getType(), 'noise') as THREE.Texture
    const gradient = WebGL.resources.getItems(this.block.getType(), 'gradient') as THREE.Texture

    console.log(THREE.UniformsUtils)

    this.uniforms = {
      uTexture: { value: texture },
      uNoise: { value: noise },
      uGradient: { value: gradient },
      // uDissolve: { value: 0 },
    }

    for (let i = 0; i < this.texts.length; i++) {
      this.texts[i].material = new THREE.ShaderMaterial({
        uniforms: { ...this.uniforms, uDissolve: { value: 0 } },
        fragmentShader: fragmentShader,
        vertexShader: vertexShader,
        transparent: true,
      })

      this.debugFolder
        .add(this.texts[i].material.uniforms.uDissolve, 'value', -0.1, 1.1)
        .step(0.01)
        .onChange((value) => {
          this.texts[i].material.uniforms.uDissolve.value = value
        })
    }
  }

  gameOver() {
    for (let i = 0; i < this.texts.length; i++) {
      const uDissolve = this.texts[i].material.uniforms.uDissolve

      gsap.to(uDissolve, {
        value: 1,
        duration: 1,
      })
    }
  }

  setHTMLPosition(container: HTMLDivElement, i: number) {
    //récupérer la taille de ce plane
    const planeSize = new THREE.Box3().setFromObject(this.texts[i])

    const topLeftCorner3D = new THREE.Vector3(planeSize.min.x, planeSize.max.y, planeSize.max.z)
    const topRightCorner3D = new THREE.Vector3(planeSize.max.x, planeSize.max.y, planeSize.max.z)
    const bottomLeftCorner3D = new THREE.Vector3(planeSize.min.x, planeSize.min.y, planeSize.max.z)

    const center3D = new THREE.Vector3((topLeftCorner3D.x + topRightCorner3D.x) / 2, (topLeftCorner3D.y + bottomLeftCorner3D.y) / 2, planeSize.max.z)

    //récupérer la position dans l'espace 2D de ce point en haut à gauche
    center3D.project(WebGL.camera.instance)
    const x1 = (center3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth
    const y1 = (center3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight

    container.style.transform = `translate(${x1}px,${y1}px)`
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
      // this.debugFolder.add(this.debugParams().animations, 'playWalkLeftRight')
      // this.debugFolder.add(this.debugParams().animations, 'playWalkRightLeft')
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

  makeAStep() {
    if (this.modulo % 2 === 0) {
      this.debugParams().animations.playWalkLeftRight()

      gsap.to(this.block.getCharacterModel().position, {
        x: this.block.getCharacterModel().position.x + this.forwardSpeed,
        duration: 1,
      })
    } else {
      this.debugParams().animations.playWalkRightLeft()

      gsap.to(this.block.getCharacterModel().position, {
        x: this.block.getCharacterModel().position.x + this.forwardSpeed,
        duration: 1,
      })
    }

    this.modulo += 1
  }

  onGameEnded() {}

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieBBQ
