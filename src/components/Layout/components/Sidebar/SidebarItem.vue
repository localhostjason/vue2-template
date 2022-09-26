<template>
  <div v-if="!item.hidden && item.children && item.children.filter(v => !v.hidden).length" class="menu-wrapper">
    <router-link v-if="hasOneShowingChild(item.children) && !onlyOneChild.children" :to="resolvePath(onlyOneChild.path)">
      <el-menu-item :index="resolvePath(onlyOneChild.path)" :class="{ 'submenu-title-noDropdown': !isNest }">
        <svg-icon v-if="onlyOneChild.meta && onlyOneChild.meta.icon" :icon-class="onlyOneChild.meta.icon" />
        <span v-if="onlyOneChild.meta && onlyOneChild.meta.title" slot="title">{{ onlyOneChild.meta.title }}</span>
      </el-menu-item>
    </router-link>

    <el-submenu v-else :index="item.name || item.path">
      <template slot="title">
        <svg-icon v-if="item.meta && item.meta.icon" :icon-class="item.meta.icon" />
        <span v-if="item.meta && item.meta.title" slot="title">{{ item.meta.title }}</span>
      </template>

      <template v-for="child in item.children" v-if="!child.hidden">
        <sidebar-item
          v-if="child.children && child.children.length > 0"
          :is-nest="true"
          :item="child"
          :key="child.path"
          :base-path="resolvePath(child.path)"
          class="nest-menu"
        />

        <router-link v-else :to="resolvePath(child.path)" :key="child.name">
          <el-menu-item :index="resolvePath(child.path)">
            <svg-icon v-if="child.meta && child.meta.icon" :icon-class="child.meta.icon" />
            <span v-if="child.meta && child.meta.title" slot="title">{{ child.meta.title }}</span>
          </el-menu-item>
        </router-link>
      </template>
    </el-submenu>
  </div>
</template>

<script>
import path from 'path'

export default {
  name: 'SidebarItem',
  props: {
    // route object
    item: {
      type: Object,
      required: true
    },
    isNest: {
      type: Boolean,
      default: false
    },
    basePath: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      onlyOneChild: null
    }
  },
  methods: {
    // 只有一個children route
    hasOneShowingChild(children) {
      const showingChildren = children.filter(item => {
        if (item.hidden) {
          return false
        } else {
          // temp set(will be used if only has one showing child )
          this.onlyOneChild = item
          return true
        }
      })
      return showingChildren.length === 1
    },
    resolvePath(...paths) {
      return path.resolve(this.basePath, ...paths)
    }
  }
}
</script>

<style rel="" lang="scss" scoped>
.menu-wrapper {
  .font_icon {
    width: 1em;
    height: 1em;
    vertical-align: -0.15em;
    fill: currentColor;
    /*overflow: hidden;*/
    margin-right: 16px;
    position: relative;
    bottom: 1px;
  }
}
</style>
