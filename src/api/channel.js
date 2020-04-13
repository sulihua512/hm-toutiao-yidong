// 与频道操作有关的接口
import request from '@/utils/request'

/**
 * 获取当前频道
 */
export const getChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/user/channels'
  })
}
