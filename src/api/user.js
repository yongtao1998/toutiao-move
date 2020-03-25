import $http from '@/utils/request'
/****
 * 登录
 */
export function login (user) {
  return $http({
    url: '/authorizations',
    method: 'post',
    data: user
  })
}

/***
 * 关注用户
 */
export function followUser (data) {
  return $http({
    url: '/user/followings',
    method: 'post',
    data
  })
}
/****
 * 取消关注
 */
export function unfollowUser (autid) {
  return $http({
    url: `/user/followings/${autid}`,
    method: 'delete'
  })
}

/****
 * 获取个人信息
 */
export function getUserInfo () {
  return $http({
    url: '/user'
  })
}
