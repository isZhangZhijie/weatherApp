import Vue from 'vue'
// import $ from 'jquery'
import App from './App'
import router from './router'
import '@/assets/css/reset.styl'
import '@/assets/fonts/iconfont.css'

import { setHtmlFontSize } from '@/assets/js/rem.js'
// 引入echarts
import echarts from 'echarts'
// 在原型链中装载echarts
Vue.prototype.$echarts = echarts

// Vue.prototype.$ = $
// console.log($)
Vue.config.productionTip = false

window.onload = function () {
  // 初始化调用
  setHtmlFontSize()
}

// 设置window，监听窗口大小改变的事件
window.onresize = function () {
  setHtmlFontSize()
}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  render: h => h(App)
})
