import { Howler, Howl } from 'howler'
import audio from '@/public/sounds/typing-feedback.mp3'

const SOUNDS = [
  {
    name: 'success',
    path: '/sounds/typing-feedback.mp3',
  },
  {
    name: 'success',
    path: '/sounds/typing-feedback.mp3',
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
    // Howler.volume(0.1)
    for (const sound of SOUNDS) {
      promises.push(this.loadSound(sound))
    }

    this.sounds = await Promise.all(promises)

    // console.log(this.sounds)

    // this.play('success')
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
