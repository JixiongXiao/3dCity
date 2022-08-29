import * as THREE from 'three'

// 2初始化渲染器
const renderer = new THREE.WebGLRenderer(
    { antialias: true } // 抗锯齿
)

//设定渲染的尺寸大小
renderer.setSize(window.innerWidth, window.innerHeight);

// 开启阴影贴图
renderer.shadowMap.enabled = true

export default renderer