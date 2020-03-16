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
      <van-field label="手机号" placeholder="请输入手机号"></van-field>
      <van-field label="验证码" placeholder="请输入验证码">
        <van-button slot="button" size="small" type="primary">发送验证码</van-button>
      </van-field>
    </van-cell-group>
    </div>

    <div class="xxx">
      <div class="tb">
        <van-button block round  size="small" color="#ccc" plain type="info">登录</van-button></div>
    </div>
  </div>

</template>

<script>
export default {

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
