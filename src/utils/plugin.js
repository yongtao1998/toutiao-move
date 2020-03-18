/***
 * plugin.js 专门负责提供小函数 以及vue中常用的过滤器及函数
 */

export default {
  install (Vue) {
    // 该方法 使用 vue.use()调用
    // 给Vue的原型属性赋值一个函数 自定义一个函数名
    // 执行 这个代码的时候 Vue.prototype.$notify 应该已经挂载
    Vue.prototype.$gnotify = (params) => Vue.prototype.$notify({ duration: 800, ...params })
  }
}
