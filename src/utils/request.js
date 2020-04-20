// 对axios进行二次封装
import axios from 'axios'
// 如何在.js模块中去使用vuex中的数据
import store from '@/store/index.js'
import JSONBig from 'json-bigint'
import router from '@/router/index.js'

const request = axios.create({
  // 基地址
  baseURL: 'http://ttapi.research.itcast.cn',
  transformResponse: [function (data) {
    return data ? JSONBig.parse(data) : {}
  }]
})

// 请求拦截器
// 只是axios请求，在发出去之前都要到这里来执行一下
request.interceptors.request.use(function (config) {
  // config这个参数在拦截器工作时，会自动传入值，它的值就是当前请求的配置
  // 如果想在这里加toke，怎么办？
  // 只需给config中的headers中补充一个属性:Authorization: "Bearer XXXXXXXX"
  const user = store.state.user
  // 如果当前没有user,有就带上它的token
  if (user) {
    // console.log('请求拦截器', Date.now())
    config.headers.Authorization = `Bearer ${user.token}`
  }
  // console.dir(config)
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  return response
}, async function (error) {
  // 对响应错误做点什么
  if (error.response.status === 401) {
    // console.log('响应拦截器')
    if (store.state.user && store.state.user.refresh_token) {
      try {
        const result = await axios({
          method: 'PUT',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        console.log('更新token ok')
        // console.log(result)
        store.commit('updateToken', result.data.data.token)
        return request(error.config)
      } catch (e) {
        // 必须重新登录
        console.log('更新token失败')
        // 清除本地的token
        store.commit('setUser', null)
        // 跳转到首页
        router.push({
          path: '/login',
          query: {
            from: router.currentRoute.fullPath
          }
        })
      }
    } else {
      router.push({
        path: '/login',
        query: {
          from: router.currentRoute.fullPath
        }
      })
    }
  } else {
    return Promise.reject(error)
  }
})

export default request
