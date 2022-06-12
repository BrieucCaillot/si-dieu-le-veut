import * as THREE from 'three'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

enum SourceType {
  gltfModel = 'gltfLoader',
  texture = 'textureLoader',
  cubeTexture = 'cubeTextureLoader',
}

interface Source {
  name: string
  type: SourceType
  path: string | string[]
  encoding?: THREE.TextureEncoding
  wrap?: THREE.Wrapping
}

const COMMON_SOURCES = {
  ['COMMON']: [
    {
      name: 'fabric',
      type: SourceType.texture,
      path: 'textures/post/fabric_2.webp',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/bleach-bypass',
      type: SourceType.texture,
      path: 'textures/post/png/bleach-bypass.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/candle-light',
      type: SourceType.texture,
      path: 'textures/post/png/candle-light.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/cool-contrast',
      type: SourceType.texture,
      path: 'textures/post/png/cool-contrast.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/warm-contrast',
      type: SourceType.texture,
      path: 'textures/post/png/warm-contrast.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/desaturated-fog',
      type: SourceType.texture,
      path: 'textures/post/png/desaturated-fog.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/evening',
      type: SourceType.texture,
      path: 'textures/post/png/evening.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/fall',
      type: SourceType.texture,
      path: 'textures/post/png/fall.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/filmic1',
      type: SourceType.texture,
      path: 'textures/post/png/filmic1.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/filmic2',
      type: SourceType.texture,
      path: 'textures/post/png/filmic2.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/filmic2',
      type: SourceType.texture,
      path: 'textures/post/png/filmic2.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/matrix-green',
      type: SourceType.texture,
      path: 'textures/post/png/matrix-green.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'png/strong-amber',
      type: SourceType.texture,
      path: 'textures/post/png/strong-amber.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
  ],
}

const OTHER_SOURCES = {
  [OTHERS.SPLASHSCREEN]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/splashscreen.glb',
    },
  ],
  [OTHERS.CINEMATIC_1]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/cinematic_1.glb',
    },
  ],
  [OTHERS.CINEMATIC_2]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/cinematic_2.glb',
    },
  ],
  [OTHERS.CINEMATIC_3]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/cinematic_3.glb',
    },
  ],
  [OTHERS.TUTORIAL]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/tutorial.glb',
    },
  ],
  [OTHERS.DEAD]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/dead.glb',
    },
  ],
  [OTHERS.END]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/end.glb',
    },
  ],
}

const TRANSITION_SOURCES = {
  [TRANSITIONS.TRANSITION_1]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition_1.glb',
    },
  ],
  [TRANSITIONS.TRANSITION_2]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition_1.glb',
    },
  ],
}

const ORDALIE_SOURCES = {
  [ORDALIES.CROIX]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_croix.glb',
    },
  ],
  [ORDALIES.FOOD]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_food.glb',
    },
    {
      name: 'bread',
      type: SourceType.texture,
      path: 'textures/bread.png',
    },
    {
      name: 'cheese',
      type: SourceType.texture,
      path: 'textures/cheese.png',
    },
    {
      name: 'cake',
      type: SourceType.texture,
      path: 'textures/cake.png',
    },
    {
      name: 'miam',
      type: SourceType.texture,
      path: 'textures/miam.jpg',
    },
  ],
  // [ORDALIES.CAULDRON]: [
  //   {
  //     name: 'model',
  //     type: SourceType.gltfModel,
  //     path: 'models/Ordalies/ordalie_cauldron.glb',
  //   },
  // ],
  [ORDALIES.BBQ]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_bbq_2.glb',
    },
    {
      name: 'noise',
      type: SourceType.texture,
      path: 'textures/noise.jpg',
    },
  ],
}

const ALL_SOURCES = { ...COMMON_SOURCES, ...OTHER_SOURCES, ...ORDALIE_SOURCES, ...TRANSITION_SOURCES }

export { SourceType, Source, ALL_SOURCES }
