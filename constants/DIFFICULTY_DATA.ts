import DIFFICULTY from '@/constants/DIFFICULTY'
import ORDALIES from '@/constants/ORDALIES'

interface CroixInterface {
  fallingSpeedArm: number
}

interface BBQInterface {
  fallingSpeedArm: number
}
interface FoodInterface {
  fallingSpeedArm: number
}

const DIFFICULTY_DATAS = {
  [DIFFICULTY.EASY]: {
    ['COMMON']: {
      speedCoef: 1,
    },
    ['TRANSITION']: {
      speedCoef: 1.25,
    },
    ['CAMERA']: {
      // Debug
      // moveDuration: 1,
      moveDuration: 6,
    },

    [ORDALIES.CROIX]: {
      // Debug
      fallingSpeedArm: 0.4,
    },
    [ORDALIES.BBQ]: {
      min: 13,
      max: 15,
    },
    [ORDALIES.FOOD]: {
      minDisplayTime: 13,
      maxDisplayTime: 15,
      minTimeBeforeNewWord: 2,
      maxTimeBeforeNewWord: 2.2,
    },

    //POUR LA PRÉSENTATION
    // [ORDALIES.CROIX]: {
    //   fallingSpeedArm: 1,
    // },
    // [ORDALIES.BBQ]: {
    //   min: 7,
    //   max: 9,
    // },
    // [ORDALIES.FOOD]: {
    //   minDisplayTime: 6,
    //   maxDisplayTime: 8,
    //   minTimeBeforeNewWord: 0.8,
    //   maxTimeBeforeNewWord: 1,
    // },
  },
  [DIFFICULTY.MEDIUM]: {
    ['COMMON']: {
      speedCoef: 1.25,
    },
    ['TRANSITION']: {
      speedCoef: 1.5,
    },
    ['CAMERA']: {
      moveDuration: 4.5,
    },

    [ORDALIES.CROIX]: {
      // fallingSpeedArm: 0.66,
      fallingSpeedArm: 0.53,
    },
    [ORDALIES.BBQ]: {
      min: 11,
      max: 13,
    },
    [ORDALIES.FOOD]: {
      minDisplayTime: 10,
      maxDisplayTime: 12,
      minTimeBeforeNewWord: 1.8,
      maxTimeBeforeNewWord: 2,
    },
  },
  [DIFFICULTY.HARD]: {
    ['COMMON']: {
      speedCoef: 1.5,
    },
    ['TRANSITION']: {
      speedCoef: 1.75,
    },
    ['CAMERA']: {
      moveDuration: 3,
    },

    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.67,
    },
    [ORDALIES.BBQ]: {
      min: 8,
      max: 11,
    },
    [ORDALIES.FOOD]: {
      minDisplayTime: 5,
      maxDisplayTime: 7,
      minTimeBeforeNewWord: 0.8,
      maxTimeBeforeNewWord: 1.2,
    },
  },
  [DIFFICULTY.VERY_HARD]: {
    ['COMMON']: {
      speedCoef: 1.75,
    },
    ['TRANSITION']: {
      speedCoef: 2,
    },
    ['CAMERA']: {
      moveDuration: 2,
    },

    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.76,
    },
    [ORDALIES.BBQ]: {
      min: 6,
      max: 8,
    },
    [ORDALIES.FOOD]: {
      minDisplayTime: 6,
      maxDisplayTime: 8,
      minTimeBeforeNewWord: 1,
      maxTimeBeforeNewWord: 1.3,
    },
  },
  [DIFFICULTY.INSANE]: {
    ['COMMON']: {
      speedCoef: 2,
    },
    ['TRANSITION']: {
      speedCoef: 2.25,
    },
    ['CAMERA']: {
      moveDuration: 1,
    },

    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.83,
    },
    [ORDALIES.BBQ]: {
      min: 4,
      max: 6,
    },
    [ORDALIES.FOOD]: {
      minDisplayTime: 4,
      maxDisplayTime: 6,
      minTimeBeforeNewWord: 0.8,
      maxTimeBeforeNewWord: 1,
    },
  },
}

export { CroixInterface, BBQInterface, FoodInterface }
export default DIFFICULTY_DATAS
