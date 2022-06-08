import ORDALIES from './ORDALIES'

// type ANIMATIONS = `ORDALIES.${keyof typeof ORDALIES}`

// enum ANIMATIONS {
//     [ORDALIES.BBQ] =
// }

const ANIMATIONS = {
  [ORDALIES.BBQ]: {
    AVANCE: 'Braises_Cuisinier_Avance',
    ENTREE: 'Braises_Cuisinier_Entree',
    IDLE: 'Braises_Cuisinier_Idle',
    MORT: 'Braises_Cuisinier_Mort',
    SORTIE: 'Braises_Cuisinier_Sortie',
  },
  [ORDALIES.CROIX]: {
    FRONT_ENTREE: 'Croix_Cuisinier_FRONT_Entree',
    FRONT_SORTIE: 'Croix_Cuisinier_FRONT_Sortie',
    FRONT_BRAS: 'Croix_CuisinierFRONT_Bras',
    FRONT_MORT: 'Croix_CuisinierFRONT_Mort',
    SIDE_ENTREE: 'Croix_CuisinierSIDE_Entree',
    SIDE_SORTIE: 'Croix_CuisinierSIDE_Sortie',
  },
}

// const ordalies = ['BBQ', 'CROIX', 'FOOD'] as const

// type ORDALIES_NAME = typeof ordalies[number]
// const a: ORDALIES_NAME

// const sounds: Record<ORDALIES_NAME, string> = {

// }

// sounds[a]

// ANIMATIONS[ORDALIES.BBQ].IDLE

export default ANIMATIONS
