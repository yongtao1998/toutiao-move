<template>
  <div class="container">
    <!-- vant导航组件 -->
    <van-nav-bar v-if="showNavBar" fixed title="猿趣新闻"
    right-text="搜索" @click-right="$router.push('/search')"></van-nav-bar>
    <!-- 二级路由容器 -->
  <div class="my-wrapper"  :class="{ noTop: !showNavBar }">
    <router-view></router-view>
 </div>
<!-- route 开启路由 -->
    <van-tabbar route>
        <van-tabbar-item to="/" icon="home-o">首页</van-tabbar-item>
        <van-tabbar-item to="/question" icon="chat-o">问答</van-tabbar-item>
        <van-tabbar-item to="/video" icon="video-o">视频</van-tabbar-item>
        <van-tabbar-item to="/user" icon="user-o">我的</van-tabbar-item>
    </van-tabbar>

  </div>
</template>

<script>
export default {
  computed: {
    showNavBar () {
      // debugger
      return this.$route.path !== '/user'
    }
  }
}
</script>

<style scoped lang='less'>
.container{
  width: 100%;
  height: 100%;
  position: relative;
  .my-wrapper{
    width: 100%;
    height: 100%;
    overflow: hidden;
    padding-top: 46px;
    padding-bottom: 50px;
    box-sizing: border-box;
    &.noTop{
      padding-top: 0;
    }
  }
}
</style>
