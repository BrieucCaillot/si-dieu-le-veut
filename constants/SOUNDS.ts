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
          frame: 27,
          sound: 'garde_walk_1',
        },
        {
          frame: 66,
          sound: 'garde_walk_2',
        },
        {
          frame: 106,
          sound: 'garde_walk_3',
        },
        {
          frame: 147,
          sound: 'garde_walk_4',
        },
        {
          frame: 186,
          sound: 'garde_walk_1',
        },
        {
          frame: 225,
          sound: 'garde_walk_2',
        },
        {
          frame: 61,
          sound: 'spear_1',
        },
        {
          frame: 138,
          sound: 'spear_2',
        },
        {
          frame: 220,
          sound: 'spear_3',
        },

        {
          frame: 258,
          sound: 'garde_kick',
        },
      ],
    },
    [ANIMATIONS.TRANSITION.CUISINIER]: {
      frames: [
        {
          frame: 26,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 66,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 107,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 147,
          sound: 'cuisinier_walk_4',
        },
        {
          frame: 186,
          sound: 'cuisinier_walk_5',
        },
        {
          frame: 226,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 267,
          sound: 'cuisinier_walk_2',
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
          frame: 370,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 395,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 423,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 451,
          sound: 'cuisinier_walk_4',
        },
        {
          frame: 479,
          sound: 'cuisinier_walk_5',
        },
        {
          frame: 508,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 535,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 563,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 592,
          sound: 'cuisinier_walk_4',
        },
        {
          frame: 620,
          sound: 'cuisinier_walk_5',
        },
        {
          frame: 647,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 673,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 450,
          sound: 'splashscreen_cinematique',
        },
      ],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION2]: {
      frames: [
        {
          frame: 29,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 55,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 82,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 110,
          sound: 'cuisinier_walk_4',
        },
        {
          frame: 139,
          sound: 'cuisinier_walk_5',
        },
        {
          frame: 168,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 195,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 223,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 250,
          sound: 'cuisinier_walk_4',
        },
      ],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION3]: {
      frames: [
        {
          frame: 6,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 32,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 59,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 87,
          sound: 'cuisinier_walk_4',
        },
        {
          frame: 114,
          sound: 'cuisinier_walk_5',
        },
        {
          frame: 144,
          sound: 'cuisinier_walk_1',
        },
      ],
    },
    [ANIMATIONS.SPLASHSCREEN.INTRO_CUISINIER_LOCATION4]: {
      frames: [
        {
          frame: 1,
          sound: 'cuisinier_walk_1',
        },
        {
          frame: 22,
          sound: 'cuisinier_walk_2',
        },
        {
          frame: 49,
          sound: 'cuisinier_walk_3',
        },
        {
          frame: 78,
          sound: 'cuisinier_walk_4',
        },
      ],
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

const TRANSITION_4 = {
  [ANIMATIONS.TRANSITION.GARDE]: {
    frames: [
      {
        frame: 79,
        sound: 'spear_1',
      },
      {
        frame: 158,
        sound: 'spear_2',
      },
      {
        frame: 7,
        sound: 'garde_walk_1',
      },
      {
        frame: 45,
        sound: 'garde_walk_2',
      },
      {
        frame: 82,
        sound: 'garde_walk_3',
      },
      {
        frame: 126,
        sound: 'garde_walk_4',
      },
      {
        frame: 163,
        sound: 'garde_walk_1',
      },
      {
        frame: 198,
        sound: 'garde_kick',
      },
    ],
  },
  [ANIMATIONS.TRANSITION.CUISINIER]: {
    // 2 (1)
    // -40 (2)
    // -79 (3)
    // -120 (4)
    // -161 (5)
    // -200 (1)
    frames: [
      {
        frame: 2,
        sound: 'cuisinier_walk_1',
      },
      {
        frame: 40,
        sound: 'cuisinier_walk_2',
      },
      {
        frame: 79,
        sound: 'cuisinier_walk_3',
      },
      {
        frame: 120,
        sound: 'cuisinier_walk_4',
      },
      {
        frame: 161,
        sound: 'cuisinier_walk_5',
      },
      {
        frame: 200,
        sound: 'cuisinier_walk_1',
      },
    ],
  },
}

export { TRANSITION_4 }
export default ANIMATIONS_SOUNDS
