<template>
  <div id="loading">
    <img :src="require('@/assets/img/loading.gif')" alt="">
  </div>
</template>
<script>
export default {
}
</script>
<style scoped lang="styl">
#loading
  display flex
  align-items center
  height 42rem
  background #fff
  img
    margin 0 auto
</style>
