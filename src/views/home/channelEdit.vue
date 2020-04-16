<template>
  <div class="channel-edit">
    <div class="channel">
      <van-cell title="我的频道" :border="false">
          <van-button  size="mini" type="info" @click="editing=!editing">{{editing?'保存':'编辑'}}</van-button>
      </van-cell>
      <van-grid>
        <van-grid-item v-for="(item,idx) in channels" :key="item.id" @click="hClickMyChannel(item)" :class="{'cur':idx===activeIndex}">
          <span>{{item.name}}</span>
          <van-icon v-if="editing" name="cross" class="btn"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>

    <div class="channel">
      <van-cell title="可选频道" :border="false"></van-cell>
      <van-grid>
        <van-grid-item v-for="item in recommChannels" :key="item.id" @click="hAddChannel(item)">
          <span>{{item.name}}</span>
          <van-icon name="plus" />
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels, addChannel } from '@/api/channel.js'
export default {
  name: 'ChannelEdit',
  props: {
    channels: {
      type: Array,
      required: true
    },
    activeIndex: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      editing: true,
      allChannels: []
    }
  },
  created () {
    this.getAllChannels()
  },
  computed: {
    //   表示当前可选的频道
    recommChannels () {
    //   this.allChannels - this.channels
      return this.allChannels.filter((channel) => {
        const idx = this.channels.findIndex(item => item.id === channel.id)
        return idx === -1
      })
    }
  },
  methods: {
    // 添加频道
    async hAddChannel (item) {
      const allChannelNow = [...this.channels, item]
      // 修改频道格式
      const channels = allChannelNow.map((it, idx) => {
        return {
          id: it.id,
          seq: idx
        }
      })
      channels.splice(0, 1) // 删除第一个元素（推荐频道）
      const result = await addChannel(channels)
      console.log(result)
      this.channels.push(item)
    },
    //   点击频道按钮，跳转到相应的频道页面
    hClickMyChannel (channel) {
      this.$emit('updateCurChannel', channel)
      this.$emit('close')
    },
    // 获取所有频道
    async getAllChannels () {
      const result = await getAllChannels()
      //   console.log('所有频道', result)
      this.allChannels = result.data.data.channels
    }
  }
}
</script>

<style lang='less' scoped>
.channel{
  padding:15px;
  font-size:14px;
}
  .btn {
    position: absolute;
    top: 0;
    right: 0;
    font-size: 24px;
}
.cur {
    color:red;
    font-weight: 700;
}
</style>
