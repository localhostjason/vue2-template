<template>
  <el-scrollbar wrap-class="scrollbar-wrapper">
    <div class="sidebar-header">
      <!--<i class="fa fa-skyatlas" :style="'color: white;'{isCollapse ? 'font-size: 40px;padding: 0 10px': ''}"></i>-->
      <i :class="[!isCollapse ? 'show_log' : 'hide_log', 'el-icon-monitor']"></i>
      <span v-show="!isCollapse">VUE2</span>
    </div>

    <el-menu
      :show-timeout="200"
      :default-active="$route.path"
      :collapse="isCollapse"
      mode="vertical"
      unique-opened
      background-color="#304156"
      text-color="#bfcbd9"
      active-text-color="#409EFF"
    >
      <sidebar-item v-for="route in permission_routers" :key="route.name" :item="route" :base-path="route.path" />
    </el-menu>
  </el-scrollbar>
</template>

<script>
import { mapGetters } from 'vuex'
import SidebarItem from './SidebarItem'

export default {
  components: { SidebarItem },
  computed: {
    ...mapGetters(['permission_routers', 'sidebar']),
    isCollapse() {
      return !this.sidebar.opened
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
@import '../../../../styles/mixin.scss';
@import '../../../../styles/variables';

.sidebar-container {
  .el-menu {
    height: calc(100% - 50px) !important;
  }
}

.show_log {
  font-size: 35px;
  padding: 0 10px;
  color: #ffffff;
}

.hide_log {
  font-size: 20px;
  position: relative;
  right: -3px;
  color: #ffffff;
  top: 10px;
}

.sidebar-header {
  @include backGround($blue);
  border-bottom: 1px solid #333;
  width: 100%;
  height: 50px;
  padding: 5px 10px;

  span {
    color: #ffffff;
    font-size: 20px;
    position: absolute;
    left: 75px;
    top: 13px;
  }
}
</style>

<style rel="stylesheet/scss" lang="scss">
.router-link-active {
  .el-menu-item {
    color: rgb(64, 158, 255) !important;
  }
}
</style>
