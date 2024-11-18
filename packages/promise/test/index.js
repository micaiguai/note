const MyPromise = require('../src/index')
// const MyPromise = require('./example')

module.exports = {
  deferred() {
    let resolve, reject
    return {
      promise: new MyPromise((res, rej) => {
        resolve = res
        reject = rej
      }),
      resolve,
      reject,
    }
  },
}

// Backward compatibility with unhandledRejection changes
// Source: https://github.com/promises-aplus/promises-tests/issues/93
require('node:process')
  .on(
    'unhandledRejection',
    // eslint-disable-next-line no-console
    (err) => { console.debug('unhandledRejection', err) },
  )
