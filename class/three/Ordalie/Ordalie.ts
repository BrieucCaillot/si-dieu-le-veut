import * as THREE from 'three'

import { ORDALIES } from '@/constants/ORDALIES'

import OrdalieResources from '@/class/three/Ordalie/OrdalieResources'

class Ordalie {
  type: string
  model: any
  resources: OrdalieResources

  constructor({ _type = '' }: { _type: ORDALIES | string }) {
    this.type = _type

    this.resources = new OrdalieResources({
      _type: this.type,
    })

    this.setModel()
  }

  setModel() {
    console.log(this)
  }
}

export default Ordalie
