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
        addSpread(shader, mesh)
        addToTopLine(shader, mesh)
        addScanLight(shader, mesh)
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
        '//#end',
        `
        vec4 gradColor = gl_FragColor;
        float gradMix = (vPosition.y + uHeight / 2.0 ) / uHeight;
        vec3 gradMixColor = mix(gradColor.xyz, uTopColor, gradMix);
        gl_FragColor = vec4(gradMixColor,1);
        //#end
        `
    )
}
export function addSpread(shader, mesh) {
    shader.uniforms.uSpreadCenter = { value: new THREE.Vector2(0, 0) }
    shader.uniforms.uSpreadTime = { value: 0.0 }
    shader.uniforms.uSpreadWidth = { value: 40.0 }

    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `#include <common>
        uniform vec2 uSpreadCenter;
        uniform float uSpreadTime;
        uniform float uSpreadWidth;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        // spreadRadius拿到的是某一个像素在某一帧到达原点的距离，永远是静态的
        '//#end',
        `
        float spreadRadius = distance(vPosition.xz, uSpreadCenter);
        // 扩散范围的函数
        float spreadIndex = -(spreadRadius - uSpreadTime) * (spreadRadius - uSpreadTime) + uSpreadWidth;
        if(spreadIndex > 0.0) {
            gl_FragColor = mix(gl_FragColor, vec4(1.0,1.0,1.0,1.0), 1.0);
        }

        //#end
        `
    )
    gsap.to(shader.uniforms.uSpreadTime, {
        value: 1500,
        duration: 2,
        ease: 'none',
        repeat: -1
    })
}
export function addScanLight(shader, mesh) {
    shader.uniforms.uScanTime = { value: -1500 }
    shader.uniforms.uScanWidth = { value: 20.0 }
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uScanTime;
        uniform float uScanWidth;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        '//#end',
        `
        float scanIndex = -(vPosition.x + vPosition.z - uScanTime) * (vPosition.x + vPosition.z - uScanTime) + uScanWidth; 
        if(scanIndex > 0.0) {
            gl_FragColor = mix(gl_FragColor, vec4(1.0,1.0,1.0,1.0), scanIndex / uScanWidth);
        }

        //#end
        `
    )
    gsap.to(shader.uniforms.uScanTime, {
        value: 1500,
        duration: 2,
        ease: 'none',
        repeat: -1
    })
}
export function addToTopLine(shader, mesh) {
    shader.uniforms.uToTopTime = { value: 0.0 }
    shader.uniforms.uToTopWidth = { value: 20.0 }
    shader.fragmentShader = shader.fragmentShader.replace(
        '#include <common>',
        `
        #include <common>
        uniform float uToTopTime;
        uniform float uToTopWidth;
        `
    )
    shader.fragmentShader = shader.fragmentShader.replace(
        '//#end',
        `
        float toTopIndex = -(vPosition.y - uToTopTime) * (vPosition.y - uToTopTime) + uToTopWidth;
        if(toTopIndex > 0.0) {
            gl_FragColor = mix(gl_FragColor, vec4(1.0,1.0,1.0,1.0), toTopIndex / uToTopWidth);
        }
        //#end
        `
    )
    gsap.to(shader.uniforms.uToTopTime, {
        value: 600,
        duration: 3,
        ease: 'none',
        repeat: -1
    })
}