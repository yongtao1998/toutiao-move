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

/***
 * 获取用户的个人资料
 */
export function getUserProfile () {
  return $http({
    url: '/user/profile'
  })
}

/****
 * 上传头像
 */
export function updatePhoto (data) {
  return $http({
    url: '/user/photo',
    method: 'patch',
    data
  })
}

/***
 * 保存用户更改资料
 */

export function saveUserInfo (data) {
  return $http({
    url: '/user/profile',
    method: 'patch',
    data: {
      ...data, photo: null
    }
  })
}
