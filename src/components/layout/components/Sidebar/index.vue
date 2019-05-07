<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="tmg-logo">
      <tmg-image :src="style.logo||style.navBar.logo"></tmg-image>
    </div>
    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.path" :item="route" :base-path="route.path"/>
    </el-menu>
  </el-scrollbar>
</template>

<script>
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    style () {
      return this.$store.state.app.style
    },
    permission_routers () {
      return this.$store.state.permission.addRouters
    },
    sidebar () {
      return this.$store.state.app.sidebar
    },
    isCollapse () {
      return !this.sidebar.opened
    }
  }
}
</script>

<style lang="less">
  @import "./side.less";
  .tmg-logo{
    margin: 12px auto;
    width: 138px;
    height: 40px;
    display: flex;
    align-items: center;
    img{
      width: 100%;
    }
  }
</style>
