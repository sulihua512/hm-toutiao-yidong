<template>
  <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料"></van-nav-bar>
    <van-cell-group>
        <input type="file" hidden @change="hFileChange" ref="file">
      <van-cell is-link title="头像" center @click="hShowImage">
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" :value="user.name" @click="hShowName" />
      <van-cell is-link title="性别" :value="user.gender === 1?'男':'女'" @click="hShowGender"/>
      <van-cell is-link title="生日" :value="user.birthday" @click="hShowDate"/>
    </van-cell-group>

    <!-- 编辑区域 -->
    <van-popup v-model="isShowName" position="bottom">
      <van-nav-bar
        title="修改名称"
        left-text="取消"
        right-text="保存"
        @click-left="isShowName=false"
        @click-right="hNameConfirm"
      ></van-nav-bar>
      <van-field type="text" focus :value="user.name" placeholder="请输入名字" />
    </van-popup>

    <van-popup v-model="isShowGender" position="bottom">
      <van-nav-bar title="修改性别" left-text="取消"  @click-left="isShowGender=false"></van-nav-bar>

      <van-cell is-link title="男" @click="hChangeGender(0)" />
      <van-cell is-link title="女" @click="hChangeGender(1)" />
    </van-popup>

    <van-popup v-model="isShowBirthday" position="bottom">
      <van-nav-bar
        title="修改生日"
      >
      </van-nav-bar>
      <van-datetime-picker
        v-model="newDate"
        @cancel = "isShowBirthday=false"
        @confirm="hChangeBirthday"
        type="date"
        :min-date="minDate"
        :max-date="maxDate"
      />
</van-popup>
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserInfo, updateUserInfo, updatePhoto } from '@/api/user'
export default {
  name: 'useProfile',
  created () {
    this.getInfo()
  },
  data () {
    return {
    // 当前用户的信息
      user: {},
      isShowName: false,
      //    新名字
      newName: '',
      isShowGender: false,
      //   新的性别
      newGender: '',
      //   新的生日
      isShowBirthday: false,
      newDate: '',
      minDate: new Date(2020, 0, 1),
      maxDate: new Date(2025, 10, 1)
    }
  },
  methods: {
    //   获取用户信息
    async getInfo () {
      const rs = await getUserInfo()
      //   console.log('编辑界面获取的用户信息', rs)
      this.user = rs.data.data
    },
    hShowName () {
      this.newName = this.user.name
      this.isShowName = true
    },
    async hNameConfirm () {
      if (!this.newName) {
        return
      }
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '保存中...' // 提示消息
      })
      try {
        await updateUserInfo({ name: this.newName })
        this.isShowName = false
        this.user.name = this.newName

        this.$toast.success('保存成功！')
      } catch (err) {
        // console.dir(err)
        this.$toast.fail('保存失败！')
      }
    },
    hShowGender () {
    //   this.newGender = this.user.gender === 1 ? '男' : '女'
    //   console.log(this.newGender)
      this.isShowGender = true
    },
    async hChangeGender (gender) {
      this.$toast.loading({
        duration: 0, // 持续时间，0表示持续展示不停止
        forbidClick: true, // 是否禁止背景点击
        message: '保存中...' // 提示消息
      })
      try {
        await updateUserInfo({ gender: gender })
        this.isShowGender = false
        this.user.gender = this.newGender

        this.$toast.success('保存成功！')
      } catch (err) {
        // console.dir(err)
        this.$toast.fail('保存失败！')
      }
    },
    hShowDate () {
      this.isShowBirthday = true
      this.newDate = this.user.birthday
    //   console.log('出生日期', this.newDate)
    },
    async hChangeBirthday () {
    //   console.log(this.newDate)
    // 格式化时间
      const birthday = dayjs(this.newDate).format('YYYY-MM-DD')
      //   console.log(birthday)
      await updateUserInfo({ birthday: birthday })
      this.user.birthday = birthday
      this.isShowBirthday = false
    },
    // 上传头像
    hShowImage () {
      this.$refs.file.click()
    },
    async hFileChange () {
      // 1. 找到用户选中的头像文件
      //   console.dir(this.$refs.file.files[0])
      const file = this.$refs.file.files[0]
      //   用户选中了图片才往下走
      if (!file) {
        return
      }
      const fd = new FormData()
      fd.append('photo', file)
      // 2 调用接口
      const result = await updatePhoto(fd)
      // 3 如果成功，则更新本地数据
      this.user.photo = result.data.data.photo
    }

  }
}
</script>
