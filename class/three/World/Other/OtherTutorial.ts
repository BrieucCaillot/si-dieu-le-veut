import GUI from 'lil-gui'
import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import Other from '@/class/three/World/Other/Other'
import Block from '@/class/three/World/Block'

class OtherTutorial {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI

  constructor(_other: Other) {
    this.instance = _other

    // if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('Other Transition')

    this.setAnimation()
  }

  start() {
    this.animation.play('Fake_Anim')
  }

  end() {
    this.instance.end()
  }

  private setAnimation() {
    this.animation = {}

    // this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)
    // this.animation.actions = {
    //   Character_Enter: this.animation.mixer.clipAction(this.instance.block.getModel().animations[0]),
    // }
    // this.animation.actions.Character_Enter.clampWhenFinished = true
    // this.animation.actions.Character_Enter.loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      // TODO
      // Fake anim played
      setTimeout(() => {
        console.log('👨‍💼 ANIM PLAYED')
        this.end()
      }, 10)
      // }, 5000)
      // this.animation.actions[name].play()
    }

    // this.animation.mixer.addEventListener('finished', (e) => this.end())

    // Debug
    // if (WebGL.debug.isActive()) {
    //   this.debugFolder.add(this.debugParams().animations, 'playCharacterEnter')
    // }
  }

  update() {
    console.log('🔁 OtherTutorial')
  }
}

export default OtherTutorial
