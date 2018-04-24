<template>
  <div class="route">
    <span class="text">中国</span>
    <span class="arrow">></span>
    <!-- 选择城市 -->
    <div class="select-cont">
      <div class="text select-item">
        <div class="select-head">
          <span class="select-head-cont"></span>
          <span class="select-icon">▼</span>
        </div>
        <ul class="option">
          <li class="option-item" value="0">请选择</li>
          <li class="option-item" v-for="item in cityList" :value="item.pro_en" :key="item.cityList[0].code">{{ item.pro_zh }}</li>
        </ul>
      </div>
      <span class="arrow">></span>
      <div class="text select-item">
        <div class="select-head">
          <span class="select-head-cont"></span>
          <span class="select-icon">▼</span>
        </div>
        <ul class="option">
          <li class="option-item" value="0">请选择</li>
          <li class="option-item" v-for="item in oneProCityList" :value="item.city_zh" :key="item.code">{{ item.city_zh }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import cityList from '@/assets/city-list.json'
import $ from 'jquery'
// console.log($)

export default {
  data () {
    return {
      cityList: cityList,
      selPro: 'guangdong',
      selCity: 'guangzhou',
      oneProCityList: [],
      selectItemNum: undefined
    }
  },
  mounted () {
    // 默认是广州
    $('.select-head-cont:eq(0)').text('广东')
    $('.select-head-cont:eq(1)').text('广州')
    this.selDefault()

    // 展示下拉框
    this.showOption()
    // 点击其他地方时，select会收起来
    this.closeOption()
  },
  methods: {
    // 默认选择广州
    selDefault () {
      this.cityList.forEach((v) => {
        if (this.selPro === v.pro_en) {
          // console.log(val)
          this.oneProCityList = v.cityList
        }
      })
    },
    getPro (val) {
      // this.selPro = this.$refs.pro.value
      // console.log(this.selPro, typeof this.selPro)
      this.selPro = val
      if (val === '0') {
        this.oneProCityList = []
      } else {
        this.cityList.forEach((v) => {
          // console.log(this)
          if (val === v.pro_en) {
            // console.log(val)
            this.oneProCityList = v.cityList
          }
        })
        // console.log(this.oneProCityList)
      }
    },
    getCity (val) {
      this.selCity = val
      // console.log(val)
      if (val !== '0') {
        this.$emit('cityFromSel', this.selCity)
      }
    },

    // 点击后出现下拉框
    showOption () {
      // console.log(111)
      let that = this
      $('.select-item').click(function (e) {
        $('.option').css('display', 'none')
        // console.log($('.select-item'))
        // console.log($(this))
        // console.log($(this).index())
        // 显示下拉列表
        $(this).find('.option').css('display', 'block')
        e.stopPropagation()
        this.selectItemNum = $(this).index('.select-item')
        console.log(this.selectItemNum)
        that.selectOption($(this), $(this).index())
      })
    },
    // 关闭下拉框
    closeOption () {
      $('body').click(function () {
        $('.option').css('display', 'none')
      })
    },
    // 选择下拉选项
    selectOption (obj, num) {
      // console.log(obj)
      // console.log(111)
      let that = this

      // 使用原生js对option-item进行绑定，防止重复绑定
      // 将jQuery对象转为DOM对象
      let optionItems = obj.find('.option-item').get()
      // console.log(optionItems)
      for (let i = 0; i < optionItems.length; i++) {
        optionItems[i].onclick = function (e) {
          console.log($(this).attr('value'))
          $(this).parents('.select-item').find('.select-head-cont').text($(this).text())
          if (num === 0) {
            that.getPro($(this).attr('value'))
            $('.select-head-cont:gt(0)').text($('.option-item:eq(0)').text())
          } else {
            that.getCity($(this).attr('value'))
          }
          // 选择后隐藏
          $(this).parent().css('display', 'none')
          e.stopPropagation()
        }
      }
      /*
      // 使用jQuery对option-item进行绑定，出现重复绑定现象
      obj.find('.option-item').click(function (e) {
        console.log($(this))
        // 每点击一次，打印次数都会累加1，为什么?
        console.log($(this).attr('value'))
        // console.log(num)
        obj.find('.select-head-cont').text($(this).text())
        if (num === 0) {
          that.getPro($(this).attr('value'))
          $('.select-head-cont:gt(0)').text($('.option-item:eq(0)').text())
        } else {
          that.getCity($(this).attr('value'))
        }
        // 选择后隐藏
        $(this).parent().css('display', 'none')
        e.stopPropagation()
      })
      */
    }
  }
}
</script>

<style scoped lang="styl">
@import "../assets/css/selCity.styl";
</style>
