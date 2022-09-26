import store from '@/store'

export default {
  inserted(el, binging) {
    const { value } = binging
    const role = store.getters && store.getters.role

    if (value && value instanceof Array && value.length) {
      // const hasPermissionRoles = roles.some(role => permissionRoles.includes(role));
      const hasPermissionRoles = value.includes(role)
      if (!hasPermissionRoles) el.parentNode && el.parentNode.removeChild(el)
    } else {
      throw new Error(`need roles! Like v-permission="['admin','editor']"`)
    }
  }
}
