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

export function clearLocalStorage() {
  localStorage.clear()
}
