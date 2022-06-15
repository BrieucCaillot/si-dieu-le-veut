const isMobile = ref(null)
const isDebug = ref(false)
const showLoader = ref(true)
const resourcesLoaded = ref(false)
const currentType = ref(null)

export default () => {
  return {
    isMobile,
    isDebug,
    showLoader,
    resourcesLoaded,
    currentType,
  }
}
