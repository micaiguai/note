# set&&map
## set
只存储唯一的值，无论基础类型还是复杂类型。
```js
const arr = [1, 2, 3, 3]
const set = new Set(arr)
// Set(3) { 1, 2, 3 }
console.log(set)
```
```js
const person = {
  name: 'tom'
}
const person2 = {
  name: 'john'
}
const arr = [person, person2, person2]
const set = new Set(arr)
// Set(2) { { name: 'tom' }, { name: 'john' } }
console.log(set)
```
### 求并集、交集、差集
```js
/**
 * 求并集
 * @param {Array} arr1
 * @param {Array} arr2
 */
function union(arr1, arr2) {
  return Array.from(new Set([...arr1, ...arr2]));
}

/**
 * 求交集
 * @param {Array} arr1
 * @param {Array} arr2
 */
function intersection(arr1, arr2) {
  return Array.from(
    new Set(
      arr1.filter((item) => arr2.includes(item))
    )
  )
}

/**
 * 求差集
 * @param {Array} arr1
 * @param {Array} arr2
 */
function difference(arr1, arr2) {
  return Array.from(
    new Set(
      arr1.filter((item) => !arr2.includes(item))
    )
  )
}

const nums = [1, 2, 3, 3]
const nums2 = [3, 4, 5, 5]
// [ 1, 2, 3, 4, 5 ]
console.log(union(nums, nums2))
// [ 3 ]
console.log(intersection(nums, nums2))
// [ 1, 2 ]
console.log(difference(nums, nums2))
```
## map和weakMap
1. weakMap不会阻止键对象被垃圾回收
```js
const map = new Map()
const person = {
  name: 'tom'
}
map.set(person, 'foo')
person = null
// Map(1) {{…} => 'foo'}
console.log(map)
```
```js
const weakMap = new WeakMap()
let person = {
  name: 'tom'
}
weakMap.set(person, 'foo')
person = null
// WeakMap {{…} => 'foo'}
//   [[Entries]]
//     No properties
//   [[Prototype]]: WeakMap
console.log(weakMap)
```
