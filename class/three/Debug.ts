import GUI from 'lil-gui'
import Stats from 'three/examples/jsm/libs/stats.module.js'

import useStore from '@/composables/useStore'

class Debug {
  private active: boolean = false
  private gui: GUI
  private stats: Stats

  constructor() {
    this.setGUI()
    this.setStats()
  }

  private setGUI() {
    this.gui = new GUI()
    // this.gui.close()
    this.active = useStore().isDebug.value
    this.gui.hide()
    if (!this.active) return
    this.gui.show()
  }

  private setStats() {
    if (!this.active) return
    this.stats = Stats()
    this.stats.showPanel(0)
    document.body.appendChild(this.stats.dom)
  }

  getStats() {
    return this.stats
  }

  isActive() {
    return this.active
  }

  addFolder(name: string): GUI {
    return this.gui.addFolder(name)
  }
}

export default Debug
