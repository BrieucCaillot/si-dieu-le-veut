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
}

const OTHER_SOURCES = {
  [OTHERS.SPLASHSCREEN]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/splashscreen.glb',
    },
  ],
  [OTHERS.CINEMATIC]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Others/cinematic.glb',
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
  [ORDALIES.CAULDRON]: [
    {
      name: 'model',
      type: SourceType.gltfModel,
      path: 'models/Ordalies/ordalie_cauldron.glb',
    },
  ],
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
      name: 'gradient',
      type: SourceType.texture,
      path: 'textures/gradient.png',
    },
  ],
}

const ALL_SOURCES = { ...OTHER_SOURCES, ...ORDALIE_SOURCES, ...TRANSITION_SOURCES }

export { SourceType, Source, ALL_SOURCES }
