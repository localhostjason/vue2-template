<template>
  <div>
    <panel-title title="个人信息"></panel-title>

    <el-row>
      <el-col :span="8">
        <fieldset>
          <h5 style="margin-bottom: 10px; font-size: 13px">基本信息</h5>

          <el-form :model="baseForm" :rules="baseRules" ref="baseForm" label-width="120px">
            <el-form-item label="账号名:">
              <span>{{ userInfo.username }}</span>
            </el-form-item>
            <el-form-item label="描述:" prop="description">
              <el-input type="textarea" v-model="baseForm.description" :autosize="{ minRows: 4 }"></el-input>
            </el-form-item>
          </el-form>
        </fieldset>
      </el-col>
    </el-row>

    <div class="top-line" style="margin: 20px 0"></div>

    <el-button v-waves type="primary" style="margin-left: 120px" @click="saveUserInfo">保 存</el-button>
  </div>
</template>

<script>
import PanelTitle from '@/components/PanelTitle/PanelTitle'
import { getUserInfo, updateSelfUserInfo } from '@/api/auth/user'
import _ from 'lodash'
import waves from '@/directive/waves'

export default {
  name: 'index',
  components: {
    PanelTitle
  },
  directives: {
    waves
  },
  data() {
    return {
      userInfo: {},
      baseForm: {
        description: null
      },
      baseRules: {
        // nickname: {required: true, message: '请输入用户昵称', trigger: ['blur', 'change']},
      }
    }
  },
  created() {
    this.getUserInfo()
  },
  methods: {
    async getUserInfo() {
      try {
        const response = await getUserInfo()
        this.userInfo = response
        this.baseForm = _.pick(response, Object.keys(this.baseForm))
      } catch (e) {}
    },

    saveUserInfo() {
      updateSelfUserInfo(this.baseForm).then(response => {
        this.$message.success('修改个人信息成功')
      })
    }
  }
}
</script>

<style scoped></style>
