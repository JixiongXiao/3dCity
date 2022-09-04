import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import * as THREE from 'three'
import scene from '../scene'
import modifyCityMaterial from '../modify/modifyCityMaterial'
import modifyFloorMaterial from '../modify/modifyFloorMaterial'
import modifyWaterMaterial from '../modify/modifyWaterMaterial'
import FlyLineShader from './FlyLineShader'
import LightRadar from './LigthRadar'
import MeshLine from './MeshLine'
import LigthWall from './LightWall'


export default function createCity() {
    const gltfLoader = new GLTFLoader()
    gltfLoader.load('./model/newcity.glb', (gltf) => {
        // 给模型设置材质
        gltf.scene.traverse((item) => { // traverse内置遍历方法
            if (item.type == 'Mesh') {
                if (item.name === 'Layerbuildings') {
                    const cityMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(0x0c0e6f),
                        visible: true
                    })
                    item.material = cityMaterial
                    modifyCityMaterial(item)
                    // 添加建筑边框
                    const meshLine = new MeshLine(item.geometry)
                    const scale = item.scale.x * 1.001
                    meshLine.mesh.scale.set(scale, scale, scale)
                    scene.add(meshLine.mesh)
                } else if (item.name === 'Layertopography') {
                    const cityMaterial = new THREE.MeshBasicMaterial({
                        color: new THREE.Color(0x0c0e6f),
                        visible: true
                    })
                    item.material = cityMaterial
                    modifyFloorMaterial(item)
                } else if (item.name === 'lake') {
                    modifyWaterMaterial(item)
                }

            }
        })
        scene.add(gltf.scene)

    })

    // 添加着色器飞线
    const flyLineShader = new FlyLineShader()
    scene.add(flyLineShader.mesh)
    // 添加雷达
    const lightRadar = new LightRadar()
    scene.add(lightRadar.mesh)

    // 添加光墙
    const ligthWall = new LigthWall()
    scene.add(ligthWall.mesh)

}