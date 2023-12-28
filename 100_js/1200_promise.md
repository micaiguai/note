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
          value => {
            if (calledFlag) {
              return
            }
            calledFlag = true
            resolvePromise(promise, value, resolve, reject)
          },
          reason => {
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
  this.onFulfilleds.forEach(onFulfilled => {
    onFulfilled()
  })
}
function publicReject(reason) {
  if (this.state !== STATE_ENUM.PENDING) {
    return
  }
  this.reason = reason
  this.state = STATE_ENUM.REJECTED
  this.onRejecteds.forEach(onRejected => {
    onRejected()
  })
}

class Promise {
  state = STATE_ENUM.PENDING
  value = undefined
  reason = undefined
  onFulfilleds = []
  onRejecteds = []
  constructor(executor) {
    try {
      executor(publicResolve.bind(this), publicReject.bind(this))
    } catch (error) {
      publicReject.call(this, error)
    }
  }
  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : value => value
    onRejected = typeof onRejected === 'function' ? onRejected : error => { throw error }
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
        this.onFulfilleds.push(() => {
          setTimeout(() => {
            try {
              const x = onFulfilled(this.value)
              resolvePromise(promise2, x, resolve, reject)
            } catch (error) {
              reject(error)
            }
          })
        })
        this.onRejecteds.push(() => {
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
  let dfd = {};
  dfd.promise = new Promise((resolve,reject)=>{
      dfd.resolve = resolve;
      dfd.reject = reject;
  })
  return dfd
}
module.exports = Promise;
// pnpm i promises-aplus-test -g
// npx promises-aplus-test promise.js
```
## promise defer
延迟使用
```js
const defer = Promise.defer()
defer.promise.then(value => {
  // output: 10
  console.log(value)
})
setTimeout(() => {
  defer.resolve(10)
}, 3000) 
```


