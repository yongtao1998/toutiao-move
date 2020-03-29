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
  },
  configureWebpack: (config) => {
    // config参数 就是当前vue-cli项目所有的webpack配置
    // 如果想要改动, 直接修改这个信息就可以
    // 首先判断当前的打包环境 是 开发环境还是生产环境
    if (process.env.NODE_ENV === 'production') {
      // 只需要在生产环境中 把所有的console删除掉 并且再打包  这里的删除console 不是删除源代码的console 而是删除 打包出来的console
      config.optimization.minimizer[0].options.terserOptions.compress.drop_console = true
    }
  },
  publicPath: './' // 打包后的引用地址
}
