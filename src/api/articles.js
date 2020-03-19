/***
 * 处理文章模块的请求
 */
import $http from '@/utils/request'

export function getArticles (params) {
  return $http({
    url: 'http://ttapi.research.itcast.cn/app/v1_1/articles',
    params: { with_top: 1, ...params }
  })
}
