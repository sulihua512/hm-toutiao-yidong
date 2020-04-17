<template>
  <div class='container'>
    {{channels}}
  </div>
</template>

<script>
// import { getArticles } from '@/api/article.js'
export default {
  name: 'ArticleList',
  props: {
    channels: {
      type: Array,
      required: true
    }
  },
  data () {
    return {}
  },
  created () {
    this.getArticles()
  },
  methods: {
    async getArticles () {
      // const result = await getArticles({
      //   channel_id: this.channels.id,
      //   timestamp: Date.now(),
      //   with_top: 1
      // })
      // console.log(result)
    }
  }
}
</script>

<style scoped lang='less'></style>
