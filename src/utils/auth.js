/***
 * auth.js 专门处理token读写
 * create by zyt 2019/10/11
 *
 */

const USER_TOKEN = 'toutiao-move'

// 设置token
export function setUser (user) {
  localStorage.setItem(USER_TOKEN, JSON.stringify(user))
}

// 获取用户的token
export function getUser () {
  return JSON.parse(localStorage.getItem(USER_TOKEN) || '{}')
}

// 删除用户的token
export function delUser () {
  localStorage.removeItem(USER_TOKEN)
}
