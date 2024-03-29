/**
 * 判断是否是对象
 * @param {any} data 
 * @returns {boolean}
 */
export function isObject(data) {
  return typeof data === 'object' && data !== null 
}

/**
 * 给对象定义一个无法枚举、无法配置的值
 * @param {object} object
 * @param {string} key
 * @param {any} value
 */
export function definePlainValue(object, key, value) {
  Object.defineProperty(object, key, {
    value,
    enumerable: false,
    configurable: false
  })
}

/**
 * 代理
 * @param {object} object 需要被代理的对象
 * @param {string} sourceKey 需要被代理的键值
 * @param {string} key 获取值的键值
 */
export function proxy(object, sourceKey, key) {
  Object.defineProperty(object, key, {
    get() {
      return object[sourceKey][key]
    },
    set(newVal) {
      object[sourceKey][key] = newVal
    }
  })
}
