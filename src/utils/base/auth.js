import Cookies from 'js-cookie'

const tokenKey = 'Authorization Token'

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(tokenKey)
}

const tokenMenuKey = 'Menu Path'

export function getMenuToken() {
  return localStorage.getItem(tokenMenuKey)
}

export function setMenuToken(key) {
  return localStorage.setItem(tokenMenuKey, key)
}

export function removeMenuToken() {
  localStorage.removeItem(tokenMenuKey)
}

const usernameKey = 'Username'

export function getUsername() {
  return localStorage.getItem(usernameKey)
}

export function setUsername(key) {
  return localStorage.setItem(usernameKey, key)
}

export function removeUsername() {
  localStorage.removeItem(usernameKey)
}
