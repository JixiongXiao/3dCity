import * as THREE from 'three'
import gsap from 'gsap'

export default function modifyCityMaterial(mesh) {
    mesh.material.onBeforeCompile = (shader) => {
        shader.fragmentShader = shader.fragmentShader.replace(
            '#include <dithering_fragment>',
            `
            #include <dithering_fragment>
            //#end#
            `
        )
        addGradColor(shader, mesh)
    }
}

export function addGradColor(shader, mesh) {
    const { max, min } = mesh.geometry.boundingBox
    const uHeight = max.y - min.y
    console.log(uHeight)
}