import axios from 'axios'
import { Message, Notification } from 'element-ui'
import store from '@/store'
import router from '@/router'
import isString from 'lodash/isString'
import isPlainObject from 'lodash/isPlainObject'

function trim(data) {
  let newData = {}
  for (const [k, v] of Object.entries(data)) {
    newData[k] = isString(v) ? v.trim() : v
  }
  return newData
}

const defaultHeaders = {
  Accept: 'application/json, text/plain, */*; charset=utf-8',
  'Content-Type': 'application/json; charset=utf-8',
  Pragma: 'no-cache',
  'Cache-Control': 'no-cache'
}

Object.assign(axios.defaults.headers.common, defaultHeaders)

// create an axios instance
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_API, // api的base_url
  timeout: 5000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (store.getters.token) {
      config.headers['Authorization'] = `Bearer ${store.getters.token}`
    }

    // trim 参数
    try {
      if (config.method !== 'get') {
        let newData = config.data
        if (isPlainObject(config.data)) {
          newData = trim(config.data)
        }
        config.data = newData
      } else {
        let newData = config.params
        if (isPlainObject(config.params)) {
          newData = trim(config.params)
        }
        config.params = newData
      }
    } catch (e) {
      console.log('trim error:', e)
    }
    return config
  },
  error => {
    Promise.reject(error).then(r => console.log('err:', r))
  }
)

// response interceptor
service.interceptors.response.use(
  response => response.data,

  async error => {
    let status = 0
    try {
      status = error.response.status
    } catch (e) {
      Message({
        message: '连接不上后台。已超时',
        type: 'error',
        duration: 3 * 1000
      })
      return Promise.reject('连接不上后台。已超时')
    }

    const errMsg = error.response.data.msg
    const errCode = error.response.data.code || ''

    let message
    // 403 404 401(认证相关) 500，其他接口都走200
    switch (status) {
      case 403:
        message = '权限不足'
        break

      case 404:
        message = '相关的资源不存在'
        break

      case 401:
        message = errMsg
        break

      default:
        message = '服务器错误'
    }

    // 一些警告类型信息，不影响流程
    if (errCode === 'E_TOOL') {
      Notification({
        title: '警告',
        dangerouslyUseHTMLString: true,
        message: message,
        type: 'warning',
        duration: 0
      })
      return
    }

    Message({
      message: `${message}`,
      type: 'error',
      duration: 3 * 1000
    })

    const url = error.response.config.url
    if (status === 401 && !url.endsWith('/auth/login')) {
      await store.dispatch('user/fedLogOut')
      await router.push({ path: '/login' })
    }
    return Promise.reject(error)
  }
)

export default service
