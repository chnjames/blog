<template>
   <div @click="getRegeo" v-if="weather.weatherIcon" class="weather"
      :style="`color: rgb(${convartedColor[0]}, ${convartedColor[1]}, ${convartedColor[2]})`">
      <img class="weather-icon" :src="$withBase(weather.weatherIcon)" alt="weather.weather" />
      <div class="weather-layout">
         <div class="weather-city">{{ position.province }}{{ position.city }}{{ position.district }}</div>
         <div class="weather-detail">{{ weather.weather }} / {{ weather.temperature }}℃</div>
      </div>
   </div>
</template>
<script setup lang="ts">
import axios from 'axios'
import { onMounted, reactive, ref, onBeforeUnmount } from 'vue'
import { WEATHER_LIST } from './constant'

let convartedColor = reactive([])
let color = ref('000000')
let location = reactive(null) // 经纬度
let position = reactive({}) // 地理位置
let weather = reactive({})
let timer = reactive(null)

onMounted(() => {
   convartColor()
   getLocation()
   timer = setInterval(() => {
      getLocation()
   }, 30 * 60 * 1000)
})
onBeforeUnmount(() => {
   clearInterval(timer)
})
let getLocation = (): void => {
   if (typeof window ?? window.navigator.geolocation) {
      window.navigator.geolocation.getCurrentPosition(position => {
         location = {
            latitude: position.coords.latitude.toFixed(6),
            longitude: position.coords.longitude.toFixed(6)
         }
         getRegeo()
      }, error => {
         switch (error.code) {
            case 0:
               console.log("获取位置信息出错!将使用IP定位")
               break;
            case 1:
               console.log("您设置了阻止该页面获取位置信息!将使用IP定位")
               break;
            case 2:
               console.log("浏览器无法确定您的位置!将使用IP定位")
               break;
            case 3:
               console.log("获取位置信息超时!将使用IP定位")
               break;
         }
         getRegeo()
      })
   } else {
      console.log("该浏览器不支持 HTML5 的定位功能!将使用IP定位")
      getRegeo()
   }
}
let getRegeo = () => {
   axios.get('https://restapi.amap.com/v3/geocode/regeo', {
      params: {
         key: 'e25e49390dd54fe46f9fd3bc0f4fe2b7',
         location: `${location.longitude},${location.latitude}`
      }
   }).then(res => {
      const addressComponent = res.data.regeocode.addressComponent
      Object.assign(position, addressComponent)
      getWeather(addressComponent.adcode)
   })
}
let getWeather = city => {
   axios.get('https://restapi.amap.com/v3/weather/weatherInfo', {
      params: {
         city,
         key: 'e25e49390dd54fe46f9fd3bc0f4fe2b7',
         extensions: 'base'
      }
   }).then(res => {
      const lives = res.data.lives[0]
      const live = WEATHER_LIST.find(item => item.name === lives.weather)
      lives.weatherIcon = live.url
      Object.assign(weather, lives)
   })
}
let convartColor = () => {
   const colorTemp = /([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})([a-zA-Z0-9]{2})/.exec(color.value)
   const convartedArr = [
      parseInt(`0x${colorTemp[1]}`),
      parseInt(`0x${colorTemp[2]}`),
      parseInt(`0x${colorTemp[3]}`)
   ]
   convartedColor.push(...convartedArr)
}

</script>

<style lang="scss" scoped>
.weather {
   position: absolute;
   left: 10px;
   bottom: 10px;
   z-index: 10;
   display: flex;
   align-items: center;
   cursor: pointer;
   width: fit-content;
   padding: 5px 10px;
   border-radius: 20px;
   box-shadow: 1px 1px 10px rgb(0 0 0 / .3);
   background-color: #fff;
   &-icon {
      width: 30px;
      display: block;
   }

   &-layout {
      display: flex;
      flex-direction: column;
      font-size: 12px;
      margin-left: 5px;
   }
   &-city {
      color: #999999;
      margin-bottom: 2px;
   }
}
</style>