<template>
  <div class='index'>
    <van-tabs v-model="active">
    <van-tab v-for="item in channels" :key="item.id" :title="item.name">
      <ArticleList :channels="channels"></ArticleList>
    </van-tab>
  </van-tabs>

  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './articleList.vue'

export default {
  name: 'QuestionIndex',
  components: {
    ArticleList
  },
  data () {
    return {
      active: 0,
      channels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    async getChannels () {
      const result = await getChannels()
      console.log('视频界面获取的频道', result)
      this.channels = result.data.data.channels
    }

  }
}
</script>

<style scoped lang='less'></style>
