const isLoaderHidden = ref(false)
const resourcesLoaded = ref(false)
const isDebug = ref(false)

export default () => {
  return {
    isLoaderHidden,
    resourcesLoaded,
    isDebug,
  }
}
