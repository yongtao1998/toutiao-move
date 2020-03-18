import Vue from 'vue'
import App from './App.vue'
import router from './router'
import '@/permission'
import store from './store'
import vant from 'vant'
import plugin from '@/utils/plugin'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.css'
Vue.config.productionTip = false

// 调用 vant导出对象的 install方法
Vue.use(vant)
/**
 * 要在 plugin中用vant的内置函数,必须等到vant注册完毕
 * 所以要放在 vant后面
 */
Vue.use(plugin)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
