<template>
  <el-row>
    <div class="console-title clearfix" style="min-height: 50px" :class="isLine ? 'bline' : ''">
      <div class="pull-left">
        <h4>{{ title }}</h4>
        <el-button size="mini" class="btn-small" v-if="isShowHistory" @click="goHistory">
          <span class="icon-toinstlist"></span>
          <span>{{ reTitle }}</span>
        </el-button>
      </div>
    </div>
  </el-row>
</template>

<script>
export default {
  name: 'PanelTitle',
  props: {
    title: {
      type: String,
      required: true,
      default: 'title'
    },
    isLine: {
      type: [Boolean, String],
      default: false
    },
    isShowHistory: {
      type: Boolean,
      default: false
    },
    reTitle: {
      type: String,
      default: 'title'
    },
    goRouter: {
      type: String,
      default: ''
    },
    routerObj: {
      type: Object,
      default: () => {}
    }
  },
  methods: {
    goHistory() {
      if (!this.goRouter) {
        this.$router.go(-1)
      } else {
        const default_route = { name: this.goRouter }
        this.$router.push({ ...default_route, ...this.routerObj })
      }
    }
  }
}
</script>

<style scoped>
.console-title:not(.bline) {
  margin-bottom: -10px;
}

.console-title {
  padding: 16px 0;
  min-height: 48px;
}

.pull-left {
  float: left;
}

.console-title h1,
.console-title h2,
.console-title h3,
.console-title h4,
.console-title h5,
.console-title h6 {
  display: inline-block;
  text-indent: 8px;
  border-left: 3px solid #39f;
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 8px;
  vertical-align: top;
  font-weight: 700;
  color: #555;
  font-size: 18px;
}

.margin-bottom-10 {
  margin-bottom: 10px;
}

.icon-toinstlist {
  width: 12px;
  height: 12px;
  display: inline-block;
  vertical-align: middle;
  background: url('~@/assets/toinstlist.png') center 1px no-repeat;
}

.btn-small {
  padding: 5px 5px;
  height: 20px;
  line-height: 9px;
  margin-top: 2px;
}
</style>
