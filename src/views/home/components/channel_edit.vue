<template>
  <div class="channel-edit">
    <div class="channel">
      <div class="tit">
        我的频道：
        <span class="tip">点击可进入频道</span>
        <van-button v-if="!editing" @click="editing=true" size="mini" type="info" plain>编辑</van-button>
        <van-button v-else @click="editing=false" size="mini" type="danger" plain>完成</van-button>
      </div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="(channel,index) in channels" :key="channel.id">
            <!-- 传出当前点击的下标   根据传过来的下标激活 特定样式 -->
          <span @click="$emit('selectChannel',index)" :class="{red:index===activeIndex}" class="f12">{{channel.name}}</span>
          <!-- 默认 第一个不可修改 -->
          <van-icon v-if="index&&editing"  @click="$emit('delChannel',channel.id)" class="btn" name="cross"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
    <!-- 可选频道数据 是当前用户自己的频道  -->
    <div class="channel">
      <div class="tit">可选频道：</div>
      <van-grid class="van-hairline--left">
        <van-grid-item v-for="channel in optionalChannels" :key="channel.id">
          <span class="f12">{{channel.name}}</span>
          <van-icon class="btn" name="plus"></van-icon>
        </van-grid-item>
      </van-grid>
    </div>
  </div>
</template>

<script>
import { getAllChannels } from '@/api/channels'
export default {
  props: {
    //   传入频道列表
    channels: {
      required: true,
      type: Array,
      default: () => []
    },
    // 传入 当前点击频道
    activeIndex: {
      required: true,
      type: Number,
      default: 0
    }
  },
  data () {
    return {
      editing: false,
      allChannels: []
    }
  },
  methods: {
    // 获取全部频道
    async getAllChannels () {
      const data = await getAllChannels()
      this.allChannels = data.channels
    }
  },
  computed: {
    //  获取 可选频道 = 全部频道 -我的频道
    optionalChannels () {
      return this.allChannels.filter(item => !this.channels.some(o => o.id === item.id))
    }
  },
  created () {
    this.getAllChannels()
  }
}
</script>

<style lang='less' scoped>
.channel-edit {
  .channel {
    padding: 10px;
    .tit {
      line-height: 3;
      .tip {
        font-size: 10px;
        color: #999;
      }
    }
    .van-button {
      float: right;
      margin-top: 7px;
    }
    .btn {
      position: absolute;
      bottom: 0;
      right: 0;
      background: #ddd;
      font-size: 12px;
      color: #fff;
    }
    .f12 {
      font-size: 12px;
      color: #555;
    }
    .red {
      color: red;
    }
  }
}
</style>
