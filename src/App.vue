<template>
  <div id="app">
    <!-- 显示内容区域 -->
    <div id="content">
      <keep-alive>
        <router-view ref="aaa"></router-view>
      </keep-alive>
    </div>

    <!-- 分为两个模块：天气、历史今天 -->
    <div id="nav">
      <router-link to="/weather">天&nbsp;气</router-link>
      <router-link to="/history">历&nbsp;史</router-link>
      <router-link to="/express">快&nbsp;递</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'App',
  mounted () {
    // console.log(this.$refs)
  }
}
</script>

<style lang="styl">
#app
  height 41.6875rem
  #content
    height 100%
    /*overflow hidden*/
  #nav
    display flex
    position fixed
    flex-grow 0
    align-items center
    justify-content space-around
    bottom 0
    height 3rem
    width 100%
    background #1b536d
    a
      display block
      text-align center
      line-height 50px
      width 100%
      height 100%
      color #fff
      font-weight bold
      font-size 1.2rem
      &.router-link-active
        /*color #2a5caa*/
        background #009ad6
</style>
