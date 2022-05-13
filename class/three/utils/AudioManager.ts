import { Howler, Howl } from 'howler'

class AudioManager {
  activeHowl: Howl | null

  constructor() {}

  setup() {
    this.activeHowl = null
    Howler.volume(0.1)
  }
}

export default new AudioManager()
