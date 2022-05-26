import GUI from 'lil-gui'
import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import Other from '@/class/three/World/Other/Other'

class OtherSplashscreen {
  instance: Other
  animation!: { [key: string]: any }
  character: THREE.Mesh
  isFollowingCharacter = false

  constructor(_other: Other) {
    this.instance = _other

    this.setAnimation()
    this.setCharacter()
  }

  start() {
    this.animation.play('Intro_Cuisinier')
  }

  end() {
    this.instance.end()
  }

  private setAnimation() {
    this.animation = {}

    this.animation.mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)
    this.animation.actions = {
      Intro_Cuisinier: this.animation.mixer.clipAction(this.instance.block.getModel().animations[0]),
    }
    this.animation.actions['Intro_Cuisinier'].clampWhenFinished = true
    this.animation.actions['Intro_Cuisinier'].loop = THREE.LoopOnce
    this.animation.actions['Intro_Cuisinier'].timeScale = 3

    // Play the action
    this.animation.play = (name: string) => {
      this.animation.actions[name].play()
    }

    this.animation.mixer.addEventListener('finished', (e) => this.end())
  }

  private setCharacter() {
    const rig = this.instance.block.getModel().scene.children.find((child) => child.name === 'RIG_Cuisinier') as THREE.Mesh
    this.character = rig.children.find((child) => child.name === 'MAIN_SIDE_ROOT') as THREE.Mesh
  }

  update() {
    const { deltaTime } = WebGL.time

    this.animation.mixer.update(deltaTime * 0.001)

    console.log('🔁 OtherSplashscreen')

    if (this.isFollowingCharacter) return
    const characterPosition = this.character.getWorldPosition(new THREE.Vector3())

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
        playCharacterEnter: () => this.animation.play('Intro_Cuisinier'),
      },
    }
  }
}

export default OtherSplashscreen
