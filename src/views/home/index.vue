<template>
  <div class="index">
    <van-tabs>
      <!-- ArticleList只有在在当tab签，处于可见状态时，才会去加载。  -->
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
          <ArticleList :channel="item"></ArticleList>
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
import ArticleList from './articleList.vue'

export default {
  components: { ArticleList },
  name: 'HomeIndex',
  data () {
    return {
      active: 2,
      // 频道列表
      channels: []
    }
  },
  created () {
    this.getChannels()
  },
  methods: {
    // 获取频道
    async getChannels () {
      const result = await getChannels()
      // console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>

<style lang='less' scoped>

</style>
