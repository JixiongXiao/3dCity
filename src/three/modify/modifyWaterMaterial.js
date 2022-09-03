import * as THREE from 'three'
import gsap from 'gsap'
import vertexShader from '../../shader/water/vertex.glsl'
import fragmentShader from '../../shader/water/fragment.glsl'
import waterParams from './waterParams'

export default function modifyWaterMaterial(mesh) {
    const geometry = new THREE.PlaneBufferGeometry(2, 2, 1024, 1024)
    const waterShaderMaterial = new THREE.ShaderMaterial({
        vertexShader: vertexShader,
        fragmentShader: fragmentShader,
        polygonOffset: true, //材质偏移，解决材质重叠造成的闪烁问题
        side: THREE.DoubleSide,
        transparent: true,
        uniforms: {
            uWaveFrequency: {
                value: waterParams.uWaveFrequency
            },
            uScale: {
                value: waterParams.uScale
            },
            uNoiseFrequency: {
                value: waterParams.uNoiseFrequency
            },
            uNoiseScale: {
                value: waterParams.uNoiseScale
            },
            uXZScale: {
                value: waterParams.uXZScale
            },
            uTime: {
                value: waterParams.uTime
            },
            uLowColor: {
                value: new THREE.Color(waterParams.uLowColor)
            },
            uHighColor: {
                value: new THREE.Color(waterParams.uHighColor)
            },
            uXSpeed: {
                value: waterParams.uXSpeed
            },
            uZSpeed: {
                value: waterParams.uZSpeed
            },
            uNoiseSpeed: {
                value: waterParams.uNoiseSpeed
            },
            uOpacity: {
                value: waterParams.uOpacity
            }
        },
    })
    mesh.material = waterShaderMaterial
    mesh.geometry = geometry
    mesh.rotation.x = - Math.PI / 2
    // console.log(mesh)
}