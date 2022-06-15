import { Howler, Howl } from 'howler'
import ORDALIES from '~~/constants/ORDALIES'

import { SOUNDS } from '@/constants/SOURCES'

class AudioManager {
  activeHowl: Howl | null
  sounds: {
    name: string
    howl: Howl
  }[]
  constructor() {}

  async setup() {
    const promises = []
    // this.activeHowl = null
    Howler.volume(1)
    for (const sound of SOUNDS) {
      promises.push(this.loadSound(sound))
    }

    this.sounds = await Promise.all(promises)
  }

  async loadSound(sound: { name: string; path: string }) {
    return new Promise((resolve, reject) => {
      const s = new Howl({
        src: sound.path,
      })

      const obj = {
        name: sound.name,
        howl: s,
      }

      s.on('load', resolve(obj))
    })
  }

  play(name: string) {
    const sound = this.sounds.find((sound) => sound.name === name)
    sound.howl.play()
  }

  fadeIn(name: string, durationInMs: number) {
    const sound = this.sounds.find((sound) => sound.name === name)
    sound.howl.play()
    sound.howl.fade(0, 1, durationInMs)
  }

  fadeOut(name: string, durationInMs: number) {
    const sound = this.sounds.find((sound) => sound.name === name)
    sound.howl.fade(1, 0, durationInMs)

    sound.howl.once('fade', () => {
      sound.howl.stop()
    })
  }

  isPlaying(name: string) {
    const sound = this.sounds.find((sound) => sound.name === name)
    return sound.howl.playing()
  }
}

export default new AudioManager()
