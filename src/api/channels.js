/****
 * 处理频道数据
 */
import $http from '@/utils/request'

export function getMyChannels () {
  return $http({
    url: '/user/channels'
  })
}
