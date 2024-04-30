# generator

## 示例代码
```js
function * generator(value) {
  console.log('value :', value)
  const result1 = yield 1
  console.log('result1 :', result1)
  const result2 = yield 2
  console.log('result2 :', result2)
  const result3 = yield 3
  console.log('result3 :', result3)
}

const iterator = generator('value')

console.log('iterator.next() :', iterator.next('a'))
console.log('iterator.next() :', iterator.next('b'))
console.log('iterator.next() :', iterator.next('c'))
console.log('iterator.next() :', iterator.next('d'))
// ouput: value : value
// ouput: iterator.next() : { value: 1, done: false }
// ouput: result1 : b
// ouput: iterator.next() : { value: 2, done: false }
// ouput: result2 : c
// ouput: iterator.next() : { value: 3, done: false }
// ouput: result3 : d
// ouput: iterator.next() : { value: undefined, done: true }
```
## 手写co
```js
// const { co } = require("co")
function co(generator) {
  const iterator = generator()
  return new Promise((resolve, reject) => {
    const next = preValue => {
      const { value, done } = iterator.next(preValue)
      if (done) {
        resolve(value)
        return
      }
      Promise.resolve(value).then(
        promiseValue => {
          next(promiseValue)
        },
        reject
      )
    }
    next()
  })
}

function * generator() {
  const result1 = yield Promise.resolve(1)
  const result2 = yield Promise.resolve(result1 + 1)
  const result3 = yield Promise.resolve(result2 + 1)
  return result3
}

co(generator).then(value => {
  // output: value : 3
  console.log('value :', value)
})
```
## async await
```js
async function works() {
  try {
    const result1 = await Promise.resolve(1)
    const result2 = await Promise.resolve(result1 + 1)
    const result3 = await Promise.resolve(result2 + 1)
    return result3
  } catch (error) {
    throw error
  }
}

works().then(value => {
  console.log('value :', value)
})
```
