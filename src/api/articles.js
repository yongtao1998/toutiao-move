/***
 * 处理文章模块的请求
 */
import $http from '@/utils/request'

/****
 * 获取文章推荐数据
 *  需要传入 timestamp 时间戳  channel_id (频道id)
 * ****/
export function getArticles (params) {
  return $http({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}

/****
 * 不感兴趣 接口
 */
export function dislike (data) {
  return $http({
    url: '/article/dislikes',
    method: 'post',
    data
  })
}
/***
 * 举报接口
 */
export function report (data) {
  return $http({
    url: '/article/reports',
    data,
    method: 'post'
  })
}

/****
 * 获取联想搜索
 */
export function getSuggestion (params) {
  return $http({
    url: '/suggestion',
    params
  })
}
