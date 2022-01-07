# 【手写源码】Vue响应式原理

首先让我们先搞懂什么是响应式，引用官网的一句话：

> Vue 最独特的特性之一，是其非侵入性的响应式系统。数据模型仅仅是普通的 JavaScript 对象。而当你修改它们时，视图会进行更新。

## 1. 看源码

为了搞懂原理，让我们先看看源码。

我们知道`Vue`的源码是用`flow`静态类型检查的。不过能看懂~

> 为了方便理解，源码有删减。

```js
/* core/instance/state.js */

// 调用了observe来观察data，这个data就是我们传入的data
observe(data）
```

```js
/* core/observer/index.js */

export function observe (value: any) {
  // 如果不是对象或者数组就返回
  if (!isObject(value)) return
  new Observer(value)
}

export class Observer {
  value: any;

  constructor (value: any) {
    this.value = value
    if (Array.isArray(value)) {
      target.__proto__ = arrayMethods
      // 处理数组
      this.observeArray(value)
    } else {
      // 处理对象
      this.walk(value)
    }
  }
}
```

ok，先暂停。

我们发现在`new Observer`的时候，有一条分支，分为数组和对象两种情况。

为了方便理解，我们先看怎么处理对象。

```js
/* core/observer/index.js */

walk (obj: Object) {
  const keys = Object.keys(obj)
  for (let i = 0; i < keys.length; i++) {
    defineReactive(obj, keys[i])
  }
}
```

原来是循环每个`key`调用以下`defineReactive`函数。

看看`defineReactive`是啥。

```js
export function defineReactive (
  obj: Object,
  key: string,
  val: any,
) {
  // dep是啥，不懂，先跳过吧。
  const dep = new Dep()

  val = obj[key]

  Object.defineProperty(obj, key, {
    get() {
      // 调用了dep的depend方法
      dep.depend()
      return val
    },
    set(newVal) {
      val = newVal
      // 调用了dep的depend方法
      dep.notify()
    }
  })
}
```

我们发现，除了dep不太懂是啥以外，我们现在知道了大体流程是个啥。

让我们看看流程图吧~

![1](C:\Users\MCG\Desktop\vue\响应式原理\doc\assets\1.png)

好像很简单哎。

让我们继续瞅瞅`Dep`到底是个啥。

```js
/* core/observer/dep.js */

export default class Dep {
  // 静态属性是个Watcher，这又是个啥？不管不管，先不看。
  static target: ?Watcher;
  // 存放Watcher的数组
  subs: Array<Watcher>;

  constructor () {
    this.subs = []
  }

  addSub (sub: Watcher) {
    this.subs.push(sub)
  }

  depend () {
    if (Dep.target) {
       // 调用了Watcher的addDep方法
      Dep.target.addDep(this)
    }
  }

  notify () {
    // 遍历subs，调用所有的Watcher的update方法
    for (let i = 0, l = subs.length; i < l; i++) {
      subs[i].update()
    }
  }
}
```

ok，继续画流程图看看。

![2](C:\Users\MCG\Desktop\vue\响应式原理\doc\assets\2.png)

还是看不太明白，得搞懂Watcher是啥才行。

```js
/* core/observer/watcher.js */

export default class Watcher {
  getter: Function;
  deps: Array<Dep>;

  constructor (
    expOrFn: string | Function,
  ) {
    this.getter = expOrFn
    this.deps = []
    this.get()
  }

  get () {
  	Dep.target = target
    this.getter()
  }

  addDep (dep: Dep) {
    if (!this.deps.includes(deps)) {
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  update () {
    this.run()
  }

  run () {
    this.get()
  }
}
```

![3](C:\Users\MCG\Desktop\vue\响应式原理\doc\assets\3.png)

## 2. 手写源码

上面的多看几遍应该能懂，不多说，让我们开始敲源码吧~

```js
/* Observer */

import defineReactive from './defineReactive'

class Observer {
  val

  constructor(val) {
    this.val = val
    this.walk()
  }

  walk() {
    const keys = Object.keys(this.val)
    for (const key of keys) {
      defineReactive(this.val, key)
    }
  }
}

export default function observe(val) {
  if (typeof val !== 'object') return
  new Observer(val)
}

/* defineReactive.js */

import Dep from './Dep'
import observe from './observe'

export default function defineReactive(obj, key, val) {
  const dep = new Dep()
  val = obj[key]
  observe(val)

  Object.defineProperty(obj, key, {
    get() {
      dep.depend()
      return val
    },
    set(newVal) {
      val = newVal
      dep.notify()
    }
  })
}

/* Dep.js */

export default class Dep {
  static target
  subs

  constructor() {
    this.subs = []
  }

  addSub(sub) {
    this.subs.push(sub)
  }

  depend() {
    if (Dep.target) {
      Dep.target.addDep(this)
    }
  }

  notify() {
    for (const sub of this.subs) {
      sub.update()
    }
  }
}

/* Watcher.js */

import Dep from "./Dep"

export default class Watcher {
  getter
  deps

  constructor(fn) {
    this.getter = fn
    this.deps = []
    this.get()
  }

  get() {
    Dep.target = this
    this.getter()
  }

  addDep(dep) {
    if (!this.deps.includes(dep)) {
      this.deps.push(dep)
      dep.addSub(this)
    }
  }

  update() {
    this.run()
  }

  run() {
    this.get()
  }
}
```

再写一个测试用例。

```html
<div id="app">
  <button>点击更改数据</button>
  <div class="origin-data"></div>
  <div class="computed-data"></div>
</div>
```

```js
/* main.js */

import observe from './js/observe'
import Watcher from './js/Watcher'

const person = {
  name: 'tom',
  age: 18,
  score: {
    math: 100
  }
}

observe(person)

const node = document.querySelector('.origin-data')
function renderData() {
  node.innerText = JSON.stringify(person)
}

function renderComputed() {
  const node = document.querySelector('.computed-data')
  const computedData = person.name + ': ' + person.score.math
  node.innerText = computedData
}

new Watcher(renderData)
new Watcher(renderComputed)

const button = document.querySelector('button')
button.addEventListener('click', () => {
  person.name = 'jerry'
  person.score.math = 90
})

```

让我们跑起来，看看运行效果吧~

![4](C:\Users\MCG\Desktop\vue\响应式原理\doc\assets\4.gif)

nice~运行成功。

## 3. 如何处理数组

上面写的是关于对象的，别忘了还有个数组需要处理。

先看一个`def`函数。

```js
/* core/util/options.js */

export function def (obj: Object, key: string, val: any, enumerable?: boolean) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  })
}
```

其实简单想就是赋值，然后我们看看数组怎么处理的。

```js
/* core/observer/index.js */
export class Observer {
  // ...
  constructor (value: any) {
    // ...
   	// 给value一个__ob__属性
    def(value, '__ob__', this)
    if (Array.isArray(value)) {
      target.__proto__ = arrayMethods
      // 处理数组
      this.observeArray(value)
    } else {
      // ...
    }
  }
}
```

有个`arrayMethods`，是个啥。

```js
/* core/observer/array.js */

const arrayProto = Array.prototype
export const arrayMethods = Object.create(arrayProto)
```

嗷，原来是把数组的`__proto__`替换了。可这样做的意义是什么呢，让我们继续看看。

```js
/* core/observer/array.js */

const methodsToPatch = [
  'push',
  'pop',
  'shift',
  'unshift',
  'splice',
  'sort',
  'reverse'
]

methodsToPatch.forEach(function (method) {
  const original = arrayProto[method]
  def(arrayMethods, method, function mutator (...args) {
    const result = original.apply(this, args)
    const ob = this.__ob__
    let inserted
    switch (method) {
      case 'push':
      case 'unshift':
        inserted = args
        break
      case 'splice':
        inserted = args.slice(2)
        break
    }
    if (inserted) ob.observeArray(inserted)
    ob.dep.notify()
    return result
  })
})
```

原来是把数组的方法都重写了一遍，这样我们调用函数的时候，就会通知订阅者进行更新了。

本文主要讲的是响应式原理，这块就不敲源码了。

## 4.结语

简单回顾：

1. `observe(data)`，`data`的所有属性都被`defineProperty`。
2. 给每个属性创建一个`Dep`，用来收集通知`Watcher`。
3. 创建`Watcher`，使用`data`的数据，触发`get`，然后添加到对应属性的`Dep`。
4. `data`发生改变时，会触发`set`，通知每个`Watcher`更新。

本文只是浅析了`Vue`的响应式原理。如有机会，会深入研究，更新一篇新的文章。

如有问题，请及时指正。

> 参考：
>
> https://juejin.cn/post/6857669921166491662
