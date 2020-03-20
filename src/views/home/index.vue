<template>
  <div class="container">
    <!-- 放置 tabs组件 -->
    <van-tabs v-model="activeIndex">
      <!-- title值为当前显示的标签页 -->
      <van-tab :title="item.name" v-for="item in channels" :key="item.id">
        <!-- 文章列表  -->
        <ArticleList :channel_id="item.id" @showAction="openAction"></ArticleList>
      </van-tab>
    </van-tabs>

    <!-- tabs下 放置 图标 编辑 频道的图标 -->
    <span class="bar_btn">
      <!-- vant图标 -->
      <van-icon name='wap-nav'></van-icon>
    </span>

    <!-- 弹层组件 -->
    <van-popup v-model="showMoreAction" style="width:80%">
      <!-- 放置反馈的组件 -->
      <!-- 自定义事件中 $event 就是自定义事件传出来的参数 -->
      <MoreAction @dislike="dislikeOrReport('dislike')" @report="dislikeOrReport('report',$event)" />
    </van-popup>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import { getMyChannels } from '@/api/channels'
import { dislike, report } from '@/api/articles'

import eventBus from '@/utils/eventBus'

export default {
  components: {
    ArticleList,
    MoreAction
  },
  data () {
    return {
      channels: [], // 频道数据
      showMoreAction: false, // 控制遮罩层显示
      articleId: null, // 不感兴趣文章 id
      activeIndex: 0 // 当前默认激活的页面0
    }
  },
  methods: {

    // 获取频道列表
    async getMyChannels () {
      const result = await getMyChannels()
      this.channels = result.channels
    },

    // 控制遮罩层显示
    // 把当前不感兴趣的文章id存储到组件中
    openAction (artId) {
      this.showMoreAction = true
      this.articleId = artId
    },

    // 不感兴趣和举报文章
    // openAction 是 事件类型  type 举报类型
    async dislikeOrReport (operateType, type) {
      try {
        operateType === dislike ? await dislike({
          target: this.articleId // 不感兴趣
        }) : await report({ target: this.articleId, type }) // 举报文章

        this.$notify({
          type: 'success',
          message: '操作成功'
        })
        // 触发一个事件 利用事件广播机制 通知对应的tab 来删除 文章数据
        // 还应该传入 当前频道
        // this.channels[this.activeIndex].id // 当前激活的频道数据
        eventBus.$emit('delArticle', this.articleId, this.channels[this.activeIndex].id)
        // 关闭弹出层
        this.showMoreAction = false
      } catch (error) {
        this.$notify({
          message: '操作失败'
        })
      }
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
