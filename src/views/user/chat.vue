<template>
  <div class="container">
    <van-nav-bar fixed left-arrow @click-left="$router.back()" title="小智同学"></van-nav-bar>
    <div class="chat-list">

      <div class="chat-item"
        v-for="(item,idx) in list"
        :key="idx"
        :class="item.name==='xz'?'left':'right'">
          <van-image v-if="item.name === 'xz'"  fit="cover"
            round
            src="https://img.yzcdn.cn/vant/cat.jpeg" />

          <div class="chat-pao">{{item.msg}}</div>

          <van-image v-if="item.name === 'me'"  fit="cover"
            round
            :src="$store.state.photo" />
      </div>
      <!-- 左侧是机器人小智
      <div class="chat-item left">
        <van-image fit="cover" round src="https://img.yzcdn.cn/vant/cat.jpeg" />
        <div class="chat-pao">hi，你好！</div>
      </div>
      -->
      <!-- 右侧是当前用户
      <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round :src="$store.state.photo" />
      </div>
      -->
    </div>
    <div class="reply-container van-hairline--top">
      <van-field v-model.trim="word" placeholder="说点什么...">
        <span  @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import io from 'socket.io-client'

export default {
  name: 'UserChat',
  data () {
    return {
      // 设计聊天记录
      list: [
        // { name: 'xz', msg: '今天天不好，我是小智', timestamp: Date.now() },
        // { name: 'me', msg: '我是编程小王子，我这里好的很！', timestamp: Date.now() },
        // { name: 'xz', msg: '你以会在网上抄代码，就是程序员了吗？', timestamp: Date.now() }
      ], // 聊天记录
      word: '' // 你说话的内容

    }
  },
  created () {
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.$store.state.user.token
      }
    })
    // on是监听事件，connect是固定名称
    this.socket.on('connect', () => {
      console.log('与websocket服务器连接成功')
      this.list.push({ name: 'xz', msg: '我是小智，你有什么可以告诉我的？', timestamp: Date.now() })
    })
    // 在此时监听回复消息
    this.socket.on('message', data => {
      //  data就是 客户服务器回复的消息 认为接收的消息都是 小智同学回复的
      this.list.push({ ...data, name: 'xz' }) // 加到列表中
    })
  },
  methods: {
    send () {
      if (!this.word) {
        return
      }
      const obj = {
        msg: this.word,
        timestamp: Date.now()
      }
      //   1. 向服务器发消息
      this.socket.emit('message', obj)
      //   2. 把消息添加到list中
      this.list.push({
        name: 'me',
        msg: obj.msg,
        timestamp: obj.timestamp
      })
      this.word = ''
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
}
</style>
