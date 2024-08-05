# proxy
解决Object.defineProperty无法监听数组下标值改变的问题
```js
const hobbies = [
  'play'
]
const hobbiesProxy = new Proxy(
  hobbies,
  {
    get(target, key, receiver) {
      return Reflect.get(target, key, receiver)
    },
    set(target, key, newVal, receiver) {
      console.log('set')
      return Reflect.set(target, key, newVal, receiver)
    }
  }
)
// output: set
hobbiesProxy[1] = 'sleep'
```
