<template>
  <div style="border: 1px solid #d8d8d8">
    <div class="charttable-title">
      <span class="title-text">{{ title }}</span>
    </div>
    <div class="charttable-w">
      <div :style="{ 'min-height': minHeight }" class="diagram">
        <slot></slot>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Panel',
  props: {
    title: {
      type: String
    },
    minHeight: {
      type: String,
      default: '700px'
    }
  }
}
</script>

<style scoped>
.charttable-title {
  background: #f6f6f6;
  line-height: 24px;
  position: relative;
  padding-left: 10px;
  padding-top: 8px;
  padding-bottom: 8px;
  min-width: 100px;
  font-size: 12px;
  color: #666;
}

.title-text {
  margin-right: 54px;
  min-width: 50px;
  display: block;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.charttable-w {
  margin: 0;
  overflow-x: hidden;
  overflow-y: auto;
  background: #fff;
}

.diagram > div {
  border: 0 !important;
}
</style>
