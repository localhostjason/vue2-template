<template>
  <section class="app-main">
    <div>
      <h4 class="route-title">
        {{ routes.filter(e => e.name === route_name).length ? route_second_title : route_title }}
      </h4>

      <div class="third-menu" v-if="routes.filter(e => e.name === route_name).length">
        <div v-for="item in routes" :key="item.name">
          <div
            v-if="!item.hidden"
            class="menu-item"
            :class="route_name === item.name ? 'is-active' : ''"
            @click="changeRoute(item.name)"
            @mousedown="clickMiddleButton($event,item.path)"
          >
            <svg-icon
              v-if="item.meta.icon"
              :icon-class="item.meta.icon"
            ></svg-icon>
            <span>{{ item.meta.title }}</span>
          </div>
        </div>
      </div>
    </div>

    <transition name="fade-transform" mode="out-in">
      <keep-alive :include="cachedViews">
        <router-view :key="key" class="app-container"></router-view>
      </keep-alive>
    </transition>
  </section>
</template>

<script>
import {mapGetters} from "vuex";

export default {
  name: "AppMain",
  computed: {
    cachedViews() {
      return this.$store.state.tagsView.cachedViews;
    },
    key() {
      return this.$route.fullPath;
    },
    route_second_title() {
      return this.$route.matched[1].meta.title;
    },
    route_title() {
      return this.$route.meta.title;
    },
    route_name() {
      return this.$route.name;
    },
    routes() {
      let result;
      let routes = {
        children: this.permission_routers
      };

      const matched = this.$route.matched;
      console.log(111, matched)

      // matched 长度为2  表示只有2层路由  无需展示三级菜单
      if (matched.length === 2) {
        result = [];
      } else {
        for (let i = 0; i < matched.length - 1; i++) {
          routes = routes.children.find(e => {
            return e.name === matched[i].name;
          });
        }
        result = routes.children.filter(e => !e.hidden);
      }

      return result;
    },
    ...mapGetters(["permission_routers"])
  },
  methods: {
    changeRoute(name) {
      this.$router.push({
        name: name
      });
    },
    clickMiddleButton(event, path) {
      let btnNum = event.button;
      let url = window.location.href.split("/");
      url.splice(url.length - 1, 1);
      url.push(path);

      //鼠标中键
      if (btnNum === 1) {
        window.open(url.join("/"), "_blank");
      }
    }
  }
};
</script>

<style scoped lang="scss">
.app-main {
  /*84 = navbar + tags-view = 50 +34 */
  min-height: calc(100vh - 90px);
  position: relative;
  overflow: hidden;
  top: 56px;
  /*padding: 0 15px;*/
}

.route-title {
  margin: 24px 24px 0;
  font-size: 20px;
  color: #333;
}

.create-edit-site-title {
  text-align: center;
  border-bottom: 1px solid #e4e7ed;
  padding-bottom: 20px;
}

.third-menu {
  width: calc(100% - 48px);
  margin: 24px 24px 0;
  border-bottom: 1px solid #e6e6e6;
  display: flex;

  .svg-icon {
    color: #333;
    margin-right: 2px;
  }

  .menu-item {
    color: #333;
    padding: 0 20px 10px;
    box-sizing: border-box;
    cursor: pointer;
    font-size: 14px;
  }

  .menu-item.is-active {
    .svg-icon {
      color: #339dfb;
    }

    color: #339dfb;
    border-bottom: 3px solid #339dfb;
  }
}
</style>
