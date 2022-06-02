import DIFFICULTY from '@/constants/DIFFICULTY'
import ORDALIES from '@/constants/ORDALIES'

interface CroixInterface {
  fallingSpeedArm: number
  upSpeedArm: number
  upDurationArm: number
}

interface BBQInterface {
  fallingSpeedArm: number
  upSpeedArm: number
  upDurationArm: number
}

interface CauldronInterface {
  fallingSpeedArm: number
  upSpeedArm: number
  upDurationArm: number
}

//fallingSpeedArm: 0.33, en easy c'est un peu trop facile

const DIFFICULTY_DATAS = {
  [DIFFICULTY.EASY]: {
    ['CAMERA']: {
      moveDuration: 5,
    },
    ['TRANSITIONS']: {
      speedCoef: 1,
    },
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.4,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {
      min: 13,
      max: 15,
    },
    [ORDALIES.CAULDRON]: {
      speedCoef: 1,
    },
  },
  [DIFFICULTY.MEDIUM]: {
    ['CAMERA']: {
      moveDuration: 4,
    },
    ['TRANSITIONS']: {
      speedCoef: 1.5,
    },
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.66,
      upSpeedArm: -1,
      upDurationArm: 100,
      speedCoef: 1,
    },
    [ORDALIES.BBQ]: {
      min: 11,
      max: 13,
    },
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.HARD]: {
    ['CAMERA']: {
      moveDuration: 3,
    },
    ['TRANSITIONS']: {
      speedCoef: 1.9,
    },
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 1,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {
      min: 8,
      max: 11,
    },
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.VERY_HARD]: {
    ['CAMERA']: {
      moveDuration: 2,
    },
    ['TRANSITIONS']: {
      speedCoef: 2.3,
    },
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 1.33,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {
      min: 6,
      max: 8,
    },
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.INSANE]: {
    ['CAMERA']: {
      moveDuration: 1,
    },
    ['TRANSITIONS']: {
      speedCoef: 3,
    },
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 1.66,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {
      min: 4,
      max: 6,
    },
    [ORDALIES.CAULDRON]: {},
  },
}

export { CroixInterface, BBQInterface, CauldronInterface }
export default DIFFICULTY_DATAS
