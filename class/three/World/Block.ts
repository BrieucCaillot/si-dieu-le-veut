import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import cloneSkinnedMesh from '@/class/three/utils/CloneSkinnedMesh'

import DIFFICULTY_DATAS from '@/constants/DIFFICULTY_DATA'
import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

class Block {
  private type: OTHERS | ORDALIES | TRANSITIONS
  // Model
  private defaultModel: GLTF
  private model: any
  private difficultyData: { [key: string]: any }

  private position: THREE.Vector3 = new THREE.Vector3()
  private center: THREE.Vector3 = new THREE.Vector3()
  // Box3
  private modelBox: THREE.Box3
  private box: THREE.BoxHelper
  private size: THREE.Vector3

  constructor(_type: OTHERS | ORDALIES | TRANSITIONS) {
    console.log('🧱 CREATED ' + _type)

    this.type = _type
    this.setModel()
    this.add()
    this.setPosition()
    this.setCenter()
    this.setDifficultyData()
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
   * Hide materials of models to hide
   */
  toggleCharacter(value: boolean) {
    const character = this.getModel().scene.children.filter((child) => child.name.includes('Cuisinier'))
    character.forEach((element) => (element.visible = value))
  }

  toggleGarde(value: boolean) {
    const garde = this.getModel().scene.children.filter((child) => child.name.includes('Garde'))
    garde.forEach((element) => {
      element.visible = value
    })
  }

  /**
   * Add model to scene
   */
  private add() {
    const bg = this.model.scene.children.find((child) => child.name === 'background')
    this.size = new THREE.Box3().setFromObject(bg).getSize(new THREE.Vector3())
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
    // this.model.scene.scale.multiplyScalar(WebGL.camera.perspective)
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

  private setDifficultyData() {
    const difficulty = DIFFICULTY_DATAS[OrdalieManager.getDifficulty()]

    if (Blocks.isOrdalie(this.type as ORDALIES)) {
      this.difficultyData = difficulty[this.type as ORDALIES]
    }
    if (Blocks.isTransition(this.type as TRANSITIONS)) {
      this.difficultyData = difficulty['TRANSITIONS']
    }
  }
  /**
   * Get speed coef of model animations
   */
  getDifficultyData() {
    return this.difficultyData
  }

  /**
   * Get position of model
   */
  getPosition() {
    return this.position
  }

  /**
   * Update position of model
   */
  updatePosition(position: THREE.Vector3) {
    return this.position.set(position.x, position.y, position.z)
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
