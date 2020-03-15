import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)
const Layout = () => import('@/views/layout')
const home = () => import('@/views/home')
const question = () => import('@/views/question')
const video = () => import('@/views/video')

const routes = [
  {
    path: '/',
    component: Layout,
    children: [
      {
        // 默认为二级路由的默认组件
        path: '',
        component: home
      },
      {
        path: '/question',
        component: question // 问答组件
      }, {
        path: '/video',
        component: video // 视频组件
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
