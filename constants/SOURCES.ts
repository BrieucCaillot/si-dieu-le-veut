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
}

const TRANSITION_SOURCES = {
  [TRANSITIONS.TRANSITION_1]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Transitions/transition_1.glb',
    },
    {
      name: 'texture',
      type: SourceType.texture,
      path: 'textures/Transitions/transition_1.png',
    },
  ],
}

const ORDALIE_SOURCES = {
  [ORDALIES.ORDALIES_1]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_1.glb',
    },
    {
      name: 'textureTest',
      type: SourceType.texture,
      path: 'textures/Ordalies/ordalie_1.png',
    },
  ],
  [ORDALIES.ORDALIES_2]: [
    {
      name: 'billboardNormal',
      type: SourceType.texture,
      path: 'textures/Billboard/billboard-normal.jpeg',
    },
  ],
}

const ALL_SOURCES = { ...ORDALIE_SOURCES, ...TRANSITION_SOURCES }

export { SourceType, Source, ALL_SOURCES }
