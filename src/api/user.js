// 所有用户操作的功能
import request from '@/utils/request.js'

// 登录
export function login (user) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: user
  })
}

// 退出
export function logout (user) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: user
  })
}

// 提取出来的优势
// 1. 方便修改url,参数
// 2. 让代码更加具有语义化
// 3. 方便代码复用
