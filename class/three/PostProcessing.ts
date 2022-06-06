import * as THREE from 'three'
import GUI from 'lil-gui'
import gsap from 'gsap'
import { SelectiveBloomEffect, EffectComposer, EffectPass, RenderPass, BlendFunction, SMAAEffect, TextureEffect, ClearPass } from 'postprocessing'
import { watch } from 'vue'

import WebGL from '@/class/three/WebGL'

class PostProcessing {
  private renderScene: RenderPass
  private composer: EffectComposer
  private textureEffect: TextureEffect
  private debugFolder: GUI
  private debugParams: { [key: string]: any }

  constructor() {
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('PostProcessing')

    this.createRenderScene()
    this.createTextureEffect()
  }

  private createRenderScene() {
    this.renderScene = new RenderPass(WebGL.scene, WebGL.camera.instance!)
    this.renderScene.renderToScreen = false

    // const clearPass = new ClearPass(true)
    this.composer = new EffectComposer(WebGL.renderer.instance)
    // this.composer.addPass(clearPass)
    this.composer.addPass(this.renderScene)
  }

  private createTextureEffect() {
    this.textureEffect = new TextureEffect({
      blendFunction: BlendFunction.MULTIPLY,
      texture: WebGL.resources.getItems('COMMON', 'fabric_2') as THREE.Texture,
    })

    this.textureEffect.blendMode.opacity.value = 0.705

    const effectPass = new EffectPass(WebGL.camera.instance, this.textureEffect)
    this.composer.addPass(effectPass)

    // DEBUG
    if (this.debugFolder) {
      this.debugParams = {
        effect: this.textureEffect,
        opacity: this.textureEffect.blendMode.opacity.value,
        blendMode: this.textureEffect.blendMode.blendFunction,
        texture: {
          dust: WebGL.resources.getItems('COMMON', 'dust') as THREE.Texture,
          normal: WebGL.resources.getItems('COMMON', 'normal') as THREE.Texture,
          scratches: WebGL.resources.getItems('COMMON', 'scratches') as THREE.Texture,
          fabric_1: WebGL.resources.getItems('COMMON', 'fabric_1') as THREE.Texture,
          fabric_2: WebGL.resources.getItems('COMMON', 'fabric_2') as THREE.Texture,
          fabric_3: WebGL.resources.getItems('COMMON', 'fabric_3') as THREE.Texture,
          textile_1: WebGL.resources.getItems('COMMON', 'textile_1') as THREE.Texture,
          textile_2: WebGL.resources.getItems('COMMON', 'textile_2') as THREE.Texture,
        },
      }

      this.debugFolder.add(this.debugParams, 'opacity', 0, 1).onChange(() => {
        this.textureEffect.blendMode.opacity.value = this.debugParams.opacity
      })
      this.debugFolder.add(this.debugParams, 'blendMode', BlendFunction).onChange(() => {
        this.textureEffect.blendMode.blendFunction = this.debugParams.blendMode
      })
      this.debugFolder.add(this.debugParams, 'texture', this.debugParams.texture).onChange((t) => {
        this.textureEffect.texture = t
      })

      const subFolder1 = this.debugFolder.addFolder('UV Transformation')
      subFolder1.add(this.debugParams.effect.texture, 'rotation', 0.0, 2.0 * Math.PI, 0.001).onChange((value) => {
        this.textureEffect.texture.rotation = value
      })

      const subFolder2 = this.debugFolder.addFolder('offset').open(false)
      subFolder2.add(this.textureEffect.texture.offset, 'x', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.offset.x = value
      })
      subFolder2.add(this.textureEffect.texture.offset, 'y', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.offset.y = value
      })

      const subFolder3 = this.debugFolder.addFolder('repeat').open(false)
      subFolder3.add(this.textureEffect.texture.repeat, 'x', 0.0, 2.0, 0.001).onChange((value) => {
        this.textureEffect.texture.repeat.x = value
      })
      subFolder3.add(this.textureEffect.texture.repeat, 'y', 0.0, 2.0, 0.001).onChange((value) => {
        this.textureEffect.texture.repeat.y = value
      })

      const subFolder4 = this.debugFolder.addFolder('center').open(false)
      subFolder4.add(this.textureEffect.texture.center, 'x', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.center.x = value
      })
      subFolder4.add(this.textureEffect.texture.center, 'y', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.center.y = value
      })
    }
  }

  onCameraMove() {
    this.textureEffect.texture.offset.x = WebGL.camera.getPosition().x * 0.75
  }

  onUpdate() {
    this.composer.render()
  }
}

export default PostProcessing
