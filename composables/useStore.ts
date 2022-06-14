import ORDALIES from '@/constants/ORDALIES'

const isMobile = ref(null)
const showLoader = ref(true)
const resourcesLoaded = ref(false)
const isDebug = ref(false)
const currentOrdalie = ref(null)
const currentOther = ref(null)

export default () => {
  return {
    isMobile,
    showLoader,
    resourcesLoaded,
    isDebug,
    currentOrdalie,
    currentOther,
  }
}
