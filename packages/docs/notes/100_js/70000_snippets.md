### promisify_miniapp
```js
/**
 * promise化一个微信api
 * @param {Function} func 微信api
 * @returns promise化的微信api
 */
export function promisify(func) {
  if (typeof func !== 'function') {
    return func
  }
  return (args = {}) =>
    new Promise((resolve, reject) => {
      func(
        Object.assign(args, {
          success: resolve,
          fail: reject
        })
      )
    })
}
```
