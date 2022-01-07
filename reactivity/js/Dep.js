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
