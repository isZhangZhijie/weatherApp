<template>
  <div class="weather">
    <Loading v-if="!dailyList.length"></Loading>
    <div class="container" v-else>
      <!-- 定义头部 -->
      <!--<div id="header">-->
        <!--&lt;!&ndash; @符号指向了src目录 &ndash;&gt;-->
        <!--&lt;!&ndash;<img src="@/assets/logo.png" alt="">&ndash;&gt;-->
        <!--<div id="title">张志杰&#45;&#45;天气应用</div>-->
      <!--</div>-->
      <selCity @cityFromSel="changeCity"></selCity>
      <div class="show">
        <div class="detail">
          <div class="date">
          <span>
            {{ d.getMonth() + 1 }}月{{ d.getDate() }}日，{{ week[d.getDay()] }} {{ d.getHours() &lt; 10 ? '0' + d.getHours() : d.getHours() }}:{{ d.getMinutes() &lt; 10 ? '0' +  d.getMinutes() : d.getMinutes() }}
          </span>
          </div>
          <div class="tmp-cloud">
            <div class="tmp">
              <span>
                {{ nowData.tmp }}
                <i></i>
              </span>
            </div>
            <!--<div class="cloud">-->
            <span class="cond_txt">{{ nowData.cond_txt }}</span>
            <div class="img">
              <img :src="require('@/assets/img/weather-icon/' + nowData.cond_code + '.png')" alt="">
            </div>
            <!--</div>-->
          </div>
          <div class="updateTime">
            <span>今天{{ updateTime }}更新</span>
          </div>
          <div class="about">
            <div class="humidity">
              <img src="../assets/img/weather-icon/humidity.png" alt="">
              <span>湿度{{ nowData.hum }}</span>
            </div>
            <div class="wind-dir">
              <img src="../assets/img/weather-icon/wind-dir.png" alt="">
              <span>{{ nowData.wind_dir }} {{ nowData.wind_sc }} 级</span>
            </div>
          </div>
        </div>
        <div class="hourly">
          <h3>逐时预报</h3>
          <div class="chart-con">
            <div id="myChart24" :style="{width: '25rem', height: '18.75rem', marginLeft: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center'}"></div>
            <ul class="hourly-detail">
              <li v-for="item in hourly" :key="item.id">
                <div class="humidity">
                  <img src="../assets/img/weather-icon/humidity.png" alt="">
                  <span>{{ item.hum }}%</span>
                </div>
                <div class="cloud">
                  <!--<img :src="require(item.imgUrl)" alt="">-->
                  <img :src="require('@/assets/img/weather-icon/' + item.cond_code + '.png')" alt="">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="hourly daily">
          <h3>每日预报</h3>
          <div class="chart-con">
            <div id="myChartDaily" :style="{width: '25rem', height: '18.75rem', marginLeft: '50%', transform: 'translateX(-50%)', display: 'flex', justifyContent: 'center'}"></div>
            <ul class="hourly-detail">
              <li v-for="item in daily" :key="item.id">
                <div class="humidity">
                  <img src="../assets/img/weather-icon/humidity.png" alt="">
                  <span>{{ item.hum }}%</span>
                </div>
                <div class="cloud">
                  <img :src="require('@/assets/img/weather-icon/' + item.cond_code_d + '.png')" alt="">
                </div>
              </li>
              <!-- 捏造后四天数据 -->
              <li>
                <div class="humidity">
                  <img src="../assets/img/weather-icon/humidity.png" alt="">
                  <span>66%</span>
                </div>
                <div class="cloud">
                  <img src="../assets/img/weather-icon/103.png" alt="">
                </div>
              </li>
              <li>
                <div class="humidity">
                  <img src="../assets/img/weather-icon/humidity.png" alt="">
                  <span>66%</span>
                </div>
                <div class="cloud">
                  <img src="../assets/img/weather-icon/103.png" alt="">
                </div>
              </li>
              <li>
                <div class="humidity">
                  <img src="../assets/img/weather-icon/humidity.png" alt="">
                  <span>66%</span>
                </div>
                <div class="cloud">
                  <img src="../assets/img/weather-icon/103.png" alt="">
                </div>
              </li>
            </ul>
          </div>
        </div>
        <div class="lifestyle">
          <h3>生活指数</h3>
          <ul>
            <li v-for="item in lifestyle" :key="item.type">
              <div class="type">
                {{ lifestyleType[item.type] }} : {{ item.brf }}
              </div>
              <div class="style-detail">
                {{ item.txt }}
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

// import echarts from 'echarts'

import selCity from './selCity'

import Loading from './Loading'

export default {
  name: 'weather',
  data () {
    return {
      city: 'guangzhou',
      msg: 'Welcome to Your Vue.js App',
      // 当前时间戳
      d: new Date(),
      week: ['周日', '周一', '周二', '周三', '周四', '周五', '周六'],
      // 存储所有天气数据
      weather: {},
      // 存储实时天气数据
      nowData: {},
      // 更新时间
      updateTime: undefined,

      // 逐小时预报数据
      hourly: {},
      // 小时数
      hourlyList: [],
      // 逐小时温度
      hourlyTmp: [],
      // 逐小时天气图
      hourlyCloud: [],
      // 生活指数
      lifestyle: [],
      // 生活指数对照
      lifestyleType: {
        comf: '舒适度指数',
        cw: '洗车指数',
        drsg: '穿衣指数',
        flu: '感冒指数',
        sport: '运动指数',
        trav: '旅游指数',
        uv: '紫外线指数',
        air: '空气污染扩散条件指数'
      },

      // 今明后三天预报
      daily: [],
      dailyMaxTmp: [],
      dailyMinTmp: [],
      // 日期数组
      dailyList: [],

      cities: [
        {}
      ],
      option: {},
      myChart1: {},
      myChart2: {}
    }
  },
  components: {
    selCity,
    Loading
  },
  created () {
    // setTimeout(() => {
    this.getWeather()
    // }, 500)
  },
  methods: {
    changeCity (selCity) {
      // console.log('字组件传来的城市参数', selCity)
      this.city = selCity
      this.getWeather()
    },
    getWeather () {
      axios.get('\thttps://free-api.heweather.com/s6/weather', {
        params: {
          location: this.city,
          key: '88a186ee4946405184a7fc2d5f2e56ba'
        }
      }).then((data) => {
        // 初始化图标参数
        this.hourlyList = []
        this.hourlyTmp = []
        this.dailyMaxTmp = []
        this.dailyMinTmp = []
        this.dailyList = []

        let that = this
        this.weather = data.data.HeWeather6[0]
        // console.log(this.weather)
        this.nowData = this.weather.now
        this.updateTime = this.weather.update.loc.split(' ')[1]
        this.lifestyle = this.weather.lifestyle

        // hourly 逐小时预报数据
        this.hourly = this.weather.hourly.slice(0, 6)
        this.hourly.forEach(function (val, key) {
          val.id = key
          that.hourlyList.push(val.time.split(' ')[1])
          that.hourlyTmp.push(val.tmp)
        })
        // console.log(that.hourlyTmp)

        // 今明后三天预报数据
        this.daily = this.weather.daily_forecast
        this.daily.forEach(function (val, key) {
          val.id = key
          that.dailyMaxTmp.push(val.tmp_max)
          that.dailyMinTmp.push(val.tmp_min)
          that.dailyList.push(that.getWeekday(val.date))
        })
        // 免费只能获取三天预报数据，补充后面四天日期
        for (let i = 1; i <= 3; i++) {
          let len = this.dailyList.length
          if (this.dailyList[len - 1] === 6) {
            this.dailyList[len] = 0
          } else {
            this.dailyList[len] = (this.dailyList[len - 1] + 1)
          }
        }
        this.dailyList.forEach(function (val, key) {
          that.dailyList[key] = that.week[val]
        })
        that.dailyList[0] = '今天'

        // console.log(this.hourlyList)
        // console.log(this)
        // created调用时，dom未加载完，无法初始化echarts,因此设置延时
        setTimeout(() => {
          this.drawLine()
        }, 0)
      }).catch((error) => {
        console.error(error)
      })
    },
    // 获取星期数
    getWeekday (day) {
      let d = new Date(day)
      return d.getDay()
    },
    drawLine () {
      // 基于准备好的dom，初始化echarts实例
      this.myChart1 = this.$echarts.init(document.getElementById('myChart24'))
      // let myChart1 = echarts.init(document.getElementById('myChart24'))
      // console.log(echarts)
      // 绘制图表
      this.myChart1.setOption({
        tooltip: {},
        grid: {
          show: false
        },
        textStyle: {
          color: '#fff',
          fontFamile: 'Arial'
        },
        xAxis: {
          show: true,
          type: 'category',
          axisLine: {
            show: false,
            onZero: false
          },
          axisTick: {
            show: true,
            inside: true,
            length: 180,
            lineStyle: {
              width: 0.6,
              color: '#fff',
              opacity: 0.5
            }
          },
          axisLabel: {
            inside: true
            // backgroundColor: '#ff9700'
          },
          data: this.hourlyList
        },
        yAxis: {
          show: false,
          // 是否包括0刻度
          scale: true,
          min: function (value) {
            return value.min - 30
          },
          max: function (value) {
            return value.max + 5
          },
          type: 'value'
        },
        color: ['#fff'],
        series: [{
          data: this.hourlyTmp,
          type: 'line',
          label: {
            show: true,
            formatter: '{c}°'
          }
        }]
      })

      this.myChart2 = this.$echarts.init(document.getElementById('myChartDaily'))
      // let myChart2 = echarts.init(document.getElementById('myChartDaily'))
      // 绘制图表
      this.myChart2.setOption({
        tooltip: {},
        grid: {
          show: false
        },
        textStyle: {
          color: '#fff',
          fontFamile: 'Arial'
        },
        xAxis: {
          show: true,
          type: 'category',
          axisLine: {
            show: false,
            onZero: false
          },
          axisTick: {
            show: true,
            inside: true,
            length: 180,
            lineStyle: {
              width: 0.6,
              color: '#fff',
              opacity: 0.5
            }
          },
          axisLabel: {
            inside: true
            // backgroundColor: '#ff9700'
          },
          data: this.dailyList
        },
        yAxis: {
          show: false,
          // 是否包括0刻度
          scale: true,
          min: function (value) {
            return value.min - 30
          },
          max: function (value) {
            return value.max + 5
          },
          type: 'value'
        },
        color: ['#fff'],
        series: [{
          // 捏造后四天预测数据
          data: this.dailyMaxTmp.concat(this.dailyMaxTmp),
          type: 'line',
          label: {
            show: true,
            formatter: '{c}°'
          }
        },
        {
          data: this.dailyMinTmp.concat(this.dailyMinTmp),
          type: 'line',
          label: {
            show: true,
            formatter: '{c}°'
          }
        }]
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="styl">
@import "../assets/css/weather.styl";
</style>
