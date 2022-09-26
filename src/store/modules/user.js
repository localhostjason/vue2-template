import { getToken, setToken, getUsername, setUsername, clearLocalStorage } from '@/utils/base/auth'

const state = {
  token: getToken(),
  username: getUsername(),
  role: null,
  menus: null
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, username) => {
    state.username = username
  },
  SET_ROLE: (state, role) => {
    state.role = role
  },
  SET_MENUS: (state, menus) => {
    state.menus = menus
  }
}

function removeStore(commit) {
  commit('SET_TOKEN', '')
  commit('SET_USERNAME', '')
  commit('SET_ROLE', null)
  commit('SET_MENUS', null)
  clearLocalStorage()
}

const actions = {
  setToken({ commit }, data) {
    const { token, username } = data
    setToken(token)
    setUsername(username)
    commit('SET_TOKEN', token)
    commit('SET_USERNAME', username)
  },

  setUserMenu({ commit }, menus) {
    console.log('get role menus', menus)
    commit('SET_MENUS', menus)
  },

  // get user info fail then logout
  fedLogOut({ commit }) {
    removeStore(commit)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
