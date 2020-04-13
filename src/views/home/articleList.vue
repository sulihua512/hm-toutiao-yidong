<template>
  <div class='articleList'>
      <!-- van-list自带下拉加载 -->
      <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
        <van-cell v-for="(item,index) in list" :key="index" :title="item.title" />
      </van-list>
  </div>
</template>

<script>
import { getArticles } from '@/api/article.js'
export default {
  name: 'articlelist',
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      list: [], // 文章列表数据
      loading: false,
      finished: false,
      timestamp: null
    }
  },
  methods: {
    // onLoad执行时机
    // 1.不足一屏
    // 2.上拉
    async onLoad () {
      // 异步更新数据
      console.log('加载新数据。。。。')
      const result = await getArticles({
        channel_id: this.channel.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 1
      })
      //   console.log(result.data.data.results)
      const arr = result.data.data.results
      this.list.push(...arr)

      this.timestamp = result.data.data.pre_timestamp

      // 加载状态结束
      this.loading = false

      // 数据全部加载完成
      if (arr.length === 0) {
        this.finished = true
      }
    }
  }
}
</script>

<style scoped lang='less'></style>
