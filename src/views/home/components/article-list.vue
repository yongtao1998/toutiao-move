<template>
  <!-- 文章列表组件 放置列表 -->
  <!-- van-list 可以帮助我们实现上拉加载 -->
  <!-- 预留 阅读记忆 -->
  <div class="scroll-wrapper">
    <!-- 下拉加载 -->
    <!-- <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText"></van-pull-refresh> -->
    <!-- 上拉刷新 -->
    <!-- loading 和 finished 两个变量控制加载状态 -->
    <!-- 当组件 滚动到底部 会触发 load事件 把loading 修改为 true 此时会触发异步操作并更新数据
            数据更新完 将loading设置为 false 就可以
            注意：van-list 初始化完毕 就会检测距离底部的长度，如果超过30px 就会将 loading 修改为 true
    -->

    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
      <!-- 循环内容 -->
      <van-cell-group>
        <van-cell v-for="item in articles" :key="item.art_id.toString()">
          <div class="article_item">
            <!-- 标题 -->
            <h3 class="van-ellipsis">{{ item.title }}</h3>
            <!-- 封面 更具封面类型选择三图、单图 还是 无图 -->
            <div class="img_box" v-if="item.cover.type === 3">
              <van-image class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <!-- 单图 -->
            <div class="img_box" v-if="item.cover.type === 1">
              <van-image class="w100" fit="cover" :src="item.cover.images[0]" />
            </div>
            <!-- 作者信息 -->
            <div class="info_box">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate }}</span>
              <span class="close">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
  </div>
</template>

<script>
export default {
  data () {
    return {
      downLoading: false, // 下拉刷新状态
      successText: '', // 刷新成功文本
      loading: false, // 是否开启上拉加载
      finished: false, // 是否完成所有数据的加载
      articles: [], // 文章列表
      timestamp: null // 时间戳
    }
  },
  methods: {
    // 异步操作 获取数据 并更新
    onLoad () {}
  }
}
</script>

<style>
</style>
