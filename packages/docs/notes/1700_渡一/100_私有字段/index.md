# 私有字段
### 1. 属性开头加下划线
```js
class Foo {
  _bar = 1
}
const foo = new Foo()
// output: 1
console.log(foo._bar)
```
### 2. Symbol
```js
const bar = Symbol('bar')
class Foo {
  [bar] = 1
}
const foo = new Foo()
// output: 1
console.log(foo[bar])
```
### 3. #符号
<!-- eslint-skip -->
```js
class Foo {
  #bar = 1
}
const foo = new Foo()
// SyntaxError: Private field '#bar' must be declared in an enclosing class
console.log(foo.#bar)
```
