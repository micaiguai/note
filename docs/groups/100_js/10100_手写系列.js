export function myDebounce(fn, wait) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}

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

// function print() {
//   console.log('sth')
// }

// const printDebounce = debounce(print, 100)
// const printThrottle = throttle(print, 100)
// printDebounce()
// printDebounce()
// printDebounce()
// printDebounce()
// printDebounce()

// setTimeout(printThrottle, 100)
// setTimeout(printThrottle, 200)
// setTimeout(printThrottle, 300)
// setTimeout(printThrottle, 400)
// setTimeout(printThrottle, 500)
// setTimeout(printThrottle, 600)

export function myInstanceOf(obj, constructor) {
  let proto = obj.__proto__
  while (true) {
    if (proto === null) {
      return false
    }
    if (proto === constructor.prototype) {
      return true
    }
    proto = proto.__proto__
  }
}

export function myCall(bindThis, ...args) {
  const fn = this
  bindThis.fn = fn
  const result = bindThis.fn(...args)
  delete bindThis.fn
  return result
}

export function myApply(bindThis, args) {
  const fn = this
  bindThis.fn = fn
  const result = bindThis.fn(...args)
  delete bindThis.fn
  return result
}

export function myBind(bindThis, ...args) {
  const fn = this
  return () => {
    return fn.apply(bindThis, args)
  }
}

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

export function myNew(constructor, ...args) {
  const instance = Object.create(constructor.prototype)
  const result = constructor.apply(instance, args)
  return result instanceof constructor ? result : instance
}

export function ajax(method, url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.onreadystatechange(() => {
      if (xhr.readyState === 4) {
        if (xhr.status === 200 || xhr.status === 304) {
          resolve(xhr.responseText)
        } else {
          reject()
        }
      }
    })
    xhr.send(data)
  })
}

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

export class MyPromise {
  status = 'pending'
  value
  constructor(executor) {
    executor(this.resolve, this.reject)
  }
  resolve(val) {
    if (this.status !== 'pending') {
      return
    }
    this.value = val
    this.status = 'fulfilled'
  }
  reject(val) {
    if (this.status !== 'pending') {
      return
    }
    this.value = val
    this.status = 'rejected'
  }
  then(onFulfilled, onRejected) {
    
  }
}
