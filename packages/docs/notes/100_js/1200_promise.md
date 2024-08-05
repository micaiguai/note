# promise
## 规范
规范地址: https://promisesaplus.com/
## promise优点和缺点
### 优点:
  - 获取多个请求的结果
  - 回调地狱
### 缺点:
  - 还是基于回调函数
## 手写promise
<!-- eslint-disable style/max-statements-per-line -->
```js
const STATE_ENUM = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    return
  }
  let calledFlag = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (value) => {
            if (calledFlag) {
              return
            }
            calledFlag = true
            resolvePromise(promise, value, resolve, reject)
          },
          (reason) => {
            if (calledFlag) {
              return
            }
            calledFlag = true
            reject(reason)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (calledFlag) {
        return
      }
      calledFlag = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

function publicResolve(value) {
  if (this.state !== STATE_ENUM.PENDING) {
    return
  }
  this.value = value
  this.state = STATE_ENUM.FULFILLED
  this.onFulfilledList.forEach((onFulfilled) => {
    onFulfilled()
  })
}
function publicReject(reason) {
  if (this.state !== STATE_ENUM.PENDING) {
    return
  }
  this.reason = reason
  this.state = STATE_ENUM.REJECTED
  this.onRejectedList.forEach((onRejected) => {
    onRejected()
  })
}

class Promise {
  state = STATE_ENUM.PENDING
  value = undefined
  reason = undefined
  onFulfilledList = []
  onRejectedList = []
  constructor(executor) {
    try {
      executor(publicResolve.bind(this), publicReject.bind(this))
    } catch (error) {
      publicReject.call(this, error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error }
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === STATE_ENUM.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === STATE_ENUM.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === STATE_ENUM.PENDING) {
        this.onFulfilledList.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedList.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }
}

Promise.defer = Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
// pnpm i promises-aplus-test -g
// npx promises-aplus-test promise.js
```
## 完整版promise
<!-- eslint-disable style/max-statements-per-line -->
```js
const STATE_ENUM = {
  PENDING: 'pending',
  FULFILLED: 'fulfilled',
  REJECTED: 'rejected',
}

function resolvePromise(promise, x, resolve, reject) {
  if (promise === x) {
    reject(new TypeError('Chaining cycle detected for promise #<Promise>'))
    return
  }
  let calledFlag = false
  if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
    try {
      const then = x.then
      if (typeof then === 'function') {
        then.call(
          x,
          (value) => {
            if (calledFlag) {
              return
            }
            calledFlag = true
            resolvePromise(promise, value, resolve, reject)
          },
          (reason) => {
            if (calledFlag) {
              return
            }
            calledFlag = true
            reject(reason)
          }
        )
      } else {
        resolve(x)
      }
    } catch (error) {
      if (calledFlag) {
        return
      }
      calledFlag = true
      reject(error)
    }
  } else {
    resolve(x)
  }
}

class Promise {
  state = STATE_ENUM.PENDING
  value = undefined
  reason = undefined
  onFulfilledList = []
  onRejectedList = []
  constructor(executor) {
    const reject = (reason) => {
      if (this.state !== STATE_ENUM.PENDING) {
        return
      }
      this.reason = reason
      this.state = STATE_ENUM.REJECTED
      this.onRejectedList.forEach((onRejected) => {
        onRejected()
      })
    }
    const resolve = (value) => {
      if (this.state !== STATE_ENUM.PENDING) {
        return
      }
      if (value instanceof Promise) {
        value.then(resolve, reject)
        return
      }
      this.value = value
      this.state = STATE_ENUM.FULFILLED
      this.onFulfilledList.forEach((onFulfilled) => {
        onFulfilled()
      })
    }
    try {
      executor(resolve, reject)
    } catch (error) {
      reject(error)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : (error) => { throw error }
    const promise2 = new Promise((resolve, reject) => {
      if (this.state === STATE_ENUM.FULFILLED) {
        setTimeout(() => {
          try {
            const x = onFulfilled(this.value)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === STATE_ENUM.REJECTED) {
        setTimeout(() => {
          try {
            const x = onRejected(this.reason)
            resolvePromise(promise2, x, resolve, reject)
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === STATE_ENUM.PENDING) {
        this.onFulfilledList.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejectedList.push(() => {
          setTimeout(() => {
            try {
              const x = onRejected(this.reason)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
      }
    })
    return promise2
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }

  finally(callback) {
    return this.then(
      (value) => {
        return Promise.resolve(callback()).then(() => {
          return value
        })
      },
      (reason) => {
        return Promise.resolve(callback()).then(() => {
          throw reason
        })
      }
    )
  }

  static resolve(value) {
    return new Promise((resolve, reject) => {
      resolve(value)
    })
  }

  static reject(reason) {
    return new Promise((resolve, reject) => {
      reject(reason)
    })
  }

  static all(items) {
    const results = []
    let times = 0
    return new Promise((resolve, reject) => {
      const processValue = (index, value) => {
        results[index] = value
        times++
        if (times === items.length) {
          resolve(results)
        }
      }
      for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (item instanceof Promise) {
          item.then(
            (value) => {
              processValue(index, value)
            },
            reject
          )
        } else {
          processValue(index, item)
        }
      }
    })
  }

  static race(items) {
    return new Promise((resolve, reject) => {
      for (let index = 0; index < items.length; index++) {
        const item = items[index]
        if (item instanceof Promise) {
          item.then(
            (value) => {
              resolve(value)
            },
            reject
          )
        } else {
          resolve(item)
        }
      }
    })
  }
}

Promise.defer = Promise.deferred = function () {
  const dfd = {}
  dfd.promise = new Promise((resolve, reject) => {
    dfd.resolve = resolve
    dfd.reject = reject
  })
  return dfd
}
module.exports = Promise
// pnpm i promises-aplus-test -g
// npx promises-aplus-test promise.js
```

## promise defer
延迟使用
```js
const defer = Promise.defer()
defer.promise.then((value) => {
  // output: 10
  console.log(value)
})
setTimeout(() => {
  defer.resolve(10)
}, 3000)
```

## promisify
```js
function promisify(fn) {
  return function (...args) {
    return new Promise((resolve, reject) => {
      fn(...args, (error, data) => {
        if (data) {
          resolve(data)
        }
        if (error) {
          reject(error)
        }
      })
    })
  }
}
```
