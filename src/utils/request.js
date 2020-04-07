import axios from 'axios'

// 对axios进行二次封装
const request = axios.create({
// 基地址
  baseURL: 'http://ttapi.research.itcast.cn'
})

export default request
