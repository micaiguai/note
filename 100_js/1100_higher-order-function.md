# 高阶函数
有两种情况是高阶函数
1. 函数的参数是函数
2. 函数的返回值是参数

## 实现before
```js
function say(name) {
  console.log(`hi, ${name}`)
}
Function.prototype.before = function(callback) {
  return (...args) => {
    callback()
    this(...args)
  }
}
const sayWithBefore = say.before(() => {
  console.log('hello')
})
// output: hello
// output: hi, tom
sayWithBefore('tom')
```
## 实现函数科里化
```js
// 判断变量的类型有4个方法
// 1. typeof 缺点是无法精确判断对象类型, 无法区分(Object和Array和null)
// 2. constructor
// 3. instanceof
// 4. Object.prototype.toString.call() 缺点是无法精确判断对象类型
function isType(type, value) {
  return Object.prototype.toString.call(value) === `[object ${type}]`
}
function currying(fn, ...args) {
  if (args.length < fn.length) {
    return function (...innerArgs) {
      return currying(fn, ...args, ...innerArgs)
    }
  } else {
    return fn(...args)
  }
}
const isArray = currying(isType)('Array')
const isString = currying(isType)('String')
// output: true
console.log(isArray([]))
// output: true
console.log(isString('tom'))
// output: false
console.log(isString([]))
```
## 实现after
```js
import fs from 'fs'

const person = {}
// 什么是闭包，定义函数的作用域和执行函数的作用域不是同一个作用域
function after(times, callback) {
  return function () {
    times--
    if (times === 0) {
      callback()
    }
  }
}
const callback = after(2, () => {
  // output: { name: 'tom\n', age: '18\n' }
  console.log(person)
})
fs.readFile('./assets/100_1100_name.txt', 'utf-8', (err, data) => {
  person.name = data
  callback()
})
fs.readFile('./assets/100_1100_age.txt', 'utf-8', (err, data) => {
  person.age = data
  callback()
})
```