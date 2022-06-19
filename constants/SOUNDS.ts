import ANIMATIONS from '@/constants/ANIMATIONS'
import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'

const SOUNDS = {
  [ORDALIES.BBQ]: {
    INTRODUCTION: 'ordalie',
  },
}

const ANIMATIONS_SOUNDS = {
  TRANSITIONS: {
    [ANIMATIONS.TRANSITION.GARDE]: {
      frames: [
        {
          frame: 10,
          sound: 'garde_walk',
        },
        {
          frame: 60,
          sound: 'garde_walk',
        },
        {
          frame: 150,
          sound: 'garde_kick',
        },
      ],
    },
    [ANIMATIONS.TRANSITION.CUISINIER]: {
      frames: [
        {
          frame: 30,
          sound: 'cuisinier_walk',
        },
      ],
    },
  },
  [OTHERS.SPLASHSCREEN]: {
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION1]: {
      frames: [
        {
          frame: 1,
          sound: 'splashscreen_cough',
        },
        {
          frame: 160,
          sound: 'splashscreen_title',
        },
        {
          frame: 450,
          sound: 'splashscreen_cinematique',
        },
      ],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_SADIDLE]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_IDLE]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION2]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION3]: {
      frames: [],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_GARDE_LOCATION4]: {
      frames: [],
    },
  },
  [ORDALIES.BBQ]: {
    [ANIMATIONS.BBQ.IDLE]: {
      // frames: [
      //   {
      //     frame: 20,
      //     sound: 'fire-hit',
      //   },
      //   {
      //     frame: 40,
      //     sound: 'fire-hit',
      //   },
      // ],
    },
    [ANIMATIONS.BBQ.ENTREE]: {
      frames: [
        // {
        //   frame: 1,
        //   sound: 'oi',
        // },
      ],
    },
    [ANIMATIONS.BBQ.AVANCE]: {
      frames: [
        // {
        //   frame: 1,
        //   sound: 'boing',
        // },
      ],
    },
    [ANIMATIONS.BBQ.MORT]: {
      frames: [
        // {
        //   frame: 1,
        //   sound: 'death',
        // },
      ],
    },
    [ANIMATIONS.BBQ.SORTIE]: {
      frames: [
        // {
        //   frame: 10,
        //   sound: 'oi',
        // },
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
  [ORDALIES.FOOD]: {
    [ANIMATIONS.FOOD.FOOD_CUISINIER_ENTREE]: {
      frames: [
        {
          frame: 0,
          sound: 'boing',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_CUISINIER_IDLE]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_CUISINIER_MORT]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_CUISINIER_SORTIE]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_ENTONNOIR_ENTREE]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_ENTONNOIR_IDLE]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_ENTONNOIR_MORT]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
    [ANIMATIONS.FOOD.FOOD_ENTONNOIR_SORTIE]: {
      frames: [
        {
          frame: 0,
          sound: 'oi',
        },
      ],
    },
  },
}

export default ANIMATIONS_SOUNDS
