import * as THREE from 'three'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'
import SOUNDS from '@/constants/SOUNDS'

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
      name: 'dust',
      type: SourceType.texture,
      path: 'textures/post/dust.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'normal',
      type: SourceType.texture,
      path: 'textures/post/tapisserie_normal.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'scratches',
      type: SourceType.texture,
      path: 'textures/post/scratches.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'fabric_1',
      type: SourceType.texture,
      path: 'textures/post/fabric_1.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'fabric_2',
      type: SourceType.texture,
      path: 'textures/post/fabric_2.webp',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'fabric_3',
      type: SourceType.texture,
      path: 'textures/post/fabric_3.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'textile_1',
      type: SourceType.texture,
      path: 'textures/post/textile_1.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'textile_2',
      type: SourceType.texture,
      path: 'textures/post/textile_2.jpg',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'gradient',
      type: SourceType.texture,
      path: 'textures/gradient.png',
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
      path: 'models/Transitions/transition1.glb',
    },
  ],
  [TRANSITIONS.TRANSITION_2]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition2.glb',
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
      path: 'models/Ordalies/ordalie_bbq.glb',
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
