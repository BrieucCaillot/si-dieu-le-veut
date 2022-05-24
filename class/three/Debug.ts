import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import useStore from '@/composables/useStore'

class Debug {
  private active: boolean = false
  private gui!: GUI
  private stats: Stats = Stats()

  constructor() {
    this.setGUI()
    this.setStats()
  }

  private setGUI() {
    this.gui = new GUI()
    this.active = useStore().isDebug.value
    this.gui.hide()
    if (!this.active) return
    this.gui.show()
  }

  private setStats() {
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)
  }

  isActive() {
    return this.active
  }

  addFolder(name: string): GUI {
    return this.gui.addFolder(name)
  }
}

export default Debug
