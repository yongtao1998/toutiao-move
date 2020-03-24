<template>
  <div class="comment">
    <van-list v-model="loading" :finished="finished" @load="onLoad" finished-text="没有更多了">
      <div
        class="item van-hairline--bottom van-hairline--top"
        v-for="item in comments"
        :key="item.com_id.toString()"
      >
        <van-image round width="1rem" height="1rem" fit="fill" :src="item.aut_photo" />
        <div class="info">
          <p>
            <span class="name">{{item.aut_name}}</span>
            <span style="float:right">
              <span class="van-icon van-icon-good-job-o zan"></span>
              <span class="count">{{ item.like_count }}</span>
            </span>
          </p>
          <p>{{item.content}}</p>
          <p>
            <span class="time">{{item.pubdate | relTime}}</span>&nbsp;
            <van-tag plain @click="openReply(item.com_id.toString())">{{ item.reply_count }} 回复</van-tag>
          </p>
        </div>
      </div>
    </van-list>
    <div class="reply-container van-hairline--top">
      <van-field v-model="value" placeholder="写评论...">
        <van-loading v-if="submiting" slot="button" type="spinner" size="16px"></van-loading>
        <span class="submit" v-else slot="button">提交</span>
      </van-field>
    </div>

    <!-- 放置评论的评论 弹出面板 -->
    <van-action-sheet v-model="showReply" :round="false" class="reply_dialog" title="回复评论">
        <!-- 主动关闭上拉加载 :immediate-check="false"  -->
      <van-list v-model="reply.loading" :immediate-check="false" :finished="reply.finished" finished-text="没有更多了">
        <div class="item van-hairline--bottom van-hairline--top" v-for="item in reply.list " :key="item.aut_id.toString()">
          <van-image
            round
            width="1rem"
            height="1rem"
            fit="fill"
            :src="item.aut_photo"
          />
          <div class="info">
            <p>
              <span class="name">{{item.aut_name}}</span>
            </p>
            <p>{{item.content}}</p>
            <p>
              <span class="time">{{item.pubdate | relTime}}</span>
            </p>
          </div>
        </div>
      </van-list>
    </van-action-sheet>
  </div>
</template>

<script>
import { getComments } from '@/api/articles'
export default {
  data () {
    return {
      loading: false, // 上拉加载
      finished: false, // 加载完毕
      value: '', // 输入的内容
      submiting: false,
      comments: [], // 存放评论列表的数据
      offset: null, // 分页的依据
      showReply: false, // 控制 回复评论是否显示
      reply: { // 回复评论 加载信息
        commentId: null, // 存放 当前点击的评论id
        loading: false,
        finished: false,
        offset: null, // 偏移量 回复评论的查询依据
        list: [] // 回复评论的数据
      }
    }
  },
  methods: {
    //   加载 评论
    async onLoad () {
      const { artId } = this.$route.query
      const data = await getComments({
        type: 'a', // 文章的评论
        source: artId, // 文章id
        offset: this.offset // 偏移量
      })
      this.comments.push(...data.results)
      this.loading = false
      //   判断是否还有下一页数据
      this.finished = data.end_id === data.last_id // 如果最后的id等于开始的id 表示没数据了
      if (!this.finished) {
        //   data.last_id是 当前页的最后一个id
        this.offset = data.last_id
      }
    },
    // 控制回复评论的显示
    openReply (commentId) {
      this.showReply = true // 打开
      this.reply.commentId = commentId
      //   弹出 面板的时候 重置数据
      this.reply.list = []
      this.reply.offset = null // 点击弹出面板的时候 从新的第一页开始
      this.reply.finished = false
      this.reply.loading = true // 主动打开加载状态
      this.getReply() // 请求数据
    },
    // 获取评论
    async getReply () {
      const data = await getComments({
        type: 'c',
        source: this.reply.commentId,
        offset: this.reply.offset
      })
      //   数据追加到 list队尾
      this.reply.list.push(...data.results)
      this.reply.loading = false // 关闭加载状态
      this.reply.finished = data.last_id === data.end_id
      if (!this.reply.finished) {
        this.reply.offset = data.last_id // 将下一页的分页依据设置给当前的数据
      }
    }
  }
}
</script>

<style lang='less' scoped>
.comment {
  margin-top: 10px;
  /deep/ .item {
    display: flex;
    padding: 10px 0;
    .info {
      flex: 1;
      padding-left: 10px;
      .name {
        color: #069;
      }
      .zan {
        vertical-align: middle;
        padding-right: 2px;
      }
      .count {
        vertical-align: middle;
        font-size: 10px;
        color: #666;
      }
      .time {
        color: #666;
      }
      p {
        padding: 5px 0;
        margin: 0;
      }
    }
  }
  /deep/ .van-button:active::before {
    background: transparent;
  }
}
.reply-container {
  position: fixed;
  left: 0;
  bottom: 0;
  height: 44px;
  width: 100%;
  background: #f5f5f5;
  z-index: 9999;
  .submit {
    font-size: 12px;
    color: #3296fa;
  }
}

.reply_dialog {
  display: flex;
  overflow: hidden;
  flex-direction: column;
  .van-action-sheet__header {
    background: #3296fa;
    color: #fff;
    .van-icon-close {
      color: #fff;
    }
  }
  .van-action-sheet__content{
    flex: 1;
    overflow-y: auto;
    padding: 0 10px 44px;
  }
}
</style>
