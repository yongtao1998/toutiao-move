<template>
  <div class="container">
    <!-- 放置 tabs组件 -->
    <van-tabs>
      <!-- title值为当前显示的标签页 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表  -->
        <ArticleList :channel_id="item.id" @showAction="openAction"></ArticleList>
      </van-tab>
    </van-tabs>

    <!-- tabs下 放置 图标 编辑 频道的图标 -->
    <span class="bar_btn">
      <!-- vant图标 -->
      <van-icon name="wap-nav" />
    </span>

    <!-- 弹层组件 -->
    <van-popup v-model="showMoreAction" style="width:80%">
      <!-- 放置反馈的组件 -->
      <MoreAction></MoreAction>
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import { getMyChannels } from '@/api/channels'
export default {
  components: {
    ArticleList,
    MoreAction
  },
  data () {
    return {
      channels: [],
      showMoreAction: false
    }
  },
  methods: {
    // 控制遮罩层显示
    openAction () {
      this.showMoreAction = true
    },
    // 获取频道列表
    async getMyChannels () {
      const result = await getMyChannels()
      this.channels = result.channels
    }
  },
  created () {
    this.getMyChannels()
  }
}
</script>

<style lang='less' scoped>
.van-tabs {
  height: 100%;
  display: flex;
  flex-direction: column;
  /deep/ .van-tabs__wrap {
    height: 36px;
    padding-right: 36px;
    .van-tab {
      line-height: 36px;
    }
    .van-tabs__line {
      background-color: #3296fa;
      height: 2px;
    }
  }
  /deep/ .van-tabs__content {
    flex: 1;
    overflow: hidden;
  }
  /deep/ .van-tab__pane {
    height: 100%;
    .scroll-wrapper {
      height: 100%;
      overflow-y: auto;
    }
  }
}
.bar_btn {
  width: 36px;
  height: 35px;
  position: absolute;
  top: 0;
  right: 0;
  &::before {
    content: "";
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 999;
    box-shadow: 0 0 10px #999;
    transform: scale(1, 0.6);
  }
  .van-icon-wap-nav {
    width: 100%;
    height: 100%;
    background: #fff;
    text-align: center;
    line-height: 35px;
    position: relative;
    z-index: 1000;
    &::before {
      font-size: 20px;
    }
  }
}
</style>
