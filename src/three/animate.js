import * as THREE from 'three'
import controls from './controls'
import scene from './scene'
import camera from './camera'
import renderer from './renderer'

const clock = new THREE.Clock()

function animate(t) {
    controls.update()
    const time = clock.getElapsedTime()
    requestAnimationFrame(animate)
    renderer.render(scene, camera)
}

export default animate