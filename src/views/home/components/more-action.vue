<template>
<!-- 外层元素 -->
  <div class="more-action">
      <!-- 单元格组 1 -->
      <van-cell-group v-if="!isReport">
          <!-- 不感兴趣接口 -->
          <van-cell @click="$emit('dislike')">不感兴趣</van-cell>
          <van-cell is-link  @click="isReport=true">反馈垃圾内容</van-cell>
          <van-cell @click="$emit('blacklist')">拉黑作者</van-cell>
      </van-cell-group>
      <!-- 单元格组2 -->
      <van-cell-group v-else>
          <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
          <van-cell @click="$emit('report',item.value)" v-for="item in reports" :key="item.value">{{item.label}}</van-cell>

      </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants'
import eventBus from '@/utils/eventBus'
export default {
  data () {
    return {
      isReport: false,
      reports // 定义 反馈列表
    }
  },
  created () {
    eventBus.$on('delArticle', () => (this.isReport = false)) // 只要一开始删除 我就把弹层中反馈组件重置为初始状态
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
