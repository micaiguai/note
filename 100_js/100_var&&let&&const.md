# var&&let&&const
## var缺点和let的对比
1. 污染全局代码
```js
// 用var声明一个foo
var foo = 1
// output: 1
console.log(window.foo)
```
```js
// 用let声明一个foo
let foo = 1
// output: undefined
console.log(window.foo)
```
2. 变量提升问题
```js
// output: undefined
console.log(foo)
// 用var声明一个foo
var foo = 1
```
```js
// output: ReferenceError: Cannot access 'foo' before initialization
console.log(foo)
// 用let声明一个foo
let foo = 1
```
3. 可被重复声明
```js
// 用var声明一个foo
var foo = 1
// 再次用var声明一个foo
var foo = 2
// output: 2
console.log(foo)
```
```js
// 用let声明一个foo
let foo = 1
// 再次用let声明一个foo
// error: SyntaxError: Identifier 'foo' has already been declared
let foo = 2
console.log(foo)
```
4. 作用域问题
```js
// 用let声明一个foo
let foo = 1
{
  // error: ReferenceError: Cannot access 'foo' before initialization
  // 暂存死区
  console.log(foo)
  // 在作用域里声明一个foo
  let foo = 2
  console.log(foo)
}
```
```js
// 用var声明一个foo
var foo = 1
{
  // output: 1
  console.log(foo)
  // 在作用域里声明一个foo
  var foo = 2
  // output: 2
  console.log(foo)
}
```
```js
// 在for循环用var声明
for (var i = 0; i < 3; i++) {
  // output: 3
  //         3
  //         3
  setTimeout(() => {
    console.log(i)
  })
}
// 在for循环用let声明
for (let i = 0; i < 3; i++) {
  // output: 0
  //         1
  //         2
  setTimeout(() => {
    console.log(i)
  })
}
```
## const特点
1. 声明常量（基础值不变或地址不变）
```js
// 用const声明变量
const foo = 1
// 修改值
// error: TypeError: Assignment to constant variable.
foo = 2
console.log(foo)
```
```js
// 用const声明变量
const foo = {
  bar: 1
}
// 修改值
foo.bar = 2
// output: 2
console.log(foo.bar)
```