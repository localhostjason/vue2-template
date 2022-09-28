<template>
  <div>
    <div class="navbar">
      <div class="logo">
        <template>
          <i class="el-icon-monitor"></i>
          <span>Test</span>
        </template>
      </div>

      <el-menu :default-active="$route.path" mode="horizontal" background-color="#1b1d20" text-color="#ccc" active-text-color="#fff">
        <el-menu-item
          v-for="item in menus"
          :key="item.path"
          :index="item.path"
          :class="activeMenu === item.name ? 'is-real-active' : ''"
          class="menuOne"
          v-if="!item.hidden && item.children.length && item.show"
        >
          <div class="without-dropdown" v-if="item.meta.click" @click="showPath(item.name, item.name)">
            <span class="el-dropdown-link">
              <svg-icon :icon-class="item.meta.icon"></svg-icon>
              <span>{{ item.meta.title }}</span>
            </span>
          </div>
          <el-dropdown diabled placement="bottom" :show-timeout="show_timeout">
            <span class="el-dropdown-link">
              <svg-icon :icon-class="item.meta.icon"></svg-icon>
              <span>{{ item.meta.title }}</span>
              <i class="el-icon-caret-bottom el-icon--right"></i>
            </span>

            <el-dropdown-menu slot="dropdown">
              <div v-for="child_route in item.children" :key="child_route.name">
                <div v-if="!child_route.hidden">
                  <!--  二级菜单是否存在 -->
                  <el-dropdown-item v-if="isOkSecondMenu(child_route)" :divided="child_route.meta.divided" :class="isActiveSecondMenu(child_route)">
                    <span @click="showPath(child_route.name, item.name)">
                      {{ child_route.meta.title }}
                    </span>
                  </el-dropdown-item>
                </div>
              </div>
            </el-dropdown-menu>
          </el-dropdown>
        </el-menu-item>
      </el-menu>

      <div class="right-menu">
        <search id="header-search" class="right-menu-item" style="position: relative; top: -5px"></search>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover" placement="bottom" :show-timeout="show_timeout">
          <div class="avatar-wrapper">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown" style="width: 90px !important">
            <router-link to="/user/info">
              <el-dropdown-item><span>个人信息</span></el-dropdown-item>
            </router-link>
            <span @click="changePassword">
              <el-dropdown-item><span>修改密码</span></el-dropdown-item>
            </span>
            <span @click="logout">
              <el-dropdown-item divided><span>退出登录</span></el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>

        <template v-if="device !== 'mobile'" class="right-menu-item">
          <screen-full id="screenfull" class="right-menu-item hover-effect"></screen-full>
        </template>
      </div>
    </div>
    <change-password-dialog ref="changePassword"></change-password-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import ChangePasswordDialog from './Dialog/ChangePasswordDialog'
import Search from '@/components/HeaderSearch'
import ScreenFull from '@/components/Screenfull'
import path from 'path'

export default {
  components: {
    ChangePasswordDialog,
    Search,
    ScreenFull
  },
  computed: {
    ...mapGetters(['sidebar', 'username', 'device', 'role', 'permission_routers', 'activeMenu']),

    route_name() {
      return this.$route.name
    }
  },
  data() {
    return {
      show_timeout: 0,

      menus: []
    }
  },
  created() {
    this.generateMenu()
  },
  methods: {
    isOkSecondMenu(child_route) {
      const hasRedirect = child_route.redirect && child_route.children.length > 0 && child_route.children.filter(item => !item.hidden).length > 0
      return hasRedirect || !child_route.redirect
    },
    isActiveSecondMenu(child_route) {
      let isActive = false
      if (child_route.children) {
        isActive = child_route.children.map(dd => dd.name).includes(this.route_name)
      } else {
        isActive = child_route.name === this.route_name
      }
      return isActive ? 'is-active' : ''
    },

    showPath(name, basename) {
      console.log(name, this.$route.name)
      this.$store.dispatch('app/changeActiveMenu', basename)
      this.$router.push({
        name: name
      })
    },
    generateMenu() {
      this.menus = []
      let permissions = this.permission_routers.filter(item => !item.hidden)

      permissions.forEach(permission => {
        if (permission.redirect && permission.children.length === 0) {
          permission.show = false
        } else if (permission.children.length > 0) {
          // 2级菜单
          let show = permission.children.filter(item => !item.hidden)

          // 3级菜单，全部 hidden, 1级菜单hidden 反之 show
          let hideR = []
          for (const info of show) {
            if (info.hidden) {
              continue
            }
            if (!info.hasOwnProperty('children')) {
              hideR.push(info)
            } else {
              if (info.children && info.children.filter(route => !route.hidden).length > 0) {
                hideR.push(info)
              }
            }
          }
          permission.show = Boolean(hideR.length)
        } else {
          console.log('else')
        }
      })
      // console.log("permissions:", permissions);
      this.menus = permissions
    },
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      try {
        await this.$store.dispatch('user/fedLogOut')
        await this.$store.dispatch('permission/removeActiveMenuOne')

        await this.$router.push(`/login`)
        this.$message.success('退出登录成功')
      } catch (e) {
        await this.$router.push(`/login`)
      }
    },
    changePassword() {
      this.$refs.changePassword.showChangePasswordDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
@import '@/styles/tb.scss';

.menuOne {
  cursor: pointer;

  &.active {
    background: #dddddd;
  }
}

.navbar {
  position: fixed;
  width: 100%;
  z-index: 100;
  display: flex;
  //  #fff
  // background: #3d4f67;
  background-color: #1b1d20;
  //#d8dce5
  // border: 1px solid #3d4f67;

  height: 56px;
  line-height: 56px;
  overflow: hidden;
  border-radius: 0 !important;

  .logo {
    float: left;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    margin-left: 24px;
    padding-right: 60px;
    color: #fff;
    cursor: pointer;

    .fa {
      font-size: 35px;
      display: block;
      margin-right: 5px;
    }

    span {
      font-size: 20px;
    }

    .waf-logo {
      width: 92px;
      height: 60px;
    }
  }

  ::v-deep(.el-menu) {
    box-sizing: border-box;

    .el-menu-item {
      height: 55px;
      box-sizing: border-box;
      padding-left: 15px;
      padding-right: 15px;
      line-height: 55px !important;

      .svg-icon {
        margin-right: 6px;
        width: 18px;
        height: 18px;
      }

      .el-icon--right {
        width: auto;
        margin-right: 0px;
        margin-left: 6px;
      }

      .without-dropdown {
        margin-right: -24px;
      }
    }

    .el-dropdown-link {
      color: #ccc;
      display: flex;
      align-items: center;

      i {
        font-size: 12px;
      }
    }

    .el-dropdown-link:hover {
      color: #fff;
    }

    .el-menu-item.is-active {
      border-bottom-color: #1b1d20 !important;
    }

    .el-menu-item.is-real-active {
      border-width: 4px !important;
      background-color: #000 !important;
      border-bottom-color: #409eff !important;

      .el-dropdown-link {
        color: #fff;
      }
    }
  }

  .el-menu.el-menu--horizontal {
    border-bottom: 1px solid #1b1d20;
  }

  .hamburger-container {
    line-height: 46px;
    height: 100%;
    float: left;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgba(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    position: fixed;
    right: 12px;
    top: 0;
    line-height: 56px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 12.5px;
      font-size: 12px;
      // #5a5e66
      color: #cccccc;

      &:hover {
        color: #fff;
      }

      &.router-link-active {
        color: #fff;
      }

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 15px;

      .avatar-wrapper {
        position: relative;

        .user-avatar {
          cursor: pointer;
          width: 40px;
          height: 40px;
          border-radius: 10px;
        }

        .el-icon-caret-bottom {
          cursor: pointer;
          position: absolute;
          right: -14px;
          top: 23px;
          font-size: 12px;
        }
      }
    }

    .warning-con {
      i {
        font-size: 20px;
      }

      // color: rgb(155, 156, 158);
      .badge {
        // width: 30px;
        // padding: 0px 6px;
        // height: 20px;
        // border-radius: 10px;
        // background: rgb(245, 108, 108);
        // text-align: center;
        // color: #fff;
        width: 8px;
        height: 8px;
        background-color: rgb(245, 108, 108);
        border-radius: 4px;
        display: inline-block;
        margin-bottom: 4px;
        margin-left: -2px;
      }
    }
  }
}
</style>
