import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '../scene'
import modifyCityMaterial from '../modify/modifyCityMaterial'
import modifyFloorMaterial from '../modify/modifyFloorMaterial'

export default function createCity() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/newcity.glb', (gltf) => {
        // 给模型设置材质
        gltf.scene.traverse((item) => { // traverse内置遍历方法
            if (item.type == 'Mesh') {
                if (item.name === 'Layerbuildings') {
                    const cityMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(0x0c0e6f)
                    })
                    item.material = cityMaterial
                    modifyCityMaterial(item)
                } else if (item.name === 'Layertopography') {
                    const cityMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(0x0c0e6f)
                    })
                    item.material = cityMaterial
                    modifyFloorMaterial(item)
                } else if (item.name === 'lake') {
                    const waterMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(0x0c0e6f),
                        side: THREE.DoubleSide
                    })
                    item.material = waterMaterial
                    console.log(item)
                }

            }
        })
        scene.add(gltf.scene)

    })

}