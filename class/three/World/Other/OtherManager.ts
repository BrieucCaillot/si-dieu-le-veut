import OTHERS from '@/constants/OTHERS'

import Other from '@/class/three/World/Other/Other'

class OtherManager {
  private others: any[] = []

  /**
   * Create other from type
   */
  create = (_type: OTHERS) => {
    this.others.push(new Other(_type))
  }

  /**
   * Get all others
   */
  getAll() {
    return this.others
  }

  /**
   * When other created
   */
  onOtherCreated() {
    console.log('Transition created')
  }

  /**
   * When other finished
   */
  onOtherFinished() {
    console.log('Transition finished')
  }
}

export default new OtherManager()
