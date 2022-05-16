import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'
import CHARACTER from '@/constants/CHARACTER'
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
}

const OTHER_SOURCES = {
  [OTHERS.INTRO]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/intro.glb',
    },
  ],
  [OTHERS.DIDACTICIEL]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/didacticiel.glb',
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
}

const ORDALIE_SOURCES = {
  [ORDALIES.ORDALIES_1]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_croix.glb',
    },
  ],
  [ORDALIES.ORDALIES_2]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_1.glb',
    },
  ],
}

const CHARACTER_SOURCES = {
  [CHARACTER.ALL]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Character/test_croix.glb',
    },
  ],
}

const ALL_SOURCES = { ...OTHER_SOURCES, ...ORDALIE_SOURCES, ...TRANSITION_SOURCES, ...CHARACTER_SOURCES }

export { SourceType, Source, ALL_SOURCES }
