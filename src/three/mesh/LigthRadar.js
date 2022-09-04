import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from '@/shader/radar/vertex.glsl'
import fragmentShader from '@/shader/radar/fragment.glsl'

export default class LightRadar {
    constructor(radius = 2, position = { x: 0, z: 0 }, color = 0xff0000) {
        this.geometry = new THREE.PlaneBufferGeometry(radius, radius)
        this.material = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            side: THREE.DoubleSide,
            uniforms: {
                uColor: {
                    value: new THREE.Color(color)
                },
                uTime: {
                    value: 0
                }
            }
        })
        this.mesh = new THREE.Mesh(this.geometry, this.material)
        this.mesh.position.set(position.x, 1, position.z)
        this.mesh.rotation.x = -Math.PT / 2
        gsap.to(this.material.uniforms.uTime, {
            value: 1,
            duration: 1,
            repeat: -1,
            ease: "none",
        });
    }
}