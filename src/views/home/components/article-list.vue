<template>
  <!-- 文章列表组件 放置列表 -->
  <!-- van-list 可以帮助我们实现上拉加载 -->
  <!-- 预留 阅读记忆 -->
  <div class="scroll-wrapper">
      <!-- loading 和 finished 两个变量控制加载状态 -->
       <!-- 当组件 滚动到底部 会触发 load事件 把loading 修改为 true 此时会触发异步操作并更新数据
            数据更新完 将loading设置为 false 就可以
            注意：van-list 初始化完毕 就会检测距离底部的长度，如果超过30px 就会将 loading 修改为 true
        -->
      <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">

      </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      loading: false, // 是否开启上拉加载
      finished: false // 是否完成所有数据的加载
    }
  },
  methods: {
    // 异步操作 获取数据 并更新
    onLoad () {

    }
  }
}
</script>

<style>

</style>
