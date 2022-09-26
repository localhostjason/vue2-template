class ClassUtil {
  constructor() {}

  static selfish(target) {
    const cache = new WeakMap()
    const handler = {
      get(target, key) {
        const value = Reflect.get(target, key)
        if (typeof value !== 'function') {
          return value
        }
        if (!cache.has(value)) {
          cache.set(value, value.bind(target))
        }
        return cache.get(value)
      }
    }
    return new Proxy(target, handler)
  }
}

export default ClassUtil.selfish
