import * as THREE from 'three'

// 3创建相机
const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
)

// 设置相机位置
camera.position.set(5, 10, 10);

export default camera