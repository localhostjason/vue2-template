import request from '@/utils/http/request'

export function login(data) {
  return request({
    url: '/auth/login',
    method: 'post',
    data
  })
}

export function getUserInfo() {
  return request({
    url: `/user/info`,
    method: 'get'
  })
}

export function updateSelfUserInfo(data) {
  return request({
    url: `/user/info`,
    method: 'put',
    data
  })
}

export function changeSelfPassword(data) {
  return request({
    url: `/user/info/change_password`,
    method: 'put',
    data
  })
}
