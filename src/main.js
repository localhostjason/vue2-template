import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import * as filters from './filters'
import 'normalize.css/normalize.css'

import './icons'
import './plugins/element'
import './styles/index.scss'
import { usePermissionRouter } from './permission'

Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

// load permission
usePermissionRouter(router)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
