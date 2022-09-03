import * as THREE from 'three'
import controls from './controls'
import scene from './scene'
import camera from './camera'
import renderer from './renderer'

const clock = new THREE.Clock()
function animate(t, num) {
    controls.update()
    const time = clock.getElapsedTime()
    // console.log(scene.children)
    if (time > 1.0) {
        scene.children[scene.children.length - 1].children[10].material.uniforms.uTime.value = time
    }
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

export default animate