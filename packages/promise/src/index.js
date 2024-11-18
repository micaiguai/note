const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

module.exports = class MyPromise {
  val
  reason
  state = PENDING
  onFulfilledCbs = []
  onRejectedCbs = []

  constructor(executor) {
    try {
      executor(
        (val) => {
          this.resolutionProcedure(val)
        },
        this.reject.bind(this),
      )
    } catch (e) {
      this.reject(e)
    }
  }

  fulfill(val) {
    if (this.state !== PENDING) {
      return
    }
    this.val = val
    this.state = FULFILLED
    try {
      this.onFulfilledCbs.forEach((cb) => {
        setTimeout(() => {
          cb(this.val)
        })
      })
    } catch (error) {
      this.reject(error)
    }
  }

  reject(reason) {
    if (this.state !== PENDING) {
      return
    }
    this.reason = reason
    this.state = REJECTED
    this.onRejectedCbs.forEach((cb) => {
      setTimeout(() => {
        cb(this.reason)
      })
    })
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : val => val
    onRejected = typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason
        }

    return new MyPromise((resolve, reject) => {
      if (this.state === PENDING) {
        this.onFulfilledCbs.push(() => {
          try {
            resolve(onFulfilled(this.val))
          } catch (error) {
            reject(error)
          }
        })
        this.onRejectedCbs.push(() => {
          try {
            resolve(onRejected(this.reason))
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === FULFILLED) {
        setTimeout(() => {
          try {
            resolve(onFulfilled(this.val))
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.state === REJECTED) {
        setTimeout(() => {
          try {
            resolve(onRejected(this.reason))
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }

  resolutionProcedure(x) {
    if (this === x) {
      throw new TypeError('TypeError')
    }
    if (x && (typeof x === 'function' || typeof x === 'object')) {
      let isCalled = false
      try {
        const then = x.then
        if (typeof then === 'function') {
          then
            .call(
              x,
              (val) => {
                if (isCalled) {
                  return
                }
                isCalled = true
                this.resolutionProcedure(val)
              },
              (reason) => {
                if (isCalled) {
                  return
                }
                isCalled = true
                this.reject(reason)
              },
            )
          return
        }
      } catch (error) {
        if (isCalled) {
          return
        }
        isCalled = true
        this.reject(error)
        return
      }
    }
    this.fulfill(x)
  }
}
