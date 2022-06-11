import * as THREE from 'three'

import ANIMATIONS from '@/constants/ANIMATIONS'
import OTHERS from '@/constants/OTHERS'
import SOUNDS from '@/constants/SOUNDS'

import WebGL from '@/class/three/WebGL'
import Other from '@/class/three/World/Other/Other'
import OtherManager from './OtherManager'

class OtherSplashscreen {
  instance: Other
  character: THREE.Mesh
  isFollowingCharacter = false
  animation: {
    mixer: THREE.AnimationMixer
    actions: {
      [key: string]: {
        action: THREE.AnimationAction
        frames: {
          frame: number
          sound: string
        }[]
        lastFrame: number
      }
    }
    play: (name: string) => void
  }

  constructor(_other: Other) {
    this.instance = _other

    this.setAnimation()
    this.setCharacter()
    this.toggleFrustrumOnCharacters(false)

    OtherManager.setSplashscreenRef(this)
  }

  start() {
    this.playAnimFromOther(OTHERS.SPLASHSCREEN)
  }

  end() {
    this.instance.end()
  }

  private setAnimation() {
    const mixer = new THREE.AnimationMixer(this.instance.block.getModel().scene)

    this.animation = {
      mixer,
      actions: {
        [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[0]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[1]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[2]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[3]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[4]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[5]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[6]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[7]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3].frames,
          lastFrame: 0,
        },
        [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION4]: {
          action: mixer.clipAction(this.instance.block.getModel().animations[8]),
          frames: SOUNDS[OTHERS.SPLASHSCREEN][ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION4].frames,
          lastFrame: 0,
        },
      },
      play: (name: string) => {
        this.animation.actions[name].action.play()
      },
    }
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE].action.loop = THREE.LoopRepeat

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE].action.loop = THREE.LoopRepeat

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3].action.loop = THREE.LoopOnce

    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION4].action.clampWhenFinished = true
    this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION4].action.loop = THREE.LoopOnce

    // Play the action
    this.animation.mixer.addEventListener('finished', (e) => this.onFinish(e))
  }

  onFinish(e) {
    this.isFollowingCharacter = false

    if (e.action._clip.name === ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1) {
      this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1].action.stop()
      this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE)
      this.end()
    }
    // If last animation is finished
    if (e.action._clip.name === ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4) {
      this.instance.removeUpdate()
    }
  }

  playAnimFromOther(other: OTHERS) {
    this.isFollowingCharacter = false

    switch (other) {
      case OTHERS.SPLASHSCREEN:
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1)
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE)
        break
      case OTHERS.CINEMATIC_1:
        // console.log('DO NOT PLAY ON CINEMATIC_1')
        break
      case OTHERS.CINEMATIC_2:
        // console.log('PLAY ON CINEMATIC_2')
        this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE].action.stop()
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2)
        this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE].action.stop()
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2)

        break
      case OTHERS.CINEMATIC_3:
        // console.log('PLAY ON CINEMATIC_3')
        this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2].action.stop()
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3)
        this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2].action.stop()
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3)
        break
      case OTHERS.TUTORIAL:
        // console.log('PLAY ON TUTORIAL')
        this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3].action.stop()
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4)
        this.animation.actions[ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3].action.stop()
        this.animation.play(ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION4)
        break
    }
  }

  private setCharacter() {
    const rig = this.instance.block.getModel().scene.children.find((child) => child.name === 'RIG_Cuisinier') as THREE.Mesh
    this.character = rig.children.find((child) => child.name === 'MAIN_SIDE_ROOT') as THREE.Mesh
  }

  toggleFrustrumOnCharacters(value: boolean) {
    this.instance.block.getModel().scene.traverse((child) => {
      if (child.type === 'SkinnedMesh') child.frustumCulled = value
    })
  }

  followCharacter() {
    const currentBlockType = OtherManager.getCurrent().block.getType() as OTHERS
    const characterPosition = this.character.getWorldPosition(new THREE.Vector3())

    // Return if current block type is not Splashscreen or Cinematic 2
    if (![OTHERS.SPLASHSCREEN].includes(currentBlockType)) return

    // END SPLASHSCREEN IF CHARACTER IS MOVING
    if (characterPosition.x > 0) {
      OtherManager.getCurrent().end()
      return (this.isFollowingCharacter = true)
    }
  }

  update() {
    const { deltaTime } = WebGL.time

    this.animation.mixer.update(deltaTime * 0.002)

    if (this.isFollowingCharacter) return
    this.followCharacter()
  }
}

export default OtherSplashscreen
