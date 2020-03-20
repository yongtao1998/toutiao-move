<template>
  <!-- 文章列表组件 放置列表 -->
  <!-- van-list 可以帮助我们实现上拉加载 -->
  <!-- 预留 阅读记忆 -->
  <div class="scroll-wrapper">
    <!-- 下拉加载 -->
    <van-pull-refresh v-model="downLoading" @refresh="onRefresh" :success-text="successText">

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
              <!-- lazy-load 开启图片懒加载 -->
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[0]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[1]" />
              <van-image lazy-load class="w33" fit="cover" :src="item.cover.images[2]" />
            </div>
            <!-- 单图 -->
            <div class="img_box" v-if="item.cover.type === 1">
              <van-image lazy-load class="w100" fit="cover" :src="item.cover.images[0]" />
            </div>
            <!-- 作者信息 -->
            <div class="info_box">
              <span>{{ item.aut_name }}</span>
              <span>{{ item.comm_count }}评论</span>
              <span>{{ item.pubdate | relTime}}</span>
               <span @click="$emit('showAction', item.art_id.toString())" class="close" v-if="$store.state.user.token">
                <van-icon name="cross"></van-icon>
              </span>
            </div>
          </div>
        </van-cell>
      </van-cell-group>
    </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
// 获取文章
import { getArticles } from '@/api/articles'
import eventBus from '@/utils/eventBus'
export default {
  // 对象形式可以约束传入的值 必填 传值类型
  props: {
    channel_id: {
      required: true,
      type: Number,
      default: null
    }
  },
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
    // 获取上滑加载数据 并更新
    async onLoad () {
      await this.$sleep()
      const result = await getArticles({ channel_id: this.channel_id, timestamp: this.timestamp || Date.now() })
      // 把获取到的文章 添加到 文章列表后面
      this.articles.push(...result.results)
      // 关闭 上拉刷新
      this.loading = false
      // 把时间戳赋值给 timestamp 但是需要根据时间戳来 判断 是否还有没有数据
      // pre_timestamp 为 0的时候 表示已经没有数据了
      if (result.pre_timestamp) {
        this.timestamp = result.pre_timestamp
      } else {
        // 表示没有数据了
        this.finished = true
      }
    },
    // 下拉获取最近数据
    async onRefresh () {
      await this.$sleep()
      const data = await getArticles({
        channel_id: this.channel_id, timestamp: Date.now() // 需要传入 最新的时间戳
      })
      this.downLoading = false // 关闭下拉状态
      // 判断 是否有最新数据
      if (data.results.length) {
        // 将历史数据全部替换为最新数据
        this.articles = data.results
        this.successText = `更新了${data.results.length}条数据`
        // 此时为最新数据 如果 之前把数据拉到了最底端 也就意味着 之前的finished已经为true
        // 判断 传回来的时间戳是否 为 0
        if (data.pre_timestamp) {
          // 不为false 就将 finished 修改为 可以获取数据的状态
          this.finished = false
          // 把获取到的 时间戳 再存到 实例中
          this.timestamp = data.pre_timestamp
        }
      } else {
        this.successText = '当前已经是最新数据了'
      }
    }
  },
  created () {
    // 监听删除文章事件
    eventBus.$on('delArticle', (artId, channelId) => {
      // 判断 传过来的频道 是否等于 自身的频道
      if (channelId === this.channel_id) {
        // 通过 id查询文章所在的下标
        const index = this.articles.findIndex(item => item.art_id.toString() === artId)
        if (index > -1) {
          // 下标 从0 开始 所以要大于-1 删除对应下标数据
          this.articles.splice(index, 1)
        }
        // 当内容 删除为0 的时候 需要手动开启 onload
        if (this.articles.length === 0) {
          this.onLoad()
        }
      }
    })
  }
}
</script>

<style lang='less' scoped>
.article_item {
  h3 {
    font-weight: normal;
    line-height: 2;
  }
  .img_box {
    display: flex;
    justify-content: space-between;
    .w33 {
      width: 33%;
      height: 90px;
    }
    .w100 {
      width: 100%;
      height: 180px;
    }
  }
  .info_box {
    color: #999;
    line-height: 2;
    position: relative;
    font-size: 12px;
    span {
      padding-right: 10px;
      &.close {
        border: 1px solid #ddd;
        border-radius: 2px;
        line-height: 15px;
        height: 12px;
        width: 16px;
        text-align: center;
        padding-right: 0;
        font-size: 8px;
        position: absolute;
        right: 0;
        top: 7px;
      }
    }
  }
}
</style>
