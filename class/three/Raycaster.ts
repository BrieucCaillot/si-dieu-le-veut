import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'
import Social from '@/class/three/utils/Social'
import SOCIALS from '~~/constants/SOCIALS'

class Raycaster {
  instance: THREE.Raycaster = new THREE.Raycaster()
  pointer: THREE.Vector2 = new THREE.Vector2(-10, -10)

  constructor() {}

  onMouseMove() {
    this.pointer.set(WebGL.mouse.normalizedPosition.x, WebGL.mouse.normalizedPosition.y)
  }

  onUpdate() {
    if (!WebGL.mouse.isMoving) return
    this.instance.setFromCamera(this.pointer, WebGL.camera.instance)

    // calculate objects intersecting the picking ray
    const intersects = this.instance.intersectObjects(WebGL.scene.children)

    for (let i = 0; i < intersects.length; i++) {
      const object = intersects[i].object as THREE.Mesh
      if ([SOCIALS.FACEBOOK, SOCIALS.TWITTER].includes(object.name as SOCIALS)) {
        Social.onHover(object)
      }
    }
  }
}

export default Raycaster
