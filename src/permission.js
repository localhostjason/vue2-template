import store from './store'
import NProgress from '@/utils/nprogress'
import { getToken } from '@/utils/base/auth'
import getPageTitle from '@/utils/base/get-page-title'
import { getUserInfo } from '@/api/auth/user'


const whiteList = ['/login']

// 移除token
async function goToLogin(next) {
  await store.dispatch('user/fedLogOut')
  next(`/login`)
  NProgress.done()
}


export const usePermissionRouter = (router) => {
  router.beforeEach(async (to, from, next) => {
    if (to.name && to.matched.length) {
      await store.dispatch('app/changeActiveMenu', to.matched[0].name)
    }

    NProgress.start()

    // set page title
    document.title = getPageTitle(to.meta.title, 'VUE2')

    // determine whether the user has logged in
    const hasToken = getToken()

    if (!hasToken) {
      whiteList.includes(to.path) ? next() : next(`/login`)
      NProgress.done()
      return
    }

    // 有token, to登录=> 跳转首页
    if (to.path === '/login') {
      next({ path: '/' })
      NProgress.done()
      return
    }

    if (store.getters.username) {
      next()
      return
    }

    try {
      const { username } = await getUserInfo()
      await store.dispatch('user/setUsername', username)
    } catch (e) {
      await goToLogin(next)
      return
    }

    const menus = [] // menus = ["Apis"]
    // generate accessible routes map based on roles
    const accessRoutes = await store.dispatch('permission/generateRoutes', menus)

    // dynamically add accessible routes
    router.selfAddRoutes(accessRoutes)
    // hack method to ensure that addRoutes is complete
    // set the replacement: true, so the navigation will not leave a history record
    next({ ...to, replace: true })
  })

  router.afterEach(() => {
    NProgress.done()
  })

}


