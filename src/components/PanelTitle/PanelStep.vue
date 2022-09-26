<template>
  <el-row>
    <el-col :span="24">
      <div style="height: 20px; margin-top: 20px">
        <div class="bline-dotted">
          <div class="category-index">{{ num }}</div>
          <div class="category-name">{{ title }}</div>
        </div>
      </div>
    </el-col>
  </el-row>
</template>

<script>
export default {
  name: 'PanelStep',
  props: {
    num: {
      type: [String, Number],
      required: true,
      default: 1
    },
    title: {
      type: String
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
.bline-dotted {
  border-bottom: 1px dotted #000;
}

.category-index {
  position: absolute;
  padding-top: 5px;
  text-align: center;
  color: #fff;
  font-size: 14px;
  left: 0;
  top: 6px;
  width: 26px;
  height: 26px;
  background: #0099ff;
  border-radius: 50px;
}

.category-name {
  position: absolute;
  left: 26px;
  font-size: 13px;
  top: 4px;
  background: #fff;
  height: 28px;
  padding: 8px 8px;
  color: #555555;
}
</style>
