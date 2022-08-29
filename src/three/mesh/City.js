import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '../scene'

export default function createCity() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/newcity.glb', (gltf) => {
        // 给模型设置材质
        gltf.scene.traverse((item) => { // traverse内置遍历方法
            if (item.type === 'Mesh') {
                const cityMaterial = new THREE.MeshBasicMaterial({
                    color: new THREE.Color(0x0c0e6f)
                })
                item.material = cityMaterial
            }
        })
        scene.add(gltf.scene)

    })

}