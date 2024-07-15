# for await
> for await...of 语句创建一个循环，该循环遍历异步可迭代对象以及同步可迭代对象，包括：内置的 String, Array，类似数组对象 (例如 arguments 或 NodeList)，TypedArray, Map, Set 和用户定义的异步/同步迭代器。它使用对象的每个不同属性的值调用要执行的语句来调用自定义迭代钩子。

总结下来是可以遍历异步可迭代对象以及同步可迭代对象。

## 代码
```js
function timeout(delay) {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(delay)
    }, delay)
  })
}

const iterators = [
  timeout(2000),
  timeout(1000),
  timeout(3000),
]

for await (const item of iterators) {
  // output: 2000
  //         1000
  //         3000
  console.log(item)
}
```
