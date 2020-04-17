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

/**
 * 不喜欢指定的文章
 * @param {*} articleId
 */
export const dislikeArticle = (articleId) => {
  return request({
    url: '/app/v1_0/article/dislikes',
    method: 'POST',
    data: {
      target: articleId
    }
  })
}
/**
 * 举报文章
 * @param {*} articleId 文章编号
 * @param {*} type 举报类型
 */
export const reportArticle = (articleId, type) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/reports',
    data: {
      target: articleId,
      type: type
    }
  })
}

/**
 * 获取文章详情
 * @param {*} articleId 文章编号
 */
export const getArticle = (articleId) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/articles/' + articleId
  })
}

/**
 *  点赞
 * @param {*} articleId 文章编号
 */
export const addLike = (articleId) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/article/likings',
    data: {
      target: articleId
    }
  })
}
/**
 *  取消点赞
 * @param {*} articleId 文章编号
 */
export const deleteLike = (articleId) => {
  return request({
    method: 'DELETE',
    url: '/app/v1_0/article/likings/' + articleId
  })
}
