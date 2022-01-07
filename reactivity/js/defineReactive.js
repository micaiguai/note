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
