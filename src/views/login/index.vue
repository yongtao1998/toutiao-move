<template>
     <div class='container'>
    <!-- 导航 显示返回箭头-->
    <van-nav-bar title='登录'  left-arrow @click-left="$router.back()"></van-nav-bar>
    <div class="main">
      <!-- 登陆布局 -->
     <div class="head">
       <div class="left" >
         <img src="../../assets/img/logo.jpg" alt="">
       </div>
       <div class="right">
         账号登录
       </div>
     </div>
    <div class="sj"> <p>登录即表示同意“用户协议”和“隐私数据”</p></div>
    </div>
    <div class="bd">
      <van-cell-group>
      <van-field @blur="checkMobile" :error-message="errorMessage.mobile" v-model.trim="loginFrom.mobile" label="手机号" placeholder="请输入手机号"></van-field>
      <van-field @blur="ckeckCode" :error-message="errorMessage.code" v-model.trim="loginFrom.code" label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    </div>

    <div class="xxx">
      <div class="tb">
        <van-button @click="login" block round  size="small" color="#ccc" plain type="info">登录</van-button></div>
    </div>
  </div>

</template>

<script>
import { login } from '@/api/user'
import { mapMutations } from 'vuex'
export default {
  data () {
    return {
      loginFrom: {
        // mobile: '',
        mobile: '18454778830',
        // code: ''
        code: '246810'
      },
      errorMessage: {
        mobile: '',
        code: ''
      }
    }
  },
  methods: {
    ...mapMutations(['updateUser']),
    // 手机号格式校验
    checkMobile () {
      if (!this.loginFrom.mobile) {
        this.errorMessage.mobile = '手机号不得为空'
        return false
      }
      if (!/^1[3-9]\d{9}$/.test(this.loginFrom.mobile)) {
        this.errorMessage.mobile = '手机号格式不正确'
        return false
      }
      this.errorMessage.mobile = ''
      return true
    },
    // 验证码格式验证
    ckeckCode () {
      if (!this.loginFrom.code) {
        this.errorMessage.code = '验证码不得为空'
        return false
      }
      if (!/^\d{6}$/.test(this.loginFrom.code)) {
        this.errorMessage.code = '验证码必须为六位数字'
        return false
      }
      this.errorMessage.code = ''
      return true
    },
    // 登录校验
    async login () {
      const validateMobile = this.checkMobile()
      const validateCode = this.ckeckCode()
      if (validateMobile && validateCode) {
        try {
          // 发送请求 获取到token 存入到vuex中
          const result = await login(this.loginFrom)
          this.updateUser({ user: result })
          // 分析 是否存在 query参数 来决定跳转路径
          const { redirectUrl } = this.$route.query
          this.$router.push(redirectUrl || '/')
        } catch (error) {
          this.$notify({ message: '用户名密码错误' })
        }
      }
    }
  }

}
</script>

<style lang="less" scoped>
.main{
  margin-top: 20px;
  padding: 0 20px;
  width: 100%;
  height: 100%;
  .head{
    width: 100%;
    height: 30px;

    .left{
      width: 0.8rem;
      height: 100%;
      float: left;
     img {
        width: 30px;
        height: 25px;
      }
    }
      .right{
        margin-left: 10px;
          float: left;
          height: 100%;
          line-height: 30px;
          font-size: 18px;
      }

  }
}
    .sj {
        width: 100%;
        padding-left: 5px;
        color: #979797;
        font-size: 12px;
        }
    .bd{
      padding: 0 20px;
      margin-top: 20px;
    }
    .xxx{
      padding: 0 20px;
      text-align:center;
      margin-top: 30px;
    }
    .tb{
      display: inline-block;

    }
</style>
