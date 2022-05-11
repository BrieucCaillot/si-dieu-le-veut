import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'

class Tapisserie {
	mesh: THREE.Mesh
	material: THREE.Material
	geometry: THREE.PlaneGeometry

	constructor() {
		this.createPlane()
	}

	createPlane() {
		const baseTexture = WebGL.resources.itemsLoaded['tapisserieBase']
		const normalTexture = WebGL.resources.itemsLoaded['billboardNormal']
		this.material = new THREE.MeshStandardMaterial({
			color: 0xffffff,
			map: baseTexture,
			normalMap: normalTexture,
			normalScale: new THREE.Vector2(30, 30),
		})
		this.geometry = new THREE.PlaneGeometry(10, 10, 10, 10)
		this.mesh = new THREE.Mesh(this.geometry, this.material)
		this.mesh.position.set(0, 0, -0.1)
		this.mesh.scale.set(1, baseTexture.image.height / baseTexture.image.width, 1)
		WebGL.scene.add(this.mesh)
	}
}

export default Tapisserie
