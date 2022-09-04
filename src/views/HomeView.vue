<template>
  <div class="home">
    <Scene :eventList="eventList" :dataInfo="dataInfo" />
  </div>
</template>

<script setup>
// @ is an alias to /src
import Scene from '@/components/Scene.vue'
import {onMounted, reactive, ref, watch } from 'vue'
import gsap from 'gsap'

const dataInfo = reactive({
  event:{
    name:'未处理事件',
    number:0,
    unit:'起'
  },
  iot:{
    name:'iot设备',
    number:0,
    unit:'台'
  },
  power:{
    name:"城市电力耗能",
    number:0,
    unit:"KW"
  },
  test:{
    name:'今日核酸采集量',
    number:0,
    unit:'人'
  }
})
const eventList = reactive([
]
)
const fullData = {
   event:{
    number:888,
  },
  iot:{
    number:4205,
  },
  power:{
    number:77,
  },
  test:{
    number:1999,
  }
}
const eventListA = [
  {
    name:'火警',
    type:'存在隐患，需排除隐患',
    position:{
      x:-8.3,z:-6.7
    },
    time:'10:16:33'
  },
  {
    name:'电力',
    type:'存在隐患，需排除隐患',
    position:{
      x:1.8,z:2.9
    },
    time:'02:16:12'
  },
  {
    name:'治安',
    type:'存在隐患，需排除隐患',
    position:{
      x:7.3,z:-7.2
    },
    time:'21:16:30'
  }
]
const eventListB = [
  {
    name:'火警',
    type:'存在隐患，需排除隐患',
    position:{
      x:-6.7,z:5.7
    },
    time:'10:16:33'
  },
  {
    name:'治安',
    type:'存在隐患，需排除隐患',
    position:{
      x:3.3,z:-3.7
    },
    time:'20:06:38'
  },
  {
    name:'电力',
    type:'存在隐患，需排除隐患',
    position:{
      x:7.8,z:-4.9
    },
    time:'02:16:12'
  },
  {
    name:'治安',
    type:'存在隐患，需排除隐患',
    position:{
      x:6.5,z:2.2
    },
    time:'21:16:30'
  },
  {
    name:'电力',
    type:'存在隐患，需排除隐患',
    position:{
      x:-4.8,z:-3.5
    },
    time:'05:22:21'
  },
]
for(let key in dataInfo) {

  gsap.to(dataInfo[key],{
    number:fullData[key].number,
    duration:4
  })
}
onMounted(()=>{
  eventListB.forEach((ev)=>{
    eventList.push(ev)
  })
})
let switchA = true
let timer = null
const eventLoop = ()=>{
  timer = setTimeout(()=>{
    eventList.splice(0,eventList.length)
    if(switchA) {
      eventListA.forEach((ev)=>{
        eventList.push(ev)
      })
      switchA = false
    } else {
      eventListB.forEach((ev)=>{
        eventList.push(ev)
      })
      switchA = true
    }
    clearTimeout(timer)
    timer = null
    eventLoop()
  },10000)
}
onMounted(()=>{
  eventLoop()
})
</script>
