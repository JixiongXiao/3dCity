<template>
  <div class="scene" ref="sceneDiv" style="height:100vh;width:100vw" ></div>
</template>

<script setup>
import { onMounted, ref, watch } from 'vue'
import * as THREE from 'three'
import gsap from 'gsap'

// 引入场景
import scene from '@/three/scene'
// 引入相机
import camera from '@/three/camera'
// 引入渲染器
import renderer from '@/three/renderer'
// 导入坐标辅助器
import axesHelper from '@/three/axesHelper'
// 导入轨道控制器
import controls from '@/three/controls'
// 导入初始化配置文件
import '@/three/init'
// 导入动画函数
import animate from '@/three/animate'
// 导入添加物体函数
import createMesh from '@/three/createMesh'

// 场景元素声明
let sceneDiv = ref(null)
scene.add(camera)
scene.add(axesHelper)
// scene.add(controls)
createMesh()
 animate()
onMounted(()=>{
    sceneDiv.value.appendChild(renderer.domElement)
})

</script>

<style>
.scene{
    /* width:100vw;
    height:100vh; */
    position:fixed;
    z-index:100;
    left:0;
    top:0;
}
</style>