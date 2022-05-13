import * as THREE from 'three'

import WebGL from '@/class/three/WebGL'

class Environment extends THREE.EventDispatcher {
	debugFolder!: { [key: string]: any }
	ambiantLight: THREE.AmbientLight
	environmentMap: { [key: string]: any } = {}

	constructor() {
		super()

		// Debug
		if (WebGL.debug.active) this.debugFolder = WebGL.debug.addFolder('environment')

		this.setEnvironmentMap()
		this.setAmbiantLight()
	}

	setAmbiantLight() {
		this.ambiantLight = new THREE.AmbientLight(0xffffff, 2)
		WebGL.scene.add(this.ambiantLight)
	}

	setEnvironmentMap() {
		this.environmentMap.intensity = 0.4
		this.environmentMap.texture = WebGL.resources.itemsLoaded['environmentMapTexture']
		this.environmentMap.texture.encoding = THREE.sRGBEncoding

		WebGL.scene.environment = this.environmentMap.texture

		this.environmentMap.updateMaterials = () => {
			WebGL.scene.traverse((child) => {
				if (child instanceof THREE.Mesh && child.material instanceof THREE.MeshStandardMaterial) {
					child.material.envMap = this.environmentMap.texture
					child.material.envMapIntensity = this.environmentMap.intensity
					child.material.needsUpdate = true
				}
			})
		}
		this.environmentMap.updateMaterials()

		// Debug
		if (WebGL.debug.active) {
			this.debugFolder.add(this.environmentMap, 'intensity').name('envMapIntensity').min(0).max(4).step(0.001).onChange(this.environmentMap.updateMaterials)
		}
	}
}

export default Environment
