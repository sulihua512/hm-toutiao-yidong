import Vue from 'vue'
import Vuex from 'vuex'

import { setItem, getItem, removeItem } from '@/utils/storage'

Vue.use(Vuex)
export default new Vuex.Store({
  state: {
    // 保存公共数据
    // vuex的初始值从localStorage中去取
    user: getItem('user'),
    // 用户的头像信息
    photo: getItem('photo')
  },
  mutations: {
    updatePhoto (state, photo) {
      state.photo = photo
      setItem('photo', photo)
    },
    // 更新用户的token
    updateToken (state, newToken) {
      state.user.token = newToken
    },
    // 补充一个mutation来设置 user
    // vuex中的要求： 只有通过mutation才能去修改state
    setUser (state, obj) {
      state.user = obj

      // 把这个信息做持久化
      setItem('user', obj)
    },
    delUser (state) {
      state.user = null
      removeItem('user')
    }
  },
  actions: {
  },
  modules: {
  }
})
