const MyPromise = require('../src/index')

function deferred() {
  let resolve, reject
  return {
    promise: new MyPromise((res, rej) => {
      resolve = res
      reject = rej
    }),
    resolve,
    reject,
  }
}

const adapter = {
  deferred,
}

adapter.resolved = function (value) {
  const d = adapter.deferred()
  d.resolve(value)
  return d.promise
}
adapter.rejected = function (value) {
  const d = adapter.deferred()
  d.reject(value)
  return d.promise
}

const resolved = adapter.resolved
// const rejected = adapter.rejected

const dummy = { dummy: 'dummy' } // we fulfill or reject with this when we don't intend to test against it
const sentinel = { sentinel: 'sentinel' } // we fulfill or reject with this when we don't intend to test against it
const sentinel2 = { sentinel2: 'sentinel2' } // we fulfill or reject with this when we don't intend to test against it
const sentinel3 = { sentinel3: 'sentinel3' } // we fulfill or reject with this when we don't intend to test against it

function test(promise) {
  promise.then(() => {
    return sentinel
  }).then(() => {
    // console.log('done 1')
  })

  promise.then(() => {
    throw sentinel2
  }).then(null, () => {
    // console.log('done 2')
  })

  promise.then(() => {
    return sentinel3
  }).then(() => {
    // console.log('done 3')
  })
}

test(resolved(dummy))
