import { extend } from "@vue/shared"
import { reactive, readonly } from "./reactive"

function createGetter(isReadonly: boolean, shallow: boolean) {
  return function(target, key, receiver) {
    let ret = Reflect.get(target, key, receiver)
    if (shallow) {
      return ret
    }
    ret = isReadonly ? readonly(ret) : reactive(ret)
    return ret
  }
}

function createSetter(shallow: boolean) {
  return function(target, key, value, receiver) {
    const ret = Reflect.set(target, key, value, receiver)
    return ret
  }
}

function baseReadonlySetter() {
  return function(target, key, value, receiver) {
    console.warn(`set key ${key} fail`)
  }
}

const baseReadonlyHandler = {
  set: baseReadonlySetter()
}

export const mutateHandler = {
  get: createGetter(false, false),
  set: createSetter(false),
}
export const shallowMutateHandler = {
  get: createGetter(false, true),
  set: createSetter(true),
}
export const readonlyHandler = extend({
  get: createGetter(true, false),
}, baseReadonlyHandler)
export const shallowReadonlyHandler = extend({
  get: createGetter(true, true),
}, baseReadonlyHandler)
