<template>
    <div class="container">
    <van-nav-bar left-arrow @click-left="$router.back()" title="编辑资料" right-text="保存"  @click-right="saveUserInfo"></van-nav-bar>
    <van-cell-group>
      <van-cell  @click="showPhoto=true" is-link title="头像"  center>
        <van-image
          slot="default"
          width="1.5rem"
          height="1.5rem"
          fit="cover"
          round
          :src="user.photo"
        />
      </van-cell>
      <van-cell is-link title="名称" @click="showName= true" :value="user.name" />
      <van-cell is-link title="性别" @click="showGender= true"  :value="user.gender===0?'男':'女'"/>
      <van-cell is-link title="生日" @click="showDate" :value="user.birthday" />
    </van-cell-group>
    <!-- 头像弹层 -->
    <van-popup v-model="showPhoto" style="width:80%">
      <van-cell is-link  @click="openFileDialog"  title="本地照片选择图片"></van-cell>
      <van-cell is-link title="拍照"></van-cell>
    </van-popup>

    <!-- 昵称弹层 -->
    <!-- :close-on-click-overlay="false" 禁用点击背景关闭弹层 -->
    <van-popup v-model="showName" :close-on-click-overlay="false" style="80%">
    <van-field :error-message="nameMsg" v-model.trim="user.name" type='textarea'  rows="4"></van-field>
    <van-button block  size='normal' @click="btnName">确定</van-button>
    </van-popup>

    <!-- 性别弹层 -->
    <van-action-sheet @select="selectItem" :actions="actions" v-model="showGender" cancel-text="取消"></van-action-sheet>

    <!-- 生日弹层 -->
    <van-popup v-model="showBirthDay" position="bottom">
      <van-datetime-picker
        v-model="currentDate"
        type="date"
        :min-date='minDate'
        :max-date="maxDate"
          @confirm="confirmDate"
          @cancel="showBirthDay=false"
      ></van-datetime-picker>
    </van-popup>

    <!-- 头像上传 -->
    <input type="file" ref="myfile" @change="upload" style="display:none">
  </div>
</template>

<script>
import dayjs from 'dayjs'
import { getUserProfile, updatePhoto, saveUserInfo } from '@/api/user'
export default {
  data () {
    return {
      showPhoto: false, // 头像弹层
      showName: false, // 姓名弹层
      showGender: false, // 性别弹层
      showBirthDay: false, // 生日弹层
      actions: [{ name: '男' }, { name: '女' }], // 性别数据
      minDate: new Date(1900, 1, 1), // 最小时间
      maxDate: new Date(), // 生日最大时间 永远是小于等于当前时间的
      currentDate: new Date(), // 当前时间
      nameMsg: '',
      user: {
        name: '', // 用户昵称
        gender: 1, // 性别默认值
        birthday: '', // 生日默认值
        photo: ''// 用户头像
      }
    }
  },
  methods: {
    // 昵称验证
    btnName () {
      if (this.user.name.length < 1 || this.user.name.length > 7) {
        this.nameMsg = '用户昵称不能小于一位,或大于七位'
        return
      }
      this.nameMsg = ''
      this.showName = false
    },
    // 性别验证
    selectItem (item, index) {
      this.user.gender = index
      this.showGender = false
    },
    // 生日选择
    showDate () {
      this.showBirthDay = true
      // 将当前的生日 设置到 选择日期的当前时间  将生日字符串 转化成Date对象 绑定到 日期组件上
      this.currentDate = new Date(this.user.birthday)
    },
    // 确认生日
    confirmDate () {
      this.user.birthday = dayjs(this.currentDate).format('YYYY-MM-DD')
      this.showBirthDay = false
    },
    // 获取个人资料
    async getUserProfile () {
      this.user = await getUserProfile()
    },
    // 头像上传
    openFileDialog () {
      // 触发input:file的click事件 触发事件就会弹出文件对话框
      this.$refs.myfile.click()
    },
    // 修改头像
    async upload (params) {
      const data = new FormData()
      data.append('photo', this.$refs.myfile.files[0])
      const result = await updatePhoto(data)
      this.user.photo = result.photo
      this.showPhoto = false
    },
    // 保存用户信息
    async saveUserInfo () {
      try {
        await saveUserInfo(this.user)
        this.$notify({ type: 'success', message: '保存成功' })
      } catch (error) {
        this.$notify({ message: '保存失败' })
      }
    }

  },
  created () {
    this.getUserProfile()
  }
}
</script>

<style>

</style>
