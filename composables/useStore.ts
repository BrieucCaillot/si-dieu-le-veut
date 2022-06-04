import ORDALIES from '@/constants/ORDALIES'

const isMobile = ref(false)
const showLoader = ref(true)
const resourcesLoaded = ref(false)
const isDebug = ref(false)
const currentOrdalie = ref(null)

export default () => {
  return {
    isMobile,
    showLoader,
    resourcesLoaded,
    isDebug,
    currentOrdalie,
  }
}
