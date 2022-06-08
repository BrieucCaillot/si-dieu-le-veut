import * as THREE from 'three'
import WebGL from '@/class/three/WebGL'

const setHTMLPosition = (mesh: THREE.Mesh) => {
  const meshSize = new THREE.Box3().setFromObject(mesh)

  const topLeftCorner3D = new THREE.Vector3(meshSize.min.x, meshSize.max.y, meshSize.max.z)
  const topRightCorner3D = new THREE.Vector3(meshSize.max.x, meshSize.max.y, meshSize.max.z)
  const bottomLeftCorner3D = new THREE.Vector3(meshSize.min.x, meshSize.min.y, meshSize.max.z)
  const center3D = new THREE.Vector3((topLeftCorner3D.x + topRightCorner3D.x) / 2, bottomLeftCorner3D.y, meshSize.max.z)

  topLeftCorner3D.project(WebGL.camera.instance)
  const topLeft = {
    x: (topLeftCorner3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth,
    y: (topLeftCorner3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight,
  }

  topRightCorner3D.project(WebGL.camera.instance)
  const topRight = {
    x: (topRightCorner3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth,
    y: (topRightCorner3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight,
  }

  bottomLeftCorner3D.project(WebGL.camera.instance)
  const bottomLeft = {
    x: (bottomLeftCorner3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth,
    y: (bottomLeftCorner3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight,
  }

  center3D.project(WebGL.camera.instance)
  const center = {
    x: (center3D.x * 0.5 + 0.5) * WebGL.canvas.clientWidth,
    y: (center3D.y * -0.5 + 0.5) * WebGL.canvas.clientHeight,
  }

  const width = Math.abs(topLeft.x - topRight.x)
  const height = Math.abs(topLeft.y - bottomLeft.y)

  return {
    topLeft,
    topRight,
    bottomLeft,
    center,
    width,
    height,
  }
}

export default setHTMLPosition
