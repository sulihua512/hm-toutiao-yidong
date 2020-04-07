<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>
<script>
import request from './utils/request'
export default {
  created () {
    // 测试request能不能发请求
    request.get('/app/v1_0/user/channels').then(res => {
      console.log(res)
    })
  }
}
</script>
<style lang="less">
</style>
