import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout'),
    children: [
      {
        // 默认为二级路由的默认组件
        path: '',
        component: () => import('@/views/home'),
        // 如果一级路由存在默认的二级路由 那么meta属性应该写在二级路由的对象上
        // meta 中可以放置当前路由的信息
        // meta是固定写法
        meta: {
          isAlive: true // 是否缓存组件实例 路由元信息
        }
      },
      {
        path: '/question',
        component: () => import('@/views/question') // 问答组件
      }, {
        path: '/video',
        component: () => import('@/views/video') // 视频组件
      }, {
        path: '/user',
        component: () => import('@/views/user') // 用户
      }
    ]
  }, {
    path: '/login',
    component: () => import('@/views/login')
  },
  {
    path: '/user/profile',
    component: () => import('@/views/user/profile')
  },
  {
    path: '/user/chat',
    component: () => import('@/views/user/chat')
  },
  {
    path: '/search',
    component: () => import('@/views/search')
  },
  {
    path: '/search/result',
    component: () => import('@/views/search/result')
  },
  {
    path: '/article',
    component: () => import('@/views/article')
  }

]

const router = new VueRouter({
  routes
})

export default router
