import GUI from 'lil-gui'
import * as THREE from 'three'
import DIFFICULTY_DATAS from '@/constants/DIFFICULTY_DATA'
import { CroixInterface } from '@/constants/DIFFICULTY_DATA'

import WebGL from '@/class/three/WebGL'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'
import Ordalie from '@/class/three/World/Ordalie/Ordalie'

import gsap from 'gsap'

class OrdalieCroix {
  instance: Ordalie
  animation!: { [key: string]: any }

  // Gameplay
  debugObject: any
  timeScaleController: any
  gameplayParams: CroixInterface

  debugFolder: GUI

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie
    this.gameplayParams = DIFFICULTY_DATAS[OrdalieManager.getDifficulty()].CROIX

    this.setAnimation()
    gsap.ticker.add(() => this.update())
    this.start()
  }

  start() {
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('OrdalieCroix')
    this.animation.play('Croix_CuisinierFRONT_Bras')
  }

  end() {
    this.animation.actions['Croix_CuisinierFRONT_Bras'].stop()
    this.animation.actions['Croix_CuisinierFRONT_Mort'].play()

    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)

    this.animation.mixer.addEventListener('finished', (e) => {
      //le mec tape tellement vite qu'il remonte l'anim jusqu'au début
      if (e.direction === -1) {
        this.animation.actions['Croix_CuisinierFRONT_Bras'].stop()
        this.animation.actions['Croix_CuisinierFRONT_Bras'].play()
      } else {
        this.end()
        //fin de l'anim classique, le mec a perdu
      }

      // this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale = 1
      // this.animation.actions['Croix_CuisinierFRONT_Bras'].play()
    })

    this.animation.actions = {
      Croix_CuisinierFRONT_Bras: this.animation.mixer.clipAction(this.instance.block.getModel().animations[0]),
      Croix_CuisinierFRONT_Mort: this.animation.mixer.clipAction(this.instance.block.getModel().animations[1]),
    }

    this.animation.actions['Croix_CuisinierFRONT_Bras'].clampWhenFinished = true
    this.animation.actions['Croix_CuisinierFRONT_Bras'].loop = THREE.LoopOnce
    this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale = this.gameplayParams.fallingSpeedArm
    // this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale = 1.5

    this.animation.actions['Croix_CuisinierFRONT_Mort'].clampWhenFinished = true
    this.animation.actions['Croix_CuisinierFRONT_Mort'].loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    if (this.debugFolder) {
      this.debugFolder.add(this.debugParams().animations, 'armsUp')
      this.debugFolder.add(this.debugParams().animations, 'startGame')
      this.debug()
    }
  }

  private debugParams() {
    return {
      animations: {
        armsUp: () => this.armsUp(),
        startGame: () => this.animation.actions['Croix_CuisinierFRONT_Bras'].play(),
      },
    }
  }

  private armsUp() {
    this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale = this.gameplayParams.upSpeedArm

    setTimeout(() => {
      this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale = this.gameplayParams.fallingSpeedArm
    }, this.gameplayParams.upDurationArm)
  }

  debug() {
    this.debugObject = {
      timeScale: this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale,
      time: this.animation.actions['Croix_CuisinierFRONT_Bras'].time,

      animations: {
        armsUp: () => this.armsUp(),
        startGame: () => {
          this.animation.actions['Croix_CuisinierFRONT_Bras'].play()
          // document.getElementById('input-typing').focus()
        },
      },
    }
    if (this.debug) {
      this.debugFolder.add(this.debugObject, 'timeScale').listen().disable()
      this.debugFolder.add(this.debugObject, 'time').step(0.01).listen().disable()
      this.debugFolder.add(this.debugObject.animations, 'armsUp')
      this.debugFolder.add(this.debugObject.animations, 'startGame')
    }
  }

  gameWon() {
    this.end()
  }

  gameOver() {
    OrdalieManager.setIsDead(true)
    console.log('gameover')
  }

  setHTMLPosition(container: HTMLDivElement) {
    //récupérer la taille de ce plane
    const plane = this.instance.block.getModel().scene.children.find((child) => child.name === 'text') as THREE.Mesh
    const planeSize = new THREE.Box3().setFromObject(plane)

    // console.log('plane size', planeSize)

    const topLeftCorner3D = new THREE.Vector3(planeSize.min.x, planeSize.max.y, planeSize.max.z)
    const topRightCorner3D = new THREE.Vector3(planeSize.max.x, planeSize.max.y, planeSize.max.z)
    // console.log('top left corner', topLeftCorner3D)
    // console.log('top right corner', topRightCorner3D)

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

  update() {
    const { deltaTime } = WebGL.time

    if (WebGL.debug.isActive()) {
      this.debugObject.timeScale = this.animation.actions['Croix_CuisinierFRONT_Bras'].timeScale
      this.debugObject.time = this.animation.actions['Croix_CuisinierFRONT_Bras'].time
    }

    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieCroix
