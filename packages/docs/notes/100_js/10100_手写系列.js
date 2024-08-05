/** 手写防抖 */
export function myDebounce(fn, wait) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}

/** 手写节流 */
export function myThrottle(fn, wait) {
  let timer
  return () => {
    if (timer) {
      return
    }
    timer = setTimeout(() => {
      fn()
      timer = null
    }, wait)
  }
}

/** 手写instanceof */
export function myInstanceOf(obj, constructor) {
  // eslint-disable-next-line no-proto, no-restricted-properties
  let proto = obj.__proto__
  while (true) {
    if (proto === null) {
      return false
    }
    if (proto === constructor.prototype) {
      return true
    }
    // eslint-disable-next-line no-proto, no-restricted-properties
    proto = proto.__proto__
  }
}

/** 手写call */
export function myCall(bindThis, ...args) {
  bindThis.fn = this
  const result = bindThis.fn(...args)
  delete bindThis.fn
  return result
}

/** 手写apply */
export function myApply(bindThis, args) {
  bindThis.fn = this
  const result = bindThis.fn(...args)
  delete bindThis.fn
  return result
}

/** 手写bind */
export function myBind(bindThis, ...args) {
  return () => {
    return this.apply(bindThis, args)
  }
}

/** 手写deepClone */
export function myDeepClone(source, map = new WeakMap()) {
  if (source === null || typeof source !== 'object') {
    return source
  }
  if (map.has(source)) {
    return map.get(source)
  }
  const target = Array.isArray(source) ? [] : {}
  map.set(source, target)
  for (const key in source) {
    target[key] = myDeepClone(source[key], map)
  }
  return target
}

/** 手写new */
export function myNew(constructor, ...args) {
  const instance = Object.create(constructor.prototype)
  const result = constructor.apply(instance, args)
  return result instanceof constructor ? result : instance
}

/** 手写ajax */
export function ajax(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange(() => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.responseText)
        } else {
          reject(new Error('fetch fail'))
        }
      }
    })
    xhr.send(data)
  })
}

/** 函数科里化 */
export function myCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args)
    }
    return function (...subArgs) {
      return curried.apply(this, [...args, ...subArgs])
    }
  }
}
