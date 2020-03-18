/***
 * vue cli 配置
 * https://cli.vuejs.org/zh/config/#css-sourcemap
 */

module.exports = {
  // 更改 less中变量的配置
  css: {
    loaderOptions: {
      // 所有的关于样式 loader相关的选项
      less: {
        // modifyVars 是less-loader的一个选项 通过这个选项可以改变 变量的值
        modifyVars: {
          // 直接覆盖变量
          blur: '#3296fa'
        }
      }
    }
  }
}
