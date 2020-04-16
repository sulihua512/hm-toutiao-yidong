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

/**
 * 获取系统所有的频道
 */
export const getAllChannels = () => {
  return request({
    method: 'GET',
    url: '/app/v1_0/channels'
  })
}
/**
 * 删除指定用户频道
 * @param {*} channelId
 */
export const editChannel = (channelId) => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels/' + channelId
  })
}

/**
 * 添加用户频道(不包括推荐频道)
 * @param {*} channels
 */
export const addChannel = (channels) => {
  return request({
    method: 'PUT',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}

/**
 * 删除当前用户频道
 * @param {*} channels
 */
export const delChannel = (channels) => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/user/channels',
    data: {
      channels
    }
  })
}
