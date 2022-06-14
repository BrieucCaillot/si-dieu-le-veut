import GUI from 'lil-gui'

import Other from '@/class/three/World/Other/Other'

class OtherEnd {
  instance: Other
  animation!: { [key: string]: any }
  debugFolder: GUI
  text: THREE.Mesh

  constructor(_other: Other) {
    this.instance = _other
    this.text = this.instance.block.getModel().scene.children.find((mesh: THREE.Mesh) => mesh.name === 'resurection')
    console.log(this.text)
  }

  start() {
    // setTimeout(() => this.end(), 100)

    useStore().currentOther.value = this.instance.block.getType()
  }

  onRetry() {
    window.location.reload()
  }

  end() {
    useStore().currentOther.value = null
    this.instance.end()
  }

  update() {}
}

export default OtherEnd
