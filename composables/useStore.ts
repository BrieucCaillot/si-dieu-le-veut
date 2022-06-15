const isMobile = ref(null)
const showLoader = ref(true)
const resourcesLoaded = ref(false)
const isDebug = ref(false)
const currentType = ref(null)

export default () => {
  return {
    isMobile,
    showLoader,
    resourcesLoaded,
    isDebug,
    currentType,
  }
}
