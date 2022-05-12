import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

enum SourceType {
  texture = 'texture',
  cubeTexture = 'cubeTexture',
  gltfModel = 'gltfModel',
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
      path: 'models/Ordalies/ordalie_1.glb',
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
  ],
  [ORDALIES.ORDALIES_2]: [
    // {
    // 	name: 'tapisserieBase',
    // 	type: SourceType.texture,
    // 	path: 'textures/tapisserie/test.png',
    // },
    // {
    // 	name: 'billboardNormal',
    // 	type: SourceType.texture,
    // 	path: 'textures/Billboard/billboard-normal.jpeg',
    // },
  ],
}

const ALL_SOURCES = [{ ...ORDALIE_SOURCES, ...TRANSITION_SOURCES }]

export { SourceType, Source, ALL_SOURCES }
