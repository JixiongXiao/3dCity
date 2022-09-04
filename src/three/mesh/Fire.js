import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from '@/shader/fire/vertex.glsl'
import fragmentShader from '@/shader/fire/fragment.glsl'

export default class Fire {
    constructor(position = { x: -5, z: 3 }) {
        this.geometry = new THREE.PlaneBufferGeometry(2, 2)
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            transparent: true
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(position.x, 4, position.y)

    }
}