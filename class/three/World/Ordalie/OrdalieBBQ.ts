import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'

import { BBQInterface } from '@/constants/DIFFICULTY_DATA'

import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import WebGL from '@/class/three/WebGL'

import fragmentShader from '@/class/three/shaders/burning/fragment.glsl'
import vertexShader from '@/class/three/shaders/burning/vertex.glsl'

import characterBurningFrag from '@/class/three/shaders/characterBurning/fragment.glsl'
import characterBurningVert from '@/class/three/shaders/characterBurning/vertex.glsl'
import { MeshStandardMaterial } from 'three'

class OrdalieBBQ {
  instance: Ordalie
  character: THREE.Mesh
  characterPosEntreeEnd = new THREE.Vector3(0)
  characterPosSortieStart = new THREE.Vector3(0)
  texts: THREE.Mesh[]

  // Gameplay
  animation: { [key: string]: any }
  forwardSpeed = 0.11
  modulo = 0
  uniforms: any
  isGameWon = false
  difficultyData: BBQInterface

  debugFolder: GUI

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.difficultyData = this.instance.block.getDifficultyData() as BBQInterface
    this.texts = []

    this.instance.block.getModel().scene.traverse((mesh) => {
      if (mesh.name.startsWith('text')) {
        this.texts.push(mesh)
      }
    })

    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('OrdalieBBQ')

    const texture = this.texts[0].material.map
    const noise = WebGL.resources.getItems(this.instance.block.getType(), 'noise') as THREE.Texture
    const gradient = WebGL.resources.getItems(this.instance.block.getType(), 'gradient') as THREE.Texture

    this.setCharacter()
    this.setAnimation()

    this.uniforms = {
      uNoise: { value: noise },
      uGradient: { value: gradient },
    }

    for (let i = 0; i < this.texts.length; i++) {
      this.texts[i].material = new THREE.ShaderMaterial({
        uniforms: { ...this.uniforms, uTexture: { value: texture }, uDissolve: { value: 0 } },
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

    // this.start()
  }

  start() {
    this.animation.play('Braises_Cuisinier_Entree')
  }

  end() {
    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  private setCharacter() {
    const rig = this.instance.block.getModel().scene.children.find((child) => child.name === 'RIG_Cuisinier') as THREE.Mesh
    this.character = rig.children.find((child) => child.name === 'MAIN_SIDE_ROOT') as THREE.Mesh

    // this.instance.block.getModel().scene.traverse((mesh) => {
    //   if (mesh.material && mesh.material instanceof THREE.MeshStandardMaterial && mesh.name !== 'background') {
    //     console.log(mesh.material)
    //     const newMat = new THREE.MeshBasicMaterial({
    //       map: mesh.material.map,
    //       color: mesh.material.color,
    //       transparent: true,
    //     })
    //     mesh.material = newMat
    //     console.log(newMat)
    //   }
    // })
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)

    this.animation.actions = {
      Braises_Cuisinier_Avance: this.animation.mixer.clipAction(this.instance.block.getModel().animations[0]),
      Braises_Cuisinier_Entree: this.animation.mixer.clipAction(this.instance.block.getModel().animations[1]),
      Braises_Cuisinier_Idle: this.animation.mixer.clipAction(this.instance.block.getModel().animations[2]),
      Braises_Cuisinier_Mort: this.animation.mixer.clipAction(this.instance.block.getModel().animations[3]),
      Braises_Cuisinier_Sortie: this.animation.mixer.clipAction(this.instance.block.getModel().animations[4]),
    }

    this.animation.actions['Braises_Cuisinier_Avance'].clampWhenFinished = true
    this.animation.actions['Braises_Cuisinier_Avance'].loop = THREE.LoopOnce

    this.animation.actions['Braises_Cuisinier_Entree'].clampWhenFinished = true
    this.animation.actions['Braises_Cuisinier_Entree'].loop = THREE.LoopOnce

    this.animation.actions['Braises_Cuisinier_Idle'].timeScale = 1.2
    // this.animation.actions['Braises_Cuisinier_Idle'].clampWhenFinished = true
    // this.animation.actions['Braises_Cuisinier_Idle'].loop = THREE.LoopOnce
    this.animation.actions['Braises_Cuisinier_Mort'].clampWhenFinished = true
    this.animation.actions['Braises_Cuisinier_Mort'].loop = THREE.LoopOnce

    this.animation.actions['Braises_Cuisinier_Sortie'].clampWhenFinished = true
    this.animation.actions['Braises_Cuisinier_Sortie'].loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      if (e.action._clip.name === 'Braises_Cuisinier_Entree') {
        this.characterPosEntreeEnd.set(this.character.position.x, this.character.position.y, this.character.position.z)
        this.animation.actions['Braises_Cuisinier_Entree'].stop()
        this.character.position.set(this.characterPosEntreeEnd.x, this.characterPosEntreeEnd.y, this.characterPosEntreeEnd.z)
        this.animation.actions['Braises_Cuisinier_Idle'].play()
      }

      if (e.action._clip.name === 'Braises_Cuisinier_Avance') {
        this.animation.actions['Braises_Cuisinier_Avance'].stop()
        this.animation.actions['Braises_Cuisinier_Idle'].reset()
        this.animation.play('Braises_Cuisinier_Idle')
      }

      if (e.action._clip.name === 'Braises_Cuisinier_Mort' || e.action._clip.name === 'Braises_Cuisinier_Sortie') {
        this.end()
      }
    })

    // Debug
    // if (WebGL.debug.isActive()) {
    //   this.debugFolder.add(this.debugParams().animations, 'playCharacterEnter')
    // }
  }

  makeAStep() {
    if (this.isGameWon) return

    this.animation.actions['Braises_Cuisinier_Avance'].stop()
    this.animation.play('Braises_Cuisinier_Avance')

    this.animation.actions['Braises_Cuisinier_Idle'].crossFadeTo(this.animation.actions['Braises_Cuisinier_Avance'], 0.16)

    gsap.to(this.character.position, {
      x: this.character.position.x + this.forwardSpeed,
      duration: 1,
    })
  }

  gameWon() {
    this.isGameWon = true

    this.animation.actions['Braises_Cuisinier_Idle'].stop()
    this.characterPosSortieStart.set(this.character.position.x, this.character.position.y, this.character.position.z)
    this.animation.play('Braises_Cuisinier_Sortie')
    this.character.position.set(this.characterPosSortieStart.x, this.characterPosSortieStart.y, this.characterPosSortieStart.z)

    this.animation.actions['Braises_Cuisinier_Idle'].crossFadeTo(this.animation.actions['Braises_Cuisinier_Sortie'], 0.16)
  }

  gameOver() {
    OrdalieManager.setIsDead(true)
    // this.animation.actions['Braises_Cuisinier_Entree'].fadeOut(0)
    this.animation.actions['Braises_Cuisinier_Idle'].stop()
    this.animation.play('Braises_Cuisinier_Mort')
    this.animation.actions['Braises_Cuisinier_Idle'].crossFadeTo(this.animation.actions['Braises_Cuisinier_Mort'], 0.16)

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

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieBBQ
