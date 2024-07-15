import { describe, expect, it } from 'vitest'
import { myApply, myBind, myCall, myCurry, myDebounce, myDeepClone, myInstanceOf, myNew, myThrottle } from '../10100_手写系列.js'

describe('手写', () => {
  /** TODO: not working */
  it('debounce', () => {
    let count = 0
    function add() {
      count++
    }
    const addDebounce = myDebounce(add, 100)
    addDebounce()
    addDebounce()
    addDebounce()
    setTimeout(addDebounce, 200)
    setTimeout(() => {
      expect(count).toBe(2)
    }, 300)
  })
  /** TODO: not working */
  it('throttle', () => {
    let count = 0
    function add() {
      count++
    }
    const addThrottle = myThrottle(add, 100)
    addThrottle()
    setTimeout(addThrottle, 0)
    setTimeout(addThrottle, 50)
    setTimeout(addThrottle, 200)
    setTimeout(addThrottle, 400)
    setTimeout(addThrottle, 600)
    setTimeout(() => {
      expect(count).toBe(3)
    }, 1000)
  })
  it('instance', () => {
    class Animal {}
    class Cat extends Animal {}
    const cat = new Cat()
    expect(myInstanceOf(cat, Animal)).toBe(true)
  })
  /** TODO: Function.prototype.myCall会不会影响其他测试用例 */
  it('call', () => {
    function getThis(...args) {
      return {
        this: this,
        args,
      }
    }
    getThis.prototype = Object.create({ myCall })
    const cat = {}
    const args = [1, 2, 3]
    expect(getThis.myCall(cat, ...args).this).toBe(cat)
    expect(getThis.myCall(cat, ...args).args).toEqual(args)
  })
  it('apply', () => {
    function getThis(...args) {
      return {
        this: this,
        args,
      }
    }
    getThis.prototype = Object.create({ myApply })
    const cat = {}
    const args = [1, 2, 3]
    expect(getThis.myApply(cat, args).this).toBe(cat)
    expect(getThis.myApply(cat, args).args).toEqual(args)
  })
  it('bind', () => {
    function getThis(...args) {
      return {
        this: this,
        args,
      }
    }
    getThis.prototype = Object.create({ myBind })
    const cat = {}
    const args = [1, 2, 3]
    expect(getThis.myBind(cat, ...args)().this).toBe(cat)
    expect(getThis.myBind(cat, ...args)().args).toEqual(args)
  })
  it('myDeepClone', () => {
    const cat = {
      name: 'snow',
      hobbies: ['eat', 'play'],
    }
    cat.relations = [cat]
    const catClone = myDeepClone(cat)
    expect(catClone.name).toBe('snow')
    expect(catClone.hobbies).not.toBe(cat.hobbies)
    expect(catClone.hobbies).toEqual(cat.hobbies)
    expect(catClone.relations).toEqual(cat.relations)
  })
  it('myNew', () => {
    function Cat(name, age) {
      this.name = name
      this.age = age
    }
    Cat.prototype.getInfo = function () {
      return `${this.name}: ${this.age}`
    }
    const cat = myNew(Cat, 'snow', 3)
    expect(cat.name).toBe('snow')
    expect(cat.age).toBe(3)
    expect(cat.getInfo()).toBe('snow: 3')
  })
  it('myCurry', () => {
    function add(a, b, c) {
      return a + b + c
    }
    const addCurried = myCurry(add)
    expect(addCurried(1)(2)(3)).toBe(6)
  })
})
