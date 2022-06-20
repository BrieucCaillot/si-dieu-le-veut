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

const STEPS_VOLUME = 0.5

const COMMON_SOURCES = {
  ['COMMON']: [
    {
      name: 'fabric',
      type: SourceType.texture,
      path: 'textures/post/fabric.webp',
      encoding: THREE.sRGBEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'lut',
      type: SourceType.texture,
      path: 'textures/post/lut/lut.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'warm-contrast',
      type: SourceType.texture,
      path: 'textures/post/lut/warm-contrast.png',
      encoding: THREE.LinearEncoding,
      wrap: THREE.RepeatWrapping,
    },
    {
      name: 'noise',
      type: SourceType.texture,
      path: 'textures/noise.jpg',
    },
    {
      name: 'noise-2',
      type: SourceType.texture,
      path: 'textures/noise-2.jpg',
    },
    {
      name: 'noise-3',
      type: SourceType.texture,
      path: 'textures/noise-3.png',
    },
    {
      name: 'gradient',
      type: SourceType.texture,
      path: 'textures/gradient.png',
    },
    {
      name: 'gradient-1',
      type: SourceType.texture,
      path: 'textures/gradient-1.png',
    },
    {
      name: 'gradient-2',
      type: SourceType.texture,
      path: 'textures/gradient-2.png',
    },
    {
      name: 'gradient-3',
      type: SourceType.texture,
      path: 'textures/gradient-3.png',
    },
    {
      name: 'gradient-4',
      type: SourceType.texture,
      path: 'textures/gradient-4.png',
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
      path: 'models/Transitions/transition_2.glb',
    },
  ],
  [TRANSITIONS.TRANSITION_3]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition_3.glb',
    },
  ],
  [TRANSITIONS.TRANSITION_4]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition_4.glb',
    },
  ],
  [TRANSITIONS.TRANSITION_5]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition_5.glb',
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
      path: 'textures/bread.webp',
      encoding: THREE.sRGBEncoding,
    },
    {
      name: 'cheese',
      type: SourceType.texture,
      path: 'textures/cheese.webp',
      encoding: THREE.sRGBEncoding,
    },
    {
      name: 'miam',
      type: SourceType.texture,
      path: 'textures/miam.jpg',
    },
  ],
  [ORDALIES.BBQ]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_bbq.glb',
    },
    {
      name: 'test_uv',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/test_uv.glb',
    },
  ],
}

const SOUNDS: { name: string; path: string; volume?: number }[] = [
  /*
  OTHERS
  */
  {
    name: 'success',
    path: '/sounds/Typing/typing.mp3',
    volume: 0.2,
  },
  {
    name: 'splashscreen_title',
    path: '/sounds/Other/title.mp3',
    volume: 0.1,
  },
  {
    name: 'splashscreen_cinematique',
    path: '/sounds/Other/cinematique.mp3',
    volume: 0.1,
  },
  {
    name: 'splashscreen_cough',
    path: '/sounds/Other/splashscreen_cough.mp3',
  },
  {
    name: 'gameover',
    path: '/sounds/Other/mort_musique.mp3',
    volume: 0.1,
  },
  /*
  CUISINIER
  */
  {
    name: 'cuisinier_walk_1',
    path: '/sounds/Character/Cuisinier/Walk_Normal/walk_1.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'cuisinier_walk_2',
    path: '/sounds/Character/Cuisinier/Walk_Normal/walk_2.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'cuisinier_walk_3',
    path: '/sounds/Character/Cuisinier/Walk_Normal/walk_3.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'cuisinier_walk_4',
    path: '/sounds/Character/Cuisinier/Walk_Normal/walk_4.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'cuisinier_walk_5',
    path: '/sounds/Character/Cuisinier/Walk_Normal/walk_5.mp3',
    volume: STEPS_VOLUME,
  },
  /*
  GARDE
  */
  {
    name: 'garde_walk_1',
    path: '/sounds/Character/Garde/Walk_garde/walk_garde1.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'garde_walk_2',
    path: '/sounds/Character/Garde/Walk_garde/walk_garde2.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'garde_walk_3',
    path: '/sounds/Character/Garde/Walk_garde/walk_garde3.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'garde_walk_4',
    path: '/sounds/Character/Garde/Walk_garde/walk_garde4.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'garde_kick',
    path: '/sounds/Character/Garde/Kick/kick_garde.mp3',
    volume: STEPS_VOLUME,
  },
  /*
  SPEAR
  */
  {
    name: 'spear_1',
    path: '/sounds/Character/Garde/Spear/spear1.mp3',
  },
  {
    name: 'spear_2',
    path: '/sounds/Character/Garde/Spear/spear2.mp3',
  },
  {
    name: 'spear_3',
    path: '/sounds/Character/Garde/Spear/spear3.mp3',
  },
  {
    name: 'spear_4',
    path: '/sounds/Character/Garde/Spear/spear4.mp3',
  },

  /* 
  ORDALIES COMMON
  */
  {
    name: 'ordalie_music',
    path: '/sounds/Ordalie/ordalie_loop.mp3',
    volume: 0.1,
  },
  {
    name: 'ordalie_end',
    path: '/sounds/Ordalie/ordalie_end.mp3',
    volume: 0.5,
  },

  /*
  ORDALIES BBQ
  */

  {
    name: 'ordalie_bbq_death',
    path: '/sounds/Ordalie/BBQ/mort_braises.mp3',
  },
  {
    name: 'ordalie_bbq_ambient',
    path: '/sounds/Ordalie/BBQ/ambience_braises.mp3',
  },
  {
    name: 'ordalie_bbq_walk_braises_1',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises1.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'ordalie_bbq_walk_braises_2',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises2.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'ordalie_bbq_walk_braises_3',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises3.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'ordalie_bbq_walk_braises_4',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises4.mp3',
    volume: STEPS_VOLUME,
  },
  {
    name: 'ordalie_bbq_walk_braises_5',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises5.mp3',
    volume: STEPS_VOLUME,
  },

  {
    name: 'ordalie_bbq_jump_1',
    path: '/sounds/Ordalie/BBQ/Jump/jump1.mp3',
  },
  {
    name: 'ordalie_bbq_jump_2',
    path: '/sounds/Ordalie/BBQ/Jump/jump2.mp3',
  },
  {
    name: 'ordalie_bbq_jump_3',
    path: '/sounds/Ordalie/BBQ/Jump/jump3.mp3',
  },
  {
    name: 'ordalie_bbq_jump_4',
    path: '/sounds/Ordalie/BBQ/Jump/jump4.mp3',
  },

  /*
  ORDALIE CROIX
  */

  {
    name: 'ordalie_croix_intro',
    path: '/sounds/Ordalie/CROIX/entree_croix.mp3',
  },
  {
    name: 'ordalie_croix_death',
    path: '/sounds/Ordalie/CROIX/mort_croix.mp3',
  },
  {
    name: 'ordalie_croix_outro',
    path: '/sounds/Ordalie/CROIX/sortie_croix.mp3',
  },
  /*
  ORDALIE FOOD
  */

  {
    name: 'ordalie_food_intro',
    path: '/sounds/Ordalie/FOOD/entree_food.mp3',
  },
  {
    name: 'ordalie_food_death',
    path: '/sounds/Ordalie/FOOD/mort_food.mp3',
  },
  {
    name: 'ordalie_food_outro',
    path: '/sounds/Ordalie/FOOD/sortie_food.mp3',
  },

  /*
  Transitions
  */

  {
    name: 'transition_ambient',
    path: '/sounds/Transitions/ambience_transition.mp3',
  },

  /* *****************************************************************************
   ********************************************************************************/

  {
    name: 'braise_ambience',
    path: '/sounds/Ordalie/BBQ/braise_ambient.mp3',
  },
  {
    name: 'walk_braises1',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises1.mp3',
  },
  {
    name: 'walk_braises2',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises2.mp3',
  },
  {
    name: 'walk_braises3',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises3.mp3',
  },
  {
    name: 'walk_braises4',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises4.mp3',
  },
  {
    name: 'walk_braises5',
    path: '/sounds/Ordalie/BBQ/walk_braises/walk_braises5.mp3',
  },
]

const ALL_SOURCES = { ...COMMON_SOURCES, ...OTHER_SOURCES, ...ORDALIE_SOURCES, ...TRANSITION_SOURCES }

export { SourceType, Source, ALL_SOURCES, SOUNDS }
