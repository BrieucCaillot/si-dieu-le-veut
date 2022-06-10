import ANIMATIONS from '@/constants/ANIMATIONS'
import ORDALIES from '@/constants/ORDALIES'

const SOUNDS = {
  [ORDALIES.BBQ]: {
    INTRODUCTION: 'ordalie',
  },
}

const ANIMATIONS_SOUNDS = {
  [ORDALIES.BBQ]: {
    [ANIMATIONS.BBQ.IDLE]: {
      frames: [
        {
          frame: 20,
          sound: 'fire-hit',
        },
        {
          frame: 40,
          sound: 'fire-hit',
        },
      ],
    },
    [ANIMATIONS.BBQ.ENTREE]: {
      frames: [
        {
          frame: 1,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.BBQ.AVANCE]: {
      frames: [
        {
          frame: 1,
          sound: 'boing',
        },
      ],
    },
    [ANIMATIONS.BBQ.MORT]: {
      frames: [
        {
          frame: 1,
          sound: 'death',
        },
      ],
    },
    [ANIMATIONS.BBQ.SORTIE]: {
      frames: [
        {
          frame: 10,
          sound: 'oi',
        },
      ],
    },
  },
  [ORDALIES.CROIX]: {
    [ANIMATIONS.CROIX.FRONT_ENTREE]: {
      frames: [
        {
          frame: 20,
          sound: 'boing',
        },
        {
          frame: 45,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.CROIX.FRONT_SORTIE]: {
      frames: [],
    },
    [ANIMATIONS.CROIX.FRONT_BRAS]: {
      frames: [
        {
          frame: 100,
          sound: 'bone-cracking',
        },
        {
          frame: 140,
          sound: 'bone-cracking-death',
        },
      ],
    },
    [ANIMATIONS.CROIX.FRONT_MORT]: {
      frames: [
        {
          frame: 40,
          sound: 'ground-hit',
        },
      ],
    },
    [ANIMATIONS.CROIX.SIDE_ENTREE]: {
      frames: [],
    },
    [ANIMATIONS.CROIX.SIDE_SORTIE]: {
      frames: [
        {
          frame: 20,
          sound: 'boing',
        },
      ],
    },
  },
}

export default ANIMATIONS_SOUNDS
