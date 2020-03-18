/**
 * requst.js 请求管理工具
 * create by zyt 2019/10/20
 */
import axios from 'axios'
import JSONBig from 'json-bigint'
import store from '@/store'
import router from '@/router'

/******
 * 思路：
 * 需要在跳到登录页中过程中 ,把当前页面的地址 传给 登录页面
    登录页面 登录成功能之后 先判断 有没有需要跳转的地址
        如果没有跳到主页
        如果有 跳到需要跳转的页面
    router.currentRoute 表示当前的路由信息对象 里面包含了路由的地址 和参数
    需要获取 当前路由的带参数的地址  router.currentRoute.fullPath()
    跳转到登录页面，需要携带当前访问路由地址
    当你登录成功后，需要根据地址 回跳。
 *
 vue

  $route
  $router
 *
 */

// new 一个新的 axios实例
const instance = axios.create({
  // 默认url
  baseURL: 'http://ttapi.research.itcast.cn/app/v1_0',

  //   大数字处理
  //   数据响应回来 还没进入 axios的响应拦截器时执行
  transfromResponse: [function (data) {
    return data ? JSONBig.parse(data) : {}
  }]
})

// 请求拦截器
instance.interceptors.request.use(function (config) {
  // token存在的时候 注入token
  store.state.user.token && (config.headers.Authorization = `Bearer ${store.state.user.token}`)
  return config
}, function (error) {
  // 返回错误 直接进入 axios的catch中
  return Promise.reject(error)
})

// 响应拦截器  处理返回的结果  数据解构
instance.interceptors.response.use(function (response) {
  // 数据解构 axios默认返回数据 加了一层data 数据本身 有一层data
  try {
    return response.data.data
  } catch (error) {
    // 只存在一层 就解一层
    return response.data
  }
}, async function (error) {
  // 请求失败或者失效 会进入到 响应拦截器的异常区域
  // 401 就是token失效
  /**
  * error
  *     config 出现这次错误请求的配置信息
  *     request 请求对象
  *     response 响应对象 status
  */
  //  401 就认为token失效
  // console.log(error.config)
  if (error.response && error.response.status === 401) {
    // 跳转地址
    const path = {
      path: '/login',
      query: {
        //   需要传递的参数
        // router.currentRouter 当前路由 对应的路由信息对象
        redirectUrl: router.currentRouter.fullPath // 表示登录页需要跳转的地址
      }
    }

    // 判断是否存在 refresh_token 可以根据它 来获取新的token
    if (store.state.user.refresh_token) {
      try {
        const result = await axios({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${store.state.user.refresh_token}`
          }
        })
        // result 返回的 新token数据
        // 成功了 需要提交到 mutations更新 新的token
        store.commit('updateUser', {
          user: result.data.data.token, // 更新 最新的token数据
          refresh_token: store.state.user.refresh_token // refresh_token 返回给原来的 state
        })

        // 相当于 执行之前出现401错误的请求
        return instance(error.config)
      } catch (error) {
        // 失败 意味着 尝试 获取新的token 但是没有获取到
        // 有可能 refresh_token也失效了
        // 失效了 就删除之前的token
        store.commit('delUser')
        router.push(path)
      }
    } else {
      // refresh_token 不存在
      store.commit('delUser')
      router.push(path)
    }
  }
  return Promise.reject(error)
})
export default instance
