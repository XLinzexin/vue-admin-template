<template>
  <div class="navbar">
    <hamburger :toggle-click="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container"/>
    <div class="right-menu">
      <!-- <language-toggle></language-toggle> -->
      <user-menu></user-menu>
    </div>
  </div>
</template>

<script>
import Hamburger from './Hamburger'
import UserMenu from './UserMenu'
const tagId = 'navBarStyle'
export default {
  components: {
    Hamburger,
    UserMenu
  },
  computed: {
    sidebar () {
      return this.$store.state.app.sidebar
    },
    style () {
      return this.$store.state.app.style
    }
  },
  watch: {
    style: function (oldVal, newVal) {
      this.setNavbarStyle(newVal.navBar)
    }
  },
  methods: {
    toggleSideBar () {
      this.$store.dispatch('toggleSideBar')
    },
    logout () {
      this.$store.dispatch('logOut').then(() => {
        location.reload()// In order to re-instantiate the vue-router object to avoid bugs
      })
    },
    setNavbarStyle (style) {
      const { backgroundColor, color } = style
      let styleTag = document.getElementById(tagId)
      if (!styleTag) {
        styleTag = document.createElement('style')
        styleTag.setAttribute('id', tagId)
        document.head.appendChild(styleTag)
      }
      styleTag.innerText = `
        .navbar{
          background:${backgroundColor};
          color:${color};
        }
      `
    }
  },
  created () {
    this.setNavbarStyle(this.style.navBar)
  }
}
</script>

<style lang="less" scoped>
@height: 54px;
.navbar {
  // min-height: @height;
  line-height: @height;
  border-radius: 0px !important;
  user-select: none;
  // overflow: hidden;
  &::after{
    content: '.';
    clear: both;
    height: 0;
    color: transparent;
    visibility: hidden;
    width: 100%
  }
  .hamburger-container {
    line-height: @height;
    height: @height;
    float: left;
    padding: 0 10px;
  }
  .breadcrumb-container{
    float: left;
  }
  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }
  .right-menu {
    width: 400px;
    height: @height;
    display: flex;
    justify-content: flex-end;
    float: right;
    background-color: inherit;
    &:focus{
     outline: none;
    }
    .right-menu-item {
      display: inline-block;
      margin: 0 8px;
    }
    .screenfull {
      height: 20px;
    }
    .international{
      vertical-align: top;
    }
    .theme-switch {
      vertical-align: 15px;
    }
  }
}
</style>
