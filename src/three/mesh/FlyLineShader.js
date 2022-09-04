import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from '@/shader/flyLineShader/vertex.glsl'
import fragmentShader from '@/shader/flyLineShader/fragment.glsl'

export default class FlyLineShader {
    constructor(position = { x: 10, z: 0 }, color = 0xffff00) {
        this.linePoint = [
            new THREE.Vector3(0, 0, 0),
            new THREE.Vector3(position.x / 2, 4, position.z / 2),
            new THREE.Vector3(position.x, 3, position.z)
        ]
        this.lineCurve = new THREE.CatmullRomCurve3(this.linePoint)
        const points = this.lineCurve.getPoints(1000)
        this.geometry = new THREE.BufferGeometry().setFromPoints(points)

        // 给每一个顶点设置属性 大小与他们的index成正比，越后面越大
        const pointSizeArray = new Float32Array(points.length)
        for (let i = 0; i < pointSizeArray.length; i++) {
            pointSizeArray[i] = i
        }
        // 给几何体设置属性，该属性可以在着色器中通过attribute拿到
        this.geometry.setAttribute('aSize', new THREE.BufferAttribute(pointSizeArray, 1))

        // 创建材质
        this.shaderMaterial = new THREE.ShaderMaterial({
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            depthWrite: false,
            blending: THREE.AdditiveBlending,
            uniforms: {
                uTime: {
                    value: 0
                },
                uColor: {
                    value: new THREE.Color(color)
                },
                uLength: {
                    value: points.length
                }
            }
        })
        this.mesh = new THREE.Points(this.geometry, this.shaderMaterial)
        gsap.to(this.shaderMaterial.uniforms.uTime, {
            value: 1000,
            duration: 2,
            repeat: -1,
            ease: 'none'
        })
    }
    remove() {
        this.mesh.remove();
        this.mesh.removeFromParent();
        this.mesh.geometry.dispose();
        this.mesh.material.dispose();
    }
}