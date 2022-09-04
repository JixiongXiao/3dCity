import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from '@/shader/ligthWall/vertex.glsl'
import fragmentShader from '@/shader/ligthWall/fragment.glsl'

export default class LightWall {
    constructor(radius = 1, length = 3, position = { x: 0, z: 0 }, color = 0xff0000) {
        this.geometry = new THREE.CylinderBufferGeometry(radius, radius, 2, 32, 1, true);
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            side: THREE.DoubleSide,
            transparent: true
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(position.x, 1, position.z)
        this.mesh.geometry.computeBoundingBox()
        const { max, min } = this.mesh.geometry.boundingBox
        const uHeight = max.y - min.y
        this.material.uniforms.uHeight = {
            value: uHeight
        }
        gsap.to(this.mesh.scale, {
            x: length,
            z: length,
            duration: 1,
            repeat: -1,
            yoyo: true
        })
    }
    remove() {
        this.mesh.remove();
        this.mesh.removeFromParent();
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}