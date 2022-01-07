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
