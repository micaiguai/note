# var、let、const
## 一、 var的缺点和let的对比
1. var会污染全局代码
<!-- eslint-skip -->
```js
var foo = 1
console.log(window.foo)
// output: 1
```

<!-- eslint-skip -->
```js
let foo = 1
console.log(window.foo)
// output: undefined
```

2. var会变量提升
<!-- eslint-skip -->
```js
console.log(foo)
// output: undefined
var foo = 1
```
<!-- eslint-skip -->
```js
console.log(foo)
// error: ReferenceError: Cannot access 'foo' before initialization
let foo = 1
```

3. 可被重复声明
<!-- eslint-skip -->
```js
var foo = 1
var foo = 2
console.log(foo)
// output: 2
```

<!-- eslint-skip -->
```js
let foo = 1
let foo = 2
console.log(foo)
// error: SyntaxError: Identifier 'foo' has already been declared
```

1. 暂存死区

<<< @/notes/100_js/100_var、let、const/400_暂存死区.js#snippet1{3}

<<< @/notes/100_js/100_var、let、const/400_暂存死区.js#snippet2

5. 作用域

<<< @/notes/100_js/100_var、let、const/500_作用域.js#snippet1

<<< @/notes/100_js/100_var、let、const/500_作用域.js#snippet2

## 二、const特点
1. 声明常量（基础值不变或地址不变）

<<< @/notes/100_js/100_var、let、const/600_const.js#snippet1

<<< @/notes/100_js/100_var、let、const/600_const.js#snippet2
