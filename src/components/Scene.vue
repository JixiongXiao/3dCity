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

import LightWall from '@/three/mesh/LightWall'
import FlyLineShader from '@/three/mesh/FlyLineShader'
import LightRadar from '@/three/mesh/LightRadar'
import eventHub from '@/utils/eventHub'

const props = defineProps(['eventList','dataInfo'])
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

const eventLishMesh = []

let mapFn = {
  火警:(position,index) =>{
    // 添加光墙
    const lightRadar = new LightRadar(position)
    lightRadar.eventListIndex = index
    scene.add(lightRadar.mesh)
    eventLishMesh.push(lightRadar)
  },
  治安:(position,index)=>{
    // 生成随机颜色
    const color = new THREE.Color(
      Math.random(),
      Math.random(),
      Math.random()
    ).getHex()
    const flyLineShader = new FlyLineShader(position,color)
    flyLineShader.eventListIndex = index
    scene.add(flyLineShader.mesh)
    eventLishMesh.push(flyLineShader)
  },
  电力:(position,index)=>{
        // 添加光墙
    const lightWall = new LightWall(1,2,position)
    lightWall.eventListIndex = index
    scene.add(lightWall.mesh)
    eventLishMesh.push(lightWall)
  }
}


watch(props.eventList,
(val)=>{
      eventLishMesh.forEach((item)=>{
      item.remove()
    })
        props.eventList.forEach((item,index)=>{
      if(mapFn[item.name]) {
        mapFn[item.name](item.position,index)
      }
    })

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