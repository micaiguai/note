# decorator

## 例子
```ts
@classDecorator(true)
class Animal {
  @readonly
  type = 'animal'

  constructor(name) {
    this.name = name
  }

  // 多个装饰器，从下至上执行，洋葱模型
  // 执行顺序:
  // 1. output: value : hello
  // 2. output: value : hi
  // 3. output: hi, my name is orange
  // 4. output: hello, my name is orange
  @sayWithName('hi')
  @sayWithName('hello')
  say() {
    console.log('i am animal')
  }
}
Animal.prototype.hobbies = ['sleep']
function classDecorator(value) {
  return function (constuctor) {
    constuctor.cuteFlag = value
  }
}
function readonly(target, key, descriptor) {
  descriptor.writable = false
}
function sayWithName(value) {
  return function (target, key, descriptor) {
    console.log('value :', value)
    const fn = descriptor.value
    descriptor.value = function (...args) {
      console.log(`${value}, my name is ${this.name}`)
      fn.apply(this, args)
    }
  }
}
const animal = new Animal('orange')
// output: true
console.log(Animal.cuteFlag)
// error: TypeError: Cannot assign to read only property 'type' of object '#<Animal>'
// animal.type = 'person'
animal.say()
```
