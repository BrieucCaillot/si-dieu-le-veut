function detectMob() {
  const toMatch = [/Android/i, /webOS/i, /iPhone/i, /iPad/i, /iPod/i, /BlackBerry/i, /Windows Phone/i]

  return toMatch.some((toMatchItem) => {
    return navigator.userAgent.match(toMatchItem)
  })
}
export const isTabletSize = () => {
  return window.matchMedia('(max-width: 767px)').matches
}
export const isMobileTest = () => {
  return detectMob() || isTabletSize()
}
