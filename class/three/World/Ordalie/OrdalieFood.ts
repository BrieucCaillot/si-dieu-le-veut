import * as THREE from 'three'
import GUI from 'lil-gui'

import Ordalie from '@/class/three/World/Ordalie/Ordalie'
import WebGL from '@/class/three/WebGL'

class OrdalieFood {
  instance: Ordalie
  animation: { [key: string]: any }
  debugFolder: GUI

  constructor(_ordalie: Ordalie) {
    this.instance = _ordalie

    this.setAnimation()
  }

  start() {
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('OrdalieFood')
    setTimeout(() => {
      this.end()
    }, 3000)
    // this.animation.play('Braises_Cuisinier_Idle')
  }

  end() {
    if (this.debugFolder) this.debugFolder.destroy()
    this.instance.end()
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)

    this.animation.actions = {
      // Braises_Cuisinier_Avance: this.animation.mixer.clipAction(this.instance.block.getModel().animations[0]),
    }

    // this.animation.actions['Braises_Cuisinier_Avance'].clampWhenFinished = true

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => {
      // if (e.action._clip.name === 'Braises_Cuisinier_Avance') {
      // }
    })

    // Debug
    // if (WebGL.debug.isActive()) {
    //   this.debugFolder.add(this.debugParams().animations, 'playCharacterEnter')
    // }
  }

  update() {
    const { deltaTime } = WebGL.time
    this.animation.mixer.update(deltaTime * 0.001)
  }
}

export default OrdalieFood
