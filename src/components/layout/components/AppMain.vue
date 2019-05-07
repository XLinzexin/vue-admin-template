<template>
  <div class="app-main-wrapper">
    <el-scrollbar wrap-class="main-scrollbar-wrapper" view-style="min-height:100%;position:relative;" id="app-main" ref="appScroller">
      <section class="app-main" style="min-width:1000px">
        <div>
          <transition name="fade-transform" mode="out-in">
            <router-view :key="key"/>
          </transition>
        </div>
      </section>
    </el-scrollbar>
  </div>
</template>

<script>
import { shadeColor } from '@/utils/style'

const tagId = 'contentStyle'
export default {
  name: 'AppMain',
  computed: {
    style () {
      return this.$store.state.app.style
    },
    key () {
      return this.$route.fullPath
    }
  },
  watch: {
    style: function (oldVal, newVal) {
      this.setContentStyle(newVal.content)
    }
  },
  methods: {
    setContentStyle (style) {
      const { backgroundColor, backgroundImage, backgroundColorDeep } = style.content
      let styleTag = document.getElementById(tagId)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', tagId)
        document.head.appendChild(styleTag)
      }
      const navBarBackgroundColor = style.navBar.backgroundColor
      const navBarColor = style.navBar.color
      const navBarActiveColor = style.navBar.activeColor

      const headerBarBackgroundColor = style.headerBar.backgroundColor
      const headerBarColor = style.headerBar.color
      styleTag.innerText = `
        .main-scrollbar-wrapper {
          background-size:100% 100%;
          ${backgroundImage ? 'background-image:url(' + backgroundImage + ');' : backgroundColorDeep ? 'background-image:' + 'linear-gradient(' + backgroundColor + ',' + backgroundColorDeep + ');' : 'background-color:' + backgroundColor + ';'}
        }
        .scrollbar-wrapper{
          background-color: ${navBarBackgroundColor} !important;
        }
        #app .sidebar-container .el-menu{
          background-color: ${navBarBackgroundColor} !important;
          color: ${navBarColor} !important;
        }
        #app .sidebar-container .el-menu-item.is-active{
          color: ${navBarColor} !important;
        }
        #app .sidebar-container .el-menu-item.is-active{
          color: ${navBarActiveColor} !important;
        }
        #app .sidebar-container .el-menu-item,#app .sidebar-container .el-submenu__title{
          background-color: ${navBarBackgroundColor} !important;
          color: ${navBarColor} !important;
        }
        #app .sidebar-container .nest-menu .el-submenu > .el-submenu__title, #app .sidebar-container .el-submenu .el-menu-item.is-active{
          background-color: ${shadeColor(navBarBackgroundColor.slice(1, navBarBackgroundColor.length), 0.1)} !important;
        }
        .navbar-popper{
        }
        .navbar-popper .el-menu--popup{
          padding:0 !important;
          min-width:100px !important;
          overflow:hidden;
          background-color: ${shadeColor(navBarBackgroundColor.slice(1, navBarBackgroundColor.length), 0.2)} !important;
        }
        .navbar-popper .el-menu--popup .el-menu-item{
          height:32px;
          line-height:32px;
          background-color: ${shadeColor(navBarBackgroundColor.slice(1, navBarBackgroundColor.length), 0.2)} !important;
          font-size: 12px;
        }

        .navbar{
          background-color: ${headerBarBackgroundColor} !important;
          color: ${headerBarColor} !important;
        }
        .officail_account_wrapper .officail_account.active{
          background-color: ${shadeColor(navBarBackgroundColor.slice(1, navBarBackgroundColor.length), 0.2)} !important;
        }
        .navbar .action-item:focus{
          background-color: ${shadeColor(navBarBackgroundColor.slice(1, navBarBackgroundColor.length), 0.2)} !important;
        }
      `
    }
  },
  created () {
    this.setContentStyle(this.style)
  },
  mounted () {
    window.appScroller = this.$refs.appScroller
  }
}
</script>

<style scoped>
.app-main-wrapper{
  /* height: calc(100vh - 54px); */
  width: 100%;
}
.app-main {
  box-sizing: border-box;
  padding: 27px;
}
</style>
