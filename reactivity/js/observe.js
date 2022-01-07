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
