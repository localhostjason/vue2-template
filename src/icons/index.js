import Vue from 'vue'
import SvgIcon from '../components/SvgIcon'

Vue.component('svg-icon', SvgIcon)

// package: svg loader need webpack.base.conf.js add loader svg
const requireAll = requireContext => requireContext.keys().map(requireContext)
const req = require.context('./svg', false, /\.svg$/)
requireAll(req)
