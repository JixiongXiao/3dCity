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
    mesh.geometry.computeBoundingBox() // 计算整个模型的最高点和最低点组成的立方体
    const { max, min } = mesh.geometry.boundingBox
    const uHeight = max.y - min.y
    shader.uniforms.uHeight = {
        value: uHeight // 把高度差传入shader的uniforms中作为参数
    }
    shader.uniforms.uTopColor = {
        value: new THREE.Color('#aaaeff') // 最顶部的颜色
    }
    shader.vertexShader = shader.vertexShader.replace(
        '#include <common>',
        `
        #include <common>
        varying vec3 vPosition;
        `
    )
    shader.vertexShader = shader.vertexShader.replace(
        '#include <begin_vertex>',
        `
        #include <begin_vertex>
        vPosition = position;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uHeight;
        uniform vec3 uTopColor;
        varying vec3 vPosition;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        // 为什么要用y + uHeigth
        // 因为uHeight就是代表当前模型的高度，假设当前模型高度是100
        // 那么y的最低值和最高值差就是100，可能是-20到80或者0到100
        // 所以用y+uheight等于把高度*2，再除以2，就可以获得一个永远大于0的高度
        // 比如假设高度为-20到80，高度差100，此时把整体高度加100，就是从80-180
        // 那么最低点就是-20变成80，最高点就是从80变成180,再把值除以2就能保证拿到正数值
        '//#end#',
        `
        vec4 gradColor = gl_FragColor;
        float gradMix = (vPosition.y + uHeight / 2.0 ) / uHeight;
        vec3 gradMixColor = mix(gradColor.xyz, uTopColor, gradMix);
        gl_FragColor = vec4(gradMixColor,1);
        //#end#
        `
    )
    console.log(shader.vertexShader)
    console.log(shader.fragmentShader)
}