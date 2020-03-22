/****
 * 处理频道数据
 */
import store from '@/store'
import $http from '@/utils/request'

const CHANNEL_V = 'toutiao-v' // 登陆用户的key
const CHANNEL_Y = 'toutiao-y' // 游客的key

// 获取自己的频道  没有参数 匿名用户也可以获取数据
// 要将方法改造成 本地化 频道
// 改造原因：python接口有问题
export function getMyChannels () {
  return new Promise(function (resolve, reject) {
    // 区分游客还是 用户 根据当前登录状态判断
    const key = store.state.user.token ? CHANNEL_V : CHANNEL_Y
    const str = localStorage.getItem(key)
    if (str) {
      // 本地缓存有数据 应该把本地数据 释放给后面执行结果
      resolve({ channels: JSON.parse(str) })
    } else {
      // 本地缓存没有数据 线上拉取
      $http({
        url: '/user/channels'
      }).then(result => {
        // 本地存储，返回数据格式，和后端要保存一致。
        localStorage.setItem(key, JSON.stringify(result.channels))
        // 成功执行了 获取用户频道数据
        resolve(result)
      })
    }
  })
}

// 获取全部频道
export function getAllChannels () {
  return $http({
    url: '/channels'
  })
}
