import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import vant from 'vant'
import 'vant/lib/index.css'
import 'amfe-flexible'
import '@/styles/index.css'
Vue.config.productionTip = false

// 调用 vant导出对象的 install方法
Vue.use(vant)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
