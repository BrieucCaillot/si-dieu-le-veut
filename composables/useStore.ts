import ORDALIES from '@/constants/ORDALIES'

const showLoader = ref(true)
const resourcesLoaded = ref(false)
const isDebug = ref(false)
const currentOrdalie = ref(null)

export default () => {
  return {
    showLoader,
    resourcesLoaded,
    isDebug,
    currentOrdalie,
  }
}
