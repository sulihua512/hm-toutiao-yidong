<template>
  <div class="container">
    <!-- 头部 -->
    <van-nav-bar title="黑马头条" right-text="搜索"
  @click-right="hSearch" fixed/>
    <!-- <van-search placeholder="请输入搜索关键词" /> -->

    <router-view></router-view>

    <!-- 尾部 -->
    <van-tabbar active-color="#fff" inactive-color="#000" route class="tabbar">
    <van-tabbar-item icon="home-o" to="/">主页</van-tabbar-item>
    <van-tabbar-item icon="search" to="/question" >问答</van-tabbar-item>
    <van-tabbar-item icon="video-o" to="/video">视频</van-tabbar-item>
    <van-tabbar-item icon="user-o" to="/user">我的</van-tabbar-item>
  </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'layout',
  data () {
    return {
    }
  },
  methods: {
    hSearch () {}
  }
}
</script>

<style scoped lang='less'>
.tabbar {
  background-color: #3196fa;
}
</style>
