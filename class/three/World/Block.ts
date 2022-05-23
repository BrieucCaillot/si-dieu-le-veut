import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import cloneSkinnedMesh from '@/class/three/utils/CloneSkinnedMesh'

import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'

class Block {
  private type: OTHERS | ORDALIES | TRANSITIONS
  // Model
  private defaultModel: GLTF
  private model: any
  private character: THREE.Mesh
  private characterAnimations: THREE.AnimationClip[]
  private textMesh: THREE.Mesh

  private position: THREE.Vector3 = new THREE.Vector3()
  private center: THREE.Vector3 = new THREE.Vector3()
  // Box3
  private modelBox: THREE.Box3
  private planeTextBox: THREE.Box3
  private box: THREE.BoxHelper
  private size: THREE.Vector3

  constructor(_type: OTHERS | ORDALIES | TRANSITIONS) {
    console.log('🧱 CREATED ' + _type)

    this.type = _type
    this.setModel()
    this.setTextMesh()
    this.setCharacterModel()
    this.add()
    this.setPosition()
    this.setCenter()
    // this.setBoxHelper()
    Blocks.onCreated(this)
  }

  /**
   * Get block type
   */
  getType() {
    return this.type
  }

  /**
   * Set default model from type
   */
  private setModel() {
    this.defaultModel = WebGL.resources.getItems(this.type, 'model') as GLTF
    const clonedGLTF = cloneSkinnedMesh(this.defaultModel)
    this.model = clonedGLTF
  }

  /**
   * Get model
   */
  getModel() {
    return this.model
  }

  /**
   * Set character from model
   */
  private setCharacterModel() {
    this.character = this.model.scene.children.find((child) => child.name === 'character') as THREE.Mesh
  }

  /**
   * Get character model
   */
  getCharacterModel() {
    return this.character
  }

  /**
   * Get text mesh
   */
  getTextMesh() {
    return this.textMesh
  }

  /**
   * Set text region
   */
  private setTextMesh() {
    this.textMesh = this.model.scene.children.find((child) => child.name === 'Plane') as THREE.Mesh
    this.setTextMeshBox()
  }

  /**
   * Set text mesh box
   */
  private setTextMeshBox() {
    this.planeTextBox = new THREE.Box3()
    if (!this.textMesh) return
    const { geometry, matrixWorld } = this.textMesh
    geometry.computeBoundingBox()
    this.planeTextBox.copy(geometry.boundingBox).applyMatrix4(matrixWorld)
  }

  /**
   * Add model to scene
   */
  private add() {
    this.modelBox = new THREE.Box3().setFromObject(this.model.scene)
    this.size = this.modelBox.getSize(new THREE.Vector3())
    this.model.scene.scale.set(1, 1, 1)
    WebGL.scene.add(this.model.scene)
  }

  /**
   * Set position of model according to other blocks
   */
  private setPosition() {
    if (Blocks.getAll().length < 1) return
    const lastBlockPositionX = Blocks.getLast().getPosition().x
    const lastBlockSizeX = Blocks.getLast().getSize().x
    this.model.scene.position.setX(lastBlockPositionX + lastBlockSizeX / 2 + this.size.x / 2)
    this.position = this.model.scene.position
  }

  private setCenter() {
    this.center = this.model.scene.getWorldPosition(new THREE.Vector3())
    // this.setCenterDebug()
  }

  private setCenterDebug() {
    const geometry = new THREE.BoxGeometry(1, 1, 1)
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 })
    const mesh = new THREE.Mesh(geometry, material)
    mesh.scale.multiplyScalar(0.1)
    mesh.position.set(this.center.x, 0, 1)
    WebGL.scene.add(mesh)
  }

  /**
   * Get position
   */
  getPosition() {
    return this.position
  }

  /**
   * Get size of model
   */
  getSize() {
    return this.size
  }

  /**
   * Get center of model
   */
  getCenter() {
    return this.center
  }

  /**
   * Add box helper to model
   */
  private setBoxHelper() {
    this.box = new THREE.BoxHelper(this.model.scene, 0xffff00)
    WebGL.scene.add(this.box)
  }
}

export default Block
