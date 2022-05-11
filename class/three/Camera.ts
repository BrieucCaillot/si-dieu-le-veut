import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

import WebGL from '@/class/three/WebGL'

import { EntitiesLayer } from '@/constants/ENTITIES'

class Camera extends THREE.EventDispatcher {
	instance: THREE.PerspectiveCamera
	controls: OrbitControls
	debugFolder: { [key: string]: any }

	constructor() {
		super()

		if (WebGL.debug.active) this.debugFolder = WebGL.debug.gui.addFolder('camera')

		this.setInstance()
		this.setControls()
	}

	setInstance() {
		this.instance = new THREE.PerspectiveCamera(35, WebGL.sizes.width / WebGL.sizes.height, 1, 1000)
		this.instance.position.set(0, 0, 16)
		WebGL.scene.add(this.instance)
	}

	enableLayers(layerId: EntitiesLayer) {
		this.instance.layers.enable(layerId)
	}

	setControls() {
		this.controls = new OrbitControls(this.instance!, WebGL.canvas)
		this.controls.enableDamping = true

		if (WebGL.debug.active) {
			this.debugFolder.add(this.controls, 'enabled')
		}
	}

	onResize() {
		this.instance!.aspect = WebGL.sizes.width / WebGL.sizes.height
		this.instance!.updateProjectionMatrix()
	}

	onUpdate() {
		this.controls!.update()
	}

	destroy() {
		this.controls!.dispose()
	}
}

export default Camera
