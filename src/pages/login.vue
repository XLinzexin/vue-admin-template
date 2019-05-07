<template>
  <div>
    <div>
      <div class="login-bg">
        <tmg-image src="http://img.gz.wechatify.net/bootdiagnostics-wechatify-cc96dee1-f1fb-4bcb-8700-d5b9009f7067/2019-03-05/SLcEMb5g1xkjcvZytP2qYmp70PM7o4vxATBdOFmx.png" draggable="false"/>
      </div>
      <div class="login-section">
        <div style="text-align: center;">
          <tmg-image src="http://img.gz.wechatify.net/bootdiagnostics-wechatify-cc96dee1-f1fb-4bcb-8700-d5b9009f7067/common/wechatify.png" draggable="false" />
          <div class="logo-text">Social CRM</div>
        </div>
        <div class="login-content">
          <div class="login-content-title">登录</div>
          <div class="input-item">
            <input v-model="email" type="text" placeholder="邮箱">
            <i class="el-icon-error" v-if="email" @click="email = ''"></i>
          </div>
          <div class="input-item">
            <input v-model="password" type="password" placeholder="密码">
            <i class="el-icon-error" v-if="password" @click="password = ''"></i>
            <span>忘记密码？</span>
          </div>
          <div>
            <el-button @click="login" class="login-btn" type="success">登录</el-button>
          </div>
          <div class="logon-tips">请到PC端绑定公众号并操作</div>
          <!--<div class="logon-tips">没有Wechatify-CRM系统账号？<span>立即注册</span></div>-->
        </div>
        <div class="login-footer-msg">© 2019 TMG Worldwide. All rights reserved.</div>
      </div>
    </div>
  </div>
</template>

<script>
import { setToken } from '../utils'
export default {
  name: 'login',
  data () {
    return {
      email: 'c@test.com',
      password: '1234asdf',
      index: 0
    }
  },
  methods: {
    async login () {
      if (!this.checkInput()) return false
      const res = await this.$axios.prevent().post('/login', {
        email: this.email,
        password: this.password
      })
      if (res.errcode === 0) {
        setToken(res.data)
        // this.$router.replace({ path: '/' })
        window.location.href = '/'
      }
    },
    checkInput () {
      if (!this.email || !this.password) {
        this.$message('请输入账户密码')
        return false
      }
      return true
    }
  },
  created () {
  }
}
</script>

<style lang="less" scoped>
.login-bg {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  z-index: -1;
  img {
    width: 100%;
    height: 100%;
  }
}
.login-section {
  width: 100%;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  .logo-text {
    display: inline-block;
    background: white;
    font-size: 20px;
    font-weight: 500;
    color: #192233;
    padding: 8px 18px;
    border-radius: 23px;
    margin-top: 11px;
    margin-bottom: 35px;
  }
  .login-content {
    width: 360px;
    background: white;
    border-radius: 7px;
    padding: 28px;
    .login-content-title {
      font-size: 17px;
      font-weight: bold;
      color: #1A2232;
      margin-bottom: 11px;
    }
    .input-item:hover .el-icon-error{
      opacity: 1!important;
    }
    .input-item:focus .el-icon-error{
      opacity: 1!important;
    }
    .input-item {
      width: 100%;
      border-radius: 6px;
      border: 1px solid #C9C9C9;
      font-size: 14px;
      padding: 8px;
      margin-bottom: 16px;
      color: #1A2232;
      display: flex;
      align-items: center;
      span {
        color: #C9C9C9;
        cursor: pointer;
        display: inline-block;
        margin-left: 15px;
      }
      input {
        width: 200px;
        font-size: 14px;
        border: none;
        outline: none;
        flex: 1;
      }
      input:focus .el-icon-error{
        opacity: 1!important;
      }
      .el-icon-error {
        opacity: 0;
        color: #C9C9C9;
        font-size: 13px;
        cursor: pointer;
        margin: 0px 5px;
        position: relative;
        top: 1px;
      }
    }
    .login-btn {
      width: 100%;
      margin-bottom: 20px;
    }
    .logon-tips {
      color: #8E8E8E;
      text-align: center;
      font-size: 13px;
      span {
        color: #1EC07A;
        cursor: pointer;
        text-decoration: underline #1EC07A;
      }
    }
  }
  .login-footer-msg {
    color: white;
    font-size: 14px;
    font-weight: bold;
    margin-top: 18px;
  }
}
</style>
