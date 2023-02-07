const tokenKey = 'token'

export function getToken() {
  return localStorage.getItem(tokenKey)
}

export function setToken(token) {
  return localStorage.setItem(tokenKey, token)
}

export function removeToken() {
  localStorage.removeItem(tokenKey)
}

export function clearLocalStorage() {
  localStorage.clear()
}

const MenuFirstKey = 'Menu First Name'

export function getMenuFirst() {
  return localStorage.getItem(MenuFirstKey)
}

export function setMenuFirst(key) {
  return localStorage.setItem(MenuFirstKey, key)
}

export function removeMenuFirst() {
  localStorage.removeItem(MenuFirstKey)
}
