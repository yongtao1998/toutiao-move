/****
 * 处理频道数据
 */
import $http from '@/utils/request'
// 获取自己的频道
export function getMyChannels () {
  return $http({
    url: '/user/channels'
  })
}

export function getAllChannels () {
  return $http({
    url: '/channels'
  })
}
