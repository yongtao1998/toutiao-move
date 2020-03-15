module.exports = {
  plugins: {
    //   自动给 css样式加前缀的属性 display:flex
    autoprefixer: {},
    'postcss-pxtorem': {
      // 基础值 font-size
    //   以iPhone6宽度的 10分之一 作为基准值
      rootValue: 37.5,
      propList: ['*']
    }
  }
}
