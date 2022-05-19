const isLoaderHidden = ref(false)
const resourcesLoaded = ref(false)

export default () => {
  return {
    isLoaderHidden,
    resourcesLoaded,
  }
}
