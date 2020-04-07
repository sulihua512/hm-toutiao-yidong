<template>
  <div class="container">
    布局组件
    <router-view></router-view>
    <van-tabbar
  active-color="#07c160"
  inactive-color="#000"
>
  <van-tabbar-item icon="home-o">标签</van-tabbar-item>
  <van-tabbar-item icon="search">标签</van-tabbar-item>
  <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
  <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
</van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  }
}
</script>

<style scoped lang='less'></style>
