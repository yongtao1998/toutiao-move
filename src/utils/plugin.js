/***
 * plugin.js 专门负责提供小函数 以及vue中常用的过滤器及函数
 */
import dayjs from 'dayjs' // 引入dayjs插件
import relativeTime from 'dayjs/plugin/relativeTime' // 引入相对时间的插件
import 'dayjs/locale/zh-cn' // 引入 语言包 默认支持英文语言包
dayjs.extend(relativeTime) // dayjs的扩展 相对时间的方法 这个方法写完 dayjs就有了from方法

export default {
  install (Vue) {
    // 该方法 使用 vue.use()调用
    // 给Vue的原型属性赋值一个函数 自定义一个函数名
    // 执行 这个代码的时候 Vue.prototype.$notify 应该已经挂载
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
    // 定义 一个$sleep原型属性
    Vue.prototype.$sleep = sleep
    // 注册 时间处理 全局过滤器
    Vue.filter('relTime', relTime)
  }
}

/****
 * 休眠函数
 */

function sleep (time = 500) { // 休眠时间
  return new Promise(function (resolve, reject) {
    setTimeout(() => resolve(), time)
  })
}

/****
 *日期转化
 */
function relTime (date) {
  return dayjs().locale('zh-cn').from(date) // from中的值 是 日期或者 dayjs得到的日期
}
