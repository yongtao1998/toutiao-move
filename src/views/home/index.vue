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
    <span class="bar_btn" @click="showChannelEdit=true">
      <!-- vant图标 -->
      <van-icon name="wap-nav"></van-icon>
    </span>

    <!-- 弹层组件 -->
    <van-popup v-model="showMoreAction" style="width:80%">
      <!-- 放置反馈的组件 -->
      <!-- 自定义事件中 $event 就是自定义事件传出来的参数 -->
      <MoreAction @blacklist="blacklist" @dislike="dislikeOrReport('dislike')" @report="dislikeOrReport('report',$event)" />
    </van-popup>

    <!-- 频道编辑组件 放在 弹出面板的组件 -->
    <van-action-sheet :round="false" title="编辑频道" v-model="showChannelEdit">
      <ChannelEdit @delChannel="delChannel" @addChannel="addChannel" :channels='channels' :activeIndex="activeIndex" @selectChannel="selectChannel"></ChannelEdit>
    </van-action-sheet>
  </div>
</template>

<script>
import ArticleList from './components/article-list'
import MoreAction from './components/more-action'
import ChannelEdit from './components/channel_edit'
import { getMyChannels, delChannel, addChannel } from '@/api/channels'
import { dislike, report, blacklist } from '@/api/articles'

import eventBus from '@/utils/eventBus'

export default {
  components: {
    ArticleList,
    MoreAction,
    ChannelEdit
  },
  data () {
    return {
      channels: [], // 频道数据
      showMoreAction: false, // 控制遮罩层显示
      articleId: null, // 不感兴趣文章 id
      activeIndex: 0, // 当前默认激活的页面0
      showChannelEdit: false,
      authodId: null // 用户id
    }
  },
  methods: {
    // 拉黑作者 沙比东西 一直存脏数据
    async blacklist () {
      try {
        await blacklist({
          target: this.authodId
        })
        this.$notify({
          type: 'success',
          message: '操作成功'
        })
        this.showMoreAction = false
        eventBus.$emit('blacklist', this.authodId)
      } catch (error) {
        this.$notify({ message: '失败' })
      }
    },
    // 删除频道
    async delChannel (id) {
      // 删除缓存中的数据
      try {
        await delChannel(id)
        // 移除当前data中的数据
        const index = this.channels.findIndex(item => item.id === id)
        // 根据要删除的索引和激活当前索引的关系 来决定 当前索引是否需要更改
        if (index <= this.activeIndex - 1) {
          // 如果删除的索引 是在当前激活索引之前的 或者等于当前激活索引的
          // 此时就要把激活索引 给往前挪一位
          this.activeIndex = this.activeIndex - 1
        }
        this.channels.splice(index, 1)
      } catch (error) {
        this.$notify({ message: '删除频道失败' })
      }
    },
    // 添加频道
    async addChannel (channel) {
      await addChannel(channel)
      this.channels.push(channel)
    },
    // 频道切换 关闭弹层
    selectChannel (index) {
      this.activeIndex = index
      this.showChannelEdit = false
    },
    // 获取频道列表
    async getMyChannels () {
      const result = await getMyChannels()
      this.channels = result.channels
    },

    // 控制遮罩层显示
    // 把当前不感兴趣的文章id存储到组件中
    openAction (artId, autId) {
      this.showMoreAction = true
      this.articleId = artId
      this.authodId = autId
    },

    // 不感兴趣和举报文章
    // openAction 是 事件类型  type 举报类型
    async dislikeOrReport (operateType, type) {
      try {
        operateType === 'dislike'
          ? await dislike({
            target: this.articleId // 不感兴趣
          })
          : await report({ target: this.articleId, type }) // 举报文章

        this.$notify({
          type: 'success',
          message: '操作成功'
        })
        // 触发一个事件 利用事件广播机制 通知对应的tab 来删除 文章数据
        // 还应该传入 当前频道
        // this.channels[this.activeIndex].id // 当前激活的频道数据
        eventBus.$emit(
          'delArticle',
          this.articleId,
          this.channels[this.activeIndex].id
        )
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
.van-action-sheet {
  max-height: 100%;
  height: 100%;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
}
</style>
