export function myDebounce(fn, wait) {
  let timer
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}

function debounce(fn: Function, wait: number): Function {
  let timer: number
  return () => {
    clearTimeout(timer)
    timer = setTimeout(fn, wait)
  }
}

export function myThrottle(fn, wait) {
  let timer
  return () => {
    if (timer)
      return

    timer = setTimeout(() => {
      fn()
      timer = null
    }, wait)
  }
}
function throttle(fn: Function, wait: number): Function {
  let timer: NodeJS.Timeout | null = null

  return () => {
    if (timer)
      return

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
    if (proto === null)
      return false

    if (proto === constructor.prototype)
      return true

    proto = proto.__proto__
  }
}
type WithProto<T> = T & { __proto__: WithProto<object> }
export function theInstanceOf(obj: WithProto<object>, constructor: Function) {
  // eslint-disable-next-line no-proto, no-restricted-properties
  let proto: WithProto<object> = obj.__proto__
  while (true) {
    if (proto === null)
      return false
    if (proto === constructor.prototype)
      return true
    // eslint-disable-next-line no-proto, no-restricted-properties
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

// eslint-disable-next-line no-extend-native
Function.prototype.theCall = function (bindThis: (object & { fn: undefined | Function }), ...args: unknown[]): unknown {
  // eslint-disable-next-line ts/no-this-alias
  const fn = this
  if (bindThis !== null && typeof bindThis === 'object') {
    bindThis.fn = fn
    const result = bindThis.fn(...args)
    delete bindThis.fn
    return result
  }
  else {
    throw new Error('bindThis must be object type')
  }
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
  if (source === null || typeof source !== 'object')
    return source

  if (map.has(source))
    return map.get(source)

  const target = Array.isArray(source) ? [] : {}
  map.set(source, target)
  for (const key in source)
    target[key] = myDeepClone(source[key], map)

  return target
}

function cloneDeep(obj, map = new WeakMap()) {
  if (map.has(obj))
    return map.get(obj)
  const newObj = Array.isArray(obj) ? [] : {}
  for (const key in obj)
    newObj[key] = cloneDeep(obj[key], map)
  map.set(obj, newObj)
  return newObj
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
        if (xhr.status === 200 || xhr.status === 304)
          resolve(xhr.responseText)
        else
          reject()
      }
    })
    xhr.send(data)
  })
}

export function myCurry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length)
      return fn.apply(this, args)

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
    if (this.status !== 'pending')
      return

    this.value = val
    this.status = 'fulfilled'
  }

  reject(val) {
    if (this.status !== 'pending')
      return

    this.value = val
    this.status = 'rejected'
  }

  then(onFulfilled, onRejected) {

  }
}

class ThePromise {
  status = 'pending'
  value
  reason
  onFulfilledList = []
  onRejectedList = []
  constructor(executor) {
    executor(this.resolve, this.reject)
  }

  resolve(val) {
    if (this.status !== 'pending')
      return
    this.value = val
    this.status = 'fulfilled'
    setTimeout(() => {
      this.onFulfilledList.forEach((onFulfilled) => {
        onFulfilled(this.value)
      })
    })
  }

  reject() {
    if (this.status !== 'pending')
      return
    this.reason = val
    this.status = 'rejected'
    setTimeout(() => {
      this.onRejectedList.forEach((onFulfilled) => {
        onFulfilled(this.value)
      })
    })
  }

  then(onFulfilled, onRejected) {
    if (this.status === 'fulfilled') {
      setTimeout(() => {
        onFulfilled(this.value)
      })
      return
    }
    if (this.status === 'rejected') {
      setTimeout(() => {
        onRejected(this.reason)
      })
      return
    }
    this.onFulfilledList.push(onFulfilled)
    this.onRejected.push(onRejected)
  }
}
