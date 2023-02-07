import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// 解决ElementUI导航栏中的vue-router在3.0版本以上重复点菜单报错问题
const originalPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}

/* Layout */
import { Layout } from './const'

/* Router Modules */
import UserRouter from './modules/user'
import LogRouter from './modules/log'

/**
 * Note: sub-menu only appear when route children. Length >= 1
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * breadcrumb                     if set false, will not show in the breadcrumb
 * redirect: noredirect           if `redirect:noredirect` will not redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * path                           vue router path, not is null or 空string
 * component                      vue router component
 * meta : {
    title: 'title'                the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'              the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    click: true                   if set true, layout tb（上下布局，局限） no show second menu
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/',
    component: Layout,
    redirect: 'dashboard',
    name: 'Dash',
    meta: {
      title: '概览',
      icon: 'home',
      breadcrumb: false
    },
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: {
          title: '概览',
          icon: 'home',
          affix: true,
          breadcrumb: false
        }
      }
    ]
  },
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path*',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    name: 'Login',
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/errorPage/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/errorPage/401'),
    hidden: true
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  LogRouter,
  UserRouter,
  {
    path: '*',
    redirect: '/404',
    hidden: true
  }
]

const createRouter = () =>
  new Router({
    // mode: 'history', // require service support
    scrollBehavior: () => ({ y: 0 }),
    routes: constantRoutes
  })

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

router.selfAddRoutes = params => {
  resetRouter()
  for (const info of params) {
    router.addRoute(info)
  }
}

export default router
