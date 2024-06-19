# 拷贝
## 浅拷贝
- [spread](./200_spread/index.md)
## 深拷贝
- JSON深拷贝
```js
const person = {
  age: 10,
  hobbies: ['eat'],
  name: null,
  // 无法拷贝
  address: undefined,
  // 无法拷贝
  speak() {
    // do something
  }
}
// output: { age: 10, hobbies: [ 'eat' ], name: null }
const personClone = JSON.parse(JSON.stringify(person))
console.log(personClone)
```
- 手写深拷贝
