import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'

class Block extends THREE.EventDispatcher {
  type: OTHERS | ORDALIES | TRANSITIONS
  // Model
  model: GLTF
  object: THREE.Object3D
  private position: THREE.Vector3 = new THREE.Vector3()
  // Box3
  private modelBox: THREE.Box3
  private box: THREE.BoxHelper
  private size: THREE.Vector3

  constructor(_type: OTHERS | ORDALIES | TRANSITIONS) {
    super()

    console.log('Init Block ' + _type)

    this.type = _type
    this.getModel()
    this.add()
    this.setPosition()
    Blocks.onBlockCreated(this)
  }

  /**
   * Get model from type
   */
  getModel() {
    this.model = WebGL.resources.getItems(this.type, 'model')
  }

  /**
   * Add model to scene
   */
  add() {
    this.object = this.model.scene
    this.modelBox = new THREE.Box3().setFromObject(this.object)
    this.size = this.modelBox.getSize(new THREE.Vector3())
    this.object.scale.set(1, 1, 1)
    WebGL.scene.add(this.object)
  }

  setPosition() {
    if (Blocks.getBlockInstances().length < 1) return
    this.object.position.setX(Blocks.getLastBlockInstance().position.x + this.size.x)
    this.position = this.object.position
  }

  getSize() {
    return this.size
  }

  /**
   * Add box helper to model
   */
  setBoxHelper() {
    this.box = new THREE.BoxHelper(this.object, 0xffff00)
    WebGL.scene.add(this.box)
  }
}

export default Block
