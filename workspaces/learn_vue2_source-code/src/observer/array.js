import { observe } from "./index"

// 需要代理的数组方法键值
const needProxyArrayMethodKeys = [
  'push',
  'unshift',
  'pop',
  'shift',
  'sort',
  'splice',
  'reverse'
]

// 数组原型对象
const arrayPrototypeObject = Array.prototype
// 代理对象(含有需要代理的数组方法)
export const proxyArrayMethodObject = Object.create(arrayPrototypeObject)

needProxyArrayMethodKeys.forEach(key => {
  proxyArrayMethodObject[key] = function() {
    console.log(`执行了${key}`)
    const result = arrayPrototypeObject[key].apply(this, arguments)
    let insertedObjects = []
    if (
      key === 'push'
      || key === 'unshift'
    ) {
      insertedObjects = arguments
    }
    if (key === 'splice') {
      insertedObjects = arguments.slice(2)
    }
    observe(insertedObjects)
    return result
  }
})
