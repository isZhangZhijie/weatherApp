<template>
  <div class="history">
    <!-- 定义头部 -->
    <div id="header">
      <!-- @符号指向了src目录 -->
      <!--<img src="@/assets/logo.png" alt="">-->
      <div id="title">历史上的今天</div>
      <!--<div class="sleDate">-->
        <!--<i class="iconfont icon-calendar"></i>-->
      <!--</div>-->
    </div>

    <div class="show">
      <div class="title">
        <i class="iconfont icon-time"></i>
        <h3>历史上{{ month }}月{{ date }}日都发生了什么</h3>
      </div>

      <!-- 引入事件选择器 -->
      <div class="selDate">
        <datepicker placeholder="请选择日期" language="zh" v-model="getDate" format="MM月dd日" input-class="inpDate" calendar-class="date" @input="selDate" @opened="center"></datepicker>
      </div>
      <ul class="hisList">
        <li class="listItem" v-for="item in oneDayHisList" :key="item.id" ref="li">
          <div class="year">{{ item.year }}</div>
          <div class="detail">
            <a :href="item.link" target="_blank">
              <div class="pic" v-if="item.picUrl">
                <img :src="item.picUrl" alt="">
              </div>
              <div class="text">{{ item.text }}</div>
            </a>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Datepicker from 'vuejs-datepicker'
var history = require('../assets/history.json')

export default {
  name: 'History',
  data () {
    return {
      // 当前时间戳
      d: new Date(),
      month: undefined,
      date: undefined,
      getDate: undefined,

      // 某一天的历史列表
      oneDayHisList: []
    }
  },
  components: {
    Datepicker
  },
  created () {
    this.month = this.d.getMonth() + 1
    this.date = this.d.getDate()
    // console.log(this.month, this.date)
    // this.oneDayHisList = history[this.month - 1].monthList[this.date - 1].hisDayList
    this.renew(this.month, this.date)
  },
  mounted () {
    // console.log(this.$refs.li)
  },
  methods: {
    selDate: function () {
      this.month = this.getDate.getMonth() + 1
      this.date = this.getDate.getDate()
      this.renew(this.month, this.date)
    },
    renew: function (month, date) {
      this.oneDayHisList = history[month - 1].monthList[date - 1].hisDayList
    },
    center: function () {
      let calendar = document.querySelectorAll('.vdp-datepicker__calendar')
      // console.log(calendar)
      for (let i = 0; i < calendar.length; i++) {
        calendar[i].style.left = '50%'
        calendar[i].style.marginLeft = '-150px'
      }
    }
  }
}
</script>

<style lang="styl" scoped>
@import "../assets/css/history.styl";
</style>
