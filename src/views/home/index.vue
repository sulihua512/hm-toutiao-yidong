<template>
  <div class="home-container">
    <van-tabs>
      <van-tab v-for="item in channels" :key="item.id" :title="item.name">
          {{item.name}}
      </van-tab>
    </van-tabs>
  </div>
</template>

<script>
import { getChannels } from '@/api/channel.js'
export default {
  name: 'HomeIndex',
  data () {
    return {
      active: 2,
      channels: []
    }
  },
  created () {
    this.getChannels2()
  },
  methods: {
    async getChannels2 () {
      const result = await getChannels()
      // console.log(result)
      this.channels = result.data.data.channels
    }
  }
}
</script>

<style lang='less' scoped>
</style>
