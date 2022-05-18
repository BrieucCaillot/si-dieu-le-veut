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

const DATAS = {
  [DIFFICULTY.EASY]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.5,
      upSpeedArm: 0.5,
      upDurationArm: 0.5,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.MEDIUM]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.5,
      upSpeedArm: 0.5,
      upDurationArm: 0.5,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.HARD]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.5,
      upSpeedArm: 0.5,
      upDurationArm: 0.5,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.VERY_HARD]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.5,
      upSpeedArm: 0.5,
      upDurationArm: 0.5,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
  [DIFFICULTY.INSANE]: {
    [ORDALIES.CROIX]: {
      fallingSpeedArm: 0.5,
      upSpeedArm: 0.5,
      upDurationArm: 0.5,
    },
    [ORDALIES.BBQ]: {},
    [ORDALIES.CAULDRON]: {},
  },
}

export default DATAS
