<template>
  <div>
    <div class="navbar">
      <hamburger id="hamburger-container" @toggleClick="toggleSideBar" :is-active="sidebar.opened" class="hamburger-container" />

      <breadcrumb id="breadcrumb-container" class="breadcrumb-container"></breadcrumb>

      <div class="right-menu">
        <template v-if="device !== 'mobile'">
          <search id="header-search" class="right-menu-item" style="position: relative; top: -5px"></search>
        </template>

        <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="click">
          <div class="avatar-wrapper">
            {{ username }}
            <i class="el-icon-caret-bottom"></i>
          </div>
          <el-dropdown-menu slot="dropdown">
            <router-link to="/user/info">
              <el-dropdown-item><span style="padding-left: 15px">个人信息</span></el-dropdown-item>
            </router-link>
            <span @click="changePassword">
              <el-dropdown-item><span style="padding-left: 15px">修改密码</span></el-dropdown-item>
            </span>
            <span @click="logout">
              <el-dropdown-item divided><span style="padding-left: 15px">退出登录</span></el-dropdown-item>
            </span>
          </el-dropdown-menu>
        </el-dropdown>

        <screenfull id="screenfull" class="right-menu-item hover-effect" style="margin-right: 10px"></screenfull>
      </div>
    </div>

    <change-password-dialog ref="changePassword"></change-password-dialog>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Hamburger from '@/components/Hamburger'
import Breadcrumb from '@/components/Breadcrumb'
import ChangePasswordDialog from './Dialog/ChangePasswordDialog'
import Search from '@/components/HeaderSearch'
import Screenfull from '@/components/Screenfull'

export default {
  components: {
    Hamburger,
    ChangePasswordDialog,
    Breadcrumb,
    Search,
    Screenfull
  },
  computed: {
    ...mapGetters(['sidebar', 'username', 'device', 'role'])
  },
  data() {
    return {}
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    async logout() {
      await this.$store.dispatch('user/fedLogOut')

      await this.$router.push({ path: '/login' })
      this.$message.success('退出登录成功')
    },
    changePassword() {
      this.$refs.changePassword.showChangePasswordDialog()
    }
  }
}
</script>

<style lang="scss" scoped>
.navbar {
  position: fixed;
  width: 100%;
  z-index: 5;

  background: #fff;

  border: 1px solid #d8dce5;

  height: 50px;
  line-height: 50px;
  border-radius: 0 !important;

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
    right: 0;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      padding: 0 8px;
      font-size: 12px;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgba(0, 0, 0, 0.025);
        }
      }
    }

    .avatar-container {
      margin-right: 30px;

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
          right: -20px;
          top: 20px;
          font-size: 12px;
        }
      }
    }
  }
}
</style>
