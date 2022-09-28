import Cookies from 'js-cookie'
import { getMenuFirst, setMenuFirst, removeMenuFirst } from '@/utils/base/auth'

const state = {
  sidebar: {
    opened: !+Cookies.get('sidebarStatus'),
    withoutAnimation: false
  },
  device: 'desktop',
  activeMenuFirstName: getMenuFirst() || 'Dash'
}

const mutations = {
  TOGGLE_SIDEBAR: state => {
    if (state.sidebar.opened) {
      Cookies.set('sidebarStatus', 1)
    } else {
      Cookies.set('sidebarStatus', 0)
    }
    state.sidebar.opened = !state.sidebar.opened
    state.sidebar.withoutAnimation = false
  },
  CLOSE_SIDEBAR: (state, withoutAnimation) => {
    Cookies.set('sidebarStatus', 1)
    state.sidebar.opened = false
    state.sidebar.withoutAnimation = withoutAnimation
  },
  TOGGLE_DEVICE: (state, device) => {
    state.device = device
  },

  SET_ACTIVE_MENU: (state, name) => {
    state.activeMenuFirstName = name
  }
}

const actions = {
  toggleSideBar({ commit }) {
    commit('TOGGLE_SIDEBAR')
  },
  closeSideBar({ commit }, { withoutAnimation }) {
    commit('CLOSE_SIDEBAR', withoutAnimation)
  },
  toggleDevice({ commit }, device) {
    commit('TOGGLE_DEVICE', device)
  },

  changeActiveMenu({ commit }, name) {
    setMenuFirst(name)
    commit('SET_ACTIVE_MENU', name)
  },
  removeActiveMenuOne({ commit }) {
    removeMenuFirst()
    commit('SET_ACTIVE_MENU', null)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
