// 所有与评论相关的操作
import request from '@/utils/request.js'

/**
 * 添加评论 (也可以用来添加对文章评论的回复)
 * @param {*} data
 */
export const addComment = (data) => {
  return request({
    method: 'POST',
    url: '/app/v1_0/comments',
    data
  })
}

/**
 * 获取评论
 * @param {*} params
 */
export const getComments = (params) => {
  return request({
    method: 'GET',
    url: '/app/v1_0/comments',
    params
  })
}
