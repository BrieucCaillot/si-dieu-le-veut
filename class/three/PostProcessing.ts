import * as THREE from 'three'
import GUI from 'lil-gui'
import {
  EffectComposer,
  EffectPass,
  RenderPass,
  BlendFunction,
  TextureEffect,
  SepiaEffect,
  ColorAverageEffect,
  BrightnessContrastEffect,
  HueSaturationEffect,
  LUT3DEffect,
  LookupTexture,
  SMAAEffect,
  SMAAPreset,
  EdgeDetectionMode,
  PredicationMode,
} from 'postprocessing'

import WebGL from '@/class/three/WebGL'

class PostProcessing {
  private renderScene: RenderPass
  private composer: EffectComposer
  private textureEffect: TextureEffect
  private smaaEffect: SMAAEffect
  private debugFolder: GUI
  private debugParams: { [key: string]: any }

  constructor() {
    if (WebGL.debug.isActive()) this.debugFolder = WebGL.debug.addFolder('PostProcessing')

    this.createRenderScene()
    this.createLUTEffect()
    this.createSMAAEffect()
    this.createTextureEffect()
  }

  private createRenderScene() {
    this.renderScene = new RenderPass(WebGL.scene, WebGL.camera.instance!)
    this.renderScene.renderToScreen = false

    this.composer = new EffectComposer(WebGL.renderer.instance)
    this.composer.addPass(this.renderScene)
  }

  private createTextureEffect() {
    this.textureEffect = new TextureEffect({
      blendFunction: BlendFunction.MULTIPLY,
      texture: WebGL.resources.getItems('COMMON', 'fabric') as THREE.Texture,
    })

    this.textureEffect.blendMode.opacity.value = 0.705

    const effectPass = new EffectPass(WebGL.camera.instance, this.textureEffect)
    this.composer.addPass(effectPass)

    // DEBUG
    if (this.debugFolder) {
      const textureEffectFolder = this.debugFolder.addFolder('TextureEffect')
      textureEffectFolder.close()

      this.debugParams = {
        effect: this.textureEffect,
        opacity: this.textureEffect.blendMode.opacity.value,
        blendMode: this.textureEffect.blendMode.blendFunction,
      }

      textureEffectFolder.add(this.debugParams, 'opacity', 0, 1).onChange(() => {
        this.textureEffect.blendMode.opacity.value = this.debugParams.opacity
      })

      textureEffectFolder.add(this.debugParams, 'blendMode', BlendFunction).onChange(() => {
        this.textureEffect.blendMode.blendFunction = this.debugParams.blendMode
      })

      const subFolder1 = textureEffectFolder.addFolder('UV Transformation')
      subFolder1.add(this.debugParams.effect.texture, 'rotation', 0.0, 2.0 * Math.PI, 0.001).onChange((value) => {
        this.textureEffect.texture.rotation = value
      })

      const subFolder2 = textureEffectFolder.addFolder('offset').open(false)
      subFolder2.add(this.textureEffect.texture.offset, 'x', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.offset.x = value
      })
      subFolder2.add(this.textureEffect.texture.offset, 'y', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.offset.y = value
      })

      const subFolder3 = textureEffectFolder.addFolder('repeat').open(false)
      subFolder3.add(this.textureEffect.texture.repeat, 'x', 0.0, 2.0, 0.001).onChange((value) => {
        this.textureEffect.texture.repeat.x = value
      })
      subFolder3.add(this.textureEffect.texture.repeat, 'y', 0.0, 2.0, 0.001).onChange((value) => {
        this.textureEffect.texture.repeat.y = value
      })

      const subFolder4 = textureEffectFolder.addFolder('center').open(false)
      subFolder4.add(this.textureEffect.texture.center, 'x', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.center.x = value
      })
      subFolder4.add(this.textureEffect.texture.center, 'y', 0.0, 1.0, 0.001).onChange((value) => {
        this.textureEffect.texture.center.y = value
      })
    }
  }

  private createLUTEffect() {
    const { capabilities, getContext } = WebGL.renderer.instance

    // Color average
    const colorAverageEffect = new ColorAverageEffect(BlendFunction.SKIP)

    // Sepia
    const sepiaEffect = new SepiaEffect({ blendFunction: BlendFunction.SKIP })
    sepiaEffect.uniforms.get('intensity').value = 0.258
    sepiaEffect.blendMode.opacity.value = 1
    sepiaEffect.blendMode.opacity.value = 1
    sepiaEffect.blendMode.blendFunction = BlendFunction.SET

    // Brightness contrast
    const brightnessContrastEffect = new BrightnessContrastEffect({
      blendFunction: BlendFunction.SKIP,
    })

    // Hue saturation
    const hueSaturationEffect = new HueSaturationEffect({
      blendFunction: BlendFunction.SKIP,
      saturation: 0.4,
      hue: 0.0,
    })
    hueSaturationEffect.hue = 0
    hueSaturationEffect.uniforms.get('saturation').value = 0.272
    hueSaturationEffect.blendMode.opacity.value = 1
    hueSaturationEffect.blendMode.blendFunction = BlendFunction.SET

    const lut = LookupTexture.from(WebGL.resources.getItems('COMMON', 'lut') as THREE.Texture)
    const lutEffect = new LUT3DEffect(lut as THREE.Texture)
    lutEffect.blendMode.blendFunction = BlendFunction.SET
    lutEffect.blendMode.opacity.value = 0.31
    lutEffect.blendMode.blendFunction = BlendFunction.OVERLAY

    const effectPass = new EffectPass(WebGL.camera.instance, colorAverageEffect, sepiaEffect, brightnessContrastEffect, hueSaturationEffect, lutEffect)
    this.composer.addPass(effectPass)

    if (this.debugFolder) {
      const luts = new Map([
        ['lut', WebGL.resources.getItems('COMMON', 'lut')],
        ['warm-contrast', WebGL.resources.getItems('COMMON', 'warm-contrast')],
      ])
      // DEBUG
      const params = {
        colorAverage: {
          opacity: colorAverageEffect.blendMode.opacity.value,
          'blend mode': colorAverageEffect.blendMode.blendFunction,
        },
        sepia: {
          intensity: sepiaEffect.uniforms.get('intensity').value,
          opacity: sepiaEffect.blendMode.opacity.value,
          'blend mode': sepiaEffect.blendMode.blendFunction,
        },
        brightnessContrast: {
          brightness: brightnessContrastEffect.uniforms.get('brightness').value,
          contrast: brightnessContrastEffect.uniforms.get('contrast').value,
          opacity: brightnessContrastEffect.blendMode.opacity.value,
          'blend mode': brightnessContrastEffect.blendMode.blendFunction,
        },
        hueSaturation: {
          hue: 0.0,
          saturation: hueSaturationEffect.uniforms.get('saturation').value,
          opacity: hueSaturationEffect.blendMode.opacity.value,
          'blend mode': hueSaturationEffect.blendMode.blendFunction,
        },
        lut: {
          LUT: lutEffect.lut.name,
          '3D texture': true,
          'tetrahedral filter': false,
          'scale up': false,
          'target size': 48,
          'show LUT': false,
          opacity: lutEffect.blendMode.opacity.value,
          'blend mode': lutEffect.blendMode.blendFunction,
        },
      }

      const changeLUT = () => {
        const original = luts.get(params.lut.LUT) as THREE.Texture
        Promise.resolve(LookupTexture.from(original))
          .then((lut) => {
            lutEffect.lut.dispose()
            // lutEffect.lut = lut

            if (capabilities.isWebGL2) {
              if (getContext().getExtension('OES_texture_float_linear') === null) {
                console.log('Linear float filtering not supported, ' + 'converting to Uint8')

                lut.convertToUint8()
              }

              lutEffect.lut = params.lut['3D texture'] ? lut : lut.toDataTexture()
            } else {
              lutEffect.lut = lut.convertToUint8().toDataTexture()
            }
          })
          .catch((error) => console.error(error))
      }

      const lutFolder = this.debugFolder.addFolder('LUT')

      const subMenu1 = lutFolder.addFolder('Color Average')
      subMenu1.close()

      subMenu1.add(params.colorAverage, 'opacity', 0.0, 1.0, 0.01).onChange((value) => {
        colorAverageEffect.blendMode.opacity.value = value
      })
      subMenu1.add(params.colorAverage, 'blend mode', BlendFunction).onChange((value) => {
        colorAverageEffect.blendMode.blendFunction = Number(value)
      })

      const subMenu2 = lutFolder.addFolder('Sepia')
      subMenu2.close()

      subMenu2.add(params.sepia, 'intensity', 0.0, 1.0, 0.001).onChange((value) => {
        sepiaEffect.uniforms.get('intensity').value = value
      })
      subMenu2.add(params.sepia, 'opacity', 0.0, 1.0, 0.01).onChange((value) => {
        sepiaEffect.blendMode.opacity.value = value
      })

      subMenu2.add(params.sepia, 'blend mode', BlendFunction).onChange((value) => {
        sepiaEffect.blendMode.blendFunction = Number(value)
      })

      const subMenu3 = lutFolder.addFolder('Brightness & Contrast')
      subMenu3.close()

      subMenu3.add(params.brightnessContrast, 'brightness', -1.0, 1.0, 0.001).onChange((value) => {
        brightnessContrastEffect.uniforms.get('brightness').value = value
      })

      subMenu3.add(params.brightnessContrast, 'contrast', -1.0, 1.0, 0.001).onChange((value) => {
        brightnessContrastEffect.uniforms.get('contrast').value = value
      })

      subMenu3.add(params.brightnessContrast, 'opacity', 0.0, 1.0, 0.01).onChange((value) => {
        brightnessContrastEffect.blendMode.opacity.value = value
      })

      subMenu3.add(params.brightnessContrast, 'blend mode', BlendFunction).onChange((value) => {
        brightnessContrastEffect.blendMode.blendFunction = Number(value)
      })

      const subMenu4 = lutFolder.addFolder('Hue & Saturation')
      subMenu4.close()

      subMenu4.add(params.hueSaturation, 'hue', 0.0, Math.PI * 2.0, 0.001).onChange((value) => {
        hueSaturationEffect.setHue(value)
      })

      subMenu4.add(params.hueSaturation, 'saturation', -1.0, 1.0, 0.001).onChange((value) => {
        hueSaturationEffect.uniforms.get('saturation').value = value
      })

      subMenu4.add(params.hueSaturation, 'opacity', 0.0, 1.0, 0.01).onChange((value) => {
        hueSaturationEffect.blendMode.opacity.value = value
      })

      subMenu4.add(params.hueSaturation, 'blend mode', BlendFunction).onChange((value) => {
        hueSaturationEffect.blendMode.blendFunction = Number(value)
      })

      const subMenu5 = lutFolder.addFolder('Lookup Texture 3D')
      subMenu5.add(params.lut, 'LUT', [...luts.keys()]).onChange(changeLUT)

      subMenu5.add(params.lut, 'opacity', 0.0, 1.0, 0.01).onChange((value) => {
        lutEffect.blendMode.opacity.value = value
      })

      subMenu5.add(params.lut, 'blend mode', BlendFunction).onChange((value) => {
        lutEffect.blendMode.blendFunction = Number(value)
      })
    }
  }

  private createSMAAEffect() {
    this.smaaEffect = new SMAAEffect({
      preset: SMAAPreset.HIGH,
      edgeDetectionMode: EdgeDetectionMode.COLOR,
    })
    this.smaaEffect.edgeDetectionMaterial.edgeDetectionThreshold = 0.02
    this.smaaEffect.edgeDetectionMaterial.predicationMode = PredicationMode.DEPTH
    this.smaaEffect.edgeDetectionMaterial.predicationThreshold = 0.002
    this.smaaEffect.edgeDetectionMaterial.predicationScale = 1.0

    this.composer.addPass(new EffectPass(WebGL.camera.instance, this.smaaEffect))
  }

  onCameraMove() {
    this.textureEffect.texture.offset.x = WebGL.camera.getPosition().x * 0.75
  }

  onUpdate() {
    this.composer.render()
  }
}

export default PostProcessing
