const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  activeMenu: state => state.app.activeMenuFirstName,
  visitedViews: state => state.tagsView.visitedViews,
  cachedViews: state => state.tagsView.cachedViews,

  token: state => state.user.token,
  username: state => state.user.username,
  role: state => state.user.role,
  menus: state => state.user.menus,

  permission_routers: state => state.permission.routers,
  addRouters: state => state.permission.addRouters
}
export default getters
