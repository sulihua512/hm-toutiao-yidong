// 所有与文章相关的操作
import request from '@/utils/request'
/**
 * 获取文章列表信息
 * @param {*} data
 *
 * {
 *  channel_id:频道ID
 *  timestamp:时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
 *  with_top:是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
 * }
 */
export const getArticles = (data) => {
  return request({
    method: 'GET',
    url: '/app/v1_1/articles',
    params: data
  })
}
