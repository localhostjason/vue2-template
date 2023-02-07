import { getToken, setToken, clearLocalStorage } from '@/utils/base/auth'

const state = {
  token: getToken(),
  username: null,
  role: null,
  menus: []
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
  commit('SET_MENUS', [])
  clearLocalStorage()
}

const actions = {
  setToken({ commit }, token) {
    setToken(token)
    commit('SET_TOKEN', token)
  },
  setUsername({ commit }, username) {
    commit('SET_USERNAME', username)
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
