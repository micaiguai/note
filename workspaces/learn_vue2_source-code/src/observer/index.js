import { definePlainValue, isObject } from "../utils/index.js"
import { proxyArrayMethodObject } from "./array.js"

class Observer {
  constructor(data) {
    definePlainValue(data, '__ob__', this)
    // 是否data为数组
    //   ? 处理数组
    //   : 处理对象
    if (Array.isArray(data)) {
      data.__proto__ = proxyArrayMethodObject
      this.observeArray(data)
    } else {
      this.walk(data)
    }
  }
  /**
   * 遍历观测数组
   * @param {any[]} array 
   */
  observeArray(array) {
    array.forEach(item => {
      observe(item)
    })
  }
  walk(data) {
    for (const key in data) {
      defineProperty(data, key, data[key])
    }
  }
}

/**
 * @param {object} data 
 * @param {string} key 
 * @param {any} value 
 */
function defineProperty(data, key, value) {
  observe(value)
  Object.defineProperty(data, key, {
    get() {
      return value
    },
    set(newValue) {
      if (newValue === value) {
        return
      }
      observe(newValue)
      value = newValue
    }
  })
}

export function observe(data) {
  if (!isObject(data)) {
    return
  }
  return new Observer(data)
}