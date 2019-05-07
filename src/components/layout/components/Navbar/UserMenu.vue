<template>
  <div style="position:relative">
    <div class="avatar-container" @click.stop="changeUserBox">
      <div class="avatar-wrapper">
        <tmg-image :src="avatar" class="user-avatar"  width="72" height="72"></tmg-image>
        <div class="user-info">
          <div class="name">{{name}}</div>
        </div>
      </div>
      <div padding="0" class="user-box" v-if="boxVisible" data-menu>
        <div class="info">
          <div class="image">
            <tmg-image :src="avatar"  width="72" height="72"></tmg-image>
          </div>
          <div class="name">{{name}}</div>
        </div>
        <div class="action">
          <el-button type="primary" size="small" @click="logOut">退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { delToken } from '@/utils'
export default {
  data () {
    return {
      boxVisible: false
    }
  },
  computed: {
    name () {
      return this.$store.state.user.name
    },
    avatar () {
      return this.$store.state.user.avatar
    }
  },
  methods: {
    changeUserBox () {
      this.boxVisible = true
    },
    logOut () {
      delToken()
      window.location.href = '/tmg/login'
    }
  },
  created () {
    document.body.addEventListener('click', (e) => {
      this.boxVisible = false
    })
  }
}
</script>

<style lang="less" scoped>
  .avatar-container {
    height: 54px;
    padding-right: 30px;
    cursor: pointer;
    position: relative;
    .avatar-wrapper {
      height: 100%;
      position: relative;
      display: flex;
      align-items: center;
      .user-avatar {
        cursor: pointer;
        width: 34px;
        height: 34px;
        border-radius: 10px;
        border-radius: 50%;
        overflow: hidden;
      }
      .user-info{
        height: 34px;
        width: 100px;
        padding-left: 14px;
        .name{
          font-size: 14px;
          line-height: 20px;
        }
      }
      .el-icon-caret-bottom {
        cursor: pointer;
        position: absolute;
        right: -20px;
        top: 25px;
        font-size: 12px;
      }
    }
  }
  .user-box{
    height: 240px;
    width: 292px;
    display: block;
    position: absolute;
    right: 0;
    bottom: -240px;
    z-index: 1000;
    background: #ffffff;
    transition: 0.5s linear;
    .info{
      background: #494949;
      height: 183px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 24px;
      color: #fff;
      .image{
        height: 80px;
        width: 80px;
        border: 4px solid #fff;
        box-sizing: border-box;
        border-radius: 50%;
        margin: 0 auto;
        overflow: hidden;
        img{
          width: 100%;
          height: 100%;
        }
      }
      .name{
        font-size: 16px;
        line-height: 20px;
        margin-top: 8px;
        font-weight: bold;
      }
    }
    .action{
      text-align: center;
    }
  }
</style>
