<template>
  <div class="container">
    <!-- 搜索组件一级路由   返回上一个页面-->
    <van-nav-bar left-arrow title="搜索中心" @click-left="$router.back()"></van-nav-bar>
    <!-- 导航 -->
    <van-search @search='onSearch' v-model.trim="q" placeholder="请输入搜索关键词" shape="round" />
    <van-cell-group class="suggest-box" v-if="q">
      <van-cell icon="search" v-for="(item,index) in suggestList" :key="index">
        <span @click="toResult(item)">{{item}}</span>
      </van-cell>
    </van-cell-group>
    <!-- 有历史记录的时候才显示 -->
    <div class="history-box" v-else-if="historyList.length">
      <div class="head">
        <span>历史记录</span>
        <van-icon name="delete" @click="clear"></van-icon>
      </div>
      <van-cell-group>
        <van-cell v-for="(item,index) in historyList" :key="index">
          <a @click="toResult(item)" class="word_btn">{{item}}</a>
          <van-icon @click.stop="delHistory(index)" class="close_btn" slot="right-icon" name="cross" />
        </van-cell>
      </van-cell-group>
    </div>
  </div>
</template>

<script>
import * as articles from '@/api/articles'
const key = 'toutiao-history'
export default {
  name: 'search',
  data () {
    return {
      q: '', // 输入数据
      historyList: [], // 历史记录数据
      suggestList: [] // 联想搜索
    }
  },
  created () {
    // 读取历史记录
    this.historyList = JSON.parse(localStorage.getItem(key) || '[]')
  },
  methods: {
    // 删除历史记录
    delHistory (index) {
      this.historyList.splice(index, 1)
      localStorage.setItem(key, JSON.stringify(this.historyList))
    },

    // 根据历史记录跳转到搜索结果页
    // 搜索选项加入搜索历史 并跳到搜索结果
    toResult (item) {
      this.historyList.push(item) // 加入历史记录
      this.historyList = Array.from(new Set(this.historyList)) // 去重
      // 存到本地
      localStorage.setItem(key, JSON.stringify(this.historyList))
      // 跳转到 搜索结果
      this.$router.push({ path: '/search/result', query: { q: item } })
    },
    // 清除历史记录
    clear () {
      this.historyList = []
      localStorage.setItem(key, '[]')
    },
    // 搜索内容跳转
    onSearch () {
      // 如果 输入内容为空 直接 return
      if (!this.q) return
      // 搜索结果 添加到历史记录中
      this.historyList.push(this.q)
      this.historyList = Array.from(new Set(this.historyList)) // 去重
      localStorage.setItem(key, JSON.stringify(this.historyList))
      // 跳转到 搜索结果页 并且携带参数
      this.$router.push({ path: '/search/result', query: { q: this.q } })
    }

  },
  watch: {
    // 监听输入内容
    // 采用时间戳节流
    async q () {
      this.timer = this.timer || 0
      const currDate = Date.now()
      if (currDate - this.timer >= 500) {
        this.timer = currDate
        if (!this.q) {
          this.suggestList = []
        }

        const data = await articles.getSuggestion({ q: this.q })
        // debugger
        this.suggestList = data.options
      }
    }
  }
}
</script>

<style lang='less' scoped>
.history-box {
  padding: 0 20px;
  .head{
    line-height: 36px;
    color: #999;
    .van-icon{
      font-size: 16px;
      float: right;
      margin-top: 10px;;
    }
  }
  .van-cell{
    padding: 10px 0;
  }
  .word_btn{
    color:#3296fa;
  }
  .close_btn{
    margin-top:5px;
    color: #999;
  }
}
.suggest-box{
  /deep/ .van-cell{
    padding: 10px 20px;
    color: #999;
    p{
      span{
        color: red;
      }
    }
  }
}
</style>
