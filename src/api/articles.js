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
 * 拉黑作者
 */

export function blacklist (data) {
  return $http({
    url: '/user/blacklists',
    method: 'post',
    data
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

/****
 * 搜索结果 上拉加载
 */

export function searchArticle (params) {
  return $http({
    url: '/search',
    params
  })
}

/***
 * 获取文章数据
 */
export function getArticleInfo (artId) {
  return $http({
    url: `/articles/${artId}`
  })
}

/****
 * 获取评论或者评论回复
 */

export function getComments (params) {
  return $http({
    url: '/comments',
    params // type(是文章的的回复还是回复的回复)  source(来源id)  offset(偏移量 分页依据)
  })
}

/*****
 * 评论与回复
 *
 */

export function commentOrReply (data) {
  return $http({
    url: '/comments',
    method: 'post',
    data
  })
}
