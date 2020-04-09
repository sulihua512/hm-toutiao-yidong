import axios from 'axios'

// 对axios进行二次封装
const request = axios.create({
// 基地址
  baseURL: 'http://ttapi.research.itcast.cn'
  // baseURL: 'http://ttapi.research.itcast.cn '是有问题的，地址中间不能有空格

})

export default request
