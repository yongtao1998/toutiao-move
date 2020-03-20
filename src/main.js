import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission' // 路由守卫
import store from './store' // 引入 vuex
import vant, { Lazyload } from 'vant' // 引入vant组件库 和 lazyload
import plugin from '@/utils/plugin' // 工具类
import 'vant/lib/index.css' // vant组件库样式
import 'amfe-flexible' // 屏幕自适应
import '@/styles/index.css' // 自定义样式
Vue.config.productionTip = false

// 调用 vant导出对象的 install方法
Vue.use(vant)
/**
 * 要在 plugin中用vant的内置函数,必须等到vant注册完毕
 * 所以要放在 vant后面
 */
Vue.use(plugin)
// 注册 懒加载指令
Vue.use(Lazyload)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
