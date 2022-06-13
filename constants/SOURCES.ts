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
      path: 'models/Ordalies/ordalie_bbq.glb',
    },
    {
      name: 'noise',
      type: SourceType.texture,
      path: 'textures/noise.jpg',
    },
    {
      name: 'test_uv',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/test_uv.glb',
    },
    // {
    //   name: 'banniere_ordalieFER',
    //   type: SourceType.texture,
    //   path: 'textures/banniere_ordalieFER.png',
    // },
    {
      name: 'gradient',
      type: SourceType.texture,
      path: 'textures/gradient.png',
    },
  ],
}

const SOUNDS = [
  {
    name: 'title',
    path: '/sounds/Other/title.mp3',
  },
  {
    name: 'cinematique',
    path: '/sounds/Other/cinematique.mp3',
  },
  {
    name: 'splashscreen_cough',
    path: '/sounds/Other/splashscreen_cough.mp3',
  },
  {
    name: 'success',
    path: '/sounds/type_2.mp3',
  },
  {
    name: 'oi',
    path: '/sounds/oi.mp3',
  },
  {
    name: 'ordalie',
    path: '/sounds/ordalie.mp3',
  },
  {
    name: 'fire-hit',
    path: '/sounds/fire-hit.mp3',
  },
  {
    name: 'boing',
    path: '/sounds/boing.mp3',
  },
  {
    name: 'death',
    path: '/sounds/death.mp3',
  },
  {
    name: 'bone-cracking',
    path: '/sounds/bone-cracking.mp3',
  },
  {
    name: 'bone-cracking-death',
    path: '/sounds/bone-cracking-death.mp3',
  },
  {
    name: 'ground-hit',
    path: '/sounds/ground-hit.mp3',
  },
]

const ALL_SOURCES = { ...COMMON_SOURCES, ...OTHER_SOURCES, ...ORDALIE_SOURCES, ...TRANSITION_SOURCES }

export { SourceType, Source, ALL_SOURCES, SOUNDS }
