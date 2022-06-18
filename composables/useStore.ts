import ORDALIES from '@/constants/ORDALIES'
import OTHERS from '@/constants/OTHERS'
import TRANSITIONS from '@/constants/TRANSITIONS'

const isMobile = ref(null)
const isDebug = ref(false)
const isDebugType = ref(false)
const debugType = ref<OTHERS | ORDALIES | TRANSITIONS>(null)
const showLoader = ref(true)
const showSkip = ref(true)
const isSkippingIntro = ref(false)
const resourcesLoaded = ref(false)
const currentType = ref<OTHERS | ORDALIES | TRANSITIONS>(null)

export default () => {
  return {
    isMobile,
    isDebug,
    isDebugType,
    debugType,
    showLoader,
    showSkip,
    isSkippingIntro,
    resourcesLoaded,
    currentType,
  }
}
