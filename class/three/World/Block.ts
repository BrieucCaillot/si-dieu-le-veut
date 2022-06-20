import gsap from 'gsap'
import * as THREE from 'three'
import { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import cloneSkinnedMesh from '@/class/three/utils/CloneSkinnedMesh'

import DIFFICULTY_DATAS from '@/constants/DIFFICULTY_DATA'
import OTHERS from '@/constants/OTHERS'
import ORDALIES from '@/constants/ORDALIES'
import TRANSITIONS from '@/constants/TRANSITIONS'
import HEAD from '@/constants/HEAD'

import WebGL from '@/class/three/WebGL'
import Blocks from '@/class/three/World/Blocks'
import OrdalieManager from '@/class/three/World/Ordalie/OrdalieManager'

interface HeadTypes {}

class Block {
  private type: OTHERS | ORDALIES | TRANSITIONS
  // Model
  private defaultModel: GLTF
  private model: any
  private character: THREE.Object3D
  private characterSide: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial | THREE.Material | THREE.Material[]>
  private characterHead: THREE.Mesh
  private characterMainRoot: THREE.Mesh
  private garde: THREE.Object3D
  private difficultyData: { [key: string]: any }

  private position: THREE.Vector3 = new THREE.Vector3()
  private center: THREE.Vector3 = new THREE.Vector3()
  private zMaxPosition = 0.101
  private moveAnimParams = {
    duration: 0.25,
    ease: 'power3.linear',
  }
  // Box3
  private box: THREE.BoxHelper
  private size: THREE.Vector3

  constructor(_type: OTHERS | ORDALIES | TRANSITIONS) {
    console.log('🧱 CREATED ' + _type)

    this.type = _type
    this.setModel()
    this.setCharacter()
    this.setGarde()
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

  private setCharacter() {
    this.character = this.getModel().scene.children.find((child) => child.name === 'RIG_Cuisinier')
    this.characterSide = this.character?.children.find((child) => child.name === 'SIDE_Cuisinier') as THREE.SkinnedMesh
    this.characterMainRoot = this.character?.children.find((child) => child.name.includes('MAIN_SIDE_ROOT')) as THREE.Mesh
    this.characterHead = this.characterSide?.children?.find((child: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>) => child.material.name === 'cuisinier_tete') as THREE.Mesh
  }

  /**
   * Change Character face
   */
  changeCharacterHead(head: THREE.Mesh<THREE.BufferGeometry, THREE.MeshBasicMaterial>, type: HEAD = HEAD.NORMAL) {
    let offset = 0
    console.log(type)
    switch (type) {
      case HEAD.NORMAL:
        offset = 0
        break
      case HEAD.HAPPY:
        offset = 0.2
        break
      case HEAD.SAD:
        offset = 0.4
        break
    }
    // this.characterHead.material.map.offset.x = offset
    head.material.map.offset.x = offset
  }

  /**
   * Get character of model
   */
  getCharacter() {
    return this.character
  }

  /**
   * Get character root of character model
   */
  getCharacterRoot() {
    return this.characterMainRoot
  }

  /**
   * Get character side of character model
   */
  getCharacterSide() {
    return this.characterSide
  }

  /**
   * Toggle character's visibility
   */
  toggleCharacter(value: boolean, delayed: boolean = false) {
    this.characterSide.visible = value
  }

  /**
   * Dipose block
   */
  dipose() {
    // Character
    this.character.traverse((child) => {
      if (child.type === 'SkinnedMesh') {
        ;(child as THREE.SkinnedMesh).geometry.dispose()
        ;((child as THREE.SkinnedMesh).material as THREE.MeshBasicMaterial).dispose()

        if (((child as THREE.SkinnedMesh).material as THREE.ShaderMaterial).type === 'ShaderMaterial') {
          ;((child as THREE.SkinnedMesh).material as THREE.ShaderMaterial).uniforms.uTexture.value.dispose()
        }

        if (((child as THREE.SkinnedMesh).material as THREE.MeshBasicMaterial).type === 'MeshBasicMaterial') {
          ;((child as THREE.SkinnedMesh).material as THREE.MeshBasicMaterial).map.dispose()
        }
      }
    })

    // Garde
    this.garde.traverse((child) => {
      if (child.type === 'SkinnedMesh') {
        ;(child as THREE.SkinnedMesh).geometry.dispose()
        ;((child as THREE.SkinnedMesh).material as THREE.MeshBasicMaterial).dispose()

        if (((child as THREE.SkinnedMesh).material as THREE.ShaderMaterial).type === 'ShaderMaterial') {
          ;((child as THREE.SkinnedMesh).material as THREE.ShaderMaterial).uniforms.uTexture.value.dispose()
        }

        if (((child as THREE.SkinnedMesh).material as THREE.MeshBasicMaterial).type === 'MeshBasicMaterial') {
          ;((child as THREE.SkinnedMesh).material as THREE.MeshBasicMaterial).map.dispose()
        }
      }
    })

    console.log('🧻 DISPOSED ' + this.type)
  }

  private setGarde() {
    this.garde = this.getModel().scene.children.find((child) => child.name === 'RIG_Garde')
  }

  /**
   * Get garde of model
   */
  getGardeModel() {
    return this.garde
  }

  /**
   * Toggle garde's visibility
   */
  toggleGarde(value: boolean, delayed: boolean = false) {
    if (delayed) {
      setTimeout(() => (this.garde.visible = value), 6000)
    } else {
      this.garde.visible = value
    }
  }

  toggleFrustumCulling(value: boolean) {
    this.getModel().scene.traverse((child) => {
      if (child.type === 'SkinnedMesh') child.frustumCulled = value
    })
  }

  /**
   * Add model to scene
   */
  private add() {
    const bg = this.model.scene.children.find((child) => child.name === 'background')
    // bg.material = new THREE.MeshBasicMaterial({
    //   name: 'background',
    //   color: 0xf9f2e
    // })
    this.size = new THREE.Box3().setFromObject(bg).getSize(new THREE.Vector3())
    WebGL.scene.add(this.model.scene)
  }

  /**
   * Set position of model according to other blocks
   */
  private setPosition() {
    let x = 0
    let y = 0
    let z = 0
    // If block is not the first one created
    if (Blocks.getAll().length >= 1) {
      const lastBlockPositionX = Blocks.getLast().getPosition().x
      const lastBlockSizeX = Blocks.getLast().getSize().x
      x = lastBlockPositionX + lastBlockSizeX / 2 + this.size.x / 2
    }
    // this.model.scene.position.set(x, y, z)
    gsap.set(this.model.scene.position, {
      x,
      y,
      z,
    })
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

  moveDefault() {
    console.log('⬇️ DEFAULT', this.type)
    gsap.to(this.model.scene.position, {
      z: 0,
      ...this.moveAnimParams,
    })
  }

  moveBehind() {
    console.log('⬆️ BEHIND', this.type)
    gsap.to(this.model.scene.position, {
      z: -this.zMaxPosition,
      ...this.moveAnimParams,
    })
  }

  moveFarBehind() {
    console.log('⬆️ FAR BEHIND', this.type)
    gsap.to(this.model.scene.position, {
      z: -this.zMaxPosition * 2,
      ...this.moveAnimParams,
    })
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
