import ORDALIES from '@/constants/ORDALIES'
import OTHERS from '@/constants/OTHERS'

const ANIMATIONS = {
  [OTHERS.SPLASHSCREEN]: {
    INTRO_CUISINIER_LOCATION1: 'Intro_Cuisinier_Location1',
    INTRO_CUISINIER_LOCATION2: 'Intro_Cuisinier_Location2',
    INTRO_CUISINIER_LOCATION3: 'Intro_Cuisinier_Location3',
    INTRO_CUISINIER_LOCATION4: 'Intro_Cuisinier_Location4',
    INTRO_CUISINIER_SADIDLE: 'Intro_Cuisinier_SadIdle',
    INTRO_GARDE_IDLE: 'Intro_Garde_Idle',
    INTRO_GARDE_LOCATION2: 'Intro_Garde_Location2',
    INTRO_GARDE_LOCATION3: 'Intro_Garde_Location3',
    INTRO_GARDE_LOCATION4: 'Intro_Garde_Location4',
  },
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

export default ANIMATIONS
