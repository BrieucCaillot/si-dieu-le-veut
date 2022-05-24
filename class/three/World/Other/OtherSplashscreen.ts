import GUI from 'lil-gui'
import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import Other from '@/class/three/World/Other/Other'

class OtherSplashscreen {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI
  isFollowingCharacter = false

  constructor(_other: Other) {
    this.instance = _other

    if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('Other Intro')

    this.setAnimation()
  }

  start() {
    this.animation.play('Character_Enter')
  }

  end() {
    this.instance.end()
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)
    this.animation.actions = {
      Character_Enter: this.animation.mixer.clipAction(this.instance.block.getModel().animations[0]),
    }
    this.animation.actions.Character_Enter.clampWhenFinished = true
    this.animation.actions.Character_Enter.loop = THREE.LoopOnce

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => this.end())

    // Debug
    if (WebGL.debug.active) {
      this.debugFolder.add(this.debugParams().animations, 'playCharacterEnter')
    }
  }

  update() {
    const { deltaTime } = WebGL.time

    this.animation.mixer.update(deltaTime * 0.001)

    console.log('🔁 OtherSplashscreen')

    if (this.isFollowingCharacter) return
    const characterPosition = this.instance.block.getCharacterModel().getWorldPosition(new THREE.Vector3())

    // MOVE CAMERA TO NEXT BLOCK
    // WHEN CHARACTER IN THE MIDDLE OF THE SCREEN
    if (characterPosition.x >= 0) {
      WebGL.camera.setPositionX(Blocks.getByIndex(1).getCenter().x)
      this.isFollowingCharacter = true
    }
  }

  private debugParams() {
    return {
      animations: {
        playCharacterEnter: () => this.animation.play('Character_Enter'),
      },
    }
  }
}

export default OtherSplashscreen
