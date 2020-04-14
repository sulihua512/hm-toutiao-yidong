<template>
  <div class="index">
    <van-tabs v-model="activeIndex">
      <van-tab v-for="(item,index) in channels" :title="item.name" :key="index">
        <!-- 要把当前的频道的信息给给子组件ArticleList -->
        <ArticleList
        :channel="item"
        @showMoreAction="hMoreAction"
        ></ArticleList>
      </van-tab>
    </van-tabs>

    <!-- 文章更多操作：反馈，举报..... -->
    <van-popup :style="{width:'80%'}" v-model="showMoreAction">
        <!-- 监听不喜欢事件 -->
      <more-action ref="refMoreAction"
        @dislike="hDislike" @report="hReport"></more-action>
    </van-popup>
  </div>
</template>

<script>
// 导入接口
import { getChannels } from '@/api/channel.js'
import { dislikeArticle, reportArticle } from '@/api/article.js'
// 引入更多操作 组件
import MoreAction from './moreAction.vue'

// 引入文章列表组件
import ArticleList from './articleList.vue'
export default {
  name: 'HomeIndex',
  data () {
    return {
      // 申明数据
      channels: [],
      showMoreAction: false, // 控制显示弹层
      articleId: null, // 当前要操作的文章编号,
      activeIndex: 0
    }
  },
  components: {
    ArticleList,
    MoreAction
  },
  created () {
    this.getChannels123()
  },
  methods: {
    delArticle () {
      this.$eventBus.$emit('delArticle', {
        articleId: this.articleId,
        channelId: this.channels[this.activeIndex].id
      })
    },
    // 举报文章
    async hReport (typeId) {
      // console.log(typeId)
      // 1. 调用接口
      const result = await reportArticle(this.articleId, typeId)
      console.log('举报', result)
      // 2. 关闭弹层
      this.showMoreAction = false
      // 3. 删除文章
      this.$toast.success('操作成功')
      this.delArticle()
    },
    async hDislike () {
      // 收到moreAction中的点击动作， 不喜欢文章
      // 1. 调用接口
      const result = await dislikeArticle(this.articleId)
      console.log('不感兴趣', result)
      // 2. 退出弹层
      this.showMoreAction = false

      // happy
      this.$toast.success('操作成功')

      // 3. 去articleList中删除对应的文章
      // 发布删除事件
      this.delArticle()
    },
    hMoreAction (articleId) {
      // 处理子组件articleList中的点击 X 事件
      // 1. 显示弹窗
      // console.log('从子组件articleList中传递要删除的文章编号是', articleId)
      this.showMoreAction = true
      if (this.$refs.refMoreAction) {
        this.$refs.refMoreAction.isReport = false
      }
      // 2.保存当前要操作的文章编号，备用
      this.articleId = articleId
    },
    async getChannels123 () {
      const result = await getChannels()
      console.log(result)
      // 把接口返回的数据保存在channels数据项中
      this.channels = result.data.data.channels
    }
  }
}
</script>
<style lang='less' scoped>
// 作业：画出组件之间的关系图。
</style>
