import OTHERS from '@/constants/OTHERS'

import Blocks from '@/class/three/World/Blocks'
import Other from '@/class/three/World/Other/Other'

class OtherManager {
  private instances: Other[] = []
  private currentIndex = 0

  /**
   * Create other from type
   */
  create(_type: OTHERS) {
    const other = new Other(_type)
    this.instances.push(other)
  }

  /**
   * Get all others instances
   */
  getAll() {
    return this.instances
  }

  /**
   * Get other by index
   */
  getByIndex(index: number) {
    return this.instances[index]
  }

  /**
   * Get current other from current index
   */
  getCurrent() {
    return this.instances[this.currentIndex]
  }

  /**
   * Set current new current index
   */
  setCurrentIndex(index: number) {
    this.currentIndex = index
  }

  /**
   * Start Splashscreen
   */
  startFirst() {
    this.getByIndex(0).start()
  }

  /**
   * Start next other
   */
  startNext = () => {
    // console.log('✨ START NEXT')
    this.currentIndex++
    console.log('wtfff', this.getCurrent().block.getType(), this.currentIndex)
    this.getCurrent().start()
  }

  /**
   * On Other started
   */
  onStarted() {
    console.log('✨ STARTED ' + this.getCurrent().block.getType())
    Blocks.onStarted()
  }

  /**
   * On Other ended
   */
  onEnded() {
    console.log('✨ ENDED ' + this.getCurrent().block.getType())
    Blocks.onEnded()
  }
}

export default new OtherManager()
