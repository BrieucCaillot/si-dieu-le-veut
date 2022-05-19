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
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.4,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.MEDIUM]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.66,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.HARD]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 1,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.VERY_HARD]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 1.33,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.INSANE]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 1.66,
      upSpeedArm: -1,
      upDurationArm: 100,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
}

export { CroixInterface }
export default DIFFICULTY_DATAS
