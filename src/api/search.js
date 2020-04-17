// 所有与搜索有关的操作
import request from '@/utils/request.js'

/**
 * 获取联想建议
 * @param {*} keyword
 */
export const getSearchSuggestion = (keyword) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/suggestion',
    params: {
      q: keyword
    }
  })
}

/**
 * 获取搜索结果
 * @param {*} params
 */
export function getSearch (params) {
  return request({
    url: '/app/v1_0/search',
    method: 'GET',
    // 它是一个get类型的接口，所以是params
    params
  })
}
