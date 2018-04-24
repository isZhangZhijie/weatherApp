<template>
  <div class="express">
    <!-- 定义头部 -->
    <!--<div id="header">-->
      <!--&lt;!&ndash; @符号指向了src目录 &ndash;&gt;-->
      <!--&lt;!&ndash;<img src="@/assets/logo.png" alt="">&ndash;&gt;-->
      <!--<div id="title">快递查询</div>-->
      <!--&lt;!&ndash;<div class="sleDate">&ndash;&gt;-->
        <!--&lt;!&ndash;<i class="iconfont icon-calendar"></i>&ndash;&gt;-->
      <!--&lt;!&ndash;</div>&ndash;&gt;-->
    <!--</div>-->

    <div class="main">
      <div class="search">
        <div class="input">
          <input type="text" v-model.trim="num" placeholder="快递单号" autofocus>
        </div>
        <div class="button" @click="search">
          查询
          <i class="iconfont icon-search"></i>
        </div>
      </div>
      <div class="show">
        <!--<div v-if="!resultList.length">请输入快递单号</div>-->
        <ul v-if="resultList.length">
          <li v-for="(item, index) in resultList" :key="index">
            <div class="time">{{ item.time }}</div>
            <div class="remark">{{ item.context }}</div>
          </li>
        </ul>
        <div v-else>
          <p>{{ info }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsonp from 'jsonp'
export default {
  name: 'express',
  data () {
    return {
      num: undefined,
      data: {},
      resultList: [],
      info: '请输入快递单号'
    }
  },
  components: {},
  created () {},
  mounted () {},
  methods: {
    getExpress (params) {
      // 设置参数
      let newParams = Object.assign({
        // 默认参数
        id: 'XDB2gzsjbsss11owa40aNo0I_714816371',
        com: 'auto'
      }, params)

      // 目标结构 ?channel=singer&page=list&key=all_all_all
      // 将对象拼接成url参数
      let paramStr = '?'
      for (let i in newParams) {
        paramStr += i + '=' + newParams[i] + '&'
      }
      paramStr = paramStr.slice(0, paramStr.length - 1)

      // 请求数据的url地址
      let url = 'http://q.kdpt.net/api' + paramStr
      console.log(url)

      // 将普通函数改写为peomise
      return new Promise(function (resolve, reject) {
        // resolve 表示成功
        // reject 表示失败
        // 发送请求
        jsonp(url, {}, (err, data) => {
          // err 如果成功了，err值null
          if (!err) {
            resolve(data)
          } else {
            console.log('jsonp请求失败了')
          }
        })
      })
    },
    // 查找快递单号
    search () {
      if (this.num) {
        this.resultList = []
        let params = {
          'nu': this.num
        }
        this.getExpress(params).then((data) => {
          if (data.status === '1') {
            this.resultList = data.data
          } else {
            this.info = '请输入正确的快递单号'
          }
        })
      }
    }
  }
}
</script>

<style lang="styl" scoped>
  @import "../assets/css/express.styl";
</style>
