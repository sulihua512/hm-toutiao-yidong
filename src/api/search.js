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
