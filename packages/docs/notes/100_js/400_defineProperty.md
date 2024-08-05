# defineProperty
## defineProperty使用
```js
const person = {}
let _name = ''
Object.defineProperty(
  person,
  'name',
  {
    // [writable 或 value]无法和[get 或 set]同时存在
    // writable: false,
    configurable: false,
    enumerable: false,
    get() {
      return _name
    },
    set(val) {
      _name = val
    }
  }
)
// 当writable为true时，可以覆写
person.name = 'tom'
// 当configurable为true时，可以删除
delete person.name
// 当enumerable为true时，可以枚举
for (const key in person) {
  console.log(key)
}

// output: tom
console.log(person.name)
```
## 对象的getter和setter
```js
let _name = ''
const person = {
  get name() {
    return _name
  },
  set name(val) {
    // output: set
    console.log('set')
    _name = val
  }
}
person.name = 'tom'
// output: tom
console.log(person.name)
```
## 模拟vue的对象的observer
<!-- eslint-disable no-extend-native -->
<!-- eslint-disable prefer-rest-params -->
```js
/**
 * 观察对象
 * @param {object} obj 被观察的对象
 */
function observe(obj) {
  if (typeof obj !== 'object') {
    return
  }
  for (const key in obj) {
    defineProperty(obj, key, obj[key])
  }
}
/**
 * 模拟更新
 */
function update() {
  console.log('update')
}
/**
 * 数据劫持
 * @param {object} obj 被劫持的对象
 * @param {string} key 被劫持的对象的键
 * @param {*} val 被劫持的对象的初始值
 */
function defineProperty(obj, key, val) {
  observe(val)
  Object.defineProperty(
    obj,
    key,
    {
      get() {
        return val
      },
      set(newVal) {
        update()
        val = newVal
      }
    }
  )
}
// 劫持数组
const arrMethodKeys = ['push']
for (const key of arrMethodKeys) {
  const oldMethod = Array.prototype[key]
  Array.prototype[key] = function () {
    update()
    oldMethod.apply(this, arguments)
  }
}
const person = {
  name: 'tom',
  pet: {
    name: 'snow'
  },
  hobbies: ['eat']
}
observe(person)
// output: update
person.name = 'john'
// output: update
person.pet.name = 'black'
// 无法触发update，因为索引2未被劫持
person.hobbies[2] = 'play'
// output: update
person.hobbies.push('sleep')
```
