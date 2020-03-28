<template>
  <div class="container">
    <van-nav-bar title="YQ精灵" fixed left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="chat-list" ref="myList">
      <div
        class="chat-item"
        :class="{left:item.name==='yq',right:item.name!=='xz'}"
        v-for="(item,index) in list"
        :key="index"
      >
        <van-image fit="cover" round v-if="item.name==='yq'" :src="YQImg" />
        <div class="chat-pao">{{item.msg}}</div>
         <van-image  v-if="item.name !== 'yq'" fit="cover" round :src="photo" />
      </div>
      <!-- <div class="chat-item right">
        <div class="chat-pao">ewqewq</div>
        <van-image  fit="cover" round :src="photo" />
      </div>-->
    </div>
    <div class="reply-container van-hairline--top">
      <!-- 去前后空格 -->
      <van-field v-model.trim="value" placeholder="说点什么...">
        <van-loading v-if="loading" slot="button" type="spinner" size="16px"></van-loading>
        <span v-else @click="send()" slot="button" style="font-size:12px;color:#999">提交</span>
      </van-field>
    </div>
  </div>
</template>

<script>
import YQImg from '@/assets/img/YQ.jpg'
import { mapState } from 'vuex'
import io from 'socket.io-client'
export default {
  data () {
    return {
      loading: false, //
      YQImg, // jq头像
      value: '', // 输入内容
      list: [] // 聊天列表
    }
  },
  methods: {
    // 3. 发出消息
    async send () {
      if (!this.value) return false
      this.loading = true
      await this.$sleep(500)
      const obj = {
        msg: this.value,
        timestamp: Date.now()
      }
      // 发送消息 message固定写法
      this.socket.emit('message', obj)
      this.list.push(obj)
      // 滚动条 自动拉到底部
      this.scrollBottom()
      this.value = ''
      this.loading = false
    },
    scrollBottom () {
      // vue 数据变化 是 异步的
      // 内部的渲染 也是异步的
      // 需要等到 dom更新完毕后 才开始执行
      this.$nextTick(() => {
        this.$refs.myList.scrollTop = this.$refs.myList.scrollHeight
      })
    }
  },
  // 实例销毁前
  beforeDestroy () {
    // 5. 组件实例销毁前 把websocket连接关闭
    this.socket.close()
  },
  computed: {
    // 获取用户的 token 和 头像
    ...mapState(['photo', 'user'])
  },
  created () {
    // 1.打开websocket的连接
    // 传入 接口规定地址和参数
    this.socket = io('http://ttapi.research.itcast.cn', {
      query: {
        token: this.user.token
      }
    })
    // 2. 监听连接成功
    // connect 是固定的写法 表示当前已经建立连接成功
    this.socket.on('connect', () => {
      this.list.push({
        msg: '您需要什么帮助呢? 比如您可以说 : 讲个笑话、今天天气怎么样 ...',
        name: 'yq'
      })
    })
    // 4. 监听 消息返回
    this.socket.on('message', data => {
      this.list.push({ ...data, name: 'yq' })
      this.scrollBottom()
    })
  }
}
</script>

<style lang='less' scoped>
.container {
  height: 100%;
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  box-sizing: border-box;
  background:#fafafa;
  padding: 46px 0 50px 0;
  .chat-list {
    height: 100%;
    overflow-y: scroll;
    .chat-item{
      padding: 10px;
      .van-image{
        vertical-align: top;
        width: 40px;
        height: 40px;
      }
      .chat-pao{
        vertical-align: top;
        display: inline-block;
        min-width: 40px;
        max-width: 70%;
        min-height: 40px;
        line-height: 38px;
        border: 0.5px solid #c2d9ea;
        border-radius: 4px;
        position: relative;
        padding: 0 10px;
        background-color: #e0effb;
        word-break: break-all;
        font-size: 14px;
        color: #333;
        &::before{
          content: "";
          width: 10px;
          height: 10px;
          position: absolute;
          top: 12px;
          border-top:0.5px solid #c2d9ea;
          border-right:0.5px solid #c2d9ea;
          background: #e0effb;
        }
      }
    }
  }
}
.chat-item.right{
  text-align: right;
  .chat-pao{
    margin-left: 0;
    margin-right: 15px;
    &::before{
      right: -6px;
      transform: rotate(45deg);
    }
  }
}
.chat-item.left{
  text-align: left;
  .chat-pao{
    margin-left: 15px;
    margin-right: 0;
    &::before{
      left: -5px;
      transform: rotate(-135deg);
    }
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
}
</style>
