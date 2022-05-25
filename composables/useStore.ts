import ORDALIES from '@/constants/ORDALIES'

const isLoaderHidden = ref(false)
const resourcesLoaded = ref(false)
const isDebug = ref(false)
const currentOrdalie = ref(null)

export default () => {
  return {
    isLoaderHidden,
    resourcesLoaded,
    isDebug,
    currentOrdalie,
  }
}
