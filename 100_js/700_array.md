# 数组
## 方法
- es5: forEach, reduce, map, filter, some, every
- es6: find, findIndex
- es7: includes
### 求和
```js
const nums = [1, 2, 3]
const total = nums.reduce((a, b) => a + b, 0)
// output: 6
console.log(total)
```
### 合并数据
```js
const fields = ['name', 'age']
const values = ['john', 30]
const person = fields.reduce((memo, field, index) => {
  memo[field] = values[index]
  return memo
}, {})
// output: { name: 'john', age: 30 }
console.log(person)
```
### redux compose方法
```js
function compose(...fns) {
  return fns.reduce((a, b) => {
    return (...args) => {
      return a(b(...args))
    }
  })
}
function sum(a, b) {
  return a + b
}
function toUpperCase(str) {
  return str.toUpperCase()
}
function decorate(str) {
  return `***${str}***`
}
const result = compose(decorate, toUpperCase, sum)('love', 'frontend')
// output: ***LOVEFRONTEND***
console.log(result)
```
