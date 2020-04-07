// 所有用户操作的功能
import request from '@/utils/request.js'

export function login (user) {
  return request({
    method: 'POST',
    url: '/app/v1_0/authorizations',
    data: user
  })
}
