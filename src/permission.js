import router from './router'
import store from './store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { getToken } from '@/utils/base/auth'
import getPageTitle from '@/utils/base/get-page-title'

NProgress.configure({ showSpinner: false })

const whiteList = ['/login']

router.beforeEach(async (to, from, next) => {
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

  // store：权限 menus，刷新页面再次获取一次
  if (store.getters.menus) {
    next()
    return
  }

  try {
    // todo role menu 请求
    await store.dispatch('user/setUserMenu', [])
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

// 移除token
async function goToLogin(next) {
  await store.dispatch('user/fedLogOut')
  next(`/login`)
  NProgress.done()
}
