import ANIMATIONS from './ANIMATIONS'
import ORDALIES from './ORDALIES'

const SOUNDS = {
  [ORDALIES.BBQ]: {
    [ANIMATIONS.BBQ.IDLE]: {
      frames: [
        {
          frame: 40,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.BBQ.ENTREE]: {
      frames: [
        {
          frame: 10,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.BBQ.AVANCE]: {
      frames: [
        {
          frame: 13,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.BBQ.MORT]: {
      frames: [
        {
          frame: 10,
          sound: 'oi',
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
}

export default SOUNDS
