import { Howler, Howl } from 'howler'

const SOUNDS = [
  {
    name: 'success',
    path: '/sounds/type_2.mp3',
  },
  {
    name: 'oi',
    path: '/sounds/oi.mp3',
  },
]

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
    Howler.volume(0.1)
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
}

export default new AudioManager()
