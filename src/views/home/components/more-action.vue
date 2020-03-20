<template>
<!-- 外层元素 -->
  <div class="more-action">
      <!-- 单元格组 1 -->
      <van-cell-group v-if="!isReport">
          <!-- 不感兴趣接口 -->
          <van-cell>不感兴趣</van-cell>
          <van-cell is-link  @click="isReport=true">反馈垃圾内容</van-cell>
          <van-cell>拉黑作者</van-cell>
      </van-cell-group>
      <!-- 单元格组2 -->
      <van-cell-group v-else>
          <van-cell icon="arrow-left" @click="isReport=false">返回</van-cell>
          <van-cell v-for="item in reports" :key="item.value">{{item.label}}</van-cell>

      </van-cell-group>
  </div>
</template>

<script>
import { reports } from '@/api/constants'
export default {
  data () {
    return {
      isReport: false,
      reports // 定义 反馈列表
    }
  }
}
</script>

<style lang='less' scoped>
.more-action {
  border-radius: 4px;
}
</style>
