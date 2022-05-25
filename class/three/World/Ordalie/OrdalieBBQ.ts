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
  character: THREE.Mesh

  constructor(_ordalie: Ordalie) {
    this.ordalie = _ordalie
    this.block = _ordalie.block
    this.texts = []
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.gui.addFolder('character')

    this.ordalie.block.getModel().scene.traverse((mesh) => {
      if (mesh.name.startsWith('text')) {
        this.texts.push(mesh)
        console.log(mesh.name)
      }
    })

    const texture = this.texts[0].material.map
    const noise = WebGL.resources.getItems(this.block.getType(), 'noise') as THREE.Texture
    const gradient = WebGL.resources.getItems(this.block.getType(), 'gradient') as THREE.Texture

    this.setCharacter()
    this.setAnimation()

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

      // if (this.debugFolder) {
      //   this.debugFolder
      //     .add(this.texts[i].material.uniforms.uDissolve, 'value', -0.1, 1.1)
      //     .step(0.01)
      //     .onChange((value) => {
      //       this.texts[i].material.uniforms.uDissolve.value = value
      //     })
      // }
    }
  }

  private setCharacter() {
    const rig = this.block.getModel().scene.children.find((child) => child.name === 'RIG_Cuisinier') as THREE.Mesh
    this.character = rig.children.find((child) => child.name === 'MAIN_SIDE_ROOT') as THREE.Mesh
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.block.getModel().scene)

    console.log(this.block.getModel())

    this.animation.actions = {
      Braises_Cuisinier_Avance: this.animation.mixer.clipAction(this.block.getModel().animations[0]),
      Braises_Cuisinier_Idle: this.animation.mixer.clipAction(this.block.getModel().animations[1]),
    }
    this.animation.actions['Braises_Cuisinier_Avance'].clampWhenFinished = true
    this.animation.actions['Braises_Cuisinier_Avance'].loop = THREE.LoopOnce

    this.animation.actions['Braises_Cuisinier_Idle'].timeScale = 1.2
    // this.animation.actions['Braises_Cuisinier_Idle'].clampWhenFinished = true
    // this.animation.actions['Braises_Cuisinier_Idle'].loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.play('Braises_Cuisinier_Idle')

    this.animation.mixer.addEventListener('finished', (e) => {
      console.log(e)
      if (e.action._clip.name === 'Braises_Cuisinier_Avance') {
        this.animation.actions['Braises_Cuisinier_Avance'].stop()
        this.animation.actions['Braises_Cuisinier_Idle'].reset()
        this.animation.play('Braises_Cuisinier_Idle')
      }
    })

    // Debug
    // if (WebGL.debug.isActive()) {
    //   this.debugFolder.add(this.debugParams().animations, 'playCharacterEnter')
    // }
  }

  makeAStep() {
    // this.debugParams().animations.playWalkLeftRight()

    // console.log(this.character.position.x)

    this.animation.actions['Braises_Cuisinier_Avance'].stop()
    this.animation.play('Braises_Cuisinier_Avance')

    this.animation.actions['Braises_Cuisinier_Idle'].crossFadeTo(this.animation.actions['Braises_Cuisinier_Avance'], 0.16)

    // this.character.position.x += this.forwardSpeed

    gsap.to(this.character.position, {
      x: this.character.position.x + this.forwardSpeed,
      duration: 1,
      onComplete: () => {
        console.log('new pos', this.character.position.x)
      },
    })
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

  // setAnimation() {
  //   this.animation = {}

  //   // Mixer
  //   this.animation.mixer = new THREE.AnimationMixer(this.ordalie.block.getModel().scene)

  //   // Actions
  //   this.animation.actions = {}

  //   this.animation.actions.idleLeft = this.animation.mixer.clipAction(this.block.getModel().animations[0])
  //   this.animation.actions.idleRight = this.animation.mixer.clipAction(this.block.getModel().animations[1])
  //   this.animation.actions.walkLeftRight = this.animation.mixer.clipAction(this.block.getModel().animations[2])
  //   this.animation.actions.walkRightLeft = this.animation.mixer.clipAction(this.block.getModel().animations[3])

  //   this.animation.actions.current = this.animation.actions.idleRight
  //   this.animation.actions.current.play()

  //   // Play the action
  //   this.animation.play = (name: string) => {
  //     const newAction = this.animation.actions[name]
  //     if (name === 'walkLeftRight' || name === 'walkRightLeft') {
  //       newAction.setLoop(THREE.LoopOnce)
  //       newAction.clampWhenFinished = false
  //     }
  //     const oldAction = this.animation.actions.current
  //     oldAction.stop()
  //     newAction.play()

  //     this.animation.actions.current = newAction
  //   }

  //   this.animation.mixer.addEventListener('finished', (e) => {
  //     switch (e.action._clip.name) {
  //       case 'Walk_Left-Right':
  //         this.animation.play('idleRight')
  //         break
  //       case 'Walk_Right-Left':
  //         this.animation.play('idleLeft')
  //         break
  //     }
  //   })

  //   // Debug
  //   if (WebGL.debug.active) {
  //     // this.debugFolder.add(this.debugParams().animations, 'playWalkLeftRight')
  //     // this.debugFolder.add(this.debugParams().animations, 'playWalkRightLeft')
  //   }
  // }

  // debugParams() {
  //   return {
  //     animations: {
  //       playIdleLeft: () => {
  //         this.animation.play('idleLeft')
  //       },
  //       playIdleRight: () => {
  //         this.animation.play('idleRight')
  //       },
  //       playWalkLeftRight: () => {
  //         this.animation.play('walkLeftRight')
  //       },
  //       playWalkRightLeft: () => {
  //         this.animation.play('walkRightLeft')
  //       },
  //     },
  //   }
  // }

  onGameEnded() {}

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieBBQ
