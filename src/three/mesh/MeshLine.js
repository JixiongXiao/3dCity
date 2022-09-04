import * as THREE from 'three'
export default class MeshLine {
    constructor(mesh) {
        this.geometry = new THREE.EdgesGeometry(mesh);
        this.material = new THREE.LineBasicMaterial({ color: 0xffffff })
        this.mesh = new THREE.LineSegments(this.geometry, this.material);
    }
}