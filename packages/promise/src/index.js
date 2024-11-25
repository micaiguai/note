const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

module.exports = class MyPromise {
  #state = PENDING
  #value
  #reason
  #onFulfilledCbs = []
  #onRejectedCbs = []

  constructor(executor) {
    try {
      executor(
        this.#resolve.bind(this),
        this.#reject.bind(this),
      )
    } catch (error) {
      this.#reject(error)
    }
  }

  #resolve(x) {
    if (x === this) {
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
              (value) => {
                if (isCalled) {
                  return
                }
                isCalled = true
                this.#resolve(value)
              },
              (reason) => {
                if (isCalled) {
                  return
                }
                isCalled = true
                this.#reject(reason)
              },
            )
          return
        }
      } catch (error) {
        if (isCalled) {
          return
        }
        isCalled = true
        this.#reject(error)
        return
      }
    }
    if (this.#state !== PENDING) {
      return
    }
    this.#state = FULFILLED
    this.#value = x
    this.#onFulfilledCbs.forEach(setTimeout)
    // this.#onFulfilledCbs.forEach(cb => setTimeout(cb))
  }

  #reject(reason) {
    if (this.#state !== PENDING) {
      return
    }
    this.#state = REJECTED
    this.#reason = reason
    // this.#onRejectedCbs.forEach(cb => setTimeout(cb))
    this.#onRejectedCbs.forEach(setTimeout)
  }

  then(onFulfilled, onRejected) {
    onFulfilled = typeof onFulfilled === 'function'
      ? onFulfilled
      : value => value
    onRejected = typeof onRejected === 'function'
      ? onRejected
      : (reason) => {
          throw reason
        }
    return new MyPromise((resolve, reject) => {
      if (this.#state === PENDING) {
        this.#onFulfilledCbs.push(() => {
          try {
            resolve(onFulfilled(this.#value))
          } catch (error) {
            reject(error)
          }
        })
        this.#onRejectedCbs.push(() => {
          try {
            resolve(onRejected(this.#reason))
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.#state === FULFILLED) {
        setTimeout(() => {
          try {
            resolve(onFulfilled(this.#value))
          } catch (error) {
            reject(error)
          }
        })
      }
      if (this.#state === REJECTED) {
        setTimeout(() => {
          try {
            resolve(onRejected(this.#reason))
          } catch (error) {
            reject(error)
          }
        })
      }
    })
  }

  catch(onRejected) {
    return this.then(undefined, onRejected)
  }
}
