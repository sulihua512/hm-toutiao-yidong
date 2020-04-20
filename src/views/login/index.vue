<template>
  <div class='login-container'>
    <van-nav-bar title="登录"/>
    <van-cell-group>
        <van-field  v-model.trim="user.mobile" type="tel" placeholder="请输入手机号" label="手机号" required clearable :error-message="errInfo.mobile"/>
        <van-field v-model="user.code" type="password" placeholder="请输入密码"   label="密码" required clearable :error-message="errInfo.code"/>
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
      },
      // 错误信息
      errInfo: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    checkInfo (user) {
      if (user.mobile === '') {
        this.errInfo.mobile = '手机号不能为空'
        return false
      } else {
        this.errInfo.mobile = ''
      }
      if (user.code === '') {
        this.errInfo.code = '密码不能为空'
        return false
      } else {
        this.errInfo.code = ''
      }

      return true
    },
    async Login () {
      // console.log(this.user)
      // 1. 对用户的信息进行验证
      if (!this.checkInfo(this.user)) {
        return
      }
      // 2. loding
      this.$toast.loading({
        message: '登录中......',
        duration: 0, // 会一直存在,如果有下一个this.$toast被调用，它就会被覆盖，也就消失了
        mask: true
      })
      // 3.调用接口
      try {
        const result = await login(this.user)
        // console.log(result)
        this.$toast.success('登录成功')
        // 登录成功后，保存信息到vuex中
        // 不推荐 this.$store.state.user =
        this.$store.commit('setUser', result.data.data)
        // todo: 跳转到首页
        const to = this.$route.query.from || '/'
        this.$router.push(to)
      } catch (err) {
        console.log(err.response)
        const errMsg = err.response.data.message
        if (errMsg) {
          if (errMsg.mobile) {
            this.$toast.fail('手机号错误')
          }
          if (errMsg.code) {
            this.$toast.fail('密码错误')
          }
        } else {
          this.$toast.fail('登录错误')
        }
      }
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
