<template>
  <div class='login-container'>
    <van-nav-bar title="登录"/>
    <van-cell-group>
        <van-field  v-model="user.mobile" type="tel" placeholder="请输入手机号" label="手机号" required clearable/>
        <van-field v-model="user.code" type="password" placeholder="请输入密码"   label="密码" required clearable/>
    </van-cell-group>
    <div class="btn-wrap">
      <van-button @click="Login" type="info" class="btn">登录</van-button>
    </div>
  </div>
</template>

<script>
import { login } from '@/api/user.js'
export default {
  name: 'LoginIndex',
  data () {
    return {
      user: {
        mobile: '13911111111',
        code: '246810'
      }
    }
  },
  methods: {
    async Login () {
      // console.log(this.user)
      // 检测数据的有效性
      const result = await login(this.user)
      console.log(result)
    }
  }
}
</script>

<style scoped lang='less'>
.btn-wrap {
  padding: 20px;
  .btn {
    width: 100%;
    background-color: #3196fa;
    border-radius: 10px;
    color: #fff;
  }
}
</style>
