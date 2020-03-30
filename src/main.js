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
// 在main.js中添加如下代码  此代码是采用的 5+ Runtime中的plus对象
document.addEventListener('plusready', function () {
  var webview = window.plus.webview.currentWebview()
  window.plus.key.addEventListener('backbutton', function () {
    webview.canBack(function (e) {
      if (e.canBack) {
        webview.back()
      } else {
        // webview.close(); //hide,quit
        // plus.runtime.quit();
        // 首页返回键处理
        // 处理逻辑：1秒内，连续两次按返回键，则退出应用；
        var first = null
        window.plus.key.addEventListener('backbutton', function () {
          // 首次按键，提示‘再按一次退出应用’
          if (!first) {
            first = new Date().getTime()
            setTimeout(function () {
              first = null
            }, 1000)
          } else {
            if (new Date().getTime() - first < 1500) {
              window.plus.runtime.quit()
            }
          }
        }, false)
      }
    })
  })
})
