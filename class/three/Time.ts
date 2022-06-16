import gsap from 'gsap'

import WebGL from '@/class/three/WebGL'

class Time {
  deltaTime: number = 0

  addUpdate(fn: Function) {
    gsap.ticker.fps(60)

    gsap.ticker.add((deltaTime: number) => {
      WebGL.debug.getStats()?.begin()
      this.deltaTime = deltaTime
      WebGL.debug.getStats()?.end()
      fn()
    })
  }

  removeUpdate(fn: gsap.TickerCallback) {
    gsap.ticker.remove(fn)
  }
}

export default Time
