import $http from '@/utils/request'

export function login (user) {
  return $http({
    url: '/authorizations',
    method: 'post',
    data: user
  })
}
