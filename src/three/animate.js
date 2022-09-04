import * as THREE from 'three'
import controls from './controls'
import scene from './scene'
import camera from './camera'
import renderer from './renderer'
import { meshUpdate } from './mesh/City'

const clock = new THREE.Clock()
function animate(t, num) {
    const time = clock.getElapsedTime()
    // console.log(scene.children)
    if (time > 1.0) {
        meshUpdate(time)
    }
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

export default animate