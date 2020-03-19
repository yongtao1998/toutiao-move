/***
 *  路由守卫
 */

import router from '@/router'
import store from '@/store'

router.beforeEach(function (to, from, next) {
  // console.log(to)
  // 判断请求地址和token
  if (to.path.startsWith('/user') && !store.state.user.token) {
    next({
      path: '/login',
      // 登陆成功后 应该返回 想去的页面
      query: {
        //   path 和fullpath的区别是 fullPath会携带 ? 后面的参数是一个完整的路径
        redirectUrl: to.fullPath
      }
    })
  } else {
    //   不是user起始 和 存在token 直接放行
    next()
  }
})
