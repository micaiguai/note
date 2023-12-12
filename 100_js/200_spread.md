# 展开运算符

## 可以展开对象和数组
- 展开数组
```js
const arr1 = [1]
const arr2 = [2]
const arr3 = [...arr1, ...arr2]
// output: [ 1, 2 ]
console.log(arr3)
```
- 展开对象
```js
const person = {
  age: 10
}
const pet = {
  name: 'snow'
}
const info = {
  ...person,
  ...pet
}
// output: { age: 10, name: 'snow' }
console.log(info)
```
- 展开对象是复制的引用
```js
const person = {
  age: 10,
  hobbies: ['eat']
}
const pet = {
  name: 'snow'
}
const info = {
  ...person,
  ...pet
}
person.hobbies.push('movie')
// output: { age: 10, hobbies: [ 'eat', 'movie' ], name: 'snow' }
console.log(info)
```

